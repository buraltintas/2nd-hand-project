import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './BuyPopup.module.css';

const BuyPopup = (props) => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const buyButtonHandler = () => {
    if (!user) {
      navigate('/auth', { state: { from: location } });
    } else {
      console.log(user);
    }
  };

  return (
    <div className={styles.buyPopupContainer}>
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
    </div>
  );
};

export default BuyPopup;
