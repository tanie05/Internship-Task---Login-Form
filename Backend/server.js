const express = require('express');
const mysql = require('mysql')
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();
const port = 5000; // You can change the port number if needed

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(cors())

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

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'login_form',
})

db.connect(function(err) {
  if (err) console.log(err);
  console.log("Connected!");
  // let sql = "INSERT INTO customers (name, ÷address) VALUES ('Company Inc', 'Highway 37')";
});

app.post('/login', (req, res, next)=>{
  
  
  const {email, password} = req.body;
  console.log(email, password);
  if( ValidateEmail(email)){
    res.status(200).send({success: true, error: 'Invalid Email'});
    next();
  }

  const sql ='SELECT login_count from user2 where email = ? and password = ?';
  db.query(sql, [email, password], (err , result)=>{
    if(err) throw err;
    console.log(result);
    if(!result[0].login_count){
      res.status(200).send({success: true, change: true});
    }
    else {
      const sql = `UPDATE user2 SET login_count = ? where email = ?`;
      db.query(sql, [result[0].login_count+1, email],(err, result)=>{
        if(err) throw err;
        res.status(200).send({success: true, change: false});
      })
      
    }
  })
})

// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     console.log(`Received username: ${username}, password: ${password}`);
//     res.send('Login successful');
//   });



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
