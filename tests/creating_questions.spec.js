const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

const { QuestionsPage } = require('./pages/questionsPage');

test.describe('User can save new question in the list', () => {
  let question;
  let answer;

  test.beforeEach(async () => {
    question = faker.lorem.sentence();
    answer = faker.lorem.paragraph();
  });

  test('Question field is required', async ({ page }) => {
    const questionsPage = new QuestionsPage(page);
    await questionsPage.goto();
    const isRequired = await questionsPage.questionField.getAttribute('required');
    expect(isRequired).not.toEqual(null);
  });

  test('Answer field is required', async ({ page }) => {
    const questionsPage = new QuestionsPage(page);
    await questionsPage.goto();
    const isRequired = await questionsPage.answerField.getAttribute('required');
    expect(isRequired).not.toEqual(null);
  });

  test('Adding more questions to the list', async ({ page }) => {
    const questionsPage = new QuestionsPage(page);
    await questionsPage.goto();
    await questionsPage.createQuestion(question, answer);
    await questionsPage.validateSavedQuestion(question, answer);
  });

  test('Creating first question', async ({ page }) => {
    const questionsPage = new QuestionsPage(page);

    await test.step('Precondition', async () => {
      await questionsPage.goto();
      await questionsPage.removeButton.click();
      await expect(questionsPage.noQuestionsAlert).toBeVisible();
    });
    await questionsPage.createQuestion(question, answer);
    await questionsPage.validateSavedQuestion(question, answer);
  });
});
