import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <h1 className={styles.title}>
      Welcome to the Financial Transactions App!
    </h1>
  );
}
