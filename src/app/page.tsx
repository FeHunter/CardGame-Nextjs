import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Guerra de Cartas</h1>
        <Link href="/pages/deck" className={"button"}>Jogar</Link>
        <Link href="/pages/help" className={"button"}>Como jogar?</Link>
      </div>
    </main>
  );
}

// API
// https://rickandmortyapi.com/documentation/