# React দিয়ে UI বর্ণনা করা

## Describing the UI — সহজ বাংলা নোট

React হলো একটি JavaScript library, যা User Interface বা UI তৈরি করতে ব্যবহার করা হয়।

UI বলতে আমরা ওয়েবসাইট বা অ্যাপের স্ক্রিনে যা দেখি, সেগুলোকে বোঝায়। যেমন:

* Button
* Text
* Image
* Form
* Menu
* সম্পূর্ণ একটি Page

React-এ UI-কে ছোট ছোট অংশে ভাগ করা হয়। এই ছোট অংশগুলোকে **Component** বলা হয়।

একটি Component খুব ছোট হতে পারে, যেমন একটি Button। আবার একটি Component অনেক বড়ও হতে পারে, যেমন একটি সম্পূর্ণ Page।

এই অধ্যায়ে মূলত শেখানো হয়েছে:

1. প্রথম React Component কীভাবে লিখতে হয়
2. একাধিক Component কীভাবে তৈরি করতে হয়
3. Component আলাদা file-এ রেখে import ও export করতে হয় কীভাবে
4. JSX দিয়ে JavaScript-এর ভিতরে markup লিখতে হয় কীভাবে
5. Curly braces ব্যবহার করে JSX-এর ভিতরে JavaScript লিখতে হয় কীভাবে
6. Props দিয়ে Component-এ তথ্য পাঠাতে হয় কীভাবে
7. Condition অনুযায়ী Component দেখাতে হয় কীভাবে
8. Array থেকে একাধিক Component render করতে হয় কীভাবে
9. Component pure রাখা প্রয়োজন কেন
10. UI-কে tree হিসেবে বোঝা কেন গুরুত্বপূর্ণ

---

# ১. আপনার প্রথম Component

## Your First Component

React application ছোট ছোট UI অংশ দিয়ে তৈরি হয়। এই UI অংশগুলোকে বলা হয় **Component**।

একটি React Component হলো একটি JavaScript function, যার ভিতরে markup লেখা যায়।

উদাহরণ:

```jsx
function Profile() {
  return (
    <img
      src="https://react.dev/images/docs/scientists/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}
```

এখানে `Profile` একটি React Component।

Component-টি একটি ছবি return করছে।

এখন `Profile` Component-কে আরেকটি Component-এর ভিতরে ব্যবহার করা যায়।

```jsx
function Profile() {
  return (
    <img
      src="https://react.dev/images/docs/scientists/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

এখানে:

* `Profile` একটি Component
* `Gallery` আরেকটি Component
* `Gallery` Component-এর ভিতরে `Profile` তিনবার ব্যবহার করা হয়েছে
* ফলে একই ছবি তিনবার render হবে

## Component ব্যবহার করার নিয়ম

Component-কে HTML tag-এর মতো লেখা হয়।

```jsx
<Profile />
```

তবে Component-এর নাম Capital letter দিয়ে শুরু করতে হয়।

সঠিক:

```jsx
function Profile() {
  return <h1>Profile</h1>;
}
```

ভুল:

```jsx
function profile() {
  return <h1>Profile</h1>;
}
```

React lowercase নামকে সাধারণ HTML tag মনে করে।

যেমন:

```jsx
<div>
<section>
<img>
```

আর Capital letter দিয়ে শুরু হলে React সেটিকে Component হিসেবে বুঝতে পারে।

যেমন:

```jsx
<Profile />
<Gallery />
```

---

# ২. Component Import এবং Export করা

## Importing and Exporting Components

একটি file-এর ভিতরে অনেকগুলো Component লেখা যায়।

কিন্তু project বড় হলে একটি file-এর ভিতরে অনেক Component থাকলে code খুঁজে পাওয়া ও পরিচালনা করা কঠিন হয়ে যায়।

তাই বড় project-এ সাধারণত প্রতিটি Component আলাদা file-এ রাখা হয়।

তারপর সেই Component export করে অন্য file-এ import করা হয়।

## Profile.js

```jsx
export default function Profile() {
  return (
    <img
      src="https://react.dev/images/docs/scientists/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}
```

এখানে `Profile` Component-কে default export করা হয়েছে।

```jsx
export default function Profile()
```

## Gallery.js

```jsx
import Profile from './Profile.js';

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

এখানে এই লাইন দিয়ে `Profile` Component import করা হয়েছে:

```jsx
import Profile from './Profile.js';
```

এরপর `Gallery` Component-এর ভিতরে `Profile` ব্যবহার করা হয়েছে।

```jsx
<Profile />
```

## কেন আলাদা file ব্যবহার করা হয়?

আলাদা file ব্যবহার করলে:

* Code সহজে খুঁজে পাওয়া যায়
* Component সহজে পরিবর্তন করা যায়
* বড় project পরিচালনা সহজ হয়
* একই Component বিভিন্ন জায়গায় ব্যবহার করা যায়

---

# ৩. JSX দিয়ে Markup লেখা

## Writing Markup with JSX

React Component হলো JavaScript function।

কিন্তু এই function-এর ভিতরে আমরা HTML-এর মতো markup লিখতে পারি।

এই HTML-এর মতো syntax-কে বলা হয় **JSX**।

JSX-এর পূর্ণরূপ হলো:

```text
JavaScript XML
```

উদাহরণ:

```jsx
export default function TodoList() {
  return (
    <h1>Hedy Lamarr's Todos</h1>
  );
}
```

এখানে `<h1>` দেখতে HTML-এর মতো, কিন্তু এটি JSX।

JSX অনেকটা HTML-এর মতো হলেও JSX-এর নিয়ম কিছুটা বেশি কঠোর।

সাধারণ HTML সরাসরি React Component-এর ভিতরে paste করলে সবসময় কাজ নাও করতে পারে।

ভুল JSX:

```jsx
export default function TodoList() {
  return (
    <h1>Hedy Lamarr's Todos</h1>
    <img
      src="https://react.dev/images/docs/scientists/yXOvdOSs.jpg"
      alt="Hedy Lamarr"
      class="photo"
    >
    <ul>
      <li>Invent new traffic lights
      <li>Rehearse a movie scene
      <li>Improve spectrum technology
    </ul>
  );
}
```

এই code-এ কয়েকটি সমস্যা আছে।

## সমস্যা ১: একাধিক Element-এর একটি Parent নেই

একটি Component একসঙ্গে একাধিক পাশাপাশি element return করতে পারে না।

এখানে:

```jsx
<h1>
<img>
<ul>
```

তিনটি element পাশাপাশি আছে।

এগুলোকে একটি parent element বা Fragment-এর ভিতরে রাখতে হবে।

## সমস্যা ২: `class` ব্যবহার করা হয়েছে

JSX-এ `class`-এর পরিবর্তে `className` লিখতে হয়।

ভুল:

```jsx
class="photo"
```

সঠিক:

```jsx
className="photo"
```

## সমস্যা ৩: Tag বন্ধ করা হয়নি

JSX-এ সব tag বন্ধ করতে হয়।

ভুল:

```jsx
<img>
```

সঠিক:

```jsx
<img />
```

ভুল:

```jsx
<li>Invent new traffic lights
```

সঠিক:

```jsx
<li>Invent new traffic lights</li>
```

## সঠিক JSX

```jsx
export default function TodoList() {
  return (
    <>
      <h1>Hedy Lamarr's Todos</h1>

      <img
        src="https://react.dev/images/docs/scientists/yXOvdOSs.jpg"
        alt="Hedy Lamarr"
        className="photo"
      />

      <ul>
        <li>Invent new traffic lights</li>
        <li>Rehearse a movie scene</li>
        <li>Improve spectrum technology</li>
      </ul>
    </>
  );
}
```

---

# ৪. Fragment

নিচের syntax-কে Fragment বলা হয়:

```jsx
<>
  ...
</>
```

Fragment ব্যবহার করে একাধিক element-কে একসঙ্গে group করা যায়।

উদাহরণ:

```jsx
export default function App() {
  return (
    <>
      <h1>Hello</h1>
      <p>Welcome to React</p>
    </>
  );
}
```

Fragment browser-এর DOM-এ অতিরিক্ত element তৈরি করে না।

অর্থাৎ এটি শুধু React-এর জন্য wrapper হিসেবে কাজ করে।

---

# ৫. JSX-এর গুরুত্বপূর্ণ নিয়ম

JSX লেখার সময় মূলত তিনটি নিয়ম মনে রাখতে হবে।

## নিয়ম ১: একটি Root Element Return করতে হবে

ভুল:

```jsx
return (
  <h1>Hello</h1>
  <p>Welcome</p>
);
```

সঠিক:

```jsx
return (
  <div>
    <h1>Hello</h1>
    <p>Welcome</p>
  </div>
);
```

অথবা:

```jsx
return (
  <>
    <h1>Hello</h1>
    <p>Welcome</p>
  </>
);
```

## নিয়ম ২: সব Tag বন্ধ করতে হবে

```jsx
<img />
```

```jsx
<li>Item</li>
```

## নিয়ম ৩: বেশিরভাগ Attribute camelCase-এ লিখতে হয়

HTML:

```html
class="photo"
```

JSX:

```jsx
className="photo"
```

HTML:

```html
onclick
```

JSX:

```jsx
onClick
```

---

# ৬. Curly Braces দিয়ে JSX-এর ভিতরে JavaScript

## JavaScript in JSX with Curly Braces

JSX-এর ভিতরে dynamic তথ্য দেখানোর জন্য JavaScript ব্যবহার করা যায়।

JSX-এর ভিতরে JavaScript লিখতে curly braces `{}` ব্যবহার করা হয়।

উদাহরণ:

```jsx
const person = {
  name: 'Gregorio Y. Zara'
};

export default function TodoList() {
  return (
    <h1>{person.name}'s Todos</h1>
  );
}
```

এখানে:

```jsx
{person.name}
```

JSX-এর ভিতরে JavaScript expression।

Browser-এ দেখা যাবে:

```text
Gregorio Y. Zara's Todos
```

Curly braces-কে JSX-এর ভিতরে JavaScript-এর জন্য একটি জানালা হিসেবে ভাবা যায়।

---

## সম্পূর্ণ উদাহরণ

```jsx
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
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
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

এখানে `person` একটি JavaScript object।

Object-এর ভিতরে আছে:

```jsx
name
```

এবং:

```jsx
theme
```

নাম দেখানোর জন্য লেখা হয়েছে:

```jsx
{person.name}
```

Style দেওয়ার জন্য লেখা হয়েছে:

```jsx
style={person.theme}
```

---

# ৭. JSX-এর মধ্যে Curly Braces কোথায় ব্যবহার করা যায়?

Curly braces সাধারণত দুই জায়গায় ব্যবহার করা হয়।

## ১. Tag-এর ভিতরের Text হিসেবে

```jsx
<h1>{person.name}</h1>
```

## ২. Attribute-এর Value হিসেবে

```jsx
<img src={person.imageUrl} />
```

অথবা:

```jsx
<div style={person.theme}>
```

---

# ৮. Props দিয়ে Component-এ তথ্য পাঠানো

## Passing Props to a Component

React Component একে অপরের সঙ্গে তথ্য আদান-প্রদান করতে পারে।

Parent Component থেকে Child Component-এ তথ্য পাঠানোর জন্য **Props** ব্যবহার করা হয়।

Props-এর পূর্ণরূপ হলো:

```text
Properties
```

Props দেখতে HTML attribute-এর মতো।

উদাহরণ:

```jsx
<Avatar
  size={100}
  person={{
    name: 'Katsuko Saruhashi',
    imageId: 'YfeOqp2'
  }}
/>
```

এখানে `Avatar` Component-এ দুটি prop পাঠানো হয়েছে:

1. `size`
2. `person`

---

## সম্পূর্ণ উদাহরণ

```jsx
import { getImageUrl } from './utils.js';

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}

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

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}
```

---

## `Avatar` Component-এর Props

`Avatar` Component এভাবে props গ্রহণ করেছে:

```jsx
function Avatar({ person, size })
```

এখানে props destructuring করা হয়েছে।

এরপর `person` এবং `size` ব্যবহার করা হয়েছে:

```jsx
src={getImageUrl(person)}
```

```jsx
alt={person.name}
```

```jsx
width={size}
```

```jsx
height={size}
```

---

# ৯. Props-এর মাধ্যমে কী পাঠানো যায়?

Props-এর মাধ্যমে শুধু text নয়, যেকোনো JavaScript value পাঠানো যায়।

যেমন:

* String
* Number
* Boolean
* Object
* Array
* Function
* JSX

উদাহরণ:

## String

```jsx
<Profile name="Rahim" />
```

## Number

```jsx
<Avatar size={100} />
```

## Boolean

```jsx
<Item isPacked={true} />
```

## Object

```jsx
<Avatar
  person={{
    name: 'Katsuko Saruhashi',
    imageId: 'YfeOqp2'
  }}
/>
```

---

# ১০. `children` Prop

একটি Component-এর opening এবং closing tag-এর মাঝখানে থাকা content `children` prop হিসেবে পাওয়া যায়।

উদাহরণ:

```jsx
<Card>
  <Avatar />
</Card>
```

এখানে `<Avatar />` হলো `Card` Component-এর children।

`Card` Component:

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
{children}
```

লিখে `Card`-এর ভিতরের content দেখানো হয়েছে।

---

# ১১. Conditional Rendering

Component-কে অনেক সময় condition অনুযায়ী ভিন্ন content দেখাতে হয়।

এটিকে বলা হয় **Conditional Rendering**।

React-এ Conditional Rendering করার জন্য JavaScript-এর সাধারণ syntax ব্যবহার করা হয়।

যেমন:

* `if`
* `&&`
* Ternary operator `? :`

---

## `&&` দিয়ে Conditional Rendering

```jsx
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✅'}
    </li>
  );
}
```

এখানে:

```jsx
isPacked && '✅'
```

এর অর্থ:

* `isPacked` true হলে ✅ দেখাবে
* `isPacked` false হলে কিছু দেখাবে না

---

## সম্পূর্ণ উদাহরণ

```jsx
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✅'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>

      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />

        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />

        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}
```

Output হবে:

```text
Space suit ✅
Helmet with a golden leaf ✅
Photo of Tam
```

কারণ প্রথম দুইটি item-এর `isPacked` true।

শেষ item-এর `isPacked` false।

---

# ১২. Ternary Operator দিয়ে Conditional Rendering

Ternary operator-এর গঠন:

```jsx
condition ? trueResult : falseResult
```

উদাহরণ:

```jsx
function Item({ name, isPacked }) {
  return (
    <li>
      {isPacked ? `${name} ✅` : name}
    </li>
  );
}
```

এখানে:

* `isPacked` true হলে নামের সঙ্গে ✅ দেখাবে
* false হলে শুধু নাম দেখাবে

---

# ১৩. `if` দিয়ে Conditional Rendering

```jsx
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li>{name} ✅</li>;
  }

  return <li>{name}</li>;
}
```

এখানেও একই ফল পাওয়া যাবে।

---

# ১৪. List Render করা

## Rendering Lists

অনেক সময় একটি array-এর data থেকে একাধিক একই ধরনের Component দেখাতে হয়।

যেমন:

* Student list
* Product list
* User list
* Scientist list

React-এ list render করার জন্য JavaScript-এর `map()` method ব্যবহার করা হয়।

---

## উদাহরণ

```jsx
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
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

  return (
    <article>
      <h1>Scientists</h1>
      <ul>{listItems}</ul>
    </article>
  );
}
```

এখানে `people` একটি array।

```jsx
people.map(person => ...)
```

প্রতিটি `person` থেকে একটি `<li>` তৈরি করছে।

---

# ১৫. `map()` কী করে?

`map()` একটি array-এর প্রতিটি item-এর উপর কাজ করে এবং নতুন একটি array তৈরি করে।

ধরা যাক:

```jsx
const names = ['Rahim', 'Karim', 'Hasan'];
```

এখন:

```jsx
const listItems = names.map(name => <li>{name}</li>);
```

এটি তৈরি করবে:

```jsx
[
  <li>Rahim</li>,
  <li>Karim</li>,
  <li>Hasan</li>
]
```

তারপর এগুলো JSX-এর ভিতরে render করা যায়।

```jsx
<ul>{listItems}</ul>
```

---

# ১৬. List-এর `key`

List render করার সময় প্রতিটি item-কে একটি unique `key` দিতে হয়।

উদাহরণ:

```jsx
<li key={person.id}>
```

সাধারণত database-এর unique ID key হিসেবে ব্যবহার করা হয়।

```jsx
key={person.id}
```

## Key কেন প্রয়োজন?

Key ব্যবহার করে React বুঝতে পারে:

* কোন item নতুন
* কোন item মুছে গেছে
* কোন item পরিবর্তিত হয়েছে
* কোন item-এর অবস্থান বদলেছে

এতে React list সঠিকভাবে update করতে পারে।

---

# ১৭. `filter()` ব্যবহার

Array থেকে নির্দিষ্ট কিছু item নির্বাচন করার জন্য `filter()` ব্যবহার করা হয়।

তারপর `map()` ব্যবহার করে নির্বাচিত item-গুলো render করা যায়।

ধারণা:

```jsx
const chemists = people.filter(
  person => person.profession === 'chemist'
);
```

তারপর:

```jsx
const listItems = chemists.map(person => (
  <li key={person.id}>
    {person.name}
  </li>
));
```

অর্থাৎ:

* `filter()` item নির্বাচন করে
* `map()` item-কে JSX-এ রূপান্তর করে

---

# ১৮. Component Pure রাখা

## Keeping Components Pure

JavaScript-এ কিছু function-কে pure function বলা হয়।

একটি pure function-এর দুটি বৈশিষ্ট্য থাকে।

## ১. নিজের বাইরের কিছু পরিবর্তন করে না

Pure function আগে থেকে থাকা কোনো variable বা object পরিবর্তন করে না।

## ২. একই Input দিলে একই Output দেয়

একই input দিলে pure function সবসময় একই result দেয়।

React Component-কে pure function হিসেবে লেখার চেষ্টা করতে হয়।

---

# ১৯. Impure Component-এর উদাহরণ

```jsx
let guest = 0;

function Cup() {
  guest = guest + 1;

  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}
```

এখানে `Cup` Component pure নয়।

কারণ Component-টি বাইরের variable পরিবর্তন করছে:

```jsx
guest = guest + 1;
```

`guest` variable Component-এর বাইরে তৈরি করা হয়েছিল।

Component render হওয়ার সময় সেটি পরিবর্তন করা হচ্ছে।

এ কারণে output অপ্রত্যাশিত হতে পারে।

---

# ২০. Pure Component-এর উদাহরণ

```jsx
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
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

এখানে `Cup` Component props-এর মাধ্যমে `guest` গ্রহণ করছে।

প্রথম Component:

```jsx
<Cup guest={1} />
```

দ্বিতীয় Component:

```jsx
<Cup guest={2} />
```

তৃতীয় Component:

```jsx
<Cup guest={3} />
```

প্রতিটি Component তার input অনুযায়ী output দিচ্ছে।

Output:

```text
Tea cup for guest #1
Tea cup for guest #2
Tea cup for guest #3
```

এখানে কোনো বাইরের variable পরিবর্তন করা হচ্ছে না।

তাই Component-টি pure।

---

# ২১. Component Pure রাখার সুবিধা

Component pure রাখলে:

* একই input-এ একই output পাওয়া যায়
* Bug কম হয়
* Code সহজে বোঝা যায়
* Debug করা সহজ হয়
* Application বড় হলেও আচরণ predictable থাকে
* অপ্রত্যাশিত rendering কমে যায়

---

# ২২. UI-কে Tree হিসেবে বোঝা

## Your UI as a Tree

React Component-গুলোর সম্পর্ক একটি tree-এর মতো।

একটি Component অন্য Component render করতে পারে।

যে Component অন্য Component render করে, সেটি parent।

যে Component render হয়, সেটি child।

উদাহরণ:

```text
Root Component
├── Component A
│   └── Component B
└── Component C
    └── Component D
```

এখানে:

* `Root Component` সবচেয়ে উপরে
* `Component A` এবং `Component C` হলো Root-এর child
* `Component B` হলো Component A-এর child
* `Component D` হলো Component C-এর child

এই গঠনকে **Render Tree** বলা হয়।

---

# ২৩. Root Component

Tree-এর সবচেয়ে উপরের Component-কে Root Component বলা হয়।

সাধারণভাবে application-এর মূল Component হলো Root Component।

যেমন:

```jsx
<App />
```

---

# ২৪. Top-level Component

Tree-এর উপরের দিকে থাকা Component-গুলোকে top-level Component বলা হয়।

যেমন:

```text
App
├── Header
├── Main
└── Footer
```

এখানে `Header`, `Main` এবং `Footer` top-level Component হতে পারে।

---

# ২৫. Leaf Component

যে Component-এর কোনো child Component নেই, তাকে leaf Component বলা হয়।

উদাহরণ:

```text
App
└── Profile
    └── Avatar
```

যদি `Avatar` আর কোনো Component render না করে, তাহলে `Avatar` একটি leaf Component।

---

# ২৬. Render Tree বোঝার সুবিধা

Render Tree বুঝলে জানা যায়:

* কোন Component কোন Component-এর parent
* কোন Component কোন Component-এর child
* Data কোন দিক দিয়ে যাচ্ছে
* কোন Component বারবার render হচ্ছে
* Rendering performance কোথায় সমস্যা করছে

---

# ২৭. Module Dependency Tree

React application-এ শুধু Component-এর tree নয়, JavaScript module-এরও tree থাকে।

একটি file অন্য file import করলে তাদের মধ্যে dependency তৈরি হয়।

উদাহরণ:

```text
RootModule.js
├── ModuleA.js
├── ModuleB.js
└── ModuleC.js
    └── ModuleD.js
```

এখানে:

* `RootModule.js` তিনটি module import করছে
* `ModuleC.js`, `ModuleD.js` import করছে

এই সম্পর্ককে **Module Dependency Tree** বলা হয়।

---

# ২৮. Module Dependency Tree কেন গুরুত্বপূর্ণ?

Build tool এই dependency tree ব্যবহার করে প্রয়োজনীয় JavaScript file-গুলো একসঙ্গে bundle করে।

Browser পরে সেই bundle download করে এবং application render করে।

Bundle অনেক বড় হলে:

* Website load হতে বেশি সময় লাগে
* User experience খারাপ হয়
* Performance কমে যায়

তাই Module Dependency Tree বুঝলে বড় bundle-এর সমস্যা খুঁজে বের করা সহজ হয়।

---

# অধ্যায়ের সংক্ষিপ্ত সারাংশ

## React

React হলো UI তৈরি করার JavaScript library।

## Component

Component হলো UI-এর ছোট, স্বাধীন ও reusable অংশ।

```jsx
function Profile() {
  return <h1>Profile</h1>;
}
```

## JSX

JSX ব্যবহার করে JavaScript-এর ভিতরে HTML-এর মতো markup লেখা যায়।

```jsx
const heading = <h1>Hello</h1>;
```

## Curly Braces

JSX-এর ভিতরে JavaScript ব্যবহার করতে `{}` লেখা হয়।

```jsx
<h1>{person.name}</h1>
```

## Props

Parent Component থেকে Child Component-এ data পাঠাতে props ব্যবহার করা হয়।

```jsx
<Avatar size={100} />
```

## Conditional Rendering

Condition অনুযায়ী UI দেখাতে `if`, `&&` ও `? :` ব্যবহার করা যায়।

```jsx
{isPacked && '✅'}
```

## Rendering Lists

Array থেকে list তৈরি করতে `map()` ব্যবহার করা হয়।

```jsx
people.map(person => (
  <li key={person.id}>{person.name}</li>
))
```

## Key

List-এর প্রতিটি item-কে uniqueভাবে চেনার জন্য key ব্যবহার করা হয়।

```jsx
key={person.id}
```

## Pure Component

Component বাইরের variable পরিবর্তন করবে না এবং একই input-এ একই output দেবে।

## Render Tree

Component-গুলোর parent-child সম্পর্ককে Render Tree বলা হয়।

## Module Dependency Tree

একটি JavaScript file কোন কোন file import করছে, সেই সম্পর্ককে Module Dependency Tree বলা হয়।

---

# গুরুত্বপূর্ণ প্রশ্ন ও উত্তর

## প্রশ্ন ১: React কী?

React হলো User Interface তৈরি করার একটি JavaScript library।

## প্রশ্ন ২: Component কী?

Component হলো UI-এর একটি ছোট, স্বাধীন এবং reusable অংশ।

## প্রশ্ন ৩: React Component কী return করে?

React Component সাধারণত JSX return করে।

## প্রশ্ন ৪: JSX কী?

JSX হলো JavaScript-এর একটি syntax extension, যার মাধ্যমে JavaScript-এর ভিতরে HTML-এর মতো markup লেখা যায়।

## প্রশ্ন ৫: JSX-এ `class`-এর পরিবর্তে কী লিখতে হয়?

```jsx
className
```

## প্রশ্ন ৬: JSX-এ JavaScript ব্যবহার করতে কী ব্যবহার করা হয়?

Curly braces:

```jsx
{}
```

## প্রশ্ন ৭: Props কী?

Props হলো Parent Component থেকে Child Component-এ তথ্য পাঠানোর একটি পদ্ধতি।

## প্রশ্ন ৮: `children` prop কী?

Component-এর opening ও closing tag-এর মাঝখানে থাকা content `children` prop হিসেবে পাওয়া যায়।

## প্রশ্ন ৯: Conditional Rendering কী?

Condition অনুযায়ী ভিন্ন UI দেখানোকে Conditional Rendering বলা হয়।

## প্রশ্ন ১০: List render করার জন্য কোন method ব্যবহার করা হয়?

```jsx
map()
```

## প্রশ্ন ১১: `key` কেন ব্যবহার করা হয়?

List-এর প্রতিটি item-কে uniquely identify করার জন্য key ব্যবহার করা হয়।

## প্রশ্ন ১২: Pure Component কী?

যে Component বাইরের variable পরিবর্তন করে না এবং একই input-এ একই output দেয়, তাকে pure Component বলা হয়।

## প্রশ্ন ১৩: Render Tree কী?

Component-গুলোর parent-child relationship-এর tree structure-কে Render Tree বলা হয়।

## প্রশ্ন ১৪: Module Dependency Tree কী?

একটি JavaScript module কোন কোন module import করছে, সেই সম্পর্কের tree structure-কে Module Dependency Tree বলা হয়।
