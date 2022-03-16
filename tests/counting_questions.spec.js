const { test, expect } = require('@playwright/test');

const { QuestionsPage } = require('./pages/questionsPage');

test.describe('User can see the number of the saved questions', () => {
  test('One or more questions', async ({ page }) => {
    const questionsPage = new QuestionsPage(page);
    await questionsPage.goto();
    await questionsPage.validateQuestionsQuantityText(1);
    await expect(questionsPage.questionCard).toHaveCount(1);
  });

  test('No questions', async ({ page }) => {
    const questionsPage = new QuestionsPage(page);

    await test.step('Precondition', async () => {
      await questionsPage.goto();
      await questionsPage.removeButton.click();
      await expect(questionsPage.noQuestionsAlert).toBeVisible();
    });
    await questionsPage.validateQuestionsQuantityText(0);
    await expect(questionsPage.questionCard).toHaveCount(0);
  });
});
