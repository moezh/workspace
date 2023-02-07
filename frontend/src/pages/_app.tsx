import "../styles/global.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { UserContextProvider } from "../context/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <ThemeProvider enableSystem={false} attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </UserContextProvider>
  );
}
