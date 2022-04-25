import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import axios from 'axios';
import styles from './Products.module.css';
import Card from '../card/Card';

const Products = () => {
  const { products } = useContext(ProductContext);

  return (
    <section className={styles.productsContainer}>
      <Card products={products} />
    </section>
  );
};

export default Products;
