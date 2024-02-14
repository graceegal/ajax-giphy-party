"use strict";

console.log("Let's get this party started!");

/**  populateGiphy:
 *
 * searches giphy API for keyword from search input field and
 * populates a gif on the page
 */
async function populateGiphy(evt) {
  evt.preventDefault();

  const searchTerm = $("#search-input").val();
  console.log("searchTerm=", searchTerm);

  const params = new URLSearchParams({
    q: searchTerm,
    api_key: "MiTgPL3hZnfub118MSIbA77M5csCZijP"
  });

  const response = await fetch(`http://api.giphy.com/v1/gifs/search?${params}`);

  const gifData = await response.json();

  const gifUrl = gifData.data[0].images.original.url;

  $("<img>").attr("src", gifUrl).appendTo("#returned-gifs");
  //$("#returned-gifs").append("<img>", { src: `${gifUrl}` });

}

$("#submit-btn").on("click", populateGiphy);


/** removeGifs:
 *
 * invoked when remove button is clicked
 * removes all gifs from the page */
function removeGifs() {
  $("#returned-gifs").empty();
}

$("#remove-btn").on("click", removeGifs)