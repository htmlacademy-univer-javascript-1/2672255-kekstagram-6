/**
 * Функция для проверки длины строки
 * @param {string} string - Проверяемая строка
 * @param {number} maxLength - Максимальная допустимая длина
 * @returns {boolean} - true, если строка меньше или равна максимальной длине, иначе false
 */
const checkStringLength = (string, maxLength) => string.length <= maxLength;


/**
 * Функция для проверки, является ли строка палиндромом
 * @param {string} string - Проверяемая строка
 * @returns {boolean} - true, если строка является палиндромом, иначе false
 */
const isPalindrome = (string) => {
  // Нормализуем строку: убираем пробелы и приводим к нижнему регистру
  const normalizedString = string.replaceAll(' ', '').toLowerCase();

  // Создаем перевернутую строку
  let reversedString = '';

  // Цикл для создания перевернутой строки
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }

  // Сравниваем нормализованную строку с перевернутой
  return normalizedString === reversedString;
};

// Тест функции checkStringLength
checkStringLength('проверяемая строка', 20); // true
checkStringLength('проверяемая строка', 18); // true
checkStringLength('проверяемая строка', 10); // false

// Тест функции isPalindrome
isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл '); // true
