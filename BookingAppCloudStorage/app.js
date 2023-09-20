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
//Delete from cloud storage
//userList.addEventListener('click', removeFromCloud);
//edit an item
userList.addEventListener('click', editItem);

window.addEventListener('DOMContentLoaded',()=>{
    axios.get('https://crudcrud.com/api/9f269f43c52442c8887cd5c6912fd766/BooKAppointment')
    .then((response)=>{
        for(var i = 0;i<response.data.length;i++)
        {
            //console.log(response.data[i])
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
        li.appendChild(document.createTextNode(`${user.name}-${user.email} ` ));
    
        // Append to ul
        userList.appendChild(li);     
                 
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
    li.appendChild(document.createTextNode(`${nameInput.value}-${emailInput.value} ` ));

    // Append to ul
    userList.appendChild(li);     
  
    //Adding more than one users
     myObj = {
      name : nameInput.value,
      email : emailInput.value
    };
        
    axios.post('https://crudcrud.com/api/9f269f43c52442c8887cd5c6912fd766/BookAppointment',myObj)
    .then((response)=>{
        //console.log(response);
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
// Remove item
function removeItem(e){
    
    var email = ''
    if(e.target.classList.contains('delete')){
    var li = e.target.parentElement;      
    var str = (li.textContent);
    var name = '';
    var j;
    for(var i = 0;i<str.length;i++)
    {
        if(str[i] == '-')
      {
        name = str.substring(0,i)
        j = i + 1;
        while(j<str.length && str[j] != ' ')
        {      
        email = email + str[j]; 
        j++; 
        } 
      }         
    }
    userList.removeChild(li);
    axios.get('https://crudcrud.com/api/9f269f43c52442c8887cd5c6912fd766/BooKAppointment')
    .then((res) =>{
      console.log(res.data[0]);
        for(var i = 0;i<res.data.length;i++)
        {
            //console.log(res.data[0])
            if(res.data[i].email === email)
            {
            console.log("Gone inside")
            const val = res.data[i]._id;
            axios.delete(`https://crudcrud.com/api/9f269f43c52442c8887cd5c6912fd766/BooKAppointment/${val}`)
            .then((res)=>{
            
            })
            .catch((error)=>
            {
                console.log(error)
            })
            break;
        }
        }
    })
    //axios.delete()
    }
}

// Edit item
function editItem(e){ 
     
    if(e.target.classList.contains('edit')){    
    var li = e.target.parentElement;      
    //localStorage.removeItem(myObj.email);
    //userList.removeChild(li);     
    //onSubmit(e);  
    }
}
