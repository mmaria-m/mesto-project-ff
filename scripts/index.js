const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData, cardDelite) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deliteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement.querySelector(".card__image").src = cardData.link;

  deliteButton.addEventListener("click", function () {
    cardDelite(cardElement);
  });

  return cardElement;
}

function cardDelite(cardElement) {
  cardElement.remove();
}

initialCards.forEach(function (item) {
  const cardElement = createCard(item, cardDelite);
  placesList.append(cardElement);
});
