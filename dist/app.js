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
eval("__webpack_require__.r(__webpack_exports__);\n/*\n * 是否已定义\n */\nfunction isDef(s) {\n  return s !== undefined;\n}\n\n/*\n * 是否未定义\n */\nfunction isUndef(s) {\n  return s === undefined;\n}\n\n/*\n * 是否虚拟node\n */\nfunction isVnode(vnode) {\n  return vnode.sel !== undefined;\n}\n\n/**\n * 判断两个数组是否相等\n * 浅度相等：两数组toString一样\n * 深度相等的判断规则：\n *   1.长度相等\n *   2.俩数组的每一项：\n *      若为数组：参考本函数规则。\n *      若为对象：参考equalObject的规则。\n *      其他的数据类型，要求===判断为true\n * @param  {[type]} arr1\n * @param  {[type]} arr2\n * @param  {[type]} deepCheck\n * @return {[type]}\n */\nfunction equalArray(arr1, arr2, deepCheck) {\n  if (arr1 === arr2) {\n    return true;\n  };\n  // 长度不等，不用继续判断\n  if (arr1.length !== arr2.length) {\n    return false;\n  };\n  // 浅度检查\n  if (!deepCheck) {\n    return arr1.toString() === arr2.toString();\n  };\n  // 判断每个基本数据类型是否一样\n  var type1, type2; // 数组每一项的数据类型\n  for (var i = 0; i < arr1.length; i++) {\n    type1 = type(arr1[i]);\n    type2 = type(arr2[i]);\n\n    // 数据类型不一样，无需判断\n    if (type1 !== type2) {\n      return false;\n    };\n\n    if (type1 === \"Array\") {\n      if (!equalArray(arr1[i], arr2[i], true)) {\n        return false;\n      };\n    } else if (type1 === 'Object') {\n      if (!equalObject(arr1[i], arr2[i], true)) {\n        return false;\n      };\n    } else if (arr1[i] !== arr2[i]) {\n      return false;\n    };\n  };\n  return true;\n}\n\n/**\n * 判断两个对象是否相等\n * 浅度判断：\n *      1.只判断obj的第一层属性总数是否一样\n *      2.值的===判断是否为真\n * 深度判断：\n *      值为对象，参考本规则\n *      值为数组，参考equalArray的深度判断\n *      值为其他类型，用===判断\n * @param  {[type]} obj1\n * @param  {[type]} obj2\n * @param  {[type]} deepCheck\n * @return {[type]}\n */\nfunction equalObject(obj1, obj2, deepCheck) {\n  if (obj1 === obj2) {\n    return true;\n  };\n  // 属性总数不等，直接返回false\n  var size1 = 0;\n  for (var key in obj1) {\n    size1++;\n  }\n  var size2 = 0;\n  for (var key in obj2) {\n    size2++;\n  }\n  if (size1 !== size2) {\n    return false;\n  };\n\n  if (!deepCheck) {\n    // 浅度判断\n    for (var key in obj1) {\n      if (obj1[key] !== obj2[key]) {\n        return false;\n      };\n    }\n    return true;\n  };\n  var type1, type2;\n  for (var key in obj1) {\n    type1 = typeof obj1[key];\n    type2 = typeof obj2[key];\n    if (type1 !== type2) {\n      return false;\n    };\n    if (type1 === \"Object\" || type1 === \"object\") {\n      if (!equalObject(obj1[key], obj2[key], true)) {\n        return false;\n      };\n    } else if (type1 === \"Array\" || type1 === \"array\") {\n      if (!equalArray(obj1[key], obj2[key], true)) {\n        return false;\n      };\n    } else if (obj1[key] !== obj2[key]) {\n      return false;\n    };\n  }\n  return true;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  isDef,\n  isUndef,\n  isVnode,\n  equalObject\n});\n\n//# sourceURL=webpack://libs/./libs/vdom/dist/utils.js?");

/***/ }),

/***/ "./libs/vdom/dist/vdom.js":
/*!********************************!*\
  !*** ./libs/vdom/dist/vdom.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"./libs/vdom/dist/utils.js\");\n\n/*\n * 虚拟dom\n *\n */\n\n\n\nclass vdom {\n\n    constructor() {}\n\n    // 创建虚拟node\n    static vnode(sel = undefined, data = undefined, children = undefined, text = undefined, elm = undefined) {\n        let key;\n        if (data === undefined) {\n            key = undefined;\n        } else {\n            data = {\n                props: data.props,\n                attrs: data.attrs,\n                class: data.class,\n                style: data.style,\n                key: data.key\n            };\n            key = data.key ? data.key : undefined;\n        }\n        // 转换children为数组类型\n        if (!Array.isArray(children) && children !== undefined) {\n            children = [children];\n        }\n        return {\n            sel,\n            data,\n            children,\n            text,\n            elm,\n            key: key\n        };\n    }\n\n    // 生成真实dom\n    static createElm(vnode) {\n        let sel = vnode.sel;\n        let dom;\n\n        if (sel === undefined) {\n            dom = document.createTextNode(vnode);\n        } else if (sel !== undefined) {\n            dom = document.createElement(sel);\n            vdom.updateElm(vnode, dom);\n        }\n\n        return dom;\n    }\n\n    // 更新真实dom\n    static updateElm(vnode, dom) {\n        let key;\n        for (key in vnode.data) {\n            if (vnode.data[key] !== undefined) {\n                if (key === 'attrs') {\n                    // 设置属性\n                    let valKey;\n                    for (valKey in vnode.data[key]) {\n                        dom.setAttribute(valKey, vnode.data[key][valKey]);\n                    }\n                } else {\n                    // 合并class等\n                    Object.assign(dom[key], vnode.data[key]);\n                }\n            }\n        }\n    }\n\n    // 比较并更新虚拟node\n    static diff(oldVnode, vnode, parentElm = undefined) {\n        let currentPatch = [];\n\n        if (oldVnode === undefined || oldVnode.sel !== vnode.sel) {\n            // 不同类型节点\n            console.log('不同类型', vnode.sel, oldVnode.sel);\n            vdom.commit(currentPatch, 1, vnode, oldVnode.elm || undefined, parentElm);\n            vdom.commit(currentPatch, 4, undefined, oldVnode.elm || undefined, parentElm);\n        } else if (oldVnode.sel === vnode.sel) {\n            if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].equalObject(oldVnode.data, vnode.data, true)) {\n                // 相同类型节点\n                console.log('相同类型', vnode.sel, '不同属性');\n                vdom.commit(currentPatch, 2, vnode, oldVnode.elm);\n            }\n            if (vnode.children && vnode.children.length) {\n                // 有子节点\n                let diffChildrenQueue = [];\n                diffChildrenQueue = vdom.diffChildren(oldVnode.children, vnode.children, oldVnode.elm);\n                currentPatch = currentPatch.concat(diffChildrenQueue);\n            }\n        }\n\n        if (_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isVnode(oldVnode)) {\n            oldVnode.isDiffed = true;\n        }\n\n        return currentPatch;\n    }\n\n    // 比较并更新子节点\n    static diffChildren(oldChildren, newChildren, parentElm) {\n        let currentPatch = [];\n\n        newChildren.forEach((vnode, key) => {\n            let newPatch = vdom.diff(oldChildren[key], vnode, parentElm);\n            currentPatch = currentPatch.concat(newPatch);\n        });\n\n        return currentPatch;\n    }\n\n    // 遍历\n    static walk(oldVnode, vnode, patch, index) {\n        let diffQueue = [];\n\n        console.group('diff');\n        diffQueue = vdom.diff(oldVnode, vnode);\n        console.groupEnd('diff');\n\n        console.group('commit');\n        console.log(diffQueue.length + '个提交：', diffQueue);\n        console.groupEnd('commit');\n\n        return diffQueue;\n    }\n\n    /*\n     * 提交更改记录\n     * @param {array} queue 更新队列\n     * @param {string} type 1:新增 2:更新 3:移动 4:删除\n     * @param {vnode} vnode 虚拟node\n     * @param {dom} oldElm 旧节点\n     * @param {dom} oldParentElm 旧父节点\n     * @return void\n     */\n    static commit(queue, type, vnode, oldElm = undefined, oldParentElm = undefined) {\n        queue.push({ type, vnode, oldElm, oldParentElm });\n    }\n\n    /*\n     * 合并更改\n     * @param {array} queue 队列\n     * @return void\n     */\n    static merge(queue) {\n        queue.forEach(record => {\n            if (record.type === 2) {\n                // 更新\n                console.log('update');\n                vdom.updateElm(record.vnode, record.oldElm);\n            } else if (record.type === 1) {\n                // 新增\n                console.log('add');\n                if (record.oldElm !== undefined) {\n                    // 插入到旧节点前\n                    vdom.patch(record.oldParentElm, record.vnode, record.oldElm);\n                } else {\n                    // 插入到最后一个子节点的后面\n                    vdom.patch(record.oldParentElm, record.vnode);\n                }\n            } else if (record.type === 4) {\n                // 删除\n                console.log('del');\n                record.oldParentElm.removeChild(record.oldElm);\n            }\n        });\n    }\n\n    // 比较并更新dom\n    static patch(oldVnode, vnode, brotherElm = undefined) {\n        if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isVnode(oldVnode)) {\n            // 真实dom\n            if (_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].isVnode(vnode)) {\n                vnode.elm = vdom.createElm(vnode);\n                if (brotherElm) {\n                    oldVnode.insertBefore(vnode.elm, brotherElm);\n                } else {\n                    oldVnode.appendChild(vnode.elm);\n                }\n                if (vnode.children !== undefined) {\n                    // 判断是否无子节点\n                    vnode.children.forEach(node => {\n                        vdom.patch(vnode.elm, node);\n                    });\n                }\n            } else if (typeof vnode === 'string') {\n                oldVnode.appendChild(vdom.createElm(vnode));\n            }\n        } else {\n            // 比较差异并更新\n            let queue = [];\n\n            queue = vdom.walk(oldVnode, vnode);\n\n            console.group('merge');\n            vdom.merge(queue);\n            console.groupEnd('merge');\n        }\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    vnode: vdom.vnode,\n    diff: vdom.diff,\n    patch: vdom.patch\n});\n\n//# sourceURL=webpack://libs/./libs/vdom/dist/vdom.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _libs_vdom_dist_vdom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../libs/vdom/dist/vdom.js */ \"./libs/vdom/dist/vdom.js\");\n// var snabbdom = require('snabbdom');\n// var patch = snabbdom.init([\n//   require('snabbdom/modules/class').default,\n//   require('snabbdom/modules/style').default\n// ]);\n\n// var container = document.getElementById('container');\n\n// var vnode = snabbdom.h('div#container.two.classes');\n\n// patch(container, vnode);\n\n// var newVnode = snabbdom.h('div', {\n//     style: {\n//       backgroundColor: '#f00'\n//     },\n//   },\n//   snabbdom.h('span', {\n//     style: {\n//       color: '#0f0'\n//     }\n//   }, 'hello world'));\n\n// patch(vnode, newVnode);\n\n// console.log(document.body.childNodes);\n\n\nconsole.log('vdom: ', _libs_vdom_dist_vdom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n// 渲染函数，生成vnode\nfunction renderNode(w) {\n  let vnode, vp, vs, vs2;\n\n  if (w === 100) {\n    vs = _libs_vdom_dist_vdom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].vnode('span', {\n      style: {\n        color: '#ccc'\n      }\n    }, 'hello');\n  } else {\n    vs = _libs_vdom_dist_vdom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].vnode('em', {\n      style: {\n        color: '#0f0'\n      }\n    }, 'world');\n  }\n\n  vs2 = _libs_vdom_dist_vdom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].vnode('span', {\n    style: {\n      color: '#0f0'\n    }\n  }, 'world');\n\n  vp = _libs_vdom_dist_vdom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].vnode('p', {\n    style: {\n      display: 'inline-block',\n      width: '50%',\n      verticalAlign: 'middle',\n      backgroundColor: '#00f'\n    }\n  }, [vs, w.toString(), vs2]);\n\n  vnode = _libs_vdom_dist_vdom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].vnode('div', {\n    style: {\n      display: 'table-cell',\n      width: w + 'px',\n      textAlign: 'center',\n      backgroundColor: '#f00'\n    },\n    attrs: {\n      a: '1'\n    }\n  }, vp);\n\n  return vnode;\n}\n\nlet container, oldNode, newNode, w;\n\nw = 100;\ncontainer = document.getElementById('container');\noldNode = renderNode(w);\n_libs_vdom_dist_vdom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].patch(container, oldNode);\n\nsetTimeout(_ => {\n  w = 120;\n  newNode = renderNode(w);\n  _libs_vdom_dist_vdom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].patch(oldNode, newNode);\n}, 1000);\n\n// console.log(newNode);\n\n//# sourceURL=webpack://libs/./src/main.js?");

/***/ })

/******/ });