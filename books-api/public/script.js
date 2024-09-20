const bookListDiv = document.getElementById('book-list');

// Function to fetch and display books
function fetchBooks() {
    fetch('/api/books')
        .then(response => response.json())
        .then(books => {
            bookListDiv.innerHTML = ''; 
            books.forEach(book => {
                const bookItem = document.createElement('div');
                bookItem.innerHTML = `<strong>ID:</strong> ${book.id} | <strong>Title:</strong> ${book.title} | <strong>Author:</strong> ${book.author}`;
                bookListDiv.appendChild(bookItem);
            });
        })
        .catch(error => console.error('Error fetching books:', error));
}

document.getElementById('add-book-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;

    fetch('/api/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, author })
    })
    .then(response => response.json())
    .then(book => {
        fetchBooks(); 
        e.target.reset(); 
    })
    .catch(error => console.error('Error adding book:', error));
});

document.getElementById('update-book-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const id = document.getElementById('update-id').value;
    const title = document.getElementById('update-title').value;
    const author = document.getElementById('update-author').value;

    fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, author })
    })
    .then(response => response.json())
    .then(book => {
        fetchBooks(); // Refresh the book list
        e.target.reset(); // Reset the form
    })
    .catch(error => console.error('Error updating book:', error));
});

// Delete a book
document.getElementById('delete-book-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const id = document.getElementById('delete-id').value;

    fetch(`/api/books/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        fetchBooks(); // Refresh the book list
        e.target.reset();  
    })
    .catch(error => console.error('Error deleting book:', error));
});

// Initial fetch
fetchBooks();
