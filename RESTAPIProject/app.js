let myForm = document.querySelector('#my-form');
let msg = document.querySelector('.msg');
let userList = document.querySelector('#users');

let totalPrice = 0;
myForm.addEventListener('submit', onSubmit);
//Delete an element
userList.addEventListener('click', removeItem);

window.addEventListener('DOMContentLoaded',()=>{
    axios.get('https://crudcrud.com/api/090d77a125a84e5faf9f94eb3f9f71b2/ECommerce')
    .then((response)=>{
        for(var i = 0;i<response.data.length;i++)
         totalPrice += Number(response.data[i].amount);

         showTotalWorth(totalPrice)
        for(var i = 0;i<response.data.length;i++)
        {
            showSavedUserOnScreen(response.data[i],totalPrice);
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
         newContent.style.fontSize = '150%'
         newContent.style.color = 'green'
         const textNode = document.createTextNode(`Total Value Worth of Products : ${totalPrice}`);
         newContent.append(textNode);
         parent.appendChild(newContent);
}
function showSavedUserOnScreen(user)
{

    if(user.amount === 0 || user.detail === '') {
        // alert('Please enter all fields');
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
    
        // Remove error after 3 seconds
        setTimeout(() => msg.remove(), 3000);
      } else {
        // Create new list item with user
        li = document.createElement('li');
    
        // Add text node with input values
        li.appendChild(document.createTextNode(`${user.amount}-${user.detail} ` ));
    
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

      }
}
let myObj;
function onSubmit(e) {
  e.preventDefault();  
  
 const amountInput = e.target.eAmount.value;
 const eDetailInput = e.target.eDetail.value;
  if(amountInput.value === 0 || eDetailInput.value === '') {
    // alert('Please enter all fields');
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    // Create new list item with user
    const li = document.createElement('li');
    
    // Add text node with input values
    li.appendChild(document.createTextNode(`${amountInput}-${eDetailInput} ` ));

    // Append to ul
    userList.appendChild(li);     
    
    //Adding more than one users
     myObj = {
      amount : amountInput,
      detail : eDetailInput,
    };
        
    axios.post('https://crudcrud.com/api/090d77a125a84e5faf9f94eb3f9f71b2/ECommerce',myObj)
    .then((response)=>{
        
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
    
  }
}
 function removeItem(e){

      //Remove Item  from cloud
      if(e.target.classList.contains('delete')){
        var li = e.target.parentElement;        
        var str = (li.textContent);
        var amount;var detail = '';
        var j;
        for(var i = 0;i<str.length;i++)
        {
           if(str[i] == '-')
           {
              amount = str.substring(0,i)
              j = i + 1;
              while(str[j] != ' ' && j<str.length)
              {      
              detail = detail + str[j]; 
              j++; 
              } 
              break;
           }         
        }
       
        userList.removeChild(li); 
        totalPrice -= amount
        axios.get('https://crudcrud.com/api/090d77a125a84e5faf9f94eb3f9f71b2/ECommerce')
        .then((res) =>{
          console.log(res.data[0].detail);    
          for(let i = 0;i<res.data.length;i++)
          {
              //console.log(res.data[0])
              if(res.data[i].detail === detail)
              {
              console.log("Gone inside")
              const val = res.data[i]._id;
              axios.delete(`https://crudcrud.com/api/090d77a125a84e5faf9f94eb3f9f71b2/ECommerce/${val}`)
              .then((res)=>{            
              })
              .catch((error)=>
              {
                  console.log(error)
              })
              break;
          }
        }
        totalPrice -= amount
      })
     }
}
