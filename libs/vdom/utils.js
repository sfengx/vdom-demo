/*
 * 是否已定义
 */
function isDef(s) {
  return s !== undefined;
}

/*
 * 是否未定义
 */
function isUndef(s) {
  return s === undefined;
}

/*
 * 是否虚拟node
 */
function isVnode(vnode) {
  return vnode.sel !== undefined;
}

/**
 * 判断两个数组是否相等
 * 浅度相等：两数组toString一样
 * 深度相等的判断规则：
 *   1.长度相等
 *   2.俩数组的每一项：
 *      若为数组：参考本函数规则。
 *      若为对象：参考equalObject的规则。
 *      其他的数据类型，要求===判断为true
 * @param  {[type]} arr1
 * @param  {[type]} arr2
 * @param  {[type]} deepCheck
 * @return {[type]}
 */
function equalArray (arr1, arr2, deepCheck) {
    if (arr1 === arr2) {
        return true;
    };
    // 长度不等，不用继续判断
    if (arr1.length !== arr2.length) {
        return false;
    };
    // 浅度检查
    if (!deepCheck) {
        return arr1.toString() === arr2.toString();
    };
    // 判断每个基本数据类型是否一样
    var type1, type2; // 数组每一项的数据类型
    for (var i = 0; i < arr1.length; i++) {
        type1 = type(arr1[i]);
        type2 = type(arr2[i]);

        // 数据类型不一样，无需判断
        if (type1 !== type2) {
            return false;
        };

        if (type1 === "Array") {
            if (!equalArray(arr1[i], arr2[i], true)) {
                return false;
            };
        }else if (type1 === 'Object') {
            if (!equalObject(arr1[i], arr2[i], true)) {
                return false;
            };
        }else if (arr1[i] !== arr2[i]) {
            return false;
        };

    };
    return true;
}

/**
 * 判断两个对象是否相等
 * 浅度判断：
 *      1.只判断obj的第一层属性总数是否一样
 *      2.值的===判断是否为真
 * 深度判断：
 *      值为对象，参考本规则
 *      值为数组，参考equalArray的深度判断
 *      值为其他类型，用===判断
 * @param  {[type]} obj1
 * @param  {[type]} obj2
 * @param  {[type]} deepCheck
 * @return {[type]}
 */
function equalObject(obj1, obj2, deepCheck) {
  if (obj1 === obj2) {
    return true;
  };
  // 属性总数不等，直接返回false
  var size1 = 0;
  for (var key in obj1) {
    size1++;
  }
  var size2 = 0;
  for (var key in obj2) {
    size2++;
  }
  if (size1 !== size2) {
    return false;
  };

  if (!deepCheck) { // 浅度判断
    for (var key in obj1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      };
    }
    return true;
  };
  var type1, type2;
  for (var key in obj1) {
    type1 = typeof obj1[key];
    type2 = typeof obj2[key];
    if (type1 !== type2) {
      return false;
    };
    if (type1 === "Object" || type1 === "object") {
      if (!equalObject(obj1[key], obj2[key], true)) {
        return false;
      };
    } else if (type1 === "Array" || type1 === "array") {
      if (!equalArray(obj1[key], obj2[key], true)) {
        return false;
      };
    } else if (obj1[key] !== obj2[key]) {
      return false;
    };
  }
  return true;

}

export default {
  isDef,
  isUndef,
  isVnode,
  equalObject
};