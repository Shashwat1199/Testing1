const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const categ = document.getElementById('categ');
const amount = document.getElementById('amount');
let totalPrice = 0;
let income = 0;
let expense = 0;


//DOM content loaded
window.addEventListener('DOMContentLoaded',()=>{

   onload();
});


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
function deleteExpense(expenseid) {
    const token = localStorage.getItem('token')
    axios.delete(`http://localhost:3000/expense/delete-expense/${expenseid}`, {headers : {"Authorization": token}})

    removeExpensefromUI();   
       
}

function removeExpensefromUI(){   
    list.innerHTML = '';
    onload();
}

function onload(){
   
        const token = localStorage.getItem('token') 
        axios.get('http://localhost:3000/expense/get-expenses', {headers : {"Authorization": token}})
        .then((response)=>{
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
        })
        .catch((error)=>{
            console.log(error);
    })
}
form.addEventListener('submit', addTransaction);