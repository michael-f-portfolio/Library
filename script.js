const libraryBooks = [
    new Book ("Meditations", "Marcus Aurelius", 190, false),
    new Book ("Future Science", "Max Brockman", 247, false),
    new Book ("The Journey of Socrates", "Dan Millman", 336, true)
];

function Book(title, author, numberOfPages, hasBeenRead) {
    this.id = Math.floor((Math.random() * 1000000));
    this.title = title;
    this.author = author;
    this.pages = numberOfPages;
    this.hasBeenRead = hasBeenRead;
    this.info = function() {
        return `${title} by ${author}, ${numberOfPages} pages, ${hasBeenRead ? "has been read" : "not read yet"}`;
    }
}

Book.prototype.toggleRead = function() {
    this.hasBeenRead = this.hasBeenRead === true ? false : true;
}

function addBookToLibrary() {
    const inputElementsAsArray = [...document.querySelectorAll(".add-book-input")];
    const hasBeenReadCheckbox = document.querySelector("#hasBeenRead");
    let newBookTitle, newBookAuthor, newBookNumberOfPages, newBookHasBeenRead;
    inputElementsAsArray.forEach(input => {
        if (input.lastElementChild.id === "title") {
            newBookTitle = input.lastElementChild.value;
        } else if (input.lastElementChild.id === "author") {
            newBookAuthor = input.lastElementChild.value;
        } else if (input.lastElementChild.id === "numberOfPages") {
            newBookNumberOfPages = parseInt(input.lastElementChild.value);
        }
    });
    newBookHasBeenRead = hasBeenReadCheckbox.checked === true;
    libraryBooks.push(new Book(newBookTitle, newBookAuthor, newBookNumberOfPages, newBookHasBeenRead));
}

function removeBookFromLibrary(bookId) {
    const bookToRemoveIndex = libraryBooks.findIndex(book  => book.id === parseInt(bookId));
    return libraryBooks.splice(bookToRemoveIndex, 1);
}

function displayBooks() {
    let booksContainer = document.querySelector(".display-books");
    booksContainer.innerHTML = "";
    libraryBooks.forEach(book => {
        let newBookContainer = document.createElement("div");
        newBookContainer.className = "book";

        let bookTitleDiv = document.createElement("div");
        bookTitleDiv.className = "book-title font-size-md font-weight-semibold";
        bookTitleDiv.textContent = book.title;

        let bookAuthorDiv = document.createElement("div");
        bookAuthorDiv.className = "book-author font-size-sm font-style-italic";
        bookAuthorDiv.textContent = book.author;

        let bookDetailsDiv = document.createElement("div");
        bookDetailsDiv.className = "book-details";
        bookDetailsDiv.append(bookTitleDiv);
        bookDetailsDiv.append(bookAuthorDiv);

        let bookNumberOfPagesDiv = document.createElement("div");
        bookNumberOfPagesDiv.classList = "book-pages font-size-xs";
        bookNumberOfPagesDiv.textContent = `${book.pages} Pages`;

        let bookHasBeenReadDiv = document.createElement("div");
        bookHasBeenReadDiv.classList = "book-read font-size-xs";
        bookHasBeenReadDiv.textContent = book.hasBeenRead ? "Read" : "Unread";

        let bookStatsDiv = document.createElement("div");
        bookStatsDiv.className = "book-stats";
        bookStatsDiv.append(bookNumberOfPagesDiv);
        bookStatsDiv.append(bookHasBeenReadDiv);

        newBookContainer.append(bookDetailsDiv);
        newBookContainer.append(bookStatsDiv);

        //// Add Book Actions
        // Remove Book (Show confirm modal)
        let removeBookButton = document.createElement("button");
        removeBookButton.textContent = "Remove Book";
        removeBookButton.setAttribute("bookId", book.id);
        removeBookButton.className = "font-size-sm";

        const removeBookDialog = document.querySelector("#removeBookDialog");
        removeBookButton.addEventListener("click", (event) => {
            const bookId = event.target.getAttribute("bookId");
            const removeBookTitle = document.querySelector("#removeBookTitle").querySelector("span");
            removeBookTitle.textContent = libraryBooks.find(book => book.id === parseInt(bookId)).title;
            removeBookTitle.setAttribute("bookId", bookId);
            removeBookDialog.showModal();
        });

        // Toggle Read Status
        let toggleReadButton = document.createElement("button");
        toggleReadButton.textContent = "Toggle Read";
        toggleReadButton.className = "font-size-sm"
        toggleReadButton.addEventListener("click", book.toggleRead.bind(book));
        toggleReadButton.addEventListener("click", displayBooks);

        let bookActionsContainerDiv = document.createElement("div");
        bookActionsContainerDiv.className = "book-actions";

        bookActionsContainerDiv.append(toggleReadButton);
        bookActionsContainerDiv.append(removeBookButton);
        newBookContainer.append(bookActionsContainerDiv);
        booksContainer.append(newBookContainer);
    });
}

//// Add Book Dialog Events
// Show Add book dialog modal
const showAddBookDialogButton = document.querySelector("#showAddBookDialog");
const addBookDialog = document.querySelector("#addBookDialog");
const confirmAddButton = addBookDialog.querySelector("#confirmAddButton");
showAddBookDialogButton.addEventListener("click", () => addBookDialog.showModal());
// Add to library and close dialog modal
confirmAddButton.addEventListener("click", (event) => {
    event.preventDefault();
    addBookToLibrary();
    displayBooks();
    addBookDialog.close();
});
// Close Add Book Dialog Modal if a click happens anywhere but within the container div
addBookDialog.addEventListener("click", () => addBookDialog.close());
const addBookContainer = document.querySelector(".add-book-container");
addBookContainer.addEventListener("click", (event) => event.stopPropagation());

//// Remove Book Dialog Events
// Remove from library and close dialog modal
const confirmRemoveButton = document.querySelector("#confirmRemoveButton");
const removeBookDialog = document.querySelector("#removeBookDialog");
confirmRemoveButton.addEventListener("click", () => {
    const removeBookTitle = document.querySelector("#removeBookTitle");
    const bookToRemoveIndex = removeBookTitle.querySelector("span").getAttribute("bookId");
    removeBookFromLibrary(bookToRemoveIndex);
    displayBooks();
    removeBookDialog.close();
});
// Close Remove Dialog Modal
const cancelRemoveButton = document.querySelector("#cancelRemoveButton");
cancelRemoveButton.addEventListener("click", () => removeBookDialog.close());
// Close Remove Book Dialog Modal if a click happens anywhere but within the container div
removeBookDialog.addEventListener("click", () => removeBookDialog.close());
const removeBookContainer = document.querySelector(".remove-book-container");
removeBookContainer.addEventListener("click", (event) => event.stopPropagation());

function app() {
    displayBooks();
}

app();