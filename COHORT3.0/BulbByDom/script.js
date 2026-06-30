let bulb = document.querySelector("div");
let btn = document.querySelector("button");
btn.addEventListener("click",()=>{
    if(bulb.classList.toggle("lightUp")){
        btn.innerText = "Off";

    }else{
        btn.innerText = "On";
      
    }
})