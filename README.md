# nxko

A yeoman generator for buiding components for

\| **n** Node \| **x** Express \| **k** Knex \|  **o** Objection

projects

## Setup

1. Install [yeoman](http://yeoman.io/) and install the nxplus generator

  ```sh
  npm install -g yo
  npm install -g generator-nxko
  ```

2. Run the nxplus generator to see the cli commands
  ```sh
  yo nxko
  ```

3. Inside the root of a node project
  ```sh
  yo nxko:«scaffold-command»
  ```


## Scaffold Commands

#### `:auth`

Generates scaffolding for passport authentication

  ```sh
  yo nxkplus:auth
  ```

- Installs npm application dependencies:
  - passport
  - passport-local
  - objective
  - cookie-session
  - cookie-parser
  - bcryptjs

- Creates the following folders + files in `src/`

  ```
  models/
    + User.js

  routers/
      + authRouter.js

  controllers/
      + authController.js

  helpers/
    + handleDbError.js
    + passport-local--sessionActions.js

  middleware/
    + auth--getUserByEmail.js
    + auth--saveNewUser.js
    + passport-local--registerLocalStrategy.js
  ```

- Requires additional configuration.

#### `:react`

Generates scaffolding for react

  ```sh
  yo nxkplus:react
  ```

- Installs npm application dependencies:
  - react
  - react-dom
  - react-router
  - cookie-session

- Installs npm developer dependencies for transpilation:
  - webpack
  - babel-core
  - babel-loader
  - babel-plugin-transform-class-properties
  - babel-plugin-transform-es2015-modules-commonjs
  - babel-preset-env
  - babel-preset-react

- Creates `.babelrc` and `webpack.config.js` files

- Creates the following folders + files in `src/`

  ```
  views/
    + reactApp.js

  client/
    + js/
      + App.js
  ```

- Requires additional configuration.
