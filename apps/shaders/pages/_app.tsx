import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SEO } from "../components/SEO";

function MyApp({ Component, pageProps }: AppProps) {
  const seo = pageProps.seo ?? {};

  return (
    <>
      <SEO {...seo} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
