import Product from './Product';

export default class Cart {
  #fields = [
    //
    'products',
    // 'productType',
    'currency',
    'payment',
    'orderId',
  ];

  constructor({
    //
    products = [],
    total = 0,
    orderId = '',
    payment = '',
    currency = undefined,
  } = {}) {
    this.products = [...products];
    this.total = Number((Number(total) || 0).toFixed(2));
    this.orderId = String(orderId) || undefined;
    this.payment = String(payment) || undefined;
    this.currency = String(currency) || undefined;
    this.#fields.forEach((field) => {
      if (this[field] === undefined) {
        delete this[field];
      }
    });
  }

  add(...products) {
    products.forEach((product) => {
      this.products.push(product?.constructor === Product ? product : new Product(product));
      this.total += product.price;
      this.total = Number(Number(this.total).toFixed(2));
    });
  }
}
