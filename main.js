const titleInput = document.querySelector('.title-input');
const authorInput = document.querySelector('.author-input');
const pagesInput = document.querySelector('.pages-input');
const readInput = document.querySelector('.read-input');

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'not read yet');
const book2 = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'not read yet');

myLibrary.push(book1, book2);

console.log(book1.info());

const addBookToLibrary = () => {
    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let read = readInput.value;
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
};
