import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import styles from './Offers.module.css';
import LoadingSpinner from '../loading/LoadingSpinner';

const ReceivedOffers = (props) => {
  const [cookies] = useCookies(['token']);
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getProductsWithOffers = props.receivedOffers.filter(
      (offer) => offer.offers.length > 0
    );

    let offersArray = [];

    getProductsWithOffers.forEach((product) => {
      offersArray = product.offers;
    });

    const offersWithProductsInfo = offersArray.map((offer) => {
      const product = getProductsWithOffers.find(
        (product) => product.id === offer.product
      );

      return { ...offer, product };
    });

    setOffers(offersWithProductsInfo);
  }, [props.receivedOffers]);

  const acceptOfferHandler = async (offer) => {
    if (!props.user) {
      return navigate('/auth', { state: { from: location } });
    }

    setIsLoading(true);

    axios.defaults.headers.common = {
      Authorization: `Bearer ${cookies.token}`,
    };

    const offerData = {
      id: offer.id,
      isStatus: true,
    };

    const response = await axios({
      method: 'PUT',
      url: `https://bootcamp.akbolat.net/offers/${offer}`,
      data: JSON.stringify(offerData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.token}`,
      },
    });

    if (response.status === 200) {
      setIsLoading(false);
      window.location.reload();
    } else {
      alert('Bir şeyler ters gitti, yeniden deneyin!');
    }
  };

  const rejectOfferHandler = async (offer) => {
    if (!props.user) {
      return navigate('/auth', { state: { from: location } });
    }

    setIsLoading(true);

    axios.defaults.headers.common = {
      Authorization: `Bearer ${cookies.token}`,
    };

    const offerData = {
      id: offer.id,
      isStatus: false,
    };

    const response = await axios({
      method: 'PUT',
      url: `https://bootcamp.akbolat.net/offers/${offer}`,
      data: JSON.stringify(offerData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.token}`,
      },
    });

    if (response.status === 200) {
      setIsLoading(false);
      props.getReceivedOffers();
    } else {
      alert('Bir şeyler ters gitti, yeniden deneyin!');
    }
  };

  return (
    <>
      {!isLoading &&
        offers.length > 0 &&
        offers.map((offer) => {
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
                      Alınan teklif:&nbsp;{' '}
                      <strong>
                        {offer?.offerPrice.toLocaleString('tr-TR')} TL
                      </strong>
                    </div>
                  </div>
                </div>

                {!offer.product?.isSold && offer.isStatus === null && (
                  <div className={styles.buttonsContainer}>
                    <button
                      onClick={() => acceptOfferHandler(offer.id)}
                      className={styles.confirmButton}
                    >
                      Onayla
                    </button>
                    <button
                      onClick={() => rejectOfferHandler(offer.id)}
                      className={styles.rejectButton}
                    >
                      Reddet
                    </button>
                  </div>
                )}

                {!offer.product?.isSold && offer.isStatus === true && (
                  <p className={styles.confirmedText}>Onaylandı</p>
                )}

                {offer.product?.isSold && (
                  <p className={styles.purchasedText}>Satıldı</p>
                )}

                {offer.isStatus === false && (
                  <p className={styles.rejectedText}>Reddedildi</p>
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
    </>
  );
};

export default ReceivedOffers;
