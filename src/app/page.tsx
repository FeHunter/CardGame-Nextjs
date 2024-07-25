import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.gameTitle}>Interdimensional Card War</h1>
        <Link href="/pages/deck" className={"button"}>Play</Link>
        <Link href="/pages/help" className={"button"}>Help</Link>
      </div>
    </main>
  );
}

/*
API: https://rickandmortyapi.com/documentation/
Background: https://nickbear.artstation.com/projects/D56vgn
*/