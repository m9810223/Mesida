import StorageForTest from 'core/Storage/Storages/Cookie';

let storageForTest;
let cookieSet;
let cookieGet;

beforeEach(() => {
  storageForTest = new StorageForTest();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('toHaveBeenCalled', () => {
  beforeEach(() => {
    cookieSet = jest.spyOn(document, 'cookie', 'set');
    cookieGet = jest.spyOn(document, 'cookie', 'get');
  });
  test('set', () => {
    storageForTest.set('k', 'v');
    expect(cookieSet).toHaveBeenCalled();
  });
  test('get', () => {
    storageForTest.get('k');
    expect(cookieGet).toHaveBeenCalled();
  });
  test('remove', () => {
    storageForTest.remove('k');
    expect(cookieSet).toHaveBeenCalled();
  });
  test('clear', () => {
    storageForTest.set('k', 'v');
    expect(cookieSet).toHaveBeenCalled();
    cookieSet.mockClear();
    storageForTest.clear();
    expect(cookieSet).toHaveBeenCalled();
  });
});

describe('', () => {
  test('expire', async () => {
    storageForTest = new StorageForTest(1);
    storageForTest.set('k', 'v');
    expect(storageForTest.get('k')).toBe('v');
    await new Promise((r) => setTimeout(r, 1000));
    expect(storageForTest.get('k')).toBe(null);
  });
  test('topLevelDomain', () => {
    expect(storageForTest.topLevelDomain).toBe('localhost');
  });
  test('cookies', () => {
    storageForTest.clear();
    expect(storageForTest.cookies).toStrictEqual([]);
    storageForTest.set('k', 'v');
    expect(storageForTest.cookies).toStrictEqual(['k=v']);
  });
  test('keys', () => {
    storageForTest.clear();
    storageForTest.set('k', 'v');
    expect(storageForTest.keys()).toStrictEqual(['k']);
    storageForTest.set('k2', 'v2');
    expect(storageForTest.keys()).toStrictEqual(['k', 'k2']);
    storageForTest.set('k2', 'v2=3');
    expect(storageForTest.keys()).toStrictEqual(['k', 'k2']);
  });
  test('values', () => {
    storageForTest.clear();
    storageForTest.set('k', 'v');
    expect(storageForTest.values()).toStrictEqual(['v']);
    storageForTest.set('k2', 'v2');
    expect(storageForTest.values()).toStrictEqual(['v', 'v2']);
    storageForTest.set('k2', 'v2=3');
    expect(storageForTest.values()).toStrictEqual(['v', 'v2=3']);
  });
  test('entries', () => {
    storageForTest.clear();
    storageForTest.set('k', 'v');
    expect(storageForTest.entries()).toStrictEqual([['k', 'v']]);
    storageForTest.set('k2', 'v2');
    expect(storageForTest.entries()).toStrictEqual([
      ['k', 'v'],
      ['k2', 'v2'],
    ]);
    storageForTest.set('k2', 'v2=3');
    expect(storageForTest.entries()).toStrictEqual([
      ['k', 'v'],
      ['k2', 'v2=3'],
    ]);
  });
});
