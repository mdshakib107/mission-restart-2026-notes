# Type দেখে হাইপ, Let দিয়ে শুরু, Comments ও Variable Naming — গুরুত্বপূর্ণ নোট

---

# Type দেখে হাইপ

## typeof কী?

`typeof` ব্যবহার করে কোনো Variable-এর Data Type জানা যায়।

এটি Variable-এর Value দেখায় না, বরং Value-টি কোন ধরনের Data তা দেখায়।

---

## typeof ব্যবহার

```javascript
const passed = false;
console.log(typeof passed);
```

### Output

```text
boolean
```

---

## Data Type চেক করার উদাহরণ

```javascript
const country = "Bangladesh";
const passed = false;
const price = 555;

console.log(typeof country);
console.log(typeof passed);
console.log(typeof price);
```

### Output

```text
string
boolean
number
```

---

## JavaScript-এর গুরুত্বপূর্ণ Data Type

### ১. Number

সংখ্যা বোঝায়।

```javascript
const price = 555;
```

### Type

```text
number
```

---

### ২. String

Text বা লেখা বোঝায়।

```javascript
const country = "Bangladesh";
```

### Type

```text
string
```

---

### ৩. Boolean

`true` অথবা `false` বোঝায়।

```javascript
const learning = true;
```

### Type

```text
boolean
```

---

## মূল শিক্ষা

- `typeof` ব্যবহার করলে Variable-এর ধরন জানা যায়।
- Number, String ও Boolean হলো গুরুত্বপূর্ণ Basic Data Type।
- Practice করার সময় Type Check করা ভালো অভ্যাস।

---

# পরীক্ষার জন্য গুরুত্বপূর্ণ প্রশ্ন

| প্রশ্ন | উত্তর |
|---|---|
| typeof কী কাজে লাগে? | Variable-এর Data Type জানার জন্য। |
| typeof passed এর Output কী হবে, যদি passed = false হয়? | `boolean` |
| "Bangladesh" কোন Data Type? | `string` |
| 555 কোন Data Type? | `number` |
| true কোন Data Type? | `boolean` |
| console.log(typeof price); কী দেখায়? | price Variable-এর Data Type। |
| String Value কীসের মধ্যে থাকে? | Quotation-এর মধ্যে। |
| Boolean Value কী কী হতে পারে? | `true` অথবা `false`। |
# Let দিয়ে শুরু, বদলাবে গুরু

## মূল ধারণা

JavaScript-এ Variable Declare করার আগে ভাবতে হবে Value পরে Change হবে কি না।

- Change হবে না → `const`
- Change হতে পারে → `let`

---

## const কী?

`const` এসেছে **constant** শব্দ থেকে।

অর্থ: Fixed বা অপরিবর্তনীয়।

```javascript
const name = "Kala Mia";
name = "Lal Mia";
```

### Error

```text
Uncaught TypeError: Assignment to constant variable.
```

---

## let কী?

`let` দিয়ে Variable Declare করলে পরে Value পরিবর্তন করা যায়।

```javascript
let price = 35;
price = 45;

console.log(price);
```

### Output

```text
45
```

---

## Value Update করার নিয়ম

```javascript
let balance = 500;
balance = 400;

console.log(balance);
```

### Output

```text
400
```

---

## ব্যাখ্যা

- প্রথম লাইনে Variable Declare হয়েছে।
- দ্বিতীয় লাইনে আগের Value Update হয়েছে।

---

## গুরুত্বপূর্ণ নিয়ম

প্রথমবার Variable Declare করতে `let` লিখতে হবে।

```javascript
let age = 20;
age = 21;
```

সঠিক ✅

---

```javascript
let age = 20;
let age = 21;
```

ভুল ❌

---

## let বনাম const

| বিষয়         | let                 | const           |
| ------------ | ------------------- | --------------- |
| মান পরিবর্তন | করা যায়            | করা যায় না     |
| ব্যবহার      | Changeable Value    | Fixed Value     |
| উদাহরণ       | balance, price, age | name, birthYear |

---

## মূল শিক্ষা

- `let` দিলে Value Change হতে পারে।
- `const` দিলে Value Change করা যায় না।
- Changeable Value-এর জন্য `let` ব্যবহার করা উচিত।
- Fixed Value-এর জন্য `const` ব্যবহার করা উচিত।

---

# পরীক্ষার জন্য গুরুত্বপূর্ণ প্রশ্ন

| প্রশ্ন | উত্তর |
|---|---|
| let কী কাজে লাগে? | যে Variable-এর মান পরে Change হতে পারে, সেটি Declare করতে। |
| const কী বোঝায়? | Fixed বা Constant Value। |
| const Variable-এর Value Change করলে কী হয়? | Error হয়। |
| let price = 35; price = 45; এর Output কী? | `45` |
| Value Update করার সময় আবার let লিখতে হয়? | না। |
| Assignment to constant variable Error কখন হয়? | const Variable-এর Value Change করতে গেলে। |
| Changeable Value-এর জন্য কোন Keyword ব্যবহার করা হয়? | `let` |
| Fixed Value-এর জন্য কোন Keyword ব্যবহার করা হয়? | `const` |
# Comments (কমেন্টস)

## Comment কী?

Comment হলো কোডের মধ্যে লেখা অতিরিক্ত ব্যাখ্যা বা নোট।

- Comment কোনো Code নয়।
- Comment Execute হয় না।
- Comment কোনো Output দেয় না।
- Comment শুধু Code বুঝতে সাহায্য করে।

---

## কেন Comment ব্যবহার করা হয়?

- Code-এর উদ্দেশ্য বোঝাতে।
- জটিল Code ব্যাখ্যা করতে।
- ভবিষ্যতের জন্য নোট রাখতে।
- কোনো Code সাময়িকভাবে Disable করতে।

---

## Single Line Comment

```javascript
// make user admin
const userLevel = 4;
```

এখানে:

```javascript
// make user admin
```

একটি Comment।

---

## Comment দিয়ে Code বন্ধ করা

```javascript
const price = 100;

// price = 50;

console.log(price);
```

### Output

```text
100
```

কারণ:

```javascript
// price = 50;
```

লাইনটি Execute হয়নি।

---

## Multi-Line Comment (একাধিক //)

```javascript
// Total number of items in the shopping cart.
// User এখনও কোনো item যোগ করেনি.
// Item যোগ করলে এই সংখ্যা বাড়বে.

let totalItems = 0;
```

---

## Block Comment (/\* \*/)

```javascript
/*
This variable stores the maximum number of attempts.
User 3 বার login চেষ্টা করতে পারবে।
Limit পার হলে account lock হবে।
*/

let maxLoginAttempts = 3;
```

---

## Comment Syntax

### Single Line

```javascript
// Comment লিখুন
```

### Multi Line / Block Comment

```javascript
/*
Comment Line 1
Comment Line 2
Comment Line 3
*/
```

---

## মূল শিক্ষা

- Comment Code-এর অংশ নয়।
- Comment Execute হয় না।
- Comment Output দেয় না।
- Comment Code বুঝতে সাহায্য করে।

### Comment Types

- Single Line → `//`
- Block Comment → `/* */`

---

# পরীক্ষার জন্য গুরুত্বপূর্ণ প্রশ্ন

| প্রশ্ন | উত্তর |
|---|---|
| Comment কী? | কোডের মধ্যে লেখা ব্যাখ্যা বা নোট। |
| Comment কি Execute হয়? | না। |
| Comment কি Output দেয়? | না। |
| Single-Line Comment কীভাবে লেখা হয়? | // Comment |
| Multi-Line Comment কীভাবে লেখা হয়? | /*<br>Comment<br>*/ |
| Comment কেন ব্যবহার করা হয়? | Code বোঝার সুবিধার জন্য। |
| কোনো Code সাময়িকভাবে বন্ধ করতে কী ব্যবহার করা যায়? | Comment। |
| নিচের কোনটি Comment? | // User is admin<br><br>এটি একটি Single-Line Comment। |
| Comment কে দেখে? | Developer বা Programmer। |
| Comment-এর প্রধান সুবিধা কী? | Code সহজে বুঝতে ও Maintain করতে সাহায্য করে। |
# ভেরিয়েবলের নামকরণ (Variable Naming)

## মূল ধারণা

Variable-এর নাম ইচ্ছামতো দেওয়া যায় না।

- নামের সাথে Value বা কাজের মিল থাকা উচিত।
- ভালো নাম দিলে Code সহজে বোঝা যায়।

---

## Variable Name-এর নিয়ম

### ১. Reserved Keyword ব্যবহার করা যাবে না

ভুল ❌

```javascript
const false = 45;
const const = 50;
```

---

### ২. Space ব্যবহার করা যাবে না

ভুল ❌

```javascript
const is happy = false;
```

সঠিক ✅

```javascript
const isHappy = true;
```

---

### ৩. Quotation ব্যবহার করা যাবে না

ভুল ❌

```javascript
const "address" = "xyz";
```

---

### ৪. সংখ্যা দিয়ে শুরু করা যাবে না

ভুল ❌

```javascript
const 3money = 45;
```

সঠিক ✅

```javascript
const money3 = 45;
const mon3ey = 45;
```

---

### ৫. Variable Name Case-Sensitive

```javascript
const address = "xyz";
const Address = "abc";
const AddresS = "def";
```

এগুলো তিনটি আলাদা Variable।

---

### ৬. Camel Case ব্যবহার করা ভালো

Not Recommended:

```javascript
const mycurrenthomeaddress = "kana goli";
```

Avoid:

```javascript
const my_current_home_address = "kana goli";
```

Recommended:

```javascript
const myCurrentHomeAddress = "kana goli";
```

---

### ৭. Special Character ব্যবহার করা যাবে না

ভুল ❌

```javascript
const my@name = "Hanks";
const price#tag = 999;
```

সঠিক ✅

```javascript
const user$name = "Fahim";
const _secretCode = 12345;
```

---

## Reserved Word / Keyword কী?

JavaScript-এর কিছু শব্দ নির্দিষ্ট কাজের জন্য সংরক্ষিত থাকে।

এসব Variable Name হিসেবে ব্যবহার করা যায় না।

### উদাহরণ

- const
- let
- false
- true
- class

---

## মূল শিক্ষা

- Variable Name অর্থপূর্ণ হওয়া উচিত।
- Keyword Variable Name হিসেবে ব্যবহার করা যাবে না।
- Space, Quotation ও বেশিরভাগ Special Character ব্যবহার করা যাবে না।
- Number দিয়ে শুরু করা যাবে না।
- JavaScript Case-Sensitive।
- Camel Case ব্যবহার করা ভালো।

---

# পরীক্ষার জন্য গুরুত্বপূর্ণ প্রশ্ন

| প্রশ্ন | উত্তর |
|---|---|
| Variable Name-এ Space ব্যবহার করা যায়? | না। |
| Variable Name কি Number দিয়ে শুরু করা যায়? | না। |
| Variable Name কি Case-Sensitive? | হ্যাঁ। |
| city এবং City কি একই Variable? | না, আলাদা। |
| JavaScript-এ কোন Naming Style Recommended? | camelCase |
| Reserved Keyword Variable Name হিসেবে ব্যবহার করা যায়? | না। |
| Variable Name-এ কোন Special Character ব্যবহার করা যায়? | `_` এবং `$` |
| `const 3money = 45;` সঠিক নাকি ভুল? | ভুল। |
| `const money3 = 45;` সঠিক নাকি ভুল? | সঠিক। |
| ভালো Variable Name কেমন হওয়া উচিত? | অর্থপূর্ণ ও সহজে বোঝা যায় এমন। |
# Parse-এর ভিতর NaN — গুরুত্বপূর্ণ নোট

---

## মূল ধারণা

অনেক সময় Input থেকে আসা Number আসলে String হিসেবে আসে।

String Number সরাসরি যোগ করলে ভুল Output হতে পারে।

তাই String Number-কে আসল Number-এ Convert করতে হয়।

---

## String Number যোগের সমস্যা

```javascript
const fatherAge = "50";
const sonAge = "20";

const totalAge = fatherAge + sonAge;
console.log(totalAge);
```

### Output

```text
5020
```

### কারণ

- `"50"` এবং `"20"` দুটোই String।
- তাই যোগ না হয়ে পাশাপাশি বসে গেছে।

---

# parseInt() কী?

`parseInt()` String-কে Integer (পূর্ণসংখ্যা)-এ Convert করে।

### উদাহরণ

```javascript
const sugar = parseInt("20");

console.log(sugar);
```

### Output

```text
20
```

---

## Variable থেকে Number Convert

```javascript
const fatherAge = "50";
const fatherAgeNumber = parseInt(fatherAge);

console.log(fatherAgeNumber);
```

### Output

```text
50
```

---

# NaN কী?

**NaN** এর পূর্ণরূপ:

```text
Not A Number
```

যে Value-কে Number-এ Convert করা সম্ভব নয়, সেটিকে Convert করতে গেলে `NaN` পাওয়া যায়।

### উদাহরণ

```javascript
const input = "x20";
const num = parseInt(input);

console.log(num);
```

### Output

```text
NaN
```

---

# parseInt() কীভাবে কাজ করে?

### নিয়ম ১

String-এর শুরুতে Number থাকলে Number অংশটুকু নেয়।

### নিয়ম ২

String-এর শুরুতেই Letter থাকলে `NaN` দেয়।

---

## উদাহরণ

```javascript
const age = parseInt("50f");
const weight = parseInt("9twenty");
const address = parseInt("tom60");

console.log(age, weight, address);
```

### Output

```text
50 9 NaN
```

---

# Decimal Value ও parseInt()

```javascript
const sugar = parseInt("1.22222");

console.log(sugar);
```

### Output

```text
1
```

### ব্যাখ্যা

`parseInt()` Decimal-এর পরের অংশ বাদ দিয়ে শুধুমাত্র পূর্ণসংখ্যা নেয়।

---

# parseFloat() কী?

`parseFloat()` String-এর Decimal Number-কে Number-এ Convert করে।

### উদাহরণ

```javascript
const sugar = parseFloat("1.22222");

console.log(sugar);
```

### Output

```text
1.22222
```

---

## parseInt() বনাম parseFloat()

| Function     | কাজ                               |
| ------------ | --------------------------------- |
| parseInt()   | পূর্ণসংখ্যা (Integer) Convert করে |
| parseFloat() | Decimal Number Convert করে        |

### উদাহরণ

```javascript
parseInt("5.99"); // 5
parseFloat("5.99"); // 5.99
```

---

# toFixed() কী?

`toFixed()` ব্যবহার করে Decimal-এর পর কত ঘর দেখানো হবে তা নির্ধারণ করা যায়।

### উদাহরণ

```javascript
const first = 12.13568;
const second = 31.22564;

const total = first + second;

console.log(total.toFixed(2));
```

### Output

```text
43.36
```

---

## toFixed() কীভাবে কাজ করে?

```javascript
number.toFixed(n);
```

এখানে:

- `number` → যে Number Format করতে চাই
- `n` → Decimal-এর পরে কত ঘর দেখাতে চাই

---

### আরও উদাহরণ

```javascript
const price = 123.45678;

console.log(price.toFixed(1));
console.log(price.toFixed(2));
console.log(price.toFixed(3));
```

### Output

```text
123.5
123.46
123.457
```

---

# toFixed()-এর গুরুত্বপূর্ণ বিষয়

`toFixed()` Result-কে String বানিয়ে দেয়।

### উদাহরণ

```javascript
const total = 43.3567;

console.log(typeof total.toFixed(2));
```

### Output

```text
string
```

---

## String থেকে আবার Number বানানো

```javascript
const totalNumber = parseFloat(total.toFixed(2));

console.log(totalNumber);
```

### Output

```text
43.36
```

---

## বাস্তব উদাহরণ

```javascript
const productPrice = "120.75";
const shippingCost = "30.25";

const total = parseFloat(productPrice) + parseFloat(shippingCost);

console.log(total.toFixed(2));
```

### Output

```text
151.00
```

---

# মূল শিক্ষা

- String Number যোগ করলে ভুল Result আসতে পারে।
- `parseInt()` → String থেকে পূর্ণসংখ্যা বের করে।
- `parseFloat()` → String থেকে Decimal Number বের করে।
- `NaN` → Not A Number।
- `toFixed()` → Decimal-এর পর নির্দিষ্ট সংখ্যক ঘর দেখায়।
- `toFixed()` Result String Type হয়।
- Number হিসেবে ব্যবহার করতে চাইলে আবার `parseFloat()` করতে হয়।

---

# পরীক্ষার জন্য গুরুত্বপূর্ণ প্রশ্ন

| প্রশ্ন | উত্তর |
|---|---|
| NaN এর পূর্ণরূপ কী? | Not A Number |
| parseInt() কী করে? | String-কে Integer Number-এ Convert করে। |
| parseFloat() কী করে? | String-কে Decimal Number-এ Convert করে। |
| `"50" + "20"` এর Output কী হবে? | `5020` |
| parseInt("50f") এর Output কী? | `50` |
| parseInt("tom60") এর Output কী? | `NaN` |
| parseInt("1.22222") এর Output কী? | `1` |
| parseFloat("1.22222") এর Output কী? | `1.22222` |
| toFixed(2) কী করে? | Decimal-এর পরে ২ ঘর পর্যন্ত দেখায়। |
| toFixed() এর Output কোন Type হয়? | `string` |
| parseInt() এবং parseFloat() এর মধ্যে পার্থক্য কী? | `parseInt()` পূর্ণসংখ্যা নেয়, আর `parseFloat()` Decimal Number নেয়। |
| NaN কখন আসে? | যখন কোনো Value-কে Number-এ Convert করা সম্ভব হয় না। |
| Number হিসেবে ব্যবহার করতে চাইলে toFixed() এর Result-এর উপর কী করতে হবে? | `parseFloat()` ব্যবহার করতে হবে। |
