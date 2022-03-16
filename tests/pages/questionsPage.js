const { expect } = require('@playwright/test');

exports.QuestionsPage = class QuestionsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.URL = '/';
    this.questionsList = page.locator('.card');
    this.questionCard = page.locator('.question__question');
    this.questionsTitle = page.locator('.questions .tooltipped-title__title');
    this.questionMakerTitle = page.locator('.question-maker .tooltipped-title__title');
    this.questionsTooltip = page.locator('.questions .tooltipped-title__tooltip');
    this.questionMakerTooltip = page.locator('.question-maker .tooltipped-title__tooltip');
    this.questionField = page.locator('[id="question"]');
    this.answerField = page.locator('[id="answer"]');
    this.createButton = page.locator('.btn-success');
    this.removeButton = page.locator('.btn-danger');
    this.sortButton = page.locator('.btn-primary');
    this.noQuestionsAlert = page.locator('.alert-danger');
    this.sidebar = page.locator('.sidebar');
  }

  getQuestionCard(question) {
    return `//*[@class="question__question" and text()="${question}"]`;
  }

  getAnswer(question) {
    return `${this.getQuestionCard(question)}/following-sibling::*[contains (@class,"question__answer")]`;
  }

  async goto() {
    await this.page.goto(this.URL, { waitUntil: 'domcontentloaded' });
  }

  async createQuestion(question, answer) {
    await this.questionField.fill(question);
    await this.answerField.fill(answer);
    await this.createButton.click();
  }

  async createMultipleQuestions(listOf) {
    if (Array.isArray(listOf)) {
      for (let i = listOf.length - 1; i >= 0; i--) {
        await this.createQuestion(listOf[i].question, listOf[i].answer);
      }
    } else {
      throw new Error('The parameter should be an array');
    }
  }

  async validateSavedQuestion(question, answer) {
    await this.validateQuestion(question);
    await this.expandQuestion(question);
    await this.validateAnswer(question, answer);
  }

  async validateQuestion(question) {
    await this.page.locator(this.getQuestionCard(question)).isVisible();
  }

  async expandQuestion(question) {
    await this.page.locator(this.getQuestionCard(question)).click();
  }

  async validateAnswer(question, answer) {
    await expect(this.page.locator(this.getAnswer(question))).toHaveText(answer);
  }

  async validateQuestionsQuantityText(quantity) {
    let message = 0;
    switch (quantity) {
      case 0:
        message = 'no questions';
        break;
      case 1:
        message = '1 question';
        break;
      default:
        message = `${quantity} questions`;
    }
    await expect(this.sidebar).toHaveText(`Here you can find ${message}. Feel free to create your own questions!`);
  }
};
