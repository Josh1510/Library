// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById('myBtn');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
    modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

const mySearch = document.querySelector('input');
const modalContainer = document.getElementById('modal-container');

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
        bookContainerDiv.className = `bookContainer`;
        let bookId = Date.now().toString() + i; //prevents duplicate strings when data is returned at the same time
        modalContainer.appendChild(bookContainerDiv);

        let titleDiv = document.createElement('div');
        //let title = data[0].volumeInfo.title
        //let titleContent = data[i].volumeInfo.title;
        let titleContent = getBookTitle(data[i]);
        let title = document.createTextNode(titleContent);
        titleDiv.appendChild(title);
        //     titleDiv.className = 'titleDiv';
        bookContainerDiv.appendChild(titleDiv);

        let coverDiv = document.createElement('div');
        let coverImg = document.createElement('img');

        coverImg.src = getBookImage(data[i]);

        coverImg.className = 'coverImg';
        coverDiv.appendChild(coverImg);
        coverDiv.className = 'coverDiv';
        bookContainerDiv.appendChild(coverDiv);

        let authorDiv = document.createElement('div');
        let author = document.createTextNode(getBookAuthor(data[i]));
        authorDiv.appendChild(author);
        authorDiv.className = 'authorDiv';
        bookContainerDiv.appendChild(authorDiv);

        let pagesDiv = document.createElement('div');
        let pages = document.createTextNode(getBookPages(data[i]));
        pagesDiv.appendChild(pages);
        pagesDiv.className = 'pagesDiv';
        bookContainerDiv.appendChild(pagesDiv);

        let readDiv = document.createElement('div');
        let read = document.createTextNode(data[i].read);
        readDiv.appendChild(read);
        readDiv.className = 'readDiv';
        bookContainerDiv.appendChild(readDiv);

        let addImg = document.createElement('img');
        addImg.src = 'images/addIcon.jpg';
        addImg.className = 'addImg';
        addImg.alt = 'Add Book';
        addImg.id = bookId;
        bookContainerDiv.appendChild(addImg);
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
});

let removeResults = () => {
    document
        .querySelectorAll('.bookContainer')
        .forEach((e) => e.parentNode.removeChild(e));
};

// async function getBookInformation(search) {
//     const response = await fetch(
//         `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${GOOGLE_BOOKS_API}`
//     );

//     const bookInformation = await response.json();
//     let bookInformationArray = await bookInformation.items;
//     return bookInformationArray;
// }
// let updateText = (e) => {
//     log.textContent = e.target.value;
// };
// const log = document.getElementById('test-text');
// mySearch.addEventListener('input', updateText);
