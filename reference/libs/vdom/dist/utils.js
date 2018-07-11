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

export default {
  isDef,
  isUndef,
  isVnode
};