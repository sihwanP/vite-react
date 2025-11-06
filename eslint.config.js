// eslint.config.js
// ESLint의 새로운 Flat Config 방식으로 설정을 정의하는 파일입니다.

import globals from 'globals' // 전역 변수 (브라우저, Node.js 등) 설정을 위한 패키지
import pluginJs from '@eslint/js' // ESLint 자체의 기본 규칙들을 포함합니다.
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js' // React 권장 규칙
import pluginReactHooks from 'eslint-plugin-react-hooks' // React Hooks 규칙
import pluginTypeScript from '@typescript-eslint/eslint-plugin' // TypeScript 관련 ESLint 규칙
import parserTypeScript from '@typescript-eslint/parser' // TypeScript 코드를 분석하는 파서
import pluginJsxA11y from 'eslint-plugin-jsx-a11y' // 웹 접근성(a11y) 규칙
import prettierPlugin from 'eslint-plugin-prettier' // Prettier 규칙을 ESLint에 통합하는 플러그인
import prettierConfig from 'eslint-config-prettier' // Prettier와 충돌하는 ESLint 규칙 비활성화 설정

export default [
  // 💡 [해결책 적용!] React + TypeScript 프로젝트 소스 파일(`src` 폴더)들을 위한 설정 블록
  //    이 설정은 `eslint.config.js` 파일 자체를 제외하고 모든 `.ts`, `.tsx`, `.js`, `.jsx` 파일에 적용됩니다.
  {
    files: ['**/*.{ts,tsx,js,jsx}'], // 이 설정이 적용될 파일 범위 (주로 src 폴더 내)
    // ✨✨✨ 중요! `eslint.config.js` 파일을 이 설정 블록에서 명확히 제외합니다. ✨✨✨
    // 이렇게 해야 eslint.config.js 파일이 TypeScript 파서의 영향을 받지 않습니다.
    ignores: ['eslint.config.js', vitest.config.ts],

    // TypeScript 관련 언어 설정
    languageOptions: {
      parser: parserTypeScript, // TypeScript 코드를 분석할 때는 `@typescript-eslint/parser`를 사용합니다.
      parserOptions: {
        // ✨✨✨ 오류 해결 핵심! `tsconfig.json` 대신 `tsconfig.app.json`을 직접 참조합니다. ✨✨✨
        // `tsconfig.app.json`이 우리의 `src` 폴더를 `include`하고 있기 때문입니다.
        project: ['./tsconfig.app.json'],
        ecmaFeatures: {
          jsx: true, // JSX 문법을 허용합니다. (React 코드에서 필요)
        },
        ecmaVersion: 'latest', // 최신 ECMAScript 문법을 사용합니다.
        sourceType: 'module', // ES 모듈(`import/export`)을 사용합니다.
      },
      // 브라우저(`window`, `document`) 및 Node.js(`process`, `require`) 환경의 전역 변수들을 인식하게 합니다.
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    // ESLint 플러그인 정의: ESLint에게 어떤 플러그인들을 사용할지 알려줍니다.
    plugins: {
      react: pluginReactConfig.plugins.react, // React 관련 규칙
      'react-hooks': pluginReactHooks, // React Hooks 관련 규칙
      '@typescript-eslint': pluginTypeScript, // TypeScript 관련 규칙
      'jsx-a11y': pluginJsxA11y, // 웹 접근성 관련 규칙
      prettier: prettierPlugin, // Prettier 통합 플러그인
    },

    // React 관련 설정 (설치된 React 버전을 자동으로 감지합니다.)
    settings: {
      react: {
        version: 'detect',
      },
    },

    // 핵심 규칙들 정의: ESLint가 코드에서 어떤 규칙들을 검사할지 설정합니다.
    rules: {
      // ESLint의 기본 권장 규칙들을 가져옵니다.
      ...pluginJs.configs.recommended.rules,
      // `eslint-plugin-react`의 권장 규칙들을 가져옵니다.
      ...pluginReactConfig.rules,
      // `eslint-plugin-react-hooks`의 권장 규칙들을 가져옵니다.
      ...pluginReactHooks.configs.recommended.rules,
      // `@typescript-eslint/eslint-plugin`에서 ESLint 기본 규칙과 충돌하지 않는 TypeScript 규칙들을 가져옵니다.
      ...pluginTypeScript.configs['eslint-recommended'].rules,
      // `@typescript-eslint/eslint-plugin`의 권장 TypeScript 규칙들을 가져옵니다.
      ...pluginTypeScript.configs.recommended.rules,
      // `eslint-plugin-jsx-a11y`의 권장 웹 접근성 규칙들을 가져옵니다.
      ...pluginJsxA11y.configs.recommended.rules,
      // `eslint-config-prettier`에 포함된 규칙들을 가져와, ESLint의 포맷팅 관련 규칙들을 비활성화합니다.
      // 이렇게 해야 Prettier와 ESLint가 충돌하지 않고, Prettier가 코드 포맷팅을 전적으로 담당하게 됩니다!
      ...prettierConfig.rules,

      // --- 이제 우리 프로젝트에 특화된 사용자 정의 규칙들을 추가하거나 기본 규칙을 덮어씁니다. ---

      // 💡 Prettier 규칙을 위반했을 때 ESLint가 경고를 띄우도록 합니다.
      //    Prettier 설정을 따르지 않는 코드는 ESLint가 잡아낼 수 있습니다.
      //    `endOfLine` 설정은 `.prettierrc.cjs`의 `endOfLine` 설정(`'lf'`)과 일치시켜야 합니다.
      // 'prettier/prettier': ['warn', { endOfLine: 'lf' }],
      //    Windows 운영체제에서는 다음과 같이 설정합니다.
      'prettier/prettier': ['warn', { endOfLine: 'auto' }],
      // 💡 React 17 이상부터는 JSX 사용 시 `import React`를 명시적으로 할 필요가 없어졌으므로 이 규칙을 끕니다.
      'react/react-in-jsx-scope': 'off',
      // 💡 TypeScript를 사용하면 타입 검사를 하므로, React의 `prop-types`를 통한 타입 검사는 필요 없습니다. 이 규칙을 끕니다.
      'react/prop-types': 'off',
      // 💡 사용되지 않는 변수에 대한 경고 규칙입니다.
      //    `'warn'`으로 설정하고, 밑줄(`_`)로 시작하는 변수는 사용되지 않아도 경고를 띄우지 않도록 설정합니다.
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // 💡 'any' 타입 사용에 대한 경고를 끕니다. (프로젝트 스타일에 따라 'warn' 또는 'error'로 변경 가능합니다.)
      '@typescript-eslint/no-explicit-any': 'off',

      // 💡 Prettier가 이미 스타일 관련 규칙(세미콜론, 따옴표, 들여쓰기, 줄바꿈)을 처리하므로,
      //    ESLint의 이 규칙들은 `off`로 꺼서 Prettier와의 충돌을 완전히 방지합니다.
      semi: 'off', // 세미콜론 관련 규칙
      quotes: 'off', // 따옴표 관련 규칙
      indent: 'off', // 들여쓰기 관련 규칙
      'linebreak-style': 'off', // 줄바꿈 스타일 관련 규칙
      // 💡 TypeScript Path Alias (예: `@/components`) 사용 시 ESLint가 경로를 찾지 못해 발생할 수 있는
      //    `import/no-unresolved` 오류를 방지하기 위해 이 규칙을 끕니다.
      'import/no-unresolved': 'off',
    },
  },

  // 💡 [해결책 적용!] `eslint.config.js` 파일 자체를 위한 설정 블록
  //    이 블록은 Node.js 환경에서 실행되는 `.js` 파일이므로 TypeScript 파서의 영향을 받지 않도록 분리합니다.
  {
    files: ['eslint.config.js'], // 이 설정은 오직 `eslint.config.js` 파일에만 적용됩니다.
    languageOptions: {
      // `parser: null`로 설정하면 ESLint의 기본 JavaScript 파서가 사용됩니다.
      // 이렇게 하여 `@typescript-eslint/parser`가 이 파일에 관여하지 않도록 합니다.
      parser: null,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      // 이 파일은 Node.js 환경에서 실행되므로, `globals.node`만 포함합니다.
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // ESLint의 기본 권장 규칙만 적용하여 이 설정 파일 자체의 품질을 유지합니다.
      ...pluginJs.configs.recommended.rules,
      // 이 설정 파일 자체에도 Prettier 규칙을 적용하여 깔끔하게 유지합니다.
      // 'prettier/prettier': ['warn', { endOfLine: 'lf' }],
      // Windows 운영체제에서는 다음과 같이 설정합니다.
      'prettier/prettier': ['warn', { endOfLine: 'auto' }],
    },
  },
]
