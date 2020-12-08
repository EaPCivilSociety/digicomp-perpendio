# Self-assessment tool on Diversity & Inclusion

This tool assists civil society organisations and movements in their journey to become more inclusive, diverse and sensitive to the needs, identities and backgrounds of their people. We believe in peoples\' best intentions to reflect on themselves, their culture and practices, engaging in difficult dialogues when necessary. \n\nInteracting with this tool is not a panacea for solving discrimination, racism or workplace harassment. Rather, it provides a snapshot of where your organisation lies on the maturity model spectrum, with suggestions on how to grow in areas that need attention. It is not a rating or certification platform: we believe there is no "stamp of achievement" that an organisation can claim for "sufficient diversity."\n\nWe hope that this tool will support civil society organisations in becoming inspiring role-models and champions of diversity & inclusion in their communities, helping in the process our common mission of building a better, fairer, more socially just and kind world.

### Process overview

Users are presented with a series of predefined statements which they answer with one of the predefined answers. System collects all of the answers and calculates the state of D&I for each of the answered catagories.

Users are able to set their goal for a category.

...

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

No data is ever sent to the server. Answers and goals are stored to the client browser local storage so users can continue where they left and is cleared by clicking "Restart Assessment".

Users are able to export a code from the system that they can import on another computer or browser to share results or continue the assessment. The generated code is an export of all answers and goals in compressed base64 encoded format.

### Development

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
