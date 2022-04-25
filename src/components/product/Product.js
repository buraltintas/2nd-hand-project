import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import styles from './Product.module.css';

const Product = () => {
  const [productToShow, setProductToShow] = useState({});
  const { products, selectedProductId } = useContext(ProductContext);

  const { id } = useParams();

  console.log(products);

  useEffect(() => {
    setProductToShow(
      products.find((product) => product.id === selectedProductId)
    );

    setProductToShow(products.find((product) => product.id == id));
  }, [selectedProductId, products]);

  return (
    <>
      {productToShow && (
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
            <div className={styles.buttonsContainer}>
              <button>Satın Al</button>
              <button>Teklif Ver</button>
            </div>
            <h2>Açıklama</h2>
            <p>{productToShow?.description}</p>
          </div>
        </section>
      )}
    </>
  );
};

export default Product;
