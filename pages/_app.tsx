import Head from "next/head";
import Script from "next/script";
import { SWRConfig } from "swr";
import { fetcher } from "../libs/fetcher";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
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
        src="//at.alicdn.com/t/font_3317458_hb4clpteup.js"
      />

      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
