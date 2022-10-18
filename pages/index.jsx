import ProtectedRoute from '../components/ProtectedRoute';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';

export async function getStaticProps() {
  const q = query(collection(db, 'bricklink_list_parts'), limit(20));
  const docs = await getDocs(q);
  const parts = [];
  docs.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    parts.push(doc.data());
  });

  return {
    props: {
      parts,
    },
  };
}

export default function Home({ parts }) {
  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <Head>
          <title>Rebrick Catalog</title>
        </Head>

        <div className={styles.grid}>
          {parts.map((part) => (
            <div className={styles.card} key={part.partNum}>
              <p>{part.name}</p>
              <Image
                src={part.thumbnailUrl}
                alt="Picture of the author"
                width={500}
                height={500}
              />
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
