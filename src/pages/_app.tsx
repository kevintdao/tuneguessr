import { AppShell, Container, MantineProvider } from "@mantine/core";
import { type AppProps, type AppType } from "next/app";
import Head from "next/head";

import Footer from "~/components/Layout/Footer";
import Header from "~/components/Layout/Header";
import AppProvider from "~/contexts/AppContext";
import PlayerProvider from "~/contexts/PlayerContext";
import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>TuneGuessr</title>
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta property="og:title" content="TuneGuessr" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Daily song guessing game" />
        <meta property="twitter:card" content="summary" />
      </Head>

      <AppProvider>
        <PlayerProvider>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: "light",
              fontFamily: "sans-serif",
              fontFamilyMonospace: "Monaco, Courier, monospace",
              headings: { fontFamily: "sans-serif" },
            }}
          >
            <AppShell
              fixed
              header={<Header />}
              footer={<Footer />}
              layout="alt"
              styles={(theme) => ({
                main: {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[8]
                      : theme.colors.gray[0],
                },
              })}
            >
              <Container size="lg" p={0}>
                <Component {...pageProps} />
              </Container>
            </AppShell>
          </MantineProvider>
        </PlayerProvider>
      </AppProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
