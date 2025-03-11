function signUp() {
  const firstname = document.getElementById("firstname");
  const lastname = document.getElementById("lastname");
  const username = document.getElementById("username");
  const password = document.getElementById("password");

  axios
    .post("https://photowebsite-9elu.onrender.com/signup", { 
      first_name: firstname.value,
      last_name: lastname.value,
      user_name: username.value,
      password: password.value,
    })
    .then((res) => {
      console.log(res);
      if (res.status === 201) { 
        window.location.href = "../index.html";
      }
    })
    .catch((err) => {
      const warning = document.getElementById("warning");
      console.log("Error details:", err); 
      const errorMessage = err.response?.data?.message || "Server unreachable. Please try again later!";
      warning.textContent = errorMessage;
      warning.style.display = "block";
    });
    
}

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  signUp();
});
