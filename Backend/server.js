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

//Use of body parser
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

    //password validation
    function testPwd(password){
      var lowerCase = /[a-z]/,      // test for lowercase only
          upperCase = /[A-Z]/,      // test for uppercase only
          number = /[0-9]/,         // test for number only
          symbols = /[^a-zA-Z0-9]/; // test for non-string and non-number
    
      // If there isn't any lower case, return false
      if (lowerCase.test(password) === false)
        // res.send("Must have lowercase letter")
        res.status(400).send('Bad Request');  
          console.log("password must contain lowercase letter")
     
      // If there isn't any uppercase case, return false
      if (upperCase.test(password) === false)
      console.log("password must contain at least onr upper case letter")
      // res.send("Must have lowercase letter")
        
      // If there isn't any number, return false
      if (number.test(password) === false)
      console.log("password must contain at least one digit")
      // res.send("Must have lowercase letter")
        
      // If there isn't any symbols, return false
      if (symbols.test(password) === false)
      console.log("password must contain symbol")
      // Now if the code executes until this position,
      // it means all conditions are successfully met
      // so, return true;
      return true;
    }
    testPwd(password)











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
