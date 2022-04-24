import { useState } from 'react';
import styles from './AuthForm.module.css';
import image from '../../assets/AuthImage.png';
import Logo from '../../constants/Logo';

const Login = () => {
  const [isMember, setIsMember] = useState(true);

  const toggleForm = () => {
    setIsMember(!isMember);
  };

  return (
    <section className={styles.authContainer}>
      <div className={styles.authImageContainer}>
        <img
          className={styles.image}
          src={image}
          alt='Stylish woman with a blue hat'
        />
      </div>
      <div className={styles.ctaContainer}>
        <div className={styles.logoContainer}>
          <Logo width='224.49' height='73.2' />
        </div>
        <div className={styles.formContainer}>
          <div className={styles.loginHeading}>
            <h1>{isMember ? 'Giriş Yap' : 'Üye Ol'}</h1>
            <p>
              Fırsatlardan yararlanmak için{' '}
              {isMember ? 'giriş yap!' : 'üye ol!'}
            </p>
          </div>
          <form className={styles.form}>
            <div className={styles.inputContainer}>
              <label htmlFor='email'>Email</label>
              <input id='email' type='text' />
              <label htmlFor='password'>Şifre</label>
              <input id='password' type='password' />
            </div>
            <p>Şifremi Unuttum</p>
            <br />
            <button>Giriş</button>
          </form>
          <p className={styles.toggleText}>
            Hesabın {isMember ? 'yok mu?' : 'var mı?'}
            <strong onClick={toggleForm}>
              {isMember ? 'Üye ol' : 'Giriş yap'}
            </strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
