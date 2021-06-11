// TODO
// - input validation
// - firebase database/login
// - Books API for covers? google books or open library?

let myLibrary = [];

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
        restoreBookToLibrary(
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
    localStorage.getItem('myLibrary')
        ? readLocalStorage()
        : console.log(`no local storage`);

    showLibrary();
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
let count = 0;
let showLibrary = () => {
    myLibrary.forEach((element) => {
        console.log(`test, count: ${count}, elemnt ${element.title}`);
        console.log(`${element.value}`);
        count++;
        //console.log(myLibrary[i].info());
        let bookContainerDiv = document.createElement('div');
        bookContainerDiv.className = `bookContainer`;
        let bookId = element.bookId;

        libraryContainer.appendChild(bookContainerDiv);

        let titleDiv = document.createElement('div');
        let title = document.createTextNode(element.title);
        titleDiv.appendChild(title);
        titleDiv.className = 'titleDiv';
        bookContainerDiv.appendChild(titleDiv);

        let coverDiv = document.createElement('div');
        let coverImg = document.createElement('img');

        coverImg.src = element.bookInformation.volumeInfo.imageLinks.thumbnail;

        coverImg.className = 'coverImg';
        coverDiv.appendChild(coverImg);
        coverDiv.className = 'coverDiv';
        bookContainerDiv.appendChild(coverDiv);

        let authorDiv = document.createElement('div');
        let author = document.createTextNode(element.author);
        authorDiv.appendChild(author);
        authorDiv.className = 'authorDiv';
        bookContainerDiv.appendChild(authorDiv);

        //console.log(getBookCover(title, author));

        let pagesDiv = document.createElement('div');
        let pages = document.createTextNode(element.pages);
        pagesDiv.appendChild(pages);
        pagesDiv.className = 'pagesDiv';
        bookContainerDiv.appendChild(pagesDiv);

        let readDiv = document.createElement('div');
        let read = document.createTextNode(element.read);
        readDiv.appendChild(read);
        readDiv.className = 'readDiv';
        bookContainerDiv.appendChild(readDiv);

        let removeImg = document.createElement('img');
        removeImg.src = 'images/Remove.png';
        removeImg.className = 'removeImg';
        removeImg.alt = 'Remove Book';
        removeImg.id = bookId;
        bookContainerDiv.appendChild(removeImg);
    });
};

// returns books info
Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
};

//Saves the book into the library onces added by user.
let restoreBookToLibrary = (
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
    // showLibrary();
};

let saveBookToLibrary = (bookId) => {
    bookIndex = bookSearchResults.findIndex((x) => x.bookId === bookId);
    bookToAdd = bookSearchResults[bookIndex];
    myLibrary.push(bookToAdd);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
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
        return book.volumeInfo.imageLinks.thumbnail;
    } catch (err) {
        return 'images/Blank.jpg';
    }
};

let getBookTitle = (book) => {
    return book.volumeInfo.title;
};

let getBookAuthor = (book) => {
    return book.volumeInfo.authors;
};

let getBookPages = (book) => {
    return book.volumeInfo.pageCount;
};

async function getBookInformation(search) {
    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${search}`
    );

    const bookInformation = await response.json();
    let bookInformationArray = await bookInformation.items;
    return bookInformationArray;
}
