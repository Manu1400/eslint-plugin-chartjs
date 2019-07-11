'use strict';

const {validateHTMLColorName, validateHTMLColor} = require('validate-color')

const create = context => {

	return {
        "AssignmentExpression[operator][left.property.name='defaultFontColor']": node => {
            const {right} = node;
            const color = right.value

            if (validateHTMLColorName(color) || validateHTMLColor(color)) {
                return;
            }
            // TODO: forbiden white color
            
            context.report({
                node,
                message: `defaultFontColor: {{ color }} is not a color`,
                data: {
                    color
                }
            });
        },
        "LabeledStatement[label.name='fontColor'] ExpressionStatement[expression.value]": node => {
            const color = node.expression.value

            if (validateHTMLColorName(color) || validateHTMLColor(color)) {
                return;
            }
            context.report({
                node: node.expression,
                message: `fontColor: {{ color }} is not a color`,
                data: {
                    color
                }
            });
        },
	};
};

module.exports = {
	create,
	meta: {
		docs: {
            description: "check option `defaultFontColor` and `fontColor`",
        },
        messages: {},
        schema: []
	}
};
