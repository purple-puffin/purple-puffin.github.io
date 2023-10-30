import { useLocation, useNavigate } from 'react-router';
import { Menu, Icon } from 'semantic-ui-react';

const definition = [
  { name: 'Головна', icon: 'home', path: '/' },
  { name: 'Проведені накладні', icon: 'briefcase', path: '/invoices/issued' },
  { name: 'Відкладені накладні', icon: 'business time', path: '/invoices/draft' },
] as const;

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Menu secondary attached widths={3}>
      {definition.map(({ name, icon, path }, index) => (
        <Menu.Item key={index} onClick={() => { navigate(path); }} active={pathname === path}>
          <Icon className={icon} />
          {name}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default Header;
