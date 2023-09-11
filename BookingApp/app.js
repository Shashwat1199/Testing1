const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');
var items = [];
// Listen for form submit
myForm.addEventListener('submit', onSubmit);
//Delete an element
userList.addEventListener('click', removeItem);
let myObj;
function onSubmit(e) {
  e.preventDefault();
  
  if(nameInput.value === '' || emailInput.value === '') {
    // alert('Please enter all fields');
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    // Create new list item with user
    const li = document.createElement('li');

    // Add text node with input values
    li.appendChild(document.createTextNode(`${nameInput.value}  ${emailInput.value}` ));

    // Append to ul
    userList.appendChild(li);     
  
    //Adding more than one users
     myObj = {
      name : nameInput.value,
      email : emailInput.value
    };
        
     localStorage.setItem(myObj.email, JSON.stringify(myObj));
     
        // Create del button element
      var deleteBtn = document.createElement('button');

     // Add classes to del button
     deleteBtn.className = 'btn btn-danger btn-sm float-right delete';

  // Append text node
     deleteBtn.appendChild(document.createTextNode('X'));

  // Append button to li
     li.appendChild(deleteBtn);

   
  // Append li to list
   //  itemList.appendChild(li);
  
  }
}
// Remove item
function removeItem(e){
  if(e.target.classList.contains('delete')){
    
      var li = e.target.parentElement;      
      localStorage.removeItem(myObj.email);
      userList.removeChild(li);       
      //localStorage.clear()
  }
}