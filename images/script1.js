// 1. Grab the element
const myButton = document.querySelector("button");
const Area = document.querySelector("textarea");
const text4 = document.querySelector(".test2");

// 2. Tell it to listen for a 'click', and then run a function
myButton.addEventListener('click', function() {
  alert("You clicked the button!");
  
  let InputtedText = Area.value;
  text4.innerHTML = `<strong>${InputtedText}</strong>`;
  // You could also change styles, update text, or send data here
});