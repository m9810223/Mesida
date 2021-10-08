import StorageForTest from 'core/Storage/Storages/LocalStorage';

let webStorageType;
let storageForTest;

let setItemSpy;
let getItemSpy;
let removeItemSpy;
let clearSpy;

afterEach(() => {
  jest.clearAllMocks();
});

beforeEach(() => {
  webStorageType = 'localStorage';
  storageForTest = new StorageForTest();
});

test('webStorageType', () => {
  expect(storageForTest.webStorageType).toBe(webStorageType);
});

describe('toHaveBeenCalled', () => {
  beforeEach(() => {
    setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
    clearSpy = jest.spyOn(Storage.prototype, 'clear');
  });
  test('set', () => {
    storageForTest.set('k', 'v');
    expect(window[webStorageType].setItem).toHaveBeenCalled();
    expect(setItemSpy).toHaveBeenCalled();
  });
  test('get', () => {
    storageForTest.get('k');
    expect(window[webStorageType].getItem).toHaveBeenCalled();
    expect(getItemSpy).toHaveBeenCalled();
  });
  test('remove', () => {
    storageForTest.remove('k');
    expect(window[webStorageType].removeItem).toHaveBeenCalled();
    expect(removeItemSpy).toHaveBeenCalled();
  });
  test('clear', () => {
    storageForTest.clear();
    expect(window[webStorageType].clear).toHaveBeenCalled();
    expect(clearSpy).toHaveBeenCalled();
  });
});

describe('', () => {
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
