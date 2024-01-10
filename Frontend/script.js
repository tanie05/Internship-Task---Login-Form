document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    
    if (username === 'intern' && password === 'training123') {
      window.location.href = 'http://localhost:3000/'; 
    } else {
      document.getElementById('error-message').textContent = 'Invalid username or password';
    }
  });
  