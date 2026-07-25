# TypeScript: Type Assertion, Interface ও Generics

এই অধ্যায়সমূহে আমরা ধারাবাহিকভাবে তিনটি গুরুত্বপূর্ণ TypeScript concept শিখব:

1. `Type Assertion`
2. `Interface`
3. `Generics`

প্রতিটি অংশে lecture-এর মূল teaching flow, analogy, code walkthrough, warning, recap এবং পরবর্তী lesson-এর সংযোগ বজায় রাখা হয়েছে।

---

# অধ্যায় ১: Type Assertion

## ১.১ শুরু করার আগে: “তুমি কি আমার থেকে বেশি বোঝ?”

ডেভেলপারস, জীবনের কোনো কোনো সময়ে আমরা এমন একটি কথা বলি:

> “তুমি কি আমার থেকে বেশি বোঝ?”

এই কথাটির concept যদি তুমি ভালোভাবে ধরতে পারো, তাহলে TypeScript-এর `Type Assertion`-ও সহজে বুঝতে পারবে।

কোনো কোনো পরিস্থিতিতে TypeScript একটি value-এর type সম্পর্কে যতটা জানে, developer হিসেবে আমরা তার চেয়ে বেশি জানি। যখন আমরা নিশ্চিতভাবে TypeScript-কে বলি—“এই value-এর প্রকৃত type আমি জানি”—তখন সেটিই `Type Assertion`।

সহজভাবে বললে:

> **TypeScript-এর চেয়ে যখন আমরা কোনো value-এর type সম্পর্কে ভালোভাবে ও নিশ্চিতভাবে জানি, তখন TypeScript-কে সেই নির্দিষ্ট type বিশ্বাস করানোর প্রক্রিয়াই Type Assertion।**

এক্ষেত্রে TypeScript developer-এর কথাকে বিশ্বাস করে এবং developer যে type বলে দেয়, সেটিকেই সঠিক ধরে নেয়।

এখন কথা না বাড়িয়ে example দিয়ে concept-টি ভেঙে ভেঙে বোঝা যাক।

---

## ১.২ `any` type-এর value-তে TypeScript কেন suggestion দেয় না?

ধরো, আমাদের `anything` নামে একটি variable আছে। এর type আমরা `any` দিয়ে define করেছি।

```ts
let anything: any;
```

যেহেতু variable-টির type `any`, TypeScript জানে না এর মধ্যে শেষ পর্যন্ত কী ধরনের value রাখা হবে। এটি `string`, `number`, `boolean`, `object`—যেকোনো কিছু হতে পারে।

এখন যদি আমরা লিখি:

```ts
anything.
```

তাহলে editor নির্দিষ্ট কোনো type-এর method বা property suggest করতে পারবে না। কারণ TypeScript জানে না `anything` আসলে কোন type-এর value hold করছে।

যদি এটি `string` হতো, তাহলে `string`-এর methodগুলো suggest করা যেত। যদি এটি `number` হতো, তাহলে `number`-এর methodগুলো suggest করা যেত। কিন্তু `any` হওয়ায় TypeScript কোনো নির্দিষ্ট সিদ্ধান্ত নিতে পারছে না।

---

## ১.৩ Developer যখন নিশ্চিত যে value-টি `number`

এখন আমরা `anything`-এর মধ্যে একটি number রাখি:

```ts
let anything: any;

anything = 222;
```

Developer হিসেবে আমরা জানি, এই মুহূর্তে `anything` একটি `number` hold করছে। কিন্তু variable-টির declared type যেহেতু `any`, TypeScript এখনো এটিকে নির্দিষ্টভাবে `number` হিসেবে ধরছে না।

এক্ষেত্রে আমরা TypeScript-কে বলতে পারি:

```ts
anything as number;
```

আর method বা property access করার সময় সাধারণত assertion-টিকে parenthesis-এর মধ্যে রাখা হয়:

```ts
(anything as number).toFixed();
```

এখন editor `number` type-এর জন্য available method ও property suggest করবে। কারণ আমরা TypeScript-কে নিশ্চিতভাবে বলে দিয়েছি যে এই জায়গায় `anything`-কে `number` হিসেবে ধরতে হবে।

এই syntax-এ:

```ts
value as Type
```

- `value` হলো যে value-টির type আমরা নিশ্চিত করছি।
- `as` হলো Type Assertion syntax-এর অংশ।
- `Type` হলো আমরা যে নির্দিষ্ট type TypeScript-কে বিশ্বাস করতে বলছি।

---

## ১.৪ একই variable যখন `string` hold করে

এবার ধরো, `anything` number নয়; বরং একটি string hold করছে।

```ts
let anything: any;

anything = "My name";
```

Developer হিসেবে আমরা জানি, এই মুহূর্তে value-টি একটি `string`। তাই আমরা লিখতে পারি:

```ts
anything as string;
```

Assertion-টিকে parenthesis-এর মধ্যে লিখতে পারি:

```ts
(anything as string);
```

এখন এই expression-এর পরে dot (`.`) লিখলে editor `string`-এর available method এবং property suggest করবে।

এখানে মূল বিষয়টি হলো—TypeScript নিজে নিশ্চিত ছিল না, কিন্তু developer হিসেবে আমরা value-টির type নিশ্চিতভাবে জানতাম। তাই `Type Assertion` ব্যবহার করে TypeScript-কে নির্দিষ্ট type জানিয়ে দিলাম।

---

## ১.৫ Type Assertion ও Type Narrowing

এই ধরনের কাজকে অনেক সময় `type narrowing`-ও বলা হয়। কারণ একটি broad বা অনির্দিষ্ট type-কে আমরা আরও নির্দিষ্ট type-এ নিয়ে আসি।

উদাহরণ হিসেবে, একটি value-এর possible type যদি হয়:

```ts
string | number | undefined
```

এবং developer হিসেবে আমরা কোনো নির্দিষ্ট call-এর ক্ষেত্রে নিশ্চিত হই যে result অবশ্যই `number`, তাহলে assertion-এর মাধ্যমে possible তিনটি type থেকে একটিতে narrow করতে পারি।

এখন একটি বাস্তব example দেখা যাক।

---


### Technical Note

Lecture flow-এ `Type Assertion`-কে type narrow করার একটি উপায় হিসেবে ব্যাখ্যা করা হয়েছে। ব্যবহারিক ফলাফলে asserted expression একটি নির্দিষ্ট type হিসেবে দেখা যায়। তবে TypeScript-এর formal terminology-তে `Type Assertion` এবং control-flow-based `Type Narrowing` এক জিনিস নয়। Assertion-এ developer compiler-কে একটি type বিশ্বাস করায়; narrowing-এ TypeScript condition বা control flow বিশ্লেষণ করে নিজে type ছোট করে। মূল translation-এ Instructor-এর ব্যাখ্যাই বজায় রাখা হয়েছে।

## ১.৬ Example: Kilogram থেকে Gram Converter

ধরো, আমরা একটি function বানাব, যা kilogram-কে gram-এ convert করবে।

Function-টির নাম:

```ts
kgToGram
```

আমাদের প্রয়োজন হলো:

- Input যদি `number` হয়, function একটি `number` return করবে।
- Input যদি `string` হয়, function একটি formatted `string` return করবে।

অর্থাৎ function-টি `number` অথবা `string`—দুই ধরনের input নিতে পারবে।

### Function signature

```ts
function kgToGram(input: string | number): string | number | undefined {
  // logic
}
```

এখানে:

- `input` হতে পারে `string` অথবা `number`।
- Return type হতে পারে `string`, `number` অথবা `undefined`।
- যদি কোনো branch থেকে কিছু return না হয়, JavaScript স্বাভাবিকভাবে `undefined` return করে। সেই কারণেই inferred return type-এ `undefined` আসতে পারে।

এখন logic লিখি।

---

## ১.৭ Input `number` হলে

প্রথমে আমরা `typeof` দিয়ে check করব input একটি `number` কি না।

```ts
if (typeof input === "number") {
  return input * 1000;
}
```

কারণ:

```text
1 kilogram = 1000 gram
```

তাই input number হলে তাকে `1000` দিয়ে multiply করলেই gram পাওয়া যাবে।

---

## ১.৮ Input `string` হলে

এবার user string আকারে input দিতে পারে। যেমন:

```ts
"2 kg"
```

এক্ষেত্রে আমরা string-টিকে space দিয়ে split করতে পারি।

```ts
const [value] = input.split(" ");
```

`split(" ")` করার পরে একটি array পাওয়া যাবে। উদাহরণ:

```ts
"2 kg".split(" ");
```

Expected result:

```ts
["2", "kg"]
```

Array destructuring-এর মাধ্যমে প্রথম value-টি নিলে:

```ts
const [value] = input.split(" ");
```

এখানে `value` হবে:

```ts
"2"
```

কিন্তু মনে রাখতে হবে, এটি এখনো একটি `string`। তাই calculation করার আগে এটিকে `number`-এ convert করতে হবে।

```ts
Number(value)
```

এরপর `1000` দিয়ে multiply করলে gram পাওয়া যাবে।

```ts
Number(value) * 1000
```

আমরা formatted string return করতে পারি:

```ts
return `The converted output is ${Number(value) * 1000}`;
```

---

## ১.৯ সম্পূর্ণ `kgToGram` function

```ts
function kgToGram(
  input: string | number
): string | number | undefined {
  if (typeof input === "number") {
    return input * 1000;
  }

  if (typeof input === "string") {
    const [value] = input.split(" ");

    return `The converted output is ${Number(value) * 1000}`;
  }
}
```

এখানে function-এর behavior দুই ধরনের:

1. `number` input → `number` output
2. `string` input → `string` output

এখন function call করি।

```ts
const result1 = kgToGram(2);
const result2 = kgToGram("2 kg");
```

Expected output:

```ts
console.log(result1);
// 2000

console.log(result2);
// The converted output is 2000
```

### কেন এই output হবে?

`kgToGram(2)` call-এ input একটি `number`। তাই প্রথম `if` block execute হবে:

```ts
return input * 1000;
```

অর্থাৎ:

```ts
2 * 1000 = 2000
```

অন্যদিকে, `kgToGram("2 kg")` call-এ input একটি `string`। তাই দ্বিতীয় `if` block execute হবে।

```ts
const [value] = "2 kg".split(" ");
```

এখানে `value` হবে `"2"`। এরপর:

```ts
Number("2") * 1000
```

ফলে result হবে `2000`, এবং template literal-এর কারণে final return value হবে একটি string:

```text
The converted output is 2000
```

---

## ১.১০ সমস্যা: Function call-এর result type অনেক broad

এখন `result1`-এর ওপর mouse hover করলে TypeScript বলতে পারে:

```ts
string | number | undefined
```

কারণ function-এর declared return type এটিই।

কিন্তু developer হিসেবে আমরা জানি:

```ts
kgToGram(2)
```

এখানে input number পাঠানো হয়েছে। Function-এর logic অনুযায়ী number input হলে number-ই return হবে।

তাই আমরা assertion ব্যবহার করতে পারি:

```ts
const result1 = kgToGram(2) as number;
```

এখন `result1`-এর type হবে:

```ts
number
```

Editor-এ লিখলে:

```ts
result1.
```

`number`-এর available methodগুলো suggest করা হবে।

একইভাবে, string input-এর ক্ষেত্রে আমরা জানি return value string হবে:

```ts
const result2 = kgToGram("2 kg") as string;
```

এখন `result2`-এর type হবে:

```ts
string
```

এবং:

```ts
result2.
```

লিখলে `string`-এর available method ও property suggest করা হবে।

---

## ১.১১ এখানে narrowing কীভাবে ঘটল?

Assertion দেওয়ার আগে:

```ts
const result1 = kgToGram(2);
```

Possible type ছিল:

```ts
string | number | undefined
```

Assertion দেওয়ার পরে:

```ts
const result1 = kgToGram(2) as number;
```

Type narrow হয়ে দাঁড়াল:

```ts
number
```

অর্থাৎ আমরা তিনটি possible type থেকে একটিমাত্র type-এ নিয়ে এলাম।

TypeScript এখানে আমাদের কথাকে বিশ্বাস করেছে:

> “Developer যখন বলছে এটি `number`, তাহলে এটিকে `number` হিসেবেই ধরা হবে।”

---

## ১.১২ গুরুত্বপূর্ণ সতর্কতা: নিশ্চিত না হলে Type Assertion ব্যবহার করবে না

এখানেই সবচেয়ে গুরুত্বপূর্ণ warning।

> **শুধু তখনই Type Assertion ব্যবহার করবে, যখন তুমি value-টির type সম্পর্কে নিশ্চিত।**

Type Assertion runtime-এ value-কে সত্যিকারের অন্য type-এ convert করে না। এটি শুধু TypeScript compiler-কে একটি নির্দিষ্ট type বিশ্বাস করতে বলে।

ধরো:

```ts
let anything: any = "My name";
```

এটি বাস্তবে একটি `string`।

কিন্তু আমরা ভুলভাবে বললাম:

```ts
const value = anything as number;
```

TypeScript developer-এর কথাকে বিশ্বাস করে `value`-কে `number` হিসেবে ধরতে পারে। ফলে editor `number`-এর methodও suggest করতে পারে।

```ts
(value as number);
```

কিন্তু runtime-এ original value এখনো string। Number-specific method ব্যবহার করতে গেলে runtime error হতে পারে।

### Common Mistake

```ts
let anything: any = "My name";

const value = anything as number;
```

এখানে assertion লিখলেই `"My name"` number হয়ে যায়নি।

`Type Assertion` হলো type conversion নয়।

ভুল assertion-এর কারণে TypeScript-এর type safety দুর্বল হয়ে যেতে পারে। তাই assertion ব্যবহার করার আগে নিশ্চিত হতে হবে যে runtime value সত্যিই asserted type-এর সঙ্গে মিলছে।

---

## ১.১৩ Tricky Case: `try...catch` block-এর error

আমরা অনেক সময় code-এ লিখি:

```ts
try {
  // risky operation
} catch (error) {
  // handle error
}
```

সাধারণভাবে error object-এর মধ্যে আমরা একটি `message` property পেয়ে থাকি।

তাই আমরা লিখতে চাইতে পারি:

```ts
try {
  // risky operation
} catch (error) {
  console.log(error.message);
}
```

কিন্তু TypeScript প্রশ্ন করতে পারে:

> “`message` property কোথা থেকে এলো? `error`-এর type সম্পর্কে তুমি নিশ্চিত কীভাবে?”

এক্ষেত্রে আমরা একটি custom type define করতে পারি।

```ts
type CustomError = {
  message: string;
};
```

এখন যদি আমরা নিশ্চিত থাকি যে caught error object-এর মধ্যে অবশ্যই `message` property আছে, তাহলে assertion ব্যবহার করতে পারি:

```ts
try {
  // risky operation
} catch (error) {
  console.log((error as CustomError).message);
}
```

এখানে আমরা TypeScript-কে বলছি:

> “এই `error` value-টির type আমি জানি। এটি `CustomError` type-এর, এবং এর মধ্যে `message` নামে একটি string property আছে।”

এরপর editor `message` property suggest করবে।

### সম্পূর্ণ pattern

```ts
type CustomError = {
  message: string;
};

try {
  // এমন code, যেখানে error হতে পারে
} catch (error) {
  console.log((error as CustomError).message);
}
```

এখানে মূল বিষয় output নয়; মূল বিষয় হলো `error`-এর মধ্যে `message` property আছে বলে নিশ্চিত হলে সেটিকে `CustomError` হিসেবে assert করা।

---

## ১.১৪ Third-party library-এর ক্ষেত্রে Type Assertion

কখনো কোনো third-party library ব্যবহার করতে হতে পারে, কিন্তু library-টির type support অসম্পূর্ণ হতে পারে অথবা TypeScript নির্দিষ্ট return value সম্পর্কে যথেষ্ট তথ্য নাও জানতে পারে।

এমন পরিস্থিতিতে developer হিসেবে যদি আমরা API বা returned value-এর structure সম্পর্কে নিশ্চিত থাকি, তখন Type Assertion ব্যবহার করা যেতে পারে।

তবে একই warning এখানে প্রযোজ্য:

> Type information না থাকলেই আন্দাজ করে assertion ব্যবহার করা যাবে না। Runtime value-এর structure সম্পর্কে নিশ্চিত হতে হবে।

---


## ১.১৫ এই অধ্যায়ের Recap

এই অধ্যায়ে আমরা দেখলাম:

- `Type Assertion` মানে developer-এর নির্দিষ্ট type knowledge TypeScript-কে জানানো।
- `any` type-এর value-তে TypeScript নির্দিষ্ট method suggest করতে পারে না।
- `as number` বা `as string` ব্যবহার করে type নির্দিষ্ট করা যায়।
- Broad union type থেকে নির্দিষ্ট type-এ আসাকে narrowing হিসেবে দেখা যায়।
- `kgToGram` function-এর result-কে call অনুযায়ী `number` বা `string` হিসেবে assert করা যায়।
- `try...catch`-এর error object-এ custom error type assertion ব্যবহার করা যায়।
- নিশ্চিত না হলে Type Assertion ব্যবহার করা উচিত নয়।
- Type Assertion runtime conversion নয়।

---

## ১.১৬ Final Recap

`Type Assertion` হলো TypeScript-কে বলা—“এই জায়গায় value-টির type আমি নিশ্চিতভাবে জানি।” এটি type narrow করতে এবং editor support পেতে সাহায্য করে, কিন্তু value-কে runtime-এ convert করে না। তাই assertion কেবল নিশ্চিত তথ্যের ভিত্তিতে ব্যবহার করতে হবে।

পরবর্তী অধ্যায়ে আমরা `Type Alias`-এর কাছাকাছি আরেকটি গুরুত্বপূর্ণ concept—`Interface`—দেখব।

---

# অধ্যায় ২: Type Interface

## ২.১ Type Alias-এর “জাতভাই”

হ্যালো ডেভেলপারস। এই অধ্যায়ে আমরা `Type Alias`-এর মতো দেখতে এবং কাছাকাছি কাজে ব্যবহৃত আরেকটি TypeScript feature দেখব। সেটি হলো `Interface`।

আমরা object type define করার জন্য `Type Alias` ব্যবহার করতে পারি। একই ধরনের কাজে `Interface`-ও ব্যবহার করা যায়। তবে দুইটির মধ্যে কিছু পার্থক্য আছে, আর সেই পার্থক্যগুলো বুঝলে কখন কোনটি ব্যবহার করা সুবিধাজনক হবে তা পরিষ্কার হয়ে যাবে।

`Interface` বোঝার আগে পরিচিত `Type Alias` example দিয়ে শুরু করি।

---

## ২.২ Type Alias দিয়ে object type define করা

ধরো, আমাদের একটি user object আছে। একটি user-এর মধ্যে থাকতে পারে:

- `name`
- `age`

আমরা `User` নামে একটি type define করতে পারি।

```ts
type User = {
  name: string;
  age: number;
};
```

Convention অনুযায়ী type-এর নাম সাধারণত capital letter দিয়ে শুরু করা হয়।

এখন এই type ব্যবহার করে একটি object তৈরি করি:

```ts
const user1: User = {
  name: "Mr. X",
  age: 100,
};
```

একই type reuse করে আরেকটি object define করা যায়:

```ts
const user2: User = {
  name: "Mr. Y",
  age: 50,
};
```

এখানে `User` type নিশ্চিত করছে যে প্রতিটি object-এর মধ্যে:

```ts
name: string
age: number
```

থাকতেই হবে।

এটি আমরা আগের lesson থেকে জানি।

---

## ২.৩ Intersection Type দিয়ে type বাড়ানো

আমরা `Intersection Type`-ও আগে দেখেছি।

Intersection-এর কাজ হলো একাধিক type-কে একত্র করে নতুন type তৈরি করা।

ধরো, `Role` নামে আরেকটি type আছে:

```ts
type Role = {
  role: "admin" | "user";
};
```

এখন আমরা চাই `User` এবং `Role`—দুই type-এর property নিয়ে একটি নতুন type তৈরি করতে।

```ts
type UserWithRole = User & Role;
```

এখানে `&` হলো intersection operator।

নতুন `UserWithRole` type-এর মধ্যে থাকবে:

```ts
name: string
age: number
role: "admin" | "user"
```

এখন যদি আমরা এই type ব্যবহার করি:

```ts
const user3: UserWithRole = {
  name: "Mr. Z",
  age: 30,
};
```

TypeScript error দেবে, কারণ `role` property missing।

Error-এর অর্থ হবে প্রায় এমন:

```text
Property 'role' is missing.
```

সঠিক object হবে:

```ts
const user3: UserWithRole = {
  name: "Mr. Z",
  age: 30,
  role: "admin",
};
```

এখানে intersection-এর মাধ্যমে `User` type-এর সঙ্গে `role` property যুক্ত হয়েছে।

---

## ২.৪ একই object type `Interface` দিয়ে লেখা

এখন `User` type-টিকেই `Interface` দিয়ে লিখি।

Type Alias-এর সময় আমরা লিখি:

```ts
type User = {
  name: string;
  age: number;
};
```

Interface-এর ক্ষেত্রে লিখব:

```ts
interface IUser {
  name: string;
  age: number;
}
```

এখানে কয়েকটি বিষয় খেয়াল করো:

1. `type` keyword-এর বদলে `interface` keyword ব্যবহৃত হয়েছে।
2. বোঝার সুবিধার্থে নামের আগে `I` ব্যবহার করা হয়েছে: `IUser`।
3. `=` sign ব্যবহার করা হয়নি।
4. সরাসরি curly braces-এর মধ্যে property define করা হয়েছে।

`I` prefix বাধ্যতামূলক নয়। এখানে এটি শুধু interface সহজে চিনতে ব্যবহৃত হয়েছে।

এখন `IUser`-কে object-এর type হিসেবে ব্যবহার করা যায়:

```ts
const user4: IUser = {
  name: "Mr. A",
  age: 25,
};
```

Object type define করার এই সাধারণ ক্ষেত্রে `Type Alias` ও `Interface` প্রায় একই কাজ করছে।

---

## ২.৫ Type Alias ও Interface-এর প্রথম গুরুত্বপূর্ণ পার্থক্য

এখন প্রশ্ন হলো:

> Type Alias এবং Interface যদি একই ধরনের object type define করতে পারে, তাহলে পার্থক্য কোথায়?

প্রথম বড় পার্থক্য হলো—`Type Alias` primitive type-এর ক্ষেত্রেও ব্যবহার করা যায়, কিন্তু `Interface` সরাসরি primitive type alias করতে পারে না।

ধরো, আমরা `boolean`-এর জন্য একটি custom type name বানাতে চাই।

```ts
type IsAdmin = boolean;
```

এখন:

```ts
const isAdmin: IsAdmin = false;
```

এটি valid।

আমরা চাইলে লিখতে পারি:

```ts
const anotherAdmin: IsAdmin = true;
```

কারণ `IsAdmin` আসলে `boolean` type-এর alias।

কিন্তু একই কাজ Interface দিয়ে এভাবে করা যাবে না:

```ts
interface IsAdmin = boolean;
```

এটি valid syntax নয়।

কেন?

কারণ Interface declaration সরাসরি object-like shape define করে:

```ts
interface Something {
  // members
}
```

এটি `=` sign দিয়ে primitive type-এর alias তৈরি করে না।

---

## ২.৬ Interface কোন ধরনের data-এর সঙ্গে কাজ করে?

এই lesson-এর framing অনুযায়ী, Interface মূলত object-type structure-এর সঙ্গে কাজ করে।

JavaScript-এ কয়েকটি বিষয় object-like:

- সাধারণ `object`
- `array`
- `function`

Array একটি বিশেষ ধরনের object। Function-ও JavaScript-এ একটি বিশেষ ধরনের object।

তাই আমরা Interface ব্যবহার করে:

- object shape
- array-এর index shape
- function-এর call signature

define করতে পারি।

এগুলো একে একে দেখা যাক।

---

## ২.৭ Interface extend করা

Type Alias-এর ক্ষেত্রে আমরা intersection দিয়ে type বাড়িয়েছিলাম:

```ts
type UserWithRole = User & Role;
```

Interface-এর ক্ষেত্রে একই ধরনের কাজ `extends` keyword দিয়ে করা যায়।

আমাদের base interface:

```ts
interface IUser {
  name: string;
  age: number;
}
```

এখন এটিকে extend করে নতুন interface তৈরি করি:

```ts
interface IUserWithRole extends IUser {
  role: "admin" | "user";
}
```

এখানে `IUserWithRole`:

- `IUser`-এর সব property পেয়েছে।
- নিজের একটি নতুন `role` property পেয়েছে।

অর্থাৎ final structure:

```ts
{
  name: string;
  age: number;
  role: "admin" | "user";
}
```

এখন object তৈরি করি:

```ts
const userWithRole: IUserWithRole = {
  name: "Mr. X",
  age: 100,
  role: "admin",
};
```

সব required property থাকায় কোনো error হবে না।

---

## ২.৮ Intersection বনাম Interface Extension

একই ধরনের ফল দুইভাবে পাওয়া গেল।

### Type Alias ও Intersection

```ts
type User = {
  name: string;
  age: number;
};

type Role = {
  role: "admin" | "user";
};

type UserWithRole = User & Role;
```

### Interface ও `extends`

```ts
interface IUser {
  name: string;
  age: number;
}

interface IUserWithRole extends IUser {
  role: "admin" | "user";
}
```

দুই ক্ষেত্রেই final object-এর মধ্যে থাকবে:

```ts
name
age
role
```

তবে Interface-এর `extends` syntax বড় object structure বা inheritance-like relationship বোঝাতে অনেকের কাছে পরিষ্কার ও clean মনে হয়।

---

## ২.৯ কখন Type Alias, কখন Interface?

এখানে একেবারে একটিমাত্র বাধ্যতামূলক উত্তর নেই। Developer preference এবং use case অনুযায়ী দুইটিই ব্যবহার করা হয়।

Lecture-এর guideline অনুযায়ী:

- কম property-এর ছোট type composition হলে intersection ব্যবহার করা যেতে পারে।
- বড় object shape এবং extend করার প্রয়োজন হলে Interface clean structure দিতে পারে।
- Object-এর ক্ষেত্রে Type Alias ও Interface—দুইটিই valid।
- Primitive type-এর ক্ষেত্রে Type Alias ব্যবহার করতে হবে।
- Beginner হিসেবে সাধারণভাবে Type Alias ব্যবহার করা সহজ।
- ভবিষ্যতে type extend করার সম্ভাবনা থাকলে Interface সুবিধাজনক হতে পারে।

এখন array ও function-এর ক্ষেত্রে Interface দেখা যাক।

---

## ২.১০ Function type: Type Alias দিয়ে

ধরো, আমাদের একটি `add` function আছে। এটি দুইটি number নেবে এবং একটি number return করবে।

প্রথমে Type Alias দিয়ে function type define করি:

```ts
type Add = (num1: number, num2: number) => number;
```

এখন function-এ type ব্যবহার করি:

```ts
const add: Add = (num1, num2) => {
  return num1 + num2;
};
```

অথবা সংক্ষিপ্তভাবে:

```ts
const add: Add = (num1, num2) => num1 + num2;
```

এখানে:

- `num1` হবে `number`
- `num2` হবে `number`
- return value হবে `number`

---

## ২.১১ Function type: Interface দিয়ে

Function JavaScript-এ একটি special object। তাই Interface দিয়ে function call signature define করা যায়।

```ts
interface IAdd {
  (num1: number, num2: number): number;
}
```

এখানে syntax-টি ভালোভাবে খেয়াল করো।

```ts
(num1: number, num2: number): number;
```

- Parenthesis-এর মধ্যে parameter list।
- Colon-এর পরে return type।
- এখানে arrow (`=>`) ব্যবহার করা হয়নি।

এখন Interface-টি function-এর type হিসেবে ব্যবহার করা যায়:

```ts
const addWithInterface: IAdd = (num1, num2) => {
  return num1 + num2;
};
```

Type Alias version দেখতে অনেকের কাছে বেশি familiar:

```ts
type Add = (num1: number, num2: number) => number;
```

Interface version:

```ts
interface IAdd {
  (num1: number, num2: number): number;
}
```

দুইটিই কাজ করে। তবে function type-এর ক্ষেত্রে Type Alias syntax সাধারণত বেশি clean ও সহজ মনে হতে পারে।

---

## ২.১২ Array type: পরিচিত syntax

ধরো, আমাদের একটি friends array আছে।

```ts
const friends: string[] = ["A", "B", "C"];
```

এখানে array-এর প্রতিটি value `string`।

একই type Type Alias দিয়ে লেখা যায়:

```ts
type Friends = string[];

const friends: Friends = ["A", "B", "C"];
```

এটি খুব পরিষ্কার syntax।

এখন Interface দিয়ে array shape define করার পদ্ধতি দেখা যাক।

---

## ২.১৩ Array-এর index বোঝা

Array:

```ts
["A", "B", "C"]
```

এখানে:

```text
"A" → index 0
"B" → index 1
"C" → index 2
```

Array-এর indexগুলো number:

```ts
0
1
2
```

আর প্রতিটি index যে value hold করছে, সেটি এই example-এ `string`।

অর্থাৎ relationship:

```text
number index → string value
```

এই structure Interface-এর মাধ্যমে define করতে `index signature` ব্যবহার করা হয়।

---

## ২.১৪ Interface Index Signature

```ts
interface IFriends {
  [index: number]: string;
}
```

এখানে:

```ts
[index: number]
```

বলছে key বা index হবে `number`।

আর:

```ts
: string
```

বলছে সেই index-এ থাকা value হবে `string`।

এখন array-এর type হিসেবে Interface ব্যবহার করা যায়:

```ts
const friendsWithInterface: IFriends = ["A", "B", "C"];
```

এটি valid, কারণ:

- indexগুলো number
- valueগুলো string

এই syntax-কে বলা হয় `index signature`।

---

## ২.১৫ Index Signature কী?

`Index Signature` এমন একটি type structure, যেখানে key বা index-এর type এবং সেই key-তে থাকা value-এর type define করা হয়।

আমাদের example:

```ts
interface IFriends {
  [index: number]: string;
}
```

এর অর্থ:

> “এই structure-এ number index ব্যবহার করলে string value পাওয়া যাবে।”

Array-এর জন্য এটি কাজ করে, কারণ array index number-ভিত্তিক।

---

## ২.১৬ Array-এর ক্ষেত্রে কোন syntax বেশি clean?

Type Alias:

```ts
type Friends = string[];
```

Interface:

```ts
interface IFriends {
  [index: number]: string;
}
```

দুইটিই valid, কিন্তু beginner-এর জন্য Type Alias version অনেক বেশি সরল।

```ts
type Friends = string[];
```

Interface version বুঝতে `index signature` concept জানতে হয়। তাই সাধারণ array type define করার ক্ষেত্রে Type Alias ব্যবহার করা সহজ ও clean হতে পারে।

---

## ২.১৭ Function-এর ক্ষেত্রে কোনটি বেশি clean?

Type Alias:

```ts
type Add = (num1: number, num2: number) => number;
```

Interface:

```ts
interface IAdd {
  (num1: number, num2: number): number;
}
```

দুইটিই valid। তবে সাধারণ function signature-এর ক্ষেত্রে Type Alias syntax বেশি পরিচিত ও সংক্ষিপ্ত।

Lecture-এর recommendation:

- Array-এর ক্ষেত্রে Type Alias ব্যবহার করা সুবিধাজনক।
- Function-এর ক্ষেত্রে Type Alias ব্যবহার করা সুবিধাজনক।
- Object-এর ক্ষেত্রে Type Alias অথবা Interface—দুইটিই ব্যবহার করা যায়।
- Object type extend করতে হলে Interface ব্যবহার করা clean হতে পারে।

---

## ২.১৮ Object-oriented programming-এ Interface

Object-oriented programming-এ Interface বেশি দেখা যায়। কারণ সেখানে অনেক সময় একটি base structure থেকে নতুন structure extend করতে হয়।

উদাহরণ:

```ts
interface IUser {
  name: string;
  age: number;
}

interface IUserWithRole extends IUser {
  role: "admin" | "user";
}
```

এখানে relationship পরিষ্কার:

> `IUserWithRole` হলো `IUser`-এর extended form।

এই ধরনের extension-heavy design-এ Interface readable structure দিতে পারে।

---

## ২.১৯ Common Mistakes

### Mistake 1: Interface-এ `=` ব্যবহার করা

ভুল:

```ts
interface IUser = {
  name: string;
  age: number;
};
```

সঠিক:

```ts
interface IUser {
  name: string;
  age: number;
}
```

---

### Mistake 2: Primitive type alias করার চেষ্টা

ভুল:

```ts
interface IsAdmin = boolean;
```

Primitive alias-এর জন্য Type Alias ব্যবহার করতে হবে:

```ts
type IsAdmin = boolean;
```

---

### Mistake 3: Extended interface-এর required property বাদ দেওয়া

```ts
interface IUser {
  name: string;
  age: number;
}

interface IUserWithRole extends IUser {
  role: "admin" | "user";
}

const user: IUserWithRole = {
  name: "Mr. X",
  age: 30,
};
```

এখানে `role` missing। সঠিক object:

```ts
const user: IUserWithRole = {
  name: "Mr. X",
  age: 30,
  role: "admin",
};
```

---

### Mistake 4: Function Interface-এ arrow syntax ব্যবহার করা

Interface call signature:

```ts
interface IAdd {
  (num1: number, num2: number): number;
}
```

এটি Type Alias-এর মতো লিখতে হবে না:

```ts
interface IAdd {
  (num1: number, num2: number) => number;
}
```

উপরের syntax ভুল।

---

## ২.২০ Tricky Case: Interface দিয়ে Array

Array-এর Interface syntax প্রথম দেখায় কঠিন লাগতে পারে:

```ts
interface IFriends {
  [index: number]: string;
}
```

এখানে `[index: number]` কোনো normal property name নয়। এটি index signature।

এটি বোঝাচ্ছে:

```text
index type = number
value type = string
```

এই কারণেই:

```ts
const friends: IFriends = ["A", "B", "C"];
```

valid হয়।

---


## ২.২১ এই অধ্যায়ের Recap

এই অধ্যায়ে আমরা শিখলাম:

- `Interface` হলো object type define করার একটি উপায়।
- Object-এর ক্ষেত্রে Type Alias ও Interface—দুইটিই ব্যবহার করা যায়।
- Type Alias-এ `=` থাকে; Interface declaration-এ থাকে না।
- Primitive type-এর alias তৈরিতে Type Alias ব্যবহার করা যায়।
- Interface `extends` দিয়ে বাড়ানো যায়।
- Type Alias intersection `&` দিয়ে combine করা যায়।
- Interface দিয়ে object, array index signature এবং function call signature define করা যায়।
- Array ও function type-এর ক্ষেত্রে Type Alias সাধারণত বেশি clean।
- Object extension-এর ক্ষেত্রে Interface সুবিধাজনক।
- Object-oriented programming-এ Interface বেশি ব্যবহৃত হয়।

---

## ২.২২ Final Recap

Beginner হিসেবে সাধারণ type definition-এ `Type Alias` ব্যবহার করা সহজ। Object structure বড় হলে অথবা type extend করার প্রয়োজন হলে `Interface` একটি পরিষ্কার সমাধান। Array ও function-এর জন্য Type Alias syntax বেশি সরল, আর object extension-এর জন্য Interface-এর `extends` syntax বেশি expressive।

পরবর্তী অধ্যায়ে আমরা এমন একটি concept দেখব, যার মাধ্যমে একই type structure-কে বিভিন্ন type-এর জন্য dynamic এবং reusable করা যায়—`Generics`।

---

# অধ্যায় ৩: Generics in TypeScript

## ৩.১ Generics নিয়ে ভয় পাওয়ার কিছু নেই

হ্যালো ডেভেলপারস। এবার আমরা `Generics` নিয়ে কথা বলব।

`Generic` শব্দটি আমাদের পরিচিত। আমরা প্রায়ই বলি:

> “এটা তো একটি generic কাজ।”

অর্থাৎ কাজটি কোনো একটিমাত্র নির্দিষ্ট জিনিসের জন্য নয়; সাধারণভাবে বিভিন্ন জায়গায় ব্যবহার করা যায়।

TypeScript-এও Generics-এর মূল ধারণা একই। একটি type structure-কে এমনভাবে তৈরি করা হয়, যেন সেটি শুধু `string`, শুধু `number` বা শুধু `boolean`-এর জন্য আটকে না থাকে। প্রয়োজন অনুযায়ী dynamic type গ্রহণ করে একই structure বিভিন্ন type-এর জন্য কাজ করতে পারে।

অনেকে Generics-কে ভয় পায়। কিন্তু concept বুঝে ফেললে ভয় পাওয়ার কিছু নেই। বরং এটি function parameter-এর ধারণার সঙ্গে খুবই মিল।

এই অধ্যায়ে আমরা Generics-কে মনে রাখব এভাবে:

> **Generics হলো type-কে dynamically generalize করার উপায়।**

“Dynamically generalize” কথাটি formal definition হিসেবে নয়; concept বোঝার সুবিধার্থে মনে রাখার একটি উপায়।

---

## ৩.২ কয়েকটি সাধারণ Array

Generics বোঝার আগে আমরা কয়েকটি array define করি।

### String Array

```ts
const friends: string[] = [
  "Mr. X",
  "Mr. Y",
  "Mr. Z",
];
```

এখানে array-এর প্রতিটি value `string`।

### Number Array

```ts
const rollNumbers: number[] = [1, 2, 3];
```

এখানে array-এর প্রতিটি value `number`।

### Boolean Array

```ts
const eligibleList: boolean[] = [
  true,
  false,
  true,
];
```

এখানে array-এর প্রতিটি value `boolean`।

এ পর্যন্ত আমরা পরিচিত `type[]` syntax ব্যবহার করেছি।

---

## ৩.৩ Array type লেখার আরেকটি syntax

একই array type `Array<Type>` syntax দিয়েও লেখা যায়।

### String Array

```ts
const friends: Array<string> = [
  "Mr. X",
  "Mr. Y",
  "Mr. Z",
];
```

এটি একই অর্থ প্রকাশ করে:

```ts
string[]
```

অর্থাৎ:

```ts
string[] === Array<string>
```

Conceptually দুইটিই string array নির্দেশ করে।

### Number Array

```ts
const rollNumbers: Array<number> = [1, 2, 3];
```

এটি একই:

```ts
number[]
```

### Boolean Array

```ts
const eligibleList: Array<boolean> = [
  true,
  false,
  true,
];
```

এটি একই:

```ts
boolean[]
```

এখানে angle bracket-এর মধ্যে type লেখা হচ্ছে:

```ts
Array<string>
Array<number>
Array<boolean>
```

এই angle bracket syntax একটু পরে Generics বোঝার মূল ভিত্তি হবে।

---

## ৩.৪ পুনরাবৃত্তির জায়গাটি কোথায়?

তিনটি type দেখো:

```ts
Array<string>
Array<number>
Array<boolean>
```

এখানে `Array` অংশটি একই আছে। পরিবর্তন হচ্ছে শুধু angle bracket-এর ভেতরের type:

```text
string
number
boolean
```

অর্থাৎ dynamic পরিবর্তনটি হচ্ছে এখানে:

```ts
Array<...>
```

আমরা চাই, একটি reusable type বানাতে, যেখানে প্রয়োজন অনুযায়ী angle bracket-এর ভেতরের type পাঠানো যাবে।

---

## ৩.৫ প্রথম চেষ্টা: একটি নির্দিষ্ট Type Alias

ধরো, আমরা লিখলাম:

```ts
type GenericArray = Array<string>;
```

তাহলে এটি শুধু string array-এর জন্য কাজ করবে।

```ts
const friends: GenericArray = [
  "Mr. X",
  "Mr. Y",
];
```

কিন্তু number array-এর জন্য ব্যবহার করতে গেলে error হবে:

```ts
const rollNumbers: GenericArray = [1, 2, 3];
```

কারণ `GenericArray` এখানে আসলে `Array<string>`।

একইভাবে যদি লিখি:

```ts
type GenericArray = Array<number>;
```

তাহলে number array-এর জন্য কাজ করবে, কিন্তু string বা boolean array-এর জন্য করবে না।

আবার:

```ts
type GenericArray = Array<boolean>;
```

লিখলে শুধু boolean array-এর জন্য কাজ করবে।

আমাদের প্রয়োজন হলো—একই `GenericArray` type যেন সব ক্ষেত্রে ব্যবহার করা যায়।

---

## ৩.৬ Function Parameter-এর পুরোনো ধারণায় ফিরে যাই

Generics বোঝার আগে আমরা function শেখার সময়ের একটি পরিচিত example মনে করি।

ধরো, একটি square function আছে:

```ts
const square = (value: number): number => {
  return value * value;
};
```

এখন:

```ts
square(2);
```

Expected output:

```text
4
```

কারণ:

```text
2 × 2 = 4
```

আবার:

```ts
square(8);
```

Expected output:

```text
64
```

কারণ:

```text
8 × 8 = 64
```

এখানে function-এর logic একই:

```ts
value * value
```

কিন্তু প্রতিবার input value পরিবর্তিত হচ্ছে।

`value` function-এর parameter। Function call-এর সময় argument পাঠানো হচ্ছে:

```ts
square(2);
square(8);
```

Parameter dynamic value receive করছে।

এখন Generics-এর সঙ্গে এই concept মিলিয়ে দেখো।

---

## ৩.৭ Value Parameter বনাম Type Parameter

Function-এর ক্ষেত্রে আমরা dynamic value receive করি:

```ts
const square = (value: number) => value * value;
```

এখানে `value` একটি value parameter।

Generics-এর ক্ষেত্রে আমরা dynamic type receive করি।

যেখানে আগে লিখছিলাম:

```ts
Array<string>
Array<number>
Array<boolean>
```

সেখানে `string`, `number`, `boolean`-কে একটি type parameter-এর মাধ্যমে receive করা যায়।

---

## ৩.৮ Generic Type তৈরি করা

আমরা লিখি:

```ts
type GenericArray<T> = Array<T>;
```

এখানে:

- `GenericArray` হলো reusable type-এর নাম।
- `<T>` একটি type parameter।
- `Array<T>` বোঝাচ্ছে, যে type পাঠানো হবে, সেই type-এর array তৈরি হবে।

`T` সাধারণত `Type` বোঝাতে convention হিসেবে ব্যবহার করা হয়। চাইলে অন্য meaningful নামও ব্যবহার করা যায়, কিন্তু অনেক codebase-এ single generic type parameter-এর জন্য `T` দেখা যায়।

এখন একই type তিনভাবে ব্যবহার করা যায়।

---

## ৩.৯ Generic String Array

```ts
const friends: GenericArray<string> = [
  "Mr. X",
  "Mr. Y",
  "Mr. Z",
];
```

এখানে:

```ts
GenericArray<string>
```

ব্যবহারের সময় `T`-এর জায়গায় `string` পাঠানো হয়েছে।

তাই type resolve হবে:

```ts
Array<string>
```

---

## ৩.১০ Generic Number Array

```ts
const rollNumbers: GenericArray<number> = [
  1,
  2,
  3,
];
```

এখানে `T`-এর জায়গায় `number` পাঠানো হয়েছে।

Type resolve হবে:

```ts
Array<number>
```

---

## ৩.১১ Generic Boolean Array

```ts
const eligibleList: GenericArray<boolean> = [
  true,
  false,
  true,
];
```

এখানে `T`-এর জায়গায় `boolean` পাঠানো হয়েছে।

Type resolve হবে:

```ts
Array<boolean>
```

একই `GenericArray<T>` তিন ধরনের array-এর জন্য কাজ করছে।

---

## ৩.১২ কেন এটি Generic?

একটি নির্দিষ্ট type লিখলে:

```ts
type StringArray = Array<string>;
```

এটি শুধু string-এর জন্য।

কিন্তু:

```ts
type GenericArray<T> = Array<T>;
```

এখানে type use করার সময় সিদ্ধান্ত নেওয়া হচ্ছে `T` কী হবে।

```ts
GenericArray<string>
GenericArray<number>
GenericArray<boolean>
```

অর্থাৎ structure একই, কিন্তু type dynamic।

Function-এর analogy-টি আবার মনে করো:

```ts
square(2);
square(8);
```

Function parameter বিভিন্ন value গ্রহণ করছে।

Generic-এর ক্ষেত্রে:

```ts
GenericArray<string>
GenericArray<number>
GenericArray<boolean>
```

Type parameter বিভিন্ন type গ্রহণ করছে।

এই কারণেই বলা যায়:

> Function-এ dynamic value গ্রহণ করার জন্য parameter ব্যবহার করি, আর TypeScript type system-এ dynamic type গ্রহণ করার জন্য Generic ব্যবহার করি।

---

## ৩.১৩ Convention: `T`

Generic parameter-এর নাম যেকোনো valid identifier হতে পারে।

উদাহরণ:

```ts
type GenericArray<Type> = Array<Type>;
```

এটিও valid।

তবে convention অনুযায়ী অনেক ক্ষেত্রে লেখা হয়:

```ts
type GenericArray<T> = Array<T>;
```

`T` সাধারণত “Type” বোঝায়।

একাধিক generic parameter থাকলে `T`, `U`, `V` ইত্যাদিও দেখা যায়। তবে বর্তমান lesson-এ মূলত একটি type parameter নিয়েই কাজ করা হচ্ছে।

---

## ৩.১৪ Tuple-এর ক্ষেত্রে Generic

এখন tuple-এর ক্ষেত্রে Generics ব্যবহার করি।

ধরো, আমাদের একটি coordinate আছে:

```ts
const coordinate: [number, number] = [10, 20];
```

এখানে tuple-এর প্রথম এবং দ্বিতীয় value—দুইটিই `number`।

আমরা Type Alias করতে পারি:

```ts
type Coordinates = [number, number];
```

তারপর:

```ts
const coordinate1: Coordinates = [10, 20];
```

এ পর্যন্ত সব ঠিক আছে।

কিন্তু সমস্যা হলো, যদি আমরা string coordinate রাখতে চাই:

```ts
const coordinate2: Coordinates = ["10", "20"];
```

তাহলে error হবে। কারণ `Coordinates` শুধু `[number, number]`।

Type পরিবর্তন করতে গেলে alias-টি edit করে:

```ts
type Coordinates = [string, string];
```

করতে হবে। কিন্তু তাহলে number version আর কাজ করবে না।

আমরা চাই, একই tuple structure number এবং string—দুই ক্ষেত্রেই ব্যবহার করতে।

---

## ৩.১৫ Generic Tuple Type

এক্ষেত্রে একটি type parameter নেওয়া যায়:

```ts
type Coordinates<T> = [T, T];
```

এখন number coordinate:

```ts
const coordinate1: Coordinates<number> = [10, 20];
```

এখানে `T = number`। ফলে type resolve হবে:

```ts
[number, number]
```

String coordinate:

```ts
const coordinate2: Coordinates<string> = [
  "10",
  "20",
];
```

এখানে `T = string`। ফলে type resolve হবে:

```ts
[string, string]
```

একই type structure দুই ধরনের data-এর জন্য কাজ করছে।

---

## ৩.১৬ Tuple Generic-এর reasoning step-by-step

আমাদের structure:

```ts
[T, T]
```

Use করার সময়:

```ts
Coordinates<number>
```

তাই দুই জায়গায় `T` replace হবে `number` দিয়ে:

```ts
[number, number]
```

আবার:

```ts
Coordinates<string>
```

হলে দুই জায়গায় `T` replace হবে `string` দিয়ে:

```ts
[string, string]
```

এটি অনেকটা function call-এর মতো।

Function:

```ts
square(2)
```

এখানে parameter value পায় `2`।

Generic type:

```ts
Coordinates<number>
```

এখানে type parameter পায় `number`।

---

## ৩.১৭ একই Generic দিয়ে object array

এখন আমরা object-এর array-এর ক্ষেত্রে Generics দেখব।

ধরো, একটি user list আছে:

```ts
const userList = [
  {
    name: "Mr. X",
    age: 22,
  },
  {
    name: "Mr. Y",
    age: 25,
  },
];
```

এটি একটি array of objects।

প্রথমে মনে হতে পারে আমরা লিখতে পারি:

```ts
const userList: GenericArray<object> = [
  {
    name: "Mr. X",
    age: 22,
  },
  {
    name: "Mr. Y",
    age: 25,
  },
];
```

এটি সাধারণ object array হিসেবে কাজ করতে পারে। কিন্তু এখানে একটি গুরুত্বপূর্ণ সমস্যা আছে।

`object` লিখলে object-এর নির্দিষ্ট pattern বলা হচ্ছে না।

আমরা চাই user object-এর shape হবে:

```ts
{
  name: string;
  age: number;
}
```

শুধু `object` বললে TypeScript জানে না ঠিক কোন property থাকতে হবে।

---

## ৩.১৮ শুধু `object` দিলে pattern loose হয়ে যায়

আমাদের intention:

```ts
{
  name: string;
  age: number;
}
```

কিন্তু generic argument হিসেবে শুধু `object` ব্যবহার করলে ভিন্ন structure-এর objectও array-এ চলে আসতে পারে।

যেমন:

```ts
const userList: GenericArray<object> = [
  {
    name: "Mr. X",
    age: 22,
  },
  {
    id: 2,
    favoriteColor: "black",
  },
];
```

দ্বিতীয় object-এ `name` ও `age` নেই। তবু এটি একটি object।

কিন্তু user list-এর জন্য আমাদের consistent pattern দরকার।

তাই object-এর exact shape generic argument হিসেবে দিতে হবে।

---

## ৩.১৯ Object shape Generic Argument হিসেবে দেওয়া

```ts
const userList: GenericArray<{
  name: string;
  age: number;
}> = [
  {
    name: "Mr. X",
    age: 22,
  },
  {
    name: "Mr. Y",
    age: 25,
  },
];
```

এখন generic parameter `T` হলো:

```ts
{
  name: string;
  age: number;
}
```

তাই `GenericArray<T>` resolve হবে:

```ts
Array<{
  name: string;
  age: number;
}>
```

এখন array-এর প্রতিটি object-এ:

- `name` অবশ্যই string
- `age` অবশ্যই number

হতে হবে।

---

## ৩.২০ Strict Type Checking

এখন যদি age-এ string দিই:

```ts
const userList: GenericArray<{
  name: string;
  age: number;
}> = [
  {
    name: "Mr. X",
    age: "22",
  },
];
```

TypeScript error দেবে, কারণ:

```ts
age: number
```

define করা হয়েছে, কিন্তু দেওয়া হয়েছে:

```ts
age: "22"
```

যা একটি `string`।

সঠিক:

```ts
age: 22
```

---

## ৩.২১ Shape পরিবর্তন করলেও error

ধরো, একটি object-এ pattern পরিবর্তন করে দেওয়া হলো:

```ts
const userList: GenericArray<{
  name: string;
  age: number;
}> = [
  {
    name: "Mr. X",
    age: 22,
  },
  {
    id: 2,
    favoriteColor: "black",
  },
];
```

TypeScript বলবে, দ্বিতীয় object expected structure-এর সঙ্গে মিলছে না।

কারণ expected:

```ts
{
  name: string;
  age: number;
}
```

কিন্তু দেওয়া হয়েছে:

```ts
{
  id: number;
  favoriteColor: string;
}
```

এভাবে Generic-এর সঙ্গে exact object shape ব্যবহার করলে strict type checking পাওয়া যায়।

---

## ৩.২২ Object Type আলাদা করে define করা

একই structure আরও clean করতে user type আলাদা করে define করা যায়:

```ts
type User = {
  name: string;
  age: number;
};
```

তারপর:

```ts
const userList: GenericArray<User> = [
  {
    name: "Mr. X",
    age: 22,
  },
  {
    name: "Mr. Y",
    age: 25,
  },
];
```

এখানে `T`-এর জায়গায় `User` পাঠানো হয়েছে।

Type resolve হবে:

```ts
Array<User>
```

মূল lecture-এ object shape সরাসরি generic argument-এর মধ্যে দেখানো হয়েছে। আলাদা type লিখলেও concept একই থাকে: generic parameter একটি সম্পূর্ণ object type receive করতে পারে।

---

## ৩.২৩ Expected Errors ও কারণ

### Case 1: Wrong primitive type

```ts
const rollNumbers: GenericArray<number> = [
  1,
  2,
  "3",
];
```

Expected error:

```text
Type 'string' is not assignable to type 'number'.
```

কারণ `GenericArray<number>`-এর প্রতিটি element number হতে হবে।

---

### Case 2: Wrong object property type

```ts
const userList: GenericArray<{
  name: string;
  age: number;
}> = [
  {
    name: "Mr. X",
    age: "22",
  },
];
```

Expected error-এর অর্থ:

```text
string value number property-তে assign করা যাবে না।
```

---

### Case 3: Wrong object shape

```ts
const userList: GenericArray<{
  name: string;
  age: number;
}> = [
  {
    id: 1,
    favoriteColor: "black",
  },
];
```

Expected error-এর অর্থ:

```text
Expected name এবং age property নেই; অঘোষিত structure দেওয়া হয়েছে।
```

---

## ৩.২৪ Common Mistakes

### Mistake 1: Generic বানিয়েও type hard-code করা

```ts
type GenericArray<T> = Array<string>;
```

এখানে `<T>` নেওয়া হলেও `T` ব্যবহার করা হয়নি। ফলে এটি generic আচরণ করবে না; সবসময় string array-ই থাকবে।

সঠিক:

```ts
type GenericArray<T> = Array<T>;
```

---

### Mistake 2: Generic use করার সময় type argument না বোঝা

```ts
GenericArray<number>
```

এর অর্থ:

```ts
Array<number>
```

এটি `number` value নয়; এটি একটি type argument।

---

### Mistake 3: Object array-এর জন্য শুধু `object` ব্যবহার করা

```ts
GenericArray<object>
```

এতে exact structure enforce হয় না।

নির্দিষ্ট shape দরকার হলে:

```ts
GenericArray<{
  name: string;
  age: number;
}>
```

ব্যবহার করতে হবে।

---

### Mistake 4: Tuple generic-এ inconsistent value দেওয়া

```ts
type Coordinates<T> = [T, T];

const coordinate: Coordinates<number> = [
  10,
  "20",
];
```

এখানে `T = number`, তাই দুইটি value-ই number হতে হবে।

সঠিক:

```ts
const coordinate: Coordinates<number> = [
  10,
  20,
];
```

---

## ৩.২৫ Tricky Case: Generic Type Parameter কোথায় replace হয়?

এই type দেখো:

```ts
type GenericArray<T> = Array<T>;
```

Use:

```ts
GenericArray<string>
```

এখানে TypeScript conceptually `T`-এর সব জায়গায় `string` বসায়:

```ts
Array<string>
```

একইভাবে:

```ts
type Coordinates<T> = [T, T];
```

Use:

```ts
Coordinates<number>
```

Resolve:

```ts
[number, number]
```

এটি বুঝে ফেললে Generics-এর basic flow পরিষ্কার হয়ে যায়।

---


## ৩.২৬ এই অধ্যায়ের Recap

এই অধ্যায়ে আমরা শিখলাম:

- Generic মানে একটি type structure-কে reusable ও dynamic করা।
- `string[]` এবং `Array<string>` একই ধরনের array type প্রকাশ করে।
- `Array<string>`, `Array<number>` এবং `Array<boolean>`-এ পরিবর্তন হয় angle bracket-এর ভেতরের type।
- `type GenericArray<T> = Array<T>` লিখে reusable array type তৈরি করা যায়।
- `T` একটি type parameter।
- Function parameter dynamic value নেয়; Generic dynamic type নেয়।
- Generic tuple তৈরি করা যায়।
- Object array-এর exact shape generic argument হিসেবে দেওয়া যায়।
- শুধু `object` দিলে pattern যথেষ্ট strict নাও হতে পারে।
- Generic ব্যবহার করে strict, reusable এবং consistent type structure বানানো যায়।

---


## ৩.২৭ Final Recap

Generics-এর মূল কথা হলো—একটি type structure লিখে সেটিকে বিভিন্ন type-এর জন্য reuse করা। Function-এ parameter যেমন dynamic value গ্রহণ করে, Generic-এ type parameter তেমনি dynamic type গ্রহণ করে। `GenericArray<T>`, `Coordinates<T>` এবং object array-এর examples দেখায় কীভাবে একই structure `string`, `number`, `boolean` বা custom object type-এর জন্য ব্যবহার করা যায়।

এই lesson পর্যন্ত আমরা basic Generics বুঝলাম। পরবর্তী lesson-এ Generic-এর আরও ব্যবহার ও advanced pattern দেখলে concept আরও পরিষ্কার হবে।

---

# সম্পূর্ণ Module-এর Final Recap

এই module-এর তিনটি lesson একে অন্যের সঙ্গে সম্পর্কিত:

## Type Assertion

যখন developer runtime value-এর type সম্পর্কে TypeScript-এর চেয়ে বেশি নিশ্চিত, তখন `as` ব্যবহার করে নির্দিষ্ট type জানানো যায়। তবে এটি runtime conversion নয় এবং ভুল assertion ঝুঁকিপূর্ণ।

```ts
const result = value as string;
```

## Interface

Object-like structure define এবং extend করার জন্য Interface ব্যবহার করা যায়।

```ts
interface IUser {
  name: string;
  age: number;
}
```

```ts
interface IUserWithRole extends IUser {
  role: "admin" | "user";
}
```

## Generics

একটি type structure-কে dynamic ও reusable করার জন্য type parameter ব্যবহার করা হয়।

```ts
type GenericArray<T> = Array<T>;
```

```ts
const numbers: GenericArray<number> = [1, 2, 3];
```

সব মিলিয়ে:

- `Type Assertion` developer-এর নিশ্চিত type knowledge প্রকাশ করে।
- `Interface` object structure এবং extension প্রকাশ করে।
- `Generics` reusable type structure তৈরি করে।

এগুলো TypeScript-এর type system-কে আরও expressive, reusable এবং developer-friendly করে।

