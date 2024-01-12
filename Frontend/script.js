document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;


    
    // Make a POST request to the Node.js server
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then(response => response.json())
      .then(data => {
        //On successful of login
        console.log(data)
      })
      .catch(error => {
        console.error('Error sending data:', error);
        document.getElementById('error-message').textContent = 'Some error occurred';
      });
    
    if (username === 'intern' && password === 'training123') {
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

