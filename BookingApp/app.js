const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');
var items = [];
// Listen for form submit
myForm.addEventListener('submit', onSubmit);

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
    li.appendChild(document.createTextNode(`${nameInput.value}  ${emailInput.value}`));

    // Append to ul
    userList.appendChild(li);     
  
    //Adding more than one users
     let myObj = {
      name : nameInput.value,
      email : emailInput.value
    };
        
      items.push(myObj);
      localStorage.setItem("item", JSON.stringify(items));
  
  
    // Clear fields
    nameInput.value = '';
    emailInput.value = '';
  }
}