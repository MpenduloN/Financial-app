const balanceEl = document.getElementById('balance');
const descriptionEl = document.getElementById('description');
const amountEl = document.getElementById('amount');
const addBtn = document.getElementById('addBtn');
const transactionList = document.getElementById('transaction-list');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateBalance() {
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((a, b) => a + b, 0);
  balanceEl.innerText = total.toFixed(2);
}

function renderTransactions() {
  transactionList.innerHTML = '';
  transactions.forEach((t, index) => {
    const li = document.createElement('li');
    li.innerText = `${t.description}: $${t.amount}`;
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'x';
    removeBtn.style.marginLeft = '10px';
    removeBtn.onclick = () => removeTransaction(index);
    li.appendChild(removeBtn);
    transactionList.appendChild(li);
  });
}

function addTransaction() {
  const description = descriptionEl.value.trim();
  const amount = parseFloat(amountEl.value.trim());
  if (description && !isNaN(amount)) {
    transactions.push({ description, amount });
    localStorage.setItem('transactions', JSON.stringify(transactions));
    descriptionEl.value = '';
    amountEl.value = '';
    renderTransactions();
    updateBalance();
  }
}

function removeTransaction(index) {
  transactions.splice(index, 1);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  renderTransactions();
  updateBalance();
}

addBtn.addEventListener('click', addTransaction);

// Initial render
renderTransactions();
updateBalance();
