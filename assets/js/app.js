'use strict';

// import { dataProducts } from './data-products.js';           // заменила на API
import { swiper } from './slider.js';

// --------------------------------------------------------------------------------------------------------------
// CREATE ELEMENT
function createElement(tag, className, text, type, placeholder) {                   // CREATE ELEMENT
    let el = document.createElement(tag);
    text ? (el.innerText = text) : null;

    if (className) {
        let arr = className.split(' ');
        for (let elArr of arr) {
            el.classList.add(elArr);
        }
    }

    if(tag === 'input') {
            type ? (el.type = type) : null;
            placeholder ? (el.placeholder = placeholder) : null;
    }
    return el;
};


// -------------------------------------------------------------------------------------------------------------------------------------

let cardsContainer = document.querySelector('.cards__row');   
const API = 'https://630a782f3249910032862e58.mockapi.io/wildberries/api/v1/cards';
let productName = JSON.parse(localStorage.getItem('productName')) ?? [];
const input = document.querySelector('.navbar__input')
// ------------------------------------------------------------------------------------поиск по названию товара


// ------------------------------------------------------------------------------------
function getCards() {                   
    fetch(API)
        .then((response) => response.json())
        .then((data) => {
            productName = data;
            render(data)
            saveData(data)   
    })

};

// -----------------------------------------------------------

function render(array) { 
    for (let i = 0; i <= 30; i++) {             // не лишнее ли это?  (там и так только 30 шт отдает)
        cardsContainer.innerHTML = '';
        array.forEach((el) => {
            cardsContainer.innerHTML += `                           
                <div class="card">
                    <img src="${el.image}" class="card-img-top" alt="..." id = ${el.id}>
                    <div class="card-body">
                        <p class="card-text">${el.cost}$</p>
                        <h5 class ="card-title">${el.name}</h5>
                        <a href="#" class="btn btn-primary">В корзину</a>
                    </div>
                </div>                
            `;   
        });     
    }
}
getCards();

// -----------------------------------------------------------

function saveData(data) {                                                        
    localStorage.setItem('productName', JSON.stringify(data));
};
// ------------------------------------------------------------

input.addEventListener('input', ({ target }) => {        // при вводе в инпут фильтрует по названиям и отдает подходящие значения
    let tempArray = productName.filter((el) =>
        (el.name + el.cost)
            .toLowerCase()
            .includes(target.value)                     // как сделать подсветку совпадающих букв при вводе в инпут?
    );
    render(tempArray);
});

// --------------------------------------------------------------------------------------------------------------------------------------------

// При клике на картинку - увеличиваем (присвоить новый класс, как вариант)



// ###############################################################################################################################################
// MODAL START
// ###############################################################################################################################################
const btn = document.querySelector('.navbar__cart');
const modal = document.querySelector('.modals__modal-overlay');


btn.addEventListener('click', (e) => {
    let path = e.currentTarget.getAttribute('data-path');                                            // на случай,если кнопок и модалок несколько
    document.querySelector(`[data-target = "${path}"]`).classList.add('modals__modal_visible');
    modal.classList.add('modals__modal-overlay_visible');                                            //  при нажатии на кнопку корзины добавляем класс c visible
});

modal.addEventListener('click', (e) => {
    if(e.target === modal) {
        modal.classList.remove('modals__modal-overlay_visible');                                     // при нажатии на свободную область модальное окно исчезает
    }
});     
        // для добавления в корзину определенного товара возможно понадобится этот кусок кода
        // btns.forEach((el) => {           // кнопки " купить", пробегаемся форичем
        // el.addEventListener('click', (e) => {       // ловит событие на определенной кнопке
        //  let nameBtn = e.currentTarget.getAttribute('прописать дата-атрибут для кнопки добавления в корзину')
        // })
        // })
// ################################################################################################################################################
// MODAL END
// ################################################################################################################################################
// ------------------------------------------------------------
// Корзина товаров




