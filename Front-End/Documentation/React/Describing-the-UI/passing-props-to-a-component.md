# Passing Props to a Component

## React Component-এ Props পাঠানো

React Component একে অপরের সঙ্গে যোগাযোগ করার জন্য **props** ব্যবহার করে।

একটি Parent Component তার Child Component-কে props-এর মাধ্যমে তথ্য পাঠাতে পারে।

Props দেখতে HTML attribute-এর মতো হলেও props-এর মাধ্যমে যেকোনো JavaScript value পাঠানো যায়। যেমন:

* String
* Number
* Boolean
* Object
* Array
* Function
* JSX

---

# এই অধ্যায়ে যা শিখব

এই অধ্যায়ে আমরা শিখব:

1. Component-এ props কীভাবে পাঠাতে হয়
2. Child Component-এর ভিতরে props কীভাবে পড়তে হয়
3. Props-এর default value কীভাবে দিতে হয়
4. Spread syntax দিয়ে props forward করা
5. `children` prop-এর মাধ্যমে JSX পাঠানো
6. Props সময়ের সঙ্গে কীভাবে পরিবর্তিত হয়
7. Props কেন পরিবর্তন করা যায় না

---

# ১. Familiar Props

## পরিচিত Props

আগে আমরা HTML-এর built-in tag-এ বিভিন্ন attribute ব্যবহার করেছি।

উদাহরণ:

```jsx
function Avatar() {
  return (
    <img
      className="avatar"
      src="https://react.dev/images/docs/scientists/1bX5QH6.jpg"
      alt="Lin Lanying"
      width={100}
      height={100}
    />
  );
}

export default function Profile() {
  return <Avatar />;
}
```

এখানে `<img>` tag-এ কয়েকটি prop পাঠানো হয়েছে:

```jsx
className="avatar"
```

```jsx
src="..."
```

```jsx
alt="Lin Lanying"
```

```jsx
width={100}
```

```jsx
height={100}
```

এই props-গুলো browser-এর built-in `<img>` element-এর জন্য আগে থেকেই নির্ধারিত।

কিন্তু নিজের তৈরি Component-এও প্রয়োজন অনুযায়ী custom props পাঠানো যায়।

যেমন:

```jsx
<Avatar
  person={person}
  size={100}
/>
```

এখানে:

* `person` একটি custom prop
* `size` আরেকটি custom prop

---

# ২. Props কী?

Props-এর পূর্ণরূপ:

```text
Properties
```

Props হলো এমন তথ্য, যা Parent Component থেকে Child Component-এ পাঠানো হয়।

উদাহরণ:

```jsx
<Avatar size={100} />
```

এখানে Parent Component `Avatar` Child Component-কে `size` নামে একটি prop পাঠাচ্ছে।

Prop-এর value:

```jsx
100
```

---

# ৩. Props পাঠানোর আগে Component

ধরা যাক `Profile` Component-এর ভিতরে একটি `Avatar` Component ব্যবহার করা হয়েছে:

```jsx
export default function Profile() {
  return (
    <Avatar />
  );
}
```

এখানে `Profile` হলো Parent Component।

`Avatar` হলো Child Component।

কিন্তু `Profile`, `Avatar`-কে এখনো কোনো custom prop পাঠাচ্ছে না।

---

# ৪. Component-এ Props পাঠানো

## Passing Props to a Component

একটি Child Component-এ props পাঠাতে দুইটি ধাপ অনুসরণ করতে হয়।

## ধাপ ১: Child Component-এ Props পাঠানো

## ধাপ ২: Child Component-এর ভিতরে Props পড়া

---

# ধাপ ১: Child Component-এ Props পাঠানো

## Pass Props to the Child Component

ধরা যাক `Avatar` Component-এ দুইটি prop পাঠাতে চাই:

1. `person`
2. `size`

```jsx
export default function Profile() {
  return (
    <Avatar
      person={{
        name: "Lin Lanying",
        imageId: "1bX5QH6",
      }}
      size={100}
    />
  );
}
```

এখানে:

```jsx
person={{
  name: "Lin Lanying",
  imageId: "1bX5QH6",
}}
```

একটি JavaScript object পাঠানো হয়েছে।

আর:

```jsx
size={100}
```

একটি number পাঠানো হয়েছে।

---

# Double Curly Braces কেন?

নিচের অংশে double curly braces দেখা যাচ্ছে:

```jsx
person={{
  name: "Lin Lanying",
  imageId: "1bX5QH6",
}}
```

এখানে:

* বাইরের `{}` JSX-এর ভিতরে JavaScript ব্যবহার করছে
* ভিতরের `{}` একটি JavaScript object তৈরি করছে

সহজভাবে:

```jsx
person={
  {
    name: "Lin Lanying",
    imageId: "1bX5QH6",
  }
}
```

---

# ধাপ ২: Child Component-এর ভিতরে Props পড়া

## Read Props Inside the Child Component

Parent থেকে পাঠানো props Child Component-এর function parameter-এর মধ্যে নেওয়া যায়।

```jsx
function Avatar({ person, size }) {
  // এখানে person এবং size ব্যবহার করা যাবে
}
```

এখানে:

```jsx
{ person, size }
```

দিয়ে `person` এবং `size` prop গ্রহণ করা হয়েছে।

এরপর এগুলো সাধারণ variable-এর মতো ব্যবহার করা যায়।

```jsx
function Avatar({ person, size }) {
  return (
    <img
      src={person.imageId}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}
```

---

# সম্পূর্ণ উদাহরণ

```jsx
import { getImageUrl } from "./utils.js";

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <div>
      <Avatar
        size={100}
        person={{
          name: "Katsuko Saruhashi",
          imageId: "YfeOqp2",
        }}
      />

      <Avatar
        size={80}
        person={{
          name: "Aklilu Lemma",
          imageId: "OKS67lh",
        }}
      />

      <Avatar
        size={50}
        person={{
          name: "Lin Lanying",
          imageId: "1bX5QH6",
        }}
      />
    </div>
  );
}
```

এখানে একই `Avatar` Component তিনবার ব্যবহার করা হয়েছে।

প্রতিবার আলাদা props পাঠানো হয়েছে।

---

# প্রথম Avatar

```jsx
<Avatar
  size={100}
  person={{
    name: "Katsuko Saruhashi",
    imageId: "YfeOqp2",
  }}
/>
```

এখানে:

```text
size = 100
name = Katsuko Saruhashi
```

---

# দ্বিতীয় Avatar

```jsx
<Avatar
  size={80}
  person={{
    name: "Aklilu Lemma",
    imageId: "OKS67lh",
  }}
/>
```

এখানে:

```text
size = 80
name = Aklilu Lemma
```

---

# তৃতীয় Avatar

```jsx
<Avatar
  size={50}
  person={{
    name: "Lin Lanying",
    imageId: "1bX5QH6",
  }}
/>
```

এখানে:

```text
size = 50
name = Lin Lanying
```

একই Component আলাদা props পেয়ে আলাদাভাবে render করছে।

---

# ৫. Props Component-কে Reusable করে

Props ব্যবহার না করলে Component-এর তথ্য স্থির থাকে।

```jsx
function Avatar() {
  return (
    <img
      src="fixed-image.jpg"
      alt="Fixed person"
      width={100}
    />
  );
}
```

এটি প্রতিবার একই image দেখাবে।

কিন্তু props ব্যবহার করলে Component-কে বিভিন্ন তথ্য দিয়ে ব্যবহার করা যায়।

```jsx
function Avatar({ imageUrl, name, size }) {
  return (
    <img
      src={imageUrl}
      alt={name}
      width={size}
      height={size}
    />
  );
}
```

ব্যবহার:

```jsx
<Avatar
  imageUrl="person-one.jpg"
  name="Person One"
  size={100}
/>

<Avatar
  imageUrl="person-two.jpg"
  name="Person Two"
  size={80}
/>
```

এভাবে Component reusable হয়।

---

# ৬. Parent এবং Child স্বাধীনভাবে কাজ করতে পারে

Props ব্যবহার করলে Parent এবং Child Component-কে আলাদাভাবে চিন্তা করা যায়।

Parent Component ঠিক করে:

* কোন তথ্য পাঠাবে
* prop-এর value কী হবে
* Child কতবার render হবে

Child Component ঠিক করে:

* prop কীভাবে ব্যবহার করবে
* কী markup render করবে
* data কীভাবে দেখাবে

উদাহরণ:

```jsx
function Avatar({ person, size }) {
  return (
    <img
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
    />
  );
}
```

`Profile` Component চাইলে `size` পরিবর্তন করতে পারে:

```jsx
<Avatar size={200} person={person} />
```

কিন্তু `Avatar` কীভাবে `size` ব্যবহার করছে, সেটি পরিবর্তন করার প্রয়োজন নেই।

---

# ৭. Props হলো Function Argument-এর মতো

Props-কে function argument-এর মতো ভাবা যায়।

সাধারণ JavaScript function:

```jsx
function add(a, b) {
  return a + b;
}

add(10, 20);
```

React Component:

```jsx
function Avatar({ person, size }) {
  return (
    <img
      alt={person.name}
      width={size}
    />
  );
}
```

ব্যবহার:

```jsx
<Avatar person={person} size={100} />
```

এখানে props প্রায় function argument-এর মতো কাজ করছে।

---

# ৮. Component আসলে একটি Props Object গ্রহণ করে

React Component function আসলে একটি মাত্র argument গ্রহণ করে।

সেই argument হলো একটি `props` object।

```jsx
function Avatar(props) {
  let person = props.person;
  let size = props.size;

  return (
    <img
      alt={person.name}
      width={size}
    />
  );
}
```

যদি Parent এভাবে props পাঠায়:

```jsx
<Avatar
  person={{
    name: "Lin Lanying",
  }}
  size={100}
/>
```

তাহলে `props` object ধারণাগতভাবে এমন হবে:

```jsx
{
  person: {
    name: "Lin Lanying",
  },
  size: 100,
}
```

---

# ৯. Props Destructuring

সাধারণত পুরো `props` object বারবার ব্যবহার না করে destructuring করা হয়।

দীর্ঘ পদ্ধতি:

```jsx
function Avatar(props) {
  let person = props.person;
  let size = props.size;
}
```

সংক্ষিপ্ত পদ্ধতি:

```jsx
function Avatar({ person, size }) {
}
```

দুইটি একই অর্থ প্রকাশ করে।

---

# Destructuring কী?

Destructuring হলো JavaScript object থেকে property আলাদা variable-এ নেওয়ার সংক্ষিপ্ত syntax।

ধরা যাক:

```jsx
const user = {
  name: "Rahim",
  age: 22,
};
```

সাধারণভাবে:

```jsx
const name = user.name;
const age = user.age;
```

Destructuring দিয়ে:

```jsx
const { name, age } = user;
```

React Component-এ:

```jsx
function Avatar({ person, size }) {
}
```

মূলত `props` object destructure করা হচ্ছে।

---

# গুরুত্বপূর্ণ ভুল

ভুল:

```jsx
function Avatar(person, size) {
}
```

React আলাদা আলাদা দুইটি argument পাঠায় না।

React একটি মাত্র props object পাঠায়।

সঠিক:

```jsx
function Avatar(props) {
}
```

অথবা:

```jsx
function Avatar({ person, size }) {
}
```

---

# Curly Braces ভুলে যাওয়া

ভুল:

```jsx
function Avatar(person, size) {
}
```

সঠিক:

```jsx
function Avatar({ person, size }) {
}
```

`()`-এর ভিতরের `{}` খুব গুরুত্বপূর্ণ।

এটি JSX curly braces নয়।

এটি JavaScript object destructuring syntax।

---

# ১০. Props-এর Default Value

## Specifying a Default Value for a Prop

কোনো prop Parent Component থেকে না পাঠানো হলে একটি default value ব্যবহার করা যায়।

উদাহরণ:

```jsx
function Avatar({ person, size = 100 }) {
  return (
    <img
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}
```

এখানে:

```jsx
size = 100
```

মানে `size` prop না পাঠানো হলে `100` ব্যবহার করা হবে।

---

# Default Value ব্যবহারের উদাহরণ

```jsx
<Avatar
  person={{
    name: "Lin Lanying",
    imageId: "1bX5QH6",
  }}
/>
```

এখানে `size` দেওয়া হয়নি।

তাই:

```jsx
size = 100
```

ব্যবহার হবে।

---

# Explicit Size পাঠালে

```jsx
<Avatar
  person={person}
  size={80}
/>
```

এখানে `size` দেওয়া হয়েছে।

তাই default `100` ব্যবহার হবে না।

ব্যবহার হবে:

```text
80
```

---

# `undefined` পাঠালে

```jsx
<Avatar
  person={person}
  size={undefined}
/>
```

এক্ষেত্রেও default value ব্যবহার হবে।

```text
size = 100
```

---

# `null` পাঠালে

```jsx
<Avatar
  person={person}
  size={null}
/>
```

এক্ষেত্রে default value ব্যবহার হবে না।

`size` হবে:

```text
null
```

---

# `0` পাঠালে

```jsx
<Avatar
  person={person}
  size={0}
/>
```

এক্ষেত্রেও default value ব্যবহার হবে না।

`size` হবে:

```text
0
```

---

# Default Value কখন কাজ করে?

Default value কাজ করে যখন:

```text
Prop পাঠানো হয়নি
অথবা
Prop-এর value undefined
```

Default value কাজ করে না যখন:

```text
Prop-এর value null
Prop-এর value 0
Prop-এর value false
Prop-এর value empty string
```

---

# ১১. Spread Syntax দিয়ে Props Forward করা

## Forwarding Props with JSX Spread Syntax

কখনো একটি Component তার পাওয়া সব props আরেকটি Child Component-এ পাঠায়।

উদাহরণ:

```jsx
function Profile({
  person,
  size,
  isSepia,
  thickBorder,
}) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}
```

এখানে প্রতিটি prop আলাদাভাবে forward করা হচ্ছে।

```jsx
person={person}
size={size}
isSepia={isSepia}
thickBorder={thickBorder}
```

এটি সঠিক।

তবে অনেক prop হলে repetitive হয়ে যেতে পারে।

---

# Spread Syntax

একই কাজ সংক্ষিপ্তভাবে করা যায়:

```jsx
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

এখানে:

```jsx
<Avatar {...props} />
```

`Profile` যে সব props পেয়েছে, সব `Avatar`-এ পাঠিয়ে দিচ্ছে।

---

# Spread Syntax কীভাবে কাজ করে?

ধরা যাক `props` object:

```jsx
{
  person: person,
  size: 100,
  isSepia: true,
  thickBorder: false,
}
```

এখন:

```jsx
<Avatar {...props} />
```

প্রায় নিচের সমান:

```jsx
<Avatar
  person={props.person}
  size={props.size}
  isSepia={props.isSepia}
  thickBorder={props.thickBorder}
/>
```

---

# Spread Syntax-এর সুবিধা

* Code ছোট হয়
* Repetitive code কমে
* সব props একসঙ্গে forward করা যায়

---

# Spread Syntax-এর অসুবিধা

Spread syntax বেশি ব্যবহার করলে বোঝা কঠিন হতে পারে:

* কোন prop পাঠানো হচ্ছে
* কোন Component কোন prop ব্যবহার করছে
* ভুল prop চলে যাচ্ছে কি না

তাই spread syntax সীমিতভাবে ব্যবহার করা উচিত।

স্পষ্ট code অনেক সময় বেশি ভালো:

```jsx
<Avatar
  person={person}
  size={size}
/>
```

---

# ১২. JSX-কে Props হিসেবে পাঠানো

## Passing JSX as Children

HTML tag-এর ভিতরে অন্য tag nested করা যায়।

```jsx
<div>
  <img />
</div>
```

একইভাবে custom React Component-এর ভিতরেও অন্য Component বা JSX রাখা যায়।

```jsx
<Card>
  <Avatar />
</Card>
```

এখানে `<Avatar />`, `<Card>`-এর ভিতরে nested হয়েছে।

---

# `children` Prop

একটি Component-এর opening এবং closing tag-এর মাঝখানে যা লেখা হয়, তা সেই Component-এর `children` prop হিসেবে পাওয়া যায়।

```jsx
<Card>
  <Avatar />
</Card>
```

এখানে `Card` Component-এর `children` prop হলো:

```jsx
<Avatar />
```

---

# `children` Prop গ্রহণ করা

```jsx
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}
```

এখানে:

```jsx
{ children }
```

দিয়ে Parent থেকে আসা nested JSX render করা হয়েছে।

---

# সম্পূর্ণ উদাহরণ

```jsx
import Avatar from "./Avatar.js";

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{
          name: "Katsuko Saruhashi",
          imageId: "YfeOqp2",
        }}
      />
    </Card>
  );
}
```

এখানে:

* `Profile` Parent Component
* `Card` একটি wrapper Component
* `Avatar` হলো `Card`-এর nested content
* `Avatar` JSX `children` prop হিসেবে `Card`-এ গেছে

---

# `children` Flow

```text
Profile
  ↓
<Card>...</Card>
  ↓
Card children prop গ্রহণ করে
  ↓
{children} দিয়ে render করে
```

---

# `children` শুধু Component হতে হবে না

`children` হিসেবে যেকোনো JSX পাঠানো যায়।

## Text

```jsx
<Card>
  Hello World
</Card>
```

## Heading

```jsx
<Card>
  <h2>Profile Card</h2>
</Card>
```

## একাধিক Element

```jsx
<Card>
  <h2>Profile</h2>
  <p>This is a user profile.</p>
</Card>
```

## Component

```jsx
<Card>
  <Avatar />
</Card>
```

## Mixed Content

```jsx
<Card>
  <h2>User</h2>
  <Avatar />
  <p>Active user</p>
</Card>
```

---

# `children`-কে একটি খালি জায়গার মতো ভাবা

`children` prop-সহ একটি Component-কে এমন একটি wrapper হিসেবে ভাবা যায়, যার ভিতরে একটি খালি জায়গা আছে।

Parent Component সেই জায়গায় যেকোনো JSX বসাতে পারে।

```jsx
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}
```

`Card` জানে না তার ভিতরে কী থাকবে।

তার ভিতরে থাকতে পারে:

* Avatar
* Text
* Image
* Form
* Button
* অন্য Component

এই pattern সাধারণত ব্যবহার করা হয়:

* Card
* Panel
* Modal
* Layout
* Grid
* Sidebar
* Wrapper Component

---

# ১৩. Props সময়ের সঙ্গে পরিবর্তিত হতে পারে

## How Props Change Over Time

Props সবসময় স্থির থাকে না।

একটি Component প্রতিবার render হওয়ার সময় নতুন props পেতে পারে।

উদাহরণ:

```jsx
export default function Clock({ color, time }) {
  return (
    <h1 style={{ color: color }}>
      {time}
    </h1>
  );
}
```

এখানে `Clock` দুইটি prop গ্রহণ করছে:

```jsx
color
```

এবং:

```jsx
time
```

---

# `time` Prop পরিবর্তন

Clock-এর সময় প্রতি সেকেন্ডে পরিবর্তিত হতে পারে।

```text
10:30:01
10:30:02
10:30:03
```

প্রতিবার Parent Component নতুন `time` prop পাঠাবে।

---

# `color` Prop পরিবর্তন

User dropdown থেকে নতুন color নির্বাচন করলে Parent Component নতুন `color` prop পাঠাতে পারে।

```text
red
blue
green
```

তখন `Clock` নতুন color দিয়ে render হবে।

---

# Props হলো সময়ের নির্দিষ্ট মুহূর্তের Snapshot

প্রতিটি render-এর সময় Component যে props পায়, সেটিকে সেই মুহূর্তের একটি snapshot হিসেবে ভাবা যায়।

উদাহরণ:

প্রথম render:

```jsx
<Clock
  color="red"
  time="10:30:01"
/>
```

দ্বিতীয় render:

```jsx
<Clock
  color="blue"
  time="10:30:02"
/>
```

প্রতিটি render নতুন props পেয়েছে।

---

# ১৪. Props Read-only বা Immutable

Props পরিবর্তন করা যায় না।

Props হলো **immutable**, অর্থাৎ Component নিজে তার props পরিবর্তন করবে না।

ভুল:

```jsx
function Avatar({ size }) {
  size = 200;

  return <img width={size} />;
}
```

এভাবে prop পরিবর্তন করা উচিত নয়।

আরও ভুল:

```jsx
function Profile(props) {
  props.name = "Changed Name";

  return <h1>{props.name}</h1>;
}
```

---

# Props কেন পরিবর্তন করা যায় না?

Props Parent Component-এর মালিকানাধীন data।

Child Component শুধু props পড়ে এবং ব্যবহার করে।

Child Component প্রয়োজন হলে Parent-কে নতুন value পাঠাতে বলতে পারে।

তারপর Parent নতুন props পাঠাবে।

---

# Props পরিবর্তন দরকার হলে কী করতে হবে?

Props পরিবর্তন করার চেষ্টা না করে:

* Parent Component-এর data পরিবর্তন করতে হবে
* State ব্যবহার করতে হবে
* Event handler ব্যবহার করতে হবে
* Parent থেকে নতুন props পাঠাতে হবে

ধারণাগতভাবে:

```text
Child user interaction পায়
        ↓
Child Parent-এর function call করে
        ↓
Parent data বা state পরিবর্তন করে
        ↓
Parent নতুন props পাঠায়
        ↓
Child নতুন props দিয়ে render হয়
```

---

# Props এবং State-এর পার্থক্য

## Props

* Parent থেকে আসে
* Child-এর জন্য read-only
* Component নিজে পরিবর্তন করতে পারে না

## State

* Component-এর নিজস্ব memory
* Component state update করতে পারে
* User interaction অনুযায়ী পরিবর্তিত হতে পারে

---

# Props-এর ভুল ও সঠিক ব্যবহার

## ভুল

```jsx
function Counter({ count }) {
  count = count + 1;

  return <p>{count}</p>;
}
```

## ধারণাগতভাবে সঠিক

```jsx
function Counter({ count, onIncrement }) {
  return (
    <button onClick={onIncrement}>
      Count: {count}
    </button>
  );
}
```

এখানে Child সরাসরি `count` পরিবর্তন করছে না।

Parent-এর দেওয়া `onIncrement` function call করছে।

Parent পরে নতুন `count` prop পাঠাবে।

---

# ১৫. Props-এর বিভিন্ন Data Type

## String Prop

```jsx
<Profile name="Rahim" />
```

Child:

```jsx
function Profile({ name }) {
  return <h1>{name}</h1>;
}
```

---

## Number Prop

```jsx
<Avatar size={100} />
```

Child:

```jsx
function Avatar({ size }) {
  return <img width={size} />;
}
```

Number পাঠানোর সময় curly braces ব্যবহার করতে হয়।

```jsx
size={100}
```

নিচেরটি string:

```jsx
size="100"
```

---

## Boolean Prop

```jsx
<Item isPacked={true} />
```

Child:

```jsx
function Item({ isPacked }) {
  return <p>{isPacked ? "Packed" : "Not packed"}</p>;
}
```

`true` পাঠানোর সংক্ষিপ্ত পদ্ধতি:

```jsx
<Item isPacked />
```

এটি প্রায় একই:

```jsx
<Item isPacked={true} />
```

---

## Object Prop

```jsx
<Profile
  person={{
    name: "Rahim",
    age: 22,
  }}
/>
```

Child:

```jsx
function Profile({ person }) {
  return (
    <div>
      <h1>{person.name}</h1>
      <p>{person.age}</p>
    </div>
  );
}
```

---

## Array Prop

```jsx
<Student
  subjects={[
    "Physics",
    "Chemistry",
    "Mathematics",
  ]}
/>
```

Child:

```jsx
function Student({ subjects }) {
  return (
    <ul>
      {subjects.map((subject) => (
        <li key={subject}>{subject}</li>
      ))}
    </ul>
  );
}
```

---

## Function Prop

```jsx
<Button onButtonClick={handleClick} />
```

Child:

```jsx
function Button({ onButtonClick }) {
  return (
    <button onClick={onButtonClick}>
      Click
    </button>
  );
}
```

---

## JSX Prop

সাধারণ prop-এর মাধ্যমেও JSX পাঠানো যায়।

```jsx
<Alert
  message={<strong>Important message</strong>}
/>
```

Child:

```jsx
function Alert({ message }) {
  return <div>{message}</div>;
}
```

তবে nested content হলে সাধারণত `children` ব্যবহার করা হয়।

---

# ১৬. সাধারণ Props Error

## ভুল ১: Prop পাঠানো হয়েছে, কিন্তু Child গ্রহণ করেনি

```jsx
<Avatar size={100} />
```

কিন্তু:

```jsx
function Avatar() {
  return <img width={size} />;
}
```

এখানে `size` defined নয়।

সঠিক:

```jsx
function Avatar({ size }) {
  return <img width={size} />;
}
```

---

## ভুল ২: Prop-এর নাম মিলেনি

Parent:

```jsx
<Avatar imageSize={100} />
```

Child:

```jsx
function Avatar({ size }) {
  return <img width={size} />;
}
```

এখানে Parent পাঠিয়েছে:

```text
imageSize
```

কিন্তু Child পড়ছে:

```text
size
```

সঠিকভাবে নাম মিলতে হবে।

```jsx
function Avatar({ imageSize }) {
  return <img width={imageSize} />;
}
```

---

## ভুল ৩: Curly Braces ছাড়া Number পাঠানো

```jsx
<Avatar size="100" />
```

এটি string।

Number পাঠাতে:

```jsx
<Avatar size={100} />
```

---

## ভুল ৪: Props Destructuring-এ Curly Braces বাদ দেওয়া

ভুল:

```jsx
function Avatar(person, size) {
}
```

সঠিক:

```jsx
function Avatar({ person, size }) {
}
```

---

## ভুল ৫: Prop পরিবর্তন করা

ভুল:

```jsx
function Avatar({ size }) {
  size = size + 10;
}
```

Prop পরিবর্তন না করে নতুন variable তৈরি করা যায়:

```jsx
function Avatar({ size }) {
  const displaySize = size + 10;

  return <img width={displaySize} />;
}
```

এখানে prop পরিবর্তন করা হয়নি।

---

## ভুল ৬: Spread Syntax অতিরিক্ত ব্যবহার

```jsx
<Avatar {...props} />
```

সব জায়গায় এভাবে ব্যবহার করলে কোন props যাচ্ছে তা বোঝা কঠিন হতে পারে।

প্রয়োজনে স্পষ্টভাবে লেখা ভালো:

```jsx
<Avatar
  person={person}
  size={size}
/>
```

---

# ১৭. বাস্তব উদাহরণ: Product Card

```jsx
function ProductCard({
  name,
  price,
  imageUrl,
  inStock,
}) {
  return (
    <article className="product-card">
      <img
        src={imageUrl}
        alt={name}
      />

      <h2>{name}</h2>
      <p>${price}</p>

      <p>
        {inStock
          ? "Available"
          : "Out of stock"}
      </p>
    </article>
  );
}
```

ব্যবহার:

```jsx
export default function ProductList() {
  return (
    <div>
      <ProductCard
        name="Mechanical Keyboard"
        price={99}
        imageUrl="/keyboard.jpg"
        inStock={true}
      />

      <ProductCard
        name="Wireless Mouse"
        price={49}
        imageUrl="/mouse.jpg"
        inStock={false}
      />
    </div>
  );
}
```

একটি Component আলাদা props ব্যবহার করে দুইটি ভিন্ন product দেখাচ্ছে।

---

# ১৮. বাস্তব উদাহরণ: Button Component

```jsx
function Button({
  text,
  disabled = false,
  onClick,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
```

ব্যবহার:

```jsx
<Button
  text="Submit"
  onClick={handleSubmit}
/>

<Button
  text="Processing"
  disabled={true}
/>
```

এখানে:

* `text` string prop
* `disabled` boolean prop
* `onClick` function prop
* `disabled`-এর default value `false`

---

# ১৯. বাস্তব উদাহরণ: Card এবং Children

```jsx
function Card({ title, children }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}
```

ব্যবহার:

```jsx
export default function App() {
  return (
    <Card title="Student Profile">
      <p>Name: Rahim</p>
      <p>Department: Engineering</p>
      <button>View Details</button>
    </Card>
  );
}
```

এখানে:

```jsx
title="Student Profile"
```

একটি সাধারণ prop।

আর:

```jsx
<p>Name: Rahim</p>
<p>Department: Engineering</p>
<button>View Details</button>
```

সবকিছু `children` prop।

---

# অধ্যায়ের সংক্ষিপ্ত সারাংশ

## Props দিয়ে Parent থেকে Child-এ তথ্য পাঠানো হয়

```jsx
<Avatar
  person={person}
  size={100}
/>
```

---

## Child Component Destructuring করে Props পড়ে

```jsx
function Avatar({ person, size }) {
}
```

---

## Props Object হিসেবেও পড়া যায়

```jsx
function Avatar(props) {
  const person = props.person;
  const size = props.size;
}
```

---

## Default Value দেওয়া যায়

```jsx
function Avatar({
  person,
  size = 100,
}) {
}
```

---

## Spread Syntax দিয়ে সব Props Forward করা যায়

```jsx
<Avatar {...props} />
```

তবে এটি অতিরিক্ত ব্যবহার করা উচিত নয়।

---

## Nested JSX `children` Prop হিসেবে পাওয়া যায়

```jsx
<Card>
  <Avatar />
</Card>
```

```jsx
function Card({ children }) {
  return <div>{children}</div>;
}
```

---

## Props সময়ের সঙ্গে পরিবর্তিত হতে পারে

Parent নতুন props পাঠালে Child নতুন props দিয়ে render হয়।

---

## Props Read-only

Child Component props পরিবর্তন করবে না।

Interaction-এর জন্য state ব্যবহার করতে হয়।

---

# গুরুত্বপূর্ণ প্রশ্ন ও উত্তর

## প্রশ্ন ১: Props কী?

Props হলো Parent Component থেকে Child Component-এ তথ্য পাঠানোর পদ্ধতি।

---

## প্রশ্ন ২: Props কীভাবে পাঠানো হয়?

JSX attribute-এর মতো।

```jsx
<Avatar size={100} />
```

---

## প্রশ্ন ৩: Props কীভাবে গ্রহণ করা হয়?

Destructuring করে:

```jsx
function Avatar({ size }) {
}
```

---

## প্রশ্ন ৪: React Component কয়টি Argument পায়?

React Component function একটি props object গ্রহণ করে।

```jsx
function Avatar(props) {
}
```

---

## প্রশ্ন ৫: Props Destructuring কী?

Props object থেকে প্রয়োজনীয় property আলাদা variable হিসেবে নেওয়াকে props destructuring বলা হয়।

```jsx
function Avatar({ person, size }) {
}
```

---

## প্রশ্ন ৬: Default Prop Value কীভাবে দেওয়া হয়?

```jsx
function Avatar({ size = 100 }) {
}
```

---

## প্রশ্ন ৭: Default Value কখন ব্যবহার হয়?

Prop না পাঠালে অথবা `undefined` পাঠালে।

---

## প্রশ্ন ৮: `null` পাঠালে কি Default Value ব্যবহার হবে?

না।

```jsx
size={null}
```

হলে `size` হবে `null`।

---

## প্রশ্ন ৯: Spread Syntax কী?

একটি props object-এর সব property অন্য Component-এ forward করার syntax।

```jsx
<Avatar {...props} />
```

---

## প্রশ্ন ১০: `children` Prop কী?

Component-এর opening ও closing tag-এর মাঝখানে থাকা JSX `children` prop হিসেবে পাওয়া যায়।

```jsx
<Card>
  <Avatar />
</Card>
```

---

## প্রশ্ন ১১: Props পরিবর্তন করা যায় কি?

না। Props read-only এবং immutable।

---

## প্রশ্ন ১২: Props পরিবর্তন দরকার হলে কী করতে হবে?

Parent Component-কে নতুন props পাঠাতে হবে। সাধারণত state update করে এটি করা হয়।

---

## প্রশ্ন ১৩: Props এবং HTML Attribute কি একই?

দেখতে একই রকম হলেও custom Component-এর props-এর মাধ্যমে যেকোনো JavaScript value পাঠানো যায়।

---

## প্রশ্ন ১৪: Props কেন গুরুত্বপূর্ণ?

Props Component-কে configurable, reusable এবং independent করে।

---

# খুব সংক্ষিপ্ত Revision

```jsx
function Avatar({
  person,
  size = 100,
}) {
  return (
    <img
      src={person.imageUrl}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        person={{
          name: "Rahim",
          imageUrl: "/rahim.jpg",
        }}
        size={80}
      />
    </Card>
  );
}
```

এই code থেকে মনে রাখতে হবে:

```text
person এবং size
→ Avatar-এর props

size = 100
→ Default prop value

function Avatar({ person, size })
→ Props destructuring

<Card>...</Card>
→ Nested JSX

children
→ Card-এর ভিতরের JSX

Props
→ Read-only
```
