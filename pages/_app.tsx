import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { Layout } from '../components/Layout/Layout';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Zitrone: DAO Events</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <MantineProvider
        theme={{
          colorScheme: 'dark',
          primaryColor: 'lime',
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Layout>
          <MantineProvider>
            <NotificationsProvider>
              <Component {...pageProps} />
            </NotificationsProvider>
          </MantineProvider>
        </Layout>
      </MantineProvider>
    </>
  );
}
