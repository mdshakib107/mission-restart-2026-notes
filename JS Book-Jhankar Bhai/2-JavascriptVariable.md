# ভেরিয়েবল, Console, String, Boolean ও JavaScript দিয়ে গণিত — গুরুত্বপূর্ণ নোট

---

# ভেরিয়েবল কী এবং কীভাবে কাজ করে

## ভেরিয়েবল কী?

Variable হলো এমন একটি জায়গা, যেখানে কোনো মান (Value) বা তথ্য (Data) রাখা যায়।

- সেই মান পরে দরকার হলে ব্যবহার করা যায়।
- Variable-এর মান পরিবর্তন হতে পারে।
- কোনো মান, যেটা পরিবর্তন হতে পারে বা vary করতে পারে, সেটাই Variable।

### সহজভাবে

Variable হলো data রাখার জন্য একটি নামযুক্ত container।

---

## বাস্তব উদাহরণ

বাসার কৌটায় যেমন চিনি, লবণ, ময়দা রাখা হয়, তেমনি Programming-এ Variable data সংরক্ষণ করে।

প্রতিটি কৌটার বাইরে নাম লিখে দিলে যেমন বোঝা যায় কোন কৌটায় কী আছে, তেমনি Variable-এর নাম দেখে বোঝা যায় সেখানে কী data রাখা আছে।

---

## কেন Variable-এর নাম দরকার?

শুধু `38` লিখলে বোঝা যায় না এটি কী।

এটি হতে পারে:

- বয়স
- ওজন
- টাকা
- বন্ধুর সংখ্যা

কিন্তু যদি লেখা হয়:

```javascript
const weight = 38;
```

তাহলে বোঝা যায় 38 হলো ওজন (weight)।

---

## Variable কোথায় থাকে?

Programming করার সময় Data কম্পিউটারের Memory-তে রাখা হয়।

সেই Data খুঁজে পাওয়ার জন্য Variable Name ব্যবহার করা হয়।

---

## Variable Declare করতে যা লাগে

একটি Variable Declare করতে সাধারণত ৫টি জিনিস লাগে।

### ১. const

Variable Declare করার জন্য ব্যবহার হয়।

### ২. Variable Name

কী Data রাখা হচ্ছে, তা বোঝায়।

### ৩. Equal Sign (=)

Value Assign করার জন্য ব্যবহার হয়।

### ৪. Value

Variable-এর মধ্যে রাখা মান।

### ৫. Semicolon (;)

Code Line শেষ হয়েছে তা বোঝায়।

JavaScript-এ এটি Optional।

---

## Variable-এর গঠন

```javascript
const name = value;
```

### উদাহরণ

```javascript
const weight = 38;
const price = 760;
const year = 1865;
const balance = 2000;
const age = 14;
```

---

## বামপাশ ও ডানপাশের অর্থ

```javascript
const weight = 38;
```

- `weight` → Variable Name
- `38` → Value
- `=` → Value Assign করা হচ্ছে

---

## মূল শিক্ষা

- Variable হলো Data রাখার নামযুক্ত Container।
- Variable Name দেখে বোঝা যায় কী Data রাখা হয়েছে।
- Data Store ও Reuse করার জন্য Variable খুব গুরুত্বপূর্ণ।

---

# পরীক্ষার জন্য গুরুত্বপূর্ণ প্রশ্ন

### Variable কী?

**উত্তর:** কোনো মান বা তথ্য রাখার নামযুক্ত জায়গা।

### Variable-এর মান কি পরিবর্তন হতে পারে?

**উত্তর:** হ্যাঁ।

### Variable-এর নাম কেন দরকার?

**উত্তর:** Data কী বোঝাচ্ছে তা বুঝতে।

### `const weight = 38;` এখানে Variable Name কোনটি?

**উত্তর:** `weight`

### `const weight = 38;` এখানে Value কোনটি?

**উত্তর:** `38`

### Equal Sign (=) কী কাজে লাগে?

**উত্তর:** Variable-এর মধ্যে Value Set করতে।

### Semicolon (;) কী বোঝায়?

**উত্তর:** একটি Code Line শেষ হয়েছে।

### JavaScript-এ Semicolon কি বাধ্যতামূলক?

**উত্তর:** না, Optional।

---

# Console ও console.log()

## Console কী?

Console হলো এমন একটি জায়গা, যেখানে Code-এর Output দেখা যায়।

JavaScript-এ Console সাধারণত Browser-এর ভিতরে থাকে।

---

## Console কেন দরকার?

- Code ঠিকমতো কাজ করছে কি না দেখতে।
- Variable-এর Value দেখতে।
- Output পরীক্ষা করতে।

---

## console.log() কী?

JavaScript-এ Output দেখানোর জন্য `console.log()` ব্যবহার করা হয়।

অনেক Programming Language-এ Output দেখানোকে Print বলা হয়।

---

## console.log() লেখার ধাপ

1. `console` লিখতে হবে।
2. Dot (`.`) দিতে হবে।
3. `log` লিখতে হবে।
4. Bracket `()` দিতে হবে।
5. Bracket-এর ভিতরে Value লিখতে হবে।

### গঠন

```javascript
console.log(value);
```

---

## সরাসরি Output দেখানো

```javascript
console.log(403);
```

### Output

```text
403
```

---

## Variable-এর মান Output দেখানো

```javascript
const money = 835;
console.log(money);
```

### Output

```text
835
```

---

## গুরুত্বপূর্ণ ব্যাখ্যা

```javascript
console.log(money);
```

এখানে:

- `console` → Output দেখানোর জায়গা
- `.` → Access Operator
- `log` → Output দেখানোর Command
- `money` → যে Variable-এর Value দেখতে চাই

---

## মূল শিক্ষা

- Console হলো Output দেখার জায়গা।
- `console.log()` দিয়ে JavaScript-এ Output দেখা যায়।
- Number ও Variable—দুইটাই Console-এ দেখা যায়।
- Code Test করার জন্য `console.log()` খুব দরকারি।

---

# পরীক্ষার জন্য গুরুত্বপূর্ণ প্রশ্ন

### Console কী?

**উত্তর:** Output দেখানোর জায়গা।

### JavaScript-এ Output দেখাতে কী ব্যবহার করা হয়?

**উত্তর:** `console.log()`

### `console.log(403);` এর Output কী?

**উত্তর:** `403`

### Variable-এর Value Console-এ দেখতে কী করতে হয়?

**উত্তর:**

```javascript
console.log(variableName);
```

### `const money = 835; console.log(money);` এর Output কী?

**উত্তর:** `835`

### console.log()-এর Bracket-এর ভিতরে কী লেখা হয়?

**উত্তর:** যে Value বা Variable Output হিসেবে দেখতে চাই।

### অনেক Programming Language-এ Output দেখানোকে কী বলা হয়?

**উত্তর:** Print করা।

---

# String ধরে মারো টান

## String কী?

String হলো এক বা একাধিক অক্ষর, শব্দ বা বাক্যের সমষ্টি।

যেসব তথ্য সংখ্যা দিয়ে প্রকাশ করা যায় না, সেগুলো সাধারণত String দিয়ে প্রকাশ করা হয়।

---

## String-এর উদাহরণ

- নাম
- ঠিকানা
- খাবারের নাম
- ফোনের ব্র্যান্ড
- প্রিয় রং
- সিনেমার নাম

---

## String Variable কীভাবে লেখা হয়?

String Value অবশ্যই Quotation-এর মধ্যে লিখতে হয়।

```javascript
const name = "sadaruddin";
const address = "anderkilla bandorban";
```

---

## Quotation ব্যবহার

দুইভাবে String লেখা যায়।

```javascript
const favFood = "Biryani";
const hidingPlace = "Bed er niche";
```

- Single Quotation `' '`
- Double Quotation `" "`

দুইটাই JavaScript-এ সঠিক।

---

## String কেন দরকার?

```javascript
const age = 20;
```

এখানে `age` হলো Number।

```javascript
const subject = "English";
```

এখানে `subject` হলো String।

---

## String-এর আরও উদাহরণ

```javascript
const drinking = "Tea";
const subject = "English";
const teacher = "Dragon Delwar";
const phone = "Samsung";
const fruit = "watermelon";
```

---

## String নামের ধারণা

String শব্দের অর্থ দড়ি বা সুতা।

একাধিক অক্ষর ধারাবাহিকভাবে যুক্ত থাকায় একে String বলা হয়।

---

## Console-এ String Output

```javascript
const name = "Rahim";
console.log(name);
```

### Output

```text
Rahim
```

---

## মূল শিক্ষা

- String হলো Text Data।
- String অবশ্যই Quotation-এর মধ্যে লিখতে হয়।
- নাম, ঠিকানা, খাবার, ফোন ব্র্যান্ড ইত্যাদি String দিয়ে প্রকাশ করা হয়।
- String Variable-ও `console.log()` দিয়ে Output দেখা যায়।

---

# পরীক্ষার জন্য গুরুত্বপূর্ণ প্রশ্ন

### String কী?

**উত্তর:** এক বা একাধিক অক্ষর, শব্দ বা বাক্যের সমষ্টি।

### String Value কীসের মধ্যে লিখতে হয়?

**উত্তর:** Quotation-এর মধ্যে।

### কোন Quotation ব্যবহার করা যায়?

**উত্তর:** Single (`' '`) বা Double (`" "`)

### `const name = "sadaruddin";` এখানে String Value কোনটি?

**উত্তর:** `"sadaruddin"`

### `const phone = "Samsung";` এখানে Variable Name কোনটি?

**উত্তর:** `phone`

### String Output দেখতে কী ব্যবহার করা হয়?

**উত্তর:** `console.log()`

### Number আর String-এর পার্থক্য কী?

**উত্তর:** Number সংখ্যা বোঝায়, String Text বোঝায়।

---

# কানামাছি true কানামাছি false

## Boolean কী?

Boolean হলো এমন Data Type যার মান শুধু দুই রকম হতে পারে।

- true
- false

---

## Boolean কখন ব্যবহার হয়?

যেসব প্রশ্নের উত্তর Yes/No হয়।

উদাহরণ:

- সে Single কি না?
- Homework শেষ হয়েছে কি না?
- Battery আছে কি না?
- Exam Pass করেছে কি না?

---

## true এবং false

- Yes → `true`
- No → `false`

উদাহরণ:

```javascript
const moneyMoved = true;
```

---

## Quotation ব্যবহার করা যাবে না

সঠিক:

```javascript
const learning = true;
```

ভুল:

```javascript
const learning = "true";
```

কারণ `"true"` হলো String, Boolean নয়।

---

## Boolean Variable-এর উদাহরণ

```javascript
const learning = true;
const isChilling = true;
const isHomeworkDone = false;
const isCrushReplied = false;
const hasPhoneBattery = false;
const singleForever = true;
const passed = false;
```

---

## Console-এ Boolean Output

```javascript
const isRich = true;
const passed = false;

console.log(isRich);
console.log(passed);
```

### Output

```text
true
false
```

---

## মূল শিক্ষা

- Boolean শুধু `true` বা `false` রাখে।
- Yes/No ধরনের তথ্য Boolean দিয়ে প্রকাশ করা হয়।
- `true` ও `false` Quotation ছাড়া লিখতে হয়।
- Boolean Value-ও Console-এ দেখা যায়।

---

# পরীক্ষার জন্য গুরুত্বপূর্ণ প্রশ্ন

### Boolean কী?

**উত্তর:** এমন Data Type যার মান true বা false হয়।

### Yes বোঝাতে কী লেখা হয়?

**উত্তর:** `true`

### No বোঝাতে কী লেখা হয়?

**উত্তর:** `false`

### true বা false কি Quotation-এর মধ্যে লিখতে হয়?

**উত্তর:** না।

### `"true"` আর `true` কি একই?

**উত্তর:** না। `"true"` String, `true` Boolean।

### `const passed = false;` এখানে Value কোনটি?

**উত্তর:** `false`

### Boolean কোন ধরনের প্রশ্নের জন্য ব্যবহার হয়?

**উত্তর:** Yes/No ধরনের প্রশ্ন।

---

# জাভাস্ক্রিপ্ট দিয়ে গণিত

## মূল ধারণা

JavaScript দিয়ে সহজেই গণিতের কাজ করা যায়।

---

## ১. যোগ (+)

```javascript
const eggPrice = 10;
const onionPrice = 20;

const total = eggPrice + onionPrice;

console.log(total);
```

### Output

```text
30
```

---

## ২. বিয়োগ (-)

```javascript
const eggPrice = 10;
const onionPrice = 20;

const result = eggPrice - onionPrice;

console.log(result);
```

### Output

```text
-10
```

---

## ৩. গুণ (\*)

```javascript
console.log(onionPrice * eggPrice);
```

### Output

```text
200
```

---

## ৪. ভাগ (/)

```javascript
console.log(onionPrice / eggPrice);
```

### Output

```text
2
```

আরও উদাহরণ:

```javascript
console.log(10 / 3);
```

### Output

```text
3.33333333
```

---

## ৫. ভাগশেষ (%)

```javascript
console.log(11 % 7);
console.log(10 % 3);
```

### Output

```text
4
1
```

---

## String যোগ করলে কী হয়?

```javascript
const first = "Mobarok";
const second = "Tobarok";

console.log(first + second);
```

### Output

```text
MobarokTobarok
```

---

## Number + String সমস্যা

```javascript
const sugar = 20;
const money = "20";

console.log(sugar + money);
```

### Output

```text
2020
```

---

## Variable-এর সাথে সরাসরি সংখ্যা ব্যবহার

```javascript
const price = 35;
const newPrice = price + 50;
const discountedPrice = newPrice - 10;

console.log(discountedPrice);
```

### Output

```text
75
```

---

## মূল শিক্ষা

- `+` → যোগ বা String Join
- `-` → বিয়োগ
- `*` → গুণ
- `/` → ভাগ
- `%` → ভাগশেষ
- String ও Number একসাথে যোগ করলে Unexpected Output আসতে পারে।
- Programming ভালো শিখতে হলে বেশি বেশি Practice করতে হবে।

---

# পরীক্ষার জন্য গুরুত্বপূর্ণ প্রশ্ন

### JavaScript-এ যোগ করার Operator কোনটি?

**উত্তর:** `+`

### JavaScript-এ গুণ করার Operator কোনটি?

**উত্তর:** `*`

### JavaScript-এ ভাগ করার Operator কোনটি?

**উত্তর:** `/`

### JavaScript-এ ভাগশেষ বের করার Operator কোনটি?

**উত্তর:** `%`

### `10 / 3` করলে কী ধরনের Output আসতে পারে?

**উত্তর:** দশমিকসহ Result।

### `10 % 3` এর Output কী?

**উত্তর:** `1`

### দুইটি String যোগ করলে কী হয়?

**উত্তর:** পাশাপাশি বসে যায়।

### `20 + "20"` এর Output কী হবে?

**উত্তর:** `2020`

### ছোট সংখ্যা থেকে বড় সংখ্যা বিয়োগ করলে Result কেমন হয়?

**উত্তর:** Negative হয়।

### Programming শেখার জন্য সবচেয়ে দরকারি কাজ কী?

**উত্তর:** বেশি বেশি Practice করা।
