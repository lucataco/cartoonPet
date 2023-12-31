import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    let description = "Turn your pet into a cartoon in seconds.";
    let ogimage = "https://www.cartoonpet.pics/og-image.png";
    let sitename = "cartoonpet.pics";
    let title = "Cartoon Pet Pictures Generated by AI";

    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content={description} />
          <meta property="og:site_name" content={sitename} />
          <meta property="og:description" content={description} />
          <meta property="og:title" content={title} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta property="og:image" content={ogimage} />
          <meta name="twitter:image" content={ogimage} />
        </Head>
        <body className="text-black">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
