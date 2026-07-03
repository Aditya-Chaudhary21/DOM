const main = document.querySelector("main");
const overlay = document.querySelector("#overlay");

const btn = document.querySelector("button");
const timer = document.querySelector("#timer");
const scoree = document.querySelector("#score");

const box = document.createElement("div");
box.classList.add("box");

let interval;
let time = 0;
let score = 0;
let clear;

//Select random color using math.random and return rgb value
const randomColor = () => {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
};

//Select random position of box using math.random and return top and left value
const randomBox = () => {
  box.style.backgroundColor = randomColor();
  main.append(box);

  let mainH = main.clientHeight - box.offsetHeight;
  let mainW = main.clientWidth - box.offsetWidth;

  const rY = Math.random() * mainH;
  const rX = Math.random() * mainW;

  box.style.top = `${rY}px`;
  box.style.left = `${rX}px`;
};

//Start the game when button is clicked and set interval to call randomBox function every 1 second
btn.addEventListener("click", () => {
  clearInterval(interval);
  //delete value of score
  score = 0;
  scoree.textContent = score;

  interval = setInterval(() => {
    randomBox();

    time += 1;
    timer.textContent = time;
  }, 1000);

  setTimeout(() => {
    clearInterval(interval);
    overlay.style.display = "flex";
    clear = setTimeout(() => {
      overlay.style.display = "none";
      time = 0;
    }, 3000);
  }, 10000);
});

//Increase score when box is clicked and update score in the DOM
box.addEventListener("click", () => {
  score += 1;
  scoree.textContent = score;
});
