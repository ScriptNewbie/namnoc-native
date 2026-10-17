'use strict';

const next = require('decode-uri-component-next');
const decodeUriComponent = typeof next === 'function' ? next : next.default;

module.exports = decodeUriComponent;
module.exports.default = decodeUriComponent;
