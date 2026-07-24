# JavaScript in JSX with Curly Braces

## Curly Braces ব্যবহার করে JSX-এর ভিতরে JavaScript লেখা

JSX ব্যবহার করে JavaScript file-এর ভিতরে HTML-এর মতো markup লেখা যায়।

অনেক সময় JSX markup-এর ভিতরে স্থির text না দেখিয়ে JavaScript থেকে আসা dynamic তথ্য দেখাতে হয়। যেমন:

* কোনো variable-এর value
* একটি object-এর property
* function-এর result
* dynamic image URL
* dynamic style
* হিসাবের ফলাফল

এই কাজগুলো করার জন্য JSX-এর ভিতরে curly braces ব্যবহার করা হয়।

Curly braces হলো:

```jsx
{}
```

Curly braces-কে JSX-এর ভিতর থেকে JavaScript-এর জগতে যাওয়ার একটি জানালা হিসেবে ভাবা যায়।

---

# এই অধ্যায়ে যা শিখব

এই অধ্যায়ে আমরা শিখব:

1. Quotes ব্যবহার করে string পাঠানো
2. Curly braces দিয়ে JSX-এর ভিতরে variable ব্যবহার
3. Curly braces দিয়ে JavaScript function call করা
4. Curly braces কোথায় ব্যবহার করা যায়
5. JSX-এর ভিতরে JavaScript object ব্যবহার
6. Double curly braces কী
7. Inline CSS style কীভাবে লেখা হয়

---

# ১. Quotes দিয়ে String পাঠানো

## Passing Strings with Quotes

JSX attribute-এর value যদি একটি স্থির string হয়, তাহলে single quote বা double quote-এর ভিতরে লেখা যায়।

উদাহরণ:

```jsx
export default function Avatar() {
  return (
    <img
      className="avatar"
      src="https://react.dev/images/docs/scientists/7vQD0fPs.jpg"
      alt="Gregorio Y. Zara"
    />
  );
}
```

এখানে:

```jsx
className="avatar"
```

`avatar` একটি string।

একইভাবে:

```jsx
src="https://react.dev/images/docs/scientists/7vQD0fPs.jpg"
```

Image-এর URL একটি string।

আর:

```jsx
alt="Gregorio Y. Zara"
```

Alternative text-ও একটি string।

---

# Quotes-এর ভিতরের Value অপরিবর্তিত থাকে

যখন JSX attribute-এর value quotes-এর ভিতরে লেখা হয়, তখন React সেটিকে সরাসরি string হিসেবে গ্রহণ করে।

```jsx
alt="Gregorio Y. Zara"
```

এখানে React `Gregorio Y. Zara` নামের কোনো variable খুঁজবে না।

এটি সরাসরি `"Gregorio Y. Zara"` string ব্যবহার করবে।

---

# ২. Dynamic Value ব্যবহার

ধরা যাক image URL এবং description JavaScript variable-এর মধ্যে রাখা হয়েছে।

```jsx
const avatar =
  "https://react.dev/images/docs/scientists/7vQD0fPs.jpg";

const description = "Gregorio Y. Zara";
```

এখন এই variable-গুলোর value JSX-এর attribute-এ ব্যবহার করতে হবে।

এক্ষেত্রে quotes-এর পরিবর্তে curly braces ব্যবহার করতে হবে।

```jsx
export default function Avatar() {
  const avatar =
    "https://react.dev/images/docs/scientists/7vQD0fPs.jpg";

  const description = "Gregorio Y. Zara";

  return (
    <img
      className="avatar"
      src={avatar}
      alt={description}
    />
  );
}
```

এখানে:

```jsx
src={avatar}
```

`avatar` variable-এর value ব্যবহার করছে।

আর:

```jsx
alt={description}
```

`description` variable-এর value ব্যবহার করছে।

---

# Quotes এবং Curly Braces-এর পার্থক্য

## Quotes ব্যবহার

```jsx
className="avatar"
```

এখানে `"avatar"` একটি সরাসরি string।

## Curly braces ব্যবহার

```jsx
src={avatar}
```

এখানে `avatar` একটি JavaScript variable।

সহজভাবে:

```text
"..."  → String
{...}  → JavaScript expression
```

---

# ভুল উদাহরণ

```jsx
src="{avatar}"
```

এখানে `"{avatar}"` সম্পূর্ণ অংশটি একটি string হিসেবে ধরা হবে।

React `avatar` variable-এর value পড়বে না।

অর্থাৎ এটি প্রায় এমন:

```text
{avatar}
```

লেখাটিকেই URL হিসেবে ব্যবহার করার চেষ্টা করবে।

---

# সঠিক উদাহরণ

```jsx
src={avatar}
```

এখানে React JavaScript-এর `avatar` variable-এর value পড়বে।

---

# ৩. Curly Braces: JavaScript-এর জন্য জানালা

## Using Curly Braces: A Window into JavaScript

JSX হলো JavaScript লেখার একটি বিশেষ পদ্ধতি।

তাই JSX-এর ভিতরে curly braces ব্যবহার করে JavaScript expression লেখা যায়।

উদাহরণ:

```jsx
export default function TodoList() {
  const name = "Gregorio Y. Zara";

  return (
    <h1>{name}'s To Do List</h1>
  );
}
```

এখানে:

```jsx
const name = "Gregorio Y. Zara";
```

একটি JavaScript variable।

তারপর JSX-এর ভিতরে:

```jsx
{name}
```

লিখে variable-এর value দেখানো হয়েছে।

Output:

```text
Gregorio Y. Zara's To Do List
```

---

# Variable-এর Value পরিবর্তন করলে UI পরিবর্তিত হবে

যদি লেখা হয়:

```jsx
const name = "Hedy Lamarr";
```

তাহলে output হবে:

```text
Hedy Lamarr's To Do List
```

অর্থাৎ JSX-এর content variable-এর value অনুযায়ী dynamicভাবে পরিবর্তিত হচ্ছে।

---

# ৪. Curly Braces-এর ভিতরে JavaScript Expression

Curly braces-এর ভিতরে যেকোনো valid JavaScript expression ব্যবহার করা যায়।

যেমন:

* Variable
* Object property
* Mathematical expression
* Function call
* Template literal
* Array method-এর ফল
* Conditional expression

---

# Variable ব্যবহার

```jsx
const title = "My Tasks";

export default function App() {
  return <h1>{title}</h1>;
}
```

---

# হিসাব করা

```jsx
export default function App() {
  return <p>Result: {10 + 20}</p>;
}
```

Output:

```text
Result: 30
```

---

# String Method ব্যবহার

```jsx
const name = "react";

export default function App() {
  return <h1>{name.toUpperCase()}</h1>;
}
```

Output:

```text
REACT
```

---

# Object Property ব্যবহার

```jsx
const person = {
  name: "Gregorio Y. Zara",
};

export default function App() {
  return <h1>{person.name}</h1>;
}
```

---

# Template Literal ব্যবহার

```jsx
const firstName = "Gregorio";
const lastName = "Zara";

export default function App() {
  return (
    <h1>{`${firstName} ${lastName}`}</h1>
  );
}
```

Output:

```text
Gregorio Zara
```

---

# ৫. Function Call ব্যবহার

Curly braces-এর ভিতরে JavaScript function call করা যায়।

উদাহরণ:

```jsx
const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat(
    "en-US",
    { weekday: "long" }
  ).format(date);
}

export default function TodoList() {
  return (
    <h1>
      To Do List for {formatDate(today)}
    </h1>
  );
}
```

এখানে:

```jsx
formatDate(today)
```

একটি JavaScript function call।

Function-টি `today` date গ্রহণ করে সপ্তাহের দিনের নাম return করছে।

ধরা যাক দিনটি Monday হলে output হবে:

```text
To Do List for Monday
```

---

# Code-এর ধাপ

প্রথমে current date তৈরি করা হয়েছে:

```jsx
const today = new Date();
```

তারপর function তৈরি করা হয়েছে:

```jsx
function formatDate(date) {
  return new Intl.DateTimeFormat(
    "en-US",
    { weekday: "long" }
  ).format(date);
}
```

JSX-এর ভিতরে function call করা হয়েছে:

```jsx
{formatDate(today)}
```

Function যে result return করবে, সেটিই UI-তে দেখা যাবে।

---

# Expression এবং Statement-এর পার্থক্য

Curly braces-এর ভিতরে সাধারণত JavaScript expression ব্যবহার করা যায়।

Expression এমন code, যা একটি value তৈরি করে।

উদাহরণ:

```jsx
{name}
```

```jsx
{10 + 20}
```

```jsx
{person.name}
```

```jsx
{formatDate(today)}
```

```jsx
{isLoggedIn ? "Welcome" : "Login"}
```

এগুলো প্রত্যেকটি একটি value তৈরি করে।

---

# সরাসরি `if` Statement লেখা যায় না

নিচের code JSX-এর curly braces-এর ভিতরে valid নয়:

```jsx
{
  if (isLoggedIn) {
    return "Welcome";
  }
}
```

কারণ `if` একটি statement, expression নয়।

এর পরিবর্তে ternary expression ব্যবহার করা যায়:

```jsx
{isLoggedIn ? "Welcome" : "Please log in"}
```

অথবা JSX-এর আগে `if` ব্যবহার করতে হয়।

```jsx
let message;

if (isLoggedIn) {
  message = "Welcome";
} else {
  message = "Please log in";
}

return <h1>{message}</h1>;
```

---

# ৬. Curly Braces কোথায় ব্যবহার করা যায়?

## Where to Use Curly Braces

JSX-এর ভিতরে curly braces প্রধানত দুই জায়গায় ব্যবহার করা যায়।

## ১. JSX Tag-এর Content হিসেবে

উদাহরণ:

```jsx
<h1>{name}'s To Do List</h1>
```

এখানে `{name}` tag-এর ভিতরের content।

আরও উদাহরণ:

```jsx
<p>Your score is {score}</p>
```

```jsx
<h2>{person.name}</h2>
```

```jsx
<span>{10 * 5}</span>
```

---

## ২. Attribute-এর `=`-এর পরে

উদাহরণ:

```jsx
<img src={avatar} />
```

এখানে curly braces attribute-এর `=`-এর ঠিক পরে ব্যবহার করা হয়েছে।

আরও উদাহরণ:

```jsx
<img alt={description} />
```

```jsx
<button disabled={isDisabled}>
```

```jsx
<div className={cardClass}>
```

```jsx
<input value={userName} />
```

---

# Curly Braces দিয়ে Dynamic Tag Name লেখা যায় না

নিচের code কাজ করবে না:

```jsx
<{tag}>
  Content
</{tag}>
```

কারণ JSX tag-এর নামের জায়গায় এভাবে curly braces ব্যবহার করা যায় না।

সঠিকভাবে dynamic component ব্যবহার করতে component reference Capital letter-এর variable-এ রাখতে হয়।

উদাহরণ:

```jsx
const Tag = "h1";

export default function App() {
  return <Tag>Hello</Tag>;
}
```

তবে এই বিষয়টি বর্তমান অধ্যায়ের মূল আলোচনার বাইরে।

---

# Quotes-এর ভিতরে Curly Braces দিলে কী হয়?

ভুল:

```jsx
<img src="{avatar}" />
```

এখানে React variable পড়বে না।

এটি `"{avatar}"`-কে একটি string হিসেবে নেবে।

সঠিক:

```jsx
<img src={avatar} />
```

---

# ৭. Double Curly Braces

## Using “Double Curlies”

অনেক সময় JSX-এর ভিতরে নিচের মতো code দেখা যায়:

```jsx
style={{
  backgroundColor: "black",
  color: "pink",
}}
```

এখানে দুটি curly braces পাশাপাশি দেখা যাচ্ছে:

```jsx
{{
}}
```

এটি JSX-এর আলাদা কোনো বিশেষ syntax নয়।

এখানে:

* বাইরের `{}` JSX-এর ভিতরে JavaScript ব্যবহার করার জন্য
* ভিতরের `{}` একটি JavaScript object

---

# সহজভাবে Double Curly Braces বোঝা

সাধারণ object:

```jsx
{
  name: "Hedy Lamarr",
  inventions: 5,
}
```

এখন object-টি JSX attribute-এ পাঠাতে হলে বাইরের curly braces প্রয়োজন:

```jsx
person={{
  name: "Hedy Lamarr",
  inventions: 5,
}}
```

এখানে:

```jsx
person={
  {
    name: "Hedy Lamarr",
    inventions: 5,
  }
}
```

আকারে ভেঙে লিখলে বিষয়টি পরিষ্কার হয়।

---

# Double Curly Braces-এর অর্থ

```jsx
person={{ name: "Hedy Lamarr" }}
```

এখানে:

```text
প্রথম { }
→ JSX থেকে JavaScript-এ প্রবেশ

দ্বিতীয় { }
→ JavaScript object তৈরি
```

---

# ৮. JSX-এ Inline Style

React-এ inline style দিতে `style` attribute-এ একটি JavaScript object পাঠাতে হয়।

উদাহরণ:

```jsx
export default function TodoList() {
  return (
    <ul
      style={{
        backgroundColor: "black",
        color: "pink",
      }}
    >
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>
        Work on the alcohol-fuelled engine
      </li>
    </ul>
  );
}
```

এখানে:

```jsx
style={{
  backgroundColor: "black",
  color: "pink",
}}
```

একটি style object।

---

# Style Object আলাদাভাবে বোঝা

নিচের code:

```jsx
<ul
  style={{
    backgroundColor: "black",
    color: "pink",
  }}
>
```

আসলে এমনভাবে চিন্তা করা যায়:

```jsx
<ul
  style={
    {
      backgroundColor: "black",
      color: "pink",
    }
  }
>
```

এখানে বাইরের curly braces JavaScript expression-এর জন্য।

ভেতরের curly braces object-এর জন্য।

---

# Style Object আলাদা Variable-এ রাখা

Inline object না লিখে আলাদা variable-এও রাখা যায়।

```jsx
const listStyle = {
  backgroundColor: "black",
  color: "pink",
};

export default function TodoList() {
  return (
    <ul style={listStyle}>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
    </ul>
  );
}
```

এখানে:

```jsx
style={listStyle}
```

`listStyle` object-এর reference ব্যবহার করছে।

---

# React-এ Inline Style বাধ্যতামূলক নয়

React ব্যবহার করলেই inline style ব্যবহার করতে হবে—এমন নয়।

সাধারণ CSS class ব্যবহার করা যায়:

```jsx
<ul className="todo-list">
```

CSS:

```css
.todo-list {
  background-color: black;
  color: pink;
}
```

বেশিরভাগ সাধারণ styling-এর জন্য CSS class ব্যবহার করা সুবিধাজনক।

Dynamic style প্রয়োজন হলে inline style object উপকারী হতে পারে।

---

# ৯. Style Property camelCase হয়

HTML inline style:

```html
<ul style="background-color: black">
```

JSX inline style:

```jsx
<ul
  style={{
    backgroundColor: "black",
  }}
>
```

JSX-এর style object-এর property camelCase-এ লিখতে হয়।

---

# CSS এবং JSX Style-এর তুলনা

| CSS                | JSX style object  |
| ------------------ | ----------------- |
| `background-color` | `backgroundColor` |
| `font-size`        | `fontSize`        |
| `border-radius`    | `borderRadius`    |
| `text-align`       | `textAlign`       |
| `margin-top`       | `marginTop`       |
| `line-height`      | `lineHeight`      |

---

# ভুল Style

```jsx
<div
  style={{
    background-color: "black",
  }}
>
```

এটি ভুল, কারণ JavaScript object property এভাবে dash দিয়ে লেখা হয়নি।

সঠিক:

```jsx
<div
  style={{
    backgroundColor: "black",
  }}
>
```

---

# Style Value সাধারণত String

```jsx
style={{
  color: "pink",
  backgroundColor: "black",
}}
```

এখানে values string।

Numeric value-ও দেওয়া যায়:

```jsx
style={{
  width: 100,
  height: 100,
}}
```

কিছু CSS property-এর numeric value দিলে React প্রয়োজন অনুযায়ী `px` ব্যবহার করে।

তবে unit প্রয়োজন হলে string লিখতে হয়:

```jsx
style={{
  width: "50%",
  marginTop: "2rem",
}}
```

---

# ১০. Object থেকে একাধিক Value ব্যবহার

## More Fun with JavaScript Objects and Curly Braces

একাধিক সম্পর্কিত value একটি JavaScript object-এর মধ্যে রাখা যায়।

উদাহরণ:

```jsx
const person = {
  name: "Gregorio Y. Zara",

  theme: {
    backgroundColor: "black",
    color: "pink",
  },
};
```

এখানে `person` object-এর মধ্যে রয়েছে:

* `name`
* `theme`

`theme` নিজেও একটি object।

---

# Object-এর Value JSX-এ ব্যবহার

```jsx
export default function TodoList() {
  const person = {
    name: "Gregorio Y. Zara",

    theme: {
      backgroundColor: "black",
      color: "pink",
    },
  };

  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>

      <img
        className="avatar"
        src="https://react.dev/images/docs/scientists/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />

      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>
          Work on the alcohol-fuelled engine
        </li>
      </ul>
    </div>
  );
}
```

---

# `person.name`

```jsx
<h1>{person.name}'s Todos</h1>
```

এখানে `person` object-এর `name` property ব্যবহার করা হয়েছে।

Output:

```text
Gregorio Y. Zara's Todos
```

---

# `person.theme`

```jsx
<div style={person.theme}>
```

এখানে `person` object-এর `theme` property style হিসেবে ব্যবহার করা হয়েছে।

`person.theme` হলো:

```jsx
{
  backgroundColor: "black",
  color: "pink",
}
```

ফলে `<div>`-এর background black এবং text pink হবে।

---

# কেন Object ব্যবহার করা হয়?

সম্পর্কিত data একসঙ্গে রাখার জন্য object ব্যবহার করা হয়।

উদাহরণ:

```jsx
const person = {
  name: "Gregorio Y. Zara",
  imageUrl: "photo.jpg",
  profession: "Engineer",
};
```

তারপর JSX-এ:

```jsx
<h1>{person.name}</h1>

<img
  src={person.imageUrl}
  alt={person.name}
/>

<p>{person.profession}</p>
```

এভাবে data এবং rendering logic সংগঠিত রাখা সহজ হয়।

---

# JSX একটি Minimal Template Language

JSX-এর নিজস্ব template feature খুব কম।

কারণ data organize করা, function call করা, object তৈরি করা এবং condition লেখা—এসবের জন্য সরাসরি JavaScript ব্যবহার করা যায়।

উদাহরণ:

```jsx
const user = {
  firstName: "Rahim",
  lastName: "Ahmed",
};

function getFullName(person) {
  return `${person.firstName} ${person.lastName}`;
}

export default function Profile() {
  return <h1>{getFullName(user)}</h1>;
}
```

এখানে আলাদা template language শেখার প্রয়োজন হচ্ছে না।

JavaScript দিয়েই data এবং logic পরিচালনা করা যাচ্ছে।

---

# ১১. Common Mistake: Object সরাসরি Render করা

ধরা যাক:

```jsx
const person = {
  name: "Gregorio Y. Zara",

  theme: {
    backgroundColor: "black",
    color: "pink",
  },
};
```

এরপর লেখা হলো:

```jsx
<h1>{person}'s Todos</h1>
```

এটি error তৈরি করবে।

সম্ভাব্য error:

```text
Objects are not valid as a React child
```

কারণ React সরাসরি একটি সম্পূর্ণ JavaScript object-কে text হিসেবে render করতে পারে না।

---

# ভুল

```jsx
<h1>{person}'s Todos</h1>
```

এখানে `person` একটি object।

---

# সঠিক

```jsx
<h1>{person.name}'s Todos</h1>
```

এখানে `person.name` একটি string।

React string render করতে পারে।

---

# কোন Value সরাসরি Render করা যায়?

সাধারণত render করা যায়:

* String
* Number
* JSX element
* Array-এর renderable content
* `null`
* কিছু conditional result

উদাহরণ:

```jsx
<p>{"Hello"}</p>
```

```jsx
<p>{100}</p>
```

```jsx
<div>{<strong>Important</strong>}</div>
```

---

# Object সরাসরি Render করা যায় না

ভুল:

```jsx
<p>{{ name: "Rahim" }}</p>
```

ভুল:

```jsx
<p>{person}</p>
```

সঠিক:

```jsx
<p>{person.name}</p>
```

অথবা debugging-এর জন্য object-কে string-এ পরিবর্তন করা যায়:

```jsx
<pre>{JSON.stringify(person, null, 2)}</pre>
```

---

# ১২. সম্পূর্ণ উদাহরণ

```jsx
const person = {
  name: "Gregorio Y. Zara",

  imageUrl:
    "https://react.dev/images/docs/scientists/7vQD0fPs.jpg",

  theme: {
    backgroundColor: "black",
    color: "pink",
  },
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>

      <img
        className="avatar"
        src={person.imageUrl}
        alt={person.name}
      />

      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>
          Work on the alcohol-fuelled engine
        </li>
      </ul>
    </div>
  );
}
```

---

# Code বিশ্লেষণ

## JavaScript Object

```jsx
const person = {
```

`person` নামে একটি object তৈরি করেছে।

## Name Property

```jsx
name: "Gregorio Y. Zara",
```

ব্যক্তির নাম।

## Image URL

```jsx
imageUrl: "...",
```

ব্যক্তির ছবির URL।

## Theme Object

```jsx
theme: {
  backgroundColor: "black",
  color: "pink",
},
```

UI-এর style সংরক্ষণ করছে।

## Dynamic Style

```jsx
<div style={person.theme}>
```

`theme` object style হিসেবে ব্যবহার করছে।

## Dynamic Heading

```jsx
<h1>{person.name}'s Todos</h1>
```

Object থেকে নাম দেখাচ্ছে।

## Dynamic Image Source

```jsx
src={person.imageUrl}
```

Object থেকে image URL নিচ্ছে।

## Dynamic Alt Text

```jsx
alt={person.name}
```

Object থেকে alternative text নিচ্ছে।

---

# ১৩. Static ও Dynamic Value-এর তুলনা

## Static String

```jsx
alt="Gregorio Y. Zara"
```

Value code-এর মধ্যে সরাসরি লেখা।

## Dynamic Value

```jsx
alt={person.name}
```

Value JavaScript object থেকে আসছে।

---

## Static Image URL

```jsx
src="photo.jpg"
```

## Dynamic Image URL

```jsx
src={person.imageUrl}
```

---

## Static Class Name

```jsx
className="avatar"
```

## Dynamic Class Name

```jsx
className={person.avatarClass}
```

---

# ১৪. Curly Braces-এর ব্যবহার এক নজরে

## Variable

```jsx
<h1>{name}</h1>
```

## Object Property

```jsx
<h1>{person.name}</h1>
```

## Function Call

```jsx
<p>{formatDate(today)}</p>
```

## Calculation

```jsx
<p>{price * quantity}</p>
```

## Attribute

```jsx
<img src={imageUrl} />
```

## Boolean Attribute

```jsx
<button disabled={isDisabled}>
```

## Style Object

```jsx
<div
  style={{
    color: "red",
  }}
>
```

## Existing Style Object

```jsx
<div style={theme}>
```

## Conditional Expression

```jsx
<p>{isLoggedIn ? "Welcome" : "Login"}</p>
```

---

# ১৫. সাধারণ ভুল ও সমাধান

## ভুল ১: Variable-কে Quotes-এর মধ্যে লেখা

ভুল:

```jsx
<img src="{avatar}" />
```

সঠিক:

```jsx
<img src={avatar} />
```

---

## ভুল ২: Object সরাসরি Render করা

ভুল:

```jsx
<h1>{person}</h1>
```

সঠিক:

```jsx
<h1>{person.name}</h1>
```

---

## ভুল ৩: Inline Style-এ CSS Syntax ব্যবহার

ভুল:

```jsx
<div
  style="background-color: black"
>
```

সঠিক:

```jsx
<div
  style={{
    backgroundColor: "black",
  }}
>
```

---

## ভুল ৪: Style Property-তে Dash ব্যবহার

ভুল:

```jsx
style={{
  background-color: "black",
}}
```

সঠিক:

```jsx
style={{
  backgroundColor: "black",
}}
```

---

## ভুল ৫: JSX Tag Name-এর জায়গায় Curly Braces

ভুল:

```jsx
<{tag}>Hello</{tag}>
```

---

## ভুল ৬: `if` সরাসরি Curly Braces-এর ভিতরে

ভুল:

```jsx
<p>
  {
    if (isLoggedIn) {
      return "Welcome";
    }
  }
</p>
```

সঠিক:

```jsx
<p>
  {isLoggedIn ? "Welcome" : "Login"}
</p>
```

---

# ১৬. Practice Challenge 1: ভুল ঠিক করা

ভুল code:

```jsx
const person = {
  name: "Gregorio Y. Zara",

  theme: {
    backgroundColor: "black",
    color: "pink",
  },
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person}'s Todos</h1>
    </div>
  );
}
```

সমস্যা:

```jsx
{person}
```

এখানে সম্পূর্ণ object render করার চেষ্টা করা হচ্ছে।

সঠিক code:

```jsx
const person = {
  name: "Gregorio Y. Zara",

  theme: {
    backgroundColor: "black",
    color: "pink",
  },
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
    </div>
  );
}
```

---

# ১৭. Practice: Information Object-এ নেওয়া

ধরা যাক code:

```jsx
export default function Profile() {
  return (
    <div>
      <h1>Gregorio Y. Zara</h1>

      <img
        src="photo.jpg"
        alt="Gregorio Y. Zara"
      />
    </div>
  );
}
```

একই তথ্য বারবার লেখা হয়েছে।

এগুলো object-এ নেওয়া যায়:

```jsx
const person = {
  name: "Gregorio Y. Zara",
  imageUrl: "photo.jpg",
};

export default function Profile() {
  return (
    <div>
      <h1>{person.name}</h1>

      <img
        src={person.imageUrl}
        alt={person.name}
      />
    </div>
  );
}
```

এতে data পরিবর্তন করা সহজ হয়।

---

# ১৮. Practice: Expression লেখা

ধরা যাক:

```jsx
const person = {
  name: "Gregorio Y. Zara",
  inventions: 5,
};
```

JSX-এ লেখা যেতে পারে:

```jsx
<p>
  {person.name} created {person.inventions} inventions.
</p>
```

হিসাবও করা যায়:

```jsx
<p>
  Double inventions: {person.inventions * 2}
</p>
```

Output:

```text
Double inventions: 10
```

---

# অধ্যায়ের সংক্ষিপ্ত সারাংশ

## Quotes-এর ভিতরের JSX Attribute String

```jsx
className="avatar"
```

এখানে `avatar` একটি string।

---

## Curly Braces JavaScript ব্যবহার করতে দেয়

```jsx
src={avatar}
```

এখানে JavaScript variable ব্যবহার হচ্ছে।

---

## JSX Content-এর ভিতরে Curly Braces ব্যবহার করা যায়

```jsx
<h1>{name}'s To Do List</h1>
```

---

## Attribute-এর `=`-এর পরে Curly Braces ব্যবহার করা যায়

```jsx
<img src={avatar} />
```

---

## Function Call করা যায়

```jsx
<h1>{formatDate(today)}</h1>
```

---

## Object Property ব্যবহার করা যায়

```jsx
<h1>{person.name}</h1>
```

---

## Double Curly Braces বিশেষ Syntax নয়

```jsx
style={{
  backgroundColor: "black",
}}
```

এখানে একটি JavaScript object JSX curly braces-এর ভিতরে রয়েছে।

---

## Inline Style একটি Object হিসেবে দিতে হয়

```jsx
<div style={person.theme}>
```

---

## Style Property camelCase-এ লিখতে হয়

```jsx
backgroundColor
fontSize
borderRadius
```

---

## Object সরাসরি Render করা যায় না

ভুল:

```jsx
<h1>{person}</h1>
```

সঠিক:

```jsx
<h1>{person.name}</h1>
```

---

# গুরুত্বপূর্ণ প্রশ্ন ও উত্তর

## প্রশ্ন ১: JSX-এর ভিতরে JavaScript কীভাবে ব্যবহার করা হয়?

Curly braces ব্যবহার করে।

```jsx
{name}
```

---

## প্রশ্ন ২: JSX attribute-এ static string কীভাবে লেখা হয়?

Quotes-এর ভিতরে।

```jsx
className="avatar"
```

---

## প্রশ্ন ৩: JSX attribute-এ variable কীভাবে ব্যবহার করা হয়?

`=`-এর পরে curly braces ব্যবহার করে।

```jsx
src={avatar}
```

---

## প্রশ্ন ৪: `src="{avatar}"` কেন ভুল?

কারণ এটি `avatar` variable-এর value না নিয়ে `"{avatar}"`-কে string হিসেবে গ্রহণ করবে।

---

## প্রশ্ন ৫: Curly braces কোথায় ব্যবহার করা যায়?

দুই জায়গায়:

1. JSX tag-এর content-এর ভিতরে
2. Attribute-এর `=`-এর ঠিক পরে

---

## প্রশ্ন ৬: Function call JSX-এর ভিতরে করা যায় কি?

হ্যাঁ।

```jsx
{formatDate(today)}
```

---

## প্রশ্ন ৭: Double curly braces কী?

JSX curly braces-এর ভিতরে একটি JavaScript object।

```jsx
style={{ color: "red" }}
```

---

## প্রশ্ন ৮: Inline style কীভাবে দিতে হয়?

JavaScript object হিসেবে।

```jsx
style={{
  color: "red",
  backgroundColor: "black",
}}
```

---

## প্রশ্ন ৯: CSS property camelCase কেন?

কারণ JSX style একটি JavaScript object এবং property-গুলো JavaScript naming style অনুসরণ করে।

---

## প্রশ্ন ১০: Object সরাসরি JSX-এ দেখানো যায় কি?

না।

ভুল:

```jsx
{person}
```

সঠিক:

```jsx
{person.name}
```

---

## প্রশ্ন ১১: Curly braces-এর ভিতরে কী লেখা যায়?

যেকোনো JavaScript expression, যেমন:

* Variable
* হিসাব
* Object property
* Function call
* Ternary expression
* String method

---

## প্রশ্ন ১২: Quotes এবং Curly Braces-এর মূল পার্থক্য কী?

```text
Quotes
→ সরাসরি string পাঠায়

Curly braces
→ JavaScript expression evaluate করে
```

---

# খুব সংক্ষিপ্ত Revision

```jsx
const person = {
  name: "Gregorio Y. Zara",

  imageUrl:
    "https://react.dev/images/docs/scientists/7vQD0fPs.jpg",

  theme: {
    backgroundColor: "black",
    color: "pink",
  },
};

export default function Profile() {
  return (
    <div style={person.theme}>
      <h1>{person.name}</h1>

      <img
        className="avatar"
        src={person.imageUrl}
        alt={person.name}
      />
    </div>
  );
}
```

এই code থেকে মনে রাখতে হবে:

```text
className="avatar"
→ Static string

style={person.theme}
→ JavaScript object

{person.name}
→ Object property

src={person.imageUrl}
→ Dynamic attribute value

alt={person.name}
→ Dynamic text value
```
