const form = document.querySelector("form");
const inp1 = document.querySelector("#name");
const inp2 = document.querySelector("#email");
const users = document.querySelector(".users");
const url = document.querySelector("#url");

let usersData=[
  
]

let ui = ()=>{
    users.innerHTML = "";
    usersData.forEach((elem,index)=>{
       users.innerHTML += `<div class="user_card">
            <div class="img_box">
                 <img src="${elem.image}"
                  alt="User Image" />
            </div>
            <div class="text">
                <h3>Name-${elem.name}</h3>
                <p>Email-${elem.email}</p>
            </div>
            <div class="actions">
                <button onclick="editCard(${index})" id="edit">Edit</button>
                <button onclick="deleteCard(${index})" id="delete">Delete</button>
               
            </div>
        </div>`
})}

ui();

form.addEventListener("submit", function(event){
    event.preventDefault();
    const name = inp1.value;
    const email = inp2.value;
    const image = url.value;

    if(name.trim() === "" || email.trim() === "" || image.trim() === "") return;

   usersData.push({
    name,
    email,
    image,
 });

 ui();

 form.reset();
});


let deleteCard = (index)=>{
    usersData.splice(index, 1);
    ui();
}
let editCard = (index)=>{
    let oldata = usersData[index];
    let edited = prompt("Edit your task", oldata.name);
    if(edited !== null && edited.trim() !== ""){
        oldata.name = edited.trim();
        ui();
    }
}