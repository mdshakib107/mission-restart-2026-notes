# JavaScript Array Master Course  
## Array কী, কীভাবে কাজ করে, এবং বাস্তব প্রোগ্রামিংয়ে কীভাবে ব্যবহার করতে হয়

> এটি কোনো summary বা short note নয়। এখানে lecture-এর মূল teaching flow, examples, warnings, interview-oriented observations, use cases এবং task references বজায় রেখে বিষয়গুলোকে প্রকাশযোগ্য বাংলা programming book chapter-এর মতো সাজানো হয়েছে।

---

## ১. ভূমিকা: Application, Data এবং Data Structure

যখন আমরা কোনো end user-এর জন্য application তৈরি করি, তখন data ছাড়া সেই application কার্যত কোনো কাজের হয় না। আর data থাকলে সেই data-কে সঠিকভাবে সংরক্ষণ, সংগঠিত, পরিবর্তন এবং ব্যবহার করার জন্য data structure প্রয়োজন।

আজ আমরা JavaScript-এর সবচেয়ে গুরুত্বপূর্ণ data structure-গুলোর একটি—`Array`—নিয়ে বিস্তারিতভাবে শিখব। শুধু JavaScript নয়, প্রায় সব programming language-এই array একটি মৌলিক ধারণা। কোনো programming language ভালোভাবে আয়ত্ত করতে চাইলে array-ও ভালোভাবে আয়ত্ত করতে হবে।

এই অধ্যায়ে আমরা খুব basic জায়গা থেকে শুরু করব:

- Array কী
- Array কীভাবে তৈরি করা হয়
- Array থেকে element কীভাবে access করা হয়
- Element কীভাবে add বা remove করা হয়
- Array কীভাবে copy বা clone করা হয়
- Array destructuring
- Rest parameter এবং spread operator
- Array-এর `length`
- গুরুত্বপূর্ণ array methods
- Static array methods
- Array-like object
- Iterator methods
- Mutability এবং immutability
- Real-world use cases
- Interview-oriented tricky cases

এটিকে crash course ভাবার দরকার নেই। বরং এটি একটি **master course**—যেখানে application development-এ JavaScript array ব্যবহার করতে প্রয়োজনীয় প্রায় সব গুরুত্বপূর্ণ ধারণা ধাপে ধাপে শেখানো হবে।

---

## ২. এই দীর্ঘ Lesson কীভাবে অনুসরণ করবে

এই lesson দীর্ঘ। তাই শুধু duration দেখে ভয় পাওয়ার দরকার নেই এবং দ্রুত শেষ করার চেষ্টা করাও উচিত নয়।

Quality learning অনেকটা ভালো খাবার খাওয়ার মতো। সামনে যদি খুব ভালো একটি meal থাকে, আমরা সেটি তাড়াহুড়ো করে শেষ করি না। ধীরে ধীরে খাই, উপভোগ করি, এবং শেষে মনে হয়—ভালো কিছু গ্রহণ করেছি।

Programming শেখাও একই রকম।

একটি অংশ শেখো, তারপর নিজেকে যাচাই করো:

- Concept বুঝেছ কি না
- নিজে code লিখতে পারছ কি না
- Expected output predict করতে পারছ কি না
- Method source array mutate করছে কি না
- একই কাজ অন্য পদ্ধতিতে করা যায় কি না

এরপর task solve করো। তারপর পরবর্তী অংশে যাও।

এই course-এর সঙ্গে ৫০টির বেশি task দেওয়া হয়েছে, এবং lecture অনুযায়ী পরে সংখ্যা ৭০-এরও বেশি হতে পারে। এর মধ্যে quiz, practice problem এবং interview-oriented প্রশ্ন রয়েছে। তাই শুধু video বা chapter শেষ করা নয়—task solve করাই learning সম্পূর্ণ করবে।

---

# Part I: Array-এর ভিত্তি

## ৩. JavaScript Array কী?

JavaScript-এ এক জোড়া square bracket একটি array প্রকাশ করে:

```js
[]
```

এটি একটি empty array।

Array-এর ভিতরে comma-separated element রাখা যায়:

```js
[1, 2, 3]
```

JavaScript array-এর একটি গুরুত্বপূর্ণ বৈশিষ্ট্য হলো—একই array-তে বিভিন্ন type-এর value রাখা যায়।

```js
const mixedArray = [
  100,
  true,
  "Tapascript",
  { name: "Alex" },
  [1, 2, 3]
];
```

এখানে আছে:

- `100` → number
- `true` → boolean
- `"Tapascript"` → string
- `{ name: "Alex" }` → object
- `[1, 2, 3]` → আরেকটি array

অর্থাৎ JavaScript array homogeneous হওয়া বাধ্যতামূলক নয়।

---

## ৪. Index কী?

Array-এর প্রতিটি element একটি নির্দিষ্ট position ধরে রাখে। সেই position-কে বলা হয় `index`।

JavaScript array-এর index সবসময় `0` থেকে শুরু হয়।

```js
const mixedArray = [100, true, "Tapascript", []];
```

এখানে:

| Element | Index |
|---|---:|
| `100` | `0` |
| `true` | `1` |
| `"Tapascript"` | `2` |
| `[]` | `3` |

যদি array-তে মোট `n`টি element থাকে, তাহলে:

```text
Last index = n - 1
```

অথবা:

```text
Last index = array.length - 1
```

উপরের array-তে ৪টি element আছে, তাই last index:

```text
4 - 1 = 3
```

### গুরুত্বপূর্ণ Rule

```text
Array index starts at 0.
Array index ends at array.length - 1.
```

---

## ৫. JavaScript Array Fixed-Length নয়

JavaScript array-এর length fixed নয়। প্রয়োজন অনুযায়ী length বাড়তে বা কমতে পারে।

পরবর্তীতে আমরা দেখব:

- Element add করলে length বাড়ে
- Element remove করলে length কমে
- `length` property সরাসরি পরিবর্তন করেও array shrink বা expand করা যায়

---

# Part II: Array তৈরি করা

## ৬. Array Literal Syntax

Array তৈরি করার সবচেয়ে straightforward উপায় হলো array literal syntax।

```js
const salad = [
  "🍅",
  "🍄",
  "🥦",
  "🥒",
  "🌽",
  "🥕",
  "🥑"
];
```

এখানে `salad` array-তে ৭টি element আছে।

- `"🍅"`-এর index `0`
- `"🥑"`-এর index `6`

Emoji-এর পরিবর্তে সাধারণ string-ও ব্যবহার করা যেত:

```js
const salad = [
  "Tomato",
  "Mushroom",
  "Broccoli"
];
```

---

## ৭. Constructor Function দিয়ে Array তৈরি

JavaScript-এ built-in `Array` constructor function ব্যবহার করেও array তৈরি করা যায়।

Constructor function-এর নাম convention অনুযায়ী capital letter দিয়ে শুরু হয়।

```js
const anotherSalad = new Array(
  "🍅",
  "🍄",
  "🥦",
  "🥒",
  "🌽",
  "🥕",
  "🥑"
);
```

এখন `salad` এবং `anotherSalad` দেখতে একই হলেও তারা একই array নয়।

```js
console.log(salad === anotherSalad);
```

Expected output:

```text
false
```

### কেন `false`?

কারণ array একটি non-primitive reference type।

দুটি array-তে একই value থাকলেও তারা আলাদা memory location-এ তৈরি হলে reference আলাদা হবে।

---

## ৮. Constructor-এর Tricky Case

এটি খুব গুরুত্বপূর্ণ।

```js
const arr = new Array(2);
```

অনেকে মনে করেন output হবে:

```js
[2]
```

কিন্তু বাস্তবে এটি ২ length-এর একটি array তৈরি করে, যার দুটি empty slot আছে।

Conceptually:

```text
[empty × 2]
```

```js
console.log(arr.length);
```

Output:

```text
2
```

কিন্তু:

```js
const arr = new Array(1, 2);
```

এখন output হবে:

```js
[1, 2]
```

### Rule

- `new Array(singleNumber)` → ওই number-কে length হিসেবে ধরে
- `new Array(value1, value2, ...)` → values-কে element হিসেবে ধরে

### Common Mistake

```js
new Array(5)
```

এটি `[5]` নয়। এটি length `5`-এর sparse array।

---

## ৯. Array তৈরির আরও উপায়

পরে আমরা শিখব:

```js
Array.of()
Array.from()
Array.fromAsync()
[...anotherArray]
```

এগুলো array static methods এবং spread operator-এর অংশ হিসেবে আলোচনা করা হবে।

---

# Part III: Array Element Access

## ১০. Index ব্যবহার করে Element Access

Array থেকে element নিতে square bracket-এর ভিতরে index দিতে হয়।

```js
const salad = [
  "🍅",
  "🍄",
  "🥦",
  "🥒",
  "🌽",
  "🥕",
  "🥑"
];

console.log(salad[0]);
console.log(salad[2]);
console.log(salad[5]);
```

Expected output:

```text
🍅
🥦
🥕
```

---

## ১১. Loop দিয়ে সব Element Access

প্রতিটি element-এর index মুখস্থ রাখা বাস্তব programming-এ সম্ভব নয়। তাই loop ব্যবহার করা হয়।

```js
for (let i = 0; i <= salad.length - 1; i++) {
  console.log(salad[i]);
}
```

আরও পরিচিতভাবে:

```js
for (let i = 0; i < salad.length; i++) {
  console.log(salad[i]);
}
```

### কেন `i = 0`?

কারণ array index `0` থেকে শুরু হয়।

### কেন `i < salad.length`?

কারণ last valid index হলো:

```js
salad.length - 1
```

---

# Part IV: Element Add এবং Remove

## ১২. `push()` — Array-এর শেষে Element যোগ

`push()` array-এর শেষে element যোগ করে।

```js
const salad = ["🍅", "🍄", "🥦"];

const returnedValue = salad.push("🥜");

console.log(salad);
console.log(returnedValue);
```

Expected output:

```text
["🍅", "🍄", "🥦", "🥜"]
4
```

### `push()` কী return করে?

নতুন array নয়। এটি updated array-এর নতুন length return করে।

### `push()` কি source array mutate করে?

হ্যাঁ।

```js
salad.push("🥜");
```

একই `salad` array পরিবর্তিত হয়।

---

## ১৩. `unshift()` — Array-এর শুরুতে Element যোগ

`unshift()` array-এর beginning-এ element যোগ করে।

```js
const salad = ["🍅", "🍄", "🥦"];

const returnedValue = salad.unshift("🥜");

console.log(salad);
console.log(returnedValue);
```

Expected output:

```text
["🥜", "🍅", "🍄", "🥦"]
4
```

`unshift()`-ও নতুন length return করে এবং source array mutate করে।

---

## ১৪. `pop()` — Array-এর শেষ Element remove

`pop()` array-এর শেষ element সরিয়ে দেয়।

```js
const salad = ["🍅", "🍄", "🥦", "🥜"];

const removed = salad.pop();

console.log(removed);
console.log(salad);
```

Expected output:

```text
🥜
["🍅", "🍄", "🥦"]
```

### `pop()` কী return করে?

যে element remove করেছে, সেটিই return করে।

### Source array?

Mutated হয়।

---

## ১৫. `shift()` — Array-এর প্রথম Element remove

`shift()` array-এর beginning থেকে একটি element remove করে।

```js
const salad = ["🥜", "🍅", "🍄", "🥦"];

const removed = salad.shift();

console.log(removed);
console.log(salad);
```

Expected output:

```text
🥜
["🍅", "🍄", "🥦"]
```

### চারটি Method মনে রাখো

| Method | কাজ | Return | Mutates? |
|---|---|---|---|
| `push()` | শেষে add | নতুন length | Yes |
| `unshift()` | শুরুতে add | নতুন length | Yes |
| `pop()` | শেষে remove | removed element | Yes |
| `shift()` | শুরুতে remove | removed element | Yes |

---

# Part V: Array Copy, Clone এবং Type Check

## ১৬. `slice()` দিয়ে Array Clone

```js
const salad = ["🍅", "🍄", "🥦"];

const saladCopy = salad.slice();

console.log(saladCopy);
console.log(salad === saladCopy);
```

Expected output:

```text
["🍅", "🍄", "🥦"]
false
```

`slice()` source array mutate করে না। এটি নতুন array তৈরি করে।

### Immutability-এর প্রথম ধারণা

Original data পরিবর্তন না করে copy তৈরি করে কাজ করা immutability-এর গুরুত্বপূর্ণ অংশ।

---

## ১৭. `Array.isArray()`

কোনো value array কি না তা নির্ধারণ করতে:

```js
console.log(Array.isArray([1, 2, 3]));
console.log(Array.isArray("🍅"));
console.log(Array.isArray({ tomato: "🍅" }));
console.log(Array.isArray([]));
```

Expected output:

```text
true
false
false
true
```

Empty array-ও array।

```js
const arr = [1, 2, 3, 4];

console.log(Array.isArray(arr));
```

Output:

```text
true
```

---

# Part VI: Array Destructuring

## ১৮. Destructuring কী?

ES6 থেকে array-এর একাধিক element একসঙ্গে extract করে variable-এ assign করা যায়।

ধরা যাক:

```js
const salad = ["🍅", "🍄", "🥕"];
```

Destructuring ছাড়া:

```js
const tomato = salad[0];
const mushroom = salad[1];
const carrot = salad[2];
```

Destructuring দিয়ে:

```js
const [tomato, mushroom, carrot] = salad;
```

Expected values:

```text
tomato   → 🍅
mushroom → 🍄
carrot   → 🥕
```

### গুরুত্বপূর্ণ Warning

`const`, `let` বা প্রয়োজন অনুযায়ী declaration keyword দিতে হবে।

```js
const [a, b] = [1, 2];
```

---

## ১৯. Default Value Assign

```js
const [tomato, mushroom = "🍄"] = ["🍅"];

console.log(tomato);
console.log(mushroom);
```

Output:

```text
🍅
🍄
```

Array-তে second element না থাকায় `mushroom` default value পেয়েছে।

---

## ২০. Value Skip করা

```js
const [tomato, , carrot] = ["🍅", "🍄", "🥕"];

console.log(tomato);
console.log(carrot);
```

Output:

```text
🍅
🥕
```

দুটি comma-এর মাঝের খালি position দিয়ে mushroom skip করা হয়েছে।

### Interview-Oriented Question

Array destructuring ব্যবহার করে middle value কীভাবে skip করবে?

```js
const [first, , third] = array;
```

---

# Part VII: Nested Array

## ২১. Nested Array কী?

একটি array-এর element হিসেবে আরেকটি array থাকলে তাকে nested array বলা হয়।

```js
const numbers = [
  1,
  2,
  [4, 5]
];
```

এখানে outer array-এর element সংখ্যা ৩টি:

1. `1`
2. `2`
3. `[4, 5]`

`4` ও `5` outer array-এর সরাসরি element নয়।

Nesting আরও গভীর হতে পারে:

```js
const nested = [
  1,
  2,
  [
    4,
    5,
    [
      6,
      8,
      [
        "Q"
      ]
    ]
  ]
];
```

---

## ২২. Nested Array Element Access

```js
const fruits = [
  "🍎",
  "🍌",
  "🍇",
  "🥭",
  ["🥦", "🌽", "🥕"]
];

const vegetables = fruits[4];
const carrot = vegetables[2];

console.log(carrot);
```

অথবা এক লাইনে:

```js
const carrot = fruits[4][2];
```

---

## ২৩. Nested Destructuring

Technically nested destructuring ব্যবহার করেও element নেওয়া যায়, কিন্তু syntax জটিল হতে পারে।

```js
const [, , , , [, , carrot]] = fruits;
```

এটি কাজ করলেও readability কমে।

Instructor-এর পরামর্শ অনুযায়ী, nested array-এর গভীর element access করার সময় অনেক ক্ষেত্রে এই syntax বেশি পরিষ্কার:

```js
const carrot = fruits[4][2];
```

### Technical Judgment

Destructuring সম্ভব হলেই ব্যবহার করতে হবে—এমন নয়। Readability গুরুত্বপূর্ণ।

---

# Part VIII: Rest Parameter এবং Spread Operator

## ২৪. একই `...`, কিন্তু দুই ভিন্ন কাজ

ES6 থেকে তিনটি dot:

```js
...
```

দুইভাবে ব্যবহৃত হয়:

- Rest parameter
- Spread operator

### পার্থক্য মনে রাখো

```text
Left side of assignment → Rest
Right side of assignment → Spread
```

---

## ২৫. Rest Parameter

```js
const salad = [
  "🍅",
  "🍄",
  "🥦",
  "🥒",
  "🌽",
  "🥕",
  "🥑"
];

const [tomato, mushroom, ...rest] = salad;

console.log(tomato);
console.log(mushroom);
console.log(rest);
```

Output:

```text
🍅
🍄
["🥦", "🥒", "🌽", "🥕", "🥑"]
```

`rest` বাকি element-গুলোকে নতুন array হিসেবে সংগ্রহ করে।

---

## ২৬. Spread Operator দিয়ে Clone

```js
const mySalad = ["🍅", "🍄", "🥦"];

const mySaladCopy = [...mySalad];

console.log(mySaladCopy);
console.log(mySalad === mySaladCopy);
```

Output:

```text
["🍅", "🍄", "🥦"]
false
```

Spread array-এর element-গুলোকে খুলে নতুন array-এর ভিতরে বসায়।

---

# Part IX: Destructuring Use Cases

## ২৭. Variable Swap

Destructuring ছাড়া swap করতে temporary variable লাগে।

Destructuring দিয়ে:

```js
let first = "😢";
let second = "😊";

[first, second] = [second, first];

console.log(first);
console.log(second);
```

Output:

```text
😊
😢
```

`let` ব্যবহার করা হয়েছে, কারণ value reassign করতে হবে।

---

## ২৮. Array Merge

```js
const emotions = ["😊", "😢"];
const veggies = ["🥦", "🥕"];

const emotionalVeggies = [
  ...emotions,
  ...veggies
];

console.log(emotionalVeggies);
```

Output:

```text
["😊", "😢", "🥦", "🥕"]
```

---

# Part X: Array Length

## ২৯. `length` একটি Property

```js
const arr = [11, 21, 73];

console.log(arr.length);
```

Output:

```text
3
```

এটি method নয়:

```js
arr.length
```

`arr.length()` নয়।

---

## ৩০. Constructor দিয়ে Empty Slots

```js
const arr = new Array(7);

console.log(arr.length);
```

Output:

```text
7
```

যদিও meaningful element নেই, length `7`।

---

## ৩১. Maximum Array Length

JavaScript array-এর theoretical maximum length:

```text
2^32 - 1
```

এর বেশি assign করলে `RangeError` হতে পারে।

```js
const arr = [];

arr.length = 2 ** 32;
```

Expected result:

```text
RangeError: Invalid array length
```

Negative length-ও invalid:

```js
arr.length = -1;
```

---

## ৩২. Length কমিয়ে Array Shrink

```js
const arr = [11, 21, 73];

arr.length = 2;

console.log(arr);
```

Output:

```text
[11, 21]
```

শেষ element permanently বাদ গেছে।

---

## ৩৩. Array Empty করার দ্রুত উপায়

```js
arr.length = 0;
```

এখন:

```js
console.log(arr);
```

Output:

```text
[]
```

---

## ৩৪. Length বাড়ালে Empty Slot

```js
const arr = [11, 21, 73];

arr.length = 9;

console.log(arr);
```

Conceptual output:

```text
[11, 21, 73, empty × 6]
```

Original element retained থাকে, নতুন position-গুলো empty slot হয়।

---

# Part XI: Core Array Methods

## ৩৫. `concat()`

এক বা একাধিক array merge করে নতুন array return করে।

```js
const first = [1, 2, 3];
const second = [4, 5, 6];

const merged = first.concat(second);

console.log(merged);
```

Output:

```text
[1, 2, 3, 4, 5, 6]
```

Source arrays unchanged থাকে।

```js
const third = [7, 8, 9];

const mergedAll = first.concat(second, third);
```

Output:

```text
[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

`concat()` immutable।

---

## ৩৬. `join()`

সব element-কে separator দিয়ে যুক্ত করে string return করে।

```js
const emotions = ["😊", "😢", "😡"];

console.log(emotions.join());
```

Output:

```text
😊,😢,😡
```

Default separator comma।

Custom separator:

```js
console.log(emotions.join(" | "));
```

Output:

```text
😊 | 😢 | 😡
```

Empty array:

```js
console.log([].join());
```

Output:

```text
""
```

অর্থাৎ empty string।

---

## ৩৭. `fill()`

Array-এর element-গুলোকে static value দিয়ে replace করে।

```js
const colors = ["red", "blue", "green"];

colors.fill("pink");

console.log(colors);
```

Output:

```text
["pink", "pink", "pink"]
```

`fill()` source array mutate করে।

### নির্দিষ্ট Range Fill

```js
const colors = ["red", "blue", "green"];

colors.fill("pink", 1, 3);
```

Output:

```text
["red", "pink", "pink"]
```

Signature:

```js
array.fill(value, start, end)
```

- `start` inclusive
- `end` exclusive

### Technical Note

Lecture-এ `end`-কে length-style boundary হিসেবে ব্যাখ্যা করা হয়েছে। JavaScript specification অনুযায়ী `end` আসলে exclusive index। এই example-এ `1` থেকে `3` মানে index `1` ও `2` পরিবর্তিত হবে।

---

## ৩৮. `includes()`

```js
const names = ["Tom", "Alex", "Bob", "John"];

console.log(names.includes("Tom"));
console.log(names.includes("July"));
```

Output:

```text
true
false
```

Case-sensitive:

```js
console.log(names.includes("tom"));
```

Output:

```text
false
```

---

## ৩৯. `indexOf()`

Element-এর first occurrence-এর index return করে।

```js
const names = ["Tom", "Alex", "Bob"];

console.log(names.indexOf("Alex"));
console.log(names.indexOf("Rob"));
```

Output:

```text
1
-1
```

না পেলে `-1`।

---

## ৪০. `lastIndexOf()`

Last occurrence-এর index দেয়।

```js
const names = ["Tom", "Alex", "Bob", "Tom"];

console.log(names.indexOf("Tom"));
console.log(names.lastIndexOf("Tom"));
```

Output:

```text
0
3
```

---

## ৪১. `reverse()`

```js
const names = ["Tom", "Alex", "Bob"];

names.reverse();

console.log(names);
```

Output:

```text
["Bob", "Alex", "Tom"]
```

`reverse()` source array mutate করে।

---

## ৪২. `sort()` — Default Behaviour

```js
const names = ["Tom", "Alex", "Bob"];

names.sort();

console.log(names);
```

Output:

```text
["Alex", "Bob", "Tom"]
```

Default sort:

1. Element-কে string-এ convert করে
2. Ascending order-এ sort করে

---

## ৪৩. Number Sort-এর Tricky Case

```js
const ages = [2, 10, 3, 1000, 12, 21];

ages.sort();

console.log(ages);
```

Numeric ascending আশা করলেও output lexical order অনুযায়ী হয়।

Conceptually:

```text
[10, 1000, 12, 2, 21, 3]
```

কারণ number-গুলো string হিসেবে compare হচ্ছে।

---

## ৪৪. Comparator Function

Ascending numeric sort:

```js
ages.sort((a, b) => a - b);
```

Descending numeric sort:

```js
ages.sort((a, b) => b - a);
```

String descending comparator:

```js
artists.sort((a, b) => {
  if (a === b) {
    return 0;
  }

  return a > b ? -1 : 1;
});
```

Comparator সাধারণত:

- Negative → `a` আগে
- Positive → `b` আগে
- Zero → order unchanged

`sort()` source array mutate করে।

---

# Part XII: `splice()` — Delete, Add, Replace

## ৪৫. Signature

```js
array.splice(start, deleteCount, item1, item2, ...)
```

### Parameters

- `start` → কোন index থেকে change শুরু হবে
- `deleteCount` → কতটি element delete হবে
- `item...` → কোন element add হবে

### Return

Deleted element-গুলোর array।

### Mutation

Source array mutate করে।

---

## ৪৬. শুধু Delete

```js
const names = ["Tom", "Alex", "Bob"];

const deleted = names.splice(0, 1);

console.log(deleted);
console.log(names);
```

Output:

```text
["Tom"]
["Alex", "Bob"]
```

---

## ৪৭. Replace

```js
const names = ["Tom", "Alex", "Bob"];

const deleted = names.splice(0, 1, "John");

console.log(deleted);
console.log(names);
```

Output:

```text
["Tom"]
["John", "Alex", "Bob"]
```

---

## ৪৮. Delete ছাড়াই Insert

```js
const names = ["Tom", "Alex", "Bob"];

const deleted = names.splice(1, 0, "Zack");

console.log(deleted);
console.log(names);
```

Output:

```text
[]
["Tom", "Zack", "Alex", "Bob"]
```

---

## ৪৯. Slice বনাম Splice

```text
slice  → copy করে, source mutate করে না
splice → add/delete/replace করে, source mutate করে
```

এটি interview-এ খুব সাধারণ প্রশ্ন।

---

# Part XIII: আধুনিক Access এবং Copy Methods

## ৫০. `at()`

Positive এবং negative index support করে।

```js
const foods = [
  "🌭",
  "🍔",
  "🍟",
  "🍕",
  "🍩",
  "🍰",
  "🍫",
  "🍿"
];

console.log(foods.at(0));
console.log(foods.at(3));
console.log(foods.at(-1));
console.log(foods.at(-5));
console.log(foods.at(-8));
console.log(foods.at(10));
```

Expected output:

```text
🌭
🍕
🍿
🍕
🌭
undefined
```

Negative index right side থেকে count করে।

---

## ৫১. `copyWithin()`

একই array-এর এক অংশকে একই array-এর অন্য position-এ copy করে।

Signature:

```js
array.copyWithin(target, start, end)
```

- `target` → কোথায় copy বসবে
- `start` → কোথা থেকে copy শুরু
- `end` → কোথায় শেষ; optional এবং exclusive

```js
const arr = [1, 2, 3, 4, 5, 6, 7];

arr.copyWithin(0, 3, 6);

console.log(arr);
```

Output:

```text
[4, 5, 6, 4, 5, 6, 7]
```

Source values cut হয় না; copy হয়।

আরেকটি example:

```js
const arr = [1, 2, 3, 4, 5, 6, 7];

arr.copyWithin(0, 4);

console.log(arr);
```

Output:

```text
[5, 6, 7, 4, 5, 6, 7]
```

`copyWithin()` source array mutate করে।

---

## ৫২. `flat()`

Nested array flatten করে।

```js
const arr = [0, 1, 2, [3, 4]];

console.log(arr.flat());
```

Output:

```text
[0, 1, 2, 3, 4]
```

Default depth `1`।

```js
const nested = [
  0,
  1,
  [2, [3, [4, 5]]]
];

console.log(nested.flat(1));
console.log(nested.flat(2));
console.log(nested.flat(Infinity));
```

Expected conceptual outputs:

```text
[0, 1, 2, [3, [4, 5]]]
[0, 1, 2, 3, [4, 5]]
[0, 1, 2, 3, 4, 5]
```

---

# Part XIV: Grouping Data

## ৫৩. `Object.groupBy()`

Array-এর object-গুলোকে key বা custom condition অনুযায়ী group করা যায়।

```js
const employees = [
  { name: "Bob", department: "Engineering", salary: 7000 },
  { name: "Ravi", department: "Engineering", salary: 6500 },
  { name: "Alex", department: "HR", salary: 4500 },
  { name: "Tom", department: "Sales", salary: 6000 },
  { name: "John", department: "Engineering", salary: 4000 }
];

const groupedByDepartment = Object.groupBy(
  employees,
  employee => employee.department
);

console.log(groupedByDepartment);
```

Result structure:

```js
{
  Engineering: [
    { name: "Bob", ... },
    { name: "Ravi", ... },
    { name: "John", ... }
  ],
  HR: [
    { name: "Alex", ... }
  ],
  Sales: [
    { name: "Tom", ... }
  ]
}
```

### Condition দিয়ে Group

```js
const groupedBySalary = Object.groupBy(
  employees,
  employee =>
    employee.salary >= 5000
      ? "moreThan5K"
      : "lessThan5K"
);
```

এখন business decision নেওয়া সহজ।

### Technical Note

`Object.groupBy()` আধুনিক JavaScript feature। পুরোনো runtime বা browser-এ polyfill বা alternative লাগতে পারে।

---

# Part XV: Mutability এবং Immutability

## ৫৪. Immutability কেন গুরুত্বপূর্ণ?

Mutable operation original data বদলে দেয়।

Immutable operation original data unchanged রেখে নতুন version তৈরি করে।

Data application-এর source of truth। যদি বিভিন্ন function original data সরাসরি পরিবর্তন করে, তাহলে পরে debug করা কঠিন হয়:

- কে পরিবর্তন করেছে
- কখন পরিবর্তন করেছে
- কোন state থেকে কোন state হয়েছে
- unexpected output কেন এসেছে

Immutable workflow-এ প্রতিটি change নতুন snapshot তৈরি করে। ফলে state transition trace করা সহজ হয়।

---

## ৫৫. `toReversed()`

`reverse()`-এর immutable version।

```js
const items = [1, 2, 3];

const reversedItems = items.toReversed();

console.log(items);
console.log(reversedItems);
```

Output:

```text
[1, 2, 3]
[3, 2, 1]
```

---

## ৫৬. `toSorted()`

`sort()`-এর immutable version।

```js
const months = [
  "March",
  "January",
  "February",
  "December"
];

const sortedMonths = months.toSorted();

console.log(months);
console.log(sortedMonths);
```

Original unchanged থাকে।

---

## ৫৭. `toSpliced()`

`splice()`-এর immutable version।

```js
const months = [
  "January",
  "March",
  "April",
  "May"
];

const months2 = months.toSpliced(
  1,
  0,
  "February"
);

console.log(months);
console.log(months2);
```

Output:

```text
["January", "March", "April", "May"]
["January", "February", "March", "April", "May"]
```

---

## ৫৮. `with()`

নির্দিষ্ট index-এর element replace করে নতুন array return করে।

```js
const numbers = [1, 2, 3, 4, 5];

const newArray = numbers.with(2, 6);

console.log(numbers);
console.log(newArray);
```

Output:

```text
[1, 2, 3, 4, 5]
[1, 2, 6, 4, 5]
```

Negative index support করে:

```js
const changed = numbers.with(-2, 8);

console.log(changed);
```

Output:

```text
[1, 2, 3, 8, 5]
```

### কেন এটি দরকার?

এই code:

```js
numbers[-2] = 8;
```

Array-এর second-last element বদলায় না। বরং `"-2"` নামে object property তৈরি করতে পারে।

কিন্তু:

```js
numbers.with(-2, 8);
```

সঠিকভাবে right side থেকে count করে।

---

# Part XVI: Array-Like Object

## ৫৯. Array-Like কী?

Array-like দেখতে array-এর মতো, কিন্তু আসলে array নয়।

সাধারণত এর:

- indexed property থাকে
- non-negative `length` থাকে

কিন্তু array-এর methods যেমন:

```js
push()
pop()
map()
forEach()
```

থাকতেই হবে—এমন নয়।

Example:

```js
const arrayLike = {
  0: "I",
  1: "am",
  2: "array-like",
  length: 3
};
```

Access করা যায়:

```js
console.log(arrayLike[2]);
console.log(arrayLike.length);
```

Output:

```text
array-like
3
```

কিন্তু:

```js
console.log(Array.isArray(arrayLike));
```

Output:

```text
false
```

---

## ৬০. Function-এর `arguments`

Traditional function-এর ভিতরে `arguments` একটি array-like object।

```js
function checkArgs() {
  console.log(arguments);
}

checkArgs(1, 45);
```

এতে indexed values এবং `length` আছে।

কিন্তু:

```js
arguments.pop();
```

Error দেবে, কারণ `arguments` real array নয়।

---

## ৬১. DOM Collection

```js
const listItems =
  document.getElementsByTagName("li");
```

এটি অনেক environment-এ `HTMLCollection` return করে। দেখতে array-এর মতো হলেও real array নয়।

সরাসরি:

```js
listItems.forEach(...)
```

সব ক্ষেত্রে কাজ নাও করতে পারে।

---

# Part XVII: Array-Like থেকে Array

## ৬২. Spread Operator

Iterable array-like-এর ক্ষেত্রে:

```js
function checkArgs() {
  const argsArray = [...arguments];

  argsArray.forEach(item => {
    console.log(item);
  });
}
```

### Technical Note

সব array-like object iterable নয়। Spread কেবল iterable হলে কাজ করবে।

---

## ৬৩. `Array.from()`

```js
const collection =
  document.getElementsByTagName("li");

const collectionArray =
  Array.from(collection);

collectionArray.forEach(item => {
  console.log(item);
});
```

`Array.from()` array-like বা iterable থেকে নতুন array তৈরি করে।

---

## ৬৪. `Array.fromAsync()`

`Array.fromAsync()` async iterable বা promise-producing input থেকে array তৈরি করতে পারে এবং promise return করে।

```js
const collectionPromise =
  Array.fromAsync(collection);

collectionPromise
  .then(value => {
    console.log(value);
  })
  .catch(error => {
    console.error(error);
  });
```

আরেকটি example:

```js
const resultPromise = Array.fromAsync({
  0: Promise.resolve("Tapascript"),
  1: Promise.resolve("Google"),
  2: Promise.resolve("Apple"),
  length: 3
});

resultPromise.then(value => {
  console.log(value);
});
```

Resolved output:

```text
["Tapascript", "Google", "Apple"]
```

### পার্থক্য

| Method | Return |
|---|---|
| `Array.from()` | Array |
| `Array.fromAsync()` | Promise of Array |

---

## ৬৫. `Array.of()`

যেকোনো সংখ্যক argument থেকে array তৈরি করে।

```js
const result = Array.of(
  2,
  true,
  "test",
  { name: "Alex" },
  [1, 2]
);

console.log(result);
```

Output:

```js
[
  2,
  true,
  "test",
  { name: "Alex" },
  [1, 2]
]
```

`Array.of(2)`:

```text
[2]
```

এটি `new Array(2)`-এর মতো empty slots তৈরি করে না।

---

# Part XVIII: Iterator Methods

## ৬৬. Customer Dataset

পরবর্তী methods বোঝার জন্য customer data ব্যবহার করা হবে।

```js
const customers = [
  {
    id: 1,
    firstName: "Abby",
    lastName: "Thomas",
    gender: "M",
    married: true,
    age: 32,
    expense: 500,
    purchased: ["Book", "Pen"]
  },
  {
    id: 2,
    firstName: "Jerry",
    lastName: "Tom",
    gender: "M",
    married: true,
    age: 64,
    expense: 450,
    purchased: ["Laptop"]
  },
  {
    id: 3,
    firstName: "Diana",
    lastName: "Cherry",
    gender: "F",
    married: true,
    age: 22,
    expense: 300,
    purchased: ["Book"]
  },
  {
    id: 4,
    firstName: "Dev",
    lastName: "Kumar",
    gender: "M",
    married: true,
    age: 82,
    expense: 900,
    purchased: ["Book"]
  },
  {
    id: 5,
    firstName: "Maria",
    lastName: "Gomes",
    gender: "F",
    married: false,
    age: 7,
    expense: 40,
    purchased: ["Toy"]
  }
];
```

---

## ৬৭. `filter()`

Condition pass করা element-গুলো নিয়ে নতুন array তৈরি করে।

```js
const seniorCustomers = customers.filter(
  customer => customer.age >= 60
);
```

Callback এখানে test function।

যদি callback `true` দেয়, element result array-তে থাকবে।

যদি `false` দেয়, element filter out হবে।

```js
console.log(seniorCustomers);
```

এখানে age `64` এবং `82`-এর customer থাকবে।

### Mental Model

```text
filter → test → true হলে রাখে
```

---

## ৬৮. `map()`

প্রতিটি element transform করে নতুন array return করে।

Use case: customer-এর full name এবং title তৈরি।

```js
const customersWithFullName =
  customers.map(customer => {
    let title;

    if (customer.gender === "M") {
      title = "Mr.";
    } else if (
      customer.gender === "F" &&
      customer.married
    ) {
      title = "Mrs.";
    } else {
      title = "Miss";
    }

    customer.fullName =
      `${title} ${customer.firstName} ${customer.lastName}`;

    return customer;
  });
```

### Mental Model

```text
map → transform
```

### Technical Note

উপরের code customer object-কে mutate করছে, যদিও outer array নতুন। আরও immutable version:

```js
const customersWithFullName =
  customers.map(customer => {
    const title =
      customer.gender === "M"
        ? "Mr."
        : customer.married
          ? "Mrs."
          : "Miss";

    return {
      ...customer,
      fullName:
        `${title} ${customer.firstName} ${customer.lastName}`
    };
  });
```

মূল lecture flow-এ existing object-এ property যোগ করে return করার পদ্ধতি দেখানো হয়েছে।

---

## ৬৯. `reduce()`

Array-এর অনেক value-কে একটি single value-তে reduce করে।

### Basic Sum

```js
const numbers = [1, 2, 3, 4, 5];

const result = numbers.reduce(
  (accumulator, currentValue) => {
    return accumulator + currentValue;
  },
  0
);

console.log(result);
```

Output:

```text
15
```

### Step-by-Step

Initial:

```text
accumulator = 0
```

Then:

```text
0 + 1 = 1
1 + 2 = 3
3 + 3 = 6
6 + 4 = 10
10 + 5 = 15
```

### Mental Model

```text
filter → test
map    → transform
reduce → combine into one value
```

---

## ৭০. Average Age of Customers Who Purchased Book

প্রথমে age total দরকার, তারপর customer count।

```js
let count = 0;

const totalAge = customers.reduce(
  (accumulator, customer) => {
    if (
      customer.purchased.includes("Book")
    ) {
      count++;
      return accumulator + customer.age;
    }

    return accumulator;
  },
  0
);

const averageAge =
  Math.floor(totalAge / count);

console.log(averageAge);
```

এই analytics দিয়ে business decision নেওয়া যায়—কোন age group বই বেশি কিনছে এবং inventory-তে কোন ধরনের book বাড়ানো দরকার।

### Common Mistake

যদি callback-এর সব branch থেকে accumulator return না করা হয়, পরবর্তী iteration-এ accumulator `undefined` হতে পারে।

---

## ৭১. `reduceRight()`

`reduce()` left-to-right কাজ করে।

`reduceRight()` right-to-left কাজ করে।

```js
const numbers = [100, 40, 15];

const leftResult = numbers.reduce(
  (acc, current) => acc - current
);

const rightResult = numbers.reduceRight(
  (acc, current) => acc - current
);

console.log(leftResult);
console.log(rightResult);
```

Output:

```text
45
-125
```

Explanation:

```text
reduce:
100 - 40 - 15 = 45
```

```text
reduceRight:
15 - 40 - 100 = -125
```

Addition-এর মতো commutative operation-এ result একই হতে পারে, subtraction-এ নয়।

---

## ৭২. `some()`

কমপক্ষে একটি element condition satisfy করলে `true`।

```js
const hasYoungCustomer = customers.some(
  customer => customer.age < 10
);

console.log(hasYoungCustomer);
```

Maria-এর age `7` হলে:

```text
true
```

### Mental Model

```text
some → অন্তত একটি
```

---

## ৭৩. `every()`

সব element condition satisfy করলে `true`।

```js
const areAllMarried = customers.every(
  customer => customer.married
);
```

একজনও unmarried থাকলে:

```text
false
```

### Mental Model

```text
every → সবাই
```

---

## ৭৪. `find()`

Condition match করা প্রথম element return করে।

```js
const youngCustomer = customers.find(
  customer => customer.age < 10
);

console.log(youngCustomer);
```

Matching customer object return হবে।

### Technical Note

Lecture-এ match না পেলে `null` বলা হয়েছে। Standard JavaScript behaviour অনুযায়ী `find()` match না পেলে `undefined` return করে।

---

## ৭৫. `findIndex()`

Matching element-এর প্রথম index return করে।

```js
const index = customers.findIndex(
  customer => customer.age < 10
);
```

Maria last element এবং total ৫টি customer হলে index:

```text
4
```

না পেলে:

```text
-1
```

---

## ৭৬. `findLast()` এবং `findLastIndex()`

`find()` left থেকে first match দেয়।

`findLast()` right থেকে first match—অর্থাৎ last matching element দেয়।

```js
const lastYoungCustomer =
  customers.findLast(
    customer => customer.age < 10
  );
```

`findLastIndex()` last matching element-এর index দেয়।

---

# Part XIX: Method Chaining

## ৭৭. Complex Use Case

Requirement:

> Married customer-রা মোট কত amount spend করেছেন?

Requirement breakdown:

1. Married customer filter করতে হবে
2. Expense নিতে হবে
3. Total করতে হবে

```js
const totalExpense = customers
  .filter(customer => customer.married)
  .map(customer => customer.expense)
  .reduce(
    (accumulator, expense) =>
      accumulator + expense,
    0
  );

console.log(totalExpense);
```

### Chaining Flow

```text
customers
  ↓ filter
married customers
  ↓ map
expenses
  ↓ reduce
single total
```

এভাবে real-world requirement-কে ছোট transformation step-এ ভাঙা হয়।

---

# Part XX: Final Iterator Methods

## ৭৮. `forEach()`

প্রতিটি element-এর জন্য callback execute করে।

```js
const arr = [1, 2, 3, 4, 5];

arr.forEach(element => {
  console.log(element);
});
```

Output:

```text
1
2
3
4
5
```

### Sum with `forEach()`

```js
let sum = 0;

arr.forEach(element => {
  sum = sum + element;
});

console.log(sum);
```

Output:

```text
15
```

### `forEach()` বনাম `map()`/`reduce()`

`forEach()` useful side-effect বা iteration-এর জন্য, কিন্তু meaningful transformed array বা reduced value return করে না।

- `map()` → new transformed array
- `reduce()` → single accumulated value
- `forEach()` → সাধারণত `undefined`

---

## ৭৯. `entries()`

Array iterator return করে, যেখানে প্রতিটি item:

```text
[index, value]
```

```js
const arr = [1, 2, 3, 4, 5];

const iterator = arr.entries();

console.log(iterator.next().value);
console.log(iterator.next().value);
```

Output:

```text
[0, 1]
[1, 2]
```

সাধারণ ব্যবহার:

```js
for (const [index, element] of arr.entries()) {
  console.log(index, element);
}
```

---

## ৮০. `values()`

শুধু value-এর iterator return করে।

```js
const iterator = arr.values();

for (const value of iterator) {
  console.log(value);
}
```

`entries()` দেয় index এবং value।

`values()` দেয় শুধু value।

---

## ৮১. `flatMap()`

প্রথমে `map()` করে, তারপর result-কে এক level `flat()` করে।

Simple case:

```js
const arr = [1, 2, 3, 4];

const result = arr.flatMap(
  item => item * 2
);

console.log(result);
```

Output:

```text
[2, 4, 6, 8]
```

এখানে flatten করার কিছু নেই।

Nested result:

```js
const result = arr.map(
  item => [item * 2]
);
```

Output:

```text
[[2], [4], [6], [8]]
```

`flatMap()`:

```js
const result = arr.flatMap(
  item => [item * 2]
);
```

Output:

```text
[2, 4, 6, 8]
```

### গুরুত্বপূর্ণ Rule

`flatMap()` শুধু এক level flatten করে।

যদি callback আরও গভীর nested array return করে:

```js
const result = arr.flatMap(
  item => [[item * 2]]
);
```

Output conceptual:

```text
[[2], [4], [6], [8]]
```

কারণ mapping-এর পরে structure তিন level হলে flatMap মাত্র এক level remove করে।

---

# Part XXI: Mutable বনাম Immutable Method Table

## ৮২. Source Array Mutate করে

নিচের method-গুলো original array পরিবর্তন করে:

```text
push
pop
shift
unshift
fill
reverse
sort
splice
copyWithin
```

Index assignment-ও mutate করে:

```js
array[2] = newValue;
```

---

## ৮৩. Source Array Mutate করে না

```text
slice
concat
includes
indexOf
lastIndexOf
at
flat
filter
map
reduce
reduceRight
some
every
find
findIndex
findLast
findLastIndex
toReversed
toSorted
toSpliced
with
entries
values
flatMap
```

### সতর্কতা

`map()` outer array নতুন করলেও callback-এর ভিতরে existing object mutate করলে nested object পরিবর্তিত হতে পারে। তাই reference semantics বুঝে কাজ করতে হবে।

---

# Part XXII: Common Mistakes এবং Tricky Cases

## ৮৪. `new Array(2)` ভুল বোঝা

```js
new Array(2)
```

এটি:

```text
[empty × 2]
```

`[2]` নয়।

---

## ৮৫. `push()` নতুন Array return করে না

```js
const result = arr.push(10);
```

`result` হলো new length।

---

## ৮৬. `sort()` Number-কে Numericভাবে Sort করে না

```js
[2, 10, 3].sort()
```

Expected numeric order দেয় না।

Use:

```js
[2, 10, 3].sort((a, b) => a - b)
```

---

## ৮৭. `slice()` বনাম `splice()`

- `slice()` → copy
- `splice()` → mutate, add/remove/replace

---

## ৮৮. Negative Index Bracket Access

```js
arr[-1]
```

Last element return করে না।

Use:

```js
arr.at(-1)
```

---

## ৮৯. `find()` Match না পেলে

Correct standard behaviour:

```text
undefined
```

---

## ৯০. `forEach()` Return Value

`forEach()` থেকে transformed array আশা করা ভুল।

```js
const result = arr.forEach(...);
```

সাধারণত:

```text
undefined
```

---

## ৯১. Sparse Array

`new Array(5)` বা length বাড়ানো sparse array তৈরি করতে পারে। Empty slot এবং explicit `undefined` এক জিনিস নয়; কিছু iterator method empty slot skip করতে পারে।

---

# Part XXIII: Interview Questions

## ৯২. Core Interview Questions

1. Array index কেন `0` থেকে শুরু হয়?
2. `array.length - 1` কেন last index?
3. `new Array(2)` এবং `Array.of(2)`-এর পার্থক্য কী?
4. `push()` কী return করে?
5. `pop()` কী return করে?
6. `slice()` এবং `splice()`-এর পার্থক্য কী?
7. কোন array methods source mutate করে?
8. `sort()` numbers-এর ক্ষেত্রে ভুল output কেন দেয়?
9. `filter()`, `map()`, `reduce()`-এর callback-এর mental model কী?
10. `some()` এবং `every()`-এর পার্থক্য কী?
11. `find()` এবং `filter()`-এর পার্থক্য কী?
12. `findIndex()` match না পেলে কী return করে?
13. `at(-1)` কেন useful?
14. Array-like object কী?
15. `arguments` real array কি না?
16. `Array.from()` এবং `Array.fromAsync()`-এর পার্থক্য কী?
17. Rest parameter এবং spread operator কীভাবে আলাদা করবে?
18. Destructuring দিয়ে value কীভাবে skip করবে?
19. Destructuring দিয়ে দুই variable swap কীভাবে করবে?
20. `flatMap()` কত level flatten করে?

---

# Part XXIV: Assignment / Task

## ৯৩. Practice Tasks

Transcript অনুযায়ী task list আলাদা `task.md` file-এ দেওয়া হয়েছে। সেখানে basic থেকে advanced পর্যন্ত বহু task আছে।

Practice-এর জন্য অন্তত নিচের কাজগুলো করো:

### Task 1: Constructor দিয়ে Array

৫টি element-এর array তৈরি করো:

```js
new Array(...)
```

### Task 2: Empty Slots

৩টি empty slot-এর array তৈরি করো।

### Task 3: Loop

একটি food array-এর সব element loop দিয়ে print করো।

### Task 4: Last Eight Elements

বড় একটি array থেকে শেষ ৮টি element বের করো।

### Task 5: Add এবং Remove

`push`, `unshift`, `pop`, `shift` ব্যবহার করে source array-এর পরিবর্তন observe করো।

### Task 6: Clone

একই array clone করো:

```js
slice()
spread operator
```

তারপর strict equality test করো।

### Task 7: Destructuring

- Default value
- Skip value
- Rest parameter
- Swap
- Merge

### Task 8: Sorting

একটি number array:

- Default sort
- Ascending comparator
- Descending comparator

দিয়ে compare করো।

### Task 9: `splice()`

একই method দিয়ে:

- Delete
- Insert
- Replace

করো।

### Task 10: Array-Like

নিজে array-like object তৈরি করো এবং:

```js
Array.isArray()
Array.from()
```

দিয়ে test করো।

### Task 11: Customer Data

একটি customer array থেকে:

- Senior customer filter
- Full name map
- Total expense reduce
- Young customer find
- Married customer every
- Child customer some

solve করো।

### Task 12: Chaining

`filter → map → reduce` chain ব্যবহার করে business problem solve করো।

### Task 13: Immutable Alternatives

একই operation mutable এবং immutable method দিয়ে করো:

```text
reverse / toReversed
sort / toSorted
splice / toSpliced
index assignment / with
```

### Task 14: `flatMap()` Quiz

Predict করো:

```js
[1, 2, 3].flatMap(
  item => [[item * 2]]
);
```

কেন output fully flat নয়—ব্যাখ্যা করো।

---

# Final Recap

এই chapter-এ আমরা JavaScript array-এর প্রায় সম্পূর্ণ practical foundation তৈরি করেছি।

আমরা দেখেছি:

- Array একটি indexed collection
- Index `0` থেকে শুরু হয়
- Last index হলো `length - 1`
- Literal এবং constructor দিয়ে array তৈরি হয়
- `new Array(singleNumber)` একটি গুরুত্বপূর্ণ tricky case
- `push`, `unshift`, `pop`, `shift` source mutate করে
- `slice` এবং spread clone তৈরি করে
- `Array.isArray()` type detection-এর standard পদ্ধতি
- Array destructuring code ছোট করে
- Rest বাকি element collect করে
- Spread element expand করে
- Destructuring দিয়ে swap এবং merge করা যায়
- `length` property সরাসরি array shrink, expand বা empty করতে পারে
- `concat`, `join`, `fill`, `includes`, `indexOf`, `reverse`, `sort`, `splice`, `at`, `copyWithin`, `flat` গুরুত্বপূর্ণ
- `Object.groupBy()` data grouping সহজ করে
- `toReversed`, `toSorted`, `toSpliced`, `with` immutable programming সহজ করে
- Array-like object দেখতে array-এর মতো হলেও real array নয়
- `Array.from`, `Array.fromAsync`, `Array.of` গুরুত্বপূর্ণ static method
- `filter` test করে
- `map` transform করে
- `reduce` single value তৈরি করে
- `some` অন্তত একটি match দেখে
- `every` সব element match দেখে
- `find` matching element দেয়
- `findIndex` matching index দেয়
- Method chaining real-world data processing-এর শক্তিশালী পদ্ধতি
- `forEach`, `entries`, `values`, `flatMap` iteration এবং transformation-এ গুরুত্বপূর্ণ

সবচেয়ে গুরুত্বপূর্ণ বিষয় হলো—শুধু method-এর নাম মুখস্থ করলে array আয়ত্ত হবে না। প্রতিটি method-এর:

- input
- return value
- mutation behaviour
- callback purpose
- real-world use case
- edge case

নিজে code লিখে পরীক্ষা করতে হবে।

Object এবং Array ভালোভাবে বুঝতে পারলে JavaScript-এ data handling, problem solving এবং application development-এর বড় একটি অংশ অনেক সহজ হয়ে যায়।
