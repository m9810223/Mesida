import Logger from 'core/Logger';

const logger = new Logger('[codec]');
logger.off();

const getDateType = (data) => {
  if ([Boolean, Number, String, Date, Array].includes(data?.constructor)) {
    return data?.constructor.name.toLowerCase();
  }
  if (data === null) {
    return 'null';
  }
  return typeof data; // undefined and others
};

const stringifyer = {
  undefined: () => '',
  null: () => '',
  boolean: (value) => JSON.stringify(value),
  number: (value) => JSON.stringify(value),
  string: (value) => JSON.stringify(value),
  date: (value) => JSON.stringify(value),
  array: (value) => JSON.stringify(value),
  object: (value) => JSON.stringify(value),
};

const parser = {
  undefined: () => undefined,
  null: () => null,
  boolean: (value) => JSON.parse(value),
  number: (value) => JSON.parse(value),
  string: (value) => String(JSON.parse(value)),
  date: (value) => new Date(JSON.parse(value)),
  array: (value) => JSON.parse(value),
  object: (value) => JSON.parse(value),
};

const encode = (value) => {
  logger.debug('encode', value);
  const type = getDateType(value);
  return JSON.stringify([type, stringifyer[type](value)]);
};

const decode = (str) => {
  logger.debug('decode', str);
  if (str?.constructor !== String) {
    return undefined;
  }
  try {
    const [type, value] = JSON.parse(str);
    return parser[type](value);
  } catch {
    logger.debug('decode fail:', str);
    return str;
  }
};

export { getDateType, encode, decode };
