# Writing Markup with JSX

## JSX দিয়ে Markup লেখা

JSX হলো JavaScript-এর একটি **syntax extension**। এটি ব্যবহার করে JavaScript file-এর ভিতরে HTML-এর মতো markup লেখা যায়।

React Component লেখার অন্য উপায় থাকলেও অধিকাংশ React developer JSX ব্যবহার করেন, কারণ JSX সংক্ষিপ্ত, সহজে পড়া যায় এবং বেশিরভাগ React codebase-এ এটি ব্যবহৃত হয়।

---

# এই অধ্যায়ে যা শিখব

এই অধ্যায়ে আমরা শিখব:

1. React কেন markup এবং rendering logic একই জায়গায় রাখে
2. JSX কীভাবে HTML থেকে আলাদা
3. JSX ব্যবহার করে কীভাবে তথ্য দেখানো হয়
4. HTML code কীভাবে JSX-এ পরিবর্তন করতে হয়
5. JSX-এর প্রধান নিয়মগুলো

---

# ১. JSX: JavaScript-এর ভিতরে Markup

## JSX: Putting Markup into JavaScript

Web application সাধারণত তিনটি প্রযুক্তির মাধ্যমে তৈরি হয়:

* HTML
* CSS
* JavaScript

অনেক বছর ধরে web developer-রা সাধারণত:

* HTML file-এ content রাখতেন
* CSS file-এ design রাখতেন
* JavaScript file-এ logic রাখতেন

অর্থাৎ content, design এবং logic আলাদা file-এ রাখা হতো।

ধারণাগতভাবে:

```text
HTML
→ Page-এর content এবং structure

CSS
→ Page-এর design

JavaScript
→ Page-এর logic এবং interaction
```

---

# Web আরও Interactive হওয়ার পর

Web application যত বেশি interactive হতে শুরু করে, JavaScript তত বেশি page-এর content নিয়ন্ত্রণ করতে শুরু করে।

যেমন:

* User login করলে ভিন্ন content দেখানো
* Button click করলে নতুন element দেখানো
* Form submit হলে message দেখানো
* Data অনুযায়ী list তৈরি করা
* Condition অনুযায়ী HTML পরিবর্তন করা

অর্থাৎ JavaScript শুধু interaction পরিচালনা না করে HTML কী হবে, সেটিও নির্ধারণ করতে শুরু করে।

এই কারণে React-এ **rendering logic** এবং **markup** একই জায়গায় রাখা হয়।

এই জায়গাটি হলো React Component।

---

# Rendering Logic কী?

কোন condition-এ কোন content দেখানো হবে, কোন data থেকে কোন UI তৈরি হবে—এসব সিদ্ধান্ত নেওয়ার logic-কে rendering logic বলা যায়।

উদাহরণ:

```jsx
function WelcomeMessage({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }

  return <h1>Please log in</h1>;
}
```

এখানে JavaScript logic সিদ্ধান্ত নিচ্ছে কোন markup দেখানো হবে।

---

# Markup এবং Logic একসঙ্গে রাখার সুবিধা

ধরা যাক, একটি button-এর markup ও button-এর click logic একই Component-এ রয়েছে।

```jsx
function Button() {
  function handleClick() {
    alert("Button clicked");
  }

  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}
```

এখানে:

* `handleClick` হলো logic
* `<button>` হলো markup
* দুটিই একই Component-এর মধ্যে রয়েছে

এতে button-এর design বা আচরণ পরিবর্তন করলে সম্পর্কিত code একই জায়গায় পাওয়া যায়।

অন্যদিকে sidebar-এর markup এবং button-এর markup যদি একে অপরের সঙ্গে সম্পর্কিত না হয়, তাহলে সেগুলো আলাদা Component-এ রাখা যায়।

```jsx
function Button() {
  return <button>Click Me</button>;
}

function Sidebar() {
  return <aside>Sidebar</aside>;
}
```

এর ফলে একটি Component পরিবর্তন করলে অন্য Component ভুল করে পরিবর্তিত হওয়ার ঝুঁকি কমে যায়।

---

# React Component এবং JSX

প্রত্যেক React Component একটি JavaScript function।

এই function-এর ভিতরে এমন markup থাকতে পারে, যা React browser-এ render করে।

উদাহরণ:

```jsx
function Profile() {
  return (
    <img
      src="profile.jpg"
      alt="Profile"
    />
  );
}
```

এখানে:

* `Profile` একটি JavaScript function
* function-টি JSX markup return করছে
* React সেই markup browser-এ render করবে

---

# JSX দেখতে HTML-এর মতো

উদাহরণ:

```jsx
<h1>Hello React</h1>
```

এটি দেখতে HTML-এর মতো হলেও JSX।

JSX এবং HTML-এর মধ্যে অনেক মিল আছে, তবে JSX-এর নিয়ম HTML-এর তুলনায় কিছুটা কঠোর।

JSX dynamic JavaScript information-ও দেখাতে পারে।

উদাহরণ:

```jsx
const name = "Salehin";

function App() {
  return <h1>Hello, {name}</h1>;
}
```

এখানে `{name}` JavaScript থেকে value নিয়ে JSX-এর ভিতরে দেখাচ্ছে।

---

# JSX এবং React কি একই জিনিস?

না।

JSX এবং React দুটি আলাদা বিষয়।

## JSX

JSX হলো JavaScript-এর syntax extension।

## React

React হলো User Interface তৈরির JavaScript library।

দুটিকে সাধারণত একসঙ্গে ব্যবহার করা হয়, কিন্তু JSX নিজে React নয় এবং React-ও JSX নয়।

---

# ২. HTML-কে JSX-এ পরিবর্তন করা

## Converting HTML to JSX

ধরা যাক, আমাদের কাছে নিচের valid HTML রয়েছে:

```html
<h1>Hedy Lamarr's Todos</h1>

<img
  src="https://react.dev/images/docs/scientists/yXOvdOSs.jpg"
  alt="Hedy Lamarr"
  class="photo"
>

<ul>
  <li>Invent new traffic lights
  <li>Rehearse a movie scene
  <li>Improve the spectrum technology
</ul>
```

সাধারণ HTML হিসেবে এটি browser-এ কাজ করতে পারে।

এখন আমরা এটিকে একটি React Component-এর ভিতরে রাখতে চাই।

```jsx
export default function TodoList() {
  return (
    // HTML এখানে বসবে
  );
}
```

HTML code সরাসরি copy-paste করলে নিচের মতো হবে:

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
      <li>Improve the spectrum technology
    </ul>
  );
}
```

এই code JSX হিসেবে কাজ করবে না।

কারণ JSX-এর কিছু অতিরিক্ত নিয়ম রয়েছে।

---

# JSX Error Message

JSX-এ ভুল থাকলে React সাধারণত screen বা browser console-এ error message দেখায়।

এই error message অনেক সময় বলে দেয়:

* কোন tag বন্ধ করা হয়নি
* একাধিক root element রয়েছে
* কোন attribute ভুল লেখা হয়েছে
* কোন syntax ঠিক করতে হবে

তাই JSX error হলে error message ভালোভাবে পড়া উচিত।

---

# ৩. JSX-এর প্রধান নিয়ম

## The Rules of JSX

JSX-এর প্রধান তিনটি নিয়ম হলো:

1. একটি Root Element return করতে হবে
2. সব Tag বন্ধ করতে হবে
3. অধিকাংশ Attribute camelCase-এ লিখতে হবে

---

# নিয়ম ১: একটি Root Element Return করতে হবে

## Return a Single Root Element

একটি Component থেকে একাধিক পাশাপাশি JSX element return করা যায় না।

ভুল:

```jsx
export default function TodoList() {
  return (
    <h1>Hedy Lamarr's Todos</h1>

    <img
      src="photo.jpg"
      alt="Hedy Lamarr"
    />

    <ul>
      <li>Invent new traffic lights</li>
    </ul>
  );
}
```

এখানে তিনটি element পাশাপাশি রয়েছে:

```jsx
<h1>
<img />
<ul>
```

এগুলোর একটি common parent নেই।

---

## সমাধান: Parent Tag দিয়ে Wrap করা

একাধিক element-কে একটি parent element-এর ভিতরে রাখতে হবে।

উদাহরণ:

```jsx
export default function TodoList() {
  return (
    <div>
      <h1>Hedy Lamarr's Todos</h1>

      <img
        src="photo.jpg"
        alt="Hedy Lamarr"
      />

      <ul>
        <li>Invent new traffic lights</li>
      </ul>
    </div>
  );
}
```

এখানে `<div>` সব element-এর root বা parent।

Structure:

```text
div
├── h1
├── img
└── ul
    └── li
```

Component এখন একটি root element return করছে।

---

# Fragment ব্যবহার

Markup-এর মধ্যে অতিরিক্ত `<div>` যোগ করতে না চাইলে Fragment ব্যবহার করা যায়।

```jsx
export default function TodoList() {
  return (
    <>
      <h1>Hedy Lamarr's Todos</h1>

      <img
        src="photo.jpg"
        alt="Hedy Lamarr"
      />

      <ul>
        <li>Invent new traffic lights</li>
      </ul>
    </>
  );
}
```

নিচের empty tag-কে Fragment বলা হয়:

```jsx
<>
</>
```

---

# Fragment কী?

Fragment একাধিক element-কে group বা wrap করতে দেয়, কিন্তু browser-এর final HTML tree-তে অতিরিক্ত element তৈরি করে না।

`<div>` ব্যবহার করলে browser-এ একটি বাস্তব `div` element তৈরি হয়।

```jsx
<div>
  <h1>Hello</h1>
  <p>Welcome</p>
</div>
```

Final HTML:

```html
<div>
  <h1>Hello</h1>
  <p>Welcome</p>
</div>
```

Fragment ব্যবহার করলে:

```jsx
<>
  <h1>Hello</h1>
  <p>Welcome</p>
</>
```

Final HTML-এ Fragment-এর জন্য কোনো অতিরিক্ত element থাকবে না:

```html
<h1>Hello</h1>
<p>Welcome</p>
```

---

# একাধিক JSX Tag Wrap করতে হয় কেন?

JSX দেখতে HTML-এর মতো হলেও ভিতরে এটি সাধারণ JavaScript object-এ রূপান্তরিত হয়।

ধারণাগতভাবে:

```jsx
<h1>Hello</h1>
```

একটি JavaScript object-এর মতো রূপান্তরিত হয়।

একটি JavaScript function সরাসরি পাশাপাশি দুটি object return করতে পারে না।

ভুল ধারণা:

```jsx
return objectOne, objectTwo;
```

তাই একাধিক JSX element return করতে হলে সেগুলোকে:

* একটি parent tag
* একটি Fragment
* অথবা একটি array

এর মতো কোনো একটি structure-এর মধ্যে রাখতে হয়।

---

# নিয়ম ২: সব Tag বন্ধ করতে হবে

## Close All the Tags

HTML-এ কিছু tag কখনো closing tag ছাড়াও কাজ করে।

উদাহরণ:

```html
<img src="photo.jpg">
```

কিন্তু JSX-এ প্রতিটি tag স্পষ্টভাবে বন্ধ করতে হয়।

---

## Self-closing Tag

যেসব tag-এর ভিতরে content থাকে না, সেগুলো self-closing করতে হয়।

HTML:

```html
<img src="photo.jpg">
```

JSX:

```jsx
<img src="photo.jpg" />
```

শেষে `/` ব্যবহার করতে হয়:

```jsx
/>
```

আরও উদাহরণ:

```jsx
<input />
<br />
<hr />
```

---

## Wrapping Tag

যেসব tag-এর ভিতরে content থাকে, সেগুলো opening এবং closing tag দিয়ে লিখতে হয়।

ভুল:

```jsx
<li>Invent new traffic lights
```

সঠিক:

```jsx
<li>Invent new traffic lights</li>
```

ভুল:

```jsx
<p>Hello
```

সঠিক:

```jsx
<p>Hello</p>
```

---

# সব Tag বন্ধ করার পর Code

```jsx
<>
  <img
    src="https://react.dev/images/docs/scientists/yXOvdOSs.jpg"
    alt="Hedy Lamarr"
    class="photo"
  />

  <ul>
    <li>Invent new traffic lights</li>
    <li>Rehearse a movie scene</li>
    <li>Improve the spectrum technology</li>
  </ul>
</>
```

এখানে:

* `<img />` self-closing
* প্রতিটি `<li>`-এর closing tag আছে
* `<ul>` সঠিকভাবে বন্ধ করা হয়েছে
* Fragment-ও বন্ধ করা হয়েছে

---

# নিয়ম ৩: অধিকাংশ Attribute camelCase-এ লিখতে হবে

## camelCase Most of the Things

JSX শেষ পর্যন্ত JavaScript-এ পরিবর্তিত হয়।

JSX-এর attribute-গুলো JavaScript object-এর key-তে পরিণত হয়।

JavaScript variable বা object key-এর নাম লেখার কিছু নিয়ম রয়েছে।

উদাহরণ:

* JavaScript identifier-এর মধ্যে সাধারণত dash ব্যবহার করা যায় না
* কিছু শব্দ JavaScript-এর reserved keyword
* `class` JavaScript-এর reserved keyword

এই কারণে JSX-এ অনেক HTML ও SVG attribute camelCase-এ লেখা হয়।

---

# camelCase কী?

একাধিক শব্দকে একসঙ্গে লেখার সময়:

* প্রথম শব্দ ছোট হাতের অক্ষরে শুরু হয়
* পরবর্তী শব্দের প্রথম অক্ষর বড় হাতের হয়
* মাঝখানে space বা dash থাকে না

উদাহরণ:

```text
backgroundColor
fontSize
strokeWidth
onClick
className
```

---

# `class` থেকে `className`

HTML-এ CSS class দেওয়ার জন্য লেখা হয়:

```html
<img class="photo">
```

JSX-এ লেখা হয়:

```jsx
<img className="photo" />
```

কারণ `class` JavaScript-এর reserved keyword।

React-এ corresponding DOM property অনুযায়ী `className` ব্যবহার করা হয়।

---

# `stroke-width` থেকে `strokeWidth`

SVG-এর HTML attribute:

```html
<path stroke-width="2">
```

JSX:

```jsx
<path strokeWidth="2" />
```

---

# আরও কিছু HTML ও JSX Attribute

| HTML               | JSX               |
| ------------------ | ----------------- |
| `class`            | `className`       |
| `onclick`          | `onClick`         |
| `tabindex`         | `tabIndex`        |
| `readonly`         | `readOnly`        |
| `maxlength`        | `maxLength`       |
| `stroke-width`     | `strokeWidth`     |
| `background-color` | `backgroundColor` |

---

# JSX Attribute-এর উদাহরণ

```jsx
<img
  src="https://react.dev/images/docs/scientists/yXOvdOSs.jpg"
  alt="Hedy Lamarr"
  className="photo"
/>
```

এখানে:

* `src` আগের মতোই রয়েছে
* `alt` আগের মতোই রয়েছে
* `class` পরিবর্তন করে `className` করা হয়েছে
* `<img>` self-closing করা হয়েছে

---

# Attribute ভুল হলে কী হবে?

কোনো JSX attribute ভুল লিখলে React সাধারণত browser console-এ warning বা correction দেখায়।

যেমন ভুল করে লিখলে:

```jsx
<div class="card">
```

React বলতে পারে:

```text
Did you mean className?
```

তাই browser console-এর message পড়া উচিত।

---

# ব্যতিক্রম: `aria-*` ও `data-*`

JSX-এ অধিকাংশ attribute camelCase হলেও দুটি গুরুত্বপূর্ণ ব্যতিক্রম রয়েছে:

```text
aria-*
data-*
```

এগুলো HTML-এর মতো dash সহ লেখা হয়।

উদাহরণ:

```jsx
<button aria-label="Close">
  X
</button>
```

```jsx
<div data-user-id="123">
  User
</div>
```

ভুল:

```jsx
ariaLabel
dataUserId
```

সঠিক:

```jsx
aria-label
data-user-id
```

এগুলো ঐতিহাসিক ও standard compatibility-এর কারণে dash সহ থাকে।

---

# ৪. HTML থেকে JSX-এ সম্পূর্ণ পরিবর্তন

শুরুর HTML ছিল:

```html
<h1>Hedy Lamarr's Todos</h1>

<img
  src="https://react.dev/images/docs/scientists/yXOvdOSs.jpg"
  alt="Hedy Lamarr"
  class="photo"
>

<ul>
  <li>Invent new traffic lights
  <li>Rehearse a movie scene
  <li>Improve the spectrum technology
</ul>
```

এখন ধাপে ধাপে পরিবর্তন করা হলো।

---

## পরিবর্তন ১: একটি Root Element যোগ করা

Fragment ব্যবহার:

```jsx
<>
  <h1>Hedy Lamarr's Todos</h1>

  <img
    src="https://react.dev/images/docs/scientists/yXOvdOSs.jpg"
    alt="Hedy Lamarr"
    class="photo"
  >

  <ul>
    <li>Invent new traffic lights
    <li>Rehearse a movie scene
    <li>Improve the spectrum technology
  </ul>
</>
```

---

## পরিবর্তন ২: সব Tag বন্ধ করা

```jsx
<>
  <h1>Hedy Lamarr's Todos</h1>

  <img
    src="https://react.dev/images/docs/scientists/yXOvdOSs.jpg"
    alt="Hedy Lamarr"
    class="photo"
  />

  <ul>
    <li>Invent new traffic lights</li>
    <li>Rehearse a movie scene</li>
    <li>Improve the spectrum technology</li>
  </ul>
</>
```

---

## পরিবর্তন ৩: `class`-কে `className` করা

```jsx
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
    <li>Improve the spectrum technology</li>
  </ul>
</>
```

---

# Final JSX Component

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
        <li>Improve the spectrum technology</li>
      </ul>
    </>
  );
}
```

এই Component এখন valid JSX।

---

# Final Code-এর বিশ্লেষণ

## Component Declaration

```jsx
export default function TodoList() {
```

এখানে `TodoList` নামে একটি Component তৈরি ও default export করা হয়েছে।

## Return

```jsx
return (
```

Component কী UI দেখাবে তা return করা হচ্ছে।

## Fragment

```jsx
<>
```

সব element-কে একটি root-এর মধ্যে group করছে।

## Heading

```jsx
<h1>Hedy Lamarr's Todos</h1>
```

Page-এর heading।

## Image

```jsx
<img
  src="..."
  alt="Hedy Lamarr"
  className="photo"
/>
```

Image tag:

* self-closing
* `className` ব্যবহার করেছে
* valid JSX

## List

```jsx
<ul>
  <li>...</li>
  <li>...</li>
  <li>...</li>
</ul>
```

প্রতিটি list item সঠিকভাবে বন্ধ করা হয়েছে।

---

# ৫. JSX Converter ব্যবহার

পুরোনো HTML বা SVG code হাতে JSX-এ পরিবর্তন করা অনেক সময় বিরক্তিকর হতে পারে।

কারণ একসঙ্গে অনেক পরিবর্তন করতে হয়:

* Tag বন্ধ করা
* Root element যোগ করা
* `class` পরিবর্তন করা
* SVG attribute camelCase করা
* Invalid nesting ঠিক করা

এজন্য HTML-to-JSX converter ব্যবহার করা যায়।

Converter সাধারণত:

```html
<div class="card">
  <img src="photo.jpg">
</div>
```

কে পরিবর্তন করে:

```jsx
<div className="card">
  <img src="photo.jpg" />
</div>
```

তবে converter ব্যবহার করলেও JSX-এর নিয়মগুলো জানা গুরুত্বপূর্ণ।

কারণ:

* Converter সবসময় perfect result নাও দিতে পারে
* Error বুঝতে JSX জানা প্রয়োজন
* নিজে JSX লিখতে হবে
* Debugging-এর সময় নিয়ম জানা দরকার

---

# ৬. সাধারণ JSX ভুল

## ভুল ১: একাধিক Root Element

```jsx
return (
  <h1>Hello</h1>
  <p>Welcome</p>
);
```

সঠিক:

```jsx
return (
  <>
    <h1>Hello</h1>
    <p>Welcome</p>
  </>
);
```

---

## ভুল ২: Self-closing Tag বন্ধ না করা

ভুল:

```jsx
<img src="photo.jpg">
```

সঠিক:

```jsx
<img src="photo.jpg" />
```

---

## ভুল ৩: Closing Tag বাদ দেওয়া

ভুল:

```jsx
<li>Apple
```

সঠিক:

```jsx
<li>Apple</li>
```

---

## ভুল ৪: `class` ব্যবহার

ভুল:

```jsx
<div class="card">
```

সঠিক:

```jsx
<div className="card">
```

---

## ভুল ৫: Attribute ছোট হাতের লেখা

ভুল:

```jsx
<button onclick={handleClick}>
```

সঠিক:

```jsx
<button onClick={handleClick}>
```

---

## ভুল ৬: SVG Attribute-এ Dash ব্যবহার

ভুল:

```jsx
<path stroke-width="2" />
```

সঠিক:

```jsx
<path strokeWidth="2" />
```

---

# ৭. Practice Challenge

## HTML-কে JSX-এ পরিবর্তন করা

নিচের code valid JSX নয়:

```jsx
export default function Bio() {
  return (
    <div class="intro">
      <h1>Welcome to my website!</h1>
    </div>

    <p class="summary">
      You can find my thoughts here.
      <br><br>
      <b>And <i>pictures</b></i> of scientists!
    </p>
  );
}
```

এখানে কয়েকটি সমস্যা রয়েছে।

---

# সমস্যাগুলো

## সমস্যা ১: একাধিক Root Element

পাশাপাশি রয়েছে:

```jsx
<div>
<p>
```

এগুলোকে একটি root বা Fragment দিয়ে wrap করতে হবে।

## সমস্যা ২: `class` ব্যবহার করা হয়েছে

```jsx
class="intro"
class="summary"
```

এগুলো হবে:

```jsx
className="intro"
className="summary"
```

## সমস্যা ৩: `<br>` বন্ধ করা হয়নি

```jsx
<br>
```

হবে:

```jsx
<br />
```

## সমস্যা ৪: Tag ভুলভাবে Nest করা হয়েছে

ভুল:

```jsx
<b>And <i>pictures</b></i>
```

এখানে `<i>` আগে খোলা হলেও `</b>` আগে বন্ধ করা হয়েছে।

সঠিক nesting হবে:

```jsx
<b>
  And <i>pictures</i>
</b>
```

যে tag পরে খোলা হয়, সেটি আগে বন্ধ করতে হয়।

---

# Challenge-এর সঠিক সমাধান

```jsx
export default function Bio() {
  return (
    <>
      <div className="intro">
        <h1>Welcome to my website!</h1>
      </div>

      <p className="summary">
        You can find my thoughts here.
        <br />
        <br />
        <b>
          And <i>pictures</i> of scientists!
        </b>
      </p>
    </>
  );
}
```

---

# সঠিক Nesting বোঝা

সঠিক:

```jsx
<b>
  Bold text
  <i>Bold and italic text</i>
</b>
```

Structure:

```text
b
└── i
```

তাই `<i>` আগে বন্ধ হবে, তারপর `<b>`।

```jsx
<b>
  <i>Text</i>
</b>
```

ভুল:

```jsx
<b>
  <i>Text</b>
</i>
```

---

# অধ্যায়ের সংক্ষিপ্ত সারাংশ

## React Component Markup ও Logic একসঙ্গে রাখে

Rendering logic এবং markup সম্পর্কিত হওয়ায় React Component-এর ভিতরে এগুলো একসঙ্গে রাখা হয়।

---

## JSX হলো JavaScript Syntax Extension

JSX ব্যবহার করে JavaScript-এর ভিতরে HTML-এর মতো markup লেখা যায়।

```jsx
function App() {
  return <h1>Hello</h1>;
}
```

---

## JSX দেখতে HTML-এর মতো, কিন্তু একই নয়

JSX-এর কিছু অতিরিক্ত নিয়ম রয়েছে।

---

## একটি Root Element প্রয়োজন

```jsx
return (
  <>
    <h1>Hello</h1>
    <p>Welcome</p>
  </>
);
```

---

## সব Tag বন্ধ করতে হবে

```jsx
<img />
```

```jsx
<li>Item</li>
```

---

## অধিকাংশ Attribute camelCase

```jsx
className
onClick
strokeWidth
tabIndex
```

---

## `aria-*` এবং `data-*` Dash সহ থাকে

```jsx
aria-label
data-user-id
```

---

## Fragment অতিরিক্ত HTML Element তৈরি করে না

```jsx
<>
  <h1>Hello</h1>
  <p>Welcome</p>
</>
```

---

# Default Revision Code

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
        <li>Improve the spectrum technology</li>
      </ul>
    </>
  );
}
```

---

# গুরুত্বপূর্ণ প্রশ্ন ও উত্তর

## প্রশ্ন ১: JSX কী?

JSX হলো JavaScript-এর একটি syntax extension, যার মাধ্যমে JavaScript file-এর ভিতরে HTML-এর মতো markup লেখা যায়।

## প্রশ্ন ২: JSX এবং React কি একই?

না। JSX একটি syntax extension এবং React একটি JavaScript library।

## প্রশ্ন ৩: React কেন Logic এবং Markup একসঙ্গে রাখে?

কারণ rendering logic এবং markup একে অপরের সঙ্গে সম্পর্কিত। একই Component-এ রাখলে এগুলো synchronised থাকে এবং পরিবর্তন করা সহজ হয়।

## প্রশ্ন ৪: JSX-এর প্রধান তিনটি নিয়ম কী?

1. একটি root element return করতে হবে
2. সব tag বন্ধ করতে হবে
3. অধিকাংশ attribute camelCase-এ লিখতে হবে

## প্রশ্ন ৫: Fragment কী?

Fragment হলো এমন একটি wrapper, যা একাধিক JSX element group করে কিন্তু browser-এর HTML tree-তে অতিরিক্ত element তৈরি করে না।

```jsx
<>
</>
```

## প্রশ্ন ৬: JSX-এ `class`-এর পরিবর্তে কী লিখতে হয়?

```jsx
className
```

## প্রশ্ন ৭: JSX-এ `<img>` কীভাবে লিখতে হয়?

```jsx
<img src="photo.jpg" alt="Profile" />
```

## প্রশ্ন ৮: JSX-এ একাধিক element পাশাপাশি return করা যায় কি?

সরাসরি যায় না। একটি parent element বা Fragment দিয়ে wrap করতে হয়।

## প্রশ্ন ৯: অধিকাংশ JSX attribute camelCase হয় কেন?

কারণ JSX JavaScript-এ রূপান্তরিত হয় এবং attribute-গুলো JavaScript object-এর key হয়।

## প্রশ্ন ১০: কোন attribute-গুলো camelCase হয় না?

`aria-*` এবং `data-*` attribute HTML-এর মতো dash সহ লেখা হয়।

```jsx
aria-label
data-user-id
```

## প্রশ্ন ১১: HTML-to-JSX converter কেন ব্যবহার করা হয়?

পুরোনো HTML বা SVG code দ্রুত valid JSX-এ পরিবর্তন করার জন্য।

## প্রশ্ন ১২: JSX Error হলে কী করা উচিত?

React-এর screen error এবং browser console message পড়তে হবে। এগুলো সাধারণত সমস্যার অবস্থান ও সম্ভাব্য সমাধান দেখায়।
