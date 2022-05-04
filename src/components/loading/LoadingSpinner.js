import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return <div data-testid='loading' className={styles.spinner}></div>;
};

export default LoadingSpinner;
