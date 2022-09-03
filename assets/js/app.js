'use strict';

import { dataProducts } from './data-products.js';
import { swiper } from './slider.js';
// ---------------------------------------------------------------------------------------------------------------
// slider Swiper start


// slider Swiper end
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
// Cards start

let cardsContainer = document.querySelector('.cards__row');                        

// -----------------------------------------------------------

function render(object) {                                                           // RENDER
    cardsContainer.innerHTML = '';
    object.forEach((dataProducts) => {
        cardsContainer.innerHTML += createCard(dataProducts);
    });
}
// -----------------------------------------------------------

function createCard(dataProducts) {                                                 // CREATE CARD
    return `           
        <div class="card">
            <img src="${dataProducts.image}" class="card-img-top" alt="..." id = ${dataProducts.id}>
            <div class="card-body">
                <p class="card-text">${dataProducts.cost}$</p>
                <h5 class ="card-title">${dataProducts.name}</h5>
                <a href="#" class="btn btn-primary">В корзину</a>
            </div>
        </div>                
    `
}
render(dataProducts);

// -----------------------------------------------------------
function saveData(data) {                                                           // SAVE IN LOCAL STORAGE 
    localStorage.setItem('characters', JSON.stringify(data));
};
// -----------------------------------------------------------



