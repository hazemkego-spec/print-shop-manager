import Head from "next/head";
import "../styles/globals.css"; // لو عندك ملف ستايل عام

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0070f3" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;