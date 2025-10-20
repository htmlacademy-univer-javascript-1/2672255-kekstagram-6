/**
 * Функция для проверки длины строки
 * @param {string} string - Проверяемая строка
 * @param {number} maxLength - Максимальная допустимая длина
 * @returns {boolean} - выведет true, если строка меньше или равна, иначе выведет false
 */
const checkStringLength = (string, maxLength) => string.length <= maxLength;


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
