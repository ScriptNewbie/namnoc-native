'use strict';

const next = require('image-size-next');
const imageSize = next.imageSize;

module.exports = imageSize;
module.exports.imageSize = imageSize;
module.exports.disableTypes = next.disableTypes;
module.exports.types = next.types;
module.exports.default = imageSize;
