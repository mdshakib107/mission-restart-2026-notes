# Array (অ্যারে) — গুরুত্বপূর্ণ নোট

## ১. Array কী?

Array হলো একটি ভেরিয়েবলের মধ্যে একাধিক মান (values) সংরক্ষণ করার পদ্ধতি।

- অনেকগুলো সম্পর্কিত ডাটা একসাথে রাখতে Array ব্যবহার করা হয়।
- আলাদা আলাদা ভেরিয়েবল তৈরির প্রয়োজন হয় না।

### উদাহরণ

```javascript
const numbers = [12, 22, 141, 121];
```

---

## ২. Array ডিক্লেয়ার করার নিয়ম

- একটি নাম দিতে হবে।
- Square Bracket `[ ]` ব্যবহার করতে হবে।
- মানগুলো কমা `,` দিয়ে আলাদা করতে হবে।
- শেষ উপাদানের পরে কমা দেওয়া লাগে না।

### উদাহরণ

```javascript
const fruits = ["Apple", "Banana", "Orange"];
```

---

## ৩. Array ব্যবহারের সুবিধা

- অনেক ডাটা একসাথে রাখা যায়।
- নতুন ডাটা যোগ করা সহজ।
- ডাটা পরিবর্তন বা ম্যানেজ করা সহজ।
- কোড ছোট ও গোছানো হয়।

### উদাহরণ

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
```

---

## ৪. Array-এ কী ধরনের ডাটা রাখা যায়?

### Number Array

```javascript
const marks = [82, 76, 54, 45];
```

### String Array

```javascript
const friends = ["abul", "babul", "cabul"];
```

### Boolean Array

```javascript
const passed = [true, false, true];
```

---

## ৫. Mixed Array (বিভিন্ন টাইপের ডাটা)

JavaScript-এ সম্ভব।

তবে সাধারণত একই টাইপের ডাটা রাখা ভালো।

```javascript
const mixedArray = [12, "Dim", true, 45.566];
```

---

# Array Length (দৈর্ঘ্য)

## ৬. Length কী?

Array-এর মধ্যে কয়টি উপাদান (element) আছে তা বোঝায়।

### উদাহরণ

```javascript
const numbers = [1, 5, 66, 11, 45];
```

এখানে Length = 5

---

## ৭. Length বের করার নিয়ম

```javascript
const numbers = [1, 5, 66, 11, 45];

const size = numbers.length;

console.log(size);
```

### Output

```text
5
```

---

# পরীক্ষার জন্য গুরুত্বপূর্ণ কোড

## 71 থেকে 79 পর্যন্ত সংখ্যা

```javascript
const numbers = [71, 72, 73, 74, 75, 76, 77, 78, 79];
```

---

## ৫টি ফল

```javascript
const fruits = ["Apple", "Banana", "Orange", "Mango", "Guava"];
```

---

## ১০টি সবজি ও Length

```javascript
const vegetables = [
  "Potato",
  "Onion",
  "Brinjal",
  "Radish",
  "Carrot",
  "Tomato",
  "Okra",
  "Bottle Gourd",
  "Cucumber",
  "Pointed Gourd",
];

console.log(vegetables.length);
```

---

## ৫টি প্রিয় সিনেমা

```javascript
const movies = ["Movie1", "Movie2", "Movie3", "Movie4", "Movie5"];
```

---

## 11-30 এর মধ্যে বিজোড় সংখ্যা

```javascript
const oddNumbers = [11, 13, 15, 17, 19, 21, 23, 25, 27, 29];
```

---

# মনে রাখার মতো বিষয়

✅ Array = এক ভেরিয়েবলে অনেক মান

✅ Square Bracket `[ ]` ব্যবহার হয়

✅ মানগুলো `,` দিয়ে আলাদা করা হয়

✅ `arrayName.length` দিয়ে উপাদান সংখ্যা জানা যায়

✅ একই ধরনের ডাটা রাখা উত্তম

✅ Number, String, Boolean সব ধরনের Array বানানো যায়

---

## শর্ট নোট

**Array = Collection of multiple values in a single variable.**

**Length = Number of elements in an array.**

---

# Array Index — গুরুত্বপূর্ণ নোট

## ১. Index কী?

Array-এর প্রতিটি উপাদানের একটি পজিশন নম্বর থাকে।

এই পজিশন নম্বরকে Index বলা হয়।

Array-এর Index `0` থেকে শুরু হয় (Zero-based indexing)।

### উদাহরণ

```javascript
const numbers = [3, 5, 66, 11, 45];
```

| Index | Value |
| ----- | ----- |
| 0     | 3     |
| 1     | 5     |
| 2     | 66    |
| 3     | 11    |
| 4     | 45    |

---

## ২. নির্দিষ্ট Index-এর মান বের করা

### সিনট্যাক্স

```javascript
arrayName[index];
```

### উদাহরণ

```javascript
const numbers = [10, 25, 26, 31, 42, 84, 38, 12, 1];

console.log(numbers[0]);
console.log(numbers[3]);
```

### Output

```text
10
31
```

---

## ৩. Index-এর মান ভেরিয়েবলে রাখা

```javascript
const numbers = [10, 25, 26, 31, 42];

const value = numbers[4];

console.log(value);
```

### Output

```text
42
```

---

## ৪. Invalid Index দিলে কী হবে?

যদি এমন Index দেওয়া হয় যেখানে কোনো উপাদান নেই,

তাহলে Output হবে `undefined`

### উদাহরণ

```javascript
const numbers = [10, 25, 26, 31, 42];

console.log(numbers[14]);
```

### Output

```text
undefined
```

---

## ৫. Index-এর মান পরিবর্তন (Update)

### সিনট্যাক্স

```javascript
arrayName[index] = newValue;
```

### উদাহরণ

```javascript
const numbers = [10, 25, 26, 31, 42];

numbers[4] = 100;

console.log(numbers);
```

### Output

```javascript
[10, 25, 26, 31, 100];
```

---

# পরীক্ষার জন্য গুরুত্বপূর্ণ বিষয়

✅ Array-এর Index 0 থেকে শুরু হয়

✅ প্রথম উপাদানের Index = 0

✅ দ্বিতীয় উপাদানের Index = 1

✅ Index দিয়ে মান বের করা যায়

```javascript
numbers[2];
```

✅ Index দিয়ে মান পরিবর্তন করা যায়

```javascript
numbers[2] = 50;
```

✅ অস্তিত্বহীন Index চাইলে Output = undefined

---

## শর্ট নোট

**Index = Array-এর উপাদানের অবস্থান নম্বর**

### Formula

```javascript
arrayName[index];
```

### Update

```javascript
arrayName[index] = newValue;
```

### মনে রাখো

👉 Array-এর প্রথম উপাদানের Index সবসময় 0।

👉 Index ছাড়া Array-এর নির্দিষ্ট উপাদান অ্যাক্সেস করা যায় না।

---

# Array Methods: push, pop, shift, unshift — গুরুত্বপূর্ণ নোট

## ১. Array পরিবর্তন করা যায়

- Array-তে নতুন উপাদান যোগ করা যায়।
- Array থেকে উপাদান বাদ দেওয়া যায়।
- এই কাজগুলো করার জন্য কিছু method ব্যবহার করা হয়।

---

## ২. push()

### কাজ

Array-এর শেষে নতুন উপাদান যোগ করে।

### Syntax

```javascript
arrayName.push(value);
```

### Example

```javascript
const numbers = [12, 87, 98, 45];

numbers.push(44);

console.log(numbers);
```

### Output

```javascript
[12, 87, 98, 45, 44];
```

### একাধিক উপাদান যোগ করা

```javascript
numbers.push(44, 65, 98);
```

---

## ৩. pop()

### কাজ

Array-এর শেষের উপাদান বাদ দেয়।

### Syntax

```javascript
arrayName.pop();
```

### Example

```javascript
const friends = ["balam", "kalam", "salam", "gelam"];

friends.pop();

console.log(friends);
```

### Output

```javascript
["balam", "kalam", "salam"];
```

### pop করা মান ভেরিয়েবলে রাখা যায়

```javascript
const lastFriend = friends.pop();
console.log(lastFriend);
```

---

## ৪. shift()

### কাজ

Array-এর প্রথম উপাদান বাদ দেয়।

### Example

```javascript
const friends = ["balam", "kalam", "salam"];

friends.shift();

console.log(friends);
```

### Output

```javascript
["kalam", "salam"];
```

---

## ৫. unshift()

### কাজ

Array-এর শুরুতে নতুন উপাদান যোগ করে।

### Example

```javascript
const teachers = ["Assistant sir", "Class sir", "PT Sir"];

teachers.unshift("Head sir");

console.log(teachers);
```

### Output

```javascript
["Head sir", "Assistant sir", "Class sir", "PT Sir"];
```

---

## এক নজরে মনে রাখার টেবিল

| Method    | কাজ     | কোথায় কাজ করে |
| --------- | ------- | ------------- |
| push()    | যোগ করে | শেষে          |
| pop()     | বাদ দেয় | শেষে          |
| shift()   | বাদ দেয় | শুরুতে        |
| unshift() | যোগ করে | শুরুতে        |

---

# পরীক্ষার জন্য গুরুত্বপূর্ণ কোড

## Array-এর শেষে 60 যোগ

```javascript
const numbers = [10, 20, 30, 40, 50];

numbers.push(60);

console.log(numbers);
```

---

## শেষে নতুন বন্ধু যোগ

```javascript
const friends = ["সজিব", "সাগর", "সাকিব", "সোহেল"];

friends.push("সুমন");

console.log(friends);
```

---

## শেষের গেম বাদ

```javascript
const games = ["Free Fire", "PUBG", "Candy Crush", "Temple Run"];

games.pop();

console.log(games);
```

---

## শুরুতে 12 যোগ

```javascript
const numbers = [24, 36, 48, 60];

numbers.unshift(12);

console.log(numbers);
```

---

## প্রথম বই বাদ

```javascript
const books = ["Book1", "Book2", "Book3", "Book4", "Book5"];

books.shift();

console.log(books);
```

---

## শর্ট নোট

✅ push() = শেষে যোগ করে

✅ pop() = শেষ থেকে বাদ দেয়

✅ shift() = শুরু থেকে বাদ দেয়

✅ unshift() = শুরুতে যোগ করে

### Main idea

Array-এর শুরু বা শেষ থেকে উপাদান যোগ/বাদ দিতে এই method গুলো ব্যবহার করা হয়।

---

# includes() এবং indexOf() — গুরুত্বপূর্ণ নোট

## ১. includes() কী?

Array-এর মধ্যে কোনো উপাদান আছে কি না, সেটা চেক করতে `includes()` ব্যবহার হয়।

- উপাদান থাকলে `true` দেয়।
- উপাদান না থাকলে `false` দেয়।

### Syntax

```javascript
arrayName.includes(value);
```

### Example

```javascript
const friends = ["balam", "kalam", "salam", "gelam"];

console.log(friends.includes("gelam"));
```

### Output

```text
true
```

---

## ২. includes() না থাকলে false দেয়

```javascript
const friends = ["balam", "kalam", "salam", "gelam"];

console.log(friends.includes("khailam"));
```

### Output

```text
false
```

---

## ৩. includes() if-else এ ব্যবহার

```javascript
const fruits = ["আপেল", "কলা", "আম", "লিচু"];

if (fruits.includes("আম")) {
  console.log("আম আছে");
} else {
  console.log("আম নেই, গাছে উঠ");
}
```

---

## ৪. includes() case-sensitive

বড় হাতের ও ছোট হাতের অক্ষর আলাদা ধরা হয়।

তাই `'gelam'` এবং `'Gelam'` এক নয়।

```javascript
const friends = ["balam", "kalam", "salam", "gelam"];

console.log(friends.includes("Gelam"));
```

### Output

```text
false
```

---

## ৫. indexOf() কী?

Array-এর মধ্যে কোনো উপাদান কোথায় আছে, তার index number বের করতে `indexOf()` ব্যবহার হয়।

- উপাদান থাকলে তার index দেয়।
- উপাদান না থাকলে `-1` দেয়।

### Syntax

```javascript
arrayName.indexOf(value);
```

### Example

```javascript
const friends = ["balam", "kalam", "salam", "gelam"];

console.log(friends.indexOf("gelam"));
```

### Output

```text
3
```

---

## ৬. indexOf() না থাকলে -1 দেয়

```javascript
const friends = ["balam", "kalam", "salam", "gelam"];

console.log(friends.indexOf("khailam"));
```

### Output

```text
-1
```

---

## includes() বনাম indexOf()

| Method     | কাজ                      | Return করে        |
| ---------- | ------------------------ | ----------------- |
| includes() | উপাদান আছে কি না চেক করে | true / false      |
| indexOf()  | উপাদানের index বের করে   | index number / -1 |

---

# Practice থেকে গুরুত্বপূর্ণ কোড

## বাবুলের index

```javascript
const names = ["বাবুল", "আলিফ", "ছোটন"];

console.log(names.indexOf("বাবুল"));
```

### Output

```text
0
```

---

## রিফাতের index

```javascript
const friends = ["রিমন", "রিফাত", "রাজিব"];

console.log(friends.indexOf("রিফাত"));
```

### Output

```text
1
```

---

## Case-sensitive check

```javascript
const cities = ["Dhaka", "Chittagong", "Sylhet", "rajshahi"];

console.log(cities.includes("RajShahi"));
```

### Output

```text
false
```

---

## বৃষ্টি আছে কি না

```javascript
const weather = ["দীঘি", "মেঘ", "বৃষ্টি", "বর্ষা"];

if (weather.includes("বৃষ্টি")) {
  console.log("I need umbrella");
} else {
  console.log("No rain no pain");
}
```

---

## ব্যাডমিন্টন আছে কি না

```javascript
const sports = ["ফুটবল", "ক্রিকেট", "ভলিবল"];

console.log(sports.includes("ব্যাডমিন্টন"));
```

### Output

```text
false
```

---

# শর্ট নোট

✅ includes() বলে: আছে নাকি নেই

✅ indexOf() বলে: থাকলে কোথায় আছে

✅ না থাকলে includes() → false

✅ না থাকলে indexOf() → -1

✅ দুটোই case-sensitive

---

## মনে রাখার টেকনিক

**includes() = Yes/No answer**

**indexOf() = Position answer**
