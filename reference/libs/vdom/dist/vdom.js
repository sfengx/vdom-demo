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
        // 转换children为数组类型
        if (!Array.isArray(children) && children !== undefined) {
            children = [children];
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

        return dom;
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

    // 比较并更新虚拟node
    static diff(oldVnode, vnode, parentElm = undefined) {
        // console.log(oldVnode.sel, vnode.sel);
        let currentPatch = [];

        if (oldVnode === undefined) {
            vdom.commit(currentPatch, 1, vnode, undefined, parentElm);
        } else if (oldVnode.sel === vnode.sel) {
            // 相同类型节点
            if (!Utils.equalObject(oldVnode.data, vnode.data, true)) {
                console.log('相同类型，不同属性', vnode.sel, oldVnode.data, vnode.data);
                vdom.commit(currentPatch, 2, vnode, oldVnode.elm);
            }
            if (vnode.children && vnode.children.length) {
                // 有子节点
                let diffChildrenQueue = [];
                diffChildrenQueue = vdom.diffChildren(oldVnode.children, vnode.children, oldVnode.elm);
                currentPatch = currentPatch.concat(diffChildrenQueue);
            }
        } else if (oldVnode.sel !== vnode.sel){
            // 不同类型节点
            console.log('不同类型', vnode.sel, oldVnode.sel);
            vdom.commit(currentPatch, 1, vnode, undefined, parentElm);
        }

        return currentPatch;
    }

    // 比较并更新子节点
    static diffChildren(oldChildren, newChildren, parentElm) {
        let currentPatch = [];

        newChildren.forEach((vnode, key) => {
            let newPatch = vdom.diff(oldChildren[key], vnode, parentElm);
            currentPatch = currentPatch.concat(newPatch);
        });

        oldChildren.forEach((vnode, key) => {
            if (newChildren[key] === undefined && vnode.elm) {
                vdom.commit(currentPatch, 4, vnode, vnode.elm, parentElm);
            }
        });

        return currentPatch;
    }

    // 遍历
    static walk(oldVnode, vnode, patch, index) {
        let diffQueue = [];
        diffQueue = vdom.diff(oldVnode, vnode);
        console.warn(diffQueue.length + '个提交', diffQueue);
        return diffQueue;
    }

    /*
     * 提交更改记录
     * @param {array} queue 更新队列
     * @param {string} type 1:新增 2:更新 3:移动 4:删除
     * @param {vnode} vnode 虚拟node
     * @param {dom} oldElm 旧节点
     * @param {dom} oldParentElm 旧父节点
     * @return void
     */
    static commit(queue, type, vnode, oldElm = undefined, oldParentElm = undefined) {
        queue.push({ type, vnode, oldElm, oldParentElm});
    }

    /*
     * 合并更改
     * @param {array} queue 队列
     * @return void
     */
    static merge(queue) {
        queue.forEach((record) => {
            if (record.type === 2) { // 更新
                console.log('update');
                vdom.updateElm(record.vnode, record.oldElm);
            } else if (record.type === 1) { // 新增
                console.log('add');
                vdom.patch(record.oldParentElm, record.vnode);
                // record.oldParentElm.appendChild(vdom.createElm(record.vnode));
            } else if (record.type === 4) { // 删除
                console.log('del', record.oldElm);
                record.oldParentElm.removeChild(record.oldElm);
            }
        });
    }

    // 比较并更新dom
    static patch(oldVnode, vnode) {
        if (!Utils.isVnode(oldVnode)) { // 真实dom
            if (Utils.isVnode(vnode)) {
                vnode.elm = vdom.createElm(vnode);
                oldVnode.appendChild(vnode.elm);
                if (vnode.children !== undefined) {
                    // 判断是否无子节点
                    vnode.children.forEach(node => {
                        vdom.patch(vnode.elm, node);
                    });
                }
            } else if (typeof vnode === 'string') {
                // console.warn(vnode);
                oldVnode.appendChild(vdom.createElm(vnode));
            }
        } else {
            // 比较差异并更新
            let queue = [];
            queue = vdom.walk(oldVnode, vnode);
            vdom.merge(queue);
        }
    }
}

export default {
    vnode: vdom.vnode,
    diff: vdom.diff,
    patch: vdom.patch
}
