# JavaScript Study Notes — Execution Context, Call Stack, Stack & Heap Memory

> Source lesson: Module 2, Day 08 — Execution Context and Call Stack  
> লক্ষ্য: এই notes পড়ে যেন beginner student ভিডিও না দেখেও lesson-এর core concepts, flow, memory model, এবং assignment বুঝতে পারে।

---

## Table of Contents

1. [এই lesson-এ কী শিখব](#এই-lesson-এ-কী-শিখব)
2. [Module 2-এর বড় picture](#module-2-এর-বড়-picture)
3. [Lexical Environment](#lexical-environment)
4. [Execution Context](#execution-context)
5. [Global Execution Context বা GEC](#global-execution-context-বা-gec)
6. [Creation Phase এবং Execution Phase](#creation-phase-এবং-execution-phase)
7. [`window`, `this`, এবং global object](#window-this-এবং-global-object)
8. [Variable এবং Function memory allocation](#variable-এবং-function-memory-allocation)
9. [Function Execution Context বা FEC](#function-execution-context-বা-fec)
10. [Nested function execution flow](#nested-function-execution-flow)
11. [Call Stack](#call-stack)
12. [Stack এবং Heap Memory](#stack-এবং-heap-memory)
13. [Primitive vs Non-Primitive memory behavior](#primitive-vs-non-primitive-memory-behavior)
14. [Garbage Collection](#garbage-collection)
15. [Full flow example: GEC + FEC + Stack + Heap](#full-flow-example-gec--fec--stack--heap)
16. [Important Differences](#important-differences)
17. [Common Mistakes](#common-mistakes)
18. [Assignment](#assignment)
19. [Final Summary](#final-summary)
20. [Practice Checklist](#practice-checklist)

---

## এই lesson-এ কী শিখব

এই lesson-এর main topic হলো:

- JavaScript code কীভাবে internally execute হয়
- Execution Context কী
- Global Execution Context কীভাবে তৈরি হয়
- Function call করলে Function Execution Context কীভাবে তৈরি হয়
- Creation Phase এবং Execution Phase-এ কী কী ঘটে
- Call Stack কীভাবে function execution manage করে
- Stack memory এবং Heap memory-এর basic idea
- Primitive এবং non-primitive value memory-তে কীভাবে রাখা হয়
- Garbage Collection-এর high-level ধারণা
- Hoisting, Scope, Closure, `this`, Event Loop বুঝতে Execution Context কেন foundation

এই lessonটি JavaScript-এর fundamental foundation। ভবিষ্যতে Hoisting, Scope, Closure, `this`, async JavaScript, Event Loop, Web APIs, Task Queue, Microtask Queue, Promise ইত্যাদি বুঝতে এই ধারণাগুলো খুব গুরুত্বপূর্ণ।

---

## Module 2-এর বড় picture

Module 2-এ মূলত JavaScript-এর deeper concepts নিয়ে আলোচনা করা হচ্ছে। এই module-এ যে topics আসবে:

| Topic | কেন গুরুত্বপূর্ণ |
|---|---|
| Execution Context | JavaScript code run করার internal environment বোঝায় |
| Call Stack | কোন function কখন run হবে এবং কখন শেষ হবে তা manage করে |
| Scope | variable কোথা থেকে access করা যাবে তা বোঝায় |
| Hoisting | declaration আগে থেকেই memory-তে রাখা হয় কেন, তা বোঝায় |
| Closure | function কীভাবে outer variable remember করে |
| `this` keyword | কোন context-এ `this` কী value পাবে তা বোঝায় |
| String methods | string manipulation |
| Object ও Array | non-primitive data structure |
| Mini project | শেখা concepts apply করা |

**মনে রাখার নিয়ম:**  
Execution Context ভালো না বুঝলে Hoisting, Scope, Closure, `this`, Event Loop — সবকিছু confusing মনে হতে পারে।

---

## Lexical Environment

### সহজ ব্যাখ্যা

**Lexical Environment** মানে হলো code physically কোথায় লেখা আছে বা কোথায় placed আছে।

“Lexical” শব্দের অর্থ হলো code-এর physical placement বা structure-এর সাথে related।  
JavaScript যখন code দেখে, তখন সে দেখে কোন variable/function কোথায় লেখা হয়েছে, কোন function-এর ভিতরে কোন variable আছে, কোন block বা file-এর ভিতরে কোন statement আছে।

### Example

```js
function sayName() {
  var name = "Tom";
  console.log(name);
}

sayName();
```

এখানে:

- `name` variable টি lexically `sayName` function-এর ভিতরে আছে।
- `sayName` function টি lexically JavaScript file-এর global area-তে আছে।
- `console.log(name)` statement টি function body-এর ভিতরে আছে।

### Diagram-like understanding

```txt
Global Area
│
└── function sayName()
    │
    ├── var name = "Tom"
    └── console.log(name)
```

### কেন Lexical Environment দরকার?

JavaScript engine code execute করার আগে code parse করে। সে দেখে:

- syntax ঠিক আছে কি না
- grammar মানা হয়েছে কি না
- variable/function কোথায় declared
- কোন variable কোন scope-এ আছে
- কোন function কোন environment-এ বসে আছে

### Common Mistake

অনেকে ভাবে Lexical Environment মানে code execute হওয়ার সময়ের environment।  
আসলে Lexical Environment অনেকটাই code-এর physical placement বা written structure-এর উপর নির্ভর করে।

### মনে রাখার নিয়ম

> Lexical Environment = “Code কোথায় লেখা আছে?”  
> Execution Context = “Code এখন কীভাবে run হচ্ছে?”

---

## Execution Context

### সহজ ব্যাখ্যা

**Execution Context** হলো JavaScript code execute করার জন্য তৈরি হওয়া একটি environment।

অর্থাৎ JavaScript যখন কোনো code run করে, তখন শুধু line execute করে না। সে একটি context তৈরি করে যেখানে থাকে:

- কোন code run হচ্ছে
- তার আশেপাশের প্রয়োজনীয় data
- variables
- functions
- `this`
- outer environment reference
- memory allocation
- execution flow

### Definition

> Execution Context হলো current running code এবং সেই code run করতে যা যা দরকার তার surrounding environment।

### Example

```js
var name = "Tom";

function sayName() {
  console.log(name);
}

sayName();
```

এই code run করার সময় JavaScript প্রথমে একটি **Global Execution Context** তৈরি করবে।  
তারপর যখন `sayName()` call হবে, তখন `sayName` function-এর জন্য একটি **Function Execution Context** তৈরি হবে।

### কেন Execution Context গুরুত্বপূর্ণ?

Execution Context না বুঝলে নিচের concepts ঠিকমতো বোঝা কঠিন:

| Concept | Execution Context-এর সাথে সম্পর্ক |
|---|---|
| Hoisting | Creation Phase-এ variable/function memory allocation বোঝা দরকার |
| Scope | কোন context কোন variable access করবে |
| Scope Chain | context থেকে outer context-এ variable খোঁজা |
| Closure | function execution শেষ হলেও lexical environment remember করা |
| `this` | context অনুযায়ী value change করে |
| Event Loop | Call Stack-এর সাথে async কাজ করে |

### Common Mistake

অনেকে Execution Context-কে advanced topic মনে করে skip করে।  
কিন্তু এটি JavaScript-এর core foundation।

### মনে রাখার নিয়ম

> JavaScript code run করার আগে context বানায়, তারপর code execute করে।

---

## Global Execution Context বা GEC

### সহজ ব্যাখ্যা

JavaScript file run হলেই সবার আগে তৈরি হয় **Global Execution Context**।

এমনকি JavaScript file-এ একটি line code না থাকলেও browser environment-এ Global Execution Context তৈরি হয়।

### Global মানে কী?

এই lesson-এর context-এ:

> Global = function-এর বাইরে থাকা সবকিছু

Example:

```js
var a = 5;

function test() {
  var b = 10;
}
```

এখানে:

- `a` হলো global variable
- `test` হলো global function
- `b` global না, কারণ এটি function-এর ভিতরে

### GEC তৈরি হলে কী হয়?

Browser environment-এ Global Execution Context তৈরি হলে সাধারণভাবে দুটি important জিনিস পাওয়া যায়:

1. `window` object
2. `this` keyword

Browser-এর normal script mode-এ:

```js
console.log(window);
console.log(this);
console.log(window === this); // true
```

### Important Note

Browser-এর normal script file-এ global `this` সাধারণত `window` object কে refer করে।

কিন্তু:

- Node.js environment-এ global object আলাদা
- ES Module-এ top-level `this` সাধারণত `undefined`
- Strict mode-এর ভিতরে function call context অনুযায়ী `this` ভিন্ন হতে পারে

এই lesson মূলত browser environment-এর normal script context বোঝাচ্ছে।

---

## Creation Phase এবং Execution Phase

প্রতিটি Execution Context সাধারণত দুইটি phase-এ কাজ করে:

1. **Creation Phase**
2. **Execution Phase**

---

### Creation Phase

Creation Phase-এ JavaScript code line-by-line execute করে না।  
বরং memory setup করে।

Creation Phase-এ সাধারণত:

- Global object তৈরি হয়
- `this` setup হয়
- variable-এর জন্য memory allocate হয়
- `var` variable-এর initial value হয় `undefined`
- function declaration-এর full body memory-তে রাখা হয়
- scope/outer environment link তৈরি হয়

### Execution Phase

Execution Phase-এ JavaScript actual code line-by-line execute করে।

Execution Phase-এ:

- variable-এ actual value assign হয়
- function call হলে নতুন Function Execution Context তৈরি হয়
- expression evaluate হয়
- `console.log()` run হয়
- return statement execute হয়

### Table: Creation Phase vs Execution Phase

| বিষয় | Creation Phase | Execution Phase |
|---|---|---|
| কাজ | Memory setup | Actual code execution |
| variable | memory allocate + `undefined` | actual value assign |
| function declaration | full function body memory-তে যায় | call হলে execute হয় |
| line-by-line execution | না | হ্যাঁ |
| function call | execute হয় না | function call হলে নতুন FEC তৈরি হয় |
| Hoisting-এর সাথে সম্পর্ক | খুব বেশি | কম |

### Example

```js
var name = "Tom";

function sayName() {
  console.log(name);
}
```

Creation Phase-এ:

```txt
name    -> undefined
sayName -> function body
```

Execution Phase-এ:

```txt
name = "Tom"
```

Function call নেই, তাই `sayName` execute হবে না।

### Common Mistake

অনেকে ভাবে function define করলেই function execute হয়ে যায়।  
এটা ভুল।

```js
function sayName() {
  console.log("Tom");
}
```

এখানে function শুধু define হয়েছে।  
Run হবে তখনই যখন call করা হবে:

```js
sayName();
```

### মনে রাখার নিয়ম

> Creation Phase memory বানায়।  
> Execution Phase code চালায়।

---

## `window`, `this`, এবং global object

Browser environment-এ `window` হলো global object।

### Example

```js
console.log(window);
console.log(this);
console.log(window === this); // true
```

এই result `true` হয় কারণ browser-এর global execution context-এ `this` এবং `window` একই object-কে point করে।

### Non-Primitive Equality

`window` এবং `this` object। Object হলো non-primitive value।  
Non-primitive value strict equality (`===`) দিয়ে compare করলে value দেখে না, reference দেখে।

যদি দুইটি object একই memory reference point করে, তাহলে result `true`।

```js
console.log(window === this); // true in browser global script
```

### Common Mistake

`this` সবসময় `window` — এটা ভুল।

`this` কী হবে তা depend করে:

- কোথায় use হচ্ছে
- normal function না arrow function
- strict mode আছে কি না
- object method হিসেবে call হচ্ছে কি না
- constructor হিসেবে call হচ্ছে কি না
- browser script না module

এই lesson-এ শুধুমাত্র global browser context-এর কথা বলা হয়েছে।

### মনে রাখার নিয়ম

> Browser global script-এ: `this === window`  
> কিন্তু সব জায়গায় `this === window` নয়।

---

## Variable এবং Function memory allocation

### Example

```js
var name = "Tom";

function sayName() {
  console.log(this.name);
}
```

### Creation Phase-এ কী হয়?

```txt
window/global object তৈরি
this setup
name -> undefined
sayName -> function body
```

### Execution Phase-এ কী হয়?

```txt
name = "Tom"
```

Function call নেই, তাই `sayName()` run হবে না।

### Function call না করলে কী হয়?

```js
var name = "Tom";

function sayName() {
  console.log(this.name);
}

// sayName() call করা হয়নি
```

Output:

```txt
কোন output নেই
```

কারণ function declaration memory-তে আছে, কিন্তু execute হয়নি।

### Function call করলে কী হয়?

```js
var name = "Tom";

function sayName() {
  console.log(this.name);
}

sayName();
```

এখন `sayName()` call হয়েছে, তাই নতুন Function Execution Context তৈরি হবে।

### Important Note about `var`, `let`, `const`

এই lesson-এ variable-এর জন্য `undefined` initialization নিয়ে আলোচনা করা হয়েছে, যা সাধারণত `var` declaration-এর ক্ষেত্রে beginner-friendlyভাবে বোঝানো হয়।

কিন্তু JavaScript-এ:

| Declaration | Creation Phase behavior |
|---|---|
| `var` | memory allocate হয় এবং `undefined` দিয়ে initialize হয় |
| `let` | memory allocate হয় কিন্তু Temporal Dead Zone-এ থাকে |
| `const` | memory allocate হয় কিন্তু assignment না হওয়া পর্যন্ত access করা যায় না |
| function declaration | পুরো function body memory-তে থাকে |

Example:

```js
console.log(a); // undefined
var a = 10;
```

```js
console.log(b); // ReferenceError
let b = 20;
```

### Common Mistake

সব variable hoisting একইভাবে কাজ করে — এটা ভুল।

### মনে রাখার নিয়ম

> `var` আগে access করলে `undefined`।  
> `let`/`const` আগে access করলে ReferenceError।  
> Function declaration আগে call করা যায়।

---

## Function Execution Context বা FEC

### সহজ ব্যাখ্যা

কোনো function call/invoke হলে সেই function-এর জন্য নতুন **Function Execution Context** তৈরি হয়।

Function শুধু define করলে FEC তৈরি হয় না।  
Function call করলে FEC তৈরি হয়।

### Example

```js
var name = "Tom";

function tom() {
  console.log("Tom function runs");
}

tom();
```

Execution flow:

1. GEC তৈরি হয়
2. Creation Phase:
   - `name -> undefined`
   - `tom -> function body`
3. Execution Phase:
   - `name = "Tom"`
   - `tom()` call পাওয়া যায়
4. `tom` function-এর জন্য FEC তৈরি হয়
5. FEC-এর Creation Phase
6. FEC-এর Execution Phase
7. function শেষ হলে FEC stack থেকে remove হয়

### FEC-এর Creation Phase

Function-এর ভিতরে:

- local variable থাকলে memory allocate হয়
- parameter থাকলে memory allocate হয়
- inner function থাকলে function body memory-তে রাখা হয়
- `this` binding setup হয়
- `arguments` object পাওয়া যেতে পারে normal function-এ

### FEC-এর Execution Phase

Function body line-by-line execute হয়।

### Example with local variable

```js
function test() {
  var b = 10;
  console.log(b);
}

test();
```

FEC Creation Phase:

```txt
b -> undefined
```

FEC Execution Phase:

```txt
b = 10
console.log(b) // 10
```

### Common Mistake

Function declare হলেই FEC তৈরি হয় — ভুল।

```js
function test() {
  console.log("Hello");
}
```

এখানে FEC তৈরি হয়নি।  
FEC তৈরি হবে:

```js
test();
```

### মনে রাখার নিয়ম

> Function call = নতুন Function Execution Context।

---

## Nested function execution flow

Function-এর ভিতরে আবার function call হতে পারে।  
তখন প্রতিটি function call-এর জন্য আলাদা Function Execution Context তৈরি হয়।

### Example

```js
function outer() {
  console.log("Outer started");

  function inner() {
    console.log("Inner running");
  }

  inner();

  console.log("Outer ended");
}

outer();
```

### Execution Flow

1. GEC তৈরি হয়
2. `outer` function memory-তে যায়
3. Execution Phase-এ `outer()` call হয়
4. `outer`-এর FEC তৈরি হয়
5. `outer` execute করতে গিয়ে `inner()` call পায়
6. `inner`-এর FEC তৈরি হয়
7. `inner` শেষ হয়
8. `outer` resume করে
9. `outer` শেষ হয়
10. GEC শেষ হয়

### Output

```txt
Outer started
Inner running
Outer ended
```

### কেন `Outer ended` আগে print হয় না?

কারণ JavaScript synchronous code-এ current function call শেষ না করে next line-এ যায় না।  
যখন `inner()` call হয়, তখন `outer` temporarily pause হয়।  
`inner` শেষ হলে `outer` আবার resume করে।

### Common Mistake

অনেকে ভাবে function-এর নিচের line আগে execute হতে পারে।  
Synchronous JavaScript-এ function call complete না হওয়া পর্যন্ত caller function pause থাকে।

### মনে রাখার নিয়ম

> Function-এর ভিতরে function call হলে JavaScript আগে inner function শেষ করে, তারপর outer function continue করে।

---

## Call Stack

### সহজ ব্যাখ্যা

**Call Stack** হলো JavaScript engine-এর এমন একটি stack data structure যেখানে execution context গুলো রাখা হয়।

Stack-এর rule হলো **LIFO**:

> Last In, First Out

অর্থাৎ যেটা শেষে stack-এ ঢুকেছে, সেটাই আগে বের হবে।

### Real-life analogy

বই বা plate stack কল্পনা করো:

```txt
Top plate আগে উঠবে
Bottom plate পরে উঠবে
```

Call Stack-ও একইভাবে কাজ করে।

### Example

```js
function first() {
  second();
}

function second() {
  third();
}

function third() {
  console.log("third");
}

first();
```

### Call Stack Flow

```txt
1. [GEC]

2. [GEC, first]

3. [GEC, first, second]

4. [GEC, first, second, third]

5. third শেষ:
   [GEC, first, second]

6. second শেষ:
   [GEC, first]

7. first শেষ:
   [GEC]

8. global code শেষ:
   []
```

### Call Stack Diagram

```txt
Step 1:
| GEC |

Step 2:
| first |
| GEC   |

Step 3:
| second |
| first  |
| GEC    |

Step 4:
| third  |
| second |
| first  |
| GEC    |

Step 5:
| second |
| first  |
| GEC    |

Step 6:
| first |
| GEC   |

Step 7:
| GEC |

Step 8:
empty
```

### Common Mistake

অনেকে মনে করে Stack শুধু function name রাখে।  
Actually Stack-এ execution context থাকে। Function name দিয়ে আমরা সহজভাবে represent করি।

### মনে রাখার নিয়ম

> Function call হলে context stack-এ push হয়।  
> Function শেষ হলে context stack থেকে pop হয়।

---

## Stack এবং Heap Memory

JavaScript memory সাধারণভাবে দুইভাবে বোঝানো যায়:

1. **Stack**
2. **Heap**

### Stack Memory

Stack memory সাধারণত ব্যবহৃত হয়:

- Execution context tracking
- Primitive value storing
- Reference storing
- Function call management

Stack structured, fast, এবং LIFO nature follow করে।

### Heap Memory

Heap memory ব্যবহার হয় non-primitive value store করতে।

যেমন:

- Object
- Array
- Function
- Date
- Map
- Set

Heap memory একটু flexible/discrete memory area হিসেবে ভাবা যায়।

### Table: Stack vs Heap

| বিষয় | Stack | Heap |
|---|---|---|
| Structure | Ordered stack | Unstructured/discrete memory |
| Rule | LIFO | Direct reference দিয়ে access |
| Stores | primitive value, references, execution context | object, array, function body |
| Speed | faster | comparatively flexible |
| Access | top-down stack flow | reference/address দিয়ে |
| Example | `var a = 5` | `{ name: "Tapas" }` |

### Example

```js
var a = 5;

var user = {
  name: "Tapas",
  country: "India"
};
```

Memory idea:

```txt
Stack:
a    -> 5
user -> ZB01

Heap:
ZB01 -> { name: "Tapas", country: "India" }
```

### Common Mistake

অনেকে ভাবে object variable-এর ভিতরেই object value থাকে।  
আসলে variable সাধারণত object-এর reference রাখে।

### মনে রাখার নিয়ম

> Primitive value stack-এ।  
> Object/Array/Function heap-এ।  
> Stack-এ থাকে reference/address।

---

## Primitive vs Non-Primitive memory behavior

### Primitive values

Primitive values সরাসরি value হিসেবে store হয়।

Common primitive types:

- string
- number
- boolean
- undefined
- null
- bigint
- symbol

Example:

```js
var a = 5;
var b = a;

b = 10;

console.log(a); // 5
console.log(b); // 10
```

Memory idea:

```txt
a -> 5
b -> 10
```

`b` change করলে `a` change হয় না।

### Non-Primitive values

Non-primitive values reference হিসেবে কাজ করে।

Common non-primitive values:

- object
- array
- function

Example:

```js
var user1 = {
  name: "Tapas"
};

var user2 = user1;

user2.name = "Tom";

console.log(user1.name); // Tom
console.log(user2.name); // Tom
```

Memory idea:

```txt
Stack:
user1 -> XA01
user2 -> XA01

Heap:
XA01 -> { name: "Tom" }
```

দুই variable একই object reference করছে। তাই এক জায়গায় change করলে দুটোর মাধ্যমে দেখা যায়।

### Table: Primitive vs Non-Primitive

| বিষয় | Primitive | Non-Primitive |
|---|---|---|
| Store | direct value | reference/address |
| Copy | value copy | reference copy |
| Example | `5`, `"Tom"`, `true` | `{}`, `[]`, `function(){}` |
| Equality | value compare | reference compare |
| Mutation | original usually unaffected | same reference হলে affected |

### Common Mistake

```js
var a = { count: 1 };
var b = { count: 1 };

console.log(a === b); // false
```

দুটো object দেখতে same হলেও memory reference আলাদা।

### মনে রাখার নিয়ম

> Primitive compare হয় value দিয়ে।  
> Object compare হয় reference দিয়ে।

---

## Garbage Collection

### সহজ ব্যাখ্যা

JavaScript memory automatically manage করে।  
যে memory আর কোনো variable/reference থেকে reachable না, সেটি পরে Garbage Collector clean করতে পারে।

### Example

```js
function test() {
  var user = {
    name: "Tapas"
  };
}

test();
```

`test()` চলাকালীন:

```txt
user -> heap object
```

`test()` শেষ হলে:

```txt
user variable stack থেকে remove
heap object আর reachable না
```

তখন Garbage Collector পরে সেই object memory free করতে পারে।

### Lesson-এর idea

Function execution শেষ হলে সেই function-এর execution context call stack থেকে বের হয়ে যায়।  
যদি সেই function-এর local variable কোনো heap object point করত, এবং function শেষ হওয়ার পর সেই object আর কোথাও referenced না থাকে, তাহলে object garbage collection-এর candidate হয়।

### Important Note

Garbage Collection কখন exactly run করবে তা programmer control করে না।  
JavaScript engine নিজে decide করে।

### Common Mistake

অনেকে ভাবে function শেষ হলেই সাথে সাথে heap memory delete হয়।  
Actually এটি garbage collector-এর উপর depend করে। Conceptually memory unreachable হলে clean করার জন্য eligible হয়।

### মনে রাখার নিয়ম

> Reference নেই = object আর reachable নয় = garbage collection candidate।

---

## Full flow example: GEC + FEC + Stack + Heap

এখন একটি complete example দেখি, যেটি lesson-এর complex example-এর মতো।

### Code

```js
console.log("Global start");

var a = 5;

function testMe() {
  console.log("Inside testMe");

  var b = 10;

  var user = {
    name: "Tapas",
    country: "India"
  };

  function testAgain() {
    console.log("Inside testAgain");
    console.log(b);
    console.log(user.name);
  }

  testAgain();

  console.log("testMe end");
}

testMe();

console.log("Global end");
```

---

### Step 1: Global Execution Context তৈরি

Call Stack:

```txt
| GEC |
```

GEC Creation Phase:

```txt
a      -> undefined
testMe -> function body reference
```

Memory idea:

```txt
Stack:
a      -> undefined
testMe -> XA01

Heap:
XA01 -> function testMe body
```

---

### Step 2: GEC Execution Phase শুরু

JavaScript line-by-line execute করে।

```js
console.log("Global start");
```

Output:

```txt
Global start
```

তারপর:

```js
var a = 5;
```

Memory update:

```txt
a -> 5
```

`function testMe(){...}` line-এ execution phase-এ নতুন কিছু হয় না, কারণ function body creation phase-এ memory-তে রাখা হয়েছে।

তারপর:

```js
testMe();
```

Function call পাওয়া গেল। তাই `testMe`-এর জন্য নতুন FEC তৈরি হবে।

---

### Step 3: testMe FEC তৈরি

Call Stack:

```txt
| testMe |
| GEC    |
```

testMe Creation Phase:

```txt
b         -> undefined
user      -> undefined
testAgain -> function body reference
```

Memory idea:

```txt
Stack:
a         -> 5
testMe    -> XA01
b         -> undefined
user      -> undefined
testAgain -> YB01

Heap:
XA01 -> function testMe body
YB01 -> function testAgain body
```

---

### Step 4: testMe Execution Phase

```js
console.log("Inside testMe");
```

Output:

```txt
Inside testMe
```

```js
var b = 10;
```

Memory update:

```txt
b -> 10
```

```js
var user = {
  name: "Tapas",
  country: "India"
};
```

Object heap-এ যাবে।

Memory update:

```txt
Stack:
user -> ZB01

Heap:
ZB01 -> { name: "Tapas", country: "India" }
```

তারপর:

```js
testAgain();
```

আরেকটি function call পাওয়া গেল। তাই `testAgain`-এর FEC তৈরি হবে।

---

### Step 5: testAgain FEC তৈরি

Call Stack:

```txt
| testAgain |
| testMe    |
| GEC       |
```

testAgain Creation Phase:

```txt
local variable নেই
inner function নেই
```

testAgain Execution Phase:

```js
console.log("Inside testAgain");
console.log(b);
console.log(user.name);
```

Output:

```txt
Inside testAgain
10
Tapas
```

এখানে `b` এবং `user` কোথা থেকে পেল?

কারণ `testAgain` lexically `testMe`-এর ভিতরে আছে। তাই scope chain ব্যবহার করে outer function-এর variable access করতে পারে।

এই lesson-এ scope chain বিস্তারিত হয়নি, কিন্তু Execution Context বোঝা scope chain বোঝার foundation।

---

### Step 6: testAgain শেষ

`testAgain` function শেষ হলে তার FEC call stack থেকে pop হবে।

Call Stack:

```txt
| testMe |
| GEC    |
```

এখন JavaScript `testMe` function-এর যেখানে pause হয়েছিল, সেখান থেকে resume করবে।

---

### Step 7: testMe resume

```js
console.log("testMe end");
```

Output:

```txt
testMe end
```

`testMe` function শেষ। তাই `testMe` FEC stack থেকে pop হবে।

Call Stack:

```txt
| GEC |
```

`testMe`-এর local variables `b`, `user`, `testAgain` আর stack-এ থাকবে না।  
যদি `user` object আর কোথাও referenced না থাকে, তাহলে heap-এর object garbage collection-এর candidate হবে।

---

### Step 8: GEC resume

`testMe()` call যেখানে হয়েছিল, সেটি শেষ। এখন global code-এর next line execute হবে।

```js
console.log("Global end");
```

Output:

```txt
Global end
```

শেষে global execution শেষ হলে GEC-ও stack থেকে remove হবে।

Call Stack:

```txt
empty
```

---

### Final Output

```txt
Global start
Inside testMe
Inside testAgain
10
Tapas
testMe end
Global end
```

---

## Important Differences

### Lexical Environment vs Execution Context

| বিষয় | Lexical Environment | Execution Context |
|---|---|---|
| মূল প্রশ্ন | Code কোথায় লেখা? | Code কীভাবে run হচ্ছে? |
| Based on | physical placement | runtime execution |
| Example | variable function-এর ভিতরে আছে | function call হলে FEC তৈরি |
| Helps understand | scope, scope chain | hoisting, this, call stack |
| Static/Dynamic | mostly static structure | runtime process |

---

### Global Execution Context vs Function Execution Context

| বিষয় | GEC | FEC |
|---|---|---|
| কখন তৈরি হয় | JS file run হলেই | function call হলে |
| কয়বার তৈরি হয় | সাধারণত একবার | function call যতবার, ততবার |
| Global object | থাকে | থাকে না একইভাবে |
| `this` | browser script-এ `window` | call pattern-এর উপর depend |
| variables | global variables | local variables |
| stack position | সবার নিচে | GEC-এর উপরে push হয় |

---

### Creation Phase vs Execution Phase

| বিষয় | Creation Phase | Execution Phase |
|---|---|---|
| variable | allocate + initialize | value assign |
| function | body memory-তে রাখা | call হলে execute |
| output produce | সাধারণত না | হ্যাঁ |
| hoisting explain করে | হ্যাঁ | আংশিক |
| line-by-line run | না | হ্যাঁ |

---

### Stack vs Heap

| বিষয় | Stack | Heap |
|---|---|---|
| nature | ordered | flexible/discrete |
| rule | LIFO | reference-based |
| contains | primitive, references, execution context | object, array, function |
| cleanup | function শেষ হলে context pop | unreachable হলে garbage collection |
| example | `a -> 5` | `XA01 -> {name:"Tapas"}` |

---

## Common Mistakes

### Mistake 1: Function define করলেই execute হয়

Wrong idea:

```js
function hello() {
  console.log("Hello");
}
```

এখানে output হবে না।

Correct:

```js
hello();
```

---

### Mistake 2: `undefined` এবং `not defined` একই ভাবা

```js
console.log(a); // undefined
var a = 10;
```

`a` declared, কিন্তু তখনও value assign হয়নি।

```js
console.log(x); // ReferenceError: x is not defined
```

`x` declared-ই হয়নি।

| Term | Meaning |
|---|---|
| `undefined` | variable আছে, value নেই |
| `not defined` | variable declared নেই |

---

### Mistake 3: সব variable sameভাবে hoist হয়

```js
console.log(a); // undefined
var a = 10;
```

```js
console.log(b); // ReferenceError
let b = 20;
```

`var`, `let`, `const`-এর creation behavior এক নয়।

---

### Mistake 4: Object copy মানে value copy ভাবা

```js
var user1 = { name: "Tom" };
var user2 = user1;

user2.name = "Jerry";

console.log(user1.name); // Jerry
```

কারণ `user1` এবং `user2` একই heap object reference করছে।

---

### Mistake 5: Call Stack async queue-এর মতো ভাবা

Call Stack synchronous execution manage করে।  
Async JavaScript বুঝতে পরে Event Loop, Web APIs, Callback Queue, Microtask Queue লাগবে।

---

### Mistake 6: `this` সবসময় `window`

Browser global script-এ `this === window` হতে পারে।  
কিন্তু object method, class, constructor, strict mode, module, arrow function — সব জায়গায় `this` আলাদা rule follow করে।

---

## Assignment

ভিডিওর শেষে একটি practical task দেওয়া হয়েছে। এই assignment-এর লক্ষ্য হলো Execution Context, CP/EP, Call Stack, Stack/Heap flow visualভাবে practice করা।

### Task 1: GEC/FEC with CP and EP flow তৈরি করা

তোমাকে দেওয়া code দেখে লিখতে হবে:

- Global Execution Context কোথায় তৈরি হচ্ছে
- GEC Creation Phase-এ কী memory allocate হচ্ছে
- GEC Execution Phase-এ কী value assign হচ্ছে
- কোন function call হলে কোন FEC তৈরি হচ্ছে
- প্রতিটি FEC-এর Creation Phase-এ কী হচ্ছে
- প্রতিটি FEC-এর Execution Phase-এ কী হচ্ছে

Suggested format:

```txt
GEC
├── Creation Phase
│   ├── variable a -> undefined
│   └── function testMe -> function body
│
└── Execution Phase
    ├── a = 5
    └── testMe() call -> FEC created
```

---

### Task 2: Stack এবং Heap flow draw করা

প্রতিটি important stage-এর জন্য দেখাতে হবে:

- Stack-এ কী আছে
- Heap-এ কোন object/function body আছে
- Stack reference কোন heap memory address point করছে
- Primitive value stack-এ আছে কি না
- Non-primitive value heap-এ আছে কি না

Example format:

```txt
Stack:
a      -> 5
user   -> ZB01

Heap:
ZB01 -> { name: "Tapas", country: "India" }
```

---

### Task 3: Call Stack diagram তৈরি করা

Function call অনুযায়ী stack-এর push/pop flow দেখাতে হবে।

Example:

```txt
1. empty

2. GEC

3. GEC
   testMe

4. GEC
   testMe
   testAgain

5. GEC
   testMe

6. GEC

7. empty
```

আরও clearভাবে:

```txt
Step 1:
| GEC |

Step 2:
| testMe |
| GEC    |

Step 3:
| testAgain |
| testMe    |
| GEC       |

Step 4:
| testMe |
| GEC    |

Step 5:
| GEC |

Step 6:
empty
```

---

### Task 4: Screenshot এবং README তৈরি

Assignment complete করার জন্য:

1. Code left side-এ রাখো
2. Flow/diagram right side-এ রাখো
3. প্রতিটি stage-এর screenshot নাও
4. একটি `README.md` file তৈরি করো
5. README-তে screenshot add করো
6. প্রতিটি screenshot-এর নিচে explanation লেখো
7. Public link share করো

---

### Assignment করার সময় guide questions

নিজেকে প্রশ্ন করো:

- Global scope-এ কোন variables আছে?
- Global scope-এ কোন functions আছে?
- কোন variable primitive?
- কোন variable non-primitive?
- কোন function call প্রথম হচ্ছে?
- function call হলে stack-এ কী push হচ্ছে?
- function শেষ হলে stack থেকে কী pop হচ্ছে?
- object/function body heap-এ কোথায় থাকবে?
- কোন references execution শেষে unreachable হয়ে যাচ্ছে?

---

## Final Summary

এই lesson থেকে সবচেয়ে গুরুত্বপূর্ণ ধারণাগুলো:

1. **Lexical Environment** হলো code কোথায় physically লেখা আছে।
2. **Execution Context** হলো code run করার environment।
3. JavaScript file run হলেই **Global Execution Context** তৈরি হয়।
4. Browser global script-এ `window` object এবং `this` পাওয়া যায়, এবং অনেক ক্ষেত্রে `this === window`।
5. প্রতিটি Execution Context-এর দুইটি phase থাকে:
   - Creation Phase
   - Execution Phase
6. Creation Phase-এ memory allocate হয়।
7. Execution Phase-এ actual code line-by-line run হয়।
8. `var` variable Creation Phase-এ `undefined` দিয়ে initialize হয়।
9. Function declaration-এর full body memory-তে রাখা হয়।
10. Function call না করলে Function Execution Context তৈরি হয় না।
11. Function call করলে নতুন **Function Execution Context** তৈরি হয়।
12. Nested function call হলে nested FEC তৈরি হয়।
13. Call Stack execution contexts manage করে।
14. Call Stack LIFO rule follow করে।
15. Primitive values সাধারণত stack-এ direct value হিসেবে থাকে।
16. Non-primitive values heap-এ থাকে এবং stack-এ reference থাকে।
17. Function body-ও non-primitive, তাই heap memory-তে store হয়।
18. Function execution শেষ হলে context stack থেকে pop হয়।
19. Unreachable heap objects garbage collection-এর candidate হয়।
20. এই foundation Hoisting, Scope, Closure, `this`, Event Loop, async JavaScript বোঝার জন্য অত্যন্ত দরকারি।

---

## Practice Checklist

নিচের checklist complete করতে পারলে lesson ভালোভাবে বোঝা হয়েছে।

### Concept Understanding

- [ ] Lexical Environment কী তা explain করতে পারি
- [ ] Execution Context কী তা explain করতে পারি
- [ ] GEC কখন তৈরি হয় তা বলতে পারি
- [ ] FEC কখন তৈরি হয় তা বলতে পারি
- [ ] Creation Phase কী করে তা বলতে পারি
- [ ] Execution Phase কী করে তা বলতে পারি
- [ ] `window === this` browser global context-এ কেন true হয় বুঝি
- [ ] Function declaration এবং function invocation-এর পার্থক্য বুঝি
- [ ] Call Stack LIFO rule বুঝি
- [ ] Stack এবং Heap memory-এর difference বুঝি
- [ ] Primitive এবং non-primitive value memory behavior বুঝি
- [ ] Garbage Collection-এর basic idea বুঝি

### Code Tracing Practice

- [ ] একটি code দেখে global variables identify করতে পারি
- [ ] একটি code দেখে global functions identify করতে পারি
- [ ] Creation Phase-এ কী কী memory allocate হবে লিখতে পারি
- [ ] Execution Phase-এ কোন line কী করবে লিখতে পারি
- [ ] Function call হলে FEC draw করতে পারি
- [ ] Nested function হলে stack push/pop দেখাতে পারি
- [ ] Object/array/function heap reference draw করতে পারি
- [ ] Function শেষ হলে কোন memory unreachable হবে বুঝতে পারি

### Assignment Practice

- [ ] GEC/FEC + CP/EP flow লিখেছি
- [ ] Stack/Heap diagram তৈরি করেছি
- [ ] Call Stack push/pop diagram তৈরি করেছি
- [ ] প্রতিটি stage screenshot নিয়েছি
- [ ] README.md file-এ screenshot এবং explanation যোগ করেছি
- [ ] নিজের ভাষায় পুরো flow explain করতে পারি

---

## Quick Revision Formula

```txt
JS file starts
  ↓
GEC created
  ↓
Creation Phase
  - variables -> undefined
  - functions -> function body
  - this/global object setup
  ↓
Execution Phase
  - values assigned
  - function call found
  ↓
FEC created
  ↓
FEC Creation Phase
  ↓
FEC Execution Phase
  ↓
Function ends
  ↓
FEC popped from Call Stack
  ↓
Caller resumes
  ↓
All code ends
  ↓
GEC popped
```

---

## One-line Memory Rules

```txt
var variable     -> creation phase-এ undefined
function         -> creation phase-এ full body
function call    -> new FEC
call stack       -> LIFO
primitive        -> stack value
object/array     -> heap value + stack reference
function body    -> heap value + stack reference
unreachable heap -> garbage collection candidate
```

---

## Mini Self-Test

### Question 1

```js
console.log(a);
var a = 10;
```

Output কী?

```txt
undefined
```

কারণ `a` creation phase-এ memory পায় এবং `undefined` দিয়ে initialize হয়।

---

### Question 2

```js
function hello() {
  console.log("Hello");
}
```

Output কী?

```txt
কোন output নেই
```

কারণ function call করা হয়নি।

---

### Question 3

```js
function hello() {
  console.log("Hello");
}

hello();
```

Output কী?

```txt
Hello
```

কারণ `hello()` call করা হয়েছে, তাই FEC তৈরি হয়েছে।

---

### Question 4

```js
var user1 = { name: "A" };
var user2 = user1;

user2.name = "B";

console.log(user1.name);
```

Output কী?

```txt
B
```

কারণ দুই variable একই object reference করছে।

---

### Question 5

```js
function a() {
  b();
}

function b() {
  c();
}

function c() {
  console.log("Done");
}

a();
```

Call Stack highest point-এ কী থাকবে?

```txt
| c |
| b |
| a |
| GEC |
```

কারণ `a()` call করে `b()`, `b()` call করে `c()`।

---

## শেষ কথা

Execution Context এবং Call Stack প্রথমে theoretical মনে হতে পারে, কিন্তু এগুলো JavaScript-এর ভিতরের working model বোঝার জন্য সবচেয়ে গুরুত্বপূর্ণ foundation।  
এই notes বারবার revise করলে Hoisting, Scope, Closure, `this`, এবং async JavaScript অনেক সহজ মনে হবে।
