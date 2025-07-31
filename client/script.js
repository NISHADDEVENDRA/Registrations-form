const api = "http://localhost:5000/api/auth";

document.getElementById("registrationForm").addEventListener("submit", async function register(e) {
  e.preventDefault();
  
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const gender = document.getElementById("gender").value;
  const email = document.getElementById("email").value;
  const Age = document.getElementById("Age").value;
  const classList = document.getElementById("classList").value;
  const skills = document.getElementById("skills").value;
  const password = document.getElementById("password").value;
   
  if(!firstName || !lastName || !gender || !email || !Age || !classList || !skills || !password){
    document.getElementById("message").style.color = "red";
    document.getElementById("message").innerText = "Please fill all the fields";
    return;
  }

  const res = await fetch(`${api}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, gender, email, Age, classList, skills, password })
  });

  const data = await res.json();
  document.getElementById("message").innerText = data.message;

  if (res.ok) {
    document.getElementById("otpSection").style.display = "block";
  }

   document.getElementById("registrationForm").reset();

})

async function verifyOTP() {
  const email = document.getElementById("email").value;
  const otp = document.getElementById("otp").value;

  const res = await fetch(`${api}/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp })
  });

  const data = await res.json();
  document.getElementById("message").innerText = data.message;
}

