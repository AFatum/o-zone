import filterCards from './filterCards';
import renderCloseCategory from './renderCloseCategory';

// рендер каталога
export default function renderCatalog() {
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