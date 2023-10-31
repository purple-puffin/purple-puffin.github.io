import Big from 'big.js';
import { fakerUK as faker } from '@faker-js/faker';
import { Customer, Group, Product } from '../models';

const buildArray = <T>(fn: () => T, length: number): T[] => {
  return Array.from({ length }, fn);
};

const fakeProduct = (): Product => {
  const price = faker.commerce.price();
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: { USD: price, UAH: new Big(price).mul(36.5686).toString() },
    stock: faker.number.int({ min: 0, max: 100 }),
    path: [],
  };
};

export const products = buildArray(fakeProduct, 500);
let productIdx = 0;

const nextProduct = (path: string[]): Product => {
  const product = products[productIdx++];
  product.path = path;
  return product;
};

const fakeGroup = (groupsCount: number, productsCount: number, path: string[]): Group => {
  const name = faker.commerce.department();
  const nextPath = [...path, name];

  return ({
    name,
    productIDs: buildArray(() => nextProduct(nextPath).id, productsCount),
    groups: buildArray(() => fakeGroup(groupsCount - 1, productsCount, nextPath), groupsCount),
  })
};

export const directory: Group = {
  name: '',
  groups: buildArray(() => fakeGroup(3, 5, []), 5),
  productIDs: buildArray(() => nextProduct([]).id, products.length - productIdx),
};

const fakeCustomer = (): Customer => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
});

export const customers: Customer[] = [
  { id: 'default', name: 'Кінцевий споживач' },
  ...buildArray(fakeCustomer, 5),
];
