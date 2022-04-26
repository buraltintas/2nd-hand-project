import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './Product.module.css';
import LoadingSpinner from '../loading/LoadingSpinner';
import BuyPopup from '../popups/BuyPopup';
import OfferPopup from '../popups/OfferPopup';

const Product = () => {
  const [productToShow, setProductToShow] = useState({});
  const [loading, setLoading] = useState(true);
  const [openBuyPopup, setOpenBuyPopup] = useState(false);
  const [openOfferPopup, setOpenOfferPopup] = useState(false);

  const { id } = useParams();

  const openBuyPopupHandler = () => {
    setOpenBuyPopup(true);
  };

  const closeBuyPopupHandler = () => {
    setOpenBuyPopup(false);
  };

  const openOfferPopupHandler = () => {
    setOpenOfferPopup(true);
  };

  const closeOfferPopupHandler = () => {
    setOpenOfferPopup(false);
  };

  useEffect(() => {
    axios.get(`https://bootcamp.akbolat.net/products/${id}`).then((res) => {
      setProductToShow(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {!loading ? (
        <section className={styles.productContainer}>
          <div className={styles.imageContainer}>
            <img
              className={styles.productImage}
              src={`https://bootcamp.akbolat.net/${productToShow?.image?.formats?.large?.url}`}
              alt='productToShow?.name'
            />
          </div>

          <div className={styles.infoContainer}>
            <h1>{productToShow?.name}</h1>
            <h1 className={styles.priceTop}>
              {productToShow?.price?.toLocaleString('tr-TR')} TL
            </h1>
            <div className={styles.infoDetailsContainer}>
              <div className={styles.detailContainer}>
                <span className={styles.title}>Marka:</span>
                <span className={styles.info}>{productToShow?.brand}</span>
              </div>
              <div className={styles.detailContainer}>
                <span className={styles.title}>Renk:</span>
                <span className={styles.info}>{productToShow?.color}</span>
              </div>
              <div className={styles.detailContainer}>
                <span className={styles.title}>Kullanım durumu:</span>
                <span className={styles.info}>
                  {productToShow?.status || 'Belirtilmemiş'}
                </span>
              </div>
            </div>
            <h1 className={styles.priceBottom}>
              {productToShow?.price?.toLocaleString('tr-TR')} TL
            </h1>
            {!productToShow.isSold ? (
              <div className={styles.buttonsContainer}>
                <button onClick={openBuyPopupHandler}>Satın Al</button>
                {productToShow.isOfferable && (
                  <button onClick={openOfferPopupHandler}>Teklif Ver</button>
                )}
              </div>
            ) : (
              <div className={styles.soldText}>Bu Ürün Satışta Değil</div>
            )}
            <h2>Açıklama</h2>
            <p>{productToShow?.description}</p>
          </div>
        </section>
      ) : (
        <div className={styles.loadingContainer}>
          <LoadingSpinner />
        </div>
      )}

      {openBuyPopup && <BuyPopup closeBuyPopupHandler={closeBuyPopupHandler} />}

      {openOfferPopup && (
        <OfferPopup
          product={productToShow}
          closeOfferPopupHandler={closeOfferPopupHandler}
        />
      )}
    </>
  );
};

export default Product;
