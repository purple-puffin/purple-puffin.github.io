import { useRef } from 'react';
import { Form, Dropdown, DropdownProps, InputProps } from 'semantic-ui-react';
import { shallowEqual } from 'react-redux';
import { FixedSizeList } from 'react-window';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../store';
import { setCurrency, setCustomer, setDiscount, removeAllItems, removeActiveItem } from '../../store/slices/invoice-form';
import { addProductThunk, recalculateDiscountThunk, saveInvoiceThunk } from '../../store/thunks';
import { Currency, InvoiceState, currencies } from '../../models';
import CustomerFormModal from '../customer-form-modal';

import './index.css';
import ItemsTable from './items-table';

const currencyOptions = currencies.map((c) => ({ text: c.name, value: c.code }));

const showSaveMessage = (saved: boolean) => {
  toast(saved ? 'Збережено' : 'Не збережено', { type: saved ? 'success' : 'error' });
};

interface InvoiceFormProps {
  height: number;
}

const InvoiceForm = ({ height }: InvoiceFormProps) => {
  const tableRef = useRef<FixedSizeList>(null);
  const dispatch = useAppDispatch();
  const disabled = useAppSelector(s => s.invoiceForm.disabled);

  const customers = useAppSelector(s => s.customers, shallowEqual);
  const customerOptions = customers.map((customer) => ({ text: customer.name, value: customer.id }));

  const currency = useAppSelector(s => s.invoiceForm.currency);
  const onCurrencyChange: DropdownProps['onChange'] = (_, { value }) => {
    dispatch(setCurrency(value as Currency));
    dispatch(recalculateDiscountThunk);
    toast.info('Знижка перерахована');
  };

  const customerID = useAppSelector(s => s.invoiceForm.customerID);
  const onCustomerChange: DropdownProps['onChange'] = (_, { value }) => { dispatch(setCustomer(value as string)); };

  const discount = useAppSelector(s => s.invoiceForm.discount);
  const onDiscountChange: InputProps['onChange'] = (_, { value }) => { dispatch(setDiscount(value)); };

  const onRefreshDiscountClick = () => { dispatch(recalculateDiscountThunk); };
  const onRemoveActiveClick = () => { dispatch(removeActiveItem()); };
  const onRemoveAllClick = () => { dispatch(removeAllItems()); };
  const onCustomerAdded = (customerID: string) => { dispatch(setCustomer(customerID)); }

  const onAddProductClick = () => {
    const index = dispatch(addProductThunk);
    setTimeout(() => tableRef.current?.scrollToItem(index), 0);
  };

  const onSaveClick = (state: InvoiceState) => () => {
    const saved = dispatch(saveInvoiceThunk(state));
    showSaveMessage(saved);
  };

  return (
    <Form style={{ height }} className='invoice-form' disabled={disabled}>
      <Form.Group>
        <Form.Field width='10'>
          <label>Контрагент</label>
          <div className='action-dropdown-wrapper'>
            <Dropdown width='10' label='Контрагент' fluid search selection compact disabled={disabled}
              options={customerOptions} value={customerID} onChange={onCustomerChange} />
            <CustomerFormModal disabled={disabled} onSave={onCustomerAdded} />
          </div>
        </Form.Field>

        <Form.Select width='3' label='Валюта' options={currencyOptions} disabled={disabled}
          value={currency} onChange={onCurrencyChange} />

        <Form.Input type='number' width='3' label='Знижка, %' step='0.01' min='0' max='100' disabled={disabled}
          value={discount} onChange={onDiscountChange} action={{ icon: 'refresh', onClick: onRefreshDiscountClick }} />
      </Form.Group>

      <Form.Button fluid content='Додати' icon='plus' disabled={disabled} onClick={onAddProductClick} />

      <ItemsTable ref={tableRef} height={height - 245} />

      <Form.Group>
        <Form.Button fluid width='8' content='Видалити вибране' disabled={disabled} onClick={onRemoveActiveClick} />
        <Form.Button fluid width='8' content='Провести накладну' disabled={disabled} onClick={onSaveClick('issued')} />
      </Form.Group>

      <Form.Group>
        <Form.Button fluid width='8' content='Видалити все' disabled={disabled} onClick={onRemoveAllClick} />
        <Form.Button fluid width='8' content='Відкласти накладну' disabled={disabled} onClick={onSaveClick('draft')} />
      </Form.Group>
    </Form>
  );
};

export default InvoiceForm;
