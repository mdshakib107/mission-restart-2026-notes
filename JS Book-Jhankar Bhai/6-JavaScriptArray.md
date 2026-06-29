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

| বিষয় | তথ্য |
|---|---|
| Array-এর Index 0 থেকে শুরু হয় | ✓ |
| প্রথম উপাদানের Index = 0 | ✓ |
| দ্বিতীয় উপাদানের Index = 1 | ✓ |
| Index দিয়ে মান বের করা যায় | ✓ |
| Index দিয়ে মান পরিবর্তন করা যায় | ✓ |
| অস্তিত্বহীন Index চাইলে Output = undefined | ✓ |
| push() = শেষে যোগ করে | ✓ |
| pop() = শেষ থেকে বাদ দেয় | ✓ |
| shift() = শুরু থেকে বাদ দেয় | ✓ |
| unshift() = শুরুতে যোগ করে | ✓ |
| includes() বলে: আছে নাকি নেই | ✓ |
| indexOf() বলে: থাকলে কোথায় আছে | ✓ |
| না থাকলে includes() → false | ✓ |
| না থাকলে indexOf() → -1 | ✓ |
| দুটোই case-sensitive | ✓ |

```javascript
numbers[2];
```

```javascript
numbers[2] = 50;
```

```javascript
arrayName[index];
```

```javascript
arrayName[index] = newValue;
```

```javascript
arrayName.push(value);
```

```javascript
const numbers = [12, 87, 98, 45];

numbers.push(44);

console.log(numbers);
```

```javascript
[12, 87, 98, 45, 44];
```

```javascript
numbers.push(44, 65, 98);
```

```javascript
arrayName.pop();
```

```javascript
const friends = ["balam", "kalam", "salam", "gelam"];

friends.pop();

console.log(friends);
```

```javascript
["balam", "kalam", "salam"];
```

```javascript
const lastFriend = friends.pop();
console.log(lastFriend);
```

```javascript
const friends = ["balam", "kalam", "salam"];

friends.shift();

console.log(friends);
```

```javascript
["kalam", "salam"];
```

```javascript
const teachers = ["Assistant sir", "Class sir", "PT Sir"];

teachers.unshift("Head sir");

console.log(teachers);
```

```javascript
["Head sir", "Assistant sir", "Class sir", "PT Sir"];
```

```javascript
const numbers = [10, 20, 30, 40, 50];

numbers.push(60);

console.log(numbers);
```

```javascript
const friends = ["সজিব", "সাগর", "সাকিব", "সোহেল"];

friends.push("সুমন");

console.log(friends);
```

```javascript
const games = ["Free Fire", "PUBG", "Candy Crush", "Temple Run"];

games.pop();

console.log(games);
```

```javascript
const numbers = [24, 36, 48, 60];

numbers.unshift(12);

console.log(numbers);
```

```javascript
const books = ["Book1", "Book2", "Book3", "Book4", "Book5"];

books.shift();

console.log(books);
```

```javascript
arrayName.includes(value);
```

```javascript
const friends = ["balam", "kalam", "salam", "gelam"];

console.log(friends.includes("gelam"));
```

```javascript
const friends = ["balam", "kalam", "salam", "gelam"];

console.log(friends.includes("khailam"));
```

```javascript
const fruits = ["আপেল", "কলা", "আম", "লিচু"];

if (fruits.includes("আম")) {
  console.log("আম আছে");
} else {
  console.log("আম নেই, গাছে উঠ");
}
```

```javascript
const friends = ["balam", "kalam", "salam", "gelam"];

console.log(friends.includes("Gelam"));
```

```javascript
arrayName.indexOf(value);
```

```javascript
const friends = ["balam", "kalam", "salam", "gelam"];

console.log(friends.indexOf("gelam"));
```

```javascript
const friends = ["balam", "kalam", "salam", "gelam"];

console.log(friends.indexOf("khailam"));
```

```javascript
const names = ["বাবুল", "আলিফ", "ছোটন"];

console.log(names.indexOf("বাবুল"));
```

```javascript
const friends = ["রিমন", "রিফাত", "রাজিব"];

console.log(friends.indexOf("রিফাত"));
```

```javascript
const cities = ["Dhaka", "Chittagong", "Sylhet", "rajshahi"];

console.log(cities.includes("RajShahi"));
```

```javascript
const weather = ["দীঘি", "মেঘ", "বৃষ্টি", "বর্ষা"];

if (weather.includes("বৃষ্টি")) {
  console.log("I need umbrella");
} else {
  console.log("No rain no pain");
}
```

```javascript
const sports = ["ফুটবল", "ক্রিকেট", "ভলিবল"];

console.log(sports.includes("ব্যাডমিন্টন"));
```
