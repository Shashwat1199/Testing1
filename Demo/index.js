console.log(document.domain);
console.log('hello');

console.log(document.doctype);
console.log(document.body);
console.log(document.body.children[2]);
console.log(document.body.children[1]);
console.log(document.all);
var ul = (document.getElementById('items'));
console.log(ul.getAttribute);
var headerTitle = document.getElementById('header-title');
//headerTitle.textContent = 'hello';
headerTitle.style.borderBottom = 'solid 3px black';
console.log(headerTitle);
var header = document.getElementById('main-header');
header.style.borderBottom = 'solid 3px black';
var addItem = document.getElementsByClassName('title');
addItem[0].style.fontWeight = 'bold';
addItem[0].style.color = 'green'



