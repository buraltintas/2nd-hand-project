import banner from '../../assets/Banner.png';

import styles from './Banner.module.css';

const Banner = () => {
  return (
    <div className={styles.bannerContainer}>
      <img
        data-testid='banner'
        className={styles.banner}
        src={banner}
        alt='Banner'
      />
    </div>
  );
};

export default Banner;
