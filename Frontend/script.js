document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if(ValidateEmail(email)){
      // VerifyEmail(email)
      window.location.href = 'http://localhost:3000/'; 
    }else{
      document.getElementById('error-message').textContent = 'Invalid email';
    }

  });
  


  function ValidateEmail(input) {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    if (input.match(validRegex)) {

      return true;
  
    } else {
  
      alert("Invalid email address!");
  
      return false;
  
    }
  
  }
  // import axios from 'axios';

  // async function VerifyEmail(input){

  //   const options = {
  //     method: 'GET',
  //     url: 'https://quickemailverification.p.rapidapi.com/v1/verify',
  //     params: {
  //       email: input
  //     },
  //     headers: {
  //       Authorization: '<REQUIRED>',
  //       'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
  //       'X-RapidAPI-Host': 'quickemailverification.p.rapidapi.com'
  //     }
  //   };
    
  //   try {
  //     const response = await axios.request(options);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
