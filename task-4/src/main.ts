const form = document.querySelector("form") as HTMLFormElement;
const title = document.getElementById("title") as HTMLInputElement;
const amount = document.getElementById("amount") as HTMLInputElement;
const category = document.getElementById("Category") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const table = document.getElementById("table") as HTMLTableSectionElement;
const total = document.getElementById("total") as HTMLElement;
const filt = document.getElementById("filter") as HTMLSelectElement;

let expenses: {
  id: number,
  title: string,
  amount: number,
  category: string
}[] = [];

let nextId: number = 1;
let vlu: string = filt.value;
let editId: number | null = null;

function addExpense(): void {
  const text: string = title.value.trim();
  const amt: number = Number(amount.value);
  let cate: string = category.value.trim();

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

  form.reset();

  render();
}

function render(): void {
  let html: string = "";

  let result: {
    id: number
    title: string
    amount: number
    category: string
  }[] = [];

  if (vlu === "All") {
    result = expenses;
  } else {
    for (let j = 0; j < expenses.length; j++) {
      if (expenses[j].category === vlu) {
        result.push(expenses[j]);
      }
    }
  }

  let ttlExp: number = 0;

  for (let i = 0; i < result.length; i++) {
    ttlExp += result[i].amount;
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
  total.textContent = ttlExp.toString();
}

form.addEventListener("submit", function (e: Event) {
  e.preventDefault();
  addExpense();
});

table.addEventListener("click", function (event: Event) {
  const target = event.target as HTMLElement;

  if (target.classList.contains("deleteBtn")) {
    const id = Number(target.dataset.index);

    for (let i = 0; i < expenses.length; i++) {
      if (expenses[i].id === id) {
        expenses.splice(i, 1);
        break;
      }
    }

    render();
  }

  if (target.classList.contains("editBtn")) {
    const id = Number(target.dataset.index);

    for (let i = 0; i < expenses.length; i++) {
      if (expenses[i].id === id) {
        title.value = expenses[i].title;
        amount.value = expenses[i].amount.toString();
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