import { CSSProperties, Ref, forwardRef } from 'react';
import { shallowEqual } from 'react-redux';
import { Input, InputProps } from 'semantic-ui-react';
import { FixedSizeList } from 'react-window';
import Big from 'big.js';

import { useAppDispatch, useAppSelector } from '../../store';
import { setItemQuantity, selectItem, deselectItem } from '../../store/slices/invoice-form';
import { calculateDiscountThunk } from '../../store/thunks';
import { currencyFormatters } from '../../models/currency';
import Table, { Header as TableHeader, Row as TableRow, HeaderProps, RowProps } from '../table';

const columnStyle: CSSProperties[] = [
  { flex: '0 0 2.5rem', textAlign: 'right' },
  { flex: '1' },
  { flex: '0 0 5rem', textAlign: 'right' },
  { flex: '0 0 9rem', textAlign: 'right' },
  { flex: '0 0 9rem', textAlign: 'right' },
  { flex: '0 0 9rem', textAlign: 'right' },
];


const ItemHeader = ({ style }: HeaderProps) => (
  <TableHeader style={style}>
    <div style={columnStyle[0]}>№</div>
    <div style={columnStyle[1]}>Найменування</div>
    <div style={columnStyle[2]}>К-сть</div>
    <div style={columnStyle[3]}>Ціна</div>
    <div style={columnStyle[4]}>Знижка</div>
    <div style={columnStyle[5]}>Разом</div>
  </TableHeader>
);

const ItemRow = ({ index, style }: RowProps) => {
  const dispatch = useAppDispatch();
  const disabled = useAppSelector(s => s.invoiceForm.disabled);
  const active = useAppSelector(s => s.invoiceForm.selectedItemIndex === index);
  const currency = useAppSelector(s => s.invoiceForm.currency);
  const item = useAppSelector(s => s.invoiceForm.items[index], shallowEqual);
  const product = useAppSelector(s => s.products[item.productID], shallowEqual);
  const price = new Big(product.price[currency]);
  const discountAmount = item.discountAmount && new Big(item.discountAmount);
  const totalAmount = price.times(item.quantity || 0).minus(discountAmount || 0);

  const onQuantityChange: InputProps['onChange'] = (_, { value }) => {
    dispatch(setItemQuantity({ index, quantity: value }));
    dispatch(calculateDiscountThunk(product.id));
  };

  const onRowClick = active ? () => dispatch(deselectItem()) : () => dispatch(selectItem(index));

  return <TableRow style={style} active={active} onClick={onRowClick}>
    <div style={columnStyle[0]}>
      {index + 1}
    </div>
    <div style={columnStyle[1]}>
      {product.name}
    </div>
    <div style={columnStyle[2]}>
      <Input transparent fluid type='number' min='1' step='1' disabled={disabled}
        value={item.quantity} onChange={onQuantityChange} />
    </div>
    <div style={columnStyle[3]}>
      {currencyFormatters[currency].format(price.round(2).toNumber())}
    </div>
    <div style={columnStyle[4]}>
      {discountAmount ? currencyFormatters[currency].format(discountAmount.round(2).toNumber()) : '-'}
    </div>
    <div style={columnStyle[5]}>
      {currencyFormatters[currency].format(totalAmount.round(2).toNumber())}
    </div>
  </TableRow>;
};

interface ItemsTableProps {
  height: number;
}

const ItemsTable = ({ height }: ItemsTableProps, ref: Ref<FixedSizeList>) => {
  const itemCount = useAppSelector(s => s.invoiceForm.items.length);

  return <Table ref={ref} height={height} itemCount={itemCount} renderHeader={ItemHeader} renderRow={ItemRow} />;
};

export default forwardRef(ItemsTable);
