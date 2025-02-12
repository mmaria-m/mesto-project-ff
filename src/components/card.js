import { deleteCardApi, putLikeApi, removeLikeApi } from "./api.js";

// создание карточки
export function createCard(
  cardData,
  profileID,
  deleteCard,
  handleLikeButton,
  handleCardClick
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  likeButton.addEventListener("click", () =>
    handleLikeButton(likeButton, cardData._id)
  );
  cardImage.addEventListener("click", () => handleCardClick(cardData));

  if (cardData.owner._id === profileID) {
    deleteButton.addEventListener("click", () =>
      deleteCard(cardElement, cardData._id)
    );
  } else {
    deleteButton.classList.add("card__delete-button_hidden");
  }

  return cardElement;
}

// удаление карточки
export function deleteCard(cardElement, cardID) {
  deleteCardApi(cardID)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

// лайк карточки
export function handleLikeButton(likeButton, cardId) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  if (isLiked) {
    removeLikeApi(cardId)
      .then((card) => {
        likeButton.classList.remove("card__like-button_is-active");
        updateLikesCounter(likeButton, card.likes.length);
      })
      .catch((err) => {
        console.log(`Ошибка при удалении лайка: ${err}`);
      });
  } else {
    putLikeApi(cardId)
      .then((card) => {
        likeButton.classList.add("card__like-button_is-active");
        updateLikesCounter(likeButton, card.likes.length);
      })
      .catch((err) => {
        console.log(`Ошибка при добавлении лайка: ${err}`);
      });
  }
}

// обновляет счетчик лайков
function updateLikesCounter(likeButton, likesCount) {
  const cardElement = likeButton.closest(".places__item");
  const likeCounter = cardElement.querySelector(".card__like-counter");
  likeCounter.textContent = likesCount;
}
