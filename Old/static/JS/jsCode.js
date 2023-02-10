// Get the current page
const currentPage = window.location.pathname;

console.log(currentPage);

function getCurrentPathWithoutPageName() {
    // Get the current URL
    const currentUrl = window.location.href;
  
    // Find the last slash in the URL
    const lastSlashIndex = currentUrl.lastIndexOf("/");
  
    // Return the URL up to the last slash (i.e. the current path without the page name)
    return currentUrl.substring(0, lastSlashIndex);
  }

// Create an array to store the selected buttons
const selectedButtons = [];


function nextPageFun(nextPageURL) {
    window.location.href = nextPageURL;
}

const startQuestionsBtn = document.querySelector('#start-questions');

if (startQuestionsBtn != null) {
    startQuestionsBtn.addEventListener('click', () => {
        nextPageFun(getCurrentPathWithoutPageName() + "/Question1");
    })
}