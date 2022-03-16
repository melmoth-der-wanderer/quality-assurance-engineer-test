const { test, expect } = require('@playwright/test');

const { QuestionsPage } = require('./pages/questionsPage');

test.describe('User can see informers while using interface', () => {
  test('Questions tooltip', async ({ page }) => {
    const questionsPage = new QuestionsPage(page);
    await questionsPage.goto();
    await questionsPage.questionsTitle.hover();
    await expect(questionsPage.questionsTooltip).toBeVisible();
  });

  test('Question maker tooltip', async ({ page }) => {
    const questionsPage = new QuestionsPage(page);
    await questionsPage.goto();
    await questionsPage.questionMakerTitle.hover();
    await expect(questionsPage.questionMakerTooltip).toBeVisible();
  });
});
