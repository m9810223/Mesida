# Mesida


## environment variables
- npm_package_config_`windowVar`: global variable name, set in package.json
- npm_package_config_`port`: port number for http-server, set in package.json
- NODE_ENV: `production` or `development`


## tools in package.json scripts
- webpack
- http-server: serve file
- prettier: formatter
- eslint: linter, configed with airbnb style
- jest: test


## package.json scripts
- preview in dev: `yarn dev ${siteId}`
- build: `yarn webpack ${siteId}`
- format js files: `yarn prettier:fix`
- lint: `yarn eslint`
- test: `yarn jest`
- ci test: `yarn test`


## global variables

variables:
- `__WINVAR__`: global variable
- `__NAME__`: name in package.json
- `__VERSION__`: version in package.json
- `__MODE__`: NODE_ENV in package.json sciprts 
- `__SITEID__`: site id for build or develop

configed in:
- [webpack](./configs/webpack.config.js)
- [eslint](./.eslintrc.js)
- [jest](./configs/jest.config.js)


# directory structure

## main


## devtool


## examples
- [inject script](./examples/inject.js)
- [site code 1](./src/sites/1/index.js)
- [site code 2](./src/sites/2/index.js)


## core
- Cart
  - Product
    - Variant
- Storage
  - Storages: Cookie, LocalStorage, SessionStorage
  - JsonObjectStorage -> store all data in one object, and store the object in one entry
  - SingleEntryStorage -> store one data in one entry
- Logger
- Site
  - Triggers: PageView, HistoryPush, HashChange, DOMLoad, WindowLoad
    - TriggerEvent
- Tracker
  - Publishers: FacebookBasecode, GoogleAnalytics, ...


## test
test files


## sites
