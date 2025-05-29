const imageContainer = document.querySelector(".img-container");
const catsImageSearchNumber = document.getElementById("cats-img");
const catsImageSearchNumberBtn = document.querySelector(".cat-img-btn");
const displayError = document.querySelector(".display-error");

catsImageSearchNumberBtn.addEventListener("click", async () => {
  const catsImgSearchValue = catsImageSearchNumber.value;
  if (catsImgSearchValue >= 1 && catsImgSearchValue <= 10) {
    displayError.style.display = "none";

    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=${catsImgSearchValue}`,
      );
      const data = await response.json();

      data.forEach((cat) => {
        const img = document.createElement("img");
        img.src = cat.url;
        img.alt = "Random cat Picture";
        imageContainer.appendChild(img);
      });
    } catch (error) {
      displayError.style.display = "flex";
      displayError.textContent =
        "Something went wrong! Please try again later.";
    }
  } else {
    displayError.style.display = "flex";
    displayError.textContent = "Error. Enter a number between 1 - 10.";
  }
  console.log(catsImgSearchValue);
});

catsImageSearchNumber.addEventListener("click", () => {
  imageContainer.innerHTML = "";
});
