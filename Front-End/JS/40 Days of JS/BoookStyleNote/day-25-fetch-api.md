# Day 25: JavaScript `fetch()` API — সম্পূর্ণ ব্যবহার, Request, Response, Error Handling ও Request বাতিল করা

## ভূমিকা

হ্যালো বন্ধুরা, কেমন আছো? **40 Days of JavaScript** সিরিজের Day 25-এ তোমাদের আবারও স্বাগতম।

আজ আমরা JavaScript-এর অত্যন্ত গুরুত্বপূর্ণ একটি বিষয় শিখব—**Fetch API**। JavaScript ভালোভাবে শিখে বাস্তব project বানাতে চাইলে `fetch()` API জানা বাধ্যতামূলক। শুধু plain JavaScript নয়, ভবিষ্যতে তুমি `React`, `Vue` বা অন্য কোনো library কিংবা framework ব্যবহার করলেও যখনই server থেকে data এনে UI-তে দেখাতে হবে, নতুন data তৈরি করতে হবে, update করতে হবে অথবা delete করতে হবে, তখনই কোনো না কোনোভাবে Fetch API বা একই ধরনের network API ব্যবহার করতে হবে।

আজ আমরা শুধু theory দেখব না। প্রচুর example, code walkthrough, task এবং assignment-এর মাধ্যমে বিষয়টি গভীরভাবে বুঝব।

**40 Days of JavaScript** আমার কাছে শুধু একটি playlist নয়; এটি একটি আবেগ। এই উদ্যোগের উদ্দেশ্য হলো beginner, mid-level programmer এবং senior—সবার JavaScript foundation এত শক্ত করা, যেন তারা ভবিষ্যতে JavaScript-ভিত্তিক যেকোনো technology আত্মবিশ্বাসের সঙ্গে শিখতে ও ব্যবহার করতে পারে।

তুমি যদি এই সিরিজে নতুন হও, শুরু থেকে শেখা শুরু করো। আশা করি পুরো journey তোমার ভালো লাগবে।

---

## আজ আমরা কী কী শিখব

আমি নিজেও MDN Web Docs-এর ভক্ত। Fetch API নিয়ে MDN-এ খুব শক্তিশালী documentation ও tutorial রয়েছে। আমিও Fetch API গভীরভাবে শেখার সময় MDN থেকে অনেক কিছু শিখেছি। তবে beginner হিসেবে MDN-এর কিছু explanation প্রথমে কঠিন মনে হতে পারে। তাই আজ আমরা বিষয়গুলোকে ছোট, অর্থপূর্ণ ও ধারাবাহিক অংশে ভেঙে শিখব।

আজকের lesson-এ আমরা দেখব:

1. `fetch()` API কী
2. `fetch()` syntax
3. `async/await` দিয়ে `fetch()` ব্যবহার
4. HTTP methods
5. `GET` দিয়ে resource আনা
6. Query parameter ব্যবহার
7. `POST` দিয়ে resource তৈরি
8. Custom header পাঠানো
9. `PUT` দিয়ে সম্পূর্ণ resource update
10. `PATCH` দিয়ে resource-এর আংশিক অংশ update
11. `DELETE` দিয়ে resource মুছে ফেলা
12. `Request` object তৈরি এবং কেন এটি দরকার
13. Response handle করা
14. Error handle করা
15. Fetch request cancel করা
16. Task এবং assignment

Promise-এর lesson-এ আমরা প্রশ্ন করেছিলাম: **Promise কি cancel করা যায়?** সেখানে বলা হয়েছিল, promise নিজে cancel করা যায় না; কিন্তু যে operation promise-টি তৈরি করেছে, সেটি কখনো কখনো cancel করা যায়। আজ Fetch API-এর মাধ্যমে আমরা বাস্তবে request cancel করা দেখব।

---

# ১. `fetch()` API কী

`fetch()` হলো JavaScript প্রদত্ত একটি API।

API-এর পূর্ণরূপ:

> **Application Programming Interface**

একটি API সাধারণত কোনো feature বা use case-এর low-level complexity আড়াল করে এবং developer-কে high-level function দেয়। ফলে developer-কে নিচের স্তরের implementation নিয়ে চিন্তা না করে সরাসরি প্রয়োজনীয় কাজ করতে দেওয়া হয়।

## Client এবং Server

Promise lesson-এ আমরা `consumer` এবং `service provider` নিয়ে আলোচনা করেছিলাম।

- `consumer`-কে আরেকভাবে বলা হয় **client**
- `service provider`-কে আরেকভাবে বলা হয় **server**

ধরো, server-এর কাছে কিছু information বা resource আছে।

## Resource কী

Resource হতে পারে:

- user data
- account data
- department data
- employee data
- কোনো file
- post
- comment
- profile
- image
- document
- অন্য যেকোনো digital information

Client হিসেবে এই resource সরাসরি তোমার কাছে নাও থাকতে পারে। Resource network-এর অন্য পাশে কোনো server-এ সংরক্ষিত থাকতে পারে।

তখন client হিসেবে তুমি resource-এর ওপর বিভিন্ন operation করতে চাইতে পারো:

- resource fetch বা retrieve করা
- নতুন resource তৈরি করা
- resource update করা
- resource-এর একটি অংশ update করা
- resource delete করা

## AJAX, XMLHttpRequest এবং Fetch API

কয়েক দশক আগে browser-based JavaScript-এ network communication-এর জন্য AJAX এবং `XMLHttpRequest` ব্যবহৃত হতো।

`XMLHttpRequest` ব্যবহার করে asynchronous call করা এবং server-এর resource-এর ওপর operation চালানো সম্ভব ছিল। তবে এর syntax ও usage-এর কিছু limitation এবং complexity ছিল।

পরবর্তীতে JavaScript একটি আধুনিক API দেয়—**Fetch API**। এটি network request পরিচালনাকে অনেক বেশি পরিষ্কার, promise-based এবং developer-friendly করে।

---

# ২. Fetch API বোঝার জন্য তিনটি মূল শব্দ

Fetch API নিয়ে কাজ করার সময় তিনটি term সবসময় মনে রাখবে:

1. URL
2. Request
3. Response

## ২.১ URL বা URI

URL বা URI হলো কোনো resource-এর location বা identifier-এর string representation।

Resource কোনো server-এ থাকতে পারে। Server-এর IP address, domain এবং path-এর মাধ্যমে সেই resource-এ পৌঁছানো যায়।

উদাহরণ:

```text
http://localhost:3000/posts
```

এখানে:

- `http://localhost:3000` server নির্দেশ করছে
- `/posts` resource path নির্দেশ করছে

অর্থাৎ URL আমাদের বলে দেয় resource কোথায় আছে বা কীভাবে সেটি locate করা যাবে।

## ২.২ Request

Client যখন resource-এর ওপর কিছু করতে চায়, তখন server-এর কাছে একটি request পাঠায়।

যেমন:

- post-এর data চাই
- নতুন post তৈরি করতে চাই
- post update করতে চাই
- post delete করতে চাই

Request-এর মধ্যে থাকতে পারে:

- URL
- HTTP method
- headers
- body
- query parameters
- authentication information

## ২.৩ Response

Server request process করার পর client-কে response পাঠায়।

Response জানায়:

- operation সফল হয়েছে কি না
- status code কী
- response data কী
- error ঘটলে error-এর কারণ কী
- response-এর content type কী

Fetch API শেখার সময় URL, request এবং response—এই তিনটির সম্পর্ক পরিষ্কারভাবে বোঝা অত্যন্ত জরুরি।

---

# ৩. `fetch()` API-এর মৌলিক Syntax

`fetch` একটি function।

এটি অন্তত একটি mandatory argument নেয়:

- URL

এটি চাইলে একটি optional second argument নিতে পারে:

- options object

মৌলিক syntax:

```js
fetch(url, options);
```

`fetch()` একটি `Promise` return করে।

Promise resolve হলে আমরা একটি `Response` object পাই।

```js
fetch(url, options)
  .then((response) => {
    // response object
  });
```

## Response object থেকে data নেওয়া

`Response` object-এর মধ্যে request-এর result সম্পর্কিত বহু তথ্য থাকে:

- request সফল হয়েছে কি না
- status code
- headers
- body
- returned content

কিন্তু বেশিরভাগ ক্ষেত্রে আমাদের মূল আগ্রহ থাকে response data-তে।

Server বিভিন্ন format-এ data পাঠাতে পারে:

- plain text
- JSON
- Blob
- stream
- ArrayBuffer
- FormData

Web application-এ সবচেয়ে প্রচলিত format হলো JSON।

Response থেকে JSON data নিতে আমরা লিখি:

```js
response.json();
```

এখানে একটি গুরুত্বপূর্ণ বিষয় মনে রাখবে:

> `response.json()` সরাসরি parsed JSON data দেয় না। এটি আরেকটি `Promise` return করে।

তাই সেটিকেও resolve করতে হয়।

```js
fetch(url, options)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
```

এখানে flow হলো:

1. `fetch()` request পাঠায়
2. `fetch()` একটি promise return করে
3. প্রথম `.then()`-এ `Response` object পাওয়া যায়
4. `response.json()` আরেকটি promise return করে
5. দ্বিতীয় `.then()`-এ actual parsed data পাওয়া যায়
6. data দিয়ে UI update, DOM manipulation বা অন্য কাজ করা যায়

## Error handle করা

Network request বা data parsing-এর সময় error হতে পারে। তাই `.catch()` ব্যবহার করা দরকার।

```js
fetch(url, options)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
```

এটাই promise-based Fetch API-এর basic syntax।

---

# ৪. `async/await` দিয়ে `fetch()` ব্যবহার

Promise-এর `.then()` এবং `.catch()` syntax কাজ করে, তবে code কিছুটা verbose হতে পারে। `async/await` ব্যবহার করলে flow আরও সরল ও sequential দেখায়।

Promise-based code থেকে `async/await` version তৈরি করি।

## ধাপ ১: `fetch()`-এর response নেওয়া

`fetch()` promise return করে। তাই সামনে `await` দিতে হবে।

```js
const response = await fetch(url, options);
```

## ধাপ ২: JSON data parse করা

`response.json()`-ও promise return করে। তাই এখানেও `await` লাগবে।

```js
const data = await response.json();
```

## ধাপ ৩: Data ব্যবহার করা

```js
console.log(data);
```

## ধাপ ৪: Error handle করা

`async/await`-এর সঙ্গে traditional `try...catch` ব্যবহার করা যায়।

```js
try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

## ধাপ ৫: Code-কে `async function`-এর মধ্যে রাখা

`await` সাধারণত `async function`-এর মধ্যে ব্যবহার করতে হয়।

```js
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

এখন function-টি reusable হয়েছে।

```js
fetchData("http://localhost:3000/posts");
```

এই function:

1. argument হিসেবে URL নেয়
2. URL-এ fetch call করে
3. response নেয়
4. JSON parse করে
5. data log করে
6. error হলে catch করে

এই lesson-এর পরবর্তী example-গুলোতে আমরা প্রধানত `async/await` syntax ব্যবহার করব। তবে পুরোনো codebase-এ `.then()` এবং `.catch()` syntax দেখতে পারো, তাই দুটিই জানা দরকার।

---

# ৫. HTTP Methods

এখানে আমরা সব HTTP method-এর theory আবার শিখব না। HTTP methods-এর জন্য আলাদা lesson রয়েছে।

আজ Fetch API-এর সঙ্গে পাঁচটি প্রচলিত HTTP method ব্যবহার করব:

| Method | কাজ |
|---|---|
| `GET` | resource retrieve করা |
| `POST` | নতুন resource তৈরি করা |
| `PUT` | সম্পূর্ণ resource replace বা update করা |
| `PATCH` | resource-এর আংশিক অংশ update করা |
| `DELETE` | resource delete করা |

অন্যান্য method যেমন `OPTIONS`, `TRACE`, `CONNECT`-ও রয়েছে, তবে সাধারণ frontend application-এ উপরের পাঁচটি method সবচেয়ে বেশি ব্যবহৃত হয়।

---

# ৬. Example API Resources

Fetch API শেখার জন্য তিনটি resource ধরা হয়েছে:

## Posts

```text
http://localhost:3000/posts
```

প্রতিটি post-এ থাকতে পারে:

```json
{
  "id": "1",
  "title": "40 Days of JavaScript",
  "views": 160
}
```

## Comments

```text
http://localhost:3000/comments
```

প্রতিটি comment-এ থাকতে পারে:

```json
{
  "id": "1",
  "text": "Great post!",
  "postId": "1"
}
```

এখানে `postId` বলে দেয় comment-টি কোন post-এর সঙ্গে সম্পর্কিত।

## Profile

```text
http://localhost:3000/profile
```

উদাহরণ:

```json
{
  "name": "tapascript"
}
```

এই resource-গুলো ব্যবহার করে আমরা Fetch API-এর বিভিন্ন operation বুঝব।

---

# ৭. `GET` দিয়ে Resource আনা

প্রথমে সব post fetch করব।

## Function তৈরি

Function-এর নাম meaningful হওয়া উচিত।

যেহেতু আমরা একাধিক post আনছি, তাই নাম রাখি:

```js
fetchPosts
```

সম্পূর্ণ code:

```js
async function fetchPosts() {
  const apiURL = "http://localhost:3000/posts";

  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

fetchPosts();
```

## Step-by-step reasoning

### ১. API URL নির্ধারণ

```js
const apiURL = "http://localhost:3000/posts";
```

এই URL uniquely `posts` resource নির্দেশ করছে।

### ২. `try...catch` ব্যবহার

```js
try {
  // network operation
} catch (error) {
  console.error(error);
}
```

Network operation error-prone। তাই শুরু থেকেই `try...catch` ব্যবহারকে অভ্যাসে পরিণত করা ভালো।

### ৩. Fetch call

```js
const response = await fetch(apiURL);
```

`fetch()` promise return করে। তাই `await` ব্যবহার করা হয়েছে।

### ৪. JSON parse

```js
const data = await response.json();
```

`response.json()`-ও promise return করে। তাই এখানেও `await` দরকার।

### ৫. Data দেখা

```js
console.log(data);
```

Expected output হতে পারে:

```js
[
  {
    id: "1",
    title: "40 Days of JavaScript",
    views: 160
  },
  {
    id: "2",
    title: "JavaScript Promises",
    views: 100
  }
]
```

## Default HTTP method

এখানে আমরা `options` object দিইনি।

```js
fetch(apiURL);
```

Fetch API-তে method explicitly না দিলে default method হলো:

```text
GET
```

অর্থাৎ নিচের দুটি conceptually একই:

```js
fetch(apiURL);
```

```js
fetch(apiURL, {
  method: "GET",
});
```

## Browser Network tab-এ কী দেখা যাবে

Request inspect করলে দেখা যেতে পারে:

```text
Request URL: http://localhost:3000/posts
Request Method: GET
Status Code: 200 OK
```

`200 OK` সাধারণত সফল `GET` request নির্দেশ করে।

Response tab-এ সেই JSON data দেখা যাবে, যেটি console-এ print করা হয়েছে।

---

# ৮. Query Parameters-সহ Fetch

`/posts` call করলে সব post পাওয়া যায়। কিন্তু সবসময় সব data দরকার হয় না।

কখনো নির্দিষ্ট condition অনুযায়ী resource filter করতে হয়। তখন query parameter ব্যবহার করা যায়।

## Views অনুযায়ী filter

উদাহরণ:

```text
http://localhost:3000/posts?views=160
```

এখানে:

- `?` query string শুরু করছে
- `views` key
- `160` value

Expected result:

```json
[
  {
    "id": "1",
    "title": "40 Days of JavaScript",
    "views": 160
  }
]
```

অন্য views-এর post return হবে না।

## Related comments embed করা

উদাহরণ:

```text
http://localhost:3000/posts?_embed=comments
```

এতে প্রতিটি post-এর সঙ্গে related comments embed হয়ে আসতে পারে।

Expected shape:

```json
[
  {
    "id": "1",
    "title": "40 Days of JavaScript",
    "views": 160,
    "comments": [
      {
        "id": "1",
        "text": "Great post!",
        "postId": "1"
      },
      {
        "id": "2",
        "text": "Very helpful!",
        "postId": "1"
      }
    ]
  },
  {
    "id": "2",
    "title": "JavaScript Promises",
    "views": 100,
    "comments": []
  }
]
```

প্রথম post-এর comment আছে, তাই array-তে comment এসেছে। দ্বিতীয় post-এর comment নেই, তাই empty array এসেছে।

---

## `URLSearchParams` ব্যবহার

Query string manually concatenate করা যায়, তবে JavaScript-এর `URLSearchParams` API ব্যবহার করলে code cleaner ও scalable হয়।

```js
async function fetchPostsWithComments() {
  const apiURL = "http://localhost:3000/posts";

  try {
    const queryParams = {
      _embed: "comments",
    };

    const queryString = new URLSearchParams(queryParams).toString();

    const url = `${apiURL}?${queryString}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

fetchPostsWithComments();
```

## Step-by-step reasoning

### ১. Base URL

```js
const apiURL = "http://localhost:3000/posts";
```

### ২. Query parameter object

```js
const queryParams = {
  _embed: "comments",
};
```

একাধিক parameter দিতে চাইলে:

```js
const queryParams = {
  _embed: "comments",
  views: 100,
};
```

### ৩. `URLSearchParams` instance তৈরি

```js
const queryString = new URLSearchParams(queryParams).toString();
```

Output:

```text
_embed=comments
```

একাধিক parameter থাকলে:

```text
_embed=comments&views=100
```

### ৪. Final URL তৈরি

```js
const url = `${apiURL}?${queryString}`;
```

Result:

```text
http://localhost:3000/posts?_embed=comments
```

### ৫. Fetch call

```js
const response = await fetch(url);
const data = await response.json();
```

Network tab-এ request URL হবে:

```text
http://localhost:3000/posts?_embed=comments
```

---

# ৯. `POST` দিয়ে নতুন Resource তৈরি

এখন আমরা একটি নতুন post তৈরি করব।

Resource তৈরি করার জন্য HTTP method:

```text
POST
```

## Function

```js
async function createPost(postData) {
  const apiURL = "http://localhost:3000/posts";

  try {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const result = await response.json();

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
```

## নতুন post data

```js
const newPost = {
  id: crypto.randomUUID(),
  title: "Learn Fetch API",
  views: 0,
};

createPost(newPost);
```

## Step-by-step reasoning

### ১. Resource URL

```js
const apiURL = "http://localhost:3000/posts";
```

নতুন post তৈরি করার সময় কোনো নির্দিষ্ট existing post ID লাগে না। আমরা শুধু collection resource `/posts` target করি।

### ২. Method নির্ধারণ

```js
method: "POST"
```

Fetch-এর default method `GET`, তাই create operation-এর জন্য method explicitly দিতে হবে।

### ৩. Content type header

```js
headers: {
  "Content-Type": "application/json",
}
```

Server-কে জানানো হচ্ছে request body JSON format-এ পাঠানো হয়েছে।

### ৪. Body পাঠানো

```js
body: JSON.stringify(postData)
```

Request body সাধারণত string বা supported body type হিসেবে পাঠাতে হয়। Plain JavaScript object সরাসরি পাঠানো যায় না। তাই object-কে JSON string-এ convert করা হয়েছে।

### ৫. Unique ID

```js
crypto.randomUUID()
```

এটি unique UUID তৈরি করতে সাহায্য করে।

Possible value:

```text
550e8400-e29b-41d4-a716-446655440000
```

### ৬. Response

Create operation সফল হলে server সাধারণত created resource return করতে পারে।

Expected response:

```json
{
  "id": "generated-uuid",
  "title": "Learn Fetch API",
  "views": 0
}
```

Network tab-এ status দেখা যেতে পারে:

```text
201 Created
```

`GET` request-এ সাধারণত সফল status `200 OK` দেখা যায়। নতুন resource create হলে `201 Created` বেশি উপযুক্ত success status।

## গুরুত্বপূর্ণ rule

`POST` request-এর জন্য মূলত তিনটি বিষয় মনে রাখবে:

```js
{
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
}
```

---

# ১০. Resource Update: `PUT` এবং `PATCH`

Resource update দুইভাবে করা যায়:

1. সম্পূর্ণ resource update বা replace
2. Resource-এর নির্দিষ্ট অংশ update

## `PUT`

সম্পূর্ণ resource update বা replace করতে সাধারণত `PUT` ব্যবহার করা হয়।

## `PATCH`

Resource-এর আংশিক অংশ update করতে সাধারণত `PATCH` ব্যবহার করা হয়।

---

## ১০.১ `PUT` দিয়ে সম্পূর্ণ Post Update

```js
async function updatePost(postId, postData) {
  const apiURL = `http://localhost:3000/posts/${postId}`;

  try {
    const response = await fetch(apiURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const result = await response.json();

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
```

Call:

```js
updatePost("1", {
  id: "1",
  title: "Complete Guide to Fetch API",
  views: 500,
});
```

## এখানে URL কেন বদলেছে

Create operation-এর সময় URL ছিল:

```text
http://localhost:3000/posts
```

Update operation-এর সময় URL:

```text
http://localhost:3000/posts/1
```

কারণ update করার জন্য নির্দিষ্ট resource uniquely identify করতে হয়।

`1` হলো post ID।

## `PUT` request options

```js
{
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(postData),
}
```

`POST` এবং `PUT` request-এর structure প্রায় একই। মূল পার্থক্য:

- method
- URL-এর specificity
- operation-এর উদ্দেশ্য

---

## ১০.২ `PATCH` দিয়ে Partial Update

ধরো, post-এর শুধু views update করতে চাই।

```js
async function patchPost(postId, partialData) {
  const apiURL = `http://localhost:3000/posts/${postId}`;

  try {
    const response = await fetch(apiURL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(partialData),
    });

    const result = await response.json();

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
```

Call:

```js
patchPost("1", {
  views: 600,
});
```

এখানে title পাঠানো হয়নি, কারণ আমরা শুধু views update করছি।

আরেকটি example:

```js
patchPost("1", {
  title: "Fetch API Deep Dive",
});
```

এখানে শুধু title update হবে।

---

## `PUT` বনাম `PATCH`

| বিষয় | `PUT` | `PATCH` |
|---|---|---|
| উদ্দেশ্য | সম্পূর্ণ resource update/replace | আংশিক update |
| Body | সাধারণত full resource data | শুধু পরিবর্তিত field |
| URL | নির্দিষ্ট resource URL | নির্দিষ্ট resource URL |
| উদাহরণ | title ও views দুটোই বদলানো | শুধু views বদলানো |

কিছু developer partial update-এর জন্যও `PUT` ব্যবহার করে। কিন্তু standard semantics অনুসরণ করতে চাইলে:

- সম্পূর্ণ resource replace → `PUT`
- নির্দিষ্ট field update → `PATCH`

এই rule মনে রাখো।

---

# ১১. `DELETE` দিয়ে Resource মুছে ফেলা

Resource delete করার সময়ও নির্দিষ্ট resource uniquely identify করতে হয়।

```js
async function deletePost(postId) {
  const apiURL = `http://localhost:3000/posts/${postId}`;

  try {
    const response = await fetch(apiURL, {
      method: "DELETE",
    });

    const result = await response.json();

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
```

Call:

```js
deletePost("1");
```

## Step-by-step reasoning

### ১. ID প্রয়োজন

```js
const apiURL = `http://localhost:3000/posts/${postId}`;
```

কোন post delete হবে, তা ID দ্বারা নির্ধারিত।

### ২. Method

```js
method: "DELETE"
```

### ৩. Header বা body কেন সবসময় লাগে না

Delete operation-এ সাধারণত server-কে আলাদা data পাঠাতে হয় না। URL-এই resource identify করা থাকে।

তাই basic delete request-এর জন্য শুধু method যথেষ্ট হতে পারে:

```js
fetch(apiURL, {
  method: "DELETE",
});
```

`POST`, `PUT` এবং `PATCH`-এ body দরকার হয়, কারণ server-কে নতুন বা পরিবর্তিত data জানাতে হয়। কিন্তু `DELETE`-এ target resource URL-এই নির্ধারিত থাকে।

## Technical Note

কিছু API সফল `DELETE` request-এ empty body এবং `204 No Content` return করে। সে ক্ষেত্রে সরাসরি `response.json()` call করলে parsing error হতে পারে। Instructor-এর demonstration-এ result parse করা হয়েছে, কারণ ব্যবহৃত server response body পাঠাচ্ছিল।

---

# ১২. Custom Headers

এখন পর্যন্ত আমরা একটি পরিচিত header দেখেছি:

```js
"Content-Type": "application/json"
```

কিন্তু বাস্তব application-এ আরও বিভিন্ন header প্রয়োজন হতে পারে।

## Authorization Header

Authentication ও authorization-এর ক্ষেত্রে token পাঠাতে হয়।

```js
Authorization: Bearer <token>
```

এটি server-কে জানাতে পারে:

- request কে পাঠিয়েছে
- user authenticated কি না
- user-এর permission আছে কি না

## Custom Header

নিজস্ব use case অনুযায়ী custom header পাঠানো যায়।

উদাহরণ:

```js
"X-Custom-Header": "Learn 40 Days of JS"
```

---

## Login Example

```js
async function login(username, password) {
  const apiURL = "http://localhost:3000/login";

  try {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer secret-token",
        "X-Custom-Header": "Learn 40 Days of JS",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const result = await response.json();

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
```

Call:

```js
login("tapascript", "hello");
```

Possible payload:

```json
{
  "username": "tapascript",
  "password": "hello"
}
```

Possible response:

```json
{
  "message": "Logged in successfully"
}
```

## Server-side header reading

Server-side code conceptually এমন হতে পারে:

```js
app.post("/login", (request, response) => {
  console.log(request.headers);
  console.log(request.body);

  response.json({
    message: "Logged in successfully",
  });
});
```

Server console-এ দেখা যেতে পারে:

```text
authorization: Bearer secret-token
x-custom-header: Learn 40 Days of JS
content-type: application/json
```

এতে প্রমাণ হয় client থেকে পাঠানো standard এবং custom header server পড়তে পারে।

## গুরুত্বপূর্ণ ব্যবহার

Custom header ব্যবহার হতে পারে:

- authentication
- authorization
- API version
- tracing ID
- request source
- feature flag
- locale
- custom metadata

তবে server এবং client—দুই পক্ষের contract অনুযায়ী header ব্যবহার করতে হবে।

---

# ১৩. `Request` Object তৈরি

এখন আমরা Fetch API-কে একটু নিচের স্তর থেকে দেখব।

এতক্ষণ আমরা লিখেছি:

```js
fetch(apiURL, options);
```

এই URL ও options মিলে আসলে একটি request-এর description তৈরি করছে।

JavaScript আমাদের `Request` নামে একটি constructor দেয়।

এর signature Fetch API-এর মতো:

```js
new Request(url, options);
```

অর্থাৎ URL এবং options আগে থেকেই দিয়ে একটি reusable `Request` object তৈরি করা যায়।

---

## প্রথম Request Object

```js
const apiURL = "http://localhost:3000/posts";

const request1 = new Request(apiURL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    id: crypto.randomUUID(),
    title: "How to Cancel a Request",
    views: 0,
  }),
});
```

এখন একটি generic function তৈরি করি:

```js
async function post(request) {
  try {
    const response = await fetch(request);
    const result = await response.json();

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
```

Call:

```js
post(request1);
```

## সুবিধা

এখন `post()` function-এর মধ্যে fixed URL বা fixed body hard-code করা নেই।

Function শুধু request গ্রহণ করছে এবং সেটি execute করছে।

ফলে:

- function ছোট থাকে
- condition বাইরে handle করা যায়
- reusable হয়
- request construction এবং request execution আলাদা হয়
- testing সহজ হয়
- code cleaner হয়

---

## Existing Request extend করা

ধরো, method, URL এবং header একই থাকবে। শুধু body বদলাতে হবে।

তখন আগের request-এর ওপর ভিত্তি করে নতুন request তৈরি করা যায়।

```js
const request2 = new Request(request1, {
  body: JSON.stringify({
    id: crypto.randomUUID(),
    title: "How to Parse a JSON File",
    views: 10,
  }),
});
```

তারপর:

```js
post(request2);
```

## কেন এটি useful

`request1`-এ ইতোমধ্যে ছিল:

- URL
- method
- headers

`request2` তৈরি করার সময় আমরা শুধু body override করেছি।

এতে একই configuration বারবার লিখতে হয়নি।

### পুনরাবৃত্ত version

```js
const request2 = new Request(apiURL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    id: crypto.randomUUID(),
    title: "How to Parse a JSON File",
    views: 10,
  }),
});
```

### Cleaner extended version

```js
const request2 = new Request(request1, {
  body: JSON.stringify({
    id: crypto.randomUUID(),
    title: "How to Parse a JSON File",
    views: 10,
  }),
});
```

দ্বিতীয় approach অনেক cleaner।

---

# ১৪. Response Handle করা

এতক্ষণ happy path দেখেছি:

```js
const response = await fetch(apiURL);
const data = await response.json();
```

কিন্তু real-world programming-এ সব request successful হয় না।

Response object পাওয়ার পর data parse করার আগে response validate করা উচিত।

---

## ১৪.১ `response.ok` পরীক্ষা

```js
async function fetchPosts() {
  const apiURL = "http://localhost:3000/posts";

  try {
    const response = await fetch(apiURL);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

## কেন এটি দরকার

Fetch API অনেক HTTP error status-এর ক্ষেত্রেও promise reject করে না।

যেমন server response দিতে পারে:

```text
404 Not Found
500 Internal Server Error
401 Unauthorized
403 Forbidden
```

Network request technically সম্পন্ন হয়েছে বলে `fetch()` resolve করতে পারে। তাই application-level success যাচাই করতে `response.ok` check করা দরকার।

`response.ok` সাধারণত status `200–299` range হলে `true` হয়।

## Expected behavior

যদি status `404` হয়:

```js
if (!response.ok) {
  throw new Error(`Response status: ${response.status}`);
}
```

Error message:

```text
Response status: 404
```

এই error `catch` block-এ যাবে।

---

## ১৪.২ Content Type পরীক্ষা

ধরো, আমরা JSON আশা করছি। কিন্তু server HTML বা plain text পাঠিয়েছে।

তখন `response.json()` error দিতে পারে।

তাই content type validate করা যায়।

```js
async function fetchPosts() {
  const apiURL = "http://localhost:3000/posts";

  try {
    const response = await fetch(apiURL);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("JSON response পাওয়া যায়নি");
    }

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

## Flow

1. Request সম্পন্ন হয়
2. `response.ok` check হয়
3. `content-type` header পড়া হয়
4. JSON না হলে `TypeError` throw হয়
5. সব validation pass করলে data parse হয়

এভাবে response handle করলে debugging এবং user feedback উন্নত হয়।

---

# ১৫. Error Handling

`async/await` ব্যবহার করার বড় সুবিধা হলো `try...catch` দিয়ে network এবং parsing logic একটি জায়গায় handle করা যায়।

```js
try {
  const response = await fetch(apiURL);

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const data = await response.json();

  console.log(data);
} catch (error) {
  console.error(error);
}
```

`catch` block-এ তুমি করতে পারো:

- console error log
- user-friendly message দেখানো
- toast notification
- retry option
- fallback UI
- monitoring service-এ error পাঠানো

উদাহরণ:

```js
catch (error) {
  console.error("Fetch failed:", error.message);
}
```

এই lesson জুড়ে আমরা error handling করে এসেছি। আলাদা কোনো জাদুকরী syntax নেই—consistent `try...catch`, response validation এবং meaningful error message-ই মূল বিষয়।

---

# ১৬. Fetch Request Cancel করা

এখন আজকের গুরুত্বপূর্ণ topic—request cancel করা।

## Promise কি cancel করা যায়

আগের lesson-এর recap:

> Promise নিজে cancel করা যায় না।

কিন্তু promise যে operation-এর কারণে তৈরি হয়েছে, সেই operation cancel করা যেতে পারে।

উদাহরণ:

- Fetch call promise return করে
- Promise cancel করা যায় না
- কিন্তু fetch request abort করা যায়

Fetch request cancel করার জন্য JavaScript দেয়:

```js
AbortController
```

---

# ১৭. File Download Demo

Request cancel বোঝার জন্য আমরা file download operation simulate করব।

## File structure

```text
download/
  file.txt
```

`file.txt` content:

```text
A dummy file
```

## HTML

```html
<div>
  <button id="download-btn">Download</button>
  <button id="abort-btn">Abort</button>
</div>
```

দুটি button:

- Download
- Abort

---

# ১৮. Download Button Access করা

```js
const downloadButton = document.getElementById("download-btn");
```

অথবা:

```js
const downloadButton = document.querySelector("#download-btn");
```

Click event listener:

```js
downloadButton.addEventListener("click", downloadFile);
```

এখানে `downloadFile` function define করতে হবে।

---

# ১৯. Basic File Fetch

```js
async function downloadFile() {
  const fileURL = "./download/file.txt";

  try {
    console.log("Downloading...");

    const response = await fetch(fileURL);

    console.log("Download complete");
  } catch (error) {
    console.error("Download error:", error.message);
  }
}
```

এখানে requestটি `GET`, তাই আলাদা options দরকার নেই।

---

# ২০. Response থেকে Blob তৈরি

File download-এর ক্ষেত্রে JSON নয়, `Blob` ব্যবহার করা যায়।

```js
const blob = await response.blob();
```

সম্পূর্ণ অংশ:

```js
async function downloadFile() {
  const fileURL = "./download/file.txt";

  try {
    console.log("Downloading...");

    const response = await fetch(fileURL);
    const blob = await response.blob();

    console.log("Download complete");
  } catch (error) {
    console.error("Download error:", error.message);
  }
}
```

---

# ২১. Object URL তৈরি

Blob থেকে temporary object URL তৈরি করা যায়।

```js
const objectURL = URL.createObjectURL(blob);
```

এটি browser memory-তে Blob-এর জন্য temporary URL তৈরি করে।

---

# ২২. Headless Anchor দিয়ে Download Trigger করা

আমরা page-এ visible anchor যোগ করব না। JavaScript দিয়ে একটি anchor তৈরি করে programmatically click করব।

```js
const link = document.createElement("a");

link.href = objectURL;
link.download = "file.txt";

link.click();
```

এখানে:

- `href` → Blob-এর object URL
- `download` → download file name
- `click()` → download trigger

Download শেষে object URL revoke করা ভালো practice:

```js
URL.revokeObjectURL(objectURL);
```

---

## Complete Download Code

```js
const downloadButton = document.getElementById("download-btn");

downloadButton.addEventListener("click", downloadFile);

async function downloadFile() {
  const fileURL = "./download/file.txt";

  try {
    console.log("Downloading...");

    const response = await fetch(fileURL);
    const blob = await response.blob();

    const objectURL = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = objectURL;
    link.download = "file.txt";

    link.click();

    URL.revokeObjectURL(objectURL);

    console.log("Download complete");
  } catch (error) {
    console.error("Download error:", error.message);
  }
}
```

Expected behavior:

1. Download button click
2. File fetch
3. Blob তৈরি
4. Object URL তৈরি
5. Invisible anchor click
6. File download dialog বা automatic download
7. Object URL revoke

---

# ২৩. Delay যোগ করে Abort Test করা

Local file এত দ্রুত load হয় যে Download click করার পর Abort button click করার আগেই download শেষ হয়ে যেতে পারে।

তাই demonstration-এর জন্য 2-second delay যোগ করা হয়েছে।

```js
setTimeout(async () => {
  const response = await fetch(fileURL);
  const blob = await response.blob();

  const objectURL = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = objectURL;
  link.download = "file.txt";

  link.click();

  URL.revokeObjectURL(objectURL);
}, 2000);
```

Callback-এর মধ্যে `await` ব্যবহার করা হচ্ছে, তাই callback-টিকেও `async` করা হয়েছে।

```js
setTimeout(async () => {
  // await can be used here
}, 2000);
```

এখন Download click করার পর প্রায় 2 second সময় পাওয়া যায় Abort button click করার জন্য।

## Technical Note

এই delay demo-র সুবিধার জন্য। Real network request-এ server delay, file size বা network speed স্বাভাবিকভাবেই সময় তৈরি করতে পারে।

---

# ২৪. `AbortController` দিয়ে Fetch Cancel

Fetch cancel করতে আমাদের প্রয়োজন:

1. একটি `AbortController`
2. Controller-এর `signal`
3. Fetch options-এ সেই signal
4. প্রয়োজনের সময় `controller.abort()`

---

## ২৪.১ Controller variable

```js
let controller;
```

এটি function-এর বাইরে রাখা হয়েছে, যেন Download handler এবং Abort handler—দুটিই access করতে পারে।

---

## ২৪.২ নতুন Controller তৈরি

Download শুরু হলে:

```js
controller = new AbortController();
```

## ২৪.৩ Signal নেওয়া

```js
const signal = controller.signal;
```

## ২৪.৪ Fetch-এর সঙ্গে signal যুক্ত করা

```js
const response = await fetch(fileURL, {
  signal,
});
```

এখন controller এবং fetch request signal-এর মাধ্যমে connected।

## ২৪.৫ Request abort করা

```js
controller.abort();
```

এটি signal পাঠাবে এবং সংশ্লিষ্ট fetch request abort হবে।

---

# ২৫. Abort Button

```js
const abortButton = document.getElementById("abort-btn");
```

Event listener:

```js
abortButton.addEventListener("click", () => {
  if (controller) {
    controller.abort("User aborted the download action");
    console.warn("Download aborted");
  }
});
```

Abort reason:

```js
"User aborted the download action"
```

Reason দেওয়া ভালো practice, কারণ debugging-এর সময় বোঝা যায় request কেন cancel করা হয়েছিল।

---

# ২৬. Complete Cancelable Download Example

```js
const downloadButton = document.getElementById("download-btn");
const abortButton = document.getElementById("abort-btn");

let controller;

downloadButton.addEventListener("click", downloadFile);

abortButton.addEventListener("click", () => {
  if (controller) {
    controller.abort("User aborted the download action");
    console.warn("Download aborted");
  }
});

async function downloadFile() {
  const fileURL = "./download/file.txt";

  controller = new AbortController();
  const signal = controller.signal;

  try {
    console.log("Downloading...");

    setTimeout(async () => {
      const response = await fetch(fileURL, {
        signal,
      });

      const blob = await response.blob();

      const objectURL = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = objectURL;
      link.download = "file.txt";

      link.click();

      URL.revokeObjectURL(objectURL);

      console.log("Download complete");
    }, 2000);
  } catch (error) {
    console.error("Download error:", error.message);
  }
}
```

## Connection আবার বুঝে নিই

```js
controller = new AbortController();
```

Controller তৈরি হলো।

```js
const signal = controller.signal;
```

Controller থেকে signal নেওয়া হলো।

```js
fetch(fileURL, { signal });
```

Signal fetch request-এর সঙ্গে associate করা হলো।

```js
controller.abort("User aborted the download action");
```

Abort call করলে signal request-এ পৌঁছাবে এবং fetch cancel হবে।

---

## Expected Output: Abort না করলে

Console:

```text
Downloading...
Download complete
```

File download হবে।

## Expected Output: Abort করলে

Console-এ দেখা যেতে পারে:

```text
Downloading...
Download aborted
```

এবং error reason:

```text
User aborted the download action
```

Download dialog বা file download আর হবে না।

---

# ২৭. Common Mistakes

## Mistake ১: `await` ছাড়া `fetch()` result ব্যবহার

ভুল:

```js
const response = fetch(apiURL);
const data = response.json();
```

এখানে `response` actual Response object নয়; promise।

সঠিক:

```js
const response = await fetch(apiURL);
const data = await response.json();
```

---

## Mistake ২: `response.json()`-এ `await` না দেওয়া

ভুল:

```js
const data = response.json();
console.log(data);
```

Expected console-এ data-এর বদলে Promise দেখা যেতে পারে।

সঠিক:

```js
const data = await response.json();
```

---

## Mistake ৩: JSON body stringify না করা

ভুল:

```js
body: postData
```

সঠিক:

```js
body: JSON.stringify(postData)
```

---

## Mistake ৪: `Content-Type` না দেওয়া

JSON পাঠালে সাধারণত header দেওয়া উচিত:

```js
headers: {
  "Content-Type": "application/json",
}
```

---

## Mistake ৫: Update/Delete-এ ID ছাড়া collection URL ব্যবহার

ভুল:

```js
fetch("http://localhost:3000/posts", {
  method: "DELETE",
});
```

এখানে নির্দিষ্ট post identify করা হয়নি।

সঠিক:

```js
fetch(`http://localhost:3000/posts/${postId}`, {
  method: "DELETE",
});
```

---

## Mistake ৬: সব HTTP error-কে `.catch()` ধরবে ধরে নেওয়া

`fetch()` অনেক `4xx` বা `5xx` response-এ resolve করতে পারে।

তাই:

```js
if (!response.ok) {
  throw new Error(`Response status: ${response.status}`);
}
```

---

## Mistake ৭: Response content type না দেখে JSON parse করা

Server JSON না পাঠালে:

```js
await response.json();
```

error হতে পারে।

তাই প্রয়োজনে:

```js
const contentType = response.headers.get("content-type");

if (!contentType?.includes("application/json")) {
  throw new TypeError("Expected JSON response");
}
```

---

## Mistake ৮: Abort signal fetch-এর সঙ্গে না যুক্ত করা

শুধু controller তৈরি করলে request cancel হবে না।

ভুল:

```js
const controller = new AbortController();

fetch(fileURL);

controller.abort();
```

সঠিক:

```js
const controller = new AbortController();

fetch(fileURL, {
  signal: controller.signal,
});

controller.abort();
```

---

# ২৮. Tricky Cases

## Tricky Case ১: `fetch()` resolve হয়েছে, কিন্তু request সফল নয়

```js
const response = await fetch(apiURL);
```

এই line সফলভাবে response দিতে পারে, যদিও status `404` বা `500`।

তাই `response.ok` check অপরিহার্য।

---

## Tricky Case ২: `DELETE` response empty

কিছু server `204 No Content` return করে।

এক্ষেত্রে:

```js
await response.json();
```

ব্যর্থ হতে পারে।

API contract অনুযায়ী response body parse করতে হবে।

---

## Tricky Case ৩: Request reuse

একটি `Request` object body-সহ একবার consume হলে আবার ব্যবহার করতে সমস্যা হতে পারে। নতুন request তৈরির জন্য existing request clone বা extend করার pattern কাজে আসে।

Instructor-এর example:

```js
const request2 = new Request(request1, {
  body: JSON.stringify(newData),
});
```

---

## Tricky Case ৪: Abort হওয়ার timing

Request সম্পন্ন হয়ে যাওয়ার পর `abort()` call করলে completed operation আর undo হবে না।

Abort কার্যকর হয় তখনই, যখন request এখনো pending।

---

# ২৯. Interview Questions

## প্রশ্ন ১: Fetch API কী

**উত্তর:** Fetch API হলো browser-provided promise-based API, যার মাধ্যমে network-এর ওপর request পাঠিয়ে resource retrieve, create, update বা delete করা যায়।

---

## প্রশ্ন ২: `fetch()` কী return করে

**উত্তর:** `fetch()` একটি Promise return করে। Promise resolve হলে একটি `Response` object পাওয়া যায়।

---

## প্রশ্ন ৩: `response.json()` কী return করে

**উত্তর:** `response.json()` parsed JSON সরাসরি return করে না; এটি একটি Promise return করে। Promise resolve হলে parsed JavaScript value পাওয়া যায়।

---

## প্রশ্ন ৪: Fetch-এর default method কী

**উত্তর:** `GET`।

---

## প্রশ্ন ৫: `POST`, `PUT` এবং `PATCH`-এর পার্থক্য কী

**উত্তর:**

- `POST` নতুন resource তৈরি করে
- `PUT` সাধারণত সম্পূর্ণ resource replace বা update করে
- `PATCH` resource-এর নির্দিষ্ট অংশ update করে

---

## প্রশ্ন ৬: Fetch কি `404` status-এ reject করে

**উত্তর:** সবসময় নয়। Network-level failure না হলে `fetch()` resolve করতে পারে। তাই `response.ok` বা `response.status` check করতে হয়।

---

## প্রশ্ন ৭: Promise কি cancel করা যায়

**উত্তর:** Promise নিজে cancel করা যায় না। কিন্তু promise তৈরি করা underlying operation—যেমন fetch request—`AbortController` দিয়ে cancel করা যায়।

---

## প্রশ্ন ৮: Fetch request কীভাবে cancel করা হয়

**উত্তর:**

1. `new AbortController()` তৈরি করা
2. `controller.signal` নেওয়া
3. Fetch options-এ `{ signal }` দেওয়া
4. `controller.abort()` call করা

---

## প্রশ্ন ৯: `Request` object কেন ব্যবহার করা হয়

**উত্তর:** URL, method, headers এবং body-সহ request configuration আগে থেকে encapsulate ও reuse করার জন্য। এটি request construction ও execution আলাদা রাখে এবং cleaner code লিখতে সাহায্য করে।

---

# ৩০. Lecture Recap

আজ আমরা Fetch API-এর প্রায় পুরো core workflow দেখেছি।

প্রথমে শিখেছি Fetch API কী এবং network communication-এ client, server ও resource-এর সম্পর্ক কী।

এরপর তিনটি fundamental term দেখেছি:

- URL
- Request
- Response

তারপর `fetch()`-এর promise-based syntax দেখেছি:

```js
fetch(url)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

এরপর একই কাজ `async/await` দিয়ে করেছি:

```js
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

আমরা পাঁচটি গুরুত্বপূর্ণ HTTP method ব্যবহার করেছি:

```text
GET
POST
PUT
PATCH
DELETE
```

তারপর দেখেছি query parameters কীভাবে `URLSearchParams` দিয়ে তৈরি করা যায়।

```js
const queryString = new URLSearchParams({
  _embed: "comments",
}).toString();
```

এরপর নতুন resource create করেছি:

```js
fetch(apiURL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(postData),
});
```

সম্পূর্ণ resource update-এর জন্য `PUT`, partial update-এর জন্য `PATCH` এবং resource remove করার জন্য `DELETE` ব্যবহার করেছি।

Custom header হিসেবে দেখেছি:

```js
Authorization: "Bearer secret-token"
```

এবং:

```js
"X-Custom-Header": "Learn 40 Days of JS"
```

`Request` object তৈরি করে request configuration reusable করেছি।

Response handle করার সময় check করেছি:

```js
response.ok
response.status
response.headers
```

শেষে `AbortController` দিয়ে pending fetch request cancel করেছি।

---

# ৩১. Assignment / Task

Instructor এই lesson-এর জন্য মোট **১০টি task** দিয়েছেন। Task-গুলো repository-এর `task.md` file-এ রয়েছে।

Task করার সময় নিচের বিষয়গুলো practice করবে:

1. `GET` request দিয়ে resource fetch
2. Query parameter ব্যবহার
3. `POST` দিয়ে resource create
4. `PUT` দিয়ে full update
5. `PATCH` দিয়ে partial update
6. `DELETE` দিয়ে resource remove
7. Custom header পাঠানো
8. Reusable `Request` object তৈরি
9. Response validation
10. `AbortController` দিয়ে request cancel

Task শেষ করে community-তে share করতে বলা হয়েছে। Publicly learning করলে অন্যের solution দেখা, নিজের ভুল ধরতে পারা এবং discussion-এর মাধ্যমে understanding আরও শক্ত হয়।

সব code **40 Days of JavaScript** repository-এর Day 25 section-এ পাওয়া যাবে।

---

# ৩২. পরবর্তী Lesson

Day 25-এ Fetch API শেষ হলো।

পরবর্তী lesson, Day 26-এ আমরা শিখব:

```text
Event Loop
```

JavaScript interview clear করতে এবং JavaScript ecosystem গভীরভাবে বুঝতে Event Loop অত্যন্ত গুরুত্বপূর্ণ।

---

# Final Recap

এই chapter-এর সবচেয়ে গুরুত্বপূর্ণ points:

- `fetch()` network request পাঠায় এবং Promise return করে।
- Promise resolve হলে `Response` object পাওয়া যায়।
- `response.json()`-ও Promise return করে।
- Default method হলো `GET`।
- `POST` resource create করে।
- `PUT` সম্পূর্ণ resource update বা replace করে।
- `PATCH` partial update করে।
- `DELETE` resource remove করে।
- Query string তৈরিতে `URLSearchParams` useful।
- JSON body পাঠাতে `JSON.stringify()` দরকার।
- JSON content পাঠালে সাধারণত `Content-Type: application/json` header দিতে হয়।
- HTTP error handle করতে `response.ok` check করা উচিত।
- `Request` object request configuration reusable করে।
- Promise নিজে cancel করা যায় না।
- Fetch request `AbortController` দিয়ে cancel করা যায়।
- `controller.signal` fetch options-এ pass করতে হয়।
- `controller.abort()` pending request বাতিল করে।

এই lesson ভালোভাবে practice করলে frontend application-এ server data নিয়ে কাজ করার শক্ত ভিত্তি তৈরি হবে।
