import { useEffect, useRef, useState } from 'react';
import CheckOffer from '../../constants/CheckOffer';
import Circle from '../../constants/Circle';
import CloseIcon from '../../constants/CloseIcon';
import styles from './OfferPopup.module.css';

const OfferPopup = (props) => {
  const [offerInput, setOfferInput] = useState('');
  const [selectedOffer, setSelectedOffer] = useState(null);

  const inputRef = useRef();

  const offer20Handler = () => {
    setSelectedOffer(20);
    setOfferInput((props.product.price * 20) / 100);
  };

  const offer30Handler = () => {
    setSelectedOffer(30);
    setOfferInput((props.product.price * 30) / 100);
  };

  const offer40Handler = () => {
    setSelectedOffer(40);
    setOfferInput((props.product.price * 40) / 100);
  };

  useEffect(() => {
    if (document.activeElement === inputRef.current) {
      setSelectedOffer(null);
    }
  });

  useEffect(() => {
    if (offerInput.length < 1) {
      setSelectedOffer(null);
    }
  }, [offerInput]);

  return (
    <div className={styles.offerPopupContainer}>
      <div className={styles.dialogContainer}>
        <div
          onClick={props.closeOfferPopupHandler}
          className={styles.closeIcon}
        >
          <CloseIcon />
        </div>
        <h1>Teklif Ver</h1>
        <div className={styles.productInfoContainer}>
          <div className={styles.imgNameContainer}>
            <img
              className={styles.productImage}
              src={`https://bootcamp.akbolat.net/${props.product?.image?.formats?.large?.url}`}
              alt=''
            />
            <p>{props.product.name}</p>
          </div>

          <h1 className={styles.price}>
            {props.product?.price?.toLocaleString('tr-TR')} TL
          </h1>
        </div>
        <div className={styles.readyOffersContainer}>
          <div
            onClick={offer20Handler}
            className={`${styles.readyOffer} ${
              selectedOffer === 20 && styles.active
            }`}
          >
            {selectedOffer === 20 ? <CheckOffer /> : <Circle />}
            <p>%20'si Kadar Teklif Ver</p>
          </div>
          <div
            onClick={offer30Handler}
            className={`${styles.readyOffer} ${
              selectedOffer === 30 && styles.active
            }`}
          >
            {selectedOffer === 30 ? <CheckOffer /> : <Circle />}
            <p>%30'u Kadar Teklif Ver</p>
          </div>
          <div
            onClick={offer40Handler}
            className={`${styles.readyOffer} ${
              selectedOffer === 40 && styles.active
            }`}
          >
            {selectedOffer === 40 ? <CheckOffer /> : <Circle />}
            <p>%40'ı Kadar Teklif Ver</p>
          </div>
        </div>
        <div className={styles.priceInputcontainer}>
          <input
            ref={inputRef}
            value={offerInput}
            onChange={(e) => setOfferInput(e.target.value)}
            placeholder='Teklif Belirle'
            type='number'
            onWheel={(event) => event.currentTarget.blur()}
          />

          <span className={styles.tlText}>TL</span>
        </div>

        <button>Onayla</button>
      </div>
    </div>
  );
};

export default OfferPopup;
