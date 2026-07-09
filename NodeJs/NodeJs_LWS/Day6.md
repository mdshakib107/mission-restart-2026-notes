# Node.js Streams, Buffer, Pipe এবং Request/Response Handling

## Overview

এই অধ্যায়ে Node.js-এর **Streams** এবং **Buffer** নিয়ে বিস্তারিত আলোচনা করা হয়েছে। টিউটোরিয়ালে বিষয়টি বোঝানোর জন্য YouTube, Netflix, Amazon Prime-এর মতো video streaming platform-এর উদাহরণ দেওয়া হয়েছে। আগে কোনো movie দেখতে হলে পুরো file download করে তারপর play করতে হতো। কিন্তু streaming platform-এ video **একবারে পুরোটা download হয় না**; বরং data একটু একটু করে client/browser-এর কাছে আসে এবং আমরা real-time দেখতে পারি।

Node.js-এও একই ধারণা ব্যবহার করা হয়। কোনো বড় file, HTTP request body, file upload, video/audio response, বা large text data একবারে memory-তে load না করে ছোট ছোট অংশে process করা যায়। এই ছোট ছোট অংশকে সাধারণত **chunk** বলা হয়, আর chunk-গুলোর binary representation বা packet-like data structure হলো **Buffer**।

এই notes পড়লে তুমি বুঝবে:

- Stream কী এবং কেন দরকার
- Buffer কী এবং কেন raw binary data হিসেবে দেখা যায়
- `fs.createReadStream()` দিয়ে file streaming
- `req` কেন readable stream
- `res` কেন writable stream
- POST request body কীভাবে chunk আকারে আসে
- `Buffer.concat()` দিয়ে chunk জোড়া লাগানো
- `fs.createWriteStream()` দিয়ে file writing
- `pipe()` দিয়ে readable stream থেকে writable stream-এ data পাঠানো
- বড় file client-কে stream করে response পাঠানো
- common mistakes এবং best practices

---

## Prerequisites

এই অধ্যায় বুঝতে নিচের বিষয়গুলো জানা থাকলে সুবিধা হবে:

| বিষয় | কেন দরকার |
|---|---|
| Basic JavaScript | `const`, function, arrow function, array, template literal বোঝার জন্য |
| Node.js module system | `require('fs')`, `require('http')` বোঝার জন্য |
| Callback এবং Event | `stream.on('data', callback)` বোঝার জন্য |
| Basic HTTP | `req`, `res`, route, method, POST request বোঝার জন্য |
| File System ধারণা | file read/write, path, `__dirname` বোঝার জন্য |
| Terminal command | `node index.js` চালানোর জন্য |

প্র্যাকটিসের জন্য একটি project folder তৈরি করে সেখানে নিচের file-গুলো রাখতে পারো:

```text
lesson-six/
├── index.js
├── bigdata.txt
└── output.txt   // code run করলে তৈরি হতে পারে
```

`bigdata.txt` file-এ অনেক বড় text রাখলে stream-এর behavior ভালোভাবে দেখা যাবে।

---

## Main Concepts

### Core Vocabulary

| Term | সহজ ব্যাখ্যা |
|---|---|
| **Stream** | Data প্রবাহ। Data একবারে না এসে/না গিয়ে ছোট ছোট অংশে প্রবাহিত হয়। |
| **Chunk** | Stream থেকে পাওয়া data-এর ছোট অংশ। |
| **Buffer** | Node.js-এর binary data container। Stream-এর chunk অনেক সময় Buffer আকারে আসে। |
| **Readable Stream** | যেখান থেকে data পড়া যায়। যেমন file read stream, HTTP request object `req`। |
| **Writable Stream** | যেখানে data লেখা যায়। যেমন file write stream, HTTP response object `res`। |
| **`data` event** | readable stream নতুন chunk দিলে এই event fire হয়। |
| **`end` event** | readable stream-এর সব data আসা শেষ হলে এই event fire হয়। |
| **`pipe()`** | readable stream থেকে writable stream-এ data পাঠানোর shortcut method। |
| **`Buffer.concat()`** | একাধিক Buffer chunk জোড়া লাগিয়ে একটি বড় Buffer বানায়। |
| **Encoding** | Binary data-কে readable text বানানোর নিয়ম। যেমন `utf8`। |

---

## Detailed Explanation

## 1. Stream কী?

### ধারণা কী

**Stream** মানে প্রবাহ। Node.js context-এ stream হলো data transfer করার এমন পদ্ধতি যেখানে data একবারে পুরোটা memory-তে load না হয়ে ছোট ছোট অংশে আসে বা যায়।

টিউটোরিয়ালে stream বোঝাতে ঝর্ণার analogy ব্যবহার করা হয়েছে:

```text
ঝর্ণা থেকে পানি একবারে পুরোটা পড়ে না।
ফোঁটা ফোঁটা বা ধারার মতো আসতে থাকে।
Node.js stream-এ data-ও একইভাবে chunk আকারে আসে।
```

### কেন দরকার

ধরো server-এ 10 MB, 100 MB বা 1 GB file আছে। Client সেই file request করেছে।

একবারে পুরো file read করলে:

1. Server-কে পুরো file memory-তে load করতে হবে।
2. Client-কে response পাওয়ার জন্য অপেক্ষা করতে হবে।
3. বড় file হলে memory pressure তৈরি হবে।
4. Server একই সময়ে অনেক request handle করতে গেলে performance কমে যাবে।

Stream ব্যবহার করলে:

1. File একটু একটু করে read হয়।
2. Client data পেতে শুরু করে দ্রুত।
3. Memory-efficient হয়।
4. Large file, upload, download, video/audio streaming-এ performance ভালো হয়।

### কীভাবে কাজ করে

Stream source থেকে data ছোট ছোট **chunk** আকারে আসে। প্রত্যেক chunk একটি event trigger করে। Node.js-এ readable stream সাধারণত `data` event emit করে।

```text
Source file / Request body
        ↓
Chunk 1 → data event
Chunk 2 → data event
Chunk 3 → data event
        ↓
end event
```

### বাস্তব জীবনে কোথায় ব্যবহার হয়

| বাস্তব ব্যবহার | Stream কেন দরকার |
|---|---|
| Video streaming | পুরো video download না করে real-time play করা |
| File download | বড় file response হিসেবে chunk আকারে পাঠানো |
| File upload | client থেকে server-এ file chunk আকারে নেওয়া |
| Log processing | বড় log file line/chunk ধরে process করা |
| API response | বড় JSON/text response progressively পাঠানো |
| Proxy server | এক server থেকে data এনে অন্য client-কে stream করা |

### ছোট উদাহরণ

একটা movie download করার পুরোনো পদ্ধতি হলো bucket ভরে তারপর ব্যবহার করার মতো। Streaming হলো shower-এর মতো—পানি আসছে এবং তুমি সাথে সাথে ব্যবহার করতে পারছ।

টিউটোরিয়ালে shower vs bucket analogy দেওয়া হয়েছে:

- **Bucket method:** পুরো bucket না ভরা পর্যন্ত অপেক্ষা করতে হয়।
- **Shower method:** পানি আসা শুরু হলেই ব্যবহার করা যায়।

Node.js stream হলো shower method-এর মতো।

### মনে রাখার মতো পয়েন্ট

- Stream data একবারে দেয় না।
- Stream event-driven।
- `data` event-এ chunk পাওয়া যায়।
- `end` event-এ বোঝা যায় data আসা শেষ।
- বড় data handle করার জন্য stream খুব গুরুত্বপূর্ণ।

---

## 2. Buffer কী?

### ধারণা কী

**Buffer** হলো Node.js-এর একটি special object, যা binary data ধরে রাখে। Browser JavaScript-এ আমরা সাধারণত string, number, boolean, object, array নিয়ে কাজ করি। Node.js server-side runtime হওয়ায় file system, network, TCP, HTTP request body ইত্যাদির raw binary data নিয়েও কাজ করতে হয়। সেই binary data handle করার জন্য Buffer দরকার।

Stream থেকে পাওয়া chunk অনেক সময় Buffer হিসেবে আসে।

Example output:

```text
<Buffer 48 65 6c 6c 6f 20 50 72 6f 67 72 61 6d 6d 65 72 73 ...>
```

এটি readable text নয়; এটি binary representation।

### কেন দরকার

Computer network বা file system data internally binary আকারে process করে। Text, image, video, audio—সবকিছু শেষ পর্যন্ত binary data। Node.js এই raw data chunk আকারে পায়, তাই Buffer দরকার হয়।

### কীভাবে কাজ করে

Data stream ছোট ছোট অংশে আসে। সেই অংশগুলো Node.js Buffer object হিসেবে expose করতে পারে। তুমি চাইলে:

- Buffer সরাসরি process করতে পারো
- `toString()` দিয়ে text বানাতে পারো
- `Buffer.concat()` দিয়ে multiple Buffer জোড়া লাগাতে পারো
- `utf8` encoding দিয়ে শুরুতেই readable text পেতে পারো

### Buffer থেকে string করা

```js
const text = chunk.toString();
console.log(text);
```

অথবা stream তৈরি করার সময় encoding দিয়ে দেওয়া যায়:

```js
const myReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`, 'utf8');
```

এ ক্ষেত্রে `data` event-এর `chunk` সরাসরি string হিসেবে পাওয়া যায়।

### বাস্তব জীবনে কোথায় ব্যবহার হয়

| Use case | Buffer-এর ভূমিকা |
|---|---|
| HTTP request body | POST body chunk হিসেবে Buffer আকারে আসে |
| File read | raw file data Buffer হিসেবে পাওয়া যায় |
| File upload | uploaded file chunks Buffer হিসেবে process হয় |
| TCP socket | network packet Buffer হিসেবে আসে |
| Image processing | binary image data Buffer হিসেবে handle করা হয় |

### সতর্কতা

Buffer মানেই final readable data নয়। Buffer হলো raw data holder। Text data হলে encoding জানা জরুরি। ভুল encoding দিলে text corrupted দেখাতে পারে।

---

## 3. Chunk কী?

### ধারণা কী

**Chunk** হলো stream থেকে পাওয়া ছোট data piece। Stream চলাকালীন একাধিক chunk আসতে পারে। File যত বড়, chunk তত বেশি হতে পারে।

```text
bigdata.txt
   ↓
chunk 1
chunk 2
chunk 3
chunk 4
...
```

### কেন দরকার

Chunk ছাড়া stream-এর সুবিধা পাওয়া যায় না। Chunk আকারে data process করার কারণেই পুরো file memory-তে নিতে হয় না।

### কীভাবে কাজ করে

Readable stream যখনই নতুন chunk পায়, তখন `data` event emit করে:

```js
myReadStream.on('data', (chunk) => {
    console.log(chunk);
});
```

প্রতিবার callback call হবে একটি নতুন chunk নিয়ে।

### মনে রাখার মতো পয়েন্ট

- Chunk size তুমি সাধারণত control করো না; Node.js internal buffering ব্যবহার করে।
- একটি file ১ chunk বা অনেক chunk হতে পারে।
- ছোট data হলে এক chunk-এই শেষ হতে পারে।
- বড় data হলে অনেকবার `data` event fire হবে।

---

## 4. Read Stream: File থেকে data streaming

### ধারণা কী

**Read Stream** হলো এমন stream যেখান থেকে data read করা যায়। Node.js `fs` module-এর `createReadStream()` method দিয়ে file read stream তৈরি করা যায়।

### কেন দরকার

`fs.readFile()` পুরো file memory-তে load করে callback-এ data দেয়। কিন্তু `fs.createReadStream()` file-কে chunk আকারে read করে।

### Basic Code

```js
const fs = require('fs');

const myReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`);

myReadStream.on('data', (chunk) => {
    console.log(chunk);
});
```

### Code ব্যাখ্যা

```js
const fs = require('fs');
```

Node.js-এর built-in **File System** module import করা হলো। File read/write করার জন্য `fs` module দরকার।

```js
const myReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`);
```

`bigdata.txt` file-এর জন্য একটি readable stream তৈরি করা হলো।

- `__dirname` current file যে directory-তে আছে সেই path দেয়।
- Template literal দিয়ে full file path তৈরি করা হয়েছে।
- `createReadStream()` file একবারে read না করে stream object return করে।

```js
myReadStream.on('data', (chunk) => {
    console.log(chunk);
});
```

`data` event listen করা হচ্ছে। যখনই stream নতুন chunk পাবে, callback run হবে।

### Output কেন Buffer দেখায়?

যদি encoding না দেওয়া হয়, output Buffer হিসেবে দেখা যায়:

```text
<Buffer 54 68 69 73 20 69 73 ...>
```

Text দেখতে চাইলে দুইভাবে করা যায়।

### পদ্ধতি ১: Stream তৈরি করার সময় encoding দেওয়া

```js
const fs = require('fs');

const myReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`, 'utf8');

myReadStream.on('data', (chunk) => {
    console.log(chunk);
});
```

এখন `chunk` string হিসেবে আসবে।

### পদ্ধতি ২: প্রতিটি chunk-এ `toString()` call করা

```js
const fs = require('fs');

const myReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`);

myReadStream.on('data', (chunk) => {
    console.log(chunk.toString());
});
```

### Async behavior বোঝা

```js
const fs = require('fs');

const myReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`, 'utf8');

myReadStream.on('data', (chunk) => {
    console.log(chunk);
});

console.log('hello');
```

Output-এ অনেক সময় `hello` আগে দেখা যাবে। কারণ:

- `.on('data', ...)` listener register করে।
- Data আসলে callback পরে run হয়।
- JavaScript পরের line execute করে দেয়।
- Stream event-driven ও asynchronous behavior follow করে।

### মনে রাখার মতো পয়েন্ট

- `createReadStream()` নিজে data return করে না; stream return করে।
- Data পেতে event listen করতে হয়।
- `data` event বহুবার fire হতে পারে।
- Text data হলে `utf8` বা `toString()` দরকার।
- File missing হলে error হতে পারে, তাই `error` event handle করা উচিত।

### Improved example with error handling

```js
const fs = require('fs');

const myReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`, 'utf8');

myReadStream.on('data', (chunk) => {
    console.log('New chunk received:');
    console.log(chunk);
});

myReadStream.on('end', () => {
    console.log('Reading finished');
});

myReadStream.on('error', (error) => {
    console.error('File read error:', error.message);
});
```

---

## 5. `fs.readFile()` বনাম `fs.createReadStream()`

| বিষয় | `fs.readFile()` | `fs.createReadStream()` |
|---|---|---|
| Data loading | পুরো file memory-তে নেয় | chunk আকারে read করে |
| Memory usage | বড় file হলে বেশি | তুলনামূলক কম |
| Callback | file read শেষ হলে একবার callback | chunk আসলে বারবার event |
| Best for | ছোট file/config | বড় file/log/video/download |
| Streaming response | Manual response দিতে হয় | `pipe(res)` করা যায় |
| Performance | বড় file-এ costly | বড় file-এ efficient |

### কখন কোনটা ব্যবহার করব?

**ছোট file:**  
Config file, small JSON file, template file হলে `readFile()` ব্যবহার করা যায়।

**বড় file:**  
Large text, log, media, download response, upload processing হলে stream ব্যবহার করা ভালো।

---

## 6. HTTP Request object `req` একটি Readable Stream

### ধারণা কী

Node.js HTTP server-এ callback function-এর মধ্যে আমরা দুটি object পাই:

```js
(req, res) => {}
```

এখানে:

- `req` = Incoming request
- `res` = Outgoing response

`req` object নিজেই একটি **readable stream**। Client যখন POST request body পাঠায়, body একবারে `req.data`-তে পাওয়া যায় না। বরং request body chunk আকারে stream হয়ে আসে।

### কেন `req.data` undefined?

অনেক beginner ভাবে:

```js
console.log(req.data);
```

এখানে form data পাওয়া যাবে। কিন্তু Node.js raw HTTP module-এ body এভাবে পাওয়া যায় না। কারণ body stream আকারে আসে। তাই event listen করতে হয়:

```js
req.on('data', (chunk) => {
    // chunk পাওয়া যায়
});
```

সব chunk আসা শেষ হলে:

```js
req.on('end', () => {
    // এখন পুরো body পাওয়া/parse করা যাবে
});
```

### বাস্তব ব্যবহার

| কাজ | Request stream-এর ভূমিকা |
|---|---|
| Form submission | input data body হিসেবে আসে |
| File upload | uploaded file chunk আকারে আসে |
| JSON API | request JSON body stream হয়ে আসে |
| Webhook | third-party service payload stream করে পাঠায় |
| Large POST body | memory-efficient handling দরকার |

---

## 7. POST Form এবং Request Body Stream

নিচের code-টি user-provided example এবং transcript-এর request body stream অংশের সাথে মিলে যায়।

> গুরুত্বপূর্ণ: এই code block-টি আলাদা example হিসেবে চালাতে হবে। আগের `server.listen(3000)` code-এর সাথে একই file-এ একসাথে চালালে duplicate declaration বা port conflict হতে পারে।

### Full Code

```js
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('<html><head><title>Form</title></head>');
        res.write(
            '<body><form method="post" action="/process"><input name="message" /></form></body>'
        );
        res.end();
    } else if (req.url === '/process' && req.method === 'POST') {
        const body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            console.log('stream finished');

            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);

            res.write('Thank you for submitting');
            res.end();
        });
    } else {
        res.write('Not found');
        res.end();
    }
});

server.listen(3000);

console.log('listening on port 3000');
```

### Code ব্যাখ্যা

```js
const http = require('http');
```

Node.js built-in `http` module import করা হলো। HTTP server তৈরি করতে এটি দরকার।

```js
const server = http.createServer((req, res) => {
```

একটি server তৈরি করা হলো। Client request করলে callback run হবে। এখানে `req` readable stream এবং `res` writable stream।

```js
if (req.url === '/') {
```

Home route check করা হচ্ছে। Browser থেকে `http://localhost:3000/` hit করলে এই block run হবে।

```js
res.write('<html><head><title>Form</title></head>');
```

Response body-তে HTML-এর প্রথম অংশ লেখা হচ্ছে।

```js
res.write(
    '<body><form method="post" action="/process"><input name="message" /></form></body>'
);
```

একটি HTML form পাঠানো হচ্ছে।

- `method="post"` মানে form data HTTP POST body হিসেবে যাবে।
- `action="/process"` মানে submit করলে request যাবে `/process` route-এ।
- `<input name="message" />` input field-এর name হলো `message`। তাই body-তে data আসবে `message=value` format-এ।

```js
res.end();
```

Response শেষ করা হলো। এটি না দিলে browser অপেক্ষা করতে পারে।

```js
} else if (req.url === '/process' && req.method === 'POST') {
```

`/process` route এবং method `POST` হলে form submission handle করা হবে।

```js
const body = [];
```

সব chunk জমা রাখার জন্য একটি array তৈরি করা হলো। কারণ body একবারে আসবে না; chunk আকারে আসবে।

```js
req.on('data', (chunk) => {
    body.push(chunk);
});
```

Request stream-এর `data` event listen করা হচ্ছে। প্রতিটি incoming chunk `body` array-তে push করা হচ্ছে।

```js
req.on('end', () => {
```

সব chunk আসা শেষ হলে `end` event fire হবে। এই event-এর আগে পুরো body পাওয়া নিশ্চিত নয়।

```js
console.log('stream finished');
```

Stream শেষ হয়েছে বোঝানোর জন্য log।

```js
const parsedBody = Buffer.concat(body).toString();
```

এটি এই example-এর সবচেয়ে গুরুত্বপূর্ণ line।

- `body` array-তে multiple Buffer chunk আছে।
- `Buffer.concat(body)` সব Buffer chunk জোড়া লাগায়।
- `.toString()` Buffer-কে readable string বানায়।

Example output:

```text
message=hello
```

যদি input field-এ `hello` লেখা হয়।

```js
console.log(parsedBody);
```

Parsed body console-এ print করা হচ্ছে। তবে এখানে এখনো URL decoding বা proper parsing করা হয়নি।

```js
res.write('Thank you for submitting');
res.end();
```

Client-কে response পাঠানো হচ্ছে।

### Form body কেন `message=hello` আকারে আসে?

HTML form default হিসেবে `application/x-www-form-urlencoded` format-এ data পাঠায়। তাই input-এর name এবং value `key=value` format-এ যায়।

Example:

```text
message=Hello%20Programmers
```

এখানে `%20` মানে space। Proper parsing করতে `querystring` বা `URLSearchParams` ব্যবহার করা যায়।

### Improved parsing example

```js
const parsedBody = Buffer.concat(body).toString();
const params = new URLSearchParams(parsedBody);
const message = params.get('message');

console.log(message);
```

### Submit button না থাকলে কী হবে?

User-provided code-এ submit button নেই:

```html
<input name="message" />
```

Browser-এ input field-এর ভিতর focus রেখে Enter চাপলে form submit হতে পারে। তবে beginner-friendly করার জন্য submit button দিলে ভালো:

```html
<form method="post" action="/process">
    <input name="message" />
    <button type="submit">Submit</button>
</form>
```

### মনে রাখার মতো পয়েন্ট

- `req` থেকে body সরাসরি পাওয়া যায় না।
- `req.on('data')` দিয়ে chunk নিতে হয়।
- `req.on('end')` দিয়ে শেষ হওয়া জানতে হয়।
- `Buffer.concat()` দিয়ে chunks combine করতে হয়।
- Form data string parse করতে হয়।

---

## 8. Write Stream: File-এ data streaming করে লেখা

### ধারণা কী

**Write Stream** হলো এমন stream যেখানে data লেখা যায়। Node.js `fs.createWriteStream()` দিয়ে writable file stream তৈরি করা যায়।

### কেন দরকার

ধরো একটি বড় file read করে আরেকটি file-এ copy করতে হবে। `fs.readFile()` + `fs.writeFile()` করলে পুরো data memory-তে load হবে। কিন্তু read stream + write stream ব্যবহার করলে data chunk ধরে read এবং write হবে।

### Basic Code

```js
const fs = require('fs');

const myReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`, 'utf8');
const myWriteStream = fs.createWriteStream(`${__dirname}/output.txt`);

myReadStream.on('data', (chunk) => {
    myWriteStream.write(chunk);
});
```

### Code ব্যাখ্যা

```js
const myReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`, 'utf8');
```

`bigdata.txt` file থেকে data read করার stream তৈরি হলো।

```js
const myWriteStream = fs.createWriteStream(`${__dirname}/output.txt`);
```

`output.txt` file-এ data লেখার stream তৈরি হলো। File না থাকলে তৈরি হবে। থাকলে সাধারণত overwrite behavior হতে পারে।

```js
myReadStream.on('data', (chunk) => {
```

প্রতিটি chunk পাওয়ার সময় callback run হবে।

```js
myWriteStream.write(chunk);
```

যে chunk read হলো, সেটি write stream-এ লিখে দেওয়া হলো।

### Flow

```text
bigdata.txt
   ↓ read stream
chunk 1 → output.txt
chunk 2 → output.txt
chunk 3 → output.txt
...
```

### বাস্তব ব্যবহার

| কাজ | Write stream কেন দরকার |
|---|---|
| File copy | বড় file memory-তে না তুলে copy করা |
| Upload save | client upload stream server file-এ লেখা |
| Logging | continuously log file-এ লেখা |
| Export | বড় report/CSV ধাপে ধাপে generate করা |
| Backup | stream করে অন্য storage/file-এ লেখা |

### সতর্কতা

এই code কাজ করলেও production-level code-এ `error`, `finish`, backpressure ইত্যাদি handle করা ভালো। `pipe()` বা `pipeline()` ব্যবহার করলে অনেক কিছু সহজ হয়।

---

## 9. Pipe: Readable Stream থেকে Writable Stream-এ shortcut

### ধারণা কী

`pipe()` হলো readable stream-এর method। এটি readable stream থেকে data নিয়ে writable stream-এ পাঠায়।

Manual way:

```js
myReadStream.on('data', (chunk) => {
    myWriteStream.write(chunk);
});
```

Pipe way:

```js
myReadStream.pipe(myWriteStream);
```

দুটি code-এর মূল উদ্দেশ্য একই: source থেকে data পড়ে destination-এ লেখা।

### কেন দরকার

Read stream থেকে write stream-এ data পাঠানো খুব common task। তাই Node.js এটাকে সহজ করার জন্য `pipe()` দিয়েছে।

### File copy using pipe

```js
const fs = require('fs');

const myReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`, 'utf8');
const myWriteStream = fs.createWriteStream(`${__dirname}/output.txt`);

myReadStream.pipe(myWriteStream);
```

### Code ব্যাখ্যা

```js
myReadStream.pipe(myWriteStream);
```

এখানে:

- `myReadStream` readable stream
- `myWriteStream` writable stream
- `pipe()` readable থেকে data নিয়ে writable-তে লিখে দেয়

### Pipe analogy

একটি pipe কল্পনা করো:

```text
Water source → pipe → bucket
Readable stream → pipe() → writable stream
```

Node.js stream-এর ক্ষেত্রে:

```text
bigdata.txt → read stream → pipe → output.txt
```

### মনে রাখার মতো পয়েন্ট

- `pipe()` readable stream-এর উপর call করতে হয়।
- `pipe()`-এর argument writable stream।
- File copy, HTTP response, compression, proxying—সব জায়গায় pipe খুব useful।
- Pipe streaming workflow-কে cleaner করে।

---

## 10. HTTP Response object `res` একটি Writable Stream

### ধারণা কী

Node.js HTTP server-এ `res` object হলো writable stream। Client/browser-এর দিকে response data লেখা যায়।

তাই file read stream সরাসরি response stream-এ pipe করা যায়।

### User-provided final streaming example

```js
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const myReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`, 'utf8');
    myReadStream.pipe(res);
});

server.listen(3000);

console.log('listening on port 3000');
```

### Code ব্যাখ্যা

```js
const http = require('http');
const fs = require('fs');
```

দুটি core module import করা হলো:

- `http`: server তৈরি করতে
- `fs`: file read stream তৈরি করতে

```js
const server = http.createServer((req, res) => {
```

HTTP server তৈরি হলো। প্রতি request-এ callback run হবে।

```js
const myReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`, 'utf8');
```

`bigdata.txt` file-এর readable stream তৈরি হলো। `utf8` encoding দেওয়া হয়েছে, তাই text readable format-এ stream হবে।

```js
myReadStream.pipe(res);
```

এখানে মূল magic:

- `myReadStream` হলো readable stream।
- `res` হলো writable stream।
- `pipe(res)` মানে file stream-এর data সরাসরি HTTP response হিসেবে client/browser-এ পাঠানো।

```js
server.listen(3000);
```

Server port `3000`-এ listen করছে।

```js
console.log('listening on port 3000');
```

Server চালু হয়েছে বোঝানোর log।

### Browser-এ কী হবে?

Browser-এ যাও:

```text
http://localhost:3000
```

Server `bigdata.txt` file read করবে এবং response হিসেবে stream করবে। Client পুরো file একবারে না পেয়ে chunk আকারে পাবে।

### Improved version with headers and error handling

```js
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, 'bigdata.txt');
    const myReadStream = fs.createReadStream(filePath, 'utf8');

    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

    myReadStream.pipe(res);

    myReadStream.on('error', (error) => {
        console.error(error.message);

        if (!res.headersSent) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        }

        res.end('Server error while reading file');
    });
});

server.listen(3000);

console.log('listening on port 3000');
```

### কেন `path.join()` ব্যবহার করা হয়েছে?

User-provided code-এ path তৈরি করা হয়েছে:

```js
`${__dirname}/bigdata.txt`
```

এটি Unix/Mac/Linux style path-এ কাজ করে। Cross-platform code-এর জন্য `path.join(__dirname, 'bigdata.txt')` বেশি safe, কারণ Windows path separator আলাদা হতে পারে।

### মনে রাখার মতো পয়েন্ট

- `res.write()` manual writing করে।
- `res.end()` response শেষ করে।
- `readStream.pipe(res)` stream করে response পাঠায় এবং সাধারণ case-এ stream শেষ হলে response-ও শেষ হয়।
- `res` writable stream হওয়ায় pipe destination হতে পারে।

---

## 11. Request এবং Response: Readable বনাম Writable Stream

| Object | Stream Type | কাজ |
|---|---|---|
| `req` | Readable Stream | Client থেকে আসা request body read করা |
| `res` | Writable Stream | Client-এর কাছে response write করা |
| File read stream | Readable Stream | File থেকে data read করা |
| File write stream | Writable Stream | File-এ data write করা |

### Example Mapping

```text
Client POST body → req readable stream → chunks → Buffer.concat()
File data → fs read stream → pipe() → res writable stream → Browser
File data → fs read stream → pipe() → fs write stream → output file
```

---

## 12. Express.js এর সাথে সম্পর্ক

টিউটোরিয়ালে বলা হয়েছে, raw Node.js-এ request body manually chunk ধরে collect করতে হয়। কিন্তু Express.js ব্যবহার করলে এই কাজগুলো অনেক সহজ হয়ে যায়।

Express-এর middleware যেমন:

```js
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
```

এসব middleware internally request stream read করে body parse করে দেয়। তাই Express route-এ আমরা সহজে লিখি:

```js
app.post('/process', (req, res) => {
    console.log(req.body);
    res.send('Thank you for submitting');
});
```

কিন্তু ভিতরে concept একই:

```text
req stream → data chunks → Buffer/body collection → parse → req.body
```

### কেন raw Node.js শেখা দরকার?

Framework ব্যবহার করলে কাজ সহজ হয়, কিন্তু behind the scenes কী হচ্ছে না বুঝলে problem debug করা কঠিন হয়। Stream, Buffer, request body parsing বুঝলে Express, NestJS, Fastify, file upload library—সবকিছু অনেক clear হয়।

---

# Code Examples

## Example 1: File Read Stream without Encoding

```js
const fs = require('fs');

const myReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`);

myReadStream.on('data', (chunk) => {
    console.log(chunk);
});
```

Expected output Buffer আকারে হতে পারে:

```text
<Buffer 48 65 6c 6c 6f ...>
```

### গুরুত্বপূর্ণ লাইন

```js
fs.createReadStream(`${__dirname}/bigdata.txt`)
```

এটি file-এর জন্য readable stream তৈরি করে।

```js
myReadStream.on('data', ...)
```

প্রতিটি chunk আসলে callback run হয়।

---

## Example 2: File Read Stream with `utf8`

```js
const fs = require('fs');

const myReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`, 'utf8');

myReadStream.on('data', (chunk) => {
    console.log(chunk);
});
```

এখানে `chunk` readable text হিসেবে পাওয়া যাবে।

---

## Example 3: Buffer chunk থেকে string

```js
const fs = require('fs');

const myReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`);

myReadStream.on('data', (chunk) => {
    console.log(chunk.toString());
});
```

Encoding stream creation-এর সময় না দিলেও `toString()` দিয়ে text পাওয়া যায়।

---

## Example 4: Request body collect করা

```js
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/process' && req.method === 'POST') {
        const body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);

            res.write('Thank you for submitting');
            res.end();
        });
    }
});

server.listen(3000);
```

### Flow

```text
POST request body
   ↓
req readable stream
   ↓
data event → chunk → body.push(chunk)
   ↓
end event
   ↓
Buffer.concat(body).toString()
```

---

## Example 5: File read করে file write করা

```js
const fs = require('fs');

const myReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`, 'utf8');
const myWriteStream = fs.createWriteStream(`${__dirname}/output.txt`);

myReadStream.on('data', (chunk) => {
    myWriteStream.write(chunk);
});
```

এখানে `bigdata.txt` থেকে chunk read হয়ে `output.txt`-এ write হচ্ছে।

---

## Example 6: Same task using `pipe()`

```js
const fs = require('fs');

const myReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`, 'utf8');
const myWriteStream = fs.createWriteStream(`${__dirname}/output.txt`);

myReadStream.pipe(myWriteStream);
```

Manual `data` event + `write()` এর shortcut হলো `pipe()`।

---

## Example 7: File stream করে HTTP response পাঠানো

```js
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const myReadStream = fs.createReadStream(`${__dirname}/bigdata.txt`, 'utf8');
    myReadStream.pipe(res);
});

server.listen(3000);

console.log('listening on port 3000');
```

### Flow

```text
bigdata.txt
   ↓
fs.createReadStream()
   ↓
pipe(res)
   ↓
Browser receives streamed response
```

---

## Example 8: Complete form + POST body example with better HTML

```js
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

        res.write(`
            <html>
                <head>
                    <title>Form</title>
                </head>
                <body>
                    <form method="post" action="/process">
                        <input name="message" />
                        <button type="submit">Submit</button>
                    </form>
                </body>
            </html>
        `);

        res.end();
    } else if (req.url === '/process' && req.method === 'POST') {
        const body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const params = new URLSearchParams(parsedBody);
            const message = params.get('message');

            console.log('Raw body:', parsedBody);
            console.log('Message:', message);

            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Thank you for submitting');
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not found');
    }
});

server.listen(3000);

console.log('listening on port 3000');
```

---

# Common Mistakes

## 1. দুইটি server example একই file-এ একসাথে চালানো

User-provided paste-এ দুটি আলাদা server example আছে। এগুলো একই `index.js` file-এ একসাথে চালালে সমস্যা হতে পারে:

```js
const http = require('http');
// ...
server.listen(3000);

// আবার
const http = require('http');
// ...
server.listen(3000);
```

সম্ভাব্য সমস্যা:

- `Identifier 'http' has already been declared`
- `Identifier 'server' has already been declared`
- `EADDRINUSE: address already in use :::3000`

### সমাধান

প্রতিটি example আলাদা file-এ রাখো:

```text
stream-response.js
form-post-stream.js
```

তারপর আলাদা করে run করো:

```bash
node stream-response.js
node form-post-stream.js
```

---

## 2. `req.data` থেকে body পাওয়ার চেষ্টা করা

ভুল:

```js
console.log(req.data); // undefined
```

সঠিক:

```js
const body = [];

req.on('data', (chunk) => {
    body.push(chunk);
});

req.on('end', () => {
    const parsedBody = Buffer.concat(body).toString();
    console.log(parsedBody);
});
```

---

## 3. `end` event-এর আগে final body ব্যবহার করা

ভুল:

```js
const body = [];

req.on('data', (chunk) => {
    body.push(chunk);
});

const parsedBody = Buffer.concat(body).toString(); // ভুল জায়গা
```

এখানে body incomplete হতে পারে। সঠিক জায়গা হলো `end` event-এর ভিতর।

---

## 4. Buffer দেখে ভয় পাওয়া

Output যদি এমন হয়:

```text
<Buffer 6d 65 73 73 61 67 65 ...>
```

এটি error নয়। এটি Buffer। Text পেতে:

```js
chunk.toString()
```

অথবা:

```js
fs.createReadStream(filePath, 'utf8')
```

---

## 5. বড় file-এর জন্য `readFile()` ব্যবহার করা

ছোট file হলে okay, কিন্তু বড় file হলে stream ব্যবহার করা ভালো।

ভুল approach:

```js
fs.readFile('bigdata.txt', (err, data) => {
    res.end(data);
});
```

ভালো approach:

```js
fs.createReadStream('bigdata.txt').pipe(res);
```

---

## 6. Error event handle না করা

ভুল:

```js
fs.createReadStream('missing.txt').pipe(res);
```

File না থাকলে server crash বা unhandled error হতে পারে।

ভালো:

```js
const readStream = fs.createReadStream('missing.txt');

readStream.on('error', (error) => {
    res.writeHead(404);
    res.end('File not found');
});

readStream.pipe(res);
```

---

## 7. Response শেষ না করা

Manual `res.write()` ব্যবহার করলে শেষে `res.end()` দিতে হয়।

```js
res.write('Hello');
res.end();
```

না দিলে browser request pending দেখাতে পারে।

---

## 8. Form body parse না করা

Raw body:

```text
message=Hello%20World
```

এটি directly final message নয়। Parse করতে হবে:

```js
const params = new URLSearchParams(parsedBody);
const message = params.get('message');
```

---

## 9. Request body size limit না রাখা

এই tutorial-এ concept বোঝানোর জন্য body array-তে সব chunk জমা রাখা হয়েছে:

```js
const body = [];
body.push(chunk);
```

ছোট form input-এর জন্য এটি acceptable। কিন্তু production-এ কেউ huge body পাঠালে memory issue হতে পারে।

Better idea:

- body size limit রাখা
- upload হলে stream directly file/cloud storage-এ pipe করা
- Express/Fastify middleware ব্যবহার করলে limit configure করা

---

## 10. Content-Type header না দেওয়া

HTML response পাঠালে header দিলে browser ঠিকভাবে বুঝতে পারে:

```js
res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
```

Text response:

```js
res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
```

---

# Best Practices

## 1. বড় data হলে stream ব্যবহার করো

Large file, file upload, video/audio, logs, reports—এসব ক্ষেত্রে stream memory-efficient।

## 2. Text stream হলে encoding দাও

```js
fs.createReadStream(filePath, 'utf8');
```

অথবা chunk-এর উপর:

```js
chunk.toString();
```

## 3. Readable থেকে Writable-এ data পাঠাতে `pipe()` ব্যবহার করো

Manual code:

```js
readStream.on('data', (chunk) => {
    writeStream.write(chunk);
});
```

Cleaner code:

```js
readStream.pipe(writeStream);
```

## 4. Error handle করো

```js
readStream.on('error', (error) => {
    console.error(error.message);
});
```

Stream-based application-এ error event handle করা খুব গুরুত্বপূর্ণ।

## 5. Same object দিয়ে emit/listen concept মনে রাখো

আগের events tutorial-এর মতো stream-এও event listener গুরুত্বপূর্ণ। যেই stream object থেকে event আসবে, সেই object-এর উপরই listener বসাতে হবে।

## 6. Response timing ঠিক রাখো

যদি request body পুরোটা process করার পরে response দিতে চাও, response code `end` event-এর ভিতরে রাখো:

```js
req.on('end', () => {
    res.end('Done');
});
```

## 7. Path handling-এ `path.join()` ব্যবহার করো

```js
const path = require('path');

const filePath = path.join(__dirname, 'bigdata.txt');
```

Cross-platform compatibility ভালো থাকে।

## 8. Production-level pipe-এর জন্য `pipeline()` বিবেচনা করো

এই transcript-এ `pipe()` শেখানো হয়েছে। Production code-এ `stream.pipeline()` error handling এবং cleanup-এর জন্য আরও robust।

Example:

```js
const { pipeline } = require('stream');

pipeline(readStream, writeStream, (error) => {
    if (error) {
        console.error('Pipeline failed:', error.message);
    } else {
        console.log('Pipeline succeeded');
    }
});
```

## 9. Framework ব্যবহার করলেও raw concept বুঝে রাখো

Express.js request body parse করে দেয়, কিন্তু ভিতরে stream + buffer concept-ই কাজ করে। তাই raw Node.js শেখা debugging-এর জন্য খুব useful।

---

# Concept-by-Concept Summary

## Stream

| প্রশ্ন | উত্তর |
|---|---|
| কী? | Data প্রবাহ |
| কেন দরকার? | বড় data memory-efficient ভাবে process করার জন্য |
| কীভাবে কাজ করে? | Chunk আকারে data আসে/যায় |
| ব্যবহার | File read/write, HTTP request/response, upload/download |
| সতর্কতা | Event-based; direct return value আশা করা যাবে না |

## Buffer

| প্রশ্ন | উত্তর |
|---|---|
| কী? | Binary data holder |
| কেন দরকার? | Network/file system raw data handle করার জন্য |
| কীভাবে কাজ করে? | Chunk Buffer object হিসেবে আসে |
| ব্যবহার | Request body, file read, upload |
| সতর্কতা | Text পেতে encoding বা `toString()` দরকার |

## Readable Stream

| প্রশ্ন | উত্তর |
|---|---|
| কী? | যেখান থেকে data read করা যায় |
| Example | `fs.createReadStream()`, `req` |
| Main events | `data`, `end`, `error` |
| ব্যবহার | File read, request body read |
| সতর্কতা | Data একবারে পাওয়া যায় না |

## Writable Stream

| প্রশ্ন | উত্তর |
|---|---|
| কী? | যেখানে data write করা যায় |
| Example | `fs.createWriteStream()`, `res` |
| Main methods | `write()`, `end()` |
| ব্যবহার | File write, HTTP response |
| সতর্কতা | Manual write করলে response end করতে হবে |

## Pipe

| প্রশ্ন | উত্তর |
|---|---|
| কী? | Readable stream থেকে Writable stream-এ data পাঠানোর shortcut |
| Syntax | `readStream.pipe(writeStream)` |
| ব্যবহার | File copy, file response, proxy |
| সতর্কতা | Error handling করা জরুরি |

---

# Quick Revision

- Stream মানে data flow; data একবারে না এসে chunk আকারে আসে।
- Buffer হলো binary data container।
- File stream করতে `fs.createReadStream()` ব্যবহার করা হয়।
- Write stream করতে `fs.createWriteStream()` ব্যবহার করা হয়।
- `data` event প্রতিটি chunk পাওয়ার সময় fire হয়।
- `end` event stream শেষ হলে fire হয়।
- `req` একটি readable stream; request body `req.data`-তে পাওয়া যায় না।
- `res` একটি writable stream; response data `res.write()` বা `pipe(res)` দিয়ে পাঠানো যায়।
- POST body collect করতে chunks array-তে রাখতে হয়।
- সব chunks combine করতে `Buffer.concat(body).toString()` ব্যবহার করা যায়।
- Text data হলে `utf8` encoding বা `toString()` দরকার।
- `pipe()` manual `data` event + `write()` workflow-এর shortcut।
- Large file response পাঠাতে `fs.createReadStream(file).pipe(res)` খুব কার্যকর।
- Express.js এগুলো abstract করে, কিন্তু ভিতরে stream/buffer concept কাজ করে।

---

# Interview / Exam Style Questions

## 1. Stream কী?

Stream হলো data transfer করার এমন একটি পদ্ধতি যেখানে data একবারে পুরোটা না এসে/না গিয়ে ছোট ছোট chunk আকারে প্রবাহিত হয়।

## 2. Buffer কী?

Buffer হলো Node.js-এর binary data container। File system বা network থেকে আসা raw binary data Buffer আকারে পাওয়া যেতে পারে।

## 3. Stream এবং Buffer-এর সম্পর্ক কী?

Stream data chunk আকারে দেয়। সেই chunk অনেক সময় Buffer object হিসেবে আসে। Buffer হলো stream data-এর ছোট binary packet-এর মতো।

## 4. `fs.createReadStream()` কী করে?

এটি নির্দিষ্ট file-এর জন্য readable stream তৈরি করে। File পুরোটা memory-তে load না করে chunk আকারে read করে।

## 5. `fs.readFile()` এবং `fs.createReadStream()`-এর পার্থক্য কী?

`fs.readFile()` পুরো file read করে memory-তে রাখে। `fs.createReadStream()` file chunk আকারে read করে, তাই বড় file-এর জন্য memory-efficient।

## 6. `data` event কখন fire হয়?

Readable stream নতুন chunk পেলে `data` event fire হয়।

## 7. `end` event কখন fire হয়?

Readable stream-এর সব data read হয়ে গেলে `end` event fire হয়।

## 8. POST request body সরাসরি `req.data`-তে পাওয়া যায় না কেন?

কারণ Node.js HTTP request body stream আকারে আসে। তাই `req.on('data')` দিয়ে chunk collect করতে হয় এবং `req.on('end')` দিয়ে শেষ হওয়া জানতে হয়।

## 9. `Buffer.concat(body).toString()` কেন ব্যবহার করা হয়?

`body` array-তে থাকা multiple Buffer chunk combine করে একটি Buffer বানাতে `Buffer.concat()` ব্যবহার করা হয়। তারপর `.toString()` দিয়ে readable text বানানো হয়।

## 10. `req` এবং `res` কোন ধরনের stream?

`req` হলো readable stream, কারণ client থেকে আসা data read করা যায়। `res` হলো writable stream, কারণ client-এর কাছে data write করা যায়।

## 11. `pipe()` কী?

`pipe()` হলো readable stream থেকে writable stream-এ data পাঠানোর shortcut method।

## 12. File directly HTTP response হিসেবে stream করতে কীভাবে code লিখবে?

```js
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    fs.createReadStream(`${__dirname}/bigdata.txt`, 'utf8').pipe(res);
});

server.listen(3000);
```

## 13. Buffer output readable না হলে কী করবে?

`chunk.toString()` ব্যবহার করব অথবা stream তৈরি করার সময় `utf8` encoding দেব।

## 14. বড় file response পাঠানোর ক্ষেত্রে stream কেন ভালো?

কারণ এতে পুরো file memory-তে load করতে হয় না। Data chunk আকারে client-এর কাছে যায়, ফলে memory usage কম এবং response দ্রুত শুরু হয়।

## 15. `res.write()` এবং `res.end()`-এর পার্থক্য কী?

`res.write()` response body-তে data লিখে। `res.end()` response শেষ করে। `res.end()` না দিলে request hanging থাকতে পারে।

## 16. Form data `message=hello` আকারে কেন আসে?

HTML form default `application/x-www-form-urlencoded` format-এ body পাঠায়। তাই input name/value `key=value` আকারে আসে।

## 17. Express.js request body কীভাবে সহজ করে?

Express middleware request stream read করে chunks collect ও parse করে `req.body` হিসেবে দেয়।

## 18. Stream error handle না করলে কী সমস্যা হতে পারে?

File missing, permission error, connection issue ইত্যাদিতে unhandled error হয়ে server crash করতে পারে।

## 19. `pipe()` কোন object-এর উপর call করতে হয়?

Readable stream-এর উপর call করতে হয় এবং argument হিসেবে writable stream দিতে হয়।

```js
readableStream.pipe(writableStream);
```

## 20. Request body collect করার সময় memory risk কোথায়?

সব chunks array-তে জমা করলে huge request body memory বেশি খেতে পারে। Production-এ size limit বা streaming parser ব্যবহার করা উচিত।

---

# Key Takeaways

- Node.js stream-based architecture বড় data handling-এর জন্য খুব শক্তিশালী।
- Stream হলো data flow; Buffer হলো binary chunk data holder।
- File, network, HTTP request/response—সব জায়গাতেই stream concept গুরুত্বপূর্ণ।
- `fs.createReadStream()` এবং `fs.createWriteStream()` large file operation efficiently করতে সাহায্য করে।
- `req` readable stream, তাই POST body chunk আকারে আসে।
- `res` writable stream, তাই file stream সরাসরি client response-এ pipe করা যায়।
- `Buffer.concat()` দিয়ে incoming chunks combine করে complete body পাওয়া যায়।
- `pipe()` readable-to-writable data transfer-এর সহজ ও clean পদ্ধতি।
- Raw Node.js-এ stream/buffer বোঝা Express.js এবং real-world backend development বোঝার ভিত্তি।
- Beginner হিসেবে প্রথমে concept clear করা জরুরি; framework পরে ব্যবহার করলেও ভিতরের কাজ বুঝলে debugging অনেক সহজ হয়।

---

# Final Mental Model

```text
Large data কখনো একবারে ভাববে না।

ভাববে:
Source → Stream → Chunk → Buffer → Process/Write/Pipe → Destination
```

আর HTTP server-এর ক্ষেত্রে:

```text
Client request body → req readable stream → chunks → Buffer.concat()
File data → fs readable stream → pipe(res) → client browser
```

এই mental model মাথায় থাকলে Node.js-এর file upload, download, API body parsing, video streaming, logging, proxying—সব concept অনেক সহজ হয়ে যাবে।
