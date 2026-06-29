# JavaScript Day 3: Operators & Expressions (বাংলা স্টাডি নোট)

## Table of Contents

1. Introduction
2. Operator, Operand, Expression
3. Arithmetic Operators
4. Assignment Operators
5. Comparison Operators
6. Logical Operators
7. Nullish Coalescing Operator
8. Conditional (Ternary) Operator
9. Bitwise Operators
10. Relational Operators
11. Grouping & Operator Precedence
12. typeof Operator
13. instanceof Operator
14. Common Mistakes
15. Assignment
16. Final Summary
17. Practice Checklist

---

# Introduction

Programming-এ Logic Building শুরু হয় Operators এবং Expressions দিয়ে। Variables-এর উপর কাজ করা, Calculation করা, Condition Check করা এবং Decision নেওয়ার জন্য Operators ব্যবহার করা হয়।

---

# Operator, Operand এবং Expression

| Term       | অর্থ                                    |
| ---------- | --------------------------------------- |
| Operator   | কোনো কাজ করার Symbol                    |
| Operand    | যে Value-এর উপর Operator কাজ করে        |
| Expression | এমন Code যা Evaluate হয়ে একটি Value দেয় |

### Example

```js
4 + 5;
```

- 4 এবং 5 = Operand
- - = Operator
- পুরো লাইন = Expression
- Result = 9

---

# Arithmetic Operators

## Addition (+)

```js
10 + 20;
```

Result: `30`

## Subtraction (-)

```js
20 - 10;
```

Result: `10`

## Multiplication (\*)

```js
10 * 20;
```

Result: `200`

## Division (/)

```js
10 / 20;
```

Result: `0.5`

## Exponentiation (\*\*)

```js
2 ** 3;
```

Result:

```js
8;
```

## Modulus (%)

```js
12 % 5;
```

Result:

```js
2;
```

ভাগশেষ Return করে।

---

## Increment & Decrement

### Post Increment

```js
let count = 5;
console.log(count++);
```

Output: 5

তারপর count হবে 6।

### Pre Increment

```js
let count = 5;
console.log(++count);
```

Output: 6

### মনে রাখার নিয়ম

- `count++` → আগে Return, পরে Increment
- `++count` → আগে Increment, পরে Return

---

# Assignment Operators

```js
x += 5;
x -= 3;
x *= 2;
x /= 4;
```

সমতুল্য:

```js
x = x + 5;
x = x - 3;
x = x * 2;
x = x / 4;
```

---

# Comparison Operators

সব Comparison Operator Boolean Return করে।

## Loose Equality (==)

```js
0 == false;
```

Result:

```js
true;
```

কারণ Type Conversion হয়।

### Common Problem

```js
3 == "3";
```

Result:

```js
true;
```

---

## Strict Equality (===)

```js
3 === "3";
```

Result:

```js
false;
```

কারণ Value একই হলেও Type ভিন্ন।

### Recommendation

সবসময় `===` ব্যবহার করা ভালো।

---

## Not Equal

```js
!=
!==
```

`!==` ব্যবহার করাই নিরাপদ।

---

## Greater/Less Than

```js
>
<
>=
<=
```

---

# Logical Operators

## AND (&&)

Rule:

যদি প্রথম Operand False হয়, সেটিই Return হয়।

```js
true && false;
```

Result:

```js
false;
```

### Shortcut

AND-এ কোনো একটি False হলে Result False।

---

## OR (||)

Rule:

যদি প্রথম Operand True হয়, সেটিই Return হয়।

```js
true || false;
```

Result:

```js
true;
```

### Shortcut

OR-এ কোনো একটি True হলে Result True।

---

## NOT (!)

```js
!true;
```

Result:

```js
false;
```

---

# Nullish Coalescing Operator (??)

শুধুমাত্র `null` এবং `undefined` Check করে।

```js
null ?? "Hello";
```

Output:

```js
Hello;
```

```js
false ?? "Hello";
```

Output:

```js
false;
```

কারণ false null বা undefined নয়।

---

# Conditional (Ternary) Operator

Syntax:

```js
condition ? value1 : value2;
```

Example:

```js
let age = 23;

age >= 60 ? "Senior Citizen" : "Non Senior Citizen";
```

---

# Bitwise Operators

Binary (0 এবং 1) Level-এ কাজ করে।

| Operator | Meaning     |
| -------- | ----------- |
| &        | Bitwise AND |
| \|       | Bitwise OR  |
| ^        | XOR         |
| ~        | NOT         |
| <<       | Left Shift  |
| >>       | Right Shift |

### Example

```js
15 & 9;
```

Result:

```js
9;
```

```js
15 ^ 9;
```

Result:

```js
6;
```

---

# Relational Operator

## in

Object-এর মধ্যে Property আছে কিনা Check করতে ব্যবহার হয়।

```js
"name" in user;
```

---

# Grouping & Operator Precedence

```js
1 + 2 * 3;
```

Result:

```js
7;
```

কারণ Multiplication আগে Execute হয়।

```js
(1 + 2) * 3;
```

Result:

```js
9;
```

কারণ Parentheses-এর Priority বেশি।

---

# typeof Operator

Value-এর Type Return করে।

```js
typeof "Hello";
```

Result:

```js
"string";
```

```js
typeof 100;
```

Result:

```js
"number";
```

```js
typeof false;
```

Result:

```js
"boolean";
```

### Special Case

```js
typeof null;
```

Output:

```js
"object";
```

JavaScript-এর একটি ঐতিহাসিক Bug।

---

# instanceof Operator

Object নির্দিষ্ট Type-এর Instance কিনা Check করে।

```js
car instanceof Vehicle;
```

Result:

```js
true / false;
```

---

# Common Mistakes

## Mistake 1

```js
3 == "3";
```

Loose Equality ব্যবহার।

### Better

```js
3 === "3";
```

---

## Mistake 2

Pre/Post Increment গুলিয়ে ফেলা।

```js
count++;
++count;
```

---

## Mistake 3

Operator Precedence ভুলে যাওয়া।

```js
1 + 2 * 3;
```

---

# Assignment

১. Addition, Subtraction, Multiplication, Division-এর Example লিখো।

২. `==` এবং `===` এর পার্থক্য প্রমাণ করো।

৩. `&&`, `||`, `!` ব্যবহার করে ১০টি Example তৈরি করো।

৪. `??` Operator-এর ৫টি Example তৈরি করো।

৫. Ternary Operator ব্যবহার করে Grade System তৈরি করো।

৬. `typeof` দিয়ে বিভিন্ন Value-এর Type বের করো।

৭. Bitwise AND, OR, XOR Practice করো।

---

# Final Summary

এই Lesson-এ আমরা শিখেছি:

- Operator
- Operand
- Expression
- Arithmetic Operators
- Assignment Operators
- Comparison Operators
- Logical Operators
- Nullish Coalescing
- Ternary Operator
- Bitwise Operators
- Grouping
- typeof
- instanceof

এগুলো JavaScript Logic Building-এর Foundation।

---

# Practice Checklist

- [ ] Arithmetic Operators বুঝেছি
- [ ] Increment/Decrement বুঝেছি
- [ ] Assignment Operators Practice করেছি
- [ ] Strict Equality ব্যবহার করতে পারি
- [ ] Logical Operators বুঝেছি
- [ ] Nullish Coalescing ব্যবহার করতে পারি
- [ ] Ternary Operator লিখতে পারি
- [ ] Bitwise Basics বুঝেছি
- [ ] typeof ব্যবহার করতে পারি
- [ ] instanceof ধারণা বুঝেছি
