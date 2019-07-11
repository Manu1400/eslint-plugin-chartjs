# eslint-plugin-chartjs [![Build Status](https://travis-ci.org/Manu1400/eslint-plugin-chartjs.svg?branch=master)](https://travis-ci.org/Manu1400/eslint-plugin-chartjs)

Eslint plugin for the librairy Chart.js

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-chartjs`:

```
$ npm install eslint-plugin-chartjs --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-chartjs` globally.

## Usage

Add `chartjs` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "chartjs"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "chartjs/font-color": "warn",
        "chartjs/min-max-configuration": "warn",
    }
}
```

## Supported Rules

- font-color
- min-max-configuration

<!-- begin rule list -->

**Key**: :heavy_check_mark: = recommended, :wrench: = fixable

<!-- prettier-ignore -->
| Name | Description | :heavy_check_mark: | :wrench: |
| ---- | ----------- | ------------------ | -------- |
| [`chartjs/font-color`](./docs/rules/font-color.md) | check option `defaultFontColor` and `fontColor` |  |  |
| [`chartjs/min-max-configuration`](./docs/rules/min-max-configuration.md) | min max configuration |  | :wrench: |

<!-- end rule list -->
