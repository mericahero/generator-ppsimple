var Generator = require('yeoman-generator')
var inquirer = require('inquirer')
var pascalCase = require('pascal-case')
var chalk = require('chalk')
var mkdirp = require('mkdirp')
class PPSimpleGenerator extends Generator {
  // The name `constructor` is important here
  constructor(props, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(props, opts)

    if(this.fs.exists('.yo-rc.json')){
      this.log(chalk.bold.green('资源已经初始化，退出...'));
      process.exit(1)
    }
    // Next, add your custom code
    this.option('babel')

    this.argument('appname', {
      type: String,
      required: false,
      default: 'SimpleProject'
    })
    this.appname = this.app_name || this.appname;
    this.appname = pascalCase(this.appname);

    this.env.options.appPath = this.options.appPath || 'app';
    this.config.set('appPath', this.env.options.appPath);

    this.config.defaults({
      appName: this.appname
    });
  }

  prompting() {
    return this.prompt([{
        type: 'input',
        name: 'name',
        message: 'Type your project name',
        default: this.appname
      },
      {
        type: 'confirm',
        name: 'vue',
        message: 'Would you like to use the VUE',
        default: true
      },
      {
        type: 'checkbox',
        name: 'features',
        message: 'What more would you like',
        choices: [{
          name: 'use eslint to optimize your code.',
          value: 'eslint',
          checked: true
        }, {
          name: 'use git to orgnize your code.',
          value: 'git',
          checked: true
        }, {
          name: 'use postcss to make css better.',
          value: 'postcss',
          checked: true
        }]
      }
    ]).then((answers) => {
      let hasFeature = (x) => {
        return answers.features.indexOf(x) >= 0
      }
      this.appname = pascalCase(answers.name)
      this.options.vue = answers.vue
      this.options.eslint = hasFeature('eslint')
      this.options.git = hasFeature('git')
      this.options.postcss = hasFeature('postcss')
    })
  }


  _extendPkg(opt) {
    this.fs.extendJSON(this.destinationPath('package.json'), opt)
  }

  writing() {
    let vue = () => {
      this._extendPkg({
        dependencies: {
          vue: '^2.0.0'
        }
      })
    }
    let git = () => {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      )
    }
    let eslint = () => {
      this._extendPkg({
        devDependencies: {
          eslint: '^3.15.0'
        }
      })
      this.fs.copy(
        this.templatePath('eslintignore'),
        this.destinationPath('.eslintignore')
      )
      this.fs.copy(
        this.templatePath('eslintrc.js'),
        this.destinationPath('.eslintrc.js')
      )
      this.fs.copy(
        this.templatePath('eslintrc.json'),
        this.destinationPath('.eslintrc.json')
      )
    }

    let postcss = () => {
      this.fs.copy(
        this.templatePath('postcssrc.js'),
        this.destinationPath(".postcssrc.js")
      )
    }

    let buildFile = () => {
      this.fs.copy(
        this.templatePath('build/**/*.*'),
        this.destinationRoot('build')
      )
    }
    this.log(chalk.bold.yellow(this.appname))
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        appname: this.appname.toLowerCase()
      }
    )
    this.options.git && git()
    this.options.vue && vue()
    this.options.eslint && eslint()
    this.options.postcss && postcss()
    buildFile()
  }

  install() {
    // this.npmInstall()
  }
}

module.exports = PPSimpleGenerator