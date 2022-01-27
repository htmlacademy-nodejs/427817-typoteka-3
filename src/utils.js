'use strict';

/**
 * Перетасовка массива по алгоритму Фишера—Йетса.
 * Функция возвращает новый массив
 *
 * @param {Array} array
 * @return {Array} resultArray
 */
const shuffle = (array) => {
  const resultArray = array.slice();
  for (let i = resultArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [resultArray[randomPosition], resultArray[i]] = [resultArray[i], resultArray[randomPosition]];
  }

  return resultArray;
};

/**
 * Возвращает случайное целое число в диапазоне `min` и `max`.
 *
 * @param {Integer} min
 * @param {Integer} max
 * @return {Integer}
 */
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = {
  getRandomInt,
  shuffle
};
