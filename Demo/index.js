var addItem = document.querySelector('#main-header')
addItem.children[0].style.color = 'red';
console.log(addItem.children)

var newDiv = document.createElement('id')
newDiv.id = 'hello'

var newDivText = document.createTextNode('Hello World!')

 newDiv.appendChild(newDivText)

 var container = document.querySelector('header .container')
 var h1 =   document.querySelector('header h1')

 container.insertBefore(newDiv,h1);     

var newDiv = document.createElement('id')
newDiv.id = 'hello'

var newDivText = document.createTextNode('Hello World!')

 newDiv.appendChild(newDivText)

 var container = document.querySelector('#main') 
 var h1 = document.querySelector('#items')

 container.insertBefore(newDiv,h1);   