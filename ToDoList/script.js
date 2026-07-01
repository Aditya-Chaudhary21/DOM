// Create Elements
let body = document.querySelector("body");
console.log(body);
let main = document.createElement("main");
body.appendChild(main);
let div1 = document.createElement("div");
let div2 = document.createElement("div");
main.append(div1,div2);
let input = document.createElement("input");
let addbtn = document.createElement("button");
div1.append(input,addbtn);

// Input Attributes
input.setAttribute("type","text");
input.setAttribute("placeholder","Enter your task");
input.setAttribute("id","input");

// Add Button Attributes
addbtn.setAttribute("class","add");
addbtn.textContent = "Add";
div2.setAttribute("class","todo-list");

// main attribute
main.setAttribute("class","main");

//main operations


let inp = document.querySelector("#input");
let btn = document.querySelector(".add");
let box = document.querySelector(".todo-list");


btn.addEventListener("click", function() {
    const value = inp.value.trim();
    if(value=== "") return;

box.innerHTML += `<div class="li">
            <h3 class="h3">${inp.value}</h3>
            <div>
            <button id="edt" class="btn edit">Edit</button>
            <button id="dlt" class="btn delete">Delete</button>
            </div>`
            inp.value ="";
})
box.addEventListener("click", function(e) {
    if (e.target.classList.contains("delete")) {
        e.target.closest(".li").remove();
    }
    if(e.target.classList.contains("edit")){
        let selct = e.target.closest(".li").querySelector(".h3");
         let edited =prompt("Edit your task", selct.textContent);
         if(edited !== null && edited.trim() !== ""){
            selct.textContent = edited.trim();

    }
}});


