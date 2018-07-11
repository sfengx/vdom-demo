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
console.log(vdom);

let node = vdom.vnode('div', {
  style: {
    display: 'table-cell',
    width: '100px',
    textAlign: 'center',
    backgroundColor: '#f00'
  },
  attrs: {
    a: '1'
  }
}, vdom.vnode('p', {
  style: {
    display: 'inline-block',
    width: '50%',
    verticalAlign: 'middle',
    backgroundColor: '#00f'
  }
}, [
  vdom.vnode('span', {
    style: {
      color: '#0f0'
    }
  }, 'hello'),
  vdom.vnode('span', {
    style: {
      color: '#0f0'
    }
  }, ' world'),
  '!'
]));

var container = document.getElementById('container');
vdom.patch(container, node);

console.log(node);
