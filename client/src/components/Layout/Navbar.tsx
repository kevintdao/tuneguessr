import { Drawer, Navbar, NavLink } from '@mantine/core';
import { MdHome, MdVideogameAsset } from 'react-icons/md';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

type LinkProps = {
  label: string;
  icon: React.ReactNode;
  to: string;
  onClick: () => void;
  children?: React.ReactNode;
  props?: React.ReactPropTypes;
};

type SidebarProps = {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

function CustomLink({ label, icon, to, children, ...props }: LinkProps) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <NavLink component={Link} to={to} label={label} icon={icon} active={!!isActive} {...props}>
      {children}
    </NavLink>
  );
}

const data = [
  { link: '/', label: 'Home', icon: <MdHome className="h-5 w-5" /> },
  { link: '/games', label: 'Games', icon: <MdVideogameAsset className="h-5 w-5" /> },
];

export default function LayoutSidebar({ opened, setOpened }: SidebarProps) {
  const links = data.map((item) => (
    <CustomLink key={item.link} to={item.link} onClick={() => setOpened(false)} label={item.label} icon={item.icon} />
  ));

  if (opened) {
    return (
      <Drawer opened={opened} onClose={() => setOpened(false)}>
        {links}
      </Drawer>
    );
  }

  return (
    <Navbar hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 250 }}>
      <Navbar.Section>{links}</Navbar.Section>
    </Navbar>
  );
}
