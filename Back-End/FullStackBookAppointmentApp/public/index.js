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
//Edit item
userList.addEventListener('click', editItem);

window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:3000/user/get-users')
    .then((response)=>{
      //console.log(response.data)
        for(var i = 0;i<response.data.allUsers.length;i++)
        {
            
            showSavedUserOnScreen(response.data.allUsers[i]);
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
     var myObj = {
      name : nameInput.value,
      email : emailInput.value
    };
    // console.log(myObj.name);    
    axios.post("http://localhost:3000/user/add-user",myObj)
    .then((response)=>{
      console.log("Gone inside ");
        //console.log(response);
        
        console.log("Reached at last line");
    })
    .catch((err)=>{
        console.log("Coming in error block " +err);
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
     editBtn.className = 'btn btn-primary btn-sm float-right edit';

    // Append text node
     editBtn.appendChild(document.createTextNode('Edit'));

    // Append button to li
     li.appendChild(editBtn);
      
  }
}

// Remove item
function removeItem(e){
    
    if(e.target.classList.contains('delete')){
    var li = e.target.parentElement;      
    var str = (li.textContent);
    var j;let name = '';let email = ''
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
    axios.get('http://localhost:3000/user/get-users')
    .then((res) =>{
      //console.log(res.data.allUsers);
        for(var i = 0;i<res.data.allUsers.length;i++)
        {
            //console.log(res.data[0])
            if(res.data.allUsers[i].email == email)
            {
            //console.log("Gone inside")
            const val = res.data.allUsers[i].id;
            axios.delete(`http://localhost:3000/user/delete-user/${val}`)
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
    }
}

// Edit item
function editItem(e){ 
     
    if(e.target.classList.contains('edit')){
        var li = e.target.parentElement;      
        var str = (li.textContent);
        var j;var name = '';var email = ''
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
        
        document.getElementById('name').value = name;
        document.getElementById('email').value = email;
        userList.removeChild(li);         
        axios.get('https://crudcrud.com/api/637f512102e44eb8ac2c326ce4038638/BooKAppointment')
        .then((res) =>{
          console.log(res.data[0]);
            for(var i = 0;i<res.data.length;i++)
            {
                //console.log(res.data[0])
                if(res.data[i].email === email)
                {
                console.log("Gone inside edit")
                const val = res.data[i]._id;
                axios.delete(`https://crudcrud.com/api/637f512102e44eb8ac2c326ce4038638/BooKAppointment/${val}`)
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
       }
}
