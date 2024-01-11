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
      

      try {
        const response =  fetch("http://localhost:5000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
    
        const result =  response;
        console.log("Success:", result);
      } catch (error) {
        console.error("Error:", error);
      }


    }else{
      document.getElementById('error-message').textContent = 'Invalid email';
    }

  });
  

  function sendData(){
    
  }
  function ValidateEmail(input) {

    var validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if(input.match(validRegex) !== null){
      return true;
    }else{
      alert("Invalid email address");
      return false;
    }

  }

