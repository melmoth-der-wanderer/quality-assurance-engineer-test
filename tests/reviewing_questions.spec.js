const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const basicQuestion = require('./data/basicQuestion');

const { QuestionsPage } = require('./pages/questionsPage');

test.describe('User can review saved questions', () => {
  test('Reviewing pre-saved question', async ({ page }) => {
    const questionsPage = new QuestionsPage(page);
    await questionsPage.goto();
    await questionsPage.validateSavedQuestion(basicQuestion.name, basicQuestion.answer);
  });

  test('Reviewing answer within multiple questions', async ({ page }) => {
    const newQuestion = faker.lorem.sentence();
    const newAnswer = faker.lorem.paragraph();

    const questionsPage = new QuestionsPage(page);
    await questionsPage.goto();
    await questionsPage.createQuestion(newQuestion, newAnswer);
    await questionsPage.expandQuestion(basicQuestion.name);
    await questionsPage.expandQuestion(newQuestion);
    await questionsPage.validateAnswer(basicQuestion.name, basicQuestion.answer);
    await questionsPage.validateAnswer(newQuestion, newAnswer);
  });

  test('Hiding answer after expanding it', async ({ page }) => {
    const questionsPage = new QuestionsPage(page);
    await questionsPage.goto();
    await questionsPage.expandQuestion(basicQuestion.name);
    await questionsPage.expandQuestion(basicQuestion.name); // To close the answer, we need to repeat expanding action
    await expect(page.locator(questionsPage.getAnswer(basicQuestion.name))).not.toBeVisible();
  });
});
