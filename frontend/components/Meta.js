import Head from "next/head";

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <meta name="google" content="notranslate" />
      {/* <link rel="icon" href="/logo.svg" /> */}
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: "AWS",
  keywords: "Scheduler Library!",
  description: "AWS Scheduler Library for Crio Winter of Doing",
};

export default Meta;
