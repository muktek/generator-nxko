const Generator = require('yeoman-generator')
const chalk = require('chalk')

module.exports = class extends Generator  {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }

  initializing(){
    this.log('nxko - Generating Auth')
  }

  prompting(){}

  configuring(){}

  writing(){

    this._writeStaticFiles()
  }

  install(){
    console.log('installing packages...')
    this.npmInstall([
      'passport',
      'passport-local',
      'cookie-session',
      'cookie-parser',
      'objection',
      'knex',
      'express',
      'bcryptjs'], { 'save': true, 'save-exact': true });
  }

  end(){
    console.log('')
    console.log(`  ${chalk.yellow('Completion steps:')}`)
    console.log('')
    console.log('    (1) Creat the `users` table by executing the knex migration (for the create_users_table.js file)')
    console.log('')
    console.log('    (2) Import cookieSession, cookieParser, passport middleware, authRouter in server.js')
    console.log('')
    console.log('    (3) Configure cookieParser, cookieSession AFTER bodyParser in `server.js`')
    console.log('')
    console.log('    (4) Configure passport middleware AFTER cookieParser in `server.js`')
    console.log('')
    console.log('    (5) Configure `authRouter` to handle `/auth` routes AFTER passport config in `server.js`')
    console.log('')

  }

  _writeStaticFiles(){
    const userModelSrc = this.templatePath('./models/User.js')
    const userModelDest = this.destinationPath('./src/models/User.js')
    this.log('Populating', userModelDest)
    this.fs.copyTpl(userModelSrc, userModelDest)

    const authControllerSrc = this.templatePath('./controllers/authController.js')
    const authControllerDest = this.destinationPath('./src/controllers/authController.js')
    this.fs.copyTpl(authControllerSrc, authControllerDest)


    function dateStrZeroed(num){
      return num < 10 ? `0${num}` : num
    }

    let d = new Date()
    let yearStr = d.getFullYear()
    let monthStr = dateStrZeroed(d.getMonth()+1)
    let dateStr = dateStrZeroed(d.getDate())
    let hoursStr = dateStrZeroed(d.getHours())
    let minStr = dateStrZeroed(d.getMinutes())
    let secsStr = dateStrZeroed(d.getSeconds())

    let timestamp = `${yearStr}${monthStr}${dateStr}${hoursStr}${minStr}${secsStr}`

    const userMigrationSrc = this.templatePath('./database/migrations/_createUserTable.js')
    const userMigrationDest = this.destinationPath(`./src/database/migrations/${timestamp}_createUserTable.js`)
    this.fs.copyTpl(userMigrationSrc, userMigrationDest)




    const authRouterSrc = this.templatePath('./routers/authRouter.js')
    const authRouterDests = this.destinationPath('./src/routers/authRouter.js')
    this.fs.copyTpl(authRouterSrc, authRouterDests)


    const helpersSrc = this.templatePath('./helpers')
    const helpersDest = this.destinationPath('./src/helpers')
    this.fs.copy(helpersSrc, helpersDest)


    const middlewareSrc = this.templatePath('./middleware')
    const middlewareDest = this.destinationPath('./src/middleware')
    this.fs.copy(middlewareSrc, middlewareDest)


  }


}
