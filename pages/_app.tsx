import { AppInitialProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { SWRConfig } from "swr";
import { fetcher } from "../utils/fetcher";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      <Script
        id="stripe-js"
        src="//at.alicdn.com/t/font_3317458_dlankk9l2l.js"
      />

      <Component {...pageProps} />
    </SWRConfig>
  );
};

export default MyApp;
