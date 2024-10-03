import 'antd/dist/antd.css';
import type {AppProps} from 'next/app';
import NextNprogress from 'nextjs-progressbar';
import SimpleReactLightbox from 'simple-react-lightbox';
import {createGlobalStyle, ThemeProvider} from 'styled-components';

import theme from 'theme';
import {colors} from 'utils/colors';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: 'Inter';
  }
`;

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <SimpleReactLightbox>
          <Component {...pageProps} />
        </SimpleReactLightbox>
      </ThemeProvider>
      <NextNprogress
        color={colors.coreOrange}
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
    </>
  );
}

export default MyApp;
