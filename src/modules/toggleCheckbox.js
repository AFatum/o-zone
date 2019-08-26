// чекбокс

export default function toggleCheckbox() {
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