import { CSSProperties } from 'react';
import { Icon } from 'semantic-ui-react';
import { shallowEqual } from 'react-redux';
import Big from 'big.js';

import { useAppDispatch, useAppSelector } from '../../store';
import { deselectProduct, selectProduct } from '../../store/slices/directory';
import { currencyFormatters } from '../../models/currency';
import { Row } from '../table';

import columnStyle from './columnStyle';

interface ProductItemProps {
  id: string;
  style: CSSProperties;
}

const ProductItem = ({ id, style }: ProductItemProps) => {
  const dispatch = useAppDispatch();
  const currency = useAppSelector(s => s.invoiceForm.currency);
  const selectedProductID = useAppSelector(s => s.directory.selectedProductID);
  const product = useAppSelector(s => s.products[id], shallowEqual);
  const price = new Big(product.price[currency]).round(2).toNumber();

  const active = selectedProductID === product.id;
  const onClick = active ? () => dispatch(deselectProduct()) : () => dispatch(selectProduct(product.id));

  return (
    <Row style={style} active={active} onClick={onClick}>
      <div style={columnStyle[0]}><Icon name='cube' />{product.name}</div>
      <div style={columnStyle[1]}>{currencyFormatters[currency].format(price)}</div>
      <div style={columnStyle[2]}>{product.stock}</div>
    </Row>
  );
};

export default ProductItem;
