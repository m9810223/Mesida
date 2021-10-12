import Product from 'core/Cart/Product';

let data;

beforeEach(() => {
  data = {};
  Object.defineProperty(window, 'tagtoo_advertiser_id', { value: 2, writable: true });
  Object.defineProperty(window, 'location', {
    value: { href: 'https://example.com/product' },
    writable: true,
  });
});

test('Variant', () => {
  data = {
    sku: 'product_sku',
    name: 'product_name',
    variants: [
      {
        color: 'color',
        no: 'no!!!!!!!!!!!!!!!!!!!!!!!!!',
      },
    ],
  };
  expect(new Product(data)).toEqual({
    siteId: 2,
    sku: 'product_sku',
    name: 'product_name',
    price: 0,
    live: true,
    url: 'https://example.com/product',
    variants: [
      {
        color: 'color',
      },
    ],
  });
});

test('product', () => {
  data = {
    sku: 'product_sku',
    name: 'product_name',
  };
  expect(new Product(data)).toEqual({
    siteId: 2,
    sku: 'product_sku',
    name: 'product_name',
    price: 0,
    live: true,
    url: 'https://example.com/product',
  });
});

describe('siteId', () => {
  test('undefined', () => {
    data.siteId = undefined;
    window.tagtoo_advertiser_id = 3;
    expect(new Product(data).siteId).toBe(3);
  });
  test('num 0', () => {
    data.siteId = 0;
    expect(new Product(data).siteId).toBe(0);
  });
  test('str 0', () => {
    data.siteId = '0';
    expect(new Product(data).siteId).toBe(0);
  });
  test('num 1', () => {
    data.siteId = 1;
    expect(new Product(data).siteId).toBe(1);
  });
  test('str 1', () => {
    data.siteId = '1';
    expect(new Product(data).siteId).toBe(1);
  });
});

describe('url', () => {
  test('undefined', () => {
    data.url = undefined;
    expect(new Product(data).url).toBe('https://example.com/product');
  });
  test('str', () => {
    data.url = 'str';
    expect(new Product(data).url).toBe('str');
  });
});

describe('price', () => {
  test('', () => {
    expect(new Product(data).price).toBe(0);
  });
  test('null', () => {
    data.price = null;
    expect(new Product(data).price).toBe(0);
  });
  test('undefined', () => {
    data.price = undefined;
    expect(new Product(data).price).toBe(0);
  });
  test('NaN', () => {
    data.price = NaN;
    expect(new Product(data).price).toBe(0);
  });
  test('num 0', () => {
    data.price = 0;
    expect(new Product(data).price).toBe(0);
  });
  test('str 0', () => {
    data.price = '0';
    expect(new Product(data).price).toBe(0);
  });
  test('[]', () => {
    data.price = [];
    expect(new Product(data).price).toBe(0);
  });
  test('{}', () => {
    data.price = {};
    expect(new Product(data).price).toBe(0);
  });
  test('float 1.234', () => {
    data.price = 1.234;
    expect(new Product(data).price).toBe(1.23);
  });
  test('str 1.234', () => {
    data.price = '1.234';
    expect(new Product(data).price).toBe(1.23);
  });
  test('str aaaa', () => {
    data.price = 'aaaa';
    expect(new Product(data).price).toBe(0);
  });
  test('num -1', () => {
    data.price = -1;
    expect(new Product(data).price).toBe(0);
  });
  test('str -1', () => {
    data.price = '-1';
    expect(new Product(data).price).toBe(0);
  });
  test('num -1.234', () => {
    data.price = -1.234;
    expect(new Product(data).price).toBe(0);
  });
  test('str -1.234', () => {
    data.price = '-1.234';
    expect(new Product(data).price).toBe(0);
  });
});

describe('origPrice', () => {
  test('undefined', () => {
    data.origPrice = undefined;
    expect(new Product(data).origPrice).toBe(undefined);
  });
  test('null', () => {
    data.origPrice = null;
    expect(new Product(data).origPrice).toBe(undefined);
  });
  test('num 0', () => {
    data.origPrice = 0;
    expect(new Product(data).origPrice).toBe(undefined);
  });
  test('num 1', () => {
    data.origPrice = 1;
    expect(new Product(data).origPrice).toBe(1);
  });
  test('str 0', () => {
    data.origPrice = '0';
    expect(new Product(data).origPrice).toBe(undefined);
  });
  test('str 1', () => {
    data.origPrice = '1';
    expect(new Product(data).origPrice).toBe(1);
  });
  test('num 1.234', () => {
    data.origPrice = 1.234;
    expect(new Product(data).origPrice).toBe(1.23);
  });
  test('str 1.234', () => {
    data.origPrice = '1.234';
    expect(new Product(data).origPrice).toBe(1.23);
  });
});

describe('live', () => {
  test('undefined', () => {
    data.live = undefined;
    expect(new Product(data).live).toBe(true);
  });
  test('null', () => {
    data.live = null;
    expect(new Product(data).live).toBe(false);
  });
  test('num 0', () => {
    data.live = 0;
    expect(new Product(data).live).toBe(false);
  });
  test('num 1', () => {
    data.live = 1;
    expect(new Product(data).live).toBe(true);
  });
  test('str 0', () => {
    data.live = '0';
    expect(new Product(data).live).toBe(false);
  });
  test('str 1', () => {
    data.live = '1';
    expect(new Product(data).live).toBe(true);
  });
  test('NaN', () => {
    data.live = NaN;
    expect(new Product(data).live).toBe(false);
  });
});

describe('queryString', () => {
  beforeEach(() => {
    data = {
      sku: 'product_sku',
      name: 'product_name',
    };
    window.tagtoo_advertiser_id = 6;
  });
  test('', () => {
    expect(new Product(data).queryString()).toBe(
      [
        //
        'aid=6',
        'tl=product_name',
        'pk=product_sku',
        'dl=https%3A%2F%2Fexample.com%2Fproduct',
        'p=0',
        'lv=true',
      ].join('&')
    );
  });
  test('', () => {
    data = {
      sku: 'product_sku',
      name: 'product_name',
      price: 200,
      url: 'https://url.com/1',
    };
    window.tagtoo_advertiser_id = 6;
    expect(new Product(data).queryString()).toBe(
      [
        //
        'aid=6',
        'tl=product_name',
        'pk=product_sku',
        `dl=${encodeURIComponent('https://url.com/1')}`,
        'p=200',
        'lv=true',
      ].join('&')
    );
  });
  test('Variant', () => {
    data = {
      sku: 'product_sku',
      name: 'product_name',
      price: 200,
      url: 'https://url.com/1',
      variants: [
        {
          color: 'color',
          no: 'no!!!!!!!!!!!!!!!!!!!!!!!!!',
        },
      ],
    };
    window.tagtoo_advertiser_id = 7;
    expect(new Product(data).queryString()).toBe(
      [
        //
        'aid=7',
        'tl=product_name',
        'pk=product_sku',
        `dl=${encodeURIComponent('https://url.com/1')}`,
        'p=200',
        `va=${encodeURIComponent(
          JSON.stringify([
            {
              color: 'color',
            },
          ])
        )}`,
        'lv=true',
      ].join('&')
    );
  });
});
