import { AppShell } from '@mantine/core';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
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
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <Outlet />
    </AppShell>
  );
}
