//이 파일에서만 no-gloabl-assign ESLint 옵션을 비활성호
/* eslint-disable no-global-assign */

require = require('esm')(module /*, options*/);
module.exports = require('./main.js');