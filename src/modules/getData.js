// получение данных с сервера
export default function getData(){
  const goodsWrapper = document.querySelector('.goods');
  
  //return fetch('./db/db.json')
  //return fetch('https://afatum.github.io/o-zone/db/db.json')
  //return fetch('o-zone/db/db.json')
  return fetch('../../o-zone/db/db.js')
  //return fetch('./o-zone/db/db.json')
  //return fetch('afatum.github.io/o-zone/db/db.json')
  //return fetch('../../ozone/db/db.jsongit ')
  //return fetch('./db/db.json')
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