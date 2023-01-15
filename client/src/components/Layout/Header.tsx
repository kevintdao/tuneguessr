import { ActionIcon, Burger, Group, Header, MediaQuery, Text, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

type Props = {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LayoutHeader({ opened, setOpened }: Props) {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <Header height={60} p="xs">
      <Group style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger opened={opened} onClick={() => setOpened((o) => !o)} size="sm" color={theme.colors.gray[6]} />
        </MediaQuery>

        <Text
          fw={700}
          fz="xl"
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
          sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
        >
          Tuneguessr
        </Text>

        <ActionIcon variant="outline" onClick={() => toggleColorScheme()} title="Toggle color scheme">
          {dark ? <MdLightMode /> : <MdDarkMode />}
        </ActionIcon>
      </Group>
    </Header>
  );
}
