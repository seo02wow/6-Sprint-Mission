import Header from "@/components/common/Header";
import "@/styles/globals.css";
import "@/styles/reset.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>판다마켓</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
