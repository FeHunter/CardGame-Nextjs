import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Hello, World!</h1>
      <Link href="/pages/cardPage">Card</Link>
      <Link href="/pages/help">Tutorial</Link>
    </main>
  );
}
