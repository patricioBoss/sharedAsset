import * as React from "react";
// next
import Document, { Html, Head, Main, NextScript } from "next/document";
// emotion
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import createEmotionServer from "@emotion/server/create-instance";
// theme
import palette from "../theme/palette";

// ----------------------------------------------------------------------

function createEmotionCache() {
  return createCache({ key: "css" });
}

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/logo/sharedasset.svg"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/logo/sharedasset.svg"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/logo/sharedasset.svg"
          />

          <meta name="theme-color" content={palette.light.primary.main} />
          <link rel="manifest" href="/manifest.json" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />

          <meta
            name="title"
            content=" Invest in US Stocks and ETFs with SharedAsset - Your Global Investment Platform"
          />
          <meta
            name="description"
            content="SharedAsset is a user-friendly investment platform that allows you to invest in over 3,500 US stocks and ETFs. Our platform is secure and reliable, with bank-level security and SIPC insurance."
          />
          <meta
            name="keywords"
            content="US stock market,fixed-income investment,brokerage accounts,local investment options,global markets,dollar-denominated mutual funds,investment opportunities,real-time access"
          />
          <meta name="author" content="Pipsville investment limited" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// ----------------------------------------------------------------------

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) =>
        (
          <CacheProvider value={cache}>
            <App {...props} />
          </CacheProvider>
        ),
    });

  const initialProps = await Document.getInitialProps(ctx);

  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      ...emotionStyleTags,
    ],
  };
};
