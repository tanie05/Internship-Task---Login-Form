document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    
    if(ValidateEmail(email)){
      window.location.href = 'http://localhost:3000/'; 
    }else{
      document.getElementById('error-message').textContent = 'Invalid email';
    }

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

