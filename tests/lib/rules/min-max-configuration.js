const rule = require("../../../lib/rules/min-max-configuration")
const RuleTester = require("eslint").RuleTester;

const valid = [
    { // https://www.chartjs.org/docs/latest/axes/cartesian/category.html#min-max-configuration
        code: `
            new Chart(ctx, {
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June']
                },
                options: {
                    scales: {
                        xAxes: [{
                            ticks: {
                                min: 'March'
                            }
                        }]
                    }
                }
            });`
    }, {
        code: `
            new Chart(ctx, {
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June']
                },
                options: {
                    scales: {
                    }
                }
            });`
    }, {
        code: `
            new Chart(ctx, {
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June']
                },
                options: {
                }
            });`
    }, {
        code: `
            new Chart(ctx, {
                test: {
                },
                other: {
                },
            });`
    }, {
        code: `
        new Chart(ctx, {
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June']
            },
            options: {
                scales: {
                    xAxes: []
                }
            }
        });`
    },
]
const invalid = [
    {
        code: `new Chart(ctx, {
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June']
            },
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            min: ' March '
                        }
                    }]
                }
            }
        });`,
        output: `new Chart(ctx, {
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June']
            },
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            min: 'March'
                        }
                    }]
                }
            }
        });`,
        errors: [{
            message: `msg`,
        }]
    },
]

var ruleTester = new RuleTester();
ruleTester.run("min-max-configuration", rule, { valid, invalid });

module.exports = {
  valid,
  invalid
}
