// Elements
const startInput = document.getElementById("startDate");
const endInput = document.getElementById("endDate");
const button = document.getElementById("getImagesBtn");
const gallery = document.getElementById("gallery");

const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDate = document.getElementById("modalDate");
const modalExplanation = document.getElementById("modalExplanation");
const closeModal = document.getElementById("closeModal");

// Set default date range (today and 8 days before = 9 days)
const today = new Date();
const nineDaysAgo = new Date();
nineDaysAgo.setDate(today.getDate() - 8);

startInput.value = nineDaysAgo.toISOString().split("T")[0];
endInput.value = today.toISOString().split("T")[0];

// Prevent future dates
const maxDate = today.toISOString().split("T")[0];
startInput.max = maxDate;
endInput.max = maxDate;

// Random Space Fact
const facts = [
  "One million Earths could fit inside the Sun.",
  "A day on Venus is longer than a year on Venus.",
  "Jupiter has over 90 known moons.",
  "Saturn could float in water.",
  "Neutron stars are incredibly dense.",
  "Olympus Mons is the tallest volcano in the Solar System.",
  "The footprints left on the Moon may last millions of years."
];

const factSection = document.getElementById("spaceFact");

if (factSection) {
  const randomFact =
    facts[Math.floor(Math.random() * facts.length)];

  factSection.textContent = `Did You Know? ${randomFact}`;
}

// Button click
button.addEventListener("click", getSpaceImages);

async function getSpaceImages() {
  const startDate = startInput.value;
  const endDate = endInput.value;

  gallery.innerHTML = `
    <div class="loading">
      🔄 Loading space photos...
    </div>
  `;

  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=DEMO_KEY`
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
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

function displayGallery(items) {
  gallery.innerHTML = "";

  items.reverse();

  items.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("gallery-card");

    if (item.media_type === "video") {
      card.innerHTML = `
        <div class="video-card">
          <h3>${item.title}</h3>
          <p>${item.date}</p>
          <a href="${item.url}" target="_blank">
            Watch NASA Video
          </a>
        </div>
      `;
    } else {
      card.innerHTML = `
        <img src="${item.hdurl || item.url}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>${item.date}</p>
      `;

      card.addEventListener("click", () => {
        openModal(item);
      });
    }

    gallery.appendChild(card);
  });
}

function openModal(item) {
  modalImage.src = item.hdurl || item.url;
  modalImage.alt = item.title;

  modalTitle.textContent = item.title;
  modalDate.textContent = item.date;
  modalExplanation.textContent = item.explanation;

  modal.classList.add("show");
}

closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});

window.addEventListener("click", event => {
  if (event.target === modal) {
    modal.classList.remove("show");
  }
});