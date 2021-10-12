import { getDateType, encode, decode } from 'core/Storage/codec';

let data;

describe('dateType', () => {
  test('', () => {
    expect(getDateType(undefined)).toBe('undefined');
  });
  test('', () => {
    expect(getDateType(null)).toBe('null');
  });
  test('', () => {
    expect(getDateType(true)).toBe('boolean');
  });
  test('', () => {
    expect(getDateType(1)).toBe('number');
  });
  test('', () => {
    expect(getDateType('1')).toBe('string');
  });
  test('', () => {
    expect(getDateType('str')).toBe('string');
  });
  test('', () => {
    data = new Date();
    expect(getDateType(data)).toBe('date');
  });
  test('', () => {
    expect(getDateType([])).toBe('array');
  });
  test('', () => {
    expect(getDateType({})).toBe('object');
  });
});

describe('encode -> decode', () => {
  test('undefined', () => {
    data = undefined;
    expect(decode(encode(data))).toBe(data);
  });
  test('null', () => {
    data = null;
    expect(decode(encode(data))).toBe(data);
  });
  test('true', () => {
    data = true;
    expect(decode(encode(data))).toBe(data);
  });
  test('str 1', () => {
    data = '1';
    expect(decode(encode(data))).toBe(data);
  });
  test('num 1', () => {
    data = 1;
    expect(decode(encode(data))).toBe(data);
  });
  test('date', () => {
    data = new Date();
    expect(decode(encode(data))).toStrictEqual(data);
  });
  test('array', () => {
    data = [1, 2, 3, [3, 4, 5]];
    expect(decode(encode(data))).toStrictEqual(data);
  });
  test('obj', () => {
    data = { 3: [1, 2, {}] };
    expect(decode(encode(data))).toStrictEqual(data);
  });
});
