const startInput = document.getElementById("startDate");
const endInput = document.getElementById("endDate");
const button = document.querySelector("button");
const gallery = document.querySelector("#gallery");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDate = document.getElementById("modalDate");
const modalExplanation = document.getElementById("modalExplanation");

button.addEventListener("click", async () => {
  const startDate = document.querySelector("#startDate").value;
  const endDate = document.querySelector("#endDate").value;

  gallery.innerHTML = "<p>🔄 Loading space photos...</p>";

  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=DEMO_KEY`
    );

    const data = await response.json();

    displayGallery(data);
  } catch (error) {
    gallery.innerHTML = "<p>Error loading images.</p>";
    console.error(error);
  }
});