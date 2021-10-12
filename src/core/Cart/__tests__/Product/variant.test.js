import Variant from 'core/Cart/Product/Variant';

let data;

beforeEach(() => {
  data = {};
});

describe('', () => {
  beforeEach(() => {
    data = {
      color: 'color',
      no: 'no!!!!!!!!!!!!!!!!!!!!!!!!!',
    };
  });
  test('', () => {
    expect(new Variant(data)).toEqual({
      color: 'color',
    });
  });
});
