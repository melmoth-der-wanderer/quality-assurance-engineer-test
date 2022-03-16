const { test, expect } = require('@playwright/test');
const numericList = require('./data/numeric_list.json');
const alphabeticList = require('./data/alphabetic_list.json');

const { QuestionsPage } = require('./pages/questionsPage');

test.describe('User can sort existent questions', () => {
  test('Alphabetical sorting', async ({ page }) => {
    const questionsPage = new QuestionsPage(page);
    await questionsPage.goto();
    await questionsPage.createMultipleQuestions(alphabeticList);
    await questionsPage.sortButton.click();
    expect(await questionsPage.questionsList.screenshot()).toMatchSnapshot('alphabetical_sorting.png');
  });

  test('Numerical sorting', async ({ page }) => {
    const questionsPage = new QuestionsPage(page);
    await questionsPage.goto();
    await questionsPage.createMultipleQuestions(numericList);
    await questionsPage.sortButton.click();
    expect(await questionsPage.questionsList.screenshot()).toMatchSnapshot('numerical_sorting.png');
  });

  test('Empty list sorting', async ({ page }) => {
    const questionsPage = new QuestionsPage(page);
    await questionsPage.goto();
    await questionsPage.removeButton.click();
    await expect(questionsPage.sortButton).not.toBeVisible();
  });
});
