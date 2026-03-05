const form = document.querySelector("form");
const fNameInput = document.getElementById("fName");
const lNameInput = document.getElementById("lName");
const dobInput = document.getElementById("dob");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const addBtn = document.getElementById("addBtn");
const examCenterSelect = document.getElementById("examCenter");
const tBody = document.getElementById("tBody");
const tHead = document.getElementById("tHead");
const cancel = document.getElementById("cancel");
const sortt = document.getElementById("sort");
const filterGender = document.querySelectorAll(".filterGender");
const filterSubject = document.querySelectorAll(".filterSubject");
const filterCenter = document.querySelectorAll(".filterCenter");
const clearFilter = document.getElementById("clearFilters");
const applyFilters = document.getElementById("applyFilters");
const filterPanel = document.getElementById("filterPanel");
const smSort = document.getElementById("smSort");
const smFilter = document.getElementById("smFilter");
const table = document.getElementById("table");

let nextId = 5;
const details = [{
  id: 1,
  firstname: "Evraj",
  lastname: "Singh",
  dob: '2003-12-27',
  age: '22',
  gender: 'male',
  email: 'evrajsingh201@gmail.com',
  phone: '8700093751',
  subject: ['java', 'python'],
  examCenter: 'delhi'
}, {
  id: 2,
  firstname: "Lauren",
  lastname: "Bell",
  dob: '1996-12-27',
  age: '29',
  gender: 'Female',
  email: 'evrajsingh201@gmail.com',
  phone: '8700093751',
  subject: ['java'],
  examCenter: 'kolkata'
},
{
  id: 3,
  firstname: "Sidak",
  lastname: "Singh",
  dob: '2001-12-27',
  age: '21',
  gender: 'male',
  email: 'evrajsingh101@gmail.com',
  phone: '8700093751',
  subject: ['java', 'python'],
  examCenter: 'mumbai'
},
{
  id: 4,
  firstname: "hema",
  lastname: "Singh",
  dob: '2001-01-27',
  age: '26',
  gender: 'male',
  email: 'evrajsingh101@gmail.com',
  phone: '8700093751',
  subject: ['javascript'],
  examCenter: 'mumbai'
}];

let editId = null;
let sortval = sortt.value;


function addData() {
  let fnameValue = fNameInput.value.trim();
  let lnameValue = lNameInput.value.trim();
  let dobValue = dobInput.value;
  let emailValue = emailInput.value.trim();
  let phoneValue = phoneInput.value.trim();
  let centerValue = examCenterSelect.value;

  const genderInput = document.querySelector("input[name='gender']:checked");
  let gender = genderInput ? genderInput.value : "";

  const subjectInputs = document.querySelectorAll(".a:checked");
  let subjects = [];
  subjectInputs.forEach((check) => {
    subjects.push(check.value);
  });


  let dateofB = new Date(dobValue).getTime(); //revise
  let now = Date.now();
  let age = new Date(now - dateofB);
  let year = age.getUTCFullYear() - 1970;

  if (fnameValue === "") {
    alert("First Name cannot be Empty");
    return;
  } else if (lnameValue === "") {
    alert("Last Name cannot be Empty");
    return;
  } else if (!dobValue || year < 18) {
    alert("Age must be greater than 18");
    return;
  } else if (!emailValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    alert("Please enter valid Email Address");
    return;
  } else if (!phoneValue.match(/^\d{10}$/)) {
    alert("Please enter valid Mobile Number");
    return;
  }

  if (editId === null) {
    details.push({
      id: nextId++,
      firstname: fnameValue,
      lastname: lnameValue,
      dob: dobValue,
      age: year,
      gender,
      email: emailValue,
      phone: phoneValue,
      subject: subjects,
      examCenter: centerValue
    });
  } else {
    for (let i = 0; i < details.length; i++) {
      if (details[i].id === editId) {
        details[i].firstname = fnameValue,
          details[i].lastname = lnameValue,
          details[i].dob = dobValue,
          details[i].gender = gender,
          details[i].email = emailValue,
          details[i].phone = phoneValue,
          details[i].subject = subjects,
          details[i].examCenter = centerValue;
        break;
      }
    }
    editId = null;
    cancel.classList.add("st:hidden");
    addBtn.classList.replace("st:w-1/2", "st:w-full");
    addBtn.textContent = "Submit";
  }

  form.reset();
  render();
}

function render() {
  let html = "";

  if (details.length === 0) {
    tHead.classList.add("st:hidden");
  } else {
    tHead.classList.remove("st:hidden");
  }

  let data = [...details];

  const genderValues = [];
  const subjectValues = [];
  const centerValues = [];

  filterGender.forEach(c => {
    if (c.checked) genderValues.push(c.value);
  })

  filterSubject.forEach(c => {
    if (c.checked) subjectValues.push(c.value);
  })

  filterCenter.forEach(c => {
    if (c.checked) centerValues.push(c.value);
  })

  if (genderValues.length !== 0) {
    data = data.filter(d => genderValues.includes(d.gender));
  }

  if (subjectValues.length !== 0) {
    data = data.filter(d => subjectValues.some(sub => d.subject.includes(sub)));
  }

  if (centerValues.length !== 0) {
    data = data.filter(d => centerValues.includes(d.examCenter));
  }

  if (sortval === "nameAZ") {
    data.sort((a, b) => {
      if (a.firstname === b.firstname) {
        return a.lastname.localeCompare(b.lastname);
      }
      return a.firstname.localeCompare(b.firstname);

    })
  } else if (sortval === "nameZA") {
    data.sort((a, b) => {
      if (a.firstname === b.firstname) {
        return b.lastname.localeCompare(a.lastname);
      }
      return b.firstname.localeCompare(a.firstname);

    });
  } else if (sortval === "centerAZ") {
    data.sort((a, b) =>
      a.examCenter.localeCompare(b.examCenter)
    );
  } else if (sortval === "centerZA") {
    data.sort((a, b) =>
      b.examCenter.localeCompare(a.examCenter)
    );
  } else if (sortval === "ageInc") {
    data.sort((a, b) => a.age - b.age);
  } else if (sortval === "ageDec") {
    data.sort((a, b) => b.age - a.age);
  }
  else {
    data.sort((a, b) =>
      a.id - b.id
    );
  }

  data.forEach((detail) => {
    html += `
    <tr>
       <td class="st:border st:border-gray-300 st:px-4 st:py-2 st:text-nowrap">${detail.id}</td>
       <td class="st:border st:border-gray-300 st:px-4 st:py-2 st:text-nowrap">${detail.firstname} ${detail.lastname}</td>
       <td class="st:border st:border-gray-300 st:px-4 st:py-2">${detail.dob}</td>
       <td class="st:border st:border-gray-300 st:px-4 st:py-2">${detail.age}</td>
       <td class="st:border st:border-gray-300 st:px-4 st:py-2">${detail.gender}</td>
       <td class="st:border st:border-gray-300 st:px-4 st:py-2">${detail.email}</td>
       <td class="st:border st:border-gray-300 st:px-4 st:py-2">${detail.phone}</td>
       <td class="st:border st:border-gray-300 st:px-4 st:py-2">${detail.subject.join(', ')}</td>
       <td class="st:border st:border-gray-300 st:px-4 st:py-2">${detail.examCenter}</td>
       <td class="st:border-b st:border-r st:border-gray-300 st:px-4 st:py-2">
          <div class="st:flex st:gap-[5px] st:items-center st:justify-center">
          <button type="button"
            data-index="${detail.id}"
            class="editBtn st:bg-green-500 st:outline-none st:px-3 st:py-1 st:rounded st:cursor-pointer">
            Edit
          </button>
          <button type="button"
            data-index="${detail.id}"
            class="deleteBtn st:bg-red-600 st:outline-none st:px-3 st:py-1 st:rounded st:cursor-pointer">
            Delete
          </button>
          </div>
        </td>
    </tr> 
    `;
  });

  tBody.innerHTML = html;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addData();
});

tBody.addEventListener("click", function (event) {
  if (event.target.classList.contains("deleteBtn")) {
    const id = Number(event.target.dataset.index);
    for (let i = 0; i < details.length; i++) {
      if (details[i].id === id) {
        details.splice(i, 1);
        break;
      }
    }
    addBtn.classList.replace("st:w-1/2", "st:w-full");
    cancel.classList.add("st:hidden");
    addBtn.textContent = "Submit";
    form.reset();
    render();
  }

  if (event.target.classList.contains("editBtn")) {
    const id = Number(event.target.dataset.index);
    const subjectcheckbox = document.querySelectorAll(".a");

    for (let i = 0; i < details.length; i++) {
      if (details[i].id === id) {
        fNameInput.value = details[i].firstname;
        lNameInput.value = details[i].lastname;
        dobInput.value = details[i].dob;
        emailInput.value = details[i].email;
        phoneInput.value = details[i].phone;
        examCenterSelect.value = details[i].examCenter;
        const genderRadio = document.querySelectorAll("input[name='gender']");
        genderRadio.forEach((check) => {
          if (check.value === details[i].gender) {
            check.checked = true;
          }
        });
        subjectcheckbox.forEach((checkbox) => {
          if (details[i].subject.includes(checkbox.value)) {
            checkbox.checked = true;
          }
        })

        editId = id;
        addBtn.textContent = "Update";
        addBtn.classList.replace("st:w-full", "st:w-1/2");
        cancel.classList.add("st:w-1/2");
        cancel.classList.remove("st:hidden");
        break;
      }
    }
  }
});

cancel.addEventListener('click', function (e) {
  e.preventDefault();
  addBtn.classList.replace("st:w-1/2", "st:w-full");
  cancel.classList.add("st:hidden");
  addBtn.textContent = "Submit";
  form.reset();
})

sort.addEventListener('change', function (e) {
  sortval = e.target.value;
  render();
});

clearFilter.addEventListener("click", (e) => {
  filterGender.forEach(c => c.checked = false);
  filterSubject.forEach(c => c.checked = false);
  filterCenter.forEach(c => c.checked = false);
  render();
});

applyFilters.addEventListener("click", () => {
  filterPanel.classList.add("st:hidden");
  render();
});

smFilter.addEventListener("click", () => {
  table.classList.toggle("st:md:w-4/5");
  filterPanel.classList.toggle("st:hidden");
});

render();
















