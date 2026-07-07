
// DOM Elements

const body = document.body;
const addBtn = document.getElementById("addBtn");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close");

const form = document.getElementById("transactionForm");

const tableBody = document.getElementById("tableBody");

const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const totalTransactionEl = document.getElementById("transactions");

const dashboard = document.getElementById("dashboard");
const settings = document.getElementById("settings");

const dashboardLink = document.getElementById("dashboardLink");
const settingsLink = document.getElementById("settingsLink");

const currencySelect = document.getElementById("currency");
const darkToggle = document.getElementById("darkToggle");
const saveSettingsBtn = document.getElementById("saveSettings");
const resetBtn = document.getElementById("resetData");
const login = document.querySelector("#loginBtn");
const logOut = document.querySelector("#logoutBtn");
// Inputs


const typeInput = document.getElementById("type");
const descInput = document.getElementById("description");
const categoryInput = document.getElementById("category");
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("date");


// Global Variables


let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

let currency = localStorage.getItem("currency") || "₹";

let editId = null;

let chart;



// Save Transactions


function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Calculate Totals


function calculateTotals() {
  let income = 0;
  let expense = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      income += Number(transaction.amount);
    } else {
      expense += Number(transaction.amount);
    }
  });

  return {
    income,

    expense,

    balance: income - expense,

    total: transactions.length,
  };
}


// Dashboard Cards


function updateCards() {
  const totals = calculateTotals();

  balanceEl.textContent = currency + totals.balance;

  incomeEl.textContent = currency + totals.income;

  expenseEl.textContent = currency + totals.expense;

  totalTransactionEl.textContent = totals.total;
}
function renderTable(list = transactions) {
  tableBody.innerHTML = "";

  list.forEach((transaction) => {
    tableBody.innerHTML += `

        <tr>

        <td>${transaction.date}</td>

        <td>${transaction.description}</td>

        <td>${transaction.category}</td>

        <td class="${
          transaction.type === "income" ? "incomeText" : "expenseText"
        }">

            ${transaction.type}

        </td>

        <td>

        ${currency}${transaction.amount}

        </td>

        <td>

        <button
        class="actionBtn editBtn"
        data-id="${transaction.id}">
        Edit
        </button>

        <button
        class="actionBtn deleteBtn"
        data-id="${transaction.id}">
        Delete
        </button>

        </td>

        </tr>

        `;
  });
}
function refreshUI() {
  updateCards();

  renderTable();

  renderChart();
}
refreshUI();

// Open & Close Modal


addBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  editId = null;
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    form.reset();
    editId = null;
  }
});

// Add / Update Transaction


form.addEventListener("submit", function (e) {
  e.preventDefault();

  const type = typeInput.value;
  const description = descInput.value.trim();
  const category = categoryInput.value;
  const amount = Number(amountInput.value);
  const date = dateInput.value;

  if (!type || !description || !category || !amount || !date) {
    alert("Please fill all fields.");
    return;
  }


  // EDIT


  if (editId !== null) {
    transactions = transactions.map((item) => {
      if (item.id === editId) {
        return {
          ...item,

          type,
          description,
          category,
          amount,
          date,
        };
      }

      return item;
    });

    editId = null;
  }


  // ADD

  else {
    const transaction = {
      id: Date.now(),

      type,

      description,

      category,

      amount,

      date,
    };

    transactions.push(transaction);
  }

  saveTransactions();

  refreshUI();

  modal.style.display = "none";

  form.reset();
});
tableBody.addEventListener("click", function (e) {
  const id = Number(e.target.dataset.id);

  // DELETE


  if (e.target.classList.contains("deleteBtn")) {
    const confirmDelete = confirm("Delete this transaction?");

    if (!confirmDelete) return;

    transactions = transactions.filter((item) => item.id !== id);

    saveTransactions();

    refreshUI();
  }


  // EDIT


  if (e.target.classList.contains("editBtn")) {
    const transaction = transactions.find((item) => item.id === id);

    if (!transaction) return;

    editId = id;

    typeInput.value = transaction.type;

    descInput.value = transaction.description;

    categoryInput.value = transaction.category;

    amountInput.value = transaction.amount;

    dateInput.value = transaction.date;

    modal.style.display = "flex";
  }
});
dashboardLink.addEventListener("click", function (e) {
  e.preventDefault();

  dashboard.classList.remove("hidden");

  settings.classList.add("hidden");
});

settingsLink.addEventListener("click", function (e) {
  e.preventDefault();

  dashboard.classList.add("hidden");

  settings.classList.remove("hidden");
});

// CHART


function renderChart() {
  const ctx = document.getElementById("chart");

  if (chart) {
    chart.destroy();
  }

  const income = transactions.filter((item) => item.type === "income");
  const expense = transactions.filter((item) => item.type === "expense");

  chart = new Chart(ctx, {
    type: "bar",

    data: {
      labels: ["Income", "Expense"],

      datasets: [
        {
          label: "Amount",

          data: [
            income.reduce((a, b) => a + Number(b.amount), 0),

            expense.reduce((a, b) => a + Number(b.amount), 0),
          ],

          backgroundColor: ["green", "crimson"],
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,
    },
  });
}
// FILTER


document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", function () {
    document.querySelector(".active").classList.remove("active");

    this.classList.add("active");

    const filter = this.dataset.filter;

    if (filter === "all") {
      renderTable(transactions);
    } else {
      renderTable(transactions.filter((item) => item.type === filter));
    }
  });
});
// DARK MODE

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");

  darkToggle.checked = true;
}

darkToggle.addEventListener("change", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}); 
// CURRENCY


currencySelect.value = currency;

saveSettingsBtn.addEventListener("click", function () {
  currency = currencySelect.value;

  localStorage.setItem(
    "currency",

    currency,
  );

  refreshUI();

  alert("Settings Saved");
});
// RESET


resetBtn.addEventListener("click", function () {
  const answer = confirm("Delete all transactions?");

  if (!answer) return;

  transactions = [];

  saveTransactions();

  refreshUI();
});
const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");

const title = document.querySelector("#title");

document.querySelector("#showRegister").addEventListener("click", (e) => {
  e.preventDefault();

  loginForm.classList.add("hide");

  registerForm.classList.remove("hide");

  title.innerText = "Register";
});

document.querySelector("#showLogin").addEventListener("click", (e) => {
  e.preventDefault();

  registerForm.classList.add("hide");

  loginForm.classList.remove("hide");

  title.innerText = "Login";
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value.trim();

  const email = document.querySelector("#email").value.trim();

  const password = document.querySelector("#password").value.trim();

  const confirm = document.querySelector("#confirmPassword").value.trim();

  if(name.trim() === "" || email.trim() === "" || password.trim() === "" || confirm.trim() === "") {
    alert("Please fill all the fields");

    return;
  }

  if (password !== confirm) {
    alert("Passwords do not match");

    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const exist = users.find((user) => user.email === email);

  if (exist) {
    alert("Email already exists");

    return;
  }

  users.push({
    id: Date.now(),

    name,

    email,

    password,
  });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration Successful");

  registerForm.reset();

  registerForm.classList.add("hide");

  loginForm.classList.remove("hide");

  title.innerText = "Login";
});

   


    

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.querySelector("#loginEmail").value.trim();

  const password = document.querySelector("#loginPassword").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid Credentials");

    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(user));
  document.querySelector(".outer").style.display = "none";
  document.querySelector(".mainContent").style.display = "flex";

  alert("Login Successful");

//   // Change this to your dashboard page
//   window.location.href = "index.html";
});

  
logOut.addEventListener("click", function (e) {
    confirm("Are you sure you want to log out?");
document.querySelector(".outer").style.display = "flex";
  document.querySelector(".mainContent").style.display = "none";
  })

