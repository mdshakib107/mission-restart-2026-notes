# Rendering Lists

## React-এ List Render করা

React application-এ প্রায়ই একটি data collection থেকে একই ধরনের অনেকগুলো Component বা JSX element দেখাতে হয়।

যেমন:

* Product list
* Student list
* Comment list
* Profile gallery
* Todo list
* Notification list

React-এ array-এর data থেকে list তৈরি করতে সাধারণত JavaScript-এর:

* `map()`
* `filter()`

method ব্যবহার করা হয়।

`map()` array-এর প্রতিটি item-কে JSX element-এ রূপান্তর করে।

`filter()` condition অনুযায়ী নির্দিষ্ট item-গুলো বেছে নিয়ে নতুন array তৈরি করে।

React-এ list render করার সময় প্রতিটি item-কে একটি unique `key` দিতে হয়।

---

# এই অধ্যায়ে যা শিখব

এই অধ্যায়ে শেখানো হয়েছে:

1. JavaScript-এর `map()` ব্যবহার করে array থেকে Component render করা
2. `filter()` ব্যবহার করে নির্দিষ্ট Component দেখানো
3. React list-এ `key` কখন এবং কেন ব্যবহার করতে হয়
4. সঠিক `key` কোথা থেকে নিতে হয়
5. `key` ব্যবহারের নিয়ম
6. একাধিক DOM node-সহ list item render করা

---

# ১. Array থেকে Data Render করা

## Rendering Data from Arrays

ধরা যাক, আমাদের কাছে কয়েকজন বিজ্ঞানীর একটি list আছে।

```html
<ul>
  <li>Creola Katherine Johnson: mathematician</li>
  <li>Mario José Molina-Pasquel Henríquez: chemist</li>
  <li>Mohammad Abdus Salam: physicist</li>
  <li>Percy Lavon Julian: chemist</li>
  <li>Subrahmanyan Chandrasekhar: astrophysicist</li>
</ul>
```

এখানে প্রতিটি `<li>` element-এর structure একই।

শুধু data আলাদা:

* নাম
* পেশা

এই ধরনের ক্ষেত্রে একই JSX বারবার হাতে না লিখে data-কে একটি JavaScript array-তে রাখা যায়।

তারপর `map()` ব্যবহার করে প্রতিটি data item থেকে একটি JSX element তৈরি করা যায়।

---

# ২. Data Array-তে নেওয়া

প্রথমে list-এর data একটি array-তে রাখা হয়েছে।

> **Documentation-এর মূল code**

```jsx
const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];
```

এখানে `people` একটি array।

Array-টির প্রতিটি item একটি string।

```jsx
people[0]
```

এর value:

```text
Creola Katherine Johnson: mathematician
```

---

# ৩. `map()` দিয়ে JSX তৈরি করা

এরপর `people` array-এর প্রতিটি item থেকে একটি `<li>` element তৈরি করা হয়েছে।

> **Documentation-এর মূল code**

```jsx
const listItems = people.map(person =>
  <li>{person}</li>
);
```

এখানে:

```jsx
people.map(...)
```

array-এর প্রতিটি item-এর ওপর function চালাচ্ছে।

প্রতিবার একটি item `person` parameter-এ আসছে।

```jsx
person => <li>{person}</li>
```

প্রতিটি `person` string-কে একটি `<li>` JSX element-এ পরিবর্তন করছে।

---

# `map()` কী Return করছে?

`map()` একটি নতুন array return করে।

ধারণাগতভাবে `listItems` হবে:

```jsx
[
  <li>Creola Katherine Johnson: mathematician</li>,
  <li>Mario José Molina-Pasquel Henríquez: chemist</li>,
  <li>Mohammad Abdus Salam: physicist</li>,
  <li>Percy Lavon Julian: chemist</li>,
  <li>Subrahmanyan Chandrasekhar: astrophysicist</li>
]
```

অর্থাৎ:

```text
Input array
→ String-এর array

map() চালানোর পর
→ JSX element-এর array
```

---

# ৪. JSX Array Render করা

`map()` থেকে পাওয়া JSX array-কে `<ul>` element-এর ভিতরে render করা হয়েছে।

> **Documentation-এর মূল code**

```jsx
return <ul>{listItems}</ul>;
```

এখানে:

```jsx
{listItems}
```

curly braces-এর মাধ্যমে JavaScript array JSX-এর ভিতরে ব্যবহার করা হয়েছে।

React array-এর প্রতিটি JSX element render করবে।

---

# সম্পূর্ণ Example

> **Documentation-এর মূল code**

### App.js

```jsx
const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];

export default function List() {
  const listItems = people.map(person =>
    <li>{person}</li>
  );

  return <ul>{listItems}</ul>;
}
```

---

# Code Flow

```text
people array
      ↓
map() প্রতিটি item নেয়
      ↓
প্রতিটি item থেকে <li> তৈরি করে
      ↓
listItems নামে JSX array তৈরি হয়
      ↓
<ul>{listItems}</ul>
      ↓
Browser-এ সম্পূর্ণ list render হয়
```

---

# Console Warning

উপরের code browser-এ list দেখাবে, কিন্তু console-এ একটি warning আসবে:

```text
Warning: Each child in a list should have a unique “key” prop.
```

এর কারণ প্রতিটি list item-এ unique `key` দেওয়া হয়নি।

এই warning পরে `key` ব্যবহার করে ঠিক করা হবে।

---

# ৫. Structured Data ব্যবহার

String array ছোট example-এর জন্য ঠিক আছে।

কিন্তু বাস্তব application-এ প্রতিটি item সম্পর্কে একাধিক information থাকতে পারে।

যেমন:

* ID
* নাম
* পেশা
* অর্জন
* ছবির ID

এক্ষেত্রে array-এর ভিতরে object রাখা যায়।

> **Documentation-এর মূল data structure**

```jsx
const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
}];
```

এখন প্রতিটি item একটি object।

উদাহরণ:

```jsx
people[1]
```

এর value:

```jsx
{
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist'
}
```

---

# ৬. Array Filter করা

## Filtering Arrays of Items

ধরা যাক, শুধু যাদের profession হলো:

```text
chemist
```

তাদের দেখাতে হবে।

এক্ষেত্রে JavaScript-এর `filter()` method ব্যবহার করা যায়।

`filter()`:

1. Array-এর প্রতিটি item পরীক্ষা করে
2. Test function `true` অথবা `false` return করে
3. শুধু `true` হওয়া item-গুলো নিয়ে নতুন array তৈরি করে

---

# Filter Condition

শুধু chemist নির্বাচন করার condition:

```jsx
person.profession === 'chemist'
```

এটি প্রতিটি person-এর profession পরীক্ষা করবে।

যদি profession `'chemist'` হয়:

```text
true
```

অন্য profession হলে:

```text
false
```

---

# `filter()` ব্যবহার

> **Documentation-এর মূল code**

```jsx
const chemists = people.filter(person =>
  person.profession === 'chemist'
);
```

এখানে:

```jsx
people.filter(...)
```

মূল `people` array-এর প্রতিটি object পরীক্ষা করছে।

```jsx
person => person.profession === 'chemist'
```

হলো test function।

শুধু condition true হওয়া person-গুলো `chemists` array-তে থাকবে।

---

# Filter করার পর Result

`chemists` array-তে থাকবে:

```jsx
[
  {
    id: 1,
    name: 'Mario José Molina-Pasquel Henríquez',
    profession: 'chemist'
  },
  {
    id: 3,
    name: 'Percy Lavon Julian',
    profession: 'chemist'
  }
]
```

`filter()` মূল array পরিবর্তন না করে একটি নতুন array return করে।

---

# ৭. Filter করা Data-তে `map()` চালানো

এখন `chemists` array-এর প্রতিটি person থেকে JSX তৈরি করা হবে।

> **Documentation-এর মূল code**

```jsx
const listItems = chemists.map(person =>
  <li>
    <img
      src={getImageUrl(person)}
      alt={person.name}
    />
    <p>
      <b>{person.name}:</b>
      {' ' + person.profession + ' '}
      known for {person.accomplishment}
    </p>
  </li>
);
```

---

# Code ব্যাখ্যা

```jsx
chemists.map(person =>
```

প্রতিটি chemist object-এর ওপর map চালাচ্ছে।

```jsx
<img
  src={getImageUrl(person)}
  alt={person.name}
/>
```

প্রতিটি person-এর ছবি দেখাচ্ছে।

```jsx
src={getImageUrl(person)}
```

`getImageUrl()` function person object থেকে image URL তৈরি করছে।

```jsx
alt={person.name}
```

ছবির alternative text হিসেবে person-এর নাম ব্যবহার করছে।

---

# Text তৈরি

```jsx
<p>
  <b>{person.name}:</b>
  {' ' + person.profession + ' '}
  known for {person.accomplishment}
</p>
```

এখানে:

```jsx
{person.name}
```

ব্যক্তির নাম দেখাচ্ছে।

```jsx
{' ' + person.profession + ' '}
```

নামের পরে profession এবং প্রয়োজনীয় space যোগ করছে।

```jsx
{person.accomplishment}
```

ব্যক্তির অর্জন দেখাচ্ছে।

---

# সম্পূর্ণ Filter Example

> **Documentation-এর মূল code**

### App.js

```jsx
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );

  const listItems = chemists.map(person =>
    <li>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
      </p>
    </li>
  );

  return <ul>{listItems}</ul>;
}
```

---

# Filter ও Map-এর Flow

```text
people array
      ↓
filter()
      ↓
শুধু chemist-দের array
      ↓
map()
      ↓
প্রতিটি chemist থেকে JSX
      ↓
<ul>-এর ভিতরে render
```

সহজভাবে:

```text
filter()
→ কোন data লাগবে তা নির্বাচন করে

map()
→ নির্বাচিত data কীভাবে দেখাবে তা নির্ধারণ করে
```

---

# ৮. Arrow Function-এর Return

## গুরুত্বপূর্ণ Pitfall

Arrow function সাধারণত `=>`-এর ঠিক পরের expression automatically return করে।

উদাহরণ:

> **Documentation-এর মূল code**

```jsx
const listItems = chemists.map(person =>
  <li>...</li>
);
```

এখানে explicit `return` প্রয়োজন নেই।

কারণ:

```jsx
person => <li>...</li>
```

একটি single expression।

এটিকে বলা হয় implicit return।

---

# Curly Braces ব্যবহার করলে `return` লিখতে হবে

যদি arrow function-এর `=>`-এর পরে `{}` ব্যবহার করা হয়, তাহলে explicit `return` লিখতে হবে।

> **Documentation-এর মূল code**

```jsx
const listItems = chemists.map(person => {
  return <li>...</li>;
});
```

এখানে `{}` একটি block body তৈরি করেছে।

Block body-এর ভিতরে `return` না লিখলে function কিছুই return করবে না।

---

# ভুল Example

```jsx
const listItems = chemists.map(person => {
  <li>{person.name}</li>;
});
```

এখানে কোনো `return` নেই।

ফলে `map()`-এর প্রতিটি iteration `undefined` return করবে এবং list render হবে না।

---

# সঠিক Example

```jsx
const listItems = chemists.map(person => {
  return <li>{person.name}</li>;
});
```

---

# সহজে মনে রাখার নিয়ম

```jsx
item => <li>{item}</li>
```

এখানে `return` লাগবে না।

```jsx
item => {
  return <li>{item}</li>;
}
```

এখানে `return` লাগবে।

---

# ৯. `key` দিয়ে List Item-এর Order বজায় রাখা

## Keeping List Items in Order with `key`

React list render করলে প্রতিটি JSX element-কে একটি unique `key` দিতে হয়।

```jsx
<li key={person.id}>
  ...
</li>
```

`key` string বা number হতে পারে।

এটি একই array-এর অন্যান্য item-এর মধ্যে বর্তমান item-কে uniquely identify করতে হবে।

---

# Correct List Item

```jsx
const listItems = people.map(person =>
  <li key={person.id}>
    {person.name}
  </li>
);
```

এখানে:

```jsx
key={person.id}
```

প্রতিটি person-এর unique ID key হিসেবে ব্যবহার করা হয়েছে।

---

# `key` কেন প্রয়োজন?

React-কে জানতে হয় কোন JSX item কোন data item-এর সঙ্গে সম্পর্কিত।

এটি বিশেষভাবে গুরুত্বপূর্ণ যখন list-এর item:

* Reorder হয়
* Sort হয়
* নতুন item insert হয়
* কোনো item delete হয়
* Item-এর data পরিবর্তিত হয়

একটি stable `key` React-কে বুঝতে সাহায্য করে ঠিক কোন item পরিবর্তিত হয়েছে। তারপর React সঠিক DOM update করতে পারে।

---

# Key ছাড়া সমস্যা

ধরা যাক list:

```text
A
B
C
```

এরপর শুরুতে নতুন item যোগ হলো:

```text
X
A
B
C
```

যদি React-এর কাছে stable key না থাকে, তাহলে item-গুলোর identity বুঝতে সমস্যা হতে পারে।

Stable key থাকলে:

```text
X → key x
A → key a
B → key b
C → key c
```

React সহজে বুঝতে পারে শুধু `X` নতুন।

---

# ১০. Data-এর সঙ্গে Key রাখা

React documentation পরামর্শ দেয় render করার সময় key তৈরি না করে data-এর মধ্যেই stable ID রাখা।

> **Documentation-এর মূল code**

### data.js

```jsx
export const people = [{
  id: 0, // Used in JSX as a key
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1, // Used in JSX as a key
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2, // Used in JSX as a key
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3, // Used in JSX as a key
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4, // Used in JSX as a key
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

এখানে প্রতিটি object-এর unique `id` আছে।

---

# List-এ Key ব্যবহার

```jsx
const listItems = people.map(person =>
  <li key={person.id}>
    <img
      src={getImageUrl(person)}
      alt={person.name}
    />
    <p>
      <b>{person.name}:</b>
      {' ' + person.profession + ' '}
      known for {person.accomplishment}
    </p>
  </li>
);
```

---

# গুরুত্বপূর্ণ Note

`map()` call-এর সরাসরি ভিতরে থাকা JSX element-এ key দিতে হয়।

সঠিক:

```jsx
people.map(person =>
  <li key={person.id}>
    {person.name}
  </li>
)
```

ভুল:

```jsx
people.map(person =>
  <li>
    {person.name}
  </li>
)
```

---

# ১১. প্রতিটি List Item-এ একাধিক DOM Node

## Displaying Several DOM Nodes for Each List Item

কখনো প্রতিটি list item-এর জন্য একটি নয়, একাধিক sibling DOM element render করতে হয়।

উদাহরণ:

```jsx
<h1>{person.name}</h1>
<p>{person.bio}</p>
```

প্রতিটি person-এর জন্য একটি heading এবং একটি paragraph।

এগুলোকে একটি `<div>`-এর ভিতরে রাখা যায়:

```jsx
people.map(person =>
  <div key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </div>
)
```

কিন্তু এতে DOM-এ অতিরিক্ত `<div>` তৈরি হবে।

---

# Short Fragment-এ Key দেওয়া যায় না

Short Fragment syntax:

```jsx
<>
  ...
</>
```

এখানে `key` prop দেওয়া যায় না।

ভুল:

```jsx
< key={person.id}>
```

অথবা:

```jsx
<> key={person.id}
```

এগুলো valid নয়।

---

# Explicit Fragment ব্যবহার

একাধিক DOM node render করতে এবং Fragment-এ key দিতে `Fragment` import করতে হয়।

> **Documentation-এর মূল code**

```jsx
import { Fragment } from 'react';

// ...

const listItems = people.map(person =>
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
);
```

এখানে:

```jsx
<Fragment key={person.id}>
```

Fragment-এ key দেওয়া হয়েছে।

Fragment final DOM-এ কোনো অতিরিক্ত wrapper element তৈরি করে না।

Final DOM ধারণাগতভাবে হবে:

```html
<h1>Person One</h1>
<p>Bio One</p>

<h1>Person Two</h1>
<p>Bio Two</p>
```

মাঝখানে কোনো অতিরিক্ত `<div>` থাকবে না।

---

# ১২. Key কোথা থেকে নেবেন?

## Where to Get Your `key`

Data কোথা থেকে এসেছে তার ওপর key-এর source নির্ভর করে।

## Database Data

যদি data database থেকে আসে, database-এর unique ID ব্যবহার করা যায়।

```jsx
key={person.id}
```

Database ID সাধারণত stable এবং unique হয়।

## Locally Generated Data

যদি data localভাবে তৈরি এবং সংরক্ষণ করা হয়, item তৈরি করার সময় stable ID তৈরি করা যায়।

Documentation-এ উদাহরণ হিসেবে বলা হয়েছে:

* Incrementing counter
* `crypto.randomUUID()`
* `uuid` package

গুরুত্বপূর্ণ বিষয় হলো ID item তৈরি করার সময় তৈরি করতে হবে, render করার সময় নয়।

---

# ১৩. Key-এর নিয়ম

## Rules of Keys

React key ব্যবহারের দুটি গুরুত্বপূর্ণ নিয়ম রয়েছে।

## নিয়ম ১: Sibling-এর মধ্যে Unique হতে হবে

একই array-এর sibling item-গুলোর key unique হতে হবে।

সঠিক:

```jsx
[
  <li key="a">A</li>,
  <li key="b">B</li>,
  <li key="c">C</li>
]
```

তবে আলাদা array-তে একই key আবার ব্যবহার করা যায়।

---

## নিয়ম ২: Key পরিবর্তন করা যাবে না

একটি item-এর key render-এর মধ্যে stable থাকতে হবে।

Key প্রতিবার পরিবর্তিত হলে key ব্যবহারের উদ্দেশ্য নষ্ট হয়ে যায়।

Render করার সময় নতুন key তৈরি করা উচিত নয়।

ভুল:

```jsx
<li key={Math.random()}>
```

কারণ প্রতিবার render হলে নতুন key তৈরি হবে।

সঠিক:

```jsx
<li key={person.id}>
```

কারণ `person.id` একই item-এর জন্য stable।

---

# ১৪. React-এর Key কেন দরকার?

## Why Does React Need Keys?

Documentation একটি file-এর উদাহরণ ব্যবহার করেছে।

ধরা যাক desktop-এর file-গুলোর কোনো নাম নেই।

তাহলে file-কে বলতে হবে:

```text
প্রথম file
দ্বিতীয় file
তৃতীয় file
```

এখন প্রথম file delete হলে:

```text
আগের দ্বিতীয় file → প্রথম file
আগের তৃতীয় file → দ্বিতীয় file
```

এতে identity নিয়ে বিভ্রান্তি তৈরি হবে।

File name যেমন একটি folder-এর file-কে uniquely identify করে, React list-এর key তেমনি sibling item-কে uniquely identify করে।

Item-এর position পরিবর্তিত হলেও key React-কে তার identity ধরে রাখতে সাহায্য করে।

---

# ১৫. Array Index Key হিসেবে ব্যবহার

অনেক সময় developer list item-এর key হিসেবে array index ব্যবহার করেন।

```jsx
people.map((person, index) =>
  <li key={index}>
    {person.name}
  </li>
)
```

এটি technically কাজ করতে পারে।

কিন্তু list-এর item:

* Insert
* Delete
* Reorder
* Sort

হলে index পরিবর্তিত হয়ে যায়।

ফলে React ভুল item-এর identity ধরে নিতে পারে এবং subtle bug তৈরি হতে পারে।

React key না দিলে internally index ব্যবহার করতে পারে, কিন্তু dynamic list-এর জন্য এটি নির্ভরযোগ্য নয়।

---

# কখন Index তুলনামূলকভাবে কম ঝুঁকিপূর্ণ?

> **নোট:** নিচের ব্যাখ্যাটি মূল documentation-এর বাইরে অতিরিক্তভাবে যোগ করা হয়েছে।

যদি list:

* কখনো reorder না হয়
* নতুন item insert না হয়
* Item delete না হয়
* সম্পূর্ণ static থাকে

তাহলে index key ব্যবহার করলে অনেক সময় দৃশ্যমান সমস্যা নাও হতে পারে।

তবুও stable unique ID পাওয়া গেলে সেটিই ব্যবহার করা ভালো।

---

# ১৬. `Math.random()` Key হিসেবে ব্যবহার করা যাবে না

ভুল:

```jsx
people.map(person =>
  <li key={Math.random()}>
    {person.name}
  </li>
)
```

প্রতিবার render হলে নতুন random key তৈরি হবে।

React তখন আগের item এবং নতুন item-কে একই হিসেবে চিনতে পারবে না।

ফলে:

* সব Component নতুন করে তৈরি হতে পারে
* DOM element recreate হতে পারে
* Performance খারাপ হতে পারে
* User input হারিয়ে যেতে পারে

Stable ID ব্যবহার করতে হবে:

```jsx
key={person.id}
```

---

# ১৭. `key` Component-এর Prop নয়

`key` React নিজে ব্যবহার করে।

Child Component তার props-এর মধ্যে `key` পায় না।

ধরা যাক:

```jsx
<Profile key={id} />
```

`Profile` Component এভাবে `key` পড়তে পারবে না:

```jsx
function Profile({ key }) {
}
```

এটি কাজ করবে না।

Component-এর ভিতরে ID প্রয়োজন হলে আলাদা prop পাঠাতে হবে।

> **Documentation-এর মূল pattern**

```jsx
<Profile
  key={id}
  userId={id}
/>
```

এখানে:

```jsx
key={id}
```

React ব্যবহার করবে।

আর:

```jsx
userId={id}
```

`Profile` Component prop হিসেবে পাবে।

---

# ১৮. Component List Render করা

শুধু HTML element নয়, custom Component-ও map দিয়ে render করা যায়।

> **অতিরিক্ত ব্যাখ্যা — মূল documentation-এর বাইরে**

```jsx
function Profile({ person }) {
  return (
    <article>
      <h2>{person.name}</h2>
      <p>{person.profession}</p>
    </article>
  );
}

export default function ProfileList() {
  return (
    <div>
      {people.map(person => (
        <Profile
          key={person.id}
          person={person}
        />
      ))}
    </div>
  );
}
```

এখানে:

```jsx
<Profile
  key={person.id}
  person={person}
/>
```

প্রতিটি array item থেকে একটি `Profile` Component তৈরি করছে।

---

# Documentation-এর মূল সারাংশ

এই অধ্যায়ে শেখানো হয়েছে:

* Component-এর বাইরে data array ও object-এ রাখা যায়
* `map()` ব্যবহার করে একই ধরনের অনেকগুলো JSX বা Component তৈরি করা যায়
* `filter()` ব্যবহার করে condition অনুযায়ী নির্দিষ্ট item নির্বাচন করা যায়
* List-এর প্রতিটি item-এ unique ও stable `key` দিতে হয়
* Key React-কে item-এর identity এবং position পরিবর্তন বুঝতে সাহায্য করে
* Key render করার সময় generate করা উচিত নয়
* Array index এবং `Math.random()` সাধারণত ভালো key নয়
* Child Component `key` prop হিসেবে পায় না

---

# গুরুত্বপূর্ণ সংজ্ঞা

## Array

একাধিক value সংরক্ষণের JavaScript data structure।

```jsx
const names = ['Rahim', 'Karim', 'Hasan'];
```

## `map()`

Array-এর প্রতিটি item-কে transform করে নতুন array তৈরি করে।

```jsx
names.map(name => <li>{name}</li>)
```

## `filter()`

Condition অনুযায়ী নির্দিষ্ট item নিয়ে নতুন array তৈরি করে।

```jsx
people.filter(person =>
  person.profession === 'chemist'
)
```

## `key`

List-এর sibling item-কে uniquely identify করার জন্য ব্যবহৃত string বা number।

```jsx
key={person.id}
```

## Stable Key

যে key একই item-এর জন্য render-এর মধ্যে পরিবর্তিত হয় না।

## Fragment

Extra DOM wrapper ছাড়া একাধিক JSX element group করার উপায়।

```jsx
<Fragment key={person.id}>
  ...
</Fragment>
```

---

# গুরুত্বপূর্ণ প্রশ্ন ও উত্তর

## প্রশ্ন ১: React-এ list render করতে কোন method ব্যবহার করা হয়?

সাধারণত JavaScript-এর `map()` method ব্যবহার করা হয়।

```jsx
people.map(person =>
  <li>{person.name}</li>
)
```

## প্রশ্ন ২: `map()` কী return করে?

একটি নতুন array return করে।

React-এর ক্ষেত্রে এটি JSX element-এর array হতে পারে।

## প্রশ্ন ৩: `filter()` কী করে?

Condition true হওয়া item-গুলো নিয়ে একটি নতুন array তৈরি করে।

## প্রশ্ন ৪: শুধু chemist-দের filter করার condition কী?

```jsx
person.profession === 'chemist'
```

## প্রশ্ন ৫: `filter()` কি মূল array পরিবর্তন করে?

না। এটি একটি নতুন array return করে।

## প্রশ্ন ৬: List item-এ `key` কেন দিতে হয়?

React যেন প্রতিটি item-এর identity বুঝতে পারে এবং insert, delete বা reorder হলে সঠিক DOM update করতে পারে।

## প্রশ্ন ৭: ভালো key কী?

Data-এর stable এবং unique ID।

```jsx
key={person.id}
```

## প্রশ্ন ৮: Key কি পুরো application-এ unique হতে হবে?

না। একই list-এর sibling item-গুলোর মধ্যে unique হতে হবে।

## প্রশ্ন ৯: `Math.random()` key হিসেবে ব্যবহার করা উচিত নয় কেন?

প্রতিবার render হলে নতুন key তৈরি হয়, ফলে React item-কে নতুন হিসেবে ধরে এবং Component ও DOM recreate করতে পারে।

## প্রশ্ন ১০: Array index key হিসেবে ব্যবহার করলে কী সমস্যা হতে পারে?

Item insert, delete বা reorder হলে index পরিবর্তিত হয় এবং React ভুল item identity ধরে নিতে পারে।

## প্রশ্ন ১১: Component কি `key` prop গ্রহণ করে?

না। `key` শুধু React ব্যবহার করে।

Component-এর ভিতরে ID লাগলে আলাদা prop পাঠাতে হয়।

```jsx
<Profile
  key={id}
  userId={id}
/>
```

## প্রশ্ন ১২: Short Fragment-এ key দেওয়া যায়?

না।

Key দিতে explicit `Fragment` ব্যবহার করতে হয়।

```jsx
import { Fragment } from 'react';
```

```jsx
<Fragment key={person.id}>
  ...
</Fragment>
```

## প্রশ্ন ১৩: Arrow function-এ কখন `return` লিখতে হয়?

`=>`-এর পরে curly braces block ব্যবহার করলে।

```jsx
items.map(item => {
  return <li>{item}</li>;
})
```

---

# খুব সংক্ষিপ্ত Revision

## Array থেকে List

```jsx
const listItems = people.map(person =>
  <li key={person.id}>
    {person.name}
  </li>
);

return <ul>{listItems}</ul>;
```

## Filter তারপর Map

```jsx
const chemists = people.filter(person =>
  person.profession === 'chemist'
);

const listItems = chemists.map(person =>
  <li key={person.id}>
    {person.name}
  </li>
);
```

## Implicit Return

```jsx
items.map(item =>
  <li key={item.id}>{item.name}</li>
)
```

## Explicit Return

```jsx
items.map(item => {
  return (
    <li key={item.id}>
      {item.name}
    </li>
  );
})
```

## Stable Key

```jsx
key={person.id}
```

## Avoid

```jsx
key={Math.random()}
```

```jsx
key={index}
```

বিশেষ করে dynamic list-এর ক্ষেত্রে।

---

# Documentation-এর Challenges

Documentation-এ চারটি challenge রয়েছে:

1. একটি list-কে দুইটি list-এ ভাগ করা
2. একই Component-এ nested list তৈরি করা
3. List item-কে আলাদা Component-এ extract করা
4. List item-এর মাঝে separator যোগ করা

---

# কীভাবে Practice করবেন

## Documentation-এর বাইরে অতিরিক্ত Practice

> **নোট:** নিচের practice section মূল React documentation-এর অংশ নয়। শেখা বিষয়গুলো বাস্তবে অনুশীলনের জন্য এটি অতিরিক্তভাবে যোগ করা হয়েছে।

---

## ১. Basic `map()` Practice

> **অতিরিক্ত Practice Code — মূল documentation-এর অংশ নয়**

```jsx
const subjects = [
  'Physics',
  'Chemistry',
  'Mathematics',
  'Biology'
];

export default function SubjectList() {
  const subjectItems = subjects.map(subject =>
    <li key={subject}>
      {subject}
    </li>
  );

  return <ul>{subjectItems}</ul>;
}
```

Practice:

* নতুন subject যোগ করুন
* একটি subject বাদ দিন
* `<li>`-এর ভিতরে subject-এর আগে `Subject:` যোগ করুন
* List-কে ordered list `<ol>`-এ পরিবর্তন করুন

---

## ২. Object Array Practice

> **অতিরিক্ত Practice Code — মূল documentation-এর অংশ নয়**

```jsx
const students = [
  {
    id: 1,
    name: 'Rahim',
    department: 'Civil Engineering'
  },
  {
    id: 2,
    name: 'Karim',
    department: 'Computer Science'
  },
  {
    id: 3,
    name: 'Sadia',
    department: 'Civil Engineering'
  }
];

export default function StudentList() {
  return (
    <ul>
      {students.map(student => (
        <li key={student.id}>
          <strong>{student.name}</strong>
          {' — '}
          {student.department}
        </li>
      ))}
    </ul>
  );
}
```

Practice:

* প্রতিটি student-এর age যোগ করুন
* Department heading যোগ করুন
* প্রতিটি item-কে `<article>` বানান
* Student Card Component তৈরি করুন

---

## ৩. `filter()` Practice

শুধু Civil Engineering student দেখান।

> **অতিরিক্ত Practice Code — মূল documentation-এর অংশ নয়**

```jsx
export default function CivilStudents() {
  const civilStudents = students.filter(student =>
    student.department === 'Civil Engineering'
  );

  return (
    <ul>
      {civilStudents.map(student => (
        <li key={student.id}>
          {student.name}
        </li>
      ))}
    </ul>
  );
}
```

Practice:

* শুধু Computer Science student দেখান
* নাম `R` দিয়ে শুরু হওয়া student filter করুন
* ID `2`-এর বেশি এমন student দেখান

---

## ৪. Bug Fixing Practice: Missing Key

### ভুল Code

```jsx
const products = [
  { id: 1, name: 'Keyboard' },
  { id: 2, name: 'Mouse' }
];

export default function ProductList() {
  return (
    <ul>
      {products.map(product => (
        <li>{product.name}</li>
      ))}
    </ul>
  );
}
```

### সমস্যা

প্রতিটি `<li>`-এ unique `key` নেই।

### সমাধান

```jsx
export default function ProductList() {
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name}
        </li>
      ))}
    </ul>
  );
}
```

---

## ৫. Bug Fixing Practice: Missing Return

### ভুল Code

```jsx
export default function ProductList() {
  const items = products.map(product => {
    <li key={product.id}>
      {product.name}
    </li>;
  });

  return <ul>{items}</ul>;
}
```

### সমস্যা

Arrow function-এর block body ব্যবহার করা হয়েছে, কিন্তু `return` নেই।

### সমাধান ১

```jsx
const items = products.map(product => {
  return (
    <li key={product.id}>
      {product.name}
    </li>
  );
});
```

### সমাধান ২

```jsx
const items = products.map(product => (
  <li key={product.id}>
    {product.name}
  </li>
));
```

---

## ৬. Beginner Challenge

একটি array থেকে fruit list render করুন।

Data:

```jsx
const fruits = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Mango' }
];
```

Requirements:

* `<ul>` ব্যবহার করতে হবে
* `map()` ব্যবহার করতে হবে
* প্রতিটি item-এ `key` দিতে হবে

### সম্ভাব্য সমাধান

```jsx
export default function FruitList() {
  return (
    <ul>
      {fruits.map(fruit => (
        <li key={fruit.id}>
          {fruit.name}
        </li>
      ))}
    </ul>
  );
}
```

---

## ৭. Intermediate Challenge

Product data থেকে শুধু in-stock product দেখান।

```jsx
const products = [
  {
    id: 1,
    name: 'Keyboard',
    inStock: true
  },
  {
    id: 2,
    name: 'Mouse',
    inStock: false
  },
  {
    id: 3,
    name: 'Monitor',
    inStock: true
  }
];
```

Requirements:

* আগে `filter()`
* তারপর `map()`
* Stable key ব্যবহার
* Product name দেখানো

### সম্ভাব্য সমাধান

```jsx
export default function AvailableProducts() {
  const availableProducts = products.filter(product =>
    product.inStock
  );

  return (
    <ul>
      {availableProducts.map(product => (
        <li key={product.id}>
          {product.name}
        </li>
      ))}
    </ul>
  );
}
```

---

## ৮. একটু কঠিন Challenge

Student-দের department অনুযায়ী দুইটি list-এ ভাগ করুন:

* Civil Engineering
* Computer Science

Requirements:

* একই data array ব্যবহার
* দুইবার `filter()`
* প্রতিটি filtered array-তে `map()`
* Unique key
* দুইটি আলাদা heading

### সম্ভাব্য সমাধান

```jsx
export default function StudentsByDepartment() {
  const civilStudents = students.filter(student =>
    student.department === 'Civil Engineering'
  );

  const computerScienceStudents = students.filter(student =>
    student.department === 'Computer Science'
  );

  return (
    <section>
      <h2>Civil Engineering</h2>
      <ul>
        {civilStudents.map(student => (
          <li key={student.id}>
            {student.name}
          </li>
        ))}
      </ul>

      <h2>Computer Science</h2>
      <ul>
        {computerScienceStudents.map(student => (
          <li key={student.id}>
            {student.name}
          </li>
        ))}
      </ul>
    </section>
  );
}
```

---

## ৯. Mini Project: Product Catalogue

একটি Product Catalogue তৈরি করুন।

প্রতিটি product object-এ থাকবে:

```jsx
{
  id,
  name,
  category,
  price,
  inStock,
  imageUrl
}
```

Project requirements:

* সব product `map()` দিয়ে render করতে হবে
* শুধু in-stock product filter করার option রাখতে হবে
* প্রতিটি product-এর জন্য `ProductCard` Component তৈরি করতে হবে
* `product.id` key হিসেবে ব্যবহার করতে হবে
* Category অনুযায়ী product filter করতে হবে
* Empty result হলে message দেখাতে হবে

এই project-এ practice হবে:

* Array
* Object
* `map()`
* `filter()`
* Props
* Component reuse
* Conditional rendering
* Stable key

---

## ১০. Self-check Questions

1. `map()` এবং `filter()`-এর পার্থক্য কী?
2. `map()` মূল array পরিবর্তন করে কি?
3. `filter()` কী ধরনের function গ্রহণ করে?
4. JSX array React কীভাবে render করে?
5. প্রতিটি list item-এ key কেন প্রয়োজন?
6. ভালো key-এর দুটি বৈশিষ্ট্য কী?
7. `Math.random()` key হিসেবে খারাপ কেন?
8. Array index key হিসেবে কখন সমস্যা করে?
9. Component কি `key` prop পড়তে পারে?
10. Short Fragment-এ key দেওয়া যায় কি?
11. Arrow function block body-তে `return` কেন প্রয়োজন?
12. Filter করার আগে নাকি পরে map করা উচিত?
