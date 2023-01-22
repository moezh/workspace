import NextHead from "next/head";

const Head = (props: { title: string; description?: string }) => {
  return (
    <NextHead>
      <title>{props.title}</title>
      <meta property="og:title" content={props.title} />
      {props.description === undefined ? null : (
        <>
          <meta name="description" content={props.description} key="desc" />
          <meta property="og:description" content={props.description} />
        </>
      )}
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff"></meta>
    </NextHead>
  );
};

export default Head;
