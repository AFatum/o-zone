'use strict'

// чекбокс

function toggleCheckbox() {
  const checkbox = document.querySelectorAll('.filter-check_checkbox');

  checkbox.forEach(check => {
    check.addEventListener('change', function () {
      if (this.checked) {
        // для установки галочки, нужно добавить класс checked следующему элементу
        // поэтому используем метод nextElementSibling, для получения сл.элемента
        // метод classList добавляет нужній класс через classList.add()

        this.nextElementSibling.classList.add('checked');
      } else {
        // галочки нет
        this.nextElementSibling.classList.remove('checked');
      }

      // this.checked ? this.checked = false : this.checked = true;
    });
  })
}; // end чекбокс

// корзина
function toggleCart() {
  const btnCart = document.getElementById('cart'),
    modalCart = document.querySelector('.cart'),
    closeCart = document.querySelector('.cart-close');

  btnCart.addEventListener('click', () => {
    modalCart.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  })

  closeCart.addEventListener('click', () => {
    modalCart.style.display = 'none';
    document.body.style.overflow = '';
  })
}; // end корзина

// Работа с товаром, добавление в корзину
function addCart() {
  const cards = document.querySelectorAll('.goods .card'),
    cartWrapper = document.querySelector('.cart-wrapper'),
    cartEmpty = document.getElementById('cart-empty'),
    countGoods = document.querySelector('.counter');

  cards.forEach(card => {
    const btn = card.querySelector('button');
    btn.addEventListener('click', () => {
      const cardClone = card.cloneNode(true);
      cartWrapper.appendChild(cardClone);
      showData();

      const removeBtn = cardClone.querySelector('.btn');
      removeBtn.textContent = 'Удалить из корзины';
      removeBtn.addEventListener('click', () => {
        cardClone.remove();
        showData();
      });
    });
  });

  function showData() {
    const cardsCart = cartWrapper.querySelectorAll('.card'),
      cardsPrices = cartWrapper.querySelectorAll('.card-price'),
      cardTotal = document.querySelector('.cart-total span');

    countGoods.textContent = cardsCart.length;
    let sum = 0;
    cardsPrices.forEach(price => {
      let cardPrice = parseFloat(price.textContent);
      sum += cardPrice;
    });
    cardTotal.textContent = sum;

    if (cardsCart.length === 0) cartWrapper.appendChild(cartEmpty);
    else cartEmpty.remove();
  }
} // end Работа с товаром, добавление в корзину

// события на кнопки фильтр
function actionPage(){

  const cards = document.querySelectorAll('.goods .card'),
    discountCheckbox = document.getElementById('discount-checkbox'),
    min = document.getElementById('min'),
    max = document.getElementById('max'),
    searchBtn = document.querySelector('.search-btn');

  min.addEventListener('change', filterCards);
  max.addEventListener('change', filterCards);
  discountCheckbox.addEventListener('change', filterCards);
  searchBtn.addEventListener('click', filterCards);
}; // end события на кнопки фильтр

// фильтр карточек товаров
function filterCards() {
  const search = document.querySelector('.search-wrapper_input'),
    cards = document.querySelectorAll('.goods .card'),
    discountCheckbox = document.getElementById('discount-checkbox'),
    min = document.getElementById('min'),
    max = document.getElementById('max'),
    liActive = document.querySelector('.catalog-list li.active'),
    searchValue = new RegExp(search.value.trim(), 'i');

  cards.forEach(card => {
    const price = parseFloat(card.querySelector('.card-price').textContent),
      cardText = card.querySelector('.card-title').textContent,
      cardCategory = card.dataset.category,

      isMin = !!(min.value && min.value > price),
      isMax = !!(max.value && max.value < price),
      isDiscount = !!(discountCheckbox.checked && !card.querySelector('.card-sale')),
      isSearch = !!(!searchValue.test(cardText)),
      isCategory = !!(liActive && liActive.textContent !== cardCategory);
      
      if(isMin || isMax || isDiscount || isSearch || isCategory)
        card.parentNode.style.display = 'none';
      else card.parentNode.style.display = '';
  });
}; // end фильтр карточек товаров

// получение данных с сервера
function getData(){
  const goodsWrapper = document.querySelector('.goods');
  
  return fetch('../db/db.json')
  //fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => {
      if(response.ok){
        return response.json();
      } else throw new Error('Данные не были получены, ошибка: ' + response.status);
    })
    .catch(err => {
      console.warn(err);
      goodsWrapper.innerHTML = `<div style="color: red; font-size: 1.5em">Упс, не получили данные от сервера.<br>${err}</div>`;
    });  
}; // end получение данных с сервера

// рендеринг карт товаров
function renderCards({goods}) {
  const goodsWrapper = document.querySelector('.goods');

  goods.forEach(({category, sale, img, price, title}) => {
    const card = document.createElement('div');

    card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
    card.innerHTML = `
                <div class="card" data-category = "${category}">
                ${(sale) ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
									<div class="card-img-wrapper">
										<span class="card-img-top"
											style="background-image: url(${img})"></span>
									</div>
									<div class="card-body justify-content-between">
										<div class="card-price" ${sale ? 'style="color: red"' : ''}>${price} ₽</div>
										<h5 class="card-title">${title}</h5>
										<button class="btn btn-primary">В корзину</button>
									</div>
                </div> `;
    goodsWrapper.appendChild(card);
  });
}; // end рендеринг карт товаров

// рендер каталога
function renderCatalog() {
 const cards = document.querySelectorAll('.goods .card'),
  catalogList = document.querySelector('.catalog-list'),
  catalogBtn = document.querySelector('.catalog-button'),
  catalogWrapper = catalogBtn.querySelector('.catalog'),
  categories = new Set();
 
 cards.forEach(card => { categories.add(card.dataset.category); });

 categories.forEach(item => {
   const li = document.createElement('li');
   li.textContent = item;
   catalogList.appendChild(li);
 });

 catalogBtn.addEventListener('click', (event) => {
  const allLi = document.querySelectorAll('.catalog-list li');

  catalogWrapper.style.display = (!catalogWrapper.style.display) ? 'block' : '';
  
  if(event.target.tagName === "LI"){
    for(const li of allLi){
      (event.target === li) 
        ? li.classList.add('active')
        : li.classList.remove('active');
    }
  }
  renderCloseCategory();
  filterCards();
 });
}; // end рендер каталога

// рендерим кнопку сброса фильтра категорий
function renderCloseCategory() {
  const filterTitle = document.querySelector('.filter-title'),
    category = (!filterTitle.querySelector('.category-active'))
    ? document.createElement('div')
    : filterTitle.querySelector('.category-active');
  let liActive = document.querySelector('.catalog-list li.active');

  category.addEventListener('click', () => {
    liActive.classList.remove('active');
    category.remove();
    filterCards();
  })

  if(liActive) {
    category.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="10" viewBox="0 0 24 24" fill="white"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg><span>${liActive.textContent}</span>`;
    category.className = 'category-active';
    filterTitle.appendChild(category);
  }
} // end рендерим кнопку сброса фильтра категорий


getData().then(data => {
  renderCards(data);
  renderCatalog();
  toggleCheckbox();
  toggleCart();
  addCart();
  actionPage();
});


// webpack рассматривают 45:00тзь (1:40:00)
// закончили на 56:37 (1:40:00)