/*! gtt author */
webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var _index = __webpack_require__(4);

var _index2 = _interopRequireDefault(_index);

var _black = __webpack_require__(5);

var _black2 = _interopRequireDefault(_black);

var _blue = __webpack_require__(6);

var _blue2 = _interopRequireDefault(_blue);

var _module = __webpack_require__(7);

var _module2 = _interopRequireDefault(_module);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import $ from 'jquery'
//入口文件的配置项
{
  var a = "Hello Webpack!!";
  document.getElementById('title').innerHTML = a;
}
$("#title").html("Hello jquery11");
// mo()

var json = __webpack_require__(8);
$("#json").innerHTML = json.name + "website:" + json.webSite;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function module1() {
  alert('module');
}
module.exports = module1;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = {"name":"gtt","webSite":"gtt.com"}

/***/ })
],[3]);