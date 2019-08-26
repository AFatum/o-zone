import filterCards from './filterCards';

// события на кнопки фильтр
export default function actionPage(){

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