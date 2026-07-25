# TypeScript-এর ভিত্তি: পরিবেশ প্রস্তুতি, Type System, Function, Operator ও Advanced Basic Types

> এই অধ্যায়টি একটি ধারাবাহিক tutorial lecture-এর পূর্ণাঙ্গ বাংলা রূপ। Lecture-এর teaching flow, প্রশ্ন–উত্তর, analogy, code walkthrough, warning, recap ও পরবর্তী lesson-এর reference যথাসম্ভব একই ক্রমে রাখা হয়েছে।

## অধ্যায়ের লক্ষ্য

এই TypeScript মিশনে আমরা একেবারে basic থেকে শুরু করে ধীরে ধীরে advanced concept-এর দিকে এগোব। পরবর্তী পর্যায়ে object-oriented TypeScript-ও শিখব। তবে তার আগে একটি interview question দিয়ে শুরু করা যাক।

## Interview Question: আমরা TypeScript কেন ব্যবহার করি?

তোমাকে interview-তে যদি জিজ্ঞেস করা হয়, **“আমরা TypeScript কেন ব্যবহার করি?”**, তাহলে তোমার উত্তর কী হবে?

একটু চিন্তা করো—TypeScript আমাদের কী কী সুবিধা দেয়?

TypeScript নামের মধ্যেই `type` শব্দটি আছে। অর্থাৎ TypeScript আমাদের variable, function, object, array ইত্যাদির type নির্ধারণ করতে দেয়। এর ফলে development environment-এই অনেক bug ধরা যায়; সব ভুল বোঝার জন্য runtime পর্যন্ত অপেক্ষা করতে হয় না। আমরা code লেখার সময়ই ভুল detect করতে পারি।

Type define করার আরেকটি বড় সুবিধা হলো code readability। যখন variable, function, object বা array-এর expected type code-এর মধ্যেই লেখা থাকে, তখন code অন্য developer-এর জন্য একধরনের documentation হিসেবে কাজ করে।

Large-scale project-এ বিশাল codebase maintain করতে হয়। সেই codebase নিয়ন্ত্রণযোগ্য, পরিষ্কার ও predictable রাখার জন্য TypeScript ব্যাপকভাবে ব্যবহৃত হয়। বড় বড় প্রতিষ্ঠানে TypeScript ব্যবহারের উদাহরণ দেখা যায়; তাই আমাদেরও এটি ভালোভাবে শেখা দরকার।

TypeScript-এর আরও দুটি গুরুত্বপূর্ণ সুবিধা মনে রাখো:

### Better team collaboration

Static typing-এর কারণে একজন developer-এর লেখা code অন্য developer সহজে বুঝতে পারে। Clean architecture অনুসরণ করে code-কে আরও readable ও maintainable রাখা যায়। Team-এর সদস্যরা একই data structure এবং function contract অনুসরণ করতে পারে।

### Existing JavaScript project-এ সহজে যোগ করা যায়

তোমার JavaScript knowledge যদি ভালো থাকে, TypeScript adopt করতে খুব বেশি সময় লাগবে না। কারণ TypeScript JavaScript-এর উপরেই type system ও কিছু অতিরিক্ত language feature যোগ করে।

তাহলে আর দেরি কেন? চলো TypeScript-এর এই মিশন শুরু করা যাক।

---

# ১. Node.js ও TypeScript-এর সম্পর্ক

আজ আমরা Node.js এবং TypeScript—দুটিই install করব। তবে installation-এর আগে Node.js-এর সঙ্গে TypeScript-এর সম্পর্ক জানা দরকার। ইতিহাস জানলে fundamental concept আরও শক্ত হয়।

একসময় Node.js সরাসরি TypeScript চিনত না; এটি মূলত JavaScript server-side-এ run করার runtime। তাই Node.js যেন বলত, “TypeScript আবার কে? আমি তো তাকে চিনি না!”

পরবর্তী সময়ে Node.js-এর নতুন version-গুলোতে experimental TypeScript support আসে। Lecture-এ `22.6.0` version থেকে experimental support-এর কথা বলা হয়েছে। সেখানে একটি experimental flag ব্যবহার করে **type stripping**-এর মাধ্যমে TypeScript file run করা যেত।

## Type stripping কী?

Type stripping বলতে TypeScript source থেকে type annotation সরিয়ে code-টিকে JavaScript-এর মতো run করানো বোঝানো হয়েছে। যেমন:

```ts
const course: string = "Next Level Web Development";
```

Type annotation সরিয়ে দিলে code-টি conceptually এমন হয়:

```js
const course = "Next Level Web Development";
```

তারপর Node.js JavaScript অংশটি execute করে।

তবে এটিকে শুরু থেকেই “TypeScript-এর পূর্ণ support” বলা ঠিক নয়। কারণ কিছু TypeScript syntax শুধু type সরালেই JavaScript হয়ে যায় না; সেখানে transformation প্রয়োজন হয়। Lecture-এ বলা হয়েছে, কিছু version-এ এ ধরনের transformation-এর জন্য অতিরিক্ত flag লাগত। পরবর্তী version-এ type stripping default-ভাবে enable হলেও transformation-নির্ভর feature-এর ক্ষেত্রে সীমাবদ্ধতা থেকে যায়।

### Technical Note

Node.js-এর TypeScript support version অনুযায়ী পরিবর্তিত হয়। Lecture-এ `22.6.0`, `22.7.0`, `22.8.0` এবং পরে `22.18.0`-এর উল্লেখ আছে। বাস্তবে command বা support matrix ব্যবহার করার আগে সর্বশেষ official Node.js documentation দেখে নেওয়া উচিত। Instructor-এর মূল শিক্ষা হলো: **version-sensitive feature মুখস্থ না করে documentation পড়ো।**

## কেন third-party runner ব্যবহার করা হয়?

পূর্ণ development experience-এর জন্য একটি third-party package ব্যবহার করা যায়, যার নাম `tsx`। এটি TypeScript file development-এ দ্রুত run করতে সাহায্য করে। তবে তার আগে আমাদের Node.js install ও version manage করতে হবে।

---

# ২. Node Version Manager: একজন manager-এর analogy

আগে হয়তো তুমি Node.js সরাসরি install করেছ। কিন্তু এবার আমরা সরাসরি install করব না। কারণ বিভিন্ন project-এ বিভিন্ন Node.js version দরকার হতে পারে।

ধরো, তুমি office computer-এ code করছ এবং বাসায় laptop-এ একই project চালাচ্ছ। দুই machine-এ Node.js-এর version আলাদা হলে weird বা unexpected behavior দেখা দিতে পারে। আবার একটি পুরোনো project হয়তো Node.js 19 চায়, নতুন project Node.js 24 চায়। প্রতিবার পুরোনো version uninstall করে নতুন version install করা অকার্যকর।

তাই আমরা একটি Node version manager ব্যবহার করব।

বাস্তব জীবনে manager কী করে? মানুষ manage করে। ঠিক তেমনি **Node Version Manager**, সংক্ষেপে `nvm`, Node.js-এর বিভিন্ন version manage করবে।

আমরা এখন Docker ব্যবহার করছি না। Docker থাকলে environment isolation অন্যভাবে করা যেত। কিন্তু Docker ছাড়া team-এর প্রত্যেকের local environment আলাদা হতে পারে—কারও Node 22, কারও 21, কারও আরও নতুন version। Project অনুযায়ী সবাই যেন সহজে একই Node version ব্যবহার করতে পারে, সে জন্য `nvm` দরকার।

## পুরোনো Node.js installation সরানো

তোমার computer-এ আগে থেকে সরাসরি install করা Node.js থাকলে সেটি uninstall করা ভালো। না হলে `nvm`-এর managed Node.js-এর সঙ্গে conflict হতে পারে। Windows-এ search বা **Add or Remove Programs** থেকে Node.js খুঁজে uninstall করা যায়। Permission চাইলে প্রয়োজন অনুযায়ী অনুমতি দেবে।

Instructor এখানে একটি গুরুত্বপূর্ণ অভ্যাস শেখান: command মুখস্থ নয়, documentation অনুসরণ করতে হবে। আজ command যেমন আছে, ভবিষ্যতে বদলাতে পারে। তাই official documentation বা trustworthy source থেকে installation process দেখা উচিত।

## `nvm` install করা

Windows-এর ক্ষেত্রে `nvm-windows`-এর installer GitHub release থেকে download করা যায়। Download করা archive extract করে installer চালাও এবং সাধারণ installer-এর মতো Next → Next → Install করে এগিয়ে যাও।

Install শেষে terminal বা Command Prompt খুলে লিখো:

```bash
nvm
```

যদি command list বা version information আসে, বুঝবে `nvm` সফলভাবে install হয়েছে।

## `nvm` দিয়ে Node.js install করা

ধরো recommended LTS version `24.1.0`। Manager-কে আমরা বলব:

```bash
nvm install 24.1.0
```

অর্থাৎ, “ভাই `nvm`, তুমি আমাকে Node.js `24.1.0` install করে দাও।”

Install করা version ব্যবহার করতে:

```bash
nvm use 24.1.0
```

Installed version-গুলোর list দেখতে Windows-এর `nvm-windows`-এ সাধারণত লেখা হয়:

```bash
nvm list
```

অথবা:

```bash
nvm ls
```

বর্তমান Node.js version দেখতে:

```bash
node -v
```

ধরো পুরোনো project-এর জন্য `19.9.0` দরকার। তখন:

```bash
nvm install 19.9.0
nvm use 19.9.0
node -v
```

Expected output:

```text
v19.9.0
```

আবার নতুন project-এ ফিরে যেতে:

```bash
nvm use 24.1.0
node -v
```

Expected output:

```text
v24.1.0
```

আগে version বদলাতে uninstall–reinstall করতে হতো। এখন manager-এর সাহায্যে একটি command-এই version switch করা যায়। সত্যিই magic-এর মতো মনে হলেও এটি version management-এর স্বাভাবিক কাজ।

## Common Mistake

`nvm install <version>` এবং `nvm use <version>` এক জিনিস নয়।

- Version machine-এ না থাকলে আগে `install` করতে হবে।
- আগে থেকেই install থাকলে শুধু `use` করলেই হবে।

## এই অংশের Recap

আমরা শিখলাম, একজন manager যেমন মানুষ manage করে, `nvm` তেমনি Node.js-এর অনেক version manage করে। Project অনুযায়ী দ্রুত version বদলানো যায় এবং environment mismatch কমে।

পরবর্তী lesson-এ আমরা computer-এ TypeScript install করে জীবনের প্রথম TypeScript code লিখব।

---

# ৩. TypeScript install ও প্রথম TypeScript program

গত lesson-এ আমরা `nvm`-এর মাধ্যমে Node.js install করেছি। এবার TypeScript install করব, কারণ আমরা প্রথম TypeScript code লিখতে যাচ্ছি।

## Project folder তৈরি

একটি folder তৈরি করো:

```text
typescript-learning
```

Folder-এর path থেকে Command Prompt খুলে VS Code চালানো যায়:

```bash
code .
```

অথবা VS Code খুলে **File → Open Folder** থেকে folder নির্বাচন করা যায়।

## `.ts` file তৈরি

JavaScript file-এর extension `.js`; TypeScript file-এর extension `.ts`। একটি file তৈরি করি:

```text
test.ts
```

এখন একটি variable লিখি:

```ts
const course: string = "Next Level Web Development";

console.log(course);
```

এখানে `course` variable একটি `string` value hold করছে। আমরা explicit-ভাবে বলে দিয়েছি:

```ts
course: string
```

অর্থাৎ variable-টির type হলো `string`।

## আধুনিক Node.js দিয়ে সরাসরি run

নির্দিষ্ট modern Node.js version-এ type stripping support থাকলে লেখা যেতে পারে:

```bash
node test.ts
```

Expected output:

```text
Next Level Web Development
```

প্রশ্ন আসতে পারে: Node.js তো JavaScript runtime; এটি `.ts` file run করল কীভাবে?

কারণ type stripping source-এর type annotation সরিয়ে JavaScript অংশ execute করে। যেমন `: string` সরিয়ে code-টি JavaScript-compatible হয়ে যায়।

## পুরোনো supported experimental version পরীক্ষা

Documentation সত্যি কি না, নিজে test করো। `nvm` দিয়ে lecture-এ উল্লেখিত experimental version-এ switch করা যায়:

```bash
nvm install 22.6.0
nvm use 22.6.0
```

তারপর সরাসরি run করলে type syntax চিনতে সমস্যা হতে পারে। Experimental flag ব্যবহার করতে হতে পারে:

```bash
node --experimental-strip-types test.ts
```

Output আসতে পারে, সঙ্গে experimental warning-ও দেখা যেতে পারে। এই exercise-এর উদ্দেশ্য command মুখস্থ করা নয়; বরং বোঝা যে feature version অনুযায়ী বদলায় এবং documentation পড়া জরুরি।

আবার manager-এর মাধ্যমে modern version-এ ফিরে যাওয়া যায়:

```bash
nvm use 24.1.0
```

## TypeScript compiler install

শুধু type stripping-এর উপর নির্ভর না করে standard TypeScript compiler ব্যবহার করা সবচেয়ে পরিচিত workflow। Global-ভাবে TypeScript install করা যায়:

```bash
npm install -g typescript
```

Compiler এসেছে কি না দেখতে:

```bash
tsc -v
```

Lecture-এ example output ছিল:

```text
Version 5.9.3
```

তোমার machine-এ version ভিন্ন হতে পারে।

## TypeScript থেকে JavaScript compile

```bash
tsc test.ts
```

এতে পাশে `test.js` তৈরি হবে। Generated JavaScript version/configuration অনুযায়ী `const`-কে `var`-এও convert করতে পারে।

Generated file conceptually এমন হতে পারে:

```js
var course = "Next Level Web Development";
console.log(course);
```

আমরা চাই compilation-এর rule নিজের মতো configure করতে। যেমন:

- modern JavaScript target ব্যবহার করা;
- TypeScript source আলাদা folder-এ রাখা;
- generated JavaScript আলাদা folder-এ রাখা;
- strict type checking enable রাখা।

---

# ৪. `tsconfig.json`: TypeScript project-এর rulebook

Configuration-এর জন্য একটি file দরকার। TypeScript project-এর configuration file হলো:

```text
tsconfig.json
```

এটি তৈরি করতে:

```bash
tsc --init
```

`tsconfig.json`-এ project compilation-এর rule থাকে। Lecture-এ module system, target, strict checking, source folder ও output folder-এর কথা বলা হয়েছে।

একটি সরল configuration:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "NodeNext",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "skipLibCheck": true
  }
}
```

## গুরুত্বপূর্ণ option

### `target`

```json
"target": "ESNext"
```

Generated JavaScript কোন ECMAScript version অনুসরণ করবে তা নির্ধারণ করে। `ESNext` মানে latest available JavaScript feature target করা। পুরোনো environment-এর জন্য `ES5` বা অন্য target দেওয়া যায়। তুমি modern TypeScript লিখবে, compiler প্রয়োজন অনুযায়ী পুরোনো JavaScript-এ transpile করবে।

### `module`

```json
"module": "NodeNext"
```

Project কোন module system অনুসরণ করবে তা নির্ধারণ করে। JavaScript ecosystem-এ CommonJS ও ES module—দুটিই দেখা যায়। Configuration runtime ও project structure অনুযায়ী বেছে নিতে হয়।

### `strict`

```json
"strict": true
```

Strict type checking enable করে। Beginner পর্যায়ে সব option আলাদাভাবে বদলানোর দরকার নেই; default strict configuration রাখা ভালো।

### `rootDir`

```json
"rootDir": "./src"
```

TypeScript source file-গুলো কোথায় থাকবে তা বলে। Convention হিসেবে `src` বহুল ব্যবহৃত।

### `outDir`

```json
"outDir": "./dist"
```

Compiled JavaScript কোথায় যাবে তা বলে। `dist` বহুল ব্যবহৃত নাম; চাইলে অন্য নাম দেওয়া যায়।

## Folder structure

```text
typescript-learning/
├─ src/
│  └─ test.ts
├─ dist/
└─ tsconfig.json
```

`test.ts`-কে `src` folder-এ move করো। আগের generated `.js` file delete করা যায়। এখন শুধু চালাও:

```bash
tsc
```

Compiler `tsconfig.json` পড়বে এবং `src`-এর TypeScript file compile করে `dist`-এ JavaScript তৈরি করবে। আলাদা file name বলার দরকার নেই।

Expected structure:

```text
dist/
└─ test.js
```

Generated code:

```js
const course = "Next Level Web Development";
console.log(course);
```

## কেন documentation পড়া জরুরি?

Node.js-এর version বদলালে feature support বদলায়। TypeScript compiler option-ও সময়ের সঙ্গে evolve করে। সব কিছু প্রথম দিন বুঝবে না। কিন্তু প্রতিদিন একটু করে documentation পড়লে অভ্যাস তৈরি হবে। মুখস্থের বদলে documentation-driven development শিখতে হবে।

## এই অংশের Recap

আমরা দেখলাম:

- modern Node.js কিছু TypeScript syntax type stripping-এর মাধ্যমে run করতে পারে;
- standard workflow-এ `typescript` package ও `tsc` compiler ব্যবহার করা হয়;
- `tsconfig.json` দিয়ে target, module, strictness, source folder ও output folder configure করা যায়;
- TypeScript file JavaScript-এ transpile করে Node.js দিয়ে run করা যায়।

পরবর্তী lesson-এ primitive ও non-primitive data type নিয়ে আলোচনা শুরু হবে।

---

# ৫. Primitive ও Non-Primitive Type-এর পরিচয়

JavaScript-এ primitive ও non-primitive data নিয়ে আমরা আগেই কাজ করেছি। TypeScript সেই পরিচিত type-গুলোর উপর আরও শক্তিশালী type system যোগ করে।

## Primitive type

আমাদের পরিচিত primitive type:

- `string`
- `number`
- `boolean`
- `undefined`
- `null`

TypeScript-এর কিছু special type-ও আছে:

- `unknown`
- `never`
- `void`

## Non-primitive বা reference type

JavaScript-এ array, object ও function-এর `typeof` result নিয়ে interview-এ tricky question হতে পারে। JavaScript-এর low-level `typeof` classification আর TypeScript-এর type modelling এক জিনিস নয়। TypeScript-এ non-primitive/reference structure হিসেবে আমরা সাধারণত দেখি:

- `array`
- `object`
- `function`
- `class`
- `interface`
- `type alias`
- `enum`
- `tuple`

এই lesson-এ প্রথমে primitive type practice করব।

---

# ৬. Primitive Types ও Type Inference

`src` folder-এ file তৈরি করি:

```text
primitive.ts
```

## `string`

```ts
let userName: string = "Mezba123";
```

এখানে `userName` শুধু `string` value গ্রহণ করবে। পরে number assign করতে গেলে:

```ts
userName = 123;
```

TypeScript error:

```text
Type 'number' is not assignable to type 'string'.
```

ছোট example মনে হলেও large-scale project-এ এটি অত্যন্ত গুরুত্বপূর্ণ। ধরো profile-এর username প্রথমে string ছিল। Update করার সময় ভুলে number assign করলে TypeScript development time-এই error দেখাবে। JavaScript-এ হয়তো runtime পর্যন্ত তা ধরা পড়ত না।

যত বেশি ভুল development-এর সময় ধরা যাবে, testing-এ তত কম সময় লাগবে; ফলে product development-এ বেশি সময় দেওয়া যাবে।

## `number`

```ts
let userId: number = 101;
```

ভুল করে string দিলে:

```ts
userId = "101";
```

Error:

```text
Type 'string' is not assignable to type 'number'.
```

## Editor suggestion ও type-aware method

TypeScript শুধু error দেয় না, suggestion-ও দেয়।

```ts
userName.toUpperCase();
userId.toFixed(2);
```

`userName.` লিখলে string method-গুলোর suggestion পাওয়া যায়। `userId.` লিখলে number method পাওয়া যায়।

ভুল method ব্যবহার করলে:

```ts
userName.toFixed(2);
```

Error:

```text
Property 'toFixed' does not exist on type 'string'.
```

`toFixed` number-এর method, string-এর নয়। এই type-aware suggestion developer productivity বাড়ায়।

## `boolean`

```ts
let isAdmin: boolean = false;
```

পরবর্তী condition-এর ভিত্তিতে শুধু `true` বা `false` assign করা যাবে।

## Implicit ও Explicit type

```ts
let isAdmin = false;
```

এখানে আমরা type লিখিনি, কিন্তু TypeScript value দেখে infer করেছে যে `isAdmin` একটি `boolean`। এটিকে **implicit type inference** বলা হয়।

Explicit declaration:

```ts
let isAdmin: boolean = false;
```

এখানে আমরা সরাসরি type বলে দিয়েছি—এটি **explicit type annotation**।

Rule-টি মনে রাখো:

- TypeScript value দেখে type বুঝলে → implicit/inferred type
- Developer নিজে type লিখলে → explicit type

## `undefined` এবং unannotated variable

```ts
let x;
```

Configuration ও control-flow-এর উপর নির্ভর করে এমন variable অনেক ক্ষেত্রে broad type পেতে পারে; lecture-এর teaching point হলো—কোনো useful constraint না দিলে পরে যেকোনো ধরনের value assign করা সম্ভব হতে পারে।

```ts
x = 10;
x = "hello";
```

কিন্তু explicit-ভাবে লিখলে:

```ts
let y: undefined = undefined;
```

এখন অন্য value assign করা যাবে না:

```ts
y = 10;
```

Error:

```text
Type '10' is not assignable to type 'undefined'.
```

## JavaScript বনাম TypeScript: Development time ও Runtime

JavaScript file:

```js
let userName = "Mezba";
userName = 123;

console.log("User name:", userName);
```

JavaScript dynamically typed হওয়ায় assignment-এর সময় কোনো type error দেখাবে না। Run করলে:

```bash
node example.js
```

Output:

```text
User name: 123
```

তখন বুঝতে পারি username-এর জায়গায় number চলে এসেছে। অর্থাৎ ভুলটি runtime-এ ধরা পড়েছে।

TypeScript-এ একই ভুল code লেখার সময়ই দেখা যায়। এটাই TypeScript-এর আসল আনন্দ—error হওয়ার সম্ভাবনা অনেক কমে যায়।

## Common Mistakes

### String variable-এ number assign করা

```ts
let userName: string = "Mezba";
userName = 123; // error
```

### String-এর উপর number method ব্যবহার করা

```ts
userName.toFixed(2); // error
```

### Type না দিয়ে unconstrained variable তৈরি করা

```ts
let value;
```

যেখানে সম্ভব meaningful type দাও বা এমন initial value দাও, যেখান থেকে TypeScript সঠিক type infer করতে পারে।

## Primitive Types Recap

আমরা দেখলাম, আগে JavaScript-এ type মনে মনে বুঝতাম; TypeScript-এ তা code-এ লিখতে পারি। TypeScript assignment, method usage ও suggestion—সব জায়গায় type-aware সহায়তা দেয়।

পরবর্তী lesson-এ non-primitive type-এর মধ্যে array ও tuple দেখব।

---

# ৭. Array ও Tuple

Non-primitive data type-এর মধ্যে `array` ও `object` প্রতিনিয়ত ব্যবহার করি। TypeScript project-এ এগুলো আরও বেশি ব্যবহার হবে, তাই proper type declaration জানা জরুরি।

`src` folder-এ file:

```text
non-primitive.ts
```

## String array: বাজারের তালিকা

ধরো, বিয়ের পর বাজার করার extra responsibility এসেছে। বাজারে গেলে অনেক জিনিস একসঙ্গে আনতে হয়। এই analogy দিয়েই array বুঝি।

```ts
const bazarList = ["rice", "milk", "sugar"];
```

TypeScript নিজে infer করবে:

```ts
string[]
```

Explicit-ভাবে লেখা যায়:

```ts
const bazarList: string[] = ["rice", "milk", "sugar"];
```

এখন number push করলে:

```ts
bazarList.push(12);
```

Error:

```text
Argument of type 'number' is not assignable to parameter of type 'string'.
```

এখানে শুধু `string` push করা যাবে:

```ts
bazarList.push("salt");
```

Large project-এ অন্য file থেকে imported array-এ ভুল data push করার আগেই TypeScript সতর্ক করবে।

## Mixed array ও Union Type-এর প্রথম ঝলক

কখনো array-এ `string` ও `number`—দুটিই দরকার হতে পারে। উদাহরণ হিসেবে বাজারের item ও quantity রাখা হচ্ছে:

```ts
const mixedList = ["egg", 12, "milk", 2];
```

TypeScript infer করতে পারে:

```ts
(string | number)[]
```

Explicit declaration:

```ts
const mixedList: (string | number)[] = ["egg", 12, "milk", 2];
```

এখানে `|`-কে Instructor প্রথমে “খাম্বা” বলে মনে রাখতে বলেছেন। পরে আমরা এর formal নাম শিখব—**union type**। এর অর্থ: `string` অথবা `number`।

```ts
mixedList.push("sugar");
mixedList.push(5);
```

দুটিই valid। কিন্তু:

```ts
mixedList.push(true);
```

Error, কারণ `boolean` union-এর অংশ নয়।

## Tuple: Fixed length ও fixed pattern

TypeScript-এর special array type হলো `tuple`। যখন:

1. element-এর সংখ্যা fixed,
2. প্রতিটি position-এর type pattern fixed,

তখন tuple ব্যবহার করা যায়।

### Coordinate example

Math-এ coordinate-এ `x` ও `y` থাকে। দুটিই number এবং length দুই:

```ts
const coordinate: [number, number] = [20, 30];
```

এখানে pattern:

```text
[number, number]
```

আরেকটি element যোগ করলে type error হতে পারে:

```ts
const coordinate: [number, number] = [20, 30, 40];
```

Expected error-এর অর্থ: target tuple শুধু দুই element allow করে।

### Couple analogy

“Couple” বলতে এখানে husband ও wife—দুইজনের fixed pair বোঝানো হয়েছে:

```ts
const couple: [string, string] = ["husband", "wife"];
```

### Name ও roll example

```ts
const nameAndRoll: [string, number] = ["Mezba", 79];
```

প্রথম position-এ `string`, দ্বিতীয় position-এ `number`। উল্টো করলে:

```ts
const nameAndRoll: [string, number] = [79, "Mezba"];
```

Error হবে, কারণ pattern মানা হয়নি।

### তিন element-এর tuple

Tuple শুধু দুই element-এর নয়। Destination example:

```ts
const destination: [string, string, number] = [
  "Dhaka",
  "Chattogram",
  6,
];
```

এখানে pattern হলো:

```text
[string, string, number]
```

## Array ও Tuple Recap

- সাধারণ homogeneous list-এর জন্য array।
- একাধিক allowed type থাকলে union array ব্যবহার করা যায়।
- Fixed length ও fixed positional pattern থাকলে tuple।

পরবর্তী lesson-এ object type দেখব।

---

# ৮. Object Type, Optional Property, Literal Type ও `readonly`

গত lesson-এ array ও tuple দেখেছি। এবার সবচেয়ে গুরুত্বপূর্ণ reference type-এর একটি—`object`। Daily programming-এ object অসংখ্যবার ব্যবহার করি।

## Object type inference

```ts
const user = {
  firstName: "Jhankar",
  middleName: "Abedin",
  lastName: "Mahbub",
};
```

Hover করলে TypeScript object-এর structure infer করবে:

```ts
{
  firstName: string;
  middleName: string;
  lastName: string;
}
```

## Explicit object type

```ts
const user: {
  firstName: string;
  middleName: string;
  lastName: string;
} = {
  firstName: "Jhankar",
  middleName: "Abedin",
  lastName: "Mahbub",
};
```

Object type-এর property separator হিসেবে semicolon ব্যবহার করা হয়েছে। Value object-এ JavaScript-এর মতো comma ব্যবহার করা হয়।

## Property default-ভাবে required

Type-এ property লিখলে তা default-ভাবে required। যদি `middleName` বাদ দিই:

```ts
const user: {
  firstName: string;
  middleName: string;
  lastName: string;
} = {
  firstName: "Jhankar",
  lastName: "Mahbub",
};
```

Error-এর মূল অর্থ:

```text
Property 'middleName' is missing ...
```

অর্থাৎ type-এ property আছে, কিন্তু value object-এ নেই। Error message ঠান্ডা মাথায় পড়ো। Group-এ post করার বা support চাওয়ার আগে message কী বলছে তা বোঝার চেষ্টা করো। বড় project-এ error পড়ার অভ্যাস অত্যন্ত জরুরি।

## Optional property

সবার middle name থাকে না। যেমন কোনো user-এর শুধু first ও last name থাকতে পারে। তখন `?` ব্যবহার করে property optional করা যায়:

```ts
const user: {
  firstName: string;
  middleName?: string;
  lastName: string;
} = {
  firstName: "Jhankar",
  lastName: "Mahbub",
};
```

`middleName?: string` মানে property-টি থাকতেও পারে, নাও থাকতে পারে।

আরেকটি property:

```ts
const user: {
  firstName: string;
  middleName?: string;
  lastName: string;
  isMarried: boolean;
} = {
  firstName: "Jhankar",
  lastName: "Mahbub",
  isMarried: true,
};
```

`isMarried`-এ string দেওয়া যাবে না:

```ts
isMarried: "yes"
```

Error:

```text
Type 'string' is not assignable to type 'boolean'.
```

## Property suggestion ও productivity

Object ব্যবহার করার সময়:

```ts
user.
```

লিখলে editor available property suggestion দেখায়—`firstName`, `middleName`, `lastName`, `isMarried` ইত্যাদি। Large project-এ object অন্য file থেকে import করা হলেও সব property মুখস্থ রাখতে হয় না। Editor suggestion productivity বাড়ায়।

## Organization property পরিবর্তন

```ts
const user: {
  firstName: string;
  middleName?: string;
  lastName: string;
  isMarried: boolean;
  organization: string;
} = {
  firstName: "Jhankar",
  lastName: "Mahbub",
  isMarried: true,
  organization: "Programming Hero",
};
```

যেহেতু `organization` type `string`, পরে পরিবর্তন করা যায়:

```ts
user.organization = "Programming Hero Fire";
```

```ts
console.log(user.organization);
```

Expected output:

```text
Programming Hero Fire
```

## Literal Type: value-কে type বানানো

ধরো organization-এর নাম কখনোই বদলাবে না। তখন `string` না লিখে exact value-কে type করা যায়:

```ts
const user: {
  firstName: string;
  lastName: string;
  organization: "Programming Hero";
} = {
  firstName: "Jhankar",
  lastName: "Mahbub",
  organization: "Programming Hero",
};
```

এখানে `"Programming Hero"` শুধু value নয়; এটি type হিসেবেও ব্যবহৃত হচ্ছে। এটিই **literal type**।

পরিবর্তন করতে গেলে:

```ts
user.organization = "Programming Hero Fire";
```

Error:

```text
Type '"Programming Hero Fire"' is not assignable to type '"Programming Hero"'.
```

Instructor `π`-এর fixed value-এর সঙ্গে তুলনা করেছেন—যেমন কিছু value conceptually স্থির, তেমনি fixed string-কে literal type করা যায়।

## `readonly`: অন্যভাবে পরিবর্তন বন্ধ করা

Organization-এর type `string` রাখতে চাই, কিন্তু property-তে write বন্ধ করতে চাই। তখন:

```ts
const user: {
  firstName: string;
  lastName: string;
  readonly organization: string;
} = {
  firstName: "Jhankar",
  lastName: "Mahbub",
  organization: "Programming Hero",
};
```

এখন:

```ts
user.organization = "Another Organization";
```

Error:

```text
Cannot assign to 'organization' because it is a read-only property.
```

Lecture-এ এটিকে access modifier-এর পরিচয় হিসেবে বলা হয়েছে। ভবিষ্যতে class-এর context-এ access modifier আরও বিস্তারিত শেখা হবে। এখানে মূল কথা: `readonly` property পড়া যাবে, কিন্তু reassignment করা যাবে না।

## Tricky Case: Literal Type বনাম `readonly`

দুটিই পরিবর্তন আটকাতে পারে, কিন্তু ধারণা আলাদা:

```ts
organization: "Programming Hero";
```

এখানে allowed value একটিই।

```ts
readonly organization: string;
```

এখানে initial value যেকোনো string হতে পারে, কিন্তু object তৈরির পর property reassign করা যাবে না।

## Object Recap

আমরা শিখলাম:

- object-এর type implicit ও explicit-ভাবে define করা যায়;
- property default-ভাবে required;
- `?` দিয়ে optional property করা যায়;
- exact value দিয়ে literal type তৈরি করা যায়;
- `readonly` দিয়ে property reassignment বন্ধ করা যায়।

পরবর্তী lesson-এ function-এর type দেখব।

---

# ৯. Function: Normal Function, Arrow Function, Method ও Callback

Function এত বেশি ব্যবহার হয় যে একে application-এর building block বলা যায়। JavaScript/TypeScript-এ আমরা normal function ও arrow function ব্যবহার করি। Object-এর মধ্যে function থাকলে তাকে method বলা হয়। Loop বা higher-order function-এর argument হিসেবে function গেলে তাকে callback function বলা হয়।

File:

```text
function.ts
```

## Normal function: দুই সংখ্যার যোগফল

Programming শেখার শুরুতে পরিচিত example—দুই সংখ্যার যোগফল:

```ts
function add(number1, number2) {
  return number1 + number2;
}
```

Strict configuration-এ parameter type না দিলে error হতে পারে:

```text
Parameter 'number1' implicitly has an 'any' type.
Parameter 'number2' implicitly has an 'any' type.
```

Type না থাকলে ভুল call-ও pass করতে পারে:

```ts
add(2, "2");
```

তাহলে TypeScript ব্যবহার করার সুবিধাই কমে যাবে। তাই parameter type দিই:

```ts
function add(number1: number, number2: number) {
  return number1 + number2;
}
```

এখন:

```ts
add(2, "2");
```

Error:

```text
Argument of type 'string' is not assignable to parameter of type 'number'.
```

## Return type

TypeScript return expression দেখে `number` infer করতে পারে। তবুও explicit return type লেখা যায়:

```ts
function add(number1: number, number2: number): number {
  return number1 + number2;
}
```

Function signature পড়লে এখন পরিষ্কার:

- `number1` → `number`
- `number2` → `number`
- return → `number`

Large codebase-এ এই contract খুব উপকারী।

## Arrow function

```ts
const addArrow = (number1: number, number2: number): number => {
  return number1 + number2;
};
```

Short form:

```ts
const addArrow = (number1: number, number2: number): number =>
  number1 + number2;
```

Normal function ও arrow function—দুটিতেই parameter ও return type define করা যায়।

## Object method

Object-এর মধ্যে function থাকলে তাকে method বলি।

```ts
const account = {
  name: "Mezba",
  balance: 0,

  addBalance(value: number): number {
    const totalBalance = this.balance + value;
    return totalBalance;
  },
};
```

এখানে:

- `addBalance` একটি method;
- `value` parameter-এর type `number`;
- `this.balance` object-এর `balance` property access করছে;
- return type `number`।

Call:

```ts
const newBalance = account.addBalance(1000);
console.log(newBalance);
```

Expected output:

```text
1000
```

`this.` লেখার পর editor object-এর property ও method suggestion দেখায়।

## Callback function in `map`

একটি number array:

```ts
const numbers: number[] = [1, 2, 3, 4];
```

প্রতিটি number square করতে:

```ts
const squaredNumbers = numbers.map((element: number): number => {
  return element * element;
});
```

Short form:

```ts
const squaredNumbers = numbers.map(
  (element: number): number => element * element,
);
```

Expected result:

```ts
[1, 4, 9, 16]
```

`map`-এর ভিতরের arrow function একটি callback function। Array `number[]` হওয়ায় TypeScript সাধারণত `element`-এর type নিজেই infer করতে পারে:

```ts
const squaredNumbers = numbers.map((element) => element * element);
```

তবু lecture-এ explicit typing practice করানো হয়েছে।

## Common Mistake: Arrow sign ভুলে যাওয়া

```ts
const add = (a: number, b: number): number {
  return a + b;
};
```

এখানে `=>` নেই। সঠিক code:

```ts
const add = (a: number, b: number): number => {
  return a + b;
};
```

ভুল হওয়া স্বাভাবিক। Instructor মজারভাবে বলেছেন, “ভুল করা আমাদের নৈতিক দায়িত্ব।” অর্থাৎ ভুলকে ভয় না পেয়ে error পড়ে ঠিক করতে হবে।

## Function Recap

আমরা শিখলাম:

- normal function-এর parameter ও return type;
- arrow function-এর type;
- object-এর function হলো method;
- loop/higher-order function-এর ভিতরে callback function;
- TypeScript development time-এ invalid argument detect করে।

পরবর্তী lesson-এ spread ও rest operator দেখব।

---

# ১০. Spread Operator ও Rest Operator

Spread ও rest দেখতে একই—দুটিতেই `...` লেখা হয়। কিন্তু concept একে অন্যের বিপরীত।

Instructor card-এর analogy দিয়েছেন:

- হাতে থাকা card-গুলো চারদিকে ছড়িয়ে দিলে → **spread**
- ছড়িয়ে থাকা card-গুলো এক জায়গায় জড়ো করলে → **rest**

অর্থাৎ:

- Spread মানে ছড়িয়ে দেওয়া।
- Rest মানে একসঙ্গে নিয়ে আসা।

File:

```text
spread-and-rest.ts
```

## Array-তে Spread Operator

ধরো তোমার কয়েকটি friend list আছে:

```ts
const friends: string[] = ["Rahim", "Karim"];

const schoolFriends: string[] = ["Pintu", "Chintu", "Bulbul"];

const collegeFriends: string[] = [
  "Mr. Smart",
  "Mr. Very Very Smart",
];
```

এখন school friend-দের `friends` array-তে push করতে গিয়ে লিখলে:

```ts
friends.push(schoolFriends);
```

Error:

```text
Argument of type 'string[]' is not assignable to parameter of type 'string'.
```

কারণ `push` এখানে একটি `string` আশা করছে, কিন্তু আমরা পুরো `string[]` পাঠিয়েছি। JavaScript-এ এটি run করলে nested array তৈরি হতে পারে:

```js
[
  "Rahim",
  "Karim",
  ["Pintu", "Chintu", "Bulbul"]
]
```

TypeScript development time-এই বুঝিয়ে দিচ্ছে যে structure ভুল হচ্ছে।

School friend-দের আলাদা আলাদা element হিসেবে ছড়িয়ে দিতে:

```ts
friends.push(...schoolFriends);
```

College friend-দেরও:

```ts
friends.push(...collegeFriends);
```

```ts
console.log(friends);
```

Expected output:

```text
[
  'Rahim',
  'Karim',
  'Pintu',
  'Chintu',
  'Bulbul',
  'Mr. Smart',
  'Mr. Very Very Smart'
]
```

`...schoolFriends` array container-টি না পাঠিয়ে তার element-গুলো ছড়িয়ে দেয়।

## Object-এ Spread Operator

ধরো user-এর information দুই object-এ আছে:

```ts
const user = {
  name: "Mezba",
  phoneNumber: "01700000000",
};

const otherInfo = {
  hobby: "Programming",
  favoriteColor: "Black",
};
```

দুটিকে merge করতে:

```ts
const userInfo = {
  ...user,
  ...otherInfo,
};
```

এখন `userInfo` হবে:

```ts
{
  name: "Mezba",
  phoneNumber: "01700000000",
  hobby: "Programming",
  favoriteColor: "Black"
}
```

```ts
console.log(userInfo);
```

Spread operator প্রতিটি source object-এর property নতুন object-এর মধ্যে ছড়িয়ে দেয়।

## Function parameter-এ Rest Operator

ধরো বিয়ের invitation পাঠানোর function লিখছি। Fixed তিনজন friend নিলে:

```ts
const inviteFriends = (
  friend1: string,
  friend2: string,
  friend3: string,
): void => {
  console.log(`Send invitation to ${friend1}`);
  console.log(`Send invitation to ${friend2}`);
  console.log(`Send invitation to ${friend3}`);
};
```

Call:

```ts
inviteFriends("Pintu", "Chintu", "Bulbul");
```

কিন্তু চতুর্থ friend `Chulbul` এলে signature বদলাতে হবে। আবার loop চালাতে চাইলে friend-গুলো array আকারে দরকার। ছড়িয়ে থাকা argument-গুলোকে একত্র করতে rest parameter ব্যবহার করি:

```ts
const inviteFriends = (...friends: string[]): void => {
  friends.forEach((friend: string) => {
    console.log(`Send invitation to ${friend}`);
  });
};
```

এখন যত ইচ্ছা argument দেওয়া যায়:

```ts
inviteFriends("Pintu", "Chintu", "Bulbul", "Chulbul");
```

Expected output:

```text
Send invitation to Pintu
Send invitation to Chintu
Send invitation to Bulbul
Send invitation to Chulbul
```

`...friends: string[]` কী করছে?

Call site-এ comma দিয়ে পাঠানো argument-গুলোকে function-এর ভিতরে একটি `string[]`-এ একত্র করছে। Spread এবং rest-এর syntax একই, কিন্তু direction আলাদা:

```ts
friends.push(...schoolFriends); // array থেকে element ছড়ানো: spread
```

```ts
const invite = (...friends: string[]) => {}; // argument জড়ো করা: rest
```

## Common Mistakes

### পুরো array push করা

```ts
friends.push(schoolFriends); // ভুল structure
```

সঠিক:

```ts
friends.push(...schoolFriends);
```

### Arrow function-এ `=>` বাদ দেওয়া

Lecture-এর live coding-এ এমন ভুল হয়েছিল। Error দেখে syntax ঠিক করতে হবে।

### Template literal-এ `$` বা `{}` ভুল করা

সঠিক:

```ts
console.log(`Send invitation to ${friend}`);
```

## Spread ও Rest Recap

- Spread `...` container খুলে element/property ছড়িয়ে দেয়।
- Rest `...` আলাদা argument এক array-তে জড়ো করে।
- দেখতে একই হলেও কাজ বিপরীত।

পরবর্তী lesson-এ destructuring দেখব।

---

# ১১. Destructuring: Object ও Array থেকে Value বের করা

Destructuring একটি simple কিন্তু powerful concept। এটি complex object বা array থেকে প্রয়োজনীয় value clean syntax-এ বের করতে সাহায্য করে। আগে deeply nested property access করতে বারবার dot notation লিখতে হতো; destructuring codebase পরিষ্কার রাখে।

File:

```text
destructuring.ts
```

আমরা দুই ধরনের destructuring দেখব:

1. Object destructuring
2. Array destructuring

## Object Destructuring

একটি deeply nested user object:

```ts
const user = {
  id: 123,
  name: {
    firstName: "Md",
    middleName: "Mezba Ul",
    lastName: "Haque",
  },
  gender: "male",
  favoriteColor: "black",
};
```

### Destructuring ছাড়া

Favorite color বের করতে:

```ts
const favoriteColor = user.favoriteColor;
```

Middle name বের করতে:

```ts
const middleName = user.name.middleName;
```

আরও গভীর nested object হলে dot chain বড় হতে থাকে।

### Basic object destructuring

যাকে destructure করব, তাকে ডান পাশে রাখব। যে property বের করব, তাকে বাম পাশে braces-এর মধ্যে লিখব:

```ts
const { favoriteColor } = user;
```

```ts
console.log(favoriteColor);
```

Expected output:

```text
black
```

### Name Alias

`favoriteColor` নামের বদলে `myFavoriteColor` নামে ব্যবহার করতে:

```ts
const { favoriteColor: myFavoriteColor } = user;
```

এখন:

```ts
console.log(myFavoriteColor);
```

Expected output:

```text
black
```

এটিকে **name alias** বলা হয়। Instructor দুইজন Rahim friend-এর analogy দিয়েছেন—দুজনের নাম একই হলে একজনকে আলাদা ডাকনাম দিলে বোঝা যায় কাকে ডাকা হচ্ছে। একইভাবে naming conflict বা clearer naming-এর জন্য alias ব্যবহার করা যায়।

### Destructuring-এ type annotation-এর tricky case

এভাবে লিখলে:

```ts
const { favoriteColor: string } = user;
```

এখানে `string` type annotation নয়; এটি alias variable-এর নাম হয়ে যায়। Object destructuring-এর colon alias বোঝায়। সাধারণত source object-এর type থেকেই destructured property-এর type infer হয়।

সঠিক alias:

```ts
const { favoriteColor: myFavoriteColor } = user;
```

TypeScript জানে `myFavoriteColor` একটি `string`, কারণ `user.favoriteColor` string।

### Nested object destructuring

`middleName` বের করতে:

```ts
const {
  name: { middleName },
} = user;
```

Alias-সহ:

```ts
const {
  name: { middleName: myMiddleName },
} = user;
```

```ts
console.log(myMiddleName);
```

Expected output:

```text
Mezba Ul
```

## Array Destructuring

```ts
const friends = ["Karim", "Rahim", "Mahim"];
```

### Index দিয়ে access

ধরো index `1`-এর friend best friend:

```ts
const myBestFriend = friends[1];
```

Output:

```text
Rahim
```

### Array destructuring

```ts
const [firstFriend, myBestFriend, thirdFriend] = friends;
```

এখানে position গুরুত্বপূর্ণ; object destructuring-এর মতো property name নয়।

### Unused element skip করা

প্রথম element লাগবে না, দ্বিতীয়টি লাগবে:

```ts
const [, myBestFriend] = friends;
```

একটি comma প্রথম position skip করে।

শুধু তৃতীয় element লাগলে:

```ts
const [, , myBestFriend] = friends;
```

দুটি comma প্রথম দুই index skip করে।

```ts
console.log(myBestFriend);
```

Expected output:

```text
Mahim
```

Instructor মজারভাবে বলেছেন, সময়ের সঙ্গে best friend বদলে যেতে পারে। Array destructuring-এ position বদলালে পাওয়া value-ও বদলে যায়।

## Destructuring Recap

- যাকে destructure করব, তাকে assignment-এর ডান পাশে রাখি।
- Object destructuring property name-এর ভিত্তিতে কাজ করে।
- `property: alias` দিয়ে name alias করা যায়।
- Nested braces দিয়ে deeply nested property বের করা যায়।
- Array destructuring index/position-এর ভিত্তিতে কাজ করে।
- Comma দিয়ে unused position skip করা যায়।

Complex project-এ destructuring নিয়মিত ব্যবহার হবে এবং codebase পরিষ্কার রাখবে।

---

# ১২. Type Alias: Type-কে নাম দিয়ে Reuse করা

Type alias মানে একটি type structure-কে নাম দেওয়া, যাতে পরে বারবার reuse করা যায়। বড় object structure প্রতিটি variable-এর পাশে লিখলে repetition হয়। Structure একই থাকে, শুধু value বদলায়। তাই structure-টিকে নাম দিয়ে ব্যবহার করা যায়।

File:

```text
type-alias.ts
```

## Repeated object type-এর সমস্যা

ধরো দুটি user object একই structure অনুসরণ করে:

```ts
const user1: {
  id: number;
  name: {
    firstName: string;
    lastName: string;
  };
  gender: "male" | "female";
  contactNo: string;
  address: {
    division: string;
    city: string;
  };
} = {
  id: 1,
  name: {
    firstName: "Mr.",
    lastName: "One",
  },
  gender: "male",
  contactNo: "01700000000",
  address: {
    division: "Dhaka",
    city: "Dhaka",
  },
};
```

আরেকটি user-এর জন্য পুরো type আবার লিখলে code repetitive হবে।

## Object Type Alias

Convention হিসেবে custom type-এর নাম capital letter দিয়ে শুরু করা হয়:

```ts
type User = {
  id: number;
  name: {
    firstName: string;
    lastName: string;
  };
  gender: "male" | "female";
  contactNo: string;
  address: {
    division: string;
    city: string;
  };
};
```

এখন object declaration পরিষ্কার:

```ts
const user1: User = {
  id: 1,
  name: {
    firstName: "Mr.",
    lastName: "One",
  },
  gender: "male",
  contactNo: "01700000000",
  address: {
    division: "Dhaka",
    city: "Dhaka",
  },
};

const user2: User = {
  id: 2,
  name: {
    firstName: "Ms.",
    lastName: "Two",
  },
  gender: "female",
  contactNo: "01800000000",
  address: {
    division: "Chattogram",
    city: "Chattogram",
  },
};
```

একই structure বারবার না লিখে `User` নামটি reuse করা হচ্ছে। এটিই type aliasing।

## Primitive Type Alias

Type alias শুধু object-এর জন্য নয়। Primitive-এর ক্ষেত্রেও করা যায়:

```ts
type IsAdmin = boolean;

const isAdmin: IsAdmin = true;
```

String alias:

```ts
type Name = string;

const myName: Name = "Mezba";
```

তবে Instructor সতর্ক করেছেন: সহজ জিনিস অপ্রয়োজনীয়ভাবে কঠিন করো না। শুধু `boolean` বা `string` লিখলেই যদি পরিষ্কার হয়, সেখানে alias সবসময় দরকার নেই। Alias ব্যবহার করো যখন naming অর্থবহ হয় বা type reuse সত্যিই code পরিষ্কার করে।

## Function Type Alias

আগে function:

```ts
const add = (number1, number2) => number1 + number2;
```

Function-এর signature alias করা যায়:

```ts
type AddFunction = (number1: number, number2: number) => number;
```

তারপর:

```ts
const add: AddFunction = (number1, number2) => {
  return number1 + number2;
};
```

এখন TypeScript জানে:

- `number1` → `number`
- `number2` → `number`
- return → `number`

Function-এর পাশে আবার parameter type লিখতে হয়নি।

## Type Alias Recap

- বড় type structure-কে নাম দিয়ে reuse করা যায়।
- Object, primitive ও function—সব ক্ষেত্রেই type alias সম্ভব।
- Custom type-এর নাম সাধারণত PascalCase-এ লেখা হয়।
- Alias repetition কমিয়ে code clean করে।

পরবর্তী lesson-এ union ও intersection type দেখব।

---

# ১৩. Union Type ও Intersection Type

আগে `|` চিহ্নকে মজারভাবে “খাম্বা” বলা হয়েছিল। এর formal নাম union operator। এই lesson-এ union ও intersection type practical example-সহ দেখব।

File:

```text
union-and-intersection.ts
```

## Union Type: অথবা

Union-এর অর্থ **OR**—এটি না হলে ওটি।

```ts
type UserRole = "admin" | "user";
```

এখানে allowed value:

- `"admin"`
- অথবা `"user"`

Dashboard function:

```ts
const getDashboard = (role: UserRole): string => {
  if (role === "admin") {
    return "Admin Dashboard";
  }

  if (role === "user") {
    return "User Dashboard";
  }

  return "Guest Dashboard";
};
```

Valid call:

```ts
getDashboard("admin");
getDashboard("user");
```

Invalid call:

```ts
getDashboard("guest");
```

Error, কারণ `guest` union-এর অংশ নয়। এখানে `"admin"` ও `"user"` প্রত্যেকটি literal type; `|` দিয়ে union করা হয়েছে।

## Intersection Type: সব একসঙ্গে

Intersection-এর অর্থ **AND**—দুটি type-এর সব requirement একসঙ্গে নিতে হবে।

Instructor শিশুর চেহারার analogy দিয়েছেন: নতুন বাচ্চাকে দেখে আমরা বলি—নাক মায়ের মতো, চোখ বাবার মতো, চুল নানার মতো। অর্থাৎ বিভিন্ন জায়গার বৈশিষ্ট্য একসঙ্গে এসেছে। Intersection-এও একাধিক type-এর property এক type-এ আসে।

Employee type:

```ts
type Employee = {
  name: string;
  id: string;
  phoneNo: string;
};
```

Manager type:

```ts
type Manager = {
  designation: string;
  teamSize: number;
};
```

একজন employee একই সঙ্গে manager হলে:

```ts
type EmployeeManager = Employee & Manager;
```

খেয়াল করো, logical AND-এ `&&` ব্যবহার করি; type intersection-এ একটি `&` ব্যবহার করা হয়।

এখন object-এ দুই type-এর সব property দিতে হবে:

```ts
const chowdhurySahib: EmployeeManager = {
  name: "Chowdhury Sahib",
  id: "EMP-101",
  phoneNo: "01700000000",
  designation: "Manager",
  teamSize: 20,
};
```

শুধু employee property দিলে:

```ts
const chowdhurySahib: EmployeeManager = {
  name: "Chowdhury Sahib",
  id: "EMP-101",
  phoneNo: "01700000000",
};
```

Error বলবে `designation` ও `teamSize` missing।

Error message একবারে ভয় না পেয়ে ধাপে ধাপে পড়ো। একটি missing property যোগ করলে পরের missing property দেখাতে পারে। Project-এ এভাবেই error বুঝে এগোতে হবে।

## Union বনাম Intersection

```ts
type AorB = A | B;
```

এখানে A অথবা B-এর compatible shape/value গ্রহণযোগ্য।

```ts
type AandB = A & B;
```

এখানে A এবং B—দুটির requirement-ই পূরণ করতে হবে।

## Union ও Intersection Recap

- `|` → union → OR → এটি অথবা ওটি।
- `&` → intersection → AND → সব requirement একসঙ্গে।
- Literal type union করে restricted value set তৈরি করা যায়।
- Existing type combine করে richer object type তৈরি করা যায়।

---

# ১৪. একই `?`, ভিন্ন কাজ: Ternary, Nullish Coalescing ও Optional Chaining

একটি question mark বিভিন্ন context-এ ভিন্ন কাজ করে। দেখতে same same, কিন্তু concept different। এই lesson-এ তিনটি ব্যবহার দেখব:

1. Ternary operator: `condition ? a : b`
2. Nullish coalescing operator: `value ?? fallback`
3. Optional chaining: `object?.property`

File:

```text
question-mark.ts
```

## ১৪.১ Ternary Operator: Decision Making

বাংলাদেশের আইন অনুসারে lecture example-এ ছেলেদের বিয়ের minimum age `21` ধরা হয়েছে। একটি function লিখি:

```ts
const checkMarriageEligibility = (age: number): void => {
  if (age >= 21) {
    console.log("You are eligible");
  } else {
    console.log("You are not eligible");
  }
};
```

Call:

```ts
checkMarriageEligibility(21);
```

Output:

```text
You are eligible
```

```ts
checkMarriageEligibility(20);
```

Output:

```text
You are not eligible
```

একই decision ternary operator-এ:

```ts
const checkMarriageEligibility = (age: number): void => {
  const result =
    age >= 21 ? "You are eligible" : "You are not eligible";

  console.log(result);
};
```

এখানে:

- condition সত্য হলে `?`-এর পরের expression;
- মিথ্যা হলে `:`-এর পরের expression।

একটি question mark এখানে ternary operator-এর অংশ এবং decision making করে।

## ১৪.২ Nullish Coalescing Operator

Front-end application-এ user theme থাকতে পারে—light বা dark। User কোনো theme select না করলে default theme দিতে চাই।

```ts
const userTheme: string | null | undefined = undefined;

const selectedTheme = userTheme ?? "light theme";
```

```ts
console.log(selectedTheme);
```

Expected output:

```text
light theme
```

`??` শুধু left side `null` বা `undefined` হলে fallback ব্যবহার করে।

`null` হলেও:

```ts
const userTheme = null;
const selectedTheme = userTheme ?? "light theme";
```

Output:

```text
light theme
```

কিন্তু empty string হলে:

```ts
const userTheme = "";
const selectedTheme = userTheme ?? "light theme";
```

Output empty string-ই হবে; fallback হবে না। কারণ `""` falsy হলেও nullish নয়।

Actual theme থাকলে:

```ts
const userTheme = "green theme";
const selectedTheme = userTheme ?? "light theme";
```

Output:

```text
green theme
```

## Ternary ও Nullish-এর সূক্ষ্ম পার্থক্য

দুটিকে একই variable-এ compare করি:

```ts
const isAuthenticated: string | null = null;

const resultTernary = isAuthenticated
  ? isAuthenticated
  : "You are a guest";

const resultNullish = isAuthenticated ?? "You are a guest";

console.log({ resultTernary, resultNullish });
```

`null` হলে দুটিই fallback দেয়:

```text
{
  resultTernary: 'You are a guest',
  resultNullish: 'You are a guest'
}
```

এবার empty string:

```ts
const isAuthenticated = "";
```

Ternary empty string-কে falsy ধরে fallback দেবে। Nullish coalescing empty string-কে valid value ধরে empty string রাখবে।

Conceptual output:

```text
{
  resultTernary: 'You are a guest',
  resultNullish: ''
}
```

Rule:

- Ternary condition JavaScript truthy/falsy rule অনুসরণ করে।
- `??` শুধু `null` ও `undefined` দেখে।

## ১৪.৩ Optional Chaining

একটি nested object:

```ts
const user: {
  address: {
    city: string;
    town: string;
    postalCode?: string;
  };
} = {
  address: {
    city: "Dhaka",
    town: "Banani",
  },
};
```

`postalCode` optional। Access:

```ts
const postalCode = user.address.postalCode;
```

Value হবে:

```text
undefined
```

যখন chain-এর আগের object-ও missing হতে পারে, optional chaining ব্যবহার করা হয়:

```ts
const postalCode = user?.address?.postalCode;
```

এতে missing path-এর কারণে immediate property access error/exception এড়ানো যায় এবং result `undefined` হয়। Complex API data-তে optional nested property access করার সময় এটি খুব দরকারি।

### Technical Note

Optional chaining application-এর সব ধরনের crash প্রতিরোধ করে না; এটি মূলত chain-এর `null`/`undefined` অংশে unsafe property access এড়ায়। Lecture-এর মূল warning হলো—optional data access করার সময় chain নিরাপদ রাখো।

## Question Mark Recap

- `condition ? trueValue : falseValue` → ternary operator; decision making।
- `value ?? defaultValue` → nullish coalescing; শুধু `null`/`undefined` হলে default।
- `object?.property` → optional chaining; optional path safely access।

একই question mark context অনুযায়ী ভিন্ন ভূমিকা পালন করে।

---

# ১৫. Nullable, Unknown ও Never Type

Module-এর শেষে তিনটি special type দেখব:

- nullable type
- `unknown`
- `never`

এগুলো আগে আংশিকভাবে ব্যবহার করেছি, এখন নাম ও practical usage পরিষ্কার করব।

File:

```text
nullable-unknown-never.ts
```

## ১৫.১ Nullable Type

ধরো একটি function input পেলে নির্দিষ্ট user দেখাবে, আর `null` পেলে সব user দেখাবে।

```ts
const getUser = (input: string | null): void => {
  if (input) {
    console.log(`User from database: ${input}`);
  } else {
    console.log("All users from database");
  }
};
```

Specific user:

```ts
getUser("Mezba");
```

Output:

```text
User from database: Mezba
```

সব user:

```ts
getUser(null);
```

Output:

```text
All users from database
```

এখানে `string | null` হলো nullable type pattern। আমরা `null`-কে allowed type হিসেবে union-এ রেখেছি।

## ১৫.২ `unknown` Type

`unknown` মানে input-এর type এখনো জানা নেই। User runtime-এ কী পাঠাবে—number, string, null—আগে নিশ্চিত না হলে `unknown` ব্যবহার করা যায়। তবে ব্যবহার করার আগে type check করতে হবে।

একটি discount calculator ধরি। Input তিনভাবে আসতে পারে:

```ts
calculateDiscount(100);
calculateDiscount("100 taka");
calculateDiscount(null);
```

Function:

```ts
const calculateDiscount = (input: unknown): void => {
  if (typeof input === "number") {
    const discountedPrice = input * 0.1;
    console.log(discountedPrice);
  } else if (typeof input === "string") {
    const [price] = input.split(" ");
    const discountedPrice = Number(price) * 0.1;
    console.log(discountedPrice);
  } else {
    console.log("Wrong input");
  }
};
```

Number call:

```ts
calculateDiscount(100);
```

Expected output:

```text
10
```

String call:

```ts
calculateDiscount("100 taka");
```

Step-by-step:

1. `typeof input === "string"` branch-এ ঢোকে।
2. `input.split(" ")` result:

```ts
["100", "taka"]
```

3. Array destructuring দিয়ে প্রথম element নেওয়া হয়:

```ts
const [price] = input.split(" ");
```

4. `price` string, তাই number-এ convert করা হয়:

```ts
Number(price)
```

5. `0.1` দিয়ে গুণ করে 10% calculation করা হয়।

Expected output:

```text
10
```

Null call:

```ts
calculateDiscount(null);
```

Expected output:

```text
Wrong input
```

এখানে মূল flow:

- Function call runtime-এ হলে actual type জানা যায়।
- `typeof` দিয়ে type narrowing করা হয়।
- Number হলে number logic।
- String হলে parse/convert করে logic।
- অন্য input হলে invalid branch।

`unknown` নিরাপদ, কারণ narrowing ছাড়া arbitrary operation করতে দেয় না।

## Common Mistake: String-এর উপর সরাসরি arithmetic

Split করা value string:

```ts
const [price] = "100 taka".split(" ");
```

Arithmetic-এর আগে convert করো:

```ts
const discountedPrice = Number(price) * 0.1;
```

## ১৫.৩ `never` Type

এমন function যা কোনোদিন normalভাবে return করে না, তার return type `never` হতে পারে। উদাহরণ: function সবসময় error throw করে।

```ts
const throwError = (message: string): never => {
  throw new Error(message);
};
```

Call:

```ts
throwError("Something went wrong");
```

এই function কোনো value return করবে না; execution error throw করে থেমে যাবে। তাই return type `never`।

Instructor-এর ভাষায়: function জীবনে কোনোদিন কিছু return করবে না।

`void` ও `never` এক নয়:

```ts
const logMessage = (message: string): void => {
  console.log(message);
};
```

এই function normalভাবে শেষ হয়, শুধু meaningful value return করে না।

```ts
const throwError = (message: string): never => {
  throw new Error(message);
};
```

এই function normal completion-এ পৌঁছায় না।

### Technical Note

Lecture-এ `nullable`, `unknown`, `never`-কে special primitive type হিসেবে শেখানো হয়েছে। TypeScript-এর formal type system classification নিয়ে বিভিন্ন documentation-এ আরও সূক্ষ্ম আলোচনা আছে; এখানে teaching flow অনুযায়ী practical usage রাখা হলো।

## Special Types Recap

- `string | null` দিয়ে nullable input model করা যায়।
- `unknown` runtime input-এর type আগে জানা না থাকলে ব্যবহার করা যায়; operation-এর আগে narrowing জরুরি।
- `never` এমন function-এর জন্য, যা normalভাবে return করে না।
- এগুলো প্রতিদিন সব জায়গায় নাও লাগতে পারে, কিন্তু complex situation-এ গুরুত্বপূর্ণ।

---

# ১৬. Module Recap

দেখতে দেখতে আমরা module-এর শেষ lesson-এ চলে এসেছি। এই module-এ TypeScript-এর basic type system ও daily-use syntax-এর একটি শক্ত ভিত্তি তৈরি হয়েছে। পরের module-এ advanced type নিয়ে আরও গভীরে যাওয়া হবে। তার আগে পুরো module-এর flow recap করি।

## Primitive Types

আমরা `string`, `number`, `boolean`, `undefined`, `null` এবং special type-এর পরিচয় দেখেছি। Explicit annotation ও implicit inference-এর পার্থক্য বুঝেছি। TypeScript development time-এ invalid assignment ও invalid method call detect করে।

## Non-Primitive Types

Array, mixed array, tuple এবং object type দেখেছি। Tuple-এর fixed length ও fixed positional pattern বুঝেছি। Object property required, optional, literal এবং `readonly` হতে পারে।

## Functions

Normal function ও arrow function-এর parameter এবং return type define করেছি। Object-এর function-কে method এবং `map`/loop-এর function-কে callback হিসেবে ব্যবহার করেছি।

## Spread ও Rest

Spread দিয়ে array element বা object property ছড়িয়ে দিয়েছি। Rest দিয়ে আলাদা argument এক array-তে জড়ো করেছি। Card ছড়ানো ও card এক জায়গায় জড়ো করার analogy মনে রাখলে পার্থক্য সহজ হবে।

## Destructuring

Object ও array থেকে clean syntax-এ value বের করেছি। Object destructuring-এ name alias এবং nested destructuring দেখেছি। Array destructuring-এ comma দিয়ে position skip করেছি।

## Type Alias

Repeated object structure ও function signature-কে নাম দিয়ে reuse করেছি। এতে code clean ও maintainable হয়েছে।

## Union ও Intersection

`|` দিয়ে OR/union এবং `&` দিয়ে AND/intersection করেছি। Literal type-এর allowed value set এবং multiple object type-এর combined requirement দেখেছি।

## Question Mark-এর তিন ব্যবহার

- Ternary operator decision making করে।
- Nullish coalescing শুধু `null` ও `undefined`-এর জন্য fallback দেয়।
- Optional chaining optional nested path safely access করে।

## Nullable, Unknown ও Never

Nullable input, runtime type narrowing-এর জন্য `unknown`, এবং কখনো normalভাবে return না করা function-এর জন্য `never` দেখেছি।

---

# Common Mistakes ও Tricky Cases

## ১. Type annotation না দিয়ে function parameter রেখে দেওয়া

```ts
function add(a, b) {
  return a + b;
}
```

Strict mode-এ implicit `any` error হবে। Parameter-এর expected type লিখো।

## ২. Array-এর মধ্যে পুরো array push করা

```ts
friends.push(schoolFriends);
```

Element ছড়িয়ে দিতে:

```ts
friends.push(...schoolFriends);
```

## ৩. Object property type declare করে value না দেওয়া

Property default-ভাবে required। Optional হলে `?` দাও।

## ৪. Destructuring-এর colon-কে type annotation ভাবা

```ts
const { favoriteColor: string } = user;
```

এখানে `string` alias variable, type নয়।

## ৫. Ternary ও `??`-কে একই ভাবা

Ternary truthy/falsy দেখে; `??` শুধু `null`/`undefined` দেখে। Empty string, `0`, `false`-এর ক্ষেত্রে difference দেখা যায়।

## ৬. `unknown` value narrowing ছাড়াই ব্যবহার করা

আগে `typeof`, `Array.isArray`, property check বা উপযুক্ত guard দিয়ে type narrow করো।

## ৭. `never` ও `void` গুলিয়ে ফেলা

`void` function normalভাবে শেষ হতে পারে; `never` function normalভাবে শেষ হয় না।

## ৮. Version-sensitive command মুখস্থ করা

Node.js-এর TypeScript support ও flags version অনুযায়ী বদলাতে পারে। Official documentation দেখো।

---

# Interview Questions

## প্রশ্ন ১: TypeScript কেন ব্যবহার করা হয়?

TypeScript static type checking-এর মাধ্যমে development time-এ bug detect করে, code readability ও editor tooling বাড়ায়, code-কে self-documenting করে এবং large-scale/team project maintain করতে সাহায্য করে।

## প্রশ্ন ২: Implicit ও Explicit type-এর পার্থক্য কী?

TypeScript value দেখে type infer করলে implicit type; developer annotation লিখে type জানালে explicit type।

## প্রশ্ন ৩: Array ও Tuple-এর পার্থক্য কী?

Array সাধারণত variable-length collection; tuple fixed length ও fixed positional type pattern প্রকাশ করে।

## প্রশ্ন ৪: Optional property কীভাবে লিখি?

```ts
middleName?: string;
```

Property থাকতেও পারে, নাও থাকতে পারে।

## প্রশ্ন ৫: Literal type কী?

Exact value-কে type হিসেবে ব্যবহার করা।

```ts
type Role = "admin";
```

## প্রশ্ন ৬: Spread ও Rest-এর পার্থক্য কী?

দুটির syntax `...`। Spread container-এর value ছড়িয়ে দেয়; rest আলাদা value একত্র করে।

## প্রশ্ন ৭: Union ও Intersection-এর পার্থক্য কী?

Union `|` alternatives প্রকাশ করে; intersection `&` multiple type-এর সব requirement combine করে।

## প্রশ্ন ৮: `unknown` কেন `any`-এর চেয়ে নিরাপদ?

`unknown` value ব্যবহার করার আগে type narrowing বাধ্য করে; `any` type checking এড়িয়ে যায়।

## প্রশ্ন ৯: `never` কখন ব্যবহার হয়?

যে function কখনো normalভাবে return করে না—যেমন সবসময় error throw করে—তার return type `never`।

---

# Assignment / Task

Lecture-এ আলাদা formal assignment ঘোষণা করা হয়নি, তবে শেখানো flow অনুযায়ী নিচের practice task-গুলো সরাসরি সম্পন্ন করো:

## Task ১: Environment Setup

1. আগে থেকে install করা direct Node.js থাকলে conflict আছে কি না যাচাই করো।
2. `nvm` install করো।
3. দুটি আলাদা Node.js version install ও switch করো।
4. `node -v` দিয়ে active version যাচাই করো।

## Task ২: TypeScript Project

1. `typescript-learning` folder তৈরি করো।
2. TypeScript global install করো।
3. `tsc --init` চালাও।
4. `rootDir` হিসেবে `src` এবং `outDir` হিসেবে `dist` configure করো।
5. `tsc` চালিয়ে compiled JavaScript তৈরি করো।

## Task ৩: Type Practice

একটি file-এ নিচের code নিজে লেখো:

- `string`, `number`, `boolean` variable;
- `string[]` array;
- `(string | number)[]` mixed array;
- `[string, number]` tuple;
- required ও optional property-সহ object;
- literal type ও `readonly` property।

## Task ৪: Function Practice

- দুই সংখ্যার যোগফলের normal function;
- একই কাজের arrow function;
- object method;
- `map` ব্যবহার করে number square করার callback।

## Task ৫: Operator Practice

- দুই array spread করে merge করো;
- দুই object spread করে merge করো;
- rest parameter দিয়ে unlimited friend invitation function বানাও;
- ternary ও nullish coalescing-এর difference empty string দিয়ে test করো;
- optional chaining দিয়ে nested optional property access করো।

## Task ৬: Type Composition

- `User` type alias তৈরি করো;
- `Admin | User` union type তৈরি করো;
- `Employee & Manager` intersection type তৈরি করো;
- `unknown` input narrow করে number ও string আলাদাভাবে handle করো;
- error-throwing `never` function লেখো।

সব task-এ editor error message পড়ো, expected output predict করো, তারপর run করে যাচাই করো। Documentation search করার অভ্যাস তৈরি করো; command মুখস্থ করার চেষ্টা করো না।

---

# Final Recap

এই অধ্যায়ে আমরা TypeScript শেখার environment তৈরি করেছি এবং Node.js version management থেকে শুরু করে compiler configuration পর্যন্ত পুরো workflow দেখেছি। এরপর primitive ও non-primitive type, type inference, array, tuple, object, optional property, literal type, `readonly`, function, method, callback, spread, rest, destructuring, type alias, union, intersection, ternary, nullish coalescing, optional chaining, nullable, `unknown` ও `never`—সব concept lecture flow অনুযায়ী practice করেছি।

সবচেয়ে গুরুত্বপূর্ণ শিক্ষা হলো: TypeScript শুধু syntax নয়; এটি development time-এ ভুল ধরার, code-এর intent স্পষ্ট করার এবং বড় codebase maintainable রাখার একটি system। Error message মন দিয়ে পড়ো, documentation অনুসরণ করো এবং প্রতিটি concept code run করে যাচাই করো। পরবর্তী module-এ advanced TypeScript type নিয়ে আরও গভীরে যাওয়া হবে।
