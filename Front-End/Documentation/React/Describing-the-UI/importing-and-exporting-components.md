# Importing and Exporting Components

## Component Import ও Export করা

React Component-এর মূল সুবিধা হলো **reusability** বা পুনর্ব্যবহারযোগ্যতা।

একটি Component-এর ভিতরে অন্য Component ব্যবহার করা যায়। কিন্তু একটি application বড় হওয়ার সঙ্গে সঙ্গে Component-এর সংখ্যাও বাড়তে থাকে। সব Component একই file-এ রাখলে file অনেক বড় হয়ে যায় এবং code খুঁজে পাওয়া কঠিন হয়।

তাই Component-গুলোকে আলাদা আলাদা file-এ ভাগ করে রাখা হয়।

এর ফলে:

* File সহজে পড়া যায়
* Code সহজে খুঁজে পাওয়া যায়
* Component বিভিন্ন জায়গায় পুনরায় ব্যবহার করা যায়
* Project পরিচালনা করা সহজ হয়
* Component-এর দায়িত্ব পরিষ্কার থাকে

---

# এই অধ্যায়ে যা শিখব

এই অধ্যায়ে আমরা শিখব:

1. Root Component File কী
2. Component কীভাবে export করতে হয়
3. Component কীভাবে import করতে হয়
4. Default import এবং export কী
5. Named import এবং export কী
6. একই file থেকে একাধিক Component export করা
7. Component-গুলোকে আলাদা file-এ ভাগ করা

---

# ১. Root Component File

## The Root Component File

আগের অধ্যায়ে আমরা `Profile` এবং `Gallery` নামে দুটি Component তৈরি করেছিলাম।

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
* `Gallery` Component তিনটি `Profile` render করছে
* `Gallery` default export করা হয়েছে

এই দুটি Component বর্তমানে একই file-এর মধ্যে রয়েছে।

উদাহরণে file-এর নাম:

```text
App.js
```

এই `App.js`-কে এখানে **Root Component File** বলা হচ্ছে।

---

# Root Component File কী?

React application-এর সবচেয়ে উপরের বা প্রধান Component যে file-এ থাকে, সেটিকে Root Component File বলা হয়।

সাধারণ React project-এ এটি হতে পারে:

```text
App.js
```

অথবা:

```text
App.jsx
```

উদাহরণ:

```jsx
export default function App() {
  return (
    <main>
      <h1>My React Application</h1>
    </main>
  );
}
```

এখানে `App` হলো Root Component।

আর এটি যে file-এ রয়েছে, সেই file হলো Root Component File।

---

# Root Component সবসময় `App.js`-এ থাকবে কি?

সবসময় নয়।

Project setup অনুযায়ী Root Component অন্য file-এ থাকতে পারে।

যেমন:

```text
App.jsx
main.jsx
index.jsx
page.jsx
```

কোন file Root Component হিসেবে কাজ করবে, তা project-এর setup বা framework-এর ওপর নির্ভর করে।

Next.js-এর মতো file-based routing framework ব্যবহার করলে প্রতিটি page-এর জন্য আলাদা Root Component থাকতে পারে।

---

# ২. Component কেন আলাদা File-এ রাখা প্রয়োজন?

বর্তমানে `Profile` এবং `Gallery` একই `App.js` file-এর মধ্যে আছে।

```jsx
function Profile() {
  // ...
}

export default function Gallery() {
  // ...
}
```

কিন্তু ভবিষ্যতে যদি landing page পরিবর্তন করতে হয়?

ধরা যাক:

* Landing page-এ science book-এর list দেখাতে হবে
* `Gallery` অন্য page-এ ব্যবহার করতে হবে
* শুধু একটি `Profile` অন্য জায়গায় দেখাতে হবে
* একই `Profile` বহু page-এ ব্যবহার করতে হবে

তখন Component-গুলোকে `App.js`-এর বাইরে আলাদা file-এ রাখা বেশি সুবিধাজনক হবে।

---

# Component আলাদা File-এ রাখার সুবিধা

## Modularity

প্রতিটি file একটি নির্দিষ্ট কাজ করবে।

যেমন:

```text
App.js
Gallery.js
Profile.js
```

## Reusability

একই Component অন্য file-এ import করে ব্যবহার করা যাবে।

## Readability

একটি বড় file-এর পরিবর্তে ছোট ছোট file থাকবে।

## Maintainability

কোন Component পরিবর্তন করতে হবে তা সহজে বোঝা যাবে।

---

# ৩. Component সরানোর তিনটি ধাপ

একটি Component-কে আলাদা file-এ নেওয়ার জন্য তিনটি ধাপ অনুসরণ করতে হয়।

## ধাপ ১: নতুন JavaScript File তৈরি করা

উদাহরণ:

```text
Gallery.js
```

## ধাপ ২: নতুন File থেকে Component Export করা

```jsx
export default function Gallery() {
  // ...
}
```

## ধাপ ৩: যেখানে Component ব্যবহার করা হবে সেখানে Import করা

```jsx
import Gallery from "./Gallery.js";
```

এরপর Component ব্যবহার করা যাবে:

```jsx
<Gallery />
```

---

# ৪. Component Export এবং Import করা

## Exporting and Importing a Component

এখন `Profile` এবং `Gallery` Component-কে `App.js` থেকে সরিয়ে নতুন `Gallery.js` file-এ রাখা হবে।

Project-এর file structure:

```text
src
├── App.js
└── Gallery.js
```

---

# Gallery.js File

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

এই file-এ দুটি Component আছে:

```text
Profile
Gallery
```

কিন্তু শুধু `Gallery` export করা হয়েছে।

```jsx
export default function Gallery() {
```

`Profile` export করা হয়নি।

কারণ `Profile` শুধু `Gallery.js` file-এর ভিতরেই ব্যবহার হচ্ছে।

---

# App.js File

```jsx
import Gallery from "./Gallery.js";

export default function App() {
  return <Gallery />;
}
```

এখানে প্রথম line:

```jsx
import Gallery from "./Gallery.js";
```

এর মাধ্যমে `Gallery.js` file থেকে `Gallery` Component import করা হয়েছে।

এরপর:

```jsx
<Gallery />
```

লিখে Component-টি render করা হয়েছে।

---

# Code Flow

সম্পূর্ণ flow:

```text
Gallery.js
    ↓
Gallery export করা হয়েছে
    ↓
App.js
    ↓
Gallery import করা হয়েছে
    ↓
<Gallery /> render করা হয়েছে
```

---

# দুইটি File-এর দায়িত্ব

## Gallery.js

এই file:

* `Profile` Component define করছে
* `Profile` শুধু একই file-এ ব্যবহার করছে
* `Gallery` Component define করছে
* `Gallery`-কে default export করছে

## App.js

এই file:

* `Gallery.js` থেকে `Gallery` import করছে
* `<Gallery />` render করছে
* Root `App` Component-কে default export করছে

---

# ৫. Export কী?

Export ব্যবহার করে একটি file-এর Component, function, variable বা value-কে অন্য file-এ ব্যবহারযোগ্য করা হয়।

উদাহরণ:

```jsx
export default function Gallery() {
  return <h1>Gallery</h1>;
}
```

এখানে `Gallery` Component-কে file-এর বাইরে ব্যবহার করার অনুমতি দেওয়া হয়েছে।

Export না করলে Component শুধু সেই file-এর মধ্যেই ব্যবহার করা যাবে।

---

# ৬. Import কী?

Import ব্যবহার করে অন্য file থেকে export করা Component বা value বর্তমান file-এ নিয়ে আসা হয়।

উদাহরণ:

```jsx
import Gallery from "./Gallery.js";
```

এখানে:

* `import` হলো JavaScript keyword
* `Gallery` হলো import করা Component-এর নাম
* `from` বলে দেয় কোন file থেকে import করা হচ্ছে
* `"./Gallery.js"` হলো file-এর path

---

# Import Path বোঝা

```jsx
import Gallery from "./Gallery.js";
```

এখানে:

```text
./
```

এর অর্থ বর্তমান directory বা folder।

```text
Gallery.js
```

হলো file-এর নাম।

অর্থাৎ:

> বর্তমান folder-এর `Gallery.js` file থেকে `Gallery` import করো।

---

# File Extension লেখা বাধ্যতামূলক কি?

Import করার সময় file extension-সহ লেখা যায়:

```jsx
import Gallery from "./Gallery.js";
```

আবার কিছু React setup-এ extension ছাড়াও লেখা যায়:

```jsx
import Gallery from "./Gallery";
```

দুইটিই সাধারণত কাজ করে।

তবে:

```jsx
import Gallery from "./Gallery.js";
```

লেখাটি native JavaScript ES Module syntax-এর বেশি কাছাকাছি।

---

# ৭. Default Export

JavaScript-এ value export করার প্রধান দুটি পদ্ধতি রয়েছে:

1. Default export
2. Named export

প্রথমে Default Export বোঝা যাক।

উদাহরণ:

```jsx
export default function Gallery() {
  return <h1>Gallery</h1>;
}
```

এখানে `Gallery` Component default export করা হয়েছে।

---

# একটি File-এ কয়টি Default Export থাকতে পারে?

একটি file-এ সর্বোচ্চ **একটি Default Export** থাকতে পারে।

সঠিক:

```jsx
export default function Gallery() {
  return <h1>Gallery</h1>;
}
```

ভুল:

```jsx
export default function Gallery() {
  return <h1>Gallery</h1>;
}

export default function Profile() {
  return <h1>Profile</h1>;
}
```

একই file-এ দুটি `export default` ব্যবহার করা যাবে না।

---

# Default Import

Default export করা Component import করার সময় curly braces ব্যবহার করা হয় না।

Export:

```jsx
export default function Gallery() {
  return <h1>Gallery</h1>;
}
```

Import:

```jsx
import Gallery from "./Gallery.js";
```

এখানে `Gallery`-এর চারপাশে `{}` নেই।

---

# Default Import-এর নাম পরিবর্তন করা যায়

Default import-এর ক্ষেত্রে import করার সময় যেকোনো নাম ব্যবহার করা যায়।

ধরা যাক `Button.js` file:

```jsx
export default function Button() {
  return <button>Click Me</button>;
}
```

সাধারণ import:

```jsx
import Button from "./Button.js";
```

কিন্তু চাইলে লেখা যায়:

```jsx
import Banana from "./Button.js";
```

তারপর:

```jsx
<Banana />
```

এটিও একই default exported `Button` Component render করবে।

কারণ default import-এর নাম export করা function-এর নামের সঙ্গে মিলতেই হবে—এমন বাধ্যবাধকতা নেই।

তবে code পরিষ্কার রাখার জন্য অর্থপূর্ণ এবং একই নাম ব্যবহার করাই ভালো।

সেরা পদ্ধতি:

```jsx
import Button from "./Button.js";
```

বিভ্রান্তিকর পদ্ধতি:

```jsx
import Banana from "./Button.js";
```

---

# ৮. Named Export

একটি file থেকে একাধিক Component বা value export করতে Named Export ব্যবহার করা যায়।

উদাহরণ:

```jsx
export function Profile() {
  return <h1>Profile</h1>;
}
```

এখানে `default` keyword নেই।

এটি একটি Named Export।

---

# Named Import

Named export import করার সময় curly braces ব্যবহার করতে হয়।

Export:

```jsx
export function Profile() {
  return <h1>Profile</h1>;
}
```

Import:

```jsx
import { Profile } from "./Gallery.js";
```

এখানে `Profile`-কে `{}`-এর মধ্যে লেখা হয়েছে।

---

# Named Import-এর নাম অবশ্যই মিলতে হবে

Named export:

```jsx
export function Profile() {
  return <h1>Profile</h1>;
}
```

সঠিক import:

```jsx
import { Profile } from "./Gallery.js";
```

ভুল import:

```jsx
import { User } from "./Gallery.js";
```

কারণ file থেকে `User` নামে কিছু export করা হয়নি।

Named import-এর ক্ষেত্রে export এবং import-এর নাম একই হতে হয়।

এই কারণেই একে **Named Export** এবং **Named Import** বলা হয়।

---

# ৯. Default বনাম Named Export

## Default Export Syntax

```jsx
export default function Button() {
  return <button>Click</button>;
}
```

Default Import:

```jsx
import Button from "./Button.js";
```

---

## Named Export Syntax

```jsx
export function Button() {
  return <button>Click</button>;
}
```

Named Import:

```jsx
import { Button } from "./Button.js";
```

---

# Default এবং Named Export-এর তুলনা

| বিষয়                  | Default Export               | Named Export                     |
| --------------------- | ---------------------------- | -------------------------------- |
| Export syntax         | `export default`             | `export`                         |
| Import-এ curly braces | লাগে না                      | লাগে                             |
| একটি file-এ সংখ্যা    | সর্বোচ্চ একটি                | একাধিক                           |
| Import নাম মিলতে হবে  | বাধ্যতামূলক নয়               | অবশ্যই মিলতে হবে                 |
| সাধারণ ব্যবহার        | File-এ একটি প্রধান Component | File-এ একাধিক Component বা value |

---

# সহজে মনে রাখার নিয়ম

## Default

Export:

```jsx
export default function Gallery() {}
```

Import:

```jsx
import Gallery from "./Gallery.js";
```

Curly braces নেই।

## Named

Export:

```jsx
export function Profile() {}
```

Import:

```jsx
import { Profile } from "./Gallery.js";
```

Curly braces আছে।

---

# ১০. কখন Default Export ব্যবহার করা হয়?

একটি file থেকে যদি শুধু একটি প্রধান Component export করা হয়, তাহলে সাধারণত Default Export ব্যবহার করা হয়।

উদাহরণ:

### Button.js

```jsx
export default function Button() {
  return <button>Click Me</button>;
}
```

### App.js

```jsx
import Button from "./Button.js";

export default function App() {
  return <Button />;
}
```

এখানে `Button.js` file-এর প্রধান এবং একমাত্র Component হলো `Button`।

---

# ১১. কখন Named Export ব্যবহার করা হয়?

একটি file থেকে যদি একাধিক Component বা value export করা হয়, তাহলে Named Export ব্যবহার করা সুবিধাজনক।

উদাহরণ:

### Components.js

```jsx
export function Header() {
  return <header>Header</header>;
}

export function Footer() {
  return <footer>Footer</footer>;
}
```

### App.js

```jsx
import { Header, Footer } from "./Components.js";

export default function App() {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
}
```

একই file থেকে দুইটি Component import করা হয়েছে:

```jsx
import { Header, Footer } from "./Components.js";
```

---

# ১২. Meaningful Name ব্যবহার করা

Component এবং file-এর অর্থপূর্ণ নাম দেওয়া উচিত।

ভালো:

```jsx
export default function Gallery() {
  // ...
}
```

ভালো file name:

```text
Gallery.js
```

এড়িয়ে চলা উচিত:

```jsx
export default () => {
  return <h1>Gallery</h1>;
};
```

এখানে function-এর কোনো নাম নেই।

এ ধরনের anonymous default export debugging কঠিন করে তোলে।

ভালো পদ্ধতি:

```jsx
export default function Gallery() {
  return <h1>Gallery</h1>;
}
```

---

# ১৩. একই File থেকে একাধিক Component Export করা

## Exporting Multiple Components from the Same File

আগের `Gallery.js` file-এ দুটি Component ছিল:

```text
Profile
Gallery
```

কিন্তু শুধু `Gallery` export করা হয়েছিল।

```jsx
function Profile() {
  // ...
}

export default function Gallery() {
  // ...
}
```

এখন যদি `App.js` থেকে শুধু একটি `Profile` render করতে চাই, তাহলে `Profile`-কেও export করতে হবে।

---

# সমস্যা: দুইটি Default Export করা যাবে না

`Gallery.js`-এ ইতোমধ্যে `Gallery` default export করা হয়েছে।

```jsx
export default function Gallery() {
  // ...
}
```

তাই `Profile`-কেও default export করা যাবে না।

ভুল:

```jsx
export default function Profile() {
  // ...
}

export default function Gallery() {
  // ...
}
```

একটি file-এ দুইটি default export অনুমোদিত নয়।

---

# সমাধান: Profile-কে Named Export করা

```jsx
export function Profile() {
  return (
    <img
      src="https://react.dev/images/docs/scientists/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}
```

এখানে `Profile` named export।

আর `Gallery` default export:

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

---

# সম্পূর্ণ Gallery.js

```jsx
export function Profile() {
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

এই file থেকে দুটি export হচ্ছে:

1. `Profile` — Named Export
2. `Gallery` — Default Export

---

# App.js-এ দুটিই Import করা

```jsx
import Gallery from "./Gallery.js";
import { Profile } from "./Gallery.js";

export default function App() {
  return <Profile />;
}
```

এখানে:

```jsx
import Gallery from "./Gallery.js";
```

হলো default import।

আর:

```jsx
import { Profile } from "./Gallery.js";
```

হলো named import।

---

# একই Line-এ Import করা

Default এবং named import একই line-এও লেখা যায়:

```jsx
import Gallery, { Profile } from "./Gallery.js";
```

এখানে:

* `Gallery` হলো default import
* `{ Profile }` হলো named import

এরপর:

```jsx
export default function App() {
  return (
    <>
      <Profile />
      <Gallery />
    </>
  );
}
```

---

# ১৪. Default ও Named Export একসঙ্গে ব্যবহার

একটি file-এ একই সঙ্গে থাকতে পারে:

* একটি Default Export
* একাধিক Named Export

উদাহরণ:

```jsx
export function Profile() {
  return <h2>Profile</h2>;
}

export function Avatar() {
  return <img src="avatar.jpg" alt="Avatar" />;
}

export default function Gallery() {
  return (
    <section>
      <Profile />
      <Avatar />
    </section>
  );
}
```

Import:

```jsx
import Gallery, { Profile, Avatar } from "./Gallery.js";
```

---

# একটি File-এ Export-এর সীমা

```text
Default Export = সর্বোচ্চ ১টি
Named Export = যতগুলো প্রয়োজন
```

উদাহরণ:

```jsx
export const imageSize = 100;

export function Profile() {
  // ...
}

export function Avatar() {
  // ...
}

export default function Gallery() {
  // ...
}
```

এখানে:

* `imageSize` named export
* `Profile` named export
* `Avatar` named export
* `Gallery` default export

---

# ১৫. Export Style নিয়ে Team Convention

Default এবং named export একসঙ্গে ব্যবহার করলে নতুন developer-এর কাছে কিছুটা বিভ্রান্তিকর হতে পারে।

তাই কিছু team:

* শুধু default export ব্যবহার করে
* অথবা শুধু named export ব্যবহার করে
* অথবা একই file-এ দুই ধরনের export মিশিয়ে ব্যবহার করে না

কোন style ব্যবহার করা হবে, তা team বা project-এর coding convention-এর ওপর নির্ভর করে।

গুরুত্বপূর্ণ বিষয় হলো:

* Export এবং import syntax যেন একে অপরের সঙ্গে মেলে
* Component-এর নাম যেন পরিষ্কার হয়
* পুরো project-এ একই style বজায় থাকে

---

# ১৬. Export ও Import মিল না হলে Error

## Default Export-কে Named Import হিসেবে Import করলে ভুল হবে

Export:

```jsx
export default function Gallery() {
  return <h1>Gallery</h1>;
}
```

ভুল Import:

```jsx
import { Gallery } from "./Gallery.js";
```

সঠিক:

```jsx
import Gallery from "./Gallery.js";
```

---

## Named Export-কে Default Import হিসেবে Import করলে ভুল হবে

Export:

```jsx
export function Profile() {
  return <h1>Profile</h1>;
}
```

ভুল Import:

```jsx
import Profile from "./Gallery.js";
```

সঠিক:

```jsx
import { Profile } from "./Gallery.js";
```

---

# সাধারণ Error-এর কারণ

Import-export error হলে নিচের বিষয়গুলো পরীক্ষা করতে হবে:

1. Component default export নাকি named export?
2. Named import-এর ক্ষেত্রে curly braces ব্যবহার হয়েছে কি?
3. Component-এর নাম সঠিক আছে কি?
4. File path সঠিক আছে কি?
5. File name-এর spelling সঠিক কি?
6. Uppercase ও lowercase ঠিক আছে কি?
7. Component সত্যিই export করা হয়েছে কি?

---

# ১৭. Component আলাদা File-এ ভাগ করা

আগের structure:

```text
App.js
Gallery.js
```

`Gallery.js` file-এ দুইটি Component রয়েছে:

```text
Gallery
Profile
```

এটি কাজ করলেও `Profile`-কে আরও reusable করতে আলাদা `Profile.js` file-এ নেওয়া যায়।

নতুন structure:

```text
src
├── App.js
├── Gallery.js
└── Profile.js
```

---

# Profile.js

Default Export ব্যবহার করলে:

```jsx
export default function Profile() {
  return (
    <img
      src="https://react.dev/images/docs/scientists/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}
```

---

# Gallery.js

```jsx
import Profile from "./Profile.js";

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

এখানে `Profile.js` থেকে `Profile` import করা হয়েছে।

---

# App.js

```jsx
import Gallery from "./Gallery.js";
import Profile from "./Profile.js";

export default function App() {
  return (
    <>
      <Profile />
      <Gallery />
    </>
  );
}
```

এখানে:

* `Gallery.js` থেকে `Gallery` import করা হয়েছে
* `Profile.js` থেকে `Profile` import করা হয়েছে
* প্রথমে একটি `Profile` render হচ্ছে
* এরপর পুরো `Gallery` render হচ্ছে

---

# Component Flow

```text
Profile.js
   ├── Profile export করে
   │
   ├── Gallery.js Profile import করে
   │      └── তিনবার <Profile /> render করে
   │
   └── App.js Profile import করে
          └── একবার <Profile /> render করে

Gallery.js
   └── Gallery export করে
          └── App.js Gallery import করে
```

---

# Named Export দিয়ে একই Structure

`Profile.js`:

```jsx
export function Profile() {
  return (
    <img
      src="https://react.dev/images/docs/scientists/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}
```

`Gallery.js`:

```jsx
import { Profile } from "./Profile.js";

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

`App.js`:

```jsx
import Gallery from "./Gallery.js";
import { Profile } from "./Profile.js";

export default function App() {
  return (
    <>
      <Profile />
      <Gallery />
    </>
  );
}
```

Default বা named—দুই পদ্ধতিই ব্যবহার করা যায়। তবে export অনুযায়ী সঠিক import syntax ব্যবহার করতে হবে।

---

# অধ্যায়ের সংক্ষিপ্ত সারাংশ

## Root Component File

Application-এর প্রধান Component যে file-এ থাকে, সেটি Root Component File।

```text
App.js
```

---

## Export

একটি file-এর Component-কে অন্য file-এ ব্যবহারযোগ্য করে।

```jsx
export default function Gallery() {}
```

অথবা:

```jsx
export function Profile() {}
```

---

## Import

অন্য file থেকে export করা Component বর্তমান file-এ নিয়ে আসে।

```jsx
import Gallery from "./Gallery.js";
```

অথবা:

```jsx
import { Profile } from "./Gallery.js";
```

---

## Default Export

একটি file-এ সর্বোচ্চ একটি থাকতে পারে।

```jsx
export default function Gallery() {}
```

Import:

```jsx
import Gallery from "./Gallery.js";
```

---

## Named Export

একটি file-এ অনেকগুলো থাকতে পারে।

```jsx
export function Profile() {}
```

Import:

```jsx
import { Profile } from "./Gallery.js";
```

---

## একই File থেকে একাধিক Export

```jsx
export function Profile() {}

export default function Gallery() {}
```

Import:

```jsx
import Gallery, { Profile } from "./Gallery.js";
```

---

# Default এবং Named Export মনে রাখার ছক

| ধরন     | Export                                | Import                                  |
| ------- | ------------------------------------- | --------------------------------------- |
| Default | `export default function Button() {}` | `import Button from "./Button.js";`     |
| Named   | `export function Button() {}`         | `import { Button } from "./Button.js";` |

---

# গুরুত্বপূর্ণ প্রশ্ন ও উত্তর

## প্রশ্ন ১: Component আলাদা File-এ রাখা হয় কেন?

File সহজে পড়া, Component পুনরায় ব্যবহার এবং বড় project সহজে পরিচালনা করার জন্য Component আলাদা file-এ রাখা হয়।

---

## প্রশ্ন ২: Root Component File কী?

Application-এর প্রধান বা Root Component যে file-এ থাকে, সেটিকে Root Component File বলা হয়।

---

## প্রশ্ন ৩: Export কী?

একটি file-এর Component বা value-কে অন্য file-এ ব্যবহারযোগ্য করার পদ্ধতিকে export বলা হয়।

---

## প্রশ্ন ৪: Import কী?

অন্য file থেকে export করা Component বা value বর্তমান file-এ নিয়ে আসার পদ্ধতিকে import বলা হয়।

---

## প্রশ্ন ৫: Default Export কী?

একটি file-এর প্রধান value বা Component export করার পদ্ধতিকে Default Export বলা হয়।

```jsx
export default function App() {}
```

---

## প্রশ্ন ৬: একটি File-এ কয়টি Default Export থাকতে পারে?

সর্বোচ্চ একটি।

---

## প্রশ্ন ৭: Named Export কী?

নির্দিষ্ট নামে Component বা value export করার পদ্ধতিকে Named Export বলা হয়।

```jsx
export function Profile() {}
```

---

## প্রশ্ন ৮: একটি File-এ কয়টি Named Export থাকতে পারে?

প্রয়োজন অনুযায়ী একাধিক Named Export থাকতে পারে।

---

## প্রশ্ন ৯: Default Import-এ Curly Braces লাগে কি?

না।

```jsx
import Gallery from "./Gallery.js";
```

---

## প্রশ্ন ১০: Named Import-এ Curly Braces লাগে কি?

হ্যাঁ।

```jsx
import { Profile } from "./Gallery.js";
```

---

## প্রশ্ন ১১: Named Import-এর নাম কি Export-এর নামের সঙ্গে মিলতে হবে?

হ্যাঁ, Named Import-এর নাম অবশ্যই Named Export-এর নামের সঙ্গে মিলতে হবে।

---

## প্রশ্ন ১২: Default Import-এর নাম পরিবর্তন করা যায় কি?

হ্যাঁ, technically যেকোনো নাম দেওয়া যায়। তবে পরিষ্কার code-এর জন্য একই অর্থপূর্ণ নাম ব্যবহার করা উচিত।

---

## প্রশ্ন ১৩: একই File-এ Default ও Named Export রাখা যায় কি?

হ্যাঁ। একটি Default Export এবং একাধিক Named Export রাখা যায়।

```jsx
export function Profile() {}

export default function Gallery() {}
```

---

## প্রশ্ন ১৪: একই File থেকে Default ও Named Import কীভাবে করা হয়?

```jsx
import Gallery, { Profile } from "./Gallery.js";
```

---

## প্রশ্ন ১৫: Export অনুযায়ী Import Syntax ব্যবহার না করলে কী হবে?

Application error দেখাবে, কারণ Default এবং Named Import-এর syntax আলাদা।

---

# খুব সংক্ষিপ্ত Revision

```jsx
// Gallery.js

export function Profile() {
  return <h2>Profile</h2>;
}

export default function Gallery() {
  return <Profile />;
}
```

```jsx
// App.js

import Gallery, { Profile } from "./Gallery.js";

export default function App() {
  return (
    <>
      <Profile />
      <Gallery />
    </>
  );
}
```

মনে রাখতে হবে:

```text
Default export
→ একটি file-এ একটি
→ Import-এ curly braces নেই

Named export
→ একটি file-এ একাধিক
→ Import-এ curly braces আছে

Export এবং import syntax
→ অবশ্যই একে অপরের সঙ্গে মিলতে হবে
```
