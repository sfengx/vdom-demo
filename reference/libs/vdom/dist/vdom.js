'use strict'
/*
 * 虚拟dom
 *
 */

import Utils from './utils.js'

class vdom {

    constructor() {

    }

    // 创建虚拟node
    static vnode(sel = undefined, data = undefined, children = undefined, text = undefined, elm = undefined) {
        let key;
        if (data === undefined) {
            key = undefined;
        } else {
            data = {
                props: data.props,
                attrs: data.attrs,
                class: data.class,
                style: data.style,
                key: data.key
            }
            key = undefined;
        }
        return {
            sel,
            data,
            children,
            text,
            elm,
            key: key
        }
    }

    // 比较虚拟node
    static diff() {

    }

    // 生成真实dom
    static createElm(vnode) {
        let sel = vnode.sel;
        let node;

        if (sel !== undefined) {
            node = document.createElement(sel);
            for (let key in vnode.data) {
                if (vnode.data[key] !== undefined) {
                    Object.assign(node[key], vnode.data[key])
                }
            }
        }

        // 文字节点
        if (vnode.children !== undefined && typeof vnode.children === 'string'){
            node.innerText = vnode.children;
        }

        return node;
    }

    // 更新子节点
    static updateChildren(parentElm, oldCh, newCh) {

    }

    // 比较并更新dom
    static patch(oldVnode, vnode) {
        if (!Utils.isVnode(oldVnode)) { // 真实dom
            console.log('真实dom');
            vnode.elm = vdom.createElm(vnode);
            oldVnode.appendChild(vnode.elm);
            if (vnode.children !== undefined && typeof vnode.children !== 'string') { // 判断是否无子节点
                if (Array.isArray(vnode.children)) { // 多节点
                    vnode.children.forEach(node => {
                        vdom.patch(vnode.elm, node);
                    });
                } else { // 单节点
                    vdom.patch(vnode.elm, vnode.children);
                }
            }
        } else { // 比较差异并更新

        }
    }
}

export default {
    vnode: vdom.vnode,
    diff: vdom.diff,
    patch: vdom.patch
}







