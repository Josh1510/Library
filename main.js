// TODO
// - input validation
// - firebase database/login
// - Books API for covers? google books or open library?

let myLibrary = [];
let bookCount = 0;

const libraryContainer = document.getElementById('library-container');

libraryContainer.addEventListener('click', (event) => {
    const isRemove = event.target.className;
    if (isRemove === 'removeImg') {
        let bookId = event.target.id;
        removeBook(bookId);
    }
});

const saveBookBtn = document.getElementById('search-btn');

//read the local storage and import books if they exist
let readLocalStorage = () => {
    myLocalLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    for (var i = 0; i < myLocalLibrary.length; i++) {
        saveBookToLibrary(
            myLocalLibrary[i].title,
            myLocalLibrary[i].author,
            myLocalLibrary[i].pages,
            myLocalLibrary[i].read,
            myLocalLibrary[i].bookId,
            myLocalLibrary[i].bookInformation
        );
    }
};

//loads any existing books in storage on page load
window.addEventListener('load', () => {
    showLibrary();
    localStorage.getItem('myLibrary')
        ? readLocalStorage()
        : console.log(`no local storage`);
});

class Book {
    constructor(
        title = 'unknown',
        author = 'unknown',
        pages = 0,
        read = false,
        bookId,
        bookInformation
    ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.bookId = bookId;
        this.bookInformation = bookInformation;
    }
}

let showLibrary = () => {
    for (i = bookCount; i < myLibrary.length; i++) {
        console.log(myLibrary[i].info());
        let bookContainerDiv = document.createElement('div');
        bookContainerDiv.className = `bookContainer`;
        let bookId = myLibrary[i].bookId;

        libraryContainer.appendChild(bookContainerDiv);

        let titleDiv = document.createElement('div');
        let title = document.createTextNode(getBookTitle(myLibrary[i]));
        titleDiv.appendChild(title);
        titleDiv.className = 'titleDiv';
        bookContainerDiv.appendChild(titleDiv);

        let coverDiv = document.createElement('div');
        let coverImg = document.createElement('img');

        coverImg.src = getBookImage(myLibrary[i]);

        coverImg.className = 'coverImg';
        coverDiv.appendChild(coverImg);
        coverDiv.className = 'coverDiv';
        bookContainerDiv.appendChild(coverDiv);

        let authorDiv = document.createElement('div');
        let author = document.createTextNode(getBookAuthor(myLibrary[i]));
        authorDiv.appendChild(author);
        authorDiv.className = 'authorDiv';
        bookContainerDiv.appendChild(authorDiv);

        //console.log(getBookCover(title, author));

        let pagesDiv = document.createElement('div');
        let pages = document.createTextNode(getBookPages(myLibrary[i]));
        pagesDiv.appendChild(pages);
        pagesDiv.className = 'pagesDiv';
        bookContainerDiv.appendChild(pagesDiv);

        let readDiv = document.createElement('div');
        let read = document.createTextNode(myLibrary[i].read);
        readDiv.appendChild(read);
        readDiv.className = 'readDiv';
        bookContainerDiv.appendChild(readDiv);

        let removeImg = document.createElement('img');
        removeImg.src = 'images/Remove.png';
        removeImg.className = 'removeImg';
        removeImg.alt = 'Remove Book';
        removeImg.id = bookId;
        bookContainerDiv.appendChild(removeImg);

        bookCount++;
    }
};

// returns books info
Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

//Saves the book into the library onces added by user.
let saveBookToLibrary = (
    title,
    author,
    pages,
    read,
    bookId,
    bookInformation
) => {
    let newBook = new Book(title, author, pages, read, bookId, bookInformation);
    myLibrary.push(newBook);

    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

    //refreshes the library to display the new book
    showLibrary();
};

// remove book when x button is clicked, looks for book container with matching
// id of book title then removes the book from the array
let removeBook = (bookId) => {
    document.getElementById(`${bookId}`).parentNode.remove();
    myLibrary.splice(
        myLibrary.findIndex((x) => x.bookId === bookId),
        1
    );
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    bookCount--;
};

let resetForm = () => {
    document.querySelector('input[name="search"]').value = '';
};

// TODO
// Check that the user has entered a valid input
let checkValidInput = () => {
    let search = document.querySelector('input[name="search"]');
    if (search.value == '') {
        console.log('missing title');
        return;
    } else {
        console.log('booklibrary save to');
        (async () =>
            saveBookToLibrary(
                'title',
                'author',
                'pages',
                false,
                Date.now(),
                await getBookInformation(search.value).then((data) => {
                    return data;
                })
            ))();
    }
    resetForm();
};

saveBookBtn.addEventListener('click', checkValidInput);

let getBookImage = (book) => {
    try {
        return book.bookInformation[0].volumeInfo.imageLinks.thumbnail;
    } catch (err) {
        return 'images/Blank.jpg';
    }
};

let getBookTitle = (book) => {
    return book.bookInformation[0].volumeInfo.title;
};

let getBookAuthor = (book) => {
    return book.bookInformation[0].volumeInfo.authors;
};

let getBookPages = (book) => {
    return book.bookInformation[0].volumeInfo.pageCount;
};

async function getBookInformation(search) {
    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${GOOGLE_BOOKS_API}`
    );

    const bookInformation = await response.json();
    let bookInformationArray = await bookInformation.items;
    return bookInformationArray;
}
