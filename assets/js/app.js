'use strict';
import { swiper } from './slider.js';
import { createElement } from './helpers.js';

// -------------------------------------------------------------------------------------------------------------------------------------------------
let cardsContainer = document.querySelector('.cards__row');  
const API = 'https://630a782f3249910032862e58.mockapi.io/wildberries/api/v1/cards';
let productName = JSON.parse(localStorage.getItem('productName')) ?? [];
const input = document.querySelector('.navbar__input');

// -------------------------------------------------------------------------------------------------------------------------------------
function getCards() {                   
    fetch(API)
        .then((response) => response.json())
        .then((data) => {
            productName = data;
            render(data)
            saveData(data)
    })
    .catch((error) => {
        console.log(error)
    });
};

function saveData(data) {                                                        
    localStorage.setItem('productName', JSON.stringify(data));
};

// ################################################################################################################################################
// RENDER START

function render(array) { 
    for (let i = 0; i <= 30; i++) {            
        cardsContainer.innerHTML = '';
        array.forEach((el) => {
            cardsContainer.innerHTML += `                           
                <div class="card" data-id = "${el.id}">
                    <img src="${el.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <p class="card-text" id = "price">${el.cost} $</p>
                        <h5 class ="card-title" id = "name">${el.name}</h5>
                        <button class="btn btn-primary" data-cart>В корзину</button>
                    </div>
                </div>                
            `; 
        })
    }
    return
}
getCards();

// RENDER END
// ################################################################################################################################################

// ################################################################################################################################################
// CART START

window.addEventListener('click', function (event) {
    if(event.target.hasAttribute('data-cart')) {    // проверяем, что кликнули на кнопке "Купить"
        const card = event.target.closest('.card'); // находим карточку с товаром, внутри которой был совершен клик

        const productInfo = {                       // собираем данные с выбранного товара и записываем их в объект
            id: card.dataset.id,
            imgSrc: card.querySelector('.card-img-top').getAttribute('src'),
            title: card.querySelector('.card-title').innerText,
            price: card.querySelector('.card-text').innerText,
        }

        // создаем разметку и подставляем собранные данные
        const cartItemHTML = `                     
            <div class="cart-item" data-id = "${productInfo.id}">
            <div class="cart-item__top">
                <div class="cart-item__img">
                    <img src="${productInfo.imgSrc}" alt="${productInfo.title}">
                </div>
                <div class="cart-item__desc">
                    <div class="cart-item__title">${productInfo.title}</div>
                    <div class="cart-item__price" data-price>${productInfo.price}</div>
                </div>
            </div>
        </div>
        `;

        modalCartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);

        function calcCartPrice() {
            const cartItems = document.querySelectorAll('.cart-item');
            const totalPriceEl = document.querySelector('.card-total__price');
            let totalPrice = 0;

            cartItems.forEach(function (item) {
                const currentPrice = parseInt(item.querySelector('[data-price]').innerText)
                totalPrice += currentPrice;
            });
            totalPriceEl.innerText = totalPrice;                // отображаем цену на странице
        }
        calcCartPrice();
    }
});
// CART END
// ################################################################################################################################################


// ################################################################################################################################################
// SEARCH START

input.addEventListener('input', ({ target }) => {                       // при вводе в инпут фильтрует по названиям и отдает подходящие значения
    let tempArray = productName.filter((el) =>
        (el.name + el.cost)
            .toLowerCase()
            .includes(target.value)                                                   
    );
    render(tempArray);
});

// SEARCH END
// ###############################################################################################################################################

// -----------------------------------------------------------------------------------------------------------------------------------------------

// ###############################################################################################################################################
// MODAL START

const btn = document.querySelector('.navbar__cart');                                            // кнопка корзины
const modalOverlay = document.querySelector('.modals__modal-overlay'); 
const modalCartWrapper = document.querySelector('.modals__cart-wrapper');                       // overlay                                                

btn.addEventListener('click', (e) => {
    let path = e.currentTarget.getAttribute('data-path');                                       // на случай,если кнопок и модалок несколько
    document.querySelector(`[data-target = "${path}"]`).classList.add('modals__modal_visible');
    modalOverlay.classList.add('modals__modal-overlay_visible'); 

    if(modalOverlay.classList.contains('modals__modal-overlay_visible')) {                      //  при нажатии на кнопку корзины добавляем класс c visible
        document.body.style.position = 'fixed';                                                 // запрещаем прокрутку body при открытом модальном окне
        document.body.style.top = `-${window.scrollY}px`;
    }                                          
});

modalOverlay.addEventListener('click', (e) => {
    if(e.target === modalOverlay) {
        modalOverlay.classList.remove('modals__modal-overlay_visible');                         // при нажатии на свободную область модальное окно исчезает
        document.body.style.position = 'relative';
    }
});  

// MODAL END
// ################################################################################################################################################





