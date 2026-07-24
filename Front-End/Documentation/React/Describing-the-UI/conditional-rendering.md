# Conditional Rendering

## শর্ত অনুযায়ী React UI দেখানো

React Component-কে অনেক সময় বিভিন্ন condition বা শর্তের ওপর ভিত্তি করে আলাদা content দেখাতে হয়।

যেমন:

* User login করলে dashboard দেখানো
* Login না করলে login button দেখানো
* কোনো কাজ শেষ হলে checkmark দেখানো
* Product stock-এ না থাকলে “Out of Stock” দেখানো
* কোনো information না থাকলে component লুকিয়ে রাখা

React-এ condition পরিচালনার জন্য আলাদা কোনো বিশেষ syntax নেই। সাধারণ JavaScript-এর syntax ব্যবহার করেই JSX conditionally render করা হয়।

প্রধানত ব্যবহার করা হয়:

```js
if
```

```js
&&
```

```js
? :
```

---

# এই অধ্যায়ে যা শিখব

এই অধ্যায়ে শেখানো হয়েছে:

1. Condition অনুযায়ী আলাদা JSX return করা
2. কোনো JSX conditionally include বা exclude করা
3. React code-এ ব্যবহৃত সাধারণ conditional shortcut
4. `if` statement ব্যবহার
5. `null` return করে কিছু না দেখানো
6. Ternary operator ব্যবহার
7. Logical AND operator ব্যবহার
8. JSX variable-এ সংরক্ষণ করা

---

# ১. Condition অনুযায়ী JSX Return করা

## Conditionally Returning JSX

ধরা যাক, আমাদের একটি `PackingList` Component রয়েছে।

এর ভিতরে কয়েকটি `Item` Component render করা হচ্ছে।

প্রতিটি item packed হয়েছে কি না, সেটি `isPacked` prop দিয়ে জানানো হচ্ছে।

> **Documentation-এর মূল code**

### App.js

```jsx
function Item({ name, isPacked }) {
  return <li className="item">{name}</li>;
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

## Code ব্যাখ্যা

এখানে `PackingList` হলো Parent Component।

`Item` হলো Child Component।

প্রতিটি `Item` দুইটি prop গ্রহণ করছে:

```jsx
name
```

এবং:

```jsx
isPacked
```

প্রথম দুইটি item-এর ক্ষেত্রে:

```jsx
isPacked={true}
```

শেষ item-এর ক্ষেত্রে:

```jsx
isPacked={false}
```

কিন্তু বর্তমান `Item` Component শুধু item-এর নাম দেখাচ্ছে:

```jsx
return <li className="item">{name}</li>;
```

`isPacked` prop এখনো UI পরিবর্তনের জন্য ব্যবহার করা হয়নি।

---

# ২. `if` Statement দিয়ে আলাদা JSX Return করা

আমরা চাই:

* `isPacked` true হলে item-এর পাশে ✅ দেখাবে
* `isPacked` false হলে শুধু item-এর নাম দেখাবে

এটি JavaScript-এর `if` statement দিয়ে করা যায়।

> **Documentation-এর মূল code**

```jsx
if (isPacked) {
  return <li className="item">{name} ✅</li>;
}

return <li className="item">{name}</li>;
```

এর অর্থ:

```text
যদি isPacked true হয়
→ নামের সঙ্গে ✅ দেখাও

অন্যথায়
→ শুধু নাম দেখাও
```

---

## সম্পূর্ণ Code

> **Documentation-এর মূল code**

### App.js

```jsx
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✅</li>;
  }

  return <li className="item">{name}</li>;
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

## Output

```text
Space suit ✅
Helmet with a golden leaf ✅
Photo of Tam
```

## Code Flow

প্রথম item:

```jsx
<Item
  isPacked={true}
  name="Space suit"
/>
```

`isPacked` true হওয়ায়:

```jsx
return <li className="item">{name} ✅</li>;
```

execute হবে।

দ্বিতীয় item-এর ক্ষেত্রেও একই ঘটনা ঘটবে।

তৃতীয় item:

```jsx
<Item
  isPacked={false}
  name="Photo of Tam"
/>
```

`if` condition false হওয়ায় দ্বিতীয় `return` execute হবে:

```jsx
return <li className="item">{name}</li>;
```

React-এ control flow সাধারণ JavaScript দিয়েই পরিচালিত হয়।

---

# ৩. `return` হওয়ার পরের Code Execute হয় না

একটি function যখন কোনো value return করে, তখন function-এর execution সেখানেই শেষ হয়ে যায়।

```jsx
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li>{name} ✅</li>;
  }

  return <li>{name}</li>;
}
```

যদি `isPacked` true হয়, প্রথম `return` execute হবে।

তারপর নিচের `return` আর execute হবে না।

যদি `isPacked` false হয়, `if` block skip হবে এবং নিচের `return` execute হবে।

---

# ৪. `null` Return করে কিছু না দেখানো

## Conditionally Returning Nothing with `null`

কখনো condition অনুযায়ী Component থেকে কিছুই দেখাতে চাই না।

ধরা যাক, packed item-গুলো একেবারেই দেখানো হবে না।

এক্ষেত্রে Component থেকে `null` return করা যায়।

> **Documentation-এর মূল code**

```jsx
if (isPacked) {
  return null;
}

return <li className="item">{name}</li>;
```

এর অর্থ:

```text
যদি item packed হয়
→ কিছুই render করো না

না হলে
→ item-এর নাম render করো
```

---

## সম্পূর্ণ Code

> **Documentation-এর মূল code**

### App.js

```jsx
function Item({ name, isPacked }) {
  if (isPacked) {
    return null;
  }

  return <li className="item">{name}</li>;
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

## Output

```text
Photo of Tam
```

প্রথম দুইটি item packed হওয়ায় `null` return করেছে।

তাই React সেগুলোর জায়গায় কিছু render করেনি।

---

# `null` সম্পর্কে গুরুত্বপূর্ণ কথা

একটি React Component-কে কিছু return করতে হয়।

যদি কোনো UI দেখাতে না চান, তাহলে লিখতে পারেন:

```jsx
return null;
```

React `null`-কে কোনো দৃশ্যমান content হিসেবে render করে না।

তবে documentation অনুযায়ী, Component-এর ভেতর থেকে `null` return করার চেয়ে অনেক সময় Parent Component-এর JSX-এ condition দিয়ে Component include বা exclude করা বেশি পরিষ্কার হয়।

---

# ৫. JSX-এর একটি অংশ Conditionally Include করা

## Conditionally Including JSX

আগের `if` example-এ একই `<li>` দুইবার লেখা হয়েছিল।

```jsx
if (isPacked) {
  return <li className="item">{name} ✅</li>;
}

return <li className="item">{name}</li>;
```

দুইটি branch-এই একই structure রয়েছে:

```jsx
<li className="item">...</li>
```

শুধু ভিতরের content একটু আলাদা।

এভাবে একই code বারবার লেখা হলে ভবিষ্যতে maintain করা কঠিন হতে পারে।

যেমন `className` পরিবর্তন করতে হলে দুই জায়গায় পরিবর্তন করতে হবে।

এই duplication কমানোর জন্য JSX-এর শুধু প্রয়োজনীয় অংশ conditionally render করা যায়।

---

# ৬. Conditional বা Ternary Operator

## Conditional Operator `? :`

JavaScript-এর ternary operator হলো condition লেখার একটি সংক্ষিপ্ত পদ্ধতি।

Syntax:

```js
condition ? trueValue : falseValue
```

এর অর্থ:

```text
Condition true হলে
→ ?-এর পরের value

Condition false হলে
→ :-এর পরের value
```

---

## `if` Statement Version

```jsx
if (isPacked) {
  return <li className="item">{name} ✅</li>;
}

return <li className="item">{name}</li>;
```

## Ternary Version

> **Documentation-এর মূল code**

```jsx
return (
  <li className="item">
    {isPacked ? name + ' ✅' : name}
  </li>
);
```

এখানে:

```jsx
isPacked ? name + ' ✅' : name
```

পড়া যায় এভাবে:

```text
যদি isPacked true হয়
→ name + ' ✅' দেখাও

অন্যথায়
→ name দেখাও
```

---

# Ternary Operator-এর অংশ

```jsx
isPacked ? name + ' ✅' : name
```

## Condition

```jsx
isPacked
```

## True হলে

```jsx
name + ' ✅'
```

## False হলে

```jsx
name
```

---

# কেন Ternary ব্যবহার করা হলো?

`<li>` element শুধু একবার লেখা হয়েছে:

```jsx
<li className="item">
```

শুধু এর ভিতরের content condition অনুযায়ী পরিবর্তিত হচ্ছে।

এতে duplicate JSX কমে যায়।

---

# ৭. Ternary দিয়ে আলাদা JSX Element দেখানো

Ternary operator-এর দুই পাশে শুধু text নয়, JSX-ও রাখা যায়।

ধরা যাক packed item-এর নাম strike-through করার জন্য `<del>` ব্যবহার করা হবে।

> **Documentation-এর মূল code**

### App.js

```jsx
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {isPacked ? (
        <del>
          {name + ' ✅'}
        </del>
      ) : (
        name
      )}
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

## Code ব্যাখ্যা

Condition:

```jsx
isPacked
```

True হলে:

```jsx
<del>
  {name + ' ✅'}
</del>
```

False হলে:

```jsx
name
```

Packed item browser-এ কাটা দাগসহ দেখা যাবে।

---

# Parentheses কেন ব্যবহার করা হয়েছে?

Ternary-এর প্রতিটি অংশে একাধিক line-এর JSX থাকলে parentheses ব্যবহার করলে code পরিষ্কার থাকে।

```jsx
condition ? (
  <SomeJSX />
) : (
  <OtherJSX />
)
```

এটি বাধ্যতামূলক syntax নয়, তবে multi-line JSX পড়তে সুবিধা হয়।

---

# Ternary কখন ব্যবহার করা ভালো?

ছোট এবং সহজ condition-এর জন্য ternary operator ভালো কাজ করে।

যেমন:

```jsx
{isLoggedIn ? "Logout" : "Login"}
```

```jsx
{inStock ? <BuyButton /> : <OutOfStock />}
```

কিন্তু অনেক nested ternary থাকলে code জটিল হয়ে যায়।

Documentation পরামর্শ দেয়, conditional markup বেশি জটিল হলে Child Component extract করা বা variable ও function ব্যবহার করে code পরিষ্কার করা উচিত।

---

# ৮. `if` এবং Ternary কি একই ফল দেয়?

নিচের `if` code:

```jsx
if (isPacked) {
  return <li>{name} ✅</li>;
}

return <li>{name}</li>;
```

এবং নিচের ternary code:

```jsx
return (
  <li>
    {isPacked ? name + ' ✅' : name}
  </li>
);
```

এই উদাহরণে একই ফল দেয়।

JSX element বাস্তব DOM node বা stateful object নয়। এগুলো UI-এর lightweight description বা blueprint-এর মতো। তাই এই দুই structure কার্যত সমানভাবে কাজ করে।

---

# ৯. Logical AND Operator

## Logical AND `&&`

কোনো condition true হলে কিছু render করতে এবং false হলে কিছুই render না করতে `&&` ব্যবহার করা যায়।

Syntax:

```jsx
condition && jsx
```

এর অর্থ:

```text
Condition true হলে
→ ডান পাশের content render করো

Condition false হলে
→ কিছু render করো না
```

---

## Documentation-এর Example

> **Documentation-এর মূল code**

```jsx
return (
  <li className="item">
    {name} {isPacked && '✅'}
  </li>
);
```

এখানে:

```jsx
isPacked && '✅'
```

এর অর্থ:

```text
isPacked true হলে
→ ✅ দেখাও

isPacked false হলে
→ কিছুই দেখিও না
```

---

## সম্পূর্ণ Code

> **Documentation-এর মূল code**

### App.js

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

## Output

```text
Space suit ✅
Helmet with a golden leaf ✅
Photo of Tam
```

---

# `&&` কীভাবে কাজ করে?

JavaScript-এর `&&` expression-এ:

* বাম পাশ truthy হলে ডান পাশের value return হয়
* বাম পাশ falsy হলে বাম পাশের value return হয়

উদাহরণ:

```js
true && "Hello"
```

Result:

```text
Hello
```

```js
false && "Hello"
```

Result:

```text
false
```

React JSX-এর মধ্যে `false`, `null` এবং `undefined`-কে empty hole হিসেবে বিবেচনা করে। তাই এগুলো screen-এ render হয় না।

---

# Ternary এবং `&&`-এর পার্থক্য

## Ternary

True এবং false—দুই অবস্থায় আলাদা output দরকার হলে:

```jsx
{isPacked ? 'Packed' : 'Not packed'}
```

## Logical AND

শুধু true হলে কিছু দেখাতে চাইলে:

```jsx
{isPacked && '✅'}
```

সহজভাবে:

```text
দুইটি সম্ভাব্য output
→ Ternary

True হলে content, false হলে কিছুই নয়
→ &&
```

---

# ১০. গুরুত্বপূর্ণ Pitfall: `&&`-এর বাম পাশে Number

Documentation-এর গুরুত্বপূর্ণ সতর্কতা:

> `&&`-এর বাম পাশে সরাসরি number রাখা উচিত নয়।

ভুল:

```jsx
{messageCount && <p>New messages</p>}
```

ধরা যাক:

```js
messageCount = 0
```

তাহলে expression হবে:

```jsx
0 && <p>New messages</p>
```

JavaScript এখানে `0` return করবে।

React `0`-কে screen-এ render করবে।

ফলে paragraph লুকিয়ে গেলেও screen-এ দেখা যেতে পারে:

```text
0
```

---

# সঠিক পদ্ধতি

Condition-কে স্পষ্ট boolean expression-এ পরিবর্তন করতে হবে।

> **Documentation-এর মূল code**

```jsx
messageCount > 0 && <p>New messages</p>
```

এখন:

```jsx
messageCount > 0
```

শুধু `true` অথবা `false` return করবে।

`messageCount` যদি `0` হয়:

```js
0 > 0
```

Result:

```text
false
```

React false render করবে না।

---

# আরও উদাহরণ

ভুল:

```jsx
{items.length && <ItemList />}
```

যদি:

```js
items.length === 0
```

তাহলে `0` render হতে পারে।

সঠিক:

```jsx
{items.length > 0 && <ItemList />}
```

---

# ১১. JSX Variable-এ রাখা

## Conditionally Assigning JSX to a Variable

কখনো ternary বা `&&` ব্যবহার করলে code বেশি জটিল হয়ে যায়।

সেক্ষেত্রে সাধারণ `if` statement এবং variable ব্যবহার করা যায়।

প্রথমে একটি default value রাখা হলো:

> **Documentation-এর মূল code**

```jsx
let itemContent = name;
```

তারপর condition অনুযায়ী variable-এর value পরিবর্তন করা হলো:

```jsx
if (isPacked) {
  itemContent = name + " ✅";
}
```

এরপর JSX-এর ভিতরে variable ব্যবহার করা হলো:

```jsx
<li className="item">
  {itemContent}
</li>
```

---

## সম্পূর্ণ Code

> **Documentation-এর মূল code**

### App.js

```jsx
function Item({ name, isPacked }) {
  let itemContent = name;

  if (isPacked) {
    itemContent = name + " ✅";
  }

  return (
    <li className="item">
      {itemContent}
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

---

# Code Flow

শুরুতে:

```jsx
let itemContent = name;
```

প্রত্যেক item-এর default content হবে তার নাম।

যদি:

```jsx
isPacked === true
```

তাহলে:

```jsx
itemContent = name + " ✅";
```

এরপর:

```jsx
{itemContent}
```

এর মাধ্যমে calculate করা content JSX-এর মধ্যে দেখানো হয়।

---

# ১২. Variable-এ JSX Element রাখা

Variable-এ শুধু text নয়, সম্পূর্ণ JSX-ও রাখা যায়।

> **Documentation-এর মূল code**

### App.js

```jsx
function Item({ name, isPacked }) {
  let itemContent = name;

  if (isPacked) {
    itemContent = (
      <del>
        {name + " ✅"}
      </del>
    );
  }

  return (
    <li className="item">
      {itemContent}
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

## Code ব্যাখ্যা

Default value:

```jsx
let itemContent = name;
```

Packed হলে:

```jsx
itemContent = (
  <del>
    {name + " ✅"}
  </del>
);
```

অর্থাৎ `itemContent` variable কখনো string রাখছে, আবার কখনো JSX element রাখছে।

দুই ধরনের value-ই JSX-এর মধ্যে render করা যায়।

---

# ১৩. কোন পদ্ধতি কখন ব্যবহার করবেন?

React condition লেখার জন্য একাধিক পদ্ধতি দেয়।

## `if` এবং আলাদা `return`

যখন সম্পূর্ণ JSX tree পরিবর্তন হবে:

```jsx
if (isLoggedIn) {
  return <Dashboard />;
}

return <Login />;
```

## Ternary `? :`

True এবং false—দুই অবস্থাতেই আলাদা content প্রয়োজন হলে:

```jsx
{isLoggedIn ? <Dashboard /> : <Login />}
```

## Logical AND `&&`

শুধু true হলে কিছু দেখাতে চাইলে:

```jsx
{hasNotification && <Notification />}
```

## Variable এবং `if`

Condition জটিল হলে:

```jsx
let content = <DefaultContent />;

if (someCondition) {
  content = <SpecialContent />;
}

return <div>{content}</div>;
```

Documentation অনুযায়ী, শুরুতে যেটি সহজ মনে হয় সেটি ব্যবহার করা যায়। প্রয়োজন অনুযায়ী অন্য পদ্ধতিতে যাওয়া যাবে।

---

# ১৪. একই সমস্যার চারটি সমাধান

ধরা যাক, `isPacked` true হলে ✅ দেখাতে হবে।

## পদ্ধতি ১: `if`

```jsx
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li>{name} ✅</li>;
  }

  return <li>{name}</li>;
}
```

## পদ্ধতি ২: Ternary

```jsx
function Item({ name, isPacked }) {
  return (
    <li>
      {isPacked ? name + " ✅" : name}
    </li>
  );
}
```

## পদ্ধতি ৩: Logical AND

```jsx
function Item({ name, isPacked }) {
  return (
    <li>
      {name} {isPacked && "✅"}
    </li>
  );
}
```

## পদ্ধতি ৪: Variable

```jsx
function Item({ name, isPacked }) {
  let itemContent = name;

  if (isPacked) {
    itemContent = name + " ✅";
  }

  return <li>{itemContent}</li>;
}
```

সবগুলো বৈধ।

কোনটি ব্যবহার করবেন তা নির্ভর করবে condition এবং JSX কতটা জটিল তার ওপর।

---

# Documentation-এর মূল সারাংশ

React-এ branching বা condition পরিচালনা করা হয় JavaScript দিয়ে।

`if` statement ব্যবহার করে condition অনুযায়ী আলাদা JSX return করা যায়।

```jsx
if (condition) {
  return <A />;
}

return <B />;
```

কিছুই render না করতে চাইলে:

```jsx
return null;
```

Ternary operator:

```jsx
{condition ? <A /> : <B />}
```

এর অর্থ:

```text
Condition true হলে <A />
False হলে <B />
```

Logical AND:

```jsx
{condition && <A />}
```

এর অর্থ:

```text
Condition true হলে <A />
False হলে কিছুই নয়
```

Variable-এ JSX রেখে পরে JSX-এর ভিতরে ব্যবহার করা যায়:

```jsx
let content = <A />;

if (condition) {
  content = <B />;
}

return <div>{content}</div>;
```

Shortcut ব্যবহার বাধ্যতামূলক নয়। সাধারণ `if` ব্যবহার করেও সব conditional logic লেখা যায়।

---

# গুরুত্বপূর্ণ সংজ্ঞা

## Conditional Rendering

Condition অনুযায়ী ভিন্ন UI বা JSX দেখানোর প্রক্রিয়াকে Conditional Rendering বলা হয়।

## Branching Logic

একটি condition-এর ফল অনুযায়ী code-এর ভিন্ন branch execute হওয়াকে branching logic বলা হয়।

## Ternary Operator

তিনটি অংশবিশিষ্ট JavaScript conditional expression:

```js
condition ? trueValue : falseValue
```

## Logical AND

বাম পাশ true হলে ডান পাশের value return করে:

```js
condition && value
```

## `null`

React Component থেকে `null` return করলে কিছুই render হয় না।

---

# গুরুত্বপূর্ণ প্রশ্ন ও উত্তর

## প্রশ্ন ১: Conditional Rendering কী?

Condition অনুযায়ী আলাদা JSX বা UI দেখানোর পদ্ধতিকে Conditional Rendering বলা হয়।

## প্রশ্ন ২: React-এ condition লেখার জন্য কী ব্যবহার করা হয়?

সাধারণ JavaScript syntax ব্যবহার করা হয়।

যেমন:

```js
if
```

```js
? :
```

```js
&&
```

## প্রশ্ন ৩: `if` statement দিয়ে কীভাবে JSX পরিবর্তন করা যায়?

```jsx
if (isPacked) {
  return <p>Packed</p>;
}

return <p>Not packed</p>;
```

## প্রশ্ন ৪: কিছুই render না করতে কী return করতে হয়?

```jsx
return null;
```

## প্রশ্ন ৫: Ternary operator-এর syntax কী?

```jsx
condition ? trueValue : falseValue
```

## প্রশ্ন ৬: Ternary কখন ব্যবহার করা ভালো?

True এবং false—দুই condition-এর জন্য আলাদা output প্রয়োজন হলে।

## প্রশ্ন ৭: `&&` কখন ব্যবহার করা হয়?

শুধু condition true হলে কিছু দেখাতে এবং false হলে কিছুই না দেখাতে।

```jsx
{isPacked && "✅"}
```

## প্রশ্ন ৮: `&&`-এর বাম পাশে সরাসরি number ব্যবহার করা বিপজ্জনক কেন?

কারণ value `0` হলে React screen-এ `0` render করতে পারে।

ভুল:

```jsx
{count && <p>Items</p>}
```

সঠিক:

```jsx
{count > 0 && <p>Items</p>}
```

## প্রশ্ন ৯: JSX কি variable-এ রাখা যায়?

হ্যাঁ।

```jsx
let content = <p>Hello</p>;
```

## প্রশ্ন ১০: React-এ conditional shortcut ব্যবহার করা কি বাধ্যতামূলক?

না। সাধারণ `if` statement ব্যবহার করা যায়।

---

# খুব সংক্ষিপ্ত Revision

```jsx
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li>{name} ✅</li>;
  }

  return <li>{name}</li>;
}
```

```jsx
{isPacked ? "Packed" : "Not packed"}
```

```jsx
{isPacked && "✅"}
```

```jsx
if (isPacked) {
  return null;
}
```

```jsx
let content = name;

if (isPacked) {
  content = name + " ✅";
}

return <li>{content}</li>;
```

মনে রাখবেন:

```text
if
→ আলাদা JSX return

null
→ কিছুই render নয়

? :
→ True ও false দুই ধরনের output

&&
→ True হলে content, false হলে কিছুই নয়

Variable
→ আগে JSX calculate করে পরে render
```

---

# Documentation-এর Challenge

Documentation-এ তিন ধরনের challenge দেওয়া হয়েছে:

1. Ternary ব্যবহার করে incomplete item-এর জন্য icon দেখানো
2. `&&` ব্যবহার করে item-এর importance দেখানো
3. একাধিক ternary-কে `if` এবং variable-এ refactor করা

প্রথম challenge-এ বলা হয়েছে, `isPacked` true না হলে ❌ দেখাতে হবে।

---

# কীভাবে Practice করবেন

## Documentation-এর বাইরে অতিরিক্ত Practice

> **নোট:** নিচের practice section মূল React documentation-এর অংশ নয়। শেখা বিষয়গুলো বাস্তবে অনুশীলনের জন্য এটি অতিরিক্তভাবে যোগ করা হয়েছে।

---

## ১. Basic Practice

প্রথমে নিচের code নিজে হাতে লিখুন।

> **অতিরিক্ত Practice Code — মূল documentation-এর অংশ নয়**

```jsx
function Status({ isOnline }) {
  if (isOnline) {
    return <p>Online</p>;
  }

  return <p>Offline</p>;
}

export default function App() {
  return (
    <div>
      <Status isOnline={true} />
      <Status isOnline={false} />
    </div>
  );
}
```

Expected output:

```text
Online
Offline
```

এরপর পরিবর্তন করুন:

```jsx
isOnline={true}
```

কে:

```jsx
isOnline={false}
```

দেখুন output কীভাবে পরিবর্তিত হয়।

---

## ২. Ternary Practice

> **অতিরিক্ত Practice Code — মূল documentation-এর অংশ নয়**

```jsx
function Result({ passed }) {
  return (
    <h2>
      {passed ? "You passed" : "You failed"}
    </h2>
  );
}

export default function App() {
  return <Result passed={true} />;
}
```

Practice:

* `passed={false}` করুন
* True হলে ✅ যোগ করুন
* False হলে ❌ যোগ করুন
* Text-এর পরিবর্তে আলাদা JSX element দেখান

---

## ৩. Logical AND Practice

> **অতিরিক্ত Practice Code — মূল documentation-এর অংশ নয়**

```jsx
function Notification({ hasMessage }) {
  return (
    <div>
      <h2>Inbox</h2>
      {hasMessage && <p>You have a new message.</p>}
    </div>
  );
}
```

Practice:

* `hasMessage={true}` দিয়ে run করুন
* `hasMessage={false}` দিয়ে run করুন
* একটি bell icon যোগ করুন
* Message না থাকলে কিছু না দেখিয়ে রাখুন

---

## ৪. Number Pitfall Practice

প্রথমে ভুল code run করুন:

> **অতিরিক্ত Practice Code — মূল documentation-এর অংশ নয়**

```jsx
function Cart({ itemCount }) {
  return (
    <div>
      {itemCount && <p>Cart has items</p>}
    </div>
  );
}

export default function App() {
  return <Cart itemCount={0} />;
}
```

দেখুন screen-এ `0` দেখা যাচ্ছে কি না।

এরপর ঠিক করুন:

```jsx
function Cart({ itemCount }) {
  return (
    <div>
      {itemCount > 0 && <p>Cart has items</p>}
    </div>
  );
}
```

---

## ৫. Bug Fixing Practice

### ভুল Code

> **অতিরিক্ত Practice Code — মূল documentation-এর অংশ নয়**

```jsx
function Product({ name, stock }) {
  return (
    <div>
      <h2>{name}</h2>
      {stock && <p>Available</p>}
    </div>
  );
}

export default function App() {
  return (
    <Product
      name="Keyboard"
      stock={0}
    />
  );
}
```

### প্রশ্ন

1. `stock` যদি `0` হয়, কী render হতে পারে?
2. কেন এমন হচ্ছে?
3. কীভাবে ঠিক করবেন?

### সমাধান

```jsx
function Product({ name, stock }) {
  return (
    <div>
      <h2>{name}</h2>
      {stock > 0 && <p>Available</p>}
    </div>
  );
}
```

---

## ৬. Beginner Challenge

একটি `UserStatus` Component তৈরি করুন।

Props:

```text
name
isLoggedIn
```

Expected output:

```text
Welcome, Rahim
```

অথবা:

```text
Please log in
```

Ternary operator ব্যবহার করুন।

### সম্ভাব্য সমাধান

```jsx
function UserStatus({ name, isLoggedIn }) {
  return (
    <h2>
      {isLoggedIn
        ? `Welcome, ${name}`
        : "Please log in"}
    </h2>
  );
}
```

---

## ৭. Intermediate Challenge

একটি `Product` Component তৈরি করুন।

Props:

```text
name
price
inStock
```

Rules:

* Product-এর নাম ও price সবসময় দেখাবে
* `inStock` true হলে “Buy Now” button দেখাবে
* False হলে “Out of Stock” দেখাবে

### সম্ভাব্য সমাধান

```jsx
function Product({ name, price, inStock }) {
  return (
    <article>
      <h2>{name}</h2>
      <p>${price}</p>

      {inStock ? (
        <button>Buy Now</button>
      ) : (
        <p>Out of Stock</p>
      )}
    </article>
  );
}
```

---

## ৮. একটু কঠিন Challenge

একটি `StudentResult` Component তৈরি করুন।

Props:

```text
name
score
```

Rules:

```text
80 বা বেশি
→ Excellent

60–79
→ Passed

60-এর কম
→ Failed
```

Nested ternary না ব্যবহার করে `if` এবং variable ব্যবহার করুন।

### সম্ভাব্য সমাধান

```jsx
function StudentResult({ name, score }) {
  let result;

  if (score >= 80) {
    result = "Excellent";
  } else if (score >= 60) {
    result = "Passed";
  } else {
    result = "Failed";
  }

  return (
    <div>
      <h2>{name}</h2>
      <p>Score: {score}</p>
      <p>Result: {result}</p>
    </div>
  );
}
```

---

## ৯. Mini Project: Task List

একটি ছোট task list তৈরি করুন।

প্রতিটি task-এর data:

```js
{
  id: 1,
  title: "Learn JSX",
  completed: true
}
```

Rules:

* Completed হলে ✅ দেখাবে
* Completed না হলে ❌ দেখাবে
* Completed task-এর title `<del>` দিয়ে কাটতে হবে

এই project-এ ব্যবহার হবে:

* Props
* Ternary operator
* Conditional JSX
* `&&`
* Component reuse

---

## ১০. Self-check Questions

1. Conditional Rendering কী?
2. React-এ condition কোন language দিয়ে পরিচালিত হয়?
3. `null` return করলে কী হয়?
4. Ternary operator-এর তিনটি অংশ কী?
5. `&&` false হলে React কী render করে?
6. `0 && <Component />` কেন সমস্যা করতে পারে?
7. `count &&`-এর পরিবর্তে কী লেখা ভালো?
8. JSX কি variable-এ রাখা যায়?
9. Ternary কখন ব্যবহার করা ভালো?
10. Complex conditional JSX পরিষ্কার করার একটি উপায় কী?
