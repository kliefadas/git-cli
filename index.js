#!/usr/bin/env node

const inquirer = require('inquirer');
const simpleGit = require('simple-git/promise');
const semver = require('semver');

const git = simpleGit();

async function init() {
  const tags = await git.tags();
  const latestTag = tags.latest
  const semverChoices = [
    'major',
    'minor',
    'patch'
  ]

  const generatedChoices = semverChoices.map(choice => choice + ' ' + semver.inc(latestTag, choice))
  generatedChoices.push('prev ' + tags.all[tags.all.length - 2])
  generatedChoices.push('other')

  const {branchName} = await inquirer.prompt([
    {
      type: 'list',
      name: 'branchName',
      message: 'Which type of an update you want to create?',
      choices: ['release', 'hotfix']
    }
  ])

  let version = semver.inc(latestTag, 'patch')
  let baseBranch = 'master'

  if (branchName === 'release') {
    const {tagVersion} = await inquirer.prompt([
      {
        type: 'list',
        name: 'tagVersion',
        message: 'Which version you want to create?',
        choices: generatedChoices
      }
    ]);
    const [choice, selectedVersion] = tagVersion.split(' ')
    version = selectedVersion

    if (choice === 'other') {
      const {customVersion} = await inquirer.prompt({
        type: 'input',
        name: 'customVersion',
        message: 'Which custom version you want to create?',
        validate(value) {
          if (!semver.valid(value)) {
            return 'version should be a valid semver value';
          }
          return true;
        }
      })
      version = customVersion
    }
    else if (choice !== 'prev') {
      const {selectedBaseBranch} = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedBaseBranch',
          message: 'Which base branch should the release have?',
          choices: ['develop', 'staging', 'master']
        }
      ])
      baseBranch = selectedBaseBranch
    }
  }
  await git.push('origin', `origin/${baseBranch}:refs/heads/${branchName}/${version}`)

  console.log(`Release ${branchName}/${version} got created based on ${baseBranch} branch`)
}

init()

