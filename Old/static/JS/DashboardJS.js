
let currentPathWithoutPageName = getCurrentPathWithoutPageName();

const logOutBtn = document.querySelector('button.log-out');
const sliderBar = document.getElementById('myRange');

sliderBar.disabled=true;             //First make sure it is not disabled

logOutBtn.addEventListener('click', () => {
    nextPageFun(currentPathWithoutPageName + "/Home");
})