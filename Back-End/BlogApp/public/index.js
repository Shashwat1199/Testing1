const myForm = document.querySelector('#my-form');
const imageInput = document.querySelector('#image');
const descriptionInput = document.querySelector('#description');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');
let li;var toAppend;let data; let cform;

myForm.addEventListener('submit', onSubmit1);

userList.addEventListener('click', removeItem);

userList.addEventListener('click', editItem);

window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:3000/post/get-posts')
    .then((response)=>{
     
      for(var i = 0;i<response.data.allRecords.length;i++){            
            showSavedUserOnScreen(response.data.allRecords[i]);
        }
    })
    .catch((error)=>{
        console.log(error);
    })
});

function showSavedUserOnScreen(user)
{

    if(user.image == '' || user.description == '') {
        
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
    
        //Remove error after 3 seconds
        setTimeout(() => msg.remove(), 3000);
      } else {
        
        li = document.createElement('li');    
               
        userList.appendChild(li);                      
        
        var deleteBtn = document.createElement('button');    
        
        deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    
        deleteBtn.appendChild(document.createTextNode('Comment'));

        li.appendChild(deleteBtn);
   
      }
}

function onSubmit1(e) {
  e.preventDefault();
  
  if(imageInput.value == '' || descriptionInput.value == '') {
    // alert('Please enter all fields');
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    // Create new list item with user
    li = document.createElement('li');
 
    var img=document.createElement('img');
    img.src = imageInput.value;
 
    li.appendChild(img)

    // Add text node with input values
    li.appendChild(document.createTextNode(`${descriptionInput.value} ` ));

    // Append to ul
    userList.appendChild(li);     
  
    //Adding more than one users
    var myObj = {
      image : imageInput.value,
      description : descriptionInput.value,
      //comments : cval.value
    };
    //console.log(myObj);    
    axios.post("http://localhost:3000/post/add-post",myObj)
    .then((response)=>{
      console.log("Gone inside ");        
      console.log("Reached at last line");
    })
    .catch((err)=>{
        console.log("Coming in error block " +err);
    })

    
    var deleteBtn = document.createElement('button');

    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    deleteBtn.id = 'myLocation'
    deleteBtn.appendChild(document.createTextNode('Comment'));

    li.appendChild(deleteBtn);
     
  }
}

function removeItem(e){
    
  if(e.target.classList.contains('delete')){
  var li = e.target.parentElement; 
  //console.log(e.target.id)  
  
  data = "<form id = 'c-form'><div> Comment:<input type = 'text' id = 'comment' name = 'comments'</div><br><br> <input type = 'submit' id = 'bitn' value = 'Post Comment' ></form>";
  document.getElementById("myLocation").innerHTML = data;
  toAppend = document.getElementById("myLocation")  
  li.appendChild(toAppend);
  cform = document.querySelector("#c-form")
  cform.addEventListener('submit', onSubmit2);
  
  }
}

 //let store = [];
 function onSubmit2(e)
  {
    e.preventDefault();
    var com = document.getElementById("c-form"); 
    var cval = com.querySelector('#comment');
    li.appendChild(document.createTextNode(`Anonymous User : ${cval.value } ` ));  
    li.appendChild(document.createElement('br'));
    
    //store.push(cval.value);

    var myObj = {
      // image : imageInput.value,
      // description : descriptionInput.value,
      comments : cval.value
    };
    //console.log(myObj);    
    axios.post("http://localhost:3000/post/add-post",myObj)
    .then((response)=>{
      console.log("Gone inside ");        
      console.log("Reached at last line");
    })
    .catch((err)=>{
        console.log("Coming in error block " +err);
    })

  }



// Edit item
// function editItem(e){ 
     
//     if(e.target.classList.contains('edit')){
//         var li = e.target.parentElement;      
//         var str = (li.textContent);
//         var j;var amount = 0;var description = '';
//         for(var i = 0;i<str.length;i++)
//         {
//             if(str[i] == '-')
//           {
//             amount = str.substring(0,i)
//             j = i + 1;
//             while(j<str.length && str[j] != ' ')
//             {      
//            description = description + str[j]; 
//             j++; 
//             } 
//           }         
//         }
        
//         document.getElementById('amount').value = amount;
//         document.getElementById('description').value = description;
//         userList.removeChild(li);         
//         axios.get('http://localhost:3000/user/get-users')
//         .then((res) =>{
          
//             for(var i = 0;i<res.data.allRecords.length;i++)
//             {                
//                 if(res.data.allRecords[i].description == description)
//                 {
//                 console.log("Gone inside edit")
//                 const val = res.data.allRecords[i].id;
//                 axios.delete(`http://localhost:3000/user/delete-user/${val}`)
//                 .then((res)=>{            
//                 })
//                 .catch((error)=>
//                 {
//                     console.log(error)
//                 })
//                 break;
//             }
//             }
//         })                
//       }
//     }
