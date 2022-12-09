// Get the current page
const currentPage = window.location.pathname;

// Create an array to store the selected buttons
const selectedButtons = [];


function nextPageFun(nextPageURL) {
    window.location.href = nextPageURL;
}