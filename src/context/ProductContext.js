import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Hepsi');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [categoryValue, setCategoryValue] = useState(0);
  const [error, setError] = useState(null);

  const categoryHandler = (category) => {
    setSelectedCategory(category);
  };

  const newCategoryValue = (value) => {
    setCategoryValue(value);
  };

  const productSelectHandler = (id) => {
    setSelectedProductId(id);
  };

  const fetchProducts = () => {
    axios
      .get('https://bootcamp.akbolat.net/products')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categoryHandler,
        selectedCategory,
        productSelectHandler,
        selectedProductId,
        newCategoryValue,
        categoryValue,
        error,
        fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
