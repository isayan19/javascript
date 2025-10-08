document.addEventListener("DOMContentLoaded",()=>{
const expForm=document.getElementById("expense-form")
const expName=document.getElementById('expense-name')
const expAmount=document.getElementById('expense-amount')
const expList=document.getElementById('expense-list')
const amountDisplay=document.getElementById('total-amount')

let expenses=JSON.parse(localStorage.getItem('expense')) || [];
let totalAmount=calculateTotal()

renderExpenses();

expForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const name=expName.value.trim()
    const amount=parseFloat(expAmount.value.trim());
    
    if(name !== "" && !isNaN(amount) && amount>0){
        const newExpense={
            id: Date.now(),
            name: name,
            amount: amount
        }
        expenses.push(newExpense);
        savelocal();
        renderExpenses();
        updateTotal();

        expName.value="";
        expAmount.value="";
    }
})

function renderExpenses(){
    expList.innerHTML="";
    expenses.forEach(e=>{
        const li=document.createElement('li');
        li.className ="flex justify-between items-center bg-[#73D2DE30] text-white text-lg font-serif rounded-lg px-3 py-2 shadow-sm"
        li.innerHTML=`${e.name} - ${e.amount}
        <button
         class="bg-[#FFBC42] text-white px-3 py-1 rounded-lg cursor-pointer hover:bg-[#E89E2B] transition" data-id="${e.id}">Delete</button>`;
        expList.appendChild(li);
    })
    updateTotal();
}

expList.addEventListener('click',(e)=>{
    if(e.target.tagName === 'BUTTON'){
        const expenseId = parseInt(e.target.getAttribute('data-id'));
        expenses=expenses.filter((e)=>e.id !== expenseId);
        savelocal();
        renderExpenses();
        updateTotal();
    }
})

function calculateTotal(){
    return expenses.reduce((sum,expense)=>sum+expense.amount,0)
}

function savelocal(){
    localStorage.setItem("expense",JSON.stringify(expenses))
}

function updateTotal(){
    totalAmount=calculateTotal();
    amountDisplay.textContent=totalAmount.toFixed(2);
}
})