import Big from 'big.js';
import { CSSProperties } from 'react';
import { useParams } from 'react-router';
import { shallowEqual } from 'react-redux';

import useWindowSize from '../../hooks/use-window-size';
import { useAppSelector } from '../../store';
import { InvoiceState } from '../../models';
import { currencyFormatters } from '../../models/currency';
import Table, { Header as TableHeader, Row as TableRow, HeaderProps, RowProps } from '../../components/table';

const useStateParam = () => {
  const params = useParams<{ state: InvoiceState; }>();
  return params.state || 'issued';
};

const columnStyle: CSSProperties[] = [
  { flex: '1' },
  { flex: '0 1 25%', minWidth: '9rem', textAlign: 'right' },
  { flex: '0 1 25%', minWidth: '9rem', textAlign: 'right' },
];

const InvoiceHeader = ({ style }: HeaderProps) => (
  <TableHeader style={style}>
    <div style={columnStyle[0]}>Контрагент</div>
    <div style={columnStyle[1]}>Дата</div>
    <div style={columnStyle[2]}>Сума</div>
  </TableHeader>
);

const InvoiceRow = ({ index, style }: RowProps) => {
  const state = useStateParam();
  const invoice = useAppSelector(s => s.invoices[state][index], shallowEqual);
  const products = useAppSelector(s => s.products, shallowEqual);
  const customerName = useAppSelector(s => s.customers.find(c => c.id === invoice.customerID)!.name);

  const total = invoice.items.reduce((acc, item) => {
    const price = products[item.productID].price[invoice.currency];
    return acc.plus(price).times(item.quantity || 0).minus(item.discountAmount || 0);
  }, new Big(0));

  return <TableRow style={style}>
    <div style={columnStyle[0]}>
      {customerName}
    </div>
    <div style={columnStyle[1]}>
      {new Date(invoice.createdAt).toLocaleString()}
    </div>
    <div style={columnStyle[2]}>
      {currencyFormatters[invoice.currency].format(total.round(2).toNumber())}
    </div>
  </TableRow>;
};

const InvoicesPage = () => {
  const state = useStateParam();
  const { height } = useWindowSize();
  const itemCount = useAppSelector(s => s.invoices[state].filter(x => x.state === state).length);

  return <Table height={height - 40} itemCount={itemCount} renderHeader={InvoiceHeader} renderRow={InvoiceRow} />;
};

export default InvoicesPage;
