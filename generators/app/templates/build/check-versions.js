let chalk =require('chalk')
let semver = require('semver')
let packageConfig =require('../package.json')

function exec(cmd){
    return require('child_process').execSync(cmd).toString().trim()
}



let versionRequirements = [
    {
        name: 'node',
        currentVersion: semver.clean(process.version),
        versionRequirements: packageConfig.engines.node
    },
    {
        name: 'npm',
        currentVersion: exec('npm --version'),
        versionRequirements: packageConfig.engines.npm
    }
]

module.exports=function(){
    let warnings=[]
    for(let mod of versionRequirements){
        if(semver.satisfies(mod.currentVersion,mod.versionRequirements)) continue
        warnings.push(`${mod.name}:${chalk.red(mod.currentVersion)} should be ${chalk.green(mod.versionRequirements)}`)
    }
    if(warnings.length){
        console.log('')
        console.log(chalk.yellow('To use this template, you must update following modules'))
        console.log('')
        for(var warn of warnings){
            console.log('  '+warnings)
        }
        console.log('')
        process.exit(1)
    }
}