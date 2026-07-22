Day 21: DOM Project — JavaScript দিয়ে পূর্ণাঙ্গ Quiz App তৈরি

ভূমিকা

সবাইকে স্বাগতম। আমরা এখন 40 Days of JavaScript উদ্যোগের ২১তম দিনে পৌঁছে গেছি। আজকের lesson-এর মাধ্যমে আমরা DOM module শেষ করব।

গত কয়েকটি lesson-এ আমরা শিখেছি:

DOM কী এবং browser কীভাবে একটি HTML document-কে DOM tree হিসেবে উপস্থাপন করে

বিভিন্ন উপায়ে DOM query করা

DOM element-এর content, attribute, style এবং class পরিবর্তন করা

JavaScript event handle করা

advanced DOM manipulation

বড় application-এ DOM update করার সময় performance কীভাবে বিবেচনা করতে হয়

একটি module শেষ করার সবচেয়ে ভালো উপায় হলো সেই module-এর concepts ব্যবহার করে একটি বাস্তব project তৈরি করা। তাই আজ আমরা একটি use case গভীরভাবে বিশ্লেষণ করব এবং শুরু থেকে শেষ পর্যন্ত একটি Quiz App তৈরি করব।

এই project শুধু DOM manipulation-এর exercise নয়। এর মধ্যে আগের lesson-গুলোতে শেখা array, object, function, condition, loop, localStorage, timer এবং problem-solving logic-ও ব্যবহার করা হবে। আমাদের শেখা সবসময় incremental—আগের জ্ঞান নতুন project-এ এসে আবার ব্যবহার হবে।

Project Goal: আমরা কী তৈরি করব?

আজকের লক্ষ্য একটি quiz application তৈরি করা।

একটি সাধারণ quiz-এ:

একটি question দেখানো হয়।

সেই question-এর জন্য একাধিক answer option থাকে।

option-গুলোর মধ্যে একটি correct answer থাকে।

user correct answer select করলে একটি point পায়।

wrong answer select করলে point পায় না।

quiz শেষে সব point যোগ করে final score দেখানো হয়।

আমাদের Quiz App-এ শুধু এই basic behaviour থাকবে না; আরও কয়েকটি গুরুত্বপূর্ণ feature থাকবে।

Functional Requirements

১. Random Question Order

প্রতিবার quiz শুরু করলে question-গুলোর order একই থাকবে না।

ধরো, প্রথমবার user question পেল:

DOM-এর পূর্ণরূপ কী?

ID দিয়ে element select করার method কোনটি?

input পরিবর্তিত হলে কোন event fire করে?

পরেরবার একই order না এসে অন্য order আসতে পারে:

input পরিবর্তিত হলে কোন event fire করে?

DOM-এর পূর্ণরূপ কী?

ID দিয়ে element select করার method কোনটি?

এর কারণ হলো user যেন question order মুখস্থ করে answer predict করতে না পারে। যেমন—প্রথম answer সবসময় A, দ্বিতীয় answer B—এভাবে cheating করার সুযোগ থাকবে না।

২. প্রতি Question-এর জন্য Timer

প্রতিটি question-এর answer দেওয়ার জন্য user-কে সীমিত সময় দেওয়া হবে। আমরা শুরুতে ১৫ seconds ব্যবহার করব।

Timer:

15 → 14 → 13 → ... → 1 → 0

যখন timer 0 হবে:

user আর option select করতে পারবে না

system correct answer highlight করবে

Next Question button দেখাবে

system নিজে answer দেখালেও user point পাবে না

৩. Correct এবং Wrong Answer Feedback

User correct answer select করলে:

selected option green হবে

User wrong answer select করলে:

selected wrong option red হবে

actual correct option green হবে

এতে user শুধু ভুল করেছে তা-ই জানবে না; correct answer-টিও শিখতে পারবে।

৪. Answer না দিলে Correct Answer দেখানো

১৫ seconds-এর মধ্যে user কোনো answer select না করলে system automatically correct answer দেখাবে।

৫. Final Result

সব question শেষ হলে result section-এ দেখানো হবে:

user কত score করেছে

মোট question কতটি ছিল

quiz-এর highest score কত

নতুন highest score হলে তা বিশেষভাবে জানানো হবে

৬. Restart Quiz

Result দেখানোর পর quiz আবার শুরু করার একটি উপায় থাকবে।

প্রথম implementation-এ আমরা page reload ব্যবহার করব। পরে assignment হিসেবে আরও clean restart logic তৈরি করতে হবে।

Non-functional Requirements

Project শুধু কাজ করলেই হবে না; code এবং user experience-ও বিবেচনা করতে হবে।

ভালো Look and Feel

Instructor নিজে professional designer নন, তবু UI-কে যতটা সম্ভব clean এবং presentable করা হবে। নিজের CSS skill ব্যবহার করে এটিকে আরও ভালো করা যাবে।

Timer-এর সঠিক ব্যবহার

setInterval() শুরু করলেই কাজ শেষ নয়। Timer clear না করলে background-এ interval চলতে থাকতে পারে। তাই timer শুরু ও বন্ধ—দুটিই carefully manage করতে হবে।

Clean Code

Project-এ logic আলাদা function-এ ভাগ করা হবে, যেমন:

loadQuestion()

selectAnswer()

countdown()

updateTimer()

showResult()

এতে code reuse করা সহজ হবে এবং debugging পরিষ্কার হবে।

Project শুরু করার আগে UI পরিকল্পনা

কোনো project হাতে পেলেই সরাসরি code লেখা শুরু করা উচিত নয়।

প্রথমে pen-paper, whiteboard, Excalidraw বা অন্য কোনো diagram tool ব্যবহার করে application-এর look and feel আঁকো।

আমাদের UI-তে একটি outer container থাকবে, যাকে আমরা quiz-box বলব।

এর ভিতরে থাকবে:

timer section

question section

options section

next button

result section

Conceptual structure:

body
└── quiz-box
    ├── timer
    ├── question
    ├── options
    ├── next button
    └── result

এই decomposition খুব গুরুত্বপূর্ণ।

React-এর মতো framework-এ এগুলো আলাদা component হতে পারত। Plain JavaScript ও DOM ব্যবহার করলে এগুলো আলাদা HTML element হবে।

Structure তৈরি হয়ে গেলে আমরা JavaScript দিয়ে:

data insert করব

element show/hide করব

class toggle করব

button click handle করব

timer update করব

result dynamically render করব

Project Folder Structure

আমাদের day-21 folder-এ থাকবে:

day-21/
├── README.md
├── index.html
├── style.css
└── index.js

README.md-এ project requirement থাকবে

index.html UI structure তৈরি করবে

style.css presentation নিয়ন্ত্রণ করবে

index.js quiz-এর behaviour এবং logic নিয়ন্ত্রণ করবে

HTML Structure তৈরি

প্রথমে index.html-এ basic structure তৈরি করি।

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Quiz App</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="quiz-box">
    <div id="timer">⏱️ 15</div>

    <h2 id="question">Loading...</h2>

    <div id="options" class="options"></div>

    <button id="next-btn">Next Question</button>

    <div id="result" class="result"></div>
  </div>

  <script src="index.js"></script>
</body>
</html>

Emmet ব্যবহার

HTML লেখার সময় Emmet ব্যবহার করলে কাজ দ্রুত হয়।

উদাহরণ:

div#timer

Enter চাপলে তৈরি হবে:

<div id="timer"></div>

একইভাবে:

div#result.result

তৈরি করবে:

<div id="result" class="result"></div>

Initial Values

Timer শুরুতে দেখাবে:

⏱️ 15

Question section-এ শুরুতে থাকবে:

Loading...

কারণ future version-এ question API বা database থেকে আসতে পারে। এখন local array থেকে আসবে বলে loading খুব অল্প সময়ের জন্য দেখা যাবে।

Options section শুরুতে empty থাকবে, কারণ option button-গুলো JavaScript দিয়ে dynamically তৈরি করা হবে।

CSS দিয়ে Basic UI Styling

Body Styling

আমরা চাই quiz box viewport-এর মাঝখানে থাকুক।

body {
  background: #111827;
  color: #f9fafb;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

এখানে:

dark background ব্যবহার করা হয়েছে

display: flex দিয়ে content center করা হয়েছে

min-height: 100vh viewport-এর পুরো height নিয়েছে

default margin ও padding সরানো হয়েছে

Quiz Box Styling

.quiz-box {
  background: #1f2937;
  padding: 30px;
  border-radius: 14px;
  width: 90%;
  max-width: 560px;
  text-align: center;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
}

Quiz box-এর background body-এর background থেকে আলাদা রাখা হয়েছে। Rounded corner এবং shadow UI-কে card-এর মতো দেখায়।

Question Styling

#question {
  margin: 20px 0;
}

Question এবং options-এর মধ্যে প্রয়োজনীয় gap তৈরি হবে।

Options Layout

.options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

Option button-গুলো একটির নিচে আরেকটি column আকারে থাকবে।

Next Button Styling

#next-btn {
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  cursor: pointer;
  font-size: 16px;
}

Timer Styling

#timer {
  font-size: 24px;
  margin-bottom: 12px;
  color: #facc15;
  font-weight: bold;
}

Timer-কে আলাদা রঙে রাখা হয়েছে, যাতে user সহজে লক্ষ্য করতে পারে।

Quiz Data Structure ডিজাইন

এখন question, options এবং correct answer ধরে রাখার জন্য একটি data structure প্রয়োজন।

আমরা একটি array ব্যবহার করব। Array-এর প্রতিটি item একটি object।

const quizData = [
  {
    question: "What does DOM stand for?",
    options: [
      "Document Order Model",
      "Document Object Model",
      "Data Object Model",
      "Direct Object Management"
    ],
    correct: 1
  },
  {
    question: "Which method selects an element by ID?",
    options: [
      "getElementById",
      "querySelectorAll",
      "getElement",
      "getElementsByClassName"
    ],
    correct: 0
  },
  {
    question: "Which event fires when an input value changes?",
    options: [
      "click",
      "submit",
      "change",
      "keydown"
    ],
    correct: 2
  }
];

প্রতিটি object-এর তিনটি property:

question

options

correct

correct property-তে correct option-এর index রাখা হয়েছে।

মনে রাখো, array index 0 থেকে শুরু হয়।

প্রথম question-এ:

correct: 1

এর অর্থ দ্বিতীয় option correct:

0 → Document Order Model
1 → Document Object Model
2 → Data Object Model
3 → Direct Object Management

Question Randomize করা

আমরা original quizData পরিবর্তন করতে চাই না। তাই spread operator দিয়ে copy তৈরি করব।

const questions = [...quizData];

এরপর random order তৈরি করতে sort() এবং Math.random() ব্যবহার করা হবে।

const questions = [...quizData].sort(() => Math.random() - 0.5);

এখানে comparator প্রতিবার positive বা negative random value return করতে পারে। ফলে question array-এর order shuffle হয়ে যায়।

Technical Note: ছোট demo project-এ এই technique ব্যবহার করা যায়। তবে এটি mathematically perfect unbiased shuffle নয়। Instructor-এর flow অনুযায়ী project-এ এটিই ব্যবহার করা হয়েছে।

প্রয়োজনীয় DOM Elements Query করা

HTML element-গুলো JavaScript থেকে ব্যবহার করার জন্য query করি।

const timerEl = document.getElementById("timer");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");

এখন আমরা প্রত্যেক element-এর:

textContent

innerHTML

style

classList

event listener

পরিবর্তন করতে পারব।

Application State Variables

Quiz কোন question-এ আছে এবং score কত—এসব track করতে state variable প্রয়োজন।

let currentQuestion = 0;
let score = 0;

currentQuestion = 0 মানে প্রথম question

score = 0 মানে শুরুতে user কোনো point পায়নি

Timer-এর জন্য আরও state লাগবে:

let timer;
let timeLeft = 15;

Question Load করার Function

এখন loadQuestion() function তৈরি করি।

function loadQuestion() {
  const q = questions[currentQuestion];

  questionEl.textContent =
    `Q${currentQuestion + 1}. ${q.question}`;
}

কেন currentQuestion + 1?

Array index শুরু হয় 0 থেকে। কিন্তু user-এর কাছে Q0 দেখানো ঠিক নয়।

তাই:

currentQuestion = 0 → Q1
currentQuestion = 1 → Q2
currentQuestion = 2 → Q3

q Variable কী ধরে রাখে?

const q = questions[currentQuestion];

এটি current question object ধরে রাখে।

তারপর:

q.question
q.options
q.correct

ব্যবহার করে object-এর তথ্য পাওয়া যাবে।

Options Dynamically Render করা

Options একটি array। তাই forEach() ব্যবহার করে প্রতিটি option-এর জন্য button তৈরি করব।

q.options.forEach((option, index) => {
  const btn = document.createElement("button");

  btn.classList.add("option-btn");
  btn.textContent = option;

  optionsEl.appendChild(btn);
});

প্রতিটি iteration-এ:

একটি button তৈরি হচ্ছে

option-btn class যোগ হচ্ছে

button-এর text হিসেবে option বসছে

button options container-এ append হচ্ছে

Option Button Styling

.option-btn {
  padding: 12px;
  background: #374151;
  border: 1px solid #4b5563;
  border-radius: 8px;
  color: #f9fafb;
  cursor: pointer;
  transition: 0.2s ease;
}

.option-btn:hover {
  background: #4b5563;
}

প্রথম অবস্থায় Next Button Hide করা

User answer select করার আগে Next Question button দেখা উচিত নয়।

loadQuestion()-এর শুরুতে:

nextBtn.style.display = "none";

সম্পূর্ণ function এখন:

function loadQuestion() {
  nextBtn.style.display = "none";

  const q = questions[currentQuestion];

  questionEl.textContent =
    `Q${currentQuestion + 1}. ${q.question}`;

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");

    btn.classList.add("option-btn");
    btn.textContent = option;

    optionsEl.appendChild(btn);
  });
}

কিন্তু button click করলে এখনো কিছু হবে না। কারণ event listener যোগ করা হয়নি।

Answer Selection Handle করা

প্রতিটি option button-এ click event listener যোগ করি।

btn.addEventListener("click", () => {
  selectAnswer(index, true);
});

এখানে index জানায় কোন option click হয়েছে।

true parameter পরে scoring control করতে ব্যবহার করা হবে।

selectAnswer() Function

function selectAnswer(index, shouldScore) {
  const q = questions[currentQuestion];
  const buttons = document.querySelectorAll(".option-btn");

  if (index === q.correct) {
    buttons[index].classList.add("correct");

    if (shouldScore) {
      score++;
    }
  } else {
    buttons[index].classList.add("wrong");
    buttons[q.correct].classList.add("correct");
  }

  buttons.forEach(button => {
    button.disabled = true;
  });

  nextBtn.style.display = "inline-block";
}

এখন step-by-step বুঝি।

Correct Answer Check

if (index === q.correct)

index হলো user যে button click করেছে তার index

q.correct হলো correct answer-এর index

দুটি equal হলে answer correct।

Correct Class

buttons[index].classList.add("correct");

CSS:

.option-btn.correct {
  background: #16a34a;
}

Wrong Class

buttons[index].classList.add("wrong");

CSS:

.option-btn.wrong {
  background: #dc2626;
}

Wrong answer select করলে correct answer-ও highlight করতে হবে:

buttons[q.correct].classList.add("correct");

পুনরায় Answer দেওয়া বন্ধ করা

একবার answer select হলে আর কোনো option click করা যাবে না।

buttons.forEach(button => {
  button.disabled = true;
});

Next Button দেখানো

nextBtn.style.display = "inline-block";

Expected Behaviour পরীক্ষা

Question:

What does DOM stand for?

User যদি select করে:

Document Object Model

তাহলে সেটি green হবে।

User যদি select করে:

Direct Object Management

তাহলে:

Direct Object Management red হবে

Document Object Model green হবে

এবং এরপর option-গুলো disabled হয়ে যাবে।

Next Question-এ যাওয়া

Next button-এ event listener যোগ করি।

nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

Logic

প্রথমে:

currentQuestion++;

তারপর check করা হচ্ছে:

currentQuestion < questions.length

যদি আরও question থাকে, আবার loadQuestion() call হবে।

না থাকলে:

showResult();

Common Bug: পুরোনো Options থেকে যাচ্ছে

প্রথম question render হওয়ার পর next question load করলে দেখা যেতে পারে নতুন options পুরোনো options-এর নিচে append হচ্ছে।

কারণ আমরা নতুন button add করছি, কিন্তু old button remove করছি না।

Fix

loadQuestion()-এ নতুন option render করার আগে:

optionsEl.innerHTML = "";

Updated function:

function loadQuestion() {
  nextBtn.style.display = "none";
  optionsEl.innerHTML = "";

  const q = questions[currentQuestion];

  questionEl.textContent =
    `Q${currentQuestion + 1}. ${q.question}`;

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");

    btn.classList.add("option-btn");
    btn.textContent = option;

    btn.addEventListener("click", () => {
      selectAnswer(index, true);
    });

    optionsEl.appendChild(btn);
  });
}

এখন প্রতিবার question load হওয়ার আগে options container clean হবে।

Score Track করা

Correct answer হলে:

score++;

এটি selectAnswer() function-এর correct branch-এর ভিতরে থাকবে।

if (index === q.correct) {
  buttons[index].classList.add("correct");

  if (shouldScore) {
    score++;
  }
}

shouldScore কেন প্রয়োজন, তা timer implementation-এর সময় পরিষ্কার হবে।

Result এবং Highest Score

সব question শেষ হলে showResult() call হবে।

আমরা browser-এর localStorage ব্যবহার করে highest score সংরক্ষণ করব।

Existing High Score পড়া

const highScore =
  Number(localStorage.getItem("quizHighScore")) || 0;

localStorage value string হিসেবে return করে। তাই Number() দিয়ে numeric value-তে convert করা হয়েছে।

কিছু না থাকলে:

0

ব্যবহার হবে।

নতুন High Score কি না

const isNewHighScore = score > highScore;

নতুন High Score Save করা

if (isNewHighScore) {
  localStorage.setItem("quizHighScore", score);
}

Result Render করা

function showResult() {
  const highScore =
    Number(localStorage.getItem("quizHighScore")) || 0;

  const isNewHighScore = score > highScore;

  if (isNewHighScore) {
    localStorage.setItem("quizHighScore", score);
  }

  const bestScore = Math.max(score, highScore);

  nextBtn.style.display = "none";

  questionEl.textContent = "";
  optionsEl.innerHTML = "";
  timerEl.textContent = "";

  resultEl.innerHTML = `
    <h2>Hooray! Quiz Completed</h2>
    <p>You scored ${score} out of ${questions.length}</p>
    <p>Highest score: ${bestScore}</p>
    ${isNewHighScore ? "<p>🎉 New High Score!</p>" : ""}
    <button onclick="location.reload()">Restart Quiz</button>
  `;
}

Template Literal ব্যবহারের সুবিধা

+ operator দিয়ে string concatenate না করে template literal ব্যবহার করলে HTML structure পরিষ্কার থাকে।

`
  <h2>...</h2>
  <p>...</p>
`

Conditional content:

${isNewHighScore ? "<p>🎉 New High Score!</p>" : ""}

Restart-এর প্রথম Implementation

আমরা ব্যবহার করেছি:

<button onclick="location.reload()">Restart Quiz</button>

এটি পুরো page reload করে quiz আবার শুরু করে।

এটি কাজ করে, কিন্তু clean solution নয়। Lesson-এর শেষে এটিই একটি task হিসেবে দেওয়া হয়েছে—page reload না করে existing state এবং loadQuestion() ব্যবহার করে quiz restart করতে হবে।

Timer Logic

এখন প্রতি question-এর জন্য ১৫ seconds countdown তৈরি করি।

Timer শুরু হবে question load হওয়ার সময়।

গুরুত্বপূর্ণ Warning

setInterval() বা setTimeout() ব্যবহার করলে প্রয়োজন শেষে timer clear করতে হবে।

না করলে:

background-এ timer চলতে পারে

duplicate interval তৈরি হতে পারে

unexpected behaviour হতে পারে

memory এবং performance issue হতে পারে

Instructor-এর পরামর্শ:

Timer শুরু করার code লেখার আগে clear করার code লিখে রাখো, যাতে ভুলে না যাও।

Timer শুরু করা

loadQuestion()-এর শুরুতে:

clearInterval(timer);

timeLeft = 15;
updateTimer();

timer = setInterval(countdown, 1000);

প্রতি 1000ms, অর্থাৎ প্রতি ১ second পর countdown() call হবে।

Timer UI Update

function updateTimer() {
  timerEl.textContent = `⏱️ ${timeLeft}`;
}

Countdown Function

function countdown() {
  timeLeft--;
  updateTimer();

  if (timeLeft === 0) {
    clearInterval(timer);

    const correctIndex =
      questions[currentQuestion].correct;

    selectAnswer(correctIndex, false);
  }
}

Step-by-step

প্রতি second:

timeLeft--;

তারপর UI update:

updateTimer();

Timer 0 হলে:

clearInterval(timer);

তারপর current question-এর correct answer index নেওয়া হয়:

const correctIndex =
  questions[currentQuestion].correct;

এবং সেই answer automatically select করা হয়:

selectAnswer(correctIndex, false);

Tricky Case: Auto-selected Answer-এ Score হওয়া উচিত নয়

প্রথম version-এ selectAnswer(correctIndex) call করলে score বেড়ে যাচ্ছিল।

কিন্তু user answer দেয়নি। System correct answer দেখিয়েছে। তাই point দেওয়া যাবে না।

এই problem solve করতে selectAnswer()-এ দ্বিতীয় parameter ব্যবহার করা হয়েছে:

function selectAnswer(index, shouldScore)

Manual click:

selectAnswer(index, true);

Timer expire:

selectAnswer(correctIndex, false);

Scoring:

if (index === q.correct) {
  buttons[index].classList.add("correct");

  if (shouldScore) {
    score++;
  }
}

এখন system answer দেখালে shouldScore false হওয়ায় score বাড়বে না।

Answer Select করলে Timer বন্ধ করা

আরেকটি bug হলো user answer select করার পরও countdown চলছিল।

এটি বন্ধ করতে selectAnswer()-এর শুরুতে যোগ করি:

clearInterval(timer);

Updated function:

function selectAnswer(index, shouldScore) {
  clearInterval(timer);

  const q = questions[currentQuestion];
  const buttons =
    document.querySelectorAll(".option-btn");

  if (index === q.correct) {
    buttons[index].classList.add("correct");

    if (shouldScore) {
      score++;
    }
  } else {
    buttons[index].classList.add("wrong");
    buttons[q.correct].classList.add("correct");
  }

  buttons.forEach(button => {
    button.disabled = true;
  });

  nextBtn.style.display = "inline-block";
}

এখন user ২ seconds-এ answer দিলে timer সেখানেই থেমে যাবে।

Complete JavaScript Code

const quizData = [
  {
    question: "What does DOM stand for?",
    options: [
      "Document Order Model",
      "Document Object Model",
      "Data Object Model",
      "Direct Object Management"
    ],
    correct: 1
  },
  {
    question: "Which method selects an element by ID?",
    options: [
      "getElementById",
      "querySelectorAll",
      "getElement",
      "getElementsByClassName"
    ],
    correct: 0
  },
  {
    question: "Which event fires when an input value changes?",
    options: [
      "click",
      "submit",
      "change",
      "keydown"
    ],
    correct: 2
  }
];

const questions =
  [...quizData].sort(() => Math.random() - 0.5);

const timerEl = document.getElementById("timer");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

function loadQuestion() {
  clearInterval(timer);

  timeLeft = 15;
  updateTimer();

  timer = setInterval(countdown, 1000);

  nextBtn.style.display = "none";
  resultEl.innerHTML = "";
  optionsEl.innerHTML = "";

  const q = questions[currentQuestion];

  questionEl.textContent =
    `Q${currentQuestion + 1}. ${q.question}`;

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");

    btn.classList.add("option-btn");
    btn.textContent = option;

    btn.addEventListener("click", () => {
      selectAnswer(index, true);
    });

    optionsEl.appendChild(btn);
  });
}

function selectAnswer(index, shouldScore) {
  clearInterval(timer);

  const q = questions[currentQuestion];
  const buttons =
    document.querySelectorAll(".option-btn");

  if (index === q.correct) {
    buttons[index].classList.add("correct");

    if (shouldScore) {
      score++;
    }
  } else {
    buttons[index].classList.add("wrong");
    buttons[q.correct].classList.add("correct");
  }

  buttons.forEach(button => {
    button.disabled = true;
  });

  nextBtn.style.display = "inline-block";
}

function countdown() {
  timeLeft--;
  updateTimer();

  if (timeLeft === 0) {
    clearInterval(timer);

    const correctIndex =
      questions[currentQuestion].correct;

    selectAnswer(correctIndex, false);
  }
}

function updateTimer() {
  timerEl.textContent = `⏱️ ${timeLeft}`;
}

function showResult() {
  clearInterval(timer);

  const highScore =
    Number(localStorage.getItem("quizHighScore")) || 0;

  const isNewHighScore = score > highScore;

  if (isNewHighScore) {
    localStorage.setItem("quizHighScore", score);
  }

  const bestScore = Math.max(score, highScore);

  nextBtn.style.display = "none";

  questionEl.textContent = "";
  optionsEl.innerHTML = "";
  timerEl.textContent = "";

  resultEl.innerHTML = `
    <h2>Hooray! Quiz Completed</h2>
    <p>
      You scored ${score}
      out of ${questions.length}
    </p>
    <p>Highest score: ${bestScore}</p>
    ${
      isNewHighScore
        ? "<p>🎉 New High Score!</p>"
        : ""
    }
    <button onclick="location.reload()">
      Restart Quiz
    </button>
  `;
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

loadQuestion();

Complete CSS Code

body {
  background: #111827;
  color: #f9fafb;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.quiz-box {
  background: #1f2937;
  padding: 30px;
  border-radius: 14px;
  width: 90%;
  max-width: 560px;
  text-align: center;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
}

#timer {
  font-size: 24px;
  margin-bottom: 12px;
  color: #facc15;
  font-weight: bold;
}

#question {
  margin: 20px 0;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.option-btn {
  padding: 12px;
  background: #374151;
  border: 1px solid #4b5563;
  border-radius: 8px;
  color: #f9fafb;
  cursor: pointer;
  transition: 0.2s ease;
}

.option-btn:hover:not(:disabled) {
  background: #4b5563;
}

.option-btn.correct {
  background: #16a34a;
}

.option-btn.wrong {
  background: #dc2626;
}

.option-btn:disabled {
  cursor: not-allowed;
}

#next-btn,
.result button {
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  cursor: pointer;
  font-size: 16px;
}

End-to-End Behaviour

ধরো quiz-এ ৩টি question আছে।

Scenario ১: সব answer correct

Expected result:

You scored 3 out of 3
Highest score: 3
New High Score

Scenario ২: একটি wrong

Expected result:

You scored 2 out of 3
Highest score: 3

আগের highest score 3 থাকলে তা অপরিবর্তিত থাকবে।

Scenario ৩: Timer expire

System correct answer দেখাবে, কিন্তু score বাড়বে না।

ধরো:

একটি answer system দেখিয়েছে

একটি answer user correct দিয়েছে

একটি answer user wrong দিয়েছে

Expected score:

1 out of 3

Common Mistakes এবং Bug Fixes

Mistake ১: Options clear না করা

Problem:

old options থেকে যায়

new options নিচে append হয়

Fix:

optionsEl.innerHTML = "";

Mistake ২: Timer clear না করা

Problem:

multiple interval একসঙ্গে চলতে পারে

timer unexpected speed-এ কমতে পারে

page state বদলালেও interval চলতে পারে

Fix:

clearInterval(timer);

এটি ব্যবহার করতে হবে:

নতুন question load-এর আগে

answer select-এর সময়

timer 0 হলে

result show করার সময়

Mistake ৩: Auto-selected answer-এ point দেওয়া

Fix:

selectAnswer(correctIndex, false);

এবং:

if (shouldScore) {
  score++;
}

Mistake ৪: Answer select করার পর option active রাখা

Fix:

buttons.forEach(button => {
  button.disabled = true;
});

Mistake ৫: Next button শুরুতেই দেখানো

Fix:

nextBtn.style.display = "none";

Answer select বা timer expire হলে:

nextBtn.style.display = "inline-block";

Problem-Solving Lessons

এই project-এর সবচেয়ে বড় শিক্ষা শুধু Quiz App তৈরি নয়। বরং একটি use case-কে ছোট logic-এ ভাগ করা।

আমরা problem-টিকে এভাবে ভেঙেছি:

UI কেমন হবে?

HTML structure কী?

data structure কী?

question কীভাবে random হবে?

current question কীভাবে track হবে?

options কীভাবে dynamically তৈরি হবে?

answer কীভাবে validate হবে?

next question কীভাবে load হবে?

score কোথায় update হবে?

highest score কীভাবে persist হবে?

timer কীভাবে start এবং clear হবে?

timeout হলে score না বাড়িয়ে answer কীভাবে দেখানো হবে?

এই ধাপে ধাপে decomposition-ই logic building।

Assignment / Task ১: Page Reload ছাড়া Restart

বর্তমান restart:

location.reload();

এটি পুরো page reload করে। এটি clean approach নয়।

তোমার task:

currentQuestion আবার 0 করো

score আবার 0 করো

result clear করো

question array প্রয়োজন হলে আবার shuffle করো

loadQuestion() call করো

page reload করবে না

Conceptually:

function restartQuiz() {
  currentQuestion = 0;
  score = 0;

  // প্রয়োজনীয় state reset
  // result clear
  // questions reshuffle
  // first question load
}

Existing loadQuestion() function reuse করাই মূল উদ্দেশ্য।

Assignment / Task ২: Recipe Finder App

DOM module শেষ করার project assignment হলো একটি Recipe Finder App তৈরি করা।

Project Requirement

JavaScript DOM skill ব্যবহার করে search keyword-এর ভিত্তিতে recipe list dynamically দেখাতে হবে।

এই project-এ কোনো external API ব্যবহার করা হবে না। Dummy data ব্যবহার করতে হবে, quiz project-এর মতো।

Technology Restriction

শুধু ব্যবহার করবে:

HTML

CSS

Vanilla JavaScript

ব্যবহার করবে না:

React

Vue

অন্য কোনো framework

Dummy Data Structure

প্রতিটি recipe object-এ থাকবে:

{
  title: "Recipe title",
  ingredients: [
    "Ingredient 1",
    "Ingredient 2"
  ],
  instructions: "How to prepare the recipe"
}

Recipe পরিবর্তন বা নতুন recipe যোগ করা যাবে, কিন্তু structure একই রাখতে হবে।

Required Features

১. Search Bar

Page-এর উপরে একটি search input থাকবে।

২. Live Filtering

User type করার সঙ্গে সঙ্গে recipe title-এর ভিত্তিতে filter হবে।

৩. Case-insensitive Search

যেমন:

pasta
Pasta
PASTA

সব একই result দিতে হবে।

৪. No Result Message

কোনো recipe match না করলে দেখাবে:

No recipe found

৫. Expand এবং Collapse

Recipe title click করলে:

ingredients show হবে

instructions show হবে

আবার click করলে collapse হবে।

এখানে আগের lesson-এর show/hide, class toggle এবং event handling ব্যবহার করতে হবে।

৬. Clear Button

Search input reset করার জন্য clear button থাকবে।

৭. Smooth Animation

Recipe details open এবং close হওয়ার সময় smooth slide animation দিতে হবে।

৮. Last Search Save করা

Search term localStorage-এ save করতে হবে।

Page reload হলে:

আগের search term input-এ prefill হবে

সেই term অনুযায়ী filtered result দেখাবে

Assignment Delivery

Project GitHub-এ upload করতে হবে।

Repository-তে থাকবে:

সব source code

clear README.md

project run করার instruction

তারপর GitHub link 40 Days of JavaScript Discord-এর task-assignment channel-এ post করতে হবে।

Project deploy করা গেলে Netlify, Render বা অন্য platform-এর live link-ও share করা যাবে।

DOM Module Recap

এই module-এ আমরা শিখেছি:

DOM introduction

DOM tree

element query

content manipulation

attribute manipulation

style manipulation

classList

event handling

dynamic element creation

element append এবং remove

show/hide

advanced DOM techniques

scalable DOM updates

project-based integration

Quiz App-এ আমরা এগুলোর সঙ্গে আরও ব্যবহার করেছি:

array of objects

randomization

state variable

reusable function

setInterval

clearInterval

localStorage

conditional rendering

scoring logic

common bug fixing

এই project করার উদ্দেশ্য শুধু video দেখে code copy করা নয়।

প্রথমে instructor-এর সঙ্গে code করো। তারপর নিজের code আবার দেখো। এরপর:

feature পরিবর্তন করো

নতুন feature যোগ করো

styling improve করো

timer duration change করো

question সংখ্যা বাড়াও

restart logic clean করো

Practice ছাড়া mastery আসে না।

Next Module: Asynchronous JavaScript

পরবর্তী module হবে Asynchronous JavaScript and Debugging Asynchronous Code।

সেখানে আমরা শিখব:

callback

callback hell

Promise

.then()

.catch()

async

await

fetch API

JSON file

API call

JavaScript event loop

microtask

macrotask

asynchronous code-এর common mistakes

একটি পূর্ণ project

project assignment

পরবর্তী lesson, অর্থাৎ video 22-এ আলোচনা শুরু হবে:

Callbacks, Callback Hell এবং Actual Problem

JavaScript mastery করতে হলে ধৈর্য ধরে প্রতিটি lesson practice করতে হবে। Video দেখা যথেষ্ট নয়; নিজে code করা, bug খোঁজা এবং existing project improve করাই আসল শেখা।

Final Recap

এই chapter-এ আমরা একটি পূর্ণ Quiz App তৈরি করেছি, যেখানে:

question random order-এ আসে

প্রতিটি question-এর জন্য ১৫ seconds timer থাকে

correct answer green হয়

wrong answer red হয় এবং correct answer দেখানো হয়

timeout হলে system correct answer select করে

auto-selection-এ score বাড়ে না

next question dynamically load হয়

final score দেখানো হয়

highest score localStorage-এ save হয়

restart button দেওয়া হয়

timer এবং interval safely clear করা হয়

এছাড়া আমরা শিখেছি project শুরু করার আগে UI plan করা, use case ছোট ছোট logic-এ ভাগ করা, reusable function তৈরি করা এবং bug step-by-step fix করা।

এই lesson-এর পর অবশ্যই:

page reload ছাড়া restart feature তৈরি করো

Recipe Finder App assignment সম্পন্ন করো

GitHub repository এবং clear README তৈরি করো

সম্ভব হলে project deploy করো

asynchronous JavaScript module শুরু করার আগে DOM project নিজে practice করো
