// рендеринг карт товаров
export default function renderCards({goods}) {
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