Day 24: JavaScript async ও await — Promise থেকে Cleaner Asynchronous Code

ভূমিকা

সবাইকে স্বাগতম। আজ আমরা 40 Days of JavaScript-এর ২৪তম lesson-এ JavaScript-এর async এবং await শিখব।

আগের lesson-এ আমরা Promise নিয়ে গভীরভাবে আলোচনা করেছি। Promise কী, কীভাবে তৈরি করতে হয়, resolve, reject, .then(), .catch(), .finally(), Promise chaining এবং multiple Promise handle করার বিভিন্ন API—সব দেখেছি।

আজ আমরা দেখব, Promise-based asynchronous code-কে async ও await ব্যবহার করে আরও readable, natural এবং maintainable syntax-এ কীভাবে লেখা যায়।

এই lesson-এ আমরা শিখব:

Promise-এর syntax কোথায় overwhelming হতে পারে

Promise থেকে async/await-এ migrate করার mindset

async function কী

await কীভাবে কাজ করে

await কি code-কে synchronous করে?

try...catch...finally দিয়ে error handling

Weather App example

top-level await

multiple asynchronous operation handle করা

Promise-based PizzaHub App-কে async/await দিয়ে refactor করা

Movie Explorer project assignment

কেন async/await?

প্রথমেই একটি বিষয় পরিষ্কার করি:

Promise-এর কোনো fundamental problem নেই।

async/await Promise-এর বিকল্প কোনো আলাদা asynchronous system নয়। বরং Promise-এর উপর তৈরি একটি cleaner syntax।

Promise আছে বলেই async/await আছে।

Promise syntax অনেক সময় এমন হতে পারে:

somePromise
  .then(...)
  .then(...)
  .then(...)
  .catch(...)
  .finally(...);

Chaining বড় হলে:

code review কঠিন হতে পারে

debugger-এ breakpoint follow করা কঠিন হতে পারে

nested বা long chain পড়তে overwhelming লাগতে পারে

normal sequential logic বোঝা কঠিন হতে পারে

async/await একই Promise-based flow-কে natural JavaScript syntax-এ লিখতে সাহায্য করে।

Promise Syntax Recap

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(101);
  }, 1000);
});

promise
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  });

এখানে:

Promise constructor

executor function

resolve

reject

.then()

.catch()

ব্যবহার হয়েছে।

async/await ব্যবহার করলে explicit Promise handling syntax অনেক কমে যায়।

async Keyword

async সাধারণত function-এর আগে ব্যবহার করা হয়।

async function fn() {
  return 101;
}

সবচেয়ে গুরুত্বপূর্ণ rule:

একটি async function সবসময় Promise return করে।

Function-এর ভিতরে তুমি explicit Promise return করো বা না করো—return value Promise-এর ভিতরে wrap হয়ে যাবে।

async Function একটি Value Return করলে

async function fn() {
  return 101;
}

const value = fn();

console.log(value);

অনেকে expected output ভাবতে পারে:

101

কিন্তু actual output হবে Promise object।

Conceptually:

Promise fulfilled with 101

কারণ JavaScript internally এমন behaviour তৈরি করে:

function fn() {
  return Promise.resolve(101);
}

Explicit Promise Return করলে

async function fn() {
  return Promise.resolve(101);
}

এখানেও result একটি Promise।

JavaScript Promise-এর ভিতরে আবার unnecessary Promise wrapping করে না। Final resolved value থাকে:

101

async Function-এর Promise Handle করা

async function fn() {
  return 101;
}

fn().then(result => {
  console.log(result);
});

Output:

101

এটি প্রমাণ করে:

fn() Promise return করছে

.then() দিয়ে resolved value পাওয়া যাচ্ছে

await Keyword

এখন .then() বাদ দিয়ে resolved value নিতে চাই।

const result = await fn();

await Promise settle হওয়া পর্যন্ত current async function-এর execution pause করে এবং resolved value return করে।

await কোথায় ব্যবহার করা যায়?

সাধারণ script-এ await সরাসরি global scope-এ ব্যবহার করলে error হতে পারে।

const result = await fn();

Possible error:

await is only valid in async functions
and the top level bodies of modules

তাই সাধারণভাবে await ব্যবহার করতে হবে async function-এর ভিতরে।

async function handlePromise() {
  const result = await fn();
  console.log(result);
}

handlePromise();

Output:

101

async Function Call-এর আগে সবসময় await দরকার কি?

না।

ধরো:

async function handlePromise() {
  const result = await fn();
  console.log(result);
}

এখন:

handlePromise();

এভাবে call করা যেতে পারে।

কারণ caller এই function-এর returned Promise-এর result ব্যবহার করতে আগ্রহী নয়। Function-এর ভিতরের কাজ execute হওয়াই প্রয়োজন।

কিন্তু caller যদি result পেতে চায়:

const output = await handlePromise();

তাহলে await প্রয়োজন হতে পারে।

async Function কিছু Return না করলেও কী হয়?

async function handlePromise() {
  const result = await fn();
  console.log(result);
}

Normal function কিছু return না করলে:

undefined

return করে।

কিন্তু এটি async function, তাই return করবে:

Promise fulfilled with undefined

অর্থাৎ:

async function-এর Promise return করা এড়ানোর কোনো সুযোগ নেই।

await কি JavaScript-কে Synchronous করে?

এটি গুরুত্বপূর্ণ interview question।

ধরো:

async function handlePromise() {
  const result = await fn();
  console.log(result);
}

await fn()-এ Promise settle না হওয়া পর্যন্ত পরের line execute হবে না।

তাহলে কি পুরো JavaScript synchronous হয়ে গেল?

উত্তর:

না।

await আসলে কী Pause করে?

await current async function-এর execution pause করে।

এটি পুরো JavaScript engine block করে না।

Promise settle হওয়ার সময়:

অন্য script execute হতে পারে

UI event handle হতে পারে

button click কাজ করতে পারে

scroll কাজ করতে পারে

অন্য asynchronous operation চলতে পারে

main thread available থাকে

Promise settle হলে paused function resume করে।

Function Execution Context-এর Perspective

async function fn() {
  return Promise.resolve(101);
}

async function handlePromise() {
  const result = await fn();
  console.log(result);
}

console.log("Before");
handlePromise();
console.log("After");

Expected output:

Before
After
101

কেন?

Before synchronous, তাই print হবে

handlePromise() call হবে

await fn() current function pause করবে

JavaScript outer execution চালিয়ে যাবে

After print হবে

Promise settle হলে handlePromise() resume করবে

101 print হবে

UI Perspective

ধরো page-এর একটি ছোট অংশ weather data load করছে।

সেই অংশে loading indicator থাকতে পারে:

Loading weather...

কিন্তু পুরো page block করা উচিত নয়।

User meanwhile:

অন্য button click করতে পারে

scroll করতে পারে

অন্য section ব্যবহার করতে পারে

এটাই non-blocking asynchronous behaviour।

Error Handling with async/await

Promise syntax:

errorPromise
  .catch(error => {
    console.error(error);
  });

async/await syntax:

async function handleErrorPromise() {
  try {
    const result = await errorPromise;
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

Rejected Promise Example

const errorPromise = new Promise((resolve, reject) => {
  reject(new Error("Error occurred"));
});

async function handleErrorPromise() {
  try {
    const result = await errorPromise;
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

handleErrorPromise();

Output:

Error occurred

finally with async/await

async function loadData() {
  let loading = true;

  try {
    const result = await somePromise;
    console.log(result);
  } catch (error) {
    console.error(error);
  } finally {
    loading = false;
  }
}

finally success বা failure—দুই ক্ষেত্রেই execute হবে।

Common use:

loading indicator hide

temporary state reset

cleanup

resource release

Weather App Project

এখন async/await ব্যবহার করে একটি Weather App-এর structure বুঝি।

User city লিখবে:

Kolkata
London
Bangalore

Button click করলে API থেকে weather data আসবে।

UI-তে দেখানো হবে:

city name

temperature

weather condition

weather icon

Error হলে:

City not found

দেখানো হবে।

Weather App HTML Structure

<h1>Weather App</h1>

<input
  id="city-input"
  type="text"
  placeholder="Enter city name"
/>

<button id="search-button">
  Get Weather
</button>

<div id="loading"></div>
<div id="result"></div>

এখানে:

city-input user input নেয়

search-button API call initiate করে

loading loading state দেখায়

result success বা error দেখায়

Click Handler

document
  .querySelector("#search-button")
  .addEventListener("click", () => {
    const city = document
      .querySelector("#city-input")
      .value
      .trim();

    if (city) {
      queryWeather(city);
    }
  });

Weather API Call

Conceptual URL:

https://api.openweathermap.org/data/2.5/weather
?q=CITY_NAME
&appid=API_KEY
&units=metric

Complete JavaScript:

async function queryWeather(city) {
  const loadingEl =
    document.getElementById("loading");

  const resultEl =
    document.getElementById("result");

  loadingEl.textContent = "Loading...";
  resultEl.innerHTML = "";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather` +
      `?q=${encodeURIComponent(city)}` +
      `&appid=YOUR_API_KEY` +
      `&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    displayWeather(data);
  } catch (error) {
    showError(error.message);
  } finally {
    loadingEl.textContent = "";
  }
}

fetch() কেন await করা হয়েছে?

fetch() Promise return করে।

const response = await fetch(url);

এখানে resolved value হলো:

Response object

Final JSON data নয়।

response.json() আবার কেন await?

const data = await response.json();

কারণ response.json()-ও Promise return করে।

Flow:

fetch()
→ Promise
→ Response object

response.json()
→ Promise
→ Actual JSON data

HTTP Error Check

fetch() network-level request complete হলেও HTTP response failure হতে পারে।

তাই:

if (!response.ok) {
  throw new Error("City not found");
}

ব্যবহার করা হয়েছে।

Thrown error সরাসরি catch block-এ যাবে।

Weather Data DOM-এ দেখানো

function displayWeather(data) {
  const resultEl =
    document.getElementById("result");

  const cityName = data.name;
  const temperature = data.main.temp;
  const description =
    data.weather[0].description;
  const icon = data.weather[0].icon;

  resultEl.innerHTML = `
    <h2>${cityName}</h2>
    <p>Temperature: ${temperature}°C</p>
    <p>Condition: ${description}</p>
    <img
      src="https://openweathermap.org/img/wn/${icon}@2x.png"
      alt="${description}"
    />
  `;
}

Error DOM-এ দেখানো

function showError(message) {
  const resultEl =
    document.getElementById("result");

  resultEl.innerHTML = `
    <p>${message}</p>
  `;
}

Loading Hide করা

finally {
  loadingEl.textContent = "";
}

Data বা error—যাই আসুক, request complete হলে loading hide হবে।

Top-level await

সাধারণ script-এ top-level await invalid হতে পারে।

কিন্তু JavaScript module-এ top-level await allowed।

<script type="module" src="index.js"></script>

তারপর:

const result = await fetch(url);

module top level-এ ব্যবহার করা যায়।

Non-module Script-এ IIFE ব্যবহার

Script module না হলে async IIFE ব্যবহার করা যায়।

(async () => {
  const response = await fetch(url);
  const data = await response.json();

  console.log(data);
})();

IIFE অর্থ:

Immediately Invoked Function Expression

এটি define হওয়ার সঙ্গে সঙ্গে execute হয়।

Async Arrow Function Syntax

async () => {
  // await can be used here
}

IIFE:

(async () => {
  // code
})();

Multiple Asynchronous Operation Handle করা

আগের lesson-এ আমরা শিখেছি:

Promise.all()

Promise.any()

Promise.allSettled()

Promise.race()

async/await ব্যবহার করলেও এগুলোই ব্যবহার হবে।

Multiple Fetch Example

async function resolvePokemons() {
  const responsesPromise = Promise.allSettled([
    fetch(url1),
    fetch(url2),
    fetch(url3)
  ]);

  const results = await responsesPromise;

  console.log(results);
}

Promise.allSettled() Promise return করে।

await করলে array পাওয়া যায়।

Result Structure

[
  {
    status: "fulfilled",
    value: Response
  },
  {
    status: "fulfilled",
    value: Response
  },
  {
    status: "rejected",
    reason: Error
  }
]

Manual Indexing Version

async function resolvePokemons() {
  const results = await Promise.allSettled([
    fetch(url1),
    fetch(url2),
    fetch(url3)
  ]);

  const pokemon1 =
    await results[0].value.json();

  const pokemon2 =
    await results[1].value.json();

  const pokemon3 =
    await results[2].value.json();

  console.log(
    pokemon1,
    pokemon2,
    pokemon3
  );
}

Problem:

manually 0, 1, 2 index ব্যবহার করতে হচ্ছে

dynamic Promise count হলে inconvenient

Improved Version

প্রতিটি fetch-এর .then()-এ JSON Promise return করা যায়।

async function resolvePokemonsV2() {
  const results = await Promise.allSettled([
    fetch(url1).then(response =>
      response.json()
    ),

    fetch(url2).then(response =>
      response.json()
    ),

    fetch(url3).then(response =>
      response.json()
    )
  ]);

  console.log(results);
}

এখন fulfilled result-এর value সরাসরি actual JSON data।

{
  status: "fulfilled",
  value: {
    // Pokémon data
  }
}

Dynamic Improvement

async function fetchAllJson(urls) {
  const promises = urls.map(url => {
    return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(
          `Request failed: ${response.status}`
        );
      }

      return response.json();
    });
  });

  return await Promise.allSettled(promises);
}

এটি dynamic number of URL handle করতে পারে।

PizzaHub App with async/await

আগের lesson-এ Promise chain ছিল:

getShopIds()
  .then(...)
  .then(...)
  .then(...)
  .catch(...);

এখন এটিকে async/await দিয়ে rewrite করা হবে।

Promise Version

function orderPizza(type, name) {
  getShopIds()
    .then(shopIds => {
      return getPizzaList(shopIds[0]);
    })
    .then(pizzas => {
      return getPizzaWithAddon(
        pizzas,
        type,
        name
      );
    })
    .then(pizzaWithAddons => {
      return performOrder(
        pizzaWithAddons
      );
    })
    .then(order => {
      confirmOrder(
        type,
        name,
        order.createdAt
      );
    })
    .catch(error => {
      console.error(error);
    });
}

Migration Strategy

Promise chain থেকে async/await-এ যেতে:

function-কে async করো

Promise-returning call-এর আগে await দাও

.then() parameter-কে variable বানাও

chain remove করো

.catch()-এর পরিবর্তে try...catch ব্যবহার করো

Async/Await Version

async function orderPizza(type, name) {
  try {
    const shopIds =
      await getShopIds();

    const pizzas =
      await getPizzaList(shopIds[0]);

    const pizzaWithAddons =
      await getPizzaWithAddon(
        pizzas,
        type,
        name
      );

    const order =
      await performOrder(
        pizzaWithAddons
      );

    confirmOrder(
      type,
      name,
      order.createdAt
    );
  } catch (error) {
    console.error(
      "Bad luck. No pizza for you today.",
      error
    );
  }
}

কেন confirmOrder()-এর আগে await নেই?

কারণ confirmOrder() Promise return করছে না।

function confirmOrder(...) {
  console.log(...);
}

এটি synchronous function।

তাই:

confirmOrder(...);

সরাসরি call করা হবে।

Async/Await Refactor-এর সুবিধা

code top-to-bottom পড়া যায়

nested chain নেই

intermediate value পরিষ্কার variable-এ থাকে

debugging সহজ

error handling centralised

existing helper function পরিবর্তন করতে হয় না

Promise এখনও underlying mechanism হিসেবে কাজ করে

Common Mistakes

Mistake 1: await Global Scope-এ ব্যবহার

ভুল:

const result = await fn();

সাধারণ script-এ।

সঠিক:

async function run() {
  const result = await fn();
}

অথবা module:

<script type="module">

Mistake 2: Function async না করে await

ভুল:

function run() {
  const result = await fn();
}

সঠিক:

async function run() {
  const result = await fn();
}

Mistake 3: async Function direct value return করে ভাবা

async function fn() {
  return 10;
}

fn() returns:

Promise

Not direct 10.

Mistake 4: fetch()-এর Result-কে JSON ভাবা

const data = await fetch(url);

এখানে data আসলে Response object।

Actual JSON:

const response = await fetch(url);
const data = await response.json();

Mistake 5: response.ok Check না করা

if (!response.ok) {
  throw new Error("Request failed");
}

ব্যবহার করা উচিত।

Mistake 6: Error Handling বাদ দেওয়া

try {
  ...
} catch (error) {
  ...
}

ব্যবহার করো।

Mistake 7: Independent Operation Sequentially Await করা

Independent API call হলে এমন code unnecessarily slow হতে পারে:

const a = await fetch(urlA);
const b = await fetch(urlB);
const c = await fetch(urlC);

যদি calls independent হয়:

const [a, b, c] = await Promise.all([
  fetch(urlA),
  fetch(urlB),
  fetch(urlC)
]);

Interview Questions

async Function কী Return করে?

সবসময় Promise।

await কী করে?

Promise settle হওয়া পর্যন্ত current async function pause করে এবং resolved value দেয়।

await কি Main Thread Block করে?

না।

await কোথায় ব্যবহার করা যায়?

async function-এর ভিতরে

module-এর top level-এ

fetch() কী Return করে?

Promise, যা Response object-এ resolve হয়।

response.json() কী Return করে?

Promise।

async/await কি Promise ছাড়া কাজ করে?

না। এটি Promise-based syntax।

Promise Chain থেকে async/await-এ কীভাবে Refactor করবে?

function async

Promise call-এর আগে await

.then() result variable-এ

.catch() → try...catch

Assignment / Task

Day 24-এর task.md file-এ একাধিক task আছে।

সব task complete করতে হবে।

Main Project: Movie Explorer App

OMDb API ব্যবহার করে Movie Explorer App তৈরি করতে হবে।

Website:

omdbapi.com

Account তৈরি করে API key নিতে হবে।

Movie Explorer Requirements

1. Search Input

User movie search term লিখবে।

<input
  id="movie-search"
  placeholder="Search movies"
/>

2. Search Button

<button id="search-button">
  Search
</button>

3. API Call

fetch() এবং async/await ব্যবহার করতে হবে।

4. Movie Information

Result-এ দেখাতে হবে:

title

poster

release year

5. No Result Found

কিছু match না করলে:

No result found

6. Required Concepts

অবশ্যই ব্যবহার করবে:

async

await

DOM manipulation

try...catch

loading state

error handling

Suggested Structure

async function searchMovies(searchTerm) {
  try {
    showLoading();

    const response = await fetch(
      `https://www.omdbapi.com/` +
      `?apikey=YOUR_API_KEY` +
      `&s=${encodeURIComponent(searchTerm)}`
    );

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();

    if (data.Response === "False") {
      showNoResult();
      return;
    }

    displayMovies(data.Search);
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
  }
}

Delivery

project complete করো

GitHub-এ upload করো

clear README.md দাও

Discord-এর task-assignment channel-এ submit করো

community feedback নাও

Recap

এই lesson-এ আমরা দেখেছি:

Promise syntax-এর উপর async/await cleaner abstraction

async function সবসময় Promise return করে

await resolved value নিতে সাহায্য করে

await current function pause করে, main thread নয়

try...catch...finally দিয়ে error handle করা যায়

fetch() এবং response.json() দুইটিই Promise return করে

Weather App-এ API, DOM, loading এবং error handling

top-level await

async IIFE

multiple Promise-এর সঙ্গে await

PizzaHub Promise chain refactor

Movie Explorer App assignment

Final Recap

async/await asynchronous JavaScript-এর নতুন mechanism নয়। এটি Promise-এর cleaner syntax।

মনে রাখো:

async function → always returns Promise
await → waits inside current async function
await → does not block main thread
try/catch → handles rejected Promise
finally → cleanup

Promise knowledge ছাড়া async/await debugging কঠিন হবে। তাই Promise fundamentals এবং async/await—দুটিকে একই mental model-এর অংশ হিসেবে বুঝতে হবে।

Practice হিসেবে:

Weather App নিজে build করো

multiple fetch call handle করো

Promise chain async/await-এ rewrite করো

PizzaHub App update করো

Movie Explorer project complete করো

পরবর্তী lesson-গুলোতে আমরা Fetch API, request cancellation এবং Event Loop আরও গভীরভাবে শিখব।
