# Clean code Api JS - [![Build Status][travis-img]][travis-url]

<br>

![GitHub package.json version][version-img]
![GitHub top language][language-img]
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![GitHub license][license-img]][license-url]
![GitHub last commit][commit-img]

<br>

> API em JavaScript - NodeJS com Clean Architecture e TDD.

<br>

# Comandos NPM

```sh
## iniciando o package.json padrão.
npm init -y
```

```sh
## instalando packages global.
npm i -g standard lint-staged husky jest.
```

```sh
## instalando packages dev.
npm i standard lint-staged husky@next jest -D
```

```sh
## configurando o husky
npm set-script prepare "husky install"
npm run prepare
```

```sh
## adicionando Hooks
npx husky add .husky/pre-commit "lint-staged"
npx husky add .husky/pre-push "npm run test:ci"
```

<br>

# Versions

<br>

![npm][npm-img] ![node-current](https://img.shields.io/node/v/latest-version)

<br>

# Dev Dependencies

| Package                   | NPMJS                                     | Shields                                                                        |
| ------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------ |
| Husky                     | https://www.npmjs.com/package/husky       | ![GitHub package.json dependency version (dev dep on branch)][husky-img]       |
| Jest                      | https://www.npmjs.com/package/jest        | ![GitHub package.json dependency version (dev dep on branch)][jest-img]        |
| lint-staged               | https://www.npmjs.com/package/lint-staged | ![GitHub package.json dependency version (dev dep on branch)][lint-staged-img] |
| JavaScript Standard Style | https://www.npmjs.com/package/standard    | ![GitHub package.json dependency version (dev dep on branch)][standard-img]    |

<!-- Markdown link & images -->

[version-img]: https://img.shields.io/github/package-json/v/martins86/nodejs-api-js-clean-code
[language-img]: https://img.shields.io/github/languages/top/martins86/nodejs-api-js-clean-code
[license-img]: https://img.shields.io/github/license/martins86/nodejs-api-js-clean-code
[license-url]: https://github.com/martins86/nodejs-api-js-clean-code/blob/main/LICENSE
[travis-img]: https://app.travis-ci.com/github/martins86/nodejs-api-js-clean-code.svg?branch=main
[travis-url]: https://app.travis-ci.com/github/martins86/nodejs-api-js-clean-code
[commit-img]: https://img.shields.io/github/last-commit/martins86/nodejs-api-js-clean-code
[npm-img]: https://img.shields.io/npm/v/npm
[husky-img]: https://img.shields.io/github/package-json/dependency-version/martins86/nodejs-api-js-clean-code/dev/husky
[jest-img]: https://img.shields.io/github/package-json/dependency-version/martins86/nodejs-api-js-clean-code/dev/jest
[lint-staged-img]: https://img.shields.io/github/package-json/dependency-version/martins86/nodejs-api-js-clean-code/dev/lint-staged
[standard-img]: https://img.shields.io/github/package-json/dependency-version/martins86/nodejs-api-js-clean-code/dev/standard
