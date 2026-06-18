অবশ্যই। এই কোডটা JavaScript-এর fetch() আর Promise ব্যবহার করে একটি API থেকে data আনে। নিচে একদম step by step বুঝিয়ে দিচ্ছি।

fetch("https://jsonplaceholder.typicode.com/todos/1")
  // promise of response
  .then((res) => res.json())
  // promise of json data
  .then((data) => console.log(data));
পুরো flow এক নজরে

এই কোডে মোটামুটি ৩টা ধাপ আছে:

fetch(...) সার্ভারে request পাঠায়
সার্ভার থেকে response আসে
সেই response থেকে JSON data বের করে console.log() করা হয়
Step 1: fetch(...) কী করে
fetch("https://jsonplaceholder.typicode.com/todos/1")

এখানে fetch() একটি URL-এ HTTP request পাঠাচ্ছে।

এই URL:

https://jsonplaceholder.typicode.com/todos/1

এটা একটি fake API, testing-এর জন্য ব্যবহৃত হয়।

fetch() সঙ্গে সঙ্গে data দেয় না।
এটা একটা Promise return করে।

মানে:

এখনই result ready না
future-এ result আসবে
তাই JavaScript বলে: “result এলে জানাবো”
Step 2: Promise কী

Promise হলো এমন একটা object যা future-এর result represent করে।

এটার ৩টা state থাকতে পারে:

pending → এখনও কাজ চলছে
fulfilled → কাজ সফল হয়েছে
rejected → কাজ failed হয়েছে

fetch() প্রথমে pending থাকে।
যখন server response দেয়, তখন সেটা fulfilled হয়।

Step 3: প্রথম .then(...)
.then((res) => res.json())

এখানে .then() মানে:

আগের Promise সফল হলে এই function চালাও

অর্থাৎ fetch() সফল হলে response object res এ আসবে।

res কী?

res হলো Response object।
এতে server-এর reply থাকে।

এখানে response body-তে JSON আছে, কিন্তু সেটা সরাসরি normal JavaScript object না।

তাই আমরা লিখেছি:

res.json()
res.json() কী করে?

এটা response body-কে JSON থেকে JavaScript object-এ convert করে।

কিন্তু গুরুত্বপূর্ণ ব্যাপার হলো:

res.json() নিজেও একটা Promise return করে

কারণ body parse করতে সামান্য time লাগতে পারে।

Step 4: দ্বিতীয় .then(...)
.then((data) => console.log(data));

এটা আগের res.json() Promise-এর জন্য।

অর্থাৎ:

res.json() যখন JSON parse করে ফেলে
তখন parsed data data নামে পাওয়া যায়
তারপর সেটা console-এ print করা হয়
Step 5: শেষে console-এ কী দেখাবে

এই API call-এর result হবে এমন কিছু:

{
  userId: 1,
  id: 1,
  title: "delectus aut autem",
  completed: false
}

তাই console-এ এটা print হবে।

একদম timeline আকারে

ধরি browser এই কোড execute করছে।

1.
fetch("https://jsonplaceholder.typicode.com/todos/1")

Browser server-এ request পাঠালো।

2.

fetch() সঙ্গে সঙ্গে একটা Promise return করল।

3.
.then((res) => res.json())

JavaScript বলে রাখল:
“response এলে এই function চালাবো”

4.

Server response পাঠালো।

5.

প্রথম .then() run হলো, res পাওয়া গেল।

6.
res.json()

response body JSON থেকে parse হতে শুরু করল।

7.

res.json() আরেকটা Promise return করল।

8.

দ্বিতীয় .then() অপেক্ষা করছে parsed data-এর জন্য।

9.

JSON parse complete হলো।

10.

দ্বিতীয় .then() run হলো।

console.log(data)
11.

Console-এ final object print হলো।

এটা chain আকারে কেন লেখা হয়?

কারণ প্রতিটা ধাপ আগের ধাপের result-এর ওপর depend করে।

fetch(...)
  .then(...)
  .then(...)

এটাকে বলে Promise chaining।

মানে:

আগে response আনো
তারপর JSON বানাও
তারপর data ব্যবহার করো
সহজ ভাষায় analogy

ধরো তুমি খাবার order করেছ।

fetch(...)

তুমি restaurant-এ order দিলে

প্রথম .then((res) => res.json())

ডেলিভারি rider খাবার এনে দিল, এখন box খুলে খাবার বের করছ

দ্বিতীয় .then((data) => console.log(data))

এখন তুমি খাবারটা দেখছ

অর্থাৎ:

fetch = order
res = package
res.json() = package খুলে আসল জিনিস বের করা
data = actual খাবার
res আর data-র পার্থক্য

অনেকে এখানে confuse হয়।

res

এটা full response object

এতে থাকে যেমন:

status code
headers
body
data

এটা body parse করার পর পাওয়া actual data

একটু expanded version

একই কোড একটু বড় করে লিখলে এমন হয়:

fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
  });

এখানে:

প্রথম .then() থেকে res.json() return করা হয়েছে
তাই next .then() সেই parsed data পায়
কেন return res.json() দরকার?

কারণ তুমি যদি এটা return না করো, next .then() data পাবে না।

ঠিকভাবে:

.then((res) => {
  return res.json();
})

ভুলভাবে:

.then((res) => {
  res.json();
})

এখানে return না করলে next step-এ undefined যেতে পারে।

Error handle না করলে কী সমস্যা?

তোমার code-এ error handling নেই।
যদি network error হয়, তাহলে issue হতে পারে।

Better version:

fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log("Error:", err));
.catch(...)

যদি কোথাও error হয়, সেটা handle করবে।

async/await দিয়ে একই জিনিস

একই কাজ modern style-এ এভাবে লেখা যায়:

async function getTodo() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log("Error:", err);
  }
}

getTodo();

এটা same কাজ করে, শুধু পড়তে অনেকের কাছে সহজ লাগে।

এক লাইনে summary

এই কোড:

API-তে request পাঠায়
response পায়
response-এর JSON body parse করে
parsed data console-এ দেখায়