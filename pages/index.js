import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import "../firebase/firebase";
import { UserContext } from "./_app";
import { useContext } from "react";

export default function Home() {
  const userdata = useContext(UserContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3>Welcome back {userdata ? userdata.data.name : "Anon."}</h3>
        <div>
          <div>
            <h3>CA</h3>
            College assistant is a platform built to help students across
            Nigeria.
          </div>
          <div>
            <h3>Unlimited Access</h3>
            You access questions and verified answers across all universities
            within Nigeria.
          </div>
          <div>
            <h3>We gain by helping others.</h3>
            Post questions on exams you have taken. Once the answer is verified,
            all other students including you can then have access to it.
          </div>
          <div>
            <h3>Performance Test.</h3>
            Take a quiz related to your topic to evaluate your performance.
          </div>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
