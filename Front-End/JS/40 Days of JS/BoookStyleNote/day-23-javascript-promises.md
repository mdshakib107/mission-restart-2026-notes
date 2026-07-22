Day 23: JavaScript Promise — Fundamentals, Chaining, Multiple Promises এবং PizzaHub Refactor

ভূমিকা

যেকোনো JavaScript developer-কে যদি বলা হয়—“JavaScript-এর তিনটি complex topic-এর নাম বলো”—তাহলে খুব সম্ভবত তাদের অধিকাংশই Promise-এর নাম বলবে।

Promise জটিল মনে হয়, কিন্তু মূলত জটিল হয় তখনই, যখন আমরা এর fundamentals বুঝি না। একবার foundation পরিষ্কার হয়ে গেলে asynchronous programming-এর একটি নতুন দরজা খুলে যায়।

আজকের lesson দীর্ঘ। তাই প্রয়োজন হলে pause নাও, break নাও, তারপর আবার continue করো। শেষে task এবং assignment আছে—সেগুলো অবশ্যই practice করতে হবে।

এই chapter-এ আমরা শিখব:

Promise কী

Promise কেন দরকার

callback থেকে Promise-এ আসার কারণ

Promise state এবং result

resolve() ও reject()

.then(), .catch(), .finally()

Promise chaining

chaining-এর rules

multiple Promise handle করা

Promise.all()

Promise.any()

Promise.allSettled()

Promise.race()

Promise.resolve()

Promise.reject()

Promise cancel করা যায় কি না

callback-based PizzaHub application Promise দিয়ে rewrite করা

Promise বোঝার সবচেয়ে ভালো উপায়: Real-life Analogy

Consumer এবং Service

ধরো, তুমি একজন consumer। তুমি কোনো service provider-এর কাছে একটি service চাও।

তুমি request করলে service provider সঙ্গে সঙ্গে result নাও দিতে পারে। কিন্তু পরে দুই ধরনের response আসতে পারে:

success

failure

Promise হলো এমন একটি placeholder, যা future-এ পাওয়া value বা error represent করে।

Example 1: Amazon থেকে Laptop Order

তুমি Amazon থেকে laptop order করলে message এলো:

Order placed.
Expected delivery in 2 days.

এই মুহূর্তে laptop তোমার হাতে নেই।

তাই Promise state:

pending

দুই দিন পরে laptop delivery হলে:

fulfilled

Laptop delay, lost বা delivery failure হলে:

rejected

Example 2: WhatsApp-এ Coffee Invitation

তুমি message পাঠালে:

Want to grab some coffee tonight?

Blue tick হয়েছে, কিন্তু reply আসেনি।

State:

pending

Reply:

Let's go.

State:

fulfilled

Reply:

I don't want to go.

State:

rejected

Example 3: Airport Luggage Belt

Flight থেকে নেমে luggage belt-এর পাশে দাঁড়িয়ে আছ।

Bag এখনো আসেনি:

pending

Bag পেয়ে গেলে:

fulfilled

Bag lost হলে:

rejected

এই সময় তুমি coffee কিনে আসতে পারো। Belt চলতে থাকবে। এটাই asynchronous behaviour।

Promise-এর Definition

Asynchronous operation-এর future result বা error represent করার জন্য Promise একটি placeholder।

Promise তৈরি করার পর program অন্য কাজ করতে পারে। Later:

success হলে notification পাওয়া যায়

failure হলে error পাওয়া যায়

result অনুযায়ী action নেওয়া যায়

Callback থেকে Promise

Callback useful হলেও excessive nesting-এর কারণে:

callback
  callback
    callback
      callback

এই structure তৈরি হয়।

এটিকে বলা হয়:

callback hell

callback pyramid

Problems:

readability কমে

debugging কঠিন

refactoring কঠিন

error handling জটিল

Promise এই problem অনেকটাই solve করে।

Promise কীভাবে তৈরি করতে হয়

JavaScript Promise নামে একটি constructor function দেয়।

Syntax:

const promise = new Promise((resolve, reject) => {
  // asynchronous operation
});

এখানে:

Promise একটি constructor

new দিয়ে instance তৈরি হয়

constructor একটি callback নেয়

এই callback-কে executor function বলা হয়

executor function দুইটি function পায়:

resolve

reject

Executor Function

(resolve, reject) => {
  // promise logic
}

এই function-এর ভিতরে asynchronous operation করা হয়।

উদাহরণ:

const promise = new Promise((resolve, reject) => {
  resolve("Done");
});

resolve() এবং reject()

resolve ও reject JavaScript-provided callback function।

Success

resolve("I am done");

Promise state:

pending → fulfilled

Result:

"I am done"

Failure

reject("Something is not right");

Promise state:

pending → rejected

Result:

error

Important Rule: একবারই Settle হবে

একটি Promise একবার fulfilled বা rejected হলে পরে আর state পরিবর্তন হয় না।

const promise = new Promise((resolve, reject) => {
  resolve("First");
  reject("Second");
  resolve("Third");
});

Final result:

First

কারণ প্রথম resolve() Promise settle করেছে।

এরপর:

reject("Second");
resolve("Third");

ignored হবে।

Promise States

Promise-এর তিনটি state:

1. Pending

Executor শুরু হয়েছে, কিন্তু operation complete হয়নি।

state: pending
result: undefined

2. Fulfilled

Operation successful।

state: fulfilled
result: resolved value

3. Rejected

Operation failed।

state: rejected
result: error

Promise Result

State অনুযায়ী result:

State

Result

pending

undefined

fulfilled

resolved value

rejected

error

Promise Handle করা

Promise তৈরি করা মানে order place করা। কিন্তু final result consumer-কে জানতে হবে।

Promise handle করার তিনটি method:

.then()
.catch()
.finally()

এই dot ভুলে যেও না।

.then()

.then() Promise result handle করে।

এটি দুইটি callback নিতে পারে:

promise.then(
  result => {
    // fulfilled
  },
  error => {
    // rejected
  }
);

উদাহরণ:

const promise = new Promise((resolve, reject) => {
  resolve("I am resolved");
});

promise.then(
  result => {
    console.log(result);
  },
  error => {
    console.error(error);
  }
);

Output:

I am resolved

.then() দিয়ে শুধু Success Handle

promise.then(result => {
  console.log(result);
});

এটাই common usage।

.then() দিয়ে শুধু Rejection Handle

Resolve handler না চাইলে প্রথম argument null দিতে হবে।

promise.then(
  null,
  error => {
    console.error(error);
  }
);

তবে সাধারণত rejection-এর জন্য .catch() ব্যবহার করা হয়।

.catch()

promise
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  });

Promise resolve হলে .then() চলবে।

Reject হলে .catch() চলবে।

.finally()

.finally() success বা failure—দুই ক্ষেত্রেই চলে।

promise
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    console.log("Cleanup");
  });

Common use case:

let loading = true;

promise
  .then(...)
  .catch(...)
  .finally(() => {
    loading = false;
  });

Promise Chaining

Promise-এর power আসে chaining থেকে।

promise
  .then(...)
  .then(...)
  .catch(...)
  .finally(...);

এক handler-এর return value পরের handler-এর input হয়।

Promise Chaining Rules

Rule 1

Every Promise gives .then().

Rejected Promise handle করতে .catch() ব্যবহার করা যায়।

Rule 2: .then()-এর ভিতরে তিনটি কাজ

.then() থেকে তুমি:

আরেকটি Promise return করতে পারো

একটি synchronous value return করতে পারো

error throw করতে পারো

Case 1: .then() থেকে Promise Return

const getUser = new Promise((resolve, reject) => {
  resolve({
    name: "John Doe",
    email: "john@example.com"
  });
});

getUser
  .then(user => {
    console.log(`Got user: ${user.name}`);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Bangalore");
      }, 2000);
    });
  })
  .then(address => {
    console.log(`User address is ${address}`);
  });

Expected output:

Got user: John Doe
User address is Bangalore

দ্বিতীয় line ২ seconds পরে আসবে।

Common Mistake

ভুল:

getUser.then(user => {
  return new Promise(...).then(...);
});

Instructor-এর emphasis ছিল—Promise return করলে outer chain-এ .then() ব্যবহার করো।

সঠিক structure:

getUser
  .then(user => {
    return new Promise(...);
  })
  .then(result => {
    // handle returned promise
  });

Case 2: .then() থেকে Value Return

getUser
  .then(user => {
    return user.email;
  })
  .then(email => {
    console.log(`User email is ${email}`);
  });

এক .then() থেকে return করা value পরের .then()-এ input হয়।

Case 3: .then() থেকে Error Throw

const getUserWithPermission = new Promise((resolve, reject) => {
  resolve({
    name: "John Doe",
    email: "john@example.com",
    permissions: ["DB", "DEV"]
  });
});

getUserWithPermission
  .then(user => {
    if (!user.permissions.includes("HR")) {
      throw new Error(
        "You are not allowed to access the HR module"
      );
    }

    return user.email;
  })
  .then(email => {
    console.log(`User email is ${email}`);
  })
  .catch(error => {
    console.error(error.message);
  });

Expected output:

You are not allowed to access the HR module

Email print হবে না।

Rule 3: Error Rethrow

.catch() থেকে error আবার throw করা যায়।

const promise401 = new Promise((resolve, reject) => {
  reject(401);
});

promise401
  .catch(error => {
    if (error === 401) {
      console.log("401 detected");
      throw error;
    }
  })
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.log("Handling 401 here");
  });

Rethrown error nearest next .catch()-এ যাবে।

Expected output:

401 detected
Handling 401 here

Rule 4: .finally() Result পরিবর্তন করে না

const promiseFinally = new Promise((resolve, reject) => {
  resolve("Testing finally");
});

promiseFinally
  .finally(() => {
    console.log("Running finally");
  })
  .then(result => {
    console.log(result);
  });

Expected output:

Running finally
Testing finally

.finally() result consume না করলেও result পরের handler-এ pass হয়।

Rule 5: একই Promise-এ বারবার .then() Chaining নয়

এটি গুরুত্বপূর্ণ interview question।

const promise = Promise.resolve(10);

promise.then(value => {
  return value + 1;
});

promise.then(value => {
  return value + 10;
});

promise.then(value => {
  console.log(value + 20);
});

Output:

30

কেন?

প্রতিটি .then() একই original Promise-এর resolved value 10 পাচ্ছে।

এগুলো chained নয়।

Actual Chain

Promise.resolve(10)
  .then(value => {
    return value + 1;
  })
  .then(value => {
    return value + 10;
  })
  .then(value => {
    console.log(value + 20);
  });

Flow:

10 → 11 → 21 → 41

Output:

41

Multiple Promises Handle করা

Multiple asynchronous operation একসঙ্গে handle করার জন্য static Promise methods আছে।

Promise.all()

Promise.all([promise1, promise2, promise3])
  .then(results => {
    console.log(results);
  })
  .catch(error => {
    console.error(error);
  });

Behaviour:

সব Promise resolve হওয়া পর্যন্ত অপেক্ষা করে

সব result array হিসেবে দেয়

একটি reject হলে পুরো operation reject হয়

Expected result:

[
  result1,
  result2,
  result3
]

Promise.any()

Promise.any([promise1, promise2, promise3])
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  });

Behaviour:

প্রথম fulfilled Promise-এর result দেয়

সব Promise-এর result array দেয় না

first success পেলেই complete

Promise.allSettled()

Promise.allSettled([promise1, promise2, promise3])
  .then(results => {
    console.log(results);
  });

Settled মানে:

fulfilled অথবা rejected

Output structure:

[
  {
    status: "fulfilled",
    value: ...
  },
  {
    status: "rejected",
    reason: ...
  }
]

এটি useful কারণ:

একটি reject হলেও অন্য result পাওয়া যায়

প্রতিটি Promise-এর status দেখা যায়

failure reason পাওয়া যায়

Promise.race()

Promise.race([promise1, promise2, promise3])
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  });

Behaviour:

fastest settled Promise-এর result বা error দেয়

fulfilled বা rejected—যেটি আগে settle হয়

Promise.resolve()

const promise = Promise.resolve("Done");

Equivalent:

const promise = new Promise((resolve, reject) => {
  resolve("Done");
});

Promise.reject()

const promise = Promise.reject("Failed");

Equivalent:

const promise = new Promise((resolve, reject) => {
  reject("Failed");
});

Promise Cancel করা যায় কি?

Interview question:

Can a Promise be cancelled?

Answer:

No, a Promise itself cannot be cancelled.

Amazon analogy:

Promise হলো delivery-এর commitment

order process cancel করা যায়

Promise object নিজে cancel করা যায় না

Technical context:

fetch() cancel করা যায়

XMLHttpRequest cancel করা যায়

AbortController ব্যবহার করা যায়

কিন্তু Promise object cancel করা যায় না

অর্থাৎ:

Promise-producing process cancel করা যায়, Promise নয়।

PizzaHub App Promise দিয়ে Rewrite

আগের lesson-এ callback ব্যবহার করে PizzaHub application তৈরি করা হয়েছিল।

Flow:

shop ID

pizza list

selected pizza

beverage

order

confirmation

Callback version-এ nested structure ছিল।

এখন Promise-based version তৈরি করা হবে।

Project Structure

pizza-hub/
├── ph.html
├── ph.js
└── lib/
    └── query.js

Promise-returning query()

function query(endpoint, options = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(endpoint, options)
        .then(response => {
          if (!response.ok) {
            throw new Error("Request failed");
          }

          return response.json();
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    }, 2000);
  });
}

এখানে:

query() Promise return করে

artificial ২-second delay আছে

fetch() response handle করা হয়

success হলে resolve

error হলে reject

Helper Function: Shop IDs

function getShopIds() {
  return query("/api/pizzahub");
}

Helper Function: Pizza List

function getPizzaList(shopId) {
  return query(
    `/api/pizzahub/pizzas/${shopId}`
  );
}

Helper Function: Pizza with Add-on

function getPizzaWithAddon(
  pizzas,
  type,
  name
) {
  const myPizza = pizzas.find(pizza => {
    return (
      pizza.type === type &&
      pizza.name === name
    );
  });

  if (!myPizza) {
    throw new Error("Pizza not found");
  }

  return query(
    `/api/pizzahub/beverages/${myPizza.id}`
  ).then(addons => {
    return {
      pizza: myPizza,
      addons
    };
  });
}

Helper Function: Perform Order

function performOrder(pizza, beverage) {
  return query(
    "/api/order",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pizzaId: pizza.id,
        beverageId: beverage.id
      })
    }
  );
}

Helper Function: Confirm Order

function confirmOrder(
  type,
  name,
  createdAt
) {
  console.log(
    `Your order of ${type} ${name} ` +
    `has been placed at ${createdAt}`
  );
}

Main orderPizza() Chain

function orderPizza(type, name) {
  let selectedPizza;
  let selectedBeverage;

  getShopIds()
    .then(shopIds => {
      const firstShopId = shopIds[0];

      return getPizzaList(firstShopId);
    })
    .then(pizzas => {
      return getPizzaWithAddon(
        pizzas,
        type,
        name
      );
    })
    .then(result => {
      selectedPizza = result.pizza;
      selectedBeverage = result.addons[0];

      return performOrder(
        selectedPizza,
        selectedBeverage
      );
    })
    .then(orderInfo => {
      confirmOrder(
        type,
        name,
        orderInfo.createdAt
      );
    })
    .catch(error => {
      console.error(error);
    });
}

orderPizza("veg", "Margherita");

Callback Version বনাম Promise Version

Callback Version

query
  callback
    query
      callback
        query
          callback

Promise Version

getShopIds()
  .then(...)
  .then(...)
  .then(...)
  .catch(...);

Promise version:

flatter

readable

reusable

easier to debug

easier to maintain

central error handling সম্ভব

DOM Integration Task

ph.html-এ UI section থাকলে:

<p id="store"></p>
<p id="order-details"></p>
<p id="addon"></p>
<p id="order-status"></p>

JavaScript:

const storeEl =
  document.getElementById("store");

const orderDetailsEl =
  document.getElementById("order-details");

const addonEl =
  document.getElementById("addon");

const orderStatusEl =
  document.getElementById("order-status");

Promise chain-এর প্রতিটি stage-এ UI update করা যায়।

Common Mistakes

Mistake 1: new Promise Syntax ভুলে যাওয়া

Correct:

new Promise((resolve, reject) => {
  // logic
});

Mistake 2: .then-এ Function না দেওয়া

ভুল:

promise.then(result);

সঠিক:

promise.then(result => {
  console.log(result);
});

Mistake 3: একই Promise-এ বারবার .then()-কে Chain ভাবা

ভুল mental model:

promise.then(...);
promise.then(...);
promise.then(...);

সঠিক chain:

promise
  .then(...)
  .then(...)
  .then(...);

Mistake 4: .then() থেকে Promise Return না করা

ভুল:

.then(() => {
  new Promise(...);
})

সঠিক:

.then(() => {
  return new Promise(...);
})

Mistake 5: Error Throw করলে .catch() না রাখা

.then(() => {
  throw new Error("Failed");
})
.catch(error => {
  console.error(error);
});

Interview Questions

Promise কী?

Future asynchronous result বা error represent করা object।

Promise states কী?

pending

fulfilled

rejected

Promise settle মানে কী?

Fulfilled বা rejected হওয়া।

Promise কি একাধিকবার settle হয়?

না।

.then() কী return করতে পারে?

Promise

value

thrown error

.finally() কি result পরিবর্তন করে?

না।

Same Promise-এ multiple .then() কি chain?

না।

Promise.all()-এ একটি reject হলে কী হয়?

Whole operation reject হয়।

Promise.allSettled() কী দেয়?

প্রতিটি Promise-এর status এবং value/reason।

Promise cancel করা যায়?

Promise নিজে না; producing process cancel করা যায়।

Assignment / Task

Instructor 10+ task দিয়েছেন।

Practice areas:

Promise manually create করা

pending, fulfilled, rejected state observe করা

.then() দিয়ে value handle

.catch() দিয়ে error handle

.finally() cleanup

Promise chain

value return

Promise return

error throw

error rethrow

Promise.all()

Promise.any()

Promise.allSettled()

Promise.race()

PizzaHub Promise version

UI update with DOM

Code GitHub repository-তে রাখতে হবে।

Next Lesson

পরবর্তী lesson:

async

await

Promise-based code আরও সহজ করা

async/await debugging

এরপর:

Fetch API deep dive

AbortController

request cancellation

JSON

API handling

Event loop

microtask

macrotask

Final Recap

এই chapter-এ আমরা শিখেছি:

Promise future value-এর placeholder

Promise-এর তিনটি state

executor function

resolve() এবং reject()

একবার settle হলে state আর পরিবর্তন হয় না

.then(), .catch(), .finally()

Promise chaining

.then() থেকে Promise, value বা error

nearest .catch() error handle করে

same Promise-এ repeated .then() chaining নয়

multiple Promise handle করার static methods

Promise নিজে cancel করা যায় না

PizzaHub callback pyramid Promise chain দিয়ে clean করা যায়

Promise বুঝলে asynchronous JavaScript অনেক সহজ হয়ে যায়। Syntax লিখে লিখে practice করো। শুধু পড়ে নয়—নিজে code করো।
