# Node.js Global Object এবং Module System

## Overview

এই অধ্যায়ে Node.js-এর দুইটি মৌলিক কিন্তু অত্যন্ত গুরুত্বপূর্ণ concept আলোচনা করা হয়েছে:

1. **Node.js Global Object**
2. **Node.js Module System**

ভিডিওতে instructor শুরু করেছেন browser-based JavaScript-এর পরিচিত `window` object দিয়ে, তারপর দেখিয়েছেন Node.js environment-এ `window` নেই, কিন্তু এর পরিবর্তে `global` object আছে। এরপর ধাপে ধাপে বোঝানো হয়েছে কেন Node.js-এর প্রতিটি `.js` file আলাদা module হিসেবে কাজ করে, কীভাবে `require()` দিয়ে অন্য file বা package আনা যায়, এবং কীভাবে `module.exports` দিয়ে কোনো value বা functionality অন্য file-এ পাঠানো যায়।

ভিডিওর মূল বক্তব্য হলো: **Node.js আলাদা programming language নয়; এটি JavaScript runtime।** অর্থাৎ frontend-এ যে JavaScript আমরা browser-এ ব্যবহার করি, সেই একই language backend-এ ব্যবহার করার সুযোগ দেয় Node.js।

---

## Prerequisites

এই নোট বুঝতে হলে নিচের বিষয়গুলোর basic ধারণা থাকা ভালো:

| বিষয়                 | কেন দরকার                                             |
| -------------------- | ----------------------------------------------------- |
| JavaScript variables | `var`, `let`, `const` এবং scope বোঝার জন্য            |
| Function             | IIFE এবং module wrapper function বোঝার জন্য           |
| Browser console      | `window` object বোঝার জন্য                            |
| Basic terminal usage | `node index.js` চালানোর জন্য                          |
| File path            | `./`, `../`, folder path দিয়ে module import করার জন্য |
| npm বা yarn          | external package install এবং use করার জন্য            |

---

# Main Concepts

এই অধ্যায়ের প্রধান conceptগুলো হলো:

1. Browser-এর `window` object
2. Node.js-এ `window` না থাকা
3. Node.js-এর `global` object
4. Global object-এর limitation
5. `__dirname` এবং `__filename`
6. Browser JavaScript-এর global pollution problem
7. Node.js module system
8. প্রতিটি `.js` file একটি module
9. `require()` function
10. `module.exports`
11. Multiple exports
12. Node.js module wrapper function
13. Custom module, external module এবং built-in module

---

# Detailed Explanation

## 1. Browser JavaScript-এ `window` Object

### ধারণা কী?

Browser-এ JavaScript run করলে আমাদের জন্য automatically একটি global object তৈরি থাকে, যার নাম:

```js
window
```

Browser environment-এ `window` হলো সবচেয়ে বড় global object। এর মধ্যে browser-related অনেক property, method এবং API থাকে।

উদাহরণ:

```js
console.log(window);
```

Browser console-এ এটি লিখলে একটি বড় JavaScript object দেখা যায়।

### `window` object-এর মধ্যে কী থাকে?

Browser-এ আমরা যেসব global function ব্যবহার করি, তার অনেকগুলো আসলে `window` object-এর অংশ।

যেমন:

```js
setTimeout()
setInterval()
clearTimeout()
clearInterval()
alert()
document
location
```

ভিডিওতে বলা হয়েছে, browser-এর `window` object-এর মধ্যে `setTimeout`, `setInterval`, event-related অনেক কিছু থাকে।

### কেন দরকার?

Browser JavaScript-এর কাজ হলো webpage-এর সাথে interact করা। তাই browser environment-এ দরকার হয়:

* DOM access
* timer function
* browser events
* window size
* URL/location
* localStorage/sessionStorage
* alert/prompt/confirm

এসব functionality browser-এর global object `window`-এর মাধ্যমে accessible হয়।

### ছোট উদাহরণ

```js
window.setTimeout(function () {
  console.log("Hello after 1 second");
}, 1000);
```

আবার একই কাজ shortcut হিসেবেও করা যায়:

```js
setTimeout(function () {
  console.log("Hello after 1 second");
}, 1000);
```

কারণ browser বুঝে নেয়:

```js
setTimeout(...)
```

আসলে:

```js
window.setTimeout(...)
```

---

## 2. Node.js-এ `window` Object নেই

### ধারণা কী?

Node.js browser-এ run করে না। Node.js run করে:

* local machine-এ
* server-এ
* command line বা terminal environment-এ

তাই Node.js environment-এ browser window নেই। ফলে `window` object-ও নেই।

ভিডিওতে instructor দেখিয়েছেন, Node.js file-এ `console.log(window)` করলে error আসে: `window is not defined`।

### উদাহরণ

`index.js`:

```js
console.log(window);
```

Terminal:

```bash
node index.js
```

Output:

```txt
ReferenceError: window is not defined
```

### কেন এমন হয়?

Node.js তৈরি হয়েছে Google Chrome-এর V8 JavaScript engine ব্যবহার করে। V8 engine JavaScript code execute করতে পারে। কিন্তু browser-এর পুরো environment Node.js-এ আনা হয়নি।

ভিডিওতে বলা হয়েছে, Ryan Dahl V8 engine browser থেকে বের করে এনেছিলেন, কিন্তু পুরো browser আনেননি। তাই browser-specific `window` object Node.js-এ নেই।

### মনে রাখার মতো পয়েন্ট

* `window` browser-specific object।
* Node.js server/runtime environment।
* Node.js-এ `window`, `document`, `alert` এসব browser API নেই।
* Node.js-এ browser-এর বদলে server-side API থাকে।

---

## 3. Node.js-এর `global` Object

### ধারণা কী?

Browser-এ যেমন `window` global object হিসেবে কাজ করে, Node.js-এ তেমন একটি object আছে:

```js
global
```

এটি Node.js environment-এর global object।

ভিডিওতে বলা হয়েছে, Node.js-এ browser-এর `window` object নেই, কিন্তু সেই ধরনের একটি object আছে, যার নাম `global`।

### উদাহরণ

```js
console.log(global);
```

এটি run করলে Node.js-এর global object দেখা যাবে।

Terminal:

```bash
node index.js
```

### `global` object-এর মধ্যে কী থাকে?

ভিডিওতে দেখানো হয়েছে, Node.js-এর `global` object browser-এর `window` object-এর মতো অনেক বড় নয়। এতে কিছু global utility থাকে, যেমন:

```js
setTimeout
setInterval
clearTimeout
clearInterval
```

ভিডিওতে instructor দেখিয়েছেন `global` print করলে তার মধ্যে `setTimeout`, `setInterval`, `clearTimeout`, `clearInterval` ইত্যাদি দেখা যায়।

### তাহলে `setTimeout()` Node.js-এ কীভাবে কাজ করে?

Node.js file-এ যদি লিখি:

```js
setTimeout(function () {
  console.log("test");
}, 1000);
```

এটি কাজ করবে।

কারণ Node.js environment-এ `setTimeout` global object-এর মাধ্যমে available।

সম্পূর্ণ code:

```js
setTimeout(function () {
  console.log("test");
}, 1000);
```

Output:

```txt
test
```

### গুরুত্বপূর্ণ লাইন ব্যাখ্যা

```js
setTimeout(function () {
```

এখানে `setTimeout()` একটি timer function। এটি নির্দিষ্ট সময় পরে callback function execute করে।

```js
  console.log("test");
```

১ সেকেন্ড পরে terminal-এ `test` print হবে।

```js
}, 1000);
```

`1000` millisecond = 1 second।

---

## 4. Browser Global Variable বনাম Node.js Global Variable

### Browser-এ কী হয়?

Browser JavaScript-এ global scope-এ `var` দিয়ে variable declare করলে সেটি `window` object-এর সাথে attach হয়ে যায়।

উদাহরণ:

```js
var a = 5;

console.log(a);
console.log(window.a);
```

Output:

```txt
5
5
```

মানে browser-এ:

```js
a
```

এবং

```js
window.a
```

দুইটাই একই value access করতে পারে।

ভিডিওতে এই বিষয়টি দেখানো হয়েছে যে browser-এ open JS file-এ variable declare করলে সেটি `window`-এর মধ্যে attach হয়ে যায়।

### Node.js-এ কী হয়?

Node.js-এ একইভাবে variable declare করলে সেটি `global` object-এর সাথে attach হয় না।

`index.js`:

```js
var a = 5;

console.log(global.a);
```

Output:

```txt
undefined
```

ভিডিওতে instructor দেখিয়েছেন, Node.js file-এ `var a = 5` declare করলেও `global.a` করলে `undefined` আসে।

### কেন এমন হয়?

এর কারণ Node.js module system।

Node.js-এ প্রতিটি `.js` file আলাদা module হিসেবে wrapped থাকে। তাই file-এর ভিতরে declared variable সরাসরি global object-এ attach হয় না।

এই বিষয়টি পুরোপুরি পরিষ্কার হবে module wrapper function বুঝলে।

### Browser বনাম Node.js তুলনা

| বিষয়                             | Browser JavaScript            | Node.js                 |
| -------------------------------- | ----------------------------- | ----------------------- |
| Global object                    | `window`                      | `global`                |
| `window` available?              | হ্যাঁ                         | না                      |
| `global` available?              | সাধারণ browser JS-এ না        | হ্যাঁ                   |
| Global `var` object-এ attach হয়? | `window`-এ attach হতে পারে    | `global`-এ attach হয় না |
| File আলাদা module?               | সাধারণ script tag ব্যবহারে না | হ্যাঁ                   |
| Encapsulation                    | কম                            | বেশি                    |

---

## 5. `__dirname` এবং `__filename`

### ধারণা কী?

Node.js file-এর মধ্যে দুইটি বিশেষ variable প্রায়ই ব্যবহার করা হয়:

```js
__dirname
__filename
```

### `__dirname`

বর্তমান file যে directory বা folder-এ আছে, সেই directory-এর absolute path দেয়।

```js
console.log(__dirname);
```

Output হতে পারে:

```txt
/Users/example/project
```

### `__filename`

বর্তমান file-এর full path দেয়, অর্থাৎ directory path সহ file name।

```js
console.log(__filename);
```

Output হতে পারে:

```txt
/Users/example/project/index.js
```

ভিডিওতে বলা হয়েছে, `__dirname` বর্তমান file-এর directory path দেয় এবং `__filename` পুরো path সহ file name দেয়।

### এগুলো কি `global` object-এর মধ্যে থাকে?

না।

ভিডিওতে instructor প্রশ্ন তুলেছেন: এগুলো কি `global` object-এর মধ্যে আছে? উত্তর: না, এগুলো `global` object-এর মধ্যে নেই।

### তাহলে এগুলো আসে কোথা থেকে?

এগুলো আসে Node.js-এর **module wrapper function** থেকে।

Node.js প্রতিটি file-এর code invisible wrapper function-এর মধ্যে রাখে, এবং সেই function-এর parameter হিসেবে `__dirname`, `__filename`, `module`, `exports`, `require` pass করে।

---

# 6. Browser JavaScript-এর Global Pollution Problem

## ধারণা কী?

Browser-এ যদি একাধিক JavaScript file `<script>` tag দিয়ে load করা হয়, তাহলে একটি file-এর global variable আরেকটি file থেকে access করা যেতে পারে।

এতে problem হয়, কারণ:

* file আলাদা হলেও global scope shared হতে পারে
* এক file-এর variable অন্য file overwrite করতে পারে
* naming collision হতে পারে
* বড় project maintain করা কঠিন হয়

ভিডিওতে `script-one.js` এবং `script-two.js` দিয়ে এই problem দেখানো হয়েছে।

---

## উদাহরণ: Browser Script Loading

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Script Example</title>
</head>
<body>
  <script src="./script-one.js"></script>
  <script src="./script-two.js"></script>
</body>
</html>
```

### `script-one.js`

```js
var a = 5;
```

### `script-two.js`

```js
var b = 10;

console.log(a + b);
```

Output:

```txt
15
```

### কেন `script-two.js` থেকে `a` access করা গেল?

কারণ `script-one.js` আগে load হয়েছে। সেখানে `var a = 5` global scope-এ চলে গেছে। পরে `script-two.js` load হওয়ায় সে global `a` access করতে পেরেছে।

### Problem কোথায়?

ধরি `script-two.js` অন্য একজন developer লিখেছে এবং সে accidently আবার `a` নামে variable declare করল:

```js
var a = 10;
var b = 10;

console.log(a + b);
```

Output:

```txt
20
```

এখানে আগের `a = 5` overwrite বা conflict হয়ে গেছে।

ভিডিওতে instructor বলেছেন, এভাবে এক file-এর variable আরেক file-এ চলে গেলে modularity থাকে না, naming collision হয়, এবং accidental change হতে পারে।

---

# 7. Node.js Module System

## ধারণা কী?

Node.js-এ প্রতিটি `.js` file একটি আলাদা module।

ভিডিওতে খুব পরিষ্কারভাবে বলা হয়েছে:

> Node.js-এর প্রত্যেকটা `.js` file এক একটা module।

অর্থাৎ এক file-এর variable, function, object automatically অন্য file-এ available হয় না।

### Module কী?

সহজভাবে:

```txt
Node.js module = একটি আলাদা .js file
```

প্রতিটি module:

* নিজের scope রাখে
* নিজের variable রাখে
* নিজের function রাখে
* অন্য file থেকে protected থাকে
* চাইলে নির্দিষ্ট value export করতে পারে
* অন্য module থেকে value import করতে পারে

### কেন দরকার?

Module system দরকার কারণ:

1. বড় application ছোট ছোট file-এ ভাগ করা যায়।
2. Code reusable হয়।
3. Naming collision কমে।
4. Team collaboration সহজ হয়।
5. External package ব্যবহার করা যায়।
6. Encapsulation পাওয়া যায়।

### বাস্তব জীবনে কোথায় ব্যবহার হয়?

ধরি একটি backend project:

```txt
project/
├── index.js
├── routes/
│   └── userRoutes.js
├── controllers/
│   └── userController.js
├── models/
│   └── userModel.js
└── utils/
    └── logger.js
```

এখানে প্রতিটি file একটি module। যেমন:

* `userRoutes.js` route handle করে
* `userController.js` business logic handle করে
* `userModel.js` database model রাখে
* `logger.js` logging utility রাখে

সব code এক file-এ না রেখে module অনুযায়ী ভাগ করলে project clean ও maintainable হয়।

---

# 8. First Custom Module তৈরি করা

## Step 1: `people.js` file তৈরি

```js
const people = ["Sakib", "Tamim", "Mashrafe"];
```

এখানে `people` নামে একটি array তৈরি করা হয়েছে।

## Step 2: `index.js` থেকে file require করা

```js
const people = require("./people");

console.log(people);
```

অনেকে ভাবতে পারে, `people.js` file require করলেই `people` array পাওয়া যাবে। কিন্তু প্রথমে তা হবে না।

Output:

```txt
{}
```

ভিডিওতে দেখা যায়, শুধু `require("./people")` করলেই array পাওয়া যায়নি; blank object এসেছে।

### কেন blank object আসে?

কারণ `people.js` file কিছু export করেনি।

Node.js-এ কোনো file থেকে value অন্য file-এ পাঠাতে হলে explicitly export করতে হয়।

---

# 9. `module.exports`

## ধারণা কী?

`module.exports` ব্যবহার করে একটি module বলে দেয়:

```txt
আমি বাইরে কোন value/function/object পাঠাতে চাই।
```

অন্য file যখন `require()` করবে, তখন `require()` মূলত সেই exported value return করবে।

ভিডিওতে instructor বলেছেন, file নিজেই decide করে কী কী জিনিস অন্য file-এ available করবে। export না করলে অন্য file সেটা পাবে না।

---

## Example: Single Export

### `people.js`

```js
const people = ["Sakib", "Tamim", "Mashrafe"];

module.exports = people;
```

### `index.js`

```js
const people = require("./people");

console.log(people);
```

Output:

```txt
[ 'Sakib', 'Tamim', 'Mashrafe' ]
```

ভিডিওতে `module.exports = people` করার পর `index.js` থেকে array পাওয়া গেছে।

---

## গুরুত্বপূর্ণ লাইন ব্যাখ্যা

```js
const people = ["Sakib", "Tamim", "Mashrafe"];
```

এখানে একটি local variable তৈরি হয়েছে। এটি শুধু `people.js` file-এর ভিতরে available।

```js
module.exports = people;
```

এখানে `people` array-কে module-এর exported value হিসেবে set করা হয়েছে।

```js
const people = require("./people");
```

এখানে `require("./people")` `people.js` file load করে এবং `module.exports`-এ যা আছে তা return করে।

```js
console.log(people);
```

এখানে imported array print করা হয়েছে।

---

# 10. `module` Object কী?

Node.js প্রতিটি file/module-এর জন্য একটি `module` object তৈরি করে।

আমরা দেখতে পারি:

```js
console.log(module);
```

Output-এর মধ্যে সাধারণত এমন property থাকে:

```js
{
  id: '.',
  path: '...',
  exports: {},
  filename: '...',
  loaded: false,
  children: [],
  paths: [...]
}
```

ভিডিওতে দেখানো হয়েছে, `module` object-এর মধ্যে `exports` নামে একটি property থাকে এবং এর default value blank object `{}`।

### কেন প্রথমে `{}` পাওয়া যায়?

কারণ defaultভাবে:

```js
module.exports = {};
```

যদি আপনি কিছু export না করেন, তাহলে `require()` blank object return করে।

### Example

`people.js`:

```js
const people = ["Sakib", "Tamim", "Mashrafe"];
```

`index.js`:

```js
const people = require("./people");

console.log(people);
```

Output:

```txt
{}
```

কারণ `people.js`-এ `module.exports` set করা হয়নি।

---

# 11. Multiple Values Export করা

## সমস্যা

একটি module থেকে যদি একাধিক value export করতে চাই, যেমন:

* `people` array
* `a` variable
* `test()` function

তাহলে কী করব?

## সমাধান

একটি object export করব।

### `people.js`

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

### Shortcut syntax

যখন object-এর key এবং variable name একই হয়, তখন সংক্ষিপ্তভাবে লেখা যায়:

```js
module.exports = {
  people,
  a,
  test,
};
```

ভিডিওতে instructor দেখিয়েছেন, একাধিক value export করার জন্য object ব্যবহার করা যায় এবং একই নাম হলে shortcut syntax ব্যবহার করা যায়।

---

## `index.js`

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

---

## গুরুত্বপূর্ণ লাইন ব্যাখ্যা

```js
const data = require("./people");
```

`people.js` থেকে exported object import করা হলো।

```js
console.log(data.people);
```

Exported object-এর `people` property access করা হলো।

```js
console.log(data.a);
```

Exported object-এর `a` property access করা হলো।

```js
data.test();
```

Exported object-এর `test` function call করা হলো।

---

## Custom key name দিয়ে export

চাইলে export করার সময় নাম পরিবর্তন করা যায়:

```js
module.exports = {
  players: people,
  number: a,
  runTest: test,
};
```

তাহলে import করার পর access করতে হবে:

```js
const data = require("./people");

console.log(data.players);
console.log(data.number);
data.runTest();
```

---

# 12. `require()` Function

## ধারণা কী?

`require()` হলো CommonJS module system-এর function, যার মাধ্যমে অন্য module load করা যায়।

```js
const something = require("module-name-or-path");
```

ভিডিওতে instructor বলেছেন, `require()` function-এর মধ্যে file path দেওয়া হয় এবং সেই file/module require করে আনা হয়।

---

## `require()` কী return করে?

`require()` return করে target module-এর `module.exports` value।

যদি target module-এ থাকে:

```js
module.exports = people;
```

তাহলে:

```js
const people = require("./people");
```

এখানে `people` variable-এ array আসবে।

যদি target module-এ থাকে:

```js
module.exports = {
  people,
  a,
  test,
};
```

তাহলে:

```js
const data = require("./people");
```

এখানে `data` variable-এ object আসবে।

---

# 13. Relative Path: `./`, `../`

## `./` মানে কী?

```js
require("./people");
```

এখানে `./` মানে current directory।

অর্থাৎ যে file থেকে require করা হচ্ছে, সেই file-এর একই folder-এ `people.js` আছে।

ভিডিওতে বলা হয়েছে, `./` মানে হলো বর্তমান path বা যে path-এ আমরা আছি।

---

## `.js` extension দেওয়া কি বাধ্যতামূলক?

না, CommonJS require-এ local JavaScript file require করার সময় সাধারণত `.js` না দিলেও Node.js বুঝে নেয়।

```js
require("./people");
```

এবং

```js
require("./people.js");
```

দুইটাই কাজ করতে পারে।

---

## Folder-এর মধ্যে file থাকলে

Project structure:

```txt
project/
├── index.js
└── test/
    └── people.js
```

তাহলে:

```js
const people = require("./test/people");
```

ভিডিওতে `test` folder-এর মধ্যে `people` file থাকলে `./test/people` দিতে হবে বলা হয়েছে।

---

## এক folder পিছনে যেতে হলে

```js
require("../people");
```

`../` মানে parent directory।

---

# 14. Node.js Module Wrapper Function

## ধারণা কী?

Node.js file-এর code সরাসরি execute করে না। বরং প্রতিটি module-এর code invisibleভাবে একটি function-এর মধ্যে wrap করে।

ধারণাগতভাবে:

```js
(function (exports, require, module, __filename, __dirname) {
  // আপনার file-এর code এখানে থাকে
});
```

ভিডিওতে বলা হয়েছে, Node.js প্রতিটি `.js` file-এর code একটি invisible wrapper function-এর মধ্যে রাখে এবং সেখানে `exports`, `require`, `module`, `__filename`, `__dirname` parameter হিসেবে pass করে।

### গুরুত্বপূর্ণ

এই function আপনি নিজে লিখবেন না। Node.js internally করে।

ভিডিওতেও instructor বলেছেন, এটা বোঝার জন্য দেখানো হচ্ছে; manually লিখে দিতে হবে না।

---

## কেন wrapper function দরকার?

Wrapper function দরকার কয়েকটি কারণে:

1. প্রতিটি file আলাদা scope পায়।
2. এক file-এর variable অন্য file-এ leak করে না।
3. `module`, `exports`, `require`, `__filename`, `__dirname` available হয়।
4. Browser-এর global pollution problem এড়ানো যায়।
5. Module system তৈরি করা যায়।

---

## Wrapper function-এর parameter

| Parameter    | কাজ                                                 |
| ------------ | --------------------------------------------------- |
| `exports`    | `module.exports`-এর shortcut হিসেবে ব্যবহার করা যায় |
| `require`    | অন্য module import/load করার function               |
| `module`     | বর্তমান module সম্পর্কিত object                     |
| `__filename` | বর্তমান file-এর full path                           |
| `__dirname`  | বর্তমান file-এর directory path                      |

ভিডিওতে এই পাঁচটি জিনিস wrapper function-এর parameter হিসেবে pass হয় বলে ব্যাখ্যা করা হয়েছে।

---

## `var` কেন `global`-এ attach হয় না?

কারণ আপনার code আসলে wrapper function-এর ভিতরে থাকে।

ধরি আপনি লিখলেন:

```js
var a = 5;
```

Node.js এটিকে ধারণাগতভাবে এমনভাবে wrap করে:

```js
(function (exports, require, module, __filename, __dirname) {
  var a = 5;
});
```

এখন `var a` function-scoped। তাই এটি `global.a` হয় না।

এ কারণেই:

```js
var a = 5;

console.log(global.a);
```

Output:

```txt
undefined
```

---

## `require`, `module`, `__dirname`, `__filename` global না হয়েও কীভাবে পাওয়া যায়?

কারণ এগুলো wrapper function-এর parameter হিসেবে আপনার file-এর scope-এ available থাকে।

তাই এগুলো `global` object-এর মধ্যে না থাকলেও আপনি file-এর ভিতরে সরাসরি ব্যবহার করতে পারেন।

```js
console.log(__dirname);
console.log(__filename);
console.log(module);
console.log(require);
```

---

# 15. `exports` বনাম `module.exports`

ভিডিওতে মূলত `module.exports` ব্যবহার করা হয়েছে। Beginner পর্যায়ে সবচেয়ে নিরাপদ হলো `module.exports` ব্যবহার করা।

## Basic rule

```js
module.exports = something;
```

এটাই সবচেয়ে পরিষ্কার।

## Example

```js
const people = ["Sakib", "Tamim", "Mashrafe"];

module.exports = people;
```

## Multiple export

```js
const people = ["Sakib", "Tamim", "Mashrafe"];
const age = 30;

module.exports = {
  people,
  age,
};
```

## সতর্কতা

`exports` technically `module.exports`-এর reference হিসেবে শুরু করে, কিন্তু ভুলভাবে assign করলে problem হতে পারে।

Avoid:

```js
exports = people;
```

Prefer:

```js
module.exports = people;
```

অথবা:

```js
exports.people = people;
```

Beginner হিসেবে `module.exports` ব্যবহার করাই ভালো।

---

# 16. External Module: npm/yarn Package ব্যবহার

## ধারণা কী?

নিজের তৈরি module ছাড়াও অন্য developer-এর তৈরি package ব্যবহার করা যায়। এগুলো সাধারণত npm registry থেকে install করা হয়।

ভিডিওতে `lodash` package-এর উদাহরণ দেখানো হয়েছে।

---

## Install using yarn

```bash
yarn add lodash
```

অথবা npm দিয়ে:

```bash
npm install lodash
```

Install করার পর `package.json` file-এর `dependencies` অংশে package-এর নাম যুক্ত হয়।

ভিডিওতে বলা হয়েছে, dependency-তে যে নামে package আসে, সেই নাম দিয়েই require করা হয়।

---

## External module require করা

```js
const _ = require("lodash");
```

এখানে `./` বা `../` নেই।

কারণ:

```js
require("lodash")
```

Node.js বুঝবে এটি local file না, external package। তখন Node.js `node_modules` folder থেকে package খুঁজবে।

---

## Example: Lodash `last()` function

### `people.js`

```js
const people = ["Sakib", "Tamim", "Mashrafe"];

module.exports = people;
```

### `index.js`

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

ভিডিওতে `_.last(people)` ব্যবহার করে `people` array-এর last element `Mashrafe` output হিসেবে দেখানো হয়েছে।

---

## গুরুত্বপূর্ণ লাইন ব্যাখ্যা

```js
const _ = require("lodash");
```

`lodash` package import করা হলো। Conventionally lodash-কে `_` নামে রাখা হয়।

```js
const people = require("./people");
```

নিজের local `people.js` module import করা হলো।

```js
const lastPerson = _.last(people);
```

Lodash-এর `last()` function array-এর শেষ element return করে।

```js
console.log(lastPerson);
```

শেষ element print করা হলো।

---

# 17. Built-in Module

## ধারণা কী?

Node.js-এর নিজস্ব কিছু built-in module আছে। এগুলো install করতে হয় না। Node.js-এর সাথে defaultভাবে আসে।

ভিডিওতে বলা হয়েছে, Node.js-এর built-in module যেমন `http`, `fs`, `os`, `crypto` ইত্যাদি আছে।

## উদাহরণ

| Module   | কাজ                                |
| -------- | ---------------------------------- |
| `http`   | HTTP server তৈরি বা request handle |
| `fs`     | File system read/write             |
| `os`     | Operating system সম্পর্কিত তথ্য    |
| `crypto` | Cryptography, hashing              |
| `path`   | File path handle                   |

---

## Example: `fs` module

```js
const fs = require("fs");

const data = fs.readFileSync("./hello.txt", "utf-8");

console.log(data);
```

### ব্যাখ্যা

```js
const fs = require("fs");
```

Node.js-এর built-in `fs` module import করা হলো।

```js
const data = fs.readFileSync("./hello.txt", "utf-8");
```

`hello.txt` file synchronously read করা হলো।

```js
console.log(data);
```

File-এর content print করা হলো।

---

# 18. Module-এর তিন ধরন

ভিডিওর শেষে module তিন ধরনের হতে পারে বলা হয়েছে।

| ধরন                 | উদাহরণ             | Install লাগে? | Require করার ধরন      |
| ------------------- | ------------------ | ------------- | --------------------- |
| Custom/local module | `./people`         | না            | `require("./people")` |
| External module     | `lodash`           | হ্যাঁ         | `require("lodash")`   |
| Built-in module     | `fs`, `http`, `os` | না            | `require("fs")`       |

---

## 1. Custom Module

নিজে বানানো file।

```js
const people = require("./people");
```

## 2. External Module

npm/yarn দিয়ে install করা package।

```js
const _ = require("lodash");
```

## 3. Built-in Module

Node.js-এর সাথে built-in আসে।

```js
const fs = require("fs");
```

---

# Code Examples

## Example 1: Node.js-এ `window` নেই

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

### ব্যাখ্যা

Node.js browser নয়। তাই browser-specific `window` object এখানে নেই।

---

## Example 2: Node.js-এ `global`

```js
console.log(global);
```

### ব্যাখ্যা

Node.js-এর global object হলো `global`। এতে timer function সহ কিছু global utility থাকে।

---

## Example 3: `setTimeout` Node.js-এ

```js
setTimeout(function () {
  console.log("test");
}, 1000);
```

Output:

```txt
test
```

### ব্যাখ্যা

`setTimeout()` Node.js global environment-এ available। তাই import ছাড়াই ব্যবহার করা যায়।

---

## Example 4: Node.js variable global হয় না

```js
var a = 5;

console.log(global.a);
```

Output:

```txt
undefined
```

### ব্যাখ্যা

Node.js প্রতিটি file wrapper function-এর মধ্যে রাখে। তাই `var a` module scope-এ থাকে, `global` object-এ যায় না।

---

## Example 5: `__dirname` এবং `__filename`

```js
console.log(__dirname);
console.log(__filename);
```

Possible output:

```txt
/Users/example/project
/Users/example/project/index.js
```

### ব্যাখ্যা

* `__dirname`: current file-এর directory path
* `__filename`: current file-এর full path

---

## Example 6: Export ছাড়া require করলে blank object

### `people.js`

```js
const people = ["Sakib", "Tamim", "Mashrafe"];
```

### `index.js`

```js
const people = require("./people");

console.log(people);
```

Output:

```txt
{}
```

### ব্যাখ্যা

`people.js` কিছু export করেনি। তাই default `module.exports` অর্থাৎ `{}` return হয়েছে।

---

## Example 7: Single value export

### `people.js`

```js
const people = ["Sakib", "Tamim", "Mashrafe"];

module.exports = people;
```

### `index.js`

```js
const people = require("./people");

console.log(people);
```

Output:

```txt
[ 'Sakib', 'Tamim', 'Mashrafe' ]
```

---

## Example 8: Multiple value export

### `people.js`

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

### `index.js`

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

---

## Example 9: External module lodash

Install:

```bash
yarn add lodash
```

Code:

```js
const _ = require("lodash");
const people = require("./people");

console.log(_.last(people));
```

Output:

```txt
Mashrafe
```

---

## Example 10: Built-in module

```js
const os = require("os");

console.log(os.platform());
console.log(os.hostname());
```

### ব্যাখ্যা

`os` Node.js-এর built-in module। Install করতে হয় না।

---

# Common Mistakes

## Mistake 1: Node.js-এ `window` ব্যবহার করা

ভুল:

```js
console.log(window);
```

Node.js-এ error হবে।

সঠিক:

```js
console.log(global);
```

তবে browser-specific কাজ করলে Node.js-এ `window` পাওয়া যাবে না।

---

## Mistake 2: মনে করা `var` global object-এ attach হবে

ভুল ধারণা:

```js
var a = 5;
console.log(global.a); // 5 ভাবা
```

বাস্তব:

```txt
undefined
```

কারণ Node.js module scope ব্যবহার করে।

---

## Mistake 3: Export না করে require করা

ভুল:

```js
// people.js
const people = ["Sakib", "Tamim"];
```

```js
// index.js
const people = require("./people");
console.log(people);
```

Output:

```txt
{}
```

সঠিক:

```js
// people.js
const people = ["Sakib", "Tamim"];

module.exports = people;
```

---

## Mistake 4: Local file require করার সময় `./` ভুলে যাওয়া

ভুল:

```js
const people = require("people");
```

Node.js ভাববে এটি external package।

সঠিক:

```js
const people = require("./people");
```

---

## Mistake 5: Object export করলে direct value ভাবা

`people.js`:

```js
module.exports = {
  people,
  a,
  test,
};
```

ভুল:

```js
const people = require("./people");

console.log(people[0]);
```

সঠিক:

```js
const data = require("./people");

console.log(data.people[0]);
```

---

## Mistake 6: `exports = something` ব্যবহার করা

ভুল:

```js
exports = people;
```

সঠিক:

```js
module.exports = people;
```

অথবা:

```js
exports.people = people;
```

Beginner হলে `module.exports` ব্যবহার করুন।

---

# Best Practices

## 1. প্রতিটি file-কে module হিসেবে ভাবুন

এক file-এ সব code না লিখে responsibility অনুযায়ী ভাগ করুন।

ভালো structure:

```txt
project/
├── index.js
├── config/
├── routes/
├── controllers/
├── services/
├── utils/
└── models/
```

---

## 2. যা দরকার শুধু সেটাই export করুন

সব variable/function export করবেন না।

ভালো:

```js
function internalHelper() {
  // only for this file
}

function publicFunction() {
  // used by other modules
}

module.exports = publicFunction;
```

---

## 3. Multiple export করলে object ব্যবহার করুন

```js
module.exports = {
  createUser,
  getUser,
  deleteUser,
};
```

---

## 4. Meaningful name ব্যবহার করুন

ভালো:

```js
const userService = require("./services/userService");
```

কম ভালো:

```js
const x = require("./services/userService");
```

---

## 5. External package require করার আগে install করুন

```bash
npm install lodash
```

অথবা:

```bash
yarn add lodash
```

তারপর:

```js
const _ = require("lodash");
```

---

## 6. Built-in module install করতে যাবেন না

ভুল:

```bash
npm install fs
```

সঠিক:

```js
const fs = require("fs");
```

`fs`, `http`, `os`, `crypto`, `path` এগুলো built-in।

---

## 7. Path পরিষ্কার রাখুন

Same folder:

```js
require("./people");
```

Subfolder:

```js
require("./data/people");
```

Parent folder:

```js
require("../people");
```

---

# Quick Revision

## Node.js কী?

Node.js হলো JavaScript runtime। এটি JavaScript-কে browser-এর বাইরে, server বা local machine-এ run করতে দেয়।

## Browser-এর global object কী?

```js
window
```

## Node.js-এর global object কী?

```js
global
```

## Node.js-এ `window` আছে?

না।

```js
console.log(window);
```

Error:

```txt
window is not defined
```

## Node.js-এ `setTimeout()` কেন কাজ করে?

কারণ এটি Node.js global environment-এ available।

## Node.js-এ `var a = 5` করলে কি `global.a` হবে?

না।

```js
var a = 5;
console.log(global.a); // undefined
```

## `__dirname` কী?

Current file যে directory-তে আছে, সেই directory-এর path।

## `__filename` কী?

Current file-এর full path।

## Node.js module কী?

প্রতিটি `.js` file একটি module।

## `require()` কী করে?

অন্য module load করে এবং সেই module-এর `module.exports` return করে।

## `module.exports` কী করে?

কোন value/function/object অন্য file-এ available হবে তা define করে।

## Export না করলে require কী return করে?

Default blank object:

```js
{}
```

## Multiple value export করতে কী ব্যবহার করব?

Object:

```js
module.exports = {
  people,
  test,
};
```

## Module wrapper function কী?

Node.js প্রতিটি file invisibleভাবে function-এর মধ্যে wrap করে:

```js
(function (exports, require, module, __filename, __dirname) {
  // module code
});
```

## Module কয় ধরনের?

1. Custom/local module
2. External/npm module
3. Built-in Node.js module

---

# Interview / Exam Style Questions

## 1. Node.js কি programming language?

না। Node.js একটি JavaScript runtime। এটি JavaScript-কে browser-এর বাইরে run করতে দেয়।

---

## 2. Browser-এর `window` object এবং Node.js-এর `global` object-এর পার্থক্য কী?

Browser-এ global object হলো `window`; Node.js-এ global object হলো `global`। `window` browser-specific API বহন করে, যেমন DOM, alert, location ইত্যাদি। Node.js server-side runtime হওয়ায় এসব নেই; বরং Node.js-এর নিজস্ব global utility থাকে।

---

## 3. Node.js-এ `window is not defined` error কেন হয়?

কারণ Node.js browser environment নয়। `window` object browser-এর অংশ। Node.js-এ তার পরিবর্তে `global` object আছে।

---

## 4. Node.js-এ `setTimeout()` import না করেও কীভাবে ব্যবহার করা যায়?

কারণ `setTimeout()` Node.js global environment-এ available। তাই সরাসরি call করা যায়।

---

## 5. Node.js-এ global scope-এ `var a = 5` লিখলে কি `global.a` পাওয়া যাবে?

না। Node.js প্রতিটি file-কে module হিসেবে wrapper function-এর ভিতরে রাখে। তাই `var` module scope-এ থাকে, `global` object-এ attach হয় না।

---

## 6. Node.js module কী?

Node.js-এ প্রতিটি `.js` file একটি module। প্রতিটি module নিজের scope রাখে এবং যা export করা হয় শুধু সেটাই অন্য module থেকে access করা যায়।

---

## 7. `require()` কী return করে?

`require()` target module-এর `module.exports` value return করে।

---

## 8. `module.exports` কী?

`module.exports` হলো সেই value/object/function যা একটি module অন্য module-কে দিতে চায়।

---

## 9. Export না করলে `require()` কী return করবে?

Defaultভাবে `module.exports` একটি blank object `{}`। তাই কিছু export না করলে `require()` `{}` return করে।

---

## 10. `__dirname` এবং `__filename` কোথা থেকে আসে?

এগুলো Node.js module wrapper function-এর parameter হিসেবে আসে। এগুলো `global` object-এর property নয়।

---

## 11. Node.js module wrapper function কী?

Node.js প্রতিটি module-এর code invisibleভাবে একটি function-এর মধ্যে wrap করে:

```js
(function (exports, require, module, __filename, __dirname) {
  // code
});
```

এর ফলে module scope তৈরি হয় এবং `exports`, `require`, `module`, `__filename`, `__dirname` accessible হয়।

---

## 12. Custom module এবং external module-এর পার্থক্য কী?

Custom module হলো নিজের বানানো file:

```js
require("./people");
```

External module হলো npm/yarn দিয়ে install করা package:

```js
require("lodash");
```

---

## 13. Built-in module কী?

Node.js-এর সাথে defaultভাবে আসা module, যেমন:

```js
fs
http
os
crypto
path
```

এসব install করতে হয় না।

---

## 14. `require("./people")` এবং `require("people")`-এর পার্থক্য কী?

`require("./people")` local file খোঁজে।

`require("people")` external package বা built-in module হিসেবে খোঁজে।

---

## 15. Multiple value কীভাবে export করা যায়?

Object export করে:

```js
module.exports = {
  people,
  test,
};
```

---

# Key Takeaways

1. Node.js আলাদা language নয়; এটি JavaScript runtime।
2. Browser-এ global object হলো `window`; Node.js-এ global object হলো `global`।
3. Node.js-এ `window`, `document`, `alert` নেই, কারণ এগুলো browser-specific।
4. Node.js-এ `setTimeout`, `setInterval` ইত্যাদি globalভাবে available।
5. Node.js-এ global `var` automatically `global` object-এ attach হয় না।
6. `__dirname`, `__filename`, `require`, `module`, `exports` global object থেকে আসে না; এগুলো module wrapper function-এর মাধ্যমে পাওয়া যায়।
7. Node.js-এর প্রতিটি `.js` file একটি module।
8. এক module-এর variable অন্য module-এ automatically পাওয়া যায় না।
9. অন্য file-এ কিছু পাঠাতে হলে `module.exports` ব্যবহার করতে হয়।
10. অন্য module থেকে value আনতে `require()` ব্যবহার করা হয়।
11. `require()` মূলত target module-এর `module.exports` return করে।
12. কিছু export না করলে defaultভাবে `{}` return হয়।
13. Multiple value export করতে object ব্যবহার করা হয়।
14. Local module require করতে `./` বা `../` ব্যবহার করতে হয়।
15. External package require করতে package name ব্যবহার করা হয়, যেমন `require("lodash")`।
16. Built-in module install করতে হয় না, যেমন `fs`, `http`, `os`, `crypto`।
17. Node.js module system browser JavaScript-এর global pollution problem সমাধান করে।
18. এই module system-এর উপর ভিত্তি করেই Node.js এবং npm ecosystem এত powerful হয়েছে।
