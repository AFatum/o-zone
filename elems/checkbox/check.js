const checkbox = document.getElementById('checkbox');

checkbox.addEventListener('change', function() {
  if(this.checked) {     
    this.nextElementSibling.classList.add('checked');
} else {
    this.nextElementSibling.classList.remove('checked');
}
  // this.checked ? this.checked = false : this.checked = true;
});