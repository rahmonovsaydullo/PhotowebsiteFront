const user = JSON.parse(localStorage.getItem("user"));

if (user) {
  window.location.href = "./pages/myPhotos.html";
}

function loginUser() {
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  axios
    .post(`http://localhost:4000/login`, {
      user_name: username.value,
      password: password.value,
    })
    .then((res) => {

      console.log(res.data);
      const {user, token} = res.data
      window.location.href = `./pages/myPhotos.html`;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
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
