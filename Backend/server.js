const express = require('express');
const app = express();
const port = 5000; // You can change the port number if needed

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`Received username: ${username}, password: ${password}`);
    res.send('Login successful');
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
