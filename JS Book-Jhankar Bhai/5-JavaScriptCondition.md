# সূচিপত্র

- [নো কনফিউশন — গুরুত্বপূর্ণ নোট](#নো-কনফিউশন--গুরুত্বপূর্ণ-নোট)
  - [Condition কী?](#condition-কী)
  - [if কীভাবে কাজ করে?](#if-কীভাবে-কাজ-করে)
  - [Condition false হলে](#condition-false-হলে)
  - [Variable দিয়ে Condition](#variable-দিয়ে-condition)
  - [if...else](#ifelse)
  - [Boolean condition উদাহরণ](#boolean-condition-উদাহরণ)
  - [Comparison condition উদাহরণ](#comparison-condition-উদাহরণ)
  - [মূল শিক্ষা](#মূল-শিক্ষা)
- [পরীক্ষার জন্য গুরুত্বপূর্ণ প্রশ্ন](#পরীক্ষার-জন্য-গুরুত্বপূর্ণ-প্রশ্ন)
- [ছাত্র যখন পাত্র — গুরুত্বপূর্ণ নোট](#ছাত্র-যখন-পাত্র--গুরুত্বপূর্ণ-নোট)
  - [মূল ধারণা](#মূল-ধারণা)
  - [AND &&](#and)
  - [AND false হলে](#and-false-হলে)
  - [OR ||](#or)
  - [OR true হলে](#or-true-হলে)
  - [&& বনাম ||](#বনাম)
  - [মূল শিক্ষা](#মূল-শিক্ষা)
- [পরীক্ষার জন্য গুরুত্বপূর্ণ প্রশ্ন](#পরীক্ষার-জন্য-গুরুত্বপূর্ণ-প্রশ্ন)
- [ডিসকাউন্ট খেকো else-if — গুরুত্বপূর্ণ নোট](#ডিসকাউন্ট-খেকো-else-if--গুরুত্বপূর্ণ-নোট)
  - [মূল ধারণা](#মূল-ধারণা)
  - [if...else দিয়ে Discount](#ifelse-দিয়ে-discount)
  - [Percentage হিসাব](#percentage-হিসাব)
  - [else if কী?](#else-if-কী)
  - [Discount-এর Multiple Condition](#discount-এর-multiple-condition)
  - [else if কীভাবে কাজ করে?](#else-if-কীভাবে-কাজ-করে)
  - [গুরুত্বপূর্ণ উদাহরণ](#গুরুত্বপূর্ণ-উদাহরণ)
  - [মূল শিক্ষা](#মূল-শিক্ষা)
- [পরীক্ষার জন্য গুরুত্বপূর্ণ প্রশ্ন](#পরীক্ষার-জন্য-গুরুত্বপূর্ণ-প্রশ্ন)
- [স্যারের বাঁশ বাসায় ঠাস — গুরুত্বপূর্ণ নোট](#স্যারের-বাঁশ-বাসায়-ঠাস--গুরুত্বপূর্ণ-নোট)
  - [মূল ধারণা](#মূল-ধারণা)
  - [If-Else, Else-If, Nested If-Else পার্থক্য](#if-else-else-if-nested-if-else-পার্থক্য)
  - [Nested If-Else উদাহরণ](#nested-if-else-উদাহরণ)
  - [কোডের ব্যাখ্যা](#কোডের-ব্যাখ্যা)
  - [মূল শিক্ষা](#মূল-শিক্ষা)
- [পরীক্ষার জন্য গুরুত্বপূর্ণ প্রশ্ন](#পরীক্ষার-জন্য-গুরুত্বপূর্ণ-প্রশ্ন)
- [লজিক্যাল নট ! ও টার্নারি অপারেটর — গুরুত্বপূর্ণ নোট](#লজিক্যাল-নট--ও-টার্নারি-অপারেটর--গুরুত্বপূর্ণ-নোট)
  - [Logical Not ! কী?](#logical-not--কী)
  - [Boolean সরাসরি condition-এ ব্যবহার](#boolean-সরাসরি-condition-এ-ব্যবহার)
  - [! ব্যবহার](#ব্যবহার)
  - [! এর কাজ](#এর-কাজ)
- [Ternary Operator](#ternary-operator)
  - [Ternary Operator কী?](#ternary-operator-কী)
  - [সাধারণ if-else](#সাধারণ-if-else)
  - [একই কাজ Ternary দিয়ে](#একই-কাজ-ternary-দিয়ে)
  - [Variable Value Set করতে Ternary](#variable-value-set-করতে-ternary)
  - [মূল শিক্ষা](#মূল-শিক্ষা)
- [পরীক্ষার জন্য গুরুত্বপূর্ণ প্রশ্ন](#পরীক্ষার-জন্য-গুরুত্বপূর্ণ-প্রশ্ন)

# নো কনফিউশন — গুরুত্বপূর্ণ নোট

## Condition কী?

Condition মানে শর্ত।

JavaScript-এ কোনো শর্ত সত্য হলে এক ধরনের কাজ করা যায়।

শর্ত মিথ্যা হলে কোডটি কাজ নাও করতে পারে বা অন্য কাজ করতে পারে।

---

## if কীভাবে কাজ করে?

```javascript
if (condition) {
  // condition true হলে এই কোড চলবে
}
```

### উদাহরণ

```javascript
if (3 < 10) {
  console.log("I am small. I do not bite.");
}
```

### Output

```text
I am small. I do not bite.
```

### কারণ

`3 < 10` সত্য।

---

## Condition false হলে

```javascript
if (13 < 10) {
  console.log("Smaller but stronger.");
}
```

### Output

```text
কিছু দেখাবে না
```

### কারণ

`13 < 10` মিথ্যা।

---

## Variable দিয়ে Condition

```javascript
const biriyaniPrice = 500;

if (biriyaniPrice < 300) {
  console.log("Mama, give me some biriyani");
}
```

### Output

```text
কিছু দেখাবে না
```

### কারণ

বিরিয়ানির দাম ৩০০ টাকার কম নয়।

---

## if...else

### গঠন

```javascript
if (condition) {
  // condition true হলে চলবে
} else {
  // condition false হলে চলবে
}
```

---

## Boolean condition উদাহরণ

```javascript
const rainingOutside = true;

if (rainingOutside == true) {
  console.log("You and me– under the tree");
} else {
  console.log("No rain, no romance.");
}
```

### Output

```text
You and me– under the tree
```

---

## Comparison condition উদাহরণ

```javascript
const weight = 40;

if (weight > 20) {
  console.log("Rickshaw mama cholo jai.");
} else {
  console.log("Walking is Exercising.");
}
```

### Output

```text
Rickshaw mama cholo jai.
```

---

## মূল শিক্ষা

- if ব্যবহার করা হয় শর্ত চেক করতে।
- শর্ত true হলে `{ }`-এর ভিতরের code চলে।
- শর্ত false হলে if block চলে না।
- else থাকলে condition false হলে else block চলে।
- Condition সাধারণত comparison operator দিয়ে তৈরি হয়।

---

# পরীক্ষার জন্য গুরুত্বপূর্ণ প্রশ্ন

| প্রশ্ন | উত্তর |
|---|---|
| Condition কী? | কোনো শর্ত বা অবস্থা। |
| if কী কাজে লাগে? | শর্ত সত্য হলে নির্দিষ্ট code চালাতে। |
| if condition false হলে কী হয়? | if block-এর code চলে না। |
| else কী কাজে লাগে? | condition false হলে অন্য code চালাতে। |
| if (3 < 10) true নাকি false? | true। |
| if (13 < 10) true নাকি false? | false। |
| if...else-এ কত ধরনের output path থাকে? | দুইটি: true হলে if block, false হলে else block। |
| Condition-এর result সাধারণত কী হয়? | Boolean: true বা false। |

---

# ছাত্র যখন পাত্র — গুরুত্বপূর্ণ নোট

## মূল ধারণা

JavaScript-এ একাধিক condition একসাথে ব্যবহার করা যায়।

দুইটি condition একসাথে চেক করতে mainly দুইটি operator লাগে:

- `&&` → AND
- `||` → OR

---

## AND &&

`&&` মানে দুইটি শর্তই সত্য হতে হবে।

একটি শর্ত false হলেই পুরো condition false হবে।

```javascript
const salary = 63000;
const isBCS = true;

if (salary > 50000 && isBCS == true) {
  console.log("Sei level er patro");
} else {
  console.log("dooore giya moro");
}
```

### Output

```text
Sei level er patro
```

---

## AND false হলে

```javascript
const salary = 55000;
const isBCS = false;

if (salary > 50000 && isBCS == true) {
  console.log("Agun er gola patro");
} else {
  console.log("dooore giya moro");
}
```

### Output

```text
dooore giya moro
```

### কারণ

- salary condition true
- কিন্তু isBCS condition false
- `&&`-এ দুইটাই true হতে হয়।

---

## OR ||

`||` মানে যেকোনো একটি শর্ত সত্য হলেই হবে।

দুইটি শর্তই false হলে পুরো condition false হবে।

```javascript
const salary = 25000;
const height = 68;

if (salary > 25000 || height > 72) {
  console.log("bolo baba kobul");
} else {
  console.log("vaag tui mokbul");
}
```

### Output

```text
vaag tui mokbul
```

---

## OR true হলে

```javascript
const salary = 25001;
const height = 68;

if (salary > 25000 || height > 72) {
  console.log("bolo baba kobul");
} else {
  console.log("vaag tui mokbul");
}
```

### Output

```text
bolo baba kobul
```

### কারণ

- salary condition true
- height condition false
- `||`-এ একটি true হলেই if block চলে।

---

## && বনাম ||

| Operator | অর্থ | কখন `true` হবে |
|---|---|---|
| `&&` | AND / এবং | সবগুলো condition `true` হলে |
| `||` | OR / অথবা | যেকোনো একটি condition `true` হলে |

---

## মূল শিক্ষা

- একাধিক condition একসাথে ব্যবহার করতে `&&` ও `||` লাগে।
- `&&` কঠিন শর্ত: সব সত্য হতে হবে।
- `||` সহজ শর্ত: একটি সত্য হলেই হবে।
- Multiple condition decision making-এর জন্য খুব গুরুত্বপূর্ণ।

---

# পরীক্ষার জন্য গুরুত্বপূর্ণ প্রশ্ন

| প্রশ্ন | উত্তর |
|---|---|
| && কী বোঝায়? | AND / এবং। |
| \|\| কী বোঝায়? | OR / অথবা। |
| && কখন true হয়? | সব condition true হলে। |
| \|\| কখন true হয়? | যেকোনো একটি condition true হলে। |
| salary > 50000 && isBCS == true—এখানে কয়টি condition আছে? | দুইটি। |
| salary > 25000 \|\| height > 72—এ একটি condition true হলে কী হবে? | if block execute হবে। |
| &&-এ একটি condition false হলে result কী হবে? | false। |
| \|\|-এ দুইটি condition false হলে result কী হবে? | false। |

---

# ডিসকাউন্ট খেকো else-if — গুরুত্বপূর্ণ নোট

## মূল ধারণা

একাধিক condition থাকলে if, else if, else ব্যবহার করা হয়।

Code ওপর থেকে নিচে check করে।

যে condition প্রথম true হবে, শুধু সেই block execute হবে।

---

## if...else দিয়ে Discount

```javascript
const price = 6500;

if (price >= 5000) {
  const discount = (price / 100) * 10;
  const pay = price - discount;
  console.log(pay);
} else {
  console.log(price);
}
```

### Output

```text
5850
```

### কারণ

6500 টাকা 5000-এর বেশি।

তাই 10% discount হয়েছে।

---

## Percentage হিসাব

```javascript
discount = (price / 100) * discountPercent;
```

### উদাহরণ

```text
60 টাকার 10% = (60 / 100) * 10 = 6
```

---

## else if কী?

যখন একাধিক condition check করতে হয়, তখন else if ব্যবহার করা হয়।

```javascript
if (condition1) {
  // condition1 true হলে
} else if (condition2) {
  // condition2 true হলে
} else {
  // কোনো condition true না হলে
}
```

---

## Discount-এর Multiple Condition

```javascript
const price = 4000;

if (price >= 5000) {
  const discount = (price / 100) * 10;
  const pay = price - discount;
  console.log(pay);
} else if (price >= 2500) {
  const discount = (price / 100) * 5;
  const pay = price - discount;
  console.log(pay);
} else {
  console.log(price);
}
```

### Output

```text
3800
```

### কারণ

- 4000 টাকা 5000-এর বেশি নয়।
- কিন্তু 2500-এর বেশি।
- তাই 5% discount হয়েছে।

---

## else if কীভাবে কাজ করে?

- Code প্রথমে if condition check করে।
- if true হলে বাকি else if বা else check করে না।
- if false হলে else if check করে।
- সব condition false হলে else execute হয়।

---

## গুরুত্বপূর্ণ উদাহরণ

```javascript
const price = 2000;

if (price >= 5000) {
  console.log("10% discount");
} else if (price >= 2500) {
  console.log("5% discount");
} else {
  console.log("No discount");
}
```

### Output

```text
No discount
```

---

## মূল শিক্ষা

- else if একাধিক condition handle করতে ব্যবহার হয়।
- if-else chain-এ একবারে শুধু একটি block চলে।
- Discount, grade, level, category এসব ক্ষেত্রে else if খুব কাজে লাগে।
- Condition সাজানোর সময় বড় condition আগে দিলে logic সহজ হয়।

---

# পরীক্ষার জন্য গুরুত্বপূর্ণ প্রশ্ন

| প্রশ্ন | উত্তর |
|---|---|
| else if কী কাজে লাগে? | একাধিক condition check করতে। |
| if-else chain-এ কয়টি block execute হয়? | একটি। |
| Code কোন দিক থেকে condition check করে? | ওপর থেকে নিচে। |
| price = 6500 হলে 10% discount এর পর pay কত? | 5850। |
| price = 4000 হলে 5% discount এর পর pay কত? | 3800। |
| কোনো condition true না হলে কোন block চলে? | else block। |
| Percentage discount বের করার formula কী? | `price / 100 * discountPercent` |
| else if কি একাধিকবার ব্যবহার করা যায়? | হ্যাঁ। |

---

# স্যারের বাঁশ বাসায় ঠাস — গুরুত্বপূর্ণ নোট

## মূল ধারণা

Nested If-Else মানে একটি if বা else block-এর ভিতরে আরেকটি if-else ব্যবহার করা।

এক শর্ত পূরণ হলে তার ভিতরে আরেকটি শর্ত চেক করা হয়।

---

## If-Else, Else-If, Nested If-Else পার্থক্য

| ধরন            | কাজ                                  |
| -------------- | ------------------------------------ |
| if-else        | হয় এটা, না হয় অন্যটা               |
| else if        | একাধিক condition থেকে একটি           |
| nested if-else | এক condition-এর ভিতরে আরেক condition |

---

## Nested If-Else উদাহরণ

```javascript
const money = 300;
const popcornPrice = 40;

if (money >= 300) {
  console.log("Going to watch a movie");

  if (popcornPrice <= 50) {
    console.log("Buying PopCorn");
  } else {
    console.log("PopCorn is Expensive");
  }
} else {
  console.log("Home Alone.");
}
```

### Output

```text
Going to watch a movie
Buying PopCorn
```

---

## কোডের ব্যাখ্যা

- যদি money >= 300 হয়, তাহলে movie দেখতে যাবে।
- movie দেখতে গেলে আবার check করবে popcornPrice <= 50 কি না।
- popcorn সস্তা হলে কিনবে।
- popcorn দামি হলে কিনবে না।
- যদি money 300-এর কম হয়, তাহলে বাসায় থাকবে।

---

## মূল শিক্ষা

- Nested condition ধাপে ধাপে সিদ্ধান্ত নেওয়ার জন্য ব্যবহার হয়।
- বাইরের condition true হলে ভিতরের condition check হয়।
- বাইরের condition false হলে ভিতরের condition check-ই হয় না।
- Complex decision making-এ nested if-else কাজে লাগে।

---

# পরীক্ষার জন্য গুরুত্বপূর্ণ প্রশ্ন

| প্রশ্ন | উত্তর |
|---|---|
| Nested If-Else কী? | একটি condition-এর ভিতরে আরেকটি condition। |
| Nested If-Else কখন ব্যবহার করা হয়? | ধাপে ধাপে শর্ত চেক করতে। |
| বাইরের if false হলে ভিতরের if চলবে কি? | না। |
| money >= 300 true হলে কী হবে? | movie দেখতে যাবে। |
| popcornPrice <= 50 true হলে কী হবে? | popcorn কিনবে। |
| If-Else আর Nested If-Else-এর পার্থক্য কী? | If-Else এক স্তরের condition, Nested If-Else condition-এর ভিতরে আরেক condition। |

---

# লজিক্যাল নট ! ও টার্নারি অপারেটর — গুরুত্বপূর্ণ নোট

## Logical Not ! কী?

`!` হলো Logical Not Operator।

এটি Boolean Value উল্টে দেয়।

- true কে false করে।
- false কে true করে।

---

## Boolean সরাসরি condition-এ ব্যবহার

```javascript
if (isLeader) {
  console.log("Government money is my money");
}
```

isLeader যদি true হয়, তাহলে if block চলবে।

false হলে চলবে না।

---

## ! ব্যবহার

```javascript
const isPassed = false;

if (!isPassed) {
  console.log("Ajke khawa dawa bondho.");
}
```

### Output

```text
Ajke khawa dawa bondho.
```

### কারণ

- isPassed এর মান false
- !isPassed এর মান true

---

## ! এর কাজ

| Original Value | ! দিলে |
| -------------- | ------ |
| true           | false  |
| false          | true   |

---

# Ternary Operator

## Ternary Operator কী?

if-else এক লাইনে লেখার shortcut।

এতে ৩টি অংশ থাকে:

1. Condition
2. True Expression
3. False Expression

### গঠন

```javascript
condition ? trueExpression : falseExpression;
```

---

## সাধারণ if-else

```javascript
const age = 20;

if (age >= 18) {
  console.log("Vote for the hot.");
} else {
  console.log("You are not eligible to vote");
}
```

---

## একই কাজ Ternary দিয়ে

```javascript
const age = 18;

age >= 18 ? console.log("Eligible") : console.log("Not Eligible");
```

### Output

```text
Eligible
```

---

## Variable Value Set করতে Ternary

```javascript
let price = 500;
let isLeader = false;

price = isLeader === true ? 0 : price + 100;
```

### ব্যাখ্যা

- isLeader === true হলে `price = 0`
- না হলে `price = price + 100`

---

## মূল শিক্ষা

- `!` Boolean Value উল্টে দেয়।
- Boolean Variable সরাসরি if condition-এ ব্যবহার করা যায়।
- `if (!variable)` মানে variable false হলে condition true হবে।
- Ternary Operator হলো if-else লেখার shortcut।
- ছোট condition-এর জন্য ternary useful, তবে complex logic হলে if-else ভালো।

---

# পরীক্ষার জন্য গুরুত্বপূর্ণ প্রশ্ন

| প্রশ্ন | উত্তর |
|---|---|
| ! operator কী করে? | Boolean Value উল্টে দেয়। |
| !true এর মান কী? | false |
| !false এর মান কী? | true |
| if (isLeader) কখন চলবে? | isLeader true হলে। |
| if (!isPassed) কখন চলবে? | isPassed false হলে। |
| Ternary Operator কী? | if-else এক লাইনে লেখার shortcut। |
| Ternary Operator-এর তিনটি অংশ কী? | condition, true expression, false expression। |


উদাহরণ:
