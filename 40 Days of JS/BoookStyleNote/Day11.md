# Day 11 — JavaScript Closure: বাংলায় Detailed Study Notes

> **Lesson focus:** JavaScript-এর `closure` কী, কেন দরকার, inner/outer function ও lexical scope-এর সাথে এর সম্পর্ক, count example, bank account real-world example, memory leak risk, timer এবং event handler-এ closure-এর ব্যবহার।  
> **Source:** Uploaded JavaScript tutorial transcript/text এবং দেওয়া code snippet অনুযায়ী তৈরি notes।  
> **Target reader:** Beginner student, future revision-এর জন্য।

---

## Table of Contents

1. [Lesson Overview](#lesson-overview)
2. [Prerequisite Concepts](#prerequisite-concepts)
3. [Closure কী?](#closure-কী)
4. [Inner Function, Outer Function এবং Scope](#inner-function-outer-function-এবং-scope)
5. [Lexical Scope দিয়ে Closure বোঝা](#lexical-scope-দিয়ে-closure-বোঝা)
6. [Closure Example 1: `outer()` এবং `inner()`](#closure-example-1-outer-এবং-inner)
7. [Closure Example 2: Count Remember করা](#closure-example-2-count-remember-করা)
8. [Private Variable এবং Data Encapsulation](#private-variable-এবং-data-encapsulation)
9. [Real World Example: Bank Account with Closure](#real-world-example-bank-account-with-closure)
10. [Function Factory with Closure](#function-factory-with-closure)
11. [Closure & Memory Leak](#closure--memory-leak)
12. [Advantages / Usefulness of Closure](#advantages--usefulness-of-closure)
13. [Timer Example](#timer-example)
14. [Closure in Event Handler](#closure-in-event-handler)
15. [Important Differences](#important-differences)
16. [Common Mistakes](#common-mistakes)
17. [Assignment Section](#assignment-section)
18. [Final Summary](#final-summary)
19. [Practice Checklist](#practice-checklist)
20. [Quick Revision Sheet](#quick-revision-sheet)

---

## Lesson Overview

এই lesson-এ JavaScript-এর একটি গুরুত্বপূর্ণ concept **Closure** শেখানো হয়েছে। ভিডিওর শুরুতে বলা হয়েছে, অনেক developer-কে যদি জিজ্ঞেস করা হয় JavaScript-এর complex topic কী, তারা সাধারণত **asynchronous JavaScript**, **memory management**, এবং **closure**-এর কথা বলবে। কিন্তু lesson-এর মূল message হলো:

> Closure শুনতে complex লাগলেও, যদি `scope`, `function`, `inner function`, `outer function`, `lexical environment`, এবং `lexical scoping` ভালোভাবে বোঝা থাকে, তাহলে closure আসলে খুব logical একটি concept।

এই lesson-এ closure শুধু definition হিসেবে নয়, practical example দিয়ে শেখানো হয়েছে:

- সাধারণ `outer()` / `inner()` function
- `count` value remember করার example
- real-world bank account / ATM-style example
- memory leak-এর risk
- timer example
- DOM event handler-এ closure

---

## Prerequisite Concepts

Closure বোঝার আগে কয়েকটি concept পরিষ্কার থাকা দরকার।

| Term | সহজ অর্থ | Closure-এর সাথে সম্পর্ক |
|---|---|---|
| `function` | reusable block of code | Closure নিজেই একটি function-based concept |
| `outer function` | যে function-এর ভিতরে আরেকটি function থাকে | outer function-এর variable closure remember করে |
| `inner function` | outer function-এর ভিতরে declared function | সাধারণত inner function-টাই closure হয় |
| `scope` | কোনো variable কোথা থেকে access করা যাবে তার rule | closure outer scope-এর variable access করে |
| `lexical scope` | code কোথায় physically লেখা আছে তার উপর ভিত্তি করে scope নির্ধারণ | inner function তার lexical parent-এর variable access করতে পারে |
| `lexical environment` | function তৈরি হওয়ার সময় তার surrounding variable environment | closure এই environment-এর reference ধরে রাখতে পারে |
| `reference` | কোনো value/object-এর memory location-এর link | closure outer variable-এর reference ধরে রাখে |
| `garbage collector` | unused memory clean করার mechanism | reference থাকলে memory clean হয় না |

### মনে রাখার নিয়ম

**Closure শেখার foundation হলো:**

```text
Function + Scope + Lexical Scope + Returned Inner Function = Closure বোঝার মূল রাস্তা
```

---

## Closure কী?

### সহজ ভাষায় definition

**Closure হলো এমন একটি function, যেটি তার outer function-এর variable remember করতে পারে, এমনকি outer function-এর execution শেষ হয়ে যাওয়ার পরেও।**

আরও সহজ করে:

```text
যে inner function outer function শেষ হওয়ার পরেও outer function-এর variable মনে রাখে, সেটাই closure।
```

### Technical definition

**A closure allows a function to access variables from its outer scope even after the outer scope has finished execution.**

বাংলায়:

> Closure একটি function-কে তার outer scope-এর variable access করার ক্ষমতা দেয়, outer scope-এর execution শেষ হয়ে গেলেও।

### Closure-এর ৩টি মূল অংশ

| অংশ | কী বোঝায় |
|---|---|
| Inner function | সাধারণত যে function variable remember করে |
| Outer variable | outer function-এর ভিতরে declared variable |
| Outer function execution শেষ | outer function call শেষ হলেও inner function variable access করতে পারে |

### ছোট diagram

```text
outer()
 ├── let x = 10
 └── inner()
      └── x access করে

outer() শেষ হয়ে গেলেও
inner() x মনে রাখে
```

### Common mistake

অনেকে ভাবে:

> “Outer function শেষ হয়ে গেলে তার সব variable মুছে যায়, তাই inner function আর variable পাবে না।”

Closure-এর কারণে এই ধারণা সবসময় ঠিক নয়। যদি inner function outer variable-এর reference ধরে রাখে এবং outer function সেই inner function return করে, তাহলে variable পুরোপুরি হারিয়ে যায় না।

### মনে রাখার নিয়ম

```text
Closure = function remembers its lexical scope
```

---

## Inner Function, Outer Function এবং Scope

### Outer function কী?

যে function-এর ভিতরে অন্য function থাকে, সেটিকে এখানে **outer function** বলা হচ্ছে।

### Inner function কী?

outer function-এর ভিতরে থাকা function হলো **inner function**।

```js
function outer() {
    function inner() {
        console.log("I am inner");
    }
}
```

এখানে:

- `outer()` হলো outer function
- `inner()` হলো inner function

### Scope rule

Inner function outer function-এর variable access করতে পারে।

```js
function outer() {
    let x = 10;

    function inner() {
        console.log(x);
    }

    inner();
}

outer(); // 10
```

এখানে `x` declared হয়েছে `outer()` function-এর ভিতরে। কিন্তু `inner()` function `x` access করতে পারছে, কারণ `inner()` lexically `outer()`-এর ভিতরে আছে।

### কিন্তু উল্টোটা সম্ভব নয়

Outer function inner function-এর ভিতরে declared variable directly access করতে পারে না।

```js
function outer() {
    function inner() {
        let secret = 100;
    }

    console.log(secret); // ReferenceError
}
```

### Table: Access rule

| কোথায় variable declared | কোথা থেকে access সম্ভব? | Result |
|---|---:|---|
| outer function-এর variable | inner function থেকে | সম্ভব |
| inner function-এর variable | outer function থেকে | সম্ভব নয় |
| global variable | function থেকে | সম্ভব |
| function local variable | global scope থেকে | সম্ভব নয় |

### Common mistake

```js
function outer() {
    function inner() {
        let x = 10;
    }

    console.log(x); // ভুল
}
```

`x` inner function-এর local variable, তাই outer function থেকে directly পাওয়া যাবে না।

### মনে রাখার নিয়ম

```text
Inner বাইরে তাকাতে পারে, কিন্তু outer ভিতরে ঢুকে দেখতে পারে না।
```

---

## Lexical Scope দিয়ে Closure বোঝা

`lexical` মানে code কোথায় লেখা আছে বা কোথায় physically placed আছে। JavaScript-এ function-এর scope অনেকাংশে নির্ধারিত হয় function কোথায় লেখা হয়েছে তার উপর ভিত্তি করে।

```js
function outer() {
    let x = 10;

    function inner() {
        console.log(x);
    }
}
```

এখানে `inner()` function code-এর দিক থেকে `outer()`-এর ভিতরে লেখা। তাই `inner()`-এর lexical scope-এর মধ্যে `outer()`-এর scope পড়ে।

### গুরুত্বপূর্ণ point

`inner()` function `x` access করতে পারে কারণ:

- `x` outer function-এর variable
- `inner()` outer function-এর ভিতরে declared
- JavaScript lexical scoping অনুসরণ করে

### তবে শুধু lexical scope থাকলেই closure প্রমাণ হয় না

যদি `inner()` function outer function-এর ভিতরেই execute হয়ে যায়, তখন আমরা শুধু lexical scope দেখলাম। Closure-এর সবচেয়ে গুরুত্বপূর্ণ অংশ হলো:

> outer function execution শেষ হওয়ার পরেও inner function outer variable access করতে পারে।

---

## Closure Example 1: `outer()` এবং `inner()`

### Video code

```js
console.log("Day 11 - Closure");

// Outer Inner
function outer() {
    let x = 10;

    return function inner() {
        console.log(x);
    };
}

const func = outer();
console.log(func());
```

> Note: Original snippet-এ comment-এ `Outher Inner` লেখা ছিল; correct spelling হলো `Outer Inner`। Logic একই।

### Step-by-step explanation

#### Step 1: `outer()` call হলো

```js
const func = outer();
```

এই line-এ `outer()` execute হয়।

#### Step 2: `outer()`-এর ভিতরে `x` তৈরি হয়

```js
let x = 10;
```

এখন `x` হলো outer function-এর local variable।

#### Step 3: `outer()` inner function return করে

```js
return function inner() {
    console.log(x);
};
```

এখানে `inner()` function return হচ্ছে, execute হচ্ছে না।

#### Step 4: `outer()` execution শেষ

`outer()` function শেষ হয়ে গেছে। Normally ভাবলে `x` হারিয়ে যাওয়ার কথা।

#### Step 5: কিন্তু `func` এখন `inner()` function ধরে রেখেছে

```js
const func = outer();
```

`func` variable-এর ভিতরে returned `inner()` function stored আছে।

#### Step 6: `func()` execute করলে `x` পাওয়া যায়

```js
func(); // 10
```

যদিও `outer()` execution শেষ, `inner()` এখনো `x` remember করে। এটাই closure।

### Important output detail

Code-এ আছে:

```js
console.log(func());
```

এখানে দুটি জিনিস হয়:

1. `func()` execute হয় এবং ভিতরের `console.log(x)` থেকে `10` print হয়।
2. `inner()` কোনো value `return` করে না, তাই `func()`-এর return value হলো `undefined`।
3. বাইরের `console.log(func())` সেই `undefined` print করে।

Expected console output:

```text
Day 11 - Closure
10
undefined
```

ভিডিওতে মূল focus ছিল `inner()` কীভাবে `x = 10` print করছে, অর্থাৎ closure behavior।

### Execution table

| Line / Action | কী হচ্ছে? | Result |
|---|---|---|
| `outer()` call | `x = 10` তৈরি হয় | outer scope তৈরি |
| `return inner` | inner function return হয় | `func` function পায় |
| outer execution শেষ | outer function আর active নয় | কিন্তু `x` reference থাকে |
| `func()` call | `inner()` execute হয় | `10` print |
| `console.log(func())` | `func()`-এর return print | `undefined` |

### Common mistake

#### Mistake 1: `func` আর `func()` এক ভাবা

```js
console.log(func);
```

এটি function definition দেখাবে।

```js
console.log(func());
```

এটি function execute করবে।

#### Mistake 2: outer execution শেষ মানেই variable reset ভাবা

Closure থাকলে variable reset হয় না; function তার lexical scope-এর variable reference ধরে রাখতে পারে।

### মনে রাখার নিয়ম

```text
outer() returns inner()
inner() remembers x
therefore func() can use x later
```

---

## Closure Example 2: Count Remember করা

এই example closure-এর memory power আরও পরিষ্কার করে।

### Code

```js
// Count Closure
function outerCount() {
    let count = 0;

    return function innerCount() {
        count++;
        console.log(count);
    };
}

const retVal = outerCount();

retVal(); // 1
retVal(); // 2
retVal(); // 3
```

### এখানে কী হচ্ছে?

`outerCount()` function-এর ভিতরে `count = 0` আছে। তারপর এটি `innerCount()` function return করছে।

```js
const retVal = outerCount();
```

এখন `retVal` হলো `innerCount()` function।

### কেন output 1, 2, 3?

প্রথম call:

```js
retVal();
```

- `count` ছিল `0`
- `count++` হওয়ার পর `1`
- print: `1`

দ্বিতীয় call:

```js
retVal();
```

- `count` আবার `0` থেকে শুরু হয় না
- closure আগের `count = 1` remember করেছে
- `count++` হয়ে `2`
- print: `2`

তৃতীয় call:

```js
retVal();
```

- আগের value ছিল `2`
- increment হয়ে `3`
- print: `3`

### State table

| Call | আগের `count` | `count++` এর পর | Output |
|---:|---:|---:|---:|
| 1st `retVal()` | 0 | 1 | 1 |
| 2nd `retVal()` | 1 | 2 | 2 |
| 3rd `retVal()` | 2 | 3 | 3 |

### মূল concept

Closure শুধু variable-এর initial value মনে রাখে না। Closure variable-এর **latest updated value** remember করতে পারে, কারণ inner function outer variable-এর reference ধরে রাখে।

### Important note: reference, not simple copy

এখানে `innerCount()` `count`-এর একটা আলাদা copy নিয়ে বসে নেই। এটি `count` variable-এর সাথে connected reference ধরে রেখেছে। তাই প্রতিবার update হলে পরের call-এ সেই updated value পাওয়া যায়।

### Common mistake

#### Mistake: ভাবা যে প্রতিবার `retVal()` call করলে `count = 0` হবে

না। কারণ `outerCount()` একবার execute হয়েছে:

```js
const retVal = outerCount();
```

এরপর `retVal()` call করলে শুধু returned inner function execute হচ্ছে। `outerCount()` আবার execute হচ্ছে না।

#### Contrast example

```js
outerCount()(); // 1
outerCount()(); // 1
outerCount()(); // 1
```

এখানে প্রতিবার নতুন করে `outerCount()` call হচ্ছে। তাই প্রতিবার নতুন closure এবং নতুন `count = 0` তৈরি হয়।

### মনে রাখার নিয়ম

```text
Same closure instance = same remembered variable
New outer function call = new closure + new variable
```

---

## Private Variable এবং Data Encapsulation

Closure-এর একটি বড় practical use হলো **private variable** তৈরি করা।

### Private variable কী?

Private variable হলো এমন variable যেটা বাইরে থেকে directly access করা যায় না, কিন্তু কিছু function/method-এর মাধ্যমে indirectly ব্যবহার করা যায়।

### Data Encapsulation কী?

**Data encapsulation** মানে private data সরাসরি expose না করে, controlled function/method দিয়ে সেই data ব্যবহার করতে দেওয়া।

Banking example দিয়ে বোঝানো হয়েছে:

- account-এর `balance` directly বাইরের user-এর হাতে দেওয়া উচিত নয়
- user deposit করতে পারবে
- user withdraw করতে পারবে
- user balance check করতে পারবে
- কিন্তু user directly `balance = 999999` করতে পারবে না

### Closure এখানে কেন perfect?

কারণ closure দিয়ে আমরা variable private রাখতে পারি, কিন্তু returned function/method-এর মাধ্যমে সেই variable ব্যবহার করতে পারি।

```text
Private data: balance
Public methods: deposit(), withdraw(), checkBalance()
```

### Common mistake

```js
const account = createBankAccount(100);
account.balance = 1000000; // এটা original private balance change করবে না
```

কারণ actual `balance` variable function scope-এর ভিতরে private থাকে। বাইরে থেকে নতুন `balance` property add করলেও closure-এর private `balance` বদলায় না।

### মনে রাখার নিয়ম

```text
Data লুকাও, behavior expose করো।
```

---

## Real World Example: Bank Account with Closure

এই lesson-এর সবচেয়ে গুরুত্বপূর্ণ real-world example হলো bank account / ATM application।

### Full code

```js
function createBankAccount(initialBalance) {
    let balance = initialBalance;

    return {
        deposit: (amount) => {
            balance = balance + amount;
            console.log("Deposited ", amount, " Current Balance ", balance);
        },

        withdraw: (amount) => {
            if (amount > balance) {
                console.warn("Insifficient Fund");
            } else {
                balance = balance - amount;
                console.log("Withdrawn ", amount, " Current Balance ", balance);
            }
        },

        checkBalance: () => console.log("Current Balance", balance),
    };
}

const tapaScriptAccount = createBankAccount(100);

console.log(tapaScriptAccount);

console.log(tapaScriptAccount.deposit(300)); // 400

console.log(tapaScriptAccount.withdraw(50)); // 350

console.log(tapaScriptAccount.withdraw(20)); // 330

console.log(tapaScriptAccount.withdraw(50)); // 280

console.log(tapaScriptAccount.withdraw(150)); // 130

console.log(tapaScriptAccount.checkBalance()); // 130
```

> Note: Code-এ `"Insifficient Fund"` spelling typo আছে। Correct spelling: `"Insufficient Fund"`। কিন্তু typo string হিসেবে কাজ করবে; logic নষ্ট হবে না।

### Function-এর structure

```js
function createBankAccount(initialBalance) {
    let balance = initialBalance;

    return {
        deposit: ...,
        withdraw: ...,
        checkBalance: ...
    };
}
```

এখানে:

- `initialBalance` function parameter
- `balance` private variable
- `return { ... }` একটি object return করছে
- object-এর তিনটি method:
  - `deposit`
  - `withdraw`
  - `checkBalance`

### `balance` কেন private?

`balance` declared হয়েছে `createBankAccount()` function-এর ভিতরে:

```js
let balance = initialBalance;
```

Function-এর বাইরে থেকে `balance` directly access করা যায় না। কিন্তু returned object-এর methods `balance` access করতে পারে, কারণ তারা closure।

### Returned object

```js
return {
    deposit: (amount) => { ... },
    withdraw: (amount) => { ... },
    checkBalance: () => ...
};
```

Object-এর key-value pair:

| Key | Value | কাজ |
|---|---|---|
| `deposit` | function | money add করে |
| `withdraw` | function | money deduct করে |
| `checkBalance` | function | current balance print করে |

### Method 1: `deposit`

```js
deposit: (amount) => {
    balance = balance + amount;
    console.log("Deposited ", amount, " Current Balance ", balance);
}
```

এটি:

1. `amount` নেয়
2. current `balance`-এর সাথে যোগ করে
3. updated balance print করে

Example:

```js
const tapaScriptAccount = createBankAccount(100);
tapaScriptAccount.deposit(300);
```

Calculation:

```text
Initial balance = 100
Deposit amount = 300
New balance = 100 + 300 = 400
```

Output:

```text
Deposited 300 Current Balance 400
```

### Method 2: `withdraw`

```js
withdraw: (amount) => {
    if (amount > balance) {
        console.warn("Insifficient Fund");
    } else {
        balance = balance - amount;
        console.log("Withdrawn ", amount, " Current Balance ", balance);
    }
}
```

এটি:

1. `amount` current `balance`-এর চেয়ে বেশি কি না check করে
2. বেশি হলে warning দেয়
3. না হলে balance থেকে amount deduct করে
4. updated balance print করে

Example:

```js
tapaScriptAccount.withdraw(50);
```

যদি current balance `400` হয়:

```text
400 - 50 = 350
```

Output:

```text
Withdrawn 50 Current Balance 350
```

### Method 3: `checkBalance`

```js
checkBalance: () => console.log("Current Balance", balance),
```

এটি current private `balance` print করে।

### Full execution trace

Initial:

```js
const tapaScriptAccount = createBankAccount(100);
```

| Step | Operation | Calculation | Balance |
|---:|---|---|---:|
| 1 | Account create | initial balance | 100 |
| 2 | `deposit(300)` | 100 + 300 | 400 |
| 3 | `withdraw(50)` | 400 - 50 | 350 |
| 4 | `withdraw(20)` | 350 - 20 | 330 |
| 5 | `withdraw(50)` | 330 - 50 | 280 |
| 6 | `withdraw(150)` | 280 - 150 | 130 |
| 7 | `checkBalance()` | print current | 130 |

### Important: `console.log(tapaScriptAccount.deposit(300))`

ভিডিও code-এ method call-গুলো আবার `console.log()`-এর ভিতরে রাখা হয়েছে:

```js
console.log(tapaScriptAccount.deposit(300));
```

এখানে method নিজেই ভিতরে `console.log()` করছে। কিন্তু method কোনো value `return` করছে না। তাই বাইরের `console.log()` অতিরিক্ত `undefined` print করতে পারে।

Better call:

```js
tapaScriptAccount.deposit(300);
tapaScriptAccount.withdraw(50);
tapaScriptAccount.checkBalance();
```

### Why this is closure?

`deposit`, `withdraw`, এবং `checkBalance`—তিনটিই `balance` variable access করছে। কিন্তু `balance` তাদের ভিতরে declared নয়। `balance` declared হয়েছে outer function `createBankAccount()`-এর ভিতরে।

`createBankAccount()` execution শেষ হয়ে যাওয়ার পরও এই methods `balance` access করতে পারে। তাই তারা closure।

### Closure এখানে কী benefit দিল?

| Requirement | Closure কীভাবে solve করল |
|---|---|
| balance private রাখতে হবে | `balance` function scope-এর ভিতরে রাখা হলো |
| deposit করতে হবে | returned `deposit()` method balance update করে |
| withdraw করতে হবে | returned `withdraw()` method balance update করে |
| balance check করতে হবে | returned `checkBalance()` method balance print করে |
| direct manipulation আটকাতে হবে | বাইরে থেকে `balance` পাওয়া যায় না |

### Common mistake

#### Mistake 1: Direct balance access করতে চাওয়া

```js
console.log(tapaScriptAccount.balance); // undefined
```

কারণ returned object-এ `balance` key নেই।

#### Mistake 2: Method return value নিয়ে confusion

```js
const result = tapaScriptAccount.deposit(300);
console.log(result); // undefined
```

`deposit()` balance print করে, কিন্তু balance return করে না।

#### Mistake 3: `withdraw()`-এ insufficient fund check ভুলে যাওয়া

```js
balance = balance - amount;
```

যদি check না করা হয়, balance negative হয়ে যেতে পারে।

#### Mistake 4: Object return না করে multiple function return করতে চাওয়া

JavaScript function একবারে একটাই value return করে। তাই multiple methods return করতে object ব্যবহার করা হয়েছে।

### মনে রাখার নিয়ম

```text
Bank account closure:
balance is hidden
methods are exposed
methods remember balance
```

---

## Function Factory with Closure

### Function factory কী?

Function factory এমন function যা অন্য function বা function-সমৃদ্ধ object তৈরি করে return করে।

Bank account example-এ:

```js
function createBankAccount(initialBalance) {
    let balance = initialBalance;

    return {
        deposit: (amount) => { ... },
        withdraw: (amount) => { ... },
        checkBalance: () => { ... }
    };
}
```

এটি একটি **factory**-এর মতো কাজ করছে, কারণ:

- account তৈরি করছে
- account-related methods তৈরি করছে
- প্রতিটি account-এর জন্য আলাদা private `balance` রাখছে

### Factory analogy

```text
Factory = জিনিস তৈরি করে
Function factory = function/method তৈরি করে
createBankAccount = bank account object তৈরি করে
```

### Multiple account example

```js
const accountA = createBankAccount(100);
const accountB = createBankAccount(500);

accountA.deposit(50);    // accountA balance = 150
accountB.withdraw(100);  // accountB balance = 400

accountA.checkBalance(); // 150
accountB.checkBalance(); // 400
```

### কেন accountA এবং accountB আলাদা?

কারণ `createBankAccount()` প্রতিবার call হলে নতুন lexical environment তৈরি হয়।

```text
accountA -> নিজের balance reference
accountB -> নিজের balance reference
```

এক account-এর closure অন্য account-এর balance change করে না।

### Common mistake

```js
const accountA = createBankAccount(100);
const accountB = accountA;
```

এখানে `accountB` নতুন account নয়। এটি `accountA`-এর same object reference। নতুন account চাইলে আবার `createBankAccount()` call করতে হবে।

### মনে রাখার নিয়ম

```text
New factory call = new private state
Same returned object = same private state
```

---

## Closure & Memory Leak

Closure খুব powerful, কিন্তু ভুলভাবে ব্যবহার করলে memory problem তৈরি হতে পারে।

### Video code

```js
function dealingWithBigData() {
    let bigData = new Array(10000000).fill("*");

    return function() {
        console.log(bigData[3]);
    };
}

const variable12 = dealingWithBigData();

console.log(variable12());
```

### এখানে কী হচ্ছে?

1. `dealingWithBigData()` call হলে huge array তৈরি হয়:

```js
let bigData = new Array(10000000).fill("*");
```

2. function একটি inner function return করে।

```js
return function() {
    console.log(bigData[3]);
};
```

3. returned function `bigData[3]` access করছে।

4. `variable12` returned function ধরে রাখছে।

```js
const variable12 = dealingWithBigData();
```

### কেন memory problem হতে পারে?

`bigData` খুব বড় array। outer function execution শেষ হলেও returned inner function `bigData` reference ধরে রেখেছে।

যতক্ষণ `variable12` আছে, ততক্ষণ `bigData` memory থেকে clean হবে না।

### Garbage collector-এর সাথে সম্পর্ক

Garbage collector সাধারণত এমন memory clean করে, যেটা আর কোথাও থেকে referenced নয়।

কিন্তু এখানে:

```text
variable12 -> returned function -> bigData reference
```

তাই `bigData` এখনও reachable। ফলে garbage collector এটাকে clean করবে না।

### Array এবং reference

`bigData` একটি array। JavaScript-এ array হলো non-primitive type। Non-primitive value সাধারণত reference হিসেবে manage হয়। Closure যদি সেই reference ধরে রাখে, পুরো বড় data structure memory-তে থেকে যেতে পারে।

### Common mistake

#### Mistake: শুধু একটা element দরকার, কিন্তু পুরো array close করে রাখা

```js
return function() {
    console.log(bigData[3]);
};
```

এখানে শুধু `bigData[3]` দরকার হলেও closure পুরো `bigData` array reachable রাখছে।

### Better thinking

যদি শুধু একটি value দরকার হয়, তাহলে বড় data directly close over না করে দরকারি value আলাদা করে নেওয়া যেতে পারে।

```js
function dealingWithBigDataMoreCarefully() {
    let bigData = new Array(10000000).fill("*");
    const fourthElement = bigData[3];

    return function() {
        console.log(fourthElement);
    };
}
```

এখানে returned function শুধু `fourthElement` ব্যবহার করছে। Conceptually এটি memory-friendly হতে পারে, কারণ huge array reference ধরে রাখা হচ্ছে না। Actual memory behavior JavaScript engine optimization-এর উপরও নির্ভর করতে পারে, কিন্তু coding intention পরিষ্কার।

### কখন careful হতে হবে?

| Situation | Closure use safe? | Comment |
|---|---|---|
| small counter state | হ্যাঁ | count/timer example ভালো |
| private balance | হ্যাঁ | bank account example perfect |
| large array/object hold করা | careful | memory leak risk |
| DOM element reference ধরে রাখা | careful | unused হলে cleanup দরকার |
| event listener remove না করা | careful | long-lived reference থাকতে পারে |

### মনে রাখার নিয়ম

```text
Closure variable বাঁচিয়ে রাখে।
যদি variable ছোট হয় — useful.
যদি variable huge হয় — dangerous হতে পারে.
```

---

## Advantages / Usefulness of Closure

ভিডিওতে closure-এর চারটি major usefulness বলা হয়েছে।

```js
// Usefulness of Closure

// 1. You can keep the variables private without exposing them.
// 2. You can stop variable pollution.
// 3. You can create a function factory.
// 4. You can keep a variable alive between multiple calls.
```

### Advantage table

| Advantage | সহজ explanation | Example |
|---|---|---|
| Private variable | variable বাইরে expose না করে function দিয়ে ব্যবহার করা | bank account `balance` |
| Stop variable pollution | global বা outer scope অযথা variable দিয়ে ভরিয়ে না ফেলা | `count` function-এর ভিতরে রাখা |
| Function factory | function/object তৈরি করে return করা | `createBankAccount()` |
| Keep variable alive | multiple call-এর মাঝে value মনে রাখা | `retVal()`, `timerInstance()` |

### 1. Private variables

```js
function secretHolder() {
    let secret = "hidden";

    return function() {
        console.log(secret);
    };
}
```

বাইরে থেকে `secret` directly access করা যায় না।

### 2. Stop variable pollution

Global variable ব্যবহার করলে সহজে conflict হতে পারে।

```js
let count = 0;

function increment() {
    count++;
}
```

এখানে `count` global। অন্য code accidentally change করতে পারে।

Closure-based approach:

```js
function createCounter() {
    let count = 0;

    return function() {
        count++;
        console.log(count);
    };
}
```

এখন `count` private।

### 3. Function factory

```js
function multiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

এখানে `multiplier()` factory-এর মতো কাজ করছে। `double` function `factor = 2` remember করে, `triple` function `factor = 3` remember করে।

### 4. Variable alive between multiple calls

```js
function timer() {
    let secs = 0;

    return function() {
        secs++;
        console.log("elapsed seconds", secs);
    };
}
```

প্রতিবার call-এ `secs` আগের value থেকে update হয়।

### Common mistake

Closure-এর সুবিধা দেখে সব জায়গায় closure ব্যবহার করা ঠিক নয়। যেখানে simple local variable যথেষ্ট, সেখানে unnecessarily closure ব্যবহার করলে code complex হতে পারে।

### মনে রাখার নিয়ম

```text
Closure is useful when you need private state + remembered state.
```

---

## Timer Example

Timer example দিয়ে দেখানো হয়েছে closure কীভাবে multiple calls-এর মাঝে value alive রাখে।

### Code

```js
function timer() {
    let secs = 0;

    return function() {
        secs++;
        console.log("elaspsed seconds ", secs);
    };
}

const timerInstance = timer();
timerInstance(); // 1
timerInstance(); // 2
timerInstance(); // 3
```

> Note: Original code-এ `"elaspsed"` typo আছে। Correct spelling: `"elapsed"`। Logic একই।

### Explanation

```js
const timerInstance = timer();
```

এই line-এ:

- `timer()` execute হয়
- `secs = 0` তৈরি হয়
- inner function return হয়
- `timer()` execution শেষ হয়
- কিন্তু returned function `secs` remember করে

প্রথম call:

```js
timerInstance();
```

- `secs` 0 থেকে 1
- output: 1

দ্বিতীয় call:

- `secs` 1 থেকে 2
- output: 2

তৃতীয় call:

- `secs` 2 থেকে 3
- output: 3

### Output

```text
elaspsed seconds 1
elaspsed seconds 2
elaspsed seconds 3
```

### State table

| Call | Previous `secs` | New `secs` | Console |
|---:|---:|---:|---|
| 1 | 0 | 1 | elapsed seconds 1 |
| 2 | 1 | 2 | elapsed seconds 2 |
| 3 | 2 | 3 | elapsed seconds 3 |

### Common mistake

```js
timer(); // শুধু returned function দেয়, কিন্তু execute করে না
```

Correct:

```js
const timerInstance = timer();
timerInstance();
```

অথবা:

```js
timer()(); // immediately returned function execute
```

### মনে রাখার নিয়ম

```text
timer() creates closure
timerInstance() uses closure
```

---

## Closure in Event Handler

ভিডিওতে DOM event handler-এ closure-এর practical example দেখানো হয়েছে।

### Code

```js
function setupButton() {
    let clickCount = 0;

    document.getElementById("myButton").addEventListener("click", function() {
        clickCount++;
        console.log(`Button clicked ${clickCount} times`);
    });
}

setupButton();
```

### HTML context

এই code কাজ করার জন্য HTML-এ এমন button থাকতে পারে:

```html
<button id="myButton">Click me</button>
```

### এখানে কী হচ্ছে?

```js
function setupButton() {
    let clickCount = 0;
    ...
}
```

`clickCount` হলো `setupButton()` function-এর local variable।

```js
document.getElementById("myButton")
```

এটি DOM থেকে `id="myButton"` থাকা button খুঁজে নেয়।

```js
.addEventListener("click", function() {
    clickCount++;
    console.log(`Button clicked ${clickCount} times`);
});
```

এখানে click event-এর জন্য একটি handler function দেওয়া হয়েছে।

### Event handler কেন closure?

Handler function `clickCount` access করছে। কিন্তু `clickCount` handler function-এর ভিতরে declared নয়; এটি outer function `setupButton()`-এর variable।

`setupButton()` execution শেষ হয়ে যায়। তবুও button click হলে handler function `clickCount` access করতে পারে। তাই handler function closure।

### Click trace

| User action | Previous `clickCount` | New `clickCount` | Output |
|---:|---:|---:|---|
| 1st click | 0 | 1 | Button clicked 1 times |
| 2nd click | 1 | 2 | Button clicked 2 times |
| 3rd click | 2 | 3 | Button clicked 3 times |
| 4th click | 3 | 4 | Button clicked 4 times |

### কেন প্রতিবার 1 হয় না?

কারণ `setupButton()` প্রতিটি click-এ আবার call হচ্ছে না। এটি একবার setup করে handler attach করেছে। এরপর click হলে same handler function execute হয়, এবং সেই handler closure-এর মাধ্যমে `clickCount`-এর latest value remember করে।

### DOM terms সহজভাবে

| Term | Meaning |
|---|---|
| `document` | browser-এর current HTML page-এর representation |
| `getElementById()` | নির্দিষ্ট `id` দিয়ে HTML element খুঁজে বের করে |
| `addEventListener()` | কোনো event ঘটলে কোন function run হবে তা set করে |
| `"click"` | button click event |
| event handler | event ঘটলে যে function run হয় |

### Common mistake

#### Mistake 1: Button DOM-এ না থাকা

```js
document.getElementById("myButton")
```

যদি HTML-এ `id="myButton"` না থাকে, তাহলে result `null` হতে পারে। তখন `addEventListener` call করলে error হবে।

#### Mistake 2: `setupButton()` call না করা

Function define করলেই event listener attach হয় না। Call করতে হবে:

```js
setupButton();
```

#### Mistake 3: প্রত্যেক click-এ count reset হবে ভাবা

`clickCount` reset হবে না, কারণ handler closure হিসেবে value remember করছে।

### মনে রাখার নিয়ম

```text
Event handler often remembers outer variables.
That remembered state is closure.
```

---

## Important Differences

### 1. Lexical Scope vs Closure

| Topic | Lexical Scope | Closure |
|---|---|---|
| Meaning | function কোথায় লেখা হয়েছে তার উপর scope নির্ভর করে | function outer scope-এর variable remember করে |
| কখন দেখা যায় | inner function outer variable access করলে | outer execution শেষ হওয়ার পরও access করলে |
| Example | `inner()` inside `outer()` | `outer()` returns `inner()` |
| Key idea | access rule | remembered reference |

### 2. Local Variable vs Closed-over Variable

| Topic | Local variable | Closed-over variable |
|---|---|---|
| কোথায় থাকে | function execution-এর সময় local scope-এ | closure reference ধরে রাখলে alive থাকে |
| execution শেষে | সাধারণত clean হতে পারে | reference থাকলে থেকে যায় |
| example | normal function-এর local `x` | `count`, `balance`, `clickCount` |

### 3. Function Reference vs Function Call

| Code | Meaning |
|---|---|
| `func` | function নিজে |
| `func()` | function execute |
| `console.log(func)` | function definition print |
| `console.log(func())` | function run করে return value print |

### 4. Public Property vs Private Closure Variable

| Topic | Public property | Private closure variable |
|---|---|---|
| Access | বাইরে থেকে direct access | বাইরে থেকে direct access নয় |
| Example | `account.balance` | `let balance` inside `createBankAccount()` |
| Safety | easily modified | controlled methods দিয়ে modify |

### 5. Normal Function vs Function Factory

| Topic | Normal function | Function factory |
|---|---|---|
| কাজ | কোনো কাজ করে return দেয় | function/method তৈরি করে return করে |
| state remember | সবসময় নয় | closure দিয়ে state remember করতে পারে |
| example | `add(a,b)` | `createBankAccount(initialBalance)` |

---

## Common Mistakes

### Mistake 1: Closure-কে শুধু “function return করা” ভাবা

Function return করলেই closure হয় না। Returned function যদি outer scope-এর variable access করে, তখন closure behavior meaningful হয়।

```js
function outer() {
    return function inner() {
        console.log("Hello");
    };
}
```

এখানে `inner()` outer variable access করছে না। তাই practical closure state নেই।

Closure example:

```js
function outer() {
    let x = 10;

    return function inner() {
        console.log(x);
    };
}
```

### Mistake 2: Closed variable প্রতিবার reset হবে ভাবা

```js
const retVal = outerCount();

retVal(); // 1
retVal(); // 2
retVal(); // 3
```

Same closure instance হলে variable reset হয় না।

### Mistake 3: Outer function বারবার call করা আর returned function বারবার call করা মিশিয়ে ফেলা

```js
const retVal = outerCount();
retVal();
retVal();
```

এখানে same closure।

```js
outerCount()();
outerCount()();
```

এখানে প্রতিবার new closure।

### Mistake 4: Method return করছে ভাবা

```js
console.log(tapaScriptAccount.deposit(300));
```

`deposit()` ভিতরে print করে, কিন্তু return নেই। তাই outer `console.log` `undefined` দেখাতে পারে।

### Mistake 5: Private variable বাইরে থেকে access করতে চাওয়া

```js
console.log(tapaScriptAccount.balance); // undefined
```

`balance` object-এর property নয়। এটি closure variable।

### Mistake 6: Huge data closure-এ ধরে রাখা

```js
function dealingWithBigData() {
    let bigData = new Array(10000000).fill("*");

    return function() {
        console.log(bigData[3]);
    };
}
```

Returned function `bigData` reference ধরে রাখলে memory clean নাও হতে পারে।

### Mistake 7: Event handler-এ closure চিনতে না পারা

অনেক সময় আমরা DOM event handler লিখি কিন্তু বুঝি না যে সেটা closure ব্যবহার করছে।

```js
function setupButton() {
    let clickCount = 0;

    button.addEventListener("click", function() {
        clickCount++;
    });
}
```

এখানে handler function `clickCount` close over করছে।

---

## Assignment Section

ভিডিওর শেষে বলা হয়েছে task complete করতে, GitHub repository থেকে task দেখতে, problem হলে Discord-এ discuss করতে, এবং complete করলে assignment channel-এ submit/post করতে। Transcript-এ exact task list দেওয়া নেই; তাই নিচের section দু’ভাগে সাজানো হলো।

### A. Video assignment instruction

ভিডিওর instruction অনুযায়ী:

1. GitHub repository-তে গিয়ে Day 11-এর task দেখতে হবে।
2. Task solve করতে হবে।
3. আটকে গেলে Discord/community-তে discuss করতে হবে।
4. Complete হলে assignment/task channel-এ post করতে হবে।

### B. Practice tasks based on this lesson

Future revision-এর জন্য নিচের closure-based tasks practice করা ভালো।

#### Task 1: Simple closure

একটি `outer()` function বানাও যেখানে `message = "Hello Closure"` থাকবে। `outer()` যেন একটি inner function return করে, এবং inner function message print করে।

Expected:

```text
Hello Closure
```

#### Task 2: Counter

`createCounter()` function বানাও, যা একটি function return করবে। প্রতিবার returned function call করলে count 1 করে বাড়বে।

Expected:

```js
const counter = createCounter();

counter(); // 1
counter(); // 2
counter(); // 3
```

#### Task 3: Bank account

`createBankAccount(initialBalance)` বানাও। এতে থাকবে:

- `deposit(amount)`
- `withdraw(amount)`
- `checkBalance()`

Rules:

- `balance` private থাকবে
- insufficient fund হলে warning print করবে
- direct `account.balance` দিয়ে balance পাওয়া যাবে না

#### Task 4: Timer

`timer()` function বানাও, যা প্রতিবার call করলে elapsed seconds count বাড়াবে।

Expected:

```js
const timerInstance = timer();

timerInstance(); // 1
timerInstance(); // 2
timerInstance(); // 3
```

#### Task 5: Button click counter

HTML button নিয়ে click count track করো।

```html
<button id="myButton">Click me</button>
```

```js
function setupButton() {
    let clickCount = 0;

    document.getElementById("myButton").addEventListener("click", function() {
        clickCount++;
        console.log(`Button clicked ${clickCount} times`);
    });
}

setupButton();
```

### Self-check questions

1. Closure কী?
2. Inner function কীভাবে outer variable access করে?
3. outer function execution শেষ হওয়ার পর variable কীভাবে available থাকে?
4. `retVal()` তিনবার call করলে 1, 2, 3 কেন আসে?
5. Bank account example-এ `balance` private কেন?
6. `console.log(tapaScriptAccount.deposit(300))` কেন `undefined` print করতে পারে?
7. Closure কীভাবে memory leak তৈরি করতে পারে?
8. Event handler-এ closure কোথায়?

---

## Final Summary

Closure JavaScript-এর একটি powerful concept। এর main idea হলো: **একটি function তার outer scope-এর variable remember করতে পারে, outer function execution শেষ হয়ে যাওয়ার পরেও।**

এই lesson-এ আমরা দেখেছি:

- Inner function outer function-এর variable access করতে পারে।
- Returned inner function outer function শেষ হওয়ার পরেও variable remember করতে পারে।
- `outer()` / `inner()` example-এ `x = 10` closure দিয়ে access হয়েছে।
- `outerCount()` example-এ `count` প্রতিবার reset হয়নি; 1, 2, 3 হয়েছে।
- Bank account example-এ `balance` private রাখা হয়েছে এবং `deposit`, `withdraw`, `checkBalance` methods দিয়ে controlled access দেওয়া হয়েছে।
- Closure দিয়ে function factory বানানো যায়।
- Closure variable alive রাখে, তাই huge data close over করলে memory leak হতে পারে।
- Timer example-এ `secs` multiple calls-এর মাঝে alive থেকেছে।
- Event handler-এ `clickCount` closure-এর মাধ্যমে button click count remember করেছে।

### Closure-এর এক লাইনের rule

```text
A closure is a function that remembers variables from its lexical scope even after the outer function has finished executing.
```

বাংলায়:

```text
Closure হলো এমন function, যেটা outer function শেষ হওয়ার পরেও outer variable মনে রাখে।
```

---

## Practice Checklist

নিজেকে check করার জন্য নিচের checklist follow করো।

### Concept checklist

- [ ] আমি inner function এবং outer function explain করতে পারি।
- [ ] আমি lexical scope কী বুঝি।
- [ ] আমি closure-এর simple definition বলতে পারি।
- [ ] আমি technical definition বলতে পারি।
- [ ] আমি বুঝি outer function execution শেষ হলেও closure variable remember করতে পারে।
- [ ] আমি `func` এবং `func()`-এর difference জানি।
- [ ] আমি বুঝি closure variable-এর latest value remember করতে পারে।
- [ ] আমি `outerCount()` example explain করতে পারি।
- [ ] আমি private variable ধারণা বুঝি।
- [ ] আমি data encapsulation closure দিয়ে explain করতে পারি।
- [ ] আমি bank account example line-by-line explain করতে পারি।
- [ ] আমি function factory কী বুঝি।
- [ ] আমি memory leak risk explain করতে পারি।
- [ ] আমি timer closure explain করতে পারি।
- [ ] আমি event handler closure explain করতে পারি।

### Coding checklist

- [ ] আমি `outer()` return `inner()` closure লিখতে পারি।
- [ ] আমি counter closure বানাতে পারি।
- [ ] আমি bank account closure বানাতে পারি।
- [ ] আমি private `balance` outside থেকে inaccessible রাখতে পারি।
- [ ] আমি object return করে multiple methods expose করতে পারি।
- [ ] আমি timer closure implement করতে পারি।
- [ ] আমি button click counter implement করতে পারি।
- [ ] আমি unnecessary closure avoid করতে পারি।
- [ ] আমি large data close over করার risk বুঝি।

---

## Quick Revision Sheet

### Closure formula

```text
Closure = Inner function + Outer variable + Remembered lexical environment
```

### Must-have idea

```text
Outer function execution শেষ
তবুও inner function outer variable access করতে পারে
```

### Example

```js
function outer() {
    let x = 10;

    return function inner() {
        console.log(x);
    };
}

const func = outer();
func(); // 10
```

### Counter output

```js
const retVal = outerCount();

retVal(); // 1
retVal(); // 2
retVal(); // 3
```

কারণ `count` reset হয় না; closure latest value remember করে।

### Bank account idea

```text
balance private
deposit/withdraw/checkBalance public
methods remember balance
```

### Memory warning

```text
Closure useful, but huge data close over করলে memory leak হতে পারে।
```

### Event handler idea

```text
Button click handler clickCount remember করে।
এটাই closure।
```

---

## Clean Reference Code

নিচে lesson-এর major code snippets এক জায়গায় দেওয়া হলো।

### 1. Basic closure

```js
function outer() {
    let x = 10;

    return function inner() {
        console.log(x);
    };
}

const func = outer();
func(); // 10
```

### 2. Counter closure

```js
function outerCount() {
    let count = 0;

    return function innerCount() {
        count++;
        console.log(count);
    };
}

const retVal = outerCount();

retVal(); // 1
retVal(); // 2
retVal(); // 3
```

### 3. Bank account closure

```js
function createBankAccount(initialBalance) {
    let balance = initialBalance;

    return {
        deposit: (amount) => {
            balance = balance + amount;
            console.log("Deposited ", amount, " Current Balance ", balance);
        },

        withdraw: (amount) => {
            if (amount > balance) {
                console.warn("Insufficient Fund");
            } else {
                balance = balance - amount;
                console.log("Withdrawn ", amount, " Current Balance ", balance);
            }
        },

        checkBalance: () => console.log("Current Balance", balance),
    };
}

const tapaScriptAccount = createBankAccount(100);

tapaScriptAccount.deposit(300);    // 400
tapaScriptAccount.withdraw(50);    // 350
tapaScriptAccount.withdraw(20);    // 330
tapaScriptAccount.withdraw(50);    // 280
tapaScriptAccount.withdraw(150);   // 130
tapaScriptAccount.checkBalance();  // 130
```

### 4. Memory leak caution

```js
function dealingWithBigData() {
    let bigData = new Array(10000000).fill("*");

    return function() {
        console.log(bigData[3]);
    };
}

const variable12 = dealingWithBigData();

variable12(); // *
```

### 5. Timer closure

```js
function timer() {
    let secs = 0;

    return function() {
        secs++;
        console.log("elapsed seconds ", secs);
    };
}

const timerInstance = timer();

timerInstance(); // 1
timerInstance(); // 2
timerInstance(); // 3
```

### 6. Closure in event handler

```js
function setupButton() {
    let clickCount = 0;

    document.getElementById("myButton").addEventListener("click", function() {
        clickCount++;
        console.log(`Button clicked ${clickCount} times`);
    });
}

setupButton();
```

---

## Final Memory Rule

```text
যদি কোনো function তার বাইরে থাকা variable ব্যবহার করে
এবং সেই function পরে execute হয়,
তাহলে সে variable-কে সঙ্গে নিয়ে চলে।
এই “সঙ্গে নিয়ে চলা” behavior-ই closure।
```
