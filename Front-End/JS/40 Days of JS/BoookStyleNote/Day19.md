# JavaScript Events Mastery  
## Event Handling, Bubbling, Capturing, Delegation, Custom Events ও Real-World Projects

> এটি কোনো summary বা short note নয়। এখানে Instructor-এর lecture flow, examples, code walkthrough, common mistakes, best practices, event propagation, custom event, FAQ project এবং assignment guidance বজায় রেখে বিষয়গুলোকে বাংলা programming book-এর পূর্ণাঙ্গ অধ্যায়ের মতো সাজানো হয়েছে।

---

# ১. ভূমিকা: Event ছাড়া Web Page Dynamic নয়

JavaScript দিয়ে web page dynamic করার অন্যতম প্রধান ভিত্তি হলো:

```text
Event
```

User যখন:

- Button click করে
- Input box-এ type করে
- Select box থেকে option নেয়
- Checkbox check করে
- Radio button select করে
- Form submit করে
- Mouse move করে
- Keyboard key press করে

তখন browser একটি signal তৈরি করে।

এই signal-ই event।

সহজ analogy:

কেউ তোমার দরজায় knock করল।

Knock হওয়াটা event।

তুমি দরজা খুলবে কি না, সেটি তোমার response।

JavaScript-এ এই response handle করা হয়:

```text
Event Handler
```

---

# ২. এই Lesson-এ আমরা কী শিখব

এই অধ্যায়ে শিখব:

1. Event কী
2. Browser event examples
3. Event handling in markup
4. Event handling in script
5. `onclick`
6. `addEventListener()`
7. `removeEventListener()`
8. Multiple event listeners
9. `DOMContentLoaded`
10. Event object
11. `target`
12. `currentTarget`
13. Event bubbling
14. Event capturing
15. Event delegation
16. `stopPropagation()`
17. `preventDefault()`
18. Custom events
19. `CustomEvent`
20. `dispatchEvent()`
21. FAQ project
22. Tab component assignment

---

# ৩. Event কী?

Event হলো browser-এ কিছু ঘটেছে—এমন একটি signal।

Examples:

```text
click
change
input
keyup
keydown
submit
mouseover
DOMContentLoaded
```

Event ঘটলে JavaScript developer সিদ্ধান্ত নেয়:

- Handle করবে কি না
- কী functionality execute হবে
- কোন data read করা হবে
- কোন UI change হবে

Event handle করার জন্য function লেখা হয়।

---

# ৪. Event Handling in Markup

HTML:

```html
<button
  id="my-button"
  onclick="handleClick()"
>
  Click Me
</button>
```

JavaScript:

```js
function handleClick() {
  console.log(
    "Button clicked"
  );
}
```

Button click করলে function execute হবে।

---

# ৫. Event Handler-এ Argument Pass করা

HTML:

```html
<button
  onclick="handleClick('Hello')"
>
  Click Me
</button>
```

JavaScript:

```js
function handleClick(greeting) {
  console.log(
    `Button clicked with ${greeting}`
  );
}
```

Important:

Outer attribute double quote হলে inner string single quote ব্যবহার করা convenient।

```html
onclick="handleClick('Hello')"
```

---

# ৬. Inline Event Naming Convention

HTML attribute technically case-insensitive হতে পারে:

```html
onclick
onClick
ONCLICK
```

তবে plain HTML convention:

```html
onclick
```

lowercase ব্যবহার করা।

---

# ৭. Event Handling in Script

HTML:

```html
<button id="my-button-two">
  Click Me Too
</button>
```

JavaScript:

```js
const buttonTwo =
  document.getElementById(
    "my-button-two"
  );

buttonTwo.onclick =
  function () {
    console.log(
      "My button two clicked"
    );
  };
```

এখানে event handler JavaScript file থেকে attach হয়েছে।

---

# ৮. `onclick` Property-এর Limitation

যদি একই element-এ `onclick` দুইবার assign করা হয়:

```js
buttonTwo.onclick =
  function () {
    console.log("First");
  };

buttonTwo.onclick =
  function () {
    console.log("Second");
  };
```

Second handler first handler overwrite করবে।

Click করলে শুধু:

```text
Second
```

print হবে।

---

# ৯. Named Function Reference

```js
function handleClick() {
  console.log("Clicked");
}

buttonTwo.onclick =
  handleClick;
```

Correct:

```js
handleClick
```

Wrong:

```js
handleClick()
```

কারণ:

```js
handleClick()
```

সঙ্গে সঙ্গে function execute করে এবং return value assign করে।

যদি function কিছু return না করে:

```text
undefined
```

assign হবে।

---

# ১০. Argument Pass করতে Wrapper Function

Wrong:

```js
buttonTwo.onclick =
  handleClick("Hola");
```

Correct:

```js
buttonTwo.onclick =
  function () {
    handleClick("Hola");
  };
```

Arrow function:

```js
buttonTwo.onclick =
  () => handleClick("Hola");
```

এখন click হওয়ার আগে function execute হবে না।

---

# ১১. `addEventListener()`

Better event handling approach:

```js
element.addEventListener(
  eventType,
  handler
);
```

Example:

```html
<button id="count-button">
  Count++
</button>
```

JavaScript:

```js
const countButton =
  document.getElementById(
    "count-button"
  );

let counter = 0;

countButton.addEventListener(
  "click",
  function () {
    console.log(counter);
    counter++;
  }
);
```

---

# ১২. `addEventListener()` Parameters

```js
element.addEventListener(
  type,
  listener,
  options
);
```

First:

```js
type
```

যেমন:

```text
click
change
submit
```

Second:

```js
listener
```

Event handler function।

Third:

```js
options
```

Optional।

Capturing, once, passive ইত্যাদির জন্য ব্যবহৃত হয়।

---

# ১৩. `removeEventListener()`

Event listener remove করতে:

```js
element.removeEventListener(
  type,
  listener
);
```

Example:

```js
function handleCount() {
  console.log(counter);
  counter++;
}

countButton.addEventListener(
  "click",
  handleCount
);

countButton.removeEventListener(
  "click",
  handleCount
);
```

এখন click handler remove হয়ে গেছে।

---

# ১৪. Common Mistake: Different Function Reference

Wrong:

```js
countButton.addEventListener(
  "click",
  function () {
    console.log("Count");
  }
);

countButton.removeEventListener(
  "click",
  function () {
    console.log("Count");
  }
);
```

দুটি function দেখতে same হলেও reference different।

তাই remove হবে না।

Correct:

```js
function handleCount() {
  console.log("Count");
}

countButton.addEventListener(
  "click",
  handleCount
);

countButton.removeEventListener(
  "click",
  handleCount
);
```

Same function reference প্রয়োজন।

---

# ১৫. কেন Listener Remove করা গুরুত্বপূর্ণ?

Unnecessary listener attached থাকলে:

- Memory usage বাড়তে পারে
- Duplicate behaviour হতে পারে
- Component cleanup সমস্যা হতে পারে
- Detached DOM reference থাকতে পারে
- Complex application-এ leak তৈরি হতে পারে

Lifecycle শেষ হলে cleanup করা ভালো practice।

---

# ১৬. Multiple Event Listeners

```js
function handleCount() {
  console.log(counter);
  counter++;
}

function greetMe() {
  console.log("Thank you");
}

countButton.addEventListener(
  "click",
  handleCount
);

countButton.addEventListener(
  "click",
  greetMe
);
```

Click করলে দুটিই execute হবে:

```text
0
Thank you
```

পরের click:

```text
1
Thank you
```

---

# ১৭. Selective Listener Removal

```js
countButton.removeEventListener(
  "click",
  handleCount
);
```

এখন:

- `handleCount` remove
- `greetMe` থাকবে

Click করলে শুধু:

```text
Thank you
```

---

# ১৮. `DOMContentLoaded`

DOM content সম্পূর্ণ parse হওয়ার পরে event:

```text
DOMContentLoaded
```

Correct usage:

```js
document.addEventListener(
  "DOMContentLoaded",
  function () {
    console.log(
      "DOM content loaded"
    );
  }
);
```

Incorrect property style:

```js
document.onDOMContentLoaded =
  function () {};
```

এভাবে reliable নয়।

---

# ১৯. কেন `DOMContentLoaded` দরকার?

DOM load হওয়ার আগে element query করলে:

```js
document.getElementById(...)
```

result `null` হতে পারে।

`DOMContentLoaded` নিশ্চিত করে:

- HTML parsed
- DOM tree ready
- Elements query করা যাবে

---

# ২০. Event Object

প্রতিটি event handler একটি event object পেতে পারে।

```js
function handleChange(event) {
  console.log(event);
}
```

Listener:

```js
searchInput.addEventListener(
  "change",
  handleChange
);
```

Event object-এ থাকে:

- Event type
- Target
- Current target
- Bubbling state
- Default prevented state
- Timestamp
- Keyboard/mouse details
- অনেক metadata

---

# ২১. Change Event Example

HTML:

```html
<input
  type="text"
  id="search-id"
  name="search"
  placeholder="Search"
/>
```

JavaScript:

```js
const searchElem =
  document.getElementById(
    "search-id"
  );

searchElem.addEventListener(
  "change",
  handleChange
);

function handleChange(event) {
  console.log(event);
}
```

User type করে focus ছাড়লে change event fire হবে।

---

# ২২. `event.type`

```js
console.log(
  event.type
);
```

Output:

```text
change
```

---

# ২৩. `event.target`

Event যে element থেকে originate হয়েছে:

```js
event.target
```

এই example-এ input element।

---

# ২৪. Target Name এবং Value

```js
console.log(
  event.target.name
);

console.log(
  event.target.value
);
```

Output:

```text
search
test
```

---

# ২৫. `event.currentTarget`

```js
event.currentTarget
```

যে element-এ listener attach করা হয়েছে।

Simple case-এ:

```js
target === currentTarget
```

হতে পারে।

Delegation-এর ক্ষেত্রে তারা different হতে পারে।

---

# ২৬. `target` বনাম `currentTarget`

| Property | Meaning |
|---|---|
| `target` | Event যেখানে শুরু হয়েছে |
| `currentTarget` | Listener যে element-এ চলছে |

Event delegation বুঝতে এই difference খুব গুরুত্বপূর্ণ।

---

# ২৭. Handler Function-এর ভিতরে `this`

Regular function:

```js
function handleChange(event) {
  console.log(this);
}
```

`this` সাধারণত listener-attached element-কে refer করে।

```js
searchElem.addEventListener(
  "change",
  handleChange
);
```

এখানে `this` হবে `searchElem`।

Arrow function-এ lexical `this` হওয়ায় behaviour different।

---

# ২৮. Event Bubbling

HTML hierarchy:

```html
<div id="grandparent">
  <div id="parent">
    <button id="child">
      Click Me
    </button>
  </div>
</div>
```

Button click করলে event path:

```text
child
→ parent
→ grandparent
→ document
```

এটাই bubbling।

Event target থেকে ancestors-এর দিকে ওঠে।

---

# ২৯. Bubbling Demonstration

```js
document
  .getElementById(
    "grandparent"
  )
  .addEventListener(
    "click",
    () => {
      console.log(
        "Grandparent clicked"
      );
    }
  );

document
  .getElementById(
    "parent"
  )
  .addEventListener(
    "click",
    () => {
      console.log(
        "Parent clicked"
      );
    }
  );

document
  .getElementById(
    "child"
  )
  .addEventListener(
    "click",
    () => {
      console.log(
        "Child clicked"
      );
    }
  );
```

Child button click করলে output:

```text
Child clicked
Parent clicked
Grandparent clicked
```

---

# ৩০. Event Capturing

Capturing bubbling-এর বিপরীত direction।

Path:

```text
document
→ grandparent
→ parent
→ child
```

Capturing target phase-এর আগে ঘটে।

By default:

```text
Capturing disabled
Bubbling enabled
```

---

# ৩১. Capturing Enable করা

Third argument:

```js
true
```

Example:

```js
grandparent.addEventListener(
  "click",
  () => {
    console.log(
      "Captured at grandparent"
    );
  },
  true
);
```

Parent:

```js
parent.addEventListener(
  "click",
  () => {
    console.log(
      "Captured at parent"
    );
  },
  true
);
```

Child:

```js
child.addEventListener(
  "click",
  () => {
    console.log(
      "Captured at child"
    );
  },
  true
);
```

---
<img width="574" height="484" alt="image" src="https://github.com/user-attachments/assets/1567501b-0630-4fc9-851b-f3f3d3b624b3" />

# ৩২. Event Phases

Event flow-এর তিনটি phase:

1. Capture phase
2. Target phase
3. Bubble phase

Output conceptually:

```text
Captured at grandparent
Captured at parent
Captured at child
Child clicked
Parent clicked
Grandparent clicked
```

---

# ৩৩. Event Delegation

Event delegation হলো এমন একটি pattern যেখানে:

> প্রতিটি child element-এ আলাদা listener না দিয়ে parent element-এ একটি listener attach করা হয়।

এটি bubbling ব্যবহার করে।

---

# ৩৪. Delegation কেন দরকার?

Benefits:

- Less code
- Better maintainability
- Dynamic children automatically supported
- Fewer listeners
- Cleaner design
- Easier debugging

---

# ৩৫. Delegation Example

HTML:

```html
<ul id="item-list">
  <li>Item One</li>
  <li>Item Two</li>
  <li>Item Three</li>
</ul>
```

JavaScript:

```js
const itemList =
  document.getElementById(
    "item-list"
  );

itemList.addEventListener(
  "click",
  function (event) {
    if (
      event.target.tagName ===
      "LI"
    ) {
      console.log(
        `You clicked on ${
          event.target.textContent
        }`
      );
    }
  }
);
```

---

# ৩৬. Delegation-এর Dynamic Advantage

Later নতুন item add:

```html
<li>Item Four</li>
```

নতুন listener দরকার নেই।

Parent listener bubbling-এর মাধ্যমে click handle করবে।

---

# ৩৭. `tagName`

```js
event.target.tagName
```

Browser সাধারণত uppercase return করে:

```text
LI
BUTTON
DIV
```

তাই compare:

```js
event.target.tagName === "LI"
```

---

# ৩৮. Better Delegation with `closest()`

Nested markup থাকলে direct `target` child element হতে পারে।

Safer pattern:

```js
const item =
  event.target.closest("li");

if (
  !item ||
  !itemList.contains(item)
) {
  return;
}

console.log(
  item.textContent
);
```

এটি production code-এ useful।

---

# ৩৯. `stopPropagation()`

Event bubbling stop করতে:

```js
event.stopPropagation();
```

Example:

```html
<div id="father">
  <button id="son">
    Click Me
  </button>
</div>
```

JavaScript:

```js
father.addEventListener(
  "click",
  () => {
    console.log(
      "Parent clicked"
    );
  }
);

son.addEventListener(
  "click",
  event => {
    event.stopPropagation();

    console.log(
      "Child clicked"
    );
  }
);
```

Child click করলে শুধু:

```text
Child clicked
```

---

# ৪০. Propagation Stop কোথায় করবে?

যে level থেকে event আর উপরে যেতে দেওয়া হবে না, সেই handler-এ:

```js
event.stopPropagation();
```

ব্যবহার করতে হবে।

---

# ৪১. Default Browser Behaviour

কিছু element-এর built-in default action আছে।

Examples:

- Anchor click → Navigation
- Form submit → Page reload/action
- Checkbox click → Checked state
- Context menu → Browser menu
- Drag → Native drag behaviour

কখনও এগুলো prevent করতে হয়।

---

# ৪২. `preventDefault()`

Default action stop করতে:

```js
event.preventDefault();
```

Propagation এবং default prevention different।

---

# ৪৩. Anchor Default Prevent করা

HTML:

```html
<a
  href="https://example.com"
  id="website-link"
  target="_blank"
>
  Go to Website
</a>
```

JavaScript:

```js
const websiteLink =
  document.getElementById(
    "website-link"
  );

websiteLink.addEventListener(
  "click",
  event => {
    event.preventDefault();

    console.log(
      "Default link behaviour prevented"
    );
  }
);
```

এখন link navigate করবে না।

---

# ৪৪. Form Submission Prevent করা

HTML:

```html
<form id="login-form">
  <input
    type="text"
    required
  />

  <input
    type="password"
    required
  />

  <button type="submit">
    Login
  </button>
</form>
```

JavaScript:

```js
const loginForm =
  document.getElementById(
    "login-form"
  );

loginForm.addEventListener(
  "submit",
  event => {
    event.preventDefault();

    console.log(
      "Form submission prevented"
    );
  }
);
```

Important:

Form-এর event:

```text
submit
```

শুধু button `click` নয়।

---

# ৪৫. `stopPropagation()` বনাম `preventDefault()`

| Method | কী বন্ধ করে |
|---|---|
| `stopPropagation()` | Event ancestor-এ যাওয়া |
| `preventDefault()` | Browser-এর built-in action |

একটি অন্যটির বিকল্প নয়।

---

# ৪৬. Custom Events

Browser-provided events ছাড়াও নিজের event তৈরি করা যায়।

Use cases:

- User logged in
- Cart updated
- Theme changed
- Payment completed
- Data loaded
- Tab changed
- Notification received

---

# ৪৭. Custom Event-এর তিনটি Step

1. Create
2. Listen
3. Dispatch

---

# ৪৮. `CustomEvent`

```js
const myEvent =
  new CustomEvent(
    "userLoggedIn",
    {
      detail: {
        username:
          "tapascript",
        role:
          "admin"
      }
    }
  );
```

Event name:

```text
userLoggedIn
```

Payload:

```js
detail
```

---

# ৪৯. Custom Event Listen করা

```js
document.addEventListener(
  "userLoggedIn",
  event => {
    console.log(
      "User login detected"
    );

    console.log(
      event.detail.username
    );
  }
);
```

---

# ৫০. Custom Event Dispatch করা

```js
document.dispatchEvent(
  myEvent
);
```

এখন listener execute হবে।

---

# ৫১. Custom Event Mini Project

HTML:

```html
<p id="welcome">
  Welcome
</p>

<button
  onclick="loginUser('Tapas')"
>
  Login
</button>
```

JavaScript:

```js
function loginUser(username) {
  const event =
    new CustomEvent(
      "userLoggedIn",
      {
        detail: {
          username
        }
      }
    );

  document.dispatchEvent(
    event
  );
}
```

Listener:

```js
document.addEventListener(
  "userLoggedIn",
  event => {
    const user =
      event.detail.username;

    const welcome =
      document.getElementById(
        "welcome"
      );

    welcome.textContent =
      `Welcome, ${user}`;
  }
);
```

Click করলে:

```text
Welcome, Tapas
```

---

# ৫২. Custom Event Naming

Common conventions:

```text
userLoggedIn
cartUpdated
themeChanged
tabChanged
```

অথবা namespaced:

```text
app:user-logged-in
app:cart-updated
```

Namespacing বড় application-এ conflict কমায়।

---

# ৫৩. Project: FAQ Accordion

Features:

- Question click করলে answer show
- আবার click করলে hide
- Multiple answer খুলতে পারে
- Outside click করলে সব close
- Event delegation ব্যবহার
- Propagation control ব্যবহার

---

# ৫৪. FAQ HTML Structure

```html
<div class="faq">
  <div class="faq-item">
    <div class="question">
      What is JavaScript?
    </div>

    <div class="answer">
      JavaScript is a scripting
      language used to create
      dynamic content.
    </div>
  </div>

  <div class="faq-item">
    <div class="question">
      What is DOM?
    </div>

    <div class="answer">
      DOM represents the page
      structure.
    </div>
  </div>

  <div class="faq-item">
    <div class="question">
      What is 40 Days of JavaScript?
    </div>

    <div class="answer">
      It is a learning initiative
      focused on fundamentals
      and projects.
    </div>
  </div>
</div>
```

---

# ৫৫. FAQ CSS

```css
.answer {
  display: none;
}

.answer.show {
  display: block;
}
```

---

# ৫৬. Parent-Level Listener

```js
const faq =
  document.querySelector(
    ".faq"
  );

faq.addEventListener(
  "click",
  function (event) {
    // logic
  }
);
```

প্রতিটি question-এ listener add করা হয়নি।

এটাই delegation।

---

# ৫৭. Question Click Detect করা

```js
if (
  event.target.classList.contains(
    "question"
  )
) {
  // handle
}
```

---

# ৫৮. Current FAQ Item

```js
const currentItem =
  event.target.parentElement;
```

Question-এর parent হলো `.faq-item`।

---

# ৫৯. Current Answer Select করা

```js
const currentAnswer =
  currentItem.querySelector(
    ".answer"
  );
```

---

# ৬০. Toggle Answer

```js
currentAnswer.classList.toggle(
  "show"
);
```

---

# ৬১. FAQ Delegation Handler

```js
faq.addEventListener(
  "click",
  function (event) {
    if (
      event.target.classList.contains(
        "question"
      )
    ) {
      event.stopPropagation();

      const currentItem =
        event.target.parentElement;

      const currentAnswer =
        currentItem.querySelector(
          ".answer"
        );

      currentAnswer.classList.toggle(
        "show"
      );
    }
  }
);
```

---

# ৬২. Outside Click-এ সব Close

Document listener:

```js
document.addEventListener(
  "click",
  function () {
    const answers =
      document.querySelectorAll(
        ".answer.show"
      );

    answers.forEach(
      answer => {
        answer.classList.remove(
          "show"
        );
      }
    );
  }
);
```

---

# ৬৩. কেন `stopPropagation()` দরকার?

FAQ-এর question click event bubble হয়ে document listener-এ গেলে:

1. Answer show হবে
2. সঙ্গে সঙ্গে document handler চলবে
3. `show` remove হবে
4. Answer দেখা যাবে না

তাই question handler-এ:

```js
event.stopPropagation();
```

দেওয়া হয়েছে।

---

# ৬৪. FAQ Project Full Logic

```js
const faq =
  document.querySelector(
    ".faq"
  );

faq.addEventListener(
  "click",
  function (event) {
    if (
      !event.target.classList
        .contains("question")
    ) {
      return;
    }

    event.stopPropagation();

    const currentItem =
      event.target.parentElement;

    const currentAnswer =
      currentItem.querySelector(
        ".answer"
      );

    currentAnswer.classList.toggle(
      "show"
    );
  }
);

document.addEventListener(
  "click",
  function () {
    const openedAnswers =
      document.querySelectorAll(
        ".answer.show"
      );

    openedAnswers.forEach(
      answer => {
        answer.classList.remove(
          "show"
        );
      }
    );
  }
);
```

---

# ৬৫. FAQ Structure Dynamically তৈরি করার Idea

Static HTML-এর বদলে:

```js
const faqData = [
  {
    question:
      "What is JavaScript?",
    answer:
      "JavaScript is..."
  },
  {
    question:
      "What is DOM?",
    answer:
      "DOM is..."
  }
];
```

Loop করে elements create করা যায়।

এতে নতুন FAQ add করতে HTML touch করতে হয় না।

---

# ৬৬. Assignment: Accessible Tabs Component

একটি clean এবং accessible tab interface তৈরি করতে হবে।

Use cases:

- Dashboard
- Profile
- Settings
- Pricing plans
- Product details

---

# ৬৭. Tab Requirements

1. Tab title click করলে corresponding content show
2. একবারে শুধু একটি content visible
3. Active tab visibly different
4. Keyboard shortcuts:
   - `1` → First tab
   - `2` → Second tab
   - `3` → Third tab
5. Event delegation ব্যবহার
6. `classList` দিয়ে active state
7. Custom event dispatch
8. প্রয়োজন হলে `stopPropagation()`
9. Keyboard-accessible হতে হবে

---

# ৬৮. Suggested Tab Structure

```html
<div class="tabs">
  <div
    class="tab-list"
    role="tablist"
  >
    <button
      class="tab active"
      data-tab="dashboard"
      role="tab"
    >
      Dashboard
    </button>

    <button
      class="tab"
      data-tab="profile"
      role="tab"
    >
      Profile
    </button>

    <button
      class="tab"
      data-tab="settings"
      role="tab"
    >
      Settings
    </button>
  </div>

  <div
    class="tab-panel active"
    data-panel="dashboard"
  >
    Dashboard content
  </div>

  <div
    class="tab-panel"
    data-panel="profile"
  >
    Profile content
  </div>

  <div
    class="tab-panel"
    data-panel="settings"
  >
    Settings content
  </div>
</div>
```

---

# ৬৯. Suggested Delegation Logic

```js
const tabList =
  document.querySelector(
    ".tab-list"
  );

tabList.addEventListener(
  "click",
  event => {
    const tab =
      event.target.closest(
        ".tab"
      );

    if (!tab) {
      return;
    }

    activateTab(
      tab.dataset.tab
    );
  }
);
```

---

# ৭০. Suggested Active State Logic

```js
function activateTab(tabName) {
  const tabs =
    document.querySelectorAll(
      ".tab"
    );

  const panels =
    document.querySelectorAll(
      ".tab-panel"
    );

  tabs.forEach(tab => {
    tab.classList.toggle(
      "active",
      tab.dataset.tab ===
        tabName
    );
  });

  panels.forEach(panel => {
    panel.classList.toggle(
      "active",
      panel.dataset.panel ===
        tabName
    );
  });
}
```

---

# ৭১. Keyboard Shortcut Logic

```js
document.addEventListener(
  "keydown",
  event => {
    const map = {
      1: "dashboard",
      2: "profile",
      3: "settings"
    };

    const tabName =
      map[event.key];

    if (tabName) {
      activateTab(tabName);
    }
  }
);
```

---

# ৭২. Custom Tab Change Event

```js
const tabChangedEvent =
  new CustomEvent(
    "tabChanged",
    {
      detail: {
        tabName
      }
    }
  );

document.dispatchEvent(
  tabChangedEvent
);
```

Listener:

```js
document.addEventListener(
  "tabChanged",
  event => {
    console.log(
      "Active tab:",
      event.detail.tabName
    );
  }
);
```

---

# ৭৩. Accessibility Considerations

Accessible tab component-এ:

- `role="tablist"`
- `role="tab"`
- `role="tabpanel"`
- `aria-selected`
- `aria-controls`
- Keyboard navigation

ব্যবহার করা উচিত।

Assignment-এ অন্তত keyboard shortcut দেওয়া আবশ্যক।

---

# ৭৪. Common Event Mistakes

## Mistake 1: Function Call এবং Reference গুলিয়ে ফেলা

Wrong:

```js
button.onclick =
  handleClick();
```

Correct:

```js
button.onclick =
  handleClick;
```

---

## Mistake 2: Anonymous Function Remove করতে চাওয়া

Same reference না থাকলে listener remove হয় না।

---

## Mistake 3: `onclick` দিয়ে Multiple Handler আশা

Latest assignment previous overwrite করে।

---

## Mistake 4: Form-এ শুধু Button Click Handle করা

Form logic:

```text
submit
```

event-এ করা ভালো।

---

## Mistake 5: `target` ও `currentTarget` গুলিয়ে ফেলা

Delegation-এ difference গুরুত্বপূর্ণ।

---

## Mistake 6: Unnecessary `stopPropagation()`

সব জায়গায় propagation stop করলে delegation ও parent behaviour break হতে পারে।

শুধু প্রয়োজন হলে ব্যবহার করো।

---

## Mistake 7: `preventDefault()` দিয়ে Bubbling Stop হবে ভাবা

হবে না।

---

## Mistake 8: Every Child-এ Listener

Delegation সম্ভব হলে parent listener cleaner।

---

## Mistake 9: `tagName` Lowercase Compare

Browser uppercase return করতে পারে।

---

## Mistake 10: DOM Ready হওয়ার আগে Query

Script loading strategy বা `DOMContentLoaded` ব্যবহার করো।

---

# ৭৫. Best Practices

- Prefer `addEventListener()`
- Named handler রাখো, যদি remove করতে হয়
- Event delegation ব্যবহার করো
- `target` validate করো
- Form-এ `submit` event handle করো
- Untrusted behaviour prevent করার আগে requirement বোঝো
- Cleanup করো
- Custom event names clear রাখো
- Accessibility বিবেচনা করো
- Project দিয়ে practice করো

---

# ৭৬. Practice Tasks

## Task 1

Markup `onclick` দিয়ে button click handle করো।

## Task 2

Script property দিয়ে event attach করো।

## Task 3

Same button-এ দুইটি `addEventListener()` attach করো।

## Task 4

Named handler remove করো।

## Task 5

`DOMContentLoaded` log করো।

## Task 6

Event object-এর:

```js
type
target
currentTarget
```

print করো।

## Task 7

Bubbling hierarchy তৈরি করো।

## Task 8

Capturing enable করো।

## Task 9

List delegation তৈরি করো।

## Task 10

Child click-এ propagation stop করো।

## Task 11

Anchor default prevent করো।

## Task 12

Form submit prevent করো।

## Task 13

Custom event তৈরি করো।

## Task 14

FAQ project recreate করো।

## Task 15

Accessible tab assignment complete করো।

---

# ৭৭. Interview Questions

1. Event কী?
2. Event handler কী?
3. Inline event handling কী?
4. `onclick` এবং `addEventListener()` পার্থক্য কী?
5. Multiple listeners কীভাবে attach করা যায়?
6. `removeEventListener()` কেন same function reference চায়?
7. `DOMContentLoaded` কী?
8. Event object কী?
9. `target` এবং `currentTarget` পার্থক্য কী?
10. Bubbling কী?
11. Capturing কী?
12. Event phases কী?
13. Delegation কী?
14. Delegation-এর সুবিধা কী?
15. `stopPropagation()` কী করে?
16. `preventDefault()` কী করে?
17. Form submit event কেন ব্যবহার করা উচিত?
18. Custom event কী?
19. `CustomEvent`-এর `detail` কী?
20. `dispatchEvent()` কী করে?
21. FAQ project-এ propagation stop কেন দরকার?
22. Tabs component-এ custom event কীভাবে useful?

---

# ৭৮. Final Recap

এই chapter-এ আমরা শিখেছি:

- Event browser-এর signal
- Event handler সেই signal-এর response
- Markup থেকে event handle করা যায়
- Script property দিয়ে handler attach করা যায়
- `onclick` previous handler overwrite করে
- `addEventListener()` multiple handler allow করে
- `removeEventListener()` same function reference চায়
- `DOMContentLoaded` DOM ready হওয়ার signal
- Event object-এ useful metadata থাকে
- `target` event origin
- `currentTarget` listener-attached element
- Bubbling target থেকে ancestor-এর দিকে যায়
- Capturing ancestor থেকে target-এর দিকে যায়
- Delegation parent listener দিয়ে children handle করে
- `stopPropagation()` event path stop করে
- `preventDefault()` browser default action বন্ধ করে
- Custom events application-specific signal তৈরি করে
- `detail` দিয়ে data pass করা যায়
- `dispatchEvent()` custom event trigger করে
- FAQ project delegation ও propagation ব্যবহার করে
- Tab assignment events, classes, keyboard এবং custom event combine করে

সবচেয়ে গুরুত্বপূর্ণ কথা:

> Event বুঝতে পারা মানে শুধু click handle করা নয়; browser-এর event flow, target, propagation, default behaviour এবং scalable event architecture বোঝা।

এই foundation শক্ত হলে complex interactive JavaScript application তৈরি করা অনেক সহজ হবে।
