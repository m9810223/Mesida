import Site from 'core/Site';

describe('example.test', () => {
  test('constructor', () => {
    expect(new Site()?.constructor.name).toBe('Site');
  });

  test('overflow', () => {
    expect(60.12 + 0.12).toStrictEqual(60.239999999999995);
  });

  test('object', () => {
    expect({}).toStrictEqual({});
    expect({}).not.toBe({});
  });
});

// describe('', () => {
//   test('', () => {
//     expect().toStrictEqual();
//   });
// });

// describe('', () => {
//   test('', () => {
//     expect('').toBe('');
//   });
// });

// let productInfo;
// beforeEach(() => {
//   productInfo = {
//     title: 'productName',
//     sku: 'productSKU',
//     price: 100,
//     qty: 1,
//   };
// });

//

// // beforeAll x 1
// beforeAll(() => {});

// // ( beforeEach + describe + afterEach ) x N
// beforeEach(() => {});

// describe('describe 1', () => {
//   // beforeAll x 1
//   beforeAll(() => {});

//   // ( beforeEach + test + afterEach ) x N
//   beforeEach(() => {});
//   test('test 1', () => {});
//   afterEach(() => {});

//   // ( beforeEach + test + afterEach ) ...

//   // afterAll x 1
//   afterAll(() => {});
// });

// afterEach(() => {});

// // ( beforeEach + describe + afterEach ) ...

// // afterAll x 1
// afterAll(() => {});
