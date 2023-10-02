const myForm = document.querySelector('#my-form');
const amountInput = document.querySelector('#amount');
const descriptionInput = document.querySelector('#description');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');
let li;
let totalPrice = 0;
myForm.addEventListener('submit', onSubmit);

userList.addEventListener('click', removeItem);

userList.addEventListener('click', editItem);

window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:3000/user/get-users')
    .then((response)=>{
      for(var i = 0;i<response.data.allRecords.length;i++)
         totalPrice += Number(response.data.allRecords[i].amount);

         showTotalWorth(totalPrice)
      for(var i = 0;i<response.data.allRecords.length;i++){            
            showSavedUserOnScreen(response.data.allRecords[i]);
        }
    })
    .catch((error)=>{
        console.log(error);
    })
});

function showTotalWorth(totalPrice)
{
    let parent = document.getElementById("my-form"); 
         const newContent = document.createElement("div");
         newContent.style.fontSize = '130%'
         newContent.style.color = 'green'
         const textNode = document.createTextNode(`Total Value Worth of Products : ${totalPrice}`);
         newContent.append(textNode);
         parent.appendChild(newContent);
}

function showSavedUserOnScreen(user)
{

    if(user.amount == 0 || user.description == '') {
        
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
    
        //Remove error after 3 seconds
        setTimeout(() => msg.remove(), 3000);
      } else {
        
        li = document.createElement('li');    
        
        li.appendChild(document.createTextNode(`${user.amount}-${user.description} ` ));    
        
        userList.appendChild(li);                      
        
        var deleteBtn = document.createElement('button');    
        
        deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    
         deleteBtn.appendChild(document.createTextNode('X'));

         li.appendChild(deleteBtn);

         var editBtn = document.createElement('button');

         editBtn.className = 'btn btn-primary btn-sm float-right delete';

         editBtn.appendChild(document.createTextNode('Edit'));

         li.appendChild(editBtn);     
      }
}

function onSubmit(e) {
  e.preventDefault();
  
  if(amountInput.value == 0 || descriptionInput.value == '') {
    // alert('Please enter all fields');
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    // Create new list item with user
    li = document.createElement('li');

    // Add text node with input values
    li.appendChild(document.createTextNode(`${amountInput.value}-${descriptionInput.value} ` ));

    // Append to ul
    userList.appendChild(li);     
  
    //Adding more than one users
     var myObj = {
      amount : amountInput.value,
      description : descriptionInput.value
    };
    console.log(myObj);    
    axios.post("http://localhost:3000/user/add-user",myObj)
    .then((response)=>{
      // console.log("Gone inside ");        
      // console.log("Reached at last line");
    })
    .catch((err)=>{
        console.log("Coming in error block " +err);
    })  
    
    var deleteBtn = document.createElement('button');

    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';

    deleteBtn.appendChild(document.createTextNode('X'));

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
    var j;let amount = 0;let description = ''
    for(var i = 0;i<str.length;i++)
    {
        if(str[i] == '-')
      {
        amount = str.substring(0,i)
        j = i + 1;
        while(j<str.length && str[j] != ' ')
        {      
        description = description + str[j]; 
        j++; 
        } 
      }         
    }
    userList.removeChild(li);
    axios.get('http://localhost:3000/user/get-users')
    .then((res) =>{
      
        for(var i = 0;i<res.data.allRecords.length;i++)
        {
            
            if(res.data.allRecords[i].description == description)
            {

            const val = res.data.allRecords[i].id;
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
        var j;var amount = 0;var description = '';
        for(var i = 0;i<str.length;i++)
        {
            if(str[i] == '-')
          {
            amount = str.substring(0,i)
            j = i + 1;
            while(j<str.length && str[j] != ' ')
            {      
           description = description + str[j]; 
            j++; 
            } 
          }         
        }
        
        document.getElementById('amount').value = amount;
        document.getElementById('description').value = description;
        userList.removeChild(li);         
        axios.get('http://localhost:3000/user/get-users')
        .then((res) =>{
          
            for(var i = 0;i<res.data.allRecords.length;i++)
            {                
                if(res.data.allRecords[i].description == description)
                {
                console.log("Gone inside edit")
                const val = res.data.allRecords[i].id;
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
