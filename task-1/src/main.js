const form = document.querySelector("form");
const title = document.getElementById("title");
const amount = document.getElementById("amount");
const category = document.getElementById("Category");
const addBtn = document.getElementById("addBtn");
const table = document.getElementById("table");
const total = document.getElementById("total");
const filt = document.getElementById("filter");

let expenses = [];
let nextId = 1;
let vlu = filt.value;
let editId = null;

function addExpense() {
  const text = title.value.trim();
  const amt = amount.value;
  let cate = category.value.trim();

  if (text === "") {
    alert("Invalid Title");
    return;
  } else if (amt <= 0) {
    alert("Invalid Amount");
    return;
  } else if (cate === "") {
    cate = "other";
  }

  if (editId === null) {
    expenses.push({
      id: nextId++,
      title: text,
      amount: amt,
      category: cate,
    });
  } else {
    for (let i = 0; i < expenses.length; i++) {
      if (expenses[i].id === editId) {
        expenses[i].title = text;
        expenses[i].amount = amt;
        expenses[i].category = cate;
        break;
      }
    }
    editId = null;
    addBtn.textContent = "ADD";
  }

  title.value = "";
  amount.value = "";
  category.value = "";

  render();
}

function render() {
  let html = "";

  let result = [];
  let k = 0;
  if (vlu === "All") {
    result = expenses;
  } else {
    for (let j = 0; j < expenses.length; j++) {
      if (expenses[j].category === vlu) {
        result[k++] = expenses[j];
      }
    }
  }

  let ttlExp = 0;
  for (let i = 0; i < result.length; i++) {
    ttlExp += Number(result[i].amount);
  }

  result.forEach((expense) => {
    html += `
      <tr>
        <td class="st:border st:border-gray-400 st:px-3 st:py-2">${expense.id}</td>
        <td class="st:border st:border-gray-400 st:px-3 st:py-2">${expense.title}</td>
        <td class="st:border st:border-gray-400 st:px-3 st:py-2">${expense.amount}</td>
        <td class="st:border st:border-gray-400 st:px-3 st:py-2">${expense.category}</td>
        <td class="st:border st:border-gray-400 st:px-3 st:py-2 st:flex st:gap-[5px] st:items-center st:justify-center">
          <button type="button"
            data-index="${expense.id}"
            class="editBtn st:bg-green-500 st:outline-none st:text-white st:px-3 st:py-1 st:rounded st:text-sm">
            Edit
          </button>
          <button type="button"
            data-index="${expense.id}"
            class="deleteBtn st:bg-red-500 st:outline-none st:text-white st:px-3 st:py-1 st:rounded st:text-sm">
            Delete
          </button>
        </td>
      </tr>
    `;
  });

  table.innerHTML = html;
  total.textContent = ttlExp;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addExpense();
});

table.addEventListener("click", function (event) {
  if (event.target.classList.contains("deleteBtn")) {
    const id = Number(event.target.dataset.index);
    for (let i = 0; i < expenses.length; i++) {
      if (expenses[i].id === id) {
        expenses.splice(i, 1);
        break;
      }
    }
    render();
  }
  if (event.target.classList.contains("editBtn")) {
    const id = Number(event.target.dataset.index);
    for (let i = 0; i < expenses.length; i++) {
      if (expenses[i].id === id) {
        title.value = expenses[i].title;
        amount.value = expenses[i].amount;
        category.value = expenses[i].category;
        editId = id;
        addBtn.textContent = "Update";
        break;
      }
    }
  }
});

filt.addEventListener("change", () => {
  vlu = filt.value;
  render();
});
