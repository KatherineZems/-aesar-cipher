const toggleProg = document.querySelector('.toggle')
const form = document.querySelector('.form')
const formInner = document.querySelector('.form-inner')
const formLegend = document.querySelector('.form-legend')
const decodedText = document.querySelector('.decoded-message')
const inputLabel = document.querySelector('.label-text')
const submitBtn = document.querySelector('.form-btn')
const radioRight = document.querySelector('[value="right"]')
const radioLeft = document.querySelector('[value="left"]')
const textarea = document.querySelector('.form-textarea')

// Переключатель типа программы
toggleProg.addEventListener('change', () => {
  if(form.classList.contains('animation-height') || formInner.classList.contains('animation-opacity')){
    form.classList.remove('animation-height')
    formInner.classList.remove('animation-opacity')   
  }
  setTimeout(() => {
    form.classList.add('animation-height')
    formInner.classList.add('animation-opacity')
  }, 50)

  setTimeout(() => {
    textarea.value = decodedText.textContent
    decodedText.innerHTML = ""

    if(toggleProg.checked) {
      formLegend.innerHTML = "Дешифровщик шифра&nbsp;Цезаря"
      inputLabel.innerHTML = "Введите зашифрованное послание:"
      submitBtn.innerHTML = "Расшифровать"
    } else {
      formLegend.innerHTML = "Закодировать шифром&nbsp;Цезаря"
      inputLabel.innerHTML = "Введите послание для шифровки на русском:"
      submitBtn.innerHTML = "Зашифровать"
    }

    radioRight.checked ? radioLeft.checked = true : radioRight.checked = true

  }, 650)
})

// Алфавит
let symbols = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я', 'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я', ' ', '.', ',', '-', '!', '?', '—', ':'];

// Функция кодирует и раскодирует сообщения
function decoder(encodedSymbols, shift, shiftDirection) {
  let decodedMessage = '';
  
  for(let i = 0; i < encodedSymbols.length; i++) {
    let j = encodedSymbols[i] + shift
    if(shiftDirection == 'right') {
      j = encodedSymbols[i] + shift
    } else {
      j = encodedSymbols[i] - shift
    }
    if(j >= symbols.length) {
      j -= symbols.length
      decodedMessage += symbols[j]
    } else if(j < 0) {
      j += symbols.length
      decodedMessage += symbols[j]
    }else {
      decodedMessage += symbols[j]
    }
  }

  return decodedMessage
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = new FormData(e.target)
  // Текст пользователя разбиваем по-символьно и делаем из него массив
  let encodedSymbols = data.get('encryption').split('')
  // Ищем каждый символ пользов. текста в нашем алфавите и записываем индекс этого символа в новый массив
  let encodedSymbolsNumbers = []
  for(let i = 0; i < encodedSymbols.length; i++) {
    encodedSymbolsNumbers.push(+symbols.indexOf(encodedSymbols[i]))
  }
  let shift = +data.get('shift')
  let shiftDirection = data.get('shiftDirection')
  
  decodedText.textContent = decoder(encodedSymbolsNumbers, shift, shiftDirection)
})
