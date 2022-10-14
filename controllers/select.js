// listen .perso-select__card to select a character
addEventListener("click", function (event) {
  // get the element that was clicked on
  let elementClicked = event.target;
  // if element clicked is a card add class selected and remove class selected from other cards
  if (elementClicked.classList.contains("perso-select__card")) {
    let cards = document.querySelectorAll(".perso-select__card");
    cards.forEach(function (card) {
      card.classList.remove("perso-select__card--selected");
    });
    elementClicked.classList.add("perso-select__card--selected");
  }
});

// on click on .btn add data to local storage
// and redirect to game.html
document.querySelector(".btn").addEventListener("click", function () {
  let selectedCard = document.querySelector(".perso-select__card--selected");
  // if no card is selected
  if (selectedCard === null) {
    alert("Please select a character");
  }
  // if a card is selected
  else {
    // get id of the selected card and name in input #persoName
    let persoId = selectedCard.getAttribute("id");
    let persoName = document.querySelector("#persoName").value;
    // if no name is entered
    if (persoName === "") {
      alert("Please enter a name");
    } else {
      // add data to local storage
      localStorage.setItem("persoId", persoId);
      localStorage.setItem("persoName", persoName);
      // redirect to game.html
      window.location.href = "game.html";
      // log local storage
      console.log(localStorage);
    }
  }
});