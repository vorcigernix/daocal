import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider, ColorScheme } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import '@rainbow-me/rainbowkit/styles.css';
import {
  darkTheme,
  Theme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import merge from 'lodash.merge';
import { chain, createClient, configureChains, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { Layout } from '../components/Layout/Layout';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID })]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const myTheme = merge(darkTheme(), {
  colors: {
    accentColor: '#83c224',
  },
} as Theme);

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const colorScheme = 'dark';

  return (
    <>
      <Head>
        <title>Zitrone: DAO Events</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

        <MantineProvider
          theme={{
            colorScheme,
            fontFamily: 'Noto, sans-serif',
            fontFamilyMonospace: 'Monaco, Courier, monospace',
            headings: { fontFamily: 'Inter, sans-serif' },
            colors: {
              brand: [
                '#f1fde0',
                '#dcf4b9',
                '#c7eb91',
                '#b1e367',
                '#9cdb3d',
                '#83c224',
                '#65971a',
                '#486c10',
                '#2a4106',
                '#0c1700',
              ],
            },
            primaryColor: 'brand',
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains} theme={myTheme}>
              <Layout>
                <NotificationsProvider>
                  <Component {...pageProps} />
                </NotificationsProvider>
              </Layout>
            </RainbowKitProvider>
          </WagmiConfig>
        </MantineProvider>
    </>
  );
}
