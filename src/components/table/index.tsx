import { ComponentType, CSSProperties, HTMLAttributes, Ref, useState, forwardRef } from 'react';
import { ListChildComponentProps, FixedSizeList } from 'react-window';
import classNames from 'classnames';

import './index.css';
import Body, { BodyProps } from './body';

export interface HeaderProps {
  style: CSSProperties;
}

export type RowProps = ListChildComponentProps;

interface TableOwnProps {
  height: number;
  renderHeader: ComponentType<HeaderProps>;
  renderStatus?: ComponentType<HeaderProps>;
  status?: true;
}

type TableProps = TableOwnProps & Pick<BodyProps, 'itemCount' | 'renderRow'>;

const Table = ({ height, renderHeader: Header, renderStatus: Status, ...props }: TableProps, ref: Ref<FixedSizeList>) => {
  const [headerPadding, setHeaderPadding] = useState(0);

  return <>
    <Header style={{ paddingRight: headerPadding }} />
    <Body ref={ref} height={height - 37} {...props} onScrollbarOffsetChange={setHeaderPadding} />
    {Status && <Status style={{ paddingRight: headerPadding }} />}
  </>;
};

export const Header = (props: HTMLAttributes<HTMLDivElement>) => (
  <div className='custom-table__header' {...props} />
);

export const Row = ({ active, ...props }: HTMLAttributes<HTMLDivElement> & { active?: boolean; }) => (
  <div className={classNames('custom-table__item', { active })} {...props} />
);

export default forwardRef(Table);
