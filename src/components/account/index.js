import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import UserImage from '../../constants/UserImage';
import styles from './Account.module.css';

const Account = () => {
  const { user, logoutHandler } = useContext(AuthContext);

  return (
    <section className={styles.accountContainer}>
      <div className={styles.userContainer}>
        <div className={styles.userInfo}>
          <UserImage />
          <p>{user?.email}</p>
        </div>
        <button onClick={logoutHandler}>Çıkış Yap</button>
      </div>
      <div className={styles.offersContainer}>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};

export default Account;
