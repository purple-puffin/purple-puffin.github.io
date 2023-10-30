import Currency from './currency';
import InvoiceItem from './invoice-item';

export type InvoiceState = 'draft' | 'issued';

export default interface Invoice {
  state: InvoiceState;
  customerID: string;
  currency: Currency;
  items: InvoiceItem[];
  createdAt: string;
}
