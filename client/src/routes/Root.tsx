import { AppShell, Container } from '@mantine/core';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import Navbar from '../components/Layout/Navbar';

export default function Root() {
  const [opened, setOpened] = useState(false);
  const user = false;

  return (
    <AppShell
      fixed
      header={<Header opened={opened} setOpened={setOpened} />}
      navbar={user ? <Navbar opened={opened} setOpened={setOpened} /> : <div />}
      footer={<Footer />}
      layout="alt"
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <Container size="lg">
        <Outlet />
      </Container>
    </AppShell>
  );
}
