let myLibrary = [];

const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const pagesInput = document.querySelector('#pages-input');
const readInput = document.querySelector('#read-input');

const addBookForm = document.querySelector('#addBookForm');
const addBookBtn = document.querySelector('#add-book-btn');
const closeBookForm = document.querySelector('#close-book-form');
const saveBookBtn = document.querySelector('#save-book-btn');

addBookBtn.addEventListener(
    'click',
    () => (addBookForm.style.display = 'block')
);

closeBookForm.addEventListener(
    'click',
    () => (addBookForm.style.display = 'none')
);

saveBookBtn.addEventListener('click', saveBookToLibrary);

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//testing
Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

//temp data
const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', '295', true);
const book2 = new Book('Fake Book', 'Real Dude', '343', false);

myLibrary.push(book1, book2);

function saveBookToLibrary() {
    let form = document.forms.addBookForm;
    let title = form.querySelector('input[name="title"]').value;
    let author = form.querySelector('input[name="author"]').value;
    let pages = form.querySelector('input[name="pages"]').value;
    let read = form.querySelector('input[name="read"]').checked;
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}
