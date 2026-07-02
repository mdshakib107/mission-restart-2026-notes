আপনার দেওয়া সম্পূর্ণ নোটটিকে আরও সুন্দর, প্রফেশনাল এবং রিডেবল (Readable) করার জন্য প্রোপার **Markdown (.md)** ফরম্যাটে সাজিয়ে দেওয়া হলো। নিচে দেওয়া কোড ব্লক থেকে আপনি সরাসরি এটি কপি করে `.md` ফাইলে সেভ করে নিতে পারবেন।

```markdown
# 📘 Node.js Global Object & Module System — Detailed Study Notes

---

## 📋 Table of Contents
1. [Introduction to Node.js Runtime](#1-introduction-to-nodejs-runtime)
2. [Window Object vs Global Object](#2-window-object-vs-global-object)
3. [Deep Dive into Node.js Global Object](#3-deep-dive-into-nodejs-global-object)
4. [Node.js Module System](#4-nodejs-module-system)
5. [The Module Wrapper Function (Behind the Scenes)](#5-the-module-wrapper-function-behind-the-scenes)
6. [Types of Modules & Third-Party Module Integration](#6-types-of-modules--third-party-module-integration)
7. [Important Differences](#7-important-differences)
8. [Common Mistakes to Avoid](#8-common-mistakes-to-avoid)
9. [Assignment / Practical Tasks](#9-assignment--practical-tasks)
10. [Final Summary & Practice Checklist](#10-final-summary--practice-checklist)

---

## 1. Introduction to Node.js Runtime
`JavaScript` মূলত ব্রাউজারে রান করার জন্য তৈরি হয়েছিল। কিন্তু **Node.js** হলো একটি **runtime environment** যা JavaScript-কে ব্রাউজারের বাইরে, অর্থাৎ আপনার নিজের কম্পিউটার বা সার্ভারে সরাসরি রান করতে সাহায্য করে। এটি কোনো আলাদা programming language নয়, বরং ব্রাউজারের V8 engine-কে ব্যবহার করে তৈরি একটি প্ল্যাটফর্ম।

---

## 2. Window Object vs Global Object
ব্রাউজারে যখন আমরা কাজ করি, তখন আমাদের সব কোড একটি টপ-লেভেল অবজেক্টের অধীনে থাকে, যার নাম `window` [01:44]। কিন্তু Node.js যেহেতু ব্রাউজারে চলে না, তাই এখানে কোনো `window` object বা `document` object (DOM) নেই [02:15]।

Node.js-এ এই টপ-লেভেল অবজেক্টটির নাম হলো `global` [05:16]।

### 💡 Key Concept:
* **Browser:** গ্লোবাল স্কোপের যেকোনো variable বা function সরাসরি `window` object-এর প্রপার্টি হয়ে যায়।
* **Node.js:** নোড-এ আপনি গ্লোবালি কোনো variable ডিক্লেয়ার করলেই তা সরাসরি `global` object-এর ভেতর যুক্ত হয় না (মডিউলシステム বা মডিউল সিস্টেমের কারণে, যা নিচে ব্যাখ্যা করা হয়েছে) [07:24]।

---

## 3. Deep Dive into Node.js Global Object
Node.js-এর `global` অবজেক্টের মধ্যে বেশ কিছু বিল্ট-ইন ফাংশন এবং প্রপার্টি থাকে যা আমরা কোনো কিছু ইমপোর্ট না করেই সরাসরি ব্যবহার করতে পারি [03:53]।

### 🛠️ Common Global Features:
* `setTimeout()` এবং `setInterval()` [03:53]
* `console.log()` [02:58]

### 📁 Special Variables (Module Level):
এগুলো দেখতে গ্লোবাল মনে হলেও, এগুলো আসলে প্রতিটা ফাইলের (Module) নিজস্ব লোকাল ভ্যারিয়েবল [09:59]:
* `__dirname`: বর্তমান ফাইলটি যে ডিরেক্টরি বা ফোল্ডারে আছে তার পুরো পাথ (Absolute Path) দেয় [09:59]।
* `__filename`: বর্তমান ফাইলের সম্পূর্ণ পাথসহ ফাইলের নামটি প্রদান করে [09:18]।

#### 💻 Code Example:
```javascript
// index.js
console.log(__dirname);  // Output: C:\Users\Project\node-basics
console.log(__filename); // Output: C:\Users\Project\node-basics\index.js

```

---

## 4. Node.js Module System

ব্রাউজারে একাধিক JavaScript ফাইল লোড করলে একটি ফাইলের ভ্যারিয়েবল অন্য ফোল্ডারে গ্লোবালি ওভারল্যাপ বা কনফ্লিক্ট করতে পারে [10:53]। এই সমস্যা সমাধানের জন্য Node.js ব্যবহার করে **Modular System** [13:05]।

Node.js-এ প্রতিটি সিঙ্গেল ফাইল (`.js`) এক একটি স্বকীয় **Module** [13:47]। একটি ফাইলের কোড বা variable সম্পূর্ণ প্রাইভেট থাকে, যতক্ষণ না আপনি সেটিকে নিজে থেকে 'export' করছেন [13:17]।

### 🔄 How to Export and Import Data:

#### ১. ডেটা এক্সপোর্ট করা (`people.js`):

কোনো ফাইল থেকে ডেটা অন্য ফাইলে পাঠাতে `module.exports` ব্যবহার করা হয় [18:42]।

```javascript
// people.js
const people = ['Sakib', 'Tamim', 'Mashrafe'];
const a = 6;

function test() {
    console.log("Testing module system");
}

// আমরা একটি অবজেক্ট আকারে সবকিছু এক্সপোর্ট করতে পারি
module.exports = {
    people: people,
    a: a,
    test: test
};

```

#### ২. ডেটা ইমপোর্ট করা (`index.js`):

অন্য ফাইল থেকে এক্সপোর্ট করা ডেটা নিজের ফাইলে নিয়ে আসতে `require()` ফাংশন ব্যবহার করতে হয় [14:59]।

```javascript
// index.js
// অন্য ফাইল ইমপোর্ট করার সময় আপেক্ষিক পাথ (Relative Path) যেমন './' দিতে হবে
const peopleModule = require('./people'); 

console.log(peopleModule.people); // Output: ['Sakib', 'Tamim', 'Mashrafe']
console.log(peopleModule.a);      // Output: 6
peopleModule.test();              // Output: Testing module system

```

---

## 5. The Module Wrapper Function (Behind the Scenes)

Node.js কীভাবে একটি ফাইলের কোড অন্য ফাইল থেকে সুরক্ষিত বা প্রাইভেট রাখে?

যখনই আমরা কোনো Node.js ফাইল রান করি, Node.js ব্যাকএন্ডে আমাদের পুরো কোডটিকে একটি অদৃশ্য **IIFE (Immediately Invoked Function Expression)** বা ফাংশন দিয়ে মুড়িয়ে (wrap) দেয় [24:20]। একে বলা হয় **Module Wrapper Function**।

### 🔍 Structure of Wrapper Function:

```javascript
(function(exports, require, module, __filename, __dirname) {
    // আপনার লেখা কোডগুলো আসলে এই ফাংশনের ভেতরে চলে আসে!
    const people = ['Sakib', 'Tamim'];
    module.exports = people;
});

```

> **💡 মনে রাখার নিয়ম:** যেহেতু আমাদের কোডটি একটি ফাংশনের ভেতরে থাকে, তাই এর ভেতরের তৈরি করা যেকোনো variable বা function লোকাল স্কোপে থাকে, গ্লোবাল হয় না। একারণেই `__dirname`, `__filename`, `require`, `module` এগুলোকে আমরা গ্লোবাল মনে করলেও এগুলো আসলে নোড কর্তৃক পাস করা ফাংশন প্যারামিটার [25:05]!

---

## 6. Types of Modules & Third-Party Module Integration

Node.js-এ সাধারণত ৩ ধরনের মডিউল থাকে:

1. **Local Modules:** আমাদের নিজেদের তৈরি করা ফাইল (যেমন: `people.js`) [13:47]।
2. **Core Modules:** Node.js-এর সাথে বিল্ট-ইন আসে (যেমন: `fs`, `path`, `http`) [35:43]।
3. **Third-Party Modules:** অন্য ডেভেলপারদের তৈরি করা প্যাকেজ যা আমরা **NPM (Node Package Manager)** এর মাধ্যমে ইনস্টল করি (যেমন: `lodash`) [31:49]।

### 📦 Example of Third-Party Module (`lodash`):

প্রথমে টার্মিনালে ইনস্টল করতে হবে:

```bash
npm install lodash

```

কোডে ব্যবহার [32:50]:

```javascript
// index.js
// থার্ড-পার্টি বা কোর মডিউলের ক্ষেত্রে './' দিতে হয় না, শুধু নাম লিখলেই হয়
const _ = require('lodash'); 

const mixedArray = ['Apple', 'Banana', 'Orange'];
console.log(_.last(mixedArray)); // Output: Orange (অ্যারের শেষ এলিমেন্ট বের করে)

```

---

## 7. Important Differences

| বৈশিষ্ট্য / বিষয় | Browser Environment | Node.js Runtime |
| --- | --- | --- |
| **Top-Level Root Object** | `window` [01:44] | `global` [05:16] |
| **DOM / Document Access** | সরাসরি অ্যাক্সেস করা যায় (`document.querySelector`) | অ্যাক্সেস করা যায় না (সার্ভারে কোনো উইন্ডো বা UI নেই) [02:15] |
| **Scope Isolation** | ডিফল্টভাবে ফাইলগুলো গ্লোবাল স্কোপ শেয়ার করে (যদি না ES Modules ব্যবহার হয়) [10:53] | প্রতিটি ফাইল স্বয়ংক্রিয়ভাবে একটি প্রাইভেট মডিউল [13:05] |
| **ফাইল লিঙ্কিং পদ্ধতি** | HTML-এ `<script src="...">` এর মাধ্যমে [10:53] | JavaScript ফাইলে `require()` বা `import` এর মাধ্যমে [14:59] |

---

## 8. Common Mistakes to Avoid

* ❌ **ভুল পাথ দেওয়া:** `require('people')` লেখা।
* **سঠিক নিয়ম:** নিজের তৈরি লোকাল ফাইলের ক্ষেত্রে অবশ্যই `./` বা আপেক্ষিক পাথ ব্যবহার করতে হবে, যেমন: `require('./people')` [15:42]।


* ❌ **Exports ওভাররাইট করা:** এক জায়গায় `module.exports.abc = 123` লিখে নিচে আবার ভুল করে `module.exports = { ... }` লিখলে আগের এক্সপোর্টটি হারিয়ে বা ওভাররাইট হয়ে যাবে।
* ❌ **সার্ভারে DOM খোঁজা:** নোড কোডে `window` বা `document` ব্যবহার করার চেষ্টা করা [02:58]। এটি করলে `ReferenceError: window is not defined` আসবে।

---

## 9. Assignment / Practical Tasks

**🎯 টাস্ক:** একটি ছোট গাণিতিক মডিউল তৈরি করুন।

1. `mathUtils.js` নামে একটি ফাইল তৈরি করুন। সেখানে ৩টি ফাংশন লিখুন: `add(x, y)`, `subtract(x, y)`, এবং একটি ভ্যারিয়েবল `PI = 3.1416`।
2. ফাংশন এবং ভ্যারিয়েবলটি একটি অবজেক্ট আকারে `module.exports` ব্যবহার করে এক্সপোর্ট করুন।
3. `app.js` ফাইলে `require()` এর মাধ্যমে মডিউলটি ইমপোর্ট করে ফাংশনগুলো রান করে `console.log()`-এ আউটপুট দেখান।

---

## 10. Final Summary & Practice Checklist

### 📌 Final Summary

Node.js আমাদের ব্রাউজারের বাইরে JavaScript রান করার সুবিধা দেয় যেখানে টপ-লেভেল অবজেক্ট হলো `global` [05:16]। কোডকে সুশৃঙ্খল এবং ফাইলে ফাইলে সুরক্ষিত রাখতে এটি **Module System** ব্যবহার করে [13:05]। ব্যাকএন্ডে প্রতিটা ফাইলকে **Module Wrapper Function** দিয়ে ঘিরে দেওয়া হয় [24:20], যার ফলে কোড কনফ্লিক্ট বা গ্লোবাল পলিউশন হওয়ার কোনো সুযোগ থাকে না। আমরা আমাদের কোড অন্য ফাইলে পাঠাতে `module.exports` এবং অন্য ফাইল থেকে কোড আনতে `require()` ব্যবহার করি [18:42, 14:59]।

### ✅ Practice Checklist

* [ ] একটি ফাইল তৈরি করে `global` অবজেক্টটি প্রিন্ট করে দেখা।
* [ ] `__dirname` এবং `__filename` ব্যবহার করে দেখা।
* [ ] দুটি নিজস্ব লোকাল ফাইল তৈরি করে `module.exports` ও `require` প্র্যাকটিস করা।
* [ ] NPM ব্যবহার করে `lodash` মডিউল ইনস্টল ও ব্যবহার করা।

```

```
