import { useContext, useEffect } from 'react';

import { ProductContext } from '../../context/ProductContext';
import styles from './Products.module.css';
import Card from '../card';

const Products = () => {
  const { products, fetchProducts } = useContext(ProductContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section data-testid='products' className={styles.productsContainer}>
      <Card products={products} />
    </section>
  );
};

export default Products;
