# JavaScript Day 08 Study Notes: Execution Context, Call Stack, Stack & Heap

> Module 2-এর শুরুতে এই lesson-এ JavaScript code কীভাবে run করে, execution context কী, call stack কীভাবে execution context manage করে, আর stack/heap memory-তে variables, functions, objects কীভাবে রাখা হয়—এসব fundamental concept ব্যাখ্যা করা হয়েছে। এই notes এমনভাবে সাজানো হয়েছে যাতে ভিডিও না দেখেও পুরো lesson revise করা যায়।

---

## Table of Contents

1. [Lesson Overview](#lesson-overview)
2. [এই Lesson কেন গুরুত্বপূর্ণ](#এই-lesson-কেন-গুরুত্বপূর্ণ)
3. [JavaScript Code Run করার Background Flow](#javascript-code-run-করার-background-flow)
4. [Lexical Environment](#lexical-environment)
5. [Execution Context](#execution-context)
6. [Global Execution Context বা GEC](#global-execution-context-বা-gec)
7. [Creation Phase এবং Execution Phase](#creation-phase-এবং-execution-phase)
8. [Variable ও Function Memory Allocation](#variable-ও-function-memory-allocation)
9. [`this` keyword এবং `window` object](#this-keyword-এবং-window-object)
10. [Function Execution Context বা FEC](#function-execution-context-বা-fec)
11. [Code Example 1: Function declared but not invoked](#code-example-1-function-declared-but-not-invoked)
12. [Code Example 2: Function invoked](#code-example-2-function-invoked)
13. [Code Example 3: Complex GEC/FEC Flow](#code-example-3-complex-gecfec-flow)
14. [Call Stack](#call-stack)
15. [Stack Memory ও Heap Memory](#stack-memory-ও-heap-memory)
16. [Primitive vs Non-Primitive Memory Behavior](#primitive-vs-non-primitive-memory-behavior)
17. [Garbage Collection](#garbage-collection)
18. [Screenshot-based Visual Revision Diagrams](#screenshot-based-visual-revision-diagrams)
19. [Important Differences](#important-differences)
20. [Common Mistakes](#common-mistakes)
21. [Assignment](#assignment)
22. [Final Summary](#final-summary)
23. [Practice Checklist](#practice-checklist)

---

## Lesson Overview

এই lesson মূলত JavaScript-এর internal execution model বোঝার জন্য। আমরা সাধারণত code লিখি, browser বা runtime-এ চালাই, তারপর output দেখি। কিন্তু JavaScript engine ভিতরে ভিতরে কী করে—সেটা না বুঝলে অনেক advanced concept কঠিন মনে হয়। যেমন:

- hoisting
- scope
- scope chain
- closure
- `this` keyword
- event loop
- async JavaScript
- web APIs
- task queue
- microtask queue
- promises

এই lesson-এ বিশেষভাবে আলোচনা করা হয়েছে:

- Execution Context কী
- Global Execution Context কীভাবে তৈরি হয়
- Function Execution Context কখন তৈরি হয়
- Creation Phase এবং Execution Phase কী
- Call Stack কীভাবে function execution manage করে
- Stack ও Heap memory-তে primitive ও non-primitive value কীভাবে থাকে
- Garbage Collection কেন দরকার

---

## এই Lesson কেন গুরুত্বপূর্ণ

Execution Context JavaScript programming language-এর খুব fundamental concept। অনেক সময় এটাকে advanced topic হিসেবে দেখানো হয়, কিন্তু আসলে concept-টা সরল: JavaScript যখন কোনো code চালায়, তখন সেই চলমান code এবং code চালাতে দরকারি surrounding information নিয়ে একটি execution environment তৈরি করে। সেটাই execution context।

এই concept না বুঝলে নিচের বিষয়গুলোতে confusion হয়:

| Concept | Execution Context না বুঝলে কী সমস্যা হয় |
|---|---|
| Hoisting | কেন variable আগে `undefined` হয়, কিন্তু function call কাজ করতে পারে—বোঝা কঠিন হয় |
| Scope | কোন variable কোথা থেকে access হবে—confusing হয় |
| Scope Chain | inner function outer variable কীভাবে পায়—বোঝা কঠিন হয় |
| Closure | function execution শেষ হলেও data কীভাবে থাকে—বোঝা কঠিন হয় |
| `this` | browser global context-এ `this` কেন `window`—confusing হয় |
| Event Loop | async code পরে কীভাবে execute হয়—বোঝার foundation দুর্বল থাকে |

**মনে রাখার নিয়ম:**

> JavaScript কীভাবে code চালায় বুঝতে চাইলে আগে Execution Context বুঝতে হবে। Execution Context বুঝলে Hoisting, Scope, Closure, `this`, Event Loop—সবকিছু অনেক পরিষ্কার হয়।

---

## JavaScript Code Run করার Background Flow

ভিডিওতে আগের lesson-এর reference হিসেবে বলা হয়েছে যে JavaScript code সরাসরি machine বোঝে না। Code engine-এর ভিতরে কয়েকটি stage পার হয়ে executable form-এ যায়।

সাধারণভাবে flow:

```text
JavaScript Code
   ↓
Tokenizing
   ↓
Parsing
   ↓
Abstract Syntax Tree (AST)
   ↓
Machine-understandable / executable code
```

### Tokenizing

Code-কে ছোট ছোট meaningful unit বা token-এ ভাঙা হয়। যেমন:

```js
var a = 5;
```

এখানে token হতে পারে:

```text
var, a, =, 5, ;
```

### Parsing

Parser বা syntax parser code line by line দেখে JavaScript grammar follow করছে কিনা। যেমন `function` keyword ভুল লিখলে parser বুঝতে পারবে না।

### Abstract Syntax Tree বা AST

Parser code structure-কে tree format-এ সাজায়। JavaScript engine এই structure ব্যবহার করে code execute করার প্রস্তুতি নেয়।

### Common Mistake

নিচের code-এ `function` বানান ভুল:

```js
fucntion sayName() {
    var name = "someName";
    console.log("The name is, ", name);
}
```

এখানে `fucntion` ভুল keyword, তাই SyntaxError হবে। Correct code:

```js
function sayName() {
    var name = "someName";
    console.log("The name is, ", name);
}
```

**মনে রাখার নিয়ম:**

> JavaScript engine code execute করার আগে grammar check করে। তাই typo থাকলে execution context তৈরি হওয়ার আগেই SyntaxError হতে পারে।

---

## Lexical Environment

### Lexical মানে কী?

`lexical` শব্দের অর্থ হলো code কোথায় physically লেখা আছে বা code-এর placement কেমন।

### Lexical Environment কী?

Lexical Environment বলতে বোঝায়:

> Code-এর pieces কোথায় physically placed আছে এবং সেই placement JavaScript grammar অনুযায়ী valid কিনা।

ভিডিওর example অনুযায়ী:

```js
// More Code here
// ...
// ..
// .

function sayName() {
    var name = "someName";
    console.log("The name is, ", name);
}

sayName();

// More Code here
// ...
// ..
// .
```

এখানে:

- `sayName` function file-এর global area-তে lexically placed।
- `name` variable function-এর ভিতরে lexically placed।
- `console.log()` function-এর ভিতরে lexically placed।
- `sayName()` call global area-তে placed।

### সহজ Explanation

ধরো, একটি বইয়ে chapter, section, paragraph আছে। Paragraph কোথায় আছে সেটার উপর তার meaning depend করতে পারে। JavaScript code-এও variable/function কোথায় লেখা হয়েছে সেটা গুরুত্বপূর্ণ। Function-এর ভিতরের variable function-এর lexical environment-এর অংশ।

### Example

```js
function sayName() {
    var name = "someName";
    console.log("The name is, ", name);
}

sayName();
```

এখানে `name` variable শুধু `sayName` function-এর ভিতরে physically placed। তাই এটা function-এর local environment-এর অংশ।

### Common Mistake

অনেকে ভাবে variable শুধু declaration দেখলেই বোঝা যায়। কিন্তু variable কোথায় declaration হয়েছে, সেটাই scope এবং execution behavior বোঝার জন্য important।

### মনে রাখার নিয়ম

> Lexical Environment = code কোথায় লেখা আছে।  
> Execution Context = এখন কোন code চলছে এবং সেটি চালাতে কী surrounding information দরকার।

---

## Execution Context

### Definition

Execution Context হলো:

> বর্তমানে যে code run হচ্ছে এবং সেই code run করতে JavaScript engine-এর যে surrounding information দরকার, তার environment।

আরও সহজভাবে:

```text
Execution Context = currently running code + code চালানোর জন্য দরকারি context
```

### Context মানে কী?

Context মানে কোনো ঘটনা বা situation বোঝার জন্য surrounding circumstances। যেমন, শুধু “সে দৌড়াচ্ছে” শুনলে পুরো meaning clear নয়। কিন্তু যদি বলা হয় “সে race-এ দৌড়াচ্ছে”, তাহলে context clear হয়।

JavaScript-এও শুধু code line দেখা যথেষ্ট নয়। JavaScript engine জানতে চায়:

- কোন variable memory-তে আছে?
- function body কোথায় আছে?
- এখন কোন function execute হচ্ছে?
- global object কী?
- `this` কী refer করছে?
- function execution শেষ হলে কোথায় ফিরতে হবে?

এই সব information মিলে execution context।

---

## Global Execution Context বা GEC

### GEC কী?

JavaScript file run হলে প্রথমেই Global Execution Context তৈরি হয়। এটাকে short form-এ GEC বলা হয়।

### কখন তৈরি হয়?

JavaScript file browser/runtime-এ load হলেই GEC তৈরি হয়। এমনকি file খালি থাকলেও GEC তৈরি হয়।

```js
// index.js file is empty
```

তবুও browser JavaScript environment-এ Global Execution Context তৈরি করবে।

### Global মানে কী?

এই lesson-এর context-এ:

> Global = function-এর বাইরে থাকা সবকিছু।

Example:

```js
var a = 5;

function testMe() {
    var b = 10;
}
```

এখানে:

- `a` global variable, কারণ function-এর বাইরে।
- `testMe` global function declaration, কারণ function-এর বাইরে declared।
- `b` global নয়, কারণ function-এর ভিতরে declared।

### Browser-এ GEC তৈরি হলে কী তৈরি হয়?

Browser environment-এ GEC তৈরি হলে অন্তত দুটি important জিনিস পাওয়া যায়:

1. `window` object
2. `this` keyword

Global context-এ browser script হিসেবে:

```js
console.log(window);
console.log(this);
console.log(this === window); // true
```

### Important Caveat

এই lesson-এর examples browser-এর normal script environment ধরে ব্যাখ্যা করা হয়েছে। Modern JavaScript module (`type="module"`) বা strict mode-এ `this` behavior আলাদা হতে পারে। কিন্তু ভিডিওর context অনুযায়ী browser global script-এ `this === window`।

---

## Creation Phase এবং Execution Phase

প্রতিটি execution context সাধারণত দুইটি major phase দিয়ে বোঝানো হয়:

1. Creation Phase বা CP
2. Execution Phase বা EP

| Phase | কী হয় |
|---|---|
| Creation Phase | Memory allocation হয়, variables `undefined` দিয়ে initialize হয়, function body memory-তে রাখা হয়, browser global object/`this` তৈরি হয় |
| Execution Phase | Code line by line execute হয়, variable-এ actual value assign হয়, function call হলে নতুন FEC তৈরি হয় |

### Creation Phase

Creation Phase-এ JavaScript code execute করে না। বরং code execute করার আগে প্রস্তুতি নেয়।

এ সময়:

- Global context হলে `window` object তৈরি হয়।
- Global context হলে `this` keyword তৈরি হয় এবং browser script-এ `window` refer করে।
- Variable declaration memory-তে যায়।
- `var` variable প্রথমে `undefined` হয়।
- Function declaration-এর পুরো body memory-তে store হয়।

Example:

```js
var name = 'Tom';

function sayName() {
  console.log(this.name);
}
```

Creation Phase-এ conceptual memory:

```text
name    → undefined
sayName → function body
this    → window
window  → global object
```

### Execution Phase

Execution Phase-এ JavaScript code line by line execute করে।

Same code:

```js
var name = 'Tom';

function sayName() {
  console.log(this.name);
}
```

Execution Phase:

```text
Line 1: name = 'Tom' assign হয়
Line 3-5: function declaration already creation phase-এ memory-তে আছে, তাই নতুন করে execute হয় না
No function call, তাই sayName-এর FEC তৈরি হয় না
```

### Common Mistake

Function declaration থাকলেই function execute হয় না। Function execute করতে invoke/call করতে হয়।

```js
function sayName() {
  console.log(this.name);
}

// এখানে function শুধু define করা হয়েছে, call করা হয়নি।
```

Call করতে হবে:

```js
sayName();
```

### মনে রাখার নিয়ম

> Creation Phase = প্রস্তুতি।  
> Execution Phase = actual run।  
> Function declaration ≠ function execution।

---

## Variable ও Function Memory Allocation

### `var` variable কীভাবে memory পায়?

```js
var name = 'Tom';
```

Creation Phase:

```text
name → undefined
```

Execution Phase:

```text
name → 'Tom'
```

### Function declaration কীভাবে memory পায়?

```js
function tom() {
   console.log(this.name + ' Runs');
}
```

Creation Phase:

```text
tom → পুরো function body
```

Execution Phase-এ function declaration line আবার execute হয় না। Function body তখনই run হবে যখন function call হবে:

```js
tom();
```

### Variable vs Function in Creation Phase

| Item | Creation Phase-এ কী হয় | Execution Phase-এ কী হয় |
|---|---|---|
| `var name = 'Tom'` | `name` memory পায় এবং `undefined` হয় | `'Tom'` assign হয় |
| `function tom(){...}` | পুরো function body memory-তে store হয় | call না হলে কিছু run হয় না |
| `tom()` | Creation Phase-এ call execute হয় না | Function call হলে FEC তৈরি হয় |

### এই behavior Hoisting-এর foundation

Creation Phase-এ variable ও function আগে memory পায় বলেই hoisting concept আসে। পরের lesson-এ hoisting ও scope নিয়ে detail হবে।

---

## `this` keyword এবং `window` object

Browser global script-এ JavaScript GEC তৈরি করার সময় `window` object এবং `this` দেয়।

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./index.js"></script>
</head>
<body>

</body>
</html>
```

যদি `index.js` খালি থাকে, তবুও browser console-এ পাওয়া যায়:

```js
console.log(window);
console.log(this);
console.log(this === window); // true in browser global script
```

### `window` object কী?

Browser-এর global object। Browser-related অনেক property/method এতে থাকে। যেমন:

- `alert()`
- `prompt()`
- `innerHeight`
- `document`
- browser-related APIs

### `this` কী refer করে?

এই lesson-এর context-এ browser global script-এ:

```js
this === window // true
```

মানে `this` এবং `window` একই object reference করছে। যেহেতু object হলো non-primitive value, strict equality (`===`) true হলে বুঝতে হবে তারা একই memory reference point করছে।

### Example

```js
var name = 'Tom';

function tom() {
   console.log(this.name + ' Runs');
}

tom();
```

Browser global non-module script-এ possible output:

```text
Tom Runs
```

কারণ:

- `var name = 'Tom'` global property হিসেবে `window.name`-এ attach হতে পারে।
- `tom()` normal function call হিসেবে non-strict browser environment-এ `this` global object অর্থাৎ `window` refer করতে পারে।
- তাই `this.name` → `window.name` → `'Tom'`।

### Common Mistake

সব জায়গায় `this === window` ধরে নেওয়া ভুল। যেমন:

- strict mode-এ normal function call-এ `this` হতে পারে `undefined`
- module script-এ top-level `this` `undefined` হতে পারে
- object method হিসেবে call করলে `this` object-কে refer করে
- arrow function-এর `this` lexical

### মনে রাখার নিয়ম

> এই lesson-এর `this` explanation browser global script context-এর জন্য। সব JavaScript environment-এ same নয়।

---

## Function Execution Context বা FEC

### FEC কী?

Function Execution Context হলো কোনো function call/invoke হলে সেই function-এর জন্য তৈরি হওয়া execution context।

### কখন FEC তৈরি হয়?

Function define করলে FEC তৈরি হয় না। Function call করলে FEC তৈরি হয়।

```js
function sayName() {
  console.log("Tom");
}

// এখানে শুধু function define করা হয়েছে, FEC তৈরি হয়নি।

sayName();
// এখানে function call হয়েছে, এখন FEC তৈরি হবে।
```

### প্রতিটি function call-এর জন্য FEC

যতবার function call হবে, ততবার নতুন FEC তৈরি হবে।

```js
function greet() {
  console.log("Hello");
}

greet(); // FEC #1
greet(); // FEC #2
greet(); // FEC #3
```

### FEC-তেও দুই phase থাকে

| FEC Phase | কী হয় |
|---|---|
| Creation Phase | function-এর local variables/parameters memory পায় এবং `undefined` হয়; inner function body memory-তে যায় |
| Execution Phase | function body line by line execute হয়; local values assign হয়; inner function call হলে নতুন FEC তৈরি হয় |

### মনে রাখার নিয়ম

> Function define করলে memory-তে body যায়। Function call করলে execution context তৈরি হয়।

---

## Code Example 1: Function declared but not invoked

```js
var name = 'Tom';

function sayName() {
  console.log(this.name);
}
```

### GEC Creation Phase

```text
window  → global object
this    → window
name    → undefined
sayName → function body
```

### GEC Execution Phase

```text
name = 'Tom'
function declaration line skip-like behavior, কারণ body already memory-তে আছে
sayName() call নেই, তাই FEC তৈরি হবে না
```

### Output

```text
No output
```

কারণ `sayName()` call করা হয়নি।

### Important Concept

Function declaration মানেই function execution নয়। Function run করতে parentheses দিয়ে call করতে হয়:

```js
sayName();
```

### Common Mistake

```js
function sayName() {
  console.log(this.name);
}
```

অনেকে ভাবে এই code output দিবে। কিন্তু function call না করলে body execute হয় না।

---

## Code Example 2: Function invoked

```js
var name = 'Tom';

function tom() {
   console.log(this.name + ' Runs');
}

// Invoke the function tom()
tom();
```

### Step-by-step Execution

#### 1. GEC Creation Phase

```text
window → global object
this   → window
name   → undefined
tom    → function body
```

#### 2. GEC Execution Phase

```text
name = 'Tom'
tom function declaration already stored
Line: tom() found
New FEC for tom() created
```

#### 3. FEC for `tom()` Creation Phase

`tom()` function-এর ভিতরে কোনো local variable নেই। তাই বড় কোনো memory allocation নেই।

```text
No local variable
No inner function declaration
```

#### 4. FEC for `tom()` Execution Phase

```js
console.log(this.name + ' Runs');
```

`console.log()` নিজেও একটি function call, তাই technically `log` function-এর জন্যও execution context তৈরি হতে পারে। ভিডিওতে বলা হয়েছে, simple code হলেও ভিতরে অনেক execution context তৈরি হতে পারে।

### Possible Output in browser global non-strict script

```text
Tom Runs
```

### Call Stack Flow

```text
1. [ GEC ]
2. [ GEC, tom FEC ]
3. [ GEC, tom FEC, console.log FEC ]
4. [ GEC, tom FEC ]
5. [ GEC ]
6. [ empty ]
```

### মনে রাখার নিয়ম

> Function call দেখলেই নতুন FEC। Function-এর ভিতরে আরেক function call থাকলে আবার নতুন FEC।

---

## Code Example 3: Complex GEC/FEC Flow

ভিডিওর main complex example:

```js
console.log("Inside Global Execution Context");
var a = 5;

function testMe() {
    console.log("Inside testMe Execution context");
    var b = 10;
    var user = {
        name: "tapas",
        country: "India"
    };

    function testAgain() {
        console.log("Inside testAgain Execution Context");
        console.log("Exiting testAgain Execution Context");
    }

    testAgain();
    console.log("Exiting testMe execution context");
}

testMe();
console.log("Exiting global execution context");
```

### Expected Output Order

```text
Inside Global Execution Context
Inside testMe Execution context
Inside testAgain Execution Context
Exiting testAgain Execution Context
Exiting testMe execution context
Exiting global execution context
```

### কেন এই order?

JavaScript line by line execute করে, কিন্তু function call পেলে current execution pause করে function-এর ভিতরে ঢুকে যায়। Function শেষ না হওয়া পর্যন্ত caller-এর পরের line execute হয় না।

Example:

```js
testMe();
console.log("Exiting global execution context");
```

এখানে `testMe()` call পেলে JavaScript আগে পুরো `testMe` execute করবে। তারপর `console.log("Exiting global execution context")` execute করবে।

`testMe()`-এর ভিতরে:

```js
testAgain();
console.log("Exiting testMe execution context");
```

এখানে `testAgain()` call পেলে JavaScript আগে পুরো `testAgain` execute করবে। তারপর `Exiting testMe...` log করবে।

---

## Complex Example: GEC/FEC with CP and EP

### 1. Global Execution Context বা GEC

#### GEC Creation Phase

Global level-এ আছে:

```js
var a = 5;
function testMe() { ... }
```

Creation Phase-এ:

```text
a      → undefined
testMe → function body
```

`console.log(...)` function call হলেও এই explanation-এ main focus variable/function memory allocation, তাই console.log-এর FEC অনেক সময় simplify করে ignore করা হয়।

#### GEC Execution Phase

Line by line:

```text
1. console.log("Inside Global Execution Context") execute
2. a = 5 assign
3. function declaration already memory-তে আছে
4. testMe() call পাওয়া যায়
5. testMe-এর জন্য FEC তৈরি হয়
6. testMe শেষ হলে global context-এ ফিরে আসে
7. console.log("Exiting global execution context") execute
```

---

### 2. Function Execution Context for `testMe()`

#### `testMe()` FEC Creation Phase

`testMe` function-এর ভিতরে আছে:

```js
var b = 10;
var user = {
    name: "tapas",
    country: "India"
};

function testAgain() { ... }
```

Creation Phase-এ:

```text
b         → undefined
user      → undefined
testAgain → function body
```

#### `testMe()` FEC Execution Phase

Line by line:

```text
1. console.log("Inside testMe Execution context") execute
2. b = 10 assign
3. user = object reference assign
4. testAgain declaration already memory-তে আছে
5. testAgain() call পাওয়া যায়
6. testAgain-এর জন্য FEC তৈরি হয়
7. testAgain শেষ হলে testMe-তে ফিরে আসে
8. console.log("Exiting testMe execution context") execute
9. testMe execution শেষ, testMe FEC call stack থেকে pop হয়
```

---

### 3. Function Execution Context for `testAgain()`

#### `testAgain()` FEC Creation Phase

`testAgain` function-এর ভিতরে local variable বা inner function নেই। তাই Creation Phase-এ বড় কোনো memory allocation নেই।

```text
No local variable
No inner function declaration
```

#### `testAgain()` FEC Execution Phase

```text
1. console.log("Inside testAgain Execution Context") execute
2. console.log("Exiting testAgain Execution Context") execute
3. testAgain execution শেষ, call stack থেকে pop হয়
```

---

## Call Stack

### Call Stack কী?

Call Stack হলো JavaScript-এর execution context manage করার stack data structure। Stack-এর behavior হলো LIFO:

```text
LIFO = Last In, First Out
```

মানে যে execution context সবার শেষে stack-এ ঢুকেছে, সেটাই আগে বের হবে।

### Stack-এর সহজ analogy

প্লেটের stack কল্পনা করো। নতুন প্লেট সবসময় উপরে রাখা হয়। আবার প্লেট নিতে হলে উপরের প্লেটটাই আগে নিতে হয়।

JavaScript call stack-এও:

- নতুন function call হলে তার execution context stack-এর উপরে push হয়।
- function execution শেষ হলে সেই context stack থেকে pop হয়।

### Complex Example-এর Call Stack Flow

#### Stage 0: শুরুতে stack empty

```text
[ empty ]
```

#### Stage 1: Global Execution Context তৈরি

```text
| GEC |
```

#### Stage 2: GEC execution-এ `testMe()` call

```text
| testMe FEC |
| GEC        |
```

#### Stage 3: `testMe()` execution-এ `testAgain()` call

```text
| testAgain FEC |
| testMe FEC    |
| GEC           |
```

#### Stage 4: `testAgain()` শেষ, stack থেকে বের

```text
| testMe FEC |
| GEC        |
```

#### Stage 5: `testMe()` শেষ, stack থেকে বের

```text
| GEC |
```

#### Stage 6: GEC execution শেষ

```text
[ empty ]
```

### Console Output-এর সাথে Stack Flow মিলিয়ে দেখা

| Output | তখন কোন context active |
|---|---|
| Inside Global Execution Context | GEC |
| Inside testMe Execution context | testMe FEC |
| Inside testAgain Execution Context | testAgain FEC |
| Exiting testAgain Execution Context | testAgain FEC |
| Exiting testMe execution context | testMe FEC |
| Exiting global execution context | GEC |

### মনে রাখার নিয়ম

> Function call হলে current context pause হয়, new FEC stack-এর top-এ যায়। Function শেষ হলে pop হয়ে caller context resume করে।

---

## Stack Memory ও Heap Memory

ভিডিওতে memory management বোঝাতে stack ও heap নিয়ে আলোচনা করা হয়েছে। JavaScript values memory-তে manage করার সময় primitive এবং non-primitive value আলাদা ভাবে handle করা হয়।

### Stack Memory

Stack হলো structured memory area। Execution contexts, primitive values এবং references manage করার সাথে stack জড়িত।

Stack-এর property:

- LIFO behavior
- fast access
- function call/return manage করে
- primitive value সাধারণত stack-এ directly থাকে
- non-primitive value-এর reference stack-এ থাকে

### Heap Memory

Heap হলো comparatively unstructured/discrete memory area, যেখানে objects, arrays, functions-এর actual data থাকে।

Heap-এ থাকে:

- object
- array
- function body
- non-primitive values

Stack-এ থাকে সেই heap object-এর reference/address।

### Complex Example Memory Flow

Code:

```js
var a = 5;

function testMe() {
    var b = 10;
    var user = {
        name: "tapas",
        country: "India"
    };

    function testAgain() {
        console.log("Inside testAgain Execution Context");
        console.log("Exiting testAgain Execution Context");
    }

    testAgain();
}
```

#### GEC Creation Phase Memory

```text
Stack:
a      → undefined
testMe → XA01 reference

Heap:
XA01 → function testMe body
```

#### GEC Execution Phase Memory

```text
Stack:
a      → 5
testMe → XA01 reference

Heap:
XA01 → function testMe body
```

#### `testMe()` FEC Creation Phase Memory

```text
Stack:
GEC items...
b         → undefined
user      → undefined
testAgain → YB01 reference

Heap:
XA01 → function testMe body
YB01 → function testAgain body
```

#### `testMe()` FEC Execution Phase Memory

```text
Stack:
a         → 5
testMe    → XA01 reference
b         → 10
user      → ZB01 reference
testAgain → YB01 reference

Heap:
XA01 → function testMe body
YB01 → function testAgain body
ZB01 → { name: "tapas", country: "India" }
```

### কেন `user` object stack-এ directly নেই?

কারণ object হলো non-primitive value। Non-primitive value-এর actual data heap memory-তে থাকে। Stack-এ শুধু reference থাকে।

```js
var user = {
    name: "tapas",
    country: "India"
};
```

Conceptually:

```text
user → ZB01
ZB01 → actual object in heap
```

### মনে রাখার নিয়ম

> Primitive value stack-এ direct থাকতে পারে।  
> Object/Array/Function heap-এ থাকে, stack-এ থাকে শুধু reference।

---

## Primitive vs Non-Primitive Memory Behavior

| Type | Example | Memory behavior |
|---|---|---|
| Primitive | `5`, `"Tom"`, `true`, `undefined` | value direct stack-এ থাকতে পারে |
| Non-Primitive | object, array, function | actual data heap-এ থাকে, stack-এ reference থাকে |

### Primitive Example

```js
var b = 10;
```

Conceptual memory:

```text
b → 10
```

### Non-Primitive Object Example

```js
var user = {
    name: "tapas",
    country: "India"
};
```

Conceptual memory:

```text
user → ZB01 reference
ZB01 → { name: "tapas", country: "India" }
```

### Non-Primitive Function Example

```js
function testAgain() {
    console.log("Inside testAgain Execution Context");
}
```

Conceptual memory:

```text
testAgain → YB01 reference
YB01 → function body
```

### Common Mistake

অনেকে ভাবে object variable-এর ভিতরেই object থাকে। আসলে variable-এ object-এর reference থাকে। তাই object copy, mutation, comparison—এসব বোঝার জন্য reference concept খুব important।

Example:

```js
const user1 = { name: "Tom" };
const user2 = { name: "Tom" };

console.log(user1 === user2); // false
```

দুই object দেখতে same হলেও memory reference আলাদা।

কিন্তু:

```js
const user1 = { name: "Tom" };
const user2 = user1;

console.log(user1 === user2); // true
```

কারণ দুই variable একই heap object reference করছে।

---

## Garbage Collection

### Garbage Collection কী?

Garbage Collection হলো JavaScript engine-এর memory cleanup mechanism। কোনো memory location-এ data আছে, কিন্তু সেটাকে আর কেউ reference করছে না—তাহলে সেই memory future use-এর জন্য free করা যেতে পারে।

### Complex Example-এ Garbage Collection কোথায় আসে?

`testMe()` FEC চলার সময় heap-এ ছিল:

```text
YB01 → function testAgain body
ZB01 → user object
```

Stack-এ reference ছিল:

```text
testAgain → YB01
user      → ZB01
```

যখন `testMe()` execution শেষ হয়, `testMe()` FEC stack থেকে pop হয়। তখন `user` এবং `testAgain` local reference আর থাকে না। যদি অন্য কোথাও তাদের reference না থাকে, heap-এর সেই data unreachable হয়ে যায়। তখন Garbage Collector সেটি cleanup করতে পারে।

### সহজ Explanation

যদি কোনো ঘরে জিনিস রাখা থাকে কিন্তু সেই ঘরে যাওয়ার কোনো দরজা/চাবি/ঠিকানা না থাকে, তাহলে practically সেই জিনিস আর ব্যবহারযোগ্য নয়। JavaScript engine এমন unreachable memory খুঁজে cleanup করতে পারে।

### মনে রাখার নিয়ম

> Reference না থাকলে object/function unreachable হয়। Unreachable memory Garbage Collection-এর candidate।

### Important Note

Garbage Collection exactly কখন হবে, সেটা developer manually control করে না। JavaScript engine নিজে decide করে। এই lesson-এ high-level idea দেওয়া হয়েছে, advanced module-এ detail আলোচনা হবে।

---

## Screenshot-based Visual Revision Diagrams

এই অংশটি তোমার দেওয়া screenshots-এর visual flow-কে text/diagram আকারে সাজিয়ে দিয়েছে, যাতে `.md` file standalone থাকে। অর্থাৎ image না থাকলেও diagram পড়ে একই concept revise করা যাবে।

---

### Visual 1: Execution Context → GEC → CP + EP

Screenshot-এর প্রথম diagram-এ দেখানো হয়েছে যে JavaScript code run শুরু হলে প্রথমে **Global Execution Context (GEC)** তৈরি হয়। GEC আবার দুই phase-এ ভাগ হয়:

```text
Execution Context
        |
        v
Global Execution Context (GEC)
        |
        +-------------------------+
        |                         |
        v                         v
 Creation Phase             Execution Phase
```

#### Example code

```js
var name = 'Tom';

function sayName() {
  console.log(this.name);
}
```

#### GEC Creation Phase-এ কী হয়?

```text
1. window object তৈরি হয়
2. this keyword তৈরি হয়
3. browser global context-এ window === this হয়
4. variable name-এর জন্য memory allocate হয়
5. name initially undefined হয়
6. sayName() function body memory-তে রাখা হয়
```

#### GEC Execution Phase-এ কী হয়?

```text
1. name variable-এ actual value 'Tom' assign হয়
2. function declaration line-এ নতুন কিছু execute হয় না, কারণ function body creation phase-এই memory-তে ছিল
3. এই code-এ sayName() call করা হয়নি, তাই sayName-এর FEC তৈরি হবে না
```

#### মনে রাখার নিয়ম

> Function declaration memory-তে যায়, কিন্তু function body run হয় শুধু function call হলে।

#### Common mistake

```js
function sayName() {
  console.log(this.name);
}
```

এটা লিখলেই output আসবে না। Output পেতে হলে call করতে হবে:

```js
sayName();
```

---

### Visual 2: Function Execution Context (FEC) for `tom()`

দ্বিতীয় screenshot-এ `tom()` function call করার পর GEC-এর ভিতরে কীভাবে FEC তৈরি হয় সেটা nested box দিয়ে দেখানো হয়েছে।

#### Example code

```js
var name = 'Tom';

function tom() {
   console.log(this.name + ' Runs');
}

// Invoke the function tom()
tom();
```

#### Flow diagram

```text
GEC
├── Creation Phase
│   ├── name: undefined
│   └── tom(): function body allocated in memory
│
└── Execution Phase
    ├── name: 'Tom'
    └── tom(): execute
        |
        v
        FEC for tom()
        ├── Creation Phase
        │   └── no local variable / no inner function
        │
        └── Execution Phase
            └── console.log(this.name + ' Runs') execute
                |
                v
                FEC for console.log()
                ├── Creation Phase
                └── Execution Phase
```

#### Beginner-friendly explanation

`tom()` call না হওয়া পর্যন্ত `tom` function body memory-তে থাকলেও execute হবে না। যখন `tom()` line পাওয়া যায়, JavaScript বলে: “এখন আমাকে `tom` function চালাতে হবে।” তাই `tom()`-এর জন্য নতুন **Function Execution Context** তৈরি হয়।

`tom()`-এর ভিতরে আবার `console.log()` আছে। `console.log` নিজেও function, তাই technically তার জন্যও function execution context তৈরি হতে পারে। Lesson-এ simple explanation-এর জন্য অনেক সময় `console.log`-এর internal FEC ignore করা হয়েছে।

#### Expected output

Browser global non-strict script-এ:

```text
Tom Runs
```

কারণ global `var name = 'Tom'` browser-এ `window.name`-এর সাথে যুক্ত হতে পারে, আর সাধারণ function call-এ non-strict mode-এ `this` global object অর্থাৎ `window` refer করতে পারে।

#### Common mistake

`this.name` সব environment-এ same result দেবে—এটা ভাবা ভুল। Browser global script, strict mode, module, Node.js—সব জায়গায় `this` behavior same নাও হতে পারে। এই lesson-এর explanation browser global script context ধরে করা হয়েছে।

---

### Visual 3: Complex Example-এর GEC/FEC CP/EP Map

তৃতীয় screenshot-এ বড় code block-এর পাশে GEC, `testMe()` FEC এবং `testAgain()` FEC-এর CP/EP flow দেখানো হয়েছে।

#### Full code

```js
console.log("Inside Global Execution Context");
var a = 5;

function testMe() {
    console.log("Inside testMe Execution context");
    var b = 10;
    var user = {
        name: "tapas",
        country: "India"
    };

    function testAgain() {
        console.log("Inside testAgain Execution Context");
        console.log("Exiting testAgain Execution Context");
    }

    testAgain();
    console.log("Exiting testMe execution context");
}

testMe();
console.log("Exiting global execution context");
```

#### GEC → FEC hierarchy

```text
GEC
├── CP
│   ├── a: undefined
│   └── testMe: function body in memory
│
└── EP
    ├── console.log("Inside Global Execution Context")
    ├── a: 5
    └── testMe: execute
        |
        v
        FEC for testMe()
        ├── CP
        │   ├── b: undefined
        │   ├── user: undefined
        │   └── testAgain: function body in memory
        │
        └── EP
            ├── console.log("Inside testMe Execution context")
            ├── b: 10
            ├── user: { name: 'tapas', country: 'India' }
            └── testAgain: execute
                |
                v
                FEC for testAgain()
                ├── CP
                │   └── no local variable / no inner function
                │
                └── EP
                    ├── console.log("Inside testAgain Execution Context")
                    └── console.log("Exiting testAgain Execution Context")
```

#### Pause/Resume rule

```text
GEC execution starts
  ↓
testMe() পাওয়া যায় → GEC pause
  ↓
testMe execution starts
  ↓
testAgain() পাওয়া যায় → testMe pause
  ↓
testAgain execution completes → return to testMe
  ↓
testMe execution completes → return to GEC
  ↓
GEC execution completes
```

#### Output order

```text
Inside Global Execution Context
Inside testMe Execution context
Inside testAgain Execution Context
Exiting testAgain Execution Context
Exiting testMe execution context
Exiting global execution context
```

#### মনে রাখার নিয়ম

> কোনো function call হলে caller context-এর next line execute হওয়ার আগে called function পুরো finish হবে।

---

### Visual 4: Stack + Heap Memory Diagram

চতুর্থ screenshot-এ একই complex example দিয়ে stack ও heap memory দেখানো হয়েছে। এখানে মূল idea হলো: primitive value stack-এ directly থাকতে পারে, কিন্তু object/function-এর actual body heap-এ থাকে এবং stack-এ থাকে reference/address।

#### Conceptual memory addresses

| Identifier | Stack-এ কী থাকে | Heap-এ কী থাকে |
|---|---|---|
| `a` | `5` | কিছু না, কারণ primitive |
| `testMe` | `XA01` reference | `XA01 → function testMe body` |
| `b` | `10` | কিছু না, কারণ primitive |
| `user` | `ZB01` reference | `ZB01 → { name: 'tapas', country: 'India' }` |
| `testAgain` | `YB01` reference | `YB01 → function testAgain body` |

#### Stack + Heap diagram

```text
STACK                                  HEAP

┌──────────────────────────┐           ┌──────────────────────────────┐
│ testAgain FEC            │           │ XA01                         │
│                          │           │ function testMe() { ... }    │
├──────────────────────────┤           ├──────────────────────────────┤
│ testMe FEC               │           │ YB01                         │
│ b: 10                    │           │ function testAgain() { ... } │
│ user: ZB01 ──────────────┼──────────>├──────────────────────────────┤
│ testAgain: YB01 ─────────┼──────────>│ ZB01                         │
├──────────────────────────┤           │ { name: 'tapas',             │
│ GEC                      │           │   country: 'India' }         │
│ a: 5                     │           └──────────────────────────────┘
│ testMe: XA01 ────────────┼──────────>
└──────────────────────────┘
```

#### Function execution শেষ হলে কী হয়?

```text
1. testAgain() finish → testAgain FEC stack থেকে pop
2. testMe() resume → শেষ console.log execute
3. testMe() finish → testMe FEC stack থেকে pop
4. GEC resume → final console.log execute
5. GEC finish → stack empty
```

#### Garbage Collection connection

যখন কোনো function execution শেষ হয়, তার local variables stack থেকে clear হয়ে যায়। যদি কোনো heap object/function আর কোনো reachable reference দ্বারা point না হয়, তাহলে সেটি garbage collection-এর candidate হতে পারে।

Example:

```text
testMe FEC pop হওয়ার পর:
- b আর নেই
- user reference আর নেই
- testAgain reference আর নেই

যদি heap-এর ZB01 object-কে আর কেউ reference না করে,
Garbage Collector পরে সেটি clean করতে পারে।
```

---

### Visual Flow একসাথে মনে রাখার Shortcut

```text
Code load
  ↓
GEC create
  ↓
GEC CP: global var → undefined, function → memory
  ↓
GEC EP: line by line execution
  ↓
Function call found
  ↓
New FEC create and push to call stack
  ↓
FEC CP: local var → undefined, inner function → memory
  ↓
FEC EP: function body line by line execute
  ↓
Inner function call found? repeat same process
  ↓
Function finish → FEC pop
  ↓
Caller context resume
  ↓
All execution complete → stack empty
```

### Screenshot-based Common Mistakes

| Mistake | Correct understanding |
|---|---|
| `function` define করলেই function execute হবে | Function execute হয় শুধু call করলে, যেমন `tom()` |
| Creation Phase-এ actual value assign হয় | Creation Phase-এ `var` সাধারণত `undefined`, function body memory-তে যায় |
| Object variable-এ actual object থাকে | Object heap-এ থাকে, variable-এ reference থাকে |
| Function call শেষ হওয়ার আগেই caller-এর next line চলে | Function finish না হওয়া পর্যন্ত caller context pause থাকে |
| Stack FIFO ভাবে কাজ করে | Call Stack LIFO ভাবে কাজ করে |
| Garbage Collector সব memory সাথে সাথে clean করে | Cleanup engine-এর timing অনুযায়ী হয়; conceptually unreachable memory collectable |

---

## Important Differences

### Lexical Environment vs Execution Context

| Topic | Lexical Environment | Execution Context |
|---|---|---|
| Meaning | code কোথায় physically written/placed | code currently কীভাবে run হচ্ছে |
| Focus | placement and structure | runtime execution and surrounding data |
| Example | `name` variable function-এর ভিতরে লেখা | function call হলে সেই function-এর FEC তৈরি |
| Related to | scope, code structure | hoisting, call stack, `this`, runtime behavior |

### GEC vs FEC

| Topic | GEC | FEC |
|---|---|---|
| Full form | Global Execution Context | Function Execution Context |
| কখন তৈরি হয় | JS file load/run হলে | function call/invoke হলে |
| কতবার তৈরি হয় | সাধারণত program run-এর শুরুতে একবার | function যতবার call হয় ততবার |
| কী থাকে | global variables, global functions, `window`, `this` | local variables, parameters, inner functions |
| Stack position | প্রথমে push হয়, শেষে pop হয় | call হলে GEC/FEC-এর ওপর push হয় |

### Creation Phase vs Execution Phase

| Topic | Creation Phase | Execution Phase |
|---|---|---|
| কাজ | memory setup | line-by-line execution |
| variable | `undefined` initialize | actual value assign |
| function declaration | body memory-তে store | call না হলে execute হয় না |
| function call | execute হয় না | FEC তৈরি করে execute হয় |

### Stack vs Heap

| Topic | Stack | Heap |
|---|---|---|
| Structure | organized, LIFO | less structured/discrete memory |
| Stores | execution contexts, primitive values, references | objects, arrays, functions actual data/body |
| Access | fast | reference দিয়ে access |
| Cleanup | function return হলে context pop | unreachable হলে garbage collection হতে পারে |

---

## Common Mistakes

### Mistake 1: Function declare করলেই execute হবে ভাবা

Wrong assumption:

```js
function sayName() {
  console.log("Tom");
}
```

এটা কোনো output দিবে না। কারণ call করা হয়নি।

Correct:

```js
sayName();
```

---

### Mistake 2: Creation Phase-কে actual execution ভাবা

Creation Phase-এ JavaScript line by line output দেয় না। এটি memory setup phase। Output আসে Execution Phase-এ।

---

### Mistake 3: `var` variable declaration-এর সময় actual value already available ভাবা

```js
console.log(name);
var name = "Tom";
```

Conceptually:

```text
Creation Phase: name → undefined
Execution Phase line 1: console.log(name) → undefined
Execution Phase line 2: name = "Tom"
```

---

### Mistake 4: Object variable-এর ভিতরে object থাকে ভাবা

```js
var user = { name: "tapas" };
```

`user` variable-এ actual object থাকে না; object heap-এ থাকে, `user`-এ reference থাকে।

---

### Mistake 5: সব context-এ `this` একই ভাবে কাজ করে ভাবা

এই lesson browser global non-module context ধরে `this === window` দেখায়। কিন্তু strict mode, module, object method, arrow function—সব জায়গায় `this` behavior same নয়।

---

### Mistake 6: Call Stack-এর pause/resume behavior না বোঝা

```js
testAgain();
console.log("After testAgain");
```

`testAgain()` complete না হওয়া পর্যন্ত `After testAgain` execute হবে না।

---

### Mistake 7: Typo in keyword

Wrong:

```js
fucntion sayName() {
  console.log("Hello");
}
```

Correct:

```js
function sayName() {
  console.log("Hello");
}
```

---

## Assignment

ভিডিওর শেষে task দেওয়া হয়েছে। Task-এর goal হলো নিজে হাতে GEC/FEC, CP/EP, Stack/Heap flow এবং stack diagram তৈরি করা।

### Task 1: GEC/FEC with CP and EP Flow তৈরি করো

একটি JavaScript program নাও যেখানে:

- global variables আছে
- functions আছে
- function-এর ভিতরে variable আছে
- এক function আরেক function call করছে
- কোথাও return থাকতে পারে

তারপর table/diagram বানাও:

```text
GEC
 ├─ Creation Phase
 │   ├─ variable → undefined
 │   └─ function → function body
 └─ Execution Phase
     ├─ values assign
     └─ function call → FEC

FEC: functionName
 ├─ Creation Phase
 │   ├─ local variable → undefined
 │   └─ inner function → function body
 └─ Execution Phase
     ├─ values assign
     └─ inner function call → new FEC
```

### Task 2: Stack and Heap Flow তৈরি করো

প্রতিটি important stage-এ stack ও heap-এ কী আছে দেখাও।

Example format:

```text
Stage: GEC Creation Phase

Stack:
a      → undefined
testMe → XA01

Heap:
XA01 → function testMe body
```

```text
Stage: testMe Execution Phase

Stack:
a         → 5
testMe    → XA01
b         → 10
user      → ZB01
testAgain → YB01

Heap:
XA01 → function testMe body
YB01 → function testAgain body
ZB01 → { name: "tapas", country: "India" }
```

### Task 3: Stack Diagram তৈরি করো

প্রতিটি push/pop stage দেখাও:

```text
1. [ empty ]
2. [ GEC ]
3. [ GEC, testMe FEC ]
4. [ GEC, testMe FEC, testAgain FEC ]
5. [ GEC, testMe FEC ]
6. [ GEC ]
7. [ empty ]
```

### Task 4: Screenshots নিয়ে README বানাও

ভিডিওতে বলা হয়েছে:

1. Code বাম পাশে রাখো।
2. Flow diagram ডান পাশে রাখো।
3. Stack/Heap stage-wise diagram বানাও।
4. Stack push/pop diagram বানাও।
5. Screenshots নাও।
6. README file বানিয়ে প্রতিটি screenshot-এর explanation লিখো।
7. Publicly share করো, যেমন Discord/community task submission হিসেবে।

### Assignment করার সময় মনে রাখবে

- Function declaration আর function call আলাদা করে চিহ্নিত করবে।
- CP-তে actual value assign করো না; শুধু `undefined` বা function body/reference দেখাও।
- EP-তে actual assignment দেখাও।
- Function call পেলে নতুন FEC তৈরি করো।
- Function শেষ হলে call stack থেকে pop করো।
- Object/function heap-এ রাখো, stack-এ reference দেখাও।

---

## Final Summary

এই lesson-এ JavaScript execution-এর fundamental model শেখানো হয়েছে। JavaScript file load হলেই প্রথমে Global Execution Context তৈরি হয়। Browser global script context-এ GEC-এর মধ্যে `window` object এবং `this` তৈরি হয়, যেখানে `this` সাধারণত `window` refer করে।

Execution Context দুই phase-এ বোঝানো হয়েছে: Creation Phase এবং Execution Phase। Creation Phase-এ memory allocation হয়, `var` variables `undefined` হয়, function declaration-এর body memory-তে store হয়। Execution Phase-এ actual code line by line চলে, values assign হয়, আর function call পেলে নতুন Function Execution Context তৈরি হয়।

Call Stack এই execution contexts manage করে LIFO rule অনুসারে। Function call হলে FEC stack-এর top-এ push হয়। Function execution শেষ হলে FEC pop হয় এবং caller context resume করে।

Memory management-এ primitive values stack-এ থাকতে পারে, কিন্তু object, array, function-এর মতো non-primitive values heap memory-তে থাকে। Stack-এ তাদের reference থাকে। কোনো heap memory আর কোনো reference দ্বারা reachable না থাকলে Garbage Collector সেটি cleanup করতে পারে।

এই foundation পরের topics—hoisting, scope, closure, `this`, event loop, async JavaScript, promises—বোঝার জন্য অত্যন্ত গুরুত্বপূর্ণ।

---

## Practice Checklist

নিচের checklist দিয়ে নিজেকে test করো:

- [ ] আমি বলতে পারি Execution Context কী।
- [ ] আমি Lexical Environment এবং Execution Context-এর difference বুঝি।
- [ ] আমি জানি JavaScript file load হলে GEC তৈরি হয়।
- [ ] আমি জানি browser global context-এ `window` object পাওয়া যায়।
- [ ] আমি জানি এই lesson-এর context-এ `this === window` কেন true।
- [ ] আমি Creation Phase ও Execution Phase আলাদা করতে পারি।
- [ ] আমি বুঝি `var` variable Creation Phase-এ `undefined` হয়।
- [ ] আমি বুঝি function declaration-এর body Creation Phase-এ memory-তে যায়।
- [ ] আমি বুঝি function define করা আর function call করা এক জিনিস নয়।
- [ ] আমি জানি function call হলে FEC তৈরি হয়।
- [ ] আমি nested function call-এর stack push/pop flow আঁকতে পারি।
- [ ] আমি `testMe()` এবং `testAgain()` example-এর output order explain করতে পারি।
- [ ] আমি primitive ও non-primitive memory behavior explain করতে পারি।
- [ ] আমি stack ও heap-এর difference explain করতে পারি।
- [ ] আমি object/function-এর reference concept বুঝি।
- [ ] আমি garbage collection-এর high-level idea বুঝি।
- [ ] আমি নিজে হাতে GEC/FEC CP/EP diagram তৈরি করতে পারি।
- [ ] আমি নিজে হাতে stack diagram তৈরি করতে পারি।
- [ ] আমি README-style assignment explanation লিখতে পারি।

---

## Quick Revision Mnemonics

```text
GEC = file run হলে first context
FEC = function call হলে new context
CP  = memory preparation
EP  = actual execution
Stack = call order manager
Heap  = non-primitive storage
GC = unreachable memory cleaner
```

**সবচেয়ে important rule:**

> JavaScript প্রথমে প্রস্তুতি নেয়, তারপর line by line execute করে। Function call পেলে ভিতরে ঢুকে যায়, শেষ হলে আবার আগের জায়গায় ফিরে আসে।
