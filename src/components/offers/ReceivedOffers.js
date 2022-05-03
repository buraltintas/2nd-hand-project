import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { ProductContext } from '../../context/ProductContext';
import styles from './Offers.module.css';
import LoadingSpinner from '../loading/LoadingSpinner';

const ReceivedOffers = (props) => {
  const [cookies] = useCookies(['token']);
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { productSelectHandler } = useContext(ProductContext);

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

  const productClickHandler = (id) => {
    navigate(`/products/${id}`);
    productSelectHandler(id);
    window.scroll({ top: 0, behavior: 'smooth' });
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
                      onClick={() => productClickHandler(offer?.product?.id)}
                      className={styles.productImage}
                      src={
                        offer?.product?.image?.url
                          ? `https://bootcamp.akbolat.net/${offer?.product?.image?.url}`
                          : 'https://tokelstand.com/wp-content/uploads/2016/11/product-placeholder.jpg'
                      }
                      alt={offer.name}
                    />
                  </div>
                  <div className={styles.textContainer}>
                    <p
                      onClick={() => productClickHandler(offer?.product?.id)}
                      className={styles.productName}
                    >
                      {offer?.product?.name
                        ? offer?.product?.name
                        : 'Ürün adı belirtilmemiş'}
                    </p>
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
