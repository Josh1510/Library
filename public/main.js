let myLibrary = [];
let bookCount = 0;

const libraryContainer = document.getElementById('library-container');

libraryContainer.addEventListener('click', (event) => {
    const isRemove = event.target.className;
    if (isRemove === 'removeImg') {
        let removeId = event.target.id;
        removeBook(removeId);
        return;
    }
});

const addBookForm = document.querySelector('#addBookForm');
const addBookBtn = document.querySelector('#add-book-btn');
const closeBookForm = document.querySelector('#close-book-form');
const saveBookBtn = document.querySelector('#save-book-btn');

let form = document.forms.addBookForm;

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

saveBookBtn.addEventListener('click', checkValidInput);

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
        bookContainerDiv.className = `bookContainer`;
        let titleId = myLibrary[i].title;
        bookContainerDiv.id = titleId.replace(/\s+/g, '-');

        libraryContainer.appendChild(bookContainerDiv);

        let titleDiv = document.createElement('div');
        let title = document.createTextNode(myLibrary[i].title);
        titleDiv.appendChild(title);
        titleDiv.className = 'titleDiv';
        bookContainerDiv.appendChild(titleDiv);

        let coverDiv = document.createElement('div');
        let coverImg = document.createElement('img');
        let coverImgFile = `images/${myLibrary[i].title}.jpg`;
        doesFileExist(coverImgFile)
            ? (coverImg.src = coverImgFile)
            : (coverImg.src = `images/Blank.jpg`);
        coverImg.className = 'coverImg';
        coverDiv.appendChild(coverImg);
        coverDiv.className = 'coverDiv';
        bookContainerDiv.appendChild(coverDiv);

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

        let removeImg = document.createElement('img');
        removeImg.src = '/images/Remove.png';
        removeImg.className = 'removeImg';
        removeImg.id = bookContainerDiv.id;
        bookContainerDiv.appendChild(removeImg);

        bookCount++;
    }
}

// check if file exists
function doesFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();

    return xhr.status !== 404;
}

// returns books info
Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

// temp data
const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', '295', false);
const book3 = new Book('The Hobbit 2', 'J.R.R. Tolkien', '295', false);
const book4 = new Book('The Hobbit 3', 'J.R.R. Tolkien', '295', false);
const book5 = new Book('The Hobbit 4', 'J.R.R. Tolkien', '295', false);
const book2 = new Book('A Game of Thrones', 'George R. R. Martin', '912', true);
myLibrary.push(book1, book2, book3, book4, book5);

function saveBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);

    form.querySelector('input[name="title"]').value = '';
    form.querySelector('input[name="author"]').value = '';
    form.querySelector('input[name="pages"]').value = '';
    form.querySelector('input[name="read"]').checked = false;

    addBookForm.style.display = 'none';

    showLibrary();
}

// remove book when x button is clicked, looks for book container with matching
// id of book title then removes the book from the array
function removeBook(bookTitle) {
    document.querySelector(`#${bookTitle}`).remove();
    bookTitleFind = bookTitle.replace(/[^a-zA-Z0-9 ]/g, ' ');
    myLibrary.splice(
        myLibrary.findIndex((x) => x.title === bookTitleFind),
        1
    );

    bookCount--;
}

function checkValidInput() {
    let title = form.querySelector('input[name="title"]');
    let author = form.querySelector('input[name="author"]');
    let pages = form.querySelector('input[name="pages"]');
    let read = form.querySelector('input[name="read"]').checked;

    if (title.value == '') {
        title.placeholder = 'Title is required!';
        console.log('missing title');
        return;
    } else {
        console.log('booklibrary save to');
        saveBookToLibrary(title.value, author.value, pages.value, read);
    }
}