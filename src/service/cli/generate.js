'use strict';

const {
  getRandomInt,
  shuffle
} = require(`../../utils`);

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const DEFAULT_COUNT = 1;
const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);
const RECORDS_LIMIT = 1000;
const SENTENCES_LIMIT = 5;
const FILE_NAME = `mocks.json`;
const FILE_PATHS = {
  SENTENCES: `./data/sentences.txt`,
  TITLES: `./data/titles.txt`,
  CATEGORIES: `./data/categories.txt`,
  COMMENTS: `./data/comments.txt`
};

/**
 * Возвращает случайную дату в рамках одного квартала
 *
 * @return {Date}
 */
const getRecentRandomDate = () => {
  const totalMsInAQuarter = 90 * 24 * 3600 * 1000;
  return new Date(Date.now() - getRandomInt(1, totalMsInAQuarter));
};

/**
 * Формирует массив случайной длины из случайных комментариев
 *
 * @param {Array} comments
 * @return {Array}
 */
const generateRandomComments = (comments) => (
  Array(getRandomInt(DEFAULT_COUNT, comments.length - 1)).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments)
      .slice(0, getRandomInt(DEFAULT_COUNT, comments.length - 1)).join(` `)
  }))
);

/**
 * Формирует массив со случайными тестовыми данными
 *
 * @param {Integer} count запрашиваемое число готовых записей
 * @param {Array} sentences
 * @param {Array} titles
 * @param {Array} categories
 * @param {Array} comments
 * @return {Array}
 */
const generateCards = (count, sentences, titles, categories, comments) => {
  const randomText = shuffle(sentences);

  return Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: randomText.slice(0, getRandomInt(1, SENTENCES_LIMIT)).join(` `),
    fullText: randomText.slice(0, getRandomInt(SENTENCES_LIMIT, randomText.length - 1)).join(` `),
    createdDate: getRecentRandomDate().toLocaleString(),
    category: shuffle(categories).slice(0, getRandomInt(1, SENTENCES_LIMIT)),
    comments: generateRandomComments(comments)
  }));
};

/**
 * Считывает данные из текстового файла
 *
 * @param {String} filePath имя файла
 * @return {Array} массив считанных строк
 */
const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`).map((s) => s.trim());
  } catch (err) {
    console.error(chalk.red(`Can't read data from ${filePath}...`));
    return [];
  }
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countCard = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countCard > RECORDS_LIMIT) {
      return console.error(`Извините, не допускается больше ${RECORDS_LIMIT} публикаций`);
    }

    const [sentences, titles, categories, comments] = await Promise.all([
      readContent(FILE_PATHS.SENTENCES),
      readContent(FILE_PATHS.TITLES),
      readContent(FILE_PATHS.CATEGORIES),
      readContent(FILE_PATHS.COMMENTS)
    ]);
    const content = JSON.stringify(generateCards(countCard, sentences, titles, categories, comments));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  }
};
