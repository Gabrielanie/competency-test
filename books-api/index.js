const express = require('express');
const app = express();
const connection = require('./db');  
const path = require('path');
const PORT = process.env.PORT || 5000;

app.use(express.json()); 



app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/books', (req, res) => {
  connection.query('SELECT * FROM books', (err, results) => {
    if (err) {
      console.error('Error fetching books:', err);
      return res.status(500).send('Server error');
    }
    res.json(results);
  });
});


app.post('/api/books', (req, res) => {
  const { title, author } = req.body;
  const query = 'INSERT INTO books (title, author) VALUES (?, ?)';
  connection.query(query, [title, author], (err, result) => {
    if (err) {
      console.error('Error adding book:', err);
      return res.status(500).send('Server error');
    }
    res.status(201).json({ id: result.insertId, title, author });
  });
});



app.put('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;
  const query = 'UPDATE books SET title = ?, author = ? WHERE id = ?';

  connection.query(query, [title, author, bookId], (err, result) => {
    if (err) {
      console.error('Error updating book:', err);
      return res.status(500).send('Server error');
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ id: bookId, title, author });
  });
});

app.delete('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const query = 'DELETE FROM books WHERE id = ?';

  connection.query(query, [bookId], (err, result) => {
    if (err) {
      console.error('Error deleting book:', err);
      return res.status(500).send('Server error');
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(204).send(); 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
