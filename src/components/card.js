// создание карточки
export function createCard(cardData, cardDelete, handleLikeButton, handleCardClick) {
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
    
        likeButton.addEventListener("click", () => handleLikeButton(likeButton));
        cardImage.addEventListener("click", () => handleCardClick(cardData));
        deleteButton.addEventListener("click", () => cardDelete(cardElement));
    
        return cardElement;
    }

// удаление карточки
export function cardDelete(cardElement) {
        cardElement.remove();
  }
  
// лайк карточки
export function handleLikeButton(likeButton) {
        likeButton.classList.toggle("card__like-button_is-active");
  }
  