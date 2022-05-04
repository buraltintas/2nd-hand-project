import { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { AuthContext } from '../../context/AuthContext';
import LoadingSpinner from '../loading/LoadingSpinner';
import styles from './BuyPopup.module.css';

const BuyPopup = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [cookies] = useCookies(['token']);

  const navigate = useNavigate();
  const location = useLocation();

  const buyButtonHandler = async () => {
    if (!user) {
      navigate('/auth', { state: { from: location } });
    } else {
      setIsLoading(true);

      axios.defaults.headers.common = {
        Authorization: `Bearer ${cookies.token}`,
      };

      const offerData = {
        id: props.product.id,
        isSold: true,
      };

      const response = await axios({
        method: 'PUT',
        url: `https://bootcamp.akbolat.net/products/${props.product.id}`,
        data: JSON.stringify(offerData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      if (response.status === 200) {
        setIsLoading(false);
        props.closeBuyPopupHandler();
        props.showPurchasedAlert();
        props.getProductData();
      }
    }
  };

  return (
    <div data-testid='buy-popup' className={styles.buyPopupContainer}>
      {!isLoading && (
        <div className={styles.dialogContainer}>
          <h1>Satın Al</h1>
          <p>Satın almak istiyor musunuz?</p>
          <div className={styles.buyButtonsContainer}>
            <button
              onClick={props.closeBuyPopupHandler}
              className={styles.cancelButton}
            >
              Vazgeç
            </button>
            <button onClick={buyButtonHandler} className={styles.confirmButton}>
              Satın Al
            </button>
          </div>
        </div>
      )}

      {isLoading && (
        <div className={styles.loadingContainer}>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default BuyPopup;
