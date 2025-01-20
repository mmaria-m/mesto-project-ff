// imports
import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, cardDelete, handleLikeButton } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

const placesList = document.querySelector(".places__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const profileEditPopup = document.querySelector(".popup_type_edit");
const cardAddPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

const profileEditPopupClose = document.querySelector(
  ".popup_type_edit .popup__close"
);
const cardAddPopupClose = document.querySelector(
  ".popup_type_new-card .popup__close"
);
const imagePopupClose = document.querySelector(
  ".popup_type_image .popup__close"
);

const nameInput = profileEditPopup.querySelector(".popup__input_type_name");
const jobInput = profileEditPopup.querySelector(
  ".popup__input_type_description"
);

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileForm = document.querySelector(".popup_type_edit .popup__form");
const cardForm = document.querySelector(".popup_type_new-card .popup__form");

const placeName = document.querySelector(".popup__input_type_card-name");
const placePictureUrl = document.querySelector(".popup__input_type_url");

// открытие попапа с картинкой
function handleCardClick(cardData) {
  openPopup(imagePopup);
  const imagePopupZoomed = imagePopup.querySelector(".popup__image");
  const popupDescription = imagePopup.querySelector(".popup__caption");
  imagePopupZoomed.src = cardData.link;
  popupDescription.textContent = cardData.name;
}

// слушатели для открытия попапов редктирования профиля и добавления карточки
profileEditButton.addEventListener("click", () => {
  setPopupProfileInformation();
  openPopup(profileEditPopup);
});

profileAddButton.addEventListener("click", () => openPopup(cardAddPopup));

// добавление карточки после отправки формы
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardTitle = placeName.value;
  const cardImageUrl = placePictureUrl.value;
  const cardElement = createCard(
    { name: cardTitle, link: cardImageUrl },
    cardDelete
  );
  placesList.prepend(cardElement);
  cardForm.reset();
  closePopup(cardAddPopup);
}

cardForm.addEventListener("submit", handleCardFormSubmit);

// обновление информации в профиле отправка формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profileEditPopup);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

// слушатели для кнопок закрытия попапов
profileEditPopupClose.addEventListener("click", () =>
  closePopup(profileEditPopup)
);
cardAddPopupClose.addEventListener("click", () => closePopup(cardAddPopup));
imagePopupClose.addEventListener("click", () => closePopup(imagePopup));

// автоматическое заполнение полей профиля при открытии попапа
function setPopupProfileInformation() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// отображение изначальных карточек
initialCards.forEach(function (item) {
  const cardElement = createCard(
    item,
    cardDelete,
    handleLikeButton,
    handleCardClick
  );
  placesList.append(cardElement);
});
