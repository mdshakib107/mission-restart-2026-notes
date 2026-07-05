# 40 Days of JavaScript — Day 7 Project Notes  
## Rock Paper Scissors Game + Secret Number Guessing Assignment

> এই notes JavaScript tutorial transcript থেকে তৈরি করা হয়েছে। লক্ষ্য হলো ভিডিও না দেখেও beginner student যেন lesson-এর concept, logic building, code flow, common mistakes, এবং assignment পরিষ্কারভাবে বুঝতে পারে।

---

## Table of Contents

1. [Lesson Overview](#lesson-overview)
2. [এই Lesson-এ কী শেখানো হয়েছে](#এই-lesson-এ-কী-শেখানো-হয়েছে)
3. [Project Thinking: কোড লেখার আগে Logic ভাঙা](#project-thinking-কোড-লেখার-আগে-logic-ভাঙা)
4. [Project 1: Rock Paper Scissors Game](#project-1-rock-paper-scissors-game)
5. [Game Rules](#game-rules)
6. [Project Assumptions](#project-assumptions)
7. [Basic Code Structure](#basic-code-structure)
8. [HTML থেকে JavaScript File Load করা](#html-থেকে-javascript-file-load-করা)
9. [User Input নেওয়া: `prompt()`](#user-input-নেওয়া-prompt)
10. [String Case Handling: `toLowerCase()`](#string-case-handling-tolowercase)
11. [Computer Choice তৈরি করা: Random Number Generation](#computer-choice-তৈরি-করা-random-number-generation)
12. [`let`, `const`, এবং `var` ব্যবহারের Rule](#let-const-এবং-var-ব্যবহারের-rule)
13. [Winner নির্ধারণের Logic](#winner-নির্ধারণের-logic)
14. [Invalid Input Handling](#invalid-input-handling)
15. [Play Again Feature](#play-again-feature)
16. [Recursion এবং Exit Criteria](#recursion-এবং-exit-criteria)
17. [Complete Rock Paper Scissors Code](#complete-rock-paper-scissors-code)
18. [Important Differences](#important-differences)
19. [Common Mistakes](#common-mistakes)
20. [Project 1 Practice Task: `if...else` থেকে `switch...case`](#project-1-practice-task-ifelse-থেকে-switchcase)
21. [Project 2 Assignment: Secret Number Guessing Game](#project-2-assignment-secret-number-guessing-game)
22. [Assignment Logic Breakdown](#assignment-logic-breakdown)
23. [Assignment Suggested Code](#assignment-suggested-code)
24. [Final Summary](#final-summary)
25. [Practice Checklist](#practice-checklist)

---

## Lesson Overview

এই lesson হলো JavaScript course-এর Day 7। এটি প্রথম module বা milestone-এর শেষ lesson হিসেবে project-based practice করানোর জন্য তৈরি। Day 1 থেকে Day 6 পর্যন্ত শেখা concept—যেমন variable, function, condition, logical operator, prompt, string method, loop, random number, এবং basic program flow—এসব ব্যবহার করে practical project বানানো হয়েছে।

এই lesson-এ মূলত দুইটি project নিয়ে আলোচনা করা হয়েছে:

| Project | Type | উদ্দেশ্য |
|---|---|---|
| Rock Paper Scissors Game | Guided project | Instructor পুরো logic build করে দেখিয়েছেন |
| Secret Number Guessing Game | Assignment project | Student-কে নিজে বানাতে বলা হয়েছে |

Lesson-এর সবচেয়ে গুরুত্বপূর্ণ message হলো: **project বানানো মানে শুধু কোড লেখা নয়; আগে problem বুঝে logic ভাঙতে হয়।**

---

## এই Lesson-এ কী শেখানো হয়েছে

এই lesson থেকে তুমি নিচের জিনিসগুলো শিখবে:

1. একটি simple game-এর requirements বুঝে logic তৈরি করা।
2. Function-এর ভিতরে পুরো program রাখা।
3. Browser-এর `prompt()` ব্যবহার করে user input নেওয়া।
4. User input normalize করার জন্য `toLowerCase()` ব্যবহার করা।
5. `Math.random()` এবং `Math.floor()` দিয়ে random number তৈরি করা।
6. Random number ব্যবহার করে computer-এর choice তৈরি করা।
7. `if`, `else if`, `else` দিয়ে decision making করা।
8. `&&` এবং `||` logical operator দিয়ে multiple condition combine করা।
9. `let` এবং `const` কোথায় ব্যবহার করতে হয়।
10. User ভুল input দিলে invalid input handle করা।
11. Game শেষ হলে user-কে আবার play করতে বলা।
12. Function নিজের ভিতরে নিজেকে call করলে recursion কীভাবে কাজ করে।
13. Loop ব্যবহার করে repeated guessing game বানানোর mental model।

---

## Project Thinking: কোড লেখার আগে Logic ভাঙা

Instructor বারবার বলেছেন, project building একটি art। beginner হিসেবে common mistake হলো problem হাতে পেয়েই code লেখা শুরু করা। কিন্তু ভালো developer আগে problem-টা ভেঙে নেয়।

### কেন আগে logic ভাবা দরকার?

ধরা যাক, তোমাকে বলা হলো Rock Paper Scissors game বানাতে। তুমি যদি সরাসরি code লেখা শুরু করো, তাহলে মাঝপথে confuse হতে পারো:

- User input কোথা থেকে আসবে?
- Computer choice কীভাবে তৈরি হবে?
- Winner কীভাবে determine হবে?
- Tie হলে কী হবে?
- User ভুল input দিলে কী হবে?
- Game আবার খেলতে চাইলে কী হবে?

এই প্রশ্নগুলোর উত্তর আগে লিখে নিলে coding অনেক সহজ হয়।

### Logic building-এর সাধারণ ধাপ

```text
Problem পড়ো
↓
Rules বোঝো
↓
Assumption লিখো
↓
Input কী হবে নির্ধারণ করো
↓
Processing বা logic কী হবে নির্ধারণ করো
↓
Output কী হবে নির্ধারণ করো
↓
তারপর code লেখো
```

### মনে রাখার নিয়ম

> “প্রথমে problem solve করো মাথায়, তারপর code solve করবে keyboard-এ।”

---

## Project 1: Rock Paper Scissors Game

Rock Paper Scissors একটি classic game। এখানে game খেলে দুইজন player। এই project-এ player দুইজন:

1. Human user  
2. Computer  

User `rock`, `paper`, অথবা `scissors` select করবে। Computer-ও random ভাবে `rock`, `paper`, অথবা `scissors` select করবে। তারপর game rule অনুযায়ী winner নির্ধারণ করা হবে।

---

## Game Rules

Rock Paper Scissors game-এর rule খুব simple:

| Choice 1 | Choice 2 | Winner | কারণ |
|---|---|---|---|
| Rock | Scissors | Rock | Rock scissors ভাঙতে পারে |
| Paper | Rock | Paper | Paper rock wrap করতে পারে |
| Scissors | Paper | Scissors | Scissors paper কাটতে পারে |
| Same choice | Same choice | Tie | দুইজন একই choice করলে কেউ জেতে না |

### Example

```text
User selected: rock
Computer selected: scissors
Result: User wins
```

কারণ `rock` beats `scissors`.

```text
User selected: paper
Computer selected: paper
Result: Game is a tie
```

কারণ দুইজন একই choice দিয়েছে।

---

## Project Assumptions

Code শুরু করার আগে instructor কিছু assumption লিখেছেন। এগুলো project-এর blueprint-এর মতো।

### Assumptions

| Step | Assumption | Explanation |
|---|---|---|
| 1 | User input নিতে হবে | User `rock`, `paper`, অথবা `scissors` দেবে |
| 2 | Computer choice random হবে | Computer আগে থেকে fixed choice নেবে না |
| 3 | User choice এবং computer choice compare করতে হবে | Winner বের করার জন্য দুই choice compare করতে হবে |
| 4 | Winner announce করতে হবে | Result console-এ দেখানো হবে |
| 5 | Play again option দিতে হবে | User চাইলে আবার game খেলতে পারবে |

### Important Concept

এগুলোকে “assumption” বলা হচ্ছে কারণ code লিখতে গিয়ে কিছু পরিবর্তন হতে পারে। কিন্তু শুরুতে assumption না লিখলে logic messy হয়ে যায়।

### Common Mistake

অনেক beginner একসাথে সব code লিখে শেষে run করে। এতে error কোথায় হচ্ছে বোঝা কঠিন হয়।

### মনে রাখার নিয়ম

> ছোট ছোট assumption লিখে code করো। একেকটা অংশ complete হলে test করো।

---

## Basic Code Structure

যেহেতু পুরো Rock Paper Scissors একটি functionality, তাই পুরো game logic একটি function-এর ভিতরে রাখা হয়েছে।

### Function কী?

Function হলো reusable code block। Function define করলে code সাথে সাথে run হয় না। Function run করাতে হলে function call করতে হয়।

### Basic structure

```javascript
function rockPaperScissorsGame() {
  console.log("Getting started with the Rock Paper Scissors game");
}

rockPaperScissorsGame();
```

### Explanation

| Line | কাজ |
|---|---|
| `function rockPaperScissorsGame()` | একটি function define করা হয়েছে |
| `{ ... }` | Function body |
| `console.log(...)` | Test করার জন্য message print |
| `rockPaperScissorsGame();` | Function call করা হয়েছে |

### Important Concept

Function define করা আর function call করা এক জিনিস নয়।

```javascript
function sayHello() {
  console.log("Hello");
}
```

এখানে function শুধু তৈরি হয়েছে। এখনো run হয়নি।

```javascript
sayHello();
```

এখানে function run হলো।

### Common Mistake

```javascript
function rockPaperScissorsGame() {
  console.log("Game started");
}
```

শুধু এতটুকু লিখলে browser console-এ কিছু দেখা যাবে না, কারণ function call করা হয়নি।

### মনে রাখার নিয়ম

> Function বানালে call করতে ভুলবে না।

---

## HTML থেকে JavaScript File Load করা

Instructor একটি folder structure ব্যবহার করেছেন:

```text
project-folder/
│
├── index.html
│
└── RPS/
    ├── rps.html
    └── rps.js
```

### Main `index.html`

Main page থেকে Rock Paper Scissors project page-এ যাওয়ার জন্য anchor tag ব্যবহার করা হয়েছে।

```html
<a href="./RPS/rps.html">Rock Paper Scissors</a>
```

### `rps.html`

এই HTML file JavaScript file load করছে।

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Rock Paper Scissors</title>
</head>
<body>
  <h1>Rock Paper Scissors Project</h1>

  <script src="./rps.js"></script>
</body>
</html>
```

### Important Concept

`script` tag দিয়ে external JavaScript file connect করা হয়।

```html
<script src="./rps.js"></script>
```

### Common Mistake

1. File path ভুল দেওয়া।
2. JavaScript file link না করা।
3. Console না খুলে output খোঁজা।
4. Function call না করা।

### মনে রাখার নিয়ম

> HTML শুধু page দেখাবে, JavaScript page-কে behavior দেবে।

---

## User Input নেওয়া: `prompt()`

Browser environment-এ JavaScript কিছু global method দেয় user-এর সাথে interact করার জন্য। যেমন:

| Method | কাজ |
|---|---|
| `alert()` | User-কে message দেখায় |
| `prompt()` | User-এর কাছ থেকে input নেয় |

### `prompt()` কী?

`prompt()` browser-এ একটি ছোট input dialog দেখায়। User কিছু লিখে OK করলে সেই value return হয়।

```javascript
const userChoicePrompt = prompt("Enter rock, paper or scissors");
```

### Explanation

- Browser একটি prompt box দেখাবে।
- User যদি `rock` লিখে OK করে, তাহলে `userChoicePrompt` variable-এর value হবে `"rock"`.
- User যদি Cancel করে, তাহলে value হবে `null`.

### Important Concept

`prompt()` সবসময় browser environment-এ পাওয়া যায়। Node.js environment-এ সরাসরি `prompt()` available নয়।

### Example

```javascript
const name = prompt("What is your name?");
console.log(name);
```

যদি user লিখে:

```text
Rahim
```

Console output:

```text
Rahim
```

### Common Mistake

`prompt()` থেকে আসা value number মনে করা। আসলে prompt থেকে value সাধারণত string হিসেবে আসে।

```javascript
const age = prompt("Enter your age");
console.log(typeof age); // "string"
```

### মনে রাখার নিয়ম

> `prompt()` user input নেয়, কিন্তু input string হিসেবে আসে।

---

## String Case Handling: `toLowerCase()`

User কীভাবে input দেবে তা আমরা control করতে পারি না। কেউ লিখতে পারে:

```text
rock
Rock
ROCK
rOcK
```

JavaScript-এর কাছে এগুলো আলাদা string।

```javascript
console.log("Rock" === "rock"); // false
```

তাই comparison করার আগে user input-কে lower case করা ভালো।

### Code

```javascript
const userChoicePrompt = prompt("Enter rock, paper or scissors");
const userChoice = userChoicePrompt.toLowerCase();
```

### Explanation

`toLowerCase()` string-এর সব letter lower case করে দেয়।

```javascript
console.log("ROCK".toLowerCase()); // "rock"
console.log("Paper".toLowerCase()); // "paper"
```

### Common Mistake

User Cancel করলে `prompt()` return করে `null`। তখন:

```javascript
null.toLowerCase();
```

এটি error দেবে।

Error হতে পারে:

```text
Cannot read properties of null
```

### Safe version

```javascript
const userChoicePrompt = prompt("Enter rock, paper or scissors");
const userChoice = userChoicePrompt ? userChoicePrompt.toLowerCase() : "";
```

### মনে রাখার নিয়ম

> String method call করার আগে নিশ্চিত হও value সত্যিই string কিনা।

---

## Computer Choice তৈরি করা: Random Number Generation

Computer choice random হতে হবে। এর জন্য JavaScript-এর `Math.random()` method ব্যবহার করা হয়েছে।

### `Math.random()` কী করে?

`Math.random()` 0 থেকে 1-এর মধ্যে random decimal number দেয়।

Example:

```javascript
console.log(Math.random());
```

Possible output:

```text
0.245678
0.905432
0.019283
```

এটি কখনো সরাসরি 1 দেয় না, কিন্তু 0-এর কাছাকাছি বা 1-এর কাছাকাছি decimal দিতে পারে।

### Problem

আমাদের দরকার 1 থেকে 3-এর মধ্যে random integer:

```text
1 → rock
2 → paper
3 → scissors
```

কিন্তু `Math.random()` decimal দেয়। তাই কয়েকটি step দরকার।

---

### Step-by-step Random Number Formula

#### Step 1: Random decimal তৈরি

```javascript
Math.random()
```

Output হতে পারে:

```text
0.72
```

#### Step 2: Range scale করা

আমাদের 3টি option আছে, তাই 3 দিয়ে multiply করা হলো।

```javascript
Math.random() * 3
```

Possible output:

```text
2.16
```

#### Step 3: Decimal বাদ দেওয়া

`Math.floor()` decimal number-কে নিচের integer-এ নামিয়ে আনে।

```javascript
Math.floor(2.16); // 2
```

#### Step 4: 1 যোগ করা

`Math.floor(Math.random() * 3)` output দিতে পারে:

```text
0, 1, 2
```

কিন্তু আমাদের দরকার:

```text
1, 2, 3
```

তাই `+ 1`.

```javascript
const randomNumber = Math.floor(Math.random() * 3) + 1;
```

### Final Formula

```javascript
const randomNumber = Math.floor(Math.random() * 3) + 1;
```

### Output mapping

| Random number | Computer choice |
|---|---|
| 1 | rock |
| 2 | paper |
| 3 | scissors |

---

## Random Number Formula সাধারণভাবে

### 1 থেকে `max` পর্যন্ত random integer

```javascript
Math.floor(Math.random() * max) + 1;
```

Example: 1 থেকে 10

```javascript
const number = Math.floor(Math.random() * 10) + 1;
```

### `min` থেকে `max` পর্যন্ত random integer

```javascript
Math.floor(Math.random() * (max - min + 1)) + min;
```

Example: 5 থেকে 15

```javascript
const number = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
```

### মনে রাখার নিয়ম

> Random decimal → range দিয়ে multiply → `Math.floor()` → দরকার হলে `+ min`.

---

## Computer Choice Logic

Computer-এর random number পাওয়ার পর সেটাকে choice-এ convert করতে হবে।

```javascript
let computerChoice;

const randomNumber = Math.floor(Math.random() * 3) + 1;

if (randomNumber === 1) {
  computerChoice = "rock";
} else if (randomNumber === 2) {
  computerChoice = "paper";
} else {
  computerChoice = "scissors";
}
```

### কেন `computerChoice`-এ `let`?

কারণ variable declare করার সময় value জানা নেই। পরে condition অনুযায়ী value assign করা হচ্ছে।

```javascript
let computerChoice;
```

তারপর:

```javascript
computerChoice = "rock";
computerChoice = "paper";
computerChoice = "scissors";
```

এখানে reassign হচ্ছে, তাই `let`.

---

## `let`, `const`, এবং `var` ব্যবহারের Rule

Instructor একটি important rule বলেছেন:

> যেখানে possible, `const` ব্যবহার করো। value reassign করতে হলে `let` ব্যবহার করো। `var` avoid করো।

### Difference Table

| Keyword | Reassign করা যায়? | সাধারণ ব্যবহার |
|---|---:|---|
| `const` | না | যেসব value একবার assign হওয়ার পর বদলাবে না |
| `let` | হ্যাঁ | যেসব variable-এর value পরে বদলাবে |
| `var` | হ্যাঁ | পুরনো JavaScript; avoid করা ভালো |

### Example: `const`

```javascript
const randomNumber = Math.floor(Math.random() * 3) + 1;
```

এখানে `randomNumber` একবার তৈরি হলে আর বদলানো হচ্ছে না।

### Example: `let`

```javascript
let computerChoice;

if (randomNumber === 1) {
  computerChoice = "rock";
}
```

এখানে `computerChoice` পরে assign হচ্ছে, তাই `let`.

### User choice কি `const` হতে পারে?

হ্যাঁ। কারণ একবার user input নেওয়ার পর আমরা `userChoice` reassign করছি না।

```javascript
const userChoice = userChoicePrompt.toLowerCase();
```

### Common Mistake

```javascript
const computerChoice;

computerChoice = "rock";
```

এটি error দেবে, কারণ `const` declare করার সময় value assign করতেই হয়।

### মনে রাখার নিয়ম

> Default হিসেবে `const`; value বদলালে `let`; `var` ব্যবহার না করাই ভালো।

---

## Winner নির্ধারণের Logic

এখন আমাদের কাছে দুইটি value আছে:

```javascript
userChoice
computerChoice
```

এখন game rule অনুযায়ী winner বের করতে হবে।

### User কখন জিতবে?

User জিতবে ৩টি condition-এ:

| User | Computer | Result |
|---|---|---|
| rock | scissors | User wins |
| paper | rock | User wins |
| scissors | paper | User wins |

### Code

```javascript
if (
  (userChoice === "rock" && computerChoice === "scissors") ||
  (userChoice === "paper" && computerChoice === "rock") ||
  (userChoice === "scissors" && computerChoice === "paper")
) {
  console.log("You, the user, win!");
}
```

### এখানে `&&` কেন?

`&&` মানে দুইটি condition-ই true হতে হবে।

```javascript
userChoice === "rock" && computerChoice === "scissors"
```

এর মানে:

- User অবশ্যই `rock` হতে হবে
- Computer অবশ্যই `scissors` হতে হবে

দুইটি একসাথে true হলে user wins.

### এখানে `||` কেন?

`||` মানে যেকোনো একটি condition true হলেই হবে।

User তিনভাবে জিততে পারে:

1. rock beats scissors
2. paper beats rock
3. scissors beats paper

তাই তিন condition `||` দিয়ে যুক্ত করা হয়েছে।

---

## Tie Condition

যদি user choice এবং computer choice একই হয়, তাহলে game tie.

```javascript
else if (userChoice === computerChoice) {
  console.log("The game is a tie");
}
```

### Example

```text
User: rock
Computer: rock
Result: tie
```

### Important Concept

Tie condition আলাদাভাবে handle করা জরুরি। নাহলে same choice ভুলভাবে অন্য কোনো result দিতে পারে।

---

## Computer Win Condition

Computer জিতবে user win condition-এর opposite case-গুলোতে।

| User | Computer | Result |
|---|---|---|
| rock | paper | Computer wins |
| paper | scissors | Computer wins |
| scissors | rock | Computer wins |

### Code

```javascript
else if (
  (userChoice === "rock" && computerChoice === "paper") ||
  (userChoice === "paper" && computerChoice === "scissors") ||
  (userChoice === "scissors" && computerChoice === "rock")
) {
  console.log("Computer wins!");
}
```

### Full Decision Flow

```text
Check user win
↓
Check tie
↓
Check computer win
↓
Otherwise invalid input
```

### মনে রাখার নিয়ম

> Game logic লিখলে সব possible case লিখে table বানাও। তারপর code করো।

---

## Invalid Input Handling

User যদি `rock`, `paper`, বা `scissors` ছাড়া অন্য কিছু লিখে, তাহলে program winner determine করতে পারবে না।

Example:

```text
User input: hello
Computer choice: rock
```

এখানে কোনো game rule match করবে না।

তাই final `else` block ব্যবহার করা হয়েছে।

```javascript
else {
  console.log("Please check your input. We did not understand it.");
}
```

### Why final `else`?

কারণ এর আগের কোনো condition match না করলে ধরে নেওয়া যায় input invalid।

### Common Mistake

Invalid input handle না করলে program silently fail করতে পারে বা ভুল result দেখাতে পারে।

### Better validation approach

```javascript
if (
  userChoice !== "rock" &&
  userChoice !== "paper" &&
  userChoice !== "scissors"
) {
  console.log("Invalid input. Please enter rock, paper, or scissors.");
}
```

এটি শুরুতেই input validate করে।

### মনে রাখার নিয়ম

> User কখনো perfect input দেবে ধরে নিও না।

---

## Testing Mindset

Instructor বলেছেন, project বানানোর সময় শেষে গিয়ে test না করে প্রতিটি logic change-এর পর test করা উচিত।

### ভালো practice

```text
Function কাজ করছে? → Test
Prompt আসছে? → Test
User input console-এ আসছে? → Test
Computer random choice আসছে? → Test
Winner logic কাজ করছে? → Test
Play again কাজ করছে? → Test
```

### Common Mistake

অনেকগুলো code একসাথে লিখে শেষে run করলে error কোথায় হলো বোঝা কঠিন হয়।

### মনে রাখার নিয়ম

> ছোট change, ছোট test, দ্রুত fix।

---

## Play Again Feature

প্রথম version-এ game আবার খেলতে browser refresh করতে হচ্ছিল। এরপর instructor play again feature add করেছেন।

### Requirement

Game result দেখানোর পর user-কে জিজ্ঞাসা করা হবে:

```text
Do you want to play again? yes or no
```

User যদি `yes` দেয়, game আবার শুরু হবে। অন্যথায় game শেষ হবে।

### Code

```javascript
const playAgainPrompt = prompt("Do you want to play again? yes or no");
const playAgain = playAgainPrompt ? playAgainPrompt.toLowerCase() : "no";

if (playAgain === "yes") {
  rockPaperScissorsGame();
} else {
  console.log("Thanks for playing. See you next time!");
}
```

### Important Concept: Fallback value

User যদি Cancel click করে, তাহলে `playAgainPrompt` হবে `null`। তখন `null.toLowerCase()` error দেবে।

তাই ব্যবহার করা হয়েছে:

```javascript
const playAgain = playAgainPrompt ? playAgainPrompt.toLowerCase() : "no";
```

এর মানে:

- যদি `playAgainPrompt`-এ value থাকে → lower case করো
- না থাকলে → `"no"` ধরো

### Common Mistake

```javascript
const playAgain = playAgainPrompt.toLowerCase();
```

User Cancel করলে error হবে।

### মনে রাখার নিয়ম

> Prompt থেকে আসা value method call করার আগে check করো।

---

## Recursion এবং Exit Criteria

Play again feature-এ একটি interesting concept ব্যবহার হয়েছে: function নিজের ভিতরে নিজেকে call করছে।

```javascript
if (playAgain === "yes") {
  rockPaperScissorsGame();
}
```

এটিকে recursion বলা যায়।

### Recursion কী?

যখন একটি function নিজের ভিতর থেকে আবার নিজেকেই call করে, সেটাকে recursion বলা হয়।

### এখানে recursion কীভাবে হচ্ছে?

```javascript
function rockPaperScissorsGame() {
  // game logic

  if (playAgain === "yes") {
    rockPaperScissorsGame();
  }
}
```

User `yes` দিলে একই function আবার run হয়।

### Exit criteria কী?

Recursion safe রাখতে হলে কোনো condition থাকতে হবে যেখানে function আর নিজেকে call করবে না। এখানে exit criteria হলো:

```javascript
playAgain !== "yes"
```

তখন:

```javascript
console.log("Thanks for playing. See you next time!");
```

### Common Mistake

Exit criteria না থাকলে infinite recursion হতে পারে।

```javascript
function game() {
  game();
}
```

এটি dangerous, কারণ function বারবার নিজেকে call করবে এবং program crash করতে পারে।

### মনে রাখার নিয়ম

> Recursion করলে exit condition অবশ্যই থাকতে হবে।

---

## Complete Rock Paper Scissors Code

নিচে project-এর complete beginner-friendly version দেওয়া হলো।

```javascript
function rockPaperScissorsGame() {
  console.log("Getting started with the Rock Paper Scissors game");

  const userChoicePrompt = prompt("Enter rock, paper or scissors");

  const userChoice = userChoicePrompt ? userChoicePrompt.toLowerCase() : "";

  let computerChoice;

  const randomNumber = Math.floor(Math.random() * 3) + 1;

  if (randomNumber === 1) {
    computerChoice = "rock";
  } else if (randomNumber === 2) {
    computerChoice = "paper";
  } else {
    computerChoice = "scissors";
  }

  console.log("User selected:", userChoice);
  console.log("Computer selected:", computerChoice);

  if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    console.log("You, the user, win!");
  } else if (userChoice === computerChoice) {
    console.log("The game is a tie");
  } else if (
    (userChoice === "rock" && computerChoice === "paper") ||
    (userChoice === "paper" && computerChoice === "scissors") ||
    (userChoice === "scissors" && computerChoice === "rock")
  ) {
    console.log("Computer wins!");
  } else {
    console.log("Please check your input. We did not understand it.");
  }

  const playAgainPrompt = prompt("Do you want to play again? yes or no");
  const playAgain = playAgainPrompt ? playAgainPrompt.toLowerCase() : "no";

  if (playAgain === "yes") {
    rockPaperScissorsGame();
  } else {
    console.log("Thanks for playing. See you next time!");
  }
}

rockPaperScissorsGame();
```

---

## Code Flow Diagram

```text
Start function
↓
Ask user for choice
↓
Normalize user input
↓
Generate random number
↓
Convert random number to computer choice
↓
Compare user choice and computer choice
↓
Announce result
↓
Ask user to play again
↓
If yes → call function again
↓
If no → end game
```

---

## Important Differences

### `alert()` vs `prompt()`

| Topic | `alert()` | `prompt()` |
|---|---|---|
| কাজ | Message দেখায় | Input নেয় |
| Return value | সাধারণত useful input দেয় না | User input return করে |
| Use case | Warning, notice | Name, choice, number নেওয়া |

### `Math.random()` vs `Math.floor()`

| Method | কাজ |
|---|---|
| `Math.random()` | 0 থেকে 1-এর মধ্যে decimal random number দেয় |
| `Math.floor()` | decimal number-কে নিচের integer-এ নামায় |

Example:

```javascript
Math.random(); // 0.73
Math.floor(2.99); // 2
```

### `&&` vs `||`

| Operator | Meaning | Example |
|---|---|---|
| `&&` | সব condition true হতে হবে | User rock এবং computer scissors |
| `||` | যেকোনো একটি condition true হলেই হবে | User তিনভাবে জিততে পারে |

### `==` vs `===`

| Operator | কাজ | Recommendation |
|---|---|---|
| `==` | Type conversion করে compare করে | Avoid করা ভালো |
| `===` | Type এবং value দুইটাই compare করে | Prefer করা উচিত |

Example:

```javascript
console.log(5 == "5");  // true
console.log(5 === "5"); // false
```

### `let` vs `const`

| Topic | `let` | `const` |
|---|---|---|
| Reassign | করা যায় | করা যায় না |
| Use case | Value পরে বদলাবে | Value বদলাবে না |
| Example | `let computerChoice;` | `const randomNumber = ...` |

---

## Common Mistakes

### Mistake 1: Function call না করা

```javascript
function game() {
  console.log("Game started");
}
```

এখানে output আসবে না।

Correct:

```javascript
game();
```

---

### Mistake 2: User input lower case না করা

```javascript
if (userChoice === "rock") {
  // ...
}
```

User যদি `Rock` লিখে, condition false হবে।

Correct:

```javascript
const userChoice = userChoicePrompt.toLowerCase();
```

---

### Mistake 3: Cancel button handle না করা

```javascript
const userChoice = userChoicePrompt.toLowerCase();
```

Cancel করলে error হবে।

Correct:

```javascript
const userChoice = userChoicePrompt ? userChoicePrompt.toLowerCase() : "";
```

---

### Mistake 4: Random formula ভুল লেখা

Wrong:

```javascript
const randomNumber = Math.random() * 3;
```

এতে decimal আসবে।

Correct:

```javascript
const randomNumber = Math.floor(Math.random() * 3) + 1;
```

---

### Mistake 5: `const` দিয়ে reassign করার চেষ্টা

Wrong:

```javascript
const computerChoice = "";

computerChoice = "rock";
```

Correct:

```javascript
let computerChoice;

computerChoice = "rock";
```

---

### Mistake 6: Invalid input ignore করা

User যদি `stone` লিখে, program-এর meaningful response থাকা উচিত।

Correct:

```javascript
else {
  console.log("Invalid input");
}
```

---

### Mistake 7: Recursion-এ exit condition না রাখা

Wrong:

```javascript
function game() {
  game();
}
```

Correct:

```javascript
function game() {
  const again = prompt("Play again?");

  if (again === "yes") {
    game();
  }
}
```

---

## Project 1 Practice Task: `if...else` থেকে `switch...case`

Instructor task দিয়েছেন: computer choice generate করার অংশটি `if...else` না লিখে `switch...case` দিয়ে লিখতে হবে।

### Original `if...else`

```javascript
if (randomNumber === 1) {
  computerChoice = "rock";
} else if (randomNumber === 2) {
  computerChoice = "paper";
} else {
  computerChoice = "scissors";
}
```

### `switch...case` version

```javascript
switch (randomNumber) {
  case 1:
    computerChoice = "rock";
    break;

  case 2:
    computerChoice = "paper";
    break;

  case 3:
    computerChoice = "scissors";
    break;

  default:
    computerChoice = "rock";
}
```

### `break` কেন দরকার?

`switch` statement-এ `break` না দিলে matching case-এর পরের case-গুলোও execute হতে পারে। এটাকে fall-through বলা হয়।

### Common Mistake

```javascript
switch (randomNumber) {
  case 1:
    computerChoice = "rock";

  case 2:
    computerChoice = "paper";

  case 3:
    computerChoice = "scissors";
}
```

এখানে `break` নেই, তাই unexpected result হতে পারে।

### মনে রাখার নিয়ম

> `switch` লিখলে প্রতিটি `case` শেষে সাধারণত `break` দাও।

---

## Project 2 Assignment: Secret Number Guessing Game

দ্বিতীয় project instructor নিজে পুরো code করেননি। এটি student assignment হিসেবে দিয়েছেন। তবে mental model এবং hint দিয়েছেন।

### Game Requirement

Computer 1 থেকে 10-এর মধ্যে একটি secret number randomly choose করবে। User number guess করবে। Program user-কে বলবে:

- Guess secret number থেকে কম হলে → too low
- Guess secret number থেকে বেশি হলে → too high
- Guess ঠিক হলে → congratulations
- User কয় attempts-এ guess করেছে সেটাও দেখাবে
- শেষে play again option থাকবে

### Example Game Flow

```text
Welcome to the Number Guessing Game
Try to guess a number between 1 to 10

User guesses: 5
Output: The number is too high. Try again.

User guesses: 3
Output: The number is too high. Try again.

User guesses: 1
Output: Congrats! You guessed the number in 3 attempts.
```

---

## Assignment Logic Breakdown

Instructor hint অনুযায়ী logic ভাঙলে নিচের ধাপগুলো পাওয়া যায়।

### Step 1: Minimum এবং maximum number define করো

```javascript
const minNumber = 1;
const maxNumber = 10;
```

### Step 2: Secret number generate করো

```javascript
const secretNumber =
  Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
```

### Step 3: Attempts count করার variable বানাও

```javascript
let attempts = 0;
```

### Step 4: User guess নাও

```javascript
const guessPrompt = prompt("Guess a number between 1 and 10");
```

### Step 5: Guess number-এ convert করো

`prompt()` string return করে। তাই number comparison করার আগে convert করা ভালো।

```javascript
const guess = Number(guessPrompt);
```

### Step 6: Loop চালাও যতক্ষণ guess secret number না হয়

```javascript
while (guess !== secretNumber) {
  // ask again
}
```

কিন্তু এখানে `guess` যদি `const` হয়, loop-এর ভিতরে নতুন value assign করা যাবে না। তাই `let` দরকার।

```javascript
let guess = Number(prompt("Guess a number between 1 and 10"));
```

### Step 7: Guess কম না বেশি check করো

```javascript
if (guess < secretNumber) {
  console.log("Too low. Try again.");
} else if (guess > secretNumber) {
  console.log("Too high. Try again.");
}
```

### Step 8: Attempts count বাড়াও

প্রতিবার user guess করলে attempts বাড়বে।

```javascript
attempts++;
```

### Step 9: Correct guess হলে success message দাও

```javascript
console.log(`Congrats! You guessed the number in ${attempts} attempts.`);
```

### Step 10: Play again option দাও

Rock Paper Scissors-এর মতো prompt দিয়ে user-কে জিজ্ঞেস করো।

---

## Assignment Suggested Code

নিচের code assignment solve করার একটি possible way। নিজে চেষ্টা করার পর এই code দেখাই ভালো।

```javascript
function secretNumberGuessingGame() {
  console.log("Welcome to the Number Guessing Game");

  const minNumber = 1;
  const maxNumber = 10;

  const secretNumber =
    Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

  let attempts = 0;
  let guess = Number(prompt(`Guess a number between ${minNumber} and ${maxNumber}`));

  while (guess !== secretNumber) {
    attempts++;

    if (Number.isNaN(guess)) {
      console.log("Please enter a valid number.");
    } else if (guess < minNumber || guess > maxNumber) {
      console.log(`Please enter a number between ${minNumber} and ${maxNumber}.`);
    } else if (guess < secretNumber) {
      console.log("The number is too low. Try again.");
    } else if (guess > secretNumber) {
      console.log("The number is too high. Try again.");
    }

    guess = Number(prompt(`Guess again between ${minNumber} and ${maxNumber}`));
  }

  attempts++;

  console.log(`Congrats! You guessed the number in ${attempts} attempts.`);

  const playAgainPrompt = prompt("Do you want to play again? yes or no");
  const playAgain = playAgainPrompt ? playAgainPrompt.toLowerCase() : "no";

  if (playAgain === "yes") {
    secretNumberGuessingGame();
  } else {
    console.log("Thanks for playing. See you next time!");
  }
}

secretNumberGuessingGame();
```

---

## Assignment Code Explanation

### `minNumber` এবং `maxNumber`

```javascript
const minNumber = 1;
const maxNumber = 10;
```

Range সহজে change করার জন্য আলাদা variable ব্যবহার করা হয়েছে। পরে 1–10-এর বদলে 1–100 করতে চাইলে শুধু `maxNumber` change করলেই হবে।

---

### Secret number formula

```javascript
const secretNumber =
  Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
```

এটি inclusive range formula। অর্থাৎ `minNumber` এবং `maxNumber` দুইটিই possible output হতে পারে।

যদি:

```javascript
minNumber = 1
maxNumber = 10
```

তাহলে output হতে পারে:

```text
1, 2, 3, 4, 5, 6, 7, 8, 9, 10
```

---

### Attempts count

```javascript
let attempts = 0;
```

প্রতিবার user guess করলে attempts বাড়ানো হয়েছে।

```javascript
attempts++;
```

`attempts++` মানে:

```javascript
attempts = attempts + 1;
```

---

### Loop কেন দরকার?

Secret number guessing game-এ user একবারেই সঠিক answer নাও দিতে পারে। তাই বারবার prompt দেখাতে loop দরকার।

```javascript
while (guess !== secretNumber) {
  // keep asking
}
```

যতক্ষণ guess এবং secret number equal না হয়, loop চলবে।

---

### `Number()` কেন ব্যবহার করা হয়েছে?

`prompt()` string দেয়।

```javascript
const guess = prompt("Enter number");
```

User `5` লিখলেও value হয়:

```javascript
"5"
```

Number comparison করার জন্য convert করা ভালো:

```javascript
const guess = Number(prompt("Enter number"));
```

### Common Mistake

```javascript
if (guess === secretNumber)
```

যদি `guess` string হয় এবং `secretNumber` number হয়, তাহলে `===` false হবে।

```javascript
"5" === 5 // false
```

Correct:

```javascript
Number("5") === 5 // true
```

---

### `Number.isNaN()` কেন দরকার?

User যদি number-এর বদলে `hello` লিখে:

```javascript
Number("hello")
```

Output হবে:

```javascript
NaN
```

`NaN` মানে Not-a-Number। এটিকে check করার জন্য:

```javascript
Number.isNaN(guess)
```

---

## Assignment Common Mistakes

### Mistake 1: Attempts count ভুল জায়গায় বাড়ানো

যদি attempts শুধু wrong guess-এর জন্য বাড়াও, তাহলে correct guess count miss হতে পারে।

Better:

```javascript
attempts++;
```

প্রতিবার guess নেওয়ার পর count বাড়াও।

---

### Mistake 2: Guess update না করা

Wrong:

```javascript
let guess = Number(prompt("Guess"));

while (guess !== secretNumber) {
  console.log("Try again");
}
```

এখানে `guess` কখনো update হচ্ছে না। Infinite loop হবে।

Correct:

```javascript
while (guess !== secretNumber) {
  guess = Number(prompt("Guess again"));
}
```

---

### Mistake 3: String compare করা

Wrong:

```javascript
let guess = prompt("Guess");

if (guess < secretNumber) {
  console.log("Too low");
}
```

Correct:

```javascript
let guess = Number(prompt("Guess"));
```

---

### Mistake 4: Range validation না করা

User 1–10-এর বাইরে number দিলে message দেখানো ভালো।

```javascript
if (guess < minNumber || guess > maxNumber) {
  console.log("Please enter a number between 1 and 10");
}
```

---

### Mistake 5: Play again logic বাদ দেওয়া

Assignment requirement অনুযায়ী play again option থাকা উচিত।

```javascript
const playAgainPrompt = prompt("Do you want to play again? yes or no");
```

---

## Project-based Learning Tips

### 1. প্রথমে নিজে চেষ্টা করো

Instructor বলেছেন code repository থাকলেও আগে নিজে চেষ্টা করতে হবে। Fail করলে সমস্যা নেই। Try করতে করতে logic clear হয়।

### 2. Error হলে break নাও

কখনো stuck হলে একটু break নিয়ে ফিরে আসলে নতুনভাবে problem দেখা যায়।

### 3. Existing project থেকে pattern reuse করো

Rock Paper Scissors project থেকে এই জিনিসগুলো guessing game-এ reuse করা যায়:

| Rock Paper Scissors | Guessing Game |
|---|---|
| `prompt()` দিয়ে input | `prompt()` দিয়ে guess |
| `Math.random()` দিয়ে computer choice | `Math.random()` দিয়ে secret number |
| condition দিয়ে winner | condition দিয়ে low/high/correct |
| play again recursion | play again recursion |
| invalid input handling | invalid number handling |

### 4. Copy-paste খারাপ নয়, যদি বুঝে করো

Instructor বলেছেন, copy-paste খারাপ নয় যদি তুমি জানো কী copy করছো এবং কেন paste করছো।

---

## Main Concepts Recap

### Function

Reusable code block।

```javascript
function game() {
  // code
}

game();
```

### Variable

Data store করার container।

```javascript
const userChoice = "rock";
let computerChoice = "paper";
```

### Prompt

User input নেওয়ার browser method।

```javascript
prompt("Enter your choice");
```

### String method

String transform করতে method ব্যবহার করা যায়।

```javascript
"ROCK".toLowerCase(); // "rock"
```

### Random number

Random decimal:

```javascript
Math.random();
```

Random integer:

```javascript
Math.floor(Math.random() * 10) + 1;
```

### Condition

Decision making।

```javascript
if (condition) {
  // code
} else {
  // code
}
```

### Logical operator

Multiple condition combine করা।

```javascript
condition1 && condition2
condition1 || condition2
```

### Loop

Repeated task করার জন্য।

```javascript
while (condition) {
  // repeat
}
```

### Recursion

Function নিজের ভিতরে নিজেকে call করা।

```javascript
function play() {
  play();
}
```

Safe recursion করতে exit condition দরকার।

---

## Final Summary

এই lesson-এর মূল focus ছিল Day 1 থেকে Day 6 পর্যন্ত শেখা JavaScript concept-গুলো practical project-এ apply করা। Rock Paper Scissors project দিয়ে দেখা হয়েছে কীভাবে একটি game-এর rules বুঝে assumption তৈরি করতে হয়, তারপর input, random computer choice, condition, winner logic, invalid input, এবং play again feature build করতে হয়।

সবচেয়ে গুরুত্বপূর্ণ শেখার জায়গাগুলো:

1. Code শুরু করার আগে logic ভাঙা জরুরি।
2. Function দিয়ে related logic group করা যায়।
3. Browser-এ `prompt()` দিয়ে user input নেওয়া যায়।
4. User input compare করার আগে normalize করা উচিত।
5. `Math.random()` decimal দেয়; integer range পেতে `Math.floor()` এবং formula দরকার।
6. `const` default choice; reassign দরকার হলে `let`; `var` avoid করা ভালো।
7. Complex game rule লিখতে table বানানো খুব helpful।
8. User input সবসময় valid হবে না, তাই invalid input handle করতে হবে।
9. Play again feature করতে function আবার call করা যায়, কিন্তু exit criteria থাকতে হবে।
10. Secret Number Guessing Game assignment-এ random number, prompt, loop, condition, attempts count, এবং play again—সব concept একসাথে practice হবে।

---

## Practice Checklist

নিচের checklist follow করলে lesson ভালোভাবে revise হবে।

### Rock Paper Scissors

- [ ] `rockPaperScissorsGame()` নামে function বানাতে পারি।
- [ ] Function define এবং function call-এর difference বুঝি।
- [ ] HTML file থেকে JS file link করতে পারি।
- [ ] `prompt()` দিয়ে user input নিতে পারি।
- [ ] User input `toLowerCase()` দিয়ে normalize করতে পারি।
- [ ] `Math.random()` কী return করে বুঝি।
- [ ] 1 থেকে 3 পর্যন্ত random integer generate করতে পারি।
- [ ] Random number map করে computer choice বানাতে পারি।
- [ ] `let` এবং `const` সঠিকভাবে ব্যবহার করতে পারি।
- [ ] User win condition লিখতে পারি।
- [ ] Tie condition লিখতে পারি।
- [ ] Computer win condition লিখতে পারি।
- [ ] Invalid input handle করতে পারি।
- [ ] Play again prompt add করতে পারি।
- [ ] Function recursion দিয়ে game restart করতে পারি।
- [ ] `if...else` version থেকে `switch...case` version বানাতে পারি।

### Secret Number Guessing Game

- [ ] `minNumber` এবং `maxNumber` define করতে পারি।
- [ ] `min` থেকে `max` পর্যন্ত random number generate করতে পারি।
- [ ] `prompt()` থেকে পাওয়া value `Number()` দিয়ে convert করতে পারি।
- [ ] `attempts` count করতে পারি।
- [ ] `while` loop দিয়ে বারবার guess নিতে পারি।
- [ ] Guess কম হলে “too low” দেখাতে পারি।
- [ ] Guess বেশি হলে “too high” দেখাতে পারি।
- [ ] Guess ঠিক হলে success message দেখাতে পারি।
- [ ] User কয় attempts নিয়েছে দেখাতে পারি।
- [ ] Invalid number input handle করতে পারি।
- [ ] Play again feature add করতে পারি।

---

## Quick Revision Formula Sheet

### Random integer from 1 to max

```javascript
Math.floor(Math.random() * max) + 1;
```

### Random integer from min to max

```javascript
Math.floor(Math.random() * (max - min + 1)) + min;
```

### Safe prompt lower case

```javascript
const inputPrompt = prompt("Enter something");
const input = inputPrompt ? inputPrompt.toLowerCase() : "";
```

### Function call

```javascript
function myFunction() {
  console.log("Hello");
}

myFunction();
```

### Play again pattern

```javascript
const playAgainPrompt = prompt("Do you want to play again? yes or no");
const playAgain = playAgainPrompt ? playAgainPrompt.toLowerCase() : "no";

if (playAgain === "yes") {
  game();
} else {
  console.log("Thanks for playing!");
}
```

---

## Study Advice

এই lesson revise করার সময় শুধু notes পড়লেই হবে না। Code editor খুলে project দুইটি নিজে type করো। প্রথমে দেখে দেখে লিখতে পারো, তারপর notes বন্ধ করে নিজে logic লিখো। যদি stuck হও, তাহলে আগে table বানাও: input কী, condition কী, output কী। JavaScript শেখার সবচেয়ে ভালো উপায় হলো ছোট project বারবার build করা।
