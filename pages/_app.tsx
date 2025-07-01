import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from "@/lib/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const { emotionCache = clientSideEmotionCache, ...propsLeft } = pageProps;
  return (
  <CacheProvider value={emotionCache}>
    <Component {...propsLeft} />
  </CacheProvider>
  );
}

export default MyApp;
