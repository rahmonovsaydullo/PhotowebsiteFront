function signUp() {
  const firstname = document.getElementById("firstname");
  const lastname = document.getElementById("lastname");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const warning = document.getElementById("warning");

  // ✅ Validate inputs before making a request
  if (!firstname.value || !lastname.value || !username.value || !password.value.trim()) {
    alert("All fields are required!");
    return;
  }

  const passwordValue = password.value.trim();
  if (passwordValue.length < 6) {
    alert("Password must be at least 6 characters long!");
    return;
  }

  // ✅ Send signup request
  axios
    .post("https://photowebsite-9elu.onrender.com/signup", { 
      first_name: firstname.value.trim(),
      last_name: lastname.value.trim(),
      user_name: username.value.trim(),
      password: passwordValue,
    })
    .then((res) => {
      console.log(res);
      if (res.status === 201) { 
        window.location.href = "../index.html";
      }
    })
    .catch((err) => {
      console.log("Error details:", err);
      const errorMessage = err.response?.data?.message || "An error occurred. Please try again!";
      warning.textContent = errorMessage;
      warning.style.display = "block";
    });
}

// ✅ Attach event listener
document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  signUp();
});
