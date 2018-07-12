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
            key = data.key ? data.key : undefined;
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

    // 更新真实dom
    static updateElm(vnode, dom) {
        let key;
        for (key in vnode.data) {
            if (vnode.data[key] !== undefined) {
                if (key === 'attrs') { // 设置属性
                    let valKey;
                    for (valKey in vnode.data[key]) {
                        dom.setAttribute(valKey, vnode.data[key][valKey]);
                    }
                } else { // 合并class等
                    Object.assign(dom[key], vnode.data[key])
                }
            }
        }
    }

    // 生成真实dom
    static createElm(vnode) {
        let sel = vnode.sel;
        let dom;

        if (sel === undefined) {
            dom = document.createTextNode(vnode);
        } else if (sel !== undefined) {
            dom = document.createElement(sel);
            vdom.updateElm(vnode, dom);
        }

        // 文字节点
        if (vnode.children !== undefined && typeof vnode.children === 'string') {
            dom.innerText = vnode.children;
        }

        return dom;
    }

    // 比较并更新虚拟node
    static diff(oldVnode, vnode, parentElm = undefined) {
        let currentPatch = [];
        if (Utils.equalObject(oldVnode.data, vnode.data, true) && oldVnode.sel === vnode.sel) {
            console.log('完全相同');
            return currentPatch;
        }
        if (oldVnode === undefined) {
            vdom.commit(currentPatch, 1, vnode, undefined, parentElm);
        } else if (oldVnode.sel === vnode.sel) { // 相同类型节点
            console.log('相同类型', vnode.sel, oldVnode.data, vnode.data);
            vdom.commit(currentPatch, 2, vnode, oldVnode.elm);
        } else if (oldVnode.sel !== vnode.sel){ // 不同类型节点
            console.log('不同类型', vnode.sel);
            vdom.commit(currentPatch, 1, vnode, undefined, parentElm);
        }
        return currentPatch;
    }

    // 比较并更新子节点
    static diffChildren(oldChildren, newChildren, parentElm) {
        let currentPatch = [];

        newChildren.forEach((vnode, key) => {
            let oldVnode = oldChildren[key];
            let newPatch = vdom.diff(oldVnode, vnode, parentElm);
            currentPatch = currentPatch.concat(newPatch);
            if (vnode.children !== undefined && typeof vnode.children !== 'string') {
                let diffChildrenQueue = [];
                if (Array.isArray(vnode.children)) {
                    diffChildrenQueue = vdom.diffChildren(oldVnode.children, vnode.children, oldVnode.elm);
                } else {
                    diffChildrenQueue = vdom.diffChildren([oldVnode.children], [vnode.children], oldVnode.elm);
                }
                currentPatch = currentPatch.concat(diffChildrenQueue);
            }
        });

        oldChildren.forEach((vnode, key) => {
            if (newChildren[key] === undefined && vnode.elm) {
                vdom.commit(currentPatch, 4, vnode, vnode.elm, parentElm);
            }
        });

        return currentPatch;
    }

    /* 提交更改记录
     * type {string} 1:新增 2:更新 3:移动 4:删除
     *
     */
    static commit(address, type, vnode, oldElm = undefined, oldParentElm = undefined) {
        address.push({ type, vnode, oldElm, oldParentElm});
    }

    // 遍历
    static walk(oldVnode, vnode, patch, index) {

    }

    // 更新
    static updateDom(queue) {
        queue.forEach((record) => {
            if (record.type === 2) { // 更新
                console.log('update');
                vdom.updateElm(record.vnode, record.oldElm);
            } else if (record.type === 1) { // 新增
                console.log('add');
                record.oldParentElm.appendChild(vdom.createElm(record.vnode));
            } else if (record.type === 4) {
                console.log('del', record.oldElm);
                record.oldParentElm.removeChild(record.oldElm);
            }
        });
    }

    // 更新子节点
    static updateChildren(parentElm, oldCh, newCh) {

    }

    // 比较并更新dom
    static patch(oldVnode, vnode) {
        if (!Utils.isVnode(oldVnode)) { // 真实dom
            if (Utils.isVnode(vnode)) {
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
            } else if (typeof vnode === 'string') {
                console.warn(oldVnode);
                oldVnode.appendChild(vdom.createElm(vnode));
            }
        } else { // 比较差异并更新
            let diffQueue = [], diffChildrenQueue = [];
            diffQueue = vdom.diff(oldVnode, vnode);
            if (vnode.children !== undefined && typeof vnode.children !== 'string') {
                if (Array.isArray(vnode.children)) {
                    diffChildrenQueue = vdom.diffChildren(oldVnode.children, vnode.children, oldVnode.elm);
                } else {
                    diffChildrenQueue = vdom.diffChildren([oldVnode.children], [vnode.children], oldVnode.elm);
                }
            }
            console.log('queue1', diffQueue);
            console.log('queue2', diffChildrenQueue);
            vdom.updateDom(diffQueue);
            vdom.updateDom(diffChildrenQueue);
        }
    }
}

export default {
    vnode: vdom.vnode,
    diff: vdom.diff,
    patch: vdom.patch
}
