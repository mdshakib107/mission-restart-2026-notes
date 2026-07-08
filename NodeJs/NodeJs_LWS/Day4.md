# Node.js Global Object এবং Module System — বইয়ের স্টাইলে পূর্ণাঙ্গ নোট

> **Source:** আপলোড করা Node.js টিউটোরিয়াল ট্রান্সক্রিপ্ট  
> **Topic:** Node.js এর `global` object, `window` object এর সাথে পার্থক্য, CommonJS module system, `require()`, `module.exports`, module wrapper function, local/external/built-in modules  
> **Target Reader:** Beginner থেকে Intermediate Node.js learner  
> **Style:** Documentation + textbook-style explanation

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Chapter 1: Browser JavaScript-এ `window` Object](#chapter-1-browser-javascript-এ-window-object)
4. [Chapter 2: Node.js-এ `window` নেই কেন](#chapter-2-nodejs-এ-window-নেই-কেন)
5. [Chapter 3: Node.js Global Object](#chapter-3-nodejs-global-object)
6. [Chapter 4: Top-level Variable কেন `global`-এ attach হয় না](#chapter-4-top-level-variable-কেন-global-এ-attach-হয়-না)
7. [Chapter 5: `__dirname` এবং `__filename`](#chapter-5-__dirname-এবং-__filename)
8. [Chapter 6: Browser Script Problem এবং Modularity সমস্যা](#chapter-6-browser-script-problem-এবং-modularity-সমস্যা)
9. [Chapter 7: Node.js Module System কী](#chapter-7-nodejs-module-system-কী)
10. [Chapter 8: First Custom Module তৈরি করা](#chapter-8-first-custom-module-তৈরি-করা)
11. [Chapter 9: `require()` কীভাবে কাজ করে](#chapter-9-require-কীভাবে-কাজ-করে)
12. [Chapter 10: `module.exports` দিয়ে Export করা](#chapter-10-moduleexports-দিয়ে-export-করা)
13. [Chapter 11: Multiple Export](#chapter-11-multiple-export)
14. [Chapter 12: Node.js Module Wrapper Function](#chapter-12-nodejs-module-wrapper-function)
15. [Chapter 13: Relative Path দিয়ে Module Import করা](#chapter-13-relative-path-দিয়ে-module-import-করা)
16. [Chapter 14: External Module / npm Package](#chapter-14-external-module--npm-package)
17. [Chapter 15: Built-in / Core Modules](#chapter-15-built-in--core-modules)
18. [Chapter 16: Node.js Module-এর ৩ ধরন](#chapter-16-nodejs-module-এর-৩-ধরন)
19. [Common Mistakes](#common-mistakes)
20. [Best Practices](#best-practices)
21. [Quick Revision](#quick-revision)
22. [Interview / Exam Style Questions](#interview--exam-style-questions)
23. [Key Takeaways](#key-takeaways)

---

# Overview

এই টিউটোরিয়ালের মূল আলোচ্য বিষয় দুটি:

1. **Node.js Global Object**
2. **Node.js Module System**

Node.js শেখার শুরুতেই এই দুটি ধারণা পরিষ্কার থাকা জরুরি। কারণ Node.js-এ আমরা সাধারণত অনেকগুলো আলাদা `.js` ফাইল, built-in module, external package, এবং নিজের লেখা module নিয়ে কাজ করি। এই ফাইলগুলোর মধ্যে কোন variable কোথায় available থাকবে, কোন function কীভাবে এক ফাইল থেকে আরেক ফাইলে যাবে, `require()` কী করে, `module.exports` কী—এসব না বুঝলে Node.js project বুঝতে সমস্যা হবে।

এই নোটে আমরা browser JavaScript থেকে শুরু করে ধাপে ধাপে Node.js-এর module system বুঝব।

---

# Prerequisites

এই নোট ভালোভাবে বোঝার জন্য নিচের বিষয়গুলো জানা থাকলে সুবিধা হবে:

- JavaScript variable declaration: `var`, `let`, `const`
- Function scope এবং block scope সম্পর্কে basic ধারণা
- Object কী এবং property কী
- Function কী
- Array কী
- Terminal থেকে Node.js file run করা
- Basic command:

```bash
node index.js
```

---

# Chapter 1: Browser JavaScript-এ `window` Object

## 1.1 `window` object কী?

Browser environment-এ JavaScript run করলে browser আমাদের জন্য একটি global object দেয়। এই object-এর নাম:

```js
window
```

Browser-এ `window` হলো এমন একটি object, যার মধ্যে browser-related অনেক global property এবং function থাকে।

উদাহরণ:

```js
console.log(window);
```

Browser console-এ এটা run করলে একটি বড় object দেখা যায়। এই object-এর মধ্যে অনেক built-in feature থাকে।

## 1.2 `window`-এর মধ্যে কী কী থাকে?

Browser-এর `window` object-এর মধ্যে সাধারণত থাকে:

| Feature | Example | কাজ |
|---|---|---|
| Timer functions | `setTimeout`, `setInterval` | নির্দিষ্ট সময় পরে বা interval অনুযায়ী code run করা |
| DOM-related APIs | `document` | HTML document access করা |
| Browser events | `onclick`, `onchange` | User interaction handle করা |
| Location info | `location` | Current URL সম্পর্কে তথ্য |
| Console | `console` | Debug output print করা |

উদাহরণ:

```js
window.setTimeout(() => {
  console.log("Hello after 1 second");
}, 1000);
```

কিন্তু আমরা সাধারণত এভাবে লিখি:

```js
setTimeout(() => {
  console.log("Hello after 1 second");
}, 1000);
```

দুটিই browser-এ কাজ করে, কারণ `setTimeout` আসলে `window` object-এর property।

## 1.3 Browser-এ global variable এবং `window`

Classic browser script-এ যদি top-level এ `var` দিয়ে variable declare করা হয়, সেটি `window` object-এর property হয়ে যায়।

```js
var a = 5;

console.log(a);        // 5
console.log(window.a); // 5
```

এখানে `a` এবং `window.a` practically একই value refer করছে।

### Important Modern Note

Browser-এ top-level `var` classic script-এ `window`-এ attach হয়। কিন্তু `let`, `const`, এবং ES Module (`type="module"`) এর ক্ষেত্রে behavior আলাদা। যেমন:

```js
let x = 10;
const y = 20;

console.log(window.x); // undefined
console.log(window.y); // undefined
```

এই নোটের আলোচনাটি মূলত classic browser script এবং Node.js CommonJS module context বোঝানোর জন্য।

---

# Chapter 2: Node.js-এ `window` নেই কেন

## 2.1 Node.js browser নয়

Node.js browser-এর ভিতরে run করে না। Node.js run করে:

- আপনার local machine-এ
- server-এ
- terminal environment-এ
- backend runtime হিসেবে

তাই Node.js environment-এ browser window নেই। সেই কারণে browser-এর `window` object-ও নেই।

## 2.2 Example: Node.js-এ `window` use করলে কী হয়?

`index.js`:

```js
console.log(window);
```

Run:

```bash
node index.js
```

Output:

```txt
ReferenceError: window is not defined
```

কারণ Node.js-এ `window` define করা নেই।

## 2.3 কেন `window` থাকা দরকার নেই?

`window` object browser-specific। Browser window, DOM, URL bar, document, click event—এসব browser-এর concept। Node.js backend/server environment-এ এগুলো নেই।

Node.js-এর primary কাজ:

- server তৈরি করা
- file system access করা
- network request handle করা
- API তৈরি করা
- database-এর সাথে কাজ করা
- command-line tools বানানো

তাই Node.js-এ browser-specific `window` object-এর প্রয়োজন নেই।

---

# Chapter 3: Node.js Global Object

## 3.1 Node.js-এ `global` object

Browser-এর `window` object-এর মতো Node.js environment-এ একটি global object আছে। এর নাম:

```js
global
```

Example:

```js
console.log(global);
```

এটি run করলে Node.js-এর global object দেখা যাবে।

## 3.2 `global` object-এর কাজ

Node.js-এর কিছু global value/function `global` object-এর মাধ্যমে available থাকে। যেমন:

```js
setTimeout(() => {
  console.log("Test");
}, 1000);
```

এখানে আমরা কোথাও `setTimeout` import করিনি। তবুও এটি কাজ করে।

কারণ Node.js environment-এ `setTimeout` global ভাবে available।

Equivalent way:

```js
global.setTimeout(() => {
  console.log("Test");
}, 1000);
```

## 3.3 Common global functions

Node.js `global` object বা global environment-এ নিচের timer functions পাওয়া যায়:

| Function | কাজ |
|---|---|
| `setTimeout()` | নির্দিষ্ট delay-এর পরে function run করে |
| `setInterval()` | নির্দিষ্ট interval পরপর function run করে |
| `clearTimeout()` | `setTimeout()` cancel করে |
| `clearInterval()` | `setInterval()` cancel করে |

Example:

```js
const timerId = setTimeout(() => {
  console.log("This will run after 2 seconds");
}, 2000);

clearTimeout(timerId);
```

এই code-এ `setTimeout` schedule করা হলেও `clearTimeout` দিয়ে সেটি cancel করা হয়েছে।

## 3.4 `window` বনাম `global`

| বিষয় | Browser | Node.js |
|---|---|---|
| Global object | `window` | `global` |
| Runtime environment | Browser | Server / Machine |
| DOM access | আছে | নেই |
| `document` | আছে | নেই |
| `setTimeout` | আছে | আছে |
| Top-level `var` global object-এ attach হয়? | Classic script-এ হয় | হয় না |
| File/module isolation | Classic script-এ নেই | আছে |

## 3.5 `globalThis`

Modern JavaScript-এ একটি standard global reference আছে:

```js
globalThis
```

Browser-এ:

```js
globalThis === window // true, সাধারণ browser context-এ
```

Node.js-এ:

```js
globalThis === global // true
```

তাই cross-environment code লেখার ক্ষেত্রে `globalThis` অনেক সময় useful।

---

# Chapter 4: Top-level Variable কেন `global`-এ attach হয় না

## 4.1 Browser behavior

Classic browser script-এ:

```js
var a = 5;

console.log(window.a); // 5
```

## 4.2 Node.js behavior

Node.js file-এ:

```js
var a = 5;

console.log(global.a);
```

Output:

```txt
undefined
```

এখানে `a` variable `global` object-এ attach হয়নি।

## 4.3 কেন attach হয় না?

কারণ Node.js প্রত্যেকটি `.js` file-কে আলাদা module হিসেবে treat করে। একটি file-এর top-level variable সেই file/module-এর ভিতরেই scoped থাকে।

মানে:

```js
// index.js
var a = 5;
```

এই `a` পুরো application-এর global variable নয়। এটি শুধু `index.js` module-এর local scope-এর মধ্যে থাকে।

## 4.4 এর সুবিধা কী?

এটি খুব গুরুত্বপূর্ণ design decision।

যদি প্রতিটি file-এর variable automatically global হয়ে যেত, তাহলে বড় application-এ name conflict হতো।

Example:

```js
// file1.js
var user = "Rahim";

// file2.js
var user = "Karim";
```

যদি দুটোই global হত, তাহলে একটির value আরেকটি overwrite করতে পারত। Node.js module system এই সমস্যা prevent করে।

---

# Chapter 5: `__dirname` এবং `__filename`

Node.js file-এর মধ্যে দুটি special value পাওয়া যায়:

```js
__dirname
__filename
```

## 5.1 `__dirname`

`__dirname` current file যে directory-তে আছে, সেই directory-এর absolute path দেয়।

Example:

```js
console.log(__dirname);
```

Output example:

```txt
/Users/username/projects/node-app
```

অর্থাৎ `index.js` যদি `/Users/username/projects/node-app` folder-এর মধ্যে থাকে, তাহলে `__dirname` সেই folder path দেবে।

## 5.2 `__filename`

`__filename` current file-এর full absolute path দেয়, file name সহ।

Example:

```js
console.log(__filename);
```

Output example:

```txt
/Users/username/projects/node-app/index.js
```

## 5.3 `__dirname` বনাম `__filename`

| বিষয় | `__dirname` | `__filename` |
|---|---|---|
| কী দেয় | Current file-এর directory path | Current file-এর full file path |
| File name থাকে? | না | হ্যাঁ |
| Example | `/project/src` | `/project/src/index.js` |

## 5.4 এগুলো কি `global` object-এর property?

না। এগুলো সরাসরি `global` object-এর property নয়।

তাহলে এগুলো আসে কোথা থেকে?

এর উত্তর আছে Node.js module wrapper function-এ। Node.js প্রতিটি module run করার আগে একটি invisible wrapper function দিয়ে wrap করে। সেই function-এর parameter হিসেবে `__dirname` এবং `__filename` pass করা হয়। এজন্য প্রতিটি CommonJS module file-এর মধ্যে এগুলো available থাকে।

---

# Chapter 6: Browser Script Problem এবং Modularity সমস্যা

Node.js module system বোঝার আগে browser classic script-এর একটি সমস্যা বুঝতে হবে।

ধরি আমাদের তিনটি file আছে:

```txt
project/
├── index.html
├── script1.js
└── script2.js
```

`index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Browser Script Example</title>
  </head>
  <body>
    <script src="./script1.js"></script>
    <script src="./script2.js"></script>
  </body>
</html>
```

`script1.js`:

```js
var a = 5;
```

`script2.js`:

```js
var b = 10;

console.log(a + b);
```

Output:

```txt
15
```

## 6.1 এখানে কী হলো?

`script2.js` file-এর ভিতরে `a` declare করা হয়নি। কিন্তু `script1.js` আগে load হওয়ায় `a` global scope-এ চলে গেছে। তাই `script2.js` সেটি access করতে পেরেছে।

## 6.2 সমস্যা কোথায়?

ছোট example-এ এটি সুবিধাজনক মনে হতে পারে। কিন্তু বড় application-এ এটি বিপজ্জনক।

ধরি `script2.js`-এ accidentally আবার `a` declare করা হলো:

```js
var a = 20;
var b = 10;

console.log(a + b); // 30
```

এতে previous `a` overwrite হতে পারে, অথবা unexpected behavior তৈরি হতে পারে।

## 6.3 Problem summary

Classic browser script-এ:

- আলাদা `.js` file হলেও একই global scope share করতে পারে
- এক file-এর variable আরেক file থেকে accidentally access করা যায়
- naming collision হতে পারে
- global pollution হয়
- maintainability কমে যায়

## 6.4 Node.js এই সমস্যা কীভাবে solve করে?

Node.js প্রত্যেক `.js` file-কে আলাদা module হিসেবে treat করে।

এতে:

- এক file-এর variable অন্য file থেকে automatically access করা যায় না
- explicit export/import করতে হয়
- code encapsulated থাকে
- বড় project maintain করা সহজ হয়

---

# Chapter 7: Node.js Module System কী

## 7.1 Module কী?

Node.js CommonJS context-এ সহজভাবে:

> **একটি `.js` file-ই একটি module।**

অর্থাৎ:

```txt
index.js   -> একটি module
people.js  -> একটি module
math.js    -> একটি module
server.js  -> একটি module
```

প্রতিটি module-এর নিজস্ব scope থাকে।

## 7.2 Module system-এর মূল idea

Node.js module system-এর মূল principle:

> একটি file নিজের ভিতরের সবকিছু private রাখবে। অন্য file-কে কিছু দিতে চাইলে explicit ভাবে export করতে হবে।

## 7.3 Import এবং Export

CommonJS module system-এ দুটি প্রধান জিনিস আছে:

| কাজ | Syntax |
|---|---|
| অন্য file/module নিয়ে আসা | `require()` |
| current file থেকে কিছু বাইরে দেওয়া | `module.exports` |

Example:

```js
// people.js
const people = ["Sakib", "Tamim", "Mashrafe"];

module.exports = people;
```

```js
// index.js
const people = require("./people");

console.log(people);
```

Output:

```txt
[ 'Sakib', 'Tamim', 'Mashrafe' ]
```

---

# Chapter 8: First Custom Module তৈরি করা

## 8.1 Project structure

ধরি project structure:

```txt
node-app/
├── index.js
└── people.js
```

## 8.2 `people.js` file

```js
const people = ["Sakib", "Tamim", "Mashrafe"];
```

এখন `index.js` থেকে `people.js` require করি।

```js
const people = require("./people");

console.log(people);
```

Run:

```bash
node index.js
```

Output:

```txt
{}
```

## 8.3 কেন blank object এল?

কারণ `people.js` file-এর ভিতরে `people` array declare করা হলেও export করা হয়নি।

CommonJS module-এর default export value হলো একটি empty object:

```js
{}
```

যদি আপনি `module.exports` set না করেন, তাহলে `require()` সেই default empty object return করবে।

## 8.4 Important Point

`require("./people")` মানে এই নয় যে `people.js` file-এর সব variable automatically `index.js`-এ চলে আসবে।

এটি শুধুমাত্র সেই value return করে, যা `people.js` file `module.exports` দিয়ে export করেছে।

---

# Chapter 9: `require()` কীভাবে কাজ করে

## 9.1 `require()` কী?

`require()` হলো CommonJS module import করার function।

Syntax:

```js
const something = require("module-path");
```

## 9.2 Local file require

একই folder-এর file require করতে:

```js
const people = require("./people");
```

এখানে:

- `./` মানে current directory
- `people` মানে `people.js`
- `.js` extension না দিলেও Node.js বুঝতে পারে

Equivalent:

```js
const people = require("./people.js");
```

## 9.3 `require()` কী return করে?

`require()` return করে target module-এর `module.exports` value।

Example:

```js
// people.js
const people = ["Sakib", "Tamim", "Mashrafe"];

module.exports = people;
```

```js
// index.js
const data = require("./people");

console.log(data);
```

Output:

```txt
[ 'Sakib', 'Tamim', 'Mashrafe' ]
```

এখানে `data` variable-এর মধ্যে `people.js` file-এর `module.exports` value এসেছে।

## 9.4 `require()` করলে target file execute হয়

যখন আপনি কোনো file require করেন, Node.js সেই file execute করে।

Example:

```js
// people.js
console.log("people.js loaded");

const people = ["Sakib", "Tamim", "Mashrafe"];

module.exports = people;
```

```js
// index.js
const people = require("./people");

console.log(people);
```

Output:

```txt
people.js loaded
[ 'Sakib', 'Tamim', 'Mashrafe' ]
```

## 9.5 `require()` global থেকে আসে না

`require` সরাসরি `global` object-এর property নয়। এটি module wrapper function-এর parameter হিসেবে প্রতিটি CommonJS module-এ available হয়।

---

# Chapter 10: `module.exports` দিয়ে Export করা

## 10.1 `module` object

প্রতিটি CommonJS module-এ Node.js একটি `module` object দেয়।

Example:

```js
console.log(module);
```

এই object-এর মধ্যে কিছু property থাকে:

- `id`
- `path`
- `exports`
- `filename`
- `loaded`
- `children`
- `paths`

সবচেয়ে গুরুত্বপূর্ণ হলো:

```js
module.exports
```

## 10.2 Default value

প্রাথমিকভাবে:

```js
module.exports = {};
```

তাই যদি কিছু export না করেন, `require()` করলে `{}` পাওয়া যায়।

## 10.3 Single value export

`people.js`:

```js
const people = ["Sakib", "Tamim", "Mashrafe"];

module.exports = people;
```

`index.js`:

```js
const people = require("./people");

console.log(people);
```

Output:

```txt
[ 'Sakib', 'Tamim', 'Mashrafe' ]
```

## 10.4 Function export

`math.js`:

```js
function add(a, b) {
  return a + b;
}

module.exports = add;
```

`index.js`:

```js
const add = require("./math");

console.log(add(5, 10));
```

Output:

```txt
15
```

## 10.5 Object export

`person.js`:

```js
const person = {
  name: "Sakib",
  profession: "Cricketer",
};

module.exports = person;
```

`index.js`:

```js
const person = require("./person");

console.log(person.name);
```

Output:

```txt
Sakib
```

---

# Chapter 11: Multiple Export

একটি module থেকে একাধিক value export করতে হলে সাধারণত object export করা হয়।

## 11.1 Example

`people.js`:

```js
const people = ["Sakib", "Tamim", "Mashrafe"];

const a = 6;

function test() {
  console.log("test");
}

module.exports = {
  people: people,
  a: a,
  test: test,
};
```

`index.js`:

```js
const data = require("./people");

console.log(data.people);
console.log(data.a);
data.test();
```

Output:

```txt
[ 'Sakib', 'Tamim', 'Mashrafe' ]
6
test
```

## 11.2 Shorthand property syntax

যদি object-এর key এবং variable-এর নাম একই হয়, তাহলে shorthand ব্যবহার করা যায়।

Long form:

```js
module.exports = {
  people: people,
  a: a,
  test: test,
};
```

Short form:

```js
module.exports = {
  people,
  a,
  test,
};
```

দুটি code একই কাজ করে।

## 11.3 Key name change করা

আপনি চাইলে export করার সময় key name বদলাতে পারেন।

```js
module.exports = {
  players: people,
  number: a,
  runTest: test,
};
```

`index.js`:

```js
const data = require("./people");

console.log(data.players);
console.log(data.number);
data.runTest();
```

## 11.4 Destructuring ব্যবহার করা

যদি object export করা হয়, তাহলে import side-এ destructuring করা যায়।

`people.js`:

```js
const people = ["Sakib", "Tamim", "Mashrafe"];
const a = 6;

function test() {
  console.log("test");
}

module.exports = {
  people,
  a,
  test,
};
```

`index.js`:

```js
const { people, a, test } = require("./people");

console.log(people);
console.log(a);
test();
```

Output:

```txt
[ 'Sakib', 'Tamim', 'Mashrafe' ]
6
test
```

## 11.5 `module.exports` বনাম `exports`

Node.js-এ একটি shortcut আছে:

```js
exports
```

প্রাথমিকভাবে:

```js
exports === module.exports
```

তাই আপনি করতে পারেন:

```js
exports.people = people;
exports.a = a;
exports.test = test;
```

কিন্তু সতর্ক থাকতে হবে:

```js
exports = people; // ভুল pattern
```

এভাবে করলে `module.exports` replace হয় না। তাই beginner অবস্থায় সবচেয়ে পরিষ্কার এবং নিরাপদ pattern হলো:

```js
module.exports = {
  people,
  a,
  test,
};
```

---

# Chapter 12: Node.js Module Wrapper Function

## 12.1 মূল ধারণা

Node.js কোনো `.js` file সরাসরি raw form-এ execute করে না। CommonJS module execute করার আগে Node.js internally file-এর code একটি wrapper function-এর মধ্যে রাখে।

Conceptually, Node.js এমন করে:

```js
(function (exports, require, module, __filename, __dirname) {
  // আপনার module file-এর code এখানে থাকে
});
```

বাস্তবে আপনি এই wrapper লিখবেন না। Node.js internally করে।

## 12.2 কেন wrapper দরকার?

Wrapper function-এর কারণে:

1. প্রতিটি file/module আলাদা scope পায়
2. Top-level variable global হয় না
3. `exports`, `require`, `module`, `__filename`, `__dirname` available হয়
4. Encapsulation তৈরি হয়
5. Module system কাজ করে

## 12.3 Example: variable isolation

`people.js`:

```js
const people = ["Sakib", "Tamim", "Mashrafe"];
```

Node.js internally ভাবতে পারেন এমনভাবে wrap করে:

```js
(function (exports, require, module, __filename, __dirname) {
  const people = ["Sakib", "Tamim", "Mashrafe"];
});
```

এখন `people` variable function scope-এর ভিতরে আছে। তাই অন্য file থেকে automatically access করা যাবে না।

## 12.4 Wrapper parameters

| Parameter | কাজ |
|---|---|
| `exports` | `module.exports`-এর shortcut reference |
| `require` | অন্য module import করার function |
| `module` | current module সম্পর্কে object |
| `__filename` | current file-এর full path |
| `__dirname` | current file-এর directory path |

## 12.5 আগে রাখা প্রশ্নগুলোর উত্তর

### প্রশ্ন ১: Node.js file-এ variable declare করলে `global`-এ যায় না কেন?

কারণ file-এর code wrapper function-এর ভিতরে থাকে। Function scope-এর variable global object-এ attach হয় না।

### প্রশ্ন ২: `require`, `module`, `__dirname`, `__filename` কোথা থেকে আসে?

এগুলো wrapper function-এর parameter হিসেবে Node.js inject করে দেয়।

## 12.6 Important clarification

এটি বোঝার জন্য conceptual representation। আপনি নিজে এই wrapper লিখবেন না।

Wrong:

```js
(function (exports, require, module, __filename, __dirname) {
  const people = ["Sakib"];
});
```

Right:

```js
const people = ["Sakib"];
module.exports = people;
```

Node.js নিজেই wrapper manage করে।

---

# Chapter 13: Relative Path দিয়ে Module Import করা

## 13.1 Same folder file

Structure:

```txt
project/
├── index.js
└── people.js
```

Import:

```js
const people = require("./people");
```

`./` মানে current folder।

## 13.2 Subfolder থেকে import

Structure:

```txt
project/
├── index.js
└── test/
    └── people.js
```

Import:

```js
const people = require("./test/people");
```

## 13.3 Parent folder থেকে import

Structure:

```txt
project/
├── data.js
└── src/
    └── index.js
```

`src/index.js` থেকে `data.js` import:

```js
const data = require("../data");
```

`../` মানে এক folder উপরে যাওয়া।

## 13.4 Path rules

| Path | অর্থ |
|---|---|
| `./people` | current folder-এর `people.js` |
| `./test/people` | current folder-এর `test` folder-এর ভিতরের `people.js` |
| `../people` | parent folder-এর `people.js` |
| `../../people` | দুই level উপরের folder-এর `people.js` |

## 13.5 `.js` extension দেওয়া লাগে?

CommonJS local JavaScript file require করার সময় সাধারণত `.js` না দিলেও চলে:

```js
require("./people");
```

Equivalent:

```js
require("./people.js");
```

তবে clarity-এর জন্য team convention follow করা ভালো।

---

# Chapter 14: External Module / npm Package

## 14.1 External module কী?

External module হলো অন্য developer বা community-এর তৈরি package, যেটি npm registry-তে publish করা থাকে।

Example:

- `lodash`
- `express`
- `mongoose`
- `axios`
- `dotenv`

## 14.2 Install করা

npm দিয়ে:

```bash
npm install lodash
```

yarn দিয়ে:

```bash
yarn add lodash
```

Install করলে `package.json` file-এর `dependencies` অংশে package যোগ হয়।

Example:

```json
{
  "dependencies": {
    "lodash": "^4.17.21"
  }
}
```

এছাড়া project folder-এ `node_modules` folder তৈরি হয়, যেখানে installed packages থাকে।

## 14.3 External module require করা

External package require করার সময় `./` বা `../` দেওয়া হয় না।

```js
const _ = require("lodash");
```

এখানে Node.js বুঝবে:

- এটি local file path নয়
- এটি package name
- তাই `node_modules` folder থেকে package খুঁজবে

## 14.4 `lodash` example

`people.js`:

```js
const people = ["Sakib", "Tamim", "Mashrafe"];

module.exports = people;
```

`index.js`:

```js
const _ = require("lodash");
const people = require("./people");

const lastPerson = _.last(people);

console.log(lastPerson);
```

Output:

```txt
Mashrafe
```

## 14.5 এখানে কী হলো?

1. `lodash` package import করা হলো
2. নিজের `people.js` file থেকে array import করা হলো
3. `_.last()` function দিয়ে array-এর last element নেওয়া হলো
4. Output হিসেবে `"Mashrafe"` পাওয়া গেল

## 14.6 কেন external modules powerful?

External modules Node.js-কে অনেক powerful করে কারণ:

- community আগে থেকেই অনেক problem solve করেছে
- reusability বাড়ে
- development speed বাড়ে
- tested library use করা যায়
- বড় application দ্রুত build করা যায়

---

# Chapter 15: Built-in / Core Modules

## 15.1 Built-in module কী?

Node.js-এর নিজস্ব কিছু module আছে, যেগুলো আলাদা করে install করতে হয় না। এগুলো Node.js runtime-এর সাথেই আসে।

Example:

| Module | কাজ |
|---|---|
| `http` | HTTP server/client তৈরি করা |
| `fs` | File system read/write করা |
| `os` | Operating system সম্পর্কে তথ্য নেওয়া |
| `path` | File path নিয়ে কাজ করা |
| `crypto` | Cryptography related কাজ |
| `events` | Event-driven programming |
| `stream` | Streaming data handle করা |

## 15.2 Built-in module require করা

Example:

```js
const fs = require("fs");
```

এখানে `fs` install করতে হবে না। এটি Node.js-এর core module।

## 15.3 `http` module example

```js
const http = require("http");

const server = http.createServer((req, res) => {
  res.write("Hello from Node.js server");
  res.end();
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

এটি basic HTTP server তৈরি করে।

## 15.4 `fs` module example

```js
const fs = require("fs");

const data = fs.readFileSync("message.txt", "utf8");

console.log(data);
```

এটি `message.txt` file read করে।

## 15.5 Built-in module বনাম external module

| বিষয় | Built-in Module | External Module |
|---|---|---|
| Install লাগে? | না | হ্যাঁ |
| কোথা থেকে আসে? | Node.js runtime | npm registry |
| Example | `fs`, `http`, `path` | `lodash`, `express`, `axios` |
| Require syntax | `require("fs")` | `require("lodash")` |

---

# Chapter 16: Node.js Module-এর ৩ ধরন

Node.js-এ practical sense-এ module তিন ধরনের হতে পারে।

## 16.1 Local / Custom Module

নিজে তৈরি করা `.js` file।

Example:

```js
const people = require("./people");
```

এখানে `people.js` আপনার নিজের file।

## 16.2 External / Third-party Module

npm বা yarn দিয়ে install করা package।

Example:

```js
const _ = require("lodash");
```

এখানে `lodash` একটি external package।

## 16.3 Built-in / Core Module

Node.js-এর সাথে built-in আসা module।

Example:

```js
const fs = require("fs");
const http = require("http");
```

## 16.4 Summary table

| Module Type | কোথা থেকে আসে | Install লাগে? | Require example |
|---|---|---|---|
| Local / Custom | নিজের project file | না | `require("./people")` |
| External / npm | npm registry | হ্যাঁ | `require("lodash")` |
| Built-in / Core | Node.js runtime | না | `require("fs")` |

---

# Common Mistakes

## Mistake 1: Node.js-এ `window` use করা

Wrong:

```js
console.log(window);
```

Node.js-এ output:

```txt
ReferenceError: window is not defined
```

Right:

```js
console.log(global);
```

অথবা cross-platform reference দরকার হলে:

```js
console.log(globalThis);
```

## Mistake 2: ভাবা যে top-level variable global হয়ে যায়

Wrong assumption:

```js
var a = 5;
console.log(global.a); // 5 হবে ভাবা
```

Actual:

```txt
undefined
```

কারণ Node.js module scoped।

## Mistake 3: `require()` করলেই সব variable পাওয়া যাবে ভাবা

Wrong:

```js
// people.js
const people = ["Sakib", "Tamim"];

// index.js
require("./people");
console.log(people);
```

Output:

```txt
ReferenceError: people is not defined
```

Right:

```js
// people.js
const people = ["Sakib", "Tamim"];

module.exports = people;
```

```js
// index.js
const people = require("./people");

console.log(people);
```

## Mistake 4: Export না করে `{}` পাওয়া

Problem:

```js
// people.js
const people = ["Sakib", "Tamim"];
```

```js
// index.js
const people = require("./people");

console.log(people); // {}
```

Solution:

```js
module.exports = people;
```

## Mistake 5: `exports = something` করা

Wrong:

```js
exports = {
  name: "Node.js",
};
```

Right:

```js
module.exports = {
  name: "Node.js",
};
```

অথবা:

```js
exports.name = "Node.js";
```

## Mistake 6: Local file require করতে `./` ভুলে যাওয়া

Wrong:

```js
const people = require("people");
```

Node.js এটিকে external package হিসেবে খুঁজবে।

Right:

```js
const people = require("./people");
```

## Mistake 7: Folder path ভুল করা

Wrong:

```js
const people = require("./people");
```

যদি file থাকে:

```txt
test/people.js
```

Right:

```js
const people = require("./test/people");
```

## Mistake 8: Browser module concept আর Node CommonJS মিশিয়ে ফেলা

Node.js-এর CommonJS syntax:

```js
const something = require("./something");
module.exports = something;
```

ES Module syntax:

```js
import something from "./something.js";
export default something;
```

এই নোটে মূলত CommonJS নিয়ে আলোচনা করা হয়েছে।

---

# Best Practices

## 1. Global variable এড়িয়ে চলুন

Node.js-এ global object থাকলেও নিজের application data সেখানে রাখবেন না।

Avoid:

```js
global.user = "Rahim";
```

Prefer:

```js
const user = "Rahim";

module.exports = user;
```

## 2. Explicit export/import করুন

যে value অন্য file-এ দরকার, সেটি explicitly export করুন।

```js
module.exports = {
  people,
  test,
};
```

## 3. Module ছোট এবং focused রাখুন

একটি module এক ধরনের কাজ করুক।

Good:

```txt
routes/userRoutes.js
controllers/userController.js
models/userModel.js
utils/logger.js
```

Bad:

```txt
everything.js
```

## 4. Relative path পরিষ্কার রাখুন

অতিরিক্ত nested folder হলে path confusing হয়:

```js
const helper = require("../../../../utils/helper");
```

Project structure clean রাখুন।

## 5. Built-in module আগে চিনুন

External package install করার আগে দেখুন Node.js built-in module দিয়ে কাজটি করা যায় কি না।

Example:

- path handling: `path`
- file read/write: `fs`
- server: `http`
- crypto: `crypto`

## 6. `module.exports` পরিষ্কারভাবে use করুন

Beginner-friendly pattern:

```js
module.exports = {
  functionOne,
  functionTwo,
};
```

## 7. Naming consistent রাখুন

Export key এবং import variable meaningfully নাম দিন।

```js
// math.js
function add(a, b) {
  return a + b;
}

module.exports = {
  add,
};
```

```js
// index.js
const { add } = require("./math");
```

---

# Deep Explanation: Full Flow Example

এখন পুরো flow একসাথে দেখি।

## Project

```txt
node-app/
├── index.js
├── people.js
└── package.json
```

## people.js

```js
const people = ["Sakib", "Tamim", "Mashrafe"];

function printPeople() {
  people.forEach((person) => {
    console.log(person);
  });
}

module.exports = {
  people,
  printPeople,
};
```

## index.js

```js
const { people, printPeople } = require("./people");

console.log("All people:", people);

printPeople();
```

## Execution

```bash
node index.js
```

## Output

```txt
All people: [ 'Sakib', 'Tamim', 'Mashrafe' ]
Sakib
Tamim
Mashrafe
```

## Step-by-step কী হলো?

1. `node index.js` command দিয়ে `index.js` execute হলো।
2. Node.js `index.js` file-কে wrapper function দিয়ে wrap করল।
3. `require("./people")` call হলো।
4. Node.js `people.js` খুঁজে পেল।
5. `people.js` execute হলো।
6. `people.js` এর `module.exports` object তৈরি হলো:

```js
{
  people: ["Sakib", "Tamim", "Mashrafe"],
  printPeople: [Function: printPeople]
}
```

7. `require("./people")` সেই object return করল।
8. Destructuring করে `people` এবং `printPeople` নেওয়া হলো।
9. Output print হলো।

---

# Concept Map

```txt
Node.js
│
├── Global Object
│   ├── global
│   ├── setTimeout
│   ├── setInterval
│   └── globalThis
│
├── CommonJS Module System
│   ├── each .js file = module
│   ├── module scope
│   ├── require()
│   ├── module.exports
│   └── module wrapper function
│
├── Special Module Variables
│   ├── exports
│   ├── require
│   ├── module
│   ├── __filename
│   └── __dirname
│
└── Module Types
    ├── Local/custom module
    ├── External/npm module
    └── Built-in/core module
```

---

# Cheat Sheet

## Browser vs Node

```js
// Browser
console.log(window);

// Node.js
console.log(global);
```

## Timer

```js
setTimeout(() => {
  console.log("Hello");
}, 1000);
```

## Directory and filename

```js
console.log(__dirname);
console.log(__filename);
```

## Export single value

```js
const people = ["Sakib", "Tamim"];

module.exports = people;
```

## Import single value

```js
const people = require("./people");
```

## Export multiple values

```js
const people = ["Sakib", "Tamim"];
const age = 25;

function test() {
  console.log("test");
}

module.exports = {
  people,
  age,
  test,
};
```

## Import multiple values

```js
const { people, age, test } = require("./people");
```

## External module

```js
const _ = require("lodash");
```

## Built-in module

```js
const fs = require("fs");
const http = require("http");
```

---

# Quick Revision

## 1. Node.js কী?

Node.js হলো JavaScript runtime। এটি browser-এর বাইরে JavaScript run করতে দেয়।

## 2. Browser-এ global object কী?

Browser-এ global object হলো `window`।

## 3. Node.js-এ `window` আছে?

না। Node.js browser নয়, তাই `window` নেই।

## 4. Node.js-এ global object কী?

Node.js-এ global object হলো `global`।

## 5. `setTimeout` import না করেও কাজ করে কেন?

কারণ এটি Node.js global environment-এ available।

## 6. Node.js file-এর top-level `var` কি `global`-এ attach হয়?

না। Node.js file module scope-এর মধ্যে থাকে।

## 7. `__dirname` কী?

Current file যে directory-তে আছে, সেই directory-এর absolute path।

## 8. `__filename` কী?

Current file-এর full absolute path, file name সহ।

## 9. Node.js module কী?

Node.js CommonJS context-এ প্রতিটি `.js` file একটি module।

## 10. `require()` কী করে?

অন্য module import করে এবং সেই module-এর `module.exports` value return করে।

## 11. `module.exports` কী?

Current module থেকে কোন value বাইরে expose করা হবে, তা define করে।

## 12. কিছু export না করলে `require()` কী return করে?

Default empty object `{}`।

## 13. Multiple value export কীভাবে করা হয়?

Object export করে:

```js
module.exports = {
  people,
  test,
};
```

## 14. Module wrapper function কী?

Node.js internally প্রতিটি CommonJS file-কে একটি function দিয়ে wrap করে:

```js
(function (exports, require, module, __filename, __dirname) {
  // code
});
```

## 15. Module কত ধরনের হতে পারে?

প্রধানত তিন ধরনের:

1. Local/custom module
2. External/npm module
3. Built-in/core module

---

# Interview / Exam Style Questions

## Basic Questions

### Q1. Node.js-এ `window` object নেই কেন?

Node.js browser environment নয়। `window` হলো browser-specific global object। Node.js server/machine environment-এ run করে, তাই browser window বা DOM নেই। ফলে `window` object নেই।

### Q2. Node.js-এর global object কী?

Node.js-এর global object হলো `global`। কিছু global function যেমন `setTimeout`, `setInterval` ইত্যাদি এর মাধ্যমে available থাকে।

### Q3. `global` এবং `window`-এর মধ্যে পার্থক্য কী?

`window` browser-এর global object, আর `global` Node.js-এর global object। Browser-specific APIs যেমন `document`, DOM events ইত্যাদি `window`-এ থাকে, কিন্তু Node.js-এর `global`-এ থাকে না।

### Q4. Node.js-এ top-level variable কি global হয়?

না। Node.js প্রত্যেক `.js` file-কে module হিসেবে wrap করে। তাই top-level variable module scope-এর ভিতরে থাকে, `global` object-এ attach হয় না।

### Q5. `__dirname` এবং `__filename` কী?

`__dirname` current file-এর directory path দেয়। `__filename` current file-এর full file path দেয়।

---

## Module Questions

### Q6. Node.js module কী?

Node.js CommonJS system-এ প্রতিটি `.js` file একটি module। প্রতিটি module-এর নিজস্ব scope আছে।

### Q7. `require()` কী?

`require()` হলো CommonJS module import করার function। এটি target module execute করে এবং target module-এর `module.exports` value return করে।

### Q8. `module.exports` কী?

`module.exports` হলো current module থেকে বাইরে কোন value expose করা হবে, সেটি নির্ধারণ করার object/value।

### Q9. `require()` করলে blank object `{}` কেন আসে?

যদি target module কিছু export না করে, তাহলে তার default `module.exports` value `{}` থাকে। তাই `require()` করলে `{}` পাওয়া যায়।

### Q10. একাধিক জিনিস কীভাবে export করবেন?

Object export করে:

```js
module.exports = {
  itemOne,
  itemTwo,
  itemThree,
};
```

### Q11. `exports` এবং `module.exports` কি একই?

শুরুতে `exports` হলো `module.exports`-এর reference। কিন্তু `exports = something` করলে `module.exports` replace হয় না। তাই direct assignment করতে চাইলে `module.exports = something` ব্যবহার করা উচিত।

---

## Conceptual Questions

### Q12. Node.js module wrapper function-এর কাজ কী?

এটি প্রতিটি module-কে function scope দেয়। ফলে variable global হয় না এবং module-specific parameters যেমন `exports`, `require`, `module`, `__filename`, `__dirname` available হয়।

### Q13. Browser classic script-এর modularity problem কী?

Classic browser script-এ এক file-এর `var` variable global scope-এ চলে যেতে পারে এবং অন্য file থেকে access/overwrite হতে পারে। এতে global pollution এবং naming collision হয়।

### Q14. Node.js কীভাবে সেই problem solve করে?

Node.js প্রতিটি file-কে আলাদা module হিসেবে encapsulate করে। কোনো value বাইরে দিতে হলে explicit export করতে হয়।

### Q15. Local, external, built-in module-এর পার্থক্য কী?

Local module নিজের project-এর file, external module npm/yarn দিয়ে install করা package, আর built-in module Node.js-এর সাথে pre-installed module।

---

## Code-based Questions

### Q16. Output কী হবে?

```js
// people.js
const people = ["Sakib", "Tamim"];

// index.js
const people = require("./people");
console.log(people);
```

Answer:

```txt
{}
```

কারণ `people.js` কিছু export করেনি।

### Q17. Output কী হবে?

```js
// people.js
const people = ["Sakib", "Tamim"];
module.exports = people;

// index.js
const data = require("./people");
console.log(data[0]);
```

Answer:

```txt
Sakib
```

### Q18. Output কী হবে?

```js
var a = 10;
console.log(global.a);
```

Node.js-এ output:

```txt
undefined
```

কারণ `a` module scope-এ আছে, `global` object-এ নয়।

### Q19. নিচের code ঠিক করুন

Wrong:

```js
// math.js
function add(a, b) {
  return a + b;
}

// index.js
const add = require("./math");
console.log(add(5, 10));
```

Problem: `add` export করা হয়নি।

Fixed:

```js
// math.js
function add(a, b) {
  return a + b;
}

module.exports = add;
```

```js
// index.js
const add = require("./math");

console.log(add(5, 10));
```

### Q20. `lodash` থেকে array-এর last element print করুন

```js
const _ = require("lodash");

const numbers = [10, 20, 30];

console.log(_.last(numbers));
```

Output:

```txt
30
```

---

# Practice Tasks

## Task 1: Local module তৈরি করুন

একটি `math.js` file তৈরি করুন এবং `add`, `subtract`, `multiply` function export করুন।

Expected usage:

```js
const { add, subtract, multiply } = require("./math");

console.log(add(10, 5));       // 15
console.log(subtract(10, 5));  // 5
console.log(multiply(10, 5));  // 50
```

## Task 2: `__dirname` এবং `__filename` print করুন

`index.js` file-এ লিখুন:

```js
console.log("Directory:", __dirname);
console.log("File:", __filename);
```

তারপর run করুন:

```bash
node index.js
```

## Task 3: Built-in `os` module ব্যবহার করুন

```js
const os = require("os");

console.log(os.platform());
console.log(os.homedir());
console.log(os.cpus().length);
```

## Task 4: `fs` module দিয়ে file read করুন

`message.txt` file তৈরি করুন।

```txt
Hello Node.js
```

`index.js`:

```js
const fs = require("fs");

const message = fs.readFileSync("./message.txt", "utf8");

console.log(message);
```

## Task 5: External package install করুন

```bash
npm install lodash
```

তারপর:

```js
const _ = require("lodash");

const names = ["Rahim", "Karim", "Jabbar"];

console.log(_.last(names));
```

---

# Key Takeaways

1. Node.js browser নয়, তাই Node.js-এ `window` object নেই।
2. Node.js-এর global object হলো `global`।
3. Browser-এর classic script-এ top-level `var` `window`-এ attach হতে পারে, কিন্তু Node.js-এ top-level variable `global`-এ attach হয় না।
4. Node.js প্রতিটি `.js` file-কে আলাদা module হিসেবে treat করে।
5. Module-এর ভিতরের variable private থাকে, যতক্ষণ না explicitly export করা হয়।
6. `require()` কোনো module import করে এবং সেই module-এর `module.exports` value return করে।
7. কিছু export না করলে `require()` default empty object `{}` return করে।
8. `module.exports` দিয়ে single value, function, object, বা multiple value export করা যায়।
9. Node.js internally module wrapper function ব্যবহার করে।
10. `exports`, `require`, `module`, `__filename`, `__dirname` wrapper function-এর parameter হিসেবে available হয়।
11. Local module import করতে `./` বা `../` ব্যবহার করতে হয়।
12. External package import করতে package name directly দেওয়া হয়, যেমন `require("lodash")`।
13. Built-in modules যেমন `fs`, `http`, `os`, `path` install করা লাগে না।
14. Node.js module system code encapsulation, reuse, maintainability এবং npm ecosystem-এর foundation।
15. Node.js-এর power অনেকটাই আসে তার module system, built-in modules এবং npm ecosystem থেকে।

---

# Final Summary

এই টিউটোরিয়ালের সবচেয়ে গুরুত্বপূর্ণ শিক্ষা হলো: **Node.js-এ সবকিছু module-centric।**

Browser JavaScript-এ যেখানে একাধিক script file অনেক সময় একই global scope share করে, Node.js সেখানে প্রতিটি file-কে আলাদা module বানিয়ে দেয়। এর ফলে code safe, organized, reusable এবং maintainable হয়।

`global` object বোঝা দরকার, কারণ কিছু জিনিস Node.js environment-এ global ভাবে available। কিন্তু সবকিছু global নয়। বিশেষ করে আপনার লেখা variable global নয়। এগুলো module scope-এর মধ্যে থাকে।

`require()` এবং `module.exports` বোঝা Node.js শেখার foundational step। কারণ নিজের file, npm package, built-in module—সবকিছুই module system-এর মাধ্যমে ব্যবহার করা হয়।

একবার এই module system পরিষ্কার হলে Node.js project structure, npm package ব্যবহার, Express.js application, file system কাজ, HTTP server—সবকিছু বোঝা অনেক সহজ হয়ে যায়।
