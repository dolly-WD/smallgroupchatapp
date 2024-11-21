const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/send-message', (req, res) => {
    const { username, message } = req.body;
  
    // Read existing messages
    const messages = JSON.parse(fs.readFileSync('messages.json', 'utf8'));
  
    // Add new message
    messages.push({ username, message });
  
    // Save messages back to file
    fs.writeFileSync('messages.json', JSON.stringify(messages, null, 2));
  
    res.json({ success: true });
  });
  
  // Endpoint to get all messages
  app.get('/messages', (req, res) => {
    const messages = JSON.parse(fs.readFileSync('messages.json', 'utf8'));
    res.json(messages);
  });
  
  // Serve Login Page
  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
  });
  
  // Serve Chat Page
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
  // Start server
  const PORT = 3000;
  app.listen(PORT, () => {
    // Initialize messages file if it doesn't exist
    if (!fs.existsSync('messages.json')) {
      fs.writeFileSync('messages.json', JSON.stringify([]));
    }
    console.log(`Server is running on http://localhost:${PORT}`);
  });