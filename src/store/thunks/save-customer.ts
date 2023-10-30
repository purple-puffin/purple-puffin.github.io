import { v4 as uuidv4 } from 'uuid';

import { AppThunk } from '..';
import { saveCustomer } from '../slices/customers';
import { clearForm, setDisabled, State as FormState } from '../slices/customer-form';

const validate = (form: FormState) => {
  if (!form.name) return false;
  return true;
};

const saveCustomerThunk: AppThunk<string | undefined> = (dispatch, getState) => {
  dispatch(setDisabled(true));

  const { customerForm } = getState();
  if (!validate(customerForm)) {
    dispatch(setDisabled(false));
    return;
  }

  const id = uuidv4();
  dispatch(saveCustomer({
    id,
    name: customerForm.name,
    phone: customerForm.phone,
    inn: customerForm.inn,
    document: customerForm.document,
    note: customerForm.note,
  }));
  dispatch(clearForm());
  dispatch(setDisabled(false));
  return id;
};

export default saveCustomerThunk;
