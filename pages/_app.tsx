import { AppInitialProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { SWRConfig } from "swr";
import { fetcher } from "../utils/fetcher";
import "../styles/globals.css";
import "../styles/keyframe.css";

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

      <Head>
        <meta name="application-name" content="Nazo Music" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Nazo Music" />
        <meta name="theme-color" content="rgb(108, 117, 125)" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />

        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />

        <link rel="apple-touch-icon" href="/ios/touch-icon-iphone.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/ios/152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/ios/180.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/ios/167.png" />
      </Head>

      <Component {...pageProps} />
    </SWRConfig>
  );
};

export default MyApp;
