const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-31",
  headers: {
    authorization: "2b2abaeb-4aaf-4b28-9348-bda1029b19a5",
    "Content-Type": "application/json",
  },
};

const handleRespone = function (res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleRespone);
};

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleRespone);
};

const editProfileInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(handleRespone);
};

const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(handleRespone);
};

const deleteCardApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleRespone);
};

const putLikeApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleRespone);
};

const removeLikeApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleRespone);
};

const updateProfilePicture = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then(handleRespone);
};

export {
  getUserData,
  getInitialCards,
  editProfileInfo,
  addNewCard,
  deleteCardApi,
  putLikeApi,
  removeLikeApi,
  updateProfilePicture,
};
