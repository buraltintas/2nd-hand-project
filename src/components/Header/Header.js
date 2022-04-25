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

  const handleNewProductNavigate = () => {
    navigate('/newProduct');
  };

  const handleLoginNavigate = () => {
    navigate('/auth');
  };

  const handleAccountNavigate = () => {
    navigate('/myAccount');
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerElements}>
        <div onClick={goToHome} className={styles.logoContainer}>
          <Logo />
        </div>
        <div className={styles.buttonsContainer}>
          {isLoggedIn && (
            <button
              onClick={handleNewProductNavigate}
              className={styles.button}
            >
              <PlusIcon />{' '}
              <span className={styles.newAdvertText}>Ürün Ekle</span>
            </button>
          )}

          {isLoggedIn ? (
            <button onClick={handleAccountNavigate} className={styles.button}>
              <ProfileIcon /> <span>Hesabım</span>
            </button>
          ) : (
            <button onClick={handleLoginNavigate} className={styles.button}>
              <ProfileIcon /> <span>Giriş Yap</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
