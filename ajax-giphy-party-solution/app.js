"use strict";

const GIPHY_API_KEY = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";
const GIPHY_BASE_URL = "http://api.giphy.com/v1";

const $gifArea = $("#gif-area");
const $searchInput = $("#search");

/** Get a random index from `arr`. */

function getRandomIndex(arr) {
  console.log("getRandomIndex", arr);

  return Math.floor(Math.random() * arr.length);
}

/** Add random image from `imageUrls` to DOM. */

function addRandomImage(imageUrls) {
  console.log("addRandomImage", imageUrls);

  if (imageUrls.length > 0) {
    const randomIdx = getRandomIndex(imageUrls);
    const $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
    const $newGif = $("<img>", {
      src: imageUrls[randomIdx],
      class: "w-100",
    });

    $newCol.append($newGif);
    $gifArea.append($newCol);
  }
}

/** Get images for `searchTerm` from API. Returns list of image URLs. */

async function getImagesFromGiphy(searchTerm) {
  console.log("getImagesFromGiphy", searchTerm);

  const giphySearchParams = new URLSearchParams(
    {
      q: searchTerm,
      api_key: GIPHY_API_KEY,
    }
  );

  const response = await fetch(
    `${GIPHY_BASE_URL}/gifs/search?${giphySearchParams}`
  );
  console.debug("getImagesFromGiphy response=", response);
  const gifData = await response.json();

  return gifData.data.map(image => image.images.original.url);
}

/** Remove all gifs. */

function removeAllGifs() {
  console.log("removeAllGifs");

  $gifArea.empty();
}

$("#remove").on("click", removeAllGifs);

/** On form submit, get imageUrls and add to list. */

async function handleSubmit(evt) {
  console.log("handleSubmit");
  evt.preventDefault();

  const imageUrls = await getImagesFromGiphy($searchInput.val());
  $searchInput.val("");
  addRandomImage(imageUrls);
}

$("#gif-form").on("submit", handleSubmit);
