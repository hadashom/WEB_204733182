
let currentPathWithoutPageName = getCurrentPathWithoutPageName();

// Use a regular expression to match the number after "Question" and capture it in a group
const regex = /Question(\d+)/;

let questionNum;
const nothing = currentPage.replace(regex, (match, p1) => {
    questionNum = parseInt(p1, 10);
});

// Get all buttons on the page
const buttons = Array.from(document.querySelectorAll('button.medium-button'));
// Get the "next" and "back" buttons
const backButton = document.querySelector('button.out-button');
const nextButton = document.querySelector('button.next-button');
const submitButton = document.querySelector('#submitButton');
let selected = false;
console.log(selected)

// Add a click event listener to each button
buttons.forEach(button => {
    selected = false;
    buttons.forEach(btn => {
        btn.classList.remove('selected');
    });
    button.addEventListener('click', event => {
        // If the button that was clicked is not the "next" button,
        // deselect all buttons and select the button that was clicked
        buttons.forEach(btn => {
            btn.classList.remove('selected');
        });
        event.target.classList.add('selected');
        selected = true;
        console.log(event.target.innerText)
    });
});

// Get the selected button
let selectedButton = buttons.find(btn => btn.classList.contains('selected'));


switch (questionNum) {
    case 1:
        regularNextButton();
        break;

    case 5:
        regularBackButton();
        submitButtonFun();

        break;

    default:
        regularNextButton();
        regularBackButton();
}


function regularNextButton() {
    console.log(selected)
    console.log("regualr button")

    // Set the "next" button's href to the next page's URL
    nextButton.href = currentPage.replace(regex, (match, p1) => {
        const num = parseInt(p1, 10);
        return `Question${num + 1}`;
    });
    console.log(selectedButtons);

    // Add a click event listener to the "next" button
    nextButton.addEventListener('click', () => {
        // If no button was selected, display an error message
        if (saveSelected()) {
          nextPageFun(nextButton.href);
        }
        else {
            return;
        }
    });
}


function regularBackButton() {
    //set the new href for the back button
    backButton.href = currentPage.replace(regex, (match, p1) => {
        const num = parseInt(p1, 10);
        return `Question${num - 1}`;
    });

    // Add a click event listener to the "back" button
    backButton.addEventListener('click', () => {
        nextPageFun(backButton.href);

    })
}


function submitButtonFun() {
    submitButton.addEventListener('click', () => {
        if (saveSelected) {
           // calculateParameters();
            nextPageFun(currentPathWithoutPageName + "/Dashboard.html");
        }
        else {
            return;
        }
    })
}

function saveSelected() {
    // If no button was selected, display an error message
    if (!selected) {
        alert('Please select a button before pressing "Next"');
        return false;
    }
    else {
        const selectedButton = buttons.find(btn => btn.classList.contains('selected'));
        selectedButtons[questionNum-1] = selectedButton.innerText;
        console.log(selectedButtons)

        return true;
    }
}


