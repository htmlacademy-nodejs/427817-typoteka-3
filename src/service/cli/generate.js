'use strict';

const {
  getRandomInt,
  shuffle
} = require(`../../utils`);

const fs = require(`fs`);

const DEFAULT_COUNT = 1;
const RECORDS_LIMIT = 1000;
const SENTENCES_LIMIT = 5;
const FILE_NAME = `mocks.json`;

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`
];
const SENTENCES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`
];
const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`
];

/**
 * Возвращает случайную дату в рамках одного квартала
 *
 * @return {Date}
 */
const getRecentRandomDate = () => {
  const totalMsInAQuarter = 90 * 24 * 3600 * 1000;
  return new Date(Date.now() - getRandomInt(1, totalMsInAQuarter));
};

const generateCards = (count) => {
  const randomText = shuffle(SENTENCES);
  return Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    announce: randomText.slice(0, getRandomInt(1, SENTENCES_LIMIT)).join(` `),
    fullText: randomText.slice(0, getRandomInt(SENTENCES_LIMIT, randomText.length - 1)).join(` `),
    createdDate: getRecentRandomDate().toLocaleString(),
    category: shuffle(CATEGORIES).slice(0, getRandomInt(1, SENTENCES_LIMIT))
  }));
};

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countCard = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countCard > RECORDS_LIMIT) {
      return console.error(`Извините, не допускается больше ${RECORDS_LIMIT} публикаций`);
    }
    const content = JSON.stringify(generateCards(countCard));

    return fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        return console.error(`Can't write data to file...`);
      }
      return console.info(`Operation success. File created.`);
    });
  }
};
