const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON

// Root route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// ===== CRUD Routes Start =====

let items = [
  { id: 1, name: 'Item One', description: 'This is item one' },
  { id: 2, name: 'Item Two', description: 'This is item two' }
];

// GET all items
app.get('/items', (req, res) => {
  res.json(items);
});

// GET item by ID
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

// POST a new item
app.post('/items', (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }
  const newItem = {
    id: items.length + 1,
    name,
    description
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT update an item
app.put('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item not found' });

  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }

  item.name = name;
  item.description = description;
  res.json(item);
});

// DELETE an item
app.delete('/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Item not found' });

  const deletedItem = items.splice(index, 1);
  res.json(deletedItem[0]);
});

// ===== CRUD Routes End =====

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});