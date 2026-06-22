# Unit Conversion Function — গুরুত্বপূর্ণ নোট

## ১. ইঞ্চি থেকে ফুট

```javascript
function inchToFeet(inch) {
  const feet = inch / 12;
  return feet;
}

console.log(inchToFeet(75));
```

### Output:

```text
6.25
```

---

## ২. ইঞ্চি থেকে ফুট + বাকি ইঞ্চি

```javascript
function inchToFeet2(inch) {
  const feetNumber = parseInt(inch / 12);
  const inchRemaining = inch % 12;

  return feetNumber + " ft " + inchRemaining + " inch";
}

console.log(inchToFeet2(75));
```

### Output:

```text
6 ft 3 inch
```

---

## ৩. মাইল থেকে কিলোমিটার

```javascript
function mileToKilometer(mile) {
  const kilometer = mile * 1.60934;
  return kilometer;
}

console.log(mileToKilometer(5));
```

---

# Practice থেকে গুরুত্বপূর্ণ কোড

## ১৩ মাইল = কত গজ

```javascript
function mileToYard(mile) {
  return mile * 1760;
}

console.log(mileToYard(13));
```

---

## কিলোওয়াট ঘণ্টা থেকে কিলো ক্যালরি

```javascript
function kwhToKcal(kwh) {
  return kwh * 860;
}

console.log(kwhToKcal(5));
```

---

## ঘণ্টা থেকে সেকেন্ড

```javascript
function hourToSecond(hour) {
  return hour * 60 * 60;
}

console.log(hourToSecond(2));
```

---

## সেন্টিমিটার থেকে মিটার

```javascript
function centimeterToMeter(cm) {
  return cm / 100;
}

console.log(centimeterToMeter(250));
```

---

## ইঞ্চি থেকে সেন্টিমিটার

```javascript
function inchToCentimeter(inch) {
  return inch * 2.54;
}

console.log(inchToCentimeter(10));
```

---

## পাউন্ড থেকে কিলোগ্রাম

```javascript
function poundToKg(pound) {
  return pound * 0.453;
}

console.log(poundToKg(20));
```

---

## গজ থেকে মিটার

```javascript
function yardToMeter(yard) {
  return yard * 0.91;
}

console.log(yardToMeter(10));
```

---

# শর্ট নোট

✅ Unit conversion করতে function ব্যবহার করা যায়

✅ Formula জানা থাকলে function বানানো সহজ

✅ Function input নেয় parameter দিয়ে

✅ Calculation করে result return করে

✅ ভাগশেষ দরকার হলে `%` ব্যবহার করা হয়

✅ পূর্ণ সংখ্যা দরকার হলে `parseInt()` ব্যবহার করা যায়

---

# Leap Year — গুরুত্বপূর্ণ নোট

## ১. Leap Year কী?

যে বছরে ৩৬৫ দিনের বদলে ৩৬৬ দিন থাকে, সেটি Leap Year।

সাধারণভাবে ৪ দিয়ে ভাগ গেলে Leap Year হতে পারে।

---

## ২. সহজ নিয়ম

```javascript
function isLeapYear(year) {
  if (year % 4 === 0) {
    return true;
  } else {
    return false;
  }
}
```

কিন্তু এটি সবসময় ১০০% সঠিক নয়।

---

## ৩. সঠিক Leap Year নিয়ম

Leap Year হবে যদি:

✅ বছরটি 400 দিয়ে ভাগ যায়

অথবা

✅ বছরটি 100 দিয়ে ভাগ যায় না, কিন্তু 4 দিয়ে ভাগ যায়

Leap Year হবে না যদি:

❌ বছরটি 100 দিয়ে ভাগ যায়, কিন্তু 400 দিয়ে ভাগ যায় না

---

## ৪. সঠিক কোড

```javascript
function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  } else if (year % 100 === 0) {
    return false;
  } else if (year % 4 === 0) {
    return true;
  } else {
    return false;
  }
}

console.log(isLeapYear(2100));
console.log(isLeapYear(2400));
console.log(isLeapYear(1900));
console.log(isLeapYear(2052));
```

### Output:

```text
false
true
false
true
```

---

# Practice থেকে গুরুত্বপূর্ণ কোড

## Income tax bracket

```javascript
function getTaxRate(income) {
  if (income <= 50000) {
    return 10;
  } else if (income <= 100000) {
    return 20;
  } else if (income <= 200000) {
    return 30;
  } else {
    return 40;
  }
}
```

---

## Delivery cost

```javascript
function deliveryCost(weight) {
  if (weight < 10) {
    return 100;
  } else if (weight < 20) {
    return 300;
  } else if (weight < 50) {
    return 1000;
  } else {
    return weight * 100;
  }
}
```

---

## Grade function

```javascript
function getGrade(marks) {
  if (marks >= 80) {
    return "A";
  } else if (marks >= 70) {
    return "B";
  } else if (marks >= 60) {
    return "C";
  } else if (marks >= 50) {
    return "D";
  } else {
    return "F";
  }
}
```

---

## Array থেকে Leap Year count

```javascript
function countLeapYears(years) {
  let count = 0;

  for (const year of years) {
    if (isLeapYear(year)) {
      count++;
    }
  }

  return count;
}

console.log(countLeapYears([1900, 2000, 2024, 2100, 2400]));
```

---

# শর্ট নোট

✅ `year % 400 === 0` → Leap Year

✅ `year % 100 === 0` → Not Leap Year

✅ `year % 4 === 0` → Leap Year

✅ Condition order খুব গুরুত্বপূর্ণ

✅ Function-এর ভিতরে if-else দিয়ে real-life problem solve করা যায়

---

# বিজোড় সংখ্যার গড় — গুরুত্বপূর্ণ নোট

## মূল কাজ

একটি array থেকে শুধু বিজোড় সংখ্যা বের করে তাদের average বের করা।

---

## ধাপে ধাপে আইডিয়া

- Function বানাতে হবে
- Parameter হিসেবে array নিতে হবে
- Loop চালিয়ে প্রতিটি সংখ্যা বের করতে হবে
- বিজোড় সংখ্যা চেক করতে হবে
- বিজোড় সংখ্যাগুলো আলাদা array-তে রাখতে হবে
- বিজোড় সংখ্যাগুলোর যোগফল বের করতে হবে
- যোগফলকে বিজোড় সংখ্যার count দিয়ে ভাগ করতে হবে
- বিজোড় সংখ্যা না থাকলে 0 return করতে হবে

---

## বিজোড় সংখ্যার Average

```javascript
function oddAverage(numbers) {
  const odds = [];

  for (const number of numbers) {
    if (number % 2 !== 0) {
      odds.push(number);
    }
  }

  if (odds.length === 0) {
    return 0;
  }

  let sum = 0;

  for (const number of odds) {
    sum = sum + number;
  }

  const avg = sum / odds.length;
  return avg;
}

console.log(oddAverage([42, 13, 58, 65, 81, 96, 7]));
```

### Output:

```text
41.5
```

---

## NaN কেন আসে?

যদি কোনো বিজোড় সংখ্যা না থাকে, তাহলে `odds.length` হয় 0

তখন `sum / 0` করলে সমস্যা হয়

তাই আগে check করতে হয়:

```javascript
if (odds.length === 0) {
  return 0;
}
```

---

# Practice থেকে গুরুত্বপূর্ণ কোড

## জোড় সংখ্যার average

```javascript
function evenAverage(numbers) {
  const evens = [];

  for (const number of numbers) {
    if (number % 2 === 0) {
      evens.push(number);
    }
  }

  if (evens.length === 0) {
    return 0;
  }

  let sum = 0;

  for (const number of evens) {
    sum += number;
  }

  return sum / evens.length;
}
```

---

## বিজোড় সংখ্যাগুলোকে ২ দিয়ে গুণ

```javascript
function doubleOdd(numbers) {
  const result = [];

  for (const number of numbers) {
    if (number % 2 !== 0) {
      result.push(number * 2);
    }
  }

  return result;
}
```

---

## বিজোড় সংখ্যা আছে কি না

```javascript
function checkOdd(numbers) {
  for (const number of numbers) {
    if (number % 2 !== 0) {
      return "Odd numbers found";
    }
  }

  return "No odd numbers found";
}
```

---

## দশমিকের পরে দুই ঘর average

```javascript
function oddAverageTwoDecimal(numbers) {
  const avg = oddAverage(numbers);
  return avg.toFixed(2);
}
```

---

## প্রতিটি বিজোড় সংখ্যা থেকে ১ বিয়োগ

```javascript
function oddMinusOne(numbers) {
  const result = [];

  for (const number of numbers) {
    if (number % 2 !== 0) {
      result.push(number - 1);
    }
  }

  return result;
}
```

---

# শর্ট নোট

✅ বিজোড় চেক: `number % 2 !== 0`

✅ Average = `sum / count`

✅ বিজোড় সংখ্যা আলাদা রাখতে `push()` ব্যবহার হয়

✅ কোনো বিজোড় না থাকলে আগে check করতে হবে

✅ Final result পেতে return loop-এর বাইরে দিতে হবে

---

# Duplicate Remove — গুরুত্বপূর্ণ নোট

## ১. Duplicate কী?

Array-এর মধ্যে একই value একাধিকবার থাকলে তাকে duplicate বলে।

```javascript
const numbers = [1, 5, 61, 5, 87, 7, 5, 81, 61];
```

এখানে `5` এবং `61` duplicate আছে।

---

## ২. Duplicate remove করার idea

- নতুন empty array বানাবো
- Main array-এর উপর loop চালাবো
- প্রতিটি item নতুন array-তে আছে কি না check করবো
- না থাকলে `push()` করবো
- থাকলে ignore করবো

---

## ৩. Duplicate Remove Function

```javascript
function noDuplicate(array) {
  const unique = [];

  for (const item of array) {
    if (unique.includes(item) === false) {
      unique.push(item);
    }
  }

  return unique;
}

const numbers = [1, 5, 61, 5, 87, 7, 5, 81, 61];

const uniqueNumbers = noDuplicate(numbers);

console.log(uniqueNumbers);
```

### Output:

```text
[1, 5, 61, 87, 7, 81]
```

---

# শর্ট নোট

✅ `includes()` দিয়ে check করা হয় value আগে আছে কি না

✅ না থাকলে `push()` করে নতুন array-তে রাখা হয়

✅ নতুন array-টাই হয় duplicate-free array

✅ Function return করবে clean array

---

# Variable Swap — গুরুত্বপূর্ণ নোট

## ১. Swap কী?

দুটি variable-এর মান অদলবদল করাকে swap বলে।

```javascript
let a = 5;
let b = 7;
```

Swap করার পর:

```javascript
a = 7;
b = 5;
```

---

## ২. সরাসরি swap করলে সমস্যা

```javascript
a = b;
b = a;
```

এতে দুটোর মান একই হয়ে যায়।

```javascript
let a = 5;
let b = 7;

a = b;
b = a;

console.log(a, b);
```

### Output:

```text
7 7
```

---

## ৩. Temp variable দিয়ে swap

```javascript
let a = 5;
let b = 7;

const temp = a;
a = b;
b = temp;

console.log(a, b);
```

### Output:

```text
7 5
```

---

## ৪. temp কী করে?

`temp` সাময়িকভাবে `a`-এর পুরোনো মান ধরে রাখে।

তারপর `a`-তে `b`-এর মান বসে।

শেষে `b`-তে `temp`-এর মান বসে।

---

# শর্ট নোট

✅ Swap = মান অদলবদল

✅ সরাসরি `a = b; b = a;` করলে ভুল result আসে

✅ পুরোনো মান ধরে রাখতে `temp` variable লাগে

✅ Formula:

```javascript
const temp = a;
a = b;
b = temp;
```
