import { AppShell, Container, MantineProvider } from "@mantine/core";
import { type AppProps, type AppType } from "next/app";
import Head from "next/head";

import Footer from "~/components/Layout/Footer";
import Header from "~/components/Layout/Header";
import AppProvider from "~/contexts/AppContext";
import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Tuneguessr</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta property="og:title" content="Tuneguessr" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Daily song guessing game" />
        <meta property="twitter:card" content="summary" />
      </Head>

      <AppProvider>
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
                paddingLeft: 4,
                paddingRight: 4,
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
      </AppProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
