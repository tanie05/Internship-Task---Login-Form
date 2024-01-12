const express = require('express');
const mysql = require('mysql')
const cors = require('cors');
const bodyparser = require('body-parser');

const md5 = require('md5') 
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
  console.log(input);
  if(input.match(validRegex) !== null){
    return true;
  }else{
    throw new Error("Invalid Email");
  }

}

function testPwd(password){
  var lowerCase = /[a-z]/,      // test for lowercase only
      upperCase = /[A-Z]/,      // test for uppercase only
      number = /[0-9]/,         // test for number only
      symbols = /[^a-zA-Z0-9]/; // test for non-string and non-number

  // If there isn't any lower case, return false
  if (lowerCase.test(password) === false)
    // res.send("Must have lowercase letter")

      throw new Error("password must contain lowercase letter")
 
  // If there isn't any uppercase case, return false
  if (upperCase.test(password) === false)
  throw new Error("password must contain at least onr upper case letter")
  // res.send("Must have lowercase letter")
    
  // If there isn't any number, return false
  if (number.test(password) === false)
  throw new Error("password must contain at least one digit")
  // res.send("Must have lowercase letter")
    
  // If there isn't any symbols, return false
  if (symbols.test(password) === false)
  throw new Error("password must contain symbol")
  // Now if the code executes until this position,
  // it means all conditions are successfully met
  // so, return true;
  return true;
}


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'login_form',
})

function insertUser(email,password) {
  const queryStr=`select * from user2 WHERE email =`+mysql.escape(email) ;
  db.query(queryStr,(err,res)=>{
      if(err){
          throw err;
      }
      console.log(res);
      if(res.length==1){
          return;
      }
      else{
          const queryStr=`insert into user2(email,password) values(`+mysql.escape(email)+`,`+mysql.escape(password)+')';
          db.query(queryStr,(err,res)=>{
              if (err) {
                  throw err;
              }
              console.log('user inserted'+res);
          })
      }
      return console.log(typeof(res));
  })
  
}

db.connect(function(err) {
  if (err) console.log(err);
  console.log("Connected!");
  // let sql = "INSERT INTO customers (name, ÷address) VALUES ('Company Inc', 'Highway 37')";
});

app.post('/login', (req, res, next)=>{
  
  try{

    let {email, password} = req.body;
    console.log(email, password);
    if( ValidateEmail(email)){
      console.log('here');
      throw new Error("Invalid Email")
    }
    
    
    testPwd(password);
    console.log('here');
    let hashedpw = ''
    if (password.length <= 0) {
      throw new Error("Minimum length error");
    }
    password = md5(password)
    
    
    
    
    
    
    const sql ='SELECT login_count from user2 where email = ? and password = ?';
    db.query(sql, [email, password], (err , result)=>{
      if(err) throw new Error(err);
      console.log(result.length);
      if(result.length === 0){
        console.log('hi');
        insertUser(email, password);
        res.status(200).send({success: true, change: false});
        return next();
      }
      

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
  }
  catch(err){
    console.log(err);
    res.status(400).send({success: false, error: err});
  }
})

// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     console.log(`Received username: ${username}, password: ${password}`);
//     res.send('Login successful');
//   });
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     //password validation
//     function testPwd(password){
//       var lowerCase = /[a-z]/,      // test for lowercase only
//           upperCase = /[A-Z]/,      // test for uppercase only
//           number = /[0-9]/,         // test for number only
//           symbols = /[^a-zA-Z0-9]/; // test for non-string and non-number
    
//       // If there isn't any lower case, return false
//       if (lowerCase.test(password) === false)
//         // res.send("Must have lowercase letter")
//         res.status(400).send('Bad Request');  
//           console.log("password must contain lowercase letter")
     
//       // If there isn't any uppercase case, return false
//       if (upperCase.test(password) === false)
//       console.log("password must contain at least onr upper case letter")
//       // res.send("Must have lowercase letter")
        
//       // If there isn't any number, return false
//       if (number.test(password) === false)
//       console.log("password must contain at least one digit")
//       // res.send("Must have lowercase letter")
        
//       // If there isn't any symbols, return false
//       if (symbols.test(password) === false)
//       console.log("password must contain symbol")
//       // Now if the code executes until this position,
//       // it means all conditions are successfully met
//       // so, return true;
//       return true;
//     }
//     testPwd(password)











//     let hashedpw = ''
//     hashedpw = md5(password)
//     console.log(hashedpw)
//     console.log(`Received username: ${email}, password: ${password}, hashedpw: ${hashedpw}`);

    
//     //hashing the password. 
//     //Step 1 - check whether password length > 0.
//     //Step 2 - hash the password
//     if (password.length > 0) {
//       hashedpw = md5(password)
//       console.log(hashedpw)
//     }
//     else {
//       console.log("Minimum length error")
//     }

//   });



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
