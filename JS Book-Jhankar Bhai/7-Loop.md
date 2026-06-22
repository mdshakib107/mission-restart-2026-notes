# Loop — গুরুত্বপূর্ণ নোট

## ১. Loop কী?

একই কাজ বারবার করার পদ্ধতিকে Loop বলে।

কোনো কাজ একাধিকবার করতে হলে Loop ব্যবহার করা হয়।

Array-এর প্রতিটি উপাদান আলাদা আলাদা করে বের করতে Loop খুব দরকারি।

---

## ২. Loop কেন দরকার?

Array-তে অনেক উপাদান থাকলে একে একে `console.log()` করা কষ্টকর।

Loop ব্যবহার করলে অল্প কোডে সব উপাদান প্রিন্ট করা যায়।

### উদাহরণ Array

```javascript
const numbers = [12, 98, 45, 63, 21, 72];
```

---

## ৩. for...of Loop

### Syntax

```javascript
for (const variableName of arrayName) {
  // কাজ
}
```

### Example

```javascript
const numbers = [12, 98, 45, 63, 21, 72];

for (const num of numbers) {
  console.log(num);
}
```

### Output

```text
12
98
45
63
21
72
```

---

## ৪. for...of Loop কীভাবে কাজ করে?

```javascript
for (const num of numbers)
```

এখানে:

- `for` → Loop শুরু করার keyword
- `const num` → প্রতিবার একেকটি উপাদান রাখার জন্য variable
- `of` → কোন Array থেকে উপাদান নেওয়া হবে তা বোঝায়
- `numbers` → যে Array-এর উপর Loop চলবে

---

## ৫. Loop-এর ভিতরের কাজ

```javascript
{
  console.log(num);
}
```

`{ }` এর ভিতরের কোড প্রতিটি উপাদানের জন্য একবার করে চলবে।

প্রতিবার Array-এর একটি করে উপাদান `num` variable-এ আসবে।

তারপর সেটি `console.log()` দিয়ে প্রিন্ট হবে।

---

## ৬. String Array-এর উপর Loop

```javascript
const fruits = ["orange", "apple", "banana", "jackfruit", "watermelon"];

for (const item of fruits) {
  console.log(item);
}
```

---

# Practice থেকে গুরুত্বপূর্ণ কোড

## ৫টি পছন্দের Subject

```javascript
const subjects = ["Math", "Physics", "Chemistry", "English", "ICT"];

for (const subject of subjects) {
  console.log(subject);
}
```

---

## পছন্দের খাবার

```javascript
const foods = ["Biriyani", "Burger", "Pizza", "Fuchka"];

for (const food of foods) {
  console.log(food);
}
```

---

## Family member জন্মসাল

```javascript
const birthYears = [1975, 1980, 2002, 2008];

for (const year of birthYears) {
  console.log(year);
}
```

---

## প্রিয় খেলোয়াড়

```javascript
const players = ["Messi", "Ronaldo", "Neymar", "Mbappe"];

for (const player of players) {
  console.log(player);
}
```

---

## পরীক্ষার তারিখ

```javascript
const examDates = ["10 July", "15 July", "20 July"];

for (const date of examDates) {
  console.log(date);
}
```

---

# শর্ট নোট

✅ Loop = একই কাজ বারবার করা

✅ Array-এর সব উপাদান বের করতে Loop ব্যবহার হয়

✅ for...of Loop Array-এর জন্য খুব সহজ

✅ প্রতিবার একেকটি element variable-এ আসে

✅ Loop-এর `{ }` ভিতরের কোড বারবার চলে

### Main Formula

```javascript
for (const item of arrayName) {
  console.log(item);
}
```

---

# While Loop — গুরুত্বপূর্ণ নোট

## ১. while Loop কী?

while loop দিয়ে একই কাজ বারবার করা যায়।

যতক্ষণ condition সত্য থাকবে, ততক্ষণ loop চলবে।

condition মিথ্যা হলে loop বন্ধ হয়ে যাবে।

---

## ২. while Loop লিখতে ৫টি জিনিস লাগে

1. Loop variable declare করতে হয়
2. while keyword লিখতে হয়
3. `( )` এর ভিতরে condition দিতে হয়
4. `{ }` এর ভিতরে repeat হওয়া code লিখতে হয়
5. Loop variable-এর মান পরিবর্তন করতে হয়

---

## ৩. while Loop-এর Structure

```javascript
let loopVariable = initialValue;

while (condition) {
  // repetitive task
  // change loop variable
}
```

---

## ৪. Example

```javascript
let num = 0;

while (num < 5) {
  console.log(num);
  num = num + 1;
}
```

### Output

```text
0
1
2
3
4
```

---

## ৫. num = num + 1 এর কাজ

এটি num এর মান ১ করে বাড়ায়।

একই কাজ তিনভাবে করা যায়:

```javascript
num = num + 1;
num += 1;
num++;
```

---

## ৬. let কেন ব্যবহার হয়?

Loop variable-এর মান পরিবর্তন হয়।

তাই `const` না দিয়ে `let` ব্যবহার করা হয়।

```javascript
let num = 0;
```

---

## ৭. Infinite Loop

যদি loop variable-এর মান পরিবর্তন না করা হয়,

তাহলে condition সবসময় true থাকতে পারে।

তখন loop বন্ধ হবে না।

এটাকে infinite loop বলে।

---

# Practice থেকে গুরুত্বপূর্ণ কোড

## ১০ বার বাক্য প্রিন্ট

```javascript
let i = 1;

while (i <= 10) {
  console.log("আমি প্রতিদিন মিনিমাম 3 ঘণ্টা করে প্রোগ্রামিং প্র্যাকটিস করব");
  i++;
}
```

---

## ১ থেকে ২০ পর্যন্ত সংখ্যা

```javascript
let num = 1;

while (num <= 20) {
  console.log(num);
  num++;
}
```

---

## ৫০ থেকে ১০০ পর্যন্ত সংখ্যা

```javascript
let num = 50;

while (num <= 100) {
  console.log(num);
  num++;
}
```

---

## ১ থেকে ১০ পর্যন্ত সংখ্যাকে ৩ দিয়ে গুণ

```javascript
let num = 1;

while (num <= 10) {
  console.log(num * 3);
  num++;
}
```

---

## ১১১ থেকে ১১০ পর্যন্ত সংখ্যাকে ২ দিয়ে ভাগ

```javascript
let num = 111;

while (num >= 110) {
  console.log(num / 2);
  num--;
}
```

---

# শর্ট নোট

✅ while loop condition-এর উপর চলে

✅ condition true হলে loop চলবে

✅ condition false হলে loop বন্ধ হবে

✅ loop variable সাধারণত let দিয়ে declare করা হয়

✅ loop variable update না করলে infinite loop হতে পারে

### Main Formula

```javascript
let i = 0;

while (i < limit) {
  console.log(i);
  i++;
}
```

# While Loop দিয়ে যোগফল — গুরুত্বপূর্ণ নোট

## ১. while loop দিয়ে সংখ্যা প্রিন্ট

```javascript
let num = 1;

while (num <= 10) {
  console.log(num);
  num++;
}
```

### Output

```text
1 2 3 4 5 6 7 8 9 10
```

---

## ২. < আর <= এর পার্থক্য

```javascript
num < 10;
```

এটি ১০-এর আগ পর্যন্ত চলবে, অর্থাৎ ৯ পর্যন্ত।

```javascript
num <= 10;
```

এটি ১০ সহ চলবে, অর্থাৎ ১০ পর্যন্ত।

---

## ৩. while loop দিয়ে যোগফল বের করা

### মূল আইডিয়া

একটি sum variable নিতে হবে।

শুরুতে sum = 0 হবে।

প্রতিবার loop চললে num-এর মান sum-এর সাথে যোগ হবে।

```javascript
let num = 1;
let sum = 0;

while (num <= 10) {
  sum = sum + num;
  num++;
}

console.log("Sum:", sum);
```

### Output

```text
Sum: 55
```

---

## ৪. sum = sum + num এর কাজ

```javascript
sum = sum + num;
```

এর মানে হলো:

আগের sum এর সাথে বর্তমান num যোগ হবে

তারপর নতুন মান আবার sum-এর মধ্যে রাখা হবে

---

## ৫. Final যোগফল কোথায় print করব?

### Loop-এর ভিতরে দিলে

প্রতিবারের যোগফল দেখা যাবে।

```javascript
console.log(sum);
```

### Loop-এর বাইরে দিলে

শুধু final যোগফল দেখা যাবে।

```javascript
console.log("Final Sum:", sum);
```

---

# Practice থেকে গুরুত্বপূর্ণ কোড

## ৫০ থেকে ১০০ পর্যন্ত সংখ্যা প্রিন্ট

```javascript
let num = 50;

while (num <= 100) {
  console.log(num);
  num++;
}
```

---

## ৫ থেকে ১৫ পর্যন্ত যোগফল

```javascript
let num = 5;
let sum = 0;

while (num <= 15) {
  sum = sum + num;
  num++;
}

console.log(sum);
```

---

## ১ থেকে ৫০ পর্যন্ত যোগফল

```javascript
let roll = 1;
let sum = 0;

while (roll <= 50) {
  sum = sum + roll;
  roll++;
}

console.log(sum);
```

---

## ২১ থেকে ৫০ পর্যন্ত প্রতিবারের যোগফল

```javascript
let num = 21;
let sum = 0;

while (num <= 50) {
  sum = sum + num;
  console.log(sum);
  num++;
}
```

---

## ২০ থেকে ৪০ পর্যন্ত final যোগফল

```javascript
let num = 20;
let sum = 0;

while (num <= 40) {
  sum = sum + num;
  num++;
}

console.log("Final Sum:", sum);
```

---

# শর্ট নোট

✅ যোগফলের জন্য sum variable লাগে

✅ শুরুতে sum = 0 দিতে হয়

✅ প্রতিবার sum = sum + num করতে হয়

✅ num++ দিয়ে loop variable বাড়াতে হয়

✅ final result দেখতে চাইলে console.log(sum) loop-এর বাইরে দিতে হয়

---

# For Loop — গুরুত্বপূর্ণ নোট

## ১. for Loop কী?

একই কাজ বারবার করার জন্য for loop ব্যবহার করা হয়।

while loop আর for loop-এর কাজ প্রায় একই।

পার্থক্য শুধু লেখার নিয়মে।

---

## ২. for Loop-এর Structure

```javascript
for (initialization; condition; update) {
  // repeated code
}
```

এখানে:

- initialization → loop variable declare করা
- condition → loop চলার শর্ত
- update → loop variable-এর মান পরিবর্তন
- `{ }` → বারবার যে code চলবে

---

## ৩. Basic Example

```javascript
for (let num = 0; num < 5; num++) {
  console.log(num);
}
```

### Output

```text
0
1
2
3
4
```

---

## ৪. ১ থেকে ১০ পর্যন্ত প্রিন্ট

```javascript
for (let i = 1; i <= 10; i++) {
  console.log(i);
}
```

---

## ৫. ৫০ থেকে ১০০ পর্যন্ত প্রিন্ট

```javascript
for (let i = 50; i <= 100; i++) {
  console.log(i);
}
```

---

## ৬. for Loop দিয়ে যোগফল

```javascript
let sum = 0;

for (let i = 11; i <= 20; i++) {
  sum = sum + i;
}

console.log("Sum:", sum);
```

### Output

```text
Sum: 155
```

---

## ৭. console.log কোথায় দেব?

### প্রতিটি সংখ্যা দেখতে চাইলে

```javascript
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

### শুধু final যোগফল দেখতে চাইলে

```javascript
let sum = 0;

for (let i = 1; i <= 5; i++) {
  sum = sum + i;
}

console.log(sum);
```

---

## while loop বনাম for loop

| বিষয়            | while loop            | for loop                     |
| --------------- | --------------------- | ---------------------------- |
| কাজ             | বারবার code চালানো    | বারবার code চালানো           |
| Syntax          | আলাদা আলাদা অংশে লেখা | এক লাইনে মূল অংশগুলো লেখা    |
| Variable update | loop body-তে          | for bracket-এর ভিতরে         |
| ব্যবহার         | condition-based loop  | counting loop-এ বেশি জনপ্রিয় |

---

# Practice থেকে গুরুত্বপূর্ণ কোড

## ১৫০ থেকে ১৭০ পর্যন্ত সংখ্যা

```javascript
for (let i = 150; i <= 170; i++) {
  console.log(i);
}
```

---

## ৩১ থেকে ৫৮ পর্যন্ত যোগফল

```javascript
let sum = 0;

for (let roll = 31; roll <= 58; roll++) {
  sum = sum + roll;
}

console.log(sum);
```

---

## ২৫ থেকে ৭৫ পর্যন্ত যোগফল

```javascript
let sum = 0;

for (let i = 25; i <= 75; i++) {
  sum = sum + i;
}

console.log("Sum:", sum);
```

---

# শর্ট নোট

✅ for loop এক লাইনে initialization, condition, update রাখে

✅ counting loop-এর জন্য for loop বেশি ব্যবহার হয়

✅ condition true থাকলে loop চলবে

✅ condition false হলে loop বন্ধ হবে

✅ final result চাইলে console.log() loop-এর বাইরে দিতে হয়

### Main Formula

```javascript
for (let i = start; i <= end; i++) {
  console.log(i);
}
```

# জোড়-বিজোড় ও বিভাজ্য সংখ্যা — গুরুত্বপূর্ণ নোট

## ১. জোড় সংখ্যা কী?

যে সংখ্যাকে ২ দিয়ে ভাগ করলে ভাগশেষ 0 হয়, সেটি জোড় সংখ্যা।

```javascript
i % 2 == 0;
```

### Example

```javascript
for (let i = 0; i < 20; i++) {
  if (i % 2 == 0) {
    console.log(i);
  }
}
```

---

## ২. বিজোড় সংখ্যা কী?

যে সংখ্যাকে ২ দিয়ে ভাগ করলে ভাগশেষ 1 হয়, সেটি বিজোড় সংখ্যা।

```javascript
i % 2 == 1;
```

অথবা

```javascript
i % 2 != 0;
```

### Example

```javascript
for (let i = 0; i < 20; i++) {
  if (i % 2 != 0) {
    console.log(i);
  }
}
```

---

## ৩. ২ করে বাড়িয়ে জোড়/বিজোড় সংখ্যা

### বিজোড় সংখ্যা

```javascript
for (let i = 1; i < 20; i = i + 2) {
  console.log(i);
}
```

### জোড় সংখ্যা

```javascript
for (let i = 2; i <= 20; i = i + 2) {
  console.log(i);
}
```

---

## ৪. বিভাজ্য সংখ্যা বের করা

### ৫ দিয়ে বিভাজ্য

```javascript
for (let i = 1; i <= 30; i++) {
  if (i % 5 == 0) {
    console.log(i);
  }
}
```

### ৩ দিয়ে বিভাজ্য

```javascript
for (let i = 1; i <= 30; i++) {
  if (i % 3 == 0) {
    console.log(i);
  }
}
```

---

## ৫. OR || অপারেটর

### ৩ অথবা ৫ দিয়ে বিভাজ্য

```javascript
for (let i = 1; i <= 30; i++) {
  if (i % 3 == 0 || i % 5 == 0) {
    console.log(i);
  }
}
```

`||` মানে যেকোনো একটি condition true হলেই চলবে।

---

## ৬. AND && অপারেটর

### ৩ এবং ৫ উভয় দিয়ে বিভাজ্য

```javascript
for (let i = 1; i <= 30; i++) {
  if (i % 3 == 0 && i % 5 == 0) {
    console.log(i);
  }
}
```

`&&` মানে দুটি condition-ই true হতে হবে।

---

# Practice থেকে গুরুত্বপূর্ণ কোড

## ২০ থেকে ৫০ পর্যন্ত ৭ দিয়ে বিভাজ্য

```javascript
for (let i = 20; i <= 50; i++) {
  if (i % 7 == 0) {
    console.log(i);
  }
}
```

---

## ৪০ থেকে ৮০ পর্যন্ত ৫ এবং ৭ দিয়ে বিভাজ্য

```javascript
for (let i = 40; i <= 80; i++) {
  if (i % 5 == 0 && i % 7 == 0) {
    console.log(i);
  }
}
```

---

## ১ থেকে ৪০ পর্যন্ত ১৩ দিয়ে বিভাজ্য সংখ্যার যোগফল

```javascript
let sum = 0;

for (let i = 1; i <= 40; i++) {
  if (i % 13 == 0) {
    sum = sum + i;
  }
}

console.log(sum);
```

---

## ১ থেকে ৫০ পর্যন্ত ৪ করে বাড়ানো

```javascript
for (let i = 1; i <= 50; i = i + 4) {
  console.log(i);
}
```

---

## ০ থেকে ১০০ পর্যন্ত ৯ এবং ৬ দিয়ে বিভাজ্য

```javascript
for (let i = 0; i <= 100; i++) {
  if (i % 9 == 0 && i % 6 == 0) {
    console.log(i);
  }
}
```

---

## ১ থেকে ৫০ পর্যন্ত ৩ ও ৪ দিয়ে বিভাজ্য এবং যোগফল

```javascript
let sum = 0;

for (let i = 1; i <= 50; i++) {
  if (i % 3 == 0 && i % 4 == 0) {
    console.log(i);
    sum = sum + i;
  }
}

console.log("Sum:", sum);
```

---

# শর্ট নোট

✅ `%` দিয়ে ভাগশেষ বের করা হয়

✅ `i % 2 == 0` → জোড় সংখ্যা

✅ `i % 2 != 0` → বিজোড় সংখ্যা

✅ `i % n == 0` → n দিয়ে বিভাজ্য

✅ `||` → অথবা

✅ `&&` → এবং

✅ `i = i + 2` → ২ করে বাড়ে

✅ `i = i + 4` → ৪ করে বাড়ে

---

# break এবং continue — গুরুত্বপূর্ণ নোট

## ১. break কী?

break ব্যবহার করলে loop পুরোপুরি বন্ধ হয়ে যায়।

কোনো নির্দিষ্ট condition সত্য হলে loop থামাতে break ব্যবহার করা হয়।

### Example

```javascript
for (let i = 0; i < 15; i++) {
  console.log(i);

  if (i >= 7) {
    break;
  }
}
```

### Output

```text
0
1
2
3
4
5
6
7
```

---

## ২. break কখন কাজ করে?

```javascript
if (i >= 7) {
  break;
}
```

এখানে i এর মান ৭ হলে condition true হবে।

তারপর loop থেমে যাবে।

---

## ৩. continue কী?

continue পুরো loop বন্ধ করে না।

শুধু নির্দিষ্ট iteration বা ধাপটি skip করে।

তারপর loop আবার পরের ধাপ থেকে চলতে থাকে।

### Example

```javascript
for (let i = 1; i <= 10; i++) {
  if (i == 6) {
    continue;
  }

  console.log(i);
}
```

### Output

```text
1
2
3
4
5
7
8
9
10
```

---

## ৪. continue দিয়ে জোড় সংখ্যা skip

```javascript
for (let i = 1; i < 10; i++) {
  if (i % 2 == 0) {
    continue;
  }

  console.log(i);
}
```

### Output

```text
1
3
5
7
9
```

---

## ৫. continue দিয়ে বিজোড় সংখ্যা skip

```javascript
for (let i = 1; i < 10; i++) {
  if (i % 2 == 1) {
    continue;
  }

  console.log(i);
}
```

### Output

```text
2
4
6
8
```

---

## ৬. break বনাম continue

| বিষয়       | break          | continue                   |
| ---------- | -------------- | -------------------------- |
| কাজ        | loop বন্ধ করে  | শুধু current step skip করে |
| এরপর কী হয় | loop আর চলে না | পরের iteration চলে         |
| ব্যবহার    | থামানোর জন্য   | বাদ দেওয়ার জন্য            |

---

## গুরুত্বপূর্ণ বিষয়

continue-এর পরে থাকা code ঐ ধাপে আর execute হয় না।

তাই যেটা skip করতে চাই, তার console.log() সাধারণত continue-এর পরে লিখতে হয়।

---

# Practice থেকে গুরুত্বপূর্ণ কোড

## ১ থেকে ৩০, কিন্তু ১৫-এর পরে বন্ধ

```javascript
for (let i = 1; i <= 30; i++) {
  console.log(i);

  if (i >= 15) {
    break;
  }
}
```

---

## ১ থেকে ৪০, ৭ দিয়ে বিভাজ্য সংখ্যা বাদ

```javascript
for (let i = 1; i <= 40; i++) {
  if (i % 7 == 0) {
    continue;
  }

  console.log(i);
}
```

---

## ১ থেকে ১৫, কিন্তু ৯ বাদ

```javascript
for (let i = 1; i <= 15; i++) {
  if (i == 9) {
    continue;
  }

  console.log(i);
}
```

---

## ১ থেকে ২০, কিন্তু ১২ বাদ

```javascript
for (let i = 1; i <= 20; i++) {
  if (i == 12) {
    continue;
  }

  console.log(i);
}
```

---

## ১ থেকে ২৫, ৩ দিয়ে বিভাজ্য সংখ্যা বাদ

```javascript
for (let i = 1; i <= 25; i++) {
  if (i % 3 == 0) {
    continue;
  }

  console.log(i);
}
```

---

## ৯১ থেকে ১২০, ১০ দিয়ে ভাগ যায় এমন সংখ্যা পেলে বন্ধ

```javascript
for (let i = 91; i <= 120; i++) {
  if (i % 10 == 0) {
    break;
  }

  console.log(i);
}
```

---

# শর্ট নোট

✅ break = loop বন্ধ

✅ continue = current step skip

✅ condition true হলে break বা continue কাজ করে

✅ break হলে loop আর চলে না

✅ continue হলে পরের iteration চলে

✅ skip করা output এড়াতে console.log() continue-এর পরে দিতে হয়
