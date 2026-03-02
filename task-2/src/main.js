const fName = document.getElementById("fName");
const lName = document.getElementById("lName");
const doB = document.getElementById("dob");
const genderInput = document.querySelector("input[name='gender']:checked");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subjectInputs = document.querySelectorAll(
  "#subject input[type='checkbox']:checked",
);
const addBtntn = document.getElementById("addBtn");
const tBody = document.getElementById("tbody");

const nextId = 1;
const details = [];

function addData() {
  const fname = fName.value.trim();
  const lname = lName.value.trim();
  const dob = doB.value;
  const mail = email.value.trim();
  const mobile = phone.value.trim();

  const gender = genderInput ? genderInput.value : "";
  let subjects = "";
  subjectInputs.forEach((check) => {
    subjects += check.value + " ";
  });

  let dateofB = new date(dob).getTime();
  let now = Date.now();
  let age = new Date(now - dateofB);
  let year = age.getUTCFullYear() - 1970;

  if (fname === "") {
    alert("First Name cannot be Empty");
  } else if (lname === "") {
    alert("Last Name cannot be Empty");
  } else if (year < 18) {
    alert("Age must be greater than 18");
  } else if (!mail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    alert("Please enter valid Email Address");
  } else if (!mobile.match(/^\d{10}$/)) {
    alert("Please enter valid Mobile Number");
  }

  details.push({
    id: nextId++,
    fname: fname,
    lname: lname,
    dob: dob,
    gender: gender,
    email: mail,
    phone: mobile,
    subject: subjects,
  });

  fname.value = "";
  lname.value = "";
  dob.value = "";
  mail.value = "";
  mobile.value = "";
  gender = "";
  subjects = "";

  render();
}

function render() {
  let html = "";

  details.forEach((detail) => {
    html += `
    <tr>
       <td class="st:border st:border-gray-300 st:px-4 st:py-2">${id++}</td>
       <td class="st:border st:border-gray-300 st:px-4 st:py-2">${fName} ${lName}</td>
       <td class="st:border st:border-gray-300 st:px-4 st:py-2">${dob}</td>
       <td class="st:border st:border-gray-300 st:px-4 st:py-2">${gender}</td>
       <td class="st:border st:border-gray-300 st:px-4 st:py-2">${email}</td>
       <td class="st:border st:border-gray-300 st:px-4 st:py-2">${phone}</td>
       <td class="st:border st:border-gray-300 st:px-4 st:py-2">${subjects}</td>
       <td class="st:border st:border-gray-300 st:px-4 st:py-2">${examCenter}</td>
    </tr> 
    `;
  });

  tbody.innerHTML=html;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addData();
});
