import { Theme } from "@christianjuth/ui";
import type { AppProps } from "next/app";
import { use100vh } from "react-div-100vh";
import Head from "next/head";

const BASE_THEME: Theme.Config = {
  primary: ({ l }) => [0, 0, l],
  accent1: ({ l }) => [241, 100, l],
  gray: ({ l, shade }) => [218, shade + 10, l],
};
const DARK_THEME: Partial<Theme.Config> = {
  gray: ({ l, shade }) => [218, 25 - shade, 100 - l],
};

function MyApp({ Component, pageProps }: AppProps) {
  const windowHeight = use100vh() ?? 0;

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Theme
        baseTheme={BASE_THEME}
        darkTheme={DARK_THEME}
        useDarkTheme={false}
        addBodyStyles
        button={{ fontStyle: "normal" }}
        mainGutters={{
          baseWidth: "900px",
        }}
      >
        <div style={{ minHeight: windowHeight }}>
          <Component {...pageProps} />
        </div>
      </Theme>
    </>
  );
}

export default MyApp;
