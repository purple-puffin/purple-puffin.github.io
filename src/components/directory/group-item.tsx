import { CSSProperties } from 'react';
import { Icon } from 'semantic-ui-react';

import { useAppDispatch } from '../../store';
import { deselectProduct, goForward } from '../../store/slices/directory';
import { Group } from '../../models';
import { Row } from '../table';

import columnStyle from './columnStyle';

interface GroupItemProps {
  group: Group;
  style: CSSProperties;
}

const GroupItem = ({ group, style }: GroupItemProps) => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(deselectProduct());
    dispatch(goForward(group.name));
  };

  return (
    <Row style={style} onClick={onClick}>
      <div style={columnStyle[0]}>
        <Icon name='folder' />
        {group.name}
      </div>
    </Row>
  );
};

export default GroupItem;
