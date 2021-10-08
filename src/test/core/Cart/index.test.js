import Product from 'core/Cart/Product';
import Cart from 'core/Cart';

let data;
let product;
let cart;

beforeEach(() => {
  data = {
    sku: 'product_sku',
    name: 'product_name',
    price: 0.14,
  };
  product = new Product(data);
  cart = new Cart();
});

describe('', () => {
  test('products', () => {
    expect(cart.products).toStrictEqual([]);
  });
});

describe('', () => {
  test('total', () => {
    expect(cart.total).toBe(0);
  });
});

describe('total overflow', () => {
  test('add product 1', () => {
    cart.add(product);
    expect(cart.total).toBe(0.14);
  });

  test('add product 2', () => {
    for (let i = 0; i < 2; i += 1) {
      cart.add(product);
    }
    expect(cart.total).toBe(0.28);
  });

  test('add product 3', () => {
    for (let i = 0; i < 3; i += 1) {
      cart.add(product);
    }
    expect(cart.total).toBe(0.42);
  });
});
