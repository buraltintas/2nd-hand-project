import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styles from './Categories.module.css';

const categoryNames = [
  'Hepsi',
  'Pantolon',
  'Gömlek',
  'Tişört',
  'Şort',
  'Sweatshirt',
  'Kazak',
  'Polar',
  'Mont',
  'Abiye',
  'Ayakkabı',
  'Aksesuar',
  'Çanta',
  'Triko',
  'Diğer',
];

const Categories = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
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
          {categoryNames.map((categoryName, index) => (
            <Tab key={index} className={styles.tab} label={categoryName} />
          ))}
        </Tabs>
      </Box>
    </div>
  );
};

export default Categories;
