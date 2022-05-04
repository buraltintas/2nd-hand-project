import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import UserImage from '../../constants/UserImage';
import styles from './Account.module.css';
import Offers from '../offers';

const Account = () => {
  const { user, logoutHandler } = useContext(AuthContext);

  return (
    <>
      {user && (
        <section className={styles.accountContainer}>
          <div className={styles.userContainer}>
            <div className={styles.userInfo}>
              <UserImage />
              <p>{user?.user?.email || user?.email}</p>
            </div>
            <button onClick={logoutHandler}>Çıkış Yap</button>
          </div>
          <Offers user={user} />
        </section>
      )}
    </>
  );
};

export default Account;
