import StorageForTest from 'core/Storage/JsonObjectStorage';

let storageForTest;
// let storageType;
let webStorageType;
// let namespace;

let cookieSet;
let cookieGet;

let setItemSpy;
let getItemSpy;
// let removeItemSpy;
// let clearSpy;

afterEach(() => {
  jest.clearAllMocks();
});

beforeEach(() => {
  cookieSet = jest.spyOn(document, 'cookie', 'set');
  cookieGet = jest.spyOn(document, 'cookie', 'get');
  setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
  getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
  // removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
  // clearSpy = jest.spyOn(Storage.prototype, 'clear');
});

describe('migrate', () => {
  test('LocalStorage -> SessionStorage', () => {
    storageForTest = new StorageForTest('localStorage');
    storageForTest.clear();
    storageForTest.set('k', 'v');
    expect(storageForTest.get('k')).toBe('v');
    expect(getItemSpy).toHaveBeenCalled();
    storageForTest.migrate('sessionStorage');
    jest.clearAllMocks();
    expect(storageForTest.get('k')).toBe('v');
    expect(cookieGet).toHaveBeenCalledTimes(0);
    expect(getItemSpy).toHaveBeenCalledTimes(1);
  });
  test('Cookie -> LocalStorage', () => {
    storageForTest = new StorageForTest('cookie');
    storageForTest.clear();
    storageForTest.set('k', 'v');
    expect(storageForTest.get('k')).toBe('v');
    expect(cookieGet).toHaveBeenCalled();
    storageForTest.migrate('localStorage');
    jest.clearAllMocks();
    expect(storageForTest.get('k')).toBe('v');
    expect(cookieGet).toHaveBeenCalledTimes(0);
    expect(getItemSpy).toHaveBeenCalledTimes(1);
  });
  test('Cookie -> SessionStorage', () => {
    storageForTest = new StorageForTest('cookie');
    storageForTest.clear();
    storageForTest.set('k', 'v');
    expect(storageForTest.get('k')).toBe('v');
    expect(cookieGet).toHaveBeenCalled();
    storageForTest.migrate('sessionStorage');
    jest.clearAllMocks();
    expect(storageForTest.get('k')).toBe('v');
    expect(cookieGet).toHaveBeenCalledTimes(0);
    expect(getItemSpy).toHaveBeenCalledTimes(1);
  });
  test('LocalStorage -> Cookie', () => {
    storageForTest = new StorageForTest('localStorage');
    storageForTest.clear();
    storageForTest.set('k', 'v');
    expect(storageForTest.get('k')).toBe('v');
    expect(getItemSpy).toHaveBeenCalled();
    storageForTest.migrate('cookie');
    jest.clearAllMocks();
    expect(storageForTest.get('k')).toBe('v');
    expect(cookieGet).toHaveBeenCalledTimes(1);
    expect(getItemSpy).toHaveBeenCalledTimes(0);
  });
  test('SessionStorage -> Cookie', () => {
    storageForTest = new StorageForTest('sessionStorage');
    storageForTest.clear();
    storageForTest.set('k', 'v');
    expect(storageForTest.get('k')).toBe('v');
    expect(getItemSpy).toHaveBeenCalled();
    storageForTest.migrate('cookie');
    jest.clearAllMocks();
    expect(storageForTest.get('k')).toBe('v');
    expect(cookieGet).toHaveBeenCalledTimes(1);
    expect(getItemSpy).toHaveBeenCalledTimes(0);
  });
});

describe('storageType: Cookie', () => {
  afterEach(() => {
    storageForTest.clear();
  });
  beforeEach(() => {
    storageForTest = new StorageForTest('cookie');
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
});

describe('storageType: SessionStorage', () => {
  afterEach(() => {
    storageForTest.clear();
  });
  beforeEach(() => {
    webStorageType = 'sessionStorage';
    storageForTest = new StorageForTest('sessionStorage');
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
