const userId = JSON.parse(localStorage.getItem("user")).id;

const gallery = document.querySelector("#gallery");
axios
  .get(`http://localhost:4000/photos?userId=${userId}`)
  .then((response) => {
    const photos = response.data;
    console.log(photos);
    photos.forEach((photo) => {
      gallery.innerHTML += `
        <div class="gallery-item">
          <img src="${photo.url}" alt="Tabiat rasmi">
          <div class="caption">${photo.fullname}</div>
          <p id="like-${photo.id}" onclick="toggleLike(${photo.id}, ${photo.likecount})" 
             class="heart-icon">
            ${photo.isliked ? "❤️" : "🤍"} 
            <span id="like-count-${photo.id}">${photo.likecount}</span>
          </p>
        </div>`;
    });
  })
  .catch((error) => console.log(error));

function toggleLike(photoId, currentLikes) {
  axios
    .post("http://localhost:4000/like", {
      photoId,
      userId,
    })
    .then((response) => {
      const likeElement = document.getElementById(`like-${photoId}`);

      if (response.data.liked) {
        likeElement.innerHTML = `❤️ <span id="like-count-${photoId}">${currentLikes + 1}</span>`;
      } else {
        likeElement.innerHTML = `🤍 <span id="like-count-${photoId}">${currentLikes - 1}</span>`;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

document.getElementById('logout-btn').addEventListener('click', () => {
  window.location.href = "../index.html";

})
