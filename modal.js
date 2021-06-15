let bookSearchResults = [];

let searchContainer = document.querySelector('.search-container');

// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = 'none';
    searchContainer.classList.remove('remove-lower-radius');
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        searchContainer.classList.remove('remove-lower-radius');
    }
};

const modalContainer = document.getElementById('modal-container');

modalContainer.addEventListener('click', (event) => {
    const isAdd = event.target.className;
    if (isAdd === 'addImg') {
        let bookId = event.target.id;
        modal.style.display = 'none';
        searchContainer.classList.remove('remove-lower-radius');
        mySearch.value = '';

        saveBookToLibrary(bookId);
    }
    console.log('clicked add');
});

const mySearch = document.querySelector('input');

const getBookTitleTest = (book) => {
    return book.volumeInfo.title;
};

const showSearchResults = (data) => {
    console.log(data);
    removeResults();
    console.log(`search term: ${mySearch.value}`);
    for (i = 0; i < data.length; i++) {
        console.log(data[i].volumeInfo.title);

        let bookContainerDiv = document.createElement('div');
        bookContainerDiv.className = `modalBookContainer`;
        let bookId = Date.now().toString() + i; //prevents duplicate ID's when data is returned at the same time
        modalContainer.appendChild(bookContainerDiv);

        let coverDiv = document.createElement('div');
        let coverImg = document.createElement('img');

        coverImg.src = getBookImage(data[i]);

        coverImg.className = 'modalCoverImg';
        coverDiv.appendChild(coverImg);
        coverDiv.className = 'modalCoverDiv';
        bookContainerDiv.appendChild(coverDiv);

        let bookInfoContainerDiv = document.createElement('div');
        bookInfoContainerDiv.className = 'modalBookInformationContainer';
        bookContainerDiv.appendChild(bookInfoContainerDiv);

        let titleDiv = document.createElement('div');
        titleDiv.className = 'modalTitleDiv';
        let titleContent = getBookTitle(data[i]);
        let title = document.createTextNode(titleContent);
        let titleSpan = document.createElement('span');
        titleSpan.appendChild(title);
        titleDiv.appendChild(titleSpan);
        bookInfoContainerDiv.appendChild(titleDiv);

        let authorDiv = document.createElement('div');
        let author = document.createTextNode(getBookAuthor(data[i]));
        let authorSpan = document.createElement('span');
        authorSpan.appendChild(author);
        authorDiv.appendChild(authorSpan);
        authorDiv.className = 'modalAuthorDiv';
        bookInfoContainerDiv.appendChild(authorDiv);

        let pagesDiv = document.createElement('div');
        let pages = document.createTextNode(getBookPages(data[i]));
        pagesDiv.appendChild(pages);
        pagesDiv.className = 'modalPagesDiv';
        //bookInfoContainerDiv.appendChild(pagesDiv);

        let addImg = document.createElement('img');
        addImg.src = 'images/addIcon.jpg';
        addImg.className = 'addImg';
        addImg.alt = 'Add Book';
        addImg.id = bookId;
        bookContainerDiv.appendChild(addImg);

        saveBookToSearchResults(
            titleContent,
            author.data,
            pages.data,
            false,
            bookId,
            data[i],
            i
        );
    }
};

async function mySearchDisplay(e) {
    if (e.target.value == '') {
        return;
    } else {
        (async () =>
            showSearchResults(
                await getBookInformation(e.target.value).then((data) => {
                    return data;
                })
            ))();
    }
}

mySearch.addEventListener('input', mySearchDisplay);
mySearch.addEventListener('focus', (event) => {
    modal.style.display = 'block';
    searchContainer.classList.add('remove-lower-radius');
});

let removeResults = () => {
    document
        .querySelectorAll('.modalBookContainer')
        .forEach((e) => e.parentNode.removeChild(e));
};

let saveBookToSearchResults = (
    title,
    author,
    pages,
    read,
    bookId,
    bookInformation,
    index
) => {
    let newBook = new Book(title, author, pages, read, bookId, bookInformation);
    bookSearchResults[index] = newBook;
};
