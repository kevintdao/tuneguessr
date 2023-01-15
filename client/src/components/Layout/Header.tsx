import {
  ActionIcon,
  Burger,
  Group,
  Header,
  MediaQuery,
  Text,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface Props {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LayoutHeader({ opened, setOpened }: Props) {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <Header height={60} p="xs" sx={{ left: 0 }}>
      <Group style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger opened={opened} onClick={() => setOpened((o) => !o)} size="sm" color={theme.colors.gray[6]} />
        </MediaQuery>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <Text
            fw={700}
            fz="xl"
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
            sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
          >
            Tuneguessr
          </Text>
        </Link>

        <Tooltip position="right" withArrow label={dark ? 'Light mode' : 'Dark mode'}>
          <ActionIcon variant="outline" onClick={() => toggleColorScheme()}>
            {dark ? <MdLightMode /> : <MdDarkMode />}
          </ActionIcon>
        </Tooltip>
      </Group>
    </Header>
  );
}
