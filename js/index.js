//burger
let burger = document.querySelector(".header__btn-burger");
let header = document.querySelector(".header");
let menuBurgerLink = document.querySelectorAll(".header__item-top");

burger.addEventListener("click", function () {
  header.classList.toggle("open-burger");
});

menuBurgerLink.forEach(function (el) {
  el.addEventListener("click", function () {
    header.classList.remove("open-burger");
  });
}); 

//menu-serach
let searchBtn = document.querySelector(".header__btn-search");
let searchMenu = document.querySelector(".header__form-search");
let closetBtn = document.querySelector(".header__btn-closed");

searchBtn.addEventListener("click", function () {
  searchMenu.classList.add("menu-search-open"),
    closetBtn.classList.add("menu-search-open");
});

closetBtn.addEventListener("click", function () {
  searchMenu.classList.remove("menu-search-open");
});

//Подключение модального окна для формы входа
const modal = new GraphModal();

//Очистка инпутов формы входа по нажатию кнопки "Закрыть"
let btnClear = document.querySelector(".enter-modal__btn-closed");
let inputs = document.querySelectorAll("input");

btnClear.addEventListener("click", () => {
  inputs.forEach((input) => (input.value = ""));
});

//validation формы для входа
const validation = new JustValidate(".enter-modal__form", {
  errorFieldCssClass: "is-invalid",
  focusInvalidField: true,
}); //Здесь были стили к ошибке, теперь они в CSS

validation
  .addField(".enter-modal__input-login", [
    {
      rule: "required",
      errorMessage: "Введите ваш логин",
    },
    {
      rule: "minLength",
      value: 3,
      errorMessage: "Логин не может быть короче 3 знаков",
    },
    {
      rule: "maxLength",
      value: 30,
      errorMessage: "Логин не может быть длиннее 30 знаков",
    },
    {
      rule: "customRegexp",
      value: /(?=.*[а-яА-ЯёЁa-zA-Z0-9])/,
      errorMessage: "Ошибка",
    }, // В логине используются латиница, кириллица и цифры
  ])
  .addField(".enter-modal__input-password", [
    {
      rule: "required",
      errorMessage: "Введите пароль",
    },
    {
      rule: "customRegexp",
      value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/,
      errorMessage: "Пароль введён в неправильном формате",
    }, //Установление обязательных символов
  ])
  .onSuccess((ev) => {
    console.log("form reset", ev);
    let formData = new FormData(ev.target);
    ev.target.reset();
  }); //очищает форму по клику на кнопку Войти - форму не закрывает

//swiper-hero
var swiper = new Swiper(".mySwiper-1", {
  spaceBetween: 0,
  loop: true,
  speed: 1000, //скорость прокрутки
  centeredSlides: true,
  autoplay: {
    delay: 5000, //скорость смены слайда
    disableOnInteraction: false,
  },
});

//scrollbar
document.querySelectorAll(".dropdown__simplebar").forEach((dropdown) => {
  new SimpleBar(dropdown, {
    autoHide: false, //чтобы изначально ползунок был виден
    scrollbarMaxSize: 28, //с помощью этого значения можно управлять высотой ползунка
  });
});

//dropdown

//задаём переменные для элементов:
const btns = document.querySelectorAll(".header__btn-drop");
const dropdowns = document.querySelectorAll(".dropdown");
const activeClassdropdowns = "dropdown__active";
const activeClassbtns = "btn__active";
//вешаем события клика на открытие и закрытие окон:
btns.forEach((item) => {
  item.addEventListener("click", function () {
    let DropThis = this.parentElement.querySelector(".dropdown");
    dropdowns.forEach((el) => {
      if (el != DropThis) {
        el.classList.remove(activeClassdropdowns);
      }
    });

    btns.forEach((el) => {
      if (el != this) {
        el.classList.remove(activeClassbtns);
      }
    });

    DropThis.classList.toggle(activeClassdropdowns);
    this.classList.toggle(activeClassbtns);
  });
});
//Убираем dropdown по клику вне элемента:
document.addEventListener("click", function (e) {
  let target = e.target;
  if (!target.closest(".header__list_bottom")) {
    document.querySelectorAll(".dropdown").forEach((el) => {
      el.classList.remove("dropdown__active");
    });
    document.querySelectorAll(".header__btn-drop").forEach((el) => {
      el.classList.remove("btn__active");
    });
  }
});

//select
const element = document.querySelector(".galery__select");
const choices = new Choices(element, {
  searchEnabled: false, //удаляет окно поиска
  shouldSort: false, //отключает сортировку по алфавиту
  itemSelectText: "", //удаляет placeholder
});

//swiper-galery
var swiper = new Swiper(".mySwiper-2", {
  slidesPerView: 3,
  spaceBetween: 50,
  loop: true,
  speed: 700,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    100: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    511: {
      slidesPerView: 2,
      spaceBetween: 32,
    },
    1101: {
      slidesPerView: 3,
    },
  },
});

//accordion
$(".accordion").accordion({
  active: 0, //делает открытым 1-й блок
  heightStyle: "content", //подстраивает ширину открытого окна под контент
  collapsible: true, //по клику сворачивает открытый блок
});
$(".ui-accordion-header").attr("tabindex", "0"); //чтобы работал фокус на Tab

//tabs in accoredion
document.querySelectorAll(".catalog__artist-btn").forEach(function (tabsBtn) {
  //выбираем все кнопки и для каждой назначаем функцию
  tabsBtn.addEventListener("click", function (event) {
    //функция срабатывает по клику, происходит связывание атрибута path с атрибутом target с одним значением.
    const path = event.currentTarget.dataset.path;
    document
      .querySelectorAll(".catalog__artist-btn")
      .forEach(function (btnAct) {
        btnAct.classList.remove("presona-active"); //по клику удаляет указанный класс
      });
    event.currentTarget.classList.add("presona-active"); //по клику добавляет класс
    document
      .querySelectorAll(".catalog__item-artist")
      .forEach(function (tabsBtn) {
        tabsBtn.classList.remove("presona-active");
      });
    document
      .querySelector(`[data-target="${path}"]`)
      .classList.add("presona-active");
  });
});

//Прокрутка до карточки гостя на мобильных устройствах

let artistBtn = document.querySelectorAll(".catalog__artist-btn");
let el = document.querySelector(".catalog__list-artist");
artistBtn.forEach(function (ev) {
  ev.addEventListener("click", function () {
    if (window.matchMedia("(max-width: 910px)").matches) {
      el.scrollIntoView(true); //условие - скролл работает с 910px и меньше
    } else {
      ev.removeEventListener("click", function () {
        el.scrollIntoView(true); //иначе - скролл не работает, удаляем событие клика
      });
    }
  });
});

//swiper-events
var swiper = new Swiper(".mySwiper-3", {
  slidesPerView: 3,
  slidesPerGroup: 3, //перелистывает по 3 карточки
  speed: 800,
  pagination: {
    el: ".swiper-btn-bullet",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-btn-right",
    prevEl: ".swiper-btn-left",
  },
  breakpoints: {
    100: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
    },
    511: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 20,
    },
    611: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 33,
    },
    911: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    993: {
      spaceBetween: 27,
    },
    1101: {
      spaceBetween: 50,
    },
  },
});

// swiper-projects
var swiper = new Swiper(".mySwiper-4", {
  slidesPerView: 3,
  slidesPerGroup: 3, //перелистывает по 3 карточки
  loop: true,
  speed: 800, //скорость прокрутки
  navigation: {
    nextEl: ".swiper-btn-next",
    prevEl: ".swiper-btn-prev",
  },
  breakpoints: {
    100: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
    },
    511: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 20,
    },
    611: {
      spaceBetween: 33,
    },
    911: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 50,
    },
    1101: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50,
    },
  },
});

//tooltips
tippy("[data-tippy-content]", {
  // trigger: 'click', //появление тултипа по клику
  animation: "scale",
  duration: [500, 250], //длительность анимации - начало и конец
  delay: [300, 250], //задержка начала появления и исчезания при наведении
});

//inputmask in contacts
var selector = document.querySelector("input[type='tel']"); //выбираем инпут с атрибутом type
var im = new Inputmask("+7 (999)-999-99-99"); // показываем, как должно выглядеть поле ввода
im.mask(selector); //подключаем селектор, чтобы всё работало.

//validation in contacts
const validation2 = new JustValidate(".contacts__wrap-form", {
  errorFieldCssClass: "is-invalid",
  focusInvalidField: true,
});

validation2
  .addField(".contacts__input-name", [
    {
      rule: "required",
      errorMessage: "Введите ваше имя",
    },
    {
      rule: "minLength",
      value: 2,
      errorMessage: "Имя не может быть короче 2 знаков",
    },
    {
      rule: "maxLength",
      value: 30,
      errorMessage: "Имя не может быть длиннее 30 знаков",
    },
    {
      rule: "customRegexp",
      value: /(?=.*[а-яА-ЯёЁa-zA-Z])/,
      errorMessage: "Недопустимый формат",
    }, // В имени используются латиница, кириллица
  ])
  .addField(".contacts__input-phone", [
    {
      rule: "required",
      errorMessage: "Введите телефон",
    },
  ])
  .onSuccess((event) => {
    console.log("Validation passes and form submitted", event);

    let formData = new FormData(event.target);

    console.log(...formData);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          document
            .querySelector(".contacts__thanks-wrap")
            .classList.add("open-tanks");
        } //именно в этих фигурных скобках вызывается модальное окно или событие отправления
      }
    };
    //открываем соединение и отправяем письмо
    xhr.open("POST", "mail.php", true);
    xhr.send(formData);
    //очищаем форму после отправки
    event.target.reset();
  });
//Убираем окно благодарности по клику вне элемента
const tanks = document.querySelector(".contacts__thanks-wrap");
document.addEventListener("click", (e) => {
  const opentanks = e.composedPath().includes(tanks);
  if (!opentanks) {
    tanks.classList.remove("open-tanks"); // скрываем элемент т.к. клик был за его пределами
  }
});

//map

// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init() {
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    // Координаты центра карты (совпадает или отличается от нашего геообъекта). Порядок по умолчанию: «широта, долгота».
    center: [55.75846806898367, 37.60108849999989],
    // Уровень масштабирования. Допустимые значения: от 0 (весь мир) до 19.
    zoom: 14,
  });
  // Создание геообъекта с типом точка (метка).
  var myGeoObject = new ymaps.GeoObject({
    geometry: {
      type: "Point", // тип геометрии - точка
      coordinates: [55.75846806898367, 37.60108849999989], // координаты точки
    },
  });
  // Вспомогательная переменная, которую можно использовать вместо GeoObject c типом геометрии «Point» (см. предыдущий пример) - можно добавлять свои метки:
  var myPlacemark = new ymaps.Placemark(
    [55.75846806898367, 37.60108849999989],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "img/svg/map-icon.svg", // Путь до нашей картинки из index.html
      iconImageSize: [20, 20], // Размер по ширине и высоте
      iconImageOffset: [1, 1], // Смещение левого верхнего угла иконки относительно её «ножки» (точки привязки).
    }
  );
  // Размещение геообъекта на карте.
  myMap.geoObjects.add(myPlacemark);
}

// Кнопка вверх

$("#up-top").css("right", -65);
$(window).scroll(function () {
  if ($(this).scrollTop() > 300) {
    $("#up-top").css("right", 55);
  } else {
    $("#up-top").css("right", -65);
  }
});
$("#up-top").click(function () {
  $("html,body").animate({ scrollTop: 0 }, 100);
});
