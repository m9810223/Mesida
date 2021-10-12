# Mesida

> A site event tracking framework.

## Environment Variables

- NODE_ENV: `development` (default) / `production`
- `npm_package_config_windowVar`: global variable name, set in package.json
- `npm_package_config_port`: port number for http-server, set in package.json

## Tools in Npm Scripts

- webpack
- http-server: serve file
- prettier: formatter
- eslint: linter, configed with airbnb style
- jest: test

## Npm Scripts

- preview in dev: `yarn dev ${siteId}`
- build: `yarn webpack ${siteId}`
- format js files: `yarn prettier:fix`
- lint: `yarn eslint`
- test: `yarn jest`
- ci test: `yarn test`

## Global Variables

variables:

- `__WINVAR__`: global variable
- `__NAME__`: name in package.json
- `__VERSION__`: version in package.json
- `__MODE__`: NODE_ENV in package.json sciprts

configed in:

- [webpack](./configs/webpack.config.js)
- [eslint](./.eslintrc.js)
- [jest](./configs/jest.config.js)

## Alias

- `'core'`: `'./src/core'`

configed in:

- [webpack](./configs/webpack.config.js)
- [eslint](./.eslintrc.js)
- [jest](./configs/jest.config.js)
- [jsconfig](./jsconfig.json)

## Directory Structure

### examples

- [inject script](./examples/inject.js)
- [site code 1](./src/sites/1/index.js)
- [site code 2](./src/sites/2/index.js)

### core

- Logger
- Site
  - Triggers: PageView, HistoryPush, HashChange, DOMLoad, WindowLoad
    - TriggerEvent
- Storage
  - Storages: Cookie, LocalStorage, SessionStorage
  - JsonObjectStorage -> store all data in one object, and store the object in one entry
  - SingleEntryStorage -> store one data in one entry
- Cart
  - Product
    - Variant
- Tracker
  - Publishers: FacebookBasecode, GoogleAnalytics, ...

### sites
