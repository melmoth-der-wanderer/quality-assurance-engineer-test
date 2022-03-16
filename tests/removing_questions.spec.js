const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

const { QuestionsPage } = require('./pages/questionsPage');

test.describe('User can remove saved questions', () => {
  test('Removing single question', async ({ page }) => {
    const questionsPage = new QuestionsPage(page);
    await questionsPage.goto();
    await questionsPage.removeButton.click();
    await expect(questionsPage.noQuestionsAlert).toBeVisible();
    await expect(questionsPage.sidebar).toHaveText('Here you can find no questions. Feel free to create your own questions!');
  });

  test('Removing multiple questions', async ({ page }) => {
    const questionsPage = new QuestionsPage(page);
    await questionsPage.goto();
    await questionsPage.createQuestion(faker.lorem.sentence(), faker.lorem.paragraph());
    await questionsPage.removeButton.click();
    await expect(questionsPage.noQuestionsAlert).toBeVisible();
  });

  test('Removing empty list', async ({ page }) => {
    const questionsPage = new QuestionsPage(page);
    await questionsPage.goto();
    await questionsPage.removeButton.click();
    await expect(questionsPage.removeButton).not.toBeVisible();
  });
});
