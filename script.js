// Global Variables necessary for the project
const nB = document.getElementById('newBook');
let libraries = 0;
let LIBRARY;

// Event Listener added to button to know how many libraries and if their is one how to act upon it
nB.addEventListener('click',(e)=>{
    if(libraries === 0){
        libraries++;
        LIBRARY = new myLibrary();
        LIBRARY.openModal();
        return;
    }else if(libraries > 0){
        LIBRARY.openModal();
        return;
    }else{
        return;
    }
})

class Book {
    // Constructor
    constructor(title,author,pages,read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    // Class Instances or variables
}

class myLibrary {
    //Constructor can receieve an array of books or will just initiate as a base array.
    constructor(arrayofBooks){
        arrayofBooks ? this.library = arrayofBooks : this.library = [];
        this.size = this.library.length;
        this.count = 0;
        this.bookContainer = document.getElementById('books');
        this.modal = document.getElementById('bookBox');
        this.modalClose = document.getElementById('cancelAdd');
    }
        // Methods that adds a new book it takes 4 strings t = titleString a = authorString p = pagesString and the r has to be the string Read this Book or Not Read or else it wont work.
        newBook(t,a,p,r){
            let book = new Book(t,a,p,r);
            this.library.push(book);
            this.count++;
            this.size = this.library.length;
            this.renderBooks();
        }
        // Method that renders books to the screen
        renderBooks() {
            this.resetBooks();
            for(let i = 0; i < this.library.length;i++){
                let position = this.library[i];
                let title = position.title;
                let author = position.author;
                let pages = position.pages;
                let read = position.read;
                this.htmlBook({title,author,pages,read});
            }   
        }
        // Method to create a book and push it to the screen
        htmlBook(object){
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
            container.setAttribute('id',`container${this.count}`);
            deleteButton.setAttribute('id',`delete${this.count}`);
            titleDiv.setAttribute('id',`title${this.count}`);
            authorDiv.setAttribute('id',`author${this.count}`);
            pagesDiv.setAttribute('id',`pages${this.count}`);
            readDiv.setAttribute('id',`read${this.count}`);
            // Assigns text values to the divs that need it
            deleteButton.textContent = 'X';
            titleDiv.textContent = `Title: ${object.title}`;
            authorDiv.textContent = `Author: ${object.author}`;
            pagesDiv.textContent = `Pages: ${object.pages}`;
            readDiv.textContent = `Read: ${object.read}`;
            // Adds event listener for deletion
            deleteButton.addEventListener('click',(e)=>{
                this.deleteBook(e.target);
                return;
            })
            // Add event listener to change read status
            readDiv.addEventListener('click',(e)=>{
                
            });
            // Appends everything to the card and then to the page
            container.append(deleteButton);
            container.append(titleDiv);
            container.append(authorDiv);
            container.append(pagesDiv);
            container.append(readDiv);
            this.bookContainer.append(container);
            this.count++;
        }
        //Method for deleting book
        deleteBook(event){
            let currId = event.id;
            let position = parseInt(currId.slice(-1));
            delete this.library[position];
            this.library = this.library.filter(book => book !== undefined && book !== null);
            this.renderBooks();
            return 'Library Updated!';
        }
        // Method for resetting the books on the screen 
        resetBooks(){
            this.bookContainer.textContent = '';
            this.count = 0;
            return;
        }
        // Method for opening the modal to add books
        openModal(){
            this.modal.style.display = 'flex';
            // The variable below will add an event listener to the close on the X to close the modal
            this.modalClose.addEventListener('click',this.closeModal);
            return;
        }
        // Method will handle closing the modal
        closeModal(){
            let modal = document.getElementById('bookBox');
            let modalClose = document.getElementById('cancelAdd');
            modal.style.display = 'none';
            modalClose.removeEventListener('click',this.closeModal);
            return; 
        }
    }

    let MYBRARY = new myLibrary();
    MYBRARY.newBook('The Hobbit','JRR Tolkien','243','Read this book');
    MYBRARY.newBook('The Hobbit','JRR Tolkien','243','Read this book');
    MYBRARY.newBook('The Hobbit','JRR Tolkien','243','Read this book');