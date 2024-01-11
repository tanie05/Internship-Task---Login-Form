const express = require('express');
const bodyParser = require('body-parser')
const md5 = require('md5') 
const app = express();
const port = 3000; // You can change the port number if needed

//CORS
var cors = require('cors')
const corsOptions = {
  origin: '*',
  credentials: true,
};
app.use(cors(corsOptions))

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    let hashedpw = ''
    hashedpw = md5(password)
    console.log(hashedpw)
    console.log(`Received username: ${username}, password: ${password}, hashedpw: ${hashedpw}`);

    
    //hashing the password. 
    //Step 1 - check whether password length > 0.
    //Step 2 - hash the password
    if (password.length > 0) {
      hashedpw = md5(password)
      console.log(hashedpw)
    }
    else {
      console.log("Minimum length error")
    }

  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
