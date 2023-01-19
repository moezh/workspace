import "../styles/global.css";
import type { AppProps } from "next/app";

import { ThemeProvider } from "next-themes";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
