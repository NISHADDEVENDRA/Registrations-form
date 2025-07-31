

document.getElementById("registrationForm").addEventListener("submit", async function register(e) {
  e.preventDefault();

  //////////
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const gender = document.getElementById("gender").value;
  const email = document.getElementById("email").value;
  const Age = document.getElementById("Age").value;
  const education = document.getElementById("education").value;
  const skills = document.getElementById("skills").value;
  const password = document.getElementById("password").value;
   
  if(!firstName || !lastName || !gender || !email || !Age || !education || !skills || !password){/////
    document.getElementById("message").style.color = "red";
    document.getElementById("message").innerText = "Please fill all the fields";
    return;
  }

  const res = await fetch(`http://localhost:3000/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, gender, email, Age, education, skills, password })//////
  });

  const data = await res.json();
  document.getElementById("message").innerText = data.message;

  if (res.ok) {
    document.getElementById("otpSection").style.display = "block";
  }


})

 document.getElementById("otpSection").addEventListener("submit", async function verifyOtp(e) {
  e.preventDefault();
  
  const email = document.getElementById("email").value;
  const otp = document.getElementById("otp").value;

  if(!email || !otp){
    document.getElementById("message").style.color = "red";
    document.getElementById("message").innerText = "Please fill all the fields";
    return;
  }

  const res = await fetch(`http://localhost:3000/api/auth/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp })
  });

  const data = await res.json();
  document.getElementById("message").innerText = data.message;

  if (res.ok) {
    document.getElementById("otpSection").style.display = "none";
    document.getElementById("registrationForm").reset();
  } 
})