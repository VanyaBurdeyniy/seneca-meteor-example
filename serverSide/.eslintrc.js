module.exports = {
	"env": {
		"es6": true,
		"node": true,
	},
	"parserOptions": {
		"ecmaVersion": 6,
		"ecmaFeatures": {
			"spread": true,
			"experimentalObjectRestSpread": true
		}
	},
	"extends": [
		"eslint:recommended"
	],
	"rules": {
		"indent": [
			"warn",
			4
		],
		"quotes": [
			"warn",
			"single", {
				"allowTemplateLiterals": true
			}
		],
		"no-console": [
			"warn"
		],
		"semi": [
			"warn",
			"always"
		],
		"keyword-spacing": [
			"warn"
		],
		"strict": [
			"error",
			"global"
		],
		"no-unused-vars": "warn",
		"prefer-const": "warn",
		"no-const-assign": "error",
		"no-var": "error",
		"no-new-object": "warn",
		"prefer-arrow-callback": [
			"warn", {
				"allowNamedFunctions": true,
				"allowUnboundThis": true
			}
		],
		"object-shorthand": [
			"warn",
			"always", {
				"avoidQuotes": true
			}
		],
		"no-array-constructor": "warn",
		"no-new-func": "warn",
		"space-before-blocks": "warn",
		"arrow-parens": ["error", "as-needed"],
		"arrow-body-style": ["error", "as-needed"],
		"no-confusing-arrow": "error",
		"no-useless-constructor": "error",
		"no-iterator": "error",
		"prefer-template": "warn",
		"template-curly-spacing": "error",
		"no-useless-escape": "error",
		"no-case-declarations": "error",
		"no-nested-ternary": "error",
		"no-unneeded-ternary": "error",
		"object-curly-spacing": ["warn", "never"],
		"no-restricted-syntax": [
			"error",
			"WithStatement",
			"BinaryExpression[operator='in']"
		],
		"array-callback-return": "warn",
		"radix": [
			"error",
			"always"
		],
		"require-jsdoc": ["warn", {
			"require": {
				"FunctionDeclaration": true,
				"MethodDefinition": true,
				"ClassDeclaration": true,
				"ArrowFunctionExpression": false,
				"FunctionExpression": false
			}
		}],
		"comma-style": ["error", "last"]
	}
}