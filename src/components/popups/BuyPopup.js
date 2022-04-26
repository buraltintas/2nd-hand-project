import styles from './BuyPopup.module.css';

const BuyPopup = (props) => {
  return (
    <div className={styles.buyPopupContainer}>
      <div className={styles.dialogContainer}>
        <h1>Satın Al</h1>
        <p>Satın almak istiyor musunuz?</p>
        <div className={styles.buyButtonsContainer}>
          <button
            onClick={props.closeBuyPopupHandler}
            className={styles.cancelButton}
          >
            Vazgeç
          </button>
          <button className={styles.confirmButton}>Satın Al</button>
        </div>
      </div>
    </div>
  );
};

export default BuyPopup;
