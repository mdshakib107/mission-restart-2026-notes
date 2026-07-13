# ওপেন-সোর্স কোড পড়ে Web Development Skill উন্নয়নের গাইড

> প্রস্তুত করা হয়েছে কথোপকথনের ভিত্তিতে।  
> লক্ষ্য: দ্রুত Frontend, Backend অথবা Full-stack JavaScript চাকরির জন্য প্রস্তুতি নেওয়া এবং code-reading skill তৈরি করা।

---

## কথোপকথন

### ব্যবহারকারী

আমি ২০২১ সালে MERN Development শিখেছিলাম এবং বেশ কয়েকটি project বানিয়েছিলাম। এরপর আর কাজ করা হয়নি। ২০২৫ সালে আবার শুরু করেছিলাম, কিন্তু আবারও discontinuous হয়ে যায়। এখন আবার JavaScript থেকে শুরু করেছি।

আমার লক্ষ্য হচ্ছে যত দ্রুত সম্ভব একটি job manage করা। সেটি Frontend Engineer, Backend Engineer অথবা Full-stack Engineer—যেকোনোটি হতে পারে।

এখন আমি code-reading skill develop করতে চাই। এজন্য এমন কিছু open-source resource চাই, যেগুলোর code পড়লে আমার skill develop হবে এবং learning journey-তেও সাহায্য করবে।

---

### সহকারীর উত্তর

তোমার ক্ষেত্রে সবচেয়ে বড় সুবিধা হলো—তুমি একেবারে নতুন নও। আগে MERN project করেছ, তাই এখন আবার অসংখ্য tutorial শেষ করার চেয়ে **JavaScript foundation ঝালাই + production code পড়া + নিজে feature rebuild করা**—এই পথটি দ্রুত চাকরির উপযোগী করবে।

## কোন ক্রমে ওপেন-সোর্স কোড পড়বে

### ১. ছোট ও পরিষ্কার codebase: Ky

**Repository:** [sindresorhus/ky](https://github.com/sindresorhus/ky)

Ky হলো Fetch API-ভিত্তিক একটি ছোট JavaScript/TypeScript HTTP client। এর source code তুলনামূলক ছোট এবং বিভিন্ন দায়িত্ব আলাদা module-এ ভাগ করা। বড় React application পড়ার আগে function flow, types, error handling এবং tests শেখার জন্য এটি ভালো।

#### যেভাবে পড়বে

1. `source/index.ts` থেকে শুরু করো।
2. কোন জিনিস কোথা থেকে export হচ্ছে লিখে রাখো।
3. একটি request কীভাবে entry point থেকে core logic এবং response/error পর্যন্ত যাচ্ছে, সেটি trace করো।
4. প্রতিটি গুরুত্বপূর্ণ function-এর জন্য এক লাইনে উদ্দেশ্য লেখো।
5. সংশ্লিষ্ট test খুঁজে পড়ো।

প্রথম লক্ষ্য পুরো repository বোঝা নয়; একটি HTTP request-এর lifecycle বোঝা।

---

### ২. বাস্তব React architecture: Bulletproof React

**Repository:** [alan2207/bulletproof-react](https://github.com/alan2207/bulletproof-react)

এটি production-ready React application architecture শেখানোর জন্য তৈরি। এখানে feature-based structure, API layer, authentication, routing, state management, testing এবং module boundaries-এর উদাহরণ পাওয়া যায়।

#### প্রথমে এই flow পড়ো

```text
Application entry
→ Router
→ Feature route
→ Page/component
→ API function
→ State/query
→ UI update
```

#### বিশেষভাবে দেখবে

- `features` folder কীভাবে ভাগ করা
- Shared component এবং feature-specific component-এর পার্থক্য
- API call component-এর বাইরে কেন রাখা হয়েছে
- Validation কোথায় হচ্ছে
- Authentication state কীভাবে পরিচালিত হচ্ছে
- Test file এবং source file-এর সম্পর্ক

Frontend job লক্ষ্য করলে এটি সবচেয়ে গুরুত্বপূর্ণ repository-গুলোর একটি।

---

### ৩. একই application-এর বিভিন্ন implementation: RealWorld

**Main repository:** [realworld-apps/realworld](https://github.com/realworld-apps/realworld)

RealWorld project একটি Medium-এর মতো পূর্ণ application-এর জন্য common API specification দেয়। একই ধরনের application React, Angular, Node এবং অন্যান্য stack দিয়ে কীভাবে তৈরি হয়, তা তুলনা করা যায়।

Todo app-এর তুলনায় এখানে authentication, article, comment, profile, follow এবং favourite-এর মতো বেশি বাস্তব feature রয়েছে।

#### অনুশীলন

1. একটি frontend implementation-এ login feature পড়ো।
2. একটি backend implementation-এ login endpoint পড়ো।
3. Request থেকে database এবং response পর্যন্ত flow diagram আঁকো।
4. Repository না দেখে একই feature নিজে implement করো।

#### Feature-reading order

```text
Registration
→ Login
→ Current user
→ Create article
→ Article feed
→ Follow user
→ Add comment
→ Favourite article
```

---

### ৪. Backend architecture: NestJS

**Main repository:** [nestjs/nest](https://github.com/nestjs/nest)  
**Sample applications:** [nestjs/nest/sample](https://github.com/nestjs/nest/tree/master/sample)  
**Official documentation:** [docs.nestjs.com](https://docs.nestjs.com/)

NestJS একটি TypeScript-based server framework। এখানে dependency injection, decorators, modules, middleware, guards, interceptors এবং adapters দেখা যায়।

পুরো framework source code দিয়ে শুরু না করে এই ক্রমে পড়ো:

1. Sample application
2. একটি ছোট package
3. একটি decorator-এর implementation
4. সংশ্লিষ্ট test
5. একটি ছোট bug-fix pull request

---

### ৫. Node.js production practices

**Repository:** [goldbergyoni/nodebestpractices](https://github.com/goldbergyoni/nodebestpractices)

এই repository-তে project structure, error handling, testing, security এবং production operation নিয়ে সংগঠিত best practice রয়েছে।

Backend source code পড়ার সময় নিচের প্রশ্নগুলো ব্যবহার করো:

- Error কোথায় ধরা হচ্ছে?
- Central error handler আছে কি?
- Input validation কোথায়?
- Business logic controller বা route-এর মধ্যে ঢুকে গেছে কি?
- Logging কীভাবে করা হচ্ছে?
- Async failure কীভাবে handle করা হচ্ছে?
- Test failure path-ও cover করছে কি?

এটি সরাসরি application codebase নয়; বরং codebase বিশ্লেষণের checklist হিসেবে ব্যবহার করবে।

---

### ৬. TypeScript: Type Challenges

**Repository:** [type-challenges/type-challenges](https://github.com/type-challenges/type-challenges)

Modern JavaScript job-এর জন্য TypeScript গুরুত্বপূর্ণ। এই repository TypeScript type system, generics এবং utility type বুঝতে সাহায্য করে।

#### প্রথমে যে easy challenge-গুলো করবে

- Pick
- Readonly
- Tuple to Object
- First of Array
- Length of Tuple
- Exclude
- Awaited
- Parameters

প্রতিদিন এক বা দুইটি challenge যথেষ্ট। লক্ষ্য advanced type puzzle expert হওয়া নয়; TypeScript code পড়ার আত্মবিশ্বাস তৈরি করা।

---

### ৭. বড় production codebase: freeCodeCamp

**Repository:** [freeCodeCamp/freeCodeCamp](https://github.com/freeCodeCamp/freeCodeCamp)

এটি একটি বড় open-source curriculum এবং production application codebase। বহু contributor এখানে কাজ করেন।

Bulletproof React এবং RealWorld-এর পরে এটি পড়ো।

#### এখানে শিখবে

- বড় application-এ folder navigation
- Shared utilities
- Contribution conventions
- বহু contributor-এর code style
- Pull request এবং issue-এর সম্পর্ক
- একটি পরিবর্তন কতগুলো file স্পর্শ করতে পারে

---

### ৮. Advanced TypeScript monorepo: Astro

**Repository:** [withastro/astro](https://github.com/withastro/astro)  
**Contribution guide:** [Astro contributing documentation](https://github.com/withastro/astro/blob/main/CONTRIBUTING.md)

Astro একটি বড় TypeScript monorepo। এতে packages, examples, scripts, tests এবং shared configuration রয়েছে।

Code-reading practice-এর প্রথম পর্যায়ে এটি পড়বে না। ছোট ও মাঝারি repository পড়ার চার থেকে ছয় সপ্তাহ পরে এটি ধরো।

---

## প্রস্তাবিত repository sequence

```text
Ky
↓
Bulletproof React
↓
RealWorld frontend
↓
RealWorld backend
↓
Node.js Best Practices
↓
NestJS samples
↓
freeCodeCamp
↓
Astro বা অন্য বড় production codebase
```

---

## প্রতিদিন code-reading করার পদ্ধতি

প্রতিদিন ৬০ থেকে ৯০ মিনিট সময় দাও।

### প্রথম ১০ মিনিট: Repository mapping

প্রথমে এগুলো দেখো:

```text
README
package.json
src/
tests/
config files
environment example
CI workflow
```

তারপর নিজের ভাষায় লিখো:

```text
এই project কী করে?
কীভাবে run হয়?
মূল entry point কোথায়?
কোন folder কোন দায়িত্ব পালন করে?
```

### পরের ২৫ মিনিট: একটি feature trace

উদাহরণ হিসেবে login feature:

```text
UI event
→ Event handler
→ Validation
→ API request
→ Server route
→ Controller
→ Service
→ Database
→ Response
→ Frontend state update
```

প্রতিটি ধাপের filename এবং function name লিখে রাখো।

### পরের ১৫ মিনিট: Test পড়া

খুঁজে দেখো:

- Expected behaviour কী?
- Edge case কী?
- Function-এর public contract কী?
- কোন dependency mock করা হয়েছে?
- Failure case কীভাবে test করা হয়েছে?

অনেক সময় test file source file-এর চেয়ে function-এর উদ্দেশ্য দ্রুত বুঝিয়ে দেয়।

### পরের ১৫ মিনিট: Git history ও pull request

একটি ছোট bug-fix commit বা merged pull request পড়ো:

```text
Issue কী ছিল?
কোন file পরিবর্তিত হয়েছে?
কেন পরিবর্তন করা হয়েছে?
Test কীভাবে bug reproduce করেছে?
```

### শেষ ১৫–২৫ মিনিট: Reconstruction

Repository বন্ধ করে একই logic ছোট করে নিজে লেখো।

শুধু পড়লে familiarity তৈরি হয়। না দেখে পুনর্নির্মাণ করলে skill তৈরি হয়।

---

## Code-reading journal template

```markdown
# Repository

# Feature

## Entry point

-

## Execution flow

1.
2.
3.
4.

## Important files

-

## New patterns

-

## Things I did not understand

-

## One improvement I would suggest

-

## What I rebuilt myself

-
```

GitHub-এ `code-reading-journal` নামে একটি public repository তৈরি করে প্রতিদিনের note সংরক্ষণ করতে পারো। এটি learning proof এবং portfolio signal—দুইভাবেই কাজে লাগবে।

---

## ৬ সপ্তাহের job-focused পরিকল্পনা

### সপ্তাহ ১: JavaScript এবং ছোট codebase

- JavaScript fundamentals revise করা
- Ky source code পড়া
- Closures, promises, async/await, modules এবং error handling
- প্রতিদিন একটি ছোট function flow trace করা

### সপ্তাহ ২: TypeScript এবং React architecture

- TypeScript basics
- Type Challenges থেকে easy problem
- Bulletproof React structure পড়া
- Authentication UI নিজে rebuild করা

### সপ্তাহ ৩: RealWorld frontend

- Login, registration এবং article listing flow পড়া
- API ও state flow diagram তৈরি করা
- Repository না দেখে একটি feature implement করা

### সপ্তাহ ৪: Backend

- Node.js এবং Express অথবা NestJS
- RealWorld backend implementation
- Authentication, validation, service layer এবং database flow
- Node.js Best Practices checklist প্রয়োগ করা

### সপ্তাহ ৫: Full-stack portfolio project

সম্ভাব্য stack:

```text
React বা Next.js
TypeScript
Node.js, Express বা NestJS
PostgreSQL
Authentication
Automated tests
Deployment
```

Feature কম রাখো, কিন্তু code quality, README, test এবং deployment ভালো রাখো।

### সপ্তাহ ৬: Job preparation

- Project polish
- README উন্নত করা
- Tests যোগ করা
- Deployment
- CV এবং GitHub profile প্রস্তুত করা
- নিয়মিত job application
- ছোট open-source issue বা documentation contribution

---

## Career direction

একই সঙ্গে Frontend, Backend এবং Full-stack—তিনটি track গভীরভাবে অনুসরণ করলে progress ধীর হয়ে যেতে পারে।

আগের MERN অভিজ্ঞতা বিবেচনায় কার্যকর positioning:

```text
Primary track:
Frontend Engineer
React + TypeScript + API integration + testing

Secondary track:
Node.js Backend
Express/NestJS + PostgreSQL + authentication
```

Job application-এ নিজেকে **Frontend / Full-stack JavaScript Developer** হিসেবে উপস্থাপন করা যায়। তবে প্রথম ছয় থেকে আট সপ্তাহ frontend-কে primary focus রাখলে scope নিয়ন্ত্রণে থাকবে এবং দ্রুত job-ready হওয়া সহজ হবে।

---

## অতিরিক্ত শেখার রিসোর্স

### JavaScript

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [JavaScript.info](https://javascript.info/)
- [You Don't Know JS Yet](https://github.com/getify/You-Dont-Know-JS)
- [Node.js Learn](https://nodejs.org/en/learn)

### React

- [Official React documentation](https://react.dev/)
- [React TypeScript Cheatsheets](https://github.com/typescript-cheatsheets/react)
- [Testing Library documentation](https://testing-library.com/docs/)
- [TanStack Query documentation](https://tanstack.com/query/latest)

### TypeScript

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Exercises](https://typescript-exercises.github.io/)
- [Total TypeScript tutorials](https://www.totaltypescript.com/tutorials)

### Backend ও API

- [Express documentation](https://expressjs.com/)
- [NestJS documentation](https://docs.nestjs.com/)
- [PostgreSQL tutorial](https://www.postgresql.org/docs/current/tutorial.html)
- [Prisma documentation](https://www.prisma.io/docs)
- [OWASP API Security Top 10](https://owasp.org/API-Security/)

### Git ও open-source contribution

- [GitHub Skills](https://skills.github.com/)
- [First Contributions](https://github.com/firstcontributions/first-contributions)
- [Good First Issue](https://goodfirstissue.dev/)
- [Up For Grabs](https://up-for-grabs.net/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## Repository পড়ার মূল নিয়ম

1. প্রতিদিন নতুন repository বদলাবে না।
2. একটি repository থেকে অন্তত একটি complete feature trace করবে।
3. Source-এর পাশাপাশি tests পড়বে।
4. Git history, issue এবং pull request দেখবে।
5. শেখা logic repository না দেখে rebuild করবে।
6. বুঝতে না পারা বিষয় journal-এ লিখবে।
7. একই pattern নিজের project-এ প্রয়োগ করবে।

> **Read → Trace → Explain → Rebuild → Test → Document**

এই cycle নিয়মিত অনুসরণ করলেই code পড়ার ক্ষমতা বাস্তব engineering skill-এ রূপান্তরিত হবে।
