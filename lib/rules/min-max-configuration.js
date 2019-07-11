'use strict';

const create = context => {

    const getPropertyByName = function (name, properties) {
        return properties.filter(function (property) {
            return (property.key.name == name)
        })[0]
    }

    const getLabels = function (property) {
        const { value } = property || {}
        const { elements } = value || {elements: []}
        return elements.map(function (element){
            return element.value
        })
    }
    const getLabelPropery = function (properties) {
        const dataProperty = getPropertyByName("data", properties)

        if (dataProperty && dataProperty.value) {
            return getPropertyByName("labels", dataProperty.value.properties)
        }
    }

    const getMinNode = function (properties) {
        const optionsProperty = getPropertyByName("options", properties)
        if (optionsProperty === false) {
            return;
        }
        if (optionsProperty && optionsProperty.value) {
            const scales = getPropertyByName("scales", optionsProperty.value.properties)
            if (scales && scales.value) {
                const xAxes = getPropertyByName("xAxes", scales.value.properties)
                if (xAxes && xAxes.value) {
                    if (xAxes.value.elements.length) {
                        const ticks = getPropertyByName("ticks", xAxes.value.elements[0].properties)
                        return getPropertyByName("min", ticks.value.properties)
                    }
                }
            }
        }
        return;
    }

	return {
        "ObjectExpression[properties.length>1]": node => {
            const properties = node.properties
            const labelProperty = getLabelPropery(properties)
            const labels = getLabels(labelProperty)
            const minNode = getMinNode(properties)
            if (typeof minNode === "undefined") {
                return;
            }
            const min = minNode.value.value

            if (labels.includes(min)) {
                return;
            }
            
            context.report({
                node: minNode.value,
                message: `msg`,
                fix: function(fixer) {
                    return fixer.replaceText(minNode.value, `'${min.trim()}'`)
                }
            });
        },
	};
};

module.exports = {
	create,
	meta: {
		docs: {
            description: "min max configuration",
        },
        fixable: 'code'
	}
};
