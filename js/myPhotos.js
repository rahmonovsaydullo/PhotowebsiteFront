const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  redirectToLogin();
}

document.querySelector(
  "h1"
).innerText = `Welcome, ${user.first_name} ${user.last_name}`;

document
  .querySelector("#logout-btn")
  .addEventListener("click", redirectToLogin);

function redirectToLogin() {
  localStorage.removeItem("user");
  window.location.href = "../index.html";
}

const gallery = document.querySelector("#gallery");
axios
  .get(`http://localhost:4000/photos/${user.id}`, {
    headers:{
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
  .then((response) => {
    const photos = response.data;
    console.log(photos);
    photos.map((photo) => {
      
      gallery.innerHTML += `
			<div class="gallery-item" id="${photo.id}">
				<img
					src="${photo.url}"
					alt="Tabiat rasmi">
				<div class="caption">Tabiat manzarasi</div>
				<div class="delBtn">
					<button id="btn" class="btn" onclick='deleteCard(${photo.id})'>Delete</button>
				</div>
			</div>`;
    });
  })
  .catch((error) => console.log(error));

const deleteCard = (id) => {
  axios
    .delete(`http://localhost:4000/photos/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    .then((response) => {
      const res = response.data;
			document.getElementById(id).remove();
    })
    .catch((err) => {
      console.log(err);
    });
};



function deleteBox() {
	document.getElementById('test').remove();
}