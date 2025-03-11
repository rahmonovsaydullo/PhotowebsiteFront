const userId = JSON.parse(localStorage.getItem("user")).id;

if (userId) {
  function addPhoto() {
    const imageUrl = document.getElementById("imageUrl");
    axios
      .post(`http://localhost:4000/photos`,
        {
          url: imageUrl.value,
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
      .then((res) => {
        console.log(res.data);

        const msg = document.getElementById("msg");
        msg.style.display = "block";
        msg.style.color = "green";
        document.getElementById("msg").textContent = `${res.data.message}`;
        setTimeout(() => {
          msg.style.display = "none";
          window.location.href = "../pages/myPhotos.html";
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault()
    addPhoto();
  });
} else {
  window.location.href = "../index.html";
}


document.getElementById('logout-btn').addEventListener('click', () => {
  window.location.href = "../index.html";
})