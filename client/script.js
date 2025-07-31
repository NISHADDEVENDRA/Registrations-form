document.getElementById("registrationForm").addEventListener("submit",function(e){
    e.preventDefault();
  
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const gender = document.getElementById('gender').value;
  const email = document.getElementById('email').value.trim();
  const studentId = document.getElementById('studentId').value.trim();
  const classList = document.getElementById('classList').value;


   if (!firstName || !lastName || !gender || !email || !studentId || !classList) {
    alert("Please fill in all fields.");
    return;
      }


    
  alert("Registration submitted successfully!");

  document.getElementById("registrationForm").reset();

   
})