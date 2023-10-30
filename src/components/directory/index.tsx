import { shallowEqual } from 'react-redux';

import { useAppSelector } from '../../store';
import Table from '../table';

import Header from './header';
import GroupItem from './group-item';
import ProductItem from './product-item';

interface DirectoryProps {
  height: number;
}

const Directory = ({ height }: DirectoryProps) => {
  const { groups, productIDs } = useAppSelector(({ directory: { currentPath, structure } }) => {
    if (!currentPath.length) return structure;
    return currentPath.reduce((parent, name) => parent.groups.find(x => x.name === name)!, structure);
  }, shallowEqual);

  return <Table
    height={height}
    itemCount={groups.length + productIDs.length}
    renderHeader={Header}
    renderRow={({ index, style }) => {
      return index < groups.length
        ? <GroupItem style={style} group={groups[index]} />
        : <ProductItem style={style} id={productIDs[index - groups.length]} />;
    }}
  />;
};

export default Directory;
