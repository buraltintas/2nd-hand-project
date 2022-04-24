import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Logo from '../../constants/Logo';
import PlusIcon from '../../constants/PlusIcon';
import ProfileIcon from '../../constants/ProfileIcon';
import styles from './Header.module.css';

const Header = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginNavigate = () => {
    navigate('/auth');
  };

  const handleAccountNavigate = () => {
    navigate('/account');
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerElements}>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        <div className={styles.buttonsContainer}>
          {isLoggedIn && (
            <button className={styles.button}>
              <PlusIcon /> Ürün Ekle
            </button>
          )}

          {isLoggedIn ? (
            <button onClick={handleAccountNavigate} className={styles.button}>
              <ProfileIcon /> Hesabım
            </button>
          ) : (
            <button onClick={handleLoginNavigate} className={styles.button}>
              <ProfileIcon /> Giriş Yap
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
