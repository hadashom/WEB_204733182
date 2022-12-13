
let currentPathWithoutPageName = getCurrentPathWithoutPageName();

const signUpBtn = document.querySelector('#go-to-sign-up');
const signInBtn = document.querySelector('#go-to-sign-in');
const createAccountBtn = document.querySelector('#create-account');
const logInBtn = document.querySelector('#log-in');
const fnameInputField = document.querySelector('#fname');
const lnameInputField = document.querySelector('#lname');
const emailInputField = document.querySelector('#email');
const passwordInputField = document.querySelector('#password');

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const nameRegex = /^[a-zA-Z ]{2,30}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;

if (fnameInputField != null) {
    fnameInput = document.getElementById("fname").value;
}
if (fnameInputField != null) {
    lnameInput = document.getElementById("lname").value;
}
if (emailInputField != null) {
    emailInput = document.getElementById("email").value;
}
if (fnameInputField != null) {
    passwordInput = document.getElementById("password").value;
}


if (signUpBtn != null) {
    signUpBtn.addEventListener('click', () => {
        nextPageFun(currentPathWithoutPageName + "/Sign_Up.html");
    })
}

if (signInBtn != null) {
    signInBtn.addEventListener('click', () => {
        console.log("Hi")
        nextPageFun(currentPathWithoutPageName + "/Sign_In.html");
    })
}

if (createAccountBtn != null) {
    createAccountBtn.addEventListener('click', () => {

        getInputs();

        if (isValidEmail(emailInput) && isValidName(fnameInput) && isValidPassword(passwordInput) && isValidName(lnameInput)) {
            alert("Great Succes!")
            nextPageFun(currentPathWithoutPageName + ("/Sign_In.html"));
        }
        else {
            let messageTemp = validateInput(fnameInput, lnameInput, emailInput, passwordInput);
            if (messageTemp.length > 0) {
                alert(messageTemp);
            }
        }
    })
}

if (logInBtn != null) {
    logInBtn.addEventListener('click', () => {

        getInputs();
        console.log(emailInput);

        if (isValidEmail(emailInput) && isValidPassword(passwordInput)) {
            alert("You Can Enter")
            nextPageFun(currentPathWithoutPageName + ("/Start Questionnaire.html"));
        }
        else {
            let messageTemp = validateInput("Good", "lnameInput", emailInput, passwordInput);
            if (messageTemp.length > 0) {
                alert(messageTemp);
            }
        }
    })
}

function validateInput(firstName, lastName, email, password) {
    let errorMessage = "";

    if (firstName.length == 0) {
        errorMessage += "Please enter a first name.\n";
    }
    else if (!isValidName(firstName)) {
        errorMessage += "A first name must be longer than 2 letters and no longer than 30.\n";
    }
    if (lastName.length == 0) {
        errorMessage += "Please enter a last name.\n";
    }
    else if (!isValidName(lastName)) {
        errorMessage += "A last name must be longer than 2 letters and no longer than 30.\n";
    }
    if (email.length == 0) {
        errorMessage += "Please enter an email address.\n";
    } else if (!email.includes("@") || !isValidEmail(email)) {
        errorMessage += "Please enter a valid email address.\n";
    }
    if (password.length == 0) {
        errorMessage += "Please enter a password.\n";
    } else if (password.length < 6) {
        errorMessage += "Please enter a password with at least 6 characters.\n";
    } else if (!password.match(/[a-z]/i) || !password.match(/[0-9]/)) {
        errorMessage += "Password must contain a letter, and a number.\n";
    }
    else if (!isValidPassword(password)){
        errorMessage += "Password can't contain special characters.\n";
    }
    if (errorMessage.length > 0) {
        return errorMessage;
    }
    return "";
}

const isValidEmail = (email) => {
    if (emailRegex.test(email)) {
        return true;
    }
    alert("email bad")
    return false;
};

const isValidName = (name) => {
    if (nameRegex.test(name)) {
        return true;
    }
    alert("name bad")
    return false;
};

const isValidPassword = (password) => {
    if (passwordRegex.test(password)) {
        return true;
    }
    alert("pass bad")
    return false;
};

function getInputs() {
    if (fnameInputField != null) {
        fnameInput = document.getElementById("fname").value;
    }
    if (fnameInputField != null) {
        lnameInput = document.getElementById("lname").value;
    }
    emailInput = document.getElementById("email").value;
    passwordInput = document.getElementById("password").value;
}