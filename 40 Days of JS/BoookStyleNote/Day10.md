# Day 10 — JavaScript Scope এবং Scope Chain  
## বাংলা Detailed Study Notes

> Lesson context: এটি “40 Days of JavaScript” journey-এর Day 10 lesson। এই lesson-এ মূল focus হলো **Scope**, **Scope Chain**, `var` / `let` / `const`-এর scope behavior, **Variable Shadowing**, এবং loop-এর ভিতরে `var` বনাম `let` ব্যবহার।  
> আগের lesson-এ Hoisting এবং Temporal Dead Zone (TDZ) আলোচনা করা হয়েছিল। এই lesson সেই understanding-এর উপর ভিত্তি করে তৈরি।
```js
console.log("Day 10");
```

---

## Table of Contents

1. [Lesson Overview](#lesson-overview)
2. [Scope কী?](#scope-কী)
3. [JavaScript-এ Scope-এর ৪ ধরন](#javascript-এ-scope-এর-৪-ধরন)
4. [Global Scope](#global-scope)
5. [`var` বনাম `let` / `const` in Global Scope](#var-বনাম-let--const-in-global-scope)
6. [Function Scope](#function-scope)
7. [Block Scope](#block-scope)
8. [`var`, `let`, `const` এবং Scope Rules](#var-let-const-এবং-scope-rules)
9. [Scope Hierarchy](#scope-hierarchy)
10. [Scope Chain](#scope-chain)
11. [Scope Chain Test Example: `count`](#scope-chain-test-example-count)
12. [Variable Shadowing](#variable-shadowing)
13. [Loop-এর ভিতরে `var` বনাম `let`](#loop-এর-ভিতরে-var-বনাম-let)
14. [Comparison Table: `var`, `let`, `const`](#comparison-table-var-let-const)
15. [Code Run করার সময় গুরুত্বপূর্ণ Warning](#code-run-করার-সময়-গুরুত্বপূর্ণ-warning)
16. [Common Mistakes](#common-mistakes)
17. [Assignment / Task](#assignment--task)
18. [Final Summary](#final-summary)
19. [Practice Checklist](#practice-checklist)

---

# Lesson Overview

এই video lesson-এ instructor প্রথমে বলছেন যে Day 10 মানে “40 Days of JavaScript” journey-এর 25% cross করা হয়ে গেছে। আগের video-তে **Hoisting** এবং **Temporal Dead Zone (TDZ)** আলোচনা করা হয়েছিল। Day 10-এ focus করা হয়েছে:

- Scope
- Scope Chain
- Global Scope
- Function Scope
- Block Scope
- `var`, `let`, `const`-এর behavior
- Variable Shadowing
- Loop-এর ভিতরে `var` বনাম `let`
- শেষে task / assignment

এই lesson-এ **Module Scope** শুধু mention করা হয়েছে, কিন্তু details শেখানো হয়নি। কারণ module নিয়ে আলাদা future session থাকবে।

---

# Scope কী?

## সহজ ভাষায় Scope

**Scope** মানে হলো JavaScript-এ কোনো variable কোথা থেকে access করা যাবে এবং কোথা থেকে access করা যাবে না।

আরও সহজভাবে:

> কোনো variable-এর “accessible area” বা ব্যবহার করার জায়গাকে Scope বলা যায়।

যদি কোনো variable কোনো জায়গা থেকে দেখা যায় বা ব্যবহার করা যায়, তাহলে বলা যায় variable-টি সেই scope-এর ভিতরে accessible।

---

## House analogy

Instructor একটি house analogy ব্যবহার করেছেন।

ভাবো তুমি এমন একটি house-এ আছ যেখানে অনেকগুলো room আছে।

কিছু জিনিস পুরো house-এর সব room থেকে access করা যায়, যেমন:

- Wi-Fi

তুমি house-এর যেকোনো room-এ থাকো, Wi-Fi ব্যবহার করতে পারবে।

আবার কিছু জিনিস শুধু নির্দিষ্ট room-এর জন্য হতে পারে, যেমন:

- water jug
- small plant
- private diary
- pen

এই জিনিসগুলো সব room থেকে access করা যাবে না। এগুলো নির্দিষ্ট room-এর ভিতরে available।

JavaScript variable-ও একইভাবে behave করে। কোনো variable কোথায় declared হয়েছে, তার উপর নির্ভর করে variable-টি কোথা থেকে access করা যাবে।

---

## Scope-এর মূল definition

```text
Scope means where a variable is accessible in JavaScript.
```

বাংলায়:

> JavaScript-এ কোনো variable কোথায় accessible হবে, সেটাই তার scope।

---

## মনে রাখার নিয়ম

একটি variable দেখে সবসময় নিজেকে ৩টি প্রশ্ন করো:

1. Variable-টি কোথায় declared হয়েছে?
2. Variable-টি কোন keyword দিয়ে declared হয়েছে: `var`, `let`, না `const`?
3. Variable-টি কোথা থেকে access করার চেষ্টা করা হচ্ছে?

এই ৩টি প্রশ্নের উত্তর জানলে scope বুঝতে সহজ হবে।

---

# JavaScript-এ Scope-এর ৪ ধরন

Transcript অনুযায়ী JavaScript-এ scope-এর ৪টি type আছে:

| Scope Type | Meaning | এই lesson-এ covered? |
|---|---|---|
| Global Scope | Function বা block-এর বাইরে declared variable | Yes |
| Function Scope | Function-এর ভিতরে declared variable | Yes |
| Block Scope | `{}` block-এর ভিতরে declared variable | Yes |
| Module Scope | JavaScript module-এর scope | No, future module lesson-এ হবে |

এই lesson-এ প্রথম ৩টি scope নিয়ে বিস্তারিত আলোচনা করা হয়েছে:

1. Global Scope
2. Function Scope
3. Block Scope

Module Scope পরে JavaScript modules শেখার সময় explain করা হবে।

---

# Global Scope

## Global Scope কী?

যে variable কোনো function বা block-এর ভিতরে declared নয়, সেটি **Global Scope**-এ থাকে।

অর্থাৎ:

```js
let name = "Tapas";
```

এখানে `name` variable কোনো function বা `{}` block-এর ভিতরে নেই। তাই এটি global variable।

---

## Global variable কোথা থেকে access করা যায়?

Global variable সাধারণত accessible হয়:

- global area থেকে
- function-এর ভিতর থেকে
- block-এর ভিতর থেকে

---

## Example: Global Scope

```js
let name = "Tapas";

function greeting() {
    console.log("Hello ", name);
}

greeting();

console.log(name); // "Tapas"

{
    console.log("Inside Block", name);
}
```

## Output

```text
Hello Tapas
Tapas
Inside Block Tapas
```

## Step-by-step explanation

### 1. Variable declaration

```js
let name = "Tapas";
```

`name` global scope-এ declared হয়েছে।

### 2. Function-এর ভিতরে access

```js
function greeting() {
    console.log("Hello ", name);
}
```

`greeting()` function-এর ভিতরে `name` declared হয়নি। কিন্তু JavaScript outer scope-এ খুঁজে global variable `name` পায়।

তাই output:

```text
Hello Tapas
```

### 3. Global area থেকে access

```js
console.log(name);
```

এটি global area থেকেই `name` access করছে। তাই output:

```text
Tapas
```

### 4. Block-এর ভিতরে access

```js
{
    console.log("Inside Block", name);
}
```

Block-এর ভিতরেও `name` accessible, কারণ global variable nested block থেকে access করা যায়।

---

## Important concept

Global variable অনেক জায়গা থেকে access করা যায়। তাই global variable বেশি ব্যবহার করলে naming conflict বা accidental change হওয়ার risk থাকে।

---

## Common mistake

### Mistake

ভাবা যে global variable সবসময় safe।

### Correct understanding

Global variable accessible everywhere হওয়ায় project বড় হলে সমস্যা তৈরি করতে পারে। তাই যেখানে variable দরকার, যতটা সম্ভব সেই scope-এর ভিতরেই variable declare করা ভালো।

---

## মনে রাখার নিয়ম

> Global scope হলো house-এর Wi-Fi-এর মতো — সব room থেকে access করা যায়।

---

# `var` বনাম `let` / `const` in Global Scope

Global scope-এ `var` এবং `let` / `const`-এর মধ্যে একটি important difference আছে।

Browser environment-এ global object হলো:

```js
window
```

---

## Global `var` window object-এর property হয়

যদি global scope-এ `var` দিয়ে variable declare করা হয়, তাহলে browser-এ সেটি `window` object-এর property হয়ে যায়।

```js
var name = "Tapas";

console.log(name);        // Tapas
console.log(window.name); // Tapas
```

এখানে `name` global scope-এ `var` দিয়ে declared হয়েছে। তাই `window.name` থেকেও value পাওয়া যাচ্ছে।

---

## Global `let` window object-এর property হয় না

যদি global scope-এ `let` দিয়ে variable declare করা হয়, সেটি global scope-এ থাকে, কিন্তু `window` object-এর property হয় না।

```js
let name = "Tapas";

console.log(name);        // Tapas
console.log(window.name); // Tapas নাও হতে পারে; এই let variable থেকে আসবে না
```

Important: Browser-এ `window.name` নামে আগে থেকেই একটি property থাকতে পারে। তাই real browser console-এ এটি empty string বা অন্য value দেখাতে পারে। কিন্তু lesson-এর মূল point হলো:

> Global `let` / `const` variable `window` object-এর property হিসেবে attach হয় না।

---

## Difference table

| Declaration | Global variable accessible directly? | `window` object-এ attach হয়? |
|---|---:|---:|
| `var name = "Tapas"` | Yes | Yes |
| `let name = "Tapas"` | Yes | No |
| `const name = "Tapas"` | Yes | No |

---

## Example

```js
var user = "Tapas";

console.log(user);        // Tapas
console.log(window.user); // Tapas
```

```js
let user = "Tapas";

console.log(user);        // Tapas
console.log(window.user); // undefined
```

---

## Common mistake

### Mistake

ভাবা:

```text
Global scope মানেই window object-এর property
```

### Correct

শুধু `var` দিয়ে global scope-এ declared variable browser-এর `window` object-এ property হিসেবে attach হয়। `let` এবং `const` attach হয় না।

---

## মনে রাখার নিয়ম

> Global `var` window-তে যায়, কিন্তু global `let` / `const` window-তে যায় না।

---

# Function Scope

## Function Scope কী?

যে variable function-এর ভিতরে declared হয়, সেটি শুধু সেই function-এর ভিতরেই accessible।

Function-এর বাইরে থেকে সেই variable access করলে `ReferenceError` হবে।

---

## Example: Function Scope

```js
function toDo() {
    let task = "Learning 40 days of JS";
    console.log(task);
}

toDo();

console.log(task);
```

## Output

```text
Learning 40 days of JS
ReferenceError: task is not defined
```

---

## Step-by-step explanation

### 1. Function-এর ভিতরে variable declare

```js
function toDo() {
    let task = "Learning 40 days of JS";
    console.log(task);
}
```

`task` variable `toDo()` function-এর ভিতরে declared হয়েছে।

### 2. Function-এর ভিতরে access valid

```js
console.log(task);
```

এই `console.log(task)` function-এর ভিতরেই আছে। তাই এটি valid।

### 3. Function-এর বাইরে access invalid

```js
console.log(task);
```

এই line function-এর বাইরে। এখানে `task` accessible নয়।

তাই JavaScript বলে:

```text
ReferenceError: task is not defined
```

---

## `var` হলেও কি function-এর বাইরে access করা যাবে?

না।

এটি beginner-দের common confusion।

```js
function toDo() {
    var task = "Learning 40 days of JS";
    console.log(task);
}

toDo();

console.log(task); // ReferenceError
```

এখানে `task` `var` দিয়ে declared হলেও function-এর বাইরে accessible নয়।

---

## Important concept

Function scope-এর ক্ষেত্রে `var`, `let`, `const` — তিনটির behavior প্রায় একই:

| Function-এর ভিতরে declared | Function-এর ভিতরে accessible? | Function-এর বাইরে accessible? |
|---|---:|---:|
| `var task` | Yes | No |
| `let task` | Yes | No |
| `const task` | Yes | No |

---

## Common mistake

### Mistake

ভাবা:

```text
var দিয়ে declared variable সব জায়গা থেকে access করা যায়
```

### Correct

`var` global scope-এ থাকলে widely accessible হয়। কিন্তু `var` যদি function-এর ভিতরে declared হয়, তাহলে সেটি function scope-এর ভিতরেই limited।

---

## মনে রাখার নিয়ম

> Function-এর ভিতরে declare করলে variable function-এর ভিতরেই থাকবে — `var`, `let`, `const` যেটাই ব্যবহার করো।

---

# Block Scope

## Block কী?

JavaScript-এ `{}` curly braces দিয়ে তৈরি area-কে block বলা হয়।

Example:

```js
{
    // this is a block
}
```

Block ব্যবহার হয়:

- `if`
- `else`
- `switch`
- `for`
- `while`
- standalone `{}` block

---

## Block Scope কী?

যদি `let` বা `const` দিয়ে কোনো variable block-এর ভিতরে declare করা হয়, তাহলে সেটি block-এর বাইরে accessible হয় না।

---

## Example: Block Scope with `let`

```js
{
    let count = 10;
    console.log(count);
}

console.log(count);
```

## Output

```text
10
ReferenceError: count is not defined
```

---

## Explanation

```js
{
    let count = 10;
    console.log(count);
}
```

`count` block-এর ভিতরে declared হয়েছে এবং block-এর ভিতরেই access করা হয়েছে। তাই valid।

কিন্তু:

```js
console.log(count);
```

এটি block-এর বাইরে। `let` block-scoped হওয়ায় এখানে `count` accessible নয়।

---

## Example: Block Scope with `const`

```js
{
    const count = 10;
    console.log(count);
}

console.log(count);
```

## Output

```text
10
ReferenceError: count is not defined
```

`const`-এর ক্ষেত্রেও same rule: `const` block-scoped।

---

## Block শুধু `if` / `for`-এর সাথেই হতে হবে?

না। JavaScript-এ standalone block-ও execute হয়।

```js
{
    console.log("This block will run");
}
```

Output:

```text
This block will run
```

---

## Common mistake

### Mistake

ভাবা যে `{}` block শুধু `if`, `for`, `while`-এর সাথে কাজ করে।

### Correct

Standalone `{}` block-ও JavaScript-এ valid এবং তার ভিতরে `let` / `const` block scope তৈরি করে।

---

## মনে রাখার নিয়ম

> `let` এবং `const` `{}` block-এর boundary respect করে।

---

# `var`, `let`, `const` এবং Scope Rules

Block scope শেখার সময় সবচেয়ে গুরুত্বপূর্ণ twist হলো `var`।

---

## `var` block-scoped নয়

```js
{
    var count = 10;
    console.log(count);
}

console.log(count);
```

## Output

```text
10
10
```

Surprise: `count` block-এর বাইরে থেকেও accessible।

কেন?

কারণ:

> `var` is function-scoped, not block-scoped.

---

## `let` / `const` block-scoped

```js
{
    let count = 10;
}

console.log(count); // ReferenceError
```

```js
{
    const count = 10;
}

console.log(count); // ReferenceError
```

---

## Main rule

```text
var is function-scoped.
let and const are block-scoped.
```

বাংলায়:

- `var` function scope follow করে।
- `let` এবং `const` block scope follow করে।

---

## Important examples

### Example 1: `var` inside function

```js
function test() {
    var count = 10;
    console.log(count);
}

test();

console.log(count); // ReferenceError
```

`var` function-এর ভিতরে থাকলে function-এর বাইরে যায় না।

---

### Example 2: `var` inside block

```js
{
    var count = 10;
}

console.log(count); // 10
```

`var` block-এর ভিতরে থাকলেও block-এর বাইরে accessible হয়, কারণ `var` block-scoped নয়।

---

### Example 3: `let` inside block

```js
{
    let count = 10;
}

console.log(count); // ReferenceError
```

---

### Example 4: `const` inside block

```js
{
    const count = 10;
}

console.log(count); // ReferenceError
```

---

## Comparison: Function vs Block

| Situation | `var` | `let` | `const` |
|---|---|---|---|
| Function-এর ভিতরে declared | Function-এর বাইরে accessible নয় | Function-এর বাইরে accessible নয় | Function-এর বাইরে accessible নয় |
| Block-এর ভিতরে declared | Block-এর বাইরে accessible হতে পারে | Block-এর বাইরে accessible নয় | Block-এর বাইরে accessible নয় |
| Global scope-এ declared | Accessible | Accessible | Accessible |
| Browser `window` object-এ attach | Yes, যদি global `var` হয় | No | No |

---

## Common mistake

### Mistake

```js
{
    var count = 10;
}

console.log(count);
```

এটা দেখে ভাবা:

```text
Block scope কাজ করছে না!
```

### Correct

Block scope কাজ করছে। কিন্তু `var` block scope মানে না। `let` / `const` block scope মানে।

---

## মনে রাখার নিয়ম

> `var` function-এর fence মানে, কিন্তু block-এর fence মানে না।  
> `let` এবং `const` block-এর fence মানে।

---

# Scope Hierarchy

Instructor scope-কে hierarchy perspective থেকে ভাবতে বলেছেন।

সাধারণভাবে:

```text
Global Scope
    ↓
Function Scope
    ↓
Block Scope
```

## Hierarchy idea

- Global scope সবচেয়ে বাইরের scope।
- Function scope global scope-এর ভিতরে থাকতে পারে।
- Block scope function বা global scope-এর ভিতরে থাকতে পারে।
- JavaScript variable resolve করার সময় nearest scope থেকে বাইরের দিকে search করে।

---

## Diagram

```text
Global Scope
│
├── globalVar
│
└── outer() Function Scope
    │
    ├── outerVar
    │
    └── inner() Function Scope
        │
        └── innerVar
```

---

## মনে রাখার নিয়ম

> ভিতর থেকে বাইরে দেখা যায়, কিন্তু বাইরে থেকে ভিতরে দেখা যায় না।

Example:

```js
let globalVar = "global";

function outer() {
    let outerVar = "outer";

    function inner() {
        let innerVar = "inner";
        console.log(globalVar); // allowed
        console.log(outerVar);  // allowed
        console.log(innerVar);  // allowed
    }

    inner();

    console.log(innerVar); // ReferenceError
}

outer();
```

`inner()` function বাইরের `outerVar` এবং `globalVar` access করতে পারে। কিন্তু `outer()` function `innerVar` access করতে পারে না, কারণ `innerVar` inner function-এর ভিতরে scoped।

---

# Scope Chain

## Scope Chain কী?

JavaScript যখন কোনো variable access করতে চায়, তখন সে variable-টি resolve করার জন্য একটি search process follow করে।

এই process-কে বলা হয় **Scope Chain**।

---

## Scope Chain-এর rule

JavaScript variable খোঁজে এইভাবে:

1. প্রথমে nearest/current scope-এ খোঁজে।
2. সেখানে না পেলে outer scope-এ যায়।
3. সেখানে না পেলে তারও outer scope-এ যায়।
4. এভাবে global scope পর্যন্ত যায়।
5. Global scope-এও না পেলে `ReferenceError` দেয়।

---

## Simple definition

```text
Scope Chain is the process JavaScript uses to find a variable from inner scope to outer scope.
```

---

## Example: Scope Chain

```js
let globalVar = "I am a Global Variable";

function outer() {
    let outerVar = "I am an Outer Variable";

    function inner() {
        let innerVar = "I am an Inner Variable";

        console.log(innerVar);
        console.log(outerVar);
        console.log(globalVar);
    }

    inner();
}

outer();
```

## Output

```text
I am an Inner Variable
I am an Outer Variable
I am a Global Variable
```

---

## Step-by-step explanation

### `innerVar`

```js
console.log(innerVar);
```

JavaScript current scope অর্থাৎ `inner()` function-এর ভিতরেই `innerVar` পেয়ে যায়।

তাই output:

```text
I am an Inner Variable
```

---

### `outerVar`

```js
console.log(outerVar);
```

JavaScript প্রথমে `inner()` function-এর ভিতরে `outerVar` খোঁজে।

পায় না।

তারপর outer scope অর্থাৎ `outer()` function-এর scope-এ যায়।

সেখানে পেয়ে যায়:

```js
let outerVar = "I am an Outer Variable";
```

তাই output:

```text
I am an Outer Variable
```

---

### `globalVar`

```js
console.log(globalVar);
```

JavaScript search করে:

1. `inner()` function scope → নেই
2. `outer()` function scope → নেই
3. global scope → আছে

তাই output:

```text
I am a Global Variable
```

---

## Scope Chain diagram

```text
inner() scope
   │
   ├── innerVar পাওয়া যায়
   │
   ↓
outer() scope
   │
   ├── outerVar পাওয়া যায়
   │
   ↓
global scope
   │
   └── globalVar পাওয়া যায়
```

---

## Outside থেকে inside access করা যায় না

```js
let globalVar = "I am a Global Variable";

function outer() {
    let outerVar = "I am an Outer Variable";

    function inner() {
        let innerVar = "I am an Inner Variable";
    }

    inner();
}

outer();

console.log(outerVar); // ReferenceError
```

## কেন error?

`console.log(outerVar)` global scope থেকে execute হচ্ছে।

JavaScript global scope-এ `outerVar` খুঁজবে। কিন্তু `outerVar` declared হয়েছে `outer()` function-এর ভিতরে।

Global scope থেকে function-এর ভিতরের variable access করা যায় না।

তাই:

```text
ReferenceError: outerVar is not defined
```

---

## মনে রাখার নিয়ম

> Scope Chain সবসময় ভিতর থেকে বাইরে যায়।  
> কখনো বাইরে থেকে ভিতরে ঢুকে variable খুঁজে আনে না।

---

# Scope Chain Test Example: `count`

এই example-টি video-তে test-your-knowledge হিসেবে এসেছে। এটি Scope Chain বুঝতে খুব গুরুত্বপূর্ণ।

---

## Version 1: সব scope-এ `count` আছে

```js
var count = 10;

function outer() {
    var count = 20;

    function inner() {
        var count = 30;
        console.log(count);
    }

    inner();
    console.log(count);
}

outer();
console.log(count);
```

## Output

```text
30
20
10
```

---

## Explanation

### `inner()` function-এর ভিতরে

```js
var count = 30;
console.log(count);
```

Nearest scope-এ `count = 30` আছে। তাই output:

```text
30
```

### `outer()` function-এর ভিতরে, `inner()` call-এর পরে

```js
console.log(count);
```

এটি `outer()` function scope থেকে execute হচ্ছে। সেখানে `count = 20` আছে।

তাই output:

```text
20
```

### Global scope

```js
console.log(count);
```

এটি global scope থেকে execute হচ্ছে। global `count = 10`।

তাই output:

```text
10
```

---

## Version 2: inner-এর `count` remove করলে

```js
var count = 10;

function outer() {
    var count = 20;

    function inner() {
        // var count = 30;
        console.log(count);
    }

    inner();
    console.log(count);
}

outer();
console.log(count);
```

## Output

```text
20
20
10
```

---

## কেন?

`inner()` function-এর ভিতরে নিজস্ব `count` নেই। তাই JavaScript scope chain follow করে outer scope-এ যায় এবং `outer()` function-এর `count = 20` পায়।

---

## Version 3: inner এবং outer দুই জায়গার `count` remove করলে

```js
var count = 10;

function outer() {
    // var count = 20;

    function inner() {
        // var count = 30;
        console.log(count);
    }

    inner();
    console.log(count);
}

outer();
console.log(count);
```

## Output

```text
10
10
10
```

---

## কেন?

- `inner()`-এ `count` নেই
- `outer()`-এ `count` নেই
- global scope-এ `count = 10` আছে

তাই সব জায়গায় global `count` resolve হয়।

---

## Version 4: কোথাও `count` না থাকলে

```js
function outer() {
    function inner() {
        console.log(count);
    }

    inner();
}

outer();
```

## Output

```text
ReferenceError: count is not defined
```

JavaScript inner → outer → global পর্যন্ত খুঁজে কোথাও `count` পায়নি।

---

## Important observation

একই নামের `count` variable হলেও এগুলো সবসময় একই variable নয়।

```js
var count = 10; // global count

function outer() {
    var count = 20; // outer function-এর আলাদা count

    function inner() {
        var count = 30; // inner function-এর আলাদা count
    }
}
```

এগুলো তিনটি আলাদা variable, কারণ এগুলো তিনটি আলাদা scope-এ declared হয়েছে।

---

## মনে রাখার নিয়ম

> Same name মানেই same variable নয়।  
> Scope আলাদা হলে variable আলাদা।

---

# Variable Shadowing

## Variable Shadowing কী?

যখন inner scope-এ এমন একটি variable declare করা হয় যার নাম outer scope-এর variable-এর নামের মতোই, তখন inner variable outer variable-কে hide করে।

এটাকে বলা হয় **Variable Shadowing**।

---

## Simple definition

```text
Variable Shadowing occurs when an inner scope variable has the same name as an outer scope variable.
```

বাংলায়:

> Inner scope-এর variable outer scope-এর একই নামের variable-কে temporarily ঢেকে দেয়।

---

## Example

```js
let message = "I am doing great";

function situation() {
    let message = "I am not doing great";
    console.log(message);
}

situation();

console.log(message);
```

## Output

```text
I am not doing great
I am doing great
```

---

## Step-by-step explanation

### Function-এর ভিতরের `console.log`

```js
function situation() {
    let message = "I am not doing great";
    console.log(message);
}
```

এখানে JavaScript nearest scope-এ `message` পায়।

Nearest `message` হলো:

```js
let message = "I am not doing great";
```

তাই output:

```text
I am not doing great
```

Outer scope-এর:

```js
let message = "I am doing great";
```

এই line function-এর ভিতরে shadowed হয়েছে।

---

### Function-এর বাইরের `console.log`

```js
console.log(message);
```

এটি global scope থেকে execute হচ্ছে।

Global scope-এর `message` হলো:

```js
let message = "I am doing great";
```

Function-এর ভিতরের `message` function-এর বাইরে accessible নয়।

তাই output:

```text
I am doing great
```

---

## Common mistake

### Mistake

ভাবা যে function-এর ভিতরে `message` পরিবর্তন করলে global `message`-ও change হয়ে যাবে।

### Correct

এখানে function-এর ভিতরে নতুন `message` variable declare করা হয়েছে। তাই এটি global `message`-কে change করেনি, শুধু function scope-এর ভিতরে shadow করেছে।

---

## Reassignment বনাম Shadowing

### Shadowing

```js
let message = "A";

function test() {
    let message = "B"; // নতুন variable
    console.log(message); // B
}

test();
console.log(message); // A
```

### Reassignment

```js
let message = "A";

function test() {
    message = "B"; // outer variable-কে reassign
    console.log(message); // B
}

test();
console.log(message); // B
```

---

## মনে রাখার নিয়ম

> Inner scope-এ একই নামে নতুন variable declare করলে outer variable shadow হয়।  
> `let message = ...` দিলে নতুন variable তৈরি হতে পারে, কিন্তু `message = ...` দিলে existing variable reassign হতে পারে।

---

# Loop-এর ভিতরে `var` বনাম `let`

Video-তে শেষে instructor দেখিয়েছেন কেন loop-এর ভিতরে `let` ব্যবহার করা recommended।

---

## Loop with `var`

```js
for (var i = 0; i < 5; i++) {
    console.log(i);
}

console.log(i);
```

## Output

```text
0
1
2
3
4
5
```

---

## কেন বাইরে `i` পাওয়া গেল?

`var` block-scoped নয়। `for` loop-এর `{}` একটি block হলেও `var i` সেই block-এর মধ্যে আটকে থাকে না।

Loop শেষ হওয়ার পরও `i` বাইরে accessible থাকে।

Final value হয় `5`, কারণ loop থামে যখন condition false হয়:

```js
i < 5
```

যখন `i = 5`, তখন condition false হয় এবং loop stop করে।

---

## Problem

```js
console.log(i);
```

Loop-এর বাইরে থেকেও `i` access করা যাচ্ছে। এতে variable pollution হতে পারে।

কারণ কেউ বাইরে থেকে `i` change করলে code-এর অন্য অংশে unexpected bug হতে পারে।

---

## Loop with `let`

```js
for (let i = 0; i < 5; i++) {
    console.log(i);
}

console.log(i);
```

## Output

```text
0
1
2
3
4
ReferenceError: i is not defined
```

---

## কেন error?

`let` block-scoped। `for` loop-এর ভিতরে `let i` declared হয়েছে। তাই loop block শেষ হলে `i` বাইরে accessible নয়।

এটাই ভালো programming practice, কারণ loop variable loop-এর ভিতরেই limited থাকে।

---

## কেন loop-এ `let` recommended?

| Reason | Explanation |
|---|---|
| Block scope | `i` loop-এর বাইরে leak করে না |
| Safer | বাইরে থেকে accidentally change করা যায় না |
| Cleaner code | Variable pollution কম হয় |
| Modern JS practice | `var` avoid করে `let` / `const` use করা ভালো |

---

## `const` loop-এ কেন সাধারণত use করা যায় না?

Typical `for` loop-এ variable increment হয়:

```js
for (let i = 0; i < 5; i++) {
    console.log(i);
}
```

এখানে `i++` মানে `i` reassign হচ্ছে।

`const` দিয়ে declared variable reassign করা যায় না।

তাই এই ধরনের loop-এ:

```js
for (const i = 0; i < 5; i++) {
    console.log(i);
}
```

error হবে, কারণ `i++` করতে গেলে `const` value change করতে হবে।

---

## মনে রাখার নিয়ম

> Loop counter-এর জন্য `let` ব্যবহার করো।  
> `var` loop-এর বাইরে leak করে।  
> `const` reassign allow করে না।

---

# Comparison Table: `var`, `let`, `const`

Video-তে শেষে instructor একটি comparison table mention করেছেন। নিচে lesson-এর concepts ধরে সাজানো হলো।

| Feature | `var` | `let` | `const` |
|---|---|---|---|
| Scope | Function-scoped | Block-scoped | Block-scoped |
| Function-এর বাইরে access | Function-এর ভিতরে declare করলে No | Function-এর ভিতরে declare করলে No | Function-এর ভিতরে declare করলে No |
| Block-এর বাইরে access | Block-এর ভিতরে declare করলে অনেক ক্ষেত্রে Yes | No | No |
| Hoisting | Hoisted এবং `undefined` দিয়ে initialized | Hoisted but TDZ-এ থাকে | Hoisted but TDZ-এ থাকে |
| Global object attach | Global `var` browser `window` object-এ attach হয় | Global `let` attach হয় না | Global `const` attach হয় না |
| Re-declare | Same scope-এ allowed | Same scope-এ not allowed | Same scope-এ not allowed |
| Reassign | Allowed | Allowed | Not allowed |
| Initial value required | No | No | Yes |
| Default value if no initialization | `undefined` | `undefined`, কিন্তু TDZ-এর পরে access করা যাবে | Initialization mandatory |
| Mutable? | Reassign করা যায় | Reassign করা যায় | Binding reassign করা যায় না |
| Loop counter হিসেবে | Allowed but not recommended | Recommended | Typical counter হিসেবে suitable নয় |
| Modern recommendation | Avoid | Use when value changes | Use when value should not be reassigned |

---

## Re-declaration vs Reassignment

এই দুইটি বিষয় আলাদা।

---

### Re-declaration

Same scope-এ একই variable name আবার declare করা।

```js
var name = "Tapas";
var name = "JavaScript"; // allowed
```

```js
let name = "Tapas";
let name = "JavaScript"; // SyntaxError
```

```js
const name = "Tapas";
const name = "JavaScript"; // SyntaxError
```

---

### Reassignment

Already declared variable-এ নতুন value assign করা।

```js
var name = "Tapas";
name = "JavaScript"; // allowed
```

```js
let name = "Tapas";
name = "JavaScript"; // allowed
```

```js
const name = "Tapas";
name = "JavaScript"; // TypeError
```

---

## Initial value

```js
var a;
console.log(a); // undefined
```

```js
let b;
console.log(b); // undefined
```

```js
const c; // SyntaxError
```

`const` declare করার সময়ই value দিতে হয়।

---

## মনে রাখার নিয়ম

- Value পরে change হবে → `let`
- Value reassign হবে না → `const`
- পুরোনো code বুঝতে হবে → `var` জানো
- নতুন code লিখতে গেলে → সাধারণত `var` avoid করো

---

# Code Run করার সময় গুরুত্বপূর্ণ Warning

Transcript বা tutorial-এর snippets অনেক সময় আলাদা আলাদা example হিসেবে দেখানো হয়। সব code একসাথে একই file-এ চালালে কিছু confusion বা error হতে পারে।

---

## Warning 1: `ReferenceError` code execution stop করতে পারে

```js
console.log(outerVar); // ReferenceError
```

এই line execute হলে script stop হয়ে যেতে পারে। ফলে এর পরের examples run নাও হতে পারে।

Practice করার সময় error-producing lines comment করে আলাদা করে test করা ভালো।

```js
// console.log(outerVar); // ReferenceError
```

---

## Warning 2: Same function name আবার declare করা

Transcript-এর examples-এ `outer()` function একাধিকবার ব্যবহার করা হয়েছে। এগুলো আলাদা আলাদা concept explain করার জন্য।

একই file-এ একই name-এর function একাধিকবার declare করলে later declaration earlier declaration-কে replace বা shadow করতে পারে।

Better practice:

```js
function outerScopeChainExample() {
    // example 1
}

function outerCountExample() {
    // example 2
}
```

---

## Warning 3: Browser এবং Node.js environment আলাদা হতে পারে

`window` object browser-specific।

Browser:

```js
console.log(window);
```

Node.js:

```js
console.log(window); // ReferenceError: window is not defined
```

তাই `window.name` example browser console-এ test করতে হবে।

---

# Common Mistakes

## Mistake 1: `var` মানেই সব জায়গা থেকে accessible

Wrong idea:

```text
var দিয়ে declare করলে variable সব জায়গা থেকে access করা যায়
```

Correct:

- Global `var` widely accessible এবং browser `window`-এ attach হয়।
- Function-এর ভিতরে `var` declare করলে function-এর বাইরে accessible নয়।
- Block-এর ভিতরে `var` declare করলে block-এর বাইরে accessible হতে পারে।

---

## Mistake 2: `let` global হলে `window` object-এ পাওয়া যাবে

Wrong:

```js
let name = "Tapas";
console.log(window.name); // Tapas আশা করা
```

Correct:

Global `let` direct access করা যায়, কিন্তু `window` property হয় না।

---

## Mistake 3: Block-এর ভিতরে `let` / `const` declare করে বাইরে access করা

Wrong:

```js
{
    let count = 10;
}

console.log(count); // ReferenceError
```

Correct:

Block-এর বাইরে দরকার হলে variable block-এর বাইরে declare করতে হবে।

---

## Mistake 4: Same name দেখেই same variable ভাবা

Wrong:

```js
var count = 10;

function outer() {
    var count = 20;
}
```

এখানে দুইটি `count` একই variable নয়। Scope আলাদা।

---

## Mistake 5: Scope Chain বাইরে থেকে ভিতরে যাবে ভাবা

Wrong idea:

```text
Global scope থেকে function-এর ভিতরের variable খুঁজে পাওয়া যাবে
```

Correct:

Scope chain inner → outer direction-এ কাজ করে। Global scope থেকে nested function-এর local variable access করা যায় না।

---

## Mistake 6: Loop counter `var` দিয়ে declare করা

```js
for (var i = 0; i < 5; i++) {
    console.log(i);
}

console.log(i); // 5
```

এখানে `i` loop-এর বাইরে leak করেছে।

Better:

```js
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// console.log(i); // ReferenceError
```

---

# Important Differences

## Global Scope vs Function Scope vs Block Scope

| Topic | Global Scope | Function Scope | Block Scope |
|---|---|---|---|
| কোথায় তৈরি হয় | Function/block-এর বাইরে | Function-এর ভিতরে | `{}` block-এর ভিতরে |
| বাইরে থেকে access | Already outermost | Function-এর বাইরে থেকে না | `let` / `const` হলে block-এর বাইরে না |
| ভিতরের scope access করতে পারে? | Yes, nested scope global variable access করতে পারে | Inner function access করতে পারে | Block-এর ভিতরে access করা যায় |
| Risk | Variable pollution | Limited | Safer with `let` / `const` |

---

## Scope vs Scope Chain

| Concept | Meaning |
|---|---|
| Scope | Variable কোথায় accessible |
| Scope Chain | Variable খুঁজতে JavaScript কোন path follow করে |

Example:

```js
function inner() {
    console.log(x);
}
```

এখানে `x` কোথায় পাওয়া যাবে সেটা determine করার process হলো scope chain।

---

## Shadowing vs Reassignment

| Topic | Shadowing | Reassignment |
|---|---|---|
| কী হয় | Same name-এ নতুন variable তৈরি হয় inner scope-এ | Existing variable-এর value বদলায় |
| Keyword ব্যবহার | `let`, `const`, `var` দিয়ে নতুন declaration | Keyword ছাড়া assignment |
| Outer variable বদলায়? | না | হ্যাঁ, যদি outer variable resolve হয় |
| Example | `let message = "B"` | `message = "B"` |

---

# Assignment / Task

Video-তে বলা হয়েছে Day 10-এর task `task.md` file-এ আছে। সেখানে previous session এবং scope session—দুই জায়গার topic থেকে task ও quiz-type questions দেওয়া হয়েছে। Transcript-এ actual task list shown নেই, তাই এখানে exact task questions reproduce করা সম্ভব নয়।

তবে এই lesson revise করার জন্য নিচের practice tasks করতে পারো।

---

## Self-practice Task 1: Scope identify করো

নিচের code-এ প্রতিটি variable কোন scope-এ আছে লিখো:

```js
let a = 10;

function test() {
    let b = 20;

    {
        let c = 30;
        var d = 40;
    }

    console.log(a);
    console.log(b);
    console.log(d);
    // console.log(c);
}

test();
```

লিখতে হবে:

- `a` কোন scope?
- `b` কোন scope?
- `c` কোন scope?
- `d` কোথা থেকে accessible?
- `console.log(c)` uncomment করলে কী হবে?

---

## Self-practice Task 2: Output predict করো

```js
let value = "global";

function outer() {
    let value = "outer";

    function inner() {
        console.log(value);
    }

    inner();
}

outer();
console.log(value);
```

Expected output নিজে predict করো, তারপর run করো।

---

## Self-practice Task 3: `var` বনাম `let`

```js
{
    var x = 100;
    let y = 200;
}

console.log(x);
console.log(y);
```

প্রশ্ন:

1. কোন line output দেবে?
2. কোন line error দেবে?
3. কেন?

---

## Self-practice Task 4: Loop scope

```js
for (var i = 0; i < 3; i++) {
    console.log("inside var loop", i);
}
console.log("outside var loop", i);

for (let j = 0; j < 3; j++) {
    console.log("inside let loop", j);
}
console.log("outside let loop", j);
```

প্রশ্ন:

- `i` বাইরে accessible হবে কি?
- `j` বাইরে accessible হবে কি?
- কোথায় `ReferenceError` হবে?

---

## Self-practice Task 5: Shadowing না Reassignment?

নিচের code দুইটির output compare করো।

### Code A

```js
let status = "online";

function updateStatus() {
    let status = "offline";
    console.log(status);
}

updateStatus();
console.log(status);
```

### Code B

```js
let status = "online";

function updateStatus() {
    status = "offline";
    console.log(status);
}

updateStatus();
console.log(status);
```

প্রশ্ন:

- Code A-তে কি shadowing হয়েছে?
- Code B-তে কি reassignment হয়েছে?
- Global `status` কখন change হয়েছে?

---

# Final Summary

এই lesson-এর সবচেয়ে গুরুত্বপূর্ণ idea হলো:

> JavaScript variable কোথা থেকে access করা যাবে, সেটা variable কোথায় declared হয়েছে এবং কোন keyword দিয়ে declared হয়েছে তার উপর নির্ভর করে।

## Key takeaways

1. **Scope** মানে variable-এর accessibility area।
2. JavaScript-এ ৪ ধরনের scope আছে:
   - Global Scope
   - Function Scope
   - Block Scope
   - Module Scope
3. এই lesson-এ Global, Function, Block scope শেখানো হয়েছে।
4. Global variable function এবং block-এর ভিতর থেকেও access করা যায়।
5. Global `var` browser-এর `window` object-এ property হিসেবে attach হয়।
6. Global `let` এবং `const` `window` object-এ attach হয় না।
7. Function-এর ভিতরে declared variable function-এর বাইরে accessible নয়।
8. `var` function-scoped।
9. `let` এবং `const` block-scoped।
10. Block-এর ভিতরে `var` declare করলে block-এর বাইরে accessible হতে পারে।
11. Scope Chain variable খোঁজে current scope থেকে outer scope হয়ে global scope পর্যন্ত।
12. Global scope-এর বাইরে আর কোনো outer scope নেই।
13. Variable Shadowing হয় যখন inner scope-এর variable outer scope-এর same-name variable-কে hide করে।
14. Loop counter হিসেবে `let` ব্যবহার করা recommended।
15. `var` loop-এর বাইরে variable leak করতে পারে।
16. `const` typical loop counter হিসেবে suitable নয়, কারণ counter reassign/increment করতে হয়।

---

# Practice Checklist

এই checklist পূরণ করতে পারলে Day 10-এর core concept clear হয়েছে ধরে নেওয়া যায়।

## Concept understanding

- [ ] Scope কী, নিজের ভাষায় explain করতে পারি।
- [ ] Global Scope কী বুঝি।
- [ ] Function Scope কী বুঝি।
- [ ] Block Scope কী বুঝি।
- [ ] Module Scope এই lesson-এ detail হয়নি—এটা জানি।
- [ ] `var` function-scoped—এটা মনে আছে।
- [ ] `let` এবং `const` block-scoped—এটা মনে আছে।
- [ ] Global `var` browser `window` object-এ attach হয়—এটা জানি।
- [ ] Global `let` / `const` `window` object-এ attach হয় না—এটা জানি।
- [ ] Scope Chain inner থেকে outer direction-এ কাজ করে—এটা বুঝি।
- [ ] Global থেকে function-এর local variable access করা যায় না—এটা বুঝি।
- [ ] Variable Shadowing কী বুঝি।
- [ ] Shadowing এবং Reassignment-এর difference বুঝি।

## Code prediction

- [ ] Nested function-এর variable output predict করতে পারি।
- [ ] Same name variable থাকলে nearest scope rule apply করতে পারি।
- [ ] `ReferenceError` কোথায় হবে predict করতে পারি।
- [ ] `var` block-এর বাইরে accessible হবে কিনা বুঝতে পারি।
- [ ] `let` / `const` block-এর বাইরে accessible হবে কিনা বুঝতে পারি।
- [ ] Loop-এর পরে `var i` এবং `let i` behavior explain করতে পারি।

## Practice

- [ ] অন্তত ৩টি Global Scope example লিখেছি।
- [ ] অন্তত ৩টি Function Scope example লিখেছি।
- [ ] অন্তত ৩টি Block Scope example লিখেছি।
- [ ] Scope Chain দিয়ে nested function example solve করেছি।
- [ ] Variable Shadowing example নিজে লিখেছি।
- [ ] `var` বনাম `let` loop example run করেছি।
- [ ] Error-producing lines comment/uncomment করে behavior observe করেছি।

---

# One-page Revision Sheet

## Scope rule

```text
Variable কোথায় declared → কোথা থেকে accessible
```

## Scope Chain rule

```text
Current scope → Outer scope → Global scope → ReferenceError
```

## Keyword rule

```text
var   → function-scoped
let   → block-scoped
const → block-scoped
```

## Global object rule

```text
Global var        → window object-এর property হয়
Global let/const  → window object-এর property হয় না
```

## Loop rule

```text
for loop counter → let ব্যবহার করো
```

## Shadowing rule

```text
Inner scope-এ same name variable → outer variable hide হয়
```

---

# Recommended Revision Flow

1. প্রথমে Scope definition পড়ো।
2. তারপর Global, Function, Block scope আলাদা করে example run করো।
3. এরপর `var`, `let`, `const` comparison table মুখস্থ না করে বুঝে পড়ো।
4. তারপর Scope Chain example হাতে trace করো।
5. শেষে Variable Shadowing এবং loop examples practice করো।

---

# End Note

Day 10-এর Scope এবং Scope Chain ভালোভাবে বুঝলে Day 11-এর Closure শেখা অনেক সহজ হবে। কারণ Closure বুঝতে হলে function, inner function, lexical scope এবং scope chain—এই সব concept clear থাকা দরকার।
