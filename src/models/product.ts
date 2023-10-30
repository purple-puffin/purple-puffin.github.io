import Currency from "./currency";

export default interface Product {
  id: string;
  name: string;
  price: Record<Currency, string>;
  stock: number;
}
