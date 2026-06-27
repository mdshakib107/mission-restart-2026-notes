# JavaScript Day 04 Study Notes  
## Topic: Control Flow, `if-else`, `switch-case`, `break`, `default`, `ternary`, এবং Fall-through

এই notes তৈরি করা হয়েছে JavaScript tutorial video transcript থেকে। লক্ষ্য হলো এমনভাবে concept বোঝানো, যাতে beginner student ভিডিও না দেখেও lesson-এর মূল idea, syntax, logic building, common mistake এবং practice approach বুঝতে পারে।

---

# Table of Contents

1. [Lesson Overview](#lesson-overview)  
2. [Control Flow কী?](#control-flow-কী)  
3. [Branching কীভাবে কাজ করে?](#branching-কীভাবে-কাজ-করে)  
4. [`if` Statement](#if-statement)  
5. [`if-else` Statement](#if-else-statement)  
6. [Example 1: Bus ধরলে সময়মতো পৌঁছানো](#example-1-bus-ধরলে-সময়মতো-পৌঁছানো)  
7. [Example 2: Voting Eligibility](#example-2-voting-eligibility)  
8. [Curly Braces Omit করা যায়?](#curly-braces-omit-করা-যায়)  
9. [Multiple Conditions এবং Grading System](#multiple-conditions-এবং-grading-system)  
10. [Independent `if` বনাম `else if`](#independent-if-বনাম-else-if)  
11. [Nesting `if-else`](#nesting-if-else)  
12. [`else` একা থাকতে পারে না](#else-একা-থাকতে-পারে-না)  
13. [`switch-case` Statement](#switch-case-statement)  
14. [`break` Keyword](#break-keyword)  
15. [`default` Case](#default-case)  
16. [Example: Day Number থেকে Day Name](#example-day-number-থেকে-day-name)  
17. [`switch-case`-এ String Matching](#switch-case-এ-string-matching)  
18. [`if-else` বনাম `switch-case`](#if-else-বনাম-switch-case)  
19. [`ternary operator`](#ternary-operator)  
20. [Fall-through in `switch-case`](#fall-through-in-switch-case)  
21. [`break` বনাম `continue`](#break-বনাম-continue)  
22. [Important Differences](#important-differences)  
23. [Common Mistakes](#common-mistakes)  
24. [Assignment](#assignment)  
25. [Final Summary](#final-summary)  
26. [Practice Checklist](#practice-checklist)

---

# Lesson Overview

এই lesson-এর main topic হলো **Control Flow**।

সাধারণভাবে JavaScript code line by line execute হয়। কিন্তু real programming-এ সবসময় line by line সব code চালানো হয় না। কোনো condition true হলে এক ধরনের কাজ, false হলে অন্য ধরনের কাজ করতে হয়। কখনো অনেকগুলো possible condition থাকে, যেমন:

- বয়স ১৮ বা তার বেশি হলে vote দিতে পারবে
- score 90 বা তার বেশি হলে Grade A
- day number 1 হলে Monday, 2 হলে Tuesday
- city Bangalore, Kolkata, Agra, Jaipur হলে India

এই ধরনের decision making-এর জন্য JavaScript-এ control flow ব্যবহার করা হয়।

এই lesson-এ শেখানো হয়েছে:

| Concept | কাজ |
|---|---|
| `if` | কোনো condition true হলে code execute করে |
| `else` | `if` false হলে alternative code execute করে |
| `else if` | multiple condition sequentially check করে |
| nested `if-else` | এক `if` বা `else` block-এর ভিতরে আরেকটি `if-else` |
| `switch-case` | fixed value-এর ওপর ভিত্তি করে multiple possible branch handle করে |
| `break` | matched case execute হওয়ার পর `switch` থেকে বের করে |
| `default` | কোনো case match না করলে fallback block হিসেবে কাজ করে |
| `ternary operator` | simple `if-else` short form-এ লেখে |
| fall-through | `break` না দিলে এক case থেকে পরের case-এ execution চলে যায় |

---

# Control Flow কী?

**Control Flow** মানে হলো program-এর execution কোন পথে চলবে সেটি control করা।

JavaScript সাধারণত এইভাবে code execute করে:

```js
console.log("Line 1");
console.log("Line 2");
console.log("Line 3");
```

Output:

```txt
Line 1
Line 2
Line 3
```

এখানে execution সরাসরি ওপর থেকে নিচে চলছে।

কিন্তু ধরুন আমরা চাই:

- condition true হলে কিছু line execute হবে
- condition false হলে সেই line skip করে অন্য line execute হবে

তখন control flow দরকার।

উদাহরণ:

```js
let isLoggedIn = true;

if (isLoggedIn) {
  console.log("Show dashboard");
} else {
  console.log("Show login page");
}
```

এখানে সব line execute হয় না। `isLoggedIn` true হলে dashboard দেখাবে, false হলে login page দেখাবে।

## সহজভাবে মনে রাখুন

Program চলার রাস্তা যদি condition অনুযায়ী বদলে যায়, সেটাই **control flow**।

---

# Branching কীভাবে কাজ করে?

**Branching** হলো control flow-এর একটি practical idea।

ধরুন JavaScript line 1 থেকে line 10 পর্যন্ত execute করার কথা। কিন্তু line 4-এ এসে যদি কোনো condition check করে line 5-6 skip করে line 8-এ চলে যায়, তাহলে execution branch করেছে।

```js
let condition = true;

console.log("Start");

if (condition) {
  console.log("Condition is true");
} else {
  console.log("Condition is false");
}

console.log("End");
```

যদি `condition` true হয়, output:

```txt
Start
Condition is true
End
```

যদি `condition` false হয়, output:

```txt
Start
Condition is false
End
```

এখানে `if` এবং `else` দুই block একসাথে execute হয় না। শুধু যেই branch valid, সেটি execute হয়।

## মনে রাখার নিয়ম

`if-else` হলো রাস্তার মোড়ের মতো। Condition true হলে এক রাস্তা, false হলে আরেক রাস্তা।

---

# `if` Statement

`if` JavaScript-এর reserved keyword। এটি condition check করার জন্য ব্যবহৃত হয়।

## Syntax

```js
if (condition) {
  // condition true হলে এই code execute হবে
}
```

`condition`-এর result সাধারণত `true` বা `false` হয়।

যেমন:

```js
let age = 20;

if (age >= 18) {
  console.log("Adult");
}
```

এখানে `age >= 18` একটি condition।  
`20 >= 18` true, তাই output হবে:

```txt
Adult
```

## Condition কীভাবে তৈরি হয়?

Condition তৈরি করতে comparison operator ব্যবহার করা হয়:

| Operator | Meaning | Example |
|---|---|---|
| `==` | value equal কিনা check করে | `age == 18` |
| `===` | value এবং type দুইটাই equal কিনা check করে | `age === 18` |
| `!=` | equal নয় কিনা | `age != 18` |
| `!==` | value বা type equal নয় কিনা | `age !== "18"` |
| `>` | greater than | `age > 18` |
| `>=` | greater than or equal | `age >= 18` |
| `<` | less than | `age < 18` |
| `<=` | less than or equal | `age <= 18` |

## Common Mistake

```js
let age = 18;

if (age = 18) {
  console.log("Eligible");
}
```

এখানে `=` ব্যবহার করা হয়েছে, যা assignment operator। এটি comparison নয়।

Correct:

```js
if (age === 18) {
  console.log("Eligible");
}
```

## মনে রাখার নিয়ম

- `=` মানে value assign করা
- `==` বা `===` মানে compare করা
- Beginner হিসেবে comparison-এর জন্য `===` ব্যবহার করাই safer

---

# `if-else` Statement

যদি condition true হলে এক কাজ এবং false হলে অন্য কাজ করতে হয়, তাহলে `if-else` ব্যবহার করা হয়।

## Syntax

```js
if (condition) {
  // condition true হলে
} else {
  // condition false হলে
}
```

## Example

```js
let isRaining = true;

if (isRaining) {
  console.log("Take an umbrella");
} else {
  console.log("No umbrella needed");
}
```

Output:

```txt
Take an umbrella
```

যদি `isRaining = false` হয়, output:

```txt
No umbrella needed
```

## `if` বনাম `if-else`

| Situation | কোনটা ব্যবহার করবেন |
|---|---|
| শুধু true হলে কাজ আছে | `if` |
| true হলে এক কাজ, false হলে অন্য কাজ | `if-else` |
| অনেকগুলো condition আছে | `if`, `else if`, `else` |
| fixed value match করতে হবে | `switch-case` |

---

# Example 1: Bus ধরলে সময়মতো পৌঁছানো

ভিডিওতে instructor একটি সহজ real-life example দিয়েছেন:  
যদি bus ধরা যায়, তাহলে সময়মতো বাড়ি পৌঁছানো যাবে। না হলে দেরি হবে।

## Code

```js
let catchingBus = true;

if (catchingBus) {
  console.log("I will reach home on time");
} else {
  console.log("I will be late to reach");
}
```

যদি `catchingBus` true হয়:

```txt
I will reach home on time
```

যদি `catchingBus` false হয়:

```txt
I will be late to reach
```

## Execution Flow

1. `catchingBus` variable তৈরি হয়।
2. `if (catchingBus)` condition check হয়।
3. যদি value true হয়, `if` block execute হয়।
4. যদি value false হয়, `else` block execute হয়।
5. একসাথে দুই block execute হয় না।

## Common Mistake

```js
let catchingBus = false;

if (catchingBus) {
  console.log("I will reach home on time");
}
console.log("I will be late to reach");
```

এখানে `else` ব্যবহার করা হয়নি। তাই second `console.log` always execute হবে।

Correct:

```js
if (catchingBus) {
  console.log("I will reach home on time");
} else {
  console.log("I will be late to reach");
}
```

## মনে রাখার নিয়ম

`if-else` ব্যবহার করলে JavaScript দুইটির মধ্যে শুধু একটি path বেছে নেয়।

---

# Example 2: Voting Eligibility

Problem: কোনো ব্যক্তি vote দিতে পারবে কিনা check করতে হবে।

Rule: বয়স ১৮ বা তার বেশি হলে vote দিতে পারবে।

## Code

```js
let age = 18;

if (age >= 18) {
  console.log("You are eligible to vote");
} else {
  console.log("You are not eligible to vote");
}
```

Output:

```txt
You are eligible to vote
```

## কেন `>=` ব্যবহার করা হয়েছে?

কারণ rule হলো:

- ১৮ হলে eligible
- ১৮-এর বেশি হলেও eligible

তাই শুধু `>` দিলে ১৮ বছর বয়সী ব্যক্তি বাদ পড়ে যাবে।

Wrong:

```js
if (age > 18) {
  console.log("You are eligible to vote");
}
```

এখানে `age = 18` হলে condition false হবে।

Correct:

```js
if (age >= 18) {
  console.log("You are eligible to vote");
}
```

## Test Cases

| age | Condition `age >= 18` | Output |
|---:|---|---|
| 8 | false | You are not eligible to vote |
| 17 | false | You are not eligible to vote |
| 18 | true | You are eligible to vote |
| 25 | true | You are eligible to vote |

## Common Mistake

Boundary value ভুল করা beginnerদের খুব common mistake।

যেমন:

```js
if (age > 18)
```

এতে ১৮ বছর বয়সী user ভুলভাবে not eligible হতে পারে।

## মনে রাখার নিয়ম

Problem statement-এ যদি “at least”, “or above”, “minimum” থাকে, সাধারণত `>=` দরকার হয়।

---

# Curly Braces Omit করা যায়?

JavaScript-এ যদি `if` বা `else` block-এর ভিতরে মাত্র একটি statement থাকে, তাহলে technically curly braces omit করা যায়।

Example:

```js
let age = 20;

if (age >= 18)
  console.log("Eligible");
else
  console.log("Not eligible");
```

এটি কাজ করবে।

কিন্তু recommended নয়।

## কেন recommended নয়?

কারণ পরে যদি আরেকটি statement add করা হয়, bug হতে পারে।

Problematic code:

```js
let age = 20;

if (age >= 18)
  console.log("Eligible");
  console.log("Go to voting center");
else
  console.log("Not eligible");
```

এটি syntax error বা unexpected behavior তৈরি করতে পারে, কারণ `if` block-এর অংশ হিসেবে শুধু প্রথম statement ধরা হয়।

Correct:

```js
let age = 20;

if (age >= 18) {
  console.log("Eligible");
  console.log("Go to voting center");
} else {
  console.log("Not eligible");
}
```

## Recommendation

সবসময় curly braces ব্যবহার করুন:

```js
if (condition) {
  // code
} else {
  // code
}
```

## Common Mistake

Curly braces omit করলে indentation দেখে মনে হতে পারে code `if` block-এর ভিতরে আছে, কিন্তু JavaScript indentation দিয়ে block বোঝে না। JavaScript block বোঝে `{}` দিয়ে।

## মনে রাখার নিয়ম

Readable এবং safe code লেখার জন্য সবসময় `{}` ব্যবহার করুন।

---

# Multiple Conditions এবং Grading System

একাধিক condition থাকলে `else if` ব্যবহার করা হয়।

Problem: score-এর উপর grade নির্ধারণ করতে হবে।

Rule:

| Score Range | Grade |
|---|---|
| `score >= 90` | Grade A |
| `score >= 80` | Grade B |
| `score >= 70` | Grade C |
| otherwise | Fail |

## Correct Code

```js
let score = 76;

if (score >= 90) {
  console.log("Grade A");
} else if (score >= 80) {
  console.log("Grade B");
} else if (score >= 70) {
  console.log("Grade C");
} else {
  console.log("Fail");
}
```

Output:

```txt
Grade C
```

## Step-by-step Execution

যদি `score = 76` হয়:

1. `76 >= 90` false
2. `76 >= 80` false
3. `76 >= 70` true
4. `Grade C` print হবে
5. এরপর নিচের `else` execute হবে না

## কেন order গুরুত্বপূর্ণ?

ধরুন আপনি ভুল order-এ লিখলেন:

```js
let score = 95;

if (score >= 70) {
  console.log("Grade C");
} else if (score >= 80) {
  console.log("Grade B");
} else if (score >= 90) {
  console.log("Grade A");
} else {
  console.log("Fail");
}
```

Output:

```txt
Grade C
```

এটি ভুল, কারণ `95 >= 70` true হয়ে গেছে, তাই পরে `Grade A` পর্যন্ত পৌঁছায়নি।

Correct order:

```js
if (score >= 90) {
  console.log("Grade A");
} else if (score >= 80) {
  console.log("Grade B");
} else if (score >= 70) {
  console.log("Grade C");
} else {
  console.log("Fail");
}
```

## মনে রাখার নিয়ম

Range-based condition হলে সবচেয়ে specific বা highest condition আগে লিখুন।

---

# Independent `if` বনাম `else if`

এটি lesson-এর সবচেয়ে important conceptগুলোর একটি।

## Independent `if`

Independent `if` মানে প্রতিটি condition আলাদাভাবে check হবে।

```js
let x = 0;

if (x === 0) {
  console.log("zero");
}

if (x >= 0) {
  console.log("greater than or equal to zero");
}

if (x <= 0) {
  console.log("less than or equal to zero");
}
```

Output:

```txt
zero
greater than or equal to zero
less than or equal to zero
```

কারণ তিনটি condition-ই true।

## `else if` Chain

```js
let x = 0;

if (x === 0) {
  console.log("zero");
} else if (x >= 0) {
  console.log("greater than or equal to zero");
} else if (x <= 0) {
  console.log("less than or equal to zero");
}
```

Output:

```txt
zero
```

কারণ first condition true হওয়ার পর JavaScript আর বাকি `else if` check করে না।

## Difference Table

| Topic | Independent `if` | `else if` Chain |
|---|---|---|
| প্রতিটি condition check হয়? | হ্যাঁ | না, match পেলে stop করে |
| একাধিক output আসতে পারে? | হ্যাঁ | সাধারণত একটি branch execute হয় |
| Use case | একাধিক condition একসাথে true হতে পারে এবং সব কাজ দরকার | একাধিক option থেকে একটিই বেছে নিতে হবে |
| Performance | সব condition check হতে পারে | early exit হয় |
| Logic | separate checks | mutually exclusive decision |

## কখন independent `if` ব্যবহার করবেন?

যখন প্রতিটি condition আলাদা এবং একাধিক condition একসাথে true হলেও সমস্যা নেই।

Example:

```js
let user = {
  isLoggedIn: true,
  hasPremium: true,
  hasUnreadMessages: true
};

if (user.isLoggedIn) {
  console.log("Show dashboard");
}

if (user.hasPremium) {
  console.log("Show premium badge");
}

if (user.hasUnreadMessages) {
  console.log("Show notification");
}
```

এখানে তিনটি কাজই হতে পারে।

## কখন `else if` ব্যবহার করবেন?

যখন একাধিক possibility থেকে শুধু একটি result দরকার।

Example:

```js
let temperature = 30;

if (temperature > 35) {
  console.log("Very hot");
} else if (temperature > 25) {
  console.log("Warm");
} else if (temperature > 15) {
  console.log("Cool");
} else {
  console.log("Cold");
}
```

## Common Mistake

Grading system-এ অনেক beginner independent `if` ব্যবহার করে।

```js
let score = 95;

if (score >= 90) {
  console.log("Grade A");
}

if (score >= 80) {
  console.log("Grade B");
}

if (score >= 70) {
  console.log("Grade C");
}
```

Output:

```txt
Grade A
Grade B
Grade C
```

এটি ভুল, কারণ এক student-এর একটাই grade হওয়া উচিত।

Correct:

```js
if (score >= 90) {
  console.log("Grade A");
} else if (score >= 80) {
  console.log("Grade B");
} else if (score >= 70) {
  console.log("Grade C");
} else {
  console.log("Fail");
}
```

## মনে রাখার নিয়ম

যদি result একটাই হওয়া উচিত, `else if` chain ব্যবহার করুন।

---

# Nesting `if-else`

একটি `if` বা `else` block-এর ভিতরে আরেকটি `if-else` লিখলে তাকে nested `if-else` বলে।

## Syntax

```js
if (outerCondition) {
  if (innerCondition) {
    // inner condition true
  } else {
    // inner condition false
  }
} else {
  // outer condition false
}
```

## Example

```js
let condition = true;
let innerCondition = false;

if (condition) {
  console.log("outer if");

  if (innerCondition) {
    console.log("inner if");
  } else {
    console.log("inner else");
  }
} else {
  console.log("outer else");
}
```

Output:

```txt
outer if
inner else
```

## Execution Explanation

- `condition` true, তাই outer `if` block execute হবে
- `outer if` print হবে
- এরপর `innerCondition` check হবে
- `innerCondition` false, তাই `inner else` print হবে

## যদি outer condition false হয়?

```js
let condition = false;
let innerCondition = true;

if (condition) {
  console.log("outer if");

  if (innerCondition) {
    console.log("inner if");
  } else {
    console.log("inner else");
  }
} else {
  console.log("outer else");
}
```

Output:

```txt
outer else
```

এখানে inner condition check-ই হবে না, কারণ outer `if` block execute হয়নি।

## Common Mistake

Beginnerরা অনেক সময় ভাবে inner condition সবসময় check হবে। কিন্তু inner condition তখনই check হবে যখন outer block execute হয়।

## মনে রাখার নিয়ম

Nested condition-এ বাইরের দরজা না খুললে ভিতরের দরজায় পৌঁছানো যায় না।

---

# `else` একা থাকতে পারে না

`else` সবসময় কোনো `if`-এর সাথে যুক্ত থাকে।

Wrong:

```js
else {
  console.log("I am alone else");
}
```

এটি syntax error দেবে।

Correct:

```js
if (condition) {
  console.log("if block");
} else {
  console.log("else block");
}
```

## Common Error

```txt
SyntaxError: Unexpected token 'else'
```

এই error সাধারণত তখন আসে যখন:

- `else`-এর আগে valid `if` নেই
- curly braces mismatch হয়েছে
- semicolon বা block ভুল জায়গায় দেওয়া হয়েছে

## মনে রাখার নিয়ম

`else` হলো `if`-এর partner। `if` ছাড়া `else` exist করতে পারে না।

---

# `switch-case` Statement

যখন একটি fixed value-এর ওপর ভিত্তি করে অনেকগুলো possible case handle করতে হয়, তখন `switch-case` ব্যবহার করা ভালো।

## Basic Syntax

```js
switch (value) {
  case caseValue1:
    // code
    break;

  case caseValue2:
    // code
    break;

  default:
    // fallback code
}
```

## Important Idea

`if-else`-এ condition true/false হয়।

```js
if (score >= 90) {
  // condition
}
```

কিন্তু `switch-case`-এ একটি value match করা হয়।

```js
switch (day) {
  case 1:
    console.log("Monday");
    break;
}
```

এখানে `day` value-এর সাথে `case 1` match হচ্ছে।

## Example: Position

```js
let position = 1;

switch (position) {
  case 1:
    console.log("Print 1");
    break;

  case 2:
    console.log("Print 2");
    break;

  case 3:
    console.log("Print 3");
    break;

  case 4:
    console.log("Print 4");
    break;
}
```

Output:

```txt
Print 1
```

## যদি `position = 4` হয়

```js
let position = 4;
```

Output:

```txt
Print 4
```

## যদি কোনো case match না করে

```js
let position = 10;

switch (position) {
  case 1:
    console.log("Print 1");
    break;

  case 2:
    console.log("Print 2");
    break;
}
```

Output কিছুই হবে না, কারণ কোনো `default` নেই।

---

# `break` Keyword

`break` ব্যবহার করা হয় matched case execute হওয়ার পর `switch` block থেকে বের হয়ে যাওয়ার জন্য।

## Without `break`

```js
let position = 1;

switch (position) {
  case 1:
    console.log("Print 1");

  case 2:
    console.log("Print 2");

  case 3:
    console.log("Print 3");

  case 4:
    console.log("Print 4");
}
```

Output:

```txt
Print 1
Print 2
Print 3
Print 4
```

কেন?

কারণ `case 1` match হওয়ার পর JavaScript থামেনি। `break` না থাকায় পরের caseগুলোও execute হয়েছে। এটাকেই বলে fall-through।

## With `break`

```js
let position = 1;

switch (position) {
  case 1:
    console.log("Print 1");
    break;

  case 2:
    console.log("Print 2");
    break;

  case 3:
    console.log("Print 3");
    break;

  case 4:
    console.log("Print 4");
    break;
}
```

Output:

```txt
Print 1
```

## Common Mistake

`switch-case` লিখে `break` দিতে ভুলে যাওয়া।

## মনে রাখার নিয়ম

প্রতিটি normal `case` শেষে `break` দিন, যদি intentional fall-through না চান।

---

# `default` Case

যদি কোনো case match না করে, তখন fallback হিসেবে `default` execute হয়।

## Syntax

```js
switch (value) {
  case 1:
    console.log("One");
    break;

  case 2:
    console.log("Two");
    break;

  default:
    console.log("No match found");
}
```

## Example

```js
let position = 10;

switch (position) {
  case 1:
    console.log("Print 1");
    break;

  case 2:
    console.log("Print 2");
    break;

  case 3:
    console.log("Print 3");
    break;

  case 4:
    console.log("Print 4");
    break;

  default:
    console.log("Nothing is matched");
}
```

Output:

```txt
Nothing is matched
```

## `default` কি `else`-এর মতো?

কিছুটা similar, কিন্তু exactly same নয়।

| `else` | `default` |
|---|---|
| `if-else`-এ ব্যবহার হয় | `switch-case`-এ ব্যবহার হয় |
| condition false হলে execute হয় | কোনো case match না করলে execute হয় |
| একা থাকতে পারে না | `switch` block-এর ভিতরে থাকে |

## মনে রাখার নিয়ম

`default` হলো `switch-case`-এর fallback plan।

---

# Example: Day Number থেকে Day Name

Problem: 1 থেকে 7 পর্যন্ত number দিয়ে day name print করতে হবে।

Rule:

| Number | Day |
|---:|---|
| 1 | Monday |
| 2 | Tuesday |
| 3 | Wednesday |
| 4 | Thursday |
| 5 | Friday |
| 6 | Saturday |
| 7 | Sunday |
| অন্য কিছু | Invalid day number |

## Code

```js
let day = 5;

switch (day) {
  case 1:
    console.log("Monday");
    break;

  case 2:
    console.log("Tuesday");
    break;

  case 3:
    console.log("Wednesday");
    break;

  case 4:
    console.log("Thursday");
    break;

  case 5:
    console.log("Friday");
    break;

  case 6:
    console.log("Saturday");
    break;

  case 7:
    console.log("Sunday");
    break;

  default:
    console.log("Invalid day number");
}
```

Output:

```txt
Friday
```

## যদি `day = 51`

```js
let day = 51;
```

Output:

```txt
Invalid day number
```

## কেন `switch-case` এখানে ভালো?

কারণ এখানে একটি fixed value (`day`) check করা হচ্ছে।  
`day` যদি 1 হয় এক output, 2 হলে আরেক output, 3 হলে আরেক output।

এটি `switch-case`-এর perfect use case।

---

# `switch-case`-এ String Matching

`switch-case` শুধু number নয়, string value-এর সাথেও কাজ করে।

## Example

```js
let name = "Tapas Script";

switch (name) {
  case "Tapas Script":
    console.log("Teaching 40 days of JS");
    break;

  case "Google":
    console.log("Giving answer to all searches");
    break;

  default:
    console.log("You are neither Google nor Tapas Script");
}
```

Output:

```txt
Teaching 40 days of JS
```

## Case Sensitivity

String matching case-sensitive।

```js
let name = "google";

switch (name) {
  case "Google":
    console.log("Giving answer to all searches");
    break;

  default:
    console.log("No match");
}
```

Output:

```txt
No match
```

কারণ `"google"` এবং `"Google"` এক নয়।

## Case-sensitive Meaning

| Value | Same? |
|---|---|
| `"Google"` vs `"google"` | না |
| `"Tapas Script"` vs `"tapas script"` | না |
| `"JS"` vs `"JS"` | হ্যাঁ |

## Common Mistake

User input থেকে value এলে capitalization ভিন্ন হতে পারে।

Example:

```js
let name = "google";
```

কিন্তু case লেখা:

```js
case "Google":
```

তাই match হবে না।

## Safer Approach

Input normalize করতে পারেন:

```js
let name = "google";
let normalizedName = name.toLowerCase();

switch (normalizedName) {
  case "google":
    console.log("Giving answer to all searches");
    break;

  case "tapas script":
    console.log("Teaching 40 days of JS");
    break;

  default:
    console.log("No match");
}
```

## মনে রাখার নিয়ম

String match করার সময় spelling, space, uppercase, lowercase—সবকিছু exact হতে হবে।

---

# `if-else` বনাম `switch-case`

ভিডিওতে একটি গুরুত্বপূর্ণ discussion ছিল:  
কখন `if-else` ব্যবহার করবেন আর কখন `switch-case`?

## Basic Difference

| Topic | `if-else` | `switch-case` |
|---|---|---|
| কী check করে? | condition | fixed value |
| Result | true/false based | matched case based |
| Best for | logical condition, range, complex checks | exact value matching |
| Example | `score >= 90` | `day === 1` |
| Readability | condition বেশি হলে complex হতে পারে | fixed case বেশি হলে readable |
| Performance | sequentially condition check করে | অনেক ক্ষেত্রে jump table optimization হতে পারে |
| Fallback | `else` | `default` |

---

## কখন `if-else` ব্যবহার করবেন?

যখন condition logical বা range-based হয়।

Example:

```js
let score = 85;

if (score >= 90) {
  console.log("Grade A");
} else if (score >= 80) {
  console.log("Grade B");
} else if (score >= 70) {
  console.log("Grade C");
} else {
  console.log("Fail");
}
```

এখানে conditionগুলো exact value নয়, range-based।

আরেকটি example:

```js
let age = 15;

if (age > 10 && age < 20) {
  console.log("Teenage group");
}
```

এটি complex logical condition। এখানে `switch-case` ভালো choice নয়।

---

## কখন `switch-case` ব্যবহার করবেন?

যখন একটি variable-এর fixed value match করতে হবে।

Example:

```js
let role = "admin";

switch (role) {
  case "admin":
    console.log("Full access");
    break;

  case "editor":
    console.log("Edit access");
    break;

  case "viewer":
    console.log("Read only access");
    break;

  default:
    console.log("Unknown role");
}
```

এখানে `role` fixed string value।

---

## Performance Discussion

Instructor বলেন, অনেকগুলো fixed case থাকলে `switch-case` অনেক সময় faster হতে পারে, কারণ engine internally optimization করতে পারে, যেমন jump table তৈরি করতে পারে।

Beginner level-এ সবচেয়ে গুরুত্বপূর্ণ হলো:

1. Use case বুঝুন
2. Readability maintain করুন
3. Fixed value হলে `switch-case`
4. Range বা complex condition হলে `if-else`

## মনে রাখার নিয়ম

- Range, comparison, logical operator থাকলে → `if-else`
- Exact fixed value matching হলে → `switch-case`

---

# `ternary operator`

`ternary operator` হলো simple `if-else` লেখার shorthand।

## Syntax

```js
condition ? expressionIfTrue : expressionIfFalse;
```

## Example

```js
let catchingBus = true;

catchingBus
  ? console.log("I will reach home on time")
  : console.log("I will be late to reach");
```

Output:

```txt
I will reach home on time
```

এটি এই `if-else`-এর short form:

```js
if (catchingBus) {
  console.log("I will reach home on time");
} else {
  console.log("I will be late to reach");
}
```

## ভালো use case

যখন decision খুব simple।

```js
let age = 20;

let message = age >= 18 ? "Adult" : "Minor";

console.log(message);
```

Output:

```txt
Adult
```

## Bad Use Case: Nested Ternary

```js
let score = 85;

let grade = score >= 90
  ? "A"
  : score >= 80
    ? "B"
    : score >= 70
      ? "C"
      : "Fail";
```

এটি কাজ করবে, কিন্তু beginnerদের জন্য পড়তে কঠিন।

Better:

```js
let score = 85;
let grade;

if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else {
  grade = "Fail";
}

console.log(grade);
```

## Common Mistake

Ternary অতিরিক্ত nested করলে code unreadable হয়ে যায়।

## মনে রাখার নিয়ম

একটা simple `if` এবং একটা simple `else` থাকলে ternary ব্যবহার করা যায়। Multiple branch হলে `if-else` ভালো।

---

# Fall-through in `switch-case`

`switch-case`-এ `break` না দিলে matched case থেকে পরের caseগুলোতেও execution চলে যায়। এটাকে **fall-through** বলে।

কখনো এটি mistake, আবার কখনো intentional technique।

## Intentional Fall-through Example

Problem: কিছু city India-তে আছে কিনা check করতে হবে।

```js
let city = "Bangalore";

switch (city) {
  case "Bangalore":
  case "Kolkata":
  case "Agra":
  case "Jaipur":
    console.log("All these are in India");
    break;

  case "New York":
    console.log("This is in USA");
    break;

  default:
    console.log("Unknown city");
}
```

Output:

```txt
All these are in India
```

## এখানে কী হচ্ছে?

- `city = "Bangalore"`
- `case "Bangalore"` match হয়
- কিন্তু সেখানে কোনো code নেই এবং `break` নেই
- তাই execution নিচে নামে
- `case "Kolkata"`, `case "Agra"` পার হয়ে
- `case "Jaipur"`-এর নিচের statement execute হয়
- তারপর `break` পেয়ে switch থেকে বের হয়

এভাবে একাধিক case একই output share করতে পারে।

## কখন Fall-through useful?

যখন একাধিক value-এর জন্য একই কাজ করতে হবে।

Example:

```js
let fruit = "mango";

switch (fruit) {
  case "mango":
  case "banana":
  case "apple":
    console.log("This is a fruit");
    break;

  case "carrot":
  case "potato":
    console.log("This is a vegetable");
    break;

  default:
    console.log("Unknown item");
}
```

## Common Mistake

Intentional না হলে `break` না দেওয়া বড় bug তৈরি করতে পারে।

## মনে রাখার নিয়ম

Fall-through চাইলে comment দিয়ে clear করুন।

```js
switch (city) {
  case "Bangalore":
  case "Kolkata":
  case "Agra":
  case "Jaipur":
    // intentional fall-through: all above cities are in India
    console.log("All these are in India");
    break;
}
```

---

# `break` বনাম `continue`

এই lesson-এ `break` আলোচনা হয়েছে, কিন্তু `continue` পরে loops-এর সাথে detail-এ শেখানো হবে বলে বলা হয়েছে।

## এই lesson অনুযায়ী

| Keyword | এই lesson-এ ভূমিকা |
|---|---|
| `break` | `switch-case` থেকে বের হওয়ার জন্য ব্যবহৃত |
| `continue` | loops শেখার সময় detail-এ দরকার হবে |

## `break` এখন কোথায় দেখলাম?

```js
switch (day) {
  case 1:
    console.log("Monday");
    break;
}
```

এখানে `break` matched case execute হওয়ার পর `switch` stop করে।

## `continue` কেন loop-এর সাথে বেশি relevant?

কারণ `continue` সাধারণত current iteration skip করে next iteration-এ যায়।  
যেহেতু এই lesson মূলত branching নিয়ে, তাই `continue` পরে loop lesson-এ ভালোভাবে বোঝা যাবে।

---

# Important Differences

## 1. `if` বনাম `if-else`

| `if` | `if-else` |
|---|---|
| শুধু condition true হলে কাজ করে | true হলে এক কাজ, false হলে অন্য কাজ |
| false হলে কিছুই নাও হতে পারে | false হলে alternative block execute হয় |
| Optional decision | Either-or decision |

Example:

```js
if (isLoggedIn) {
  console.log("Welcome");
}
```

```js
if (isLoggedIn) {
  console.log("Welcome");
} else {
  console.log("Please login");
}
```

---

## 2. Independent `if` বনাম `else if`

| Independent `if` | `else if` |
|---|---|
| সব condition আলাদাভাবে check হয় | match পেলেই chain stop হয় |
| একাধিক result possible | সাধারণত একটি result |
| Multiple independent tasks | Mutually exclusive decision |

---

## 3. `else` বনাম `default`

| `else` | `default` |
|---|---|
| `if-else`-এ ব্যবহার হয় | `switch-case`-এ ব্যবহার হয় |
| condition false হলে চলে | কোনো case match না করলে চলে |
| `if` ছাড়া লেখা যায় না | `switch` block-এর অংশ |

---

## 4. `if-else` বনাম `ternary`

| `if-else` | `ternary` |
|---|---|
| readable for multiple statements | short for simple expression |
| multiple branch handle করতে ভালো | simple true/false decision |
| Beginner-friendly | বেশি nested হলে confusing |

---

## 5. `switch-case` with `break` বনাম without `break`

| With `break` | Without `break` |
|---|---|
| matched case execute হওয়ার পর stop | পরের case-এ fall-through |
| সাধারণত expected behavior | intentional না হলে bug |
| safer default style | grouping-এর জন্য useful হতে পারে |

---

# Common Mistakes

## Mistake 1: Comparison-এর জায়গায় assignment

Wrong:

```js
if (age = 18) {
  console.log("Eligible");
}
```

Correct:

```js
if (age === 18) {
  console.log("Eligible");
}
```

---

## Mistake 2: Boundary condition ভুল করা

Wrong:

```js
if (age > 18) {
  console.log("Eligible");
}
```

Correct:

```js
if (age >= 18) {
  console.log("Eligible");
}
```

যদি rule হয় ১৮ বা তার বেশি।

---

## Mistake 3: Grading system-এ independent `if` ব্যবহার

Wrong:

```js
let score = 95;

if (score >= 90) {
  console.log("Grade A");
}

if (score >= 80) {
  console.log("Grade B");
}

if (score >= 70) {
  console.log("Grade C");
}
```

Correct:

```js
if (score >= 90) {
  console.log("Grade A");
} else if (score >= 80) {
  console.log("Grade B");
} else if (score >= 70) {
  console.log("Grade C");
} else {
  console.log("Fail");
}
```

---

## Mistake 4: `switch-case`-এ `break` ভুলে যাওয়া

Wrong:

```js
let day = 1;

switch (day) {
  case 1:
    console.log("Monday");

  case 2:
    console.log("Tuesday");
}
```

Output:

```txt
Monday
Tuesday
```

Correct:

```js
switch (day) {
  case 1:
    console.log("Monday");
    break;

  case 2:
    console.log("Tuesday");
    break;
}
```

---

## Mistake 5: String case mismatch

Wrong:

```js
let name = "google";

switch (name) {
  case "Google":
    console.log("Matched");
    break;
}
```

Correct:

```js
let name = "google";

switch (name.toLowerCase()) {
  case "google":
    console.log("Matched");
    break;
}
```

---

## Mistake 6: `else` একা লেখা

Wrong:

```js
else {
  console.log("Invalid");
}
```

Correct:

```js
if (isValid) {
  console.log("Valid");
} else {
  console.log("Invalid");
}
```

---

## Mistake 7: Nested condition অতিরিক্ত complex করে ফেলা

Too complex:

```js
if (a) {
  if (b) {
    if (c) {
      if (d) {
        console.log("Too nested");
      }
    }
  }
}
```

Better approach অনেক সময় early return, separate function, বা logical operator দিয়ে করা যায়। যদিও এই lesson-এ function detail-এ নেই, তবুও readability-এর জন্য nesting কম রাখা ভালো।

---

# Assignment

ভিডিও transcript-এ Day 04 task/assignment submit করার কথা বলা হয়েছে, কিন্তু exact assignment problem statement transcript-এ দেওয়া নেই। তাই এই lesson-এর concepts based করে নিচের practice assignment তৈরি করা হলো।

## Assignment 1: Voting Eligibility Checker

একটি variable `age` নাও।  
যদি age 18 বা তার বেশি হয়:

```txt
You are eligible to vote
```

নাহলে:

```txt
You are not eligible to vote
```

### Starter Code

```js
let age = 17;

// write your logic here
```

### Expected Test Cases

| age | Output |
|---:|---|
| 10 | You are not eligible to vote |
| 17 | You are not eligible to vote |
| 18 | You are eligible to vote |
| 25 | You are eligible to vote |

---

## Assignment 2: Grade Calculator

একটি variable `score` নাও।

Rules:

| Score | Output |
|---|---|
| 90 বা তার বেশি | Grade A |
| 80 বা তার বেশি | Grade B |
| 70 বা তার বেশি | Grade C |
| 70-এর কম | Fail |

### Starter Code

```js
let score = 85;

// write your grading logic here
```

### Requirement

- `else if` ব্যবহার করো
- Boundary value test করো: 70, 80, 90
- Wrong order দিয়ে output কী হয় সেটাও experiment করো

---

## Assignment 3: Day Finder with `switch-case`

একটি variable `day` নাও।  
1 হলে Monday, 2 হলে Tuesday, ... 7 হলে Sunday print করো।  
অন্য কোনো value হলে `Invalid day number` print করো।

### Starter Code

```js
let day = 3;

// write switch-case here
```

### Requirement

- প্রতিটি case-এ `break` ব্যবহার করো
- `default` ব্যবহার করো
- Test values: 1, 5, 7, 51

---

## Assignment 4: City Grouping with Fall-through

একটি variable `city` নাও।

Rules:

- Bangalore, Kolkata, Agra, Jaipur → `This city is in India`
- New York, Los Angeles → `This city is in USA`
- অন্য কিছু → `Unknown city`

### Starter Code

```js
let city = "Bangalore";

// write switch-case here
```

### Hint

একই output-এর জন্য multiple case একসাথে group করো।

---

## Assignment 5: Ternary Practice

একটি variable `isLoggedIn` নাও।  
Ternary operator ব্যবহার করে message তৈরি করো।

Rules:

- true হলে `Welcome back`
- false হলে `Please login`

### Starter Code

```js
let isLoggedIn = true;

let message = // write ternary here

console.log(message);
```

---

## Assignment 6: Independent `if` বনাম `else if` Experiment

`x = 0` নিয়ে দুই ধরনের code চালাও।

### Version A: Independent `if`

```js
let x = 0;

if (x === 0) {
  console.log("zero");
}

if (x >= 0) {
  console.log("greater than or equal to zero");
}

if (x <= 0) {
  console.log("less than or equal to zero");
}
```

### Version B: `else if`

```js
let x = 0;

if (x === 0) {
  console.log("zero");
} else if (x >= 0) {
  console.log("greater than or equal to zero");
} else if (x <= 0) {
  console.log("less than or equal to zero");
}
```

### Task

Output compare করো এবং নিজের ভাষায় explain করো কেন দুই code-এর output আলাদা।

---

# Final Summary

এই lesson-এ JavaScript-এর control flow এবং branching শেখানো হয়েছে।

মূল idea হলো: JavaScript সাধারণত line by line execute হলেও condition-এর মাধ্যমে আমরা execution path control করতে পারি।

সবচেয়ে গুরুত্বপূর্ণ points:

1. `if` condition true হলে code execute করে।
2. `else` condition false হলে alternative code execute করে।
3. Multiple mutually exclusive condition হলে `else if` ব্যবহার করা উচিত।
4. Independent `if` সব condition check করে, তাই একাধিক output আসতে পারে।
5. `else if` chain প্রথম matching condition পেলেই stop করে।
6. Nested `if-else` ব্যবহার করা যায়, কিন্তু বেশি nesting code unreadable করতে পারে।
7. `else` কখনো একা থাকতে পারে না।
8. Fixed value match করার জন্য `switch-case` ভালো।
9. `switch-case`-এ `break` না দিলে fall-through হয়।
10. কোনো case match না করলে `default` fallback হিসেবে কাজ করে।
11. `switch-case` string value-র সাথেও কাজ করে, কিন্তু string matching case-sensitive।
12. Simple `if-else` shorthand হিসেবে `ternary operator` ব্যবহার করা যায়।
13. Complex logic হলে ternary avoid করে normal `if-else` ব্যবহার করা ভালো।
14. Range বা logical condition হলে `if-else`; exact fixed value হলে `switch-case`।

## সবচেয়ে গুরুত্বপূর্ণ মনে রাখার নিয়ম

```txt
Condition-based decision → if / else if / else
Fixed value-based decision → switch / case / default
Simple either-or decision → ternary
Matched switch case-এর পর stop করতে → break
```

---

# Practice Checklist

এই lesson revise করার সময় নিচের checklist follow করো।

## Concept Checklist

- [ ] Control flow কী বুঝি
- [ ] Branching কীভাবে কাজ করে বুঝি
- [ ] `if` syntax লিখতে পারি
- [ ] `if-else` syntax লিখতে পারি
- [ ] Condition true/false কীভাবে evaluate হয় বুঝি
- [ ] Comparison operator ব্যবহার করতে পারি
- [ ] `>=` এবং `>`-এর difference বুঝি
- [ ] Curly braces কেন important জানি
- [ ] Multiple condition-এর জন্য `else if` লিখতে পারি
- [ ] Independent `if` এবং `else if`-এর difference বুঝি
- [ ] Nested `if-else` trace করতে পারি
- [ ] `else` কেন একা থাকতে পারে না জানি
- [ ] `switch-case` syntax লিখতে পারি
- [ ] `break` না দিলে কী হয় বুঝি
- [ ] `default` case ব্যবহার করতে পারি
- [ ] Number value দিয়ে `switch-case` লিখতে পারি
- [ ] String value দিয়ে `switch-case` লিখতে পারি
- [ ] String case sensitivity বুঝি
- [ ] `if-else` বনাম `switch-case` কখন ব্যবহার করতে হয় জানি
- [ ] Simple ternary operator লিখতে পারি
- [ ] Fall-through intentionally ব্যবহার করতে পারি

## Coding Checklist

- [ ] Voting eligibility program লিখেছি
- [ ] Grading system লিখেছি
- [ ] Day finder with `switch-case` লিখেছি
- [ ] City grouping with fall-through লিখেছি
- [ ] Ternary দিয়ে simple message লিখেছি
- [ ] Independent `if` vs `else if` output compare করেছি
- [ ] প্রতিটি code কমপক্ষে ৩-৪টি input দিয়ে test করেছি
- [ ] Browser console বা Node.js-এ code run করেছি
- [ ] ভুল করে `break` বাদ দিয়ে output observe করেছি
- [ ] Boundary values test করেছি, যেমন 18, 70, 80, 90

## Revision Tip

প্রতিটি concept শুধু পড়ে থেমে গেলে হবে না। নিজের হাতে code লিখে value পরিবর্তন করে output দেখলে control flow সবচেয়ে ভালো বোঝা যায়।

---

# Quick Revision Table

| Problem Type | Best Tool |
|---|---|
| শুধু true হলে কাজ | `if` |
| true/false দুই path | `if-else` |
| multiple range-based condition | `else if` |
| one value, many exact matches | `switch-case` |
| no case matched | `default` |
| matched case-এর পর stop | `break` |
| multiple case একই কাজ করবে | fall-through |
| simple one-line decision | `ternary operator` |

---

# Mini Cheat Sheet

```js
// if
if (condition) {
  // true হলে
}

// if-else
if (condition) {
  // true হলে
} else {
  // false হলে
}

// else-if
if (condition1) {
  // condition1 true
} else if (condition2) {
  // condition2 true
} else {
  // none matched
}

// switch-case
switch (value) {
  case value1:
    // matched value1
    break;

  case value2:
    // matched value2
    break;

  default:
    // no match
}

// ternary
let result = condition ? valueIfTrue : valueIfFalse;
```

---

# শেষ কথা

JavaScript logic building শেখার জন্য control flow খুবই foundational। পরে loop, function, DOM event, async behavior—সব জায়গাতেই condition এবং branching ব্যবহার হবে। তাই `if-else`, `switch-case`, `break`, `default`, এবং `ternary` ভালোভাবে practice করলে পরের advanced topicগুলো অনেক সহজ হবে।
