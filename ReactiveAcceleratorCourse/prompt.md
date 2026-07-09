আমি একটি React tutorial video-এর transcript/text upload করছি। তুমি এই transcript থেকে বাংলায় বইয়ের মতো detailed study notes তৈরি করবে, যাতে শুধু notes পড়েই ভিডিওর সব concept পরিষ্কারভাবে বুঝতে পারি। আমার লক্ষ্য হলো future revision, interview/exam preparation এবং practical coding practice-এর জন্য এই notes ব্যবহার করা।

## মূল নির্দেশনা

1. Notes অবশ্যই Markdown `.md` format-এ হবে।
2. শেষে একটি downloadable `.md` file তৈরি করে দেবে।
3. ভাষা হবে সহজ, পরিষ্কার বাংলা; তবে technical/programming terms English-এই থাকবে। যেমন:
   React, component, JSX, props, state, hook, useState, useEffect, event handling, conditional rendering, list rendering, key, form, controlled component, uncontrolled component, React Router, Context API, virtual DOM, render, re-render, lifecycle, npm, Vite, package.json, module, import, export ইত্যাদি।
4. Notes এমনভাবে লিখবে যেন beginner student ভিডিও না দেখেও পুরো lesson বুঝতে পারে।
5. শুধু summary নয়; detailed explanation, example, practical use case, common mistake, best practice—সবকিছু দিতে হবে।
6. Transcript-এ যেসব concept, গল্প, explanation, analogy, warning, assignment বা task আছে, সেগুলো অবশ্যই notes-এ থাকবে এবং video transcript-এর সাথে মিল রাখতে হবে।
7. Transcript-এ যদি কোনো বিষয় অস্পষ্ট বা অসম্পূর্ণ থাকে, তাহলে beginner-friendlyভাবে ব্যাখ্যা পূর্ণ করবে, কিন্তু যেখানে অনুমান করবে সেখানে স্পষ্টভাবে লিখবে: “এখানে transcript থেকে অনুমান করে ব্যাখ্যা করা হয়েছে।”
8. যেখানে দরকার table ব্যবহার করবে।
9. যেখানে code আছে, সেগুলো proper Markdown code block-এ লিখবে।
10. Code থাকলে শুধু code block দিলেই হবে না; গুরুত্বপূর্ণ line-by-line explanation দিতে হবে।
11. প্রতিটি important concept-এর জন্য দিতে হবে:
    - Concept কী
    - কেন দরকার
    - কীভাবে কাজ করে
    - React project-এ কোথায় ব্যবহার হয়
    - সহজ example
    - code example, যদি প্রাসঙ্গিক হয়
    - common mistakes
    - best practices
    - মনে রাখার নিয়ম
12. Notes beginner থেকে intermediate learner-এর জন্য suitable হবে।
13. খুব ছোট করে লিখবে না। Complete, organized, explanatory এবং documentation-style হতে হবে।
14. Notes এমনভাবে সাজাবে যেন এটা একটি React বইয়ের chapter-এর মতো লাগে।

---

# Required Output Structure

## Title

ভিডিও/lesson-এর topic অনুযায়ী সুন্দর একটি title দেবে।

## Overview

এই lesson-এ কী শেখানো হয়েছে, কেন important, এবং React শেখার journey-তে এই topic-এর ভূমিকা কী—তা ব্যাখ্যা করবে।

## Prerequisites

এই lesson বুঝতে আগে কী কী জানা দরকার, যেমন:
- HTML
- CSS
- JavaScript basics
- function
- array
- object
- ES6 syntax
- import/export
- npm basics

Transcript অনুযায়ী প্রয়োজনীয় prerequisites লিখবে।

## Table of Contents

Notes-এর সব major section নিয়ে clickable Markdown table of contents তৈরি করবে।

## Main Concepts

Transcript-এ আসা সব React concept section-wise সাজাবে। যেমন:

- React কী
- React কেন ব্যবহার করা হয়
- Component কী
- JSX কী
- Props কী
- State কী
- Hook কী
- useState
- useEffect
- Event Handling
- Conditional Rendering
- List Rendering
- Key
- Form Handling
- Component Reuse
- File/Folder Structure
- React Project Setup
- npm/Vite/package.json
- React Router
- Context API

শুধু যেগুলো transcript-এ আছে সেগুলোই main topic হিসেবে রাখবে। তবে কোনো topic বুঝতে background explanation দরকার হলে সেটা সংক্ষিপ্তভাবে যোগ করবে।

## Detailed Explanation

প্রতিটি topic বইয়ের মতো ব্যাখ্যা করবে।

প্রতিটি topic-এর format হবে:

### Topic Name

#### Concept কী?

সহজ বাংলায় ব্যাখ্যা করবে।

#### কেন দরকার?

React application বানাতে এই concept কেন দরকার, তা ব্যাখ্যা করবে।

#### কীভাবে কাজ করে?

ভিতরের working বা flow ব্যাখ্যা করবে। যেমন state change হলে re-render হয়, props parent থেকে child component-এ যায়, JSX শেষ পর্যন্ত JavaScript-এ convert হয় ইত্যাদি।

#### Practical Use Case

বাস্তব React project-এ কোথায় ব্যবহার হবে তা বলবে।

#### Example

সহজ উদাহরণ দেবে।

#### Code Example

Transcript-এ code থাকলে সেটি পরিষ্কার করে লিখবে। যদি transcript-এ code না থাকে কিন্তু concept বোঝার জন্য দরকার হয়, তাহলে ছোট example দিতে পারো এবং উল্লেখ করবে যে এটি explanatory example।

```jsx
// code here
