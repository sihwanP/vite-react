// .prettierrc.cjs
// Prettier의 코드 포맷팅 규칙을 정의하는 파일입니다.
module.exports = {
  // 💡 세미콜론 사용 여부: `false`로 설정하면 문장 끝에 세미콜론을 붙이지 않습니다. (React에서 흔히 사용)
  semi: false,
  // 💡 따옴표 종류: `true`로 설정하면 큰따옴표 대신 작은따옴표를 사용합니다.
  singleQuote: true,
  // 💡 객체나 배열 마지막 요소 뒤에 콤마를 붙일지 여부: `es5`는 ES5 문법에 맞게 적용합니다.
  trailingComma: "es5",
  // 💡 탭 너비: 스페이스 2칸으로 설정합니다.
  tabWidth: 2,
  // 💡 화살표 함수 괄호: 매개변수가 하나일 때 괄호를 생략합니다. (ex: `arg => {}` 대신 `(arg) => {}` 사용)
  arrowParens: "avoid",
  // 💡 한 줄의 최대 길이: 코드가 80글자를 넘어가면 다음 줄로 자동 줄바꿈을 시도합니다.
  printWidth: 80,
  // 💡 JSX 태그 줄바꿈: JSX 태그가 한 줄에 안 들어가서 여러 줄로 나눌 때, 마지막 꺾쇠괄호(>)를 같은 줄에 둡니다.
  jsxBracketSameLine: false,
  // 💡 JSX 내 따옴표: JSX 안에서 따옴표를 사용할 때 작은따옴표를 사용할지 큰따옴표를 사용할지 결정합니다. (`false`는 큰따옴표)
  jsxSingleQuote: false,
  // 💡 줄바꿈 문자: 운영체제별로 다른 줄바꿈 문자를 `lf` (Unix/macOS/Linux)로 통일합니다.
  endOfLine: "lf",
};
