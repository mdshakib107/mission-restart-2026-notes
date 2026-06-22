# JavaScript Function — গুরুত্বপূর্ণ নোট

## ১. Function কী?

Function হলো একটি নির্দিষ্ট কাজ করার জন্য কোডের ব্লক।

একবার function লিখলে সেটাকে বারবার ব্যবহার করা যায়।

Function-এর একটি নাম থাকে।

সেই নাম ধরে ডাকলে function-এর ভিতরের কাজ execute হয়।

---

## ২. Function Declaration

### Structure:

```javascript
function functionName() {
  // code
}
```

### Example:

```javascript
function fanOffKor() {
  console.log("bosha theke uthe dara");
  console.log("walk toward the switch");
  console.log("click the switch to off of the fan");
}
```

---

## ৩. Function Call

Function লিখলেই কাজ হবে না।

Function চালাতে হলে তাকে call করতে হয়।

```javascript
fanOffKor();
```

---

## ৪. Function-এর সুবিধা

✅ একই কোড বারবার লিখতে হয় না

✅ কোড clean ও organized থাকে

✅ একই কাজ বারবার করানো যায়

✅ বড় প্রোগ্রাম ছোট ছোট অংশে ভাগ করা যায়

---

## ৫. Function নাম লেখার নিয়ম

- এক শব্দে লিখতে হয়
- মাঝখানে space দেওয়া যায় না
- সংখ্যা দিয়ে শুরু করা যায় না
- variable নামের মতো নিয়ম follow করে

---

# Practice থেকে গুরুত্বপূর্ণ কোড

## জুস খাও function

```javascript
function juiceKhao() {
  console.log("এই নাও লেবুর জুস");
}

juiceKhao();
```

---

## myRoutine function

```javascript
function myRoutine() {
  console.log("ঘুম থেকে উঠি");
  console.log("দাঁত ব্রাশ করি");
  console.log("নাস্তা করি");
  console.log("পড়তে বসি");
}

myRoutine();
```

---

## greetMe function

```javascript
function greetMe() {
  console.log("Good Morning! Have a great day!");
}

greetMe();
```

---

## taskDone function

```javascript
function taskDone() {
  console.log("পড়াশোনা");
  console.log("প্রোগ্রামিং");
  console.log("ব্যায়াম");
  console.log("খাওয়া");
  console.log("ঘুম");
}

taskDone();
```

---

## introduceMyself function

```javascript
function introduceMyself() {
  console.log("Name: Rahim");
  console.log("Age: 20");
  console.log("Address: Dhaka");
  console.log("Phone: 01XXXXXXXXX");
  console.log("Height: 5.7 feet");
  console.log("Favorite Food: Biriyani");
}

introduceMyself();
```

---

# শর্ট নোট

✅ Function = reusable block of code

✅ function keyword দিয়ে function তৈরি হয়

✅ Function call করতে হয় `functionName()` দিয়ে

✅ Function একবার লিখে বারবার ব্যবহার করা যায়

✅ Function code repetition কমায়

---

# Function Parameter — গুরুত্বপূর্ণ নোট

## ১. Parameter কী?

Function declaration করার সময় `()` এর ভিতরে যে variable-এর মতো নাম দেওয়া হয়, সেটাই parameter।

Parameter দিয়ে একই function-কে বিভিন্ন value দিয়ে বারবার ব্যবহার করা যায়।

```javascript
function doubleIt(number) {
  const doubled = number * 2;
  console.log(doubled);
}

doubleIt(15);
doubleIt(88);
```

---

## ২. Argument কী?

Function call করার সময় যে value পাঠানো হয়, সেটাই argument।

```javascript
doubleIt(15);
```

এখানে `15` হলো argument।

---

## ৩. এক Parameter-এর Function

```javascript
function square(number) {
  const result = number * number;
  console.log(result);
}

square(4);
```

### Output:

```text
16
```

---

## ৪. একাধিক Parameter

```javascript
function add(num1, num2) {
  const sum = num1 + num2;
  console.log(sum);
}

add(5, 71);
```

### Output:

```text
76
```

---

## ৫. Variable argument হিসেবে পাঠানো যায়

```javascript
function difference(num1, num2) {
  const diff = num1 - num2;
  console.log(diff);
}

const fatherAge = 40;
const myAge = 10;

difference(fatherAge, myAge);
```

---

## ৬. বেশি Argument দিলে কী হয়?

Function-এ যত parameter আছে, সাধারণত ততগুলো argument ব্যবহার হয়।

বেশি argument দিলে অতিরিক্তগুলো ignore হতে পারে।

```javascript
function addNumbers(a, b) {
  return a + b;
}

console.log(addNumbers(5, 8, 9, 6));
```

### Output:

```text
13
```

---

## ৭. arguments কী?

Function-এর ভিতরে arguments ব্যবহার করলে function call করার সময় দেওয়া সব argument পাওয়া যায়।

এটি array-এর মতো দেখতে, কিন্তু আসল array না।

```javascript
function addNumbers() {
  let sum = 0;

  for (const num of arguments) {
    sum = sum + num;
  }

  console.log(sum);
}

addNumbers(5, 8, 9, 6);
```

### Output:

```text
28
```

---

# Practice থেকে গুরুত্বপূর্ণ কোড

## পিতা ও পুত্রের বয়সের সমষ্টি

```javascript
function ageSum(fatherAge, sonAge) {
  console.log(fatherAge + sonAge);
}

ageSum(45, 18);
```

---

## দুই সংখ্যার গুণ

```javascript
function multiply(num1, num2) {
  console.log(num1 * num2);
}

multiply(20, 15);
```

---

## তিন subject-এর marks sum

```javascript
function totalMarks(bangla, english, math) {
  console.log(bangla + english + math);
}

totalMarks(80, 75, 90);
```

---

## বয়স বের করা

```javascript
function calculateAge(birthYear) {
  const age = 2026 - birthYear;
  console.log(age);
}

calculateAge(2000);
```

---

## লাউ কয়টা কিনতে পারবে

```javascript
function lauQuantity(money) {
  const quantity = money / 35;
  console.log(quantity);
}

lauQuantity(140);
```

---

## চার সংখ্যার গড়

```javascript
function average(a, b, c, d) {
  const avg = (a + b + c + d) / 4;
  console.log(avg);
}

average(10, 20, 30, 40);
```

---

## Selling price

```javascript
function sellingPrice(buyingPrice) {
  console.log(buyingPrice + 250);
}

sellingPrice(1000);
```

---

## ১০০ বছর হবে কোন সালে

```javascript
function hundredYears(birthYear) {
  console.log(birthYear + 100);
}

hundredYears(2000);
```

---

## মাসে মোবাইল ব্যবহারের সময়

```javascript
function monthlyMobileUse(hoursPerDay) {
  console.log(hoursPerDay * 30);
}

monthlyMobileUse(5);
```

---

# শর্ট নোট

✅ Parameter = function declaration-এর input নাম

✅ Argument = function call করার সময় দেওয়া value

✅ Function-এ এক বা একাধিক parameter থাকতে পারে

✅ একই function বিভিন্ন argument দিয়ে বারবার ব্যবহার করা যায়

✅ arguments দিয়ে সব argument পাওয়া যায়

# Function Return — গুরুত্বপূর্ণ নোট

## ১. return কী?

Function থেকে কোনো result ফেরত দিতে `return` ব্যবহার করা হয়।

`return` করা value অন্য variable-এ রাখা যায়।

পরে সেই value অন্য কাজে ব্যবহার করা যায়।

---

## ২. return ছাড়া function

শুধু কাজ করে।

কোনো value ফেরত দেয় না।

```javascript
function greet() {
  console.log("Hello");
}

greet();
```

---

## ৩. return সহ function

```javascript
function tenTimes(number) {
  const result = number * 10;
  return result;
}

const output = tenTimes(5);

console.log(output);
```

### Output:

```text
50
```

---

## ৪. return value variable-এ রাখা

```javascript
function add(price1, price2) {
  const total = price1 + price2;
  return total;
}

const bill = add(5, 80);

console.log(bill);
```

### Output:

```text
85
```

---

## ৫. সরাসরি return করা যায়

```javascript
function add(price1, price2) {
  return price1 + price2;
}
```

---

## ৬. return value আবার function-এ ব্যবহার

```javascript
const potato = 35;
const onion = 62;
const shirt = 500;
const pant = 1250;

function add(price1, price2) {
  return price1 + price2;
}

const bill1 = add(potato, onion);
const bill2 = add(shirt, pant);
const final = add(bill1, bill2);

console.log(final);
```

### Output:

```text
1847
```

---

## ৭. Condition দিয়ে return

```javascript
function isEven(num) {
  if (num % 2 === 0) {
    return true;
  } else {
    return false;
  }
}

console.log(isEven(5));
console.log(isEven(110));
```

### Output:

```text
false
true
```

---

## ৮. return হলে function থেমে যায়

`return` execute হলে function আর নিচের code চালায় না।

তাই অনেক সময় `else` ছাড়াও return করা যায়।

```javascript
function isOdd(num) {
  if (num % 2 === 1) {
    return true;
  }

  return false;
}
```

---

# Practice থেকে গুরুত্বপূর্ণ কোড

## ১০-এর বেশি হলে true

```javascript
function isGreaterThanTen(num) {
  if (num > 10) {
    return true;
  }

  return false;
}

console.log(isGreaterThanTen(15));
```

---

## ১৩ দিয়ে ভাগ যায় কি না

```javascript
function divisibleBy13(num) {
  if (num % 13 === 0) {
    return true;
  }

  return false;
}

console.log(divisibleBy13(26));
```

---

## Restaurant bill

```javascript
function totalBill(rice, curry, drinks) {
  return rice + curry + drinks;
}

const bill = totalBill(50, 100, 30);
console.log(bill);
```

---

## Voting eligibility

```javascript
function checkVoting(age) {
  if (age > 18) {
    return "Eligible for Voting";
  }

  return "Not Eligible";
}

console.log(checkVoting(20));
```

---

## String length return

```javascript
function getLength(text) {
  return text.length;
}

console.log(getLength("JavaScript"));
```

---

## তিন সংখ্যার গড়

```javascript
function average(num1, num2, num3) {
  return (num1 + num2 + num3) / 3;
}

console.log(average(10, 20, 30));
```

---

## Negative number positive করা

```javascript
function makePositive(num) {
  if (num < 0) {
    return num * -1;
  }

  return num;
}

console.log(makePositive(-8));
```

---

# শর্ট নোট

✅ `return` function থেকে value ফেরত দেয়

✅ `return` value variable-এ store করা যায়

✅ `return`-এর পরে function থেমে যায়

✅ calculation result return করা যায়

✅ condition অনুযায়ী আলাদা return দেওয়া যায়

✅ শুধু print করতে চাইলে `console.log()`

✅ value ব্যবহার করতে চাইলে `return`

# Function Practice + Parameter/Return — গুরুত্বপূর্ণ নোট

## ১. Function দিয়ে সমস্যা সমাধানের ধাপ

- Function ঠিকমতো call হচ্ছে কি না চেক করা
- Parameter থেকে value নেওয়া
- প্রয়োজনীয় calculation/condition করা
- return দিয়ে result ফেরত দেওয়া

---

## ২. String-এর length জোড় নাকি বিজোড়

```javascript
function evenSizedString(str) {
  const size = str.length;

  if (size % 2 === 0) {
    return true;
  } else {
    return false;
  }
}

const isEven = evenSizedString("Human");
console.log(isEven);
```

---

## ৩. Boolean Parameter ব্যবহার

```javascript
function doubleOrTriple(num, doDouble) {
  if (doDouble === true) {
    return num * 2;
  } else {
    return num * 3;
  }
}

console.log(doubleOrTriple(5, true));
console.log(doubleOrTriple(5, false));
```

### Output:

```text
10
15
```

---

## ৪. Array Parameter হিসেবে পাঠানো

```javascript
function numberOfElement(nums) {
  const len = nums.length;
  return len;
}

const len = numberOfElement([12, 45, 78, 45, 121254, 4, 5]);

console.log(len);
```

### Output:

```text
7
```

---

## ৫. Parameter হিসেবে কী কী পাঠানো যায়?

✅ Number

✅ String

✅ Boolean

✅ Array

✅ Object

---

# Practice থেকে গুরুত্বপূর্ণ কোড

## Array-এর element সংখ্যা জোড় নাকি বিজোড়

```javascript
function isEvenElement(array) {
  if (array.length % 2 === 0) {
    return true;
  }

  return false;
}

console.log(isEvenElement([10, 20, 30, 40]));
```

---

## নামের প্রথম অক্ষর return

```javascript
function firstLetter(name) {
  return name[0];
}

console.log(firstLetter("Raju"));
```

---

## ১০-এর বড় হলে ভাগ, ছোট হলে গুণ

```javascript
function calculate(num) {
  if (num > 10) {
    return num / 10;
  }

  return num * 10;
}

console.log(calculate(20));
```

---

## Array-এর প্রথম দুই উপাদানের যোগফল

```javascript
function firstTwoSum(numbers) {
  return numbers[0] + numbers[1];
}

console.log(firstTwoSum([10, 20, 30]));
```

---

## Positive হলে double, negative হলে triple

```javascript
function positiveNegative(num) {
  if (num > 0) {
    return num * 2;
  }

  return num * 3;
}

console.log(positiveNegative(-5));
```

---

## দুই নামের length compare

```javascript
function compareName(name1, name2) {
  if (name1.length > name2.length) {
    return true;
  }

  return false;
}

console.log(compareName("Rahim", "Karim"));
```

---

## গুণফল 100-এর বেশি হলে অর্ধেক return

```javascript
function multiplyResult(num1, num2) {
  const result = num1 * num2;

  if (result > 100) {
    return result / 2;
  }

  return result;
}

console.log(multiplyResult(20, 10));
```

---

# শর্ট নোট

✅ Function-এর parameter dynamic value নেয়

✅ Function result দিতে return ব্যবহার হয়

✅ Boolean, Array, String parameter হিসেবে দেওয়া যায়

✅ length দিয়ে string/array size জানা যায়

✅ Condition ব্যবহার করে আলাদা result return করা যায়

✅ return হলে function value ফেরত দেয় এবং থেমে যায়

---

# Function দিয়ে Array Operation — গুরুত্বপূর্ণ নোট

## ১. Function-এ Array পাঠানো যায়

Function-এর parameter হিসেবে array পাঠানো যায়।

তারপর function-এর ভিতরে array-এর উপর loop চালানো যায়।

```javascript
function sumOfNumbers(numbers) {
  console.log(numbers);
}

sumOfNumbers([12, 45, 6, 8, 14]);
```

---

## ২. Array-এর সব সংখ্যার যোগফল

```javascript
function sumOfNumbers(numbers) {
  let sum = 0;

  for (const number of numbers) {
    sum = sum + number;
  }

  return sum;
}

const nums = [54, 62, 12, 6];
const total = sumOfNumbers(nums);

console.log("Sum of Numbers is", total);
```

---

## ৩. return কোথায় দিতে হবে?

Final result চাইলে return loop-এর বাইরে দিতে হবে।

Loop-এর ভিতরে return দিলে প্রথম iteration-এই function বন্ধ হয়ে যাবে।

```javascript
for (const number of numbers) {
  sum = sum + number;
}

return sum;
```

---

## ৪. শুধু জোড় সংখ্যার যোগফল

```javascript
function evenNumbersSum(numbers) {
  let sum = 0;

  for (const number of numbers) {
    if (number % 2 === 0) {
      sum = sum + number;
    }
  }

  return sum;
}

const total = evenNumbersSum([54, 13, 1, 6]);
console.log(total);
```

### Output:

```text
60
```

---

# সমস্যা সমাধানের ধাপ

- Function declare করো
- Parameter হিসেবে array নাও
- Loop দিয়ে প্রতিটি element বের করো
- দরকার হলে condition দাও
- Result return করো

---

# Practice থেকে গুরুত্বপূর্ণ কোড

## শুধু বিজোড় সংখ্যার যোগফল

```javascript
function oddNumbersSum(numbers) {
  let sum = 0;

  for (const number of numbers) {
    if (number % 2 !== 0) {
      sum = sum + number;
    }
  }

  return sum;
}

console.log(oddNumbersSum([5, 15, 8, 7]));
```

---

## প্রথম দুই উপাদানের মধ্যে ছোটটি

```javascript
function smallerFirstTwo(numbers) {
  if (numbers[0] < numbers[1]) {
    return numbers[0];
  }

  return numbers[1];
}

console.log(smallerFirstTwo([20, 45, 78]));
```

---

## বয়স লুকানোর function

```javascript
function showAge(age) {
  if (age < 18) {
    return 18;
  }

  if (age > 45) {
    return 45;
  }

  return age;
}

console.log(showAge(16));
```

---

## ৪ দিয়ে ভাগ যায় এমন সংখ্যার যোগফল

```javascript
function divisibleBy4Sum(numbers) {
  let sum = 0;

  for (const number of numbers) {
    if (number % 4 === 0) {
      sum = sum + number;
    }
  }

  return sum;
}

console.log(divisibleBy4Sum([2, 4, 5, 7, 8, 32, 45]));
```

---

## ২০-এর কম হলে double, না হলে ২০ দিয়ে ভাগ

```javascript
function calculateNumber(number) {
  if (number < 20) {
    return number * 2;
  }

  return number / 20;
}

console.log(calculateNumber(10));
```

---

## শুধু negative সংখ্যার যোগফল

```javascript
function negativeSum(numbers) {
  let sum = 0;

  for (const number of numbers) {
    if (number < 0) {
      sum = sum + number;
    }
  }

  return sum;
}

console.log(negativeSum([10, -5, 20, -7]));
```

---

## ৩ দিয়ে ভাগ যায় এমন সংখ্যার গুণফল

```javascript
function divisibleBy3Multiply(numbers) {
  let multiply = 1;

  for (const number of numbers) {
    if (number % 3 === 0) {
      multiply = multiply * number;
    }
  }

  return multiply;
}

console.log(divisibleBy3Multiply([3, 6, 4, 9]));
```

---

# শর্ট নোট

✅ Function parameter হিসেবে array নিতে পারে

✅ Array-এর উপর for...of loop চালানো যায়

✅ যোগফলের জন্য `sum = 0`

✅ গুণফলের জন্য `multiply = 1`

✅ Condition দিয়ে নির্দিষ্ট element বাছাই করা যায়

✅ Final result return loop-এর বাইরে দিতে হয়

# JavaScript রিভিশন চিটশিট 🚀

---

# ১. Variable

```javascript
const name = "Rahim"; // change করা যাবে না
let age = 20; // change করা যাবে

age = 21;
```

## ডাটা টাইপ:

```javascript
let num = 10; // Number
let text = "Hello"; // String
let status = true; // Boolean
let data = null; // Null
let value; // Undefined
let nums = [1, 2, 3]; // Array
let person = {}; // Object
```

---

# ২. Condition

```javascript
if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}
```

## Comparison Operators:

| Operator | Meaning               |
| -------- | --------------------- |
| >        | Greater than          |
| <        | Less than             |
| >=       | Greater than or equal |
| <=       | Less than or equal    |
| ===      | Equal                 |
| !==      | Not Equal             |

---

## Logical Operators:

```javascript
&&   // AND
||   // OR
```

---

# ৩. Array

```javascript
const fruits = ["Apple", "Banana", "Mango"];
```

## Index:

```javascript
console.log(fruits[0]); // Apple
console.log(fruits[2]); // Mango
```

---

## Array Methods:

```javascript
fruits.push("Orange"); // Add at end
fruits.pop(); // Remove from end

fruits.unshift("Lichi"); // Add at start
fruits.shift(); // Remove from start
```

---

## Check value:

```javascript
fruits.includes("Mango");
fruits.indexOf("Mango");
```

---

# ৪. Loop

## for...of

```javascript
const nums = [10, 20, 30];

for (const num of nums) {
  console.log(num);
}
```

---

## while

```javascript
let i = 1;

while (i <= 5) {
  console.log(i);
  i++;
}
```

---

## for

```javascript
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

---

# ৫. break & continue

## break

```javascript
for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    break;
  }
  console.log(i);
}
```

---

## continue

```javascript
for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    continue;
  }
  console.log(i);
}
```

---

# ৬. Object

```javascript
const student = {
  name: "Rahim",
  age: 18,
  class: 10,
};
```

---

## Dot Notation:

```javascript
console.log(student.name);
```

---

## Bracket Notation:

```javascript
console.log(student["age"]);
```

---

## Update Property:

```javascript
student.age = 19;
```

---

# ৭. Object Keys & Values

```javascript
const keys = Object.keys(student);
const values = Object.values(student);

console.log(keys);
console.log(values);
```

---

# ৮. Object Loop

## for...in

```javascript
for (const key in student) {
  console.log(key, student[key]);
}
```

---

# ৯. Function

## Function Declaration:

```javascript
function greet() {
  console.log("Hello");
}

greet();
```

---

# ১০. Function Parameter

```javascript
function doubleIt(number) {
  console.log(number * 2);
}

doubleIt(10);
```

---

## Multiple Parameters:

```javascript
function add(a, b) {
  console.log(a + b);
}

add(5, 10);
```

---

# ১১. Return

```javascript
function add(a, b) {
  return a + b;
}

const result = add(5, 7);
console.log(result);
```

---

# ১২. Array + Function

## সব সংখ্যার যোগফল:

```javascript
function sumOfNumbers(numbers) {
  let sum = 0;

  for (const num of numbers) {
    sum += num;
  }

  return sum;
}

console.log(sumOfNumbers([10, 20, 30]));
```

---

## শুধু জোড় সংখ্যার যোগফল:

```javascript
function evenSum(numbers) {
  let sum = 0;

  for (const num of numbers) {
    if (num % 2 === 0) {
      sum += num;
    }
  }

  return sum;
}

console.log(evenSum([1, 2, 3, 4, 5, 6]));
```

---

# সামনে যাওয়ার আগে যা অবশ্যই পারতে হবে

✅ Variable (`const`, `let`)

✅ Data Types

✅ `if`, `else`, `else if`

✅ Comparison & Logical Operators

✅ Array (`index`, `push`, `pop`, `shift`, `unshift`)

✅ Loop (`for`, `while`, `for...of`)

✅ `break`, `continue`

✅ Object (`dot notation`, `bracket notation`)

✅ Object Loop (`for...in`)

✅ Function

✅ Parameter

✅ Return

✅ Function + Array + Loop একসাথে ব্যবহার

---

এইগুলো ভালোভাবে আয়ত্ত করতে পারলে JavaScript-এর পরের ধাপ (**String, More Functions, DOM, Events, ES6, API ইত্যাদি**) শেখা অনেক সহজ হবে। 💪
