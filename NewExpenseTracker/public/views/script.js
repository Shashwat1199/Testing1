const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const form = document.getElementById('form');
const text = document.getElementById('text');
const categ = document.getElementById('categ');
const amount = document.getElementById('amount');
const premBtn = document.getElementById('rzp-button1')
const userlist = document.getElementById('userlist');
let totalPrice = 0;
let income = 0;
let expense = 0;

//DOM content loaded
window.addEventListener('DOMContentLoaded',()=>{
   
   onload();
});
async function onload(){

    const token = localStorage.getItem('token') 
    const decodeToken = parseJwt(token)
    const isPremiumUser = decodeToken.ispremiumuser;
    if(isPremiumUser){
        showPremiumUserMessage();
    }
    
    try{
    const response = await axios.get('http://localhost:3000/expense/get-expenses', {headers : {"Authorization": token}})

     result(response);    
     function result(response){
      for(var i = 0;i<response.data.allExpenses.length;i++)
      {
        if(Number(response.data.allExpenses[i].amount < 0))
        expense -= Number(response.data.allExpenses[i].amount) 
        else
        income += Number(response.data.allExpenses[i].amount) 
        totalPrice += Number(response.data.allExpenses[i].amount);
      }
      updateValues(totalPrice,expense,income)

      for(var i = 0;i<response.data.allExpenses.length;i++){ 
            console.log(response.data.allExpenses[i])           
            addTransactionDOM(response.data.allExpenses[i]);
        }
    }
}
    catch(error){
        console.log(error);
}
}
//Premium User
async function premiumUser(e){
    e.preventDefault();

    const token = localStorage.getItem('token');
    //console.log("Working upto here");
    const response = await axios.get('http://localhost:3000/purchase/premium-user',{headers:{"Authorization": token}});

    //console.log("Authorization Done Coming here " + response);

    var options = {
        "key": response.data.key_id,
        "order_id" : response.data.order.id,           

        "handler": async function (response) {
           const res = await axios.post('http://localhost:3000/purchase/update-transaction-status',{                
                order_id : options.order_id,
                payment_id : response.razorpay_payment_id,
            },{headers: {"Authorization" : token}})
            
            alert('You are a premium user now'); 
            localStorage.setItem('token', res.data.token)  
            //console.log(res.data);
            showPremiumUserMessage();             
        }     
    };

    //console.log("Actually here " + options);
    var rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed', function(response){
        //console.log("This is response " + response);
        alert('Something went wrong');
    });
 }


// Add transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '' || categ.value.trim() === '') {
        alert('Please add all fields');
    } else {
        const transaction = {
            //id: generateID(),
            description: text.value,
            amount: +amount.value,
            category: categ.value
        };
        
    const token = localStorage.getItem('token')
    axios.post("http://localhost:3000/expense/add-expense", transaction, {headers : {"Authorization": token}})
    .then((response)=>{
       console.log("POST Request done Respone >> " + JSON.stringify(response));        
     //console.log("Reached at last line");
    })
    .catch((err)=>{
        console.log("Coming in error block for POST request" + err);
    }) 

        addTransactionDOM(transaction);

        text.value = '';
        amount.value = '';
        categ.value = '';
    }
}

// Generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    // Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
    ${transaction.description} <span>${sign}${Math.abs(
        transaction.amount 
    )} <span>${transaction.category}
    </span> <button class="delete-btn"  onclick="deleteExpense(${transaction.id
        })">x</button>
  `;

    list.appendChild(item);
}

// Update the balance, income and expense
function updateValues(total, expense, income) {
         
    balance.innerText = `₹${total}`;
    money_plus.innerText = `₹${income}`;
    money_minus.innerText = `₹${expense}`;
}

// Remove expense by ID
async function deleteExpense(expenseid) {
    //e.preventDefault();
    const token = localStorage.getItem('token')
    console.log(expenseid)
    const p = await axios.delete(`http://localhost:3000/expense/delete-expense/${expenseid}`, {headers : {"Authorization": token}})

   removeExpensefromUI();           
}

function removeExpensefromUI(){   
   
    //list.innerHTML = '';
    reload(); 
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
}

function showPremiumUserMessage(){

    premBtn.style.visibility = 'hidden';                
    document.getElementById('message').innerHTML = "You are a Premium User";
    document.getElementById('message').style.color  = 'white';
    document.getElementById('message').style.backgroundColor  = 'green';

    var leadBtn = document.createElement("button");
  
    leadBtn.className = "btn btn-secondary btn-sm float-right ShowLeaderBoard"   
    leadBtn.innerHTML = "Show LeaderBoard"

    const doc = document.getElementById('premDiv')
    doc.appendChild(leadBtn);

    
    var downBtn = document.createElement("button");
    
    downBtn.className = "btn btn-secondary btn-sm float-right Download"   
    downBtn.innerHTML = "Download File"
    
    //const doc = document.getElementById('premDiv')
    doc.appendChild(downBtn);

    downBtn.onclick = async() => {

        const token = localStorage.getItem('token');
       
        axios.get('http://localhost:3000/user/download', { headers: {"Authorization" : token} })
        .then((response) => {
            if(response.status === 201){
                //the bcakend is essentially sending a download link
                //which if we open in browser, the file would download
                var a = document.createElement("a");
                a.href = response.data.fileUrl;
                a.download = 'myexpense.csv';
                a.click();
            } else {
                throw new Error(response.data.message)
            }
    
        })
        .catch((err) => {
            showError(err)
        });
        var leaderboardElem = document.getElementById('leaderboard');
        leaderboardElem.innerHTML += '<h3> Leader Board </h1>'
    }
    
    leadBtn.onclick = async() => {
        
        const token = localStorage.getItem('token');
        const userLeaderBoardArray = await axios.get('http://localhost:3000/purchase/showLeaderBoard', {headers : {"Authorization": token}})  
        
        var leaderboardElem = document.getElementById('leaderboard');
        leaderboardElem.innerHTML += '<h3> Leader Board </h1>'

        console.log(userLeaderBoardArray)

        userLeaderBoardArray.data.leaderboardofusers.forEach((userDetails) => {
            console.log(userDetails)
            leaderboardElem.innerHTML += `<li> Name : ${userDetails.name}   <span> Total Expense : ${userDetails.total_expense} </span>`
        });  
        
        //console.log(userLeaderBoardArray);
  }
}

userlist.addEventListener('click', deleteExpense)
form.addEventListener('submit', addTransaction);
premBtn.addEventListener('click', premiumUser);