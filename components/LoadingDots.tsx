import styles from "../styles/loading-dots.module.css";

const LoadingDots = ({ color = "#000" }: { color: string }) => {
  return (
    <div className={styles.loadingSpinner}>
      <div className={styles.spinnerText}>Processing</div>
      <div className={styles.spinner} style={{ borderTopColor: color }} />
    </div>
  );
};

export default LoadingDots;
