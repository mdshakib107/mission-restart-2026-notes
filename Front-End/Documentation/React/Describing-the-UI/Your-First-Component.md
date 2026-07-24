# Your First Component

## আপনার প্রথম React Component

React-এর সবচেয়ে গুরুত্বপূর্ণ ধারণাগুলোর একটি হলো **Component**।

Component হলো React application-এর User Interface বা UI তৈরির মূল ভিত্তি। React শেখা শুরু করার জন্য Component একটি উপযুক্ত বিষয়।

---

# এই অধ্যায়ে যা শিখব

এই অধ্যায়ে আমরা শিখব:

1. Component কী
2. React application-এ Component কী কাজ করে
3. প্রথম React Component কীভাবে লিখতে হয়

---

# ১. Component: UI তৈরির Building Block

## সাধারণ HTML দিয়ে UI তৈরি

Web page তৈরি করার সময় HTML-এর built-in tag ব্যবহার করা হয়।

যেমন:

```html
<article>
  <h1>My First Component</h1>

  <ol>
    <li>Components: UI Building Blocks</li>
    <li>Defining a Component</li>
    <li>Using a Component</li>
  </ol>
</article>
```

এই HTML markup-এর মধ্যে:

* `<article>` সম্পূর্ণ article-কে প্রকাশ করছে
* `<h1>` article-এর heading
* `<ol>` একটি ordered list
* `<li>` list-এর প্রতিটি item

HTML markup, CSS এবং JavaScript একসঙ্গে ব্যবহার করে Web-এর বিভিন্ন UI তৈরি করা হয়।

যেমন:

* Sidebar
* Avatar
* Modal
* Dropdown
* Navigation
* Button
* সম্পূর্ণ Page

---

# React Component কীভাবে কাজ করে?

React আমাদের HTML markup, CSS এবং JavaScript-কে একত্র করে নিজস্ব **custom component** তৈরি করতে দেয়।

Component হলো application-এর reusable UI element।

উদাহরণ হিসেবে, একটি Table of Contents-এর HTML code-কে আমরা নিচের Component-এ পরিণত করতে পারি:

```jsx
<TableOfContents />
```

তারপর একই Component প্রয়োজন অনুযায়ী একাধিক page-এ ব্যবহার করা যায়।

Component-এর ভিতরে শেষ পর্যন্ত সাধারণ HTML tag-ই ব্যবহার করা হয়।

যেমন:

```jsx
function TableOfContents() {
  return (
    <article>
      <h1>Table of Contents</h1>

      <ol>
        <li>Components</li>
        <li>Defining a Component</li>
        <li>Using a Component</li>
      </ol>
    </article>
  );
}
```

এখানে `TableOfContents` একটি custom React Component।

কিন্তু এর ভিতরে ব্যবহৃত হয়েছে সাধারণ HTML tag:

```jsx
<article>
<h1>
<ol>
<li>
```

React Component custom হলেও browser শেষ পর্যন্ত HTML element-ই render করে।

---

# Component দিয়ে সম্পূর্ণ Page তৈরি

সাধারণ HTML tag-এর মতো React Component-গুলোকে:

* সাজানো যায়
* একটির ভিতরে আরেকটি রাখা যায়
* বারবার ব্যবহার করা যায়
* একত্র করে সম্পূর্ণ page তৈরি করা যায়

React documentation-এর একটি page ধারণাগতভাবে নিচের মতো Component দিয়ে তৈরি হতে পারে:

```jsx
<PageLayout>
  <NavigationHeader>
    <SearchBar />
    <Link to="/docs">Docs</Link>
  </NavigationHeader>

  <Sidebar />

  <PageContent>
    <TableOfContents />
    <DocumentationText />
  </PageContent>
</PageLayout>
```

এখানে:

* `PageLayout` সম্পূর্ণ page-এর layout
* `NavigationHeader` উপরের navigation অংশ
* `SearchBar` search করার অংশ
* `Sidebar` পাশের menu
* `PageContent` মূল content area
* `TableOfContents` বিষয়সূচি
* `DocumentationText` documentation-এর মূল লেখা

একটি বড় UI এভাবে ছোট ছোট Component দিয়ে তৈরি করা যায়।

---

# Component ব্যবহারের সুবিধা

Project বড় হওয়ার সঙ্গে সঙ্গে দেখা যায়, একই ধরনের UI একাধিক জায়গায় প্রয়োজন হচ্ছে।

Component ব্যবহার করলে একবার লেখা UI বারবার ব্যবহার করা যায়।

উদাহরণ:

```jsx
<TableOfContents />
```

এই Component একবার তৈরি করার পর প্রয়োজনমতো বিভিন্ন page-এ ব্যবহার করা যাবে।

ফলে:

* Development দ্রুত হয়
* একই code বারবার লিখতে হয় না
* UI consistent থাকে
* Code maintain করা সহজ হয়
* Application ছোট ছোট অংশে ভাগ করা যায়

React open-source community-তেও হাজার হাজার তৈরি Component পাওয়া যায়, যেগুলো ব্যবহার করে project দ্রুত শুরু করা সম্ভব।

---

# ২. Component তৈরি করা

## Defining a Component

আগে সাধারণ web page তৈরির সময় developer-রা প্রথমে HTML দিয়ে content তৈরি করতেন।

তারপর প্রয়োজনীয় interaction যোগ করার জন্য JavaScript ব্যবহার করতেন।

যেমন:

```html
<button>Click Me</button>
```

তারপর JavaScript দিয়ে button-এর click event পরিচালনা করা হতো।

React-এ UI এবং interactivity আরও কাছাকাছি রাখা হয়।

একটি React Component মূলত একটি সাধারণ JavaScript function, যার মধ্যে markup যোগ করা যায়।

উদাহরণ:

```jsx
export default function Profile() {
  return (
    <img
      src="https://react.dev/images/docs/scientists/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  );
}
```

এটি একটি সম্পূর্ণ React Component।

Component-টির নাম:

```jsx
Profile
```

এটি একটি image return করছে।

---

# Component তৈরির তিনটি ধাপ

একটি Component তৈরি করতে সাধারণত তিনটি ধাপ অনুসরণ করা হয়:

1. Component export করা
2. JavaScript function define করা
3. Markup যোগ করা

---

# ধাপ ১: Component Export করা

## Export the Component

উদাহরণের শুরুতে লেখা হয়েছে:

```jsx
export default
```

সম্পূর্ণ অংশ:

```jsx
export default function Profile() {
```

`export default` হলো JavaScript-এর standard syntax।

এটি শুধু React-এর syntax নয়।

এটি ব্যবহার করে কোনো file-এর প্রধান function বা value-কে চিহ্নিত করা হয়, যাতে পরে অন্য file থেকে সেটিকে import করা যায়।

উদাহরণ:

```jsx
export default function Profile() {
  return <h1>Profile</h1>;
}
```

অন্য file-এ এটি import করা যাবে:

```jsx
import Profile from "./Profile.js";
```

## সহজভাবে

```jsx
export default
```

এর অর্থ:

> এই file-এর প্রধান export হলো এই Component।

---

# ধাপ ২: Function তৈরি করা

## Define the Function

নিচের code দিয়ে একটি JavaScript function তৈরি করা হয়েছে:

```jsx
function Profile() {
}
```

এখানে:

* `function` JavaScript function তৈরি করার keyword
* `Profile` function-এর নাম
* `{}` function-এর body

সম্পূর্ণভাবে:

```jsx
function Profile() {
  return <h1>Profile</h1>;
}
```

React Component একটি সাধারণ JavaScript function।

তবে React Component-এর নাম লেখার ক্ষেত্রে একটি গুরুত্বপূর্ণ নিয়ম রয়েছে।

---

# গুরুত্বপূর্ণ নিয়ম: Component-এর নাম Capital Letter দিয়ে শুরু করতে হবে

React Component-এর নাম সবসময় বড় হাতের অক্ষর দিয়ে শুরু করতে হবে।

সঠিক:

```jsx
function Profile() {
  return <h1>Profile</h1>;
}
```

সঠিক:

```jsx
function UserCard() {
  return <h1>User Card</h1>;
}
```

ভুল:

```jsx
function profile() {
  return <h1>Profile</h1>;
}
```

ভুল:

```jsx
function userCard() {
  return <h1>User Card</h1>;
}
```

কারণ lowercase নাম দেখলে React সেটিকে custom Component হিসেবে বুঝবে না।

React lowercase tag-কে সাধারণ HTML tag হিসেবে দেখে।

যেমন:

```jsx
<section>
<div>
<img>
```

অন্যদিকে Capital letter দিয়ে শুরু হলে React সেটিকে custom Component হিসেবে দেখে।

যেমন:

```jsx
<Profile />
<UserCard />
<SearchBar />
```

---

# ধাপ ৩: Markup যোগ করা

## Add Markup

Component-এর ভিতরে `return` ব্যবহার করে markup ফেরত দেওয়া হয়।

উদাহরণ:

```jsx
function Profile() {
  return (
    <img
      src="https://react.dev/images/docs/scientists/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  );
}
```

এখানে Component একটি `<img />` tag return করছে।

Image tag-এ দুটি attribute রয়েছে:

```jsx
src
```

এবং:

```jsx
alt
```

দেখতে HTML-এর মতো হলেও এটি সরাসরি HTML নয়।

এই syntax-কে বলা হয় **JSX**।

JSX ব্যবহার করে JavaScript-এর ভিতরে HTML-এর মতো markup লেখা যায়।

---

# JSX কী?

JSX হলো JavaScript-এর একটি syntax extension।

এটি JavaScript file-এর ভিতরে markup লেখার সুযোগ দেয়।

উদাহরণ:

```jsx
const heading = <h1>Hello React</h1>;
```

React Component-এর মধ্যে:

```jsx
function Welcome() {
  return <h1>Hello React</h1>;
}
```

এখানে:

```jsx
<h1>Hello React</h1>
```

অংশটি JSX।

---

# এক লাইনে Return লেখা

Markup ছোট হলে একই লাইনে return করা যায়।

```jsx
return <img src="photo.jpg" alt="Profile" />;
```

সম্পূর্ণ Component:

```jsx
function Profile() {
  return <img src="photo.jpg" alt="Profile" />;
}
```

---

# একাধিক লাইনে Return লেখা

Markup একাধিক লাইনে লিখলে parentheses ব্যবহার করতে হয়।

```jsx
return (
  <div>
    <img
      src="photo.jpg"
      alt="Profile"
    />
  </div>
);
```

সম্পূর্ণ Component:

```jsx
function Profile() {
  return (
    <div>
      <img
        src="photo.jpg"
        alt="Profile"
      />
    </div>
  );
}
```

---

# Return-এর পরে Parentheses কেন প্রয়োজন?

JavaScript-এ `return` keyword-এর পর নতুন line শুরু করলে JavaScript অনেক সময় ধরে নেয় যে return statement সেখানেই শেষ।

ভুল:

```jsx
function Profile() {
  return
    <img
      src="photo.jpg"
      alt="Profile"
    />;
}
```

এখানে `return`-এর পরের line-এর code ignore হতে পারে।

এটি প্রায় নিচের মতো আচরণ করবে:

```jsx
function Profile() {
  return;

  <img
    src="photo.jpg"
    alt="Profile"
  />;
}
```

ফলে Component কোনো markup return করবে না।

সঠিক:

```jsx
function Profile() {
  return (
    <img
      src="photo.jpg"
      alt="Profile"
    />
  );
}
```

## মনে রাখার সহজ নিয়ম

Markup যদি `return`-এর একই line-এ থাকে:

```jsx
return <h1>Hello</h1>;
```

তাহলে parentheses আবশ্যক নয়।

Markup যদি পরের line থেকে শুরু হয়:

```jsx
return (
  <h1>Hello</h1>
);
```

তাহলে parentheses ব্যবহার করতে হবে।

---

# প্রথম Component-এর সম্পূর্ণ বিশ্লেষণ

```jsx
export default function Profile() {
  return (
    <img
      src="https://react.dev/images/docs/scientists/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  );
}
```

লাইন অনুযায়ী ব্যাখ্যা:

## `export default`

```jsx
export default
```

Component-টিকে file-এর প্রধান export হিসেবে চিহ্নিত করছে।

## `function Profile()`

```jsx
function Profile()
```

`Profile` নামে একটি JavaScript function তৈরি করছে।

## `return`

```jsx
return
```

Component screen-এ কী দেখাবে, সেটি return করছে।

## `<img />`

```jsx
<img />
```

একটি image render করছে।

## `src`

```jsx
src="..."
```

Image কোথা থেকে load হবে তা নির্ধারণ করছে।

## `alt`

```jsx
alt="Katherine Johnson"
```

Image-এর বিকল্প text নির্ধারণ করছে।

---

# ৩. Component ব্যবহার করা

## Using a Component

একটি Component তৈরি করার পর সেটিকে অন্য Component-এর ভিতরে ব্যবহার করা যায়।

প্রথমে একটি `Profile` Component তৈরি করা হলো:

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

এখন এই Component-কে `Gallery` Component-এর ভিতরে ব্যবহার করা হলো:

```jsx
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

সম্পূর্ণ code:

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

---

# Component কীভাবে ব্যবহার করা হয়?

একটি Component-কে HTML tag-এর মতো লেখা হয়।

```jsx
<Profile />
```

এই syntax React-কে বলে:

> এখানে `Profile` Component render করো।

একই Component একাধিকবার ব্যবহার করা যায়।

```jsx
<Profile />
<Profile />
<Profile />
```

এখানে একই `Profile` Component তিনবার render হবে।

---

# Self-closing Component

যদি Component-এর opening এবং closing tag-এর মধ্যে কোনো content না থাকে, তাহলে self-closing syntax ব্যবহার করা হয়।

```jsx
<Profile />
```

এটি নিচের মতো আলাদা opening এবং closing tag লেখার প্রয়োজন দূর করে:

```jsx
<Profile></Profile>
```

দুইটিই সম্ভব হলেও empty Component-এর ক্ষেত্রে সাধারণত লেখা হয়:

```jsx
<Profile />
```

---

# Browser কী দেখে?

## What the Browser Sees

React code-এ custom Component এবং সাধারণ HTML tag-এর নামের মধ্যে পার্থক্য রয়েছে।

নিচের দুটি tag লক্ষ্য করুন:

```jsx
<section>
```

এবং:

```jsx
<Profile />
```

## `<section>` lowercase

```jsx
<section>
```

এটি ছোট হাতের অক্ষর দিয়ে শুরু হয়েছে।

তাই React বুঝতে পারে এটি একটি সাধারণ HTML tag।

## `<Profile />` Capital Letter

```jsx
<Profile />
```

এটি বড় হাতের `P` দিয়ে শুরু হয়েছে।

তাই React বুঝতে পারে এটি `Profile` নামে তৈরি করা একটি custom Component।

---

# React Component শেষে HTML-এ পরিণত হয়

React code:

```jsx
function Profile() {
  return (
    <img
      src="photo.jpg"
      alt="Katherine Johnson"
    />
  );
}

function Gallery() {
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

React যখন Component-গুলো render করবে, browser শেষ পর্যন্ত custom Component দেখবে না।

Browser প্রায় নিচের HTML structure দেখবে:

```html
<section>
  <h1>Amazing scientists</h1>

  <img
    src="photo.jpg"
    alt="Katherine Johnson"
  />

  <img
    src="photo.jpg"
    alt="Katherine Johnson"
  />

  <img
    src="photo.jpg"
    alt="Katherine Johnson"
  />
</section>
```

কারণ প্রতিটি:

```jsx
<Profile />
```

শেষ পর্যন্ত একটি:

```jsx
<img />
```

element return করছে।

---

# ৪. Component Nesting এবং Organizing

## Nesting and Organizing Components

React Component সাধারণ JavaScript function।

তাই একই file-এর ভিতরে একাধিক Component রাখা যায়।

উদাহরণ:

```jsx
function Profile() {
  return <img src="photo.jpg" alt="Profile" />;
}

function Gallery() {
  return (
    <section>
      <Profile />
    </section>
  );
}

export default Gallery;
```

ছোট অথবা একে অপরের সঙ্গে সরাসরি সম্পর্কিত Component একই file-এ রাখা সুবিধাজনক হতে পারে।

কিন্তু file বড় হয়ে গেলে Component-কে আলাদা file-এ সরিয়ে নেওয়া যায়।

যেমন:

```text
Profile.js
Gallery.js
```

---

# Parent এবং Child Component

যে Component অন্য Component render করে, তাকে **Parent Component** বলা হয়।

যে Component parent-এর ভিতরে render হয়, তাকে **Child Component** বলা হয়।

উদাহরণ:

```jsx
function Profile() {
  return <img src="photo.jpg" alt="Profile" />;
}

function Gallery() {
  return (
    <section>
      <Profile />
    </section>
  );
}
```

এখানে:

* `Gallery` হলো Parent Component
* `Profile` হলো Child Component

কারণ `Gallery` Component-এর ভিতরে `Profile` render হচ্ছে।

---

# একই Child Component একাধিকবার ব্যবহার

```jsx
function Gallery() {
  return (
    <section>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

এখানে `Gallery` একই `Profile` Child Component তিনবার render করছে।

React-এর গুরুত্বপূর্ণ সুবিধা হলো:

* Component একবার define করা যায়
* তারপর যেকোনো জায়গায় ব্যবহার করা যায়
* প্রয়োজন অনুযায়ী যতবার ইচ্ছা render করা যায়

---

# গুরুত্বপূর্ণ সতর্কতা: Component-এর ভিতরে Component Define করা যাবে না

একটি Component অন্য Component render করতে পারে।

কিন্তু একটি Component-এর function definition অন্য Component-এর function-এর ভিতরে লেখা উচিত নয়।

ভুল:

```jsx
export default function Gallery() {
  function Profile() {
    return <img src="photo.jpg" alt="Profile" />;
  }

  return (
    <section>
      <Profile />
    </section>
  );
}
```

এখানে `Profile` Component-কে `Gallery` Component-এর ভিতরে define করা হয়েছে।

এই পদ্ধতি এড়িয়ে চলতে হবে।

এটি application ধীর করতে পারে এবং বিভিন্ন bug তৈরি করতে পারে।

---

# Component Top Level-এ Define করতে হবে

সঠিক:

```jsx
function Profile() {
  return <img src="photo.jpg" alt="Profile" />;
}

export default function Gallery() {
  return (
    <section>
      <Profile />
    </section>
  );
}
```

এখানে:

* `Profile` top level-এ define করা হয়েছে
* `Gallery` top level-এ define করা হয়েছে
* `Gallery` শুধু `Profile`-কে render করছে

## Top level বলতে কী বোঝায়?

Top level বলতে বোঝায়, Component-টি অন্য কোনো function বা Component-এর ভিতরে define করা হয়নি।

সঠিক:

```jsx
function ComponentOne() {
}

function ComponentTwo() {
}
```

ভুল:

```jsx
function ComponentOne() {
  function ComponentTwo() {
  }
}
```

---

# Child Component-এর Data প্রয়োজন হলে কী করতে হবে?

Child Component-এর parent থেকে data প্রয়োজন হলে Component definition nested করা যাবে না।

তার পরিবর্তে **props** ব্যবহার করে data পাঠাতে হবে।

ধারণাগত উদাহরণ:

```jsx
function Profile({ name }) {
  return <h2>{name}</h2>;
}

export default function Gallery() {
  return (
    <section>
      <Profile name="Katherine Johnson" />
    </section>
  );
}
```

এখানে:

```jsx
name="Katherine Johnson"
```

props-এর মাধ্যমে parent থেকে child-এ পাঠানো হয়েছে।

---

# ৫. Components All the Way Down

একটি React application সাধারণত একটি **Root Component** থেকে শুরু হয়।

Root Component হলো application-এর সবচেয়ে উপরের Component।

উদাহরণ:

```jsx
export default function App() {
  return (
    <main>
      <h1>My Application</h1>
    </main>
  );
}
```

এখানে `App` Root Component হতে পারে।

নতুন React project তৈরি করলে Root Component অনেক সময় project setup বা framework স্বয়ংক্রিয়ভাবে তৈরি করে দেয়।

---

# Component শুধু ছোট UI-এর জন্য নয়

Component শুধু reusable button বা ছোট UI element-এর জন্য ব্যবহার করা হয় না।

Component ব্যবহার করা যায়:

* Button
* Avatar
* Card
* List
* Sidebar
* Header
* Footer
* Form
* Section
* সম্পূর্ণ Page

উদাহরণ:

```jsx
function App() {
  return (
    <Page>
      <Header />
      <Sidebar />
      <MainContent />
      <Footer />
    </Page>
  );
}
```

React application-এ UI-এর প্রায় প্রতিটি অংশ Component হিসেবে তৈরি করা যায়।

কোনো Component একবার ব্যবহার করা হলেও UI code organize করার জন্য Component তৈরি করা উপকারী হতে পারে।

---

# Component Tree-এর ধারণা

ধরা যাক application-এর code:

```jsx
function App() {
  return (
    <Page>
      <Header />
      <MainContent>
        <Profile />
      </MainContent>
      <Footer />
    </Page>
  );
}
```

এটির Component tree হতে পারে:

```text
App
└── Page
    ├── Header
    ├── MainContent
    │   └── Profile
    └── Footer
```

এখানে:

* `App` Root Component
* `Page` হলো `App`-এর child
* `Header`, `MainContent` এবং `Footer` হলো `Page`-এর child
* `Profile` হলো `MainContent`-এর child

---

# React Framework এবং Component

React-based framework Component-এর ব্যবহারকে আরও বিস্তৃত করে।

Framework অনেক সময় React Component থেকে স্বয়ংক্রিয়ভাবে HTML তৈরি করে।

এর ফলে JavaScript পুরোপুরি load হওয়ার আগেও user কিছু content দেখতে পারে।

---

# সম্পূর্ণ Website-এ React ব্যবহার বাধ্যতামূলক নয়

কোনো website-এর সম্পূর্ণ অংশ React দিয়ে তৈরি করতে হবে—এমন নয়।

অনেক website তাদের আগে থেকে থাকা HTML page-এর নির্দিষ্ট অংশে interactivity যোগ করার জন্য React ব্যবহার করে।

যেমন:

```text
Existing HTML Page
├── সাধারণ HTML Header
├── React Search Component
├── সাধারণ HTML Content
└── React Comment Component
```

এক্ষেত্রে একটি page-এ একাধিক Root Component থাকতে পারে।

অর্থাৎ প্রয়োজন অনুযায়ী:

* সম্পূর্ণ application React দিয়ে তৈরি করা যায়
* শুধু একটি ছোট অংশে React ব্যবহার করা যায়
* একাধিক আলাদা জায়গায় React Component বসানো যায়

React প্রয়োজন অনুযায়ী বেশি অথবা কম ব্যবহার করা যায়।

---

# অধ্যায়ের মূল সারাংশ

## ১. React Component তৈরি করতে দেয়

React ব্যবহার করে reusable UI element তৈরি করা যায়।

```jsx
function Button() {
  return <button>Click Me</button>;
}
```

---

## ২. React application-এর প্রতিটি UI অংশ Component হতে পারে

যেমন:

```jsx
<Header />
<Sidebar />
<ProductCard />
<Footer />
```

---

## ৩. React Component সাধারণ JavaScript Function

```jsx
function Profile() {
  return <h1>Profile</h1>;
}
```

---

## ৪. Component-এর নাম Capital Letter দিয়ে শুরু হয়

সঠিক:

```jsx
function Profile() {
}
```

ভুল:

```jsx
function profile() {
}
```

---

## ৫. Component JSX Return করে

```jsx
function Profile() {
  return <h1>Profile</h1>;
}
```

---

## ৬. Component অন্য Component Render করতে পারে

```jsx
function Gallery() {
  return (
    <section>
      <Profile />
    </section>
  );
}
```

---

## ৭. একই Component একাধিকবার ব্যবহার করা যায়

```jsx
<Profile />
<Profile />
<Profile />
```

---

## ৮. Component অন্য Component-এর ভিতরে Define করা উচিত নয়

ভুল:

```jsx
function Gallery() {
  function Profile() {
    return <h1>Profile</h1>;
  }
}
```

সঠিক:

```jsx
function Profile() {
  return <h1>Profile</h1>;
}

function Gallery() {
  return <Profile />;
}
```

---

# গুরুত্বপূর্ণ সংজ্ঞা

## Component

UI-এর একটি স্বাধীন ও reusable অংশকে Component বলা হয়।

## JSX

JavaScript-এর ভিতরে HTML-এর মতো markup লেখার syntax-কে JSX বলা হয়।

## Parent Component

যে Component অন্য Component render করে, তাকে Parent Component বলা হয়।

## Child Component

যে Component অন্য Component-এর ভিতরে render হয়, তাকে Child Component বলা হয়।

## Root Component

React application-এর সবচেয়ে উপরের Component-কে Root Component বলা হয়।

## Export

একটি Component-কে অন্য file থেকে ব্যবহারযোগ্য করার প্রক্রিয়াকে export বলা হয়।

---

# গুরুত্বপূর্ণ প্রশ্ন ও উত্তর

## প্রশ্ন ১: React Component কী?

React Component হলো একটি JavaScript function, যা JSX markup return করে এবং UI-এর একটি অংশ তৈরি করে।

---

## প্রশ্ন ২: Component কেন ব্যবহার করা হয়?

Component ব্যবহার করা হয় UI-কে ছোট, reusable এবং সহজে পরিচালনাযোগ্য অংশে ভাগ করার জন্য।

---

## প্রশ্ন ৩: Component-এর নাম কীভাবে লিখতে হয়?

Component-এর নাম অবশ্যই Capital Letter দিয়ে শুরু করতে হয়।

```jsx
function Profile() {
}
```

---

## প্রশ্ন ৪: Component কী return করে?

React Component সাধারণত JSX markup return করে।

```jsx
return <h1>Hello</h1>;
```

---

## প্রশ্ন ৫: `export default` কী?

`export default` হলো JavaScript syntax, যার মাধ্যমে file-এর প্রধান Component-কে export করা হয়।

```jsx
export default function App() {
}
```

---

## প্রশ্ন ৬: JSX কী?

JSX হলো JavaScript-এর একটি syntax extension, যার মাধ্যমে JavaScript-এর ভিতরে HTML-এর মতো markup লেখা যায়।

---

## প্রশ্ন ৭: একাধিক line-এর JSX return করলে parentheses কেন ব্যবহার করা হয়?

Parentheses ব্যবহার না করলে `return`-এর পরবর্তী line-এর code JavaScript ignore করতে পারে।

সঠিক:

```jsx
return (
  <h1>Hello</h1>
);
```

---

## প্রশ্ন ৮: Component কীভাবে ব্যবহার করা হয়?

Component-কে JSX-এর ভিতরে custom tag-এর মতো ব্যবহার করা হয়।

```jsx
<Profile />
```

---

## প্রশ্ন ৯: Lowercase এবং Capitalized tag-এর পার্থক্য কী?

Lowercase tag সাধারণ HTML element বোঝায়:

```jsx
<section>
```

Capital Letter দিয়ে শুরু হওয়া tag custom React Component বোঝায়:

```jsx
<Profile />
```

---

## প্রশ্ন ১০: Parent Component কী?

যে Component অন্য Component render করে, তাকে Parent Component বলা হয়।

---

## প্রশ্ন ১১: Child Component কী?

যে Component parent-এর ভিতরে render হয়, তাকে Child Component বলা হয়।

---

## প্রশ্ন ১২: Component-এর ভিতরে Component define করা উচিত কি?

না। প্রতিটি Component top level-এ define করা উচিত।

---

## প্রশ্ন ১৩: একই Component কতবার ব্যবহার করা যায়?

প্রয়োজন অনুযায়ী যতবার ইচ্ছা ব্যবহার করা যায়।

```jsx
<Profile />
<Profile />
<Profile />
```

---

## প্রশ্ন ১৪: Root Component কী?

React application-এর সবচেয়ে উপরের Component-কে Root Component বলা হয়।

---

# খুব সংক্ষিপ্ত Revision

```jsx
export default function Profile() {
  return (
    <img
      src="photo.jpg"
      alt="Profile"
    />
  );
}
```

এই Component থেকে মনে রাখতে হবে:

```text
export default
→ Component export করে

function Profile()
→ Profile নামে JavaScript function তৈরি করে

Capital P
→ Component-এর নাম বড় হাতের অক্ষর দিয়ে শুরু হয়

return
→ Screen-এ কী দেখাবে তা ফেরত দেয়

<img />
→ JSX markup
```

Component ব্যবহার:

```jsx
function Gallery() {
  return (
    <section>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

এখানে:

```text
Gallery = Parent Component
Profile = Child Component
Profile তিনবার ব্যবহার করা হয়েছে
```
