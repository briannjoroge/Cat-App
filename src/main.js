const imageContainer = document.querySelector(".img-container");
const catsImageSearchNumber = document.getElementById("cats-img");
const catsImageSearchNumberBtn = document.querySelector(".cat-img-btn");
const displayError = document.querySelector(".display-error");
const catFactList = document.querySelector(".cat-fact-list");
const catFactSearchNumber = document.getElementById("cats-fact");
const catFactSearchNumberBtn = document.querySelector(".cat-fact-btn");

//Fact search Button event
catFactSearchNumberBtn.addEventListener("click", async () => {
  const catFactSearchvalue = catFactSearchNumber.value;

  if (catFactSearchvalue >= 1 && catFactSearchvalue <= 50) {
    displayError.style.display = "none";

    catFactSearchNumberBtn.textContent = "Loading....";
    catFactSearchNumberBtn.setAttribute("disabled", true);

    try {
      const feedback = await fetch(
        `https://meowfacts.herokuapp.com/?count=${catFactSearchvalue}`,
      );
      const info = await feedback.json();

      info.data.forEach((catFacts) => {
        const li = document.createElement("li");
        li.textContent = catFacts;
        catFactList.appendChild(li);
      });
    } catch (error) {
      displayError.style.display = "flex";
      displayError.textContent =
        "Something went wrong! Please try again later.";
    } finally {
      catFactSearchNumberBtn.removeAttribute("disabled", false);
      catFactSearchNumberBtn.textContent = "Search";
    }
  } else {
    displayError.style.display = "flex";
    displayError.textContent = "Error. Enter a number between 1 - 50.";
  }
  console.log(catFactSearchvalue);
});

catFactSearchNumber.addEventListener("click", () => {
  catFactList.textContent = "";
  displayError.style.display = "none";
});

// Image search Button event
catsImageSearchNumberBtn.addEventListener("click", async () => {
  const catsImgSearchValue = catsImageSearchNumber.value;

  if (catsImgSearchValue >= 1 && catsImgSearchValue <= 10) {
    displayError.style.display = "none";

    catsImageSearchNumberBtn.textContent = "Loading....";
    catsImageSearchNumberBtn.setAttribute("disabled", true);

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
    } finally {
      catsImageSearchNumberBtn.removeAttribute("disabled", false);
      catsImageSearchNumberBtn.textContent = "Search";
    }
  } else {
    displayError.style.display = "flex";
    displayError.textContent = "Error. Enter a number between 1 - 10.";
  }
  console.log(catsImgSearchValue);
});

catsImageSearchNumber.addEventListener("click", () => {
  imageContainer.innerHTML = "";
  displayError.style.display = "none";
});
