import { AppShell, Container, MantineProvider } from "@mantine/core";
import { type AppProps, type AppType } from "next/app";
import Head from "next/head";

import Footer from "~/components/Layout/Footer";
import Header from "~/components/Layout/Header";
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
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
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
          <Container size="lg">
            <Component {...pageProps} />
          </Container>
        </AppShell>
      </MantineProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
