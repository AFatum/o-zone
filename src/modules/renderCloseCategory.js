import filterCards from './filterCards';

// рендерим кнопку сброса фильтра категорий
export default function renderCloseCategory() {
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