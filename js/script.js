const API_KEY = "Jjh7HpHdhFcjtDKrdJLhwWPTcnCdCdcJwwWHk6hR";

const startInput = document.getElementById("startDate");
const endInput = document.getElementById("endDate");
const button = document.querySelector("button");
const gallery = document.getElementById("gallery");

// Modal
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDate = document.getElementById("modalDate");
const modalExplanation = document.getElementById("modalExplanation");
const closeBtn = document.querySelector(".close-btn");

// Get Images Button
button.addEventListener("click", getSpaceImages);

async function getSpaceImages() {
  const startDate = startInput.value;
  const endDate = endInput.value;

  gallery.innerHTML = `
    <div class="placeholder">
      <p>🔄 Loading space photos...</p>
    </div>
  `;

  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`NASA API Error: ${response.status}`);
    }

    const data = await response.json();

    displayGallery(data);

  } catch (error) {
    console.error(error);

    gallery.innerHTML = `
      <div class="placeholder">
        <p>Error loading images.</p>
      </div>
    `;
  }
}

function displayGallery(images) {
  gallery.innerHTML = "";

  images.reverse();

  images.forEach(image => {

    const card = document.createElement("div");
    card.classList.add("gallery-card");

    // Handle videos
    if (image.media_type === "video") {

      card.innerHTML = `
        <div class="video-card">
          <h3>${image.title}</h3>
          <p>${formatDate(image.date)}</p>
          <a href="${image.url}" target="_blank">
            Watch NASA Video
          </a>
        </div>
      `;

    } else {

      card.innerHTML = `
        <img
          src="${image.hdurl || image.url}"
          alt="${image.title}"
        >
        <h3>${image.title}</h3>
        <p>${formatDate(image.date)}</p>
      `;

      card.addEventListener("click", () => {
        openModal(image);
      });
    }

    gallery.appendChild(card);
  });
}

function openModal(image) {
  modalImage.src = image.hdurl || image.url;
  modalImage.alt = image.title;

  modalTitle.textContent = image.title;
  modalDate.textContent = formatDate(image.date);
  modalExplanation.textContent = image.explanation;

  modal.classList.add("show");
}

closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("show");
  }
});

function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return new Date(dateString).toLocaleDateString(
    "en-US",
    options
  );
}
