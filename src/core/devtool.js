/* eslint-disable no-underscore-dangle */
import { decode } from './Storage/codec';

window[__WINVAR__] ??= {
  logs: [],
  // prettier-ignore
  decode: (data) => Object.entries(JSON.parse(decode(data))).reduce((acc, cur) => {
    const [k, v] = cur;
    return { ...acc, [k]: decode(v) };
  }, {}),
};
