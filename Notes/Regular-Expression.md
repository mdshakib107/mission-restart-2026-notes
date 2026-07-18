# Regular Expression: Basic থেকে Advanced

## একটি পূর্ণাঙ্গ বাংলা গাইড

---

# সূচিপত্র

1. Regular Expression কী
2. Regex কেন ব্যবহার করা হয়
3. Regex Engine এবং Flavor
4. প্রথম Regex
5. Literal Character
6. Metacharacter
7. Character Class
8. Predefined Character Class
9. Quantifier
10. Greedy, Lazy এবং Possessive Matching
11. Anchor এবং Boundary
12. Group এবং Capturing Group
13. Non-Capturing Group
14. Alternation
15. Backreference
16. Named Capturing Group
17. Lookahead এবং Lookbehind
18. Flags বা Modifiers
19. Escaping
20. Unicode এবং বাংলা টেক্সট
21. Regex ব্যবহার করে Validation
22. Regex ব্যবহার করে Search এবং Replace
23. JavaScript-এ Regex
24. Python-এ Regex
25. Common Practical Patterns
26. Advanced Regex Techniques
27. Performance এবং Catastrophic Backtracking
28. Regex Security বা ReDoS
29. Regex Debugging
30. Regex Design Strategy
31. Regex কোথায় ব্যবহার না করাই ভালো
32. Interview Questions
33. Practice Problems
34. Cheat Sheet
35. উপসংহার

---

# অধ্যায় ১: Regular Expression কী?

Regular Expression, সংক্ষেপে **Regex** বা **RegExp**, হলো টেক্সটের মধ্যে নির্দিষ্ট pattern খোঁজা, যাচাই করা, আলাদা করা বা পরিবর্তন করার একটি ভাষা।

সহজভাবে:

> Regex হলো টেক্সট নিয়ে কাজ করার জন্য একটি pattern-matching system।

ধরা যাক, আমাদের কাছে নিচের টেক্সট আছে:

```text
My phone number is 01712345678
```

এখানে বাংলাদেশের একটি মোবাইল নম্বর খুঁজতে আমরা লিখতে পারি:

```regex
01[3-9]\d{8}
```

এই pattern-এর অর্থ:

```text
01       → নম্বরটি 01 দিয়ে শুরু হবে
[3-9]    → পরবর্তী digit হবে 3 থেকে 9
\d{8}    → এরপর ঠিক 8টি digit থাকবে
```

---

# অধ্যায় ২: Regex কেন ব্যবহার করা হয়?

Regex সাধারণত নিচের কাজগুলোতে ব্যবহৃত হয়:

* Email validation
* Phone number validation
* Password policy validation
* URL খোঁজা
* Log file analysis
* Source code search
* Data cleaning
* Search and replace
* Tokenization
* Form input validation
* Text extraction
* Syntax highlighting
* Web scraping-এ নির্দিষ্ট তথ্য খোঁজা
* IDE বা code editor-এ advanced search

উদাহরণ:

```text
user@example.com
```

একটি সরল email pattern:

```regex
^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$
```

তবে বাস্তব email standard অত্যন্ত জটিল। তাই production application-এ শুধু Regex দিয়ে email-এর অস্তিত্ব নিশ্চিত করা যায় না; verification email পাঠানোও প্রয়োজন।

---

# অধ্যায় ৩: Regex Engine এবং Flavor

সব programming language বা tool একই ধরনের Regex support করে না। Regex-এর বিভিন্ন implementation-কে সাধারণত **Regex flavor** বলা হয়।

প্রচলিত Regex flavor:

| Flavor           | কোথায় ব্যবহৃত হয়          |
| ---------------- | ------------------------- |
| JavaScript Regex | Browser, Node.js          |
| Python `re`      | Python                    |
| PCRE/PCRE2       | PHP, অনেক Unix tool       |
| Java Regex       | Java                      |
| .NET Regex       | C#, .NET                  |
| RE2              | Google-এর কিছু system, Go |
| POSIX BRE/ERE    | grep, sed, awk            |
| Rust Regex       | Rust                      |

সব engine-এর syntax পুরোপুরি এক নয়।

উদাহরণ:

```regex
(?<=৳)\d+
```

এটি একটি positive lookbehind। আধুনিক JavaScript, Python এবং PCRE-তে এটি কাজ করতে পারে, কিন্তু পুরোনো engine-এ নাও করতে পারে।

আরেকটি গুরুত্বপূর্ণ পার্থক্য:

* কিছু engine backtracking ব্যবহার করে
* কিছু engine deterministic approach ব্যবহার করে
* কিছু engine backreference support করে
* কিছু engine lookbehind support করে না
* কিছু engine variable-length lookbehind support করে না

তাই কোনো Regex ব্যবহার করার আগে target environment জানা জরুরি।

---

# অধ্যায় ৪: প্রথম Regex

ধরা যাক, আমাদের টেক্সট:

```text
I love JavaScript. JavaScript is powerful.
```

Regex:

```regex
JavaScript
```

এটি `JavaScript` শব্দটি খুঁজবে।

JavaScript:

```javascript
const text = "I love JavaScript. JavaScript is powerful.";

console.log(text.match(/JavaScript/));
```

Global search:

```javascript
console.log(text.match(/JavaScript/g));
```

Python:

```python
import re

text = "I love JavaScript. JavaScript is powerful."

result = re.findall(r"JavaScript", text)
print(result)
```

Output:

```text
['JavaScript', 'JavaScript']
```

---

# অধ্যায় ৫: Literal Character

Regex-এর সাধারণ অক্ষরগুলো literal character হিসেবে কাজ করে।

Regex:

```regex
cat
```

এটি match করবে:

```text
cat
```

কিন্তু match করবে না:

```text
Cat
cut
cats
```

Case-insensitive flag ব্যবহার করলে `Cat`-ও match করবে:

```regex
/cat/i
```

JavaScript:

```javascript
console.log(/cat/i.test("Cat"));
```

Output:

```text
true
```

---

# অধ্যায় ৬: Metacharacter

Regex-এ কিছু character বিশেষ অর্থ বহন করে। এগুলোকে metacharacter বলা হয়।

প্রধান metacharacter:

```text
. ^ $ * + ? { } [ ] \ | ( )
```

এগুলো literal হিসেবে match করতে চাইলে escape করতে হয়।

উদাহরণ:

```regex
\.
```

এটি একটি আসল dot match করবে।

```regex
\$
```

এটি dollar sign match করবে।

## Dot metacharacter

```regex
.
```

সাধারণত newline ছাড়া যেকোনো একটি character match করে।

Pattern:

```regex
c.t
```

Match করবে:

```text
cat
cut
cot
c9t
c-t
```

সাধারণত match করবে না:

```text
ct
coat
```

কারণ `.` ঠিক একটি character বোঝায়।

অনেক engine-এ dotall flag ব্যবহার করলে dot newline-ও match করে।

JavaScript:

```regex
/hello.world/s
```

Python:

```python
re.search(r"hello.world", text, re.DOTALL)
```

---

# অধ্যায় ৭: Character Class

Character class দিয়ে একটি নির্দিষ্ট set-এর মধ্য থেকে একটি character match করা হয়।

Syntax:

```regex
[abc]
```

এর অর্থ:

```text
a অথবা b অথবা c
```

Pattern:

```regex
b[aeiou]t
```

Match করবে:

```text
bat
bet
bit
bot
but
```

## Range

```regex
[a-z]
```

ছোট হাতের ইংরেজি letter।

```regex
[A-Z]
```

বড় হাতের letter।

```regex
[0-9]
```

যেকোনো digit।

```regex
[a-zA-Z0-9]
```

ইংরেজি letter অথবা digit।

## Negated character class

Character class-এর শুরুতে `^` দিলে set-এর বাইরে থাকা character match হয়।

```regex
[^0-9]
```

অর্থ:

```text
digit ছাড়া যেকোনো character
```

```regex
[^aeiou]
```

অর্থ:

```text
ইংরেজি lowercase vowel ছাড়া অন্য character
```

## Character class-এর ভেতরের বিশেষ নিয়ম

```regex
[.]
```

এখানে dot সাধারণত literal dot হিসেবে কাজ করে।

```regex
[-abc]
```

এখানে hyphen প্রথমে থাকায় literal hyphen।

```regex
[a\-z]
```

এখানেও escaped hyphen literal।

---

# অধ্যায় ৮: Predefined Character Class

Regex-এ কিছু shortcut character class রয়েছে।

## `\d`

Digit match করে।

```regex
\d
```

সাধারণভাবে:

```regex
[0-9]
```

তবে Unicode-aware কিছু engine-এ `\d` অন্যান্য script-এর digit-ও match করতে পারে।

## `\D`

Digit ছাড়া অন্য character:

```regex
\D
```

## `\w`

সাধারণত word character:

```regex
[A-Za-z0-9_]
```

তবে Unicode mode এবং engine অনুযায়ী আচরণ ভিন্ন হতে পারে।

## `\W`

Word character ছাড়া অন্য character।

## `\s`

Whitespace match করে।

যেমন:

* Space
* Tab
* Newline
* Carriage return

## `\S`

Whitespace ছাড়া অন্য character।

উদাহরণ:

```regex
\d\d\d
```

ঠিক তিনটি পরপর digit match করবে।

আরও সংক্ষিপ্তভাবে:

```regex
\d{3}
```

---

# অধ্যায় ৯: Quantifier

Quantifier বলে দেয়, আগের token কতবার থাকতে পারবে।

## `*`

শূন্য বা তার বেশি বার।

```regex
a*
```

Match করতে পারে:

```text
""
a
aa
aaa
```

## `+`

এক বা তার বেশি বার।

```regex
a+
```

Match করবে:

```text
a
aa
aaa
```

কিন্তু empty string match করবে না।

## `?`

শূন্য বা একবার।

```regex
colou?r
```

Match করবে:

```text
color
colour
```

কারণ `u` optional।

## `{n}`

ঠিক `n` বার।

```regex
\d{4}
```

ঠিক চারটি digit।

## `{n,}`

কমপক্ষে `n` বার।

```regex
a{3,}
```

Match করবে:

```text
aaa
aaaa
aaaaa
```

## `{n,m}`

কমপক্ষে `n`, সর্বোচ্চ `m` বার।

```regex
\d{2,4}
```

Match করতে পারে:

```text
12
123
1234
```

## Quantifier কোন অংশের উপর কাজ করে?

Quantifier ঠিক তার আগের token বা group-এর উপর কাজ করে।

```regex
ab+
```

এখানে `+` শুধু `b`-এর উপর কাজ করছে।

Match:

```text
ab
abb
abbb
```

কিন্তু পুরো `ab` repeat করতে চাইলে:

```regex
(ab)+
```

Match:

```text
ab
abab
ababab
```

---

# অধ্যায় ১০: Greedy, Lazy এবং Possessive Matching

## Greedy quantifier

Regex-এর quantifier সাধারণত greedy। অর্থাৎ যত বেশি সম্ভব character match করার চেষ্টা করে।

Text:

```html
<div>One</div><div>Two</div>
```

Pattern:

```regex
<.*>
```

এটি সম্ভবত পুরো অংশটি match করবে:

```html
<div>One</div><div>Two</div>
```

কারণ `.*` সর্বোচ্চ পরিমাণ text নেওয়ার চেষ্টা করে।

## Lazy quantifier

Quantifier-এর পরে `?` দিলে সেটি lazy বা reluctant হয়।

```regex
<.*?>
```

এটি আলাদা আলাদা tag match করবে:

```html
<div>
</div>
<div>
</div>
```

প্রধান lazy quantifier:

```regex
*?
+?
??
{n,m}?
```

## Possessive quantifier

কিছু engine, যেমন Java এবং PCRE, possessive quantifier support করে।

```regex
a++
```

Possessive quantifier match করা character backtrack করে ছেড়ে দেয় না।

উদাহরণ:

```regex
a++a
```

Text:

```text
aaaa
```

এটি fail করতে পারে, কারণ `a++` সব `a` নিয়ে নেয় এবং পরের `a`-এর জন্য কোনো character ছাড়ে না।

JavaScript বর্তমানে সাধারণ possessive quantifier syntax support করে না।

---

# অধ্যায় ১১: Anchor এবং Boundary

Anchor character consume করে না। বরং position match করে।

## `^`

String বা line-এর শুরু।

```regex
^Hello
```

Match করবে:

```text
Hello world
```

Match করবে না:

```text
Say Hello
```

## `$`

String বা line-এর শেষ।

```regex
world$
```

Match করবে:

```text
Hello world
```

## পুরো string match

```regex
^\d{4}$
```

এটি এমন string match করবে যেখানে শুধুই চারটি digit আছে।

Match:

```text
2026
```

Match করবে না:

```text
Year 2026
20260
```

## Word boundary: `\b`

Word character এবং non-word character-এর মাঝের position match করে।

```regex
\bcat\b
```

Match করবে:

```text
cat
a cat is here
```

Match করবে না:

```text
category
bobcat
```

সতর্কতা: বাংলা শব্দে `\b` সব engine-এ প্রত্যাশিতভাবে কাজ নাও করতে পারে, কারণ `\w` এবং Unicode classification-এর আচরণ engine অনুযায়ী ভিন্ন।

## Non-word boundary: `\B`

```regex
\Bcat\B
```

এটি এমন `cat` match করবে, যার দুই পাশ word-এর ভেতরে।

---

# অধ্যায় ১২: Group এবং Capturing Group

Parentheses ব্যবহার করে group তৈরি করা হয়।

```regex
(ab)+
```

এখানে `ab` একটি group।

## Capturing group

```regex
(\d{4})-(\d{2})-(\d{2})
```

Text:

```text
2026-07-18
```

Captured groups:

```text
Group 1: 2026
Group 2: 07
Group 3: 18
```

JavaScript:

```javascript
const match = "2026-07-18".match(/(\d{4})-(\d{2})-(\d{2})/);

console.log(match[0]); // 2026-07-18
console.log(match[1]); // 2026
console.log(match[2]); // 07
console.log(match[3]); // 18
```

Python:

```python
import re

match = re.search(r"(\d{4})-(\d{2})-(\d{2})", "2026-07-18")

if match:
    print(match.group(0))
    print(match.group(1))
    print(match.group(2))
    print(match.group(3))
```

---

# অধ্যায় ১৩: Non-Capturing Group

সব group capture করা প্রয়োজন হয় না।

Syntax:

```regex
(?:...)
```

উদাহরণ:

```regex
(?:https?|ftp)://
```

এখানে protocol group করা হয়েছে, কিন্তু capture করা হয়নি।

Match করবে:

```text
http://
https://
ftp://
```

Non-capturing group ব্যবহারের কারণ:

* অপ্রয়োজনীয় capture এড়ানো
* group numbering সহজ রাখা
* কিছু ক্ষেত্রে memory overhead কমানো
* pattern-এর structure পরিষ্কার রাখা

---

# অধ্যায় ১৪: Alternation

Pipe symbol `|` logical OR হিসেবে কাজ করে।

```regex
cat|dog
```

Match করবে:

```text
cat
dog
```

Grouping ছাড়া alternation-এর scope নিয়ে সতর্ক থাকতে হবে।

```regex
^cat|dog$
```

এটির অর্থ:

```text
string-এর শুরুতে cat
অথবা
string-এর শেষে dog
```

পুরো string-কে `cat` অথবা `dog` করতে চাইলে:

```regex
^(?:cat|dog)$
```

আরেকটি উদাহরণ:

```regex
gr(?:a|e)y
```

Match করবে:

```text
gray
grey
```

আরও সহজ:

```regex
gr[ae]y
```

---

# অধ্যায় ১৫: Backreference

Backreference আগে capture করা text আবার match করতে ব্যবহার হয়।

Pattern:

```regex
(\w+)\s+\1
```

Text:

```text
hello hello
```

এখানে:

```text
(\w+)  → hello capture করে
\1     → একই text আবার থাকতে হবে
```

Repeated word খুঁজতে:

```regex
\b(\w+)\s+\1\b
```

Match:

```text
the the
is is
hello hello
```

## Quote matching

```regex
(["']).*?\1
```

এটি opening quote capture করে এবং একই ধরনের closing quote খোঁজে।

Match:

```text
"hello"
'world'
```

Group numbering:

```text
\1 → প্রথম capturing group
\2 → দ্বিতীয় capturing group
\3 → তৃতীয় capturing group
```

Replacement syntax engine অনুযায়ী ভিন্ন হতে পারে:

```text
JavaScript replacement: $1, $2
Python replacement: \1 অথবা \g<1>
```

---

# অধ্যায় ১৬: Named Capturing Group

Numbered group-এর পরিবর্তে নাম ব্যবহার করা যায়।

## JavaScript

```regex
(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})
```

```javascript
const match = "2026-07-18".match(
  /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
);

console.log(match.groups.year);
console.log(match.groups.month);
console.log(match.groups.day);
```

## Python

```regex
(?P<year>\d{4})-(?P<month>\d{2})-(?P<day>\d{2})
```

```python
import re

pattern = r"(?P<year>\d{4})-(?P<month>\d{2})-(?P<day>\d{2})"
match = re.search(pattern, "2026-07-18")

if match:
    print(match.group("year"))
    print(match.groupdict())
```

## Named backreference

JavaScript:

```regex
(?<word>\w+)\s+\k<word>
```

Python:

```regex
(?P<word>\w+)\s+(?P=word)
```

Named group বড় pattern পড়া এবং maintain করা সহজ করে।

---

# অধ্যায় ১৭: Lookahead এবং Lookbehind

Lookaround কোনো text consume না করে সামনে বা পেছনে condition পরীক্ষা করে।

## Positive lookahead

Syntax:

```regex
X(?=Y)
```

অর্থ:

```text
X-এর পরে Y থাকলে X match করো
```

Pattern:

```regex
\d+(?=৳)
```

Text:

```text
500৳
```

Match:

```text
500
```

`৳` match result-এর অংশ হবে না।

## Negative lookahead

Syntax:

```regex
X(?!Y)
```

অর্থ:

```text
X-এর পরে Y না থাকলে X match করো
```

```regex
foo(?!bar)
```

Match করবে:

```text
foobaz
foo123
```

Match করবে না:

```text
foobar
```

## Positive lookbehind

Syntax:

```regex
(?<=Y)X
```

অর্থ:

```text
X-এর আগে Y থাকলে X match করো
```

```regex
(?<=৳)\d+
```

Text:

```text
৳500
```

Match:

```text
500
```

## Negative lookbehind

Syntax:

```regex
(?<!Y)X
```

অর্থ:

```text
X-এর আগে Y না থাকলে X match করো
```

```regex
(?<!৳)\d+
```

## Password validation-এ lookahead

শর্ত:

* অন্তত একটি lowercase letter
* অন্তত একটি uppercase letter
* অন্তত একটি digit
* অন্তত একটি special character
* দৈর্ঘ্য 8 থেকে 64

Pattern:

```regex
^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,64}$
```

ব্যাখ্যা:

```text
^                  → string শুরু
(?=.*[a-z])        → lowercase থাকতে হবে
(?=.*[A-Z])        → uppercase থাকতে হবে
(?=.*\d)           → digit থাকতে হবে
(?=.*[^A-Za-z0-9\s]) → special character থাকতে হবে
.{8,64}            → মোট দৈর্ঘ্য 8–64
$                  → string শেষ
```

নিরাপত্তার দিক থেকে password complexity rule-এর পাশাপাশি দীর্ঘ password, rate limiting এবং secure hashing বেশি গুরুত্বপূর্ণ।

---

# অধ্যায় ১৮: Flags বা Modifiers

Flags Regex-এর matching behavior পরিবর্তন করে।

## `g`: Global

সব match খুঁজে।

JavaScript:

```javascript
"cat cat cat".match(/cat/g);
```

## `i`: Case-insensitive

```regex
/hello/i
```

Match করবে:

```text
hello
Hello
HELLO
```

## `m`: Multiline

`^` এবং `$` প্রতিটি line-এর শুরু ও শেষে কাজ করে।

Text:

```text
apple
banana
apple
```

Pattern:

```regex
/^apple$/gm
```

দুটি `apple` line match করবে।

## `s`: Dotall

Dot যেন newline-ও match করে।

```regex
/a.*b/s
```

## `u`: Unicode

JavaScript-এ Unicode code point অনুযায়ী matching উন্নত করে।

```javascript
/^.$/u.test("😀");
```

## `y`: Sticky

JavaScript-এ নির্দিষ্ট `lastIndex` position থেকেই match শুরু করে।

## Python flags

```python
re.IGNORECASE
re.MULTILINE
re.DOTALL
re.VERBOSE
re.ASCII
```

উদাহরণ:

```python
re.search(r"hello", "HELLO", re.IGNORECASE)
```

---

# অধ্যায় ১৯: Escaping

Regex metacharacter literal হিসেবে match করতে backslash ব্যবহার করা হয়।

```regex
\.
\+
\*
\?
\(
\)
\[
\]
\{
\}
\|
\^
\$
\\
```

## Regex literal বনাম string literal

JavaScript regex literal:

```javascript
const pattern = /\d+/;
```

JavaScript string দিয়ে RegExp:

```javascript
const pattern = new RegExp("\\d+");
```

এখানে double escaping প্রয়োজন, কারণ প্রথম backslash JavaScript string parser consume করে।

Python raw string:

```python
pattern = r"\d+"
```

Raw string ব্যবহার করলে escaping সহজ হয়।

```python
pattern = "\\d+"
```

এটিও কাজ করতে পারে, কিন্তু কম readable।

## User input থেকে Regex তৈরি

JavaScript-এ user input সরাসরি `RegExp`-এ দিলে special character সমস্যা তৈরি করতে পারে।

```javascript
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const userInput = "a+b";
const pattern = new RegExp(escapeRegExp(userInput), "g");
```

---

# অধ্যায় ২০: Unicode এবং বাংলা টেক্সট

বাংলা text নিয়ে Regex ব্যবহার করার সময় ASCII-oriented pattern যথেষ্ট নয়।

## বাংলা Unicode range

বাংলা Unicode block-এর সাধারণ range:

```regex
[\u0980-\u09FF]
```

এক বা একাধিক বাংলা Unicode character:

```regex
[\u0980-\u09FF]+
```

JavaScript:

```javascript
const text = "Hello বাংলা 123";
const words = text.match(/[\u0980-\u09FF]+/g);

console.log(words);
```

Output:

```text
["বাংলা"]
```

## শুধুমাত্র বাংলা অক্ষর এবং space

```regex
^[\u0980-\u09FF\s]+$
```

তবে এই range-এর মধ্যে বাংলা digit, punctuation এবং বিভিন্ন sign-ও রয়েছে। শুধু বাংলা letter match করতে Unicode property escape ভালো হতে পারে।

## Unicode property escape

JavaScript:

```regex
/\p{Script=Bengali}+/gu
```

Letters only:

```regex
/\p{L}+/gu
```

Python-এর built-in `re` module JavaScript-এর মতো `\p{...}` syntax support করে না। Python-এ third-party `regex` package ব্যবহার করা যেতে পারে:

```python
import regex

result = regex.findall(r"\p{Script=Bengali}+", "Hello বাংলা 123")
print(result)
```

## Grapheme cluster সমস্যা

একটি দৃশ্যমান বাংলা অক্ষর একাধিক Unicode code point দিয়ে তৈরি হতে পারে।

যেমন:

```text
কি
ক্র
ক্ষ
```

তাই `.` সবসময় একটি দৃশ্যমান অক্ষর বোঝায় না। এটি অনেক সময় একটি code point match করে।

Grapheme cluster match করার জন্য PCRE বা Python-এর `regex` package-এ:

```regex
\X
```

ব্যবহার করা যায়।

---

# অধ্যায় ২১: Regex ব্যবহার করে Validation

Validation-এর ক্ষেত্রে সাধারণ নিয়ম:

```regex
^pattern$
```

অথবা engine-এর full-match API ব্যবহার করতে হবে।

## Username

শর্ত:

* lowercase letter দিয়ে শুরু
* lowercase letter, digit এবং underscore ব্যবহারযোগ্য
* দৈর্ঘ্য 4–20

```regex
^[a-z][a-z0-9_]{3,19}$
```

Valid:

```text
rahim_01
developer123
```

Invalid:

```text
1rahim
ab
user-name
```

## বাংলাদেশের মোবাইল নম্বর

Local format:

```regex
^01[3-9]\d{8}$
```

Valid:

```text
01712345678
01912345678
```

Country code-সহ optional format:

```regex
^(?:\+?88)?01[3-9]\d{8}$
```

Match করতে পারে:

```text
01712345678
8801712345678
+8801712345678
```

Separator support করতে চাইলে:

```regex
^(?:\+?88[- ]?)?01[3-9]\d[- ]?\d{3}[- ]?\d{4}$
```

তবে input normalize করে তারপর validate করা অনেক সময় ভালো।

## ZIP বা postal code

চার digit:

```regex
^\d{4}$
```

## IPv4-এর সরল pattern

```regex
^(?:\d{1,3}\.){3}\d{1,3}$
```

এটি structure যাচাই করে, কিন্তু প্রতিটি octet 0–255 কিনা যাচাই করে না।

আরও strict pattern:

```regex
^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$
```

Production code-এ IP parser/library ব্যবহার করা সাধারণত উত্তম।

## Hex color

```regex
^#(?:[A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$
```

Valid:

```text
#fff
#FFFFFF
#12abEF
```

Alpha channel support:

```regex
^#(?:[A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$
```

## Email-এর practical pattern

```regex
^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$
```

এটিও সব বৈধ email cover করে না এবং সব অবৈধ email reject করে না।

Email validation-এর বাস্তব strategy:

1. Basic format check
2. Input normalization
3. Domain handling
4. Verification email
5. Unique constraint
6. Rate limiting

## Date format

`YYYY-MM-DD` structure:

```regex
^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$
```

কিন্তু এটি `2025-02-31`-কে invalid বলবে না। কারণ calendar logic Regex-এর বাইরে।

সঠিক approach:

1. Regex দিয়ে format check
2. Date parser দিয়ে calendar validity check

---

# অধ্যায় ২২: Search এবং Replace

Regex-এর একটি শক্তিশালী ব্যবহার হলো capture group ব্যবহার করে text rearrange করা।

## Date format পরিবর্তন

Input:

```text
2026-07-18
```

Pattern:

```regex
(\d{4})-(\d{2})-(\d{2})
```

Replacement:

```text
$3/$2/$1
```

Output:

```text
18/07/2026
```

JavaScript:

```javascript
const input = "2026-07-18";

const output = input.replace(
  /(\d{4})-(\d{2})-(\d{2})/,
  "$3/$2/$1"
);

console.log(output);
```

Python:

```python
import re

output = re.sub(
    r"(\d{4})-(\d{2})-(\d{2})",
    r"\3/\2/\1",
    "2026-07-18"
)

print(output)
```

## Extra spaces remove

```regex
\s+
```

Replace with:

```text
একটি space
```

JavaScript:

```javascript
const clean = text.replace(/\s+/g, " ").trim();
```

## Duplicate word remove

Pattern:

```regex
\b(\w+)(?:\s+\1\b)+
```

Replacement:

```text
$1
```

## Snake case থেকে kebab case

```javascript
const result = "my_variable_name".replace(/_/g, "-");
```

Output:

```text
my-variable-name
```

## CamelCase split

```regex
([a-z])([A-Z])
```

Replacement:

```text
$1 $2
```

Input:

```text
helloWorldRegex
```

Output:

```text
hello World Regex
```

---

# অধ্যায় ২৩: JavaScript-এ Regex

## Regex তৈরি

Literal syntax:

```javascript
const pattern = /\d+/;
```

Constructor:

```javascript
const pattern = new RegExp("\\d+");
```

Dynamic pattern-এর জন্য constructor প্রয়োজন হতে পারে।

```javascript
const word = "JavaScript";
const pattern = new RegExp(word, "gi");
```

## `test()`

Boolean return করে।

```javascript
const pattern = /^\d+$/;

console.log(pattern.test("12345")); // true
console.log(pattern.test("12a45")); // false
```

## `match()`

```javascript
const text = "Order 12, Order 45";
console.log(text.match(/\d+/g));
```

Output:

```text
["12", "45"]
```

## `matchAll()`

Capture group-সহ সব match পেতে:

```javascript
const text = "2025-01-10 and 2026-07-18";
const pattern = /(\d{4})-(\d{2})-(\d{2})/g;

for (const match of text.matchAll(pattern)) {
  console.log(match[0], match[1], match[2], match[3]);
}
```

## `exec()`

```javascript
const pattern = /\d+/g;
const text = "12 34 56";

let match;

while ((match = pattern.exec(text)) !== null) {
  console.log(match[0], match.index);
}
```

Global বা sticky Regex-এর `lastIndex` পরিবর্তিত হয়। তাই একই Regex object পুনরায় ব্যবহার করার সময় সতর্ক থাকতে হবে।

```javascript
const pattern = /\d/g;

console.log(pattern.test("1")); // true
console.log(pattern.lastIndex); // 1
```

## `replace()`

```javascript
const result = "hello world".replace(/world/, "Regex");
```

## Replacement callback

```javascript
const result = "Price: 500".replace(/\d+/, (value) => {
  return String(Number(value) * 2);
});

console.log(result);
```

Output:

```text
Price: 1000
```

## `split()`

```javascript
const items = "apple, banana; orange".split(/[,;]\s*/);
```

Output:

```text
["apple", "banana", "orange"]
```

---

# অধ্যায় ২৪: Python-এ Regex

Python-এ `re` module ব্যবহার করা হয়।

```python
import re
```

## `re.search()`

String-এর যেকোনো জায়গায় match খোঁজে।

```python
match = re.search(r"\d+", "Order ID: 123")

if match:
    print(match.group())
```

## `re.match()`

String-এর শুরু থেকে match করার চেষ্টা করে।

```python
re.match(r"\d+", "123abc")
```

## `re.fullmatch()`

পুরো string pattern-এর সঙ্গে match করতে হবে।

```python
result = re.fullmatch(r"\d{4}", "2026")
```

Validation-এর জন্য `fullmatch()` খুব কার্যকর।

## `re.findall()`

সব match list হিসেবে দেয়।

```python
numbers = re.findall(r"\d+", "12 apples and 30 oranges")
print(numbers)
```

Output:

```text
['12', '30']
```

Capturing group থাকলে `findall()`-এর output পরিবর্তিত হতে পারে।

```python
re.findall(r"(\d{4})-(\d{2})", "2025-01 2026-07")
```

Output:

```text
[('2025', '01'), ('2026', '07')]
```

## `re.finditer()`

Match object iterator দেয়।

```python
for match in re.finditer(r"\d+", "12 34 56"):
    print(match.group(), match.start(), match.end())
```

## `re.sub()`

```python
clean = re.sub(r"\s+", " ", text).strip()
```

## `re.split()`

```python
items = re.split(r"[,;]\s*", "apple, banana; orange")
```

## Compiled pattern

```python
phone_pattern = re.compile(r"^01[3-9]\d{8}$")

if phone_pattern.fullmatch("01712345678"):
    print("Valid")
```

একই pattern বারবার ব্যবহৃত হলে compile করা readability বাড়ায়।

## Verbose mode

Complex Regex readable করতে:

```python
pattern = re.compile(
    r"""
    ^
    (?P<year>\d{4})
    -
    (?P<month>0[1-9]|1[0-2])
    -
    (?P<day>0[1-9]|[12]\d|3[01])
    $
    """,
    re.VERBOSE
)
```

Verbose mode-এ whitespace এবং comment সাধারণত ignored হয়।

---

# অধ্যায় ২৫: Common Practical Patterns

## Integer

```regex
^[+-]?\d+$
```

Match:

```text
12
-12
+12
```

## Decimal number

```regex
^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$
```

Match:

```text
12
12.50
-0.5
.75
```

## হাজার separator-সহ number

```regex
^[+-]?(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d+)?$
```

Match:

```text
1,000
12,500.75
1000
```

## URL-এর সরল pattern

```regex
https?://[^\s]+
```

এটি text থেকে URL-এর মতো অংশ extract করতে কাজে লাগে, কিন্তু strict URL validation নয়।

## Domain name-এর practical pattern

```regex
^(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$
```

Internationalized domain এবং modern TLD handling-এর জন্য URL/domain library ভালো।

## HTML tag খোঁজা

```regex
<[^>]+>
```

Simple text cleaning-এ উপকারী হতে পারে। কিন্তু HTML parse করার জন্য DOM parser বা HTML parser ব্যবহার করা উচিত।

## Markdown heading

```regex
^#{1,6}\s+.+$
```

Multiline mode প্রয়োজন হতে পারে।

## Log line parsing

Log:

```text
2026-07-18 10:30:45 ERROR Database connection failed
```

Pattern:

```regex
^(?<date>\d{4}-\d{2}-\d{2})\s+(?<time>\d{2}:\d{2}:\d{2})\s+(?<level>INFO|WARN|ERROR)\s+(?<message>.+)$
```

Python syntax:

```regex
^(?P<date>\d{4}-\d{2}-\d{2})\s+(?P<time>\d{2}:\d{2}:\d{2})\s+(?P<level>INFO|WARN|ERROR)\s+(?P<message>.+)$
```

## File extension

```regex
\.([A-Za-z0-9]+)$
```

Image extension:

```regex
\.(?:jpe?g|png|gif|webp|svg)$
```

Case-insensitive flag ব্যবহার করা উচিত।

## UUID v4

```regex
^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$
```

Case-insensitive flag সহ।

## MAC address

```regex
^(?:[0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}$
```

## 24-hour time

```regex
^(?:[01]\d|2[0-3]):[0-5]\d$
```

Valid:

```text
00:00
09:30
23:59
```

Invalid:

```text
24:00
12:70
```

## Slug

```regex
^[a-z0-9]+(?:-[a-z0-9]+)*$
```

Valid:

```text
learn-regular-expression
regex-101
```

---

# অধ্যায় ২৬: Advanced Regex Techniques

## Atomic group

কিছু engine atomic group support করে:

```regex
(?>...)
```

Atomic group-এর ভেতরের match পরে backtrack করা হয় না।

উদাহরণ:

```regex
(?>a+)a
```

Text:

```text
aaaa
```

এটি fail করতে পারে, কারণ atomic group সব `a` নিয়ে নেয় এবং পরের `a`-এর জন্য backtrack করে না।

JavaScript সাধারণ atomic group support করে না।

## Conditional pattern

কিছু engine conditional Regex support করে।

PCRE-style:

```regex
(?(1)yes|no)
```

উদাহরণ:

```regex
^(a)?(?(1)b|c)$
```

অর্থ:

* প্রথম group-এ `a` থাকলে এরপর `b`
* না থাকলে `c`

Match:

```text
ab
c
```

## Recursive pattern

PCRE-এর মতো কিছু engine recursive pattern support করে।

Balanced parentheses-এর সীমিত matching:

```regex
\((?:[^()]|(?R))*\)
```

JavaScript এবং Python built-in `re` এটি support করে না।

Nested language parsing-এর জন্য parser ব্যবহার করাই ভালো।

## Branch reset group

PCRE:

```regex
(?|(a)|(b))
```

বিভিন্ন branch-এর capture numbering একই রাখা যায়।

## Subroutine

PCRE-style:

```regex
(?1)
```

আগের group pattern আবার ব্যবহার করতে পারে।

## Free-spacing mode

Complex pattern formatting:

```regex
(?x)
^
\d{4}       # year
-
\d{2}       # month
-
\d{2}       # day
$
```

JavaScript-এ native free-spacing mode নেই। Pattern string ভাগ করে বা comment দিয়ে আলাদাভাবে তৈরি করতে হয়।

---

# অধ্যায় ২৭: Performance এবং Catastrophic Backtracking

Regex engine অনেক ক্ষেত্রে backtracking ব্যবহার করে।

Pattern:

```regex
(a+)+$
```

Input:

```text
aaaaaaaaaaaaaaaaaaaaaaaaaaaaX
```

এই pattern ভয়াবহ ধীর হতে পারে।

কারণ engine বিভিন্নভাবে `a`-গুলো group করার চেষ্টা করে:

```text
(a)(a)(a)...
(aa)(a)(a)...
(a)(aa)(a)...
(aaa)(a)...
```

Input শেষে `X` থাকার কারণে pattern fail করে, কিন্তু fail করার আগে অসংখ্য combination পরীক্ষা করতে পারে।

একে বলা হয়:

```text
Catastrophic backtracking
```

## ঝুঁকিপূর্ণ pattern-এর লক্ষণ

### Nested quantifier

```regex
(a+)+
(\w*)*
(.+)+
```

### Overlapping alternatives

```regex
(a|aa)+
```

### Ambiguous wildcard

```regex
.*.*.*
```

### Unbounded input

User-controlled বিশাল input-এর উপর complex pattern চালানো।

## উন্নত pattern

খারাপ:

```regex
^(a+)+$
```

ভালো:

```regex
^a+$
```

খারাপ:

```regex
^.*END$
```

যদি structure জানা থাকে, ভালো:

```regex
^[^\r\n]*END$
```

খারাপ:

```regex
<.*>
```

ভালো:

```regex
<[^>]*>
```

অথবা lazy:

```regex
<.*?>
```

তবে negated character class সাধারণত আরও predictable।

## Atomic group এবং possessive quantifier

Supported engine-এ:

```regex
(?>a+)
```

অথবা:

```regex
a++
```

backtracking কমাতে পারে।

---

# অধ্যায় ২৮: Regex Security বা ReDoS

ReDoS অর্থ:

```text
Regular Expression Denial of Service
```

যখন attacker এমন input দেয়, যাতে Regex অত্যন্ত বেশি সময় নেয়।

উদাহরণ:

```regex
^(\w+\s?)*$
```

কিছু crafted input-এর ক্ষেত্রে এটি বিপজ্জনক হতে পারে।

## ReDoS প্রতিরোধ

1. User input length limit করুন
2. Nested quantifier এড়িয়ে চলুন
3. Overlapping alternation কমান
4. Wildcard সীমিত করুন
5. Regex timeout support থাকলে ব্যবহার করুন
6. RE2-এর মতো non-backtracking engine বিবেচনা করুন
7. Production pattern benchmark করুন
8. Invalid near-match input দিয়ে test করুন
9. User-provided Regex সরাসরি execute করবেন না
10. Static analyzer বা ReDoS scanner ব্যবহার করুন

## User-provided pattern

নিচের code বিপজ্জনক হতে পারে:

```javascript
const pattern = new RegExp(userPattern);
```

কারণ user catastrophic pattern দিতে পারে।

সম্ভব হলে:

* Pattern allowlist করুন
* Feature সীমিত করুন
* Execution isolate করুন
* Input length সীমিত করুন
* Timeout-capable environment ব্যবহার করুন

---

# অধ্যায় ২৯: Regex Debugging

Regex কাজ না করলে একসঙ্গে পুরো pattern debug না করে ছোট অংশে ভাগ করুন।

## Step 1: Literal অংশ পরীক্ষা

```regex
2026-
```

## Step 2: একটি component যোগ করুন

```regex
2026-\d{2}
```

## Step 3: পুরো structure

```regex
2026-\d{2}-\d{2}
```

## Step 4: Anchor যোগ করুন

```regex
^2026-\d{2}-\d{2}$
```

## Step 5: Range strict করুন

```regex
^2026-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$
```

## Debugging checklist

* Pattern string-এ double escaping লাগছে কি?
* Global flag প্রয়োজন কি?
* Case-insensitive flag অনুপস্থিত কি?
* `^` এবং `$` ভুল scope-এ আছে কি?
* Alternation group করা হয়েছে কি?
* Quantifier ভুল token-এর উপর কাজ করছে কি?
* Greedy matching বেশি text নিচ্ছে কি?
* Newline থাকার কারণে dot fail করছে কি?
* Unicode flag প্রয়োজন কি?
* Capturing group numbering পরিবর্তিত হয়েছে কি?
* Regex flavor syntax support করে কি?
* Input-এ invisible whitespace আছে কি?
* Windows newline `\r\n` আছে কি?

## Visible whitespace debug

JavaScript:

```javascript
console.log(JSON.stringify(input));
```

Python:

```python
print(repr(input))
```

এতে hidden newline, tab এবং space দেখা যায়।

---

# অধ্যায় ৩০: Regex Design Strategy

একটি ভালো Regex লেখার প্রক্রিয়া:

## ১. Requirement নির্ধারণ

ভুল requirement:

```text
একটি email Regex লিখতে হবে।
```

ভালো requirement:

```text
Input-এ space থাকবে না।
একটি @ থাকবে।
Domain-এ অন্তত একটি dot থাকবে।
সর্বোচ্চ দৈর্ঘ্য 254।
বাস্তবে verification email পাঠানো হবে।
```

## ২. Positive example তৈরি

```text
user@example.com
first.last@company.org
```

## ৩. Negative example তৈরি

```text
user@
@example.com
user example@test.com
```

## ৪. Pattern ছোট অংশে লিখুন

```regex
local-part
@
domain
```

## ৫. Anchor দিন

```regex
^...$
```

## ৬. Grouping স্পষ্ট করুন

```regex
^(?:option1|option2)$
```

## ৭. Unbounded wildcard কমান

এড়িয়ে চলুন:

```regex
.*
```

সম্ভব হলে ব্যবহার করুন:

```regex
[^,]*
[^"]*
\S+
```

## ৮. Capture শুধু প্রয়োজনীয় জায়গায়

```regex
(?:...)
```

ব্যবহার করুন যেখানে captured value প্রয়োজন নেই।

## ৯. Performance test

Test input:

* Valid short input
* Valid long input
* Invalid short input
* Invalid long input
* প্রায় valid কিন্তু শেষে invalid input
* Repeated character input
* Empty input
* Unicode input

## ১০. Pattern document করুন

Complex Regex-এর পাশে লিখুন:

* উদ্দেশ্য
* supported examples
* rejected examples
* engine
* flags
* known limitation

---

# অধ্যায় ৩১: Regex কোথায় ব্যবহার না করাই ভালো

Regex শক্তিশালী, কিন্তু সব সমস্যার সমাধান নয়।

## HTML/XML parsing

Nested HTML parse করতে Regex ব্যবহার করা উচিত নয়।

ভালো:

* Browser DOMParser
* BeautifulSoup
* lxml
* Cheerio
* jsdom

## JSON parsing

Regex দিয়ে JSON parse না করে:

```javascript
JSON.parse()
```

Python:

```python
json.loads()
```

## Programming language parsing

Complex nested grammar-এর জন্য parser, tokenizer বা compiler tool ব্যবহার করুন।

## Date validity

Regex format check করতে পারে, কিন্তু leap year এবং calendar rule parser দিয়ে validate করা উচিত।

## URL parsing

URL extract করতে Regex কাজে লাগতে পারে। কিন্তু URL component parse করতে built-in URL parser ব্যবহার করুন।

JavaScript:

```javascript
const url = new URL(input);
```

Python:

```python
from urllib.parse import urlparse
```

## Password strength

একটি Regex দিয়ে password-এর প্রকৃত শক্তি নির্ধারণ করা যায় না।

Password security-এর জন্য:

* Minimum length
* Compromised-password check
* Rate limiting
* Argon2id/bcrypt/scrypt hashing
* MFA
* Password manager support

---

# অধ্যায় ৩২: Interview Questions

## প্রশ্ন ১: `*` এবং `+`-এর পার্থক্য কী?

```text
* → শূন্য বা তার বেশি
+ → এক বা তার বেশি
```

## প্রশ্ন ২: `.` কী match করে?

সাধারণত newline ছাড়া যেকোনো একটি character। Dotall mode-এ newline-ও match করতে পারে।

## প্রশ্ন ৩: Capturing এবং non-capturing group-এর পার্থক্য কী?

```regex
(...)   → capture করে
(?:...) → group করে, capture করে না
```

## প্রশ্ন ৪: Greedy এবং lazy quantifier কী?

```regex
.*   → যত বেশি সম্ভব
.*?  → যত কম সম্ভব
```

## প্রশ্ন ৫: Lookahead কি text consume করে?

না। এটি condition পরীক্ষা করে, কিন্তু match result-এ সেই অংশ যোগ করে না।

## প্রশ্ন ৬: `^` character class-এর ভেতরে এবং বাইরে কী বোঝায়?

বাইরে:

```regex
^abc
```

String বা line-এর শুরু।

Character class-এর শুরুতে:

```regex
[^abc]
```

`a`, `b`, `c` ছাড়া অন্য character।

## প্রশ্ন ৭: `\b` কী?

Word boundary। এটি কোনো character নয়; একটি position match করে।

## প্রশ্ন ৮: Backreference কী?

আগের capturing group যে text match করেছে, সেই একই text আবার match করার নির্দেশ।

```regex
(\w+)\s+\1
```

## প্রশ্ন ৯: Catastrophic backtracking কী?

Ambiguous pattern-এর কারণে Regex engine যখন বিপুল সংখ্যক matching combination পরীক্ষা করে এবং execution time অস্বাভাবিকভাবে বেড়ে যায়।

## প্রশ্ন ১০: Regex দিয়ে HTML parse করা উচিত কি?

সাধারণত না। HTML nested এবং context-sensitive structure হওয়ায় parser ব্যবহার করা উচিত।

---

# অধ্যায় ৩৩: Practice Problems

## সমস্যা ১

শুধু digit-সমৃদ্ধ string validate করুন।

উত্তর:

```regex
^\d+$
```

## সমস্যা ২

ঠিক ছয়টি digit validate করুন।

```regex
^\d{6}$
```

## সমস্যা ৩

`color` এবং `colour` দুটোই match করুন।

```regex
^colou?r$
```

## সমস্যা ৪

সব `.jpg`, `.jpeg`, `.png` filename match করুন।

```regex
\.(?:jpe?g|png)$
```

Case-insensitive flag ব্যবহার করুন।

## সমস্যা ৫

Repeated word খুঁজুন।

```regex
\b(\w+)\s+\1\b
```

## সমস্যা ৬

`YYYY-MM-DD` format capture করুন।

```regex
^(\d{4})-(\d{2})-(\d{2})$
```

## সমস্যা ৭

বাংলাদেশি মোবাইল নম্বর validate করুন।

```regex
^(?:\+?88)?01[3-9]\d{8}$
```

## সমস্যা ৮

একটি string-এ অন্তত একটি digit আছে কি না।

```regex
\d
```

Validation condition হিসেবে:

```regex
^(?=.*\d).+$
```

## সমস্যা ৯

Comma বা semicolon দিয়ে text split করুন।

```regex
[,;]\s*
```

## সমস্যা ১০

HTML tag-এর ভেতরের text আলাদা করুন।

Input:

```html
<h1>Hello</h1>
```

Pattern:

```regex
<[^>]+>|[^<]+
```

তবে বাস্তব HTML parsing-এর জন্য parser ব্যবহার করুন।

## সমস্যা ১১

একটি valid identifier:

* letter বা underscore দিয়ে শুরু
* এরপর letter, digit বা underscore

```regex
^[A-Za-z_][A-Za-z0-9_]*$
```

## সমস্যা ১২

একটি string-এর শুরু ও শেষের whitespace remove করুন।

Search:

```regex
^\s+|\s+$
```

Replace with empty string।

বেশিরভাগ ভাষায় built-in `trim()` বা `strip()` ব্যবহার করা ভালো।

---

# অধ্যায় ৩৪: Regex Cheat Sheet

## Basic tokens

| Pattern  | অর্থ                        |
| -------- | --------------------------- |
| `a`      | literal `a`                 |
| `.`      | যেকোনো একটি character       |
| `\.`     | literal dot                 |
| `[abc]`  | a, b বা c                   |
| `[^abc]` | a, b, c ছাড়া অন্য character |
| `[a-z]`  | a থেকে z                    |
| `\d`     | digit                       |
| `\D`     | non-digit                   |
| `\w`     | word character              |
| `\W`     | non-word character          |
| `\s`     | whitespace                  |
| `\S`     | non-whitespace              |

## Quantifiers

| Pattern | অর্থ              |
| ------- | ----------------- |
| `*`     | 0 বা তার বেশি     |
| `+`     | 1 বা তার বেশি     |
| `?`     | 0 বা 1            |
| `{3}`   | ঠিক 3             |
| `{3,}`  | কমপক্ষে 3         |
| `{3,5}` | 3 থেকে 5          |
| `*?`    | lazy zero or more |
| `+?`    | lazy one or more  |

## Anchors

| Pattern | অর্থ              |
| ------- | ----------------- |
| `^`     | শুরু              |
| `$`     | শেষ               |
| `\b`    | word boundary     |
| `\B`    | non-word boundary |

## Groups

| Pattern   | অর্থ                         |
| --------- | ---------------------------- |
| `(abc)`   | capturing group              |
| `(?:abc)` | non-capturing group          |
| `a\|b`    | a অথবা b                     |
| `\1`      | প্রথম group-এর backreference |

## Lookaround

| Pattern    | অর্থ                |
| ---------- | ------------------- |
| `(?=abc)`  | positive lookahead  |
| `(?!abc)`  | negative lookahead  |
| `(?<=abc)` | positive lookbehind |
| `(?<!abc)` | negative lookbehind |

## Common validation patterns

### Digits only

```regex
^\d+$
```

### English letters only

```regex
^[A-Za-z]+$
```

### Alphanumeric

```regex
^[A-Za-z0-9]+$
```

### Username

```regex
^[A-Za-z_][A-Za-z0-9_]{2,19}$
```

### Bangladesh mobile

```regex
^(?:\+?88)?01[3-9]\d{8}$
```

### Hex color

```regex
^#(?:[A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$
```

### ISO-like date

```regex
^\d{4}-\d{2}-\d{2}$
```

### Time

```regex
^(?:[01]\d|2[0-3]):[0-5]\d$
```

### Slug

```regex
^[a-z0-9]+(?:-[a-z0-9]+)*$
```

---

# অধ্যায় ৩৫: Regex শেখার Roadmap

## Level 1: Basic

শিখুন:

```text
Literal
.
[]
[^]
\d
\w
\s
```

## Level 2: Repetition

শিখুন:

```text
*
+
?
{n}
{n,m}
```

## Level 3: Structure

শিখুন:

```text
^
$
()
(?:)
|
```

## Level 4: Extraction

শিখুন:

```text
Capturing group
Named group
Backreference
Search and replace
```

## Level 5: Advanced assertion

শিখুন:

```text
Lookahead
Negative lookahead
Lookbehind
Negative lookbehind
```

## Level 6: Production engineering

শিখুন:

```text
Regex flavor differences
Unicode
Performance
Backtracking
ReDoS
Testing
Debugging
Maintainability
```

---

# উপসংহার

Regular Expression শেখার মূল বিষয় শুধু syntax মুখস্থ করা নয়। একটি দক্ষ developer-কে বুঝতে হবে:

1. Pattern কীভাবে character consume করে
2. Quantifier কোন token-এর উপর কাজ করে
3. Grouping কীভাবে scope পরিবর্তন করে
4. Greedy matching কেন বেশি text নেয়
5. Lookaround কীভাবে condition পরীক্ষা করে
6. Regex flavor অনুযায়ী syntax কেন বদলায়
7. Unicode text কেন ASCII text-এর মতো নয়
8. Backtracking কীভাবে performance problem তৈরি করে
9. Validation এবং parsing-এর পার্থক্য কী
10. কোন সমস্যায় Regex-এর পরিবর্তে parser ব্যবহার করা উচিত

Regex লেখার সময় সবসময় তিনটি বিষয় মনে রাখুন:

```text
Correctness
Readability
Performance
```

সবচেয়ে ছোট Regex সবসময় সবচেয়ে ভালো Regex নয়। এমন pattern লিখুন, যেটি অন্য developer সহজে বুঝতে, test করতে এবং পরিবর্তন করতে পারে।
