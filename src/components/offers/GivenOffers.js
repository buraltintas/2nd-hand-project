import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import styles from './Offers.module.css';
import LoadingSpinner from '../loading/LoadingSpinner';
import DoneIcon from '../../constants/DoneIcon';

const GivenOffers = (props) => {
  const [cookies] = useCookies(['token']);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const buyHandler = async (id) => {
    if (!props.user) {
      navigate('/auth', { state: { from: location } });
    } else {
      setIsLoading(true);

      console.log(id);

      axios.defaults.headers.common = {
        Authorization: `Bearer ${cookies.token}`,
      };

      const offerData = {
        id: id,
        isSold: true,
      };

      const response = await axios({
        method: 'PUT',
        url: `https://bootcamp.akbolat.net/products/${id}`,
        data: JSON.stringify(offerData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      if (response.status === 200) {
        setIsPurchased(true);
        setTimeout(() => {
          setIsLoading(false);
          setIsPurchased(false);
          props.getGivenOffers();
        }, 2500);
      } else {
        alert('Bir şeyler ters gitti, yeniden deneyin!');
      }
    }
  };

  return (
    <>
      {!isLoading &&
        props.givenOffers?.map((offer) => {
          console.log(offer.product);
          if (!offer.product?.isSold) {
            return (
              <div key={offer.id} className={styles.offers}>
                <div className={styles.productInfoContainer}>
                  <div className={styles.imageContainer}>
                    <img
                      className={styles.productImage}
                      src={`https://bootcamp.akbolat.net/${offer?.product?.image?.url}`}
                      alt={offer.name}
                    />
                  </div>
                  <div className={styles.textContainer}>
                    <p className={styles.productName}>{offer?.product?.name}</p>
                    <div className={styles.receivedOfferText}>
                      Verilen teklif:&nbsp;{' '}
                      <strong>
                        {offer?.offerPrice?.toLocaleString('tr-TR')} TL
                      </strong>
                    </div>
                  </div>
                </div>

                {!offer.product?.isSold && offer.isStatus === null && (
                  <p className={styles.pendingText}>Onay bekliyor</p>
                )}

                {!offer.product?.isSold && offer.isStatus === true && (
                  <div className={styles.buttonsContainer}>
                    <button
                      onClick={() => buyHandler(offer.product.id)}
                      className={styles.buyButton}
                    >
                      Satın Al
                    </button>
                    <p className={styles.confirmedText}>Onaylandı</p>
                  </div>
                )}

                {!offer.product?.isSold && offer.isStatus === false && (
                  <p className={styles.rejectedText}>Reddedildi</p>
                )}

                {offer.product?.isSold && (
                  <p className={styles.purchasedText}>Satın Alındı</p>
                )}
              </div>
            );
          }
        })}

      {isLoading && (
        <div className={styles.loadingContainer}>
          <LoadingSpinner />
        </div>
      )}

      {isPurchased && (
        <div className={styles.alert}>
          <DoneIcon />
          <p>Satın Alındı</p>
        </div>
      )}
    </>
  );
};

export default GivenOffers;
