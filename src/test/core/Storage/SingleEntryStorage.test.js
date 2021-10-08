import StorageForTest from 'core/Storage/SingleEntryStorage';

let storageForTest;
let webStorageType;

let cookieSet;
let cookieGet;

let setItemSpy;
let getItemSpy;
let removeItemSpy;
let clearSpy;

afterEach(() => {
  jest.clearAllMocks();
});

describe('storageType: Cookie', () => {
  afterEach(() => {
    storageForTest.clear();
  });
  beforeEach(() => {
    cookieSet = jest.spyOn(document, 'cookie', 'set');
    cookieGet = jest.spyOn(document, 'cookie', 'get');
    storageForTest = new StorageForTest('cookie');
  });
  test('storageType', () => {
    expect(storageForTest.storageType).toBe('cookie');
  });
  describe('toHaveBeenCalled', () => {
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
  test('set', () => {
    storageForTest.set('k', 'v');
    expect(storageForTest.get('k')).toBe('v');
  });
  test('get', () => {
    expect(storageForTest.get('k')).toBe(undefined);
  });
  test('remove', () => {
    storageForTest.remove('k');
    expect(storageForTest.get('k')).toBe(undefined);
  });
  test('clear', () => {
    storageForTest.set('k', 'v');
    expect(storageForTest.get('k')).toBe('v');
    storageForTest.clear('k');
    expect(storageForTest.get('k')).toBe(undefined);
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
  test('nullish value', () => {
    storageForTest.set('k', null);
    expect(storageForTest.get('k')).toBe(null);
    storageForTest.set('k', undefined);
    expect(storageForTest.get('k')).toBe(undefined);
  });
});

describe('storageType: SessionStorage', () => {
  afterEach(() => {
    storageForTest.clear();
  });
  beforeEach(() => {
    webStorageType = 'sessionStorage';
    storageForTest = new StorageForTest('sessionStorage');
    setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
    clearSpy = jest.spyOn(Storage.prototype, 'clear');
  });
  test('storageType', () => {
    expect(storageForTest.storageType).toBe('sessionStorage');
  });
  describe('toHaveBeenCalled', () => {
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
  test('set', () => {
    storageForTest.set('k', 'v');
    expect(storageForTest.get('k')).toBe('v');
  });
  test('get', () => {
    expect(storageForTest.get('k')).toBe(undefined);
  });
  test('remove', () => {
    storageForTest.remove('k');
    expect(storageForTest.get('k')).toBe(undefined);
  });
  test('clear', () => {
    storageForTest.set('k', 'v');
    expect(storageForTest.get('k')).toBe('v');
    storageForTest.clear('k');
    expect(storageForTest.get('k')).toBe(undefined);
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

describe('storageType: LocalStorage', () => {
  afterEach(() => {
    storageForTest.clear();
  });
  beforeEach(() => {
    webStorageType = 'localStorage';
    storageForTest = new StorageForTest('localStorage');
    setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
    clearSpy = jest.spyOn(Storage.prototype, 'clear');
  });
  test('storageType', () => {
    expect(storageForTest.storageType).toBe('localStorage');
  });
  describe('toHaveBeenCalled', () => {
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
  test('set', () => {
    storageForTest.set('k', 'v');
    expect(storageForTest.get('k')).toBe('v');
  });
  test('get', () => {
    expect(storageForTest.get('k')).toBe(undefined);
  });
  test('remove', () => {
    storageForTest.remove('k');
    expect(storageForTest.get('k')).toBe(undefined);
  });
  test('clear', () => {
    storageForTest.set('k', 'v');
    expect(storageForTest.get('k')).toBe('v');
    storageForTest.clear('k');
    expect(storageForTest.get('k')).toBe(undefined);
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

describe('storageType: LocalStorage', () => {
  afterEach(() => {
    storageForTest.clear();
  });
  beforeEach(() => {
    webStorageType = 'localStorage';
    storageForTest = new StorageForTest();
    setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
    clearSpy = jest.spyOn(Storage.prototype, 'clear');
  });
  test('storageType', () => {
    expect(storageForTest.storageType).toBe('localStorage');
  });
  describe('toHaveBeenCalled', () => {
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
  test('set', () => {
    storageForTest.set('k', 'v');
    expect(storageForTest.get('k')).toBe('v');
  });
  test('get', () => {
    expect(storageForTest.get('k')).toBe(undefined);
  });
  test('remove', () => {
    storageForTest.remove('k');
    expect(storageForTest.get('k')).toBe(undefined);
  });
  test('clear', () => {
    storageForTest.set('k', 'v');
    expect(storageForTest.get('k')).toBe('v');
    storageForTest.clear('k');
    expect(storageForTest.get('k')).toBe(undefined);
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
