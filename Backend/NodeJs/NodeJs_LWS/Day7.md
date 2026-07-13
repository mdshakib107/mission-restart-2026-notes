# একটি ছোট Node.js Application-এর Anatomy

## ভূমিকা

এই chapter-এ আমরা একটি ছোট Node.js application-এর anatomy বা ভেতরের কাঠামো ধাপে ধাপে বিশ্লেষণ করব। Application-টি জটিল নয়; এখানে ব্যবহৃত অধিকাংশ code-ই basic JavaScript। উদ্দেশ্য হলো code মুখস্থ করা নয়, বরং একটি পরিচ্ছন্ন, conventional এবং beginner-friendly Node.js application কীভাবে সাজানো যায়, সেটি বোঝা।

এই ছোট application-টি প্রতি নির্দিষ্ট সময় পরপর একটি text file থেকে random একটি code বা quote নির্বাচন করে console-এ print করবে। Application-টি খুব ছোট হলেও এর মধ্যে Node.js project structure, primary entry file, module import-export, core module, file reading, configuration, scaffolding, `setInterval()`, infinite execution এবং readable code-এর মতো গুরুত্বপূর্ণ বিষয় একসঙ্গে দেখা যাবে।

Instructor শুরুতেই পরিষ্কার করে দিয়েছেন যে এটি দেখে দেখে code করার বাধ্যবাধকতা নেই। মূল লক্ষ্য হলো Node.js শেখা শুরু করা একজন beginner-কে একটি basic standard Node.js application structure-এর সঙ্গে পরিচিত করা।

---

## Project Directory এবং Primary JavaScript File

প্রথমে repository-এর মধ্যে `lesson-seven` নামে একটি নতুন directory তৈরি করা হয়েছে। এই directory-এর ভেতরেই application-টি রাখা হয়েছে।

Node.js দিয়ে সাধারণত একটি primary JavaScript file run করা হয়। যেমন:

```bash
node index.js
```

অথবা:

```bash
node app.js
```

এই file-টিকে application-এর primary JavaScript file বা entry file বলা যায়। File-এর নাম বাধ্যতামূলকভাবে `index.js` বা `app.js` হতে হবে না; যেকোনো নাম দেওয়া যায়। তবে convention হিসেবে সাধারণত এই দুইটি নাম বেশি ব্যবহার করা হয়।

এই example-এ primary file হিসেবে `index.js` ব্যবহার করা হয়েছে। Node.js-কে এই file-এর নাম দিলে Node সেই file-এর JavaScript code execute করবে।

### Terminal থেকে File Run করা

ধরা যাক terminal বর্তমানে project-এর root directory-তে আছে, আর `index.js` file-টি রয়েছে `lesson-seven` directory-এর ভেতরে। সে ক্ষেত্রে root directory থেকেই file run করতে command হবে:

```bash
node lesson-seven/index.js
```

অন্যভাবে প্রথমে `lesson-seven` directory-তে যাওয়া যায়:

```bash
cd lesson-seven
```

তারপর file run করা যায়:

```bash
node index.js
```

Node.js সাধারণত `.js` extension নিজে ধরে নিতে পারে। তাই একই command সংক্ষেপে এভাবেও লেখা যায়:

```bash
node index
```

অর্থাৎ, terminal যে directory-তে আছে এবং primary file কোথায় আছে—এই দুইটি বিষয় বুঝে command দিতে হবে।

---

## `index.js` File-এর Overall Structure

Primary entry file `index.js`-কে কয়েকটি logical section-এ ভাগ করা হয়েছে:

1. Comment section  
2. Dependencies  
3. App object বা module scaffolding  
4. Configuration object  
5. Function declarations  
6. Function invocation  

এই structure বাধ্যতামূলক কোনো Node.js rule নয়। এটি code-কে readable, maintainable এবং organized রাখার একটি conventional approach।

---

## Comment Section

File-এর শুরুতে application সম্পর্কে কিছু comment রাখা হয়েছে। উদাহরণ হিসেবে সেখানে থাকতে পারে:

- Application-এর title
- Application কী করে তার সংক্ষিপ্ত description
- Author-এর নাম
- Creation date

উদাহরণ:

```js
/*
 * Title: Basic Node App Example
 * Description: Simple Node application that prints random codes per second interval
 * Author: Instructor Name
 * Date: 2017
 */
```

Date অবশ্যই এই format-এ লিখতে হবে—এমন নয়। একইভাবে comment section-এ কী কী থাকবে, সেটিও fixed নয়। Instructor নিজের code organize করার সুবিধার জন্য এই pattern ব্যবহার করেছেন।

এটি একটি standard practice: file খুললেই যেন developer বুঝতে পারে file-টির উদ্দেশ্য কী।

---

## Dependencies Section

Node.js application সাধারণত অনেক ছোট ছোট module-এর সমন্বয়ে তৈরি হয়। তাই primary file-এর শুরুতেই application-এর প্রয়োজনীয় module বা library import করে রাখা হয়।

এই application-এ দুইটি local dependency ব্যবহার করা হয়েছে:

```js
const mathLibrary = require('./lib/math');
const quotesLibrary = require('./lib/quotes');
```

এখানে কোনো third-party external package ব্যবহার করা হয়নি। দুইটি dependency-ই application-এর নিজস্ব JavaScript file বা folder থেকে এসেছে।

Dependencies section-এর কাজ হলো পরিষ্কারভাবে দেখানো:

- কোন module ব্যবহার হচ্ছে
- কোন library বাইরে থেকে আনা হচ্ছে
- কোন file-এর exported value কোন variable-এ রাখা হচ্ছে

`require()` কোনো file-এর exported value নিয়ে এসে একটি variable-এর মধ্যে সংরক্ষণ করে।

---

## App Object বা Module Scaffolding

এরপর একটি blank object তৈরি করা হয়েছে:

```js
const app = {};
```

Instructor এটিকে module scaffolding বলেছেন।

### Scaffolding Analogy

একটি building নির্মাণের সময় শুরুতে একটি structural framework তৈরি করা হয়। কোথাও বাঁশের কাঠামো থাকে, কোথাও concrete ঢালাইয়ের আগে কাঠের box বানানো হয়। পরে সেই কাঠামোর ভেতর প্রয়োজনীয় অংশ তৈরি হয়।

একইভাবে:

```js
const app = {};
```

এটি শুরুতে একটি blank structure। পরে application-এর function এবং property এই object-এর ভেতরে যোগ করা হবে।

উদাহরণ:

```js
app.printCode = function () {
  // ...
};

app.indefiniteLoop = function () {
  // ...
};
```

অর্থাৎ `app` object প্রথমে blank ছিল, তারপর ধীরে ধীরে populate করা হয়েছে।

---

## Configuration Object

Application-এর যেসব value ভবিষ্যতে পরিবর্তন হতে পারে, সেগুলো আলাদা configuration object-এ রাখা ভালো।

```js
app.config = {
  timeBetweenCodes: 1000,
};
```

এখানে `timeBetweenCodes`-এর value `1000` millisecond। অর্থাৎ প্রতি এক second পরপর একটি random code print হবে।

Configuration আলাদা রাখার সুবিধা হলো application logic-এর মধ্যে ছড়িয়ে-ছিটিয়ে hard-coded value রাখতে হয় না। পরে interval পরিবর্তন করতে হলে এক জায়গা থেকেই পরিবর্তন করা যাবে।

Instructor database password-এর উদাহরণ দিয়েছেন। যেমন database login credential অনেক সময় আলাদা config file-এ রাখা হয়। একইভাবে application-এর পরিবর্তনযোগ্য setting একটি configuration object-এ রাখা যায়।

একটি real application-এ configuration object-এর মধ্যে অনেক value থাকতে পারে।

---

## Function Declaration এবং Function Call

Application-এ মূলত দুইটি function আছে:

1. `printCode`
2. `indefiniteLoop`

প্রথমে function দুইটি declare করা হয়েছে। তখনও এগুলো execute হয়নি।

```js
app.printCode = function () {
  // একটি random code print করবে
};

app.indefiniteLoop = function () {
  // নির্দিষ্ট interval পরপর printCode call করবে
};
```

শেষে function invocation করা হয়েছে:

```js
app.indefiniteLoop();
```

এখানে `indefiniteLoop()` call হওয়ার পর এটি আবার নির্দিষ্ট interval-এ `printCode()` call করতে থাকবে।

---

## Entry Point হিসেবে `index.js`

`index.js` হলো পুরো application-এর entry point।

Node.js run করার সময় Node-কে শুধু এই file দেখানো হয়:

```bash
node index.js
```

Application-এর অন্য file সম্পর্কে Node-কে আলাদা করে বলা হয় না। `index.js` প্রয়োজনীয় module নিজে import করবে এবং application-এর flow শুরু করবে।

এই কারণে primary entry file application-এর basic building block হিসেবে কাজ করে।

---

# Dependency বিশ্লেষণ

## Local `math` Module Import

Primary file-এ math library import করা হয়েছে:

```js
const mathLibrary = require('./lib/math');
```

এখানে `.js` extension লেখা হয়নি। Node.js default হিসেবে JavaScript file ধরে নেয়।

অর্থাৎ:

```js
require('./lib/math');
```

Node সাধারণত এটিকে নিচের file হিসেবে resolve করবে:

```text
./lib/math.js
```

এই convenience-টি Node.js-এর একটি smart behavior। JavaScript file require করার সময় বারবার `.js` লিখতে হয় না।

`math.js` file যা export করবে, `require()` সেই exported value এনে `mathLibrary` variable-এর মধ্যে রাখবে।

এই variable-এর নাম developer-এর হাতে। `mathLibrary` না লিখে অন্য কোনো valid variable name ব্যবহার করলেও module-এর behavior বদলাবে না।

---

## Folder Import এবং Default `index.js`

দ্বিতীয় dependency:

```js
const quotesLibrary = require('./lib/quotes');
```

এখানে `quotes` নামে কোনো `quotes.js` file নেই; বরং `quotes` একটি folder।

Node.js যখন একটি folder require করে, তখন সেই folder-এর ভেতরে default entry file হিসেবে `index.js` খোঁজে।

অর্থাৎ:

```js
require('./lib/quotes');
```

প্রয়োজনে নিচের file resolve করতে পারে:

```text
./lib/quotes/index.js
```

তাই আলাদা করে লিখতে হয় না:

```js
require('./lib/quotes/index.js');
```

Folder-এর entry file-এর নাম `index.js` হলে শুধু folder path দিলেই যথেষ্ট।

এই অংশে দুই ধরনের local dependency import দেখা গেল:

```js
require('./lib/math');
```

এটি একটি JavaScript file resolve করছে।

```js
require('./lib/quotes');
```

এটি একটি folder-এর ভেতরের default `index.js` resolve করছে।

---

# `math.js` Module

## Module Structure

`math.js` file-এও একই ধরনের structure অনুসরণ করা হয়েছে:

1. Comment section  
2. Scaffolding object  
3. Function definition  
4. Function-কে object-এর property হিসেবে assign করা  
5. Object export করা  

উদাহরণ:

```js
const math = {};
```

এই blank object-ই module scaffolding।

---

## Random Number Function

Module-এ একটি function আছে, যার কাজ minimum এবং maximum value-এর মধ্যে random integer return করা।

```js
math.getRandomNumber = function (min, max) {
  let minimum = min;
  let maximum = max;

  minimum = Math.ceil(minimum);
  maximum = Math.floor(maximum);

  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};
```

যদি function-এ `1` এবং `6` দেওয়া হয়, তাহলে এটি `1` থেকে `6`-এর মধ্যে যেকোনো একটি random integer return করবে।

উদাহরণ:

```js
math.getRandomNumber(1, 6);
```

সম্ভাব্য output:

```text
1
```

অথবা:

```text
4
```

অথবা:

```text
6
```

প্রতিবার একই output আসবে না, কারণ function-টি random value তৈরি করছে।

Instructor বলেছেন, formula-টি JavaScript-এ দুইটি number-এর মধ্যে random number generate করার প্রচলিত solution থেকে inspired। এই lecture-এ formula-এর mathematical detail ব্যাখ্যা করা হয়নি; এখানে module structure এবং function ব্যবহারই মূল আলোচ্য।

---

## Function Parameter Reassign না করার Good Practice

Function-এর parameter:

```js
function (min, max)
```

কিন্তু function-এর ভেতরে সরাসরি `min` এবং `max` reassign করা হয়নি। প্রথমে local variable-এ নেওয়া হয়েছে:

```js
let minimum = min;
let maximum = max;
```

তারপর local variable modify করা হয়েছে:

```js
minimum = Math.ceil(minimum);
maximum = Math.floor(maximum);
```

সরাসরি এভাবে লেখা হলে linter warning দিতে পারে:

```js
min = Math.ceil(min);
max = Math.floor(max);
```

ESLint-এর `no-param-reassign` rule function parameter reassign করতে নিরুৎসাহিত করে।

সম্ভাব্য warning:

```text
Assignment to function parameter 'min'
```

এর অর্থ syntax error নয়; এটি best-practice warning।

### কেন Parameter Reassign করা নিরুৎসাহিত করা হয়

Function parameter অন্য কোনো জায়গা থেকে function-এ আসে। সেটি অন্য developer পাঠাতে পারে, কিংবা একই application-এর অন্য অংশ থেকে আসতে পারে।

Primitive value যেমন number-এর ক্ষেত্রে direct reassignment বাইরে থাকা original variable-কে সাধারণত mutate করবে না। কিন্তু array বা object reference নিয়ে কাজ করলে ভেতরে property পরিবর্তনের কারণে original data mutate হতে পারে।

এই কারণে function parameter নিয়ে কাজ করতে হলে separate local variable ব্যবহার করা safer এবং clearer practice।

### Technical Note

JavaScript-এ argument passing-কে সরাসরি “সবকিছু pass by reference” বলা সম্পূর্ণ নির্ভুল নয়। Primitive value value হিসেবে pass হয়; object-এর ক্ষেত্রে reference-এর value pass হয়। তবে Instructor-এর মূল সতর্কতা—parameter বা object অপ্রয়োজনে mutate না করা—practical code quality-এর দিক থেকে গুরুত্বপূর্ণ।

---

## Scaffolding Object-এ Function যোগ করা

Function-টি আলাদা কোনো standalone export হিসেবে না দিয়ে `math` object-এর property হিসেবে রাখা হয়েছে:

```js
math.getRandomNumber = function (min, max) {
  // ...
};
```

শেষে পুরো object export করা হয়েছে:

```js
module.exports = math;
```

এখন অন্য file যখন লিখবে:

```js
const mathLibrary = require('./lib/math');
```

তখন `mathLibrary` variable-এর মধ্যে এই object-টি আসবে:

```js
{
  getRandomNumber: [Function]
}
```

তাই function call করা যাবে:

```js
mathLibrary.getRandomNumber(1, 6);
```

Editor-এ `mathLibrary.` লেখার পর IntelliSense `getRandomNumber` suggest করতে পারে। Function-এর ওপর mouse রাখলে definition বা signature-ও দেখা যেতে পারে।

Instructor এই pattern নিয়মিত follow করেন:

1. শুরুতে blank object
2. Export করার function/property object-এ যোগ করা
3. শেষে object export করা

এর ফলে সব module-এ consistent pattern বজায় থাকে।

---

# `quotes` Module

## Folder Structure

`quotes` একটি folder। এর ভেতরে আছে:

```text
lib/
└── quotes/
    ├── index.js
    └── quotes.txt
```

`index.js` module logic পরিচালনা করে এবং `quotes.txt` file-এর line-গুলো read করে।

---

## Node.js Core `fs` Module

`quotes/index.js` file-এ প্রথমে `fs` module import করা হয়েছে:

```js
const fs = require('fs');
```

`fs` অর্থ File System।

এটি `node_modules` folder-এ install করা কোনো package নয়। `package.json`-এও dependency হিসেবে এটি থাকার প্রয়োজন নেই।

কারণ `fs` Node.js-এর একটি core module। Node.js install করার সময় এটি built-in অবস্থায় পাওয়া যায়।

তাই নিচের command চালাতে হয় না:

```bash
npm install fs
```

শুধু require করলেই ব্যবহার করা যায়:

```js
const fs = require('fs');
```

এটি application-এর বাইরের একটি module হলেও third-party npm package নয়; এটি Node.js runtime-এর core module।

---

## Quotes Module-এর Scaffolding

আবার একটি blank object তৈরি করা হয়েছে:

```js
const quotes = {};
```

শেষে এই object-ই export করা হবে।

---

## Text File থেকে Content Read করা

`quotes.txt` file-এ কয়েকটি code বা quote রাখা হয়েছে। প্রতিটি line-এ একটি করে quote আছে।

উদাহরণ structure:

```text
First code
Second code
Third code
Fourth code
Fifth code
Sixth code
```

File read করতে synchronous method ব্যবহার করা হয়েছে:

```js
const fileContents = fs.readFileSync(
  `${__dirname}/quotes.txt`,
  'utf8'
);
```

এখানে:

- `fs.readFileSync()` file synchronously read করে।
- File path হিসেবে `quotes.txt` দেওয়া হয়েছে।
- `'utf8'` encoding দেওয়া হয়েছে।

Encoding না দিলে Node.js সাধারণত `Buffer` return করতে পারে। `'utf8'` দেওয়ার কারণে text content string হিসেবে পাওয়া যায়।

### Expected Value

`fileContents` variable-এর মধ্যে পুরো file একটি string হিসেবে থাকবে:

```text
First code
Second code
Third code
Fourth code
Fifth code
Sixth code
```

এখনও এটি array নয়; এটি একটি single string, যার মধ্যে newline রয়েছে।

---

## `split()` Method বোঝা

Instructor `split()` বোঝাতে একটি সাধারণ string example দিয়েছেন।

ধরা যাক:

```js
const text = 'hello:world';
```

এখন colon দিয়ে split করলে:

```js
const parts = text.split(':');
```

Expected output:

```js
['hello', 'world']
```

কারণ `split(':')` string-টিকে colon-এর জায়গায় ভাগ করেছে।

- প্রথম element: `hello`
- দ্বিতীয় element: `world`

`split()`-এর মধ্যে plain string separator দেওয়া যায়।
Regular expression-ও দেওয়া যায়।

---

## Newline অনুযায়ী File Content Split করা

`quotes.txt` file-এর প্রতিটি line-কে array-এর আলাদা element বানাতে newline separator ব্যবহার করা হয়েছে:

```js
const arrayOfQuotes = fileContents.split(/\r?\n/);
```

এখানে regular expression ব্যবহার করে Windows এবং Unix—দুই ধরনের newline handle করা যায়।

Instructor regular expression-এর বিস্তারিত এই lecture-এ ব্যাখ্যা করেননি। শুধু দেখিয়েছেন যে `split()`-এ regular expression pass করা যায়।

এই operation-এর পর output হবে:

```js
[
  'First code',
  'Second code',
  'Third code',
  'Fourth code',
  'Fifth code',
  'Sixth code'
]
```

অর্থাৎ text file-এর প্রতিটি line array-এর একটি element হয়েছে।

---

## `allQuotes` Function

Text file read এবং split করার logic একটি function-এর মধ্যে রাখা হয়েছে:

```js
quotes.allQuotes = function () {
  const fileContents = fs.readFileSync(
    `${__dirname}/quotes.txt`,
    'utf8'
  );

  const arrayOfQuotes = fileContents.split(/\r?\n/);

  return arrayOfQuotes;
};
```

Function call করলে এটি quotes-এর array return করবে:

```js
quotes.allQuotes();
```

Expected return value:

```js
[
  'First code',
  'Second code',
  'Third code',
  'Fourth code',
  'Fifth code',
  'Sixth code'
]
```

শেষে scaffolding object export করা হয়েছে:

```js
module.exports = quotes;
```

Primary file-এ যখন লেখা হয়:

```js
const quotesLibrary = require('./lib/quotes');
```

তখন `quotesLibrary` একটি object পায়, যার মধ্যে `allQuotes` function আছে।

তাই call করা যায়:

```js
quotesLibrary.allQuotes();
```

---

# Primary Application Logic

এখন `index.js` file-এর মূল function flow দেখা যাক।

## `printCode` Function

এই function-এর কাজ:

1. সব quote/code নিয়ে আসা  
2. মোট কয়টি quote আছে তা বের করা  
3. Random index নির্বাচন করা  
4. সেই quote console-এ print করা  

সম্ভাব্য code:

```js
app.printCode = function () {
  const allQuotes = quotesLibrary.allQuotes();
  const numberOfQuotes = allQuotes.length;

  const randomNumber = mathLibrary.getRandomNumber(
    1,
    numberOfQuotes
  );

  const selectedQuote = allQuotes[randomNumber - 1];

  console.log(selectedQuote);
};
```

এখন প্রতিটি line-এর reasoning দেখা যাক।

### Step 1: সব Quote আনা

```js
const allQuotes = quotesLibrary.allQuotes();
```

`allQuotes()` function একটি array return করে।

ধরা যাক:

```js
[
  'Quote 1',
  'Quote 2',
  'Quote 3',
  'Quote 4',
  'Quote 5',
  'Quote 6'
]
```

### Step 2: মোট Quote সংখ্যা বের করা

```js
const numberOfQuotes = allQuotes.length;
```

ছয়টি element থাকলে:

```text
numberOfQuotes = 6
```

### Step 3: Random Number নেওয়া

```js
const randomNumber = mathLibrary.getRandomNumber(
  1,
  numberOfQuotes
);
```

এখানে range হবে `1` থেকে `6`।

ধরা যাক function return করল:

```text
5
```

### Step 4: Array Index হিসাব করা

JavaScript array index `0` থেকে শুরু হয়।

যদি random number `5` হয়, তাহলে পঞ্চম quote-এর index হবে:

```text
5 - 1 = 4
```

তাই:

```js
const selectedQuote = allQuotes[randomNumber - 1];
```

যদি `randomNumber` হয় `5`, তাহলে:

```js
allQuotes[4]
```

return করবে array-এর পঞ্চম element।

### Step 5: Console-এ Print করা

```js
console.log(selectedQuote);
```

সম্ভাব্য output:

```text
Quote 5
```

পরের call-এ অন্য quote আসতে পারে। আবার একই quote-ও আসতে পারে, কারণ selection random।

---

## Common Tricky Case: `-1` কেন?

Random function `1` থেকে quote count পর্যন্ত number দিচ্ছে।

কিন্তু array index:

```text
0, 1, 2, 3, 4, 5
```

তাই random number থেকে `1` বাদ দিতে হচ্ছে।

```js
allQuotes[randomNumber - 1]
```

`-1` না দিলে random number `6` হওয়ার সময় code `allQuotes[6]` access করবে, অথচ ছয় element-এর শেষ valid index হলো `5`। তখন output `undefined` হতে পারে।

---

# `indefiniteLoop` Function

Application-এর দ্বিতীয় function নির্দিষ্ট interval পরপর `printCode()` call করবে।

```js
app.indefiniteLoop = function () {
  setInterval(
    app.printCode,
    app.config.timeBetweenCodes
  );
};
```

`setInterval()` সাধারণত দুইটি গুরুত্বপূর্ণ argument নেয়:

1. কোন function বারবার execute হবে
2. কত millisecond পরপর execute হবে

এখানে:

```js
app.printCode
```

হলো callback function।

এবং:

```js
app.config.timeBetweenCodes
```

এর value:

```text
1000
```

অর্থাৎ প্রতি `1000` millisecond বা প্রতি এক second পরপর `app.printCode` execute হবে।

---

## Function Invocation

File-এর শেষে application flow শুরু করা হয়েছে:

```js
app.indefiniteLoop();
```

এখানে function call হওয়ার পর `setInterval()` চালু হয় এবং application প্রতি এক second পরপর random quote print করতে থাকে।

---

# সম্ভাব্য সম্পূর্ণ `index.js`

Lecture-এর flow অনুযায়ী primary file-এর structure এ রকম:

```js
/*
 * Title: Basic Node App Example
 * Description: Simple Node application that prints random codes per second interval
 * Author: Instructor Name
 * Date: 2017
 */

// Dependencies
const mathLibrary = require('./lib/math');
const quotesLibrary = require('./lib/quotes');

// App object - module scaffolding
const app = {};

// Configuration
app.config = {
  timeBetweenCodes: 1000,
};

// Print a random quote
app.printCode = function () {
  const allQuotes = quotesLibrary.allQuotes();
  const numberOfQuotes = allQuotes.length;

  const randomNumber = mathLibrary.getRandomNumber(
    1,
    numberOfQuotes
  );

  const selectedQuote = allQuotes[randomNumber - 1];

  console.log(selectedQuote);
};

// Loop indefinitely
app.indefiniteLoop = function () {
  setInterval(
    app.printCode,
    app.config.timeBetweenCodes
  );
};

// Start the loop
app.indefiniteLoop();
```

---

# সম্ভাব্য সম্পূর্ণ `math.js`

```js
/*
 * Title: Math Library
 * Description: Utility functions for mathematical operations
 */

// Module scaffolding
const math = {};

// Get a random integer between minimum and maximum
math.getRandomNumber = function (min, max) {
  let minimum = min;
  let maximum = max;

  minimum = Math.ceil(minimum);
  maximum = Math.floor(maximum);

  return Math.floor(
    Math.random() * (maximum - minimum + 1)
  ) + minimum;
};

// Export the module
module.exports = math;
```

---

# সম্ভাব্য সম্পূর্ণ `quotes/index.js`

```js
/*
 * Title: Quotes Library
 * Description: Read and return all quotes from text file
 */

// Dependencies
const fs = require('fs');

// Module scaffolding
const quotes = {};

// Get all quotes
quotes.allQuotes = function () {
  const fileContents = fs.readFileSync(
    `${__dirname}/quotes.txt`,
    'utf8'
  );

  const arrayOfQuotes = fileContents.split(/\r?\n/);

  return arrayOfQuotes;
};

// Export the module
module.exports = quotes;
```

---

# Application Run করা

সঠিক directory-তে গিয়ে command:

```bash
node index.js
```

অথবা:

```bash
node index
```

Expected console behavior:

```text
Quote 4
Quote 1
Quote 6
Quote 6
Quote 2
Quote 5
```

প্রতিটি line প্রায় এক second interval-এ আসবে।

### একই Quote আবার আসছে কেন?

Text file-এ quote মাত্র ছয়টি। প্রতিবার selection random হওয়ায় একই quote একাধিকবার নির্বাচিত হতে পারে।

Random selection মানে প্রতিটি quote একবার করে fixed order-এ আসবে—এমন নয়।

---

# Program কেন নিজে থেকে বন্ধ হচ্ছে না?

`setInterval()` একটি repeated timer active রাখে। তাই Node.js process-এর কাছে এখনও pending কাজ থাকে।

Application যেন event loop-কে বলছে:

> “আমি এখনও active আছি। আমাকে বন্ধ করো না। নির্দিষ্ট সময় পরপর আমার callback execute করতে হবে।”

এই কারণে terminal process চলতেই থাকে।

Program বন্ধ করতে terminal-এ সাধারণত ব্যবহার করা যায়:

```text
Ctrl + C
```

---

# Node.js Server-এর সঙ্গে এই Infinite Execution-এর সম্পর্ক

Instructor এই loop-এর সঙ্গে Node.js server-এর behavior তুলনা করেছেন।

যখন `http` module ব্যবহার করে server তৈরি করা হয় এবং `listen()` call করা হয়, server incoming request-এর অপেক্ষায় থাকে। ফলে Node.js process exit করে না।

Conceptually server event loop-কে active রাখে, কারণ ভবিষ্যতে request আসতে পারে।

এটি `setInterval()`-এর মতো exact একই internal mechanism নয়, কিন্তু beginner-এর perspective থেকে analogy-টি গুরুত্বপূর্ণ: উভয় ক্ষেত্রেই process-এর pending work থাকায় Node.js চলতে থাকে।

---

## Node.js Server বনাম Apache বা Nginx প্রসঙ্গ

Instructor উল্লেখ করেছেন, Node.js server application code-এর মাধ্যমে start এবং control করা যায়।

যেমন application:

- server start করতে পারে
- server listen করাতে পারে
- server close করতে পারে
- unhandled error হলে process unexpectedভাবে বন্ধও হয়ে যেতে পারে

Proper error handling না থাকলে একটি runtime error পুরো Node.js process terminate করতে পারে। এই বিষয়টি পরবর্তী tutorial-এ বিস্তারিত আলোচনা করা হবে।

---

# Readable এবং Maintainable Code

Instructor application-টির code organization-কে good code, beautiful code এবং readable code-এর example হিসেবে দেখিয়েছেন।

Code ভালো হওয়ার অর্থ শুধু খুব দ্রুত বড় application তৈরি করা নয়। Framework ব্যবহার করে এক ঘণ্টায় অনেক feature বানানো গেলেই একজন developer automatically good coder হয়ে যান না।

Good code-এর কয়েকটি গুরুত্বপূর্ণ বৈশিষ্ট্য:

- অন্য developer code পড়ে বুঝতে পারে
- Comment এবং naming flow পরিষ্কার করে
- Module-এর responsibility আলাদা থাকে
- Configuration আলাদা থাকে
- Entry point পরিষ্কার থাকে
- Function ছোট এবং উদ্দেশ্যভিত্তিক হয়
- একই pattern consistently follow করা হয়

Readable code গুরুত্বপূর্ণ শুধু নিজের জন্য নয়।

এটি গুরুত্বপূর্ণ:

- Team member-এর জন্য
- Future maintainer-এর জন্য
- Replacement developer-এর জন্য
- Company ছাড়ার পর codebase সামলানো ব্যক্তির জন্য

একজন developer code explain না করলেও অন্য developer যদি code দেখে logic বুঝতে পারে, সেটি good code-এর শক্তিশালী লক্ষণ।

এর জন্য rocket science দরকার নেই। দরকার:

- Concentration
- Best practice সম্পর্কে ধারণা
- নিয়মিত practice
- গুছিয়ে কাজ করার মানসিকতা

---

# Common Mistakes এবং Warnings

## 1. Wrong Directory থেকে File Run করা

ভুল:

```bash
node index.js
```

যখন terminal এমন directory-তে আছে যেখানে `index.js` নেই।

সঠিকভাবে হয় directory change করতে হবে:

```bash
cd lesson-seven
node index.js
```

অথবা full relative path দিতে হবে:

```bash
node lesson-seven/index.js
```

---

## 2. Core Module-এর জন্য অপ্রয়োজনীয় `npm install`

ভুল ধারণা:

```bash
npm install fs
```

এই application-এর জন্য এটি প্রয়োজন নেই, কারণ `fs` Node.js core module।

সঠিক:

```js
const fs = require('fs');
```

---

## 3. Encoding না দেওয়া

যদি লেখা হয়:

```js
fs.readFileSync(filePath);
```

তাহলে return value `Buffer` হতে পারে।

Text string পেতে:

```js
fs.readFileSync(filePath, 'utf8');
```

---

## 4. Array Index-এ `-1` ভুলে যাওয়া

Random range `1` থেকে `length`, কিন্তু array index `0` থেকে `length - 1`।

তাই:

```js
allQuotes[randomNumber - 1]
```

---

## 5. Function Parameter Directly Reassign করা

Linter warning হতে পারে:

```js
min = Math.ceil(min);
```

Clearer approach:

```js
let minimum = min;
minimum = Math.ceil(minimum);
```

---

## 6. Folder Require করার নিয়ম না বোঝা

এটি valid:

```js
require('./lib/quotes');
```

যদি folder-এর ভেতরে `index.js` থাকে।

---

## 7. Function Declare আর Function Call গুলিয়ে ফেলা

এটি declaration বা assignment:

```js
app.indefiniteLoop = function () {
  // ...
};
```

এটি invocation:

```js
app.indefiniteLoop();
```

Function define করলেই execute হয় না। Call করতে হয়।

---

## 8. Random মানেই Repeat হবে না—এমন ধরে নেওয়া

Random selection-এ একই value পরপর একাধিকবার আসতে পারে। এটি bug নয়।

---

# Interview Questions

## Question 1: Node.js Application-এর Entry Point কী?

**Answer:**  
যে primary JavaScript file Node command দিয়ে প্রথমে run করা হয় এবং যেখান থেকে application-এর অন্য module load ও execution flow শুরু হয়, সেটি entry point। Conventionally `index.js` বা `app.js` ব্যবহার করা হয়।

---

## Question 2: `.js` Extension না লিখেও `require()` কেন কাজ করে?

**Answer:**  
Node.js module resolution system পরিচিত extension নিজে resolve করতে পারে। তাই `require('./lib/math')` সাধারণত `math.js` file load করতে পারে।

---

## Question 3: Folder Require করলে Node.js কোন File খোঁজে?

**Answer:**  
সাধারণ ক্ষেত্রে folder-এর default entry হিসেবে `index.js` খোঁজা হয়। তাই `require('./lib/quotes')` folder-এর `index.js` load করতে পারে।

---

## Question 4: `fs` কি npm Package?

**Answer:**  
এই context-এ `fs` Node.js-এর built-in core module। এটি আলাদা করে `npm install` করতে হয় না।

---

## Question 5: `readFileSync()`-এ `'utf8'` না দিলে কী হতে পারে?

**Answer:**  
Text string-এর বদলে `Buffer` return হতে পারে।

---

## Question 6: `setInterval()` কেন Node.js Process-কে Running রাখে?

**Answer:**  
কারণ active interval ভবিষ্যতে callback execute করার pending কাজ তৈরি করে। Event loop-এর কাজ শেষ হয়নি বলে process exit করে না।

---

## Question 7: Array Access-এর সময় Random Number থেকে `1` বাদ দেওয়া হয়েছে কেন?

**Answer:**  
Random number `1` থেকে শুরু হলেও JavaScript array index `0` থেকে শুরু হয়। তাই logical position-কে array index-এ convert করতে `1` বাদ দেওয়া হয়েছে।

---

## Question 8: Module Scaffolding Pattern কী?

**Answer:**  
প্রথমে blank object তৈরি করা, তারপর exported function/property object-এর মধ্যে attach করা, এবং শেষে পুরো object `module.exports` দিয়ে export করা।

উদাহরণ:

```js
const math = {};

math.getRandomNumber = function () {
  // ...
};

module.exports = math;
```

---

## Question 9: Function Parameter Reassign করা কেন Avoid করা হয়?

**Answer:**  
এটি code clarity কমাতে পারে এবং object বা array mutate হওয়ার ঝুঁকি তৈরি করতে পারে। অনেক linting rule parameter reassignment-কে bad practice হিসেবে warning দেয়।

---

# Lecture Recap

এই lecture-এ একটি ছোট raw Node.js application-এর structure বিশ্লেষণ করা হয়েছে।

প্রথমে দেখা হয়েছে:

- Project directory কীভাবে organize করা হয়েছে
- `index.js` কীভাবে primary entry file হিসেবে কাজ করে
- Terminal থেকে Node.js file কীভাবে run করা হয়
- `.js` extension omit করা যায় কীভাবে

এরপর `index.js` file-কে logical section-এ ভাগ করা হয়েছে:

- Comment
- Dependencies
- Scaffolding
- Configuration
- Function declarations
- Function invocation

তারপর local module system দেখা হয়েছে:

- একটি file require করা
- একটি folder require করা
- Folder-এর `index.js` default entry হওয়া
- `module.exports` ব্যবহার করা
- Exported object import করা

`math.js` module থেকে random integer function নেওয়া হয়েছে।

`quotes` module-এ:

- Node.js core `fs` module ব্যবহার করা হয়েছে
- Text file synchronously read করা হয়েছে
- `'utf8'` encoding ব্যবহার করা হয়েছে
- Newline অনুযায়ী string split করে array তৈরি করা হয়েছে

Primary application:

- সব quote load করেছে
- Quote count বের করেছে
- Random number তৈরি করেছে
- Array index adjust করেছে
- Random quote console-এ print করেছে
- `setInterval()` দিয়ে প্রতি এক second পরপর একই flow repeat করেছে

শেষে readable code, team collaboration, maintainability এবং server process running থাকার concept আলোচনা করা হয়েছে।

---

# Course Direction

এই tutorial মূলত previous basic Node.js lesson-গুলোর একটি practical consolidation।

Instructor-এর বক্তব্য অনুযায়ী Node.js-এ মূল programming language JavaScript-ই। Node.js শেখার ক্ষেত্রে নতুন syntax-এর চেয়ে বেশি গুরুত্বপূর্ণ:

- Runtime behavior
- Module convention
- Core API
- File system
- Event loop
- Project organization
- Error handling
- Server lifecycle

Node.js ecosystem-এ Express.js খুব গুরুত্বপূর্ণ framework। Enterprise application সাধারণত raw Node.js দিয়ে সম্পূর্ণ তৈরি করা হয় না, কারণ তাতে অনেক repetitive infrastructure নিজে লিখতে হয়।

তবু raw Node.js আগে শেখানো হবে, কারণ base strong না হলে Express.js-এর abstraction, limitation এবং problem বুঝতে অসুবিধা হবে।

পরবর্তী কয়েকটি project raw Node.js দিয়ে দেখানোর পর Express.js-এ যাওয়া হবে।

---

# Final Recap

এই chapter-এর application খুব ছোট, কিন্তু একটি standard Node.js application-এর মৌলিক flow দেখায়:

```text
index.js
  ├── local module import
  ├── core module ব্যবহার
  ├── configuration
  ├── scaffolding object
  ├── file read
  ├── string থেকে array
  ├── random selection
  ├── console output
  └── setInterval দিয়ে continuous execution
```

সবচেয়ে গুরুত্বপূর্ণ শিক্ষা হলো: ভালো application শুধু কাজ করলেই যথেষ্ট নয়; code এমনভাবে organize করতে হবে যাতে অন্য developer সহজে পড়তে, বুঝতে এবং maintain করতে পারে।
