'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')

module.exports = class extends Generator {
  // note: arguments and options should be defined in the constructor.
  constructor (args, opts) {
    super(args, opts)

    // // This makes `appname` argument.
    this.argument('appname', {type: String, required: false, description: 'app name'})
    // // And you can then access it later; e.g.
    this.log(this.options.appname)
  }

  initializing () {
    this.props = {}
    this.pkg = require('../../package.json')
  }

  prompting () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the best ' + chalk.red('generator-cmmc-netpie-webapp') + ' generator!'
    ))

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.options.appname || this.appname // Default to current folder name
    }, {
      type: 'confirm',
      name: 'cool',
      message: 'Would you like to enable the Cool feature?'
    }]

    return this.prompt(prompts).then(answers => {
      // To access props later use this.props.someAnswer;
      this.log('app name', answers.name)
      this.log('cool feature', answers.cool)
      this.props = answers
    })
  }

  default () {
    this.log(`this is default.`)
  }

  writing () {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    )
  }

  install () {
    this.installDependencies()
  }
}
