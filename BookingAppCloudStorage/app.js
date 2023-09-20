const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');
let li;
// Listen for form submit
myForm.addEventListener('submit', onSubmit);
//Delete an element
userList.addEventListener('click', removeItem);
//edit an item
userList.addEventListener('click', editItem);

window.addEventListener('DOMContentLoaded',()=>{
    axios.get('https://crudcrud.com/api/ce86e8b862894f29b21c2ac198952d75/BooKAppointment')
    .then((response)=>{
        for(var i = 0;i<response.data.length;i++)
        {
            showSavedUserOnScreen(response.data[i]);
        }
    })
    .catch((error)=>{
        console.log(error);
    })
});

function showSavedUserOnScreen(user)
{
    if(user.name === '' || user.email === '') {
        // alert('Please enter all fields');
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
    
        // Remove error after 3 seconds
        setTimeout(() => msg.remove(), 3000);
      } else {
        // Create new list item with user
        li = document.createElement('li');
    
        // Add text node with input values
        li.appendChild(document.createTextNode(`${user.name}  ${user.email}` ));
    
        // Append to ul
        userList.appendChild(li);     
      
        //Adding more than one users
         myObj = {
          name : user.name,
          email : user.email
        };
            
        axios.post('https://crudcrud.com/api/ce86e8b862894f29b21c2ac198952d75/BookAppointment',myObj)
        .then((response)=>{
            console.log(response);
        })
        .catch((err)=>{
            console.log(err);
        })  
         
            // Create del button element
          var deleteBtn = document.createElement('button');
    
         // Add classes to del button
         deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    
      // Append text node
         deleteBtn.appendChild(document.createTextNode('X'));
    
      // Append button to li
         li.appendChild(deleteBtn);
    
        //Edit Button 
         var editBtn = document.createElement('button');
    
         // Add classes to edit button
         editBtn.className = 'btn btn-primary btn-sm float-right delete';
    
      // Append text node
         editBtn.appendChild(document.createTextNode('Edit'));
    
      // Append button to li
         li.appendChild(editBtn);
     
      }
}

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
    li = document.createElement('li');

    // Add text node with input values
    li.appendChild(document.createTextNode(`${nameInput.value}  ${emailInput.value}` ));

    // Append to ul
    userList.appendChild(li);     
  
    //Adding more than one users
     myObj = {
      name : nameInput.value,
      email : emailInput.value
    };
        
    axios.post('https://crudcrud.com/api/ce86e8b862894f29b21c2ac198952d75/BookAppointment',myObj)
    .then((response)=>{
        console.log(response);
    })
    .catch((err)=>{
        console.log(err);
    })  
     
        // Create del button element
      var deleteBtn = document.createElement('button');

     // Add classes to del button
     deleteBtn.className = 'btn btn-danger btn-sm float-right delete';

  // Append text node
     deleteBtn.appendChild(document.createTextNode('X'));

  // Append button to li
     li.appendChild(deleteBtn);

    //Edit Button 
     var editBtn = document.createElement('button');

     // Add classes to edit button
     editBtn.className = 'btn btn-primary btn-sm float-right delete';

  // Append text node
     editBtn.appendChild(document.createTextNode('Edit'));

  // Append button to li
     li.appendChild(editBtn);
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
  // Edit item
function editItem(e){ 
  if(e.target.classList.contains('edit')){
    
      
      var li = e.target.parentElement;      
      localStorage.removeItem(myObj.email);
      userList.removeChild(li);     
      onSubmit(e);  
      //localStorage.clear()
  }
}
