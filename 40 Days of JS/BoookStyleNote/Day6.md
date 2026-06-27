# JavaScript Day 06 — Functions  
## বাংলা Detailed Study Notes

> এই notes JavaScript functions lesson-এর উপর ভিত্তি করে তৈরি। লক্ষ্য হলো beginner student যেন শুধু notes পড়েই পুরো lesson বুঝতে পারে এবং future revision-এর জন্য ব্যবহার করতে পারে।

---

## Table of Contents

1. [Lesson Overview](#lesson-overview)
2. [Function কী?](#function-কী)
3. [Function কেন দরকার?](#function-কেন-দরকার)
4. [Function Declaration / Definition](#function-declaration--definition)
5. [Function Invoke / Call](#function-invoke--call)
6. [Function as Expression](#function-as-expression)
7. [Parameter এবং Argument](#parameter-এবং-argument)
8. [`return` Statement](#return-statement)
9. [Default Parameters](#default-parameters)
10. [Rest Parameter](#rest-parameter)
11. [Nested Functions](#nested-functions)
12. [Callback Function](#callback-function)
13. [Anonymous Function](#anonymous-function)
14. [Pure Function এবং Side Effect](#pure-function-এবং-side-effect)
15. [Higher Order Function](#higher-order-function)
16. [Arrow Function](#arrow-function)
17. [IIFE — Immediately Invoked Function Expression](#iife--immediately-invoked-function-expression)
18. [Call Stack](#call-stack)
19. [Recursion](#recursion)
20. [Important Differences](#important-differences)
21. [Common Mistakes](#common-mistakes)
22. [Assignment](#assignment)
23. [Final Summary](#final-summary)
24. [Practice Checklist](#practice-checklist)

---

# Lesson Overview

এই lesson-এ JavaScript-এর সবচেয়ে গুরুত্বপূর্ণ topic গুলোর একটি শেখানো হয়েছে: **function**।

আগের lessons-এ শেখা concept যেমন:

- `variable`
- `operator`
- `expression`
- `condition`
- `if-else`
- `switch-case`
- `loop`

এসব একসাথে ব্যবহার করে এখন reusable logic তৈরি করা হবে function-এর মাধ্যমে।

এই lesson-এ cover করা হয়েছে:

- function কী
- function কীভাবে define করতে হয়
- function কীভাবে call করতে হয়
- function expression
- parameter এবং argument
- `return`
- default parameter
- rest parameter
- nested function
- callback function
- pure function
- higher order function
- arrow function
- IIFE
- call stack
- recursion

---

# Function কী?

## সহজ Definition

**Function** হলো programming-এর এমন একটি mechanism যার মাধ্যমে repeated code এক জায়গায় লিখে বারবার ব্যবহার করা যায়।

অর্থাৎ, একই code বারবার copy-paste না করে function বানিয়ে সেই function বিভিন্ন জায়গায় call করা যায়।

---

## বাস্তব উদাহরণ

ধরুন আপনার program-এ বারবার greeting message print করতে হয়:

```js
console.log("Hello, welcome to JavaScript!");
console.log("Hello, welcome to JavaScript!");
console.log("Hello, welcome to JavaScript!");
```

এভাবে একই code বারবার লেখা ভালো practice নয়।

Function ব্যবহার করলে:

```js
function greet() {
  console.log("Hello, welcome to JavaScript!");
}

greet();
greet();
greet();
```

এখানে greeting logic একবার লেখা হয়েছে, কিন্তু অনেকবার ব্যবহার করা হয়েছে।

---

## Mathematical view

Mathematics-এ function হলো এমন কিছু যা input নিয়ে output দেয়।

Example:

```text
f(x) = x + 2
```

যদি `x = 3`, তাহলে output হবে `5`.

Programming-এও function input নিতে পারে, কিছু calculation করতে পারে এবং output return করতে পারে।

---

# Function কেন দরকার?

Function ব্যবহারের প্রধান কারণ:

| কারণ | Explanation |
|---|---|
| Reusability | একই logic বারবার ব্যবহার করা যায় |
| Less Code | repeated code কমে যায় |
| Maintainability | future-এ change করা সহজ হয় |
| Readability | code organized এবং readable হয় |
| Modularity | বড় problem ছোট ছোট function-এ ভাগ করা যায় |
| Testing | ছোট function test করা সহজ |

---

## Without function

```js
const a = 10;
const b = 5;
console.log(a + b);

const x = 20;
const y = 30;
console.log(x + y);

const p = 100;
const q = 200;
console.log(p + q);
```

## With function

```js
function sum(a, b) {
  console.log(a + b);
}

sum(10, 5);
sum(20, 30);
sum(100, 200);
```

Function code-কে reusable করেছে।

---

# Function Declaration / Definition

Function define করার সবচেয়ে common way হলো `function` keyword ব্যবহার করা।

## Syntax

```js
function functionName() {
  // function body
}
```

Example:

```js
function printThis() {
  console.log("Printing a message");
}
```

এখানে:

| Part | Meaning |
|---|---|
| `function` | JavaScript keyword |
| `printThis` | function name |
| `()` | parenthesis |
| `{}` | function body |
| `console.log(...)` | function body-এর statement |

---

## Function Declaration vs Function Definition

এই lesson-এ বলা হয়েছে, **function declaration** এবং **function definition** একই context-এ ব্যবহার করা যায়।

```js
function printThis() {
  console.log("Printing a message");
}
```

এটি function declaration বা function definition।

---

## Function naming

Function-এর নাম এমন হওয়া উচিত যা দেখে বোঝা যায় function কী কাজ করছে।

Good names:

```js
printMessage()
calculateTotal()
getUserName()
sendEmail()
validatePassword()
```

Bad names:

```js
abc()
test()
doSomething()
x()
```

### মনে রাখার নিয়ম

> Function name সাধারণত action বোঝায়।  
> তাই function name-এ verb ব্যবহার করা ভালো, যেমন `calculate`, `print`, `get`, `set`, `send`, `validate`.

---

# Function Invoke / Call

Function শুধু define করলে কাজ করে না।  
Function execute করতে হলে তাকে call বা invoke করতে হয়।

## Example

```js
function printThis() {
  console.log("Printing a message");
}

printThis();
```

Output:

```text
Printing a message
```

## Function call syntax

```js
functionName();
```

Function call করার সময়:

- function name লিখতে হয়
- তার পরে parenthesis `()` দিতে হয়

---

## Important concept

```js
function printThis() {
  console.log("Printing a message");
}
```

এখানে function শুধু define হয়েছে। Output আসবে না।

```js
printThis();
```

এটা function call. এখন output আসবে।

---

## Common mistake

### Mistake: function call-এ parenthesis না দেওয়া

```js
function printThis() {
  console.log("Printing a message");
}

printThis;
```

এখানে function execute হবে না।

### Correct

```js
printThis();
```

### মনে রাখার নিয়ম

> Function execute করতে চাইলে `()` লাগবেই।

---

# Function as Expression

JavaScript-এ function একটি value হিসেবেও কাজ করতে পারে।  
তাই function-কে variable-এ assign করা যায়।

## Syntax

```js
const variableName = function () {
  // function body
};
```

## Example

```js
const printMe = function () {
  console.log("Printing from function expression");
};

printMe();
```

Output:

```text
Printing from function expression
```

---

## Explanation

```js
const printMe = function () {
  console.log("Printing from function expression");
};
```

এখানে:

- `printMe` একটি variable
- সেই variable-এর value হলো একটি function
- তাই `printMe()` লিখলে function execute হয়

---

## Function value print করা

```js
const printMe = function () {
  console.log("Hello");
};

console.log(printMe);
```

এতে function body print হতে পারে, কারণ `printMe` variable function value hold করছে।

Function execute করতে হলে:

```js
printMe();
```

---

## Function Declaration vs Function Expression

| Topic | Function Declaration | Function Expression |
|---|---|---|
| Syntax | `function name() {}` | `const name = function () {}` |
| Name required? | সাধারণত required | variable name থাকে |
| Stored in variable? | সরাসরি নয় | হ্যাঁ |
| Call syntax | `name()` | `name()` |
| Use case | normal reusable function | function value হিসেবে pass/store করতে |

---

# Parameter এবং Argument

Function input নিতে পারে।  
এই input-এর দুটি related term আছে:

1. **Parameter**
2. **Argument**

---

## Parameter কী?

Function define করার সময় parenthesis-এর ভেতরে যে variable-like placeholder লেখা হয়, তাকে **parameter** বলে।

```js
function sum(a, b) {
  const result = a + b;
  console.log(result);
}
```

এখানে `a` এবং `b` হলো parameters।

---

## Argument কী?

Function call করার সময় actual value pass করা হলে তাকে **argument** বলে।

```js
sum(10, 4);
```

এখানে `10` এবং `4` হলো arguments।

---

## Full Example

```js
function sum(a, b) {
  const result = a + b;
  console.log(result);
}

sum(10, 4);
```

Output:

```text
14
```

## Mapping

| Parameter | Argument |
|---|---|
| `a` | `10` |
| `b` | `4` |

Function run করার সময়:

```js
a + b
```

becomes:

```js
10 + 4
```

Output:

```text
14
```

---

## Parameter vs Argument Table

| Topic | Parameter | Argument |
|---|---|---|
| কোথায় থাকে? | function declaration/definition-এ | function call/invocation-এ |
| কী ধরনের? | placeholder/variable | actual value |
| Example | `function sum(a, b)` | `sum(10, 4)` |
| Role | input receive করে | input send করে |

---

## Common mistake

### Mistake: parameter আর argument একই জিনিস ভাবা

```js
function greet(name) {
  console.log("Hello " + name);
}

greet("Tapas");
```

এখানে:

- `name` হলো parameter
- `"Tapas"` হলো argument

### মনে রাখার নিয়ম

> Parameter হলো function বানানোর সময়।  
> Argument হলো function চালানোর সময়।

---

# `return` Statement

Function শুধু `console.log()` করলেই শেষ নয়।  
অনেক সময় function-এর calculated result বাইরে দরকার হয়।  
তখন `return` ব্যবহার করা হয়।

---

## `console.log()` vs `return`

```js
function sum(a, b) {
  console.log(a + b);
}

const result = sum(10, 4);
console.log(result);
```

Output:

```text
14
undefined
```

কারণ function কিছু return করেনি।

---

## Return ব্যবহার করে

```js
function sum(a, b) {
  const result = a + b;
  return result;
}

const result = sum(10, 4);
console.log(result);
```

Output:

```text
14
```

---

## Return value অন্য function-এ use করা

```js
function sum(a, b) {
  return a + b;
}

function double(value) {
  return value * 2;
}

const result = sum(10, 9);
console.log(double(result));
```

Output:

```text
38
```

Explanation:

```js
sum(10, 9) // 19
double(19) // 38
```

---

## `return` কী করে?

`return` দুইটি কাজ করে:

1. function থেকে value বাইরে পাঠায়
2. function execution stop করে

Example:

```js
function test() {
  return "Done";
  console.log("This will not run");
}

console.log(test());
```

Output:

```text
Done
```

`return`-এর পরের line execute হয় না।

---

## Important mistake: return-এর পরে new line

Wrong:

```js
function sum(a, b) {
  return
  a + b;
}

console.log(sum(10, 4));
```

Output:

```text
undefined
```

JavaScript automatic semicolon insertion-এর কারণে এটি এমনভাবে behave করতে পারে:

```js
return;
a + b;
```

Correct:

```js
function sum(a, b) {
  return a + b;
}
```

### মনে রাখার নিয়ম

> `return` value একই line-এ লিখুন।  
> `return`-এর পরে line break দিলে unexpected `undefined` আসতে পারে।

---

# Default Parameters

## Problem

ধরুন একটি function আছে:

```js
function calc(a, b) {
  return (a + b) * 2;
}

console.log(calc(2, 3));
```

Output:

```text
10
```

কিন্তু যদি একটি argument না দেওয়া হয়?

```js
console.log(calc(2));
```

তখন:

- `a = 2`
- `b = undefined`

Calculation:

```js
(2 + undefined) * 2
```

Output:

```text
NaN
```

`NaN` মানে **Not a Number**।

---

## Solution: Default Parameter

Parameter-এর default value দেওয়া যায়।

```js
function calc(a, b = 0) {
  return (a + b) * 2;
}

console.log(calc(2));
```

Output:

```text
4
```

কারণ:

```js
a = 2
b = 0
(2 + 0) * 2 = 4
```

---

## Default value override হয়

```js
function calc(a, b = 0) {
  return (a + b) * 2;
}

console.log(calc(2, 7));
```

Output:

```text
18
```

কারণ `b = 0` default ছিল, কিন্তু argument `7` pass করা হয়েছে।  
তাই `b`-এর value হলো `7`।

---

## দুই parameter-ই default

```js
function calc(a = 0, b = 0) {
  return (a + b) * 2;
}

console.log(calc());
```

Output:

```text
0
```

---

## Common mistake

### Mistake: argument না দিলে parameter `undefined` হবে এটা ভুলে যাওয়া

```js
function calc(a, b) {
  return (a + b) * 2;
}

calc(2); // NaN
```

Correct:

```js
function calc(a = 0, b = 0) {
  return (a + b) * 2;
}
```

### মনে রাখার নিয়ম

> Function-কে fail-safe করতে default parameter ব্যবহার করুন।

---

# Rest Parameter

## Rest Parameter কী?

যখন function কতগুলো argument পাবে তা আগে থেকে জানা থাকে না, তখন rest parameter ব্যবহার করা হয়।

Syntax:

```js
function functionName(...rest) {
  // rest is an array
}
```

---

## Example

```js
function calculateThis(x, y, ...rest) {
  console.log(x);
  console.log(y);
  console.log(rest);
}

calculateThis(1, 2, 3, 4, 5, 6, 7, 8, 9);
```

Output:

```text
1
2
[3, 4, 5, 6, 7, 8, 9]
```

---

## Explanation

| Argument | Parameter |
|---|---|
| `1` | `x` |
| `2` | `y` |
| `3,4,5,6,7,8,9` | `rest` array |

`rest` parameter multiple values-কে array হিসেবে ধরে।

---

## Rest Parameter must be last

Wrong:

```js
function calculateThis(...rest, x, y) {
  console.log(rest);
}
```

এটি error দেবে।

Correct:

```js
function calculateThis(x, y, ...rest) {
  console.log(rest);
}
```

---

## Why rest parameter useful?

- unknown number of arguments handle করতে
- flexible function বানাতে
- multiple values array হিসেবে process করতে
- utility function বানাতে

---

## Example: sum all numbers

```js
function sumAll(...numbers) {
  let total = 0;

  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }

  return total;
}

console.log(sumAll(1, 2, 3));
console.log(sumAll(10, 20, 30, 40));
```

Output:

```text
6
100
```

---

## মনে রাখার নিয়ম

> Rest parameter সবসময় last parameter হবে।  
> Rest parameter multiple arguments-কে array বানায়।

---

# Nested Functions

## Nested Function কী?

একটি function-এর ভিতরে আরেকটি function define করলে তাকে nested function বলে।

```js
function outer() {
  function inner() {
    console.log("Inner");
  }
}
```

---

## Outer Function এবং Inner Function

| Term | Meaning |
|---|---|
| Outer Function | যে function-এর ভিতরে আরেকটি function আছে |
| Inner Function | যে function অন্য function-এর ভিতরে define করা হয়েছে |

---

## Example

```js
function outer() {
  console.log("Outer");

  function inner() {
    console.log("Inner");
  }

  inner();
}

outer();
```

Output:

```text
Outer
Inner
```

---

## Inner function বাইরে থেকে access করা যায় না

```js
function outer() {
  function inner() {
    console.log("Inner");
  }
}

inner();
```

Output:

```text
ReferenceError: inner is not defined
```

কারণ `inner` function `outer` function-এর scope-এর ভিতরে আছে।

---

## Inner function return করা

Inner function বাইরে use করতে চাইলে outer function থেকে return করা যায়।

```js
function outer() {
  function inner() {
    console.log("Inner");
  }

  return inner;
}

const returnedFunction = outer();
returnedFunction();
```

Output:

```text
Inner
```

---

## Explanation

```js
const returnedFunction = outer();
```

এখানে `outer()` call করলে `inner` function return হয়।  
তাই `returnedFunction` variable-এর value হলো একটি function।

```js
returnedFunction();
```

এটি সেই returned inner function execute করে।

---

## মনে রাখার নিয়ম

> Inner function by default outer function-এর বাইরে accessible নয়।  
> বাইরে use করতে চাইলে return করতে হবে।

---

# Callback Function

## Callback Function কী?

একটি function যদি অন্য function-এ argument হিসেবে pass করা হয় এবং পরে call করা হয়, তাকে callback function বলা হয়।

সহজভাবে:

> Callback হলো এমন function যাকে অন্য function-এর ভিতরে পরে call করা হয়।

---

## Example

```js
function foo(func) {
  console.log("Foo");
  func();
}

foo(function () {
  console.log("Buzz");
});
```

Output:

```text
Foo
Buzz
```

---

## Explanation

```js
foo(function () {
  console.log("Buzz");
});
```

এখানে anonymous function argument হিসেবে `foo` function-এ pass হয়েছে।

`foo` function-এর ভিতরে:

```js
func();
```

এখানে সেই passed function call হয়েছে।

---

## Named callback

```js
function foo(func) {
  console.log("Foo");
  func();
}

const buzz = function () {
  console.log("Buzz");
};

foo(buzz);
```

Output:

```text
Foo
Buzz
```

---

## Callback conditionally call করা

```js
function foo(func, shouldCall) {
  console.log("Foo");

  if (shouldCall) {
    func();
  }
}

const buzz = function () {
  console.log("Buzz");
};

foo(buzz, true);
```

Output:

```text
Foo
Buzz
```

যদি `shouldCall` false হয়:

```js
foo(buzz, false);
```

Output:

```text
Foo
```

---

## কে callback function call করে?

Callback function call করে সেই function যার মধ্যে callback argument হিসেবে pass করা হয়েছে।

Example:

```js
foo(buzz);
```

এখানে `buzz` callback।  
`foo` function-এর ভিতরে `buzz` call হবে।

---

## Common use cases

- event handling
- asynchronous programming
- array methods
- timers
- API response handling

Example:

```js
setTimeout(function () {
  console.log("Executed later");
}, 1000);
```

---

## মনে রাখার নিয়ম

> Callback function নিজে নিজে call হয় না।  
> যে function-এ callback pass করা হয়, সেই function callback call করে।

---

# Anonymous Function

## Anonymous Function কী?

যে function-এর কোনো নাম নেই, তাকে anonymous function বলে।

```js
function () {
  console.log("Hello");
}
```

কিন্তু শুধু এভাবে standalone anonymous function লেখা valid নয়।  
এটি সাধারণত function expression বা callback হিসেবে ব্যবহৃত হয়।

---

## Anonymous function as callback

```js
foo(function () {
  console.log("Buzz");
});
```

## Anonymous function as expression

```js
const greet = function () {
  console.log("Hello");
};

greet();
```

---

## কখন anonymous function ব্যবহার করবেন?

- function আলাদা করে আবার call করার দরকার নেই
- function শুধু একবার pass করতে হবে
- callback হিসেবে ব্যবহার করতে হবে
- short logic inline লিখতে হবে

---

## মনে রাখার নিয়ম

> Function-এর নাম দরকার হয় পরে call করার জন্য।  
> যদি পরে name দিয়ে call করতে না হয়, anonymous function ব্যবহার করা যায়।

---

# Pure Function এবং Side Effect

## Pure Function কী?

Pure function হলো এমন function যা:

1. same input দিলে always same output দেয়
2. function-এর বাইরে কোনো state/data-এর উপর depend করে না
3. function-এর বাইরে কোনো কিছু change করে না

---

## Pure Function Example

```js
function greeting(name) {
  return "Hello " + name;
}

console.log(greeting("Tapas Script"));
console.log(greeting("Tapas Script"));
console.log(greeting("Tapas Script"));
```

Output:

```text
Hello Tapas Script
Hello Tapas Script
Hello Tapas Script
```

Same input `"Tapas Script"` দিলে সবসময় same output।

---

## Impure Function Example

```js
let greetingMessage = "Hello";

function greeting(name) {
  return greetingMessage + " " + name;
}

console.log(greeting("Tapas Script"));

greetingMessage = "Namaste";

console.log(greeting("Tapas Script"));
```

Output:

```text
Hello Tapas Script
Namaste Tapas Script
```

Same input `"Tapas Script"` দিয়েও output change হয়েছে।  
কারণ function বাইরের variable `greetingMessage`-এর উপর depend করছে।

---

## Side Effect কী?

Function যদি নিজের scope-এর বাইরের কোনো data/state-এর উপর depend করে বা বাইরে কিছু change করে, সেটি side effect তৈরি করতে পারে।

Examples of side effects:

- বাইরের variable change করা
- API call করা
- DOM update করা
- file/database write করা
- console/log output
- random number ব্যবহার করা
- current time ব্যবহার করা

---

## Pure Function কেন ভালো?

| Benefit | Explanation |
|---|---|
| Predictable | same input → same output |
| Easy to test | external dependency কম |
| Easy to debug | unexpected behavior কম |
| Reusable | বিভিন্ন context-এ use করা যায় |
| Functional programming friendly | clean logic তৈরি হয় |

---

## বাস্তবতা

সব function pure করা সম্ভব নয়।  
Real application-এ API call, DOM update, user input, date/time ইত্যাদি side effect লাগতেই পারে।

Best practice:

> যতটা সম্ভব ছোট ছোট pure function তৈরি করুন।  
> Side effect আলাদা জায়গায় isolate করুন।

---

# Higher Order Function

## Higher Order Function কী?

Higher Order Function হলো এমন function যা:

1. অন্য function-কে argument হিসেবে নেয়  
অথবা
2. অন্য function return করে

---

## Case 1: Function as argument

```js
function getCamera(camera) {
  camera();
}

getCamera(function () {
  console.log("Sony");
});
```

Output:

```text
Sony
```

এখানে `getCamera` একটি higher order function, কারণ এটি function argument হিসেবে নিচ্ছে।

---

## Case 2: Function returns function

```js
function returnFunc() {
  return function () {
    console.log("Hello");
  };
}

const rFunc = returnFunc();
rFunc();
```

Output:

```text
Hello
```

এখানে `returnFunc` একটি function return করছে।

---

## Callback vs Higher Order Function

| Topic | Callback Function | Higher Order Function |
|---|---|---|
| কী? | যে function argument হিসেবে pass হয় | যে function অন্য function নেয় বা return করে |
| Role | passed function | receiver/returner function |
| Example | `buzz` | `foo`, `getCamera`, `returnFunc` |
| Relationship | callback HOF-এ pass হয় | HOF callback receive করতে পারে |

Example:

```js
function foo(callback) {
  callback();
}

function buzz() {
  console.log("Buzz");
}

foo(buzz);
```

এখানে:

- `buzz` = callback
- `foo` = higher order function

---

## Use cases

- wrappers
- decorators
- reusable behavior
- array methods like `map`, `filter`, `reduce`
- event handling
- async flow

---

# Arrow Function

## Arrow Function কী?

Arrow function হলো function লেখার modern এবং shorter syntax।

Traditional function expression:

```js
const greetMe = function () {
  console.log("Hello");
};
```

Arrow function:

```js
const greetMe = () => {
  console.log("Hello");
};
```

---

## Syntax

```js
const functionName = (parameters) => {
  // body
};
```

Arrow symbol:

```js
=>
```

এটি equal sign `=` এবং greater than sign `>` দিয়ে তৈরি।

---

## Example

```js
const greetMe = () => {
  console.log("Hello");
};

greetMe();
```

Output:

```text
Hello
```

---

## Single statement হলে curly braces বাদ দেওয়া যায়

```js
const greetMe = () => console.log("Hello");

greetMe();
```

Output:

```text
Hello
```

---

## Parameter সহ arrow function

```js
const greetMe = (greetingMessage) => {
  console.log(greetingMessage);
};

greetMe("Hola");
```

Output:

```text
Hola
```

---

## Implicit return

যদি single expression return করতে হয়, তাহলে `return` keyword বাদ দেওয়া যায়।

```js
const addGreat = (greetingMessage) => greetingMessage + " Great";

console.log(addGreat("Hello"));
```

Output:

```text
Hello Great
```

এখানে internally return হচ্ছে:

```js
return greetingMessage + " Great";
```

---

## Multiple statements হলে explicit return দরকার

```js
const addGreat = (greetingMessage) => {
  const finalMessage = greetingMessage + " Great";
  return finalMessage;
};

console.log(addGreat("Hello"));
```

---

## Arrow function syntax table

| Situation | Syntax |
|---|---|
| No parameter | `const fn = () => {}` |
| One parameter | `const fn = (x) => {}` |
| Multiple parameters | `const fn = (a, b) => {}` |
| Single expression return | `const fn = (a, b) => a + b` |
| Multiple statements | `const fn = (a, b) => { return a + b; }` |

---

## Important note about `this`

Arrow function-এ `this` keyword regular function থেকে ভিন্নভাবে behave করে।  
এই lesson-এ এটি detailed cover করা হয়নি, কারণ `this`, `scope`, `closure` আলাদা advanced topic হিসেবে শেখানো হবে।

---

## Common mistake

### Mistake: curly braces দিলে return না লেখা

```js
const sum = (a, b) => {
  a + b;
};

console.log(sum(2, 3));
```

Output:

```text
undefined
```

Correct:

```js
const sum = (a, b) => {
  return a + b;
};
```

অথবা:

```js
const sum = (a, b) => a + b;
```

### মনে রাখার নিয়ম

> Curly braces না থাকলে implicit return।  
> Curly braces থাকলে explicit `return` লিখুন।

---

# IIFE — Immediately Invoked Function Expression

## IIFE কী?

IIFE এর full form:

**Immediately Invoked Function Expression**

মানে function declare করার সাথে সাথে immediately execute করা।

---

## Syntax

```js
(function () {
  console.log("IIFE");
})();
```

Output:

```text
IIFE
```

---

## কেন parenthesis দরকার?

Anonymous function সরাসরি লিখলে error হতে পারে:

```js
function () {
  console.log("IIFE");
}
```

কারণ function declaration-এর name দরকার।

তাই function expression বানাতে group operator `()` ব্যবহার করা হয়:

```js
(function () {
  console.log("IIFE");
})();
```

---

## IIFE with argument

```js
(function (count) {
  console.log("IIFE", count);
})(1);
```

Output:

```text
IIFE 1
```

এখানে:

- `count` হলো parameter
- `1` হলো argument

---

## IIFE কখন ব্যবহার হয়?

- code immediately run করতে
- plugin initialization
- independent script run করতে
- global scope pollution কমাতে
- setup logic execute করতে

Example:

```js
(function () {
  console.log("Plugin loaded");
})();
```

---

## মনে রাখার নিয়ম

> IIFE হলো এমন function যা বানানোর সাথে সাথে নিজে নিজে execute হয়।

---

# Call Stack

## Call Stack কী?

JavaScript function execution track করার জন্য একটি stack data structure ব্যবহার করে।  
এই stack-কে বলা হয় **call stack** বা **function execution stack**।

---

## Stack concept

Stack হলো LIFO structure:

> Last In, First Out

যে function last ঢোকে, সে first বের হয়।

---

## Simple independent function calls

```js
function f1() {
  console.log("F1");
}

function f2() {
  console.log("F2");
}

function f3() {
  console.log("F3");
}

f1();
f2();
f3();
```

Execution:

1. `f1()` call → stack-এ `f1` যায়
2. `f1` complete → stack থেকে বের হয়
3. `f2()` call → stack-এ `f2` যায়
4. `f2` complete → stack থেকে বের হয়
5. `f3()` call → stack-এ `f3` যায়
6. `f3` complete → stack থেকে বের হয়

---

## Nested function calls

```js
function f1() {
  console.log("F1");
}

function f2() {
  f1();
  console.log("F2");
}

function f3() {
  f2();
  console.log("F3");
}

f3();
```

Output:

```text
F1
F2
F3
```

## Call stack flow

1. `f3()` stack-এ যায়
2. `f3`-এর ভিতরে `f2()` call হয়
3. `f2()` stack-এ যায়
4. `f2`-এর ভিতরে `f1()` call হয়
5. `f1()` stack-এ যায়
6. `f1` complete → বের হয়
7. `f2` complete → বের হয়
8. `f3` complete → বের হয়

Stack visualization:

```text
Step 1:
| f3 |

Step 2:
| f2 |
| f3 |

Step 3:
| f1 |
| f2 |
| f3 |

Then pop:
f1 out → f2 out → f3 out
```

---

## Call Stack কেন গুরুত্বপূর্ণ?

Call stack বুঝলে এগুলো সহজ হয়:

- function execution order
- recursion
- error trace
- execution context
- event loop
- asynchronous JavaScript

---

## মনে রাখার নিয়ম

> Function call হলে stack-এ ঢোকে।  
> Function finish হলে stack থেকে বের হয়।  
> Last called function আগে finish হয়।

---

# Recursion

## Recursion কী?

Recursion হলো যখন একটি function নিজেকেই call করে।

```js
function foo() {
  foo();
}
```

এটি recursion, কিন্তু dangerous কারণ কোনো exit condition নেই।

---

## Recursion-এর cost

প্রতিবার function call হলে call stack-এ নতুন entry যোগ হয়।  
যদি function বারবার নিজেকে call করতে থাকে এবং কখনো stop না করে, তাহলে call stack ভরে যায়।

Error হতে পারে:

```text
RangeError: Maximum call stack size exceeded
```

---

## Recursion-এর জন্য দুইটি জিনিস দরকার

1. **Base condition / Exit criteria**
2. **Recursive call**

---

## Base condition কী?

Base condition হলো এমন condition যেখানে function আর নিজেকে call করবে না।

---

## Example: ভুল recursion

```js
function fetchWater(count) {
  console.log("Fetching water", count);
  fetchWater(count - 1);
}

fetchWater(5);
```

এটি থামবে না।  
কারণ `count` কমছে, কিন্তু কোথাও বলা হয়নি কখন stop করবে।

---

## Correct recursion with base condition

```js
function fetchWater(count) {
  console.log("Fetching water", count);

  if (count === 0) {
    console.log("No more water is left to fetch");
    return;
  }

  fetchWater(count - 1);
}

fetchWater(5);
```

Output:

```text
Fetching water 5
Fetching water 4
Fetching water 3
Fetching water 2
Fetching water 1
Fetching water 0
No more water is left to fetch
```

---

## Explanation

| Call | `count` | Action |
|---|---:|---|
| 1 | 5 | print, call `fetchWater(4)` |
| 2 | 4 | print, call `fetchWater(3)` |
| 3 | 3 | print, call `fetchWater(2)` |
| 4 | 2 | print, call `fetchWater(1)` |
| 5 | 1 | print, call `fetchWater(0)` |
| 6 | 0 | base condition true, return |

---

## Recursion vs Loop

| Topic | Recursion | Loop |
|---|---|---|
| Mechanism | function নিজেকে call করে | code block repeat হয় |
| Stop condition | base condition | loop condition |
| Memory | call stack ব্যবহার করে | সাধারণত কম stack overhead |
| Risk | stack overflow | infinite loop |
| Best for | tree, nested structure, divide problem | simple repetition |

---

## Common mistake

### Mistake: base condition না দেওয়া

```js
function foo() {
  foo();
}
```

### Mistake: base condition থাকলেও recursive call ভুলভাবে করা

```js
function fetchWater(count) {
  if (count === 0) {
    return;
  }

  fetchWater(count);
}
```

এখানে `count` change হচ্ছে না। তাই recursion stop হবে না।

### Correct

```js
function fetchWater(count) {
  if (count === 0) {
    return;
  }

  fetchWater(count - 1);
}
```

### মনে রাখার নিয়ম

> Recursion লিখলে আগে base condition লিখুন।  
> Recursive call এমনভাবে লিখুন যাতে base condition-এর দিকে এগোয়।

---

# Important Differences

## Function Declaration vs Function Expression

| Topic | Function Declaration | Function Expression |
|---|---|---|
| Syntax | `function greet() {}` | `const greet = function () {}` |
| Function name | থাকে | anonymous বা named হতে পারে |
| Variable assignment | না | হ্যাঁ |
| Use | normal reusable function | function value হিসেবে use |

---

## Parameter vs Argument

| Topic | Parameter | Argument |
|---|---|---|
| Meaning | placeholder | actual value |
| Location | function definition | function call |
| Example | `function sum(a, b)` | `sum(2, 3)` |

---

## `console.log` vs `return`

| Topic | `console.log` | `return` |
|---|---|---|
| কাজ | console-এ print করে | function থেকে value বাইরে পাঠায় |
| Value reuse করা যায়? | না | হ্যাঁ |
| Function stop করে? | না | হ্যাঁ |
| Use case | debugging/display | calculation result ব্যবহার |

---

## Default Parameter vs Rest Parameter

| Topic | Default Parameter | Rest Parameter |
|---|---|---|
| Purpose | missing argument-এর fallback value | unknown number of arguments collect |
| Syntax | `b = 0` | `...rest` |
| Value type | normal value | array |
| Position rule | যেকোনো parameter-এ হতে পারে | always last |

---

## Callback vs Higher Order Function

| Topic | Callback | Higher Order Function |
|---|---|---|
| Role | pass হওয়া function | function নেয় বা return করে |
| Example | `buzz` | `foo` |
| Relationship | HOF-এর argument হতে পারে | callback receive করতে পারে |

---

## Pure vs Impure Function

| Topic | Pure Function | Impure Function |
|---|---|---|
| Same input same output? | হ্যাঁ | সবসময় নয় |
| External dependency | নেই | থাকতে পারে |
| Side effect | নেই | থাকতে পারে |
| Testing | সহজ | তুলনামূলক কঠিন |
| Predictability | বেশি | কম |

---

## Regular Function vs Arrow Function

| Topic | Regular Function | Arrow Function |
|---|---|---|
| Syntax | `function fn() {}` | `const fn = () => {}` |
| `function` keyword | লাগে | লাগে না |
| Short syntax | তুলনামূলক বড় | ছোট |
| Implicit return | নেই | single expression হলে আছে |
| `this` behavior | নিজের `this` থাকতে পারে | lexical `this` |

---

# Common Mistakes

## 1. Function define করে call না করা

```js
function greet() {
  console.log("Hello");
}
```

Output আসবে না।

Correct:

```js
greet();
```

---

## 2. Function call-এ `()` ভুলে যাওয়া

Wrong:

```js
greet;
```

Correct:

```js
greet();
```

---

## 3. `return` এবং `console.log` confuse করা

Wrong expectation:

```js
function sum(a, b) {
  console.log(a + b);
}

const result = sum(2, 3);
console.log(result);
```

Output:

```text
5
undefined
```

Correct:

```js
function sum(a, b) {
  return a + b;
}
```

---

## 4. `return` value next line-এ লেখা

Wrong:

```js
function sum(a, b) {
  return
  a + b;
}
```

Correct:

```js
function sum(a, b) {
  return a + b;
}
```

---

## 5. Missing argument handle না করা

Wrong:

```js
function calc(a, b) {
  return (a + b) * 2;
}

calc(2); // NaN
```

Correct:

```js
function calc(a = 0, b = 0) {
  return (a + b) * 2;
}
```

---

## 6. Rest parameter last না রাখা

Wrong:

```js
function test(...rest, x) {}
```

Correct:

```js
function test(x, ...rest) {}
```

---

## 7. Inner function বাইরে call করা

Wrong:

```js
function outer() {
  function inner() {}
}

inner();
```

Correct:

```js
function outer() {
  function inner() {}
  return inner;
}

const fn = outer();
fn();
```

---

## 8. Arrow function-এ `return` ভুলে যাওয়া

Wrong:

```js
const sum = (a, b) => {
  a + b;
};
```

Correct:

```js
const sum = (a, b) => {
  return a + b;
};
```

অথবা:

```js
const sum = (a, b) => a + b;
```

---

## 9. Recursion-এ base condition না দেওয়া

Wrong:

```js
function foo() {
  foo();
}
```

Correct:

```js
function foo(count) {
  if (count === 0) {
    return;
  }

  foo(count - 1);
}
```

---

# Assignment

Transcript-এ বলা হয়েছে Day 06-এর tasks repository-এর `task.md` file-এ দেওয়া আছে। Transcript-এ exact task list বলা হয়নি, তাই এখানে lesson-based practice assignments দেওয়া হলো।

---

## Assignment 1: Basic Function

একটি function লিখুন `greetUser`, যা একটি `name` parameter নেবে এবং return করবে:

```text
Hello <name>
```

Example:

```js
console.log(greetUser("Rahim"));
```

Expected output:

```text
Hello Rahim
```

---

## Assignment 2: Sum Function

`sum` নামে একটি function লিখুন যা দুইটি number parameter হিসেবে নিয়ে তাদের যোগফল return করবে।

```js
console.log(sum(10, 20)); // 30
```

---

## Assignment 3: Default Parameter

`calculatePrice` নামে function লিখুন:

- `price`
- `tax = 0`

দুইটি parameter থাকবে।  
Function return করবে:

```js
price + tax
```

Test:

```js
console.log(calculatePrice(100));      // 100
console.log(calculatePrice(100, 15));  // 115
```

---

## Assignment 4: Rest Parameter

`sumAll` নামে function লিখুন যা যতগুলো number argument দেওয়া হবে সবগুলোর sum return করবে।

```js
console.log(sumAll(1, 2, 3));       // 6
console.log(sumAll(10, 20, 30));    // 60
```

---

## Assignment 5: Callback Function

`processUserInput` নামে function লিখুন যা:

- একটি `name`
- একটি callback function

parameter হিসেবে নেবে।

তারপর callback-এর মধ্যে `name` pass করবে।

Example:

```js
function processUserInput(name, callback) {
  callback(name);
}

processUserInput("Karim", function (userName) {
  console.log("Welcome", userName);
});
```

Expected output:

```text
Welcome Karim
```

---

## Assignment 6: Pure Function

`multiplyByTwo` নামে pure function লিখুন যা একটি number নিয়ে double return করবে।

```js
console.log(multiplyByTwo(5)); // 10
```

Rule:

- function বাইরের কোনো variable-এর উপর depend করবে না
- same input দিলে same output দেবে

---

## Assignment 7: Higher Order Function

`createMultiplier` নামে function লিখুন যা একটি number নেবে এবং একটি new function return করবে।

Example:

```js
const double = createMultiplier(2);
console.log(double(5)); // 10

const triple = createMultiplier(3);
console.log(triple(5)); // 15
```

Hint:

```js
function createMultiplier(multiplier) {
  return function (number) {
    return number * multiplier;
  };
}
```

---

## Assignment 8: Arrow Function

নিচের regular function-কে arrow function-এ convert করুন:

```js
function square(number) {
  return number * number;
}
```

Expected:

```js
const square = (number) => number * number;
```

---

## Assignment 9: IIFE

একটি IIFE লিখুন যা immediately print করবে:

```text
App initialized
```

---

## Assignment 10: Recursion

`countDown` নামে recursive function লিখুন যা 5 থেকে 0 পর্যন্ত print করবে।

Expected output:

```text
5
4
3
2
1
0
Done
```

Hint:

```js
function countDown(count) {
  if (count < 0) {
    console.log("Done");
    return;
  }

  console.log(count);
  countDown(count - 1);
}
```

---

# Final Summary

এই lesson থেকে সবচেয়ে গুরুত্বপূর্ণ বিষয়গুলো:

1. Function repeated code কমায় এবং reusability তৈরি করে।
2. Function define করতে `function` keyword ব্যবহার করা যায়।
3. Function execute করতে function name-এর পরে `()` দিতে হয়।
4. Function variable-এ assign করা যায়, এটাকে function expression বলে।
5. Parameter হলো function definition-এর placeholder।
6. Argument হলো function call-এর actual value।
7. `return` function থেকে value বাইরে পাঠায় এবং execution stop করে।
8. Default parameter missing argument-এর problem solve করে।
9. Rest parameter unknown number of arguments array হিসেবে ধরে।
10. Nested function হলো function-এর ভিতরে function।
11. Callback function অন্য function-এ argument হিসেবে pass হয়।
12. Pure function same input দিলে same output দেয়।
13. Higher order function function receive বা return করতে পারে।
14. Arrow function modern shorter syntax।
15. IIFE declare করার সাথে সাথে execute হয়।
16. Call stack function execution track করে।
17. Recursion হলো function নিজেকে call করা।
18. Recursion-এ base condition না থাকলে maximum call stack error হতে পারে।

---

# Practice Checklist

## Function Basics

- [ ] Function কী বুঝি
- [ ] Function কেন দরকার বুঝি
- [ ] Function declaration লিখতে পারি
- [ ] Function call করতে পারি
- [ ] Function naming convention বুঝি

## Function Expression

- [ ] Function variable-এ assign করতে পারি
- [ ] Function expression call করতে পারি
- [ ] Function value এবং function execution-এর difference বুঝি

## Parameter, Argument, Return

- [ ] Parameter কী বুঝি
- [ ] Argument কী বুঝি
- [ ] Parameter vs argument explain করতে পারি
- [ ] `return` ব্যবহার করতে পারি
- [ ] `return` ও `console.log`-এর difference বুঝি
- [ ] `return` new line mistake এড়াতে পারি

## Advanced Parameters

- [ ] Default parameter লিখতে পারি
- [ ] Missing argument হলে কী হয় বুঝি
- [ ] Rest parameter লিখতে পারি
- [ ] Rest parameter array দেয় বুঝি
- [ ] Rest parameter last রাখতে হয় জানি

## Nested, Callback, HOF

- [ ] Nested function লিখতে পারি
- [ ] Inner function-এর scope বুঝি
- [ ] Callback function লিখতে পারি
- [ ] Anonymous function বুঝি
- [ ] Higher order function explain করতে পারি

## Pure Function

- [ ] Pure function কী বুঝি
- [ ] Side effect কী বুঝি
- [ ] Pure ও impure function আলাদা করতে পারি

## Arrow Function এবং IIFE

- [ ] Arrow function syntax লিখতে পারি
- [ ] Implicit return বুঝি
- [ ] Curly braces থাকলে explicit return লাগে বুঝি
- [ ] IIFE লিখতে পারি
- [ ] IIFE-তে argument pass করতে পারি

## Call Stack এবং Recursion

- [ ] Call stack কী বুঝি
- [ ] Function call stack-এ ঢোকে ও বের হয় বুঝি
- [ ] Recursion কী বুঝি
- [ ] Base condition লিখতে পারি
- [ ] Maximum call stack error কেন হয় বুঝি

---

## Quick Revision Table

| Concept | Quick Reminder |
|---|---|
| Function | reusable code block |
| Function call | `functionName()` |
| Parameter | function definition-এর placeholder |
| Argument | function call-এর actual value |
| Return | function থেকে value পাঠায় |
| Default parameter | missing argument-এর fallback |
| Rest parameter | extra arguments array করে |
| Nested function | function-এর ভিতরে function |
| Callback | function passed as argument |
| Pure function | same input → same output |
| Higher order function | function নেয় বা return করে |
| Arrow function | shorter function syntax |
| IIFE | immediately executed function |
| Call stack | function execution tracker |
| Recursion | function নিজেকে call করে |

---

## শেষ কথা

Function JavaScript-এর core foundation।  
পরবর্তী topic যেমন `scope`, `closure`, `this`, `execution context`, `event loop`, `async JavaScript`, `DOM`, `React`—সব জায়গায় function-এর গভীর ব্যবহার আছে।

তাই function শুধু syntax হিসেবে না শিখে নিচের তিনটি প্রশ্ন সবসময় ভাবুন:

1. এই function কী input নিচ্ছে?
2. এই function কী output দিচ্ছে?
3. এই function কি pure, reusable, এবং readable?

> ভালো function ছোট, clear, predictable এবং reusable হয়।
