const rule = require("../../../lib/rules/font-color")
const RuleTester = require("eslint").RuleTester;

const valid = [
    {
        code: `Chart.defaults.global.defaultFontColor = 'red';`
    },
    {
        code: `Chart.defaults.global.defaultFontColor = '#000000';`
    },
    {
        code: `
        var chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        fontColor: 'black'
                    }
                }
            }
        });
        `
    },
    {
        code: `var obj = {
            fontColor: 'blue'
        }`
    }, {
        code: `
        {
            test: 'oups'
        }`,
    }
]
const invalid = [
    {
        code: `Chart.defaults.global.defaultFontColor = 'redddd';`,
        errors: [{
            message: `defaultFontColor: redddd is not a color`,
        }]
    }, {
        code: `Chart.defaults.global.defaultFontColor = '#0000000';`,
        errors: [{
            message: `defaultFontColor: #0000000 is not a color`,
        }]
    }, {
        code: `test.defaultFontColor = '#0000000';`,
        errors: [{
            message: `defaultFontColor: #0000000 is not a color`,
        }]
    }, {
        code: `
        {
            fontColor: 'oups'
        }`,
        errors: [{
            message: "fontColor: oups is not a color",
            type: "Literal"
        }]
    },
]

var ruleTester = new RuleTester();
ruleTester.run("font-color", rule, { valid, invalid });

module.exports = {
  valid,
  invalid
}
