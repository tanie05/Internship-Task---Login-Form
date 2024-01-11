const express = require('express');
const cors = require('cors');


const app = express();
const port = 5000; // You can change the port number if needed


app.use(cors({origin: true, credentials: true}));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


function ValidateEmail(input) {

  var validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if(input.match(validRegex) !== null){
    return true;
  }else{
    alert("Invalid email address");
    return false;
  }

}


const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  
    const email = req.body.email;
    const password = req.body.password;

    if(ValidateEmail(email)){
      console.log(`Received email: ${email}, password: ${password}`);
    }else{
      res.send('Invalid email');
    }

    res.send('Login successful');
  });



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
