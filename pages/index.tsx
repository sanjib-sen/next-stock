import type { GetServerSideProps } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import get_stock from "../scripts/get-stock-price";
import get_env_data from "../scripts/get-env-data";
import Link from "next/link";

type Props = {
  data: {
    price: number;
    stock: number;
    vat: number;
    sell: string;
    profit: string;
    profit_money: number;
    buy_per_share: number;
    target: number;
    company: string;
  };
};

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await get_stock();
  const env_data = get_env_data();
  const buy = env_data.buy;
  let profit = "লাভ";
  const sell = Math.floor(
    Number(env_data.stock) * Number(price) - Number(env_data.vat)
  );
  if (Number(buy) > Number(sell)) {
    profit = "লস";
  }
  const data = {
    price: price,
    stock: env_data.stock,
    vat: env_data.vat,
    sell: sell.toLocaleString(),
    profit: profit,
    profit_money: Math.abs(sell - Number(buy)),
    buy_per_share: env_data.buy_price,
    target: env_data.target,
    company: env_data.name,
  };

  return {
    props: { data },
  };
};

export function Home({ data }: Props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>শেয়ারবাজার</title>
        <meta name="description" content="Created by Sanjib Sen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>শেয়ার বাজার</h1>

        <p className={styles.description}>
          বর্তমানে আমাদের শেয়ার{" "}
          <b>
            {" "}
            {data.profit_money} টাকা {data.profit}{" "}
          </b>{" "}
          এ আছে
        </p>
        <h1 className={styles.card2}>
          <Link href="/about">
            <a>About Us</a>
          </Link>
        </h1>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>বর্তমান মুল্য প্রতি শেয়ারেঃ</h2>
            <p>{data.price} টাকা</p>
          </div>
        </div>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2> এখন বিক্রি করলে পাওয়া যাবেঃ</h2>
            <p>{data.sell} টাকা</p>
          </div>
        </div>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2> এখন বিক্রি করলে {data.profit} হবেঃ</h2>
            <p>{data.profit_money} টাকা</p>
          </div>
        </div>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2> আরো কিছু তথ্যঃ</h2>
            <p>
              {" "}
              ১। স্টক কেনা হয়েছেঃ <b>{data.stock}</b> টি <br></br>
              ২। কেনার সময় প্রতি শেয়ারের মুল্য ছিলঃ <b>
                {" "}
                {data.buy_per_share}
              </b>{" "}
              টাকা <br></br>
              ৩। বিক্রি করা টার্গেট যখন প্রতি শেয়ারের মুল্য হবেঃ{" "}
              <b>{data.target}</b> টাকা <br></br>
              ৪। <b>{data.target}</b> টাকায় প্রতি শেয়ার বিক্রি করলে পাওয়া যাবে (
              {data.stock} * {data.target} - ভ্যাট {data.vat} ) ={" "}
              <b>{(data.stock * data.target - data.vat).toLocaleString()}</b>{" "}
              টাকা <br></br>
            </p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.facebook.com/sanjib.kumarsen.963"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created By @Sanjib Kumar Sen
          <span className={styles.logo}></span>
        </a>
      </footer>
    </div>
  );
}

export default Home;
