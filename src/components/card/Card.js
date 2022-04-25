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
          (product) => product.category.name === selectedCategory
        )
      );
    }
  }, [selectedCategory, props.products]);

  return (
    <>
      {productsToShow.length < 1 && <h1>Bu kategoride ürün bulunmuyor.</h1>}
      {productsToShow.map((product) => (
        <div
          onClick={() => productClickHandler(product.id)}
          key={product.id}
          className={styles.cardContainer}
        >
          <img
            className={styles.productImage}
            src={`https://bootcamp.akbolat.net/${product?.image?.formats?.small?.url}`}
            alt={product.name}
          />

          <div className={styles.brandAndColorContainer}>
            <span className={styles.brandName}>{product.brand}</span>
            <span className={styles.colorName}>
              <span className={styles.color}>Renk:</span> {product.color}
            </span>
          </div>
          <h1 className={styles.price}>{product.price} TL</h1>
        </div>
      ))}
    </>
  );
};

export default Card;
