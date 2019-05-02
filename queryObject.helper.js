export const parse = (str = '') => {
  str = str.replace(/^\?/, '');
  const result = {};

  if (!str) {
    return result;
  }

  const arr = str.split('&'),
        { length } = arr;

  for (let i = 0; i < length; i++) {
    const [key, value] = arr[i].replace(/%20|\+/g, ' ').split('=');

    result[decodeURIComponent(key)] = value ? decodeURIComponent(value) : null;
  }

  return result;
};

export const stringify = (obj = {}) => {
  let result = '';

  for (const keys in obj) {
    result += encodeURIComponent(keys);
    if (Object.prototype.hasOwnProperty.call(obj, keys) && obj[keys]) {
        result += `=${encodeURIComponent(obj[keys])}`;
    }
    result += '&';
  }

  return result.slice(0, -1);
};
