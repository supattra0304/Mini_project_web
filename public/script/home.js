const pages = document.querySelectorAll('.page');
const buttons = document.querySelectorAll('.page_button');
let currentPageIndex = 1;

function showPage(pageIndex) {
    pages[pageIndex].classList.add('active');
}

function hidePage(pageIndex) {
    pages[pageIndex].classList.remove('active');
}

function navigateToPage(pageIndex) {
    hidePage(currentPageIndex);
    currentPageIndex = pageIndex;
    showPage(currentPageIndex);
    updateButtons();
}

function updateButtons() {
    buttons.forEach(button => {
        const pageIndex = parseInt(button.getAttribute('data-page-index'));
        if (pageIndex === currentPageIndex) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const pageIndex = parseInt(button.getAttribute('data-page-index'));
        navigateToPage(pageIndex);
    });
});

showPage(currentPageIndex);

setInterval(() => {
    const nextPageIndex = (currentPageIndex + 1) % pages.length;
    navigateToPage(nextPageIndex);
}, 3000);
