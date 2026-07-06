let body = document.body;

//main
let main = document.createElement("main");
body.appendChild(main);

//nav
let nav = document.createElement("nav");
main.appendChild(nav);

// h1 in nav
let h1 = document.createElement("h1");
h1.innerText = "Task Manager";
nav.appendChild(h1);


let left = document.createElement("div");
left.setAttribute("class","left");
nav.appendChild(left);

//button in nav
let btn = document.createElement("button");
btn.innerText = "Add Task";
btn.setAttribute("id","create");
let mode = document.createElement("button");
mode.innerText = "Dark Mode";
mode.setAttribute("id","modeBtn");
let dltAll = document.createElement("button");
dltAll.innerText = "Delete All";
dltAll.setAttribute("id","deleteAll");
left.append(btn , mode , dltAll);

//tasks div in main
let tasksDiv1 = document.createElement("div");
tasksDiv1.setAttribute("class","tasksDiv");
main.appendChild(tasksDiv1);

//outer div in main
let outerDiv = document.createElement("div");
outerDiv.setAttribute("class","form");
main.appendChild(outerDiv);

//top div in outer div
let topDiv = document.createElement("div");
topDiv.setAttribute("class","top");
outerDiv.appendChild(topDiv);

//empty div
let emptyDiv = document.createElement("div");
topDiv.appendChild(emptyDiv);

//h1 in top div
let head = document.createElement("h5");
head.innerText = "X";
head.setAttribute("id","close");
topDiv.appendChild(head);

//form
let form = document.createElement("form");
outerDiv.appendChild(form);

//h1 in form
let headInForm = document.createElement("h1");
headInForm.innerText = "Add Task";
form.appendChild(headInForm);

//input in form
let input = document.createElement("input");
input.setAttribute("type","text");
input.setAttribute("placeholder","Enter Task");
input.setAttribute("id","input");
form.appendChild(input);

//select in form
let select = document.createElement("select");
select.setAttribute("class","select");


//option0
let option0 = document.createElement("option");
option0.innerText = "Select Category";
option0.setAttribute("disabled",true);
option0.setAttribute("selected",true);
option0.setAttribute("class","options");
option0.setAttribute("id","defaultOption");


//1
let option1 = document.createElement("option");
option1.innerText = "Sports";
option1.setAttribute("class","options");

//option2
let option2 = document.createElement("option");
option2.innerText = "Study";
option2.setAttribute("class","options");

//option3
let option3 = document.createElement("option");
option3.innerText = "Hobbies";
option3.setAttribute("class","options");

//append select
form.appendChild(select);
select.append(option0,option1,option2,option3);

//select status
let status = document.createElement("select");
status.setAttribute("class","select");

//option01 of status
let option00 = document.createElement("option");
option00.innerText = "Select Status";
option00.setAttribute("disabled",true);
option00.setAttribute("selected",true);
option00.setAttribute("class","options");
option00.setAttribute("id","defaultOption");

//0 of status
let  option01= document.createElement("option");
option01.innerText = "Active";
option01.setAttribute("class","options");

//option2 of status
let option02 = document.createElement("option");
option02.innerText = "Completed";
option02.setAttribute("class","options");

//appned in status
status.append(option00,option01,option02);
form.appendChild(status);

//submit button in form
let sub = document.createElement("button");
sub.setAttribute("id","submit");
sub.innerText = "Submit";
form.appendChild(sub);


const createBtn = document.querySelector("#create");
const formDiv = document.querySelector(".form");
const closeBtn = document.querySelector("#close");
const tasksDiv = document.querySelector(".tasksDiv");
const form2 = document.querySelector("form");
const change = document.querySelector("#modeBtn");
const deleteAll = document.querySelector("#deleteAll");



let productsArr = JSON.parse(localStorage.getItem("products")) || [];
console.log(productsArr);

let updateIndex = null;
let count = 0;

let ui = () => {
  tasksDiv.innerHTML = "";
  productsArr.forEach((elem, index) => {
    tasksDiv.innerHTML += `<div class="task-card">
         <div class="text">
            <h3>Task - ${elem.taskName}</h3>
            <p>Category - ${elem.category}</p>
            <p>Status - ${elem.status}</p>
          </div>

          <div class="btns">
            <button onclick="updateProduct('${elem.taskName}')" id="update">Update</button>
            <button onclick="deleteProduct(${index})" id="delete">Delete</button>
            <button onclick="markCompleted(${index})" id="completed">Mark Completed</button>
          </div>
        </div>`;
  });
};

ui();

createBtn.addEventListener("click", () => {
  formDiv.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  formDiv.style.display = "none";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let taskName = event.target[0].value;
  let category = event.target[1].value;
  let status = event.target[2].value;

  if (
    taskName.trim() === "" ||
    category.trim() === "" ||
    status.trim() === ""
  ) {
    alert("please fill all the fields");
    return;
  }

  let obj = {
    taskName,
    category,
    status,
  };
  

  if (updateIndex !== null) {
    productsArr[updateIndex] = obj;
    updateIndex = null;
    count++;
    localStorage.setItem("products", JSON.stringify(productsArr));
  } else {
    productsArr.push(obj);
    count++;
    localStorage.setItem("products", JSON.stringify(productsArr));
  }

  ui();
  console.log(productsArr);

  form2.reset();

  formDiv.style.display = "none";
});

const updateProduct = (name) => {
  formDiv.style.display = "flex";
  let product = productsArr.find((elem) => elem.taskName === name);
  updateIndex = productsArr.findIndex((elem) => elem.taskName === name);

  form2[0].value = product.taskName;
  form2[1].value = product.category;
  form2[2].value = product.status;
  
};

const deleteProduct = (index) => {
  productsArr.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(productsArr));
  ui();
};

const markCompleted = (index) => {
    productsArr[index].status = "Completed";
    ui();

}
change.addEventListener("click", () => {
    if(change.classList.toggle("dark-mode")){
        main.style.backgroundColor = "rgb(25, 25, 25)";
        change.innerText = "Light Mode";
       
    }
    else{
        main.style.backgroundColor = "whitesmoke";
        change.innerText = "Dark Mode";
       
    }
});
deleteAll.addEventListener("click",()=>{
    productsArr = [];
    ui();
    
});


