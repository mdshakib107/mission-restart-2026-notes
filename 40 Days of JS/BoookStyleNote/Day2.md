# 40 Days of JavaScript — Day 02 Detailed Notes

> Source: Uploaded transcript of **The 40 Days of JavaScript — Day 02**.

---

## Table of Contents

1. Day 02-তে কী শেখানো হয়েছে
2. Variables কী
3. Variable as a Box — visualization
4. Variable declare করার syntax
5. Value assignment কী
6. Reassignment কীভাবে কাজ করে
7. Pass by Value-এর basic idea
8. Variable naming rules
9. Good variable naming convention
10. `var`, `let`, `const` — পার্থক্য
11. Declaration, reassignment, redeclaration
12. JavaScript comments
13. Primitive data types
14. `undefined` বনাম `null`
15. Non-primitive বা reference data types
16. Object ও Array-এর basic idea
17. Memory-তে variable কীভাবে store হয়
18. Stack ও Heap memory
19. JavaScript engine code কীভাবে দেখে
20. Tokenizing, Parsing, Interpreting
21. Abstract Syntax Tree বা AST
22. Day 02 Assignment
23. Final Summary

---

# 1. Day 02-তে কী শেখানো হয়েছে

Day 01-এ শেখানো হয়েছিল JavaScript কীভাবে HTML-এর সঙ্গে যুক্ত করতে হয়, browser console কীভাবে ব্যবহার করতে হয়, `script` tag কোথায় বসানো ভালো, `async` ও `defer` কীভাবে কাজ করে, এবং Node.js দিয়ে JavaScript কীভাবে run করা যায়।

Day 02-তে মূল focus হলো JavaScript-এর সবচেয়ে fundamental concept:

```text
variables
types
value assignment
pass by value
primitive data
non-primitive data
memory storage
JavaScript engine কীভাবে code process করে
```

এই lesson-এর শেষে variables নিয়ে assignment দেওয়া হয়েছে, যাতে তুমি `let`, `const`, object, array, primitive value ইত্যাদি practice করতে পারো।

---

# 2. Variables কী?

Programming-এ কোনো information মনে রাখার জন্য variable ব্যবহার করা হয়।

ধরো, তুমি কোনো বন্ধুর বাসায় যাবে। বন্ধু phone-এ address বলল। তুমি address-টা কাগজে, mobile note-এ বা কোনো notepad-এ লিখে রাখলে। কারণ তুমি address-টা temporarily store করতে চাও, যাতে পরে ব্যবহার করতে পারো।

Programming-এও একই idea:

```text
user name
age
marks
address
salary
email
student status
favorite language
```

এসব information store করার জন্য variable ব্যবহার করা হয়।

## Simple definition

```text
Variables are used to store data in JavaScript.
```

বাংলায়:

```text
JavaScript-এ data store করার জন্য variable ব্যবহার করা হয়।
```

---

# 3. Variable as a Box — Visualization

Variable-কে একটি box বা storage হিসেবে ভাবা যায়।

ধরো, একটি box আছে। box-এর নাম:

```text
fruit
```

এই box-এর ভেতরে রাখা হলো:

```text
mango
```

এখানে:

| অংশ     | অর্থ                            |
| ------- | ------------------------------- |
| `fruit` | variable name / storage name    |
| `mango` | value                           |
| box     | memory/storage-এর visualization |

অর্থাৎ:

```js
let fruit = "mango";
```

এর মানে:

```text
fruit নামে একটি storage তৈরি করো এবং তার ভেতরে mango value রাখো।
```

---

# 4. Variable declare করার syntax

Modern JavaScript-এ variable declare করার জন্য সাধারণ syntax:

```js
let storageName = value;
```

বা

```js
const storageName = value;
```

পুরো structure:

```text
specifier variableName = value;
```

যেখানে:

| অংশ                   | কাজ                 |
| --------------------- | ------------------- |
| `let`, `const`, `var` | specifier / keyword |
| `variableName`        | storage-এর নাম      |
| `=`                   | assignment operator |
| `value`               | storage-এ রাখা data |

Example:

```js
let fruit = "mango";
```

এখানে:

```text
let     → specifier
fruit   → variable name
=       → assignment operator
"mango" → value
```

---

# 5. `let`, `const`, `var` কেন specifier বলা হয়?

`let`, `const`, এবং `var` variable-এর behavior control করে।

এগুলো control করে:

```text
variable কোথা থেকে access করা যাবে
variable আবার declare করা যাবে কিনা
variable-এর value পরিবর্তন করা যাবে কিনা
```

Day 02-তে scope detail-এ cover করা হয়নি। Scope পরে শেখানো হবে। এই lesson-এ শুধু basic behavior শেখানো হয়েছে:

| Keyword | Basic behavior                                |
| ------- | --------------------------------------------- |
| `var`   | redeclare করা যায়                             |
| `let`   | reassign করা যায়, কিন্তু redeclare করা যায় না |
| `const` | reassign করা যায় না                           |

---

# 6. Value Assignment কী?

Assignment মানে হলো কোনো variable-এর মধ্যে value রাখা।

JavaScript-এ assignment করার জন্য single equal sign `=` ব্যবহার করা হয়।

```js
let fruit = "mango";
```

এখানে:

```text
left side  → variable name
right side → value
=          → assignment operator
```

অর্থাৎ:

```text
"mango" value-টি fruit variable-এর মধ্যে assign করা হলো।
```

Important:

```text
JavaScript-এ একটি equal sign (=) assignment বোঝায়।
```

এটি mathematical equality নয়। Programming-এ এটি value রাখার কাজ করে।

---

# 7. Reassignment কীভাবে কাজ করে?

ধরো, প্রথমে variable-এ `mango` রাখা হলো:

```js
let fruit = "mango";
```

এখন একই variable-এ নতুন value assign করা হলো:

```js
fruit = "kiwi";
```

তাহলে কী হবে?

পুরনো value:

```text
mango
```

replace হয়ে নতুন value হবে:

```text
kiwi
```

Visualization:

```text
fruit box:
আগে ছিল → mango
পরে হলো → kiwi
```

Full example:

```js
let fruit = "mango";
console.log(fruit); // mango

fruit = "kiwi";
console.log(fruit); // kiwi
```

এখানে variable একই আছে, শুধু value পরিবর্তন হয়েছে।

---

# 8. দুই variable-এর assignment

ধরো:

```js
let fruit = "mango";
let vegetable = "carrot";
```

এখন:

```js
fruit = vegetable;
```

এখানে right side-এ `vegetable` আছে। `vegetable` variable-এর value হলো:

```text
carrot
```

তাই `fruit` variable-এর value হবে:

```text
carrot
```

Full example:

```js
let fruit = "mango";
let vegetable = "carrot";

fruit = vegetable;

console.log(fruit); // carrot
console.log(vegetable); // carrot
```

Important:

```text
right side variable-এর value left side variable-এ copy হয়।
right side variable নিজে change হয় না।
```

---

# 9. Pass by Value-এর basic idea

Primitive value assignment-এর ক্ষেত্রে JavaScript pass by value ব্যবহার করে।

Example:

```js
let fruit = "mango";
let vegetable = "carrot";

fruit = vegetable;
```

এখানে `"carrot"` একটি string। String হলো primitive data type।

তাই:

```text
vegetable variable-এর value copy হয়ে fruit variable-এ যায়।
vegetable নিজে অপরিবর্তিত থাকে।
```

এটাই pass by value-এর basic idea।

## সহজ ভাষায়

```text
Pass by value মানে value copy হয়।
```

যদি right side variable primitive value ধরে রাখে, তাহলে তার actual value copy হয়ে left side variable-এ যায়।

---

# 10. Variable Naming Rules

Programming language-এর grammar আছে। JavaScript variable name লেখার সময় কিছু rules follow করতে হয়। Rule না মানলে JavaScript error দেবে।

## Rule 1: Variable name-এ letter বা digit থাকতে পারে

Valid:

```js
let name = "Tapas";
let age2 = 30;
```

## Rule 2: Special character হিসেবে শুধু `$` এবং `_` allowed

Valid:

```js
let $ = "dollar";
let _ = "underscore";
let user_name = "Alex";
let $price = 500;
```

Invalid:

```js
let user-name = "Alex";
```

কারণ hyphen `-` variable name-এ allowed না।

---

## Rule 3: Variable name digit দিয়ে শুরু হতে পারবে না

Invalid:

```js
let 2morrow = "Friday";
```

Valid:

```js
let tomorrow2 = "Friday";
```

---

## Rule 4: Reserved keyword variable name হিসেবে ব্যবহার করা যাবে না

JavaScript-এর কিছু word language-এর নিজের জন্য reserved থাকে।

Example:

```text
for
if
else
while
function
return
let
const
var
```

Invalid:

```js
let for = 10;
let if = true;
```

---

# 11. Case Sensitivity

JavaScript variable names case-sensitive।

Example:

```js
let myName = "Tapas";
let MyName = "Alex";
```

এগুলো দুইটি আলাদা variable।

কারণ:

```text
myName ≠ MyName
```

অর্থাৎ ছোট হাতের `m` এবং বড় হাতের `M` JavaScript-এর কাছে আলাদা।

---

# 12. Good Variable Naming Convention

শুধু valid variable name দিলেই হবে না। Code readable রাখার জন্য ভালো naming convention follow করতে হবে।

## 12.1 Camel case ব্যবহার করা

JavaScript-এ variable name লেখার common convention হলো camelCase।

Example:

```js
let myName = "Tapas";
let homeAddress = "Dhaka";
let officeAddress = "Bangalore";
let favoriteProgrammingLanguage = "JavaScript";
```

camelCase rule:

```text
প্রথম word ছোট হাতের।
পরের প্রতিটি word-এর প্রথম letter capital।
```

Example:

```text
favorite programming language
→ favoriteProgrammingLanguage
```

---

## 12.2 Human-readable name ব্যবহার করা

Bad:

```js
let x = "Dhaka";
let abc = 50000;
let hBla = "Something";
```

Better:

```js
let address = "Dhaka";
let salary = 50000;
let homeAddress = "Dhaka";
```

Variable name দেখে যেন বোঝা যায় variable-টি কী data hold করছে।

---

## 12.3 Use case অনুযায়ী name দিতে হবে

যদি salary store করো:

```js
let salary = 50000;
```

এটি ভালো।

কিন্তু:

```js
let amount = 50000;
let count = 50000;
```

এগুলো technically কাজ করলেও meaning পরিষ্কার না। যদি use case salary হয়, তাহলে variable name `salary` হওয়াই ভালো।

---

# 13. `var`, `let`, `const` — Basic Difference

Day 02-তে scope শেখানো হয়নি। শুধু basic behavior শেখানো হয়েছে।

## 13.1 `var`

`var` দিয়ে variable redeclare করা যায়।

Example:

```js
var address = "Bangalore";
console.log(address); // Bangalore

var address = "USA";
console.log(address); // USA
```

এটি JavaScript-এ allowed।

কিন্তু modern JavaScript-এ `var` ব্যবহার না করাই ভালো, কারণ এটি confusion তৈরি করে। একই variable বারবার declare করলে code বুঝতে সমস্যা হয়।

---

## 13.2 `let`

`let` দিয়ে variable একবার declare করা যায়, পরে value reassign করা যায়।

Valid:

```js
let address = "Bangalore";
console.log(address); // Bangalore

address = "USA";
console.log(address); // USA
```

Invalid:

```js
let address = "Bangalore";
let address = "USA";
```

Error:

```text
Identifier 'address' has already been declared
```

অর্থাৎ `let` redeclaration allow করে না।

---

## 13.3 `const`

`const` দিয়ে constant variable declare করা হয়। একবার value assign করলে পরে reassign করা যায় না।

Valid:

```js
const address = "Bangalore";
console.log(address); // Bangalore
```

Invalid:

```js
const address = "Bangalore";
address = "USA";
```

Error:

```text
Assignment to constant variable
```

---

# 14. Declaration, Reassignment, Redeclaration

এই তিনটি term খুব গুরুত্বপূর্ণ।

## 14.1 Declaration

Variable তৈরি করা।

```js
let age;
```

এখানে `age` variable declare করা হয়েছে।

---

## 14.2 Assignment

Variable-এ value রাখা।

```js
age = 25;
```

---

## 14.3 Declaration with assignment

Declare করার সময়ই value দেওয়া।

```js
let age = 25;
```

---

## 14.4 Reassignment

আগে declare করা variable-এ নতুন value দেওয়া।

```js
let age = 25;
age = 30;
```

---

## 14.5 Redeclaration

একই variable name আবার keyword দিয়ে declare করা।

```js
let age = 25;
let age = 30;
```

`let`-এর ক্ষেত্রে এটি allowed না।

`var`-এর ক্ষেত্রে allowed:

```js
var age = 25;
var age = 30;
```

কিন্তু modern JavaScript-এ এটি avoid করা উচিত।

---

# 15. Multiple Variable Declaration

একসাথে multiple variables declare করা যায়।

```js
let name, salary, department;
```

পরে values assign করা যায়:

```js
name = "Alex";
salary = 50000;
department = "Engineering";
```

তবে readability-এর জন্য অনেক সময় আলাদা line-এ লেখা ভালো:

```js
let name;
let salary;
let department;
```

---

# 16. JavaScript Comments

Comments হলো এমন text যা JavaScript engine execute করে না। Code explain করার জন্য comments ব্যবহার করা হয়।

## 16.1 Single-line comment

```js
// This is a single-line comment
let age = 25;
```

`//` এর পরের অংশ JavaScript execute করবে না।

---

## 16.2 Multi-line comment

```js
/*
This is a multi-line comment.
JavaScript engine will ignore this block.
*/
let age = 25;
```

Multi-line comment শুরু হয়:

```js
/*
```

শেষ হয়:

```js
*/
```

---

# 17. Primitive Data Types

Primitive data types হলো JavaScript-এর basic data types।

Day 02-তে নিচের primitive types explain করা হয়েছে:

```text
string
number
boolean
undefined
null
bigint
symbol
```

---

## 17.1 String

Text value store করার জন্য string ব্যবহার করা হয়।

String single quote বা double quote-এর মধ্যে লেখা যায়।

```js
let name = "Alice";
let city = "Dhaka";
```

---

## 17.2 Number

Numeric value store করার জন্য number ব্যবহার করা হয়।

```js
let age = 24;
let price = 99.99;
let pi = 3.14;
```

JavaScript-এ integer এবং decimal দুটোই সাধারণভাবে `number` type-এর মধ্যে পড়ে।

---

## 17.3 Boolean

Boolean value শুধু দুইটি হতে পারে:

```text
true
false
```

Example:

```js
let isStudent = true;
let isLoggedIn = false;
```

Boolean সাধারণত condition, status, yes/no type data বোঝাতে ব্যবহৃত হয়।

---

# 18. `undefined` বনাম `null`

JavaScript শেখার সময় অনেকেই `undefined` এবং `null` নিয়ে confuse হয়। এগুলো আলাদা concept।

---

## 18.1 undefined

যখন কোনো variable declare করা হয় কিন্তু কোনো value assign করা হয় না, তখন তার value হয় `undefined`।

Example:

```js
let name;

console.log(name); // undefined
```

এখানে `name` declare করা হয়েছে, কিন্তু value দেওয়া হয়নি।

তাই JavaScript বলে:

```text
name is undefined
```

অর্থাৎ value এখনো define করা হয়নি।

---

## 18.2 null

`null` হলো একটি explicit value। Developer নিজে assign করে বোঝায় যে variable-এর value intentionally empty বা nothing।

Example:

```js
let salary = null;

console.log(salary); // null
```

এখানে `salary` undefined নয়, কারণ এটিতে value assign করা হয়েছে। কিন্তু value হলো `null`, যার অর্থ:

```text
এই variable-এর এখন কোনো meaningful value নেই।
```

---

## 18.3 undefined vs null comparison

| বিষয়    | undefined                               | null                                    |
| ------- | --------------------------------------- | --------------------------------------- |
| কে দেয়? | JavaScript automatically দেয়            | Developer নিজে দেয়                      |
| কখন হয়? | variable declare কিন্তু assign করা হয়নি | intentionally empty value set করা হয়েছে |
| Example | `let name;`                             | `let salary = null;`                    |
| অর্থ    | value define হয়নি                       | value নেই / intentionally empty         |

---

## 18.4 উদাহরণ

```js
let name;
let salary = null;

console.log(name); // undefined
console.log(salary); // null
```

ব্যাখ্যা:

```text
name → declare হয়েছে, কিন্তু value নেই → undefined
salary → value assign হয়েছে, কিন্তু value null → null
```

---

# 19. BigInt

খুব বড় integer number store করার জন্য `bigint` ব্যবহার করা হয়।

সাধারণ `number` type-এর limit আছে। খুব বড় সংখ্যা নিয়ে কাজ করতে হলে `bigint` দরকার হতে পারে।

Example:

```js
let bigNumber = 123456789012345678901234567890n;
```

শেষে `n` দিলে JavaScript বুঝে এটি BigInt।

---

# 20. Symbol

`symbol` unique identifier তৈরি করার জন্য ব্যবহৃত হয়।

Day 02-তে শুধু high-level idea দেওয়া হয়েছে। পরে advanced section-এ symbol detail-এ শেখানো হবে।

Example:

```js
let id = Symbol("id");
```

Symbol ব্যবহার করা হয় যখন unique key বা unique identifier দরকার হয়।

---

# 21. Non-primitive বা Reference Data Types

Primitive data types দিয়ে basic value store করা হয়। কিন্তু real-world data অনেক সময় complex হয়।

Example:

একজন employee-এর data:

```text
name
salary
department
```

একজন student-এর data:

```text
name
age
isEnrolled
```

এগুলো একসাথে represent করার জন্য non-primitive data type দরকার।

JavaScript-এর common non-primitive বা reference data types:

```text
object
array
function
```

এগুলোকে complex data type-ও বলা যায়।

---

# 22. Object-এর basic idea

Object হলো key-value pair-এর collection।

Example:

```js
let student = {
  name: "Alice",
  age: 22,
  isEnrolled: true,
};
```

এখানে:

| Key          | Value     | Value type |
| ------------ | --------- | ---------- |
| `name`       | `"Alice"` | string     |
| `age`        | `22`      | number     |
| `isEnrolled` | `true`    | boolean    |

Object-এর syntax:

```js
let objectName = {
  key1: value1,
  key2: value2,
  key3: value3,
};
```

Object-এর ভেতরে প্রতিটি property key-value pair আকারে থাকে।

```text
key এবং value-এর মাঝে colon (:)
প্রতিটি pair-এর মাঝে comma (,)
পুরো object curly braces {} এর মধ্যে
```

---

# 23. Object কেন non-primitive?

Object primitive values দিয়ে তৈরি হতে পারে, কিন্তু নিজে complex structure।

Example:

```js
let student = {
  name: "Alice",
  age: 22,
  isEnrolled: true,
};
```

এখানে object-এর ভেতরে primitive values আছে:

```text
"Alice" → string
22 → number
true → boolean
```

কিন্তু পুরো `student` value একটি object, তাই এটি non-primitive।

Object-এর property value আবার আরেকটি object-ও হতে পারে।

Example:

```js
let student = {
  name: "Alice",
  address: {
    city: "Dhaka",
    country: "Bangladesh",
  },
};
```

এখানে `address` নিজেই একটি nested object।

---

# 24. Array-এর basic idea

Array হলো ordered collection বা sequence of values।

Example:

```js
let numbers = [1, 2, 3, 4, 5];
```

এখানে:

```text
1, 2, 3, 4, 5
```

প্রতিটি number primitive value, কিন্তু পুরো structure একটি array। তাই array non-primitive data type।

আরেকটি example:

```js
let languages = ["JavaScript", "Python", "C++"];
```

Array syntax:

```js
let arrayName = [value1, value2, value3];
```

Array square brackets `[]` দিয়ে লেখা হয়।

---

# 25. Function non-primitive data type

Function-ও JavaScript-এ non-primitive/reference type হিসেবে বিবেচিত হয়।

Example:

```js
function greet() {
  console.log("Hello");
}
```

Function detail-এ পরে শেখানো হবে। Day 02-তে শুধু বলা হয়েছে যে object, array, function—এগুলো complex/non-primitive data type।

---

# 26. Memory-তে variable কীভাবে store হয়?

Variable-এ value assign করলে সেই data কোথাও store হতে হয়। কারণ পরে program সেই value আবার ব্যবহার করবে।

Data computer memory-তে store হয়।

High-level memory দুই ধরনের:

```text
Stack
Heap
```

---

# 27. Stack Memory

Primitive values সাধারণত stack memory-তে store হয়।

Primitive values:

```text
string
number
boolean
undefined
null
bigint
symbol
```

Example:

```js
let age = 25;
let name = "Alice";
let isStudent = true;
```

এগুলো primitive, তাই high-level idea অনুযায়ী stack memory-তে store হয়।

Stack-কে plate বা book-এর stack-এর মতো ভাবতে পারো।

---

# 28. Heap Memory

Non-primitive/reference data types-এর actual value heap memory-তে store হয়।

Non-primitive values:

```text
object
array
function
```

Example:

```js
let student = {
  name: "Alice",
  age: 22,
};
```

এখানে object-এর actual data heap memory-তে থাকে। Variable সাধারণত সেই object-এর memory address/reference ধরে রাখে।

Day 02-তে pass by reference deep dive করা হয়নি, কিন্তু concept introduce করা হয়েছে।

---

# 29. Memory Address

Memory-এর প্রতিটি location-এর unique address থাকে।

Real-life analogy:

```text
বাসায় চিঠি পাঠাতে address দরকার।
Email পাঠাতে email address দরকার।
WhatsApp করতে phone number দরকার।
```

একইভাবে memory-তে value কোথায় আছে, তা জানার জন্য memory address থাকে।

JavaScript সেই address/reference ব্যবহার করে value retrieve করতে পারে।

---

# 30. Primitive vs Non-primitive Memory Summary

| Type          | কোথায় store হয় | Example                 |
| ------------- | -------------- | ----------------------- |
| Primitive     | Stack          | string, number, boolean |
| Non-primitive | Heap           | object, array, function |

High-level idea:

```text
Primitive → actual value directly stored
Non-primitive → actual object/array heap-এ stored, variable reference ধরে
```

---

# 31. JavaScript Engine Code কীভাবে দেখে?

JavaScript code সরাসরি যেমন লেখা হয়, computer তেমন বুঝে না।

JavaScript engine code process করে কয়েকটি ধাপে:

```text
Tokenizing
Parsing
Interpreting
Code generation
```

Day 02-তে mainly তিনটি phase explain করা হয়েছে:

```text
tokenizing
parsing
interpreting
```

---

# 32. Tokenizing কী?

Tokenizing মানে code-কে ছোট ছোট meaningful pieces-এ ভেঙে ফেলা।

Example code:

```js
var age = 7;
```

এটি ভেঙে যেতে পারে:

```text
var
age
=
7
;
```

প্রতিটি piece হলো token।

JavaScript engine প্রথমে code ভেঙে দেখে এগুলো language grammar অনুযায়ী valid কিনা।

---

# 33. Parsing কী?

Token তৈরি হওয়ার পর JavaScript engine tokens থেকে একটি tree structure তৈরি করে।

এই tree-কে বলা হয়:

```text
Abstract Syntax Tree
```

সংক্ষেপে:

```text
AST
```

Parsing phase-এ JavaScript engine বুঝতে চেষ্টা করে code grammar অনুযায়ী meaningful কিনা।

---

# 34. Abstract Syntax Tree বা AST

AST হলো code-এর tree-like representation।

Example:

```js
let x = 10;
```

এই একটি line code থেকেও AST তৈরি হয়। AST-তে variable declaration, variable name, value, keyword—সব detail থাকে।

Conceptual tree:

```text
VariableDeclaration
 ├── kind: let
 └── declarations
      └── VariableDeclarator
           ├── id: x
           └── init: 10
```

JavaScript engine AST ব্যবহার করে বুঝতে পারে code valid কিনা এবং কীভাবে execute করতে হবে।

---

# 35. Invalid code হলে কী হয়?

Example:

```js
let 2name = "Alex";
```

এটি invalid, কারণ variable name digit দিয়ে শুরু হয়েছে।

Tokenizing/parsing phase-এ JavaScript বুঝে ফেলে grammar rule ভাঙা হয়েছে। তাই code execute করার আগেই error দেয়।

---

# 36. AST Explorer

Instructor একটি website দেখিয়েছেন:

```text
astexplorer.net
```

এখানে JavaScript code লিখলে তার AST দেখা যায়।

Example:

```js
let x = 10;
```

লিখলে right side-এ tree বা JSON format-এ AST দেখা যাবে।

তুমি test করতে পারো:

```js
let x = 10;
let _name = "Alex";
let $price = 500;
let 2name = "Invalid";
```

শেষের line invalid হওয়ায় AST তৈরি হবে না এবং error দেখাবে।

---

# 37. Day 02 Code Examples

## 37.1 Basic setup

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Day 02</title>
    <script src="index.js" defer></script>
  </head>
  <body>
    <h1>Day 02: Variables and Data Types</h1>
  </body>
</html>
```

`index.js`

```js
console.log("day02");
```

---

## 37.2 Variable declaration

```js
let fruit = "mango";
console.log(fruit);
```

---

## 37.3 Reassignment

```js
let fruit = "mango";
console.log(fruit); // mango

fruit = "kiwi";
console.log(fruit); // kiwi
```

---

## 37.4 Variable to variable assignment

```js
let fruit = "mango";
let vegetable = "carrot";

fruit = vegetable;

console.log(fruit); // carrot
console.log(vegetable); // carrot
```

---

## 37.5 `var` redeclaration

```js
var address = "Bangalore";
console.log(address); // Bangalore

var address = "USA";
console.log(address); // USA
```

Allowed, but not recommended.

---

## 37.6 `let` reassignment

```js
let address = "Bangalore";
console.log(address); // Bangalore

address = "USA";
console.log(address); // USA
```

Allowed.

---

## 37.7 `let` redeclaration error

```js
let address = "Bangalore";
let address = "USA";
```

Error:

```text
Identifier 'address' has already been declared
```

---

## 37.8 `const` reassignment error

```js
const address = "Bangalore";
console.log(address);

address = "USA";
```

Error:

```text
Assignment to constant variable
```

---

## 37.9 Undefined

```js
let name;
console.log(name); // undefined
```

---

## 37.10 Null

```js
let salary = null;
console.log(salary); // null
```

---

## 37.11 Object

```js
let student = {
  name: "Alice",
  age: 22,
  isEnrolled: true,
};

console.log(student);
```

---

## 37.12 Array

```js
let numbers = [1, 2, 3, 4, 5];

console.log(numbers);
```

---

# 38. Important Concept Map

```text
Variable
 ├── stores data
 ├── has a name
 ├── holds a value
 └── declared using
      ├── var
      ├── let
      └── const
```

```text
Value
 ├── Primitive
 │    ├── string
 │    ├── number
 │    ├── boolean
 │    ├── undefined
 │    ├── null
 │    ├── bigint
 │    └── symbol
 │
 └── Non-primitive / Reference
      ├── object
      ├── array
      └── function
```

```text
Memory
 ├── Stack
 │    └── Primitive values
 └── Heap
      └── Non-primitive values
```

```text
JavaScript Engine
 ├── Tokenizing
 ├── Parsing
 ├── AST creation
 ├── Interpreting
 └── Code generation
```

---

# 39. Day 02 Assignment

ভিডিওর শেষে assignment দেওয়া হয়েছে।

## Task 1: Person information variables declare করো

Declare variables for:

```text
person's name
age
student status
favorite programming language
```

Example:

```js
let personName = "Rahim";
let age = 22;
let isStudent = true;
let favoriteProgrammingLanguage = "JavaScript";

console.log(personName);
console.log(age);
console.log(isStudent);
console.log(favoriteProgrammingLanguage);
```

---

## Task 2: `let` দিয়ে reassignment test করো

```js
let favoriteProgrammingLanguage = "JavaScript";
console.log(favoriteProgrammingLanguage);

favoriteProgrammingLanguage = "Python";
console.log(favoriteProgrammingLanguage);
```

Expected:

```text
JavaScript
Python
```

---

## Task 3: `const` দিয়ে reassignment test করো

```js
const country = "Bangladesh";
console.log(country);

country = "India";
```

Expected error:

```text
Assignment to constant variable
```

---

## Task 4: `var` redeclaration test করো

```js
var city = "Dhaka";
console.log(city);

var city = "Chittagong";
console.log(city);
```

Observe:

```text
var redeclaration allow করে।
```

---

## Task 5: Object তৈরি করো

```js
let person = {
  name: "Rahim",
  age: 22,
  isStudent: true,
  favoriteProgrammingLanguage: "JavaScript",
};

console.log(person);
```

---

## Task 6: Array তৈরি করো

```js
let favoriteLanguages = ["JavaScript", "Python", "C++"];

console.log(favoriteLanguages);
```

---

## Task 7: Value change করে observe করো

Object ও array-এর value change করার চেষ্টা করো এবং output দেখো।

Example:

```js
let person = {
  name: "Rahim",
  age: 22,
};

person.age = 23;

console.log(person);
```

Example:

```js
let numbers = [1, 2, 3];

numbers[0] = 100;

console.log(numbers);
```

এই অংশে object/array নিয়ে বেশি চিন্তা না করলেও চলবে। পরে object, array, reference, pass by reference detail-এ শেখানো হবে।

---

## Task 8: AST Explorer practice

Visit:

```text
astexplorer.net
```

Try:

```js
let x = 10;
let _name = "Alex";
let $price = 500;
let 2name = "Wrong";
```

Observe:

```text
valid variable হলে AST তৈরি হয়।
invalid variable হলে parsing error আসে।
```

---

# 40. Practice Checklist

নিজের tracker-এ tick দিতে পারো:

```text
[ ] Day 02 folder তৈরি করেছি
[ ] index.html তৈরি করেছি
[ ] index.js তৈরি করেছি
[ ] script defer দিয়ে link করেছি
[ ] console.log run করেছি
[ ] let দিয়ে variable declare করেছি
[ ] value reassignment করেছি
[ ] const reassignment error দেখেছি
[ ] var redeclaration test করেছি
[ ] undefined test করেছি
[ ] null test করেছি
[ ] object তৈরি করেছি
[ ] array তৈরি করেছি
[ ] primitive vs non-primitive বুঝেছি
[ ] stack vs heap high-level বুঝেছি
[ ] AST Explorer ব্যবহার করেছি
```

---

# 41. Common Mistakes

## Mistake 1: `=` কে equality ভাবা

Wrong understanding:

```text
= মানে দুই পাশ সমান
```

Correct:

```text
= মানে right side value left side variable-এ assign করা
```

---

## Mistake 2: Variable name number দিয়ে শুরু করা

Wrong:

```js
let 1name = "Alex";
```

Correct:

```js
let name1 = "Alex";
```

---

## Mistake 3: hyphen ব্যবহার করা

Wrong:

```js
let user-name = "Alex";
```

Correct:

```js
let userName = "Alex";
```

---

## Mistake 4: `const` variable reassign করা

Wrong:

```js
const age = 25;
age = 26;
```

Correct:

```js
let age = 25;
age = 26;
```

যদি value change করার দরকার থাকে, `let` ব্যবহার করো।

---

## Mistake 5: `undefined` ও `null` একই ভাবা

Wrong:

```text
undefined এবং null একই
```

Correct:

```text
undefined → value assign করা হয়নি
null → intentionally empty value assign করা হয়েছে
```

---

# 42. Interview-style Questions

## Q1. Variable কী?

Variable হলো named storage, যেখানে JavaScript data store করে।

```js
let name = "Alice";
```

---

## Q2. `let`, `const`, `var` এর পার্থক্য কী?

| Keyword | Redeclare | Reassign | Modern use                              |
| ------- | --------- | -------- | --------------------------------------- |
| `var`   | yes       | yes      | avoid                                   |
| `let`   | no        | yes      | use when value changes                  |
| `const` | no        | no       | use when value should not be reassigned |

---

## Q3. Primitive data type কী?

Primitive data type হলো basic value type।

Example:

```text
string, number, boolean, undefined, null, bigint, symbol
```

---

## Q4. Non-primitive data type কী?

Non-primitive data type হলো complex/reference type।

Example:

```text
object, array, function
```

---

## Q5. `undefined` কখন হয়?

যখন variable declare করা হয় কিন্তু value assign করা হয় না।

```js
let name;
console.log(name); // undefined
```

---

## Q6. `null` কী?

`null` হলো intentionally empty value।

```js
let salary = null;
```

---

## Q7. Pass by value কী?

Primitive value assignment-এর সময় right side value copy হয়ে left side variable-এ যায়।

```js
let a = 10;
let b = a;
```

এখানে `a`-এর value copy হয়ে `b`-তে যায়।

---

## Q8. JavaScript engine code execute করার আগে কী করে?

High-level process:

```text
Tokenizing → Parsing → AST creation → Interpreting/Code generation
```

---

# 43. Final Summary

Day 02-এর মূল শিক্ষা হলো JavaScript variable এবং data type-এর foundation বুঝে নেওয়া। Variable হলো named storage, যেখানে data রাখা হয়। Variable declare করতে `var`, `let`, বা `const` ব্যবহার করা যায়, কিন্তু modern JavaScript-এ সাধারণত `let` এবং `const` ব্যবহার করা উচিত।

`let` ব্যবহার করা হয় যখন value পরে change হতে পারে। `const` ব্যবহার করা হয় যখন variable reassign করা উচিত নয়। `var` পুরনো JavaScript-এর অংশ, এটি redeclare করা যায় বলে confusion তৈরি করতে পারে, তাই avoid করা ভালো।

JavaScript-এ value দুই ধরনের: primitive এবং non-primitive। Primitive values হলো string, number, boolean, undefined, null, bigint, symbol। Non-primitive values হলো object, array, function। Primitive assignment-এর ক্ষেত্রে pass by value হয়, অর্থাৎ value copy হয়। Non-primitive value heap memory-তে থাকে এবং reference concept জড়িত থাকে, যা পরে detail-এ শেখানো হবে।

Memory-এর high-level idea অনুযায়ী primitive values stack memory-তে থাকে এবং non-primitive values heap memory-তে থাকে। প্রতিটি memory location-এর address থাকে, যার মাধ্যমে JavaScript later value access করতে পারে।

শেষে JavaScript engine-এর internal process নিয়ে ধারণা দেওয়া হয়েছে। JavaScript code সরাসরি run হয় না; engine code tokenizes করে, parse করে, AST তৈরি করে, তারপর interpret বা machine-understandable form-এ convert করে। তাই variable naming rule বা syntax ভুল হলে code execute হওয়ার আগেই error পাওয়া যায়।

Day 02-এর assignment হলো variables declare করা, `let`, `const`, `var` experiment করা, primitive ও non-primitive value test করা, object ও array তৈরি করা, এবং AST Explorer দিয়ে valid/invalid JavaScript syntax observe করা।
