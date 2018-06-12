var Generator = require('yeoman-generator')
var inquirer = require('inquirer')
var pascalCase = require('pascal-case')
var mkdirp = require('mkdirp')
class PPSimpleGenerator extends Generator {
  // The name `constructor` is important here
  constructor(props, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(props, opts)

    this.option('coffe', {
      type: String
    })

    this.option('test-framework', {
      desc: 'Choose test framework. mocha/jasmine',
      type: 'String',
      defaults: 'mocha'
    });

    // Next, add your custom code
    this.option('babel') // This method adds support for a `--babel` flag

    this.argument('appname', {
      type: String,
      required: true
    })
    this.appname = this.app_name || this.appname;
    this.appname = pascalCase(this.appname);
  }

  writing() {
    let extendpkg=()=>{
      const pkgJson = {
        devDependencies: {
          eslint: '^3.15.0'
        },
        dependencies: {
          vue: '^2.0.0'
        }
      }
      this.fs.extendJSON(this.destinationPath('package.json'), pkgJson)
    }
    let git=()=>{
      
    }


    extendpkg()
    git()

  }

  install() {
    this.npmInstall()
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
        name: 'cool',
        message: 'Would you like to use the Cool Feature'
      },
      {
        type: 'checkbox',
        message: 'Select toppings',
        name: 'toppings',
        choices: [
          new inquirer.Separator(' = The Meats = '), {
            name: 'Pepperoni'
          }, {
            name: 'Ham'
          }, {
            name: 'Ground Meat'
          }, {
            name: 'Bacon'
          },
        ]
      },
    ]).then((answers) => {
      this.log('app name:' + answers.name)
      this.log('cool:' + answers.cool)
      this.log('toppings: ' + answers.toppings)
    })
  }

  m1() {
    this.log('m1')
  }

  m2() {
    this.log('m2')
  }

}

module.export = PPSimpleGenerator