// фильтр карточек товаров
export default function filterCards() {
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
        //card.parentNode.style.display = 'none';
        card.parentNode.hidden = true;
      //else card.parentNode.style.display = '';
      else card.parentNode.hidden = false;
  });
}; // end фильтр карточек товаров