"use strict";

console.log("Let's get this party started!");

/**  */
async function populateGiphy(evt) {
  evt.preventDefault();

  const searchTerm = $("#search-input").val();
  console.log("searchTerm=", searchTerm);

  const params = new URLSearchParams({
    q: searchTerm,
    api_key: "MiTgPL3hZnfub118MSIbA77M5csCZijP"});

  const response = await fetch(`http://api.giphy.com/v1/gifs/search?${params}`);

  const data = await response.json();

  console.log("giphy resp=", response, "data=", data);

}

//TODO: check to see if "submit" event listener works
$("#submit-btn").on("click", populateGiphy);