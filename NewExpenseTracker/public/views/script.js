const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const categ = document.getElementById('categ');
const amount = document.getElementById('amount');
let totalPrice = 0;
// const localStorageTransactions = JSON.parse(
//     localStorage.getItem('transactions')
// );

// let transactions =
//     localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

//DOM content loaded
window.addEventListener('DOMContentLoaded',()=>{
        axios.get('http://localhost:3000/expense/get-expenses')
        .then((response)=>{
          for(var i = 0;i<response.data.allExpenses.length;i++)
             totalPrice += Number(response.data.allExpenses[i].amount);
    
             updateValues(totalPrice)

          for(var i = 0;i<response.data.allExpenses.length;i++){ 
                console.log(response.data.allExpenses[i])           
                addTransactionDOM(response.data.allExpenses[i]);
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    });

// Init app
// function init() {
//     list.innerHTML = '';

//     transactions.forEach(addTransactionDOM);
//     updateValues();
// }

// init();

// Add transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '' || categ.value.trim() === '') {
        alert('Please add all fields');
    } else {
        const transaction = {
            // id: generateID(),
            description: text.value,
            amount: +amount.value,
            category: categ.value
        };

        // transactions.push(transaction);

    axios.post("http://localhost:3000/expense/add-expense", transaction)
    .then((response)=>{
       console.log("POST Request done ");        
     //console.log("Reached at last line");
    })
    .catch((err)=>{
        console.log("Coming in error block for POST request" + err);
    }) 

        addTransactionDOM(transaction);

        //updateValues();

        //updateLocalStorage();

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
    </span> <button class="delete-btn" onclick="removeTransaction(${transaction.id
        })">x</button>
  `;

    list.appendChild(item);
}

// Update the balance, income and expense
function updateValues(totalPrice) {
    // const amounts = transactions.map(transaction => transaction.amount);

    // const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    // const income = amounts
    //     .filter(item => item > 0)
    //     .reduce((acc, item) => (acc += item), 0)
    //     .toFixed(2);

    // const expense = (
    //     amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    //     -1
    // ).toFixed(2);

    // balance.innerText = `₹${total}`;
    // money_plus.innerText = `₹${income}`;
    money_minus.innerText = `₹${totalPrice}`;
}

// Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();

    init();
}

// Update local storage transactions
// function updateLocalStorage() {
//     localStorage.setItem('transactions', JSON.stringify(transactions));
// }



form.addEventListener('submit', addTransaction);