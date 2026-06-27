# JavaScript Day 05 — Loops and Iterations  
## বাংলা Detailed Study Notes

> এই lesson-এর মূল বিষয় হলো JavaScript-এ **loop**, **iteration**, `for loop`, `while loop`, `do-while loop`, `nested loop`, `break`, `continue`, multiple counters এবং infinite loop বোঝা।  
> লক্ষ্য: শুধু এই notes পড়েই beginner student যেন ভিডিওর concept পরিষ্কারভাবে বুঝতে পারে এবং নিজে practice করতে পারে।

---

## Table of Contents

1. [Lesson Overview](#lesson-overview)
2. [Logic Building এবং DSA-এর সম্পর্ক](#logic-building-এবং-dsa-এর-সম্পর্ক)
3. [Loop কী?](#loop-কী)
4. [Iteration কী?](#iteration-কী)
5. [JavaScript-এর প্রধান Loop Types](#javascript-এর-প্রধান-loop-types)
6. [`for loop`](#for-loop)
   - Syntax
   - Initialization
   - Condition
   - Update
   - Flow
   - Examples
7. [`for loop` দিয়ে 1 থেকে 5 print করা](#for-loop-দিয়ে-1-থেকে-5-print-করা)
8. [`for loop` + `if` দিয়ে even number sum](#for-loop--if-দিয়ে-even-number-sum)
9. [`for loop` দিয়ে string-এর character পড়া](#for-loop-দিয়ে-string-এর-character-পড়া)
10. [Nested Loop](#nested-loop)
11. [`break` এবং `continue`](#break-এবং-continue)
12. [Multiple Counters in One Loop](#multiple-counters-in-one-loop)
13. [`while loop`](#while-loop)
14. [`do-while loop`](#do-while-loop)
15. [Infinite Loop](#infinite-loop)
16. [Important Differences](#important-differences)
17. [Common Mistakes](#common-mistakes)
18. [Assignment](#assignment)
19. [Final Summary](#final-summary)
20. [Practice Checklist](#practice-checklist)

---

## Lesson Overview

এই lesson-এ JavaScript-এর **loops and iterations** শেখানো হয়েছে। আগের lessons-এ শেখা হয়েছিল:

- `variable`
- `operator`
- `expression`
- `condition`
- `control flow`
- `if-else`
- `switch-case`

এই lesson-এ এগুলো ব্যবহার করে repeated task solve করা হয়েছে।

Programming-এ অনেক সময় একই কাজ বারবার করতে হয়। যেমন:

- 1 থেকে 100 পর্যন্ত number print করা
- array-এর প্রতিটি item process করা
- string-এর প্রতিটি character পড়া
- user input বারবার নেওয়া
- table/matrix-এর row-column process করা
- নির্দিষ্ট condition পূরণ হওয়া পর্যন্ত code চালানো

এই repeated execution-এর জন্য loop ব্যবহার করা হয়।

---

## Logic Building এবং DSA-এর সম্পর্ক

Video-তে DSA বা Data Structure and Algorithm নিয়ে গুরুত্বপূর্ণ কথা বলা হয়েছে।

### DSA কী?

DSA হলো দুইটি জিনিসের combination:

| Term | Meaning |
|---|---|
| Data Structure | Data কীভাবে organize/structure করা হবে |
| Algorithm | কোনো problem solve করার efficient logic |

কিন্তু DSA শেখার আগে basic logic building জানা দরকার। কারণ DSA-এর problem solve করতে গেলে:

- condition বুঝতে হয়
- loop চালাতে হয়
- repeated calculation করতে হয়
- data step by step process করতে হয়
- কোন loop কোথায় use হবে বুঝতে হয়

### মনে রাখার নিয়ম

> DSA শেখার আগে JavaScript-এর basic logic building strong করা দরকার।  
> Loop হলো logic building-এর সবচেয়ে গুরুত্বপূর্ণ foundation-এর একটি।

---

## Loop কী?

**Loop** মানে হলো একই কাজ বারবার করা।

বাস্তব জীবনের example:

ধরুন, আপনাকে market-এ গিয়ে potato কিনে আসতে বলা হলো।  
আপনি যদি একবার যান, সেটা repeated task নয়।  
কিন্তু যদি আপনাকে বারবার market-এ যেতে হয় এবং potato কিনতে হয়, তাহলে আপনি একই কাজ repeated করছেন।

Programming-এও এমন হয়। একই code বারবার না লিখে loop দিয়ে repeated execution করা হয়।

### Without loop

```js
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
```

এখানে 5 বার `console.log()` লিখতে হয়েছে।

### With loop

```js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

এখানে একই কাজ loop automatically repeated করছে।

### সহজ definition

> Loop হলো এমন programming construct যা একটি code block-কে multiple times execute করতে দেয়।

---

## Iteration কী?

**Iteration** মানে loop-এর একবার execution।

যদি loop একবার চলে, সেটা 1 iteration।  
যদি loop পাঁচবার চলে, সেটা 5 iterations।

Example:

```js
for (let i = 1; i <= 3; i++) {
  console.log(i);
}
```

Output:

```text
1
2
3
```

এখানে loop 3 times চলেছে। তাই এখানে 3 iterations হয়েছে।

### মনে রাখার নিয়ম

> Loop হলো পুরো repeated process।  
> Iteration হলো সেই repeated process-এর একেকটি step/run।

---

## JavaScript-এর প্রধান Loop Types

Video-তে তিন ধরনের loop শেখানো হয়েছে:

1. `for loop`
2. `while loop`
3. `do-while loop`

### কোন loop কখন ব্যবহার করবেন?

| Loop Type | কখন ব্যবহার করবেন | Example Situation |
|---|---|---|
| `for loop` | কতবার loop চলবে আগে থেকেই জানা থাকলে | 1 থেকে 100 পর্যন্ত print করা |
| `while loop` | কতবার loop চলবে আগে থেকে জানা না থাকলে | user input valid না হওয়া পর্যন্ত input নেওয়া |
| `do-while loop` | code অন্তত একবার execute করতেই হবে | menu একবার show করে তারপর user choice check করা |

### মনে রাখার নিয়ম

> Fixed iteration হলে `for loop`  
> Unknown iteration হলে `while loop`  
> At least once execution দরকার হলে `do-while loop`

---

# `for loop`

## `for loop` কী?

`for loop` ব্যবহার করা হয় যখন আমরা জানি একটি code block কতবার execute করতে হবে।

Example situation:

- 1 থেকে 5 পর্যন্ত number print করতে হবে
- 1 থেকে 100 পর্যন্ত even number বের করতে হবে
- string-এর প্রতিটি character পড়তে হবে
- কোনো list-এর সব item process করতে হবে

---

## `for loop` Syntax

```js
for (initialization; condition; update) {
  // code to execute
}
```

`for loop`-এর parenthesis-এর ভেতরে সাধারণত তিনটি অংশ থাকে:

| Part | কাজ |
|---|---|
| `initialization` | loop কোথা থেকে শুরু হবে |
| `condition` | loop চলবে কি না তা check করে |
| `update` | প্রতিবার iteration শেষে counter update করে |

---

## 1. Initialization

Initialization বলে loop কোথা থেকে শুরু হবে।

Example:

```js
let i = 1
```

এখানে `i` variable-এর starting value হলো `1`।

Full loop:

```js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

এখানে loop শুরু হচ্ছে `i = 1` থেকে।

---

## 2. Condition

Condition check করে loop চলবে কি না।

Example:

```js
i <= 5
```

যতক্ষণ এই condition `true`, loop চলবে।  
Condition `false` হলে loop বন্ধ হয়ে যাবে।

---

## 3. Update

Update প্রতি iteration শেষে counter পরিবর্তন করে।

Example:

```js
i++
```

এর মানে:

```js
i = i + 1
```

প্রতি iteration শেষে `i` 1 করে বাড়বে।

---

## `for loop` execution flow

এই loop:

```js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

কীভাবে চলে:

| Step | কী হচ্ছে |
|---|---|
| 1 | `i = 1` initialize হলো |
| 2 | condition check: `1 <= 5` → `true` |
| 3 | body execute: `console.log(1)` |
| 4 | update: `i++`, এখন `i = 2` |
| 5 | condition check: `2 <= 5` → `true` |
| 6 | body execute |
| ... | একইভাবে চলতে থাকে |
| শেষ | `i = 6` হলে `6 <= 5` → `false`, loop stop |

### মনে রাখার নিয়ম

> Initialization একবার হয়।  
> Condition প্রতি iteration-এর আগে check হয়।  
> Update প্রতি iteration-এর পরে হয়।

---

# `for loop` দিয়ে 1 থেকে 5 print করা

## Problem

1 থেকে 5 পর্যন্ত number print করতে হবে।

## Code

```js
for (let count = 1; count <= 5; count++) {
  console.log("Iteration / Loop", count);
}
```

## Output

```text
Iteration / Loop 1
Iteration / Loop 2
Iteration / Loop 3
Iteration / Loop 4
Iteration / Loop 5
```

## Explanation

- `count = 1`: loop শুরু হলো 1 থেকে
- `count <= 5`: loop চলবে যতক্ষণ count 5 বা তার কম
- `count++`: প্রতিবার count 1 করে বাড়বে
- `console.log()` count print করবে

## Common mistake

### Mistake: condition ভুল দেওয়া

```js
for (let count = 1; count < 5; count++) {
  console.log(count);
}
```

Output:

```text
1
2
3
4
```

এখানে 5 print হবে না, কারণ condition হলো `count < 5`।

### Correct

```js
for (let count = 1; count <= 5; count++) {
  console.log(count);
}
```

### মনে রাখার নিয়ম

> Ending value include করতে চাইলে অনেক সময় `<=` দরকার হয়।  
> Ending value exclude করতে চাইলে `<` ব্যবহার করা হয়।

---

# `for loop` + `if` দিয়ে even number sum

## Problem

1 থেকে 100 পর্যন্ত সব even number-এর sum বের করতে হবে।

## Even number কী?

যে number 2 দিয়ে ভাগ করলে remainder 0 হয়, সেটি even number।

Example:

```js
2 % 2 === 0
4 % 2 === 0
6 % 2 === 0
```

Odd number-এর ক্ষেত্রে remainder 0 হয় না:

```js
3 % 2 === 1
5 % 2 === 1
```

## Logic

1. 1 থেকে 100 পর্যন্ত loop চালাতে হবে।
2. প্রতিটি number even কি না check করতে হবে।
3. even হলে সেটি `sum` variable-এ যোগ করতে হবে।
4. loop শেষ হলে sum print করতে হবে।

## Code

```js
let sum = 0;

for (let i = 1; i <= 100; i++) {
  if (i % 2 === 0) {
    sum = sum + i;
  }
}

console.log("Sum is:", sum);
```

## Shorter version

```js
let sum = 0;

for (let i = 1; i <= 100; i++) {
  if (i % 2 === 0) {
    sum += i;
  }
}

console.log("Sum is:", sum);
```

## Output

```text
Sum is: 2550
```

## Explanation

প্রথমে:

```js
let sum = 0;
```

কারণ শুরুতে কোনো number যোগ করা হয়নি।

Loop:

```js
for (let i = 1; i <= 100; i++)
```

এটি `i`-কে 1 থেকে 100 পর্যন্ত নিয়ে যায়।

Condition:

```js
if (i % 2 === 0)
```

এটি check করে `i` even কি না।

যদি even হয়:

```js
sum += i;
```

মানে:

```js
sum = sum + i;
```

### Step-by-step sample

| `i` | Even? | `sum` |
|---|---|---|
| 1 | No | 0 |
| 2 | Yes | 2 |
| 3 | No | 2 |
| 4 | Yes | 6 |
| 5 | No | 6 |
| 6 | Yes | 12 |

এভাবে 100 পর্যন্ত গিয়ে final sum হয় `2550`।

## Common mistakes

### Mistake 1: `sum` loop-এর ভেতরে declare করা

```js
for (let i = 1; i <= 100; i++) {
  let sum = 0;

  if (i % 2 === 0) {
    sum += i;
  }
}

console.log(sum);
```

সমস্যা:

- `sum` loop-এর ভেতরে declare করলে প্রতি iteration-এ নতুন করে `0` হয়ে যাবে।
- loop-এর বাইরে `sum` access-ও করা যাবে না যদি `let` দিয়ে block scope-এ থাকে।

### Correct

```js
let sum = 0;

for (let i = 1; i <= 100; i++) {
  if (i % 2 === 0) {
    sum += i;
  }
}
```

### Mistake 2: `%` operator ভুল বোঝা

`%` division result দেয় না।  
এটি remainder দেয়।

```js
10 % 3 // 1
10 % 2 // 0
```

### মনে রাখার নিয়ম

> Even number check: `number % 2 === 0`  
> Odd number check: `number % 2 !== 0`

---

# `for loop` দিয়ে string-এর character পড়া

## Problem

`"JavaScript"` string-এর প্রতিটি character print করতে হবে।

## Important concept: String index

JavaScript string-এর character position বা index 0 থেকে শুরু হয়।

String:

```text
JavaScript
```

Index mapping:

| Character | Index |
|---|---|
| J | 0 |
| a | 1 |
| v | 2 |
| a | 3 |
| S | 4 |
| c | 5 |
| r | 6 |
| i | 7 |
| p | 8 |
| t | 9 |

String length হলো 10, কিন্তু last index হলো 9।

### মনে রাখার নিয়ম

> `length` হলো total character count।  
> Last index হলো `length - 1`।

---

## Code

```js
let language = "JavaScript";

for (let i = 0; i < language.length; i++) {
  console.log(language.charAt(i));
}
```

## Output

```text
J
a
v
a
S
c
r
i
p
t
```

## Explanation

- `i = 0`: first character থেকে শুরু
- `i < language.length`: last valid index পর্যন্ত loop
- `language.charAt(i)`: specific index-এর character নেয়

যখন `i = 0`:

```js
language.charAt(0) // "J"
```

যখন `i = 1`:

```js
language.charAt(1) // "a"
```

যখন `i = 9`:

```js
language.charAt(9) // "t"
```

## Common mistake

### Mistake: `i <= language.length`

```js
for (let i = 0; i <= language.length; i++) {
  console.log(language.charAt(i));
}
```

এখানে loop `i = 10` পর্যন্ত যাবে। কিন্তু `"JavaScript"` string-এর valid index 0 থেকে 9।  
তাই `i = 10` invalid position।

### Correct

```js
for (let i = 0; i < language.length; i++) {
  console.log(language.charAt(i));
}
```

### মনে রাখার নিয়ম

> 0-based index হলে বেশিরভাগ সময় condition হয় `i < length`, `i <= length` নয়।

---

# Nested Loop

## Nested Loop কী?

একটি loop-এর ভিতরে আরেকটি loop থাকলে তাকে **nested loop** বলে।

```js
for (...) {
  for (...) {
    // inner loop code
  }
}
```

## কখন nested loop ব্যবহার করা হয়?

Nested loop সাধারণত ব্যবহার হয়:

- table process করতে
- matrix process করতে
- row-column based data handle করতে
- pattern printing করতে
- multi-dimensional data process করতে
- grid-based game logic-এ

## Single-dimensional বনাম Multi-dimensional data

| Data Type | Example | Loop দরকার |
|---|---|---|
| Single-dimensional | এক row data | সাধারণ loop |
| Multi-dimensional | row + column table/matrix | nested loop |

---

## Example: Row and Column print

```js
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log("Row", i, "Column", j);
  }
}
```

## Output

```text
Row 1 Column 1
Row 1 Column 2
Row 1 Column 3
Row 2 Column 1
Row 2 Column 2
Row 2 Column 3
Row 3 Column 1
Row 3 Column 2
Row 3 Column 3
```

## Execution explanation

Outer loop controls row:

```js
for (let i = 1; i <= 3; i++)
```

Inner loop controls column:

```js
for (let j = 1; j <= 3; j++)
```

Flow:

1. `i = 1`
   - `j = 1`
   - `j = 2`
   - `j = 3`
2. `i = 2`
   - `j = 1`
   - `j = 2`
   - `j = 3`
3. `i = 3`
   - `j = 1`
   - `j = 2`
   - `j = 3`

### Important rule

> Outer loop একবার চললে inner loop পুরোটা complete হয়।  
> তারপর outer loop পরের iteration-এ যায়।

## Common mistake

### Mistake: inner loop-এ same variable ব্যবহার করা

```js
for (let i = 1; i <= 3; i++) {
  for (let i = 1; i <= 3; i++) {
    console.log(i);
  }
}
```

এটি confusing এবং bug-prone। Same variable name nested loop-এ ব্যবহার করা উচিত নয়।

### Better

```js
for (let row = 1; row <= 3; row++) {
  for (let column = 1; column <= 3; column++) {
    console.log("Row", row, "Column", column);
  }
}
```

## মনে রাখার নিয়ম

> Nested loop-এ meaningful variable name ব্যবহার করুন: `row`, `column`, `student`, `subject` ইত্যাদি।

---

# `break` এবং `continue`

Video-তে `break` এবং `continue`-এর difference খুব গুরুত্বপূর্ণভাবে explain করা হয়েছে।

---

## `break` কী?

`break` loop-কে immediately stop করে দেয়।

যখন JavaScript `break` পায়, তখন loop থেকে বের হয়ে যায়।  
এর পর loop-এর আর কোনো iteration হয় না।

## Example: 1 থেকে 5 print, কিন্তু 3 এ loop stop

```js
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    break;
  }

  console.log(i);
}
```

## Output

```text
1
2
```

## Explanation

- `i = 1`: print
- `i = 2`: print
- `i = 3`: `break` execute, loop stop
- `i = 4`, `i = 5`: আর execute হবে না

### Important detail: `break` কোথায় আছে সেটা matter করে

```js
for (let i = 1; i <= 5; i++) {
  console.log(i);

  if (i === 3) {
    break;
  }
}
```

Output:

```text
1
2
3
```

এখানে আগে print হচ্ছে, তারপর break হচ্ছে।  
তাই `3` print হয়েছে।

## মনে রাখার নিয়ম

> `break` মানে: loop থেকে বের হয়ে যাও।  
> `break`-এর নিচের code আর execute হয় না।

---

## `continue` কী?

`continue` current iteration skip করে next iteration-এ চলে যায়।

Loop পুরো stop হয় না।  
শুধু current iteration-এর remaining code skip হয়।

## Example: 1 থেকে 5 print, কিন্তু 3 skip

```js
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue;
  }

  console.log(i);
}
```

## Output

```text
1
2
4
5
```

## Explanation

- `i = 1`: print
- `i = 2`: print
- `i = 3`: `continue`, তাই `console.log(i)` skip
- `i = 4`: print
- `i = 5`: print

## `break` vs `continue`

| Feature | `break` | `continue` |
|---|---|---|
| কাজ | loop stop করে | current iteration skip করে |
| Next iteration হয়? | না | হ্যাঁ |
| ব্যবহার | আর loop চালানোর দরকার নেই | শুধু এই iteration বাদ দিতে চাই |
| Example | target item পেয়ে গেলে stop | invalid item skip |

## Common mistake

### Mistake: `continue` ব্যবহার করে loop stop হবে ভাবা

```js
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue;
  }

  console.log(i);
}
```

এটি loop stop করবে না। শুধু `3` skip করবে।

### মনে রাখার নিয়ম

> `break` = বের হয়ে যাও  
> `continue` = এইবার বাদ, পরেরবার চালাও

---

# Multiple Counters in One Loop

একটি `for loop`-এ একাধিক counter ব্যবহার করা যায়।

## কখন দরকার হতে পারে?

- দুইটি variable একসাথে track করতে
- একটি value বাড়বে, আরেকটি কমবে
- দুই দিক থেকে data process করতে
- comparison logic লিখতে

## Example

একটি counter 1 থেকে 10 পর্যন্ত যাবে।  
আরেকটি counter 10 থেকে 1 পর্যন্ত যাবে।

```js
for (let i = 1, j = 10; i <= 10 && j >= 1; i++, j--) {
  console.log(i, j);
}
```

## Output

```text
1 10
2 9
3 8
4 7
5 6
6 5
7 4
8 3
9 2
10 1
```

## Explanation

Initialization:

```js
let i = 1, j = 10
```

- `i` শুরু হচ্ছে 1 থেকে
- `j` শুরু হচ্ছে 10 থেকে

Condition:

```js
i <= 10 && j >= 1
```

Loop চলবে যতক্ষণ:

- `i` 10 বা তার কম
- এবং `j` 1 বা তার বেশি

Update:

```js
i++, j--
```

- `i` বাড়ছে
- `j` কমছে

## Common mistake

### Mistake: condition-এ comma operator ব্যবহার করা

```js
for (let i = 1, j = 10; i <= 10, j >= 1; i++, j--) {
  console.log(i, j);
}
```

এটি confusing এবং ভুল result দিতে পারে, কারণ comma operator শেষ expression-এর value return করে।

### Better

```js
for (let i = 1, j = 10; i <= 10 && j >= 1; i++, j--) {
  console.log(i, j);
}
```

## মনে রাখার নিয়ম

> Multiple counters declare/update করতে comma ব্যবহার করা যায়।  
> কিন্তু condition combine করতে logical operator যেমন `&&` ব্যবহার করা উচিত।

---

# `while loop`

## `while loop` কী?

`while loop` এমন loop যা condition `true` থাকলে চলতে থাকে।

Syntax:

```js
while (condition) {
  // code
}
```

## কখন `while loop` ব্যবহার করবেন?

যখন আগে থেকে জানা নেই loop কতবার চলবে।

Example situations:

- user যতক্ষণ valid input না দেয়
- game যতক্ষণ শেষ না হয়
- server থেকে data আসা পর্যন্ত wait/check
- কোনো condition true থাকা পর্যন্ত process করা

## Example: 1 থেকে 5 print

```js
let counter = 1;

while (counter <= 5) {
  console.log(counter);
  counter++;
}
```

## Output

```text
1
2
3
4
5
```

## Execution explanation

| Step | `counter` | Condition | Action |
|---|---:|---|---|
| 1 | 1 | `1 <= 5` true | print 1 |
| 2 | 2 | `2 <= 5` true | print 2 |
| 3 | 3 | `3 <= 5` true | print 3 |
| 4 | 4 | `4 <= 5` true | print 4 |
| 5 | 5 | `5 <= 5` true | print 5 |
| 6 | 6 | `6 <= 5` false | loop stop |

## Common mistake

### Mistake: counter update ভুলে যাওয়া

```js
let counter = 1;

while (counter <= 5) {
  console.log(counter);
}
```

এখানে `counter++` নেই।  
তাই `counter` সবসময় 1 থাকবে, condition সবসময় true থাকবে, infinite loop হবে।

### Correct

```js
let counter = 1;

while (counter <= 5) {
  console.log(counter);
  counter++;
}
```

## মনে রাখার নিয়ম

> `while loop`-এ condition false করার পথ রাখতে হবে।  
> না হলে infinite loop হবে।

---

# `do-while loop`

## `do-while loop` কী?

`do-while loop` এমন loop যেখানে code অন্তত একবার execute হয়, তারপর condition check হয়।

Syntax:

```js
do {
  // code
} while (condition);
```

## Main difference

`while loop` আগে condition check করে।  
`do-while loop` আগে code run করে, পরে condition check করে।

## Example: 1 থেকে 5 print

```js
let number = 1;

do {
  console.log(number);
  number++;
} while (number <= 5);
```

## Output

```text
1
2
3
4
5
```

## Explanation

1. `number = 1`
2. code run: print 1
3. `number++`: number হলো 2
4. condition check: `2 <= 5`
5. true হলে আবার run
6. number 6 হলে condition false, loop stop

---

## At least once execution example

```js
let number = 10;

do {
  console.log(number);
  number++;
} while (number <= 5);
```

## Output

```text
10
```

এখানে condition শুরু থেকেই false:

```js
10 <= 5 // false
```

তবুও code একবার execute হয়েছে, কারণ `do-while` আগে code চালায়।

## Common mistake

### Mistake: শেষে semicolon না দেওয়া

```js
do {
  console.log("Hello");
} while (true)
```

JavaScript অনেক সময় semicolon automatically handle করতে পারে, কিন্তু best practice:

```js
do {
  console.log("Hello");
} while (true);
```

### মনে রাখার নিয়ম

> `do-while` বলছে: আগে do করো, তারপর while condition check করো।

---

# Infinite Loop

## Infinite Loop কী?

Infinite loop হলো এমন loop যা কখনো stop হয় না।

কারণ loop-এর exit condition কখনো false হয় না।

## কেন dangerous?

Infinite loop:

- browser hang করতে পারে
- CPU বেশি consume করতে পারে
- program crash করতে পারে
- user experience খারাপ করতে পারে

## Infinite `for loop`

```js
for (;;) {
  console.log("This will run forever");
}
```

এখানে:

- initialization নেই
- condition নেই
- update নেই

Condition না থাকলে loop চলতেই থাকে।

## Infinite `while loop`

```js
while (true) {
  console.log("This will run forever");
}
```

Condition সবসময় `true`, তাই loop stop হবে না।

## Infinite `do-while loop`

```js
do {
  console.log("This will run forever");
} while (true);
```

এখানেও condition সবসময় true।

## Common mistake

### Mistake: update ভুলে যাওয়া

```js
let i = 1;

while (i <= 5) {
  console.log(i);
}
```

এখানে `i` কখনো বাড়ছে না। তাই condition সবসময় true।

### Mistake: ভুল update direction

```js
for (let i = 1; i <= 5; i--) {
  console.log(i);
}
```

এখানে `i` কমছে, কিন্তু condition `i <= 5` সবসময় true হতে থাকবে।  
তাই infinite loop হতে পারে।

### Correct

```js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

## মনে রাখার নিয়ম

> প্রত্যেক loop-এর exit condition থাকতে হবে।  
> Counter বা condition এমনভাবে update করতে হবে যাতে একসময় condition false হয়।

---

# Important Differences

## `for` vs `while` vs `do-while`

| Feature | `for loop` | `while loop` | `do-while loop` |
|---|---|---|---|
| Condition check | আগে | আগে | পরে |
| Minimum execution | 0 বার হতে পারে | 0 বার হতে পারে | অন্তত 1 বার |
| Best use case | fixed iteration | unknown iteration | at least once execution |
| Syntax complexity | বেশি structured | simple | simple but condition শেষে |
| Counter location | parenthesis-এ থাকে | বাইরে/ভেতরে manage করতে হয় | বাইরে/ভেতরে manage করতে হয় |

---

## `break` vs `continue`

| Topic | `break` | `continue` |
|---|---|---|
| Meaning | loop বন্ধ করো | current iteration skip করো |
| Loop continues? | না | হ্যাঁ |
| Common use | target পাওয়া গেলে stop | unwanted value skip |
| Example output effect | loop early end | কিছু value missing থাকে |

---

## `while` vs `do-while`

| Topic | `while` | `do-while` |
|---|---|---|
| Condition check | code execution-এর আগে | code execution-এর পরে |
| Code একবার চলবেই? | না | হ্যাঁ |
| Use case | condition true হলে execute | আগে execute, পরে validate |

---

# Common Mistakes

## 1. Off-by-one error

```js
for (let i = 1; i < 5; i++) {
  console.log(i);
}
```

Expected যদি 1 থেকে 5 হয়, তাহলে এটি ভুল। Output হবে 1 থেকে 4।

Correct:

```js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

---

## 2. Zero-based index ভুলে যাওয়া

String/array index 0 থেকে শুরু হয়।

Wrong:

```js
let language = "JavaScript";

for (let i = 1; i <= language.length; i++) {
  console.log(language.charAt(i));
}
```

Correct:

```js
let language = "JavaScript";

for (let i = 0; i < language.length; i++) {
  console.log(language.charAt(i));
}
```

---

## 3. Infinite loop তৈরি করা

Wrong:

```js
let counter = 1;

while (counter <= 5) {
  console.log(counter);
}
```

Correct:

```js
let counter = 1;

while (counter <= 5) {
  console.log(counter);
  counter++;
}
```

---

## 4. `break` এবং `continue` confuse করা

Wrong ধারণা:

```js
continue;
```

এটা loop stop করে না।

Correct idea:

- loop stop করতে `break`
- iteration skip করতে `continue`

---

## 5. Nested loop-এ variable naming খারাপ করা

Avoid:

```js
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(i, j);
  }
}
```

Practice-এর জন্য ঠিক আছে, কিন্তু real project-এ meaningful naming ভালো:

```js
for (let row = 1; row <= 3; row++) {
  for (let column = 1; column <= 3; column++) {
    console.log(row, column);
  }
}
```

---

## 6. `do-while`-এর behavior ভুল বোঝা

```js
let n = 10;

do {
  console.log(n);
} while (n < 5);
```

Output:

```text
10
```

Condition false হলেও code একবার চলবে।

---

# Assignment

Video-তে একটি task দেওয়া হয়েছে।

## Assignment 1: Star Pyramid / Triangle Pattern

Nested loop ব্যবহার করে নিচের pattern print করতে হবে:

```text
*
**
***
****
```

অর্থাৎ:

- প্রথম line-এ 1 star
- দ্বিতীয় line-এ 2 stars
- তৃতীয় line-এ 3 stars
- চতুর্থ line-এ 4 stars

## Hint

- Outer loop line/row control করবে।
- Inner loop প্রতি row-তে কত star print হবে সেটা control করবে।
- একটি `row` যত, তত star print হবে।

## Possible approach

```js
for (let row = 1; row <= 4; row++) {
  let stars = "";

  for (let column = 1; column <= row; column++) {
    stars += "*";
  }

  console.log(stars);
}
```

## Output

```text
*
**
***
****
```

## Explanation

| Row | Inner loop কতবার চলবে | Output |
|---|---:|---|
| 1 | 1 | `*` |
| 2 | 2 | `**` |
| 3 | 3 | `***` |
| 4 | 4 | `****` |

## Extra Practice Tasks

### Task 2: 1 থেকে 10 print করুন

```text
1
2
3
...
10
```

### Task 3: 1 থেকে 20 পর্যন্ত odd numbers print করুন

Expected:

```text
1
3
5
...
19
```

### Task 4: 10 থেকে 1 reverse print করুন

Expected:

```text
10
9
8
...
1
```

### Task 5: `"JavaScript"` string reverse করে print করুন

Expected:

```text
t
p
i
r
c
S
a
v
a
J
```

Hint:

```js
let language = "JavaScript";

for (let i = language.length - 1; i >= 0; i--) {
  console.log(language.charAt(i));
}
```

### Task 6: 1 থেকে 50 পর্যন্ত যেসব number 5 দিয়ে divisible, সেগুলো print করুন

Hint:

```js
number % 5 === 0
```

---

# Final Summary

এই lesson থেকে মূল শেখার বিষয়গুলো:

1. Loop ব্যবহার করা হয় repeated task automate করার জন্য।
2. Iteration মানে loop-এর একবার execution।
3. `for loop` best যখন কতবার loop চলবে তা জানা থাকে।
4. `while loop` best যখন কতবার loop চলবে তা আগে থেকে জানা থাকে না।
5. `do-while loop` ব্যবহার করা হয় যখন code অন্তত একবার execute করতেই হবে।
6. `for loop`-এ তিনটি main part থাকে:
   - initialization
   - condition
   - update
7. Loop-এর condition false হলে loop stop হয়।
8. `break` loop সম্পূর্ণ stop করে।
9. `continue` শুধু current iteration skip করে।
10. Nested loop ব্যবহার হয় row-column/matrix/table/pattern type problem solve করতে।
11. Multiple counters ব্যবহার করে একই loop-এ একাধিক variable track করা যায়।
12. Infinite loop এড়াতে exit condition এবং proper update নিশ্চিত করতে হবে।

---

# Practice Checklist

নিচের checklist complete করতে পারলে lesson ভালোভাবে বোঝা হয়েছে বলা যাবে।

## Basic Concept

- [ ] Loop কী বুঝি
- [ ] Iteration কী বুঝি
- [ ] `for`, `while`, `do-while`-এর difference বলতে পারি
- [ ] Fixed iteration হলে কোন loop use করতে হবে জানি
- [ ] Unknown iteration হলে কোন loop use করতে হবে জানি
- [ ] At least once execution দরকার হলে কোন loop use করতে হবে জানি

## `for loop`

- [ ] `for loop` syntax লিখতে পারি
- [ ] initialization বুঝি
- [ ] condition বুঝি
- [ ] update বুঝি
- [ ] 1 থেকে 5 print করতে পারি
- [ ] 1 থেকে 100 loop চালাতে পারি
- [ ] even/odd number check করতে পারি
- [ ] sum calculate করতে পারি

## String Loop

- [ ] string index 0 থেকে শুরু হয় বুঝি
- [ ] `length` property কী বুঝি
- [ ] `charAt()` দিয়ে character access করতে পারি
- [ ] string-এর প্রতিটি character print করতে পারি

## Nested Loop

- [ ] loop-এর ভিতরে loop লিখতে পারি
- [ ] outer loop এবং inner loop-এর কাজ আলাদা করতে পারি
- [ ] row-column output বুঝি
- [ ] star pattern print করতে পারি

## `break` and `continue`

- [ ] `break` কী করে বুঝি
- [ ] `continue` কী করে বুঝি
- [ ] `break` দিয়ে loop stop করতে পারি
- [ ] `continue` দিয়ে specific iteration skip করতে পারি

## `while` and `do-while`

- [ ] `while loop` syntax লিখতে পারি
- [ ] `while loop`-এ counter update করতে ভুল করি না
- [ ] `do-while loop` অন্তত একবার চলে বুঝি
- [ ] `while` এবং `do-while`-এর difference বুঝি

## Infinite Loop

- [ ] Infinite loop কী বুঝি
- [ ] Infinite loop কেন dangerous বুঝি
- [ ] কীভাবে infinite loop avoid করতে হয় জানি

---

## Quick Revision Table

| Concept | One-line Reminder |
|---|---|
| Loop | একই কাজ বারবার করা |
| Iteration | loop-এর একবার execution |
| `for` | fixed number of iterations |
| `while` | unknown number of iterations |
| `do-while` | at least once execution |
| `break` | loop থেকে বের হয়ে যায় |
| `continue` | current iteration skip করে |
| Nested loop | loop-এর ভিতরে loop |
| Infinite loop | loop কখনো stop হয় না |

---

## শেষ কথা

Loop শেখা JavaScript logic building-এর জন্য অত্যন্ত গুরুত্বপূর্ণ।  
পরবর্তী topic যেমন `function`, `array`, `object`, `DOM`, project building, এমনকি DSA—সব জায়গায় loop দরকার হবে।

তাই শুধু syntax মুখস্থ না করে প্রতিটি loop হাতে লিখে practice করা জরুরি।

> Practice rule: প্রতিটি example নিজে type করুন, তারপর value change করে output predict করুন।
