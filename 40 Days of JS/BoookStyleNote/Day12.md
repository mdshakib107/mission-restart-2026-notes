# Day 12 — JavaScript Objects, Object Manipulation, Object Destructuring & Optional Chaining

> **Study Notes in Bangla**  
> এই notes তৈরি করা হয়েছে Day 12 lesson-এর transcript/code অনুসারে। লক্ষ্য হলো: শুধু notes পড়েই যেন beginner student JavaScript `object`, object manipulation, static methods, object destructuring এবং optional chaining ভালোভাবে বুঝতে পারে।

---

## Table of Contents

1. [Lesson Overview](#lesson-overview)
2. [JavaScript-এ Object কেন দরকার?](#javascript-এ-object-কেন-দরকার)
3. [Object কী? Key-Value Pair Mental Model](#object-কী-key-value-pair-mental-model)
4. [Object Literal Syntax](#object-literal-syntax)
5. [Object Property Access: Dot Notation vs Bracket Notation](#object-property-access-dot-notation-vs-bracket-notation)
6. [Object-এ Property Add, Modify, Delete](#object-এ-property-add-modify-delete)
7. [Dynamic Key Access এবং Computed Property Name](#dynamic-key-access-এবং-computed-property-name)
8. [Object Create করার বিভিন্ন Pattern](#object-create-করার-বিভিন্ন-pattern)
   - [Constructor Function](#constructor-function)
   - [`new Object()` Constructor](#new-object-constructor)
   - [Factory Function](#factory-function)
   - [Object Property Shorthand](#object-property-shorthand)
9. [Object Methods এবং `this`-এর Basic ব্যবহার](#object-methods-এবং-this-এর-basic-ব্যবহার)
10. [Nested Objects](#nested-objects)
11. [Property Exists কিনা Check করা: `in` Operator](#property-exists-কিনা-check-করা-in-operator)
12. [Object Iterate করা: `for...in` এবং `Object.keys()`](#object-iterate-করা-forin-এবং-objectkeys)
13. [Object References: Object কেন Value দিয়ে Compare হয় না?](#object-references-object-কেন-value-দিয়ে-compare-হয়-না)
14. [Object Static Methods](#object-static-methods)
    - [`Object.assign()`](#objectassign)
    - [Shallow Copy vs Deep Copy](#shallow-copy-vs-deep-copy)
    - [`structuredClone()`](#structuredclone)
    - [`Object.entries()`](#objectentries)
    - [`Object.fromEntries()`](#objectfromentries)
    - [`Object.freeze()`](#objectfreeze)
    - [`Object.seal()`](#objectseal)
    - [`Object.hasOwn()`](#objecthasown)
15. [Object Destructuring](#object-destructuring)
    - [Basic Destructuring](#basic-destructuring)
    - [Default Value](#default-value)
    - [Dynamic Default Value](#dynamic-default-value)
    - [Alias / Rename Variable](#alias--rename-variable)
    - [Nested Object Destructuring](#nested-object-destructuring)
    - [Function Parameter Destructuring](#function-parameter-destructuring)
    - [Function Return Value Destructuring](#function-return-value-destructuring)
    - [Destructuring in Loops](#destructuring-in-loops)
16. [Optional Chaining `?.`](#optional-chaining-)
17. [Important Differences](#important-differences)
18. [Common Mistakes](#common-mistakes)
19. [Complete Lesson Code Reference](#complete-lesson-code-reference)
20. [Assignment](#assignment)
21. [Final Summary](#final-summary)
22. [Practice Checklist](#practice-checklist)

---

## Lesson Overview

এই lesson-এ মূলত **JavaScript Objects** এবং object নিয়ে real-world manipulation শেখানো হয়েছে। Instructor শুরুতেই বলেন, আগে closure শেখানো হয়েছিল, এরপর originally `this` keyword আসার কথা ছিল। কিন্তু `this` keyword ভালোভাবে বুঝতে হলে আগে object ভালোভাবে বুঝতে হবে। তাই এই lesson-এ আগে object এবং object manipulation নেওয়া হয়েছে।

এই lesson-এর বড় topic গুলো:

| Topic | কী শেখা হবে |
|---|---|
| Object Introduction | complex data store করার জন্য object কেন দরকার |
| Object Properties | key-value pair, property access, add, update, delete |
| Nested Object | object-এর ভিতরে object |
| Object Creation Patterns | literal, constructor function, `new Object()`, factory function |
| Object Reference | object non-primitive হওয়ায় reference দিয়ে compare হয় |
| Static Methods | `Object.assign`, `Object.keys`, `Object.entries`, `Object.freeze`, `Object.seal`, `Object.hasOwn` ইত্যাদি |
| Object Destructuring | কম code লিখে object থেকে value বের করা |
| Optional Chaining | nested property safely access করা |

ভিডিওতে prototype এবং object-oriented programming গভীরে আলোচনা করা হয়নি। এগুলো future module/day-তে আসবে। এখানে object-এর groundwork তৈরি করা হয়েছে।

---

## JavaScript-এ Object কেন দরকার?

আগের lesson-গুলোতে আমরা data store করেছি simple variable দিয়ে:

```js
let name = "tapas";
let age = 40;
let isAdmin = true;
```

এগুলো primitive data type: `number`, `string`, `boolean` ইত্যাদি।

কিন্তু real-world application-এ data সাধারণত এত simple হয় না। যেমন:

- user data
- employee data
- company data
- student data
- address data
- API response data
- UI configuration data

একজন user-এর জন্য শুধু `name` নয়, `age`, `email`, `address`, `isAdmin`, `preferences`, `orders` ইত্যাদি অনেক data থাকতে পারে। প্রতিটি value আলাদা variable-এ রাখলে manage করা কঠিন হয়ে যায়।

তাই JavaScript-এ **object** ব্যবহার করা হয় structured data রাখার জন্য।

### সহজ explanation

Object হলো এমন একটি data structure যেখানে data **key-value pair** হিসেবে থাকে।

```js
let user = {
  name: "tapas",
  age: 40
};
```

এখানে:

| Key | Value |
|---|---|
| `name` | `"tapas"` |
| `age` | `40` |

### মনে রাখার নিয়ম

> অনেক related data একসাথে রাখতে হলে object ব্যবহার করো।

### Common mistake

অনেকে beginner অবস্থায় সব data আলাদা variable-এ রাখে:

```js
let userName = "tapas";
let userAge = 40;
let userCity = "Bangalore";
```

এটি ছোট example-এ ঠিক আছে, কিন্তু বড় application-এ object বেশি clean:

```js
let user = {
  name: "tapas",
  age: 40,
  city: "Bangalore"
};
```

---

## Object কী? Key-Value Pair Mental Model

Object হলো **keyed collection**। মানে প্রতিটি value একটি unique key দিয়ে identify করা যায়।

```js
const student = {
  name: "John Williamson",
  age: 9,
  std: 3
};
```

এখানে `student` object-এর ভিতরে তিনটি property আছে:

1. `name`
2. `age`
3. `std`

প্রতিটি property একটি key-value pair।

| Property | Key | Value |
|---|---|---|
| 1 | `name` | `"John Williamson"` |
| 2 | `age` | `9` |
| 3 | `std` | `3` |

### Important concept

Object-এর key internally string হিসেবে treat হয়, যদি key valid identifier হয়।

```js
const user = {
  name: "tapas"
};
```

এখানে `name` quote ছাড়া লিখলেও JavaScript internally এটিকে key string হিসেবেই ধরে।

### Common mistake

Object key আর variable name এক জিনিস নয়।

```js
const name = "age";

const user = {
  name: "tapas",
  age: 40
};

console.log(user.name); // "tapas"
```

এখানে `user.name` object-এর `name` key access করছে, variable `name` ব্যবহার করছে না।

Variable-এর value দিয়ে key access করতে চাইলে bracket notation লাগবে:

```js
console.log(user[name]); // user["age"] => 40
```

---

## Object Literal Syntax

Object create করার সবচেয়ে common এবং straightforward way হলো **object literal syntax**।

```js
let user = {
  name: "tapas",
  age: 40,
  "is adimin": true
};
```

এখানে `{}` curly braces দিয়ে object তৈরি হয়েছে।

### Empty object

```js
let user = {};
```

এটি একটি empty object।

### Object with properties

```js
let user = {
  name: "tapas",
  age: 40
};
```

### মনে রাখার নিয়ম

> `{}` দেখলে ভাবো: এখানে object তৈরি হচ্ছে, যদি এটি block statement না হয়।

### Common mistake

Comma ভুলে যাওয়া:

```js
// ভুল
const user = {
  name: "tapas"
  age: 40
};
```

সঠিক:

```js
const user = {
  name: "tapas",
  age: 40
};
```

---

## Object Property Access: Dot Notation vs Bracket Notation

Object থেকে value retrieve করার দুইটি common way:

1. Dot notation
2. Bracket notation / subscript notation

---

### Dot Notation

```js
let user = {
  name: "tapas",
  age: 40
};

console.log(user.name); // "tapas"
console.log(user.age);  // 40
```

Dot notation simple এবং readable।

### কখন dot notation ব্যবহার করবে?

যখন key valid identifier:

```js
user.name
user.age
user.isSeniorCitizen
```

---

### Bracket Notation

```js
console.log(user["name"]); // "tapas"
console.log(user["age"]);  // 40
```

Bracket notation string key দিয়ে property access করে।

### কখন bracket notation দরকার?

#### 1. Key-তে space/special character থাকলে

```js
let user = {
  name: "tapas",
  "is adimin": true
};

console.log(user["is adimin"]); // true
```

এটি করা যাবে না:

```js
// Syntax error
console.log(user.is adimin);
```

#### 2. Dynamic key access করতে হলে

```js
const someKey = "age";
console.log(user[someKey]); // user["age"]
```

#### 3. Computed property create করতে হলে

```js
let car = "BMW";

let favCars = {
  [car]: 5
};

console.log(favCars); // { BMW: 5 }
```

---

### Dot vs Bracket Table

| Situation | Dot Notation | Bracket Notation |
|---|---:|---:|
| Normal key | ✅ | ✅ |
| Key has space | ❌ | ✅ |
| Key has special character | ❌ | ✅ |
| Key comes from variable | ❌ | ✅ |
| More readable for static key | ✅ | ⚠️ |
| Computed property name | ❌ | ✅ |

### Common mistake

```js
const someKey = "age";
console.log(user.someKey); // undefined
```

এটি `age` key access করছে না। এটি `someKey` নামে property খুঁজছে।

সঠিক:

```js
console.log(user[someKey]); // 34
```

### মনে রাখার নিয়ম

> Key hardcoded হলে dot notation। Key dynamic হলে bracket notation।

---

## Object-এ Property Add, Modify, Delete

JavaScript object mutable। অর্থাৎ object create করার পরেও property add, update, delete করা যায়।

---

### Add New Property

```js
let user = {
  name: "tapas",
  age: 40,
  "is adimin": true
};

user.isSeniorCitizen = false;
user["movie lover"] = true;

console.log(user);
```

Output-এর idea:

```js
{
  name: "tapas",
  age: 40,
  "is adimin": true,
  isSeniorCitizen: false,
  "movie lover": true
}
```

### Explanation

- `user.isSeniorCitizen = false` নতুন property add করেছে।
- `user["movie lover"] = true` special key add করেছে।

---

### Modify Existing Property

```js
user.age = 34;
user["movie lover"] = false;

console.log(user);
```

এখানে:

- `age` 40 থেকে 34 হয়েছে।
- `"movie lover"` true থেকে false হয়েছে।

---

### Delete Property

```js
delete user["movie lover"];
delete user.age;
```

`delete` keyword object থেকে property remove করে।

### Common mistake

`delete` variable delete করার জন্য নয়; object property delete করার জন্য।

```js
let age = 40;

// ভুল mental model
delete age; // এভাবে variable normally delete করা হয় না
```

### মনে রাখার নিয়ম

> Object property manipulate করতে `object.key = value`, `object[key] = value`, আর remove করতে `delete object.key`।

---

## Dynamic Key Access এবং Computed Property Name

Dynamic মানে key আগে থেকে hardcoded নয়; variable/user input/API response থেকে আসে।

---

### Dynamic Key Access

```js
let user = {
  name: "tapas",
  age: 34
};

const someKey = "age";

console.log(user[someKey]); // 34
```

এখানে runtime-এ `someKey` variable-এর value `"age"` দিয়ে `user["age"]` access হয়েছে।

### ভুল approach

```js
console.log(user.someKey); // undefined
```

JavaScript এখানে literally `someKey` নামে key খুঁজবে।

---

### Computed Property Name

Object create করার সময় key dynamically set করতে চাইলে bracket ব্যবহার করতে হয়।

```js
let car = "BMW";

let favCars = {
  [car]: 5
};

console.log(favCars); // { BMW: 5 }
```

`[car]` মানে car variable-এর value key হিসেবে বসবে।

আরেকটি example:

```js
const fieldName = "email";

const user = {
  name: "John",
  [fieldName]: "john@example.com"
};

console.log(user.email); // "john@example.com"
```

### Common mistake

```js
const fieldName = "email";

const user = {
  fieldName: "john@example.com"
};

console.log(user.email); // undefined
console.log(user.fieldName); // "john@example.com"
```

এখানে key হয়েছে literally `fieldName`, variable-এর value `email` নয়।

### মনে রাখার নিয়ম

> Object create করার সময় variable-এর value দিয়ে key বানাতে চাইলে `[variableName]` ব্যবহার করো।

---

## Object Create করার বিভিন্ন Pattern

ভিডিওতে object create করার কয়েকটি pattern দেখানো হয়েছে:

1. Object literal
2. Constructor function
3. `new Object()`
4. Factory function

---

## Constructor Function

Constructor function হলো object create করার blueprint-এর মতো। Convention অনুযায়ী constructor function-এর নাম capital letter দিয়ে শুরু হয়।

```js
function Car(name, model) {
    this.name = name;
    this.model = model;
}

const bmwCar = new Car("BMW", "X1");
const audiCar = new Car("Audi", "A8");

console.log(bmwCar);
console.log(audiCar);

console.log(bmwCar instanceof Car); // true
```

### Explanation

`Car` function একটি blueprint:

```js
function Car(name, model) {
    this.name = name;
    this.model = model;
}
```

যখন `new Car("BMW", "X1")` করা হয়:

- নতুন object create হয়।
- `this` নতুন object-কে point করে।
- `this.name = name` নতুন object-এ `name` property add করে।
- `this.model = model` নতুন object-এ `model` property add করে।
- শেষে object return হয়।

### Output idea

```js
Car { name: "BMW", model: "X1" }
Car { name: "Audi", model: "A8" }
true
```

### `instanceof`

```js
console.log(bmwCar instanceof Car); // true
```

এটি check করে `bmwCar` কি `Car` constructor function থেকে তৈরি হয়েছে কিনা।

### Common mistake

Constructor function-এ `new` না দিলে problem হতে পারে:

```js
const car = Car("BMW", "X1"); // ভুল
```

সাধারণভাবে constructor function call করার সময় `new` ব্যবহার করতে হবে।

### মনে রাখার নিয়ম

> Constructor function = capital letter + `this` + `new`.

---

## `new Object()` Constructor

JavaScript built-in `Object` constructor দিয়েও object create করা যায়।

```js
const person = new Object();

person.name = "Alpha";
person.age = 76;

console.log(person);
```

Output:

```js
{ name: "Alpha", age: 76 }
```

### Explanation

এখানে object initially empty, পরে property add করা হয়েছে।

### কখন ব্যবহার করবে?

Real-world code-এ object literal বেশি common:

```js
const person = {
  name: "Alpha",
  age: 76
};
```

`new Object()` জানা দরকার, কিন্তু সাধারণত `{}` বেশি clean।

### Common mistake

অনেকে মনে করে `new Object()` আর custom constructor একই। কিন্তু:

```js
const person = new Object();
```

এটি generic object দেয়। কিন্তু:

```js
const bmwCar = new Car("BMW", "X1");
```

এটি `Car` type-এর object instance দেয়।

---

## Factory Function

Factory function হলো এমন function যা object তৈরি করে return করে। এখানে `new` লাগে না।

```js
function createUser(name, age) {
    return {
       name,
       age,
       greet() {
        console.log(this.name);
       }
    };
}

const user1 = createUser("tapas", 39);
console.log(user1);

user1.greet();

const user2 = createUser("bob", 32);
console.log(user2);
```

### Explanation

প্রতিবার `createUser()` call করলে নতুন object return হয়।

```js
const user1 = createUser("tapas", 39);
const user2 = createUser("bob", 32);
```

`user1` এবং `user2` দুইটি আলাদা object।

### Factory function vs Constructor function

| বিষয় | Constructor Function | Factory Function |
|---|---|---|
| Function name convention | Capital letter, যেমন `Car` | normal function, যেমন `createUser` |
| Call করার নিয়ম | `new Car(...)` | `createUser(...)` |
| `this` ব্যবহার | common | optional |
| Return | implicitly new object | explicitly object return |
| `instanceof` custom type | কাজ করে | সাধারণভাবে কাজ করে না |
| Beginner-friendly | একটু careful হতে হয় | অনেক সময় সহজ |

### Common mistake

Factory function-কে `new` দিয়ে call করা:

```js
const user = new createUser("tapas", 39); // avoid
```

Factory function regular function হিসেবে call করাই clean:

```js
const user = createUser("tapas", 39);
```

### মনে রাখার নিয়ম

> Factory function = function object বানিয়ে return করে। `new` লাগে না।

---

## Object Property Shorthand

Factory function example-এ এই syntax ছিল:

```js
return {
   name,
   age
};
```

এটি shorthand।

Full version:

```js
return {
   name: name,
   age: age
};
```

যখন key name এবং variable/parameter name একই হয়, তখন shorthand ব্যবহার করা যায়।

### Example

```js
function createUser(name, age) {
  return {
    name,
    age
  };
}
```

এখানে:

```js
name
```

মানে:

```js
name: name
```

### Common mistake

যদি key আর variable name আলাদা হয়, shorthand কাজ করবে না।

```js
function createUser(userName, userAge) {
  return {
    name, // ভুল: name নামে variable নেই
    age  // ভুল: age নামে variable নেই
  };
}
```

সঠিক:

```js
function createUser(userName, userAge) {
  return {
    name: userName,
    age: userAge
  };
}
```

### মনে রাখার নিয়ম

> Key আর variable একই নাম হলে shorthand; আলাদা হলে `key: variable`.

---

## Object Methods এবং `this`-এর Basic ব্যবহার

Object-এর property value শুধু primitive value হতে হবে এমন নয়। Value হতে পারে:

- string
- number
- boolean
- array
- object
- function

Object-এর ভিতরে function থাকলে তাকে **method** বলা হয়।

```js
let profile = {
    name: "tapas",
    company: "CreoWis",
    message: function() {
        console.log(`${this.name} works at ${this.company}`);
    }
};

profile.message();
```

Output:

```txt
tapas works at CreoWis
```

### Explanation

`message` হলো `profile` object-এর method।

```js
message: function() {
    console.log(`${this.name} works at ${this.company}`);
}
```

এখানে `this.name` refers to `profile.name`, এবং `this.company` refers to `profile.company` যখন method টি `profile.message()` হিসেবে call করা হয়।

### Template Literal

```js
`${this.name} works at ${this.company}`
```

Backtick `` ` `` ব্যবহার করে string-এর ভিতরে dynamic value বসানো যায়।

### Common mistake

Function invoke না করা:

```js
profile.message; // শুধু function reference
```

সঠিক:

```js
profile.message(); // function execute
```

### মনে রাখার নিয়ম

> Object-এর ভিতরে function = method. Method run করতে `()` দিতে হবে।

---

## Nested Objects

Object-এর property value আরেকটি object হতে পারে। এটাকে nested object বলে।

```js
let profile = {
    name: "tapas",
    company: "CreoWis",
    address: {
        city: "Bangalore",
        pin: 56032,
        state: "Karnataka",
        country: "India",
        greeting: function() {
            console.log("Welcome to India");
        }
    }
};
```

এখানে `address` নিজেই একটি object।

### Nested property access

```js
console.log(profile.address.country); // India
profile.address.greeting();           // Welcome to India
```

### Explanation

Access path:

```txt
profile -> address -> country
```

মানে outer object থেকে inner object, তারপর inner property।

### Common mistake

Nested object না থাকলে direct access করলে error হতে পারে:

```js
console.log(profile.department.name); // Error if department undefined
```

এই problem solve করতে lesson-এর শেষে optional chaining শেখানো হয়েছে:

```js
console.log(profile.department?.name); // undefined, no crash
```

### মনে রাখার নিয়ম

> Object-এর ভিতরে object থাকলে dot chain দিয়ে ভিতরে যেতে হয়: `outer.inner.property`.

---

## Property Exists কিনা Check করা: `in` Operator

Object-এ property আছে কিনা check করার naive way:

```js
console.log(profile.salary); // undefined
```

তারপর:

```js
if (!profile.salary) {
    console.log("The salary property doesn't exist");
}
```

কিন্তু এই approach সবসময় safe নয়।

### সমস্যা কোথায়?

যদি property থাকে কিন্তু value `undefined` হয়?

```js
let profile = {
  salary: undefined
};

if (!profile.salary) {
  console.log("The salary property doesn't exist");
}
```

এখানে message print হবে, কিন্তু actually `salary` property আছে। শুধু value `undefined`।

### Correct way: `in` operator

```js
console.log("salary" in profile);
```

এটি check করে key আছে কিনা, value কী সেটা নয়।

### Example

```js
let profile = {
    name: "tapas",
    company: "CreoWis"
};

console.log(profile.salary);       // undefined
console.log("salary" in profile);  // false
```

### যদি property থাকে কিন্তু value undefined হয়

```js
let profile = {
  salary: undefined
};

console.log(profile.salary);      // undefined
console.log("salary" in profile); // true
```

### Common mistake

Value falsy হলেই property নেই ধরে নেওয়া:

```js
const user = {
  age: 0,
  isActive: false,
  salary: undefined
};

if (!user.age) {
  console.log("age নেই"); // ভুল conclusion
}
```

`age` আছে, value `0`। `0` falsy।

### মনে রাখার নিয়ম

> Property exists কিনা check করতে `"key" in object` ব্যবহার করো।

---

## Object Iterate করা: `for...in` এবং `Object.keys()`

Object-এর সব property একে একে access করতে loop দরকার।

---

### `for...in` Loop

```js
let profile = {
    name: "tapas",
    company: "CreoWis",
    message: function() {
        console.log(`${this.name} works at ${this.company}`);
    },
    address: {
        city: "Bangalore",
        pin: 56032,
        state: "Karnataka",
        country: "India"
    }
};

for (let key in profile) {
    console.log(key);
    console.log(profile[key]);
}
```

### Explanation

`for...in` object-এর keys iterate করে।

প্রতিটি iteration-এ `key` variable-এ key name আসে:

- `name`
- `company`
- `message`
- `address`

Value access করতে bracket notation ব্যবহার করা হয়েছে:

```js
profile[key]
```

কারণ `key` dynamic।

### Common mistake

```js
console.log(profile.key); // ভুল
```

এটি `key` নামে property খুঁজবে। কিন্তু variable `key`-এর value দিয়ে access করতে চাইলে:

```js
console.log(profile[key]); // সঠিক
```

---

### `Object.keys()`

```js
console.log(Object.keys(profile));
```

Output idea:

```js
["name", "company", "message", "address"]
```

`Object.keys()` object-এর own enumerable keys array হিসেবে return করে।

### `for...in` vs `Object.keys()`

| Feature | `for...in` | `Object.keys()` |
|---|---|---|
| কী return করে | Loop করে key দেয় | Array of keys return করে |
| Direct array methods | না | হ্যাঁ, যেমন `.map()`, `.forEach()` |
| Dynamic value access | `object[key]` | keys array loop করে `object[key]` |
| Beginner use | simple iteration | keys list দরকার হলে useful |

### মনে রাখার নিয়ম

> Object-এর সব key ঘুরতে চাইলে `for...in`; key array দরকার হলে `Object.keys()`।

---

## Object References: Object কেন Value দিয়ে Compare হয় না?

Object হলো **non-primitive data type**। JavaScript-এ object memory-তে reference হিসেবে store হয়।

```js
let fruit = { name: "mango" };
const oneMoreFruit = { name: "mango" };

console.log(fruit == oneMoreFruit);  // false
console.log(fruit === oneMoreFruit); // false
```

দুইটি object দেখতে একই হলেও memory location আলাদা।

### Mental model

```txt
fruit        -> memory address XA01 -> { name: "mango" }
oneMoreFruit -> memory address YB02 -> { name: "mango" }
```

Value একই, reference আলাদা। তাই comparison false।

---

### Same reference হলে true

```js
fruit = oneMoreFruit;

console.log(fruit == oneMoreFruit);  // true
console.log(fruit === oneMoreFruit); // true
```

এখন:

```txt
fruit        ┐
             ├──> same object { name: "mango" }
oneMoreFruit ┘
```

### Common mistake

Object-এর content same দেখেই equality true আশা করা:

```js
console.log({ a: 1 } === { a: 1 }); // false
```

এখানে দুইটি আলাদা object তৈরি হয়েছে।

### মনে রাখার নিয়ম

> Object compare হয় reference দিয়ে, value দিয়ে নয়।

---

## Object Static Methods

Static method মানে method সরাসরি `Object` constructor-এর উপর call হয়:

```js
Object.keys(obj)
Object.assign(target, source)
Object.entries(obj)
```

Object instance-এর উপর নয়:

```js
obj.keys(); // ভুল
```

---

## `Object.assign()`

`Object.assign()` source object-এর own properties target object-এ copy করে।

```js
const target = { p: 1, a: 2 };
const source = { a: 3, b: 5 };

const returnedObj = Object.assign(target, source);

console.log(returnedObj); // { p: 1, a: 3, b: 5 }
```

### Explanation

- `target` ছিল `{ p: 1, a: 2 }`
- `source` ছিল `{ a: 3, b: 5 }`
- `a` key দুই জায়গায় ছিল
- source-এর `a: 3` target-এর `a: 2` replace করেছে

### Important

`Object.assign(target, source)` target object mutate করে।

```js
console.log(target); // { p: 1, a: 3, b: 5 }
```

### Clone করতে empty object target হিসেবে ব্যবহার

```js
const obj = { name: "tapaScript" };
const obj2 = Object.assign({}, obj);

console.log(obj2);        // { name: "tapaScript" }
console.log(obj === obj2); // false
```

এখানে `obj2` নতুন object reference।

### Common mistake

ভাবা যে `Object.assign()` সবসময় deep clone করে। না, এটি shallow copy করে।

### মনে রাখার নিয়ম

> `Object.assign(target, source)` source থেকে target-এ copy করে; same key হলে source override করে।

---

## Shallow Copy vs Deep Copy

### Shallow Copy কী?

Shallow copy top-level property copy করে। কিন্তু nested object থাকলে nested object-এর reference copy হয়।

```js
const obj3 = {
    a: 1,
    b: { c: 2 }
};

const obj4 = Object.assign({}, obj3);

obj4.b.c = 3;

console.log(obj4.b.c); // 3
console.log(obj3.b.c); // 3
```

### কেন `obj3.b.c`-ও change হলো?

`obj4` নতুন object হলেও `b` nested object-এর reference same।

Mental model:

```txt
obj3.b ┐
       ├──> same nested object { c: 2 }
obj4.b ┘
```

তাই `obj4.b.c = 3` করলে same nested object change হয়।

---

### Top-level property আলাদা reference/value

```js
obj4.a = 100;

console.log(obj4.a); // 100
console.log(obj3.a); // 1
```

Top-level primitive property আলাদা হয়েছে। কিন্তু nested object same reference।

### Common mistake

Nested data আছে তবুও `Object.assign({}, obj)` দিয়ে safe clone ধরে নেওয়া।

### মনে রাখার নিয়ম

> Shallow copy nested object clone করে না; nested object-এর reference copy করে।

---

## `structuredClone()`

Deep cloning করার জন্য `structuredClone()` ব্যবহার করা যায়।

```js
const obj3 = {
    a: 1,
    b: { c: 2 }
};

const obj5 = structuredClone(obj3);

obj5.a = 300;
obj5.b.c = 30;

console.log(obj5.a);   // 300
console.log(obj3.a);   // 1

console.log(obj5.b.c); // 30
console.log(obj3.b.c); // 2
```

### Explanation

`structuredClone()` nested object-এর আলাদা copy তৈরি করে।

Mental model:

```txt
obj3.b -> nested object 1 { c: 2 }
obj5.b -> nested object 2 { c: 30 }
```

### কখন ব্যবহার করবে?

যখন object-এর ভিতরে nested object/array আছে এবং original object modify হওয়া উচিত নয়।

### Common mistake

`structuredClone()` সব data type clone করতে পারে না—যেমন function clone করা যায় না। তবে plain object, array, nested object-এর জন্য খুব useful।

### মনে রাখার নিয়ম

> Nested object safely clone করতে `structuredClone()`।

---

## `Object.entries()`

Object-কে array of key-value pairs-এ convert করে।

```js
const myObj = {
    a: "tapas",
    b: 32,
};

const myArr = Object.entries(myObj);

console.log(myArr);
```

Output:

```js
[
  ["a", "tapas"],
  ["b", 32]
]
```

### কেন দরকার?

অনেক সময় API থেকে object আসে, কিন্তু UI render করার জন্য array দরকার হয়। তখন `Object.entries()` useful।

### Example

```js
const user = {
  name: "tapas",
  age: 40
};

for (const [key, value] of Object.entries(user)) {
  console.log(key, value);
}
```

### Common mistake

`Object.entries()` object mutate করে না; নতুন array return করে।

### মনে রাখার নিয়ম

> Object থেকে array চাইলে `Object.entries()`।

---

## `Object.fromEntries()`

Array/Map-like key-value pairs থেকে object তৈরি করে।

```js
const entries = new Map([
    ["foo", "bar"],
    ["baz", 42],
]);

const objEntries = Object.fromEntries(entries);

console.log(objEntries);
```

Output:

```js
{
  foo: "bar",
  baz: 42
}
```

### Array example

```js
const pairs = [
  ["name", "tapas"],
  ["age", 40]
];

const user = Object.fromEntries(pairs);

console.log(user); // { name: "tapas", age: 40 }
```

### Common mistake

`Object.fromEntries()`-এর input হতে হবে key-value pair format:

```js
Object.fromEntries([
  ["name", "tapas"]
]);
```

এভাবে single values দিলে কাজ করবে না:

```js
Object.fromEntries(["name", "tapas"]); // ভুল
```

### মনে রাখার নিয়ম

> Array of pairs / Map থেকে object চাইলে `Object.fromEntries()`।

---

## `Object.freeze()`

`Object.freeze()` object-কে immutable করে দেয়। অর্থাৎ:

- existing property modify করা যাবে না
- new property add করা যাবে না
- existing property delete করা যাবে না

```js
const emp = {
    sal: 100
};

Object.freeze(emp);

emp.sal = 200;
emp.name = "Alex";
delete emp.sal;

console.log(emp); // { sal: 100 }

console.log(Object.isFrozen(emp)); // true
```

### Explanation

`emp` freeze হওয়ার পর:

```js
emp.sal = 200;  // কাজ করবে না
emp.name = "Alex"; // add হবে না
delete emp.sal; // delete হবে না
```

### Common mistake

`Object.freeze()` shallow freeze করে। Nested object থাকলে nested object আলাদাভাবে freeze না করলে ভিতরের value change হতে পারে।

```js
const user = {
  name: "tapas",
  address: {
    city: "Bangalore"
  }
};

Object.freeze(user);

user.address.city = "Delhi"; // nested object still mutable
```

### মনে রাখার নিয়ম

> Freeze করলে object-এর shape এবং existing values change করা যায় না।

---

## `Object.seal()`

`Object.seal()` object-এর shape lock করে দেয়। অর্থাৎ:

- new property add করা যাবে না
- existing property delete করা যাবে না
- কিন্তু existing property value modify করা যাবে

```js
const dept = {
    name: "finance"
};

Object.seal(dept);

dept.address = "Bangalore"; // add হবে না
delete dept.name;           // delete হবে না

dept.name = "HR";           // modify হবে

console.log(dept); // { name: "HR" }
```

### Freeze vs Seal

| Operation | `Object.freeze()` | `Object.seal()` |
|---|---:|---:|
| Existing property update | ❌ | ✅ |
| New property add | ❌ | ❌ |
| Existing property delete | ❌ | ❌ |
| Object shape lock | ✅ | ✅ |
| Value fully immutable | ✅ | ❌ |

### Common mistake

Seal মানে full immutable ভেবে নেওয়া। Seal value update allow করে।

### মনে রাখার নিয়ম

> Seal object-এর দরজা বন্ধ করে, কিন্তু ঘরের ভিতরের furniture rearrange করা যায়। Freeze করলে সবকিছু fixed।

---

## `Object.hasOwn()`

`Object.hasOwn()` check করে object-এর নিজস্ব property আছে কিনা।

```js
const dept = {
    name: "finance"
};

console.log(Object.hasOwn(dept, "name"));    // true
console.log(Object.hasOwn(dept, "address")); // false
```

Lesson code-এ seal করার পর `address` add হয়নি, তাই:

```js
console.log(Object.hasOwn(dept, "address")); // false
```

### `in` vs `Object.hasOwn()`

| Check | কী দেখে |
|---|---|
| `"key" in obj` | object বা prototype chain-এ key আছে কিনা |
| `Object.hasOwn(obj, "key")` | object-এর নিজস্ব property আছে কিনা |

এই lesson-এ prototype deep dive করা হয়নি, তাই beginner হিসেবে মনে রাখতে পারো:

> নিজের object-এ property আছে কিনা জানতে `Object.hasOwn()` খুব clean method।

### Common mistake

```js
dept.hasOwn("name"); // ভুল
```

সঠিক:

```js
Object.hasOwn(dept, "name");
```

### মনে রাখার নিয়ম

> Own property check করতে `Object.hasOwn(object, key)`।

---

# Object Destructuring

Object destructuring হলো object থেকে property value বের করে variable বানানোর shortcut syntax।

ভিডিওতে `student` object দিয়ে destructuring শেখানো হয়েছে।

```js
const student = {
    'name': 'John Williamson',
    'age': 9,
    'std': 3,
    'subjects': ['Maths', 'English', 'EVS'],
    'parents': {
      'father': 'Brown Williamson',
      'mother': 'Sophia',
      'email': 'john-parents@abcde.com'
    },
    'address': {
      'street': '65/2, brooklyn road',
      'city': 'Carterton',
      'country': 'New Zealand',
      'zip': 5791
    }
};
```

এই object-এ আছে:

| Property | Value Type |
|---|---|
| `name` | string |
| `age` | number |
| `std` | number |
| `subjects` | array |
| `parents` | nested object |
| `address` | nested object |

---

## Basic Destructuring

Without destructuring:

```js
const name = student.name;
const age = student.age;
```

With destructuring:

```js
const { name, age } = student;

console.log(name, age);
```

### Explanation

```js
const { name, age } = student;
```

JavaScript করে:

```js
const name = student.name;
const age = student.age;
```

### Common mistake

Variable name must match property name:

```js
const { studentName } = student;
console.log(studentName); // undefined
```

কারণ `student` object-এ `studentName` নামে property নেই।

সঠিক:

```js
const { name } = student;
```

অথবা alias:

```js
const { name: studentName } = student;
```

### মনে রাখার নিয়ম

> Destructuring-এ `{ propertyName }` দিলে একই নামে variable তৈরি হয়।

---

## Default Value

Object-এ property না থাকলে default value দেওয়া যায়।

```js
const { name, age, meal = "bread" } = student;

console.log(name, age, meal);
```

Output:

```txt
John Williamson 9 bread
```

কারণ `student` object-এ `meal` নেই। তাই default `"bread"` ব্যবহার হয়েছে।

### Without destructuring হলে

```js
const meal = student.meal ? student.meal : "bread";
```

Destructuring-এ একই কাজ এক লাইনে:

```js
const { meal = "bread" } = student;
```

### Important

Default value শুধুমাত্র property value `undefined` হলে apply হয়।

```js
const obj = {
  meal: null
};

const { meal = "bread" } = obj;

console.log(meal); // null
```

কারণ `meal` exists এবং value `null`। Default apply হয়নি।

### Common mistake

Default value সব falsy value-তে apply হবে ভাবা। না, `0`, `false`, `null`-এ default apply হয় না; মূলত `undefined` হলে default apply হয়।

### মনে রাখার নিয়ম

> Destructuring default value apply হয় যখন value `undefined`।

---

## Dynamic Default Value

Destructuring-এ এক variable থেকে আরেক variable-এর default value calculate করা যায়।

```js
const { subjects, numberOfSubjects = subjects.length } = student;

console.log(numberOfSubjects); // 3
```

### Explanation

- `subjects` destructure করে array পাওয়া হলো।
- `numberOfSubjects` object-এ নেই।
- তাই default value হিসেবে `subjects.length` calculate হলো।
- `subjects.length` হলো `3`.

### Common mistake

Order ভুল করা:

```js
const { numberOfSubjects = subjects.length, subjects } = student;
```

এখানে `subjects` তখনও initialize হয়নি, তাই error হতে পারে।

সঠিক:

```js
const { subjects, numberOfSubjects = subjects.length } = student;
```

### মনে রাখার নিয়ম

> যে variable দিয়ে default calculate করবে, সেটি আগে destructure করো।

---

## Alias / Rename Variable

Property name আর variable name একই রাখতে না চাইলে alias ব্যবহার করা যায়।

```js
const { std: standard } = student;

console.log(standard); // 3
```

### Explanation

`student.std` value নিয়ে `standard` নামে variable তৈরি হয়েছে।

Important: এখানে `std` নামে variable তৈরি হয়নি।

```js
console.log(std); // ReferenceError
```

### কেন alias দরকার?

- variable name conflict avoid করতে
- short key-কে readable variable বানাতে
- API response থেকে same property names এলে আলাদা নাম দিতে

Example:

```js
const graphqlResponse = { loading: true };
const restResponse = { loading: false };

const { loading: graphqlLoading } = graphqlResponse;
const { loading: restLoading } = restResponse;

console.log(graphqlLoading, restLoading);
```

### Common mistake

Alias syntax উল্টো বোঝা:

```js
const { standard: std } = student; // ভুল, যদি object-এ standard না থাকে
```

সঠিক:

```js
const { std: standard } = student;
```

### মনে রাখার নিয়ম

> `{ oldName: newName }` — left side object property, right side new variable।

---

## Nested Object Destructuring

Nested object থেকে direct value বের করতে nested destructuring ব্যবহার করা হয়।

```js
const { address: { zip } } = student;

console.log(zip); // 5791
```

### Explanation

Without destructuring:

```js
const address = student.address;
const zip = address.zip;
```

With nested destructuring:

```js
const { address: { zip } } = student;
```

### Important

এই syntax-এ `zip` variable তৈরি হয়, কিন্তু `address` variable তৈরি হয় না।

```js
console.log(zip);     // 5791
console.log(address); // ReferenceError
```

যদি `address` variable-ও দরকার হয়:

```js
const { address, address: { zip } } = student;

console.log(address);
console.log(zip);
```

### Common mistake

ভাবা যে `address` variable তৈরি হয়েছে। Nested destructuring-এ শুধু inner variable create হয়, যদি আলাদা করে `address` না নেওয়া হয়।

### মনে রাখার নিয়ম

> Nested destructuring-এ colon (`:`) দিয়ে ভিতরে ঢোকা হয়।

---

## Function Parameter Destructuring

Function-এর parameter level-এ destructuring করা যায়। এটি clean code লিখতে সাহায্য করে।

### Without destructuring

```js
function sendEmail(student) {
    console.log(`Sent an email to ${student.parents.email}`);
}

sendEmail(student);
```

### With parameter destructuring

```js
function sendEmail({ parents: { email } }) {
    console.log(`Sent an email to ${email}`);
}

sendEmail(student);
```

### Explanation

Function call-এ পুরো `student` object পাঠানো হচ্ছে:

```js
sendEmail(student);
```

কিন্তু function parameter-এ শুধু দরকারি value `parents.email` extract করা হচ্ছে:

```js
{ parents: { email } }
```

এখন function body-তে বারবার `student.parents.email` লিখতে হয় না।

### Common mistake

যদি `parents` না থাকে, error হতে পারে:

```js
sendEmail({ name: "John" }); // parents missing হলে error
```

Safe version optional/default দিয়ে করা যায়:

```js
function sendEmail({ parents: { email } = {} }) {
    console.log(`Sent an email to ${email}`);
}
```

আর modern safe access-এর জন্য optional chaining ব্যবহার করা যায়:

```js
function sendEmail(student) {
    console.log(`Sent an email to ${student.parents?.email}`);
}
```

### মনে রাখার নিয়ম

> Function যদি object নেয় কিন্তু object-এর কয়েকটা value-ই দরকার হয়, parameter destructuring ব্যবহার করো।

---

## Function Return Value Destructuring

কোনো function object return করলে, সেই return value সরাসরি destructure করা যায়।

```js
const getStudent = () => {
    return {
       'name': 'John Williamson',
        'age': 9,
        'std': 3,
        'subjects': ['Maths', 'English', 'EVS'],
        'parents': {
          'father': 'Brown Williamson',
          'mother': 'Sophia',
          'email': 'john-parents@abcde.com'
        },
        'address': {
          'street': '65/2, brooklyn road',
          'city': 'Carterton',
          'country': 'New Zealand',
          'zip': 5791
        }
    };
};

const { name: anotherName, subjects: anotherSubs } = getStudent();

console.log(anotherName, anotherSubs);
```

### Explanation

`getStudent()` একটি object return করে। সেই object থেকে:

- `name` নিয়ে `anotherName`
- `subjects` নিয়ে `anotherSubs`

variable তৈরি হয়েছে।

### কেন alias ব্যবহার হলো?

কারণ আগেই `name` বা `subjects` নামে variable থাকতে পারে। একই scope-এ আবার একই নামের `const` declare করলে error হবে।

### Common mistake

Function call না করে destructure করা:

```js
const { name } = getStudent; // ভুল
```

এখানে function object destructure হচ্ছে, return value নয়।

সঠিক:

```js
const { name } = getStudent();
```

### মনে রাখার নিয়ম

> Function-এর return object destructure করতে function call `()` করতে ভুলবে না।

---

## Destructuring in Loops

Array of objects iterate করার সময় প্রতিটি object থেকে value destructure করা যায়।

```js
const students = [
    {
        'name': 'William',
        'grade': 'A'
    },
    {
        'name': 'Tom',
        'grade': 'A+'
    },
    {
        'name': 'Bob',
        'grade': 'B'
    }
];

for (let { name, grade } of students) {
    console.log(name, grade);
}
```

Output:

```txt
William A
Tom A+
Bob B
```

### Explanation

`students` একটি array, যার প্রতিটি element একটি object।

`for...of` প্রতিটি object নেয়, আর loop variable জায়গাতেই destructure করে:

```js
let { name, grade }
```

তাই loop body-তে direct `name` এবং `grade` ব্যবহার করা যায়।

### Common mistake

Object-এর উপর `for...of` ব্যবহার করা:

```js
const student = { name: "John", grade: "A" };

for (let item of student) {
  // Error: object iterable নয়
}
```

Object-এর জন্য `for...in`, array-এর জন্য `for...of`।

### মনে রাখার নিয়ম

> Array of objects loop করলে `for...of` + destructuring খুব clean।

---

# Optional Chaining `?.`

Optional chaining হলো nested property safely access করার syntax।

```js
const employee = {
    salary: {
        bonus: 300
    }
};

console.log(employee.department); // undefined

const name = employee.department?.name;

console.log(name); // undefined
```

### Problem without optional chaining

```js
console.log(employee.department.name);
```

যদি `department` না থাকে, তাহলে:

```txt
TypeError: Cannot read properties of undefined
```

কারণ `employee.department` হলো `undefined`, আর `undefined.name` access করা যায় না।

### Optional chaining solution

```js
const name = employee.department?.name;
```

এখানে:

- `employee.department` যদি exists করে, তাহলে `.name` access করবে।
- যদি `employee.department` `null` বা `undefined` হয়, তাহলে পুরো expression `undefined` return করবে।
- Program crash করবে না।

### Old way

```js
const name = employee.department && employee.department.name;
```

Optional chaining এই কাজকে concise করে:

```js
const name = employee.department?.name;
```

### কখন optional chaining ব্যবহার করবে?

যখন nested object-এর কোনো অংশ missing হতে পারে:

```js
user.profile?.avatar
apiResponse.data?.items
student.parents?.email
employee.department?.name
```

### কখন optional chaining ব্যবহার না করাই ভালো?

যদি কোনো property অবশ্যই থাকা উচিত এবং missing হলে error জানা দরকার, তখন optional chaining দিয়ে error hide করা উচিত নয়।

Example:

```js
// যদি department অবশ্যই থাকতে হয়, তাহলে error জানাই ভালো
console.log(employee.department.name);
```

### Common mistake

Optional chaining overuse করা। সব জায়গায় `?.` দিলে real bug hide হতে পারে।

### মনে রাখার নিয়ম

> Missing nested property expected হলে `?.`; required property missing হলে error দেখতে দাও।

---

# Important Differences

## 1. Dot Notation vs Bracket Notation

| বিষয় | Dot Notation | Bracket Notation |
|---|---|---|
| Syntax | `obj.key` | `obj["key"]` |
| Dynamic key | ❌ | ✅ |
| Space/special character key | ❌ | ✅ |
| Readability | বেশি clean | flexible |
| Example | `user.age` | `user["movie lover"]` |

---

## 2. Constructor Function vs Factory Function

| বিষয় | Constructor Function | Factory Function |
|---|---|---|
| Example | `new Car("BMW", "X1")` | `createUser("tapas", 39)` |
| `new` keyword | লাগে | লাগে না |
| `this` | central concept | usually দরকার নেই |
| Return | new object implicit | object explicit return |
| Type checking | `instanceof Car` | সাধারণ object |
| Naming | `Car` | `createUser` |

---

## 3. `in` vs Direct Undefined Check

| Check | Problem | Better Use |
|---|---|---|
| `if (!obj.key)` | falsy value থাকলেও property নেই মনে হতে পারে | avoid for existence |
| `"key" in obj` | key exists কিনা check করে | property existence |
| `Object.hasOwn(obj, "key")` | own property check করে | own property verification |

---

## 4. `Object.freeze()` vs `Object.seal()`

| Operation | Freeze | Seal |
|---|---:|---:|
| Add property | ❌ | ❌ |
| Delete property | ❌ | ❌ |
| Modify existing value | ❌ | ✅ |
| Shape locked | ✅ | ✅ |
| Stronger immutability | ✅ | ❌ |

---

## 5. Shallow Copy vs Deep Copy

| বিষয় | Shallow Copy | Deep Copy |
|---|---|---|
| Top-level copy | ✅ | ✅ |
| Nested object copy | Reference copy | New nested copy |
| Method | `Object.assign({}, obj)` | `structuredClone(obj)` |
| Nested mutation affects original | ✅ হতে পারে | ❌ |
| Safe for nested data | ❌ | ✅ |

---

## 6. `for...in` vs `for...of`

| Loop | Used For | Example |
|---|---|---|
| `for...in` | object keys iterate | `for (let key in obj)` |
| `for...of` | iterable values, e.g. array | `for (let item of arr)` |

---

# Common Mistakes

## Mistake 1: Dynamic key access-এ dot notation ব্যবহার

```js
const someKey = "age";
console.log(user.someKey); // undefined
```

সঠিক:

```js
console.log(user[someKey]);
```

---

## Mistake 2: Special character key dot notation দিয়ে access করা

```js
user.movie lover; // Syntax error
```

সঠিক:

```js
user["movie lover"];
```

---

## Mistake 3: Object compare value দিয়ে হবে ভাবা

```js
console.log({ name: "mango" } === { name: "mango" }); // false
```

কারণ দুইটি আলাদা reference।

---

## Mistake 4: `Object.assign()` deep clone ভাবা

```js
const obj4 = Object.assign({}, obj3);
obj4.b.c = 3;
```

Nested object থাকলে original object-ও change হতে পারে।

---

## Mistake 5: Destructuring alias-এর পরে original name ব্যবহার

```js
const { std: standard } = student;

console.log(std); // ReferenceError
```

সঠিক:

```js
console.log(standard);
```

---

## Mistake 6: Nested destructuring-এ parent variable তৈরি হয়েছে ভাবা

```js
const { address: { zip } } = student;

console.log(address); // ReferenceError
```

যদি address-ও দরকার হয়:

```js
const { address, address: { zip } } = student;
```

---

## Mistake 7: Function return destructuring-এ function call না করা

```js
const { name } = getStudent; // ভুল
```

সঠিক:

```js
const { name } = getStudent();
```

---

## Mistake 8: Optional chaining দিয়ে real error hide করা

```js
const value = requiredConfig?.apiKey;
```

যদি `requiredConfig` অবশ্যই থাকা উচিত, তাহলে optional chaining না দিয়ে error detect করা ভালো।

---

# Complete Lesson Code Reference

নিচের code snippets এই lesson-এর core examples একসাথে দেখাচ্ছে।

---

## Object Destructuring Code

```js
console.log("Learn Object Destructuring....");

const student = {
    'name': 'John Williamson',
    'age': 9,
    'std': 3,
    'subjects': ['Maths', 'English', 'EVS'],
    'parents': {
      'father': 'Brown Williamson',
      'mother': 'Sophia',
      'email': 'john-parents@abcde.com'
    },
    'address': {
      'street': '65/2, brooklyn road',
      'city': 'Carterton',
      'country': 'New Zealand',
      'zip': 5791
    }
};

const {name, age, meal="bread"} = student;
console.log(name, age, meal);

const {subjects, numberOfSubjects = subjects.length} = student;
console.log(numberOfSubjects); // 3

const {std: standard} = student;
console.log(standard);

const {address: {zip}} = student;
console.log(zip);

function sendEmail({parents: {email}}) {
    console.log(`Sent an email to ${email}`);
}

sendEmail(student);

const getStudent = () => {
    return {
       'name': 'John Williamson',
        'age': 9,
        'std': 3,
        'subjects': ['Maths', 'English', 'EVS'],
        'parents': {
          'father': 'Brown Williamson',
          'mother': 'Sophia',
          'email': 'john-parents@abcde.com'
        },
        'address': {
          'street': '65/2, brooklyn road',
          'city': 'Carterton',
          'country': 'New Zealand',
          'zip': 5791
        }
    };
};

const {name: anotherName, subjects: anotherSubs} = getStudent();
console.log(anotherName, anotherSubs);

const students = [
    {
        'name': 'William',
        'grade': 'A'
    },
    {
        'name': 'Tom',
        'grade': 'A+'
    },
    {
        'name': 'Bob',
        'grade': 'B'
    }
];

for (let {name, grade} of students) {
    console.log(name, grade);
}
```

---

## Object Manipulation Code

```js
console.log("Day 12 - JavaScript Objects");

let user = {
    name: "tapas",
    age: 40,
    "is adimin": true
};

console.log(user.name); // "tapas"
console.log(user.age); // 40

user.isSeniorCitizen = false;
user["movie lover"] = true;

console.log(user);

console.log(user["is adimin"]);

user.age = 34;
user["movie lover"] = false;

// delete user["movie lover"];
// delete user.age;

console.log(user);

const someKey = "age";

console.log(user[someKey]); // 34
```

---

## Constructor Function

```js
function Car(name, model) {
    this.name = name;
    this.model = model;
}

const bmwCar = new Car("BMW", "X1");
const audiCar = new Car("Audi", "A8");

console.log(bmwCar);
console.log(audiCar);

console.log(bmwCar instanceof Car);
```

---

## Factory Function and Object Method

```js
function createUser(name, age) {
    return {
       name,
       age,
       greet() {
        console.log(this.name);
       }
    };
}

const user1 = createUser("tapas", 39);

console.log(user1);
user1.greet();

const user2 = createUser("bob", 32);
console.log(user2);
```

---

## Nested Object and Iteration

```js
let profile = {
    name: "tapas",
    company: "CreoWis",
    message: function() {
        console.log(`${this.name} works at ${this.company}`);
    },
    address: {
        city: "Bangalore",
        pin: 56032,
        state: "Karnataka",
        country: "India",
        greeting: function() {
            console.log("Welcome to India");
        }
    }
};

for (let key in profile) {
    console.log(key);
    console.log(profile[key]);
}

console.log(Object.keys(profile));

console.log(profile.salary); // undefined

console.log("salary" in profile);

if (!profile.salary) {
    console.log("The salary property doesn't exist");
}

console.log(profile.address.country); // India
profile.address.greeting();

console.log(profile.name);    // "tapas"
console.log(profile.company); // "CreoWis"

profile.message();
```

---

## Object Reference

```js
let fruit = { name: "mango" };
const oneMoreFruit = { name: "mango" };

console.log(fruit == oneMoreFruit);  // false
console.log(fruit === oneMoreFruit); // false

fruit = oneMoreFruit;

console.log(fruit == oneMoreFruit);  // true
console.log(fruit === oneMoreFruit); // true
```

---

## Static Methods

```js
const target = {p:1, a:2};
const source = {a:3, b:5};

const retrunedObj = Object.assign(target, source);
console.log(retrunedObj);

const obj = {name: "tapaScript"};
const obj2 = Object.assign({}, obj);

console.log(obj2);
console.log(obj === obj2);

const obj3 = {
    a: 1,
    b: {c: 2}
};

const obj4 = Object.assign({}, obj3);
console.log(obj4); // {a: 1, b: {c: 2}}

const obj5 = structuredClone(obj3);

obj5.a = 300;
obj5.b.c = 30;

console.log(obj5.a); // 300
console.log(obj3.a); // 1

console.log(obj5.b.c); // 30
console.log(obj3.b.c); // 2

const myObj = {
    a: "tapas",
    b: 32,
};

const myArr = Object.entries(myObj);
console.log(myArr);

const entries = new Map([
    ["foo", "bar"],
    ["baz", 42],
]);

const objEntries = Object.fromEntries(entries);
console.log(objEntries);

const emp = {
    sal: 100
};

Object.freeze(emp);

emp.sal = 200;
emp.name = "Alex";
delete emp.sal;

console.log(emp);

console.log(Object.isFrozen(emp));

const dept = {
    name: "finance"
};

Object.seal(dept);

dept.address = "Bangalore";
delete dept.name;

dept.name = "HR";

console.log(dept);

console.log(Object.hasOwn(dept, "address"));
```

---

## Optional Chaining

```js
console.log("Optional Chaining...");

const employee = {
    salary: {
        bonus: 300
    }
};

console.log(employee.department); // undefined

// console.log(employee.department.name); // Error

// const name = employee.department && employee.department.name;

const name = employee.department?.name;
console.log(name);
```

---

# Assignment

ভিডিওতে বলা হয়েছে task আলাদা `task.md` file-এ দেওয়া আছে এবং GitHub repository থেকে access করা যাবে। Transcript/code-এর ভিতরে exact assignment details নেই। তাই এখানে lesson-এর concepts অনুযায়ী revision-friendly practice assignment দেওয়া হলো।

## Assignment 1: User Profile Object

একটি `profile` object বানাও যেখানে থাকবে:

- `name`
- `age`
- `isStudent`
- `"favorite language"`
- `address` nested object: `city`, `country`, `zip`

তারপর:

1. dot notation দিয়ে `name` print করো।
2. bracket notation দিয়ে `"favorite language"` print করো।
3. `age` update করো।
4. নতুন property `isActive` add করো।
5. `zip` print করো।
6. `"salary"` property আছে কিনা `in` operator দিয়ে check করো।

---

## Assignment 2: Dynamic Key

```js
const key = "country";
```

এই `key` variable ব্যবহার করে `profile.address` থেকে country access করো।

Hint:

```js
profile.address[key]
```

---

## Assignment 3: Constructor Function

`Book` নামে constructor function বানাও:

Properties:

- `title`
- `author`
- `price`

তারপর:

```js
const book1 = new Book("JavaScript Basics", "Someone", 500);
```

`book1 instanceof Book` check করো।

---

## Assignment 4: Factory Function

`createProduct(name, price)` factory function বানাও, যেটি object return করবে:

```js
{
  name,
  price,
  showPrice() {
    console.log(...)
  }
}
```

তারপর দুইটি product বানিয়ে `showPrice()` call করো।

---

## Assignment 5: Object Copy

নিচের object clone করো:

```js
const original = {
  name: "Laptop",
  config: {
    ram: "16GB",
    storage: "512GB"
  }
};
```

1. `Object.assign()` দিয়ে clone করো এবং nested value update করে দেখো original change হয় কিনা।
2. `structuredClone()` দিয়ে clone করো এবং nested value update করে দেখো original safe থাকে কিনা।

---

## Assignment 6: Destructuring

নিচের object থেকে destructuring ব্যবহার করে value বের করো:

```js
const course = {
  title: "JavaScript",
  duration: "40 days",
  instructor: {
    name: "Tapas",
    channel: "tapaScript"
  },
  topics: ["Objects", "Destructuring", "Optional Chaining"]
};
```

Tasks:

1. `title` এবং `duration` destructure করো।
2. `topics` destructure করে `numberOfTopics = topics.length` বানাও।
3. `instructor.name` nested destructuring দিয়ে `instructorName` নামে alias করো।
4. missing property `level = "beginner"` default value দিয়ে destructure করো।

---

## Assignment 7: Optional Chaining

```js
const apiResponse = {
  data: {
    user: {
      name: "John"
    }
  }
};
```

এইগুলো safely access করো:

```js
apiResponse.data.user.name
apiResponse.data.user.profile.avatar
apiResponse.error.message
```

Expected: error throw না করে missing value-গুলো `undefined` হবে।

---

# Final Summary

এই lesson-এর মূল idea হলো: JavaScript object হলো structured data রাখার সবচেয়ে গুরুত্বপূর্ণ tool। Object key-value pair হিসেবে data store করে এবং real-world application-এ user, employee, company, product, API response—সবকিছু manage করতে object ব্যবহার করা হয়।

Object create করার সবচেয়ে common way হলো object literal syntax। Property access করতে dot notation এবং bracket notation ব্যবহার করা হয়। Key যদি normal হয়, dot notation clean; key যদি special character/dynamic হয়, bracket notation দরকার।

Object mutable, তাই property add, modify, delete করা যায়। Dynamic key access করতে `object[variable]` এবং dynamic key দিয়ে object create করতে computed property name `[variable]` ব্যবহার করা হয়।

Object create করার pattern হিসেবে constructor function, `new Object()`, factory function দেখা হয়েছে। Constructor function `new` keyword দিয়ে object instance তৈরি করে এবং `instanceof` দিয়ে type check করা যায়। Factory function সাধারণ function, যেটি object return করে।

Object-এর ভিতরে function থাকলে তাকে method বলা হয়। Nested object ব্যবহার করে complex data model তৈরি করা যায়। Property exists কিনা check করতে শুধু `obj.key` দেখে decision নেওয়া risky; `in` operator বা `Object.hasOwn()` বেশি reliable।

Object non-primitive data type, তাই object comparison reference দিয়ে হয়, value দিয়ে নয়। দেখতে একই object literal হলেও তারা আলাদা reference হলে `===` false হবে।

Static methods-এর মধ্যে `Object.assign()` source থেকে target-এ property copy করে, কিন্তু shallow copy করে। Nested object safely clone করতে `structuredClone()` ব্যবহার করা যায়। `Object.entries()` object-কে array of key-value pairs বানায়, আর `Object.fromEntries()` array/Map থেকে object বানায়। `Object.freeze()` object fully immutable করে, আর `Object.seal()` object-এর shape lock করে কিন্তু existing value update allow করে।

Object destructuring কম code লিখে object থেকে value বের করার powerful syntax। Basic destructuring, default value, dynamic default, alias, nested destructuring, function parameter destructuring, function return value destructuring, এবং loop destructuring real-world JavaScript-এ খুব useful।

Optional chaining `?.` nested property access করার সময় error avoid করে। কোনো property `null` বা `undefined` হলে program crash না করে `undefined` return করে। তবে যেখানে error জানা দরকার, সেখানে optional chaining অতিরিক্ত ব্যবহার করা উচিত নয়।

---

# Practice Checklist

নিচের checklist দিয়ে নিজের understanding verify করো।

## Object Basics

- [ ] Object কী এবং কেন দরকার বুঝি।
- [ ] Key-value pair mental model clear।
- [ ] Object literal syntax দিয়ে object বানাতে পারি।
- [ ] Dot notation দিয়ে normal property access করতে পারি।
- [ ] Bracket notation দিয়ে special character key access করতে পারি।
- [ ] Dynamic key access করতে `object[variable]` ব্যবহার করতে পারি।
- [ ] Computed property name `[variable]` দিয়ে dynamic key create করতে পারি।

## Object Manipulation

- [ ] Object-এ নতুন property add করতে পারি।
- [ ] Existing property update করতে পারি।
- [ ] `delete` দিয়ে property remove করতে পারি।
- [ ] `"key" in object` দিয়ে property exists কিনা check করতে পারি।
- [ ] `Object.hasOwn()` দিয়ে own property check করতে পারি।

## Object Creation Patterns

- [ ] Constructor function লিখতে পারি।
- [ ] Constructor function call করার সময় `new` ব্যবহার করি।
- [ ] `instanceof` কী check করে বুঝি।
- [ ] Factory function দিয়ে object return করতে পারি।
- [ ] Object property shorthand ব্যবহার করতে পারি।

## Methods and Nested Objects

- [ ] Object method কী বুঝি।
- [ ] Method call করতে `()` দিতে হয় জানি।
- [ ] Basic `this.name` usage বুঝি।
- [ ] Nested object থেকে value access করতে পারি।
- [ ] Nested method call করতে পারি।

## Iteration

- [ ] `for...in` দিয়ে object key iterate করতে পারি।
- [ ] Loop-এর dynamic key access করতে `object[key]` ব্যবহার করি।
- [ ] `Object.keys()` দিয়ে keys array পেতে পারি।
- [ ] Array of objects-এ `for...of` + destructuring ব্যবহার করতে পারি।

## References and Copy

- [ ] Object reference দিয়ে compare হয় বুঝি।
- [ ] Same value কিন্তু different reference হলে `===` false হবে বুঝি।
- [ ] Assignment করলে two variables same reference point করতে পারে বুঝি।
- [ ] `Object.assign()` shallow copy করে বুঝি।
- [ ] Nested object copy issue explain করতে পারি।
- [ ] `structuredClone()` দিয়ে deep clone করতে পারি।

## Static Methods

- [ ] `Object.assign()` merge/copy করতে পারি।
- [ ] `Object.entries()` object থেকে array বানাতে পারি।
- [ ] `Object.fromEntries()` array/Map থেকে object বানাতে পারি।
- [ ] `Object.freeze()` effect বুঝি।
- [ ] `Object.seal()` effect বুঝি।
- [ ] `freeze` vs `seal` difference বলতে পারি।

## Destructuring

- [ ] Basic object destructuring করতে পারি।
- [ ] Missing property-র জন্য default value দিতে পারি।
- [ ] Dynamic default value ব্যবহার করতে পারি।
- [ ] Alias syntax `{ oldName: newName }` বুঝি।
- [ ] Nested destructuring করতে পারি।
- [ ] Function parameter destructuring করতে পারি।
- [ ] Function return value destructuring করতে পারি।
- [ ] Loop destructuring করতে পারি।

## Optional Chaining

- [ ] `?.` syntax বুঝি।
- [ ] Missing nested property safely access করতে পারি।
- [ ] Optional chaining কখন ব্যবহার করা উচিত বুঝি।
- [ ] Optional chaining কখন avoid করা উচিত বুঝি।

---

## One-Line Memory Rules

- Object = key-value pair collection.
- Static key হলে `obj.key`, dynamic key হলে `obj[key]`.
- Special character key হলে bracket notation।
- Constructor function call করতে `new`।
- Factory function object return করে, `new` লাগে না।
- Object compare হয় reference দিয়ে।
- `Object.assign()` shallow copy।
- Nested clone দরকার হলে `structuredClone()`.
- Object থেকে array: `Object.entries()`.
- Array/Map থেকে object: `Object.fromEntries()`.
- `freeze` = add/delete/update বন্ধ।
- `seal` = add/delete বন্ধ, update allowed।
- Destructuring = object থেকে variable বের করার shortcut।
- Alias syntax: `{ oldName: newName }`.
- Optional chaining `?.` missing nested data-তে crash prevent করে।
