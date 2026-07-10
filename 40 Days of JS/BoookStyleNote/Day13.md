# JavaScript Day 13 Study Notes  
## `this` Keyword: Global Context, Implicit Binding, Arrow Function, Explicit Binding, `new`, এবং Interview Problems

> **Course context:** এটি **40 Days of JavaScript** সিরিজের **Day 13**। Instructor শুরুতেই বলেছেন, JavaScript-এর `this` keyword বহু বছর ধরে developer-দের বিভ্রান্ত করে আসছে। একটি ছোট ভুলে code কাজ না-ও করতে পারে, অথবা আরও খারাপভাবে unexpected result দিতে পারে—যার কারণে সারাদিন debugging করতে হতে পারে। কিন্তু `this`-এর internal fundamental concept বুঝতে পারলে JavaScript mastery-এর একটি নতুন স্তর উন্মুক্ত হয়।

> **Instructor-এর opening analogy:** JavaScript-এর `this` keyword এমন এক বন্ধুর মতো, যে argument-এর সময় বারবার পক্ষ বদলায়—এক মুহূর্তে একপক্ষে, পরের মুহূর্তে অন্যপক্ষে। একইভাবে `this` কখনো একটি object-কে refer করে, কখনো `undefined`, আবার কখনো `window` object-কে refer করে। আসল লক্ষ্য হলো—কোন পরিস্থিতিতে `this` কাকে refer করছে এবং কেন করছে, সেটি rule দিয়ে বোঝা।

---

## Table of Contents

1. [Lesson Goals](#1-lesson-goals)
2. [`this` কী?](#2-this-কী)
3. [Core Mental Model](#3-core-mental-model)
4. [`this` in Global Scope](#4-this-in-global-scope)
5. [Binding কী?](#5-binding-কী)
6. [Implicit Binding](#6-implicit-binding)
   - Employee example
   - `getFullName()` example
   - Tom and Jerry example
7. [`this` inside a Standalone Function](#7-this-inside-a-standalone-function)
8. [Strict Mode এবং `this`](#8-strict-mode-এবং-this)
9. [`this` inside an Arrow Function](#9-this-inside-an-arrow-function)
10. [Object Method হিসেবে Arrow Function-এর সমস্যা](#10-object-method-হিসেবে-arrow-function-এর-সমস্যা)
11. [Arrow Function ব্যবহার করেই সমস্যার সমাধান](#11-arrow-function-ব্যবহার-করেই-সমস্যার-সমাধান)
12. [Closure এবং `this`-এর সম্পর্ক](#12-closure-এবং-this-এর-সম্পর্ক)
13. [Rules Recap](#13-rules-recap)
14. [Explicit Binding](#14-explicit-binding)
15. [`call()` Method](#15-call-method)
16. [`apply()` Method](#16-apply-method)
17. [`bind()` Method](#17-bind-method)
18. [`call`, `apply`, `bind` Comparison](#18-call-apply-bind-comparison)
19. [`new` Keyword এবং `this`](#19-new-keyword-এবং-this)
20. [Complete Situation Table](#20-complete-situation-table)
21. [Interview Question 1: Nested Regular Function](#21-interview-question-1-nested-regular-function)
22. [Interview Question 2: Detached Method](#22-interview-question-2-detached-method)
23. [Common Mistakes](#23-common-mistakes)
24. [Problem-Solving Algorithm](#24-problem-solving-algorithm)
25. [Interview Questions and Answers](#25-interview-questions-and-answers)
26. [Assignment / Task](#26-assignment--task)
27. [Final Summary](#27-final-summary)
28. [Practice Checklist](#28-practice-checklist)

---

# 1. Lesson Goals

এই lesson শেষে তুমি বুঝতে পারবে:

- `this` keyword-এর মূল উদ্দেশ্য কী
- Global scope-এ `this` কী value দেয়
- Object method-এ implicit binding কীভাবে কাজ করে
- Standalone regular function-এ `this` কী হয়
- Strict mode-এ behavior কেন বদলায়
- Arrow function কেন নিজস্ব `this` রাখে না
- Object-এর ভেতরে arrow function method হিসেবে ব্যবহার করলে কী সমস্যা হয়
- `call()`, `apply()`, এবং `bind()` দিয়ে explicit binding কীভাবে করা হয়
- Constructor function ও `new` keyword-এর সাথে `this` কীভাবে কাজ করে
- Nested function এবং detached method নিয়ে interview problem কীভাবে solve করতে হয়

Instructor বলেছেন, lesson-এর শেষে tricky questions solve করা হবে এবং task দেওয়া হবে, যাতে `this` keyword-এর উপর আরও শক্ত grip তৈরি হয়।

---

# 2. `this` কী?

Instructor-এর ব্যাখ্যার মূল বক্তব্য:

> **`this` is a keyword in JavaScript. Its main purpose is to help us understand the current execution context—particularly, the object context in which the code is running.**

সহজ বাংলায়:

`this` হলো JavaScript-এর একটি special keyword, যা runtime-এ current context-এর একটি reference দেয়।

Literal অর্থে `this` মানে “এইটি” বা “এটিই”। Programming context-এ এটি বোঝায়:

> “এই মুহূর্তে code কোন object/context-এর সাথে সম্পর্কিত হয়ে execute হচ্ছে?”

`this`-এর value দেখে অনেক সময় বোঝা যায়, code বর্তমানে কোন context-এর অধীনে চলছে। সেই অনুযায়ী business logic লেখা যায়।

## Important Definition

### `this`

`this` হলো এমন একটি keyword যার value execution-এর সময় নির্ধারিত হয় এবং সাধারণত current invocation context-কে নির্দেশ করে।

## খুব গুরুত্বপূর্ণ কথা

`this` কোথায় **লেখা হয়েছে**—এটি একমাত্র বিষয় নয়।

বরং দেখতে হবে:

- কোন function-এর ভিতরে `this` আছে
- সেই function কোথায় invoke হয়েছে
- function regular নাকি arrow
- method object-এর মাধ্যমে call হয়েছে কি না
- `call`, `apply`, বা `bind` ব্যবহার হয়েছে কি না
- strict mode চালু কি না
- `new` দিয়ে object তৈরি হচ্ছে কি না

---

# 3. Core Mental Model

Instructor বারবার যে mental model দিয়েছেন:

> কোনো function-এর ভিতরে `this` দেখলে প্রথমে function definition-এর দিকে তাকিয়ে final answer দেবে না। প্রথমে দেখবে function কোথায় এবং কীভাবে invoke হয়েছে।

এই lesson-এর কেন্দ্রীয় প্রশ্ন:

```text
এই function-টি কীভাবে call হয়েছে?
```

উদাহরণ:

```js
employee.getFullName();
```

এখানে method call হয়েছে `employee` object-এর উপর। তাই regular function হলে `this` হবে `employee`।

কিন্তু:

```js
const fn = employee.getFullName;
fn();
```

এখানে method-টি object থেকে detached হয়ে standalone function হিসেবে call হয়েছে। তাই আগের implicit binding হারিয়ে গেছে।

## মনে রাখার নিয়ম

> **Invocation determines `this` for regular functions.**  
> **Lexical location determines `this` for arrow functions.**

বাংলায়:

- Regular function-এর ক্ষেত্রে: কীভাবে call করা হয়েছে, সেটি দেখো।
- Arrow function-এর ক্ষেত্রে: কোথায় define করা হয়েছে, সেটি দেখো।

---

# 4. `this` in Global Scope

Instructor বলেন, একটি blank JavaScript file browser environment-এ load করলেও JavaScript একটি **Global Execution Context** তৈরি করে।

Browser environment-এ global execution context-এ পাওয়া যায়:

- `this`
- `window`

Lecture-এর classic browser script context অনুযায়ী:

```js
console.log(this);
```

Output:

```js
Window {...}
```

অর্থাৎ:

```js
this === window; // true
```

## Rule

> Browser-এর global level-এ `this` সাধারণত `window` object-কে refer করে।

Node/server-side environment-এর ক্ষেত্রে instructor `global` object-এর কথা উল্লেখ করেছেন।

## Example

```js
console.log("Global this:", this);
console.log(this === window);
```

Expected browser output:

```text
Global this: Window {...}
true
```

## সহজ ব্যাখ্যা

Global scope-এ কোনো নির্দিষ্ট object method-এর context নেই। Browser-এর global host object হলো `window`; তাই classic script context-এ global `this` → `window`।

## Common mistake

### ভুল ধারণা

```text
Global scope-এ `this` সব environment-এ একই object।
```

### সঠিক ধারণা

Environment এবং script type অনুযায়ী behavior আলাদা হতে পারে। এই lecture-এর উদাহরণ browser-এর regular/classic script context ধরে দেওয়া।

## মনে রাখার নিয়ম

> Browser global → `window`  
> Server-side Node context → environment-specific global behavior

---

# 5. Binding কী?

`this` কোন object/context-এর সাথে যুক্ত হবে—এই association-কে binding বলা হয়।

Instructor প্রশ্নের মাধ্যমে বিষয়টি তুলেছেন:

- কে bind হচ্ছে?
- কিসের সাথে bind হচ্ছে?
- `this` কোথায় bind হচ্ছে?

এই lecture-এ প্রধান binding types:

1. **Implicit Binding**
2. **Explicit Binding**
3. Arrow function-এর **Lexical `this`**
4. Constructor invocation-এর `new` binding

---

# 6. Implicit Binding

## Instructor-এর definition

> **Implicit binding is a way in which, if a method is called on an object using dot notation, the context of `this` is bound or associated with the object on which the method is invoked.**

সহজ বাংলায়:

যখন কোনো regular method-কে:

```js
object.method();
```

আকারে call করা হয়, তখন method-এর ভিতরের `this` সেই `object`-কে refer করে।

## Formula

```text
object.method()
       ↑
`this` = dot-এর বাম পাশের object
```

---

## 6.1 Employee Example

```js
const employee = {
  id: 1,
  firstName: "Alex",
  lastName: "B",

  returnThis: function () {
    return this;
  }
};

console.log(employee.id);
console.log(employee.returnThis());
```

Output-এর দ্বিতীয় অংশে পুরো `employee` object পাওয়া যাবে।

কারণ:

```js
employee.returnThis();
```

এখানে `returnThis()` method-টি `employee` object-এর উপর invoke হয়েছে।

তাই:

```js
this === employee;
```

## Execution reasoning

1. `returnThis` একটি function।
2. এটি object property-এর value হিসেবে আছে, তাই এটি method।
3. Call site হলো:

   ```js
   employee.returnThis();
   ```

4. Dot-এর বাম পাশে আছে `employee`।
5. Regular function method হওয়ায় implicit binding হবে।
6. তাই method-এর ভিতরের `this` → `employee`।

---

## 6.2 Object Property Access with `this`

যেহেতু method-এর ভিতরে:

```js
this === employee
```

তাই:

```js
this.id
```

সমতুল্য:

```js
employee.id
```

একইভাবে:

```js
this.firstName
```

সমতুল্য:

```js
employee.firstName
```

---

## 6.3 `getFullName()` Example

```js
const employee = {
  id: 1,
  firstName: "Alex",
  lastName: "B",

  getFullName: function () {
    return `${this.firstName} ${this.lastName}`;
  }
};

console.log(employee.getFullName());
```

Output:

```text
Alex B
```

## কেন?

Call site:

```js
employee.getFullName();
```

Implicit binding rule অনুযায়ী:

```js
this === employee;
```

তাই:

```js
this.firstName // "Alex"
this.lastName  // "B"
```

Final return:

```text
Alex B
```

## Common mistake

```js
const getName = employee.getFullName;
console.log(getName());
```

এখানে `getName()` আর `employee` object-এর উপর call হচ্ছে না। Method detached হয়ে গেছে। ফলে implicit binding হারিয়েছে।

## মনে রাখার নিয়ম

> Method-এর ভিতরে `this` কী হবে জানতে method কোথায় define হয়েছে তা নয়, method কীভাবে call হয়েছে তা দেখো।

---

## 6.4 Tom and Jerry Analogy

Instructor Tom and Jerry cartoon-এর example ব্যবহার করেছেন।

```js
const tom = {
  name: "Tom",
  age: 7
};

const jerry = {
  name: "Jerry",
  age: 3
};
```

এরপর একটি function object গ্রহণ করে তার মধ্যে নতুন method যোগ করে:

```js
function greetMe(obj) {
  obj.logMessage = function () {
    console.log(`${this.name} is ${this.age} years old`);
  };
}
```

Function call:

```js
greetMe(tom);
```

এখন `tom` object-এর shape হয়ে যায়:

```js
{
  name: "Tom",
  age: 7,
  logMessage: function () { ... }
}
```

তারপর:

```js
tom.logMessage();
```

Output:

```text
Tom is 7 years old
```

## কেন?

Call site:

```js
tom.logMessage();
```

তাই:

```js
this === tom;
```

এবার একই method যদি Jerry object-এ যোগ করা হয়:

```js
greetMe(jerry);
jerry.logMessage();
```

Output:

```text
Jerry is 3 years old
```

কারণ:

```js
this === jerry;
```

## গুরুত্বপূর্ণ শিক্ষা

Function-এর source code একই:

```js
function () {
  console.log(`${this.name} is ${this.age} years old`);
}
```

কিন্তু call object বদলানোর কারণে `this` বদলে গেছে।

```js
tom.logMessage();   // this → tom
jerry.logMessage(); // this → jerry
```

এটাই প্রমাণ করে:

> Regular function-এর `this` function কোথায় লেখা আছে তার উপর নয়; কীভাবে invoke হয়েছে তার উপর নির্ভর করে।

## যদি property না থাকে?

```js
const spike = {
  age: 5,
  logMessage: tom.logMessage
};

spike.logMessage();
```

এখানে:

```js
this === spike;
```

কিন্তু `spike.name` নেই। তাই output হতে পারে:

```text
undefined is 5 years old
```

## Common mistake

কেউ ভাবতে পারে, function প্রথমে `tom`-এর জন্য তৈরি হয়েছে বলে সবসময় `this` → `tom` থাকবে। এটি ভুল।

## মনে রাখার নিয়ম

> Dot-এর বাম পাশ বদলালে regular method-এর `this`-ও বদলায়।

---

# 7. `this` inside a Standalone Function

Object-এর method নয়—এমন regular function-কে এখানে standalone function বলা হয়েছে।

```js
function sayName() {
  console.log("this inside function:", this);
}

sayName();
```

Non-strict browser script context-এ instructor দেখান:

```text
Window {...}
```

অর্থাৎ:

```js
this === window;
```

## কেন এটি function object-কে refer করে না?

```js
function sayName() {
  console.log(this);
}
```

`this` কখনো `sayName` function object নিজেকেই automatically refer করে না।

Call site:

```js
sayName();
```

এখানে কোনো owner object নেই:

```js
someObject.sayName();
```

এরকম call নয়। তাই non-strict browser behavior-এ default binding global object-এর দিকে যায়।

---

## 7.1 Nested Function Example

```js
function outer(a) {
  console.log("this inside outer:", this);

  function inner(b) {
    console.log("this inside inner:", this);
  }

  return inner;
}

const outerResult = outer(2);
outerResult(3);
```

Non-strict browser context-এ instructor দেখান:

- `outer()`-এর ভিতরে `this` → `window`
- `inner()`-এর ভিতরেও `this` → `window`

## গুরুত্বপূর্ণ সংশোধিত mental model

প্রথমে মনে হতে পারে inner function-এর `this` তার lexical outer function-কে refer করবে।

কিন্তু regular function-এর `this` lexical scope অনুসরণ করে না।

```js
outerResult(3);
```

এটি standalone call। তাই regular function invocation rule প্রযোজ্য।

## মনে রাখার নিয়ম

> Regular nested function outer function-এর `this` automatically inherit করে না।

---

# 8. Strict Mode এবং `this`

Strict mode চালু করতে file-এর শুরুতে লিখতে হয়:

```js
"use strict";
```

Instructor-এর ব্যাখ্যা অনুযায়ী strict mode JavaScript code-কে কিছু core rule মেনে চলতে বাধ্য করে এবং accidental mistake কমায়।

## Standalone function in strict mode

```js
"use strict";

function sayName() {
  console.log(this);
}

sayName();
```

Output:

```text
undefined
```

Nested standalone function-এও:

```js
"use strict";

function outer() {
  console.log(this);

  function inner() {
    console.log(this);
  }

  inner();
}

outer();
```

Output:

```text
undefined
undefined
```

## Rule

| Situation | `this` |
|---|---|
| Standalone regular function, non-strict browser script | `window` |
| Standalone regular function, strict mode | `undefined` |

## কেন strict mode-এ `undefined`?

Non-strict mode accidental global binding করতে পারে। Strict mode এই silent fallback বন্ধ করে দেয়। ফলে owner ছাড়া standalone regular function call হলে `this` → `undefined`।

## Common mistake

```js
"use strict";

function showName() {
  console.log(this.name);
}

showName();
```

এখানে error হতে পারে:

```text
TypeError: Cannot read properties of undefined
```

কারণ `this` নিজেই `undefined`।

## মনে রাখার নিয়ম

> Strict mode + plain standalone regular function → `this` is `undefined`.

Instructor বলেন, real-world code অধিকাংশ সময় strict behavior-এর সাথে চলে; তাই standalone regular function-এর ক্ষেত্রে `undefined` ধরে reasoning করা গুরুত্বপূর্ণ।

---

# 9. `this` inside an Arrow Function

Arrow function-এর সবচেয়ে গুরুত্বপূর্ণ rule:

> **Arrow function does not have its own `this`.**

এটি surrounding lexical scope থেকে `this` নেয়।

## Instructor-এর rule

> Arrow function-এর ভিতরে `this` resolve করতে হলে দেখতে হবে arrow function কোথায় lexically defined, তারপর surrounding/parent scope-এর `this` নিতে হবে।

## Global Arrow Function Example

```js
"use strict";

const getFood = () => {
  return this;
};

console.log(getFood());
```

Lecture-এর browser classic script context-এ output:

```text
Window {...}
```

যদিও strict mode চালু, arrow function-এর ক্ষেত্রে standalone regular function-এর rule প্রযোজ্য নয়।

কারণ arrow function নিজস্ব `this` তৈরি করে না। এটি global lexical scope-এর `this` নেয়।

## Comparison

```js
"use strict";

function regularFn() {
  return this;
}

const arrowFn = () => {
  return this;
};

console.log(regularFn()); // undefined
console.log(arrowFn());   // surrounding lexical this
```

## Key distinction

### Regular function

`this` নির্ধারিত হয় call site দ্বারা।

### Arrow function

`this` নির্ধারিত হয় lexical definition location দ্বারা।

## মনে রাখার নিয়ম

> Regular function: **How was it called?**  
> Arrow function: **Where was it created?**

---

# 10. Object Method হিসেবে Arrow Function-এর সমস্যা

Instructor food object-এর example দেন:

```js
const food = {
  name: "Mango",
  color: "Yellow",

  getDescription: () => {
    return `${this.name} is ${this.color}`;
  }
};

console.log(food.getDescription());
```

অনেকে মনে করতে পারে output হবে:

```text
Mango is Yellow
```

কিন্তু তা হয় না।

Expected lecture result:

```text
undefined is undefined
```

## কেন?

Arrow function-এর নিজস্ব `this` নেই।

```js
getDescription: () => { ... }
```

Arrow function object literal-এর মধ্যে লেখা হলেও object literal নিজে lexical `this` scope তৈরি করে না।

Arrow function surrounding outer scope-এর `this` নেয়। Lecture-এর browser example-এ সেই outer scope global scope।

তাই:

```js
this === window;
```

এবং সাধারণত:

```js
window.name
window.color
```

প্রয়োজনীয় `Mango` ও `Yellow` values নয়।

## গুরুত্বপূর্ণ শিক্ষা

> Object-এর property হিসেবে arrow function লিখলেই সেটি implicit binding পাওয়া regular method-এর মতো আচরণ করে না।

## Common mistake

```js
const user = {
  name: "Rahim",
  greet: () => {
    console.log(this.name);
  }
};

user.greet();
```

ভুল expectation:

```text
Rahim
```

বাস্তবে `this` user object নয়।

---

## 10.1 Fix with Regular Function

```js
const food = {
  name: "Mango",
  color: "Yellow",

  getDescription: function () {
    return `${this.name} is ${this.color}`;
  }
};

console.log(food.getDescription());
```

Output:

```text
Mango is Yellow
```

কারণ:

```js
food.getDescription();
```

এখানে regular method call হয়েছে এবং implicit binding হয়েছে।

```js
this === food;
```

Modern shorthand:

```js
const food = {
  name: "Mango",
  color: "Yellow",

  getDescription() {
    return `${this.name} is ${this.color}`;
  }
};
```

---

# 11. Arrow Function ব্যবহার করেই সমস্যার সমাধান

Instructor একটি challenge দেন:

> Regular function ব্যবহার না করে arrow function রেখেই `Mango is Yellow` print করতে হবে।

মূল ভুল code:

```js
const food = {
  name: "Mango",
  color: "Yellow",

  getDescription: () => {
    return `${this.name} is ${this.color}`;
  }
};
```

সমাধানের idea:

Arrow function-কে এমন একটি regular method-এর ভিতরে define করতে হবে, যার `this` implicit binding-এর মাধ্যমে `food` হবে।

```js
const food = {
  name: "Mango",
  color: "Yellow",

  getDescription: function () {
    return () => {
      return `${this.name} is ${this.color}`;
    };
  }
};
```

এখন:

```js
const descriptionFn = food.getDescription();
console.log(descriptionFn());
```

Output:

```text
Mango is Yellow
```

## Step-by-step reasoning

### Step 1

```js
food.getDescription();
```

`getDescription` হলো regular method।

Implicit binding:

```js
this === food;
```

### Step 2

Method-এর ভিতরে arrow function তৈরি হয়েছে:

```js
() => `${this.name} is ${this.color}`
```

Arrow function-এর নিজস্ব `this` নেই।

### Step 3

Arrow function lexical parent থেকে `this` নেয়।

তার lexical parent হলো `getDescription` method invocation-এর scope।

সেই scope-এ:

```js
this === food;
```

### Step 4

Method execution শেষ হলেও returned arrow function captured `this` ব্যবহার করতে পারে।

```js
descriptionFn();
```

ফলে:

```js
this.name  // "Mango"
this.color // "Yellow"
```

---

# 12. Closure এবং `this`-এর সম্পর্ক

Instructor এই example-কে closure-এর সাথে যুক্ত করেছেন।

```js
const food = {
  name: "Mango",
  color: "Yellow",

  getDescription: function () {
    return () => `${this.name} is ${this.color}`;
  }
};

const descriptionFn = food.getDescription();
descriptionFn();
```

`getDescription()` execution শেষ হয়ে গেছে। তবুও inner arrow function outer invocation-এর `this` access করছে।

এখানে arrow function lexical environment ধরে রাখছে।

## Closure reminder

> Outer function execution শেষ হওয়ার পরও inner function যদি outer scope-এর data access করতে পারে, সেটি closure-এর behavior।

এই example-এ inner arrow function lexical `this` ধরে রেখেছে।

## Important clarification

Arrow function কোনো নতুন `this` bind করে না। এটি surrounding context-এর `this` capture করে।

## মনে রাখার নিয়ম

> Regular method `this` পায় invocation থেকে; inner arrow সেই `this` lexicalভাবে ধরে রাখে।

---

# 13. Rules Recap

Instructor mid-lesson recap-এ যে rules পুনরায় বলেছেন:

## Rule 1: Global Scope

Browser classic script context:

```js
this === window;
```

## Rule 2: Standalone Regular Function

Strict mode:

```js
this === undefined;
```

Non-strict browser script:

```js
this === window;
```

## Rule 3: Implicit Binding

```js
obj.method();
```

Regular method হলে:

```js
this === obj;
```

## Rule 4: Arrow Function

Arrow function-এর নিজস্ব `this` নেই।

```js
const fn = () => this;
```

এটি lexical surrounding scope-এর `this` নেয়।

## Rule 5: Arrow Method in Object Literal

```js
const obj = {
  method: () => this
};
```

এখানে `this` সাধারণত `obj` নয়।

## Rule 6: Regular Method Returning Arrow

```js
const obj = {
  method() {
    return () => this;
  }
};
```

যদি `obj.method()` হিসেবে call হয়, returned arrow lexicalভাবে `obj`-এর `this` capture করতে পারে।

---

# 14. Explicit Binding

Implicit binding-এ function object-এর method হিসেবে call হয়।

কিন্তু function এবং object যদি সম্পূর্ণ আলাদা থাকে, তারপরও function-এর ভিতরের `this`-কে নির্দিষ্ট object-এর সাথে associate করতে চাইলে explicit binding ব্যবহার করা হয়।

## Instructor-এর definition

> **Explicit binding is binding the `this` keyword, or the value of `this`, to an external object that may otherwise be unrelated to the function.**

Explicit binding-এর methods:

1. `call()`
2. `apply()`
3. `bind()`

---

# 15. `call()` Method

ধরা যাক function এবং object আলাদা:

```js
function greeting() {
  console.log(`Hello ${this.name} belongs to ${this.address}`);
}

const user = {
  name: "TapasScript",
  address: "all of you"
};
```

`greeting` function `user` object-এর method নয়।

তবুও function-টিকে `user` context-এ চালাতে:

```js
greeting.call(user);
```

Output:

```text
Hello TapasScript belongs to all of you
```

## কী ঘটল?

```js
greeting.call(user);
```

এখানে `call()`:

- `greeting` function-কে immediately execute করে
- function-এর ভিতরে `this`-কে `user` object হিসেবে bind করে

অর্থাৎ execution-এর সময়:

```js
this === user;
```

---

## 15.1 `call()` with Arguments

```js
function likes(hobby1, hobby2) {
  console.log(`${this.name} likes ${hobby1}, ${hobby2}`);
}

const person = {
  name: "Tapas"
};

likes.call(person, "teaching", "blogging");
```

Output:

```text
Tapas likes teaching, blogging
```

## Argument mapping

```js
likes.call(person, "teaching", "blogging");
```

এখানে:

- প্রথম argument `person` → `this`
- দ্বিতীয় argument `"teaching"` → `hobby1`
- তৃতীয় argument `"blogging"` → `hobby2`

## Syntax

```js
functionName.call(thisArg, arg1, arg2, arg3);
```

## Common mistake

```js
likes.call("teaching", "blogging");
```

এখানে `"teaching"` `thisArg` হিসেবে চলে যাবে, hobby হিসেবে নয়।

## মনে রাখার নিয়ম

> `call()`-এর প্রথম argument সবসময় `this` binding-এর জন্য।

---

# 16. `apply()` Method

`apply()`-ও `call()`-এর মতো function-কে immediately execute করে এবং `this` bind করে।

মূল পার্থক্য:

- `call()` arguments comma-separated নেয়
- `apply()` arguments একটি array/array-like collection হিসেবে নেয়

```js
function likes(hobby1, hobby2) {
  console.log(`${this.name} likes ${hobby1}, ${hobby2}`);
}

const person = {
  name: "Tapas"
};

const hobbiesToApply = ["sleeping", "eating"];

likes.apply(person, hobbiesToApply);
```

Output:

```text
Tapas likes sleeping, eating
```

## Syntax

```js
functionName.apply(thisArg, [arg1, arg2, arg3]);
```

## Instructor-এর comparison

### `call()`

```js
likes.call(person, "teaching", "blogging");
```

### `apply()`

```js
likes.apply(person, ["sleeping", "eating"]);
```

## কখন সুবিধাজনক?

যখন arguments আগে থেকেই array আকারে আছে।

```js
const hobbies = ["reading", "coding", "traveling"];
```

তখন `apply()`-style invocation concise হতে পারে।

## Common mistake

```js
likes.apply(person, "sleeping", "eating");
```

এটি ভুল usage। দ্বিতীয় argument array/array-like হওয়া উচিত।

## মনে রাখার নিয়ম

> Apply → Arguments as Array.

---

# 17. `bind()` Method

`bind()`-এর সবচেয়ে গুরুত্বপূর্ণ পার্থক্য:

> `bind()` function-কে immediately execute করে না। এটি একটি নতুন bound function return করে।

Example:

```js
function newHobbies(hobby1, hobby2) {
  console.log(`${this.name} likes ${hobby1}, ${hobby2}`);
}

const officer = {
  name: "Bob"
};
```

`call()` ব্যবহার করলে:

```js
newHobbies.call(officer, "dancing", "singing");
```

এটি সঙ্গে সঙ্গে execute হবে।

`bind()` ব্যবহার করলে:

```js
const newFn = newHobbies.bind(officer, "dancing", "singing");
```

এখানে এখনো output হবে না।

পরে:

```js
newFn();
```

Output:

```text
Bob likes dancing, singing
```

## Syntax

```js
const boundFunction = originalFunction.bind(thisArg, arg1, arg2);
```

## Step-by-step

1. `newHobbies.bind(...)` call হয়।
2. `newHobbies` execute হয় না।
3. একটি নতুন function return হয়।
4. নতুন function-এর `this` permanently নির্দিষ্ট context-এর সাথে bound থাকে।
5. পরে নতুন function invoke করলে expected context পাওয়া যায়।

## কখন ব্যবহার করব?

যখন function এখন নয়, পরে execute করতে হবে।

Examples:

- Event handler
- Callback
- Timer callback
- Conditional execution
- Function অন্য জায়গায় pass করা
- Detached method-এর context preserve করা

## Common mistake

```js
newHobbies.bind(officer, "dancing", "singing");
```

শুধু এই line লিখে output আশা করা ভুল। Return হওয়া function invoke করতে হবে।

সঠিক:

```js
const fn = newHobbies.bind(officer, "dancing", "singing");
fn();
```

## মনে রাখার নিয়ম

> `bind()` binds now, runs later.

---

# 18. `call`, `apply`, `bind` Comparison

| Feature | `call()` | `apply()` | `bind()` |
|---|---|---|---|
| `this` explicitly set করে | হ্যাঁ | হ্যাঁ | হ্যাঁ |
| সঙ্গে সঙ্গে execute করে | হ্যাঁ | হ্যাঁ | না |
| Arguments format | Comma-separated | Array | Comma-separated / partially prefilled |
| Return value | Function-এর execution result | Function-এর execution result | নতুন bound function |
| প্রধান use case | এখনই specific context-এ call | Array arguments দিয়ে এখনই call | পরে specific context-এ call |

## One Example in Three Ways

```js
function introduce(city, country) {
  return `${this.name} lives in ${city}, ${country}`;
}

const user = {
  name: "Asha"
};
```

### `call()`

```js
const result1 = introduce.call(user, "Dhaka", "Bangladesh");
console.log(result1);
```

### `apply()`

```js
const result2 = introduce.apply(user, ["Dhaka", "Bangladesh"]);
console.log(result2);
```

### `bind()`

```js
const boundIntroduce = introduce.bind(user, "Dhaka", "Bangladesh");
const result3 = boundIntroduce();
console.log(result3);
```

তিনটিতেই final string একই হতে পারে। কিন্তু execution timing ও argument passing style আলাদা।

---

# 19. `new` Keyword এবং `this`

Instructor Day 12-এর object/constructor lesson-এর সাথে connection তৈরি করেছেন।

Constructor function:

```js
function Cartoon(name, animal) {
  this.name = name;
  this.animal = animal;

  this.log = function () {
    console.log(`${this.name} is a ${this.animal}`);
  };
}
```

Object creation:

```js
const tomCartoon = new Cartoon("Tom", "cat");
const jerryCartoon = new Cartoon("Jerry", "mouse");
```

Method calls:

```js
tomCartoon.log();
jerryCartoon.log();
```

Output:

```text
Tom is a cat
Jerry is a mouse
```

## `new` কী করে—এই lesson-এর context

`new Cartoon(...)` একটি নতুন object instance তৈরি করে এবং constructor execution-এর সময় `this` সেই নতুন object-কে refer করে।

Conceptually:

```js
this.name = name;
```

নতুন object-এর property set করে।

Tom instance-এর জন্য:

```js
this === tomCartoon;
```

Jerry instance-এর জন্য:

```js
this === jerryCartoon;
```

## Method call-এর সময়

```js
tomCartoon.log();
```

এটি implicit binding-ও তৈরি করে:

```js
this === tomCartoon;
```

একইভাবে:

```js
jerryCartoon.log();
```

এখানে:

```js
this === jerryCartoon;
```

## Constructor naming convention

Instructor উল্লেখ করেছেন constructor function-এর নাম capital letter দিয়ে শুরু করা হয়:

```js
function Cartoon() {}
```

এটি JavaScript-এর enforced syntax নয়, তবে প্রচলিত convention।

## Common mistake

```js
const tom = Cartoon("Tom", "cat");
```

`new` বাদ দিলে constructor-এর `this` expected নতুন instance হবে না। Strict mode-এ `this` undefined হওয়ার কারণে error-ও হতে পারে।

## মনে রাখার নিয়ম

> `new` call → constructor-এর `this` নতুন তৈরি হওয়া object।

---

# 20. Complete Situation Table

Instructor task হিসেবে এমন একটি table বানাতে বলেছেন, যেখানে এক column-এ situation এবং আরেক column-এ `this`-এর behavior থাকবে।

| Situation | Invocation / Definition | `this` কী হবে? |
|---|---|---|
| Browser global scope | Global level | `window` (lecture-এর classic script context) |
| Standalone regular function, non-strict | `fn()` | `window` |
| Standalone regular function, strict | `fn()` | `undefined` |
| Regular object method | `obj.method()` | `obj` |
| Same method, different object | `otherObj.method()` | `otherObj` |
| Detached regular method | `const fn = obj.method; fn()` | Object binding হারায়; strict mode-এ `undefined` |
| Arrow function | Lexically defined | নিজস্ব `this` নেই; surrounding lexical `this` নেয় |
| Arrow function directly as object property | `obj.method = () => ...` | সাধারণত `obj` নয়; outer lexical `this` |
| Arrow inside regular object method | `obj.method()` returns/uses arrow | Arrow outer method-এর `this` capture করে |
| `fn.call(obj)` | Explicit binding | `obj`; immediately executes |
| `fn.apply(obj, args)` | Explicit binding | `obj`; immediately executes |
| `fn.bind(obj)` | Explicit binding | নতুন bound function return করে |
| Constructor with `new` | `new Constructor()` | নতুন instance |
| Instance regular method | `instance.method()` | সেই instance |

---

# 21. Interview Question 1: Nested Regular Function

Code:

```js
const user = {
  name: "Tapas",

  greet: function () {
    function inner() {
      console.log(`Hello ${this.name}`);
    }

    inner();
  }
};

user.greet();
```

Question:

```text
Output কি "Hello Tapas" হবে?
```

## Answer

না। Non-strict browser context-এ `this` হবে `window`; strict mode-এ `this` হবে `undefined`।

## কেন?

Outer call:

```js
user.greet();
```

এখানে `greet` method-এর `this`:

```js
this === user;
```

কিন্তু `this` outer method-এ ব্যবহার করা হয়নি।

Inner function call:

```js
inner();
```

এটি standalone regular function call।

এটি:

```js
user.inner();
```

নয়।

তাই inner function implicit binding পায় না।

## Strict mode result

```js
"use strict";
```

থাকলে:

```js
this === undefined;
```

এবং:

```js
this.name
```

access করলে TypeError হতে পারে।

---

## 21.1 Fix with Arrow Function

```js
const user = {
  name: "Tapas",

  greet: function () {
    const inner = () => {
      console.log(`Hello ${this.name}`);
    };

    inner();
  }
};

user.greet();
```

Output:

```text
Hello Tapas
```

## Step-by-step

1. `user.greet()` → implicit binding
2. `greet`-এর ভিতরে `this === user`
3. `inner` arrow function-এর নিজস্ব `this` নেই
4. এটি `greet` scope-এর `this` capture করে
5. তাই `this.name` → `"Tapas"`

## Instructor-এর broader point

Arrow function শুধু syntax ছোট করার জন্য আনা হয়নি। Lexical `this` behavior nested callback/function context-এর বহু পুরোনো সমস্যা সহজ করে।

---

## Alternative Fixes

### `bind()`

```js
const user = {
  name: "Tapas",

  greet: function () {
    function inner() {
      console.log(`Hello ${this.name}`);
    }

    const boundInner = inner.bind(this);
    boundInner();
  }
};

user.greet();
```

### `call()`

```js
const user = {
  name: "Tapas",

  greet: function () {
    function inner() {
      console.log(`Hello ${this.name}`);
    }

    inner.call(this);
  }
};

user.greet();
```

### Old-style variable capture

```js
const user = {
  name: "Tapas",

  greet: function () {
    const self = this;

    function inner() {
      console.log(`Hello ${self.name}`);
    }

    inner();
  }
};

user.greet();
```

Lecture-এর preferred fix ছিল arrow function।

---

# 22. Interview Question 2: Detached Method

Code:

```js
const obj = {
  name: "John",

  greet: function () {
    console.log(`Hello ${this.name}`);
  }
};

const greetFn = obj.greet;
greetFn();
```

Question:

```text
Output কি "Hello John" হবে?
```

## Answer

না।

## কেন?

এই line-এ:

```js
const greetFn = obj.greet;
```

Function reference নেওয়া হয়েছে, execute করা হয়নি।

পরে:

```js
greetFn();
```

এটি global/standalone invocation।

Call site-এ আর `obj.` নেই।

তাই implicit binding হারিয়েছে।

## Contrast

### Attached call

```js
obj.greet();
```

এখানে:

```js
this === obj;
```

### Detached call

```js
const greetFn = obj.greet;
greetFn();
```

এখানে `this` আর `obj` নয়।

---

## 22.1 Fix with `call()`

```js
greetFn.call(obj);
```

Output:

```text
Hello John
```

কারণ explicit binding:

```js
this === obj;
```

---

## 22.2 Fix with `bind()`

```js
const boundGreet = obj.greet.bind(obj);
boundGreet();
```

Output:

```text
Hello John
```

## কখন কোনটি?

- একবার এখনই চালাতে চাইলে → `call()`
- function রেখে পরে চালাতে চাইলে → `bind()`

---

# 23. Common Mistakes

## Mistake 1: `this` function definition দেখে নির্ধারণ করা

ভুল:

```text
Function object-এর ভিতরে লেখা, তাই `this` object-ই হবে।
```

সঠিক:

- Regular function হলে call site দেখো।
- Arrow function হলে lexical definition দেখো।

---

## Mistake 2: Arrow function-কে object method হিসেবে ব্যবহার করে object expect করা

```js
const user = {
  name: "Mina",
  greet: () => console.log(this.name)
};
```

এখানে `this` user নয়।

### Fix

```js
const user = {
  name: "Mina",
  greet() {
    console.log(this.name);
  }
};
```

---

## Mistake 3: Nested regular function outer method-এর `this` inherit করবে ভাবা

```js
const user = {
  name: "Mina",
  greet() {
    function inner() {
      console.log(this.name);
    }

    inner();
  }
};
```

`inner()` standalone regular function।

### Fix

```js
const inner = () => {
  console.log(this.name);
};
```

---

## Mistake 4: Method detach করার পরও context থাকবে ভাবা

```js
const fn = user.greet;
fn();
```

Implicit binding হারায়।

### Fix

```js
const fn = user.greet.bind(user);
fn();
```

---

## Mistake 5: `bind()` সঙ্গে সঙ্গে function চালায় ভাবা

```js
user.greet.bind(user);
```

এটি নতুন function return করে, execute করে না।

### Fix

```js
const fn = user.greet.bind(user);
fn();
```

---

## Mistake 6: `call()` ও `apply()` argument style গুলিয়ে ফেলা

```js
fn.call(obj, a, b);
fn.apply(obj, [a, b]);
```

---

## Mistake 7: Strict mode ignore করা

Standalone regular function-এর ক্ষেত্রে:

- non-strict browser script → `window`
- strict mode → `undefined`

---

## Mistake 8: `this`-কে lexical variable ভাবা

Regular function-এর `this` সাধারণ variable lookup-এর মতো scope chain দিয়ে resolve হয় না।

Arrow function lexical `this` নেয়, regular function নয়।

---

## Mistake 9: `new` ছাড়া constructor call করা

```js
const item = Product("Pen");
```

Expected instance তৈরি নাও হতে পারে।

### Fix

```js
const item = new Product("Pen");
```

---

# 24. Problem-Solving Algorithm

কোনো `this` problem দেখলে নিচের order অনুসরণ করো।

## Step 1: `this` কোন function-এর ভিতরে আছে?

```js
function regular() {
  console.log(this);
}
```

নাকি:

```js
const arrow = () => {
  console.log(this);
};
```

---

## Step 2: Function arrow কি?

### যদি arrow হয়

- Call site দিয়ে own `this` নির্ধারিত হবে না।
- কোথায় lexically define হয়েছে দেখো।
- Surrounding scope-এর `this` নাও।

### যদি regular হয়

পরের steps দেখো।

---

## Step 3: `new` দিয়ে call হয়েছে?

```js
new Constructor();
```

হলে:

```js
this = new instance
```

---

## Step 4: `call`, `apply`, বা `bind` আছে?

```js
fn.call(obj);
fn.apply(obj, []);
fn.bind(obj);
```

হলে explicit binding অনুযায়ী `this = obj`।

---

## Step 5: Object method হিসেবে call হয়েছে?

```js
obj.fn();
```

হলে implicit binding:

```js
this = obj
```

---

## Step 6: Plain standalone call?

```js
fn();
```

হলে:

- strict → `undefined`
- non-strict browser script → `window`

---

## Step 7: Method detached হয়েছে কি?

```js
const fn = obj.method;
fn();
```

হলে `obj` binding হারিয়েছে।

---

## Decision Tree

```text
`this` দেখলাম
   |
   |-- Arrow function?
   |      |
   |      |-- হ্যাঁ → lexical parent-এর `this`
   |      |
   |      |-- না
   |          |
   |          |-- `new` দিয়ে call? → new instance
   |          |
   |          |-- call/apply/bind? → explicitly supplied object
   |          |
   |          |-- obj.method()? → obj
   |          |
   |          |-- plain fn()? → strict: undefined; non-strict browser: window
```

---

# 25. Interview Questions and Answers

## Q1. JavaScript-এ `this` কী?

`this` একটি runtime keyword, যা current execution/invocation context-এর reference দেয়। Regular function-এর ক্ষেত্রে call site এবং arrow function-এর ক্ষেত্রে lexical scope গুরুত্বপূর্ণ।

---

## Q2. Implicit binding কী?

যখন regular method `obj.method()` আকারে invoke হয়, method-এর ভিতরের `this` `obj`-এর সাথে implicitly bind হয়।

---

## Q3. Standalone regular function-এ `this` কী?

- Strict mode-এ `undefined`
- Non-strict browser classic script-এ `window`

---

## Q4. Arrow function-এর নিজস্ব `this` আছে?

না। Arrow function surrounding lexical scope থেকে `this` নেয়।

---

## Q5. কেন object method হিসেবে arrow function problematic হতে পারে?

কারণ arrow function object-এর call-site binding গ্রহণ করে না। এটি outer lexical `this` ব্যবহার করে, যা সাধারণত object নয়।

---

## Q6. `call()` কী করে?

নির্দিষ্ট object-কে `this` হিসেবে bind করে function-কে সঙ্গে সঙ্গে execute করে। Arguments comma-separated দেওয়া হয়।

---

## Q7. `apply()` কী করে?

`call()`-এর মতো immediately execute করে, তবে function arguments array আকারে নেয়।

---

## Q8. `bind()` কী করে?

নির্দিষ্ট `this` context-সহ একটি নতুন function return করে। সঙ্গে সঙ্গে execute করে না।

---

## Q9. Detached method কী?

Object method-এর function reference আলাদা variable-এ নিয়ে standalone call করলে method object context থেকে detached হয়।

```js
const fn = obj.method;
fn();
```

---

## Q10. Detached method কীভাবে fix করা যায়?

```js
const fn = obj.method.bind(obj);
fn();
```

অথবা immediate call:

```js
obj.method.call(obj);
```

---

## Q11. Nested regular function outer method-এর `this` পায় কি?

না, automatically পায় না। Nested regular function standalone call হলে তার নিজস্ব invocation rule প্রযোজ্য।

---

## Q12. Arrow function nested-method problem কীভাবে solve করে?

Arrow function outer method-এর lexical `this` capture করতে পারে।

---

## Q13. `new` keyword-এর সাথে `this` কী হয়?

Constructor call-এর সময় `this` নতুন তৈরি হওয়া instance-কে refer করে।

---

## Q14. `this` কি function declaration location দ্বারা সবসময় নির্ধারিত হয়?

না।

- Regular function → invocation/call site
- Arrow function → lexical definition location

---

## Q15. নিচের output কী?

```js
"use strict";

function test() {
  console.log(this);
}

test();
```

Answer:

```text
undefined
```

---

## Q16. নিচের output কী?

```js
const user = {
  name: "Nila",
  show() {
    console.log(this.name);
  }
};

user.show();
```

Answer:

```text
Nila
```

---

## Q17. নিচের output কেন expected নয়?

```js
const user = {
  name: "Nila",
  show: () => console.log(this.name)
};

user.show();
```

কারণ arrow function-এর নিজস্ব `this` নেই; `this` user object নয়।

---

## Q18. নিচের code কীভাবে ঠিক করবে?

```js
const user = {
  name: "John",
  greet() {
    function inner() {
      console.log(this.name);
    }

    inner();
  }
};
```

Arrow function:

```js
const user = {
  name: "John",
  greet() {
    const inner = () => {
      console.log(this.name);
    };

    inner();
  }
};
```

---

# 26. Assignment / Task

Instructor lesson শেষে task-এর গুরুত্ব দিয়েছেন এবং Discord-এ share করতে বলেছেন।

## Assignment 1: `this` Behavior Table

নিজের হাতে একটি table তৈরি করো।

Columns:

| Situation | Code Pattern | `this` Value | Reason |
|---|---|---|---|

অন্তর্ভুক্ত করবে:

- Global scope
- Standalone regular function
- Strict mode standalone function
- Object method
- Arrow function
- Arrow function inside object
- Arrow inside regular method
- `call()`
- `apply()`
- `bind()`
- Constructor with `new`
- Detached method

---

## Assignment 2: Predict Before Running

প্রতিটি code run করার আগে output লিখো।

### Problem A

```js
"use strict";

const person = {
  name: "Asha",

  showName() {
    console.log(this.name);
  }
};

person.showName();
```

---

### Problem B

```js
"use strict";

const person = {
  name: "Asha",

  showName: () => {
    console.log(this.name);
  }
};

person.showName();
```

---

### Problem C

```js
"use strict";

const person = {
  name: "Asha",

  showName() {
    const inner = () => {
      console.log(this.name);
    };

    inner();
  }
};

person.showName();
```

---

### Problem D

```js
"use strict";

const person = {
  name: "Asha",

  showName() {
    function inner() {
      console.log(this);
    }

    inner();
  }
};

person.showName();
```

---

### Problem E

```js
const person = {
  name: "Asha",

  showName() {
    console.log(this.name);
  }
};

const fn = person.showName;
fn.call(person);
```

---

### Problem F

```js
function show(skill1, skill2) {
  console.log(`${this.name}: ${skill1}, ${skill2}`);
}

const developer = {
  name: "Rafi"
};

show.apply(developer, ["JavaScript", "React"]);
```

---

### Problem G

```js
function showRole() {
  console.log(this.role);
}

const employee = {
  role: "Engineer"
};

const boundShowRole = showRole.bind(employee);
boundShowRole();
```

---

## Assignment 3: Fix the Bugs

### Bug 1

```js
const student = {
  name: "Nadia",
  printName: () => {
    console.log(this.name);
  }
};
```

Goal:

```text
Nadia
```

---

### Bug 2

```js
const student = {
  name: "Nadia",

  printName() {
    function inner() {
      console.log(this.name);
    }

    inner();
  }
};
```

Arrow function দিয়ে fix করো।

---

### Bug 3

```js
const student = {
  name: "Nadia",

  printName() {
    console.log(this.name);
  }
};

const print = student.printName;
print();
```

`bind()` ব্যবহার করে fix করো।

---

## Assignment 4: Build Your Own Examples

প্রতিটির জন্য নিজের example লিখো:

1. Implicit binding
2. Standalone strict-mode function
3. Arrow lexical `this`
4. `call()`
5. `apply()`
6. `bind()`
7. `new` binding
8. Detached method bug
9. Nested regular function bug
10. Nested arrow function fix

---

# 27. Final Summary

JavaScript-এর `this` random নয়। এর behavior rule-based।

সবচেয়ে গুরুত্বপূর্ণ দুইটি প্রশ্ন:

```text
1. Function regular নাকি arrow?
2. Function কীভাবে call হয়েছে / কোথায় define হয়েছে?
```

## Regular Function

Regular function-এর `this` সাধারণত invocation pattern দ্বারা নির্ধারিত হয়।

```js
obj.method();        // this → obj
fn.call(obj);        // this → obj
fn.apply(obj, []);   // this → obj
const b = fn.bind(obj); // পরে this → obj
new Constructor();   // this → new instance
fn();                // strict: undefined
```

## Arrow Function

Arrow function-এর নিজস্ব `this` নেই।

```js
const fn = () => this;
```

এটি lexical parent-এর `this` নেয়।

## Object Method

Regular method:

```js
const obj = {
  method() {
    return this;
  }
};
```

`obj.method()` করলে `this → obj`।

Arrow property:

```js
const obj = {
  method: () => this
};
```

এখানে `this` সাধারণত `obj` নয়।

## Nested Function

Regular nested function outer method-এর `this` automatically পায় না।

Arrow nested function outer method-এর `this` capture করতে পারে।

## Explicit Binding

- `call()` → এখনই execute, comma-separated args
- `apply()` → এখনই execute, array args
- `bind()` → নতুন function return, পরে execute

## `new`

Constructor invocation-এর সময় `this` নতুন instance।

## Instructor-এর শেষ takeaway

`this`-এর প্রতিটি situation-এর জন্য নির্দিষ্ট rule আছে। Rules লিখে রাখলে এবং invocation point দেখে reasoning করলে tricky interview question-ও শান্তভাবে solve করা সম্ভব।

---

# 28. Practice Checklist

নিচের প্রতিটি item confidently করতে পারলে lessonটি ভালোভাবে আয়ত্ত হয়েছে।

- [ ] আমি `this` keyword-এর উদ্দেশ্য নিজের ভাষায় ব্যাখ্যা করতে পারি।
- [ ] Global scope-এ `this` কী হয় বলতে পারি।
- [ ] Strict এবং non-strict standalone function-এর পার্থক্য জানি।
- [ ] Implicit binding-এর definition বলতে পারি।
- [ ] `obj.method()` দেখে `this` নির্ধারণ করতে পারি।
- [ ] Method detach হলে কেন context হারায় বুঝি।
- [ ] Arrow function-এর নিজস্ব `this` নেই—এটি ব্যাখ্যা করতে পারি।
- [ ] Object method হিসেবে arrow function-এর সমস্যা ধরতে পারি।
- [ ] Regular method-এর ভিতরে arrow function ব্যবহার করে lexical `this` preserve করতে পারি।
- [ ] `call()`, `apply()`, এবং `bind()`-এর পার্থক্য বলতে পারি।
- [ ] `bind()` যে সঙ্গে সঙ্গে execute করে না, সেটি মনে আছে।
- [ ] Constructor function-এ `new` binding বুঝি।
- [ ] Nested regular function-এর `this` bug fix করতে পারি।
- [ ] Detached method `call()` বা `bind()` দিয়ে fix করতে পারি।
- [ ] Code run করার আগে `this` predict করতে পারি।
- [ ] Situation বনাম `this` behavior table নিজে তৈরি করেছি।
- [ ] Assignment-এর সব code browser console-এ test করেছি।
- [ ] অন্তত পাঁচটি নিজস্ব `this` example লিখেছি।

---

## Ultra-Short Revision Card

```text
Global browser script:
this → window

Standalone regular function:
strict → undefined
non-strict browser → window

Regular method:
obj.method() → this = obj

Arrow function:
নিজস্ব this নেই
lexical parent-এর this নেয়

call:
এখনই চালায়, args comma-separated

apply:
এখনই চালায়, args array

bind:
নতুন bound function দেয়, পরে চালানো যায়

new:
this → new instance

Detached method:
implicit binding হারায়
```

---

> **Next lesson context:** Instructor বলেছেন, Day 14-এ JavaScript Universe-এর আরেকটি গুরুত্বপূর্ণ topic নিয়ে আলোচনা হবে। এই lesson-এর task সমাধান করে progress tracker-এ rules লিখে রাখতে এবং সমস্যা হলে discussion/community-তে প্রশ্ন করতে বলা হয়েছে।
