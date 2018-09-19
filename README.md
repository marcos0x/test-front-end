# MercadoLibre Test Front-End

### Development mode

In the development mode, we will have 2 servers running. The front end code will be served by the [webpack dev server](https://webpack.js.org/configuration/dev-server/) which helps with hot and live reloading. The server side Express code will be served by a node server using [nodemon](https://nodemon.io/) which helps in automatically restarting the server whenever server side code changes.

### Production mode

In the production mode, we will have only 1 server running. All the client side code will be bundled into static files using webpack and it will be served by the Node.js/Express application.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/marcos0x/test-front-end

# Go inside the directory
cd test-front-end

# Install dependencies
yarn (or npm install)

# Start development server
yarn dev (or npm run dev)

# Build for production
yarn build (or npm run build)

# Start production server
yarn start (or npm start)
```

## Documentation

### Folder Structure

All the source code will be inside **src** directory. Inside src, there is client and server directory. All the frontend code (react, css, js and any other assets) will be in client directory. Backend Node.js/Express code will be in the server directory.

### Babel

[Babel](https://babeljs.io/) helps us to write code in the latest version of JavaScript. If an environment does not support certain features natively, Babel will help us to compile those features down to a supported version. It also helps us to convert JSX to Javascript.

[.babelrc file](https://babeljs.io/docs/usage/babelrc/) is used describe the configurations required for Babel. Below is the .babelrc file which I am using.

```javascript
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-syntax-dynamic-import",
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ],
  "env": {
    "test": {
      "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
      ],
      "plugins": [
        "babel-plugin-dynamic-import-node"
      ]
    }
  }  
}
```

Babel requires plugins to do the transformation. Presets are the set of plugins defined by Babel. Preset **env** allows to use babel-preset-es2015, babel-preset-es2016, and babel-preset-es2017 and it will transform them to ES5. Preset **react** allows us to use JSX syntax and it will transform JSX to Javascript.

### ESLint

[ESLint](https://eslint.org/) is a pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.

[.eslintrc.json file](<(https://eslint.org/docs/user-guide/configuring)>) (alternatively configurations can we written in Javascript or YAML as well) is used describe the configurations required for ESLint. Below is the .eslintrc.json file which I am using.

```javascript
{
  "parser": "babel-eslint",
  "extends": ["airbnb"],
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "jest": true
  },
  "globals": {
    "Promise": true,
    "fetch": false
  },
  "rules": {
    "global-require": 0,
    "indent": [2, 2, {
      "SwitchCase": 1
    }],
    "consistent-return": 0,
    "max-len": 0,
    "object-curly-newline": 0,
    "comma-dangle": 0,
    "camelcase": 0,
    "class-methods-use-this": 0,
    "no-unused-vars": 0,
    "no-else-return": 0,
    "no-tabs": 0,
    "no-console": 0,
    "no-warning-comments": [0, {
      "terms": ["todo", "fixme", "example"]
    }],
    "no-underscore-dangle": 0,
    "no-throw-literal": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": [2, {
      "ignore": ["testfrontend"]
    }],
    "import/extensions": [2, {
      "js": "never"
    }],
    "import/prefer-default-export": 0,
    "react/forbid-prop-types": 0,
    "react/no-unused-prop-types": 0,
    "react/require-default-props": 0,
    "react/jsx-indent": [2, 2],
    "react/jsx-indent-props": [2, 2],
    "react/jsx-filename-extension": [1, {
      "extensions": [".js", ".jsx"]
    }],
    "react/prefer-stateless-function": 0,
    "react/display-name": 0,
    "react/prop-types": 0,
    "react/destructuring-assignment": 0
  }
}
```

[I am using Airbnb's Javascript Style Guide](https://github.com/airbnb/javascript) which is used by many JavaScript developers worldwide. Since we are going to write both client (browser) and server side (Node.js) code, I am setting the **env** to browser and node. Optionally, we can override the Airbnb's configurations to suit our needs. I have turned off [**no-console**](https://eslint.org/docs/rules/no-console), [**comma-dangle**](https://eslint.org/docs/rules/comma-dangle) and [**react/jsx-filename-extension**](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md) rules.

### Webpack

[Webpack](https://webpack.js.org/) is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser.

### Webpack dev server

[Webpack dev server](https://webpack.js.org/configuration/dev-server/) is used along with webpack. It provides a development server that provides live reloading for the client side code. This should be used for development only.

[**Port**](https://webpack.js.org/configuration/dev-server/#devserver-port) specifies the Webpack dev server to listen on this particular port (3000 in this case). When [**open**](https://webpack.js.org/configuration/dev-server/#devserver-open) is set to true, it will automatically open the home page on startup. [Proxying](https://webpack.js.org/configuration/dev-server/#devserver-proxy) URLs can be useful when we have a separate API backend development server and we want to send API requests on the same domain. In our case, we have a Node.js/Express backend where we want to send the API requests to.

### Nodemon

Nodemon is a utility that will monitor for any changes in the server source code and it automatically restart the server. This is used in development only.

nodemon.json file is used to describe the configurations for Nodemon. Below is the nodemon.json file which I am using.

```javascript
{
  "watch": ["src/server/"]
}
```

Here, we tell nodemon to watch the files in the directory src/server where out server side code resides. Nodemon will restart the node server whenever a file under src/server directory is modified.

### Express

Express is a web application framework for Node.js. It is used to build our backend API's.

src/server/index.js is the entry point to the server application.

This starts a server and listens on port 8080 for connections. The app is configured to serve the static files from **dist** directory.

### Concurrently

[Concurrently](https://github.com/kimmobrunfeldt/concurrently) is used to run multiple commands concurrently. I am using it to run the webpack dev server and the backend node server concurrently in the development environment. Below are the npm/yarn script commands used.

```javascript
"client": "node scripts/start.js",
"server": "nodemon src/server/index.js",
"dev": "concurrently \"npm run server\" \"npm run client\""
```

### VSCode + ESLint + Prettier

[VSCode](https://code.visualstudio.com/) is a lightweight but powerful source code editor. [ESLint](https://eslint.org/) takes care of the code-quality. [Prettier](https://prettier.io/) takes care of all the formatting.

#### Installation guide

1.  Install [VSCode](https://code.visualstudio.com/)
2.  Install [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
3.  Install [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
4.  Modify the VSCode user settings to add below configuration

    ```javascript
    "eslint.enable": true,
    "eslint.alwaysShowStatus": true,
    "eslint.autoFixOnSave": false,
    "editor.formatOnSave": false,
    "prettier.tabWidth": 2,
    "prettier.eslintIntegration": true,
    "prettier.stylelintIntegration": true,
    "files.associations": {
      "*.js": "javascriptreact"
    },
    "files.exclude": {
      "**/.git": true,
      "**/.DS_Store": true
    }
    ```

Above, we have modified editor configurations. Alternatively, this can be configured at the project level by following [this article](https://medium.com/@netczuk/your-last-eslint-config-9e35bace2f99).

# Details
Source code is located in `/src`

Client code is located in `/src/client`

Server code and server-side render compilation is located in `/src/server`

Configuration is located in `/config`


Application is built with
* [React](https://github.com/facebook/react)
* [React Router](https://github.com/ReactTraining/react-router)

Application is compiled with
* [Webpack](https://github.com/webpack/webpack)
* [Babel](https://github.com/babel/babel)

Server is built with
* [Express](https://github.com/expressjs/express)

Code splitting made possible with
* [React Loadable](https://github.com/thejameskyle/react-loadable)

Testing done with
* [Jest](https://github.com/facebook/jest)

Type checking done with
* [Flow](https://github.com/facebook/flow)
* [Flow Typed](https://github.com/flowtype/flow-typed)

Linting and formatting done with
* [ESLint](https://github.com/eslint/eslint)
* [Stylelint](https://github.com/stylelint/stylelint)
* [Prettier](https://github.com/prettier/prettier)
