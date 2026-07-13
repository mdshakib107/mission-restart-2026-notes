আমি একটি **Node.js tutorial video-এর transcript** upload করছি।

তুমি transcript-টিকে summary, short notes, outline বা condensed explanation-এ রূপান্তর করবে না। বরং Instructor-এর পুরো বক্তব্য, teaching flow, code walkthrough, debugging process এবং explanation-এর ধারাবাহিকতা বজায় রেখে এটিকে বইয়ের একটি পূর্ণাঙ্গ বাংলা অধ্যায়ের মতো অনুবাদ ও সাজিয়ে দেবে।

# মূল উদ্দেশ্য

Output এমন হবে, যেন পাঠক video না দেখেও Node.js-এর পুরো lesson, code execution flow, server-side concepts, examples, warnings, interview questions এবং tasks সম্পূর্ণভাবে বুঝতে পারে।

এটি summary বা study notes নয়। এটি transcript-এর একটি **পূর্ণাঙ্গ, প্রকাশযোগ্য, beginner-friendly বাংলা Node.js book chapter**।

# সাধারণ নির্দেশনা

1. Transcript-এর শুরু থেকে শেষ পর্যন্ত lecture flow এবং বক্তব্যের sequence একই রাখবে।

2. Instructor যে analogy, গল্প, বাস্তব উদাহরণ, background explanation, আগের lesson-এর reference, পরের lesson-এর preview, motivational কথা, warning, recap, interview question, debugging tip এবং task বলেছেন—সব অন্তর্ভুক্ত করবে।

3. কোনো গুরুত্বপূর্ণ বক্তব্য বাদ দেবে না এবং অপ্রয়োজনীয়ভাবে সংক্ষিপ্ত করবে না।

4. ভাষা হবে স্বাভাবিক, সহজ, পরিষ্কার এবং বইয়ের মতো বাংলা।

5. Instructor-এর বক্তব্যকে third-person summary হিসেবে লিখবে না। যথাসম্ভব direct teaching voice বজায় রাখবে। যেমন:

   * “এখন আমরা দেখব…”
   * “চলো একটি example দিয়ে বিষয়টি বুঝি…”
   * “এই rule-টি ভালোভাবে মনে রাখো…”
   * “এখন terminal থেকে application-টি run করি…”
   * “এখানে একটি error আসবে। কেন আসবে, সেটি এখন বুঝি…”

6. Timestamp বাদ দিতে পারো, কিন্তু timestamp অনুযায়ী বক্তব্যের sequence পরিবর্তন করবে না।

7. অসম্পূর্ণ transcript sentence থাকলে context অনুযায়ী কেবল প্রয়োজনীয় grammar ঠিক করবে। নতুন তথ্য, নতুন concept বা নিজের ব্যাখ্যা যোগ করবে না।

8. Instructor একই concept বা rule একাধিকবার বুঝিয়ে বললে তা সম্পূর্ণ বাদ দেবে না। বইয়ের ভাষায় পুনরাবৃত্তিটি স্বাভাবিকভাবে বজায় রাখবে, কারণ এটি teaching flow-এর অংশ।

9. Instructor প্রশ্ন করে পরে উত্তর দিলে সেই question-answer flow বজায় রাখবে।

10. Transcript-এ analogy থাকলে একই analogy ব্যবহার করবে। নিজের নতুন analogy, গল্প বা উদাহরণ যোগ করবে না।

# Node.js Terminology সংক্রান্ত নির্দেশনা

11. Node.js এবং programming-এর technical terms English-এই রাখবে। যেমন:

`Node.js`, `JavaScript`, `runtime`, `V8 Engine`, `event loop`, `call stack`, `callback queue`, `microtask queue`, `thread pool`, `libuv`, `module`, `CommonJS`, `ES Module`, `require`, `module.exports`, `exports`, `import`, `export`, `package.json`, `npm`, `npx`, `dependency`, `devDependency`, `script`, `process`, `Buffer`, `Stream`, `EventEmitter`, `callback`, `Promise`, `async`, `await`, `synchronous`, `asynchronous`, `non-blocking`, `blocking`, `I/O`, `file system`, `HTTP`, `request`, `response`, `server`, `client`, `port`, `localhost`, `routing`, `middleware`, `API`, `REST API`, `endpoint`, `status code`, `header`, `body`, `JSON`, `environment variable`, `process.env`, `error handling`, `exception`, `stack trace`, `cluster`, `worker thread`, `child process`, `REPL`, `global object`, `scope`, `closure`, `execution context`, `object`, `array`, `function`, `variable`, `primitive`, `non-primitive` ইত্যাদি।

12. Technical term-এর বাংলা অর্থ ব্যাখ্যা করা যেতে পারে, কিন্তু term-টি বাংলা অনুবাদ দিয়ে প্রতিস্থাপন করবে না।

উদাহরণ:

* ভুল: “ঘটনা-চক্র”
* সঠিক: `event loop`
* গ্রহণযোগ্য ব্যাখ্যা: “`event loop` হলো এমন একটি mechanism, যা asynchronous task-এর callback কখন execute হবে তা পরিচালনা করে।”

13. Instructor কোনো definition দিলে অর্থ পরিবর্তন না করে বাংলায় অনুবাদ করবে। Definition-এর technical keyword অপরিবর্তিত রাখবে।

14. `Node.js is single-threaded`, `non-blocking I/O`, `event-driven architecture` বা এ ধরনের statement থাকলে Instructor যে context-এ বলেছেন, সেই context বজায় রাখবে।

# Code Formatting ও Walkthrough

15. Transcript-এর সব code যথাসম্ভব হুবহু সংরক্ষণ করবে।

16. সব code proper fenced code block-এ লিখবে এবং প্রয়োজন অনুযায়ী language identifier ব্যবহার করবে।

উদাহরণ:

```js
const http = require('http');
```

```json
{
  "name": "node-app",
  "version": "1.0.0"
}
```

```bash
npm install express
```

```env
PORT=5000
```

17. Terminal command এবং JavaScript code একই code block-এ মিশিয়ে লিখবে না।

18. Terminal command-এর জন্য `bash` code block ব্যবহার করবে।

উদাহরণ:

```bash
node app.js
```

19. JavaScript বা Node.js code-এর জন্য `js` code block ব্যবহার করবে।

20. `package.json` বা JSON response-এর জন্য `json` code block ব্যবহার করবে।

21. Environment variable-এর জন্য প্রয়োজন অনুযায়ী `env` বা plain text code block ব্যবহার করবে।

22. Code-এর আগে Instructor যেভাবে problem, objective বা reasoning ব্যাখ্যা করেছেন, সেটি step-by-step বাংলায় লিখবে।

23. Code block-এর পরে প্রতিটি গুরুত্বপূর্ণ line, function, method, argument এবং execution flow transcript অনুযায়ী ব্যাখ্যা করবে।

24. Instructor যদি code ধাপে ধাপে পরিবর্তন করেন, তাহলে final code সরাসরি দিয়ে দেবে না। প্রতিটি intermediate version এবং পরিবর্তনের কারণ lecture flow অনুযায়ী দেখাবে।

25. Instructor কোনো code delete, replace, refactor বা move করলে সেটিও উল্লেখ করবে।

26. Instructor যদি file structure তৈরি করেন, তা পরিষ্কারভাবে দেখাবে।

উদাহরণ:

```text
project/
├── app.js
├── package.json
├── routes/
│   └── users.js
└── controllers/
    └── userController.js
```

27. Instructor যে filename বলেছেন, সেই filename heading বা code block-এর আগে উল্লেখ করবে।

উদাহরণ:

### `app.js`

```js
const express = require('express');
```

28. কোনো package install করা হলে package-এর নাম, command, কেন install করা হচ্ছে এবং code-এ কোথায় ব্যবহার হবে—transcript অনুযায়ী সব ব্যাখ্যা করবে।

29. `npm init`, `npm install`, `npm run`, `node`, `nodemon` বা অন্য command চালানোর আগে ও পরে Instructor-এর explanation বজায় রাখবে।

# Output ও Execution Flow

30. Instructor যেখানে output predict করেছেন, সেখানে আলাদা করে লিখবে:

### Expected Output

```text
Server is running on port 3000
```

এরপর ব্যাখ্যা করবে কেন এই output হবে।

31. Terminal output, browser output, API response এবং console output আলাদা করে চিহ্নিত করবে।

প্রয়োজনে heading ব্যবহার করবে:

* `Terminal Output`
* `Console Output`
* `Browser Output`
* `API Response`

32. কোনো error এলে error message transcript অনুযায়ী code block-এ দেখাবে।

```text
Error: Cannot find module 'express'
```

33. Error কেন হয়েছে, Instructor কীভাবে identify করেছেন এবং কীভাবে fix করেছেন—ধাপে ধাপে ব্যাখ্যা করবে।

34. Instructor যদি code execution-এর order বোঝান, তাহলে execution sequence পরিষ্কারভাবে লিখবে।

35. `event loop`, `call stack`, `callback queue`, `microtask queue`, `thread pool` বা asynchronous execution নিয়ে আলোচনা থাকলে Instructor-এর ব্যাখ্যার order অক্ষুণ্ণ রাখবে।

36. `setTimeout`, `setImmediate`, `process.nextTick`, `Promise`, file I/O বা network request-এর output order predict করা হলে expected order এবং কারণ দুটিই লিখবে।

# Node.js Module System

37. `CommonJS` এবং `ES Module`-এর code আলাদা ও পরিষ্কারভাবে দেখাবে।

38. `require`, `module.exports`, `exports`, `import`, `export`, `"type": "module"` বা file extension সম্পর্কিত explanation transcript অনুযায়ী সম্পূর্ণ রাখবে।

39. Instructor module export/import করার সময় একাধিক file ব্যবহার করলে প্রতিটি file আলাদা subsection-এ দেখাবে।

40. Circular dependency, module caching, relative path বা built-in module নিয়ে warning থাকলে তা বাদ দেবে না।

# Core Modules, Server ও API

41. Transcript-এ `fs`, `path`, `http`, `url`, `events`, `os`, `stream`, `buffer`, `crypto` বা অন্য built-in module থাকলে Instructor-এর explanation সম্পূর্ণ রাখবে।

42. HTTP server তৈরি করা হলে request-response lifecycle ধাপে ধাপে ব্যাখ্যা করবে।

43. `request` object এবং `response` object-এর property বা method Instructor যেভাবে ব্যাখ্যা করেছেন, সেই flow বজায় রাখবে।

44. `res.write`, `res.end`, `res.setHeader`, `res.statusCode`, `req.url`, `req.method` ইত্যাদির explanation বাদ দেবে না।

45. Route handling বা API endpoint তৈরি করা হলে method, path, input, response এবং expected status code পরিষ্কারভাবে লিখবে।

46. JSON response থাকলে valid JSON formatting বজায় রাখবে।

47. Express.js transcript-এর অংশ হলে `app`, `router`, `middleware`, `controller`, `request`, `response`, `next`, route parameter, query parameter এবং request body-এর flow একইভাবে বজায় রাখবে।

48. Middleware execution order Instructor ব্যাখ্যা করলে sequence বদলাবে না।

# Asynchronous Node.js Concepts

49. Callback-based code, Promise-based code এবং `async/await` code আলাদা ধাপে দেখাবে।

50. Instructor callback hell থেকে Promise বা `async/await`-এ refactor করলে পুরো transformation flow দেখাবে।

51. Error-first callback pattern থাকলে তার parameter order এবং meaning ঠিক রাখবে।

52. `try...catch`, `.catch()`, error middleware বা rejected Promise-এর explanation transcript অনুযায়ী রাখবে।

53. Blocking এবং non-blocking code compare করা হলে দুই ধরনের code, output এবং performance reasoning সম্পূর্ণভাবে লিখবে।

54. Instructor asynchronous code-এর কোনো tricky output question করলে সেটিকে আলাদা subsection-এ রাখবে।

# Streams, Buffers ও Events

55. `Buffer`, `Stream`, `EventEmitter` নিয়ে আলোচনা থাকলে definition, code, event flow এবং use case transcript অনুযায়ী পূর্ণভাবে লিখবে।

56. Stream-এর `data`, `end`, `error`, `finish`, `pipe` ইত্যাদি event বা method ব্যাখ্যা করা হলে বাদ দেবে না।

57. Readable, Writable, Duplex বা Transform stream-এর পার্থক্য Instructor বললে মূল অর্থ অক্ষুণ্ণ রেখে বাংলায় সাজাবে।

58. EventEmitter-এর custom event তৈরি, emit করা এবং listener register করার flow code সহ দেখাবে।

# Database, Authentication ও Environment Configuration

59. Transcript-এ database integration থাকলে Instructor যে database, driver, ORM বা ODM ব্যবহার করেছেন, সেটিই বজায় রাখবে। নিজের পছন্দ অনুযায়ী technology পরিবর্তন করবে না।

60. Connection string, `.env`, environment variable বা secret ব্যবহারের সময় sensitive value থাকলে তা নিরাপদ placeholder দিয়ে দেখাবে, তবে Instructor-এর explanation বজায় রাখবে।

উদাহরণ:

```env
DATABASE_URL=your_database_connection_string
```

61. Authentication, password hashing, token, cookie, session বা authorization থাকলে Instructor-এর sequence এবং terminology বজায় রাখবে।

62. Instructor security warning দিলে তা স্পষ্টভাবে আলাদা subsection-এ রাখবে।

# Common Mistakes ও Interview Questions

63. Transcript-এ common mistake থাকলে আলাদা subsection ব্যবহার করবে:

## Common Mistakes

64. Tricky case থাকলে আলাদা subsection ব্যবহার করবে:

## Tricky Cases

65. Interview question থাকলে আলাদা subsection ব্যবহার করবে:

## Interview Questions

66. Interview question-এর ক্ষেত্রে Instructor প্রথমে question করলে আগে question দেখাবে, তারপর Instructor-এর explanation বা answer দেখাবে।

67. নিজের থেকে নতুন interview question, answer বা technical trivia যোগ করবে না।

68. Common mistake বা tricky case transcript-এর মূল sequence-এর যেখানে এসেছে, মূল আলোচনায় সেখানেই উল্লেখ করবে। প্রয়োজন হলে পরে structured subsection-এ পরিষ্কারভাবে উপস্থাপন করবে।

# Technical Inconsistency

69. Transcript-এ কোনো factual বা technical inconsistency চোখে পড়লেও মূল translation-এ Instructor-এর বক্তব্য পরিবর্তন করবে না।

70. প্রয়োজন হলে সংশ্লিষ্ট অংশের পরে ছোট একটি subsection যোগ করবে:

> **Technical Note:** এখানে Instructor যে বক্তব্য দিয়েছেন, তা নির্দিষ্ট version, environment বা context-এর ওপর নির্ভর করতে পারে।

71. Technical Note-এ শুধু প্রয়োজনীয় সতর্কতা দেবে। মূল lecture-এর বাইরে দীর্ঘ নতুন আলোচনা যোগ করবে না।

72. Node.js, npm বা কোনো package-এর version transcript-এ উল্লেখ থাকলে সেটি অপরিবর্তিত রাখবে। নিজের থেকে latest version বসাবে না।

# Chapter Structure

73. পুরো output একটি পরিষ্কার chapter title দিয়ে শুরু করবে।

উদাহরণ:

# Node.js-এ Module System এবং `require`

74. প্রয়োজন অনুযায়ী structured heading ব্যবহার করবে:

```markdown
# Chapter Title

## ভূমিকা

## আগের Lesson-এর সংযোগ

## মূল Concept

### প্রথম ধাপ

### দ্বিতীয় ধাপ

## Code Walkthrough

## Expected Output

## Common Mistakes

## Tricky Cases

## Interview Questions

## Lecture Recap

## Assignment / Task

## Final Recap
```

75. Transcript-এর natural flow অনুযায়ী heading তৈরি করবে। সব heading জোর করে ব্যবহার করতে হবে না।

76. Heading এমন হবে, যেন এটি tutorial transcript নয়, প্রকাশযোগ্য programming book chapter।

77. অতিরিক্ত bullet point ব্যবহার না করে প্রয়োজনমতো পূর্ণ paragraph-এ ব্যাখ্যা করবে।

78. Rule, comparison, step, command বা একাধিক item স্পষ্ট করতে প্রয়োজন হলে bullet list বা numbered list ব্যবহার করতে পারো।

# Recap ও Assignment

79. Instructor-এর নিজস্ব recap অংশ থাকলে সেটিকে আলাদা section-এ রাখবে:

## Lecture Recap

80. Recap-এ Instructor যা বলেছেন শুধু সেটিই থাকবে। নিজের থেকে নতুন point যোগ করবে না।

81. Transcript-এ assignment, practice problem, coding challenge, homework বা task থাকলে chapter-এর শেষে আলাদা section তৈরি করবে:

## Assignment / Task

82. Assignment-এর requirement, input, expected behavior, restriction এবং hint Instructor যেভাবে বলেছেন, সব অন্তর্ভুক্ত করবে।

83. Instructor solution না দিলে নিজের থেকে solution লিখবে না।

84. Instructor partial solution বা hint দিলে শুধু সেটুকুই রাখবে।

85. সবশেষে transcript অনুযায়ী concise section যোগ করবে:

## Final Recap

86. `Final Recap` মূল chapter-এর বিকল্প হবে না। এটি শুধু পুরো lesson-এর প্রধান বিষয়গুলো সংক্ষেপে পুনরুল্লেখ করবে।

# যেসব কাজ করা যাবে না

87. Transcript-কে summary, short note, cheat sheet বা condensed tutorial বানাবে না।

88. Instructor-এর গল্প, analogy, repeated explanation, debugging process, motivational statement বা warning বাদ দেবে না।

89. নিজের থেকে নতুন Node.js concept, code, analogy, package, best practice বা example যোগ করবে না।

90. Transcript-এর code অপ্রয়োজনে optimize, modernize বা refactor করবে না।

91. Instructor `CommonJS` ব্যবহার করলে নিজের থেকে `ES Module`-এ convert করবে না।

92. Instructor plain Node.js ব্যবহার করলে নিজের থেকে Express.js যোগ করবে না।

93. Instructor Express.js ব্যবহার করলে নিজের থেকে framework পরিবর্তন করবে না।

94. Instructor-এর ভুল silently correct করবে না। প্রয়োজন হলে আলাদা `Technical Note` ব্যবহার করবে।

95. Code-এর variable name, function name, filename, route name, port number বা output নিজের থেকে পরিবর্তন করবে না।

96. Transcript-এ না থাকলে নিজের থেকে conclusion, quiz, FAQ, additional resources বা reference link যোগ করবে না।

# Output Format

97. সম্পূর্ণ output Markdown `.md` format-এ লিখবে।

98. Markdown rendering পরিষ্কার রাখবে এবং code fence সঠিকভাবে close করবে।

99. Output-এ timestamp রাখবে না, যদি না কোনো timestamp নিজেই lesson-এর গুরুত্বপূর্ণ data হয়।

100. পুরো chapter সম্পন্ন হওয়ার পর একটি downloadable `.md` file তৈরি করবে।

101. `.md` file-এর filename lesson-এর topic অনুযায়ী অর্থপূর্ণ হবে।

উদাহরণ:

```text
nodejs-module-system-bangla-chapter.md
```

102. Chat response-এ পূর্ণ chapter দেওয়ার পাশাপাশি downloadable file-এর link প্রদান করবে।

# সর্বোচ্চ অগ্রাধিকারপ্রাপ্ত নির্দেশনা

**এটি summary, study notes, outline বা condensed explanation নয়। এটি Node.js tutorial transcript-এর শুরু থেকে শেষ পর্যন্ত সম্পূর্ণ teaching flow, explanations, analogies, terminal commands, code creation, code modification, debugging, outputs, asynchronous execution flow, recap, interview questions এবং assignments বজায় রেখে বইয়ের অধ্যায়ের মতো পূর্ণাঙ্গ বাংলা অনুবাদ।**

এখন আমি transcript upload করব। Transcript পাওয়ার পর কোনো গুরুত্বপূর্ণ অংশ বাদ না দিয়ে উপরোক্ত নিয়ম অনুসারে পূর্ণাঙ্গ Markdown chapter তৈরি করবে।
