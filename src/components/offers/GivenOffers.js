import { useState, useEffect } from 'react';
import styles from './Offers.module.css';

const GivenOffers = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const buyHandler = () => {};

  return (
    <>
      {props.givenOffers?.map((offer) => (
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
                <strong>{offer.offerPrice.toLocaleString('tr-TR')} TL</strong>
              </div>
            </div>
          </div>

          {!offer.product.isSold && offer.isStatus === null && (
            <p className={styles.pendingText}>Onay bekliyor</p>
          )}

          {!offer.product.isSold && offer.isStatus === true && (
            <div className={styles.buttonsContainer}>
              <button onClick={buyHandler} className={styles.buyButton}>
                Satın Al
              </button>
              <p className={styles.confirmedText}>Onaylandı</p>
            </div>
          )}

          {!offer.product.isSold && offer.isStatus === false && (
            <p className={styles.rejectedText}>Reddedildi</p>
          )}

          {offer.product.isSold && (
            <p className={styles.purchasedText}>Satın Alındı</p>
          )}
        </div>
      ))}
    </>
  );
};

export default GivenOffers;
