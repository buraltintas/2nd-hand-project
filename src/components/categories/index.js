import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import axios from 'axios';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styles from './Categories.module.css';

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(
    searchParams.get('category') ? searchParams.get('category') * 1 + 1 : 0
  );
  const [categories, setCategories] = useState([]);

  const categoryParam = searchParams.get('category');

  const { categoryHandler, newCategoryValue, categoryValue } =
    useContext(ProductContext);

  useEffect(() => {
    if (categoryParam && categories) {
      categoryHandler(categories[categoryParam]?.name);
    }
  }, [categories, categoryParam]);

  useEffect(() => {
    axios
      .get('https://bootcamp.akbolat.net/categories')
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      categoryHandler('Hepsi');
      setSearchParams();
    } else {
      categoryHandler(categories[newValue - 1].name);
      setSearchParams({ category: newValue - 1 });
    }

    newCategoryValue(newValue);
    setValue(newValue);
  };

  return (
    <div className={styles.categoriesContainer}>
      <Box sx={{ maxWidth: '100%', bgcolor: 'background.paper' }}>
        <Tabs
          TabIndicatorProps={{
            style: { background: '#4B9CE2', height: '2px', color: '#4B9CE2' },
          }}
          className={styles.tabs}
          value={value * 1}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons={false}
          aria-label='scrollable prevent tabs example'
        >
          <Tab className={styles.tab} label='Hepsi' />
          {categories.map((categoryName, index) => (
            <Tab
              key={index}
              value={categoryName.id}
              className={styles.tab}
              label={categoryName.name}
            />
          ))}
        </Tabs>
      </Box>
    </div>
  );
};

export default Categories;
