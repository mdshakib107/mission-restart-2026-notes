Day 22: Synchronous, Asynchronous JavaScript এবং Callback

ভূমিকা

ধরো, তুমি এমন একটি restaurant-এ গিয়েছ যেখানে মাত্র একজন chef কাজ করে। তুমি order দিলে chef প্রথমে তোমার dish রান্না শেষ করবে। তারপর অন্য customer-এর order নেবে। এক সময়ে একটি কাজ হবে। ফলে restaurant-এর সবকিছু খুব ধীরে এগোবে।

এটাই synchronous behaviour-এর মতো।

এখন কল্পনা করো, কয়েক দিন পর chef আরও smart হয়ে গেল। সে একসঙ্গে multiple order নিতে শুরু করল। একটি dish oven-এ রান্না হতে থাকলে সে অন্য customer-এর জন্য পানি ফুটতে দিল, আবার সেই সময় নতুন order-ও নিল।

এটাই asynchronous behaviour-এর মতো।

এখানে সব কাজ একটির পর আরেকটি করে আটকে থাকছে না। আবার সব কাজ একদম একই মুহূর্তে হচ্ছে—এমনও নয়। বরং কোনো slow task progress-এ থাকলে অন্য কাজ চালিয়ে নেওয়া হচ্ছে।

আজ আমরা 40 Days of JavaScript-এর নতুন module শুরু করছি: Asynchronous Programming with JavaScript।

এই lesson-এ আমরা শিখব:

JavaScript কেন default-ভাবে synchronous

asynchronous programming কেন দরকার

setTimeout() কীভাবে non-blocking behaviour তৈরি করে

callback function কী

callback synchronous এবং asynchronous—দুই context-এই কীভাবে কাজ করে

API response handle করতে callback-এর ব্যবহার

একটি Pizza Order application

callback hell বা callback pyramid

asynchronous callback code debug করা

আগের function lesson-এ আমরা callback-এর সঙ্গে পরিচিত হয়েছিলাম। আজ আমরা এটিকে অনেক গভীরে বুঝব।

Synchronous বনাম Asynchronous

Restaurant Analogy

Synchronous Restaurant

একজন chef:

প্রথম customer-এর order নেয়

সেই order সম্পূর্ণ রান্না করে

serve করে

তারপর দ্বিতীয় customer-এর order নেয়

এখানে এক task শেষ না হলে পরের task শুরু হচ্ছে না।

Asynchronous Restaurant

একই chef:

প্রথম order নেয়

dish oven-এ দেয়

dish রান্না হতে থাকলে দ্বিতীয় order নেয়

অন্য customer-এর জন্য পানি ফুটতে দেয়

oven-এর কাজ শেষ হলে আবার প্রথম dish-এর দিকে ফিরে যায়

এখানে waiting time নষ্ট না করে অন্য কাজ করা হচ্ছে।

JavaScript Default-ভাবে Synchronous

JavaScript default-ভাবে synchronous।

এর অর্থ:

এক সময়ে একটি task execute করে

এক সময়ে একটি line execute করে

পরের line আগের line শেষ হওয়ার জন্য অপেক্ষা করে

উদাহরণ:

console.log("Start");
console.log("Middle");
console.log("End");

Expected output:

Start
Middle
End

JavaScript file-এর শুরু থেকে execution শুরু হবে।

প্রথম console.log() execute হবে

empty line থাকলে skip করবে

দ্বিতীয় line execute হবে

তারপর তৃতীয় line execute হবে

Output code-এর order-এর সঙ্গে একই থাকবে।

Synchronous Programming কেন Blocking?

Synchronous programming সহজ, কিন্তু অনেক ক্ষেত্রে inefficient হতে পারে।

উদাহরণ:

console.log("Start");
console.log("Middle");
console.log("End");

এখানে:

Middle execute হতে পারবে না যতক্ষণ Start শেষ না হয়

End execute হতে পারবে না যতক্ষণ Start এবং Middle শেষ না হয়

অর্থাৎ execution একে অন্যকে block করছে।

এই কারণে synchronous programming-কে blocking বলা হয়।

Asynchronous JavaScript

Asynchronous programming non-blocking।

এর মূল ধারণা:

কোনো task slow হলে JavaScript বলে—“তুমি শুরু হও। শেষ হতে সময় নিলে অন্য কাজগুলো আমি চালিয়ে যাচ্ছি।”

এটাই modern application-এর জন্য অত্যন্ত গুরুত্বপূর্ণ।

API Call কেন Asynchronous হওয়া দরকার?

ধরো:

database অন্য server-এ আছে

তার সামনে একটি API server আছে

browser হলো client

browser API call করছে

request network দিয়ে server-এ যাচ্ছে

server database থেকে data নিচ্ছে

data আবার browser-এ ফিরছে

এই পুরো operation সময় নেয়।

এই সময় user interface freeze করে রাখা যাবে না।

যদি user Facebook, LinkedIn বা X ব্যবহার করে:

comment submit হতে সময় লাগতে পারে

কিন্তু UI freeze হয় না

user অন্য post পড়তে পারে

অন্য post like করতে পারে

scroll করতে পারে

এটাই asynchronous programming-এর practical value।

setTimeout() দিয়ে Asynchronous Behaviour

JavaScript-এ asynchronous behaviour achieve করার অনেক উপায় আছে।

সবচেয়ে সহজ উদাহরণগুলোর একটি হলো browser-provided Web API:

setTimeout()

Basic Syntax

setTimeout(callback, delay);

এটি সাধারণত দুইটি argument নেয়:

একটি function

delay in milliseconds

উদাহরণ:

setTimeout(() => {
  console.log("Waiting done");
}, 2000);

এখানে:

2000 milliseconds = 2 seconds

অর্থাৎ callback function ২ seconds পরে execute হবে।

Output Prediction

console.log("Start");

setTimeout(() => {
  console.log("Waiting done");
}, 2000);

console.log("End");

কী output হবে?

অনেকে ভাবতে পারে:

Start
Waiting done
End

কিন্তু এটি ভুল।

Expected output:

Start
End
Waiting done

কেন?

Step 1

console.log("Start");

এটি synchronous, তাই সঙ্গে সঙ্গে execute হবে।

Step 2

setTimeout(...)

JavaScript দেখবে callback-টি ২ seconds পরে execute করতে হবে।

তাই callback-টিকে এখন execute না করে deferred অবস্থায় রাখবে।

Step 3

JavaScript অপেক্ষা করবে না। পরের line-এ যাবে।

console.log("End");

এটি synchronous, তাই সঙ্গে সঙ্গে execute হবে।

Step 4

২ seconds শেষ হলে callback execution-এর জন্য আসবে।

console.log("Waiting done");

তখন execute হবে।

Call Stack Perspective

আমরা আগেই শিখেছি, function execute হলে JavaScript সেটিকে call stack বা execution stack-এ নেয়।

এই example-এ:

console.log("Start");

সঙ্গে সঙ্গে stack-এ গিয়ে execute হয়।

setTimeout()-এর callback তখনই stack-এ যায় না। সেটি delay শেষ হওয়ার জন্য অপেক্ষা করে।

এরপর:

console.log("End");

stack-এ যায় এবং execute হয়।

সব synchronous কাজ শেষ হওয়ার পর এবং timer complete হলে callback execution-এর সুযোগ পায়।

এই lesson-এ event loop-এর গভীর mechanics আলোচনা করা হচ্ছে না। পরে event loop, microtask এবং macrotask নিয়ে আলাদা deep dive থাকবে।

Callback Function কী?

Definition:

একটি function-কে অন্য function-এর argument হিসেবে pass করা হলে, সেই passed function-কে callback function বলা হয়।

Basic structure:

function fn(callback) {
  callback();
}

fn(() => {
  console.log("Hello");
});

এখানে arrow function-টি fn() function-এর argument হিসেবে pass হয়েছে।

তাই এটি callback function।

Callback কেন Pass করা হয়?

আমরা callback pass করি যেন parent function প্রয়োজনমতো পরে সেটি execute করতে পারে।

Callback execute হতে পারে:

কিছু code execution-এর পরে

কোনো condition satisfy হলে

API response এলে

file I/O operation শেষ হলে

timer expire হলে

কোনো event ঘটলে

Callback-এর নাম callback হওয়ার কারণও এটাই—function-টিকে পরে আবার “call back” করা হয়।

Synchronous Callback Example

function greet(name, callback) {
  console.log(`Hi ${name}`);
  callback();
}

function sayBye() {
  console.log("Bye");
}

greet("Tapas", sayBye);

Expected output:

Hi Tapas
Bye

Step-by-step

greet() call করা হয়েছে:

greet("Tapas", sayBye);

প্রথম argument:

"Tapas"

দ্বিতীয় argument:

sayBye

এখানে sayBye execute করা হয়নি, শুধু function reference pass করা হয়েছে।

greet()-এর ভিতরে:

console.log(`Hi ${name}`);

প্রথমে execute হবে।

তারপর:

callback();

এখানে callback আসলে sayBye function-কে refer করছে।

তাই sayBye() execute হয়ে print করবে:

Bye

Function Reference বনাম Function Execution

এটি গুরুত্বপূর্ণ:

sayBye

এটি function reference।

আর:

sayBye()

এটি function execution।

Callback হিসেবে function pass করার সময় সাধারণত reference pass করি:

greet("Tapas", sayBye);

Parent function-এর ভিতরে গিয়ে execute করি:

callback();

Callback মানেই Asynchronous নয়

এখানে একটি common misunderstanding আছে।

অনেকে ভাবে:

Callback ব্যবহার করলেই code asynchronous হয়ে যায়।

এটি সঠিক নয়।

আগের example:

function greet(name, callback) {
  console.log(`Hi ${name}`);
  callback();
}

এখানে callback synchronous-ভাবেই execute হচ্ছে।

প্রথম line শেষ হওয়ার পর callback execute হচ্ছে।

Callback নিজে asynchronous mechanism নয়।

বরং:

Callback হলো asynchronous operation-এর result handle করার একটি mechanism।

Asynchronous Callback Example

এখন greet() function-এর callback delay করে execute করি।

function greet(name, callback) {
  console.log(`Hi ${name}`);

  setTimeout(() => {
    callback();
  }, 2000);

  console.log("I am still hanging here");
}

function sayBye() {
  console.log("Bye");
}

greet("Tapas", sayBye);

Expected output:

Hi Tapas
I am still hanging here
Bye

কেন?

প্রথমে:

console.log(`Hi ${name}`);

execute হবে।

তারপর setTimeout() callback delay করবে।

JavaScript পরের line-এ যাবে:

console.log("I am still hanging here");

এটি execute হবে।

২ seconds পরে:

callback();

execute হবে।

যেহেতু callback হলো sayBye, তাই output:

Bye

setTimeout()-এর ভিতরের Function-ও Callback

এই code দেখো:

setTimeout(() => {
  callback();
}, 2000);

এখানে setTimeout()-এ pass করা arrow function-টিও callback।

কারণ এটিও অন্য function-এর argument হিসেবে pass হয়েছে এবং পরে execute হবে।

অর্থাৎ callback-এর ভিতরে আবার আরেক callback থাকতে পারে।

এটিই পরে nested callback এবং callback hell-এর দিকে নিয়ে যেতে পারে।

Callback-এর আসল ব্যবহার

Asynchronous operation-এর outcome সাধারণত দুই ধরনের:

success

failure

ধরো API call করা হলো।

Response এলে caller জানতে চাইবে:

operation successful হয়েছে কি না

error হয়েছে কি না

data কী এসেছে

এরপর UI-তে কী দেখাতে হবে

Callback এই result caller-এর কাছে পাঠাতে পারে।

উদাহরণ:

query(endpoint, (result, error) => {
  if (!error) {
    console.log(result);
  }
});

এখানে asynchronous operation complete হলে callback result বা error handle করছে।

Pizza Hub API Use Case

এখন আমরা callback-এর real-life use case দেখব।

ধরো, একটি Pizza Hub application আছে।

Pizza Hub বিভিন্ন pizza provider-এর collection:

Pizza Hut

Domino's

অন্য provider

আমাদের flow হবে:

কোন pizza shop open আছে তা খুঁজব

সেই shop-এ নির্দিষ্ট pizza available কি না দেখব

pizza-এর সঙ্গে free beverage আছে কি না দেখব

order place করব

success message দেখাব

API Flow

API 1: Open Pizza Hub খোঁজা

Conceptual endpoint:

/api/pizzahub

Response হতে পারে:

["Pizza Hut"]

এর অর্থ বর্তমানে Pizza Hut open।

API 2: Shop-এর Available Pizza

Conceptual endpoint:

/api/pizzahub/pizzas/Pizza Hut

Response:

[
  {
    id: 2,
    type: "veg",
    name: "Margherita",
    price: 10,
    shop: "Pizza Hut"
  }
]

API 3: Pizza-এর Beverage Add-on

Conceptual endpoint:

/api/pizzahub/beverages/2

Response:

[
  {
    id: 2,
    name: "Pepsi",
    price: 11,
    free: true
  }
]

API 4: Order Place করা

Conceptual endpoint:

/api/order

এটি POST request।

Payload:

{
  pizzaId: 2,
  beverageId: 2
}

query() Utility Function

Instructor একটি query() utility ব্যবহার করেছেন।

Conceptually:

query(endpoint, callback, options);

এটি নিতে পারে:

API endpoint

callback

optional request options

এই lesson-এ fetch, .then() এবং network implementation গভীরে বোঝানো হচ্ছে না। এগুলো পরের lesson-গুলোতে শেখানো হবে।

এখন শুধু ধরে নিই:

API success হলে callback result পায়

failure হলে callback error পায়

Order Pizza Function

function orderPizza(type, name) {
  // API calls will be made here
}

orderPizza("veg", "Margherita");

Expected flow:

open shop খুঁজবে

matching pizza খুঁজবে

matching beverage খুঁজবে

order place করবে

Step 1: Open Shop Query করা

function orderPizza(type, name) {
  query("/api/pizzahub", (result, error) => {
    if (!error) {
      const shopId = result[0];
      console.log(shopId);
    }
  });
}

যদি response হয়:

["Pizza Hut"]

তাহলে:

const shopId = result[0];

এর value হবে:

Pizza Hut

Expected output:

Pizza Hut

query()-এর ভিতরে Callback কীভাবে ব্যবহৃত হচ্ছে

Conceptually query() function এমন হতে পারে:

function query(endpoint, callback, options) {
  fetch(endpoint, options)
    .then(response => response.json())
    .then(json => {
      callback(json, null);
    })
    .catch(error => {
      callback(null, error);
    });
}

এই lesson-এ fetch() এবং .then() বিস্তারিত বোঝার দরকার নেই।

মূল বিষয়:

callback(json, null);

API success হলে response callback-এর কাছে পাঠানো হচ্ছে।

Caller side:

query("/api/pizzahub", (result, error) => {
  // result receives json
});

এখানে callback additional information পাচ্ছে:

result

যা API response।

Step 2: Pizza List Query করা

Open shop পাওয়ার পর সেই shop-এর pizza list চাই।

function orderPizza(type, name) {
  query("/api/pizzahub", (result, error) => {
    if (!error) {
      const shopId = result[0];

      query(
        `/api/pizzahub/pizzas/${shopId}`,
        (result, error) => {
          if (!error) {
            const pizzas = result;

            const myPizza = pizzas.find(pizza => {
              return (
                pizza.type === type &&
                pizza.name === name
              );
            });

            console.log(myPizza);
          }
        }
      );
    }
  });
}

find() কেন ব্যবহার করা হয়েছে?

pizzas একটি array।

আমরা এমন pizza খুঁজছি যার:

pizza.type === type

এবং:

pizza.name === name

দুটিই match করে।

Expected Output

যদি call করা হয়:

orderPizza("veg", "Margherita");

এবং matching pizza পাওয়া যায়, output হতে পারে:

{
  id: 2,
  type: "veg",
  name: "Margherita",
  price: 10,
  shop: "Pizza Hut"
}

Step 3: Beverage Query করা

Matching pizza পাওয়ার পর তার id ব্যবহার করে beverage query করা হবে।

query(
  `/api/pizzahub/beverages/${myPizza.id}`,
  (result, error) => {
    if (!error) {
      const beverage = result[0];
      console.log(beverage);
    }
  }
);

Response array থেকে প্রথম beverage নেওয়া হয়েছে:

const beverage = result[0];

Expected output:

{
  id: 2,
  name: "Pepsi",
  price: 11,
  free: true
}

Step 4: Order Prepare করা

এখন আমাদের কাছে আছে:

myPizza

beverage

Order API-তে পাঠাতে হবে:

{
  pizzaId: myPizza.id,
  beverageId: beverage.id
}

POST Request Options

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    pizzaId: myPizza.id,
    beverageId: beverage.id
  })
};

এখানে:

method হলো POST

content type হলো JSON

body-তে pizza এবং beverage ID পাঠানো হচ্ছে

Final Order Call

query(
  "/api/order",
  (result, error) => {
    if (!error) {
      console.log(
        `Your order of ${type} ${name} with ${beverage.name} has been placed.`
      );
    } else {
      console.log("No pizza is available for you today.");
    }
  },
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      pizzaId: myPizza.id,
      beverageId: beverage.id
    })
  }
);

Expected success message:

Your order of veg Margherita with Pepsi has been placed.

Complete Nested Callback Flow

function orderPizza(type, name) {
  query("/api/pizzahub", (result, error) => {
    if (!error) {
      const shopId = result[0];

      console.log("Shop:", shopId);

      query(
        `/api/pizzahub/pizzas/${shopId}`,
        (result, error) => {
          if (!error) {
            const pizzas = result;

            const myPizza = pizzas.find(pizza => {
              return (
                pizza.type === type &&
                pizza.name === name
              );
            });

            console.log("Pizza:", myPizza);

            query(
              `/api/pizzahub/beverages/${myPizza.id}`,
              (result, error) => {
                if (!error) {
                  const beverage = result[0];

                  console.log("Beverage:", beverage);

                  query(
                    "/api/order",
                    (result, error) => {
                      if (!error) {
                        console.log(
                          `Your order of ${type} ${name} ` +
                          `with ${beverage.name} has been placed.`
                        );
                      } else {
                        console.log(
                          "No pizza is available for you today."
                        );
                      }
                    },
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        pizzaId: myPizza.id,
                        beverageId: beverage.id
                      })
                    }
                  );
                }
              }
            );
          }
        }
      );
    }
  });
}

orderPizza("veg", "Margherita");

Artificial Delay দিয়ে Asynchronous Simulation

API call-এ delay simulate করতে query() function-এর callback setTimeout()-এর ভিতরে execute করা যায়।

Conceptually:

setTimeout(() => {
  callback(json, null);
}, 2000);

এতে প্রতিটি API response ২ seconds পরে আসবে।

Expected sequence:

After 2 seconds → Pizza Hut
After another 2 seconds → Matching pizza
After another 2 seconds → Beverage
After another 2 seconds → Order placed

এতে asynchronous operation-এর বাস্তব অনুভূতি পাওয়া যায়।

DOM-এ API Progress দেখানো

আগের DOM module-এর knowledge ব্যবহার করে console-এর পরিবর্তে UI-তে progress দেখানো যায়।

HTML Structure

<div>
  <h1>Pizza Hub Order</h1>

  <p id="store"></p>
  <p id="order-details"></p>
  <p id="addon"></p>
  <p id="order-status"></p>
</div>

DOM Elements Query

const storeEl =
  document.getElementById("store");

const orderDetailsEl =
  document.getElementById("order-details");

const addonEl =
  document.getElementById("addon");

const orderStatusEl =
  document.getElementById("order-status");

Store Progress

API call-এর আগে:

storeEl.textContent = "Locating the store...";

Response পাওয়ার পর:

storeEl.textContent =
  `Located the store: ${shopId}`;

Expected UI:

Locating the store...

তারপর:

Located the store: Pizza Hut

Pizza Progress

Query করার আগে:

orderDetailsEl.textContent =
  "Loading the pizza order...";

Pizza পাওয়ার পর:

orderDetailsEl.textContent =
  `You selected ${myPizza.type} ${myPizza.name}`;

Beverage Progress

Query করার আগে:

addonEl.textContent =
  "Checking available add-ons...";

Response পাওয়ার পর:

addonEl.textContent =
  `Added beverage: ${beverage.name}`;

Order Progress

Order place করার আগে:

orderStatusEl.textContent =
  "Preparing your order...";

Order complete হলে:

orderStatusEl.textContent =
  `Your order of ${type} ${name} with ` +
  `${beverage.name} has been placed at ` +
  `${new Date().toLocaleTimeString()}`;

Expected UI flow:

Locating the store...
Located the store: Pizza Hut

Loading the pizza order...
You selected veg Margherita

Checking available add-ons...
Added beverage: Pepsi

Preparing your order...
Your order has been placed...

Improvement Idea

বর্তমানে:

orderPizza("veg", "Margherita");

hardcoded।

এটি improve করা যায়।

HTML-এ যোগ করা যেতে পারে:

pizza type input

pizza name input

Place Order button

Button click হলে input value নিয়ে:

orderPizza(typeValue, nameValue);

call করা যাবে।

এটি instructor implementation করেননি; experiment হিসেবে learner-দের জন্য রেখে দিয়েছেন।

Callback Hell

Callback asynchronous result handle করতে useful।

কিন্তু অতিরিক্ত nested callback বড় সমস্যা তৈরি করে।

Definition:

অনেক callback একটির ভিতরে আরেকটি nested হলে code unreadable, hard to maintain এবং hard to refactor হয়ে যায়। এই অবস্থাকে callback hell বলা হয়।

আমাদের Pizza App-এ:

shop query callback

তার ভিতরে pizza query callback

তার ভিতরে beverage query callback

তার ভিতরে order query callback

Structure:

query(..., () => {
  query(..., () => {
    query(..., () => {
      query(..., () => {
        // deeply nested
      });
    });
  });
});

Callback Pyramid

Callback hell-কে callback pyramid-ও বলা হয়।

কারণ indentation ধীরে ধীরে ভিতরে যায়:

callback
  callback
    callback
      callback
    end
  end
end

Code zoom out করলে pyramid-এর মতো দেখায়।

এ কারণেই একে কখনও Pyramid of Doom-ও বলা হয়।

Callback Hell-এর সমস্যা

১. Readability কমে যায়

একটি operation কোথায় শুরু এবং কোথায় শেষ হচ্ছে বোঝা কঠিন।

২. Data Dependency জটিল হয়

এক callback-এর output পরের asynchronous call-এর input।

উদাহরণ:

shopId → pizza query
myPizza.id → beverage query
beverage.id → order query

৩. Refactoring কঠিন

Small reusable function-এ ভাগ করা কঠিন হয়ে যায়।

৪. Error Handling ছড়িয়ে যায়

প্রতিটি nested level-এ error check করতে হয়।

৫. Maintenance কঠিন হয়

একটি নতুন step যোগ করলে nesting আরও বাড়ে।

Callback কি Avoid করতে হবে?

না।

Callback নিজে খারাপ নয়।

Callback এখনও প্রয়োজন হবে:

event listener

array methods

timer

Promise executor

then()

catch()

fetch-related operations

Avoid করতে হবে:

excessive nesting

callback chain

unreadable pyramid structure

asynchronous flow callback দিয়ে পুরোপুরি manage করা

অর্থাৎ:

Callback এড়িয়ে নয়, callback hell এড়িয়ে চলতে হবে।

কেন Promise শিখব?

পরের lesson-এ একই Pizza Order application Promise দিয়ে rewrite করা হবে।

তখন দেখা যাবে:

nesting কমবে

flow linear হবে

code readable হবে

error handling cleaner হবে

refactoring সহজ হবে

Promise-এর পরে async/await শেখানো হবে, যা asynchronous code আরও natural syntax-এ লিখতে সাহায্য করবে।

Debugging Asynchronous Callback Code

Asynchronous code debug করার জন্য browser DevTools ব্যবহার করা হবে।

Chrome, Firefox বা Safari DevTools-এর Sources tab ব্যবহার করা যায়।

Breakpoint সেট করা

ধরো order place করার line-এর আগে breakpoint দেওয়া হলো।

তারপর page refresh করলে:

shop query হবে

pizza query হবে

beverage query হবে

order call-এর আগে execution pause হবে

Call Stack কেন গুরুত্বপূর্ণ?

Breakpoint যেখানে hit করেছে, তার আগের execution কীভাবে সেখানে পৌঁছেছে তা জানতে Call Stack দেখতে হবে।

Call stack দেখাবে:

orderPizza() কোথা থেকে call হয়েছে

query() কোথায় call হয়েছে

fetch() flow কোথায় গেছে

setTimeout() callback কোথায় execute হয়েছে

কোন nested callback থেকে পরের query call হয়েছে

Bottom-up Call Stack Reading

Call stack bottom থেকে পড়লে execution history বোঝা যায়।

Conceptual flow:

orderPizza
→ query shop
→ fetch
→ setTimeout callback
→ shop callback
→ query pizzas
→ fetch
→ setTimeout callback
→ pizza callback
→ query beverage
→ ...

Asynchronous code-এ debugger এক জায়গা থেকে অন্য জায়গায় jump করতে পারে। তাই call stack execution history বুঝতে বিশেষভাবে useful।

Debugging Strategy

suspicious line-এ breakpoint দাও

execution pause হলে local variables দেখো

Call Stack খুলে দেখো

নিচের frame থেকে উপরের frame-এ যাও

প্রতিটি callback invocation inspect করো

কোন value ভুল এসেছে তা trace করো

source callback-এর input verify করো

Common Mistakes

Mistake ১: Callback মানেই Asynchronous ভাবা

ভুল:

function fn(callback) {
  callback();
}

এটি synchronous।

Asynchronous করতে হলে actual async mechanism দরকার:

setTimeout(callback, 1000);

Mistake ২: Function Execute করে Pass করা

ভুল:

greet("Tapas", sayBye());

এখানে sayBye() আগে execute হয়ে যাবে।

সঠিক:

greet("Tapas", sayBye);

Mistake ৩: Nested Callback অতিরিক্ত বাড়ানো

Problem:

query(..., () => {
  query(..., () => {
    query(..., () => {
      query(..., () => {});
    });
  });
});

এটি callback hell তৈরি করে।

Mistake ৪: Error Ignore করা

Demo-তে happy path বেশি দেখানো হয়েছে।

বাস্তবে:

if (error) {
  // handle error
  return;
}

করতে হবে।

Instructor error handling পরের Promise lesson-এ আরও বিস্তারিতভাবে দেখাবেন।

Mistake ৫: Async Debugging-এ Call Stack না দেখা

শুধু current line দেখলে পুরো flow বোঝা কঠিন।

Call Stack ব্যবহার করো।

Interview-focused Questions

প্রশ্ন ১: Callback Function কী?

একটি function-কে অন্য function-এর argument হিসেবে pass করা হলে সেই function callback।

প্রশ্ন ২: Callback কি সবসময় Asynchronous?

না।

Callback synchronous বা asynchronous—দুইভাবেই execute হতে পারে।

প্রশ্ন ৩: setTimeout() callback কেন পরে execute হয়?

কারণ callback delay শেষ হওয়ার আগে execute হয় না। JavaScript meanwhile synchronous code চালিয়ে যায়।

প্রশ্ন ৪: Callback Hell কী?

অনেক nested callback-এর কারণে code unreadable, hard to maintain এবং hard to refactor হয়ে গেলে সেটি callback hell।

প্রশ্ন ৫: Callback Pyramid কেন বলা হয়?

Nested callback-এর indentation pyramid-এর মতো দেখায়।

প্রশ্ন ৬: Callback এড়িয়ে চলতে হবে কি?

না। Callback প্রয়োজনীয়।

Avoid করতে হবে excessive callback nesting।

প্রশ্ন ৭: API Result Handle করতে Callback কীভাবে সাহায্য করে?

Async operation complete হলে callback result বা error caller-এর কাছে পাঠায়।

Recap

এই lesson-এ আমরা শিখেছি:

JavaScript default-ভাবে synchronous

synchronous execution blocking

asynchronous execution non-blocking

API call-এর সময় UI freeze করা উচিত নয়

setTimeout() callback defer করে

callback function অন্য function-এর argument

callback synchronous-ও হতে পারে

callback async result handle করতে useful

Pizza Hub API flow nested callback দিয়ে implement করা যায়

DOM ব্যবহার করে progress UI-তে দেখানো যায়

excessive nesting callback hell তৈরি করে

callback hell-কে callback pyramid বলা হয়

asynchronous callback code debug করতে Call Stack গুরুত্বপূর্ণ

Assignment / Task

Instructor task details task.md file-এ দিয়েছেন।

মূল নির্দেশনা:

lesson-এর callback concepts practice করো

task solve করো

code GitHub-এ upload করো

community-এর সঙ্গে share করো

Pizza Order application নিজে modify করার চেষ্টা করো

Suggested experimentation:

pizza type input যোগ করো

pizza name input যোগ করো

Place Order button যোগ করো

input value থেকে orderPizza() call করো

loading states UI-তে দেখাও

error state UI-তে দেখাও

callbacks ছোট function-এ refactor করার চেষ্টা করো

callback pyramid কোথায় তৈরি হচ্ছে identify করো

Next Lesson

পরের lesson-এ আমরা শিখব:

Promise

Promise deeply কীভাবে কাজ করে

resolve

reject

.then()

.catch()

callback hell থেকে Promise-based flow

একই Pizza Order App Promise দিয়ে rewrite করা

Promise interview-এর জন্যও অত্যন্ত গুরুত্বপূর্ণ।

পরবর্তী lesson-এর লক্ষ্য হবে callback pyramid ভেঙে code আরও clean করা।

Final Recap

JavaScript synchronous হলেও browser Web API, callback এবং পরে Promise ও async/await ব্যবহার করে asynchronous operation handle করা যায়।

Callback হলো অন্য function-এ argument হিসেবে pass করা function। এটি নিজে asynchronous নয়; কিন্তু asynchronous operation complete হওয়ার পর result বা error handle করতে অত্যন্ত useful।

আমরা Pizza Hub example-এ দেখেছি:

open shop query

pizza list query

matching pizza find

beverage query

order place

DOM-এ progress update

কিন্তু nested callback code দ্রুত callback hell বা callback pyramid তৈরি করে।

তাই callback বুঝতে হবে, ব্যবহার করতে হবে, কিন্তু deeply nested chain avoid করতে হবে। পরের lesson-এ Promise এই সমস্যার cleaner solution হিসেবে আসবে।
