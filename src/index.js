import './pages/index.css';

// импорты переменных и классов

import {
  initialCards, object, editProfileModal, addCardModal,
  openProfileModalButton, openCardModalButton, editProfileForm,
  addCardForm, placeInput, urlInput, addButton,
  listCards, openImageModal, dataInfo, inputName, inputProfession
} from './utils/constants.js';

import FormValidator from './components/FormValidator';
import Card from './components/Card.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

// обработчики открытия двух модалок

openProfileModalButton.addEventListener('click', () => {
  if (!editProfileModal.classList.contains('modal_opened')) {
    const userData = userInfo.getUserInfo();
    inputName.value = userData.userName;
    inputProfession.value = userData.userProfession;
  }

  profileForm.open();
});

openCardModalButton.addEventListener('click', () => {
  placeInput.value = "";
  urlInput.value = "";
  cardForm.open();
  addButton.classList.add('form__save-button_disabled');
  addButton.classList.remove('form__save-button_undisabled');
  addButton.setAttribute('disabled', true);
});

// инстансы FormValidator

const instanceProfileForm = new FormValidator(object, editProfileForm);
const instanceCardForm = new FormValidator(object, addCardForm);

instanceProfileForm.enableValidation();
instanceCardForm.enableValidation();

// создание картчек из массива initialCards

const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    renderCard(item);
  }
},
  listCards
);

cardList.renderItems();

// созданиe новых карточек

function renderCard(dataItem) {
  const card = new Card({
    data: dataItem,
    handleCardClick: () => {

      imageModal.open(card);
    }
  }, '.template-card');

  cardList.addItem(card.getView());
}

// инстансы PopupWithImage

const imageModal = new PopupWithImage(openImageModal);
imageModal.setEventListeners();

// инстансы PopupWithForm

const profileForm = new PopupWithForm(editProfileModal, {
  formSubmit: (evt) => {
    userInfo.setUserInfo(inputName.value, inputProfession.value);
    evt.preventDefault();
    profileForm.close();
  }
});

const cardForm = new PopupWithForm(addCardModal, {
  formSubmit: (evt) => {
    renderCard({ name: placeInput.value, link: urlInput.value });
    evt.preventDefault();
    cardForm.close();
  }
});

profileForm.setEventListeners();
cardForm.setEventListeners();

// инстанс UserInfo

const userInfo = new UserInfo(dataInfo);

// старый код
// функции обоих модалок

// function openModal(modalWindow) {
//   modalWindow.classList.add('modal_opened');
//   document.addEventListener('keydown', EscKey);
// }

// function closeModal(modalWindow) {
//   modalWindow.classList.remove('modal_opened');
//   document.removeEventListener('keydown', EscKey);
// }

// function editProfileSubmitHandler(evt) {
//   profileTitle.textContent = inputName.value;
//   profileSubtitle.textContent = inputProfession.value;
//   evt.preventDefault();
//   closeModal(editProfileModal);
// }

// function addCardSubmitHandler(evt) {
//   renderCard();
//   evt.preventDefault();
//   closeModal(addCardModal);
// }

// обработчики двух модалок

// editProfileForm.addEventListener('submit', editProfileSubmitHandler);
// addCardForm.addEventListener('submit', addCardSubmitHandler);

// editProfileCloseModalButton.addEventListener('click', () => {
//   closeModal(editProfileModal);
// });

// addCardCloseModalButton.addEventListener('click', () => {
//   closeModal(addCardModal);
// });

// закрытие попапов по нажатию Esc

// function EscKey(evt) {
//   if (evt.key !== 'Escape') {
//     return;
//   }

//   const modalWindows = document.querySelector('.modal_opened');
//   closeModal(modalWindows);
// };

// закрытие кликом на оверлей

// arrayModal.forEach((modal) => {
//   modal.addEventListener('click', (evt) => {
//     if (evt.target.classList.contains('modal_opened')) {
//       evt.target.classList.remove('modal_opened');
//     }
//   });
// });