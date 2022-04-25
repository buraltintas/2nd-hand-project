import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { LoginSchema } from '../../constants/yupSchema';
import styles from './AuthForm.module.css';
import image from '../../assets/AuthImage.png';
import Logo from '../../constants/Logo';
import AlertIcon from '../../constants/AlertIcon';
import LoadingSpinner from '../loading/LoadingSpinner';

const Login = () => {
  const [isMember, setIsMember] = useState(true);
  const { isLoading, signupHandler, loginHandler, error } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const toggleForm = () => {
    setIsMember(!isMember);
  };

  const goToHome = () => {
    navigate('/');
  };

  const loginSubmitHandler = (auth) => {
    loginHandler(auth);
  };

  const signupSubmitHandler = (auth) => {
    signupHandler(auth);
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
        <div onClick={goToHome} className={styles.logoContainer}>
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
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={(auth) => {
              if (isMember) {
                loginSubmitHandler(auth);
              } else {
                signupSubmitHandler(auth);
              }
            }}
            validationSchema={LoginSchema}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              handleBlur,
              touched,
            }) => (
              <form className={styles.form}>
                <div className={styles.inputContainer}>
                  <label htmlFor='email'>Email</label>
                  <input
                    className={`${styles.input} ${
                      touched.password && errors.email ? styles.error : ''
                    }`}
                    id='email'
                    type='email'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isLoading}
                  />
                  <label htmlFor='password'>Şifre</label>
                  <input
                    className={`${styles.input} ${
                      touched.password && errors.password ? styles.error : ''
                    }`}
                    id='password'
                    type='password'
                    name='password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isLoading}
                  />
                </div>
                <p>Şifremi Unuttum</p>
                <br />
                <button
                  disabled={isLoading}
                  type='submit'
                  onClick={handleSubmit}
                >
                  {isLoading ? <LoadingSpinner /> : 'Giriş'}
                </button>
                {touched.password &&
                  touched.email &&
                  (errors.password || errors.email) && (
                    <div className={styles.alert}>
                      <AlertIcon />
                      <p>Emailiniz veya şifreniz hatalı</p>
                    </div>
                  )}
                {error && (
                  <div className={styles.alert}>
                    <AlertIcon />
                    <p>{error}</p>
                  </div>
                )}
              </form>
            )}
          </Formik>
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
