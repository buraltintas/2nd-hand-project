import { useEffect, useState } from 'react';
import styles from './Offers.module.css';

const ReceivedOffers = (props) => {
  const [offers, setOffers] = useState([]);

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

  return (
    <>
      {offers.length > 0 &&
        offers.map((offer) => (
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

            {!offer.product.isSold && offer.isStatus === null && (
              <div className={styles.buttonsContainer}>
                <button className={styles.confirmButton}>Onayla</button>
                <button className={styles.rejectButton}>Reddet</button>
              </div>
            )}

            {!offer.product.isSold && offer.isStatus === true && (
              <p className={styles.confirmedText}>Onaylandı</p>
            )}

            {offer.product.isSold && (
              <p className={styles.purchasedText}>Satıldı</p>
            )}
          </div>
        ))}
    </>
  );
};

export default ReceivedOffers;
