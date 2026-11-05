const startInput = document.getElementById("startDate");
const endInput = document.getElementById("endDate");
const button = document.getElementById("getImages");
const gallery = document.getElementById("gallery");

setupDateInputs(startInput, endInput);

button.addEventListener("click", getSpaceImages);

async function getSpaceImages() {
  const startDate = startInput.value;
  const endDate = endInput.value;

  gallery.innerHTML = "<p>🔄 Loading space photos...</p>";

  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=DEMO_KEY`
    );

    const data = await response.json();

    displayGallery(data);
  } catch (error) {
    gallery.innerHTML = "<p>Failed to load images.</p>";
    console.error(error);
  }
}

function displayGallery(images) {
  gallery.innerHTML = "";

  images.forEach(image => {
    const card = document.createElement("div");
    card.classList.add("gallery-card");

    card.innerHTML = `
      <img src="${image.hdurl || image.url}" alt="${image.title}">
      <h3>${image.title}</h3>
      <p>${image.date}</p>
    `;

    gallery.appendChild(card);
  });
}