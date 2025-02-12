// imports
import "./pages/index.css";
import { createCard, deleteCard, handleLikeButton } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getUserData,
  getInitialCards,
  editProfileInfo,
  addNewCard,
  updateProfilePicture,
} from "./components/api.js";

const placesList = document.querySelector(".places__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profilePicture = document.querySelector(".profile__image");

const closeButtons = document.querySelectorAll(".popup__close");

const profileEditPopup = document.querySelector(".popup_type_edit");
const cardAddPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const editProfilePicturePopup = document.querySelector(
  ".popup_type_edit-profile-picture"
);

const profileEditPopupClose = document.querySelector(
  ".popup_type_edit .popup__close"
);
const cardAddPopupClose = document.querySelector(
  ".popup_type_new-card .popup__close"
);
const imagePopupClose = document.querySelector(
  ".popup_type_image .popup__close"
);

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const nameInput = profileEditPopup.querySelector(".popup__input_type_name");
const jobInput = profileEditPopup.querySelector(
  ".popup__input_type_description"
);

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileForm = document.querySelector(".popup_type_edit .popup__form");
const cardForm = document.querySelector(".popup_type_new-card .popup__form");
const profilePictureForm = document.querySelector(
  ".popup_type_edit-profile-picture .popup__form"
);

const placeName = document.querySelector(".popup__input_type_card-name");
const placePictureUrl = document.querySelector(".popup__input_type_url");

const profilePictureUrl = document.querySelector(
  ".popup__input_type_profile-url"
);

const imagePopupZoomed = imagePopup.querySelector(".popup__image");
const popupDescription = imagePopup.querySelector(".popup__caption");

// открытие попапа с картинкой
function handleCardClick(cardData) {
  openPopup(imagePopup);
  imagePopupZoomed.src = cardData.link;
  imagePopupZoomed.alt = cardData.name;
  popupDescription.textContent = cardData.name;
}

// слушатели для открытия попапов редктирования профиля и добавления карточки
profileEditButton.addEventListener("click", () => {
  setPopupProfileInformation();
  clearValidation(profileForm, validationConfig);
  openPopup(profileEditPopup);
});

profileAddButton.addEventListener("click", () => {
  openPopup(cardAddPopup);
  clearValidation(cardForm, validationConfig);
});

profilePicture.addEventListener("click", () => {
  openPopup(editProfilePicturePopup);
  clearValidation(profilePictureForm, validationConfig);
});

// добавление карточки после отправки формы
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  updateSavingStatus(cardForm, true);

  const cardTitle = placeName.value;
  const cardImageUrl = placePictureUrl.value;

  addNewCard(cardTitle, cardImageUrl)
    .then((res) => {
      const cardElement = createCard(
        res,
        profileID,
        deleteCard,
        handleLikeButton,
        handleCardClick
      );
      placesList.prepend(cardElement);
      closePopup(cardAddPopup);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      cardForm.reset();
      updateSavingStatus(cardForm, false);
    });
}

cardForm.addEventListener("submit", handleCardFormSubmit);

// обновление информации в профиле отправка формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  updateSavingStatus(profileForm, true);

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  editProfileInfo(profileTitle.textContent, profileDescription.textContent)
    .then((userInfo) => {
      profileTitle.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      closePopup(profileEditPopup);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      updateSavingStatus(profileForm, false);
    });
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

// обновление фотографии профиля
function handleProfilePictureSubmit(evt) {
  evt.preventDefault();
  updateSavingStatus(profilePictureForm, true);

  const link = profilePictureUrl.value;
  updateProfilePicture(link)
    .then((res) => {
      profilePicture.style.backgroundImage = `url(${res.avatar})`;
      profilePictureForm.reset();
      closePopup(editProfilePicturePopup);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      updateSavingStatus(profilePictureForm, false);
    });
}

function updateSavingStatus(formElement, isSaving) {
  const buttonElement = formElement.querySelector(".popup__button");
  if (isSaving) {
    buttonElement.textContent = "Сохранение...";
    buttonElement.disabled = true;
  } else {
    buttonElement.textContent = "Сохранить";
    buttonElement.disabled = false;
  }
}

profilePictureForm.addEventListener("submit", handleProfilePictureSubmit);

// закрытие попапов по крестику
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

// автоматическое заполнение полей профиля при открытии попапа
function setPopupProfileInformation() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// информация с сервера
let profileID;

Promise.all([getUserData(), getInitialCards()])
  .then(([userData, initialCards]) => {
    profileID = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profilePicture.style.backgroundImage = `url(${userData.avatar})`;

    initialCards.forEach((item) => {
      const cardElement = createCard(
        item,
        profileID,
        deleteCard,
        handleLikeButton,
        handleCardClick
      );
      placesList.append(cardElement);

      const cardLikesCounter = cardElement.querySelector(".card__like-counter");
      cardLikesCounter.textContent = item.likes.length;

      const isLikedByMe = item.likes.some((like) => userData._id === like._id);

      if (isLikedByMe) {
        const likeButton = cardElement.querySelector(".card__like-button");
        likeButton.classList.add("card__like-button_is-active");
      }
    });
  })
  .catch((err) => {
    console.error(`Ошибка: ${err}`);
  });

// валидация форм в попапах
enableValidation(validationConfig);
