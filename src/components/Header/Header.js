import Logo from '../../constants/Logo';
import PlusIcon from '../../constants/PlusIcon';
import ProfileIcon from '../../constants/ProfileIcon';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerElements}>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        <div className={styles.buttonsContainer}>
          <button className={styles.button}>
            <PlusIcon /> Ürün Ekle
          </button>
          <button className={styles.button}>
            <ProfileIcon /> Giriş Yap
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
