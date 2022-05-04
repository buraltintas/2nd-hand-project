import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './Product.module.css';
import LoadingSpinner from '../loading/LoadingSpinner';
import BuyPopup from '../popups/BuyPopup';
import OfferPopup from '../popups/OfferPopup';
import DoneIcon from '../../constants/DoneIcon';

const Product = () => {
  const [productToShow, setProductToShow] = useState({});
  const [loading, setLoading] = useState(true);
  const [isPurchased, setIsPurchased] = useState(false);
  const [userHasOffer, setUserHasOffer] = useState(false);
  const [offerId, setOfferId] = useState(null);
  const [offerForRecentProduct, setOfferForRecentProduct] = useState(null);
  const [openBuyPopup, setOpenBuyPopup] = useState(false);
  const [openOfferPopup, setOpenOfferPopup] = useState(false);
  const { user } = useContext(AuthContext);

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

  const cancelOfferHandler = () => {
    setLoading(true);
    axios
      .delete(`https://bootcamp.akbolat.net/offers/${offerId}`)
      .then((res) => {
        getProductData();
      })
      .catch((err) => alert(err));
  };

  const getProductData = () => {
    axios
      .get(`https://bootcamp.akbolat.net/products/${id}`)
      .then((res) => {
        setProductToShow(res.data);
        setLoading(false);
      })
      .catch((err) => alert(err));
  };

  const showPurchasedAlert = () => {
    setIsPurchased(true);

    setTimeout(() => {
      setIsPurchased(false);
    }, [2500]);
  };

  useEffect(() => {
    getProductData();
  }, [id]);

  useEffect(() => {
    if (user) {
      setUserHasOffer(
        productToShow?.offers?.some(
          (offer) => offer.users_permissions_user === user.id
        )
      );

      if (userHasOffer) {
        setOfferForRecentProduct(
          productToShow.offers.filter(
            (offer) => offer.users_permissions_user === user.id
          )[0]?.offerPrice
        );

        setOfferId(
          productToShow.offers.filter(
            (offer) => offer.users_permissions_user === user.id
          )[0]?.id
        );
      }
    }
  }, [productToShow.offers, userHasOffer, user?.id, user]);

  return (
    <>
      {!loading ? (
        <section data-testid='product' className={styles.productContainer}>
          <div className={styles.imageContainer}>
            <img
              className={styles.productImage}
              src={
                productToShow?.image?.url
                  ? `https://bootcamp.akbolat.net/${productToShow?.image?.url}`
                  : 'https://tokelstand.com/wp-content/uploads/2016/11/product-placeholder.jpg'
              }
              alt={
                productToShow?.name
                  ? productToShow?.name
                  : 'Ürün Adı Girilmemiş'
              }
            />
          </div>

          <div className={styles.infoContainer}>
            <h1>
              {productToShow?.name
                ? productToShow?.name
                : 'Ürün Adı Girilmemiş'}
            </h1>
            <h1 className={styles.priceTop}>
              {productToShow?.price?.toLocaleString('tr-TR')} TL
            </h1>
            <div className={styles.infoDetailsContainer}>
              <div className={styles.detailContainer}>
                <span className={styles.title}>Marka:</span>
                <span className={styles.info}>
                  {productToShow?.brand
                    ? productToShow?.brand
                    : 'Belirtilmemiş'}
                </span>
              </div>
              <div className={styles.detailContainer}>
                <span className={styles.title}>Renk:</span>
                <span className={styles.info}>
                  {productToShow?.color
                    ? productToShow?.color
                    : 'Belirtilmemiş'}
                </span>
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

            {offerForRecentProduct && !productToShow.isSold && (
              <div className={styles.recentOfferText}>
                Verilen Teklif:&nbsp;
                <strong>
                  {offerForRecentProduct.toLocaleString('tr-TR')} TL
                </strong>
              </div>
            )}

            {productToShow?.users_permissions_user?.id !== user?.id && (
              <>
                {!productToShow?.isSold && (
                  <div className={styles.buttonsContainer}>
                    <button onClick={openBuyPopupHandler}>Satın Al</button>
                    {productToShow.isOfferable && !userHasOffer && (
                      <button onClick={openOfferPopupHandler}>
                        Teklif Ver
                      </button>
                    )}

                    {productToShow.isOfferable && userHasOffer && (
                      <button onClick={cancelOfferHandler}>
                        Teklifi Geri Çek
                      </button>
                    )}
                  </div>
                )}
              </>
            )}

            {productToShow?.isSold && (
              <div className={styles.soldText}>Bu Ürün Satışta Değil</div>
            )}

            <h2>Açıklama</h2>
            <p>
              {productToShow?.description
                ? productToShow?.description
                : 'Belirtilmemiş'}
            </p>
          </div>
        </section>
      ) : (
        <div className={styles.loadingContainer}>
          <LoadingSpinner />
        </div>
      )}

      {openBuyPopup && (
        <BuyPopup
          showPurchasedAlert={showPurchasedAlert}
          getProductData={getProductData}
          userId={user?.id}
          product={productToShow}
          closeBuyPopupHandler={closeBuyPopupHandler}
        />
      )}

      {openOfferPopup && (
        <OfferPopup
          getProductData={getProductData}
          userId={user?.id}
          product={productToShow}
          closeOfferPopupHandler={closeOfferPopupHandler}
        />
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

export default Product;
