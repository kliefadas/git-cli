# git-cli

## Getting started

Creating interactive releases and hotfixes on remote.

### Project configuration
 
 Start by cloning this project on your workstation.
 
 ```bash
 $ git clone https://github.com/kliefadas/git-cli.git git-cli
 ```
 
 The next thing will be to install all the dependencies of the project using [npm](https://www.npmjs.com/get-npm):
 
 ```bash
 $ cd ./git-cli
 $ npm install
 $ npm link
 ```
### Usage

with "npm link" you made this cli globally available. Now you can navigate into your git projects and run `git-cli`

 ```bash
 $ cd ./some-git-project
 $ git-cli
 ```


## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
