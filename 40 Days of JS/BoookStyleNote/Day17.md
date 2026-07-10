# JavaScript DOM পরিচিতি  
## Document Object Model, DOM Access এবং প্রথম Interactive Web Projects

> এটি কোনো summary, short note বা condensed explanation নয়। এখানে Instructor-এর lecture flow, project assignment, definitions, examples, warnings, mini projects, DevTools demonstrations, recap এবং task guidance বজায় রেখে বিষয়গুলোকে বাংলা programming book-এর একটি পূর্ণাঙ্গ অধ্যায়ের মতো সাজানো হয়েছে।

---

# ১. ভূমিকা: JavaScript কীভাবে Web Page-এর সঙ্গে কাজ করে?

তুমি কোনো website-এ গেলে হয়তো:

- একটি button click করো
- page scroll করো
- text box-এ লিখো
- কোনো element-এর color change করো
- popup দেখো
- popup close করো
- কোনো section hide করো
- কোনো content dynamically update হতে দেখো

প্রশ্ন হলো—এসব কীভাবে ঘটে?

সবচেয়ে ছোট উত্তর:

```text
DOM
```

DOM-এর পূর্ণরূপ:

```text
Document Object Model
```

এটি 40 Days of JavaScript-এর Day 17 এবং Module 3-এর প্রথম lesson। আগের Module 2-তে আমরা JavaScript-এর core concepts, objects, arrays, closure, `this`, operators এবং debugging শিখেছি। এখন থেকে আমরা browser-এ দৃশ্যমানভাবে JavaScript-এর কাজ দেখতে পাব।

এখন পর্যন্ত আমরা মূলত business logic এবং program logic নিয়ে কাজ করেছি। এখন সেই logic web page-এর সঙ্গে যুক্ত হবে।

এটাই DOM শেখার সবচেয়ে exciting অংশ।

---

# ২. Module 3-এর Updated Structure

Module 3 সম্পূর্ণভাবে DOM নিয়ে।

Updated flow:

1. Introduction to DOM
2. DOM Manipulation
3. JavaScript Event Handling
4. Advanced DOM Techniques
5. Real-World DOM Project

এই module শেষে তুমি এমন JavaScript application তৈরি করতে পারবে যা browser-এ দৃশ্যমানভাবে user interaction handle করবে।

---

# ৩. Module 2 Project Assignment: Expense Tracker

DOM শুরু করার আগে Module 2-এর project assignment সম্পন্ন করা জরুরি।

Project:

```text
Expense Tracker
```

এটি console-based project হবে।

কারণ এখনো DOM এবং asynchronous JavaScript শেখানো হয়নি। তাই এই project-এ DOM বা async feature ব্যবহার করা যাবে না।

ব্যবহার করতে হবে:

- Conditional operators
- Control flow
- Scope
- Closure
- `this`
- Objects
- Arrays
- Functions

---

## ৩.১ Expense Tracker কী করবে?

User যেন:

- Expense add করতে পারে
- Expense remove করতে পারে
- Expense update করতে পারে
- Total expense দেখতে পারে
- Category অনুযায়ী expense দেখতে পারে
- Highest expense দেখতে পারে
- Lowest expense দেখতে পারে
- User information দেখতে পারে
- সব expense দেখতে পারে
- User data update করতে পারে

---

## ৩.২ Main Factory Function

একটি function তৈরি করতে হবে:

```js
createExpenseTracker(username, initialBudget)
```

এই function দুটি argument নেবে:

- `username`
- `initialBudget`

এটি required functions expose করবে।

Conceptual structure:

```js
function createExpenseTracker(username, initialBudget) {
  // private data

  function addExpense() {}
  function removeExpense() {}
  function updateExpense() {}
  function getTotalExpense() {}
  function getExpensesByCategory() {}
  function getHighestExpense() {}
  function getLowestExpense() {}
  function getUserInfo() {}
  function showAllExpenses() {}
  function updateUserData() {}

  return {
    addExpense,
    removeExpense,
    updateExpense,
    getTotalExpense,
    getExpensesByCategory,
    getHighestExpense,
    getLowestExpense,
    getUserInfo,
    showAllExpenses,
    updateUserData
  };
}
```

---

## ৩.৩ গুরুত্বপূর্ণ Hint

Factory function ব্যবহার করো।

Closure ব্যবহার করে data private রাখো।

শুধু প্রয়োজনীয় method return করো।

এই pattern আগের lesson-গুলোতে counter, ATM এবং budget application-এর মাধ্যমে অনুশীলন করা হয়েছে।

---

# ৪. DOM কী?

Browser যখন একটি HTML page load করে, তখন HTML-কে শুধু raw text হিসেবে দেখে না।

Browser একটি tree-like structure তৈরি করে:

```text
DOM Tree
```

এই tree-তে প্রতিটি HTML element একটি node হিসেবে represent হয়।

---

## ৪.১ একটি Simple HTML Document

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>Introduction to DOM</title>
    <script src="index.js" defer></script>
  </head>

  <body>
    <h1>Welcome to Day 17</h1>

    <p>
      Hope you are enjoying 40 Days of JavaScript
    </p>
  </body>
</html>
```

এটিকে DOM tree হিসেবে ভাবলে:

```text
document
└── html
    ├── head
    │   ├── meta
    │   ├── meta
    │   ├── title
    │   │   └── "Introduction to DOM"
    │   └── script
    └── body
        ├── h1
        │   └── "Welcome to Day 17"
        └── p
            └── "Hope you are enjoying..."
```

---

## ৪.২ Root Node

DOM tree-এর root:

```text
document
```

`document` পুরো page-কে represent করে।

---

## ৪.৩ Parent, Child এবং Text Node

`html`-এর child:

- `head`
- `body`

`head`-এর child:

- `meta`
- `meta`
- `title`
- `script`

`title`-এর ভিতরের text একটি text node।

একইভাবে `h1`-এর text এবং `p`-এর text-ও text node।

---

# ৫. DOM এবং JavaScript-এর সম্পর্ক

DOM একটি programming interface।

এটি web document-কে এমনভাবে represent করে যাতে programming language:

- Structure read করতে পারে
- Content read করতে পারে
- Structure change করতে পারে
- Style change করতে পারে
- Content change করতে পারে

DOM না থাকলে JavaScript HTML বা SVG document-এর সঙ্গে interact করতে পারত না।

---

## ৫.১ DOM JavaScript-এর অংশ নয়

এটি একটি গুরুত্বপূর্ণ ধারণা।

DOM:

- JavaScript language-এর অংশ নয়
- নিজে programming language নয়
- Browser-provided programming interface

JavaScript DOM API ব্যবহার করে web page-এর সঙ্গে interact করে।

তাই “JavaScript DOM” বলার চেয়ে সঠিকভাবে বলা ভালো:

```text
DOM APIs used by JavaScript
```

Technically অন্য programming language-ও DOM interface ব্যবহার করতে পারে।

---

# ৬. এই Lesson-এর বাকি Topics

আমরা এখন শিখব:

- DOM types
- DOM terminology
- DOM access
- DOM query
- Mini projects
- DevTools দিয়ে DOM inspect
- Practice tasks

DOM manipulate করার আগে DOM access করতে জানতে হবে।

কারণ কোনো কিছু change করার আগে সেটিকে select করতে হবে।

---

# ৭. DOM Types

এই lesson-এ ছয়টি গুরুত্বপূর্ণ DOM type আলোচনা করা হবে:

1. Document
2. Node
3. Element
4. NodeList
5. Attribute
6. NamedNodeMap

---

# ৮. Document

`document` DOM tree-এর root object।

```js
console.log(document);
```

Browser console-এ পুরো HTML document দেখা যাবে।

---

## ৮.১ `document.head`

```js
console.log(document.head);
```

HTML-এর `<head>` element return করবে।

---

## ৮.২ `document.title`

```js
console.log(document.title);
```

Output:

```text
Introduction to DOM
```

---

## ৮.৩ `document.body`

```js
console.log(document.body);
```

পুরো `<body>` element return করবে।

---

## ৮.৪ `document.URL`

```js
console.log(document.URL);
```

Current page URL return করবে।

উদাহরণ:

```text
http://localhost:5500/day17/index.html
```

---

# ৯. Node

DOM tree-এর যেকোনো item-কে genericভাবে node বলা হয়।

Node হতে পারে:

- Element node
- Text node
- Attribute node
- Document node

DOM hierarchy বোঝার সময় `node` একটি broad term।

---

# ১০. Element

Element হলো একটি specific type of node, যা HTML element represent করে।

উদাহরণ:

```html
<p></p>
<div></div>
<li></li>
<h1></h1>
```

তাই:

```text
Every Element is a Node
But every Node is not necessarily an Element
```

Text node element নয়।

---

# ১১. NodeList

একাধিক node-এর ordered collection:

```text
NodeList
```

অনেক সময় `querySelectorAll()` একটি NodeList return করে।

এটি array-এর মতো দেখতে পারে এবং সাধারণত `forEach()` support করে।

কিন্তু NodeList standard JavaScript Array নয়।

---

# ১২. Attribute

HTML element-এর property-like metadata হলো attribute।

Example:

```html
<img
  src="photo.jpg"
  alt="Some image"
/>
```

এখানে:

- `src`
- `alt`

দুটি attribute।

---

# ১৩. NamedNodeMap

একটি element-এর attributes-এর collection:

```text
NamedNodeMap
```

NodeList ordered collection।

NamedNodeMap attribute collection, এবং ordering-এর ওপর নির্ভর করা উচিত নয়।

---

# ১৪. DOM Access বা DOM Query

DOM manipulate করার আগে element select করতে হবে।

JavaScript কয়েকটি method দেয়:

```js
document.getElementById()
document.getElementsByClassName()
document.getElementsByTagName()
document.querySelector()
document.querySelectorAll()
```

---

# ১৫. HTML Identifier: Tag, ID এবং Class

একটি element select করার জন্য ব্যবহার করা যায়:

- Tag name
- ID
- Class name
- CSS selector

Example:

```html
<h1 id="heading">
  Welcome to Day 17
</h1>
```

ID ideally একটি page-এ unique হওয়া উচিত।

Duplicate ID unexpected result তৈরি করতে পারে।

Class reusable:

```html
<p class="info">First paragraph</p>
<p class="info">Second paragraph</p>
```

---

# ১৬. `getElementById()`

```html
<h1 id="heading">
  Welcome to Day 17
</h1>
```

JavaScript:

```js
const titleElem =
  document.getElementById("heading");

console.log(titleElem);
```

Result:

```html
<h1 id="heading">
  Welcome to Day 17
</h1>
```

---

## ১৬.১ Variable Naming Practice

DOM element variable-এর শেষে `Elem` suffix দেওয়া যেতে পারে।

```js
const titleElem = ...
const inputElem = ...
const buttonElem = ...
```

এটি বাধ্যতামূলক নয়, কিন্তু readability বাড়ায়।

---

# ১৭. `getElementsByClassName()`

```html
<p class="info">
  Hope you are enjoying 40 Days of JavaScript
</p>

<p class="info">
  Make sure to subscribe to Tapascript
</p>
```

JavaScript:

```js
const infoElements =
  document.getElementsByClassName("info");

console.log(infoElements);
```

এটি return করে:

```text
HTMLCollection
```

কারণ একই class একাধিক element-এ থাকতে পারে।

---

## ১৭.১ HTMLCollection কী?

HTMLCollection:

- Array-like
- Indexed
- `length` আছে
- Standard Array নয়

```js
console.log(infoElements[0]);
console.log(infoElements[1]);
```

---

## ১৭.২ Spread দিয়ে Array Conversion

```js
[...infoElements].forEach(element => {
  console.log(element);
});
```

এখন standard Array methods ব্যবহার করা যায়।

Alternative:

```js
Array.from(infoElements)
  .forEach(element => {
    console.log(element);
  });
```

---

# ১৮. `getElementsByTagName()`

সব `<p>` element select করতে:

```js
const paragraphElements =
  document.getElementsByTagName("p");

console.log(paragraphElements);
```

এটিও return করে:

```text
HTMLCollection
```

---

# ১৯. `querySelector()`

`querySelector()` CSS selector ব্যবহার করে first matching element return করে।

```js
const paragraph =
  document.querySelector("p.info");

console.log(paragraph);
```

Selector:

```text
p.info
```

অর্থ:

> `info` class-সহ প্রথম paragraph element।

একাধিক match থাকলেও শুধু প্রথমটি return হবে।

---

# ২০. CSS Selector কী?

CSS selector হলো element select করার pattern।

কিছু basic selector:

```css
p
.info
#heading
p.info
ul li
ul#item-list li
```

Meaning:

| Selector | অর্থ |
|---|---|
| `p` | সব paragraph |
| `.info` | `info` class |
| `#heading` | `heading` ID |
| `p.info` | `info` class-এর paragraph |
| `ul li` | `ul`-এর ভিতরের `li` |
| `ul#item-list li` | নির্দিষ্ট ID-এর `ul`-এর সব `li` |

---

# ২১. `querySelectorAll()`

সব matching element select করতে:

```js
const paragraphs =
  document.querySelectorAll("p.info");

console.log(paragraphs);
```

Return:

```text
NodeList
```

---

## ২১.১ NodeList বনাম HTMLCollection

| Method | Return Type |
|---|---|
| `getElementsByClassName()` | `HTMLCollection` |
| `getElementsByTagName()` | `HTMLCollection` |
| `querySelectorAll()` | `NodeList` |

NodeList সাধারণত:

```js
paragraphs.forEach(...)
```

support করে।

---

# ২২. ID দিয়ে `querySelector()`

```js
const heading =
  document.querySelector("#heading");

console.log(heading);
```

`#` ID selector।

যেহেতু ID unique হওয়া উচিত, এখানে `querySelectorAll()` ব্যবহার সাধারণত প্রয়োজন হয় না।

---

# ২৩. DOM Access Methods Recap

| Method | Argument | Return |
|---|---|---|
| `getElementById()` | ID | Single element বা `null` |
| `getElementsByClassName()` | Class name | HTMLCollection |
| `getElementsByTagName()` | Tag name | HTMLCollection |
| `querySelector()` | CSS selector | First matching element বা `null` |
| `querySelectorAll()` | CSS selector | NodeList |

---

# ২৪. Mini Project 1: Text Highlighter

এখন একটি simple highlighter application তৈরি করা হবে।

Objective:

Button click করলে `info` class-এর paragraph-গুলোর background color yellow হবে।

---

## ২৪.১ HTML

```html
<p class="info">
  Hope you are enjoying 40 Days of JavaScript
</p>

<p class="info">
  Make sure to subscribe to Tapascript
</p>

<button onclick="highlightText()">
  Highlight
</button>
```

এখানে:

```html
onclick="highlightText()"
```

Button click হলে `highlightText()` function execute হবে।

---

## ২৪.২ প্রথমে Function Test

```js
function highlightText() {
  console.log("About to highlight text");
}
```

Button click করলে console-এ message দেখাবে।

এতে নিশ্চিত হওয়া যায় event function call হচ্ছে।

---

## ২৪.৩ Paragraph Select

```js
function highlightText() {
  const elements =
    document.querySelectorAll("p.info");

  console.log(elements);
}
```

`querySelectorAll()` ব্যবহার করা হয়েছে, কারণ:

- সব matching paragraph দরকার
- এটি NodeList দেয়
- সরাসরি `forEach()` করা যায়

---

## ২৪.৪ Style Object

প্রতিটি DOM element-এর `style` property থাকে।

```js
elements.forEach(element => {
  console.log(element.style);
});
```

Browser console-এ `CSSStyleDeclaration` object দেখা যায়।

---

## ২৪.৫ Background Color Change

```js
function highlightText() {
  const elements =
    document.querySelectorAll("p.info");

  elements.forEach(element => {
    element.style.backgroundColor =
      "yellow";
  });
}
```

Button click করলে paragraph-গুলোর background yellow হবে।

---

## ২৪.৬ গুরুত্বপূর্ণ Naming Rule

CSS property:

```css
background-color
```

JavaScript style property:

```js
backgroundColor
```

Hyphenated CSS property JavaScript-এ camelCase হয়।

আরও example:

```text
font-size        → fontSize
border-radius    → borderRadius
text-align       → textAlign
```

---

## ২৪.৭ Project Flow Recap

1. Button click
2. `highlightText()` call
3. `querySelectorAll("p.info")`
4. NodeList পাওয়া
5. `forEach()`
6. প্রতিটি element-এর style update
7. UI change

এটি 40 Days of JavaScript course-এর প্রথম দৃশ্যমান interactive project।

---

# ২৫. Event-এর প্রাথমিক ধারণা

User কোনো element-এর সঙ্গে interact করলে event হতে পারে।

Examples:

- Click
- Mouse over
- Key down
- Key up
- Input
- Change
- Submit

এই lesson-এ event handling গভীরভাবে শেখানো হচ্ছে না। শুধু mini project চালানোর জন্য inline event ব্যবহার করা হয়েছে।

পরবর্তী event lesson-এ বিস্তারিত শেখানো হবে:

- Event object
- Event listener
- Bubbling
- Capturing
- Delegation

---

# ২৬. Mini Project 2: Fruit Search Filter

এখন কিছুটা complex project।

UI:

- Search input
- Fruit list

User type করলে matching fruit দেখা যাবে।

List:

- Apple
- Banana
- Cherry
- Grapes
- Orange

---

## ২৬.১ HTML Structure

```html
<hr />

<input
  type="text"
  id="search-input"
  placeholder="Search"
  onkeyup="filterList()"
/>

<ul id="item-list">
  <li>Apple</li>
  <li>Banana</li>
  <li>Cherry</li>
  <li>Grapes</li>
  <li>Orange</li>
</ul>
```

`onkeyup` event-এ:

```js
filterList()
```

call হবে।

---

# ২৭. Search Input Select

```js
function filterList() {
  const inputElem =
    document.getElementById(
      "search-input"
    );

  const input =
    inputElem.value;
}
```

Input element-এর current text:

```js
inputElem.value
```

---

# ২৮. List Items Select

আমাদের প্রয়োজন:

```html
<ul id="item-list">
  <li>...</li>
</ul>
```

সব `li` select করতে:

```js
const items =
  document.querySelectorAll(
    "ul#item-list li"
  );
```

এই selector-এর অর্থ:

> `item-list` ID-এর `ul`-এর ভিতরের সব `li`।

---

# ২৯. `innerText`

প্রতিটি list item-এর visible text পেতে:

```js
item.innerText
```

Example:

```js
items.forEach(item => {
  console.log(item.innerText);
});
```

Output:

```text
Apple
Banana
Cherry
Grapes
Orange
```

---

# ৩০. Case-Insensitive Matching

User `a`, `A`, `app`, `APP`—বিভিন্ন case-এ লিখতে পারে।

তাই list item এবং input দুটিকে lowercase করা হবে।

```js
const matches =
  item.innerText
    .toLowerCase()
    .includes(
      input.toLowerCase()
    );
```

`includes()` true বা false return করবে।

---

# ৩১. Matching Item Highlight করা

```js
function filterList() {
  const inputElem =
    document.getElementById(
      "search-input"
    );

  const input = inputElem.value;

  const items =
    document.querySelectorAll(
      "ul#item-list li"
    );

  items.forEach(item => {
    const matches =
      item.innerText
        .toLowerCase()
        .includes(
          input.toLowerCase()
        );

    item.style.backgroundColor =
      matches
        ? "green"
        : "";
  });
}
```

Example:

- `a` → Apple, Banana, Grapes, Orange
- `ap` → Apple, Grapes
- `app` → Apple
- `xyz` → কোনো match নয়

---

# ৩২. Matching Item Show এবং Non-Matching Hide

আরও useful approach:

```js
item.style.display =
  matches
    ? "block"
    : "none";
```

Full function:

```js
function filterList() {
  const inputElem =
    document.getElementById(
      "search-input"
    );

  const searchText =
    inputElem.value.toLowerCase();

  const items =
    document.querySelectorAll(
      "ul#item-list li"
    );

  items.forEach(item => {
    const itemText =
      item.innerText.toLowerCase();

    const matches =
      itemText.includes(searchText);

    item.style.display =
      matches
        ? "block"
        : "none";
  });
}
```

---

## ৩২.১ Empty Search-এর Behaviour

Empty string সব string-এর ভিতরে included:

```js
"apple".includes("")
```

Result:

```text
true
```

তাই input empty করলে সব items আবার দেখা যাবে।

---

# ৩৩. Mini Project 2 Flow Recap

1. User input box-এ type করে
2. `keyup` event হয়
3. `filterList()` call হয়
4. Input element select
5. `.value` থেকে search text পাওয়া
6. সব `li` select
7. প্রতিটি item-এর `innerText` নেওয়া
8. দুটিকে lowercase করা
9. `includes()` দিয়ে match
10. Match হলে show
11. Match না হলে hide

---

# ৩৪. Why `querySelectorAll()`?

Alternative:

```js
document.getElementsByClassName(...)
```

বা:

```js
document.getElementsByTagName(...)
```

ব্যবহার করা যেত।

কিন্তু `querySelectorAll()`:

- Complex CSS selector support করে
- Directly relevant elements select করে
- NodeList return করে
- সাধারণত `forEach()` support করে

তাই এই use case-এ convenient।

---

# ৩৫. Task Guidance

Day 17-এর `task.md` file-এ DOM access-based tasks দেওয়া আছে।

সব task আজকের topics-এর ওপর ভিত্তি করে।

Practice ছাড়া DOM শেখা সম্পূর্ণ হবে না।

করতে হবে:

- Select by ID
- Select by class
- Select by tag
- Query selector
- Query selector all
- Loop through selected elements
- Style change
- Input value access
- Text filtering

Stuck হলে community discussion করতে বলা হয়েছে। Task complete করলে solution share করতে উৎসাহিত করা হয়েছে।

---

# ৩৬. DevTools দিয়ে DOM Explore

Elements tab পুরো HTML structure দেখায়।

Inspector tool select করে page-এর যেকোনো element click করলে corresponding DOM node highlight হয়।

---

# ৩৭. DevTools-এ Text Change

Elements panel-এ text node edit করা যায়।

Example:

Original:

```text
Make sure to subscribe to Tapascript
```

Change:

```text
Show your support by subscribing to Tapascript
```

Enter press করলে UI সঙ্গে সঙ্গে update হবে।

এটি temporary runtime change।

---

# ৩৮. DevTools-এ Element Add

Elements panel-এ HTML edit করে নতুন element add করা যায়।

Example:

```html
<div>This is a div</div>
```

Browser UI-তে সঙ্গে সঙ্গে দেখা যাবে।

---

# ৩৯. Element Hide, Delete এবং Duplicate

Elements panel থেকে:

- Hide element
- Delete element
- Duplicate element
- Edit attribute
- Edit text
- Edit HTML

করা যায়।

এগুলো non-programmatic runtime DOM manipulation।

---

# ৪০. Capture Node Screenshot

একটি নির্দিষ্ট DOM node-এর screenshot নেওয়া যায়।

Element-এর ওপর right-click:

```text
Capture node screenshot
```

এটি পুরো screen নয়; selected node-এর screenshot তৈরি করে।

Customer bug report বা visual issue documentation-এ useful।

---

# ৪১. Console-এ Selected Element: `$0`

Elements panel-এ selected element Console-এ access করা যায়:

```js
$0
```

যদি selected element:

```html
<p class="info">
  Hope you are enjoying 40 Days of JavaScript
</p>
```

Console:

```js
$0
```

সেই element return করবে।

---

## ৪১.১ `$0` দিয়ে Style Change

```js
$0.style.backgroundColor =
  "pink";
```

Selected element pink হবে।

---

# ৪২. Store as Global Variable

Console-এ element-এর ওপর right-click:

```text
Store as global variable
```

Browser temporary variable তৈরি করতে পারে:

```js
temp1
```

তারপর:

```js
temp1.style.backgroundColor =
  "pink";
```

UI update হবে।

---

# ৪৩. DevTools Change এবং Source Code

DevTools-এ runtime experiment করে behaviour যাচাই করা যায়।

তারপর:

- Actual source code-এ change copy করা যায়
- অথবা DevTools Workspace ব্যবহার করে local file sync করা যায়

এই workflow debugging lesson-এর সঙ্গে সম্পর্কিত।

---

# ৪৪. Selector Copy করা

Complex selector নিজে লিখতে না পারলে DevTools generate করতে পারে।

Element-এর ওপর right-click:

```text
Copy
```

Options:

- Copy element
- Copy JS path
- Copy styles
- Copy full XPath
- Copy selector

`Copy selector` করলে CSS selector clipboard-এ যায়।

তারপর:

```js
document.querySelector(
  "copied-selector"
);
```

ব্যবহার করা যায়।

---

# ৪৫. Testing Tool-এ Selector-এর গুরুত্ব

Playwright-এর মতো testing library element locator ব্যবহার করে।

Selector copy feature:

- Test automation
- UI testing
- Quick debugging
- Element targeting

এ useful।

তবে generated selector অনেক সময় overly-specific বা fragile হতে পারে। Production test-এ stable selector preferable:

- ID
- `data-testid`
- Role
- Accessible name

---

# ৪৬. DOM Access-এর Common Mistakes

## Mistake 1: Duplicate ID

```html
<h1 id="heading"></h1>
<p id="heading"></p>
```

ID unique হওয়া উচিত।

---

## Mistake 2: Wrong Selector Syntax

Wrong:

```js
document.querySelector("heading");
```

যদি ID হয়, correct:

```js
document.querySelector("#heading");
```

---

## Mistake 3: Class Selector-এ Dot না দেওয়া

Wrong:

```js
document.querySelector("info");
```

Correct:

```js
document.querySelector(".info");
```

---

## Mistake 4: `querySelector()` থেকে Multiple Result আশা

`querySelector()` শুধু first match return করে।

সব result:

```js
querySelectorAll()
```

---

## Mistake 5: HTMLCollection-এ সরাসরি সব Array Method

HTMLCollection real array নয়।

Use:

```js
Array.from(collection)
```

বা:

```js
[...collection]
```

---

## Mistake 6: Missing Element Handle না করা

```js
const elem =
  document.getElementById("missing");

console.log(elem);
```

Result:

```text
null
```

এরপর:

```js
elem.style.color = "red";
```

Error দেবে।

Safer:

```js
if (elem) {
  elem.style.color = "red";
}
```

---

## Mistake 7: `innerText` এবং `value` গুলিয়ে ফেলা

Input:

```js
inputElem.value
```

Paragraph বা list text:

```js
element.innerText
```

---

# ৪৭. Technical Clarifications

Lecture-এর মূল flow বজায় রেখে কয়েকটি precise clarification:

## NodeList Array নয়

NodeList array-এর মতো হলেও standard Array নয়।

কিছু NodeList `forEach()` support করে।

---

## `getElementsByClassName()` Method Name

Correct:

```js
document.getElementsByClassName()
```

এখানে `Elements` plural।

---

## `getElementsByTagName()` Method Name

Correct:

```js
document.getElementsByTagName()
```

এখানেও `Elements` plural।

---

## `querySelectorAll()` NodeList দেয়

এটি সাধারণত static NodeList return করে।

অন্যদিকে HTMLCollection সাধারণত live collection হতে পারে।

এই distinction পরবর্তী lesson-এ আরও গুরুত্বপূর্ণ হবে।

---

# ৪৮. Practice Projects

## Project 1: Multi-Color Highlighter

তিনটি button:

- Yellow
- Green
- Reset

Click অনুযায়ী paragraph background change করো।

---

## Project 2: Search with No Result Message

Fruit search project-এ কোনো match না থাকলে দেখাও:

```text
No result found
```

---

## Project 3: Case-Insensitive Student Search

Student names-এর list filter করো।

---

## Project 4: Select by Different Methods

একই element select করো:

```js
getElementById()
querySelector()
```

Result compare করো।

---

## Project 5: HTMLCollection Conversion

```js
getElementsByTagName("li")
```

থেকে array তৈরি করে `map()` ব্যবহার করো।

---

# ৪৯. Interview-Oriented Questions

1. DOM কী?
2. DOM কি JavaScript-এর অংশ?
3. DOM tree-এর root কী?
4. Node এবং Element-এর পার্থক্য কী?
5. Text node কী?
6. NodeList কী?
7. HTMLCollection কী?
8. NodeList এবং HTMLCollection-এর পার্থক্য কী?
9. `getElementById()` কী return করে?
10. `getElementsByClassName()` কী return করে?
11. `querySelector()` এবং `querySelectorAll()`-এর পার্থক্য কী?
12. CSS ID selector কীভাবে লিখবে?
13. CSS class selector কীভাবে লিখবে?
14. Input-এর text কীভাবে নেওয়া হয়?
15. DOM element-এর visible text কীভাবে নেওয়া হয়?
16. JavaScript দিয়ে inline style কীভাবে change করা হয়?
17. `$0` কী?
18. DevTools থেকে selector কীভাবে copy করবে?
19. Duplicate ID কেন সমস্যা?
20. Missing selector match করলে কী return হতে পারে?

---

# ৫০. Final Recap

এই chapter-এ আমরা শিখেছি:

- DOM-এর পূর্ণরূপ Document Object Model
- Browser HTML থেকে DOM tree তৈরি করে
- DOM web document-এর programming interface
- DOM JavaScript language-এর অংশ নয়
- JavaScript DOM APIs ব্যবহার করে page interact করে
- `document` DOM tree-এর root
- Node generic term
- Element specific HTML node
- NodeList node collection
- Attribute element metadata
- NamedNodeMap attribute collection
- `getElementById()` single element select করে
- `getElementsByClassName()` HTMLCollection দেয়
- `getElementsByTagName()` HTMLCollection দেয়
- `querySelector()` first match দেয়
- `querySelectorAll()` NodeList দেয়
- CSS selector DOM query-তে ব্যবহার করা যায়
- `value` input text দেয়
- `innerText` element text দেয়
- `style` দিয়ে inline CSS change করা যায়
- Button click থেকে JavaScript function call করা যায়
- Search filter case-insensitive করা যায়
- `display: none` দিয়ে element hide করা যায়
- DevTools দিয়ে DOM text, element ও style temporary change করা যায়
- `$0` selected element refer করে
- Node screenshot নেওয়া যায়
- Selector copy করা যায়
- Expense Tracker project core JavaScript concepts consolidate করবে

সবচেয়ে গুরুত্বপূর্ণ বিষয়:

> DOM access হলো DOM manipulation-এর প্রথম ধাপ। যে element change করতে চাও, প্রথমে সেটিকে সঠিকভাবে select করতে জানতে হবে।

পরবর্তী lesson-এ DOM manipulation আরও গভীরভাবে শেখানো হবে। আজ শেখা selector এবং access methods তখন বারবার ব্যবহৃত হবে।
