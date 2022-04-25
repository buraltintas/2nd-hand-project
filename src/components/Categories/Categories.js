import React, { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styles from './Categories.module.css';

const Categories = () => {
  const [value, setValue] = useState(0);
  const [categories, setCategories] = useState([]);

  const { categoryHandler } = useContext(ProductContext);

  useEffect(() => {
    axios
      .get('https://bootcamp.akbolat.net/categories')
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      categoryHandler('Hepsi');
    } else {
      categoryHandler(categories[newValue - 1].name);
    }

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
          value={value}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons={false}
          aria-label='scrollable prevent tabs example'
        >
          <Tab className={styles.tab} label='Hepsi' />
          {categories.map((categoryName, index) => (
            <Tab key={index} className={styles.tab} label={categoryName.name} />
          ))}
        </Tabs>
      </Box>
    </div>
  );
};

export default Categories;
