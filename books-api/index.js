const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const path = require('path');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());

let books = [
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 4, title: 'To Kill a fish', author: 'Gabriel Lee' },
    { id: 5, title: 'To Love a Mockingbird', author: 'Anie Lee' },
    { id: 6, title: 'To Run a Mockingbird', author: 'Ade Ayo' }

];

app.get('/api/books', (req, res) => {
    res.json(books);
});

app.post('/api/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    book.title = req.body.title;
    book.author = req.body.author;
    res.json(book);
});

app.delete('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    books = books.filter(b => b.id !== bookId);
    res.status(204).send(); 
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
