const Generator = require('yeoman-generator')
const chalk = require('chalk')

module.exports = class extends Generator  {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }
  initializing(){
    this.log('NKRP - Generating React Configuration')
  }

  writing(){
    this._writeStaticFiles()
  }


  install(){
    this.npmInstall([
      'react@16.1.0',
      'react-dom@16.1.0',
      'react-router-dom@4.2.0',
    ], { 'save': true, 'save-exact': true });

    this.npmInstall([
      "webpack@3.8.1",
      "babel-core@6.26.0",
      "babel-loader@7.1.2",
      "babel-plugin-transform-class-properties@6.24.1",
      "babel-plugin-transform-es2015-modules-commonjs@6.26.0",
      "babel-preset-env@1.6.1",
      "babel-preset-react@6.24.1"
    ], { 'save-dev': true, 'save-exact': true });

  }


  end(){
    console.log(`  ${chalk.yellow('Completion steps:')}`)
    console.log(``)
    console.log(`    (1) you must execute 'res.render('reactApp.ejs')' in app.use(...) after other routes `)
    console.log(`         after all other routes`)
    console.log(``)
    console.log(`    (2) Write components in the './src/client/components' and import into 'App.js'`)
    console.log(``)
    console.log(`    (3) Add developement build command to package.json "scripts" : `)
    console.log(``)
    console.log(`         "dev": "npm-run-all --parallel dev:server dev:webpack"`)
    console.log(`         "dev:webpack": "NODE_ENV=development ./node_modules/.bin/webpack --watch"`)
    console.log(`         "dev:server": "NODE_ENV=development nodemon server.js --watch src --watch server.js --ignore src/client"`)
    console.log(``)
    console.log(`    (4) Add production build command to package.json "scripts" : `)
    console.log(``)
    console.log(`         "build" : "NODE_ENV=production node_modules/.bin/webpack -p"`)
    console.log(``)


  }

  _writeStaticFiles(){
    const webpackSrc = this.templatePath('./webpack.config.js')
    const webpackDist = this.destinationPath('./webpack.config.js')
    this.fs.copyTpl(webpackSrc, webpackDist)

    const babelSrc = this.templatePath('./.babelrc')
    const babelDst = this.destinationPath('./.babelrc')
    this.fs.copyTpl(babelSrc, babelDst)


    const reactEjsSrc = this.templatePath('./views/reactApp.ejs')
    const reactEjsDest = this.destinationPath('./src/views/reactApp.ejs')
    this.fs.copyTpl(reactEjsSrc, reactEjsDest)


    const authRouterSrc = this.templatePath('./client')
    const authRouterDests = this.destinationPath('./src/client')
    this.fs.copy(authRouterSrc, authRouterDests)

  }

}
