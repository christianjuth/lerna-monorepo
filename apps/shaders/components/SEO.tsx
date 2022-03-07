import Head from "next/head";

const BASE = {
  siteName: "Shader Playgroud",
  facebookAppId: "",
};

export type SEOProps = {
  title?: string;
  description?: string;
  twitterHandle?: string;
  type?: "article" | "website" | "podcast";
  imageSrc?: string;
  imageAlt?: string;
  url?: string;
  host?: string;
  pathname?: string;
  siteName?: string;
  author?: string;
  keywords?: string;
  canonical?: string;
};

SEO.formatTitle = formatTitle;
function formatTitle(title?: string) {
  return `${title ? title + " | " : ""}${BASE.siteName}`;
}

export function SEO({
  title = "",
  description = "A tool to experiment with shaders",
  twitterHandle = "@christianjuth",
  type = "website",
  host = "",
  pathname = "/",
  imageAlt = "logo",
  imageSrc,
  author,
  keywords,
  canonical,
}: SEOProps) {
  return (
    <Head>
      <title>{formatTitle(title)}</title>
      <meta name="description" content={description} />
      {author ? <meta name="author" content={author} /> : null}
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      {canonical ? <link rel="canonical" href={canonical} /> : null}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      <meta name="twitter:site" content={twitterHandle} key="twitter:site" />
      <meta name="twitter:title" content={formatTitle(title)} key="twitter:title" />
      <meta name="twitter:description" content={description} key="twitter:description" />
      <meta name="twitter:creator" content={twitterHandle} key="twitter:creator" />
      <meta name="twitter:image" content={imageSrc} key="twitter:image" />
      <meta property="twitter:image:alt" content={imageAlt} key="twitter:image:alt" />

      {/* Facebook */}
      <meta property="og:title" content={title || BASE.siteName} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={host + pathname} />
      <meta property="og:site_name" content={BASE.siteName} />
      <meta property="og:image" content={imageSrc} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:height" content="418" />
      <meta property="og:image:width" content="800" />
      <meta property="fb:image:alt" content={imageAlt} />
      <meta property="og:description" content={description} />
      <meta property="fb:app_id" content={BASE.facebookAppId} />
    </Head>
  );
}
