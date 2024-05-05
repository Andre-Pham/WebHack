# WebHack
MAC x Atlassian: WebHack

## Commands

To run:

```
$ npm run dev
```

To prettify:

```
$ npx prettier . --write
```

To build for production:

```
$ npm run build
$ cd dist
$ serve
```

To publish to web:

```
$ npm run deploy
```

## Project Setup

#### Creating a New Project

Where you want the project to be created, run:

```
$ npm create vite@latest
```

Select project name, package name, framework. For variant, TypeScript should be fine.

Then in the **project directory**:

```
$ npm install
```

You're now ready to go. To run the project, run:

```
$ npm run dev
```

#### Adding Prettier

First in the project directory, run:

```
$ npm install prettier
```

Then in the project root directory, create a file called `.prettierrc`. Add the following contents:

```json
{
    "tabWidth": 4,
    "semi": true,
    "useTabs": false,
    "singleQuote": false,
    "bracketSameLine": false,
    "printWidth": 120
}
```

Then you can run:

```
$ npx prettier . --write
```

#### Adding Icons

```
$ npm install @mdi/react @mdi/js
```

#### Adding CSS in JS

```
$ npm install styled-components
```

#### Adding Redux

```
$ npm install redux react-redux --legacy-peer-deps
```

```
$ npm install @reduxjs/toolkit
```

#### Adding Types

For things like downloads.

```
$ npm install --save-dev @types/node
```

#### Adding Navigation

```
$ npm install react-router-dom
```

#### Production Builds

```
$ npm run build
```

You need `serve` to run a production build on your local machine. To install, run:

```
$ npm install -g serve
```

Then to serve, in the `dist` directory:

```
$ serve
```

