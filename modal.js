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

const mySearch = document.querySelector('input[name="search"]');

let showSearchResults = (data) => {
    for (i = 0; i < 10; i++) {
        console.log(data[i].info());
        let bookContainerDiv = document.createElement('div');
        bookContainerDiv.className = `bookContainer`;
        let bookId = data[i].bookId;

        libraryContainer.appendChild(bookContainerDiv);

        let titleDiv = document.createElement('div');
        let title = document.createTextNode(getBookTitle(data[i]));
        titleDiv.appendChild(title);
        titleDiv.className = 'titleDiv';
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

        let removeImg = document.createElement('img');
        removeImg.src = 'images/Remove.png';
        removeImg.className = 'removeImg';
        removeImg.alt = 'Remove Book';
        removeImg.id = bookId;
        bookContainerDiv.appendChild(removeImg);
    }
};

let mySearchDisplay = () => {
    if (mySearch.value == '') {
        return;
    } else {
        (async () =>
            showSearchResults(
                await getBookInformation(mySearch.value).then((data) => {
                    return data;
                })
            ))();
    }
};

mySearch.addEventListener('change', mySearchDisplay(mySearch.value));

async function getBookInformation(search) {
    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${GOOGLE_BOOKS_API}`
    );

    const bookInformation = await response.json();
    let bookInformationArray = await bookInformation.items;
    return bookInformationArray;
}
