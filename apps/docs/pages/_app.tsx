import type { AppProps } from "next/app";
import { Theme } from "@christianjuth/ui";
import { AuthProvier } from "../components/Gun";
import { Navbar } from "../components/Navbar";
import { use100vh } from "react-div-100vh";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const pageHeight = use100vh() ?? 0;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <Theme
        baseTheme={{
          primary: ({ l }) => [0, 0, l, 0],
          accent1: ({ l }) => [0, 0, l, 0],
          gray: ({ l }) => [0, 0, l, 0],
        }}
        darkTheme={{
          gray: ({ l }) => [0, 0, 100 - l, 0],
        }}
      >
        <div
          style={{
            minHeight: pageHeight,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <AuthProvier>
            <Navbar />
            <Component {...pageProps} />
          </AuthProvier>
        </div>
      </Theme>
    </>
  );
}

export default MyApp;
