# JavaScript Error Handling: `try`, `catch`, `throw`, `finally` ও Custom Error

## কেন Error Handling শেখা জরুরি

Console-এ কখনো কি হতাশাজনক `Uncaught ReferenceError` বা `TypeError` দেখেছ? কখনো কি application হঠাৎ crash করেছে, অথচ কেন crash করেছে তার কোনো ধারণাই পাওনি? এমন অভিজ্ঞতা হলে চিন্তার কিছু নেই—তুমি একা নও।

এই অধ্যায়ে আমরা JavaScript-এর error handling নিয়ে গভীরভাবে আলোচনা করব, যাতে তুমি তুলনামূলকভাবে bug-free এবং production-ready code লিখতে পারো। এখানে “তুলনামূলকভাবে” কথাটি গুরুত্বপূর্ণ। কারণ অধিকাংশ developer-এর পক্ষেই code থেকে সব bug পুরোপুরি দূর করে দেওয়া প্রায় অসম্ভব। Bug থাকবেই; কিন্তু সেই bug কীভাবে খুঁজে বের করতে হয়, কীভাবে ঠিক করতে হয়, কোনো error কেন তৈরি হলো এবং সেই error কীভাবে সামলাতে হয়—এসব জানা জরুরি।

শুধু error ঠিক করলেই হবে না। Code-কে এমনভাবে সুরক্ষিত করতে হবে, যেন বিভিন্ন অপ্রত্যাশিত condition-এ application সম্পূর্ণ ভেঙে না পড়ে; বরং graceful উপায়ে error handle করে। অর্থাৎ logic লেখার সময়ই সম্ভাব্য error condition-গুলোর কথা ভাবতে হবে।

Error ঠিকভাবে handle না করলে application-এ নানা সমস্যা দেখা দিতে পারে:

- poor usability;
- application বা system crash;
- security risk;
- confusing output;
- end user-এর জন্য খারাপ experience;
- debugging কঠিন হয়ে যাওয়া।

Error handling ও exception handling সম্পর্কে পরিষ্কার ধারণা থাকলে এসব সমস্যার বড় অংশ সহজেই নিয়ন্ত্রণ করা যায়।

## এই অধ্যায়ে আমরা কী শিখব

এই lesson-এ আমরা ধারাবাহিকভাবে দেখব:

1. JavaScript-এ বিভিন্ন ধরনের error;
2. `try...catch` syntax;
3. `try` এবং `catch`-এর execution flow;
4. বাস্তবধর্মী কয়েকটি use case;
5. error `throw` করা বলতে কী বোঝায়;
6. rethrowing কী এবং throwing-এর সঙ্গে এর পার্থক্য;
7. `try`, `catch` ও `finally`—এই তিনটি একসঙ্গে কীভাবে কাজ করে;
8. কখন এবং কীভাবে custom error তৈরি করতে হয়;
9. তথাকথিত self-assignment operator নিয়ে গুরুত্বপূর্ণ সতর্কতা।

চলো শুরু করি।

---

# JavaScript-এ Error-এর প্রধান ধরন

JavaScript-এ broadly দুই ধরনের error দেখা যায়:

1. parsing error;
2. runtime error।

## Parsing Error

Parsing error সাধারণত syntactical error। Programming language-এর grammar ভেঙে গেলে JavaScript code-টি কীভাবে run করবে, তা বুঝতে পারে না। তখন JavaScript script-টি parse, interpret বা execute করতে পারে না।

এই ধরনের error handle করার বিশেষ সুযোগ নেই। প্রথমে syntax ঠিক করতে হবে এবং programming language-এর grammar অক্ষুণ্ণ রাখতে হবে। Syntax ঠিক না করা পর্যন্ত program চলবেই না।

## Runtime Error

Runtime error-এর ক্ষেত্রে code-এর syntax দেখতে সঠিক হয়। কিন্তু program run করার সময় কোনো value, situation বা condition-এর কারণে error তৈরি হয়।

অর্থাৎ syntax ঠিক আছে, কিন্তু execution-এর সময় expected result পাওয়া যাচ্ছে না। হয়তো তুমি কোনো ভুল value ব্যবহার করেছ, অথবা program-এর অন্য কোনো অংশ থেকে ভুল data এসেছে এবং সেই data ব্যবহার করতে গিয়ে error হয়েছে।

এই runtime error-গুলোকেই আমাদের handle করতে হবে। কারণ runtime error handle না করলে শুধু ভুল output নয়, পুরো application-ও crash করতে পারে। End user তখন white screen, black screen বা লাল রঙের `TypeError` message দেখতে পারে। কিন্তু সাধারণ user জানে না `TypeError` কী। সে application থেকে বের হয়ে অন্য কোনো service ব্যবহার করতে পারে। কোনো organization বা developer-ই এমন experience চাইবে না।

তাই code ও logic লেখার সময় error handling mechanism-ও সঙ্গে সঙ্গে যোগ করার অভ্যাস তৈরি করো।

## Exception কী

একটি সাধারণ interview question হতে পারে:

> JavaScript-এ exception কী?

সহজ উত্তর:

> Exception হলো এমন runtime error, যা program-এর স্বাভাবিক execution ব্যাহত করে।

এখন কয়েকটি error সরাসরি example দিয়ে দেখা যাক।

---

# সাধারণ JavaScript Error-এর উদাহরণ

## `ReferenceError`

ধরো, আমরা লিখলাম:

```js
console.log(x);
```

এখানে `x` নামে কিছু define করা হয়েছে কি? না। তাই JavaScript `x`-কে খুঁজে পাবে না। Expected error হবে:

```text
Uncaught ReferenceError: x is not defined
```

এটি যুক্তিসংগত, কারণ আমরা এমন একটি variable access করার চেষ্টা করছি, যা define-ই করা হয়নি। Temporal Dead Zone এবং hoisting নিয়ে আগের lesson-গুলোতে এ ধরনের আচরণ দেখা হয়েছে। সেই lesson miss করে থাকলে পরে দেখে নিতে পারো।

## `TypeError`

এবার লিখি:

```js
let obj = null;
console.log(obj.name);
```

এখানে আমরা বাস্তবে কোনো object তৈরি করিনি; `obj`-এর value হিসেবে `null` assign করেছি। এরপর nonexistent object থেকে `name` property access করার চেষ্টা করছি। তাই error হবে:

```text
Uncaught TypeError: Cannot read properties of null (reading 'name')
```

এটি একটি `TypeError`।

## `SyntaxError`

এবার closing parenthesis বাদ দিয়ে লিখি:

```js
console.log("Hi"
```

এখানে syntax অসম্পূর্ণ। তাই JavaScript code parse করতে পারবে না এবং এরকম error দেবে:

```text
Uncaught SyntaxError: missing ) after argument list
```

প্রতিটি error message-এ এখন `Uncaught` শব্দটি দেখা যাচ্ছে। পরে আমরা বুঝব `caught` এবং `uncaught` বলতে কী বোঝায়।

## `RangeError`

ভবিষ্যৎ lesson-এ আমরা `array` বিস্তারিত শিখব। আপাতত একটি array তৈরির example দেখি:

```js
let array = new Array(-1);
```

`new Array(length)` দিয়ে array তৈরি করলে `length` শূন্য বা ধনাত্মক integer হতে হবে। এখানে `-1` দেওয়া হয়েছে, যা valid range-এর বাইরে। তাই error হবে:

```text
Uncaught RangeError: Invalid array length
```

## `URIError`

URI encode বা decode করার সময় invalid URI ব্যবহার করলে `URIError` হতে পারে। অর্থাৎ URI-processing function এমন input পেয়েছে, যা valid URI হিসেবে process করা সম্ভব নয়।

## `EvalError`

JavaScript-এ `eval()` নামে expression evaluate করার একটি পুরোনো mechanism আছে। সাধারণভাবে `eval()` ব্যবহার না করার জোরালো পরামর্শ দেওয়া হয়, কারণ এটি JavaScript-এর problematic অংশগুলোর একটি এবং security ও maintainability সমস্যা তৈরি করতে পারে।

Invalid expression evaluate করার প্রসঙ্গে `EvalError` নামটি জানা দরকার। তবে এই lesson-এ `eval()` শেখানো হচ্ছে না।

## এখন পর্যন্ত error-এর তালিকা

আমরা দেখলাম:

- `ReferenceError`;
- `TypeError`;
- `SyntaxError`;
- `RangeError`;
- `URIError`;
- `EvalError`।

Code-এ ভুল থাকলে অথবা ভুল value নিয়ে কাজ করলে এ ধরনের error তৈরি হতে পারে। এখন প্রশ্ন হলো—এসব error handle করব কীভাবে?

---

# `try...catch` দিয়ে Error Handling

JavaScript আমাদের `try...catch` syntax দেয়। এর সাহায্যে runtime error catch করা যায়। ফলে application crash করার পরিবর্তে error সম্পর্কে তথ্য পাওয়া যায় এবং সেই অনুযায়ী ব্যবস্থা নেওয়া যায়।

ধরো, error হওয়ার আগেই তুমি error-টি ধরতে পারলে, বুঝতে পারলে কেন হয়েছে এবং user-কে একটি meaningful message বা alternative screen দেখাতে পারলে—এটি application crash করার চেয়ে অনেক ভালো experience। তাই `try...catch` এখানে গুরুত্বপূর্ণ রক্ষাকবচ।

## মৌলিক Syntax

```js
try {
  // logic বা code
} catch (err) {
  // error handle করার code
}
```

`catch`-এর `err` হলো error object-এর একটি instance। `try` block-এর ভেতরে যে error ঘটেছে, তার তথ্য এই object-এ থাকে। যেমন:

- error-এর type বা name;
- error message;
- stack trace;
- কোন call sequence-এর মাধ্যমে error এসেছে।

এই তথ্য ব্যবহার করে আমরা user-কে পরিষ্কার message দেখাতে পারি। যেমন, `RangeError` হলে বলা যায় যে user array তৈরির জন্য ভুল range দিয়েছে। Application crash না করিয়ে proper feedback দেওয়া যায়।

## `try...catch` Execution Flow

JavaScript line by line code execute করে। যখন `try` block পায়, তখন প্রথমে `try`-এর code execute করে।

### যদি কোনো error না হয়

- `try` block পুরোপুরি execute হবে;
- `catch` block সম্পূর্ণ ignore হবে;
- `catch`-এর কোনো code run করবে না।

### যদি `try` block-এ error হয়

- যে line-এ error হয়েছে, সেখানেই `try` block-এর execution থেমে যাবে;
- error-এর পরের line-গুলো execute হবে না;
- control সরাসরি `catch` block-এ যাবে;
- error object-এর মাধ্যমে error-এর detail পাওয়া যাবে;
- `catch` block-এর ভেতরে প্রয়োজনীয় handling করা যাবে।

এই rule-টি মনে রাখো:

> `try`-এর ভেতরে error হওয়ার মুহূর্তে সেই block-এর execution suspend হয় এবং control `catch`-এ চলে যায়।

## Error না হওয়ার Example

```js
try {
  console.log("Execution starts here");
  console.log("Execution ends here");
} catch (err) {
  console.error("An error has occurred", err);
}
```

এখানে error তৈরি করার মতো কিছু নেই। তাই expected output:

```text
Execution starts here
Execution ends here
```

`catch` block execute হবে না।

## Error হওয়ার Example

এবার মাঝখানে একটি undefined identifier লিখি:

```js
try {
  console.log("Execution starts here");
  ABC;
  console.log("Execution ends here");
} catch (err) {
  console.error("An error has occurred", err);
}
```

`ABC` কী? এটি define করা variable নয়, আবার কোনো assigned value-ও নয়। JavaScript এটিকে identifier বা variable হিসেবে ধরে access করতে চাইবে, কিন্তু এটি define করা নেই। তাই `ReferenceError` হবে।

Expected output:

```text
Execution starts here
An error has occurred ReferenceError: ABC is not defined
```

খেয়াল করো, নিচের line execute হয়নি:

```js
console.log("Execution ends here");
```

কারণ `ABC` line-এ error হওয়ার সঙ্গে সঙ্গে `try` block-এর execution থেমে গেছে এবং control `catch`-এ চলে গেছে।

---

# Error Object

Error object-কে আলাদাভাবে print করা যায়:

```js
try {
  console.log("Execution starts here");
  ABC;
  console.log("Execution ends here");
} catch (err) {
  console.error("An error has occurred");
  console.log(err);
}
```

Output-এ `err` object-এর value হিসেবে দেখা যাবে:

```text
ReferenceError: ABC is not defined
```

## `err.message`

শুধু human-readable message পেতে লিখতে পারি:

```js
console.log(err.message);
```

Expected output:

```text
ABC is not defined
```

এটি user-কে popup, toast বা অন্য কোনো UI message হিসেবে দেখানো যেতে পারে।

## `err.name`

Error-এর নাম জানতে:

```js
console.log(err.name);
```

যেমন output হতে পারে:

```text
ReferenceError
```

এই property থেকে বোঝা যায় error-টি `ReferenceError`, `TypeError`, `SyntaxError`, `RangeError` ইত্যাদির কোনটি।

## `err.stack`

```js
console.log(err.stack);
```

`stack` property current call stack-এর তথ্য দেয়। কোন function থেকে কোন function call হয়েছে এবং সেই call chain-এর কোথায় error হয়েছে—তা stack trace থেকে বোঝা যায়।

একটি simple file-এ error খুঁজে পাওয়া সহজ। কিন্তু বাস্তব application-এ code একটি function-এর ভেতরে থাকতে পারে, সেই function অন্য function থেকে call হতে পারে, সেটি অন্য file বা module থেকে call হতে পারে। তখন শুধু error-এর name ও message যথেষ্ট নয়। কোন call sequence-এর মাধ্যমে error এসেছে, তা জানা দরকার।

Stack trace debugging-এর জন্য অত্যন্ত গুরুত্বপূর্ণ। Browser DevTools-এ stack trace-এর file name ও line number-এ click করে source line-এ যাওয়া যায়, breakpoint বসানো যায় এবং debugging শুরু করা যায়।

Instructor উল্লেখ করেছেন যে ভবিষ্যতে Chrome DevTools এবং VS Code ব্যবহার করে JavaScript debugging-এর একটি comprehensive guide থাকবে।

## Course Progression সম্পর্কে পরিবর্তন

“40 Days of JavaScript” progress tracker অনুসরণ করলে একটি পরিবর্তন জানা দরকার। Day 14-এ আগে string এবং string method থাকার কথা ছিল। সেটি বদলে error handling আনা হয়েছে। কারণ string method ও number method পরে যেকোনো সময় শেখা যায়, কিন্তু পরবর্তী module JavaScript DOM নিয়ে এবং সেখানে প্রচুর error handling দরকার হবে। তাই DOM module-এর আগে error handling বোঝা বেশি জরুরি।

আরও একটি পরিবর্তন হলো, module-এর নির্দিষ্ট project day-এ শুধু project করার বদলে DevTools ও VS Code দিয়ে debugging শেখানো হবে। এরপর একটি project assignment দেওয়া হবে, যা learner নিজে করবে এবং ভবিষ্যৎ live session-এ আলোচনা করা হবে।

## `catch`-এ Error Parameter বাদ দেওয়া

কিছু code-এ `catch` parameter বাদ দেওয়া থাকতে পারে:

```js
try {
  console.log("Execution starts here");
  ABC;
} catch {
  console.error("An error occurred");
}
```

এটি valid JavaScript। JavaScript এখন optional catch binding সমর্থন করে। Error object সরাসরি ব্যবহার করার প্রয়োজন না থাকলে parameter না দিলেও `catch` block execute হবে।

তবে parameter না থাকলে `err.message`, `err.name` বা `err.stack` সরাসরি পাওয়া যাবে না। Browser console অনেক সময় source location দেখাতে পারে, কিন্তু programmatic handling-এর জন্য error object দরকার হতে পারে। Code review-এ এমন syntax দেখলে এটিকে ভুল ভেবো না।

---

# বাস্তব Use Case: Number Division

এখন বাস্তবধর্মী example দেখা যাক। Code-এর সঙ্গে practice করো, নিজের মতো পরিবর্তন করো এবং বারবার run করো। তবেই বিষয়টি ভালোভাবে আয়ত্ত হবে।

আমরা একটি function তৈরি করব, যার নাম `divideNumbers`। এটি `a` এবং `b`—দুটি parameter নেবে। এখন থেকে error-prone logic `try...catch`-এর মধ্যে লেখার অভ্যাস করব। Instructor-এর coding practice হলো শুরুতেই `try` ও `catch` block তৈরি করে নেওয়া, যাতে পরে error handling যোগ করতে ভুল না হয়।

Error parameter-এর নাম `err` বা `error`—দুটিই হতে পারে। `error` নামটি বেশি explicit।

## Division by Zero Problem

সাধারণভাবে:

```text
3 / 1 = 3
15 / 3 = 5
```

কিন্তু JavaScript-এ:

```js
console.log(2 / 0);
```

Output:

```text
Infinity
```

Mathematical convention অনুযায়ী JavaScript এখানে `Infinity` দেয়; runtime error throw করে না। কিন্তু তোমার application-এর জন্য `Infinity` meaningful নাও হতে পারে। হয়তো তুমি চাইছ `b` হিসেবে `0` দেওয়া সম্পূর্ণ নিষিদ্ধ হোক।

এখানে JavaScript নিজে error দেবে না, তাই আমাদের business rule অনুযায়ী নিজে error তৈরি করতে হবে। এখানেই `throw` দরকার।

---

# Error Throw করা

`throw` keyword ব্যবহার করে আমরা ইচ্ছাকৃতভাবে error বা exception ছুড়ে দিতে পারি।

আগের `ABC` example-এ JavaScript নিজে error throw করেছিল। কিন্তু division by zero example-এ JavaScript `Infinity` দেয়, error নয়। তাই আমাদের condition check করে নিজে error throw করতে হবে।

```js
function divideNumbers(a, b) {
  try {
    if (b === 0) {
      throw new Error("Division by zero is not allowed");
    }

    const result = a / b;
    console.log(`The result is ${result}`);
  } catch (error) {
    console.error("Got a math error:", error.message);
  }
}
```

## `Error` Constructor

JavaScript `Error` নামে একটি constructor function দেয়। `new` keyword ব্যবহার করে এর instance তৈরি করা যায়:

```js
const error = new Error("Division by zero is not allowed");
throw error;
```

একই কাজ এক line-এ:

```js
throw new Error("Division by zero is not allowed");
```

`Error` constructor message parameter নেয়। সেই message error object-এর `message` property-তে পাওয়া যায়।

## Valid Input

```js
divideNumbers(15, 3);
```

Execution:

1. `b === 0` false;
2. error throw হবে না;
3. `15 / 3` হবে;
4. result `5`;
5. `catch` execute হবে না।

Expected output:

```text
The result is 5
```

## Invalid Input

```js
divideNumbers(15, 0);
```

Execution:

1. `b === 0` true;
2. নতুন `Error` instance তৈরি হবে;
3. error throw হবে;
4. নিচের division ও `console.log` execute হবে না;
5. control সরাসরি `catch`-এ যাবে;
6. `error.message` print হবে।

Expected output:

```text
Got a math error: Division by zero is not allowed
```

Stack trace expand করলে দেখা যাবে কোন line থেকে `divideNumbers()` call হয়েছে এবং function-এর কোন line-এ error throw হয়েছে। এই nested call information debugging-এ খুব useful।

---

# আরও কিছু Error Handling Case

## Nested Property Access

একটি person object ধরি:

```js
const person = {
  name: "Tapas",
  address: {
    city: "Bangalore"
  }
};
```

এখন postal code access করার function লিখি:

```js
function getPostalCode(user) {
  try {
    console.log(user.address.postalCode);
  } catch (error) {
    console.error("Error accessing property:", error.message);
  }
}

getPostalCode(person);
```

`address` object আছে, কিন্তু `postalCode` property নেই। JavaScript কোনো existing object-এর missing property access করলে সাধারণত `undefined` দেয়। তাই output হবে:

```text
undefined
```

এখানে error throw হবে না।

কিন্তু যদি লিখি:

```js
function getPostalCode(user) {
  try {
    console.log(user.address.country.postalCode);
  } catch (error) {
    console.error("Error accessing property:", error.message);
  }
}
```

`user.address.country` হলো `undefined`। এরপর `undefined.postalCode` access করার চেষ্টা হচ্ছে। তাই `TypeError` হবে। Expected message:

```text
Error accessing property: Cannot read properties of undefined (reading 'postalCode')
```

এই example-এর মূল শিক্ষা হলো:

- existing object-এর missing property → `undefined`;
- `undefined` বা `null`-এর উপর আবার property access → `TypeError`।

## Age Validation

এবার একটি `validateAge` function লিখি:

```js
function validateAge(age) {
  try {
    if (isNaN(age)) {
      throw new Error("Invalid input: age must be a number");
    }

    console.log(`User's age is ${age}`);
  } catch (error) {
    console.error("Validation error:", error.message);
  }
}
```

Valid input:

```js
validateAge(30);
```

Expected output:

```text
User's age is 30
```

Invalid input:

```js
validateAge("Tapas");
```

`isNaN("Tapas")` true হবে। তাই custom message-সহ error throw হবে। Expected output:

```text
Validation error: Invalid input: age must be a number
```

Message আরও informative করা যায়:

```js
function validateAge(age) {
  try {
    if (isNaN(age)) {
      throw new Error(
        `Invalid input: age must be a number. Your input is ${age}`
      );
    }

    console.log(`User's age is ${age}`);
  } catch (error) {
    console.error("Validation error:", error.message);
  }
}
```

এখন output:

```text
Validation error: Invalid input: age must be a number. Your input is Tapas
```

এটি user experience উন্নত করে, কারণ user বুঝতে পারে সে কী ভুল input দিয়েছে এবং কী ধরনের input দেওয়া উচিত।

---

# Rethrowing Error

এখন পর্যন্ত আমরা শিখেছি:

- `try` block-এ logic লিখি;
- error হলে control `catch`-এ যায়;
- প্রয়োজনে নিজের error `throw` করি;
- `catch`-এ error handle করি।

এবার নতুন concept: rethrowing।

## Rethrowing কী

কখনো একটি function error catch করে কিছু local processing বা logging করতে পারে, কিন্তু final decision নিতে চায় না। তখন সেই error আবার caller-এর দিকে throw করে দেওয়া যায়। এটিই rethrowing।

অর্থাৎ:

1. নিচের স্তরের function error catch করে;
2. সেখানে প্রয়োজনীয় log বা partial handling করে;
3. একই error আবার `throw` করে;
4. উপরের স্তরের caller আবার সেটি catch করে;
5. caller আরও context-specific handling করে।

এটি তখন useful, যখন function নিজে ঠিক করতে চায় না user-কে কী দেখানো হবে; বরং top-level caller-কে সেই ক্ষমতা দিতে চায়।

## Form Validation Example

ধরো, registration বা login form-এ `username`, `email`, `password` ইত্যাদি আছে। Submit করার পর data একটি `formData` object-এ আসে। আমরা username ও email validate করব।

```js
function validateForm(formData) {
  try {
    if (!formData.username) {
      throw new Error("Username is mandatory");
    }

    if (!formData.email.includes("@")) {
      throw new Error("Invalid email format");
    }
  } catch (error) {
    console.error("Validation issue found:", error.message);
    throw error;
  }
}
```

এখানে দুটি validation আছে:

1. username না থাকলে `Username is mandatory`;
2. email-এ `@` না থাকলে `Invalid email format`।

এখন call করি:

```js
validateForm({
  username: "Tapas",
  email: "bad-email"
});
```

Username আছে, তাই প্রথম validation pass করবে। কিন্তু email-এ `@` নেই, তাই দ্বিতীয় validation error throw করবে। `catch` block প্রথমে log করবে:

```text
Validation issue found: Invalid email format
```

এরপর:

```js
throw error;
```

দিয়ে একই error আবার caller-এর দিকে পাঠানো হবে।

## কেন `throw new Error(error)` নয়

`catch`-এর `error` ইতিমধ্যেই একটি error instance। তাই rethrow করতে লিখি:

```js
throw error;
```

এখানে `new` দরকার নেই। `new Error(...)` ব্যবহার করা হয় নতুন error instance তৈরির সময়। Existing error পুনরায় throw করতে শুধু `throw error` যথেষ্ট।

## Caller-এর `try...catch`

Rethrown error handle করতে caller-কেও `try...catch` ব্যবহার করতে হবে:

```js
try {
  validateForm({
    username: "Tapas",
    email: "bad-email"
  });
} catch (error) {
  console.error(
    "Showing error message for user creation:",
    error.message
  );
}
```

Expected output:

```text
Validation issue found: Invalid email format
Showing error message for user creation: Invalid email format
```

Execution flow:

1. caller `validateForm()` call করে;
2. email validation fail করে;
3. `validateForm()`-এর `catch` local message log করে;
4. একই error rethrow করে;
5. caller-এর `catch` সেটি ধরে;
6. caller user-creation context অনুযায়ী নতুন message log করে।

## Common Mistake: Typo in `message`

Instructor-এর demonstration-এ `message` property-এর বানানে typo হওয়ায় `undefined` দেখা গিয়েছিল। যেমন:

```js
error.messag
```

বা অন্য ভুল spelling ব্যবহার করলে expected message পাওয়া যাবে না। সঠিক property:

```js
error.message
```

## Best Practice: Internal Log বনাম User-facing Message

তুমি প্রশ্ন করতে পারো—একই error-এর জন্য দুই জায়গায় message দেখানো দরকার কি?

দুটি function যদি স্বাধীনভাবে কাজ করে, তবে প্রত্যেকে নিজের context অনুযায়ী internal log রাখতে পারে। এতে debugging সহজ হয়। নিচের স্তরের function কোথায় error ধরেছে এবং top-level function কীভাবে সেটি handle করেছে—দুটিই DevTools-এ দেখা যায়।

কিন্তু user interface-এ প্রতিটি layer থেকে toast দেখানো উচিত নয়। তা হলে user একসঙ্গে অনেক red toaster দেখতে পারে। User experience খারাপ হবে।

এই rule মনে রাখো:

> Internal debugging-এর জন্য বিভিন্ন layer-এ log রাখা যায়, কিন্তু end user-কে সাধারণত top-level caller থেকে একটিমাত্র clear error message দেখানো উচিত।

---

# `finally`

`try` ও `catch`-এর সঙ্গে JavaScript-এ `finally` block ব্যবহার করা যায়। `finally` সাধারণত cleanup operation-এর জন্য ব্যবহৃত হয়।

```js
try {
  // risky code
} catch (error) {
  // error handling
} finally {
  // cleanup code
}
```

## `finally`-এর প্রধান Rule

> Error হোক বা না হোক, `finally` block execute হবে।

এটি useful যখন:

- database connection close করতে হবে;
- file বা I/O resource release করতে হবে;
- কোনো resource lock মুক্ত করতে হবে;
- memory reference cleanup করতে হবে;
- temporary state reset করতে হবে।

## Process Information Example

```js
function processInformation(information) {
  try {
    console.log("Processing information");

    if (!information) {
      throw new Error("No information available to process");
    }

    console.log("Information processed");
  } catch (error) {
    console.error("An error:", error.message);
  } finally {
    console.log("Closing database connection");
  }
}
```

### Information থাকলে

```js
processInformation("Tapas is teaching JS");
```

Execution:

1. `Processing information` print হবে;
2. information truthy, তাই error throw হবে না;
3. `Information processed` print হবে;
4. `catch` ignore হবে;
5. `finally` execute হবে;
6. database connection closing message print হবে।

Expected output:

```text
Processing information
Information processed
Closing database connection
```

### Information না থাকলে

```js
processInformation();
```

Execution:

1. `Processing information` print হবে;
2. information নেই;
3. error throw হবে;
4. `Information processed` line execute হবে না;
5. control `catch`-এ যাবে;
6. error message print হবে;
7. এরপরও `finally` execute হবে।

Expected output:

```text
Processing information
An error: No information available to process
Closing database connection
```

I/O, database, file system, resource বা memory cleanup-এর ক্ষেত্রে `finally` ব্যবহার করা খুব গুরুত্বপূর্ণ।

Instructor আবারও task সম্পন্ন করার কথা মনে করিয়ে দিয়েছেন। Concept বুঝে থাকলে task-এর logic লেখা সহজ হওয়ার কথা।

---

# Custom Error

JavaScript built-inভাবে `TypeError`, `ReferenceError`, `SyntaxError` ইত্যাদি দেয়। কিন্তু application-specific use case-এ custom error দরকার হতে পারে।

## Custom Error কেন দরকার

Custom error দিয়ে:

- user-কে বেশি meaningful message দেওয়া যায়;
- developer সহজে debugging করতে পারে;
- application-এর বিভিন্ন অংশে error handling standardize করা যায়;
- built-in error-কে domain-specific error হিসেবে normalize করা যায়;
- error management-এর উপর বেশি control পাওয়া যায়।

## Constructor Function দিয়ে Custom Error

JavaScript object lesson-এ constructor function শেখা হয়েছে। `Error` নিজেও একটি constructor function। যেমন:

```js
new Error("Some message");
```

একই ধারণা ব্যবহার করে আমরা নিজস্ব error constructor তৈরি করতে পারি।

```js
function ValidationError(message) {
  this.name = "ValidationError";
  this.message = message;
}
```

Constructor function-এর নাম সাধারণত capital letter দিয়ে শুরু হয়। তাই `ValidationError`-এর `V` capital। `this` ব্যবহার করে instance property তৈরি করা হয়েছে:

- `this.name`;
- `this.message`।

এখন `new ValidationError(...)` দিয়ে custom error instance তৈরি করা যাবে।

## Citizen Validation Example

```js
function ValidationError(message) {
  this.name = "ValidationError";
  this.message = message;
}

function validateCitizen(age) {
  if (age < 60) {
    throw new ValidationError("You are not a senior citizen");
  }

  return "You are a senior citizen";
}
```

এখন function call করি:

```js
try {
  const message = validateCitizen(45);
  console.log(message);
} catch (error) {
  console.error(`${error.name}: ${error.message}`);
}
```

`45 < 60`, তাই custom `ValidationError` throw হবে। Expected output:

```text
ValidationError: You are not a senior citizen
```

এবার:

```js
try {
  const message = validateCitizen(85);
  console.log(message);
} catch (error) {
  console.error(`${error.name}: ${error.message}`);
}
```

`85 < 60` false। কোনো error throw হবে না। Function return করবে:

```text
You are a senior citizen
```

এখানে আমরা নিজের error তৈরি করেছি, instance throw করেছি এবং `catch`-এ সেটি ধরেছি।

## Custom Error-এ Stack যোগ করা

বর্তমান custom error-এ `name` ও `message` আছে, কিন্তু stack trace নেই। Stack JavaScript-এর built-in `Error` object থেকে নেওয়া যায়:

```js
function ValidationError(message) {
  this.name = "ValidationError";
  this.message = message;
  this.stack = new Error().stack;
}
```

এরপর prototype chain associate করা যায়:

```js
ValidationError.prototype = Object.create(Error.prototype);
```

সম্পূর্ণ code:

```js
function ValidationError(message) {
  this.name = "ValidationError";
  this.message = message;
  this.stack = new Error().stack;
}

ValidationError.prototype = Object.create(Error.prototype);
```

এই line-টি এখনই পুরোপুরি বোঝা বাধ্যতামূলক নয়:

```js
ValidationError.prototype = Object.create(Error.prototype);
```

এখানে prototype concept যুক্ত হয়েছে। Object-oriented programming module-এ prototype শেখার সময় বিষয়টি অনেক পরিষ্কার হবে। এখন শুধু জানো, built-in `Error`-এর behaviour-এর সঙ্গে custom `ValidationError`-কে সম্পর্কিত করতে prototype ব্যবহার করা হচ্ছে। Curiosity ধরে রাখো; পরে এর পূর্ণ ব্যাখ্যা পাবে।

Instructor আবারও task miss না করার কথা বলেছেন। সেই task-এ custom error-এর আরও complex use case থাকার কথা।

---

# তথাকথিত Self-assignment Operator: সতর্কতা

Lesson-এর শেষে একটি trending claim নিয়ে সতর্ক করা হয়েছে। বিভিন্ন article ও video-তে question mark এবং equals sign-ভিত্তিক কোনো operator-কে “self-assignment operator” বা `try...catch`-এর replacement হিসেবে দেখানো হতে পারে। এমন content দেখে মনে হতে পারে, এক line-এই fallback assignment এবং error handling করা যাবে।

ধারণাটি সাধারণভাবে এমনভাবে দেখানো হয়:

- `x` undefined হলে fallback হিসেবে `20` assign হবে;
- `y`-এর value আগে থেকেই `10` হলে সেটি `10`-ই থাকবে;
- fallback `30` assign হবে না।

কিন্তু Instructor-এর মূল সতর্কতা হলো:

> Video তৈরির সময় এই operator standard JavaScript-এ available ছিল না; এটি proposal পর্যায়ে ছিল।

তাই এমন tutorial দেখে উত্তেজিত হয়ে ভাবা যাবে না যে `try...catch` শেখার প্রয়োজন নেই। JavaScript-এর অসংখ্য existing project, production codebase এবং organization-এর code-এ `try...catch` ব্যবহৃত হচ্ছে। Professional environment-এ কাজ করতে হলে জানতে হবে:

- `try...catch` কীভাবে কাজ করে;
- error কীভাবে throw করতে হয়;
- rethrow কীভাবে কাজ করে;
- custom error কীভাবে তৈরি করতে হয়;
- `try...catch`-এর debugging কীভাবে করতে হয়।

Shortcut নিও না। ভবিষ্যতে নতুন operator এলে কাজ সহজ হতে পারে, কিন্তু fundamental error handling না শিখে সেটির উপর নির্ভর করা ঠিক হবে না।

## Technical Note

Transcript-এ “self-assignment operator” নামে যে proposal-এর কথা বলা হয়েছে, তার exact syntax অস্পষ্টভাবে transcribe হয়েছে। তাই এখানে Instructor-এর মূল বক্তব্য—“এটি তখনও standard JavaScript feature ছিল না এবং `try...catch` শেখার বিকল্প নয়”—অক্ষুণ্ণ রাখা হয়েছে। বাস্তব code-এ কোনো proposal ব্যবহার করার আগে বর্তমান ECMAScript standard ও runtime support যাচাই করতে হবে।

---

# Common Mistakes ও Tricky Cases

## ১. সব missing property-তে error হবে ধরে নেওয়া

```js
user.address.postalCode
```

`address` object থাকলে কিন্তু `postalCode` না থাকলে result `undefined` হতে পারে।

কিন্তু:

```js
user.address.country.postalCode
```

এখানে `country` যদি `undefined` হয়, তবে তার উপর `.postalCode` access করলে `TypeError` হবে।

## ২. `try` block-এর error-এর পরের line execute হবে ভাবা

Error হওয়ার সঙ্গে সঙ্গে `try` block-এর execution থেমে যায়। নিচের line আর run করে না।

## ৩. Existing error rethrow করার সময় আবার `new Error()` ব্যবহার করা

Existing instance rethrow করতে:

```js
throw error;
```

নতুন error তৈরি করতে:

```js
throw new Error("Message");
```

দুটির purpose এক নয়।

## ৪. প্রতিটি layer থেকে user-কে toast দেখানো

Internal log রাখা useful, কিন্তু UI-তে বহু error message দেখালে user experience খারাপ হয়। Top-level handler থেকে meaningful একটি message দেখানো ভালো।

## ৫. `error.message`-এর spelling ভুল করা

ভুল property name দিলে `undefined` আসতে পারে। সঠিক spelling:

```js
error.message
```

## ৬. `catch` parameter না থাকলে error object ব্যবহার করতে যাওয়া

```js
catch {
  // এখানে error variable নেই
}
```

Error detail programmatically দরকার হলে parameter রাখো:

```js
catch (error) {
  console.log(error.message);
}
```

## ৭. `finally` শুধু error হলে চলে—এমন ধারণা

`finally` error হোক বা না হোক execute হয়। Cleanup-এর জন্য এটাই তার মূল শক্তি।

---

# Interview-oriented Questions

## প্রশ্ন ১: JavaScript-এ exception কী?

Exception হলো runtime error, যা program-এর স্বাভাবিক execution disrupt করে।

## প্রশ্ন ২: `try` block-এ error না হলে `catch` কি execute হয়?

না। Error না হলে `catch` block ignore হয়।

## প্রশ্ন ৩: `try` block-এর মাঝখানে error হলে পরের line-গুলো কি execute হয়?

না। Error হওয়া line-এই execution suspend হয় এবং control `catch`-এ যায়।

## প্রশ্ন ৪: `throw` এবং rethrow-এর পার্থক্য কী?

- `throw` দিয়ে নতুন বা existing error execution flow-এ ছুড়ে দেওয়া হয়;
- rethrow হলো `catch` করা error-কে আবার caller-এর দিকে `throw` করা।

## প্রশ্ন ৫: `finally` কখন execute হয়?

Error হোক বা না হোক, `try`/`catch` flow-এর পরে `finally` execute হয়।

## প্রশ্ন ৬: Error object-এর গুরুত্বপূর্ণ property কী কী?

- `name`;
- `message`;
- `stack`।

## প্রশ্ন ৭: Custom error কেন তৈরি করা হয়?

Meaningful domain-specific message, standardization, better debugging এবং consistent error handling-এর জন্য।

---

# Lecture Recap

এই lesson-এ আমরা প্রথমে বুঝেছি কেন error handling production-ready JavaScript-এর জন্য জরুরি। Bug পুরোপুরি দূর করা প্রায় অসম্ভব, তাই bug ও runtime error শনাক্ত, ব্যাখ্যা এবং gracefulভাবে handle করার দক্ষতা দরকার।

তারপর parsing error ও runtime error-এর পার্থক্য দেখেছি। `ReferenceError`, `TypeError`, `SyntaxError`, `RangeError`, `URIError` এবং `EvalError`-এর example আলোচনা করেছি।

এরপর `try...catch` syntax এবং execution flow শিখেছি:

- `try` block প্রথমে execute হয়;
- error না হলে `catch` ignore হয়;
- error হলে `try`-এর execution থেমে `catch`-এ যায়।

Error object-এর `name`, `message` ও `stack` property দেখেছি। Optional catch binding-এর কারণে `catch` parameter বাদ দেওয়া যায়—এটিও শিখেছি।

বাস্তব use case-এ division by zero-কে business error হিসেবে handle করেছি। JavaScript নিজে `Infinity` দিলেও আমরা condition check করে `throw new Error(...)` ব্যবহার করেছি। Nested property access এবং age validation-এর example-ও দেখেছি।

তারপর rethrowing শিখেছি। Lower-level function local log করার পর একই error top-level caller-এর দিকে পাঠাতে পারে। Internal logging ও user-facing message-এর best practice-ও আলোচনা করেছি।

`finally` block cleanup operation-এর জন্য ব্যবহার হয় এবং error হোক বা না হোক execute হয়। Database connection, file resource বা memory-related cleanup-এর ক্ষেত্রে এটি গুরুত্বপূর্ণ।

Custom `ValidationError` constructor তৈরি করে `name`, `message` ও `stack` যোগ করার ধারণা দেখেছি। Prototype association-এর একটি preview পেয়েছি, যা ভবিষ্যৎ object-oriented module-এ বিস্তারিত শেখা হবে।

শেষে সম্ভাব্য future operator বা proposal দেখে fundamental `try...catch` শেখা বাদ না দেওয়ার সতর্কতা দেওয়া হয়েছে।

---

# Assignment / Task

Instructor lesson-এর বিভিন্ন স্থানে task সম্পন্ন করার কথা বলেছেন এবং ইঙ্গিত দিয়েছেন যে:

- `try...catch...finally` ব্যবহার করে একটি logic লিখতে হবে;
- custom error নিয়ে তুলনামূলক complex practice থাকবে;
- project assignment পরে live session-এ আলোচনা করা হবে।

তবে এই transcript-এ task-এর exact problem statement বা requirement উচ্চারণ করা হয়নি। তাই নতুন task বানিয়ে যোগ করা হলো না। Original course resource, video description, progress tracker বা সংশ্লিষ্ট task document থেকে assignment-এর নির্দিষ্ট instruction সংগ্রহ করতে হবে।

---

# Final Recap

JavaScript error handling-এর মূল ভিত্তি হলো সম্ভাব্য runtime failure আগে থেকে চিন্তা করা এবং application-কে crash না করিয়ে controlled response দেওয়া। `try` risky code চালায়, `catch` error ধরে, `throw` ইচ্ছাকৃত error তৈরি করে, rethrow error-কে উপরের caller-এর কাছে পাঠায়, আর `finally` প্রয়োজনীয় cleanup নিশ্চিত করে। Error object-এর `name`, `message` ও `stack` debugging-এর জন্য গুরুত্বপূর্ণ। Application-specific পরিস্থিতিতে custom error আরও পরিষ্কার, consistent এবং maintainable error handling তৈরি করে।

Fundamental concept এড়িয়ে shortcut নিও না। Code-এর সঙ্গে practice করো, task সম্পন্ন করো, আটকে গেলে community-তে আলোচনা করো এবং JavaScript-কে গভীরভাবে শেখো। আজ এই fundamentals-এ সময় দিলে ভবিষ্যতে debugging ও development-এ অসংখ্য ঘণ্টা সাশ্রয় হবে।
