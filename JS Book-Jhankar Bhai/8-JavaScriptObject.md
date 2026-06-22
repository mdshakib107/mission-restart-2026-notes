# JavaScript Object — গুরুত্বপূর্ণ নোট

## ১. Object কী?

কোনো একটি জিনিসের অনেকগুলো বৈশিষ্ট্য একসাথে রাখার জন্য object ব্যবহার করা হয়।

Object-এর মধ্যে ডাটা key-value pair আকারে রাখা হয়।

---

## ২. Object কেন দরকার?

একটি variable-এ শুধু একটি মান রাখা যায়।

Array-তে অনেক মান রাখা যায়, কিন্তু কোন মান কী বোঝাচ্ছে তা পরিষ্কার নাও হতে পারে।

Object-এ প্রতিটি মানের সাথে তার নাম থাকে, তাই বুঝতে সহজ হয়।

---

## ৩. Empty Object

```javascript
const student = {};
```

---

## ৪. Object Structure

```javascript
const objectName = {
  key: value,
  key: value,
};
```

এখানে:

- key = property-এর নাম
- value = property-এর মান
- প্রতিটি key-value pair-এর মাঝে comma `,` দিতে হয়

---

## ৫. Student Object Example

```javascript
const student = {
  name: "Motaleb",
  age: 15,
  class: 9,
  isSingle: false,
};
```

---

## ৬. Object-এর value কী কী হতে পারে?

Object-এর value হতে পারে:

- String
- Number
- Boolean
- Array
- আরেকটি Object

---

## ৭. Nested Object ও Array

```javascript
const subject = {
  name: "biology",
  teacher: "rasheda",
  examDate: "30 dec",
  chapters: ["first", "second", "third"],
  nextExam: {
    name: "Final Exam",
    marks: 100,
  },
};
```

এখানে:

- chapters হলো Array
- nextExam হলো Object-এর ভিতরে আরেকটি Object

---

# Practice থেকে গুরুত্বপূর্ণ Object

## Teacher Object

```javascript
const teacher = {
  name: "Rahim Sir",
  subject: "Math",
  age: 35,
  address: "Dhaka",
  experience: 10,
};
```

---

## Tree Object

```javascript
const tree = {
  name: "Mango Tree",
  height: "20 feet",
  age: 10,
  fruit: "Mango",
  color: "Green",
};
```

---

## Motorbike Object

```javascript
const motorbike = {
  brand: "Yamaha",
  wheels: 2,
  color: "Black",
  maxSpeed: 120,
  price: 250000,
};
```

---

## Laptop Object

```javascript
const laptop = {
  brand: "Dell",
  processor: "Core i5",
  ram: "8GB",
  price: 65000,
  displaySize: "15.6 inch",
};
```

---

## শর্ট নোট

✅ Object = কোনো জিনিসের অনেক বৈশিষ্ট্য একসাথে রাখার system

✅ Object `{ }` দিয়ে লেখা হয়

✅ Object key-value pair আকারে থাকে

✅ Syntax: `key: value`

✅ Object-এর value string, number, boolean, array বা object হতে পারে

✅ Object data বেশি clear ও organized করে রাখে

# Object Property Key — গুরুত্বপূর্ণ নোট

## ১. Object-এর property access করা

Object-এর ভিতরের value বের করার ২টি উপায় আছে:

- Dot notation
- Bracket notation

---

## ২. Dot Notation

### Syntax

```javascript
objectName.propertyName;
```

### Example

```javascript
const person = {
  name: "sodor uddain",
  age: 25,
  profession: "developer",
  salary: 25000,
  married: true,
};

console.log(person.profession);
```

### Output

```text
developer
```

---

## ৩. Bracket Notation

### Syntax

```javascript
objectName["propertyName"];
```

### Example

```javascript
const person = {
  name: "sodor uddain",
  married: true,
  "fav places": ["bandarban", "saintmartin", "kuakata"],
};

console.log(person["married"]);
console.log(person["fav places"]);
```

---

## ৪. কখন Bracket Notation ব্যবহার করব?

Bracket notation ব্যবহার করতে হয় যখন:

- property name-এর মধ্যে space থাকে
- property name বিশেষ চিহ্নযুক্ত হয়
- property name কোনো variable-এর মধ্যে থাকে

### Variable দিয়ে property access

```javascript
const person = {
  profession: "developer",
};

const propertyName = "profession";

console.log(person[propertyName]);
```

### Output

```text
developer
```

---

## ৫. Property value update করা

### Dot notation দিয়ে

```javascript
cricketer.position = 1;
```

### Bracket notation দিয়ে

```javascript
cricketer["runs"] = 9000;
```

### Example

```javascript
const cricketer = {
  position: 4,
  specialty: "batter",
  age: 24,
  runs: 8000,
};

cricketer.position = 1;
cricketer["runs"] = 9000;

console.log(cricketer.position);
console.log(cricketer.runs);
```

---

## ৬. Nested Object Access

Object-এর ভিতরে object থাকলে ধাপে ধাপে access করতে হয়।

```javascript
const college = {
  name: "vnc",
  unique: {
    color: "blue",
    result: {
      gpa: 5,
      merit: "top",
    },
  },
};

console.log(college.unique.color);
console.log(college.unique.result.gpa);
```

### Output

```text
blue
5
```

---

## ৭. Object-এর ভিতরে Array Access

```javascript
const college = {
  events: ["science fair", "bijoy dibos", "21 feb"],
};

console.log(college.events[2]);
```

### Output

```text
21 feb
```

---

# Dot Notation vs Bracket Notation

| বিষয়                     | Dot Notation       | Bracket Notation |
| ------------------------ | ------------------ | ---------------- |
| Syntax                   | object.key         | object['key']    |
| সহজ property             | ব্যবহার করা যায়    | ব্যবহার করা যায়  |
| space থাকলে              | ব্যবহার করা যায় না | ব্যবহার করা যায়  |
| variable দিয়ে key access | ব্যবহার করা যায় না | ব্যবহার করা যায়  |

---

# Practice থেকে গুরুত্বপূর্ণ কোড

## Team বের করা

```javascript
const player = {
  name: "Messi",
  age: 36,
  sports: "Football",
  team: "Argentina",
};

console.log(player.team);
```

---

## Screen size বের করা

```javascript
const laptop = {
  brand: "Dell",
  price: 65000,
  hardDisc: "1TB",
  ram: "8GB",
  screenSize: "15.6 inch",
};

console.log(laptop.screenSize);
```

---

## Bracket notation দিয়ে popularity

```javascript
const favPlace = {
  name: "Cox's Bazar",
  distance: "400km",
  popularity: "high",
};

console.log(favPlace["popularity"]);
```

---

## College groups-এর 1 index

```javascript
const college = {
  name: "ndc",
  established: 1949,
  groups: ["Science", "Arts", "Commerce"],
};

console.log(college.groups[1]);
```

---

## Nested family object

```javascript
const family = {
  father: {
    name: "Father Name",
    age: 50,
    profession: "Business",
  },
  mother: {
    name: "Mother Name",
    age: 45,
    profession: "Teacher",
  },
};

const totalAge = family.father.age + family.mother.age;

console.log(family.mother.age);
console.log(family.father.age);
console.log(totalAge);
```

---

# শর্ট নোট

✅ Object property বের করতে dot notation ব্যবহার করা যায়

✅ Space/special key হলে bracket notation লাগে

✅ Variable দিয়ে key access করতে bracket notation লাগে

✅ Property value update করা যায়

✅ Nested object access করতে dot দিয়ে ধাপে ধাপে ভিতরে যেতে হয়

✅ Object-এর ভিতরে array থাকলে index ব্যবহার করা যায়

# Object Keys, Values, Entries — গুরুত্বপূর্ণ নোট

## ১. Object-এর property

Object-এর property দুইটি অংশ নিয়ে তৈরি:

- key = property-এর নাম
- value = property-এর মান

```javascript
const computer = {
  brand: "lenovo",
  price: 35000,
};
```

এখানে `brand`, `price` হলো key

আর `'lenovo'`, `35000` হলো value

---

## ২. Object.keys()

### কাজ:

Object-এর সব key বের করে array আকারে দেয়।

```javascript
const computer = {
  brand: "lenovo",
  price: 35000,
  processor: "intel",
  ssd: "512gb",
};

const keys = Object.keys(computer);

console.log(keys);
```

### Output:

```javascript
["brand", "price", "processor", "ssd"];
```

---

## ৩. Object.values()

### কাজ:

Object-এর সব value বের করে array আকারে দেয়।

```javascript
const values = Object.values(computer);

console.log(values);
```

### Output:

```javascript
["lenovo", 35000, "intel", "512gb"];
```

---

## ৪. Object.entries()

### কাজ:

Object-এর key-value pair গুলো array of arrays আকারে দেয়।

```javascript
const person = {
  name: "Alice",
  age: 25,
  country: "Bangladesh",
};

const entries = Object.entries(person);

console.log(entries);
```

### Output:

```javascript
[
  ["name", "Alice"],
  ["age", 25],
  ["country", "Bangladesh"],
];
```

---

## ৫. Property আছে কি না চেক

### Object.keys() + includes()

```javascript
const profile = {
  name: "Rahim",
  age: 28,
  city: "Dhaka",
};

const keys = Object.keys(profile);

console.log(keys.includes("name"));
```

### Output:

```text
true
```

---

### in operator

```javascript
if ("email" in profile) {
  console.log("email exists");
} else {
  console.log("No email");
}
```

---

### hasOwnProperty()

```javascript
console.log(profile.hasOwnProperty("city"));
```

---

## ৬. Value চেক করা

```javascript
if (profile.city === "Dhaka") {
  console.log("Jam er sohor Dhaka.");
} else {
  console.log("Aram sob gram e.");
}
```

---

## ৭. for...in Loop

### কাজ:

Object-এর key গুলোর উপর loop চালায়।

```javascript
const profile = {
  name: "Rahim",
  age: 28,
  city: "Dhaka",
};

for (const key in profile) {
  const value = profile[key];
  console.log(key, value);
}
```

### Output:

```text
name Rahim
age 28
city Dhaka
```

---

## ৮. Object.keys() দিয়ে for...of Loop

```javascript
const profile = {
  name: "Rahim",
  age: 28,
  city: "Dhaka",
};

const keys = Object.keys(profile);

for (const key of keys) {
  console.log(key, profile[key]);
}
```

---

# Practice থেকে গুরুত্বপূর্ণ কোড

## Book object keys ও values

```javascript
const book = {
  name: "JavaScript Basics",
  author: "Jhankar Mahbub",
  price: 500,
};

console.log(Object.keys(book));
console.log(Object.values(book));
```

---

## author আছে কি না

```javascript
const article = {
  title: "Learning JS",
  category: "Programming",
};

console.log("author" in article);
```

---

## Laptop object for...in

```javascript
const laptop = {
  brand: "Dell",
  model: "Inspiron",
  price: 45000,
};

for (const key in laptop) {
  console.log(key, laptop[key]);
}
```

---

## Phone object Object.keys + for...of

```javascript
const phone = {
  brand: "Samsung",
  model: "Galaxy S21",
  price: 85000,
};

const keys = Object.keys(phone);

for (const key of keys) {
  console.log(key, phone[key]);
}
```

---

## Bike values

```javascript
const bike = {
  brand: "Hero",
  price: 120000,
  model: "Splendor",
};

console.log(Object.values(bike));
```

---

## Books loop

```javascript
const books = {
  book1: "Harry Potter",
  book2: "The Hobbit",
  book3: "Game of Thrones",
};

for (const key in books) {
  console.log(books[key]);
}
```

---

## Object values যোগফল

```javascript
const numbers = {
  a: 10,
  b: 20,
  c: 30,
  d: 40,
};

let sum = 0;

for (const key in numbers) {
  sum = sum + numbers[key];
}

console.log(sum);
```

---

## Player values

```javascript
const player = {
  name: "Messi",
  team: "Argentina",
  goals: 91,
};

console.log(Object.values(player));
```

---

## Building object loop

```javascript
const building = {
  floors: 10,
  address: {
    street: "Main Road",
    city: "Dhaka",
  },
  type: "Commercial",
};

for (const key in building) {
  console.log(key, building[key]);
}
```

---

# শর্ট নোট

✅ `Object.keys(obj)` = সব key দেয়

✅ `Object.values(obj)` = সব value দেয়

✅ `Object.entries(obj)` = key-value pair দেয়

✅ `'key' in object` = property আছে কি না চেক করে

✅ `hasOwnProperty()` = নিজস্ব property আছে কি না চেক করে

✅ `for...in` = object-এর key এর উপর loop চালায়

✅ `object[key]` দিয়ে value পাওয়া যায়

# Object Freeze, Seal, Delete — গুরুত্বপূর্ণ নোট

## ১. delete কী?

Object থেকে কোনো property বাদ দিতে `delete` ব্যবহার করা হয়।

```javascript
const person = {
  name: "Alice",
  age: 25,
  country: "Bangladesh",
};

delete person.age;

console.log(person);
```

### Output:

```javascript
{ name: 'Alice', country: 'Bangladesh' }
```

---

## ২. Object.freeze()

### কাজ:

`Object.freeze()` দিলে object পুরোপুরি lock হয়ে যায়।

Freeze করার পর:

- নতুন property যোগ করা যায় না
- property delete করা যায় না
- existing property-এর value change করা যায় না

```javascript
const adminUser = {
  username: "admin",
  email: "admin@example.com",
  role: "superadmin",
};

Object.freeze(adminUser);

adminUser.role = "user";
adminUser.password = "123456";
delete adminUser.email;

console.log(adminUser);
```

### Output:

```javascript
{ username: 'admin', email: 'admin@example.com', role: 'superadmin' }
```

---

## ৩. Object.seal()

### কাজ:

`Object.seal()` দিলে object আংশিক lock হয়।

Seal করার পর:

- নতুন property যোগ করা যায় না
- property delete করা যায় না
- কিন্তু existing property-এর value change করা যায়

```javascript
const user = {
  username: "johndoe",
  email: "john.doe@example.com",
  password: "oldpassword",
};

Object.seal(user);

user.password = "newpassword";
user.age = 30;
delete user.email;

console.log(user);
```

### Output:

```javascript
{ username: 'johndoe', email: 'john.doe@example.com', password: 'newpassword' }
```

---

## ৪. Seal vs Freeze

| বিষয়              | Object.freeze() | Object.seal() |
| ----------------- | --------------- | ------------- |
| নতুন property যোগ | ❌ যায় না       | ❌ যায় না     |
| property delete   | ❌ যায় না       | ❌ যায় না     |
| value change      | ❌ যায় না       | ✅ যায়        |
| Lock level        | বেশি strict     | কম strict     |

---

# Practice থেকে গুরুত্বপূর্ণ কোড

## headphone freeze

```javascript
const headphone = {
  brand: "Sony",
  price: 3000,
  color: "red",
};

Object.freeze(headphone);

headphone.type = "wireless";

console.log(headphone);
```

---

## player freeze

```javascript
const player = {
  name: "Messi",
  goals: 800,
  club: "Inter Miami",
};

Object.freeze(player);

player.age = 36;

console.log(player);
```

---

## book seal করে author change

```javascript
const book = {
  title: "Harry Potter",
  author: "JK Rowling",
  pages: 500,
};

Object.seal(book);

book.author = "J. K. Rowling";

console.log(book);
```

---

## gadget থেকে price delete

```javascript
const gadget = {
  name: "iPhone",
  price: 120000,
  color: "Black",
};

delete gadget.price;

console.log(gadget);
```

---

## animal-এর location change বন্ধ

```javascript
const animal = {
  name: "Tiger",
  location: "Sundarban",
};

Object.freeze(animal);

animal.location = "Zoo";

console.log(animal);
```

---

## food-এ নতুন property না, কিন্তু price change হবে

```javascript
const food = {
  name: "Pizza",
  price: 500,
  size: "Large",
};

Object.seal(food);

food.price = 600;
food.flavor = "Cheese";

console.log(food);
```

---

# শর্ট নোট

✅ `delete object.key` = property delete করে

✅ `Object.freeze(obj)` = add/delete/update কিছুই করা যায় না

✅ `Object.seal(obj)` = add/delete করা যায় না, update করা যায়

✅ Freeze বেশি strict

✅ Seal তুলনামূলক flexible
