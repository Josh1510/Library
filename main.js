let myLibrary = [];
let bookCount = 0;

const libraryContainer = document.getElementById('library-container');

const addBookForm = document.querySelector('#addBookForm');
const addBookBtn = document.querySelector('#add-book-btn');
const closeBookForm = document.querySelector('#close-book-form');
const saveBookBtn = document.querySelector('#save-book-btn');

//loads any existing books on page load
window.addEventListener('load', function () {
    showLibrary();
});

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

function showLibrary() {
    for (i = bookCount; i < myLibrary.length; i++) {
        console.log(myLibrary[i].info());
        let bookContainerDiv = document.createElement('div');
        bookContainerDiv.className = 'bookContainer';
        libraryContainer.appendChild(bookContainerDiv);
        let titleDiv = document.createElement('div');
        let title = document.createTextNode(myLibrary[i].title);
        titleDiv.appendChild(title);
        titleDiv.className = 'titleDiv';
        bookContainerDiv.appendChild(titleDiv);

        let authorDiv = document.createElement('div');
        let author = document.createTextNode(myLibrary[i].author);
        authorDiv.appendChild(author);
        authorDiv.className = 'authorDiv';
        bookContainerDiv.appendChild(authorDiv);

        let pagesDiv = document.createElement('div');
        let pages = document.createTextNode(myLibrary[i].pages);
        pagesDiv.appendChild(pages);
        pagesDiv.className = 'pagesDiv';
        bookContainerDiv.appendChild(pagesDiv);

        let readDiv = document.createElement('div');
        let read = document.createTextNode(myLibrary[i].read);
        readDiv.appendChild(read);
        readDiv.className = 'readDiv';
        bookContainerDiv.appendChild(readDiv);

        bookCount++;
    }
}

//returns books info
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

    form.querySelector('input[name="title"]').value = '';
    form.querySelector('input[name="author"]').value = '';
    form.querySelector('input[name="pages"]').value = '';
    form.querySelector('input[name="read"]').checked = false;

    addBookForm.style.display = 'none';

    showLibrary();
}
