// The array that the book objects will be stored in and acted upon
const myLibrary = [];

// lets us add dynamic numbers to ids so they are one of a kind.
let count = 0;

// Grab the book container so we can append to it and reset it.
let bookContainer = document.getElementById('books');

// The constructor function for a book object
function Book(title,author,pages,read){
    return {
        title: title,
        author: author,
        pages: pages,
        read: read
    }
}
// The function that makes the html version of each book object
function HtmlBook(object){
    // Create divs for card and card objects
    let container = document.createElement('div');
    let deleteButton = document.createElement('div');
    let titleDiv = document.createElement('div');
    let authorDiv = document.createElement('div');
    let pagesDiv = document.createElement('div');
    let readDiv = document.createElement('div');
    // Assign classnames for styling purposes
    container.classList.add('container');
    deleteButton.classList.add('delete');
    titleDiv.classList.add('title');
    authorDiv.classList.add('author');
    pagesDiv.classList.add('pages');
    readDiv.classList.add('read');
    // Assign Ids to grab the elements with JS
    container.setAttribute('id',`container${count}`);
    deleteButton.setAttribute('id',`delete${count}`);
    titleDiv.setAttribute('id',`title${count}`);
    authorDiv.setAttribute('id',`author${count}`);
    pagesDiv.setAttribute('id',`pages${count}`);
    readDiv.setAttribute('id',`read${count}`);
    // Assigns text values to the divs that need it
    deleteButton.textContent = 'X';
    titleDiv.textContent = object.title;
    authorDiv.textContent = object.author;
    pagesDiv.textContent = object.pages;
    readDiv.textContent = object.read;
    // Adds event listener for deletion
    deleteButton.addEventListener('click',(e)=>{
        deleteBook(e.target);
        return;
    })
    // Appends everything to the card and then to the page
    container.append(deleteButton);
    container.append(titleDiv);
    container.append(authorDiv);
    container.append(pagesDiv);
    container.append(readDiv);
    bookContainer.append(container);
    // Increase Count Var
    count++;
}

function addBookToLibrary(t,a,p,r){
    let book = new Book(t,a,p,r);
    myLibrary.push(book);
    return updateBooks(myLibrary);
}

function updateBooks(array){
    // Reset the books area so we can create it properly and avoid dups
    resetBooks();
    array.forEach(book => {
        // this is where you make each card and then append to the page to show what books are in the library
        HtmlBook(book);
        return;
    });
}

function handleForm(){
    // Will handle all the data in the form and pass it on properly.
}

// This function handles reseting the html on the page
function resetBooks(){
    bookContainer.textContent = '';
    count = 0;
    return;
}

// This function deletes the book.
function deleteBook(event){
    let currId = event.id;
    let position = parseInt(currId.slice(-1));
    delete myLibrary[position];
    myLibrary.shift();
    updateBooks(myLibrary);
    return 'Library Updated!';
}

addBookToLibrary('t','a','p','r');
addBookToLibrary('t','v','a','z');
addBookToLibrary('The Hobbit','JRR Tolkien','258','Yes');
