# 40 Days of JavaScript — Day 01 Detailed Notes

> Source: Uploaded transcript of **The 40 Days of JavaScript — Day 01**.

---

## 1. কোর্সের মূল লক্ষ্য

এই সিরিজটি JavaScript একদম beginner level থেকে advanced level পর্যন্ত শেখানোর জন্য তৈরি। উদ্দেশ্য হলো শুধু syntax মুখস্থ করানো নয়, বরং JavaScript-এর fundamentals শক্ত করা, যাতে তুমি নিজে project বানাতে পারো, problem solve করতে পারো এবং real-world application-এ confidence নিয়ে কাজ করতে পারো।

JavaScript শেখার মাধ্যমে তুমি বুঝতে পারবে ওয়েবসাইটে button click কীভাবে কাজ করে, animation কীভাবে চলে, user interaction কীভাবে তৈরি হয়, আর কোনো webpage কীভাবে dynamically update হয়।

এই কোর্সে ৪০টি structured session থাকবে, কিন্তু প্রতিদিন একটি করে ভিডিও আসবে না। ভিডিওগুলোর মাঝে কিছু gap থাকবে, কারণ প্রতিটি ভিডিওর পর task, assignment এবং project practice দেওয়া হবে। এগুলো বুঝে করা জরুরি।

Instructor বলছেন, JavaScript ৬০ মিনিটে, এক সপ্তাহে, এক মাসে বা এমনকি ৪০ দিনেও পুরোপুরি master করা যায় না; তবে structured practice করলে কয়েক মাসে strong confidence তৈরি করা যায়।

---

## 2. Progress Tracker কেন দরকার

JavaScript শেখার সময় সবচেয়ে বড় সমস্যা হলো consistency ধরে রাখা। অনেক learner শুরুতে excited থাকে, কিন্তু ১০–১৫টি lesson-এর পর interest কমে যায়। তাই habit তৈরি করার জন্য একটি progress tracker ব্যবহার করার কথা বলা হয়েছে।

Tracker-এ প্রতিদিনের lesson-এর জন্য রাখা যাবে:

| বিষয়                | কী লিখবে                                                      |
| ------------------- | ------------------------------------------------------------- |
| Video link          | সেই দিনের YouTube video link                                  |
| Learning date       | কোন তারিখে lesson শুরু করেছ                                   |
| Status              | In progress / Complete                                        |
| Key takeaways       | lesson থেকে কী শিখলে                                          |
| Notes               | নিজের notes                                                   |
| Assignment progress | task বুঝেছ কিনা, design/code/readme/GitHub push complete কিনা |
| GitHub link         | নিজের কাজের repository                                        |
| Discord update      | community-তে task submit                                      |

Tracker ব্যবহার করার উদ্দেশ্য হলো শুধু শেখা নয়, বরং শেখার record রাখা। পরে revision করার সময় পুরো ভিডিও আবার দেখতে না হলেও tracker ও notes দেখে মনে করা যাবে।

---

## 3. JavaScript কী?

JavaScript একটি programming language। এটি দিয়ে browser বা client-side-এ interactive webpage তৈরি করা যায়। আবার server-side-এও JavaScript ব্যবহার করা যায়, যেমন data management, user management, authentication, API handling ইত্যাদির জন্য।

### Client-side JavaScript

যা browser-এ চলে এবং user সরাসরি দেখতে বা interact করতে পারে।

উদাহরণ:

```js
button click
animation
mouse movement
dynamic page update
form validation
```

### Server-side JavaScript

যা server-এ চলে। User সরাসরি দেখে না, কিন্তু application-এর পেছনের logic চালায়।

উদাহরণ:

```js
database operation
user login
API creation
server-side processing
```

আজকের আধুনিক website যেমন Facebook, YouTube, Amazon, Netflix—এসবের পেছনে JavaScript বড় ভূমিকা রাখে।

JavaScript দিয়ে বানানো যায়:

```text
Website
Web application
Mobile application
Games
AI-powered products
Server-side applications
```

---

## 4. JavaScript-এর সংক্ষিপ্ত ইতিহাস

JavaScript-এর history জানা গুরুত্বপূর্ণ, কারণ এতে বোঝা যায় language-টি কত দ্রুত evolve করেছে এবং এখনো কেন relevant।

### গুরুত্বপূর্ণ timeline

| সাল       | ঘটনা                                                                                                           |
| --------- | -------------------------------------------------------------------------------------------------------------- |
| 1995      | Brendan Eich মাত্র 10 দিনে JavaScript তৈরি করেন Netscape-এ                                                     |
| 1996      | Microsoft Internet Explorer-এর জন্য JScript release করে                                                        |
| 1997      | ECMAScript standard-এর প্রথম version ES1 আসে                                                                   |
| 1999      | ES3 আসে; Regular Expression ও Exception Handling introduce হয়                                                  |
| 2005      | AJAX জনপ্রিয় হয়; Google-এর মতো company এটি ব্যবহার করে                                                         |
| 2006      | jQuery আসে, যা JavaScript সহজ করে দেয়                                                                          |
| 2009      | ES5 আসে; JSON, map, filter, reduce ইত্যাদি feature popular হয়                                                  |
| 2010      | AngularJS জনপ্রিয় হয়                                                                                           |
| 2013      | ReactJS আসে component-driven architecture নিয়ে                                                                 |
| 2014      | ECMAScript প্রতি বছর update পাওয়ার standard নেয়                                                                |
| 2015      | ES6 আসে; modern JavaScript-এর বড় milestone                                                                     |
| 2016      | Vue.js জনপ্রিয় হতে শুরু করে                                                                                    |
| 2017      | ES8 async/await introduce করে                                                                                  |
| 2019      | ES10 flatMap introduce করে                                                                                     |
| 2020      | Deno আসে                                                                                                       |
| 2021+     | Logical assignment operator, ES13, ES14 ইত্যাদি আসে                                                            |
| 2024–2025 | React Server Components, Next.js, AI-driven features, WebAssembly ইত্যাদির মাধ্যমে JavaScript এখনো evolve করছে |

### ES6 কেন গুরুত্বপূর্ণ?

ES6 থেকে JavaScript-কে modern JavaScript বলা শুরু হয়। কারণ এতে অনেক powerful feature আসে:

```js
let
const
classes
modules
arrow functions
template literals
destructuring
```

---

## 5. JavaScript Environment Setup

JavaScript শেখার জন্য তিনটি main tool দরকার।

### 5.1 Code Editor: VS Code

Instructor Visual Studio Code recommend করেছেন। VS Code হলো code লেখার editor। এখানে project folder খুলে HTML, CSS, JavaScript files organize করে কাজ করা যায়।

Recommended folder structure:

```text
40-days-js/
  day-01/
    first.html
    test.js
    script.js
  day-02/
  day-03/
```

প্রতিদিনের lesson আলাদা folder-এ রাখলে পরে revision করা সহজ হয়।

---

### 5.2 Browser: Chrome বা অন্য browser

JavaScript শুরুতে browser-এ run করা হবে। Chrome ব্যবহার করা হয়েছে, তবে Firefox, Edge, Safari—যেকোনো modern browser ব্যবহার করা যায়।

Browser-এ right click → **Inspect** করলে Developer Tools খুলবে।

Developer Tools-এর গুরুত্বপূর্ণ tabs:

```text
Console
Elements
Network
Performance
Memory
Application
```

Day 01-এ সবচেয়ে বেশি ব্যবহার করা হয়েছে **Console** tab।

---

### 5.3 Node.js

Node.js দিয়ে JavaScript browser ছাড়া server-side বা terminal environment-এ run করা যায়।

Node install হয়েছে কিনা check করার command:

```bash
node -v
```

এটি version দেখালে বুঝবে Node.js properly installed।

---

## 6. প্রথম JavaScript Code

Browser DevTools-এর Console tab-এ সরাসরি JavaScript লেখা যায়।

প্রথম code:

```js
console.log("Hello JavaScript");
```

### এখানে কী হচ্ছে?

`console.log()` হলো JavaScript-এর একটি method, যা console-এ কোনো message print করে।

`"Hello JavaScript"` হলো একটি text value। Programming language-এ text value-কে সাধারণত **string** বলা হয়।

মানে:

```js
console.log("Hello JavaScript");
```

এর অর্থ হলো:

```text
Console-এ Hello JavaScript লেখাটি print করো।
```

Output:

```text
Hello JavaScript
```

---

## 7. HTML, CSS এবং JavaScript-এর সম্পর্ক

Web application তৈরি করতে তিনটি জিনিস একসাথে কাজ করে।

| Technology | কাজ                               |
| ---------- | --------------------------------- |
| HTML       | webpage-এর structure তৈরি করে     |
| CSS        | webpage সুন্দর করে, styling দেয়   |
| JavaScript | webpage interactive ও dynamic করে |

উদাহরণ:

```text
HTML → Button বানায়
CSS → Button সুন্দর করে
JavaScript → Button click করলে কাজ করায়
```

শুধু HTML থাকলে button দেখা যাবে, কিন্তু click করলে কিছু হবে না। JavaScript button-কে action দেয়।

---

## 8. Basic HTML File তৈরি

VS Code-এ একটি folder open করে `first.html` নামে file তৈরি করা হয়।

VS Code-এ shortcut:

```html
!
```

তারপর Enter চাপলে basic HTML structure তৈরি হয়।

Example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>Welcome to JavaScript</h1>
  </body>
</html>
```

### HTML structure বোঝা

```html
<head></head>
```

এই অংশে webpage-এর configuration থাকে। যেমন title, CSS link, script import, SEO-related information ইত্যাদি।

```html
<body></body>
```

এই অংশে যা লেখা হয়, তা browser page-এ দেখা যায়।

Example:

```html
<h1>Welcome to JavaScript</h1>
```

Browser-এ দেখাবে:

```text
Welcome to JavaScript
```

---

## 9. Live Server Extension

HTML file সহজে browser-এ run করার জন্য VS Code extension **Live Server** ব্যবহার করা হয়েছে।

Steps:

```text
VS Code → Extensions → Search "Live Server" → Install
```

এরপর HTML file open রেখে নিচের দিকে **Go Live** button চাপলে browser-এ page open হবে।

Live Server ব্যবহার করলে file change করলে browser automatically update হয়।

---

## 10. HTML-এর ভেতরে JavaScript লেখার পদ্ধতি

JavaScript HTML page-এর সঙ্গে কয়েকভাবে যুক্ত করা যায়।

### পদ্ধতি ১: Inline Script

HTML-এর ভেতর সরাসরি script tag ব্যবহার করা যায়।

```html
<body>
  <h1>Welcome to JavaScript</h1>

  <script>
    console.log("Hello JavaScript");
  </script>
</body>
```

এটি কাজ করবে, কিন্তু clean coding-এর জন্য ideal নয়।

### কেন ideal নয়?

Programming-এ একটি important principle আছে:

```text
Separation of Concerns
```

মানে, প্রতিটি technology নিজের কাজ আলাদা রাখবে।

```text
HTML → structure
CSS → style
JavaScript → behavior
```

তাই JavaScript আলাদা `.js` file-এ রাখা ভালো।

---

## 11. External JavaScript File

একটি আলাদা file তৈরি করা হলো:

```text
test.js
```

এর ভেতরে লেখা হলো:

```js
console.log("I am a test script");
```

এখন HTML file থেকে এই JS file link করা যায়।

```html
<script src="test.js"></script>
```

এখানে `src` মানে source। অর্থাৎ কোন JavaScript file import করতে হবে, সেটি বলা হচ্ছে।

---

## 12. Script Tag Head-এ দিলে কী সমস্যা হতে পারে?

প্রথমে script tag `<head>`-এর ভেতরে দেওয়া হলো:

```html
<head>
  <script src="test.js"></script>
</head>
<body>
  <h1>Welcome to JavaScript</h1>
  <div id="some-id"></div>
</body>
```

JavaScript file:

```js
console.log("I am a test script");

document.getElementById("some-id").innerText = "I am some div";
```

Expected output ছিল:

```text
Welcome to JavaScript
I am some div
```

কিন্তু error হলো:

```text
Cannot set properties of null
```

### কেন error হলো?

Browser HTML file top to bottom পড়ে।

যখন script tag `<head>`-এ থাকে, তখন browser body-এর HTML elements তৈরি করার আগেই JavaScript execute করে।

Flow:

```text
HTML parsing শুরু
head পাওয়া গেল
script পাওয়া গেল
script download হলো
script execute হলো
body এখনো parse হয়নি
div এখনো তৈরি হয়নি
JavaScript div খুঁজে পেল না
null return হলো
error হলো
```

এই line:

```js
document.getElementById("some-id");
```

`some-id` ID-ওয়ালা element খুঁজছে। কিন্তু তখনো `<div id="some-id"></div>` browser-এর DOM-এ তৈরি হয়নি। তাই result হয়:

```js
null;
```

তারপর JavaScript চেষ্টা করছে:

```js
null.innerText = "I am some div";
```

এটি possible নয়। তাই error।

---

## 13. DOM কী?

DOM-এর পূর্ণরূপ:

```text
Document Object Model
```

Browser HTML file-কে একটি tree-like structure-এ convert করে। সেই structure-এর প্রতিটি HTML element একটি node হিসেবে থাকে।

Example:

```html
<body>
  <h1>Welcome</h1>
  <div id="some-id"></div>
</body>
```

DOM tree-এর মতো চিন্তা করা যায়:

```text
document
 └── html
      ├── head
      └── body
           ├── h1
           └── div#some-id
```

JavaScript DOM ব্যবহার করে HTML elements access ও modify করতে পারে।

Example:

```js
document.getElementById("some-id");
```

মানে:

```text
document-এর ভেতর some-id ID-ওয়ালা element খুঁজে দাও।
```

---

## 14. Script Body-এর শেষে দিলে কী হয়?

Problem solve করার একটি traditional way হলো script tag body-এর একদম শেষে রাখা।

```html
<body>
  <h1>Welcome to JavaScript</h1>
  <div id="some-id"></div>

  <script src="test.js"></script>
</body>
```

এখন browser প্রথমে body-এর elements parse করবে:

```html
<h1>
  <div id="some-id"></div>
</h1>
```

তারপর script execute করবে। তাই JavaScript যখন এই line run করবে:

```js
document.getElementById("some-id").innerText = "I am some div";
```

তখন div ইতিমধ্যে DOM-এ আছে। ফলে code কাজ করবে।

Output:

```text
Welcome to JavaScript
I am some div
```

### কিন্তু এর সমস্যা কী?

এখানে script download ও execute হবে HTML parsing শেষ হওয়ার পর। যদি JavaScript file বড় হয়, তাহলে page interactive হতে দেরি হতে পারে।

তাই better solution হলো:

```text
async
defer
```

---

## 15. async Attribute

Script tag-এ `async` attribute ব্যবহার করা যায়:

```html
<script src="test.js" async></script>
```

### async কী করে?

`async` script-কে HTML parsing-এর সঙ্গে parallel-এ download করে।

Flow:

```text
HTML parsing চলতে থাকে
script parallel download হয়
script download শেষ হলেই HTML parsing pause হয়
script execute হয়
তারপর HTML parsing আবার continue হয়
```

### async-এর সুবিধা

Script download করার সময় HTML parsing block হয় না। ফলে কিছু performance benefit পাওয়া যায়।

### async-এর সমস্যা

Script download শেষ হলেই execute হয়। যদি তখন HTML-এর কিছু অংশ এখনো parse না হয়ে থাকে, আর JavaScript সেই অংশের element access করতে চায়, তাহলে আগের মতো error হতে পারে।

তাই DOM-dependent JavaScript-এর জন্য async safe নয়।

### async কখন ব্যবহার করা উচিত?

যে script HTML elements-এর ওপর নির্ভর করে না, সেগুলোর জন্য।

উদাহরণ:

```text
Analytics script
Tracking script
Chatbot script
External widget
WhatsApp floating button
Advertisement script
```

এগুলো সাধারণত page-এর core HTML structure-এর ওপর depend করে না।

---

## 16. defer Attribute

Script tag-এ `defer` attribute ব্যবহার করা যায়:

```html
<script src="test.js" defer></script>
```

### defer কী করে?

`defer` script-কে HTML parsing-এর সঙ্গে parallel-এ download করে, কিন্তু execute করে HTML parsing ও DOM building শেষ হওয়ার পর।

Flow:

```text
HTML parsing শুরু
script parallel download হয়
HTML parsing continue করে
DOM তৈরি হয়
HTML parsing শেষ হয়
তারপর script execute হয়
```

### defer-এর সুবিধা

এটি দুই দিক থেকেই ভালো:

```text
1. Script parallel download হয় → performance ভালো
2. Script DOM তৈরি হওয়ার পর execute হয় → DOM-related error হয় না
```

তাই সাধারণ application JavaScript file-এর জন্য `defer` সবচেয়ে ভালো option।

Example:

```html
<head>
  <script src="test.js" defer></script>
</head>
<body>
  <h1>Welcome to JavaScript</h1>
  <div id="some-id"></div>
</body>
```

JavaScript:

```js
console.log("I am a test script");

document.getElementById("some-id").innerText = "I am some div";
```

এটি ঠিকভাবে কাজ করবে।

---

## 17. async vs defer — সবচেয়ে গুরুত্বপূর্ণ পার্থক্য

| বিষয়                                      | async                                | defer                                            |
| ----------------------------------------- | ------------------------------------ | ------------------------------------------------ |
| Script download                           | HTML parsing-এর সঙ্গে parallel       | HTML parsing-এর সঙ্গে parallel                   |
| Script execution                          | Download শেষ হলেই execute            | HTML parsing ও DOM building শেষ হওয়ার পর execute |
| HTML parsing pause হয়?                    | execution সময় pause হয়               | execution-এর আগে HTML parsing শেষ হয়             |
| DOM ready হওয়ার guarantee                 | নেই                                  | আছে                                              |
| DOM access করার জন্য safe?                | না                                   | হ্যাঁ                                            |
| সাধারণ app script-এর জন্য ভালো?           | না                                   | হ্যাঁ                                            |
| External independent script-এর জন্য ভালো? | হ্যাঁ                                | সবসময় দরকার নেই                                  |
| Script execute হয় কখন?                    | যত দ্রুত download শেষ হয়             | DOM ready হওয়ার পর                               |
| Recommended for main JS file              | সাধারণত না                           | হ্যাঁ                                            |
| Best use case                             | analytics, chatbot, external widgets | main application script                          |

সহজ মনে রাখার নিয়ম:

```text
DOM-এর সঙ্গে কাজ করলে → defer
DOM-এর সঙ্গে সম্পর্ক নেই → async
```

---

## 18. Client-side JavaScript বনাম Server-side JavaScript

এতক্ষণ JavaScript browser-এ run করা হয়েছে। এটি হলো client-side JavaScript।

কিন্তু JavaScript Node.js-এর মাধ্যমে terminal বা server environment-এও run করা যায়।

একটি file তৈরি করা হলো:

```text
script.js
```

এর ভেতরে লেখা হলো:

```js
console.log("Hello from NodeJS");
```

Terminal থেকে run:

```bash
node script.js
```

Output:

```text
Hello from NodeJS
```

এটি browser-এ run হচ্ছে না। এটি Node.js environment-এ run হচ্ছে।

### এর মানে কী?

JavaScript শুধু browser-এর language নয়। এটি server-side-এও ব্যবহার করা যায়।

Browser:

```text
Chrome Console
HTML page
DevTools
```

Server/Terminal:

```text
Node.js
Command line
Backend application
```

---

## 19. Day 01-এর গুরুত্বপূর্ণ Code Summary

### Browser console

```js
console.log("Hello JavaScript");
```

### Basic HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>JavaScript Day 01</title>
  </head>
  <body>
    <h1>Welcome to JavaScript</h1>
  </body>
</html>
```

### Inline script

```html
<script>
  console.log("Hello JavaScript");
</script>
```

### External script

```html
<script src="test.js"></script>
```

### DOM access

```js
document.getElementById("some-id").innerText = "I am some div";
```

### Best practice with defer

```html
<head>
  <script src="test.js" defer></script>
</head>
<body>
  <h1>Welcome to JavaScript</h1>
  <div id="some-id"></div>
</body>
```

### Node.js run

```bash
node script.js
```

---

## 20. Day 01 Assignment

ভিডিওর শেষে কিছু task দেওয়া হয়েছে।

### Task 1: Environment setup

করতে হবে:

```text
VS Code install
Live Server setup
Browser DevTools open করা
Console tab check করা
Node.js install check করা
```

Node version check:

```bash
node -v
```

---

### Task 2: প্রথম HTML file তৈরি

একটি HTML file তৈরি করো:

```text
first.html
```

এর ভেতরে heading দাও:

```html
<h1>Welcome to JavaScript</h1>
```

Live Server দিয়ে browser-এ চালাও।

---

### Task 3: External JavaScript file link করা

একটি JavaScript file তৈরি করো:

```text
script.js
```

এর ভেতরে লিখো:

```js
console.log("Hello JavaScript");
```

HTML file থেকে link করো:

```html
<script src="script.js" defer></script>
```

Browser DevTools-এর console-এ output দেখো।

---

### Task 4: async ও defer নিয়ে experiment

নিজে test করো:

```html
<script src="script.js"></script>
<script src="script.js" async></script>
<script src="script.js" defer></script>
```

তারপর observe করো:

```text
কখন error হয়?
কখন DOM access করা যায়?
কখন console.log কাজ করে?
কখন innerText কাজ করে?
```

---

### Task 5: Progress Tracker update

নিজের learning tracker-এ লিখো:

```text
আজ কী শিখলে
কোন code লিখলে
কোন error পেলে
async ও defer-এর পার্থক্য
assignment complete কিনা
GitHub link
```

---

## 21. Next Video-তে কী শেখানো হবে?

Day 02-তে শেখানো হবে JavaScript-এর core fundamentals:

```text
variables
let
const
var
values
data types
pass by value
pass by reference
primitive values
non-primitive values
mutability
immutability
```

Instructor বলেছেন, এই conceptগুলো শুধু JavaScript নয়, programming-এর জন্যই fundamental। React বা অন্য framework শেখার সময়ও primitive/non-primitive, mutability/immutability না বুঝলে সমস্যা হয়।

---

## 22. Day 01 থেকে মূল শিক্ষা

এই lesson থেকে সবচেয়ে গুরুত্বপূর্ণ learning points:

```text
JavaScript browser ও server—দুই জায়গাতেই run করতে পারে।
HTML structure দেয়, CSS style দেয়, JavaScript behavior দেয়।
Browser DevTools-এর console JavaScript শেখার জন্য গুরুত্বপূর্ণ।
console.log() দিয়ে output দেখা যায়।
HTML-এর ভেতরে JavaScript inline লেখা যায়, কিন্তু best practice হলো external file ব্যবহার করা।
script tag head-এ সাধারণভাবে দিলে DOM-related error হতে পারে।
body-এর শেষে script দিলে error কমে, কিন্তু performance issue থাকতে পারে।
async script parallel download করে, কিন্তু download শেষ হলেই execute হয়।
defer script parallel download করে, কিন্তু DOM ready হওয়ার পর execute হয়।
Main JavaScript file-এর জন্য defer সাধারণত best choice।
Independent third-party script-এর জন্য async useful।
Node.js দিয়ে JavaScript terminal/server-side-এ run করা যায়।
```

---

## 23. সহজ ভাষায় পুরো lesson-এর final summary

JavaScript হলো ওয়েবকে interactive করার language। Browser-এ JavaScript চালাতে DevTools console ব্যবহার করা যায়। প্রথম code হিসেবে `console.log()` দিয়ে message print করা হয়। বাস্তব project-এ JavaScript HTML-এর সঙ্গে যুক্ত করতে হয়। HTML webpage-এর structure বানায়, CSS design করে, আর JavaScript action যোগ করে।

JavaScript HTML-এ সরাসরি script tag দিয়ে লেখা যায়, কিন্তু clean code-এর জন্য আলাদা `.js` file বানানো ভালো। তবে script কোথায় বসানো হচ্ছে সেটা খুব গুরুত্বপূর্ণ। যদি script head-এ বসানো হয় এবং script এমন কোনো HTML element access করতে চায় যেটা তখনো browser parse করেনি, তাহলে error হবে। এই সমস্যা solve করার জন্য body-এর শেষে script রাখা যায়, কিন্তু performance-এর জন্য আরও ভালো হলো `defer` ব্যবহার করা।

`async` ও `defer` দুটোই script parallel download করে। কিন্তু `async` download শেষ হলেই execute হয়, তাই DOM ready না থাকলে error হতে পারে। `defer` অপেক্ষা করে পুরো HTML parse হওয়া পর্যন্ত, তারপর execute হয়। তাই DOM নিয়ে কাজ করলে `defer` সবচেয়ে safe ও recommended।

শেষে Node.js দেখানো হয়েছে, যাতে বোঝা যায় JavaScript শুধু browser নয়, server বা terminal environment-এও run করা যায়। Day 01-এর কাজ হলো environment setup করা, প্রথম HTML ও JS file বানানো, script link করা, async/defer experiment করা, এবং progress tracker update করা।
