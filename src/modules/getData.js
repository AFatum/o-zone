// получение данных с сервера
export default function getData(){
  const goodsWrapper = document.querySelector('.goods');
  
  return fetch('https://afatum.github.io/o-zone/db/db.json')
  //return fetch('../dbb/db.json')
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