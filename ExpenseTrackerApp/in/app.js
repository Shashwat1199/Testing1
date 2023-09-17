let myForm = document.querySelector('#my-form');
let msg = document.querySelector('.msg');

let userList = document.querySelector('#users');
let items = [];
// Listen for form submit
myForm.addEventListener('submit', onSubmit);


let myObj;
function onSubmit(e) {
  e.preventDefault();  
  
 const amountInput = e.target.eAmount.value;
 const eDetailInput = e.target.eDetail.value;
 const eTypeInput = e.target.eType.value;
  if(amountInput.value === 0 || eDetailInput.value === '' || eTypeInput.value === null) {
    // alert('Please enter all fields');
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    // Create new list item with user
    const li = document.createElement('li');
    
    // Add text node with input values
    li.appendChild(document.createTextNode(`${amountInput}-${eDetailInput}-${eTypeInput} ` ));

    // Append to ul
    userList.appendChild(li);     
  
    //Adding more than one users
     myObj = {
      amount : amountInput,
      detail : eDetailInput,
      type : eTypeInput
    };
        
     localStorage.setItem(myObj.detail, JSON.stringify(myObj));
    

    // Create del button element
    const deleteBtn = document.createElement('button');

     // Add classes to del button
     deleteBtn.className = 'btn btn-danger btn-sm float-right delete';

  // Append text node
     deleteBtn.appendChild(document.createTextNode('Delete'));

  // Append button to li
     li.appendChild(deleteBtn);

     //Remove Item
     deleteBtn.onclick = (e) => {
      var li = e.target.parentElement;        
      var str = (li.textContent);
      var amount;var desc = '';var type= '';
      var j;
      for(var i = 0;i<str.length;i++)
      {
         if(str[i] == '-')
         {
            amount = str.substring(0,i)
            j = i + 1;
            while(str[j] != '-' && j<str.length)
            {      
            desc = desc + str[j]; 
            j++; 
            } 
            j = j + 1;
            while(str[j] != ' ' && j<str.length)
            {      
            type = type + str[j]; 
            j++; 
            } 
            break;
         }         
      }
      localStorage.removeItem(desc);
      userList.removeChild(li); 
    }

     
    //Edit Button 
     var editBtn = document.createElement('button');

  // Add classes to edit button
     editBtn.className = 'btn btn-primary btn-sm float-right delete';

  // Append text node
     editBtn.appendChild(document.createTextNode('Edit'));

  // Append button to li
     li.appendChild(editBtn);

  
     //Edit Item
    editBtn.onclick = (e) => {
      var li = e.target.parentElement;        
      var str = (li.textContent);
      var amount;var desc = '';var type= '';
      var j;
      for(var i = 0;i<str.length;i++)
      {
         if(str[i] == '-')
         {
            amount = str.substring(0,i)
            j = i + 1;
            while(str[j] != '-' && j<str.length)
            {      
            desc = desc + str[j]; 
            j++; 
            } 
            j = j + 1;
            while(str[j] != ' ' && j<str.length)
            {      
            type = type + str[j]; 
            j++; 
            } 
            break;
         }         
      }
      localStorage.removeItem(desc);
      userList.removeChild(li); 
      document.getElementById('eAmount').value = amount;
      document.getElementById('eDetail').value = desc;
      document.getElementById('eType').value = type;
    }  
  }
}
