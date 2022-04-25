import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Hepsi');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [categoryValue, setCategoryValue] = useState(0);

  const categoryHandler = (category) => {
    setSelectedCategory(category);
  };

  const newCategoryValue = (value) => {
    setCategoryValue(value);
  };

  const productSelectHandler = (id) => {
    setSelectedProductId(id);
  };

  useEffect(() => {
    axios
      .get('https://bootcamp.akbolat.net/products')
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedCategory, selectedProductId]);

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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
