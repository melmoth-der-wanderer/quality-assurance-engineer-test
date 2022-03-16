## The awesome Q/A tool Automation
Test execution results: [![Allure Report](https://img.shields.io/badge/Allure%20Report-deployed-yellowgreen)](https://melmoth-der-wanderer.github.io/quality-assurance-engineer-test/)

Project: The awesome Q/A tool

#### User Flows
Described here: https://miro.com/app/board/uXjVOFTuoTs=/
(if it will not open, PDF version is also provided: `user_flow.pdf`)

#### Technology
Playwright, Allure Report, Eslint, Faker

#### Browsers
Chrome, Firefox, Safari

#### Local Set Up

Clone the repository to your local computer
```
git clone https://github.com/melmoth-der-wanderer/quality-assurance-engineer-test.git
```

Use the package manager `npm` to install dependencies:
```
npm install
```

Run the UI automation tests in parallel (Chrome, Firefox, Safari):
```
npm test
```
(please note, that this command also runs web-server inside)

Run the UI automation tests in headful mode using 1 worker:
```
npm run debug
```
(please note, that this command also runs web-server inside)

Get the report:
```
npm run report
```
---

#### Notes:

- Without product requirements it is impossible to assure that these use cases are completely correct and provide full coverage;
- Priority of these use cases can be changed with product owner and developer assistance;
- Have been used a combination of standard assertions and snapshot ones;
- Structure and selected test scenarios must be discussed via pull-request procedure with a team;
- Preferably, existent tests should be written in the lower layer, as there are no integrations at all. But the goal of this project was to show competence in e2e tests creation;
- There is no API provided in that demo-app. In reality API opens a lot of possibilities to make tests better (for example: authentication via API, items list manipulating, etc);
- Mobile emulation is also possible, but wasn't considered in this project as it is completely adaptive.