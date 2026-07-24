# Keeping Components Pure

## React Component Pure রাখার সহজ বাংলা নোট

JavaScript-এর কিছু function-কে **pure function** বলা হয়। Pure function শুধু একটি calculation করে এবং এর বাইরে কোনো কিছু পরিবর্তন করে না।

React ধরে নেয়, আমাদের লেখা প্রতিটি Component একটি pure function-এর মতো কাজ করবে। অর্থাৎ একই props, state ও context পেলে Component সবসময় একই JSX return করবে।

Component pure রাখলে application বড় হওয়ার পরও:

* অপ্রত্যাশিত output কমে
* Bug খুঁজে পাওয়া সহজ হয়
* Rendering predictable থাকে
* Performance optimization নিরাপদ হয়
* React প্রয়োজনে rendering বন্ধ করে আবার শুরু করতে পারে

---

# এই অধ্যায়ে যা শিখব

এই অধ্যায়ে শেখানো হয়েছে:

1. Purity বা বিশুদ্ধতা কী
2. Pure function কীভাবে bug এড়াতে সাহায্য করে
3. Render করার সময় বাইরের data পরিবর্তন করা যাবে না কেন
4. Side effect কী
5. Strict Mode কীভাবে impure Component শনাক্ত করে
6. Local mutation কখন গ্রহণযোগ্য
7. Side effect কোথায় রাখা উচিত
8. React কেন purity-কে গুরুত্বপূর্ণ মনে করে

---

# ১. Purity: Component-কে Formula হিসেবে ভাবা

## Pure Function কী?

একটি pure function-এর প্রধান দুটি বৈশিষ্ট্য রয়েছে।

### ১. এটি নিজের কাজ নিয়েই থাকে

Function call হওয়ার আগে থেকে থাকা কোনো variable, object বা array পরিবর্তন করে না।

### ২. একই Input দিলে একই Output দেয়

একই input দিয়ে যতবার function call করা হোক, প্রতিবার একই result পাওয়া যাবে।

---

# Mathematical Formula দিয়ে বোঝা

ধরা যাক:

```text
y = 2x
```

যদি:

```text
x = 2
```

তাহলে:

```text
y = 4
```

এটি সবসময় সত্য হবে।

আবার:

```text
x = 3
```

হলে:

```text
y = 6
```

হবে।

দিনের সময়, বাজার পরিস্থিতি বা অন্য কোনো variable-এর কারণে result পরিবর্তিত হবে না।

---

# Pure JavaScript Function

> **Documentation-এর ধারণা অনুসারে সংক্ষিপ্ত code**

```js
function double(number) {
  return 2 * number;
}
```

এখানে:

```js
double(3)
```

সবসময়:

```text
6
```

return করবে।

Function-টি:

* বাইরের কোনো variable পরিবর্তন করছে না
* শুধু input থেকে output হিসাব করছে
* একই input-এ একই output দিচ্ছে

তাই এটি pure function।

---

# ২. React Component-ও Formula-এর মতো

React মনে করে প্রতিটি Component একটি pure function।

একটি Component একই input পেলে সবসময় একই JSX return করবে।

Component-এর input হতে পারে:

* Props
* State
* Context

ধরা যাক, একটি `Recipe` Component `drinkers` prop গ্রহণ করে।

> **Documentation-এর code-এর ভিত্তিতে সংক্ষিপ্ত রূপ**

```jsx
function Recipe({ drinkers }) {
  return (
    <p>
      Boil {drinkers} cups of water.
    </p>
  );
}
```

ব্যবহার:

```jsx
<Recipe drinkers={2} />
```

এটি সবসময় দুই কাপ পানির নির্দেশনা দেখাবে।

আবার:

```jsx
<Recipe drinkers={4} />
```

এটি সবসময় চার কাপ পানির নির্দেশনা দেখাবে।

অর্থাৎ Component-এর output শুধু তার input-এর ওপর নির্ভর করছে।

---

# Component-কে Recipe হিসেবে ভাবা

একটি রান্নার recipe অনুসরণ করলে এবং রান্নার মাঝখানে নতুন উপকরণ যোগ না করলে প্রতিবার একই খাবার তৈরি হবে।

একইভাবে React Component:

```text
Props, state ও context গ্রহণ করে
            ↓
একটি JSX result হিসাব করে
            ↓
React-কে সেই JSX return করে
```

Component render করার সময় বাইরের কোনো data পরিবর্তন না করলে output predictable থাকবে।

---

# ৩. Side Effects: অনিচ্ছাকৃত ফলাফল

React-এর rendering process সবসময় pure হতে হবে।

একটি Component render করার সময় শুধু JSX calculate এবং return করবে।

Render করার সময় Component-এর উচিত নয়:

* বাইরের variable পরিবর্তন করা
* আগে থেকে থাকা object পরিবর্তন করা
* আগে থেকে থাকা array পরিবর্তন করা
* Props পরিবর্তন করা
* State সরাসরি পরিবর্তন করা
* Context-এর data পরিবর্তন করা
* DOM সরাসরি পরিবর্তন করা

এ ধরনের পরিবর্তনকে সাধারণভাবে **mutation** বা **side effect** বলা হয়।

---

# Impure Component-এর উদাহরণ

নিচের pattern-টি সমস্যাজনক:

```jsx
let guest = 0;

function Cup() {
  guest = guest + 1;

  return <h2>Guest #{guest}</h2>;
}
```

এখানে `guest` variable-টি `Cup` Component-এর বাইরে তৈরি হয়েছে।

প্রতিবার `Cup` render হলে:

```jsx
guest = guest + 1;
```

দিয়ে বাইরের variable পরিবর্তন করা হচ্ছে।

এ কারণে Component-টি pure নয়।

---

# কেন এটি সমস্যা?

ধরা যাক:

```jsx
<Cup />
<Cup />
<Cup />
```

render করা হলো।

প্রথম Component বাইরের `guest` পরিবর্তন করবে।

দ্বিতীয় Component আবার সেই পরিবর্তিত value পড়বে।

তৃতীয় Component আরও পরিবর্তিত value পাবে।

ফলে প্রতিটি Component স্বাধীনভাবে output হিসাব করছে না।

Output নির্ভর করছে:

* Component কোন ক্রমে render হয়েছে
* Component কতবার call হয়েছে
* অন্য কোনো Component একই variable পরিবর্তন করেছে কি না

এটি unpredictable behavior তৈরি করে।

---

# ৪. Props ব্যবহার করে Component Pure করা

বাইরের variable পরিবর্তন না করে প্রয়োজনীয় value props-এর মাধ্যমে পাঠানো উচিত।

> **Documentation-এর pattern অনুসারে code**

```jsx
function Cup({ guest }) {
  return <h2>Guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}
```

এখানে প্রতিটি `Cup` Component একটি নির্দিষ্ট `guest` prop পাচ্ছে।

প্রথম Component:

```jsx
<Cup guest={1} />
```

সবসময় দেখাবে:

```text
Guest #1
```

দ্বিতীয় Component:

```jsx
<Cup guest={2} />
```

সবসময় দেখাবে:

```text
Guest #2
```

এখন `Cup` Component-এর JSX শুধু `guest` prop-এর ওপর নির্ভর করছে।

তাই Component-টি pure।

---

# Rendering Order-এর ওপর নির্ভর করা যাবে না

Component কোন ক্রমে render হবে, সেটি ধরে code লেখা উচিত নয়।

Mathematical formula-এর মতো প্রতিটি Component স্বাধীনভাবে result হিসাব করবে।

যেমন:

```text
y = 2x
```

এবং:

```text
y = 5x
```

কোন formula আগে হিসাব করা হয়েছে, তাতে অন্যটির result পরিবর্তিত হয় না।

একইভাবে একটি Component-এর render অন্য Component-এর render order-এর ওপর নির্ভর করা উচিত নয়।

---

# ৫. Props, State ও Context Read-only

React Component render করার সময় সাধারণত তিন ধরনের input পড়তে পারে:

1. Props
2. State
3. Context

এগুলোকে সবসময় **read-only** হিসেবে বিবেচনা করতে হবে।

---

## Props পরিবর্তন করা যাবে না

ভুল:

```jsx
function Profile({ user }) {
  user.name = "Changed";

  return <h1>{user.name}</h1>;
}
```

এখানে prop হিসেবে পাওয়া object পরিবর্তন করা হচ্ছে।

সঠিকভাবে শুধু data পড়তে হবে:

```jsx
function Profile({ user }) {
  return <h1>{user.name}</h1>;
}
```

---

## State সরাসরি পরিবর্তন করা যাবে না

ভুল ধারণা:

```jsx
count = count + 1;
```

State পরিবর্তনের জন্য React-এর state setter ব্যবহার করতে হয়।

ধারণাগতভাবে:

```jsx
setCount(count + 1);
```

তবে state update সাধারণত rendering-এর মধ্যে নয়, event handler-এর মধ্যে করা হয়।

---

## Context পরিবর্তন করা যাবে না

Context থেকে পাওয়া value-ও render করার সময় read-only হিসেবে ব্যবহার করতে হবে।

Component শুধু value পড়ে JSX তৈরি করবে।

---

# ৬. Strict Mode দিয়ে Impure Component শনাক্ত করা

React-এর **Strict Mode** development environment-এ Component function একাধিকবার call করতে পারে।

এর উদ্দেশ্য user-কে একই UI দুইবার দেখানো নয়। বরং Component-এর calculation pure কি না, তা পরীক্ষা করা।

Pure function একই input-এ যতবার call করা হোক একই result দেয়।

যেমন:

```js
double(2)
```

দুইবার call করলেও প্রতিবার `4` return করবে।

কিন্তু impure function বাইরের variable পরিবর্তন করলে দ্বিতীয় call-এ আলাদা result আসতে পারে।

এভাবে Strict Mode hidden mutation ও impure calculation খুঁজে বের করতে সাহায্য করে। Strict Mode production build-এ Component দ্বিগুণ call করে application ধীর করে না।

---

# Strict Mode-এর ধারণাগত ব্যবহার

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

`App`-কে `React.StrictMode` দিয়ে wrap করা হয়েছে।

কিছু React framework ও project setup এটি defaultভাবে যুক্ত করে দিতে পারে।

---

# Strict Mode Error তৈরি করে কি?

Strict Mode নিজে Component নষ্ট করে না।

এটি আগে থেকে থাকা impure code-কে প্রকাশ করে।

Component pure হলে একাধিকবার function call হলেও একই JSX result পাওয়া যাবে।

---

# ৭. Mutation কী?

আগে থেকে থাকা variable, object বা array পরিবর্তন করাকে mutation বলা হয়।

উদাহরণ:

```js
const user = {
  name: "Rahim"
};

user.name = "Karim";
```

এখানে `user` object-এর property পরিবর্তন করা হয়েছে।

আরেকটি উদাহরণ:

```js
const items = [];

items.push("Book");
```

এখানে array mutate করা হয়েছে।

সব mutation নিষিদ্ধ নয়। গুরুত্বপূর্ণ প্রশ্ন হলো:

> যে data পরিবর্তন করা হচ্ছে, সেটি কখন এবং কোথায় তৈরি হয়েছিল?

---

# ৮. Local Mutation গ্রহণযোগ্য

Component render করার সময় Component-এর ভেতরেই নতুন variable, object বা array তৈরি করলে সেটি পরিবর্তন করা যেতে পারে।

একে **local mutation** বলা হয়।

> **Documentation-এর ধারণা অনুসারে code**

```jsx
function Cup({ guest }) {
  return <h2>Guest #{guest}</h2>;
}

export default function TeaGathering() {
  const cups = [];

  for (let i = 1; i <= 12; i++) {
    cups.push(
      <Cup key={i} guest={i} />
    );
  }

  return cups;
}
```

এখানে:

```jsx
const cups = [];
```

array-টি `TeaGathering` Component-এর বর্তমান render-এর ভেতরে তৈরি হয়েছে।

তারপর:

```jsx
cups.push(...)
```

দিয়ে নতুন JSX element যোগ করা হয়েছে।

এটি গ্রহণযোগ্য, কারণ:

* Array-টি Component-এর বাইরে ছিল না
* অন্য কোনো Component array-টি ব্যবহার করছে না
* প্রতিটি render-এ নতুন array তৈরি হচ্ছে
* বাইরের কোনো existing data পরিবর্তিত হচ্ছে না

---

# Local Mutation কেন Pure থাকতে পারে?

Pure function-এর সমস্যা mutation শব্দটি নিজে নয়।

মূল সমস্যা হলো function call-এর আগে থেকে থাকা data পরিবর্তন করা।

নিচের array প্রতিটি function call-এ নতুনভাবে তৈরি হয়:

```js
function createList() {
  const items = [];

  items.push("A");
  items.push("B");

  return items;
}
```

প্রতিবার একই নতুন array তৈরি হয় এবং একই result return করে।

তাই বাইরের state-এর ওপর কোনো প্রভাব পড়ে না।

---

# Local Mutation এবং External Mutation-এর পার্থক্য

## গ্রহণযোগ্য Local Mutation

```jsx
function List() {
  const items = [];

  items.push(<li key="a">A</li>);

  return <ul>{items}</ul>;
}
```

Array function-এর ভেতরে তৈরি হয়েছে।

---

## সমস্যাজনক External Mutation

```jsx
const items = [];

function List() {
  items.push(<li key="a">A</li>);

  return <ul>{items}</ul>;
}
```

Array Component-এর বাইরে তৈরি হয়েছে।

প্রতিবার render হলে একই array-তে নতুন item যোগ হবে।

ফলে output প্রতিবার পরিবর্তিত হতে থাকবে।

---

# ৯. Side Effect কোথায় করা যাবে?

সব application-এ কোনো না কোনো সময় data পরিবর্তন করতে হয়।

যেমন:

* Button click-এর পর count বাড়ানো
* Form submit করা
* Server-এ request পাঠানো
* Animation চালু করা
* Local storage update করা
* Screen update করা

এগুলো side effect।

সমস্যা side effect থাকা নয়। সমস্যা হলো side effect **rendering-এর মধ্যে** করা।

---

# Event Handler-এর মধ্যে Side Effect

React-এ side effect সাধারণত event handler-এর মধ্যে রাখা হয়।

> **Documentation-এর বাইরে সরল উদাহরণ**

```jsx
export default function Button() {
  function handleClick() {
    alert("Button clicked");
  }

  return (
    <button onClick={handleClick}>
      Click
    </button>
  );
}
```

এখানে `alert()` একটি side effect।

কিন্তু এটি Component render হওয়ার সময় চলছে না।

এটি শুধু user button click করলে চলছে।

তাই event handler-কে render phase-এর মতো pure হতে হয় না।

---

# Rendering এবং Event Handler-এর পার্থক্য

## Rendering

```jsx
function Profile({ name }) {
  return <h1>{name}</h1>;
}
```

Rendering-এর সময় শুধু JSX হিসাব করা হচ্ছে।

## Event Handler

```jsx
function handleClick() {
  console.log("Clicked");
}
```

এটি user action-এর পরে চলে।

---

# ১০. `useEffect` কখন ব্যবহার করা হয়?

কোনো side effect উপযুক্ত event handler-এর মধ্যে রাখা সম্ভব না হলে React-এর `useEffect` ব্যবহার করা যায়।

`useEffect` React-কে বলে rendering শেষ হওয়ার পরে side effect চালাতে।

তবে documentation অনুযায়ী, `useEffect` side effect-এর প্রথম সমাধান নয়; অন্য উপায় না থাকলে এটি শেষ বিকল্প হিসেবে ব্যবহার করা উচিত।

---

# Event Handler বনাম `useEffect`

## User action-এর কারণে পরিবর্তন

Event handler ব্যবহার করা ভালো।

```jsx
<button onClick={handleSave}>
  Save
</button>
```

## Component screen-এ আসার পরে external system synchronize করা

কিছু ক্ষেত্রে `useEffect` প্রয়োজন হতে পারে।

এই অধ্যায়ে `useEffect` বিস্তারিত শেখানো হয়নি।

---

# ১১. React কেন Purity নিয়ে চিন্তা করে?

Pure Component React-কে কয়েকটি গুরুত্বপূর্ণ সুবিধা দেয়।

## ১. বিভিন্ন Environment-এ Render করা যায়

একই input-এ একই output পাওয়ায় Component browser ছাড়াও server-এর মতো environment-এ render করা যায়।

## ২. Unchanged Component Skip করা যায়

Input পরিবর্তিত না হলে React নিরাপদে Component-এর পুনরায় rendering skip করতে পারে।

কারণ একই input-এ output একই থাকবে।

## ৩. Rendering Restart করা যায়

একটি বড় Component tree render হওয়ার মাঝখানে data পরিবর্তিত হলে React পুরোনো rendering বাদ দিয়ে নতুন করে শুরু করতে পারে।

Pure Component হলে মাঝপথে calculation বন্ধ করলেও বাইরের data নষ্ট হয় না।

## ৪. Caching নিরাপদ হয়

একই input-এর result cache করে পরে পুনরায় ব্যবহার করা যায়।

## ৫. নতুন React Feature ভালোভাবে কাজ করে

React-এর performance, animation, data fetching ও concurrent rendering-এর মতো feature purity-এর ওপর নির্ভর করতে পারে।

---

# ১২. Pure এবং Impure Component-এর তুলনা

| বিষয়                       | Pure Component | Impure Component     |
| -------------------------- | -------------- | -------------------- |
| একই input-এ result         | সবসময় একই      | পরিবর্তিত হতে পারে   |
| বাইরের variable পরিবর্তন   | করে না         | করতে পারে            |
| Props পরিবর্তন             | করে না         | করতে পারে            |
| Render order-এর ওপর নির্ভর | করে না         | করতে পারে            |
| Debugging                  | তুলনামূলক সহজ  | কঠিন                 |
| Strict Mode                | নিরাপদ         | ভুল প্রকাশ পেতে পারে |
| Performance optimization   | নিরাপদ         | ঝুঁকিপূর্ণ           |

---

# ১৩. Rendering-এর মধ্যে কী করা যাবে?

Rendering-এর মধ্যে করা যায়:

* Props পড়া
* State পড়া
* Context পড়া
* Calculation করা
* Array থেকে নতুন JSX তৈরি করা
* Local variable তৈরি করা
* Local array বা object তৈরি করা
* JSX return করা

উদাহরণ:

```jsx
function Total({ price, quantity }) {
  const total = price * quantity;

  return <p>Total: {total}</p>;
}
```

এটি pure calculation।

---

# Rendering-এর মধ্যে কী করা উচিত নয়?

Rendering-এর মধ্যে এড়িয়ে চলতে হবে:

* Global variable পরিবর্তন
* Props mutate করা
* State সরাসরি mutate করা
* DOM পরিবর্তন
* Network request শুরু করা
* Timer চালু করা
* Local storage লেখা
* Alert দেখানো
* Random external state-এর ওপর output নির্ভর করানো

---

# ১৪. Pure Component Checklist

একটি Component pure কি না যাচাই করতে নিচের প্রশ্নগুলো করুন:

1. একই props দিলে কি একই JSX return করবে?
2. Component কি বাইরের কোনো variable পরিবর্তন করছে?
3. Component কি props object পরিবর্তন করছে?
4. Component কি state সরাসরি পরিবর্তন করছে?
5. Component কি render হওয়ার সময় DOM পরিবর্তন করছে?
6. Component কি অন্য Component আগে render হওয়ার ওপর নির্ভর করছে?
7. Side effect কি event handler-এ রাখা সম্ভব?
8. Local mutation করা হলে data কি বর্তমান render-এর ভেতরে তৈরি?

---

# Documentation-এর মূল সারাংশ

একটি Component pure হওয়ার জন্য:

* আগে থেকে থাকা object বা variable পরিবর্তন করবে না
* একই input-এ একই JSX return করবে
* Rendering order-এর ওপর নির্ভর করবে না
* Props, state এবং context read-only হিসেবে ব্যবহার করবে
* Screen পরিবর্তন করতে state setter ব্যবহার করবে
* Side effect সাধারণত event handler-এ রাখবে
* উপযুক্ত event handler না থাকলে শেষ বিকল্প হিসেবে `useEffect` বিবেচনা করবে
* Component-এর ভেতরে সদ্য তৈরি data-এর local mutation করা যেতে পারে
* Strict Mode impure calculation শনাক্ত করতে সাহায্য করে

---

# গুরুত্বপূর্ণ সংজ্ঞা

## Pure Function

যে function আগে থেকে থাকা data পরিবর্তন করে না এবং একই input-এ সবসময় একই output দেয়।

## Pure Component

যে React Component একই props, state ও context পেলে সবসময় একই JSX return করে।

## Mutation

কোনো existing variable, object বা array পরিবর্তন করা।

## Local Mutation

Function বা Component-এর বর্তমান call-এর মধ্যে নতুন তৈরি data পরিবর্তন করা।

## Side Effect

Calculation return করার বাইরে application বা external system-এ কোনো পরিবর্তন ঘটানো।

## Rendering

Component function call করে JSX হিসাব করার React process।

## Strict Mode

Development-এর সময় potential impurity ও অন্যান্য সমস্যা শনাক্ত করতে সাহায্য করা React feature।

## Event Handler

User click, input বা অন্য event ঘটলে চলা function।

---

# গুরুত্বপূর্ণ প্রশ্ন ও উত্তর

## প্রশ্ন ১: Pure Function কী?

যে function বাইরের কোনো existing data পরিবর্তন করে না এবং একই input-এ একই output দেয়, সেটি pure function।

## প্রশ্ন ২: React Component কেন pure হওয়া উচিত?

যাতে rendering predictable, testable এবং optimization-এর জন্য নিরাপদ হয়।

## প্রশ্ন ৩: একই props দিলে Component কী return করবে?

সবসময় একই JSX return করা উচিত।

## প্রশ্ন ৪: Component render হওয়ার সময় global variable পরিবর্তন করা যাবে?

না।

## প্রশ্ন ৫: Props পরিবর্তন করা যাবে?

না। Props read-only।

## প্রশ্ন ৬: State সরাসরি পরিবর্তন করা যাবে?

না। State setter ব্যবহার করতে হবে।

## প্রশ্ন ৭: Strict Mode কীভাবে সাহায্য করে?

Development-এ Component function পুনরায় call করে impure calculation ও hidden mutation প্রকাশ করতে সাহায্য করে।

## প্রশ্ন ৮: Strict Mode কি production application ধীর করে?

Documentation অনুযায়ী development-এর অতিরিক্ত checking production-এ user-এর application ধীর করে না।

## প্রশ্ন ৯: সব mutation কি ভুল?

না। বর্তমান render-এর মধ্যে নতুন তৈরি local variable, object বা array পরিবর্তন করা যেতে পারে।

## প্রশ্ন ১০: Side effect কোথায় রাখা উচিত?

সাধারণত event handler-এর মধ্যে।

## প্রশ্ন ১১: `useEffect` কখন ব্যবহার করা উচিত?

উপযুক্ত event handler পাওয়া না গেলে এবং rendering-এর পরে external side effect চালানো প্রয়োজন হলে শেষ বিকল্প হিসেবে।

## প্রশ্ন ১২: Component কি অন্য Component-এর rendering order-এর ওপর নির্ভর করতে পারে?

না। প্রতিটি Component স্বাধীনভাবে JSX হিসাব করবে।

---

# খুব সংক্ষিপ্ত Revision

## Pure Function

```js
function double(number) {
  return number * 2;
}
```

## Pure Component

```jsx
function Cup({ guest }) {
  return <h2>Guest #{guest}</h2>;
}
```

## Impure Component

```jsx
let guest = 0;

function Cup() {
  guest++;

  return <h2>Guest #{guest}</h2>;
}
```

## Local Mutation

```jsx
function List() {
  const items = [];

  items.push(<li key="a">A</li>);

  return <ul>{items}</ul>;
}
```

## Side Effect Event Handler-এ

```jsx
function Button() {
  function handleClick() {
    alert("Clicked");
  }

  return (
    <button onClick={handleClick}>
      Click
    </button>
  );
}
```

মনে রাখুন:

```text
Same input
→ Same JSX

Existing data পরিবর্তন
→ Impure

বর্তমান render-এ নতুন data পরিবর্তন
→ Local mutation, গ্রহণযোগ্য

User action-এর পরিবর্তন
→ Event handler

Rendering-এর পরে external synchronization
→ প্রয়োজনে useEffect
```

---

# Documentation-এর Challenges

মূল documentation-এ তিনটি challenge রয়েছে:

1. একটি broken clock ঠিক করা
2. একটি broken profile ঠিক করা
3. একটি broken story tray ঠিক করা

প্রথম challenge-এ একটি Clock Component render করার সময় সরাসরি DOM element-এর class পরিবর্তন করছে। লক্ষ্য হলো DOM mutation না করে returned JSX-এর `className` condition অনুযায়ী নির্ধারণ করা।

---

# কীভাবে Practice করবেন

## Documentation-এর বাইরে অতিরিক্ত Practice

> **নোট:** নিচের অংশটি মূল React documentation-এর অংশ নয়। শেখা বিষয়গুলো অনুশীলনের জন্য অতিরিক্তভাবে যোগ করা হয়েছে।

---

## ১. Basic Pure Function Practice

নিচের function লিখুন:

```js
function calculateArea(width, height) {
  return width * height;
}
```

পরীক্ষা করুন:

```js
calculateArea(5, 4);
calculateArea(5, 4);
```

দুইবারই একই result পাওয়া উচিত।

এরপর যাচাই করুন function কোনো বাইরের variable পরিবর্তন করছে কি না।

---

## ২. Pure Component Practice

> **অতিরিক্ত Practice Code — মূল documentation-এর অংশ নয়**

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}

export default function App() {
  return (
    <>
      <Greeting name="Rahim" />
      <Greeting name="Karim" />
    </>
  );
}
```

Practice:

* `name` পরিবর্তন করুন
* একই name দিয়ে Component দুইবার render করুন
* দুইবার একই output আসে কি না দেখুন

---

## ৩. Impure Code শনাক্ত করুন

নিচের code-এর সমস্যা খুঁজে বের করুন:

```jsx
let total = 0;

function Price({ amount }) {
  total += amount;

  return <p>Total: {total}</p>;
}
```

### সমস্যা

`Price` Component বাইরের `total` variable পরিবর্তন করছে।

Output render order ও render count-এর ওপর নির্ভর করবে।

### Pure Solution

```jsx
function Price({ total }) {
  return <p>Total: {total}</p>;
}
```

Parent Component হিসাব করে value পাঠাবে:

```jsx
export default function App() {
  const total = 100 + 200;

  return <Price total={total} />;
}
```

---

## ৪. Props Mutation ঠিক করুন

### ভুল Code

```jsx
function UserCard({ user }) {
  user.name = user.name.toUpperCase();

  return <h2>{user.name}</h2>;
}
```

### সমস্যা

`user` prop object সরাসরি পরিবর্তন করা হচ্ছে।

### সঠিক Code

```jsx
function UserCard({ user }) {
  const displayName =
    user.name.toUpperCase();

  return <h2>{displayName}</h2>;
}
```

এখানে নতুন local variable তৈরি হয়েছে, কিন্তু original prop পরিবর্তন হয়নি।

---

## ৫. Local Mutation Practice

```jsx
function NumberList() {
  const items = [];

  for (let i = 1; i <= 5; i++) {
    items.push(
      <li key={i}>{i}</li>
    );
  }

  return <ul>{items}</ul>;
}
```

Practice:

* ১ থেকে ১০ পর্যন্ত সংখ্যা দেখান
* শুধু জোড় সংখ্যা যোগ করুন
* প্রতিটি সংখ্যার square দেখান
* Array-টি Component-এর বাইরে নিয়ে গিয়ে দেখুন কেন সমস্যা হতে পারে

---

## ৬. Beginner Challenge

একটি `ProductPrice` Component তৈরি করুন।

Props:

```text
price
quantity
```

Component total price calculate করে দেখাবে।

Rules:

* বাইরের variable পরিবর্তন করা যাবে না
* Result শুধু props-এর ওপর নির্ভর করবে

### সম্ভাব্য সমাধান

```jsx
function ProductPrice({
  price,
  quantity
}) {
  const total = price * quantity;

  return <p>Total: {total}</p>;
}
```

---

## ৭. Intermediate Challenge

নিচের impure Component pure করুন:

```jsx
let score = 0;

function Result({ marks }) {
  score += marks;

  return <p>Score: {score}</p>;
}
```

### সম্ভাব্য সমাধান

```jsx
function Result({ score }) {
  return <p>Score: {score}</p>;
}

export default function App() {
  const marks = [20, 30, 40];

  const total = marks.reduce(
    (sum, mark) => sum + mark,
    0
  );

  return <Result score={total} />;
}
```

---

## ৮. একটু কঠিন Challenge

একটি `StudentList` Component তৈরি করুন।

Data:

```js
const students = [
  { id: 1, name: "Rahim", score: 80 },
  { id: 2, name: "Karim", score: 70 },
  { id: 3, name: "Sadia", score: 90 }
];
```

Requirements:

* Original `students` array পরিবর্তন করা যাবে না
* Score অনুযায়ী নতুন sorted array তৈরি করতে হবে
* প্রতিটি student render করতে হবে
* Stable key ব্যবহার করতে হবে

### সম্ভাব্য সমাধান

```jsx
const students = [
  { id: 1, name: "Rahim", score: 80 },
  { id: 2, name: "Karim", score: 70 },
  { id: 3, name: "Sadia", score: 90 }
];

export default function StudentList() {
  const sortedStudents = [
    ...students
  ].sort(
    (a, b) => b.score - a.score
  );

  return (
    <ul>
      {sortedStudents.map(student => (
        <li key={student.id}>
          {student.name}: {student.score}
        </li>
      ))}
    </ul>
  );
}
```

এখানে:

```js
[...students]
```

দিয়ে original array-এর copy তৈরি করা হয়েছে।

তারপর copy sort করা হয়েছে।

---

## ৯. Mini Project: Pure Shopping Cart Summary

একটি Shopping Cart Summary তৈরি করুন।

প্রতিটি item:

```js
{
  id,
  name,
  price,
  quantity
}
```

Requirements:

* Original cart array mutate করা যাবে না
* প্রতিটি item-এর subtotal হিসাব করতে হবে
* সব subtotal যোগ করে grand total দেখাতে হবে
* Component output শুধু props-এর ওপর নির্ভর করবে
* Remove button-এর action event handler-এ থাকবে
* Render করার সময় কোনো array item delete করা যাবে না

এই project-এ practice হবে:

* Pure calculation
* Props
* Array `map()`
* Array `reduce()`
* Event handler
* Immutable update
* Component composition

---

## ১০. Self-check Questions

1. Pure function-এর দুটি বৈশিষ্ট্য কী?
2. একই input-এ pure Component কী return করে?
3. Rendering-এর মধ্যে global variable পরিবর্তন করা ভুল কেন?
4. Props কেন read-only?
5. State সরাসরি mutate করা যাবে কি?
6. Strict Mode impure Component কীভাবে শনাক্ত করে?
7. Local mutation কী?
8. Component-এর ভেতরে নতুন array-তে `push()` কেন গ্রহণযোগ্য হতে পারে?
9. বাইরের array-তে `push()` কেন সমস্যাজনক?
10. Side effect সাধারণত কোথায় রাখা উচিত?
11. `useEffect` কখন বিবেচনা করা হয়?
12. Pure Component React-এর performance optimization-এ কীভাবে সাহায্য করে?
