const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for all routes

app.get('/data', (req, res) => {
  res.json({ message: "Hello from Backend!" });
});

app.listen(5000, () => {
  console.log('Server running at http://localhost:5000');
});
