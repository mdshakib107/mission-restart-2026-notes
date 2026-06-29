# Comparison Operator, Variable Comparison এবং `===` বনাম `==` — গুরুত্বপূর্ণ নোট

---

# Comparison (তুলনা) Operator

## মূল ধারণা

JavaScript-এ এক মানের সাথে আরেক মানের তুলনা করা যায়।

তুলনার ফলাফল সব সময়:

- `true`
- `false`

অর্থাৎ **Boolean Value**।

---

## Comparison Operator

| Operator | অর্থ |
|----------|------|
| `>` | বড় |
| `<` | ছোট |
| `==` | সমান |
| `>=` | বড় বা সমান |
| `<=` | ছোট বা সমান |
| `!=` | সমান নয় |
| `&&` | AND (দুইটাই সত্য হতে হবে) |
| `\|\|` | OR (যেকোনো একটি সত্য হলেই হবে) |

---

## Greater Than (`>`)

```javascript
console.log(5 > 10);
```

### Output

```text
false
```

**কারণ:** `5`, `10`-এর চেয়ে বড় নয়।

---

## Less Than (`<`)

```javascript
console.log(5 < 10);
```

### Output

```text
true
```

**কারণ:** `5`, `10`-এর চেয়ে ছোট।

---

## Equal (`==`)

```javascript
console.log(5 == 10);
```

### Output

```text
false
```

---

```javascript
console.log(10 == 10);
```

### Output

```text
true
```

---

## Greater Than or Equal (`>=`)

```javascript
console.log(10 >= 10);
```

### Output

```text
true
```

---

```javascript
console.log(15 >= 10);
```

### Output

```text
true
```

---

## Less Than or Equal (`<=`)

```javascript
console.log(5 <= 10);
```

### Output

```text
true
```

---

## Not Equal (`!=`)

```javascript
console.log(7 != 10);
```

### Output

```text
true
```

**কারণ:** `7` এবং `10` সমান নয়।

---

## মূল শিক্ষা

- Comparison করলে Output আসে `true` অথবা `false`।
- Comparison Operator Decision Making-এর জন্য গুরুত্বপূর্ণ।
- সংখ্যা ও Variable—দুইটার সাথেই Comparison করা যায়।

---

# পরীক্ষার জন্য গুরুত্বপূর্ণ প্রশ্ন

| প্রশ্ন | উত্তর |
|--------|-------|
| `>` Operator কী বোঝায়? | বড় |
| `<` Operator কী বোঝায়? | ছোট |
| `==` Operator কী কাজে লাগে? | দুইটি মান সমান কি না চেক করতে |
| `!=` Operator কী বোঝায়? | সমান নয় |
| `5 > 10` এর Output কী? | `false` |
| `5 < 10` এর Output কী? | `true` |
| `10 == 10` এর Output কী? | `true` |
| `10 >= 10` এর Output কী? | `true` |
| Comparison-এর Output কী ধরনের হয়? | Boolean (`true` বা `false`) |
| `&&` এবং `\|\|` কী ধরনের Operator? | Logical Operator |

---

# ভেরিয়েবলের তুলনা কখনো ভুলোনা

## মূল ধারণা

- শুধু সংখ্যা নয়, Variable-এর সাথেও Comparison করা যায়।
- Comparison-এর Result সব সময় `true` অথবা `false`।
- Variable-এর Value-এর ভিত্তিতে তুলনা করা হয়।

---

## Number Variable-এর তুলনা

```javascript
const peyaraPrice = 40;
const applePrice = 250;

console.log(peyaraPrice > applePrice);
```

### Output

```text
false
```

**কারণ:** `40`, `250`-এর চেয়ে বড় নয়।

---

```javascript
const peyaraPrice = 40;
const applePrice = 250;

console.log(peyaraPrice < applePrice);
```

### Output

```text
true
```

**কারণ:** `40`, `250`-এর চেয়ে ছোট।

---

## String Variable-এর তুলনা

```javascript
const myName = "Rahim";
const friendName = "Karim";

console.log(myName == friendName);
```

### Output

```text
false
```

**কারণ:** `"Rahim"` এবং `"Karim"` এক নয়।

---

## Boolean Variable-এর তুলনা

```javascript
const myPromise = true;
const friendPromise = false;

console.log(myPromise == friendPromise);
```

### Output

```text
false
```

**কারণ:** `true` এবং `false` সমান নয়।

---

## Boolean-এর সাথে সরাসরি তুলনা

```javascript
const didStudy = true;

console.log(didStudy != false);
```

### Output

```text
true
```

**কারণ:** `true` এবং `false` ভিন্ন।

---

## Comparison Operator Summary

| Operator | অর্থ |
|----------|------|
| `>` | বড় কি না |
| `<` | ছোট কি না |
| `==` | সমান কি না |
| `!=` | অসমান কি না |
| `>=` | বড় বা সমান কি না |
| `<=` | ছোট বা সমান কি না |

---

## Comparison কীভাবে কাজ করে?

সাধারণ গঠন:

```javascript
value1 operator value2
```

### উদাহরণ

```javascript
age > 18;
```

এখানে

| অংশ | মান |
|------|-----|
| বামপাশের Value | `age` |
| Operator | `>` |
| ডানপাশের Value | `18` |

---

## মূল শিক্ষা

- Number, String ও Boolean—সব ধরনের Variable তুলনা করা যায়।
- Comparison-এর Result সব সময় Boolean হয়।
- Decision নেওয়ার জন্য Comparison ব্যবহার করা হয়।
- Variable-এর Value-এর ভিত্তিতে তুলনা করা হয়।

---

# পরীক্ষার জন্য গুরুত্বপূর্ণ প্রশ্ন

| প্রশ্ন | উত্তর |
|--------|-------|
| Variable-এর সাথে Variable তুলনা করা যায় কি? | হ্যাঁ |
| Comparison-এর Result কী হয়? | `true` অথবা `false` |
| `40 > 250` এর Output কী? | `false` |
| `40 < 250` এর Output কী? | `true` |
| `"Rahim" == "Karim"` এর Output কী? | `false` |
| `true == false` এর Output কী? | `false` |
| `true != false` এর Output কী? | `true` |
| `>=` কী বোঝায়? | বড় অথবা সমান |
| `<=` কী বোঝায়? | ছোট অথবা সমান |
| `!=` কী বোঝায়? | সমান নয় (Not Equal) |

---

# ডাবল নাকি ট্রিপল (`===`)

## মূল ধারণা

JavaScript-এ সমান কি না চেক করার জন্য দুটি Operator ব্যবহৃত হয়।

- `==`
- `===`

---

## Double Equal (`==`)

```javascript
console.log(10 == "10");
```

### Output

```text
true
```

### কারণ

- Value দুইটিই `10`।
- `==` Data Type চেক করে না।

---

## Triple Equal (`===`)

```javascript
console.log(10 === "10");
```

### Output

```text
false
```

### কারণ

- `10` হলো Number।
- `"10"` হলো String।
- Value একই হলেও Type আলাদা।

---

## `==` বনাম `===`

| Operator | কী চেক করে |
|----------|-------------|
| `==` | শুধু Value |
| `===` | Value + Data Type |

---

## Not Equal (`!=`)

```javascript
console.log(10 != "10");
```

### Output

```text
false
```

### কারণ

`!=` শুধু Value দেখে।

---

## Strict Not Equal (`!==`)

```javascript
console.log(10 !== "10");
```

### Output

```text
true
```

### কারণ

- Value একই।
- কিন্তু Type আলাদা।
- তাই Strict Comparison-এ Equal নয়।

---

## String তুলনা

```javascript
console.log("JavaScript" == "JavaScript");
console.log("JavaScript" === "JavaScript");
```

### Output

```text
true
true
```

### কারণ

- Value একই।
- Type-ও একই (String)।

---

## Case Sensitive তুলনা

```javascript
console.log("test" == "TEST");
console.log("test" === "TEST");
```

### Output

```text
false
false
```

### কারণ

JavaScript Case-Sensitive।

---

## ভালো Practice

সাধারণত

```javascript
===
```

এবং

```javascript
!==
```

ব্যবহার করা ভালো।

কারণ এগুলো Value এবং Data Type—দুইটাই যাচাই করে।

---

## মূল শিক্ষা

- `==` → Loose Comparison
- `===` → Strict Comparison
- `!=` → Loose Not Equal
- `!==` → Strict Not Equal
- Professional Code-এ সাধারণত `===` ব্যবহার করা হয়।

---

# Comparison Operator-এর সম্পূর্ণ Summary

| Operator | নাম | কী চেক করে |
|----------|------|-------------|
| `>` | Greater Than | বামপাশ বড় কি না |
| `<` | Less Than | বামপাশ ছোট কি না |
| `>=` | Greater Than or Equal | বড় অথবা সমান কি না |
| `<=` | Less Than or Equal | ছোট অথবা সমান কি না |
| `==` | Loose Equal | শুধু Value |
| `===` | Strict Equal | Value + Data Type |
| `!=` | Loose Not Equal | শুধু Value Equal নয় কি না |
| `!==` | Strict Not Equal | Value অথবা Data Type আলাদা কি না |
| `&&` | Logical AND | দুইটিই সত্য হতে হবে |
| `\|\|` | Logical OR | যেকোনো একটি সত্য হলেই হবে |

---

# `==`, `===`, `!=`, `!==` এক নজরে

| Expression | Output | কারণ |
|------------|--------|------|
| `10 == "10"` | `true` | Value একই |
| `10 === "10"` | `false` | Type আলাদা |
| `10 != "10"` | `false` | Value একই |
| `10 !== "10"` | `true` | Type আলাদা |
| `"apple" === "apple"` | `true` | Value ও Type একই |
| `"test" === "TEST"` | `false` | Case আলাদা |

---

# পরীক্ষার জন্য গুরুত্বপূর্ণ প্রশ্ন

| প্রশ্ন | উত্তর |
|--------|-------|
| `==` কী চেক করে? | শুধু Value |
| `===` কী চেক করে? | Value এবং Data Type |
| `10 == "10"` এর Output কী? | `true` |
| `10 === "10"` এর Output কী? | `false` |
| `!=` কী চেক করে? | Value Equal নয় কি না |
| `!==` কী চেক করে? | Value বা Data Type আলাদা কি না |
| `"apple" === "apple"` এর Output কী? | `true` |
| `"test" === "TEST"` এর Output কী? | `false` |
| JavaScript-এ কোন Comparison বেশি Recommended? | `===` |
| Strict Not Equal Operator কোনটি? | `!==` |

---
