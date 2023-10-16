import React from "react";

import { AppProps } from "next/app";
// import { DarkModeProvider } from "../lib/DarkModeContext";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
