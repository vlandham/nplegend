/**
 * Functions for encoding and decoding values as strings.
 */
import d3 from 'd3';

/**
 * Encodes a date as a string in YYYY-MM-DD format.
 *
 * @param {Date} date
 * @return {String} the encoded date
 */
export function encodeDate(date) {
  return date == null ? date : d3.timeFormat('%Y-%m-%d')(date);
}

/**
 * Converts a date in the format 'YYYY-mm-dd...' into a proper date, because
 * new Date() does not do that correctly. The date can be as complete or incomplete
 * as necessary (aka, '2015', '2015-10', '2015-10-01').
 * It will not work for dates that have times included in them.
 *
 * @TODO replace with proper date library at some point.
 *
 * @param  {String} dateString String date form like '2015-10-01'
 * @return {Date} parsed date
 */
export function decodeDate(dateString) {
  if (dateString == null) {
    return dateString;
  }

  const parts = dateString.split('-');
  parts[1] -= 1; // Note: months are 0-based

  return new Date(...parts);
}

/**
 * Encodes a boolean as a string. true -> "1", false -> "0".
 *
 * @param {Boolean} bool
 * @return {String} the encoded boolean
 */
export function encodeBoolean(bool) {
  return bool ? '1' : '0';
}

/**
 * Decodes a boolean from a string. "1" -> true, "0" -> false.
 * Everything else maps to undefined.
 *
 * @param {String} boolStr the encoded boolean string
 * @return {Boolean} the boolean value
 */
export function decodeBoolean(boolStr) {
  if (boolStr === '1') {
    return true;
  } else if (boolStr === '0') {
    return false;
  }

  return undefined;
}

/**
 * Encodes anything as a JSON string.
 *
 * @param {Any} any The thing to be encoded
 * @return {String} The JSON string representation of any
 */
export function encodeJson(any) {
  if (!any) {
    return undefined;
  }

  return JSON.stringify(any);
}

/**
 * Decodes a JSON string into javascript
 *
 * @param {String} jsonStr The JSON string representation
 * @return {Any} The javascript representation
 */
export function decodeJson(jsonStr) {
  if (!jsonStr) {
    return undefined;
  }

  return JSON.parse(jsonStr);
}

/**
 * Encode simple objects as readable strings. Currently works only for simple,
 * flat objects where values are numbers, booleans or strings.
 *
 * For example { foo: bar, boo: baz } -> "foo-bar_boo-baz"
 *
 * @param {Object} object The object to encode
 * @param {String} keyValSeparator="-" The separator between keys and values
 * @param {String} entrySeparator="_" The separator between entries
 * @return {String} The encoded object
 */
export function encodeObject(obj, keyValSeparator = '-', entrySeparator = '_') {
  if (!obj || !Object.keys(obj).length) {
    return undefined;
  }

  return Object.keys(obj).map(key => `${key}${keyValSeparator}${obj[key]}`).join(entrySeparator);
}

/**
 * Decodes a simple object to javascript. Currently works only for simple,
 * flat objects where values are numbers, booleans or strings.
 *
 * For example "foo-bar_boo-baz" -> { foo: bar, boo: baz }
 *
 * @param {String} objStr The object string to decode
 * @param {String} keyValSeparator="-" The separator between keys and values
 * @param {String} entrySeparator="_" The separator between entries
 * @return {Object} The javascript object
 */
export function decodeObject(objStr, keyValSeparator = '-', entrySeparator = '_') {
  const obj = {};
  if (!objStr) {
    return obj;
  }

  objStr.split(entrySeparator).forEach(entryStr => {
    const [key, value] = entryStr.split(keyValSeparator);
    obj[key] = value;
  });

  return obj;
}

/**
 * Collection of Decoders by type
 */
export const Decoders = {
  number(d) {
    return parseFloat(d, 10);
  },

  string(d) {
    return d;
  },

  object(d) {
    return decodeObject(d);
  },

  json(d) {
    return decodeJson(d);
  },

  date(d) {
    return decodeDate(d);
  },

  boolean(d) {
    return decodeBoolean(d);
  },
};


/**
 * Generic decode function that takes a type as an argument.
 *
 * @param {String|Function} type If a function, it is used to decode, otherwise the string is
 *  the key for the decoder in the Decoders collection.
 * @param {String} encodedValue the value to decode
 * @param {Any} defaultValue The default value to use if encodedValue is undefined.
 * @return {Any} The decoded value
 */
export function decode(type, encodedValue, defaultValue) {
  let decodedValue;

  if (typeof type === 'function') {
    decodedValue = type(encodedValue, defaultValue);
  } else if (encodedValue === undefined) {
    decodedValue = defaultValue;
  } else if (Decoders[type]) {
    decodedValue = Decoders[type](encodedValue, defaultValue);
  } else {
    decodedValue = encodedValue;
  }

  return decodedValue;
}

/**
 * Collection of Decoders by type
 */
export const Encoders = {
  number(d) {
    return String(d);
  },

  string(d) {
    return d;
  },

  object(d) {
    return encodeObject(d);
  },

  json(d) {
    return encodeJson(d);
  },

  date(d) {
    return encodeDate(d);
  },

  boolean(d) {
    return encodeBoolean(d);
  },
};

/**
 * Generic encode function that takes a type as an argument.
 *
 * @param {String|Function} type If a function, it is used to encode, otherwise the string is
 *  the key for the encoder in the Encoders collection.
 * @param {String} decodedValue the value to encode
 * @return {Any} The encoded value
 */
export function encode(type, decodedValue) {
  let encodedValue;
  if (typeof type === 'function') {
    encodedValue = type(decodedValue);
  } else if (Encoders[type]) {
    encodedValue = Encoders[type](decodedValue);
  } else {
    encodedValue = decodedValue;
  }

  return encodedValue;
}
