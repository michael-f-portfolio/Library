const libraryBooks = [
    new Book (1, "Meditations", "Marcus Aurelius", 190, false),
    new Book (2, "Future Science", "Max Brockman", 247, false),
    new Book (3, "The Journey of Socrates", "Dan Millman", 336, true)
];

function Book(index, title, author, numberOfPages, hasBeenRead) {
    this.index = index;
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
    const hasBeenReadCheckbox = document.querySelector("#has-been-read");
    let newBookTitle, newBookAuthor, newBookNumberOfPages, newBookHasBeenRead;
    inputElementsAsArray.forEach(input => {
        if (input.lastElementChild.id === "title") {
            newBookTitle = input.lastElementChild.value;
        } else if (input.lastElementChild.id === "author") {
            newBookAuthor = input.lastElementChild.value;
        } else if (input.lastElementChild.id === "number-of-pages") {
            newBookNumberOfPages = parseInt(input.lastElementChild.value);
        }
    });

    newBookHasBeenRead = hasBeenReadCheckbox.checked === true;

    libraryBooks.push(new Book(libraryBooks.length, newBookTitle, newBookAuthor, newBookNumberOfPages, newBookHasBeenRead));
    displayBooks();
}

function removeBookFromLibrary() {
    libraryBooks.splice(this.getAttribute("id"), 1)
    displayBooks();
}

function displayBooks() {
    let booksContainer = document.querySelector(".display-books");
    booksContainer.innerHTML = "";
    let bookIndex = 0;
    libraryBooks.forEach(book => {
        let newBookContainer = document.createElement("div");
        newBookContainer.className = "book";

        let bookTitleDiv = document.createElement("div");
        bookTitleDiv.className = "book-title";
        bookTitleDiv.textContent = book.title;

        let bookAuthorDiv = document.createElement("div");
        bookAuthorDiv.className = "book-author";
        bookAuthorDiv.textContent = book.author;

        let bookDetailsDiv = document.createElement("div");
        bookDetailsDiv.className = "book-details";
        bookDetailsDiv.append(bookTitleDiv);
        bookDetailsDiv.append(bookAuthorDiv);

        let bookNumberOfPagesDiv = document.createElement("div");
        bookNumberOfPagesDiv.classList = "book-pages";
        bookNumberOfPagesDiv.textContent = `${book.pages} Pages`;

        let bookHasBeenReadDiv = document.createElement("div");
        bookHasBeenReadDiv.classList = "book-read";
        bookHasBeenReadDiv.textContent = book.hasBeenRead ? "Read" : "Unread";

        let bookStatsDiv = document.createElement("div");
        bookStatsDiv.className = "book-stats";
        bookStatsDiv.append(bookNumberOfPagesDiv);
        bookStatsDiv.append(bookHasBeenReadDiv);

        newBookContainer.append(bookDetailsDiv);
        newBookContainer.append(bookStatsDiv);

        // Add Book Actions
        let removeBookButton = document.createElement("button");
        removeBookButton.textContent = "Remove Book";
        removeBookButton.setAttribute("id", bookIndex++);

        removeBookButton.addEventListener("click", removeBookFromLibrary);

        let toggleReadButton = document.createElement("button");
        toggleReadButton.textContent = "Toggle Read";
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

const showButton = document.querySelector("#showAddBookDialog");
const addBookDialog = document.querySelector("#addBookDialog");
const confirmBtn = addBookDialog.querySelector("#confirmBtn");
const addBookContainer = document.querySelector(".add-book-container");
showButton.addEventListener("click", () => {
    addBookDialog.showModal();
});
confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addBookToLibrary();
    addBookDialog.close();
});
addBookDialog.addEventListener("click", () => addBookDialog.close());
addBookContainer.addEventListener("click", (event) => event.stopPropagation());

function app() {
    displayBooks();
}

app();