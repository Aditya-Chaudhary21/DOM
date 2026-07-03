let btn = document.querySelector("#create");
let form = document.querySelector(".form");
let close = document.querySelector("#close");

btn.addEventListener("click", ()=>{
    form.style.display = "flex";
});

close.addEventListener("click", ()=>{
    form.style.display = "none";
});