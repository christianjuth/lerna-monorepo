import { Theme } from "@christianjuth/ui";
import type { AppProps } from "next/app";
import { use100vh } from "react-div-100vh";
import Head from "next/head";

function squeezeRanges(shade: number, ...remaps: [number, number, number][]) {
  for (const remap of remaps) {
    if (shade >= remap[0] && shade <= remap[2]) {
      return remap[1]
    }
  }

  return shade
}

const BASE_THEME: Theme.Config = {
  primary: ({ l }) => [0, 0, l],
  accent1: ({ l }) => [191, 100, squeezeRanges(l, [20, 50, 50])],
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
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;700&family=Space+Mono&display=swap" rel="stylesheet"></link>
      </Head>
      <Theme
        baseTheme={BASE_THEME}
        darkTheme={DARK_THEME}
        // useDarkTheme={false}
        addBodyStyles
        button={{ fontStyle: "normal" }}
        mainGutters={{
          baseWidth: "900px",
        }}
        roundness={5}
      >
        <div style={{ minHeight: windowHeight }}>
          <Component {...pageProps} />
        </div>
      </Theme>
    </>
  );
}

export default MyApp;
