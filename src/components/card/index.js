import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import styles from './Card.module.css';

const Card = (props) => {
  const { selectedCategory, productSelectHandler } = useContext(ProductContext);
  const [productsToShow, setProductsToShow] = useState([]);

  const navigate = useNavigate();

  const productClickHandler = (id) => {
    navigate(`/products/${id}`);
    productSelectHandler(id);
    window.scroll({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (selectedCategory === 'Hepsi') {
      setProductsToShow(props.products);
    } else {
      setProductsToShow(
        props.products.filter(
          (product) => product?.category?.name === selectedCategory
        )
      );
    }
  }, [selectedCategory, props.products]);

  return (
    <>
      {productsToShow?.length < 1 && selectedCategory !== 'Hepsi' && (
        <h1 className={styles.notFoundText}>Bu kategoride ürün bulunmuyor.</h1>
      )}

      {productsToShow?.map((product) => {
        return (
          <div
            data-testid='card'
            onClick={() => productClickHandler(product.id)}
            key={product.id}
            className={styles.cardContainer}
          >
            <img
              className={styles.productImage}
              src={
                product?.image?.url
                  ? `https://bootcamp.akbolat.net${product?.image?.url}`
                  : 'https://tokelstand.com/wp-content/uploads/2016/11/product-placeholder.jpg'
              }
              alt={product.name}
            />

            <div className={styles.brandAndColorContainer}>
              <span className={styles.brandName}>{product.brand}</span>
              <span className={styles.colorName}>
                <span className={styles.color}>Renk:</span> {product.color}
              </span>
            </div>
            <h1 className={styles.price}>
              {product.price.toLocaleString('tr-TR')} TL
            </h1>
          </div>
        );
      })}
    </>
  );
};

export default Card;
