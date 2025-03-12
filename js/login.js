const user = JSON.parse(localStorage.getItem("user"));

if (user) {
  window.location.href = "./pages/myPhotos.html";
}

function loginUser() {
  const username = document.getElementById("username");
  const password = document.getElementById("password");

  axios
    .post(`http://localhost:4000/login`, { // ✅ Updated URL
      user_name: username.value,
      password: password.value.trim(),
    })
    .then((res) => {
      console.log(res.data);
      const { user, token } = res.data;
      
      // Store user and token
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      // Redirect to photos page
      window.location.href = `../pages/myPhotos.html`;
    })
    .catch((err) => {
      document.querySelector(".err").style.display = "block";
      console.log(err);
    });
}

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  loginUser();
});
