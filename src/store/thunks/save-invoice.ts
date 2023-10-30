import { AppThunk } from '..';
import { saveInvoice } from '../slices/invoices';
import { clearForm, setDisabled, State as InvoiceFormState } from '../slices/invoice-form';
import { InvoiceState } from '../../models';

const validate = ({ items }: InvoiceFormState) => {
  if (items.length === 0) return false;
  if (items.some((x) => Number(x.quantity) <= 0)) return false;
  return true;
}

const saveInvoiceThunk = (state: InvoiceState): AppThunk<boolean> => (dispatch, getState) => {
  dispatch(setDisabled(true));

  const { invoiceForm } = getState();
  if (!validate(invoiceForm)) {
    dispatch(setDisabled(false));
    return false;
  }

  dispatch(saveInvoice({
    state: state,
    customerID: invoiceForm.customerID,
    currency: invoiceForm.currency,
    items: invoiceForm.items,
    createdAt: new Date().toISOString(),
  }));
  dispatch(clearForm());
  dispatch(setDisabled(false));
  return true;
};

export default saveInvoiceThunk;
