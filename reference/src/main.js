// var snabbdom = require('snabbdom');
// var patch = snabbdom.init([
//   require('snabbdom/modules/class').default,
//   require('snabbdom/modules/style').default
// ]);

// var container = document.getElementById('container');

// var vnode = snabbdom.h('div#container.two.classes');

// patch(container, vnode);

// var newVnode = snabbdom.h('div', {
//     style: {
//       backgroundColor: '#f00'
//     },
//   },
//   snabbdom.h('span', {
//     style: {
//       color: '#0f0'
//     }
//   }, 'hello world'));

// patch(vnode, newVnode);

// console.log(document.body.childNodes);

import vdom from '../libs/vdom/dist/vdom.js';
console.log('vdom: ', vdom);

// 渲染函数，生成vnode
function renderNode(w) {
  let vnode, vp, vs, vs2;

  if (w === 100) {
    vs = vdom.vnode('span', {
      style: {
        color: '#ccc'
      }
    }, 'hello');
  } else {
    vs = vdom.vnode('em', {
      style: {
        color: '#0f0'
      }
    }, 'world');
  }

  vs2 = vdom.vnode('span', {
    style: {
      color: '#0f0'
    }
  }, 'world');

  vp = vdom.vnode('p', {
    style: {
      display: 'inline-block',
      width: '50%',
      verticalAlign: 'middle',
      backgroundColor: '#00f'
    }
  }, [
    vs,
    w.toString(),
    vs2
  ]);

  vnode =  vdom.vnode('div', {
    style: {
      display: 'table-cell',
      width: w + 'px',
      textAlign: 'center',
      backgroundColor: '#f00'
    },
    attrs: {
      a: '1'
    }
  }, vp);

  return vnode;
}

let container, oldNode, newNode, w;

w = 100;
container = document.getElementById('container');
oldNode = renderNode(w);
vdom.patch(container, oldNode);

setTimeout(_ => {
  w = 120;
  newNode = renderNode(w);
  vdom.patch(oldNode, newNode);
}, 1000);

// console.log(newNode);
