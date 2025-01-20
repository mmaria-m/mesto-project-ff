// открытие модального окна
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
  document.addEventListener("click", closePopupByOverlayClick);
}

// закрытие модального окна
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
  document.removeEventListener("click", closePopupByOverlayClick);
}

// закрытие модального окна по esc
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}

// закрытие модального окна по клику по оверлею
function closePopupByOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}
