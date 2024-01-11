document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    
    if(ValidateEmail(email)){
      // window.location.href = 'http://localhost:3000/'; 
      
      const data = {
        email: email,
        password: password
      }
      // Make a POST request to the Node.js server
  fetch('http://localhost:5000/login', {
    method: 'POST',
    
    headers: {
      'Content-Type': 'application/json',
      
    },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then(response => response.json())
    .then(data => {
      //On successful of login
      if(data.change){
        alert('Change your password');
      }
      else {
        alert('Logged In');
      }
    })
    .catch(error => {
      console.error('Error sending data:', error);
      document.getElementById('error-message').textContent = 'Invalid username or password';
  
    });

      
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


  
  
  
    



  