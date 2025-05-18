import globals from "globals";
import pluginJs from "@eslint/js";
import reactRecomended from "eslint-plugin-react/configs/recommended.js";
import stylistic from "@stylistic/eslint-plugin";
import { fixupConfigRules } from "@eslint/compat";

export default [
    {
        files: ["src/**/*.js"],
        rules: {
            "@stylistic/function-paren-newline": [
                "error",
                "multiline-arguments",
            ],
            "@stylistic/jsx-curly-spacing": [
                2,
                {
                    spacing: { objectLiterals: "never" },
                    when: "always",
                },
            ],
            "@stylistic/no-trailing-spaces": "error",
            "@stylistic/padding-line-between-statements": [
                "error",
                {
                    blankLine: "always",
                    next: "*",
                    prev: ["const", "let"],
                },
                {
                    blankLine: "any",
                    next: ["const", "let"],
                    prev: ["const", "let"],
                },
                {
                    blankLine: "always",
                    next: "return",
                    prev: "*",
                },
            ],
            "@stylistic/semi": ["error", "always"],
            "array-callback-return": 1,
            "arrow-body-style": [
                "error",
                "as-needed",
                { requireReturnForObjectLiteral: true },
            ],
            "arrow-parens": ["error", "always"],
            "comma-dangle": [
                "error",
                { arrays: "never", objects: "always-multiline" },
            ],
            "comma-style": [
                "error",
                "first",
                {
                    exceptions: {
                        ArrayExpression: true,
                        ObjectExpression: true,
                    },
                },
            ],
            "consistent-return": [
                "error",
                { treatUndefinedAsUnspecified: true },
            ],
            curly: "error",
            "dot-location": ["error", "property"],
            // 'import/no-extraneous-dependencies': 1,
            // 'import/no-named-as-default': 1,
            // 'import/no-named-as-default-member': 1,
            indent: [
                "error",
                2,
                {
                    ignoreComments: true,
                    SwitchCase: 1,
                    VariableDeclarator: {
                        const: 3,
                        let: 2,
                    },
                },
            ],
            "jsx-a11y/no-noninteractive-tabindex": "off",
            "jsx-a11y/tabindex-no-positive": "off",
            "linebreak-style": ["error", "windows"],
            "max-len": [
                "error",
                100,
                {
                    comments: 100,
                    ignoreStrings: false,
                    ignoreTemplateLiterals: false,
                    ignoreTrailingComments: false,
                    ignoreUrls: true,
                },
            ],
            "multiline-ternary": ["error", "always-multiline"],
            "newline-before-return": "error",
            "no-case-declarations": "error",
            "no-empty": "error",
            "no-param-reassign": ["error", { props: false }],
            "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
            "no-restricted-syntax": "off",
            "no-shadow": "error",
            "no-unneeded-ternary": "error",
            "object-curly-newline": ["error", { multiline: true }],
            "one-var": ["error", "always"],
            "one-var-declaration-per-line": ["error", "always"],
            "operator-linebreak": ["error", "before"],
            "prefer-destructuring": [
                "error",
                {
                    AssignmentExpression: {
                        array: false,
                        object: false,
                    },
                    VariableDeclarator: {
                        array: false,
                        object: true,
                    },
                },
            ],
            quotes: ["error", "single"],
            radix: ["error", "as-needed"],
            "react/destructuring-assignment": [
                "error",
                "always",
                { ignoreClassFields: true },
            ],
            "react/forbid-prop-types": ["error", { forbid: ["any", "array"] }],
            "react/jsx-curly-spacing": 0,
            "react/jsx-filename-extension": [
                1,
                { extensions: [".js", ".jsx"] },
            ],
            "react/jsx-max-props-per-line": [
                "error",
                { maximum: 3, when: "multiline" },
            ],
            "react/jsx-no-bind": 1,
            "react/jsx-one-expression-per-line": [1, { allow: "single-child" }],
            "react/jsx-props-no-spreading": [1, { html: "ignore" }],
            "react/jsx-space-before-closing": 0,
            "react/jsx-tag-spacing": [1, { beforeClosing: "never" }],
            "react/jsx-wrap-multilines": [
                "error",
                {
                    arrow: true,
                    assignment: true,
                    declaration: true,
                    return: true,
                },
            ],
            "react/prop-types": 1,
            "sort-keys": [
                "error",
                "asc",
                { caseSensitive: false, natural: true },
            ],
            "sort-vars": ["error", { ignoreCase: true }],
            "template-curly-spacing": ["error", "always"],
            "vars-on-top": "error",
        },
    },
    { ignores: ["build/**/*.js", "*.js", "*.mjs"] },
    {
        languageOptions: {
            globals: globals.browser,
            parserOptions: { ecmaFeatures: { jsx: true } },
        },
    },
    {
        plugins: {
            "@stylistic": stylistic,
            // import: importPlugin,
            reactRecomended,
        },
    },
    pluginJs.configs.recommended,
    ...fixupConfigRules(reactRecomended),
];
