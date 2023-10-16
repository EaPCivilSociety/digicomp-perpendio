# Digital Competence Self-assessment tool


This tool assists civil society organisations and movements in their journey to increase their digital competence, to better respond to the needs, identities and backgrounds of their people. The tool is designed around the [EU Digital Competence Framework](https://joint-research-centre.ec.europa.eu/digcomp/digcomp-framework_en). 

This tool provides a snapshot of where your organisation lies on the maturity model spectrum, with suggestions on how to grow in areas that need attention. It is not a rating or certification platform: we believe there is no "stamp of achievement" that an organisation can claim for "sufficient digital competence."

We hope that this tool will support civil society organisations in becoming inspiring role-models and champions of digital competence in their communities, helping in the process our common mission of building a better, fairer, more socially just and kind world.

## Process overview


This is a self-evaluation app based on the concept of the maturity model, inspired by Linda Raftree's work on the [Responsible Data Maturity Model](https://lindaraftree.com/2019/10/17/a-responsible-data-maturity-model-for-non-profits/). The maturity model is self-reflective: instead of asking questions, it presents statements that describe a certain level of organisational maturity with regards to a category, like program development or infrastructure. Through a series of collaborative design rounds with audience representatives, the statements have been crafted and assigned to a _maturity level:_

- Unaware
- Ad-Hoc
- Developing
- Mastering
- Leading

### Assigning values to statements

For each statement, you are asked to express how much that statement resonates with your organisation's experience:

- Not at all
- Somewhat
- Very Much
- Doesn't apply


## Analysing your assessment

The core feature of the website is a table where rows represent maturity categories, and columns represent maturity levels. On this overview, you can:
- See a snapshot of your current progress and deep dive into single categories
- Filter the results by diversity thematic areas
- Assign maturity goals for each category
- Save your progress
- Export your entire assessment as a PDF:

### Saving and exporting

When saving, you are given a code to paste somewhere safe. Since this tool doesn't collect any data by design, the only way to come back to your progress is by enteringentering the code on the homepage.

If you export your progress as a PDF, you will find the code on the front page for easy copying and pasting.

We designed the PDF export as a comprehensive Maturity Plan that you can use in meetings and workshops, when sitting down with you manager, or simply to doodle through it while planning your strategy. Keep in mind that it's about 50 pages long and is generated in real time, so your browser might get a bit slow for 5 seconds.

## Data Structure

### Adding and updating categories, statements and other data

All of the data that application is using is pulled from the following files at build time:

```
src/
  data/
    categories.yml
    languages.yml
    maturity-levels.yml
    resources.yml
    statements.yml
    tags.yml
```

All of the data files except `resources.yml` are localized with multiple languages defined directly on each data entity.

**Important: When adding a new statement, it has to be appended to the end of the file or the old saved results won't work. Statements shouldn't be deleted or moved.**

### User interface localization

Different user interface translations are located in:

```
src/
  i18n/
    en.ts
    es.ts
    fr.ts
```

When adding a language:

- add the new translation file in `/src/i18n` directory with the language ISO code
- add the import to `/src/i18n/index.ts`
- add the new language to `/src/data/languages.yml`
- add the new language to `/src/i18n/index.ts`

Missing translations will fall back to english language.

### Storing user data

No data is ever stored remotely. Answers and goals are stored in the client browser's local storage so users can continue where they left and is cleared by clicking "Restart Assessment".

Users are able to export a code from the system that they can import on another computer or browser to share results or continue the assessment. The generated code is an export of all answers and goals in compressed base64 encoded format.

## Development

This is a TypeScript [React](https://reactjs.org/) web application using the following main components:

- [React Router](https://reactrouter.com/web/guides/quick-start) for navigation
- [Redux](https://react-redux.js.org/) for global state management
- [React Intl](https://formatjs.io/docs/react-intl/) for localization
- [React PDF](https://github.com/diegomura/react-pdf) for generating PDFs

**Directory structure**

All the javascript code is organized in `src` directory.

```
src/
  components/         - reusable components which are used by more than one module.
  data/               - statement, category, maturity level, etc. data.
  hooks/              - reusable hooks.
  i18n/               - user interface internalization files.
  images/             - logos, icons, and other image assets.
  pages/              - web pages organized into separate directories.
  store/              - redux store, actions, reducers, and selectors.
  styles/             - scss style files.
  utils/              - global helper functions.
```

**Setting up development**

- clone the repo
- run `yarn install`

**Running the app locally**

- run `yarn`

---

### Acknowledgments

This tool was originally commissioned by [CIVICUS](https://www.civicus.org/) for their Diversity and Inclusion program [DIGNA](https://github.com/CIVICUSDIGNA/diversitytool). Development of the initial codebase was done by [INIT](https://init.hr/).
