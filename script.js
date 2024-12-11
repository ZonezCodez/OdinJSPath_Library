// The array that the book objects will be stored in and acted upon
let myLibrary = [];

// lets us add dynamic numbers to ids so they are one of a kind.
let count = 0;
// Modal variable to access modal
let modal = document.getElementById('bookBox');
// Grab the book container so we can append to it and reset it.
let bookContainer = document.getElementById('books');
// The variable below will allow us to add an event listener to the add book button
let addBook = document.getElementById('newBook');
addBook.addEventListener('click',(e)=>{
    //Handle the opening of the modal
    openModal();
    return 'Modal Opened';
})

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
    titleDiv.textContent = `Title: ${object.title}`;
    authorDiv.textContent = `Author: ${object.author}`;
    pagesDiv.textContent = `Pages: ${object.pages}`;
    readDiv.textContent = `Read: ${object.read}`;
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
// This function adds a book to the library.
function addBookToLibrary(t,a,p,r){
    let book = new Book(t,a,p,r);
    myLibrary.push(book);
    updateBooks(myLibrary);
    return 'Book added to library!';
}
// Function handles updating the screen of books by using the array to loop and display books.
function updateBooks(array){
    // Reset the books area so we can create it properly and avoid dups
    resetBooks();
    array.forEach(book => {
        // this is where you make each card and then append to the page to show what books are in the library
        HtmlBook(book);
        return;
    });
}

function handleForm(obj){
    // Will handle all the data in the form object.
    if(obj.read === null){
        addBookToLibrary(obj.title,obj.author,obj.pages,'Not Read');
        return;
    }else if(obj.read === 'on'){
        addBookToLibrary(obj.title,obj.author,obj.pages,'Read This Book');
        return;
    }
}

function checkFormData(obj){
    return handleForm(obj);
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
    console.log(myLibrary)
    myLibrary = myLibrary.filter(book => book !== undefined && book !== null);
    console.log(myLibrary)
    updateBooks(myLibrary);
    return 'Library Updated!';
}

// The function below will handle opening the modal
function openModal(){
    modal.style.display = 'flex';
    // The variable below will add an event listener to the close on the X to close the modal
    let modalClose = document.getElementById('cancelAdd');
    modalClose.addEventListener('click', (e)=>{
    closeModal();
    return 'Modal Closed';
    })
    // The variable below will handle the form submission by adding an event listener to the submit button.
    let formSub = document.getElementById('myForm');
    formSub.addEventListener('submit', (e)=>{
        e.preventDefault();
        const formData = new FormData(formSub);
        // pull the data we need from form to sen to function to check
        const bookObj = {
            title: formData.get('booktitle'),
            author: formData.get('bookauthor'),
            pages: formData.get('bookpages'),
            read: formData.get('read')
        }
        // Checks title to make sure isnt a duplicate
        if(myLibrary.length > 0){
            myLibrary.forEach(book => {
                if(book.title === bookObj.title){
                    clearForm(formSub);
                    return 'Duplicate Book'
                }
            })
        }else{
            checkFormData(bookObj);
            clearForm(formSub);
            closeModal();
            return;  
        }
        
    })
    return;
}

// This function handles closing the modal
function closeModal(){
   modal.style.display = 'none';
   return; 
}

// This function handles clearing the form 
function clearForm(form){
    console.log(form);
    form.reset();
    return 'Form Reset'
}
