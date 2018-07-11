var libs =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./libs/vdom/dist/utils.js":
/*!*********************************!*\
  !*** ./libs/vdom/dist/utils.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/*\n * 是否已定义\n */\nfunction isDef(s) {\n  return s !== undefined;\n}\n\n/*\n * 是否未定义\n */\nfunction isUndef(s) {\n  return s === undefined;\n}\n\n/*\n * 是否虚拟node\n */\nfunction isVnode(vnode) {\n  return vnode.sel !== undefined;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  isDef: isDef,\n  isUndef: isUndef,\n  isVnode: isVnode\n});\n\n//# sourceURL=webpack://libs/./libs/vdom/dist/utils.js?");

/***/ }),

/***/ "./libs/vdom/dist/vdom.js":
/*!********************************!*\
  !*** ./libs/vdom/dist/vdom.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"./libs/vdom/dist/utils.js\");\n\n/*\n * 虚拟dom\n *\n */\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n\n\nvar vdom = function () {\n    function vdom() {\n        _classCallCheck(this, vdom);\n    }\n\n    // 创建虚拟node\n\n\n    _createClass(vdom, null, [{\n        key: 'vnode',\n        value: function vnode() {\n            var sel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;\n            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;\n            var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;\n            var text = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;\n            var elm = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;\n\n            var key = void 0;\n            if (data === undefined) {\n                key = undefined;\n            } else {\n                data = {\n                    props: data.props,\n                    attrs: data.attrs,\n                    class: data.class,\n                    style: data.style,\n                    key: data.key\n                };\n                key = undefined;\n            }\n            return {\n                sel: sel,\n                data: data,\n                children: children,\n                text: text,\n                elm: elm,\n                key: key\n            };\n        }\n\n        // 比较虚拟node\n\n    }, {\n        key: 'diff',\n        value: function diff() {}\n\n        // 生成真实dom\n\n    }, {\n        key: 'createElm',\n        value: function createElm(vnode) {\n            var sel = vnode.sel;\n            var node = void 0;\n\n            if (sel !== undefined) {\n                node = document.createElement(sel);\n                for (var key in vnode.data) {\n                    if (vnode.data[key] !== undefined) {\n                        Object.assign(node[key], vnode.data[key]);\n                    }\n                }\n            }\n\n            // 文字节点\n            if (vnode.children !== undefined && typeof vnode.children === 'string') {\n                node.innerText = vnode.children;\n            }\n\n            return node;\n        }\n\n        // 更新子节点\n\n    }, {\n        key: 'updateChildren',\n        value: function updateChildren(parentElm, oldCh, newCh) {}\n\n        // 比较并更新dom\n\n    }, {\n        key: 'patch',\n        value: function patch(oldVnode, vnode) {\n            if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isVnode(oldVnode)) {\n                // 真实dom\n                console.log('真实dom');\n                vnode.elm = vdom.createElm(vnode);\n                oldVnode.appendChild(vnode.elm);\n                if (vnode.children !== undefined && typeof vnode.children !== 'string') {\n                    // 判断是否无子节点\n                    if (Array.isArray(vnode.children)) {\n                        // 多节点\n                        vnode.children.forEach(function (node) {\n                            vdom.patch(vnode.elm, node);\n                        });\n                    } else {\n                        // 单节点\n                        vdom.patch(vnode.elm, vnode.children);\n                    }\n                }\n            } else {// 比较差异并更新\n\n            }\n        }\n    }]);\n\n    return vdom;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    vnode: vdom.vnode,\n    diff: vdom.diff,\n    patch: vdom.patch\n});\n\n//# sourceURL=webpack://libs/./libs/vdom/dist/vdom.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _libs_vdom_dist_vdom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../libs/vdom/dist/vdom.js */ \"./libs/vdom/dist/vdom.js\");\n// var snabbdom = require('snabbdom');\n// var patch = snabbdom.init([\n//   require('snabbdom/modules/class').default,\n//   require('snabbdom/modules/style').default\n// ]);\n\n// var container = document.getElementById('container');\n\n// var vnode = snabbdom.h('div#container.two.classes');\n\n// patch(container, vnode);\n\n// var newVnode = snabbdom.h('div', {\n//     style: {\n//       backgroundColor: '#f00'\n//     },\n//   },\n//   snabbdom.h('span', {\n//     style: {\n//       color: '#0f0'\n//     }\n//   }, 'hello world'));\n\n// patch(vnode, newVnode);\n\n// console.log(document.body.childNodes);\n\n\nconsole.log(_libs_vdom_dist_vdom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\nvar node = _libs_vdom_dist_vdom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].vnode('div', {\n  style: {\n    display: 'table-cell',\n    width: '100px',\n    textAlign: 'center',\n    backgroundColor: '#f00'\n  }\n}, _libs_vdom_dist_vdom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].vnode('p', {\n  style: {\n    display: 'inline-block',\n    width: '50%',\n    verticalAlign: 'middle',\n    backgroundColor: '#00f'\n  }\n}, [_libs_vdom_dist_vdom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].vnode('span', {\n  style: {\n    color: '#0f0'\n  }\n}, 'hello'), _libs_vdom_dist_vdom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].vnode('span', {\n  style: {\n    color: '#0f0'\n  }\n}, ' world')]));\n\nvar container = document.getElementById('container');\n_libs_vdom_dist_vdom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].patch(container, node);\n\nconsole.log(node);\n\n//# sourceURL=webpack://libs/./src/main.js?");

/***/ })

/******/ });