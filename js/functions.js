/**
 * Функция для проверки длины строки
 * @param {string} string - Проверяемая строка
 * @param {number} maxLength - Максимальная допустимая длина
 * @returns {boolean} - выведет true, если строка меньше или равна, иначе выведет false
 */
const checkStringLength = (string, maxLength) => string.length <= maxLength;

// Тест
console.log('Тест первой функции - checkStringLength');
console.log('Строка короче 20 символов:', checkStringLength('проверяемая строка', 20)); // true
console.log('Длина строки ровно 18 символов:', checkStringLength('проверяемая строка', 18)); // true
console.log('Строка длиннее 10 символов:', checkStringLength('проверяемая строка', 10)); // false


/**
 * Функция для проверки, является ли строка палиндромом
 * @param {string} string - Проверяемая строка
 * @returns {boolean} - выведет true, если строка является палиндромом, иначе выведет false
 */
const isPalindrome = (string) => {
  // Убирает пробелы и переводит строку в нижний регистр
  const normalizedString = string.replaceAll(' ', '').toLowerCase();

  // Перевёрнутая строка
  let reversedString = '';

  // Цикл для создания reversedString
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }

  // Сравниваем нормальную строку и перевёрнутую
  return normalizedString === reversedString;
};

// Тест
console.log('Тест второй функции - isPalindrome');
console.log('"топот":', isPalindrome('топот')); // true
console.log('"ДовОд":', isPalindrome('ДовОд')); // true
console.log('"Кекс":', isPalindrome('Кекс')); // false
console.log('"Лёша на полке клопа нашёл ":', isPalindrome('Лёша на полке клопа нашёл ')); // true
