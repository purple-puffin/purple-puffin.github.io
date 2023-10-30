import { useAppSelector } from '../../store';
import { Header, HeaderProps } from '../table';

import PathBreadcrumb from './path-breadcrumb';
import columnStyle from './columnStyle';

const ListHeader = ({ style }: HeaderProps) => {
  const pathLength = useAppSelector(s => s.directory.currentPath.length);

  return (
    <Header style={style}>
      <div style={columnStyle[0]}>{pathLength ? <PathBreadcrumb /> : 'Найменування'}</div>
      <div style={columnStyle[1]}>Ціна</div>
      <div style={columnStyle[2]}>К-сть</div>
    </Header>
  );
};

export default ListHeader;
