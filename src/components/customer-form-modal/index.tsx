import { useEffect, useState, ChangeEvent } from 'react';
import { shallowEqual } from 'react-redux';
import { Button, Form, Modal, InputProps } from 'semantic-ui-react';
import TextareaAutosize from 'react-textarea-autosize';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../store';
import { setField, clearForm, NewCustomer } from '../../store/slices/customer-form';
import { saveCustomerThunk } from '../../store/thunks';

const showSaveMessage = (saved: boolean) => {
  toast(saved ? 'Збережено' : 'Не збережено', { type: saved ? 'success' : 'error' });
};

interface CustomerFormModalProps {
  disabled: boolean;
  onSave: (customerID: string) => void;
}

const CustomerFormModal = ({ disabled, onSave }: CustomerFormModalProps) => {
  const dispatch = useAppDispatch();
  const form = useAppSelector(s => s.customerForm, shallowEqual);
  const [open, setOpen] = useState(false);

  useEffect(() => { disabled && open && setOpen(false); }, [disabled, open, setOpen]);

  const onCancelClick = () => {
    dispatch(clearForm());
    setOpen(false);
  };

  const onSaveClick = () => {
    const customerID = dispatch(saveCustomerThunk);
    if (customerID) {
      showSaveMessage(true);
      setOpen(false);
      onSave(customerID);
    } else {
      showSaveMessage(false);
    }
  };

  const onFieldChange = (name: keyof NewCustomer): InputProps['onChange'] => (_, { value }) => {
    dispatch(setField({ name, value }));
  };

  const onNoteChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setField({ name: 'note', value: e.target.value }));
  };

  const trigger = <Button icon='plus' disabled={disabled} />;

  return (
    <Modal className='fullscreen' open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)} trigger={trigger}>
      <Modal.Header>Новий контрагент</Modal.Header>
      <Modal.Content>
        <Form disabled={form.disabled}>
          <Form.Input disabled={form.disabled} label='Найменування' required autoFocus
            value={form.name} onChange={onFieldChange('name')} />
          <Form.Input disabled={form.disabled} label='Телефон'
            value={form.phone} onChange={onFieldChange('phone')} />
          <Form.Input disabled={form.disabled} label='Ідентифікаційний номер'
            value={form.inn} onChange={onFieldChange('inn')} />
          <Form.Input disabled={form.disabled} label='Номер документа'
            value={form.document} onChange={onFieldChange('document')} />
          <Form.Field disabled={form.disabled} label='Примітка' control={TextareaAutosize}
            value={form.note} onChange={onNoteChange} maxRows={10} />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button disabled={form.disabled} onClick={onCancelClick} content='Скасувати' />
        <Button positive disabled={form.disabled} onClick={onSaveClick} content='Зберегти' />
      </Modal.Actions>
    </Modal>
  );
};

export default CustomerFormModal;
