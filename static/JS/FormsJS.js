

const signUpBtn = document.querySelector('#go-to-sign-up');
const signInBtn = document.querySelector('#go-to-sign-ip');
const createAccountBtn = document.querySelector('#create-account');
const logInBtn = document.querySelector('#log-in');

const fnameInput = document.querySelector('#fname');
const lnameInput = document.querySelector('#lname');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const nameRegex = /^[a-zA-Z ]{2,30}$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;


signUpBtn.addEventListener('click', () => {
    //nextPageFun(go to sign up);
})

signInBtn.addEventListener('click', () => {
    //nextPageFun(go to sign in);
})

createAccountBtn.addEventListener('click', () => {
    
})

logInBtn.addEventListener('click', () => {

})

const isValidEmail = (email) => {
    return emailRegex.test(email);
};

const isValidName = (name) => {
    return nameRegex.test(name);
};

const isValidPassword = (password) => {
    return passwordRegex.test(password);
};

