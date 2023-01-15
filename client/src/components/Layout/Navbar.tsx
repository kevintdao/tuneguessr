import { ActionIcon, Box, Drawer, Navbar, NavLink, Tooltip } from '@mantine/core';
import { useState } from 'react';
import { MdHelp, MdHome, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdVideogameAsset } from 'react-icons/md';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

interface LinkProps {
  label: string;
  icon: React.ReactNode;
  to: string;
  tooltip: boolean;
  onClick: () => void;
  children?: React.ReactNode;
  props?: React.ReactPropTypes;
}

interface Props {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

function CustomLink({ label, icon, to, tooltip, children, ...props }: LinkProps) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return tooltip ? (
    <Tooltip label={label} position="right" withArrow>
      <NavLink component={Link} to={to} label={label} icon={icon} active={!!isActive} {...props}>
        {children}
      </NavLink>
    </Tooltip>
  ) : (
    <NavLink component={Link} to={to} label={label} icon={icon} active={!!isActive} {...props}>
      {children}
    </NavLink>
  );
}

const data = [
  { link: '/', label: 'Home', icon: <MdHome size={20} /> },
  { link: '/games', label: 'Games', icon: <MdVideogameAsset size={20} /> },
  { link: '/help', label: 'Help', icon: <MdHelp size={20} /> },
];

export default function LayoutNavbar({ opened, setOpened }: Props) {
  const [full, setFull] = useState(false);

  const links = data.map((item) => (
    <CustomLink
      key={item.link}
      to={item.link}
      onClick={() => setOpened(false)}
      label={item.label}
      icon={item.icon}
      tooltip={!full && !opened}
    />
  ));

  if (opened) {
    return (
      <Drawer opened={opened} onClose={() => setOpened(false)}>
        {links}
      </Drawer>
    );
  }

  return full ? (
    <Navbar hiddenBreakpoint="sm" hidden width={{ sm: 200, lg: 250 }} sx={{ top: 60 }}>
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <ActionIcon onClick={() => setFull(!full)} size="xl">
          <MdKeyboardArrowLeft size={24} />
        </ActionIcon>
      </Box>

      <Navbar.Section>{links}</Navbar.Section>
    </Navbar>
  ) : (
    <Navbar hiddenBreakpoint="sm" width={{ sm: 40, md: 40 }} hidden sx={{ top: 60 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <ActionIcon onClick={() => setFull(!full)} size="xl">
          <MdKeyboardArrowRight size={24} />
        </ActionIcon>
      </Box>
      <Navbar.Section grow>{links}</Navbar.Section>
    </Navbar>
  );
}
