# JavaScript Day 02 – Variables & Data Types Notes

## 1. Variable কী?

Variable হলো data রাখার জন্য একটি storage/container।

```js
let fruit = "Mango";
```

এখানে:

- `fruit` = variable name
- `"Mango"` = value

---

## 2. Variable Declaration Syntax

```js
let variableName = value;
```

উদাহরণ:

```js
let city = "Dhaka";
```

---

## 3. Assignment Operator

`=` হলো assignment operator। এটি variable এর মধ্যে value রাখে।

```js
let fruit = "Mango";
fruit = "Kiwi";
```

প্রথমে value ছিল `Mango`, পরে replace হয়ে `Kiwi` হয়েছে।

---

## 4. Primitive Data Types

JavaScript এর basic data type:

1. String
2. Number
3. Boolean
4. Undefined
5. Null
6. BigInt
7. Symbol

### String

```js
let name = "Tushar";
```

### Number

```js
let age = 22;
```

### Boolean

```js
let isStudent = true;
```

### Undefined

Variable declare করা হয়েছে কিন্তু value দেওয়া হয়নি।

```js
let salary;
console.log(salary); // undefined
```

### Null

ইচ্ছা করে empty value রাখা।

```js
let salary = null;
```

---

## 5. Non-Primitive Data Types

Complex data types:

- Object
- Array
- Function

### Object

```js
let student = {
  name: "Alice",
  age: 22,
  isEnrolled: true,
};
```

### Array

```js
let numbers = [1, 2, 3, 4];
```

---

## 6. Pass By Value

Primitive type এ value copy হয়।

```js
let fruit = "Mango";
let vegetable = "Carrot";

fruit = vegetable;
```

Result:

```text
fruit -> Carrot
vegetable -> Carrot
```

`vegetable` পরিবর্তন হয় না।

---

## 7. Variable Naming Rules

Allowed:

- Letters ব্যবহার করা যাবে
- Digits ব্যবহার করা যাবে
- `_` এবং `$` ব্যবহার করা যাবে

Not allowed:

```js
let 2name = "Rahim"; // invalid
let for = 10;        // invalid
```

কারণ:

- Number দিয়ে variable name শুরু করা যায় না
- Reserved keyword variable name হিসেবে ব্যবহার করা যায় না

---

## 8. Case Sensitive

```js
let myName = "Tushar";
let MyName = "Alex";
```

দুটো আলাদা variable।

---

## 9. Camel Case

Recommended naming style:

```js
let homeAddress;
let officeAddress;
let favoriteProgrammingLanguage;
```

---

## 10. var, let, const

### var

- Redeclare করা যায়
- Reassign করা যায়

```js
var city = "Dhaka";
var city = "Chittagong";
```

### let

- Redeclare করা যায় না
- Reassign করা যায়

```js
let city = "Dhaka";
city = "Khulna";
```

Invalid:

```js
let city = "Dhaka";
let city = "Khulna";
```

### const

- Redeclare করা যায় না
- Reassign করা যায় না

```js
const pi = 3.14;
```

Invalid:

```js
pi = 10;
```

---

## 11. Comments in JavaScript

Single line comment:

```js
// This is a comment
```

Multi-line comment:

```js
/*
This is
multi-line comment
*/
```

---

## 12. Memory Concept

| Memory | Used For             |
| ------ | -------------------- |
| Stack  | Primitive values     |
| Heap   | Non-Primitive values |

---

## 13. JavaScript Code Execution Process

JavaScript code execute হওয়ার আগে কয়েকটি ধাপ পার হয়:

1. Tokenizing
   Code কে ছোট ছোট token এ ভাগ করা হয়।

2. Parsing
   Token থেকে AST বা Abstract Syntax Tree তৈরি হয়।

3. Interpreting / Compilation
   শেষে machine code তৈরি হয়।

---

## 14. Best Practices

- Variable একবার declare করো
- Meaningful name ব্যবহার করো
- Camel case follow করো
- Modern JavaScript এ `let` এবং `const` ব্যবহার করো
- `var` avoid করো

---

## 15. Practice Tasks

### Task 1

নিচের variables declare করো:

- name
- age
- isStudent
- favoriteProgrammingLanguage

তারপর console এ print করো।

```js
let name = "Rahim";
let age = 20;
let isStudent = true;
let favoriteProgrammingLanguage = "JavaScript";

console.log(name);
console.log(age);
console.log(isStudent);
console.log(favoriteProgrammingLanguage);
```

### Task 2

`let` দিয়ে value reassign করে দেখো।

```js
let city = "Dhaka";
city = "Rajshahi";

console.log(city);
```

### Task 3

`const` দিয়ে reassign করলে error দেখো।

```js
const country = "Bangladesh";
country = "India"; // TypeError
```

### Task 4

Object এবং Array তৈরি করো।

```js
let student = {
  name: "Rahim",
  age: 20,
  isStudent: true,
};

let numbers = [1, 2, 3, 4, 5];

console.log(student);
console.log(numbers);
```

---

## Quick Revision

| Concept       | Key Point                         |
| ------------- | --------------------------------- |
| Variable      | Data store করে                    |
| `let`         | Reassign allowed                  |
| `const`       | Reassign not allowed              |
| `var`         | Redeclare allowed, avoid করা ভালো |
| Primitive     | Simple values                     |
| Non-Primitive | Complex values                    |
| Undefined     | Declared but no value             |
| Null          | Intentionally empty               |
| Stack         | Primitive data                    |
| Heap          | Reference data                    |

```

```
