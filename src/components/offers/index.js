import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { AuthContext } from '../../context/AuthContext';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styles from './Offers.module.css';

const Offers = () => {
  const [cookies] = useCookies(['token']);
  const [value, setValue] = useState(1);
  const [givenOffers, setGivenOffers] = useState([]);
  const [receivedOffers, setReceivedOffers] = useState([]);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getGivenOffers = () => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${cookies.token}`,
    };

    axios
      .get(
        `https://bootcamp.akbolat.net/offers?users_permissions_user=${user.id}`
      )
      .then((res) => {
        setGivenOffers(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const getReceivedOffers = () => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${cookies.token}`,
    };

    axios
      .get(
        `https://bootcamp.akbolat.net/products?users_permissions_user=${user.id}`
      )
      .then((res) => {
        setReceivedOffers(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  console.log(receivedOffers);
  console.log(givenOffers);

  useEffect(() => {
    if (user) {
      getGivenOffers();
      getReceivedOffers();
    } else {
      navigate('/');
    }
  }, []);

  return (
    <section className={styles.offersContainer}>
      <div className={styles.tabsContainer}>
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
            <Tab value={1} className={styles.tab} label='Teklif Aldıklarım' />
            <Tab value={2} className={styles.tab} label='Teklif Verdiklerim' />
          </Tabs>
        </Box>
      </div>

      {receivedOffers?.map((offer) => (
        <div key={offer.id} className={styles.offers}>
          <div className={styles.productInfoContainer}>
            <div className={styles.imageContainer}>
              <img
                className={styles.productImage}
                src={`https://bootcamp.akbolat.net/${offer?.image?.url}`}
                alt={offer.name}
              />
            </div>
            <div className={styles.textContainer}>
              <p className={styles.productName}>{offer.name}</p>
              <div className={styles.receivedOfferText}>
                Alınan teklif:&nbsp; <strong>120 TL</strong>
              </div>
            </div>
          </div>

          <div className={styles.buttonsContainer}>
            <button className={styles.confirmButton}>Onayla</button>
            <button className={styles.rejectButton}>Reddet</button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Offers;
