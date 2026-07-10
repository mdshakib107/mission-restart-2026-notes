# Git ও GitHub: Beginner-Friendly Complete Study Note

> এই note-টি প্রদত্ত tutorial transcript অনুসরণ করে তৈরি। ভিডিও না দেখেও যেন lesson বোঝা, revision করা, interview preparation নেওয়া এবং practical কাজ করা যায়—সে অনুযায়ী concepts, commands, examples, warnings, tips ও assignments সাজানো হয়েছে।

---

## Table of Contents

1. [Git কেন দরকার](#1-git-কেন-দরকার)
2. [Version Control কী](#2-version-control-কী)
3. [Working Directory, Staging Area, Local ও Remote Repository](#3-working-directory-staging-area-local-ও-remote-repository)
4. [Git installation ও initial configuration](#4-git-installation-ও-initial-configuration)
5. [প্রথম Local repository তৈরি](#5-প্রথম-local-repository-তৈরি)
6. [Git-এর file lifecycle](#6-git-এর-file-lifecycle)
7. [Stage ও commit](#7-stage-ও-commit)
8. [History: log, HEAD ও reflog](#8-history-log-head-ও-reflog)
9. [পুরোনো commit-এ যাওয়া ও reset](#9-পুরোনো-commit-এ-যাওয়া-ও-reset)
10. [File remove ও untrack](#10-file-remove-ও-untrack)
11. [Branching](#11-branching)
12. [Merge ও fast-forward](#12-merge-ও-fast-forward)
13. [Merge conflict](#13-merge-conflict)
14. [Stash](#14-stash)
15. [.gitignore](#15-gitignore)
16. [GitHub ও Remote repository](#16-github-ও-remote-repository)
17. [Remote add, push ও pull](#17-remote-add-push-ও-pull)
18. [Pull Request workflow](#18-pull-request-workflow)
19. [Fork ও open-source contribution](#19-fork-ও-open-source-contribution)
20. [Clone](#20-clone)
21. [HTTPS authentication](#21-https-authentication)
22. [SSH authentication](#22-ssh-authentication)
23. [Multiple GitHub account management](#23-multiple-github-account-management)
24. [README best practices](#24-readme-best-practices)
25. [Command cheat sheet](#25-command-cheat-sheet)
26. [Common mistakes ও safety warnings](#26-common-mistakes-ও-safety-warnings)
27. [Interview revision](#27-interview-revision)
28. [Practical assignments](#28-practical-assignments)

---

# 1. Git কেন দরকার

Software project-এ একটি file বারবার পরিবর্তিত হয়। একা কাজ করলে আগের অবস্থায় ফিরে যাওয়া দরকার হতে পারে; team-এ কাজ করলে আরও জানতে হয়:

- কে কোন পরিবর্তন করেছে?
- কখন করেছে?
- কেন করেছে?
- কোন পরিবর্তন production-ready?
- ভুল change হলে আগের অবস্থায় কীভাবে ফেরা যাবে?
- একই source code-এ একাধিক developer কীভাবে স্বাধীনভাবে কাজ করবে?

Git এই সমস্যাগুলো সমাধান করে। এটি একটি **distributed version control system**। Git file-এর প্রতিটি save নিজে থেকে version বানায় না; developer যখন change-কে `commit` করে, তখন Git একটি version snapshot হিসেবে সেটি history-তে সংরক্ষণ করে।

## Git-এর প্রধান সুবিধা

| সুবিধা | ব্যাখ্যা |
|---|---|
| History | project-এর পরিবর্তনের ধারাবাহিক record থাকে |
| Rollback | আগের commit বা অবস্থায় ফেরা যায় |
| Comparison | দুই version-এর পার্থক্য দেখা যায় |
| Collaboration | একাধিক developer একই project-এ কাজ করতে পারে |
| Branching | মূল code ক্ষতিগ্রস্ত না করে নতুন feature তৈরি করা যায় |
| Accountability | author, date, commit message ও change জানা যায় |
| Backup/Sharing | GitHub-এর মতো Remote-এ code রাখা যায় |

---

# 2. Version Control কী

Version Control হলো file ও folder-এর বিভিন্ন version track, compare এবং manage করার পদ্ধতি।

ধরা যাক একটি `README.md` file-এর তিনটি অবস্থা:

1. প্রথমে file তৈরি করা হলো।
2. পরে project description যোগ করা হলো।
3. এরপর installation instruction যোগ করা হলো।

Git ব্যবহার করলে প্রতিটি অর্থপূর্ণ অবস্থাকে আলাদা `commit` হিসেবে রাখা যায়। পরে প্রয়োজন হলে দেখা যায়:

- দ্বিতীয় version-এ কী ছিল;
- দ্বিতীয় ও তৃতীয় version-এর পার্থক্য কী;
- তৃতীয় version ভুল হলে দ্বিতীয় version-এ কীভাবে ফেরা যায়।

> গুরুত্বপূর্ণ: Git মূলত পরিবর্তনের **snapshot/history** manage করে। শুধু file copy করে `final`, `final-2`, `final-last` নাম রাখা version control-এর নির্ভরযোগ্য বিকল্প নয়।

---

# 3. Working Directory, Staging Area, Local ও Remote Repository

Git বুঝতে চারটি area পরিষ্কারভাবে জানা দরকার।

## 3.1 Working Directory

আপনার computer-এ যে project folder-এর files সরাসরি edit করছেন সেটিই **Working Directory** বা **Working Tree**।

উদাহরণ:

```text
my-project/
├── README.md
├── index.html
└── src/
```

## 3.2 Staging Area

`git add` করার পর change যে মধ্যবর্তী area-তে যায় সেটি **Staging Area** বা **Index**। এখানে আপনি পরবর্তী commit-এ কোন changes যাবে তা নির্বাচন করেন।

Staging Area-কে “পরবর্তী commit-এর প্রস্তুত তালিকা” হিসেবে ভাবা যায়।

## 3.3 Local repository

`git init` করলে project-এর ভিতরে hidden `.git` directory তৈরি হয়। এই `.git` directory-তেই Git metadata, commit history, branch reference, configuration ইত্যাদি রাখে। এটিই project-এর **Local repository**-র মূল database।

## 3.4 Remote repository

GitHub-এর মতো server-এ রাখা repository হলো **Remote repository**। Team member-রা Remote থেকে code `clone` বা `pull` করে এবং নিজেদের change `push` করে।

## Flow

```text
Working Directory
      │
      │ git add
      ▼
Staging Area
      │
      │ git commit
      ▼
Local Repository
      │
      │ git push
      ▼
Remote Repository (GitHub)
```

Remote থেকে Local-এ:

```text
Remote Repository
      │
      │ git pull / git fetch
      ▼
Local Repository + Working Directory
```

---

# 4. Git installation ও initial configuration

## 4.1 Installation overview

Transcript-এ Windows installation দেখানো হয়েছে। সাধারণ flow:

1. Git-এর official installer download করুন।
2. আপনার OS অনুযায়ী 64-bit বা 32-bit installer নিন।
3. Default components সাধারণত রাখা যায়।
4. Initial branch name হিসেবে `main` নির্বাচন করা ভালো।
5. Windows line-ending conversion-এর recommended option রাখা যায়।
6. Git Credential Manager ও filesystem caching enable রাখা যায়।
7. Installation শেষে Git Bash চালু করুন।

> Installer-এর option Git version অনুযায়ী বদলাতে পারে। Option না বুঝলে recommended/default selection সাধারণত নিরাপদ।

## 4.2 LF ও CRLF

Text file-এ line break platform অনুযায়ী ভিন্ন হতে পারে:

| Platform | সাধারণ line ending |
|---|---|
| Linux/macOS | `LF` (`\n`) |
| Windows | `CRLF` (`\r\n`) |

Windows installer-এ automatic conversion enable করলে সাধারণত `core.autocrlf=true` সেট হয়। এতে checkout-এর সময় LF → CRLF এবং commit-এর সময় CRLF → LF conversion হতে পারে।

Configuration দেখুন:

```bash
git config --list
```

**কাজ:** Git-এর effective configuration list দেখায়।

**সম্ভাব্য output:**

```text
core.autocrlf=true
init.defaultbranch=main
user.name=Your Name
user.email=you@example.com
```

## 4.3 User identity configure করা

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

### Syntax

```text
git config --global <key> <value>
```

### কাজ

- `user.name`: commit author-এর display name
- `user.email`: commit author-এর email
- `--global`: computer-এর সব repository-র default configuration

Verify:

```bash
git config --global --list
```

একটি নির্দিষ্ট repository-তে আলাদা identity চাইলে সেই repository-র ভিতরে `--global` বাদ দিয়ে দিন:

```bash
git config user.name "Work Name"
git config user.email "work@example.com"
```

> `user.name` GitHub username হওয়া বাধ্যতামূলক নয়। তবে GitHub account-এ verified email ব্যবহার করলে commit account-এর সঙ্গে সঠিকভাবে associate হওয়ার সম্ভাবনা বেশি।

---

# 5. প্রথম Local repository তৈরি

ধরা যাক project folder:

```bash
mkdir git-github-lessons
cd git-github-lessons
```

বর্তমান directory দেখুন:

```bash
pwd
```

**কাজ:** Present Working Directory-এর absolute path দেখায়।

একটি file তৈরি করুন:

```bash
touch README.md
```

Windows Command Prompt-এ `touch` না থাকলে file explorer, editor, PowerShell বা Git Bash ব্যবহার করা যায়।

Git initialize করার আগে:

```bash
git status
```

সম্ভাব্য error:

```text
fatal: not a git repository (or any of the parent directories): .git
```

অর্থ: directory এখনো Git repository নয়।

Initialize করুন:

```bash
git init
```

সম্ভাব্য output:

```text
Initialized empty Git repository in .../.git/
```

এখন hidden file-সহ list দেখুন:

```bash
ls -a
```

Output-এ `.git` পাওয়া যাবে।

> `.git` delete করলে repository-র Git history, branch ও metadata হারিয়ে যাবে, যদিও Working Directory-এর সাধারণ files থাকতে পারে।

---

# 6. Git-এর file lifecycle

একটি file নিচের state-গুলোর মধ্যে থাকতে পারে:

| State | অর্থ |
|---|---|
| Untracked | Git file-টিকে history-র অংশ হিসেবে track করছে না |
| Tracked, unmodified | file track করা হচ্ছে এবং latest commit-এর পর change নেই |
| Modified | tracked file পরিবর্তিত হয়েছে কিন্তু stage করা হয়নি |
| Staged | change পরবর্তী commit-এর জন্য নির্বাচিত |
| Committed | change Local repository history-তে সংরক্ষিত |
| Ignored | `.gitignore` rule-এর কারণে Git সাধারণত file-টি track করবে না |

State জানার সবচেয়ে দরকারি command:

```bash
git status
```

Compact output চাইলে:

```bash
git status --short
```

সম্ভাব্য short codes:

```text
?? new-file.md     # untracked
 M README.md       # modified, unstaged
M  README.md       # staged modification
A  help.md         # staged new file
D  old.md          # staged deletion
```

---

# 7. Stage ও commit

## 7.1 নির্দিষ্ট file stage করা

```bash
git add README.md
```

**কাজ:** `README.md`-এর বর্তমান change Staging Area-তে যোগ করে।

একাধিক file:

```bash
git add README.md help.md
```

## 7.2 Current directory-এর changes stage করা

```bash
git add .
```

**কাজ:** current directory ও তার subdirectory-র relevant changes stage করে।

## 7.3 Repository-wide সব changes stage করা

```bash
git add --all
```

Short form:

```bash
git add -A
```

এটি additions, modifications ও deletions stage করে।

> `git add .` কোন directory থেকে চালানো হচ্ছে তা গুরুত্বপূর্ণ। Repository root থেকে চালালে সাধারণত পুরো project-এর changes stage হয়। Beginner হিসেবে `git status` দেখে তারপর `git add` ব্যবহার করুন।

## 7.4 Commit করা

```bash
git commit -m "Add initial README file"
```

### Syntax

```text
git commit -m "<meaningful message>"
```

### কাজ

Staging Area-র snapshot Local repository history-তে সংরক্ষণ করে।

সম্ভাব্য output:

```text
[main (root-commit) a1b2c3d] Add initial README file
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 README.md
```

## 7.5 ভালো commit message

খারাপ:

```text
fix
update
changes
final
```

ভালো:

```text
Add installation instructions to README
Fix validation for empty email input
Remove unused help documentation
```

### Recommended principle

Commit message দেখে যেন বোঝা যায় change-টি **কী করেছে** এবং প্রয়োজনে **কেন করেছে**। সাধারণত imperative style ব্যবহার করা হয়:

```text
Add ...
Fix ...
Remove ...
Update ...
Refactor ...
```

## 7.6 Atomic commit

একটি commit ideally একটি logical কাজ করবে।

খারাপ grouping:

- README পরিবর্তন
- unrelated bug fix
- নতুন image
- dependency update

সব এক commit-এ।

ভালো grouping:

```text
Commit 1: Update README introduction
Commit 2: Add help document
Commit 3: Fix login validation
```

এতে নির্দিষ্ট change revert বা review করা সহজ হয়। Transcript-এর উদাহরণে README modification ও নতুন help file এক commit-এ থাকায় একটি change ফিরাতে গিয়ে দুটিই প্রভাবিত হয়েছিল।

---

# 8. History: log, HEAD ও reflog

## 8.1 Full commit history

```bash
git log
```

সাধারণত দেখায়:

- full commit hash
- author
- date
- commit message

## 8.2 One-line history

```bash
git log --oneline
```

সম্ভাব্য output:

```text
7f8e9a1 (HEAD -> main) Add help file
3a2b1c0 Add initial README file
```

> Transcript-এ speech recognition-এর কারণে “git log one line” শোনা গেলেও সঠিক command হলো `git log --oneline`।  
> **এখানে transcript থেকে অনুমান করে ব্যাখ্যা করা হয়েছে।**

## 8.3 HEAD কী

`HEAD` বর্তমানে checked-out branch/commit-এর reference। সাধারণত:

```text
HEAD -> main -> latest commit
```

অর্থ: আপনি `main` branch-এ আছেন এবং `HEAD` `main`-এর latest commit নির্দেশ করছে।

## 8.4 Reflog

```bash
git reflog
```

`git log` reachable commit history দেখায়; `git reflog` Local repository-তে `HEAD` ও references কোথায় কোথায় move করেছে তার log দেখায়। Reset-এর পর `git log`-এ হারিয়ে যাওয়া commit hash অনেক সময় reflog থেকে উদ্ধার করা যায়।

সম্ভাব্য output:

```text
7f8e9a1 HEAD@{0}: reset: moving to 7f8e9a1
3a2b1c0 HEAD@{1}: reset: moving to 3a2b1c0
7f8e9a1 HEAD@{2}: commit: Add help file
```

---

# 9. পুরোনো commit-এ যাওয়া ও reset

Transcript-এ ব্যবহৃত command:

```bash
git reset --hard <commit-hash>
```

উদাহরণ:

```bash
git reset --hard 3a2b1c0
```

**কাজ:** current branch pointer, Staging Area এবং Working Directory—সব target commit-এর অবস্থায় নিয়ে যায়।

সম্ভাব্য output:

```text
HEAD is now at 3a2b1c0 Add initial README file
```

## অত্যন্ত গুরুত্বপূর্ণ warning

`git reset --hard` uncommitted changes permanently মুছে দিতে পারে। Command চালানোর আগে:

```bash
git status
git stash
```

অথবা প্রয়োজনীয় কাজ commit করুন।

Reset-এর আগে থাকা commit ফিরে পেতে:

```bash
git reflog
git reset --hard <old-commit-hash>
```

## Safer alternatives

Published/shared history undo করতে অনেক সময় `git revert` বেশি নিরাপদ:

```bash
git revert <commit-hash>
```

এটি পুরোনো history rewrite না করে inverse change-সহ নতুন commit তৈরি করে।

> `reset` ও `revert` এক নয়। Interview-এ পার্থক্যটি প্রায়ই জিজ্ঞেস করা হয়।

---

# 10. File remove ও untrack

## 10.1 Working Directory ও Git—দুই জায়গা থেকেই remove

```bash
git rm help.md
```

এটি file delete করে এবং deletion stage করে। তারপর:

```bash
git commit -m "Remove obsolete help file"
```

## 10.2 Git tracking থেকে remove, local file রেখে দেওয়া

```bash
git rm --cached abcd.md
```

**কাজ:** file Working Directory-তে থাকবে, কিন্তু Git index থেকে remove হবে। সাধারণত ইতিমধ্যে tracked secret/config/generated file ignore করতে ব্যবহৃত হয়।

তারপর `.gitignore`-এ entry যোগ করুন:

```gitignore
abcd.md
```

এবং commit করুন:

```bash
git add .gitignore
git commit -m "Stop tracking local abcd file"
```

Directory-এর ক্ষেত্রে:

```bash
git rm -r --cached node_modules
```

---

# 11. Branching

Branch হলো commit-এর একটি movable reference। নতুন feature, bug fix বা experiment আলাদা branch-এ করলে `main` স্থিতিশীল রাখা যায়।

## 11.1 Branch list

```bash
git branch --list
```

Short form:

```bash
git branch
```

বর্তমান branch-এর আগে `*` থাকে:

```text
* main
  feature/add-heading-text
```

## 11.2 নতুন branch তৈরি

```bash
git branch feature/add-heading-text
```

এটি branch তৈরি করে, কিন্তু switch করে না। Branch বর্তমান `HEAD` commit থেকে তৈরি হয়।

## 11.3 Branch switch

```bash
git switch feature/add-heading-text
```

পুরোনো command:

```bash
git checkout feature/add-heading-text
```

## 11.4 Create + switch একসঙ্গে

```bash
git switch -c feature/add-heading-text
```

পুরোনো equivalent:

```bash
git checkout -b feature/add-heading-text
```

## 11.5 Naming convention

Common examples:

```text
feature/add-login-page
bugfix/fix-empty-email
hotfix/payment-timeout
chore/update-dependencies
docs/improve-readme
```

Organization-এর convention অনুসরণ করা সবচেয়ে ভালো।

## 11.6 Branch rename

বর্তমান branch rename:

```bash
git branch -m feature/add-heading-text
```

অন্য branch rename:

```bash
git branch -m old-name new-name
```

## 11.7 Branch delete

Safe delete:

```bash
git branch -d feature/add-heading-text
```

`-d` unmerged branch delete করতে বাধা দেয়।

Force delete:

```bash
git branch -D feature/add-heading-text
```

> `-D` warning bypass করে। Unmerged work হারানোর ঝুঁকি আছে; নিশ্চিত না হলে ব্যবহার করবেন না।

---

# 12. Merge ও fast-forward

ধরা যাক feature branch-এর কাজ `main`-এ আনতে হবে।

প্রথমে target branch-এ যান:

```bash
git switch main
```

তারপর source branch merge করুন:

```bash
git merge feature/add-heading-text
```

মনে রাখার নিয়ম:

> **যে branch-এর মধ্যে change আনতে চান, আগে সেই branch-এ switch করুন। তারপর যেখান থেকে আনবেন সেটির নাম দিয়ে `git merge` চালান।**

## Fast-forward merge

`main` থেকে feature branch তৈরি হওয়ার পর `main`-এ নতুন commit না হলে Git `main` pointer-কে feature branch-এর latest commit পর্যন্ত এগিয়ে দেয়। এটিই fast-forward merge।

```text
Before:
A---B  main
     \
      C---D  feature

After fast-forward:
A---B---C---D  main, feature
```

এক্ষেত্রে আলাদা merge commit প্রয়োজন নাও হতে পারে।

---

# 13. Merge conflict

## কখন conflict হয়

Git সাধারণত আলাদা file বা আলাদা line-এর changes নিজে merge করতে পারে। একই file-এর একই অংশ দুই branch-এ ভিন্নভাবে edit হলে conflict হতে পারে।

উদাহরণ:

Branch A:

```text
README file created for demos.
```

Branch B:

```text
README file created for practice.
```

Merge করলে:

```bash
git merge feature/add-heading-text
```

সম্ভাব্য output:

```text
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```

## Conflict marker

```text
<<<<<<< HEAD
README file created for practice.
=======
README file created for demos.
>>>>>>> feature/add-heading-text
```

- `<<<<<<< HEAD` থেকে `=======` পর্যন্ত: current branch-এর content
- `=======` থেকে `>>>>>>> branch-name` পর্যন্ত: incoming branch-এর content

## Resolution steps

1. Conflicted file খুলুন।
2. কোন version রাখবেন বা কীভাবে combine করবেন ঠিক করুন।
3. Conflict markers সম্পূর্ণ remove করুন।
4. File save করুন।
5. Status দেখুন:

```bash
git status
```

6. Resolved file stage করুন:

```bash
git add README.md
```

7. Merge commit complete করুন:

```bash
git commit
```

অথবা message দিন:

```bash
git commit -m "Resolve README merge conflict"
```

## Merge abort

Conflict resolution শুরু না করে merge বাতিল করতে:

```bash
git merge --abort
```

---

# 14. Stash

`stash` unfinished, uncommitted tracked changes সাময়িকভাবে সরিয়ে clean Working Directory দেয়। জরুরি branch switch-এর সময় useful।

## 14.1 Stash তৈরি

```bash
git stash
```

Meaningful message:

```bash
git stash push -m "WIP: update README introduction"
```

## 14.2 Stash list

```bash
git stash list
```

Output:

```text
stash@{0}: On main: WIP: update README introduction
stash@{1}: On feature/login: form validation work
```

## 14.3 Stash content দেখা

Summary:

```bash
git stash show stash@{0}
```

Patch/diff:

```bash
git stash show -p stash@{0}
```

> Transcript-এ command-টি অস্পষ্টভাবে উচ্চারিত হয়েছে; সঠিক syntax হলো `git stash show -p`।  
> **এখানে transcript থেকে অনুমান করে ব্যাখ্যা করা হয়েছে।**

## 14.4 Latest stash apply ও remove

```bash
git stash pop
```

`pop` latest stash apply করে এবং সফল হলে stash list থেকে remove করে।

## 14.5 নির্দিষ্ট stash apply

```bash
git stash apply stash@{1}
```

`apply` stash রেখে দেয়। পরে remove করতে:

```bash
git stash drop stash@{1}
```

## Untracked file-সহ stash

Default `git stash` সাধারণত untracked file নেয় না। প্রয়োজন হলে:

```bash
git stash -u
```

---

# 15. .gitignore

`.gitignore`-এ এমন files/folders-এর pattern লেখা হয় যা Git সাধারণত track করবে না।

Common example:

```gitignore
# Dependencies
node_modules/

# Environment secrets
.env
.env.local

# Build output
dist/
build/

# Logs
*.log

# OS/editor
.DS_Store
.vscode/
```

Create:

```bash
touch .gitignore
```

তারপর `.gitignore` নিজে commit করতে হবে:

```bash
git add .gitignore
git commit -m "Add Git ignore rules"
```

## Already tracked file-এর ক্ষেত্রে

শুধু `.gitignore`-এ নাম যোগ করলে previously committed file ignore হবে না। প্রথমে index থেকে remove করুন:

```bash
git rm --cached abcd.md
```

তারপর commit করুন।

## কেন `node_modules/` commit করা হয় না

- size অনেক বড়;
- generated dependencies;
- `package.json` ও lock file থেকে পুনরায় install করা যায়;
- platform-specific files থাকতে পারে;
- repository অপ্রয়োজনীয়ভাবে ভারী হয়।

---

# 16. GitHub ও Remote repository

Git এবং GitHub এক জিনিস নয়।

| Git | GitHub |
|---|---|
| Version control software | Git repository hosting platform |
| Local computer-এ কাজ করতে পারে | Internet/cloud-based collaboration |
| commit, branch, merge manage করে | Remote storage, Pull Request, review, issue, access control দেয় |
| GitHub ছাড়াও ব্যবহারযোগ্য | Git repository ব্যবহার করে |

GitHub ছাড়াও GitLab, Bitbucket ইত্যাদি Remote hosting service রয়েছে।

## GitHub repository তৈরি

সাধারণ steps:

1. GitHub account তৈরি করুন।
2. **New repository** নির্বাচন করুন।
3. Meaningful repository name দিন।
4. Description লিখুন।
5. Public বা Private visibility নির্বাচন করুন।
6. Repository create করুন।

### Public বনাম Private

| Public | Private |
|---|---|
| যে কেউ দেখতে পারে | অনুমোদিত user ছাড়া দেখা যায় না |
| portfolio/open-source-এর জন্য উপযোগী | private work, assignment বা company code-এর জন্য উপযোগী |

---

# 17. Remote add, push ও pull

## 17.1 Local repository-কে GitHub Remote-এর সঙ্গে যুক্ত করা

```bash
git remote add origin git@github.com:username/repository.git
```

HTTPS version:

```bash
git remote add origin https://github.com/username/repository.git
```

### Syntax

```text
git remote add <remote-name> <remote-url>
```

`origin` একটি convention; বাধ্যতামূলক নাম নয়। এটি সাধারণত primary Remote-এর alias।

Remote verify:

```bash
git remote -v
```

Output:

```text
origin  git@github.com:username/repository.git (fetch)
origin  git@github.com:username/repository.git (push)
```

## 17.2 প্রথম push

```bash
git push -u origin main
```

### ব্যাখ্যা

- `git push`: Local commits Remote-এ পাঠায়
- `origin`: Remote alias
- `main`: branch name
- `-u` / `--set-upstream`: Local `main`-কে `origin/main`-এর tracking branch হিসেবে সেট করে

পরেরবার শুধু:

```bash
git push
```

## 17.3 Feature branch push

```bash
git push -u origin feature/fix-text
```

Remote-এ branch তৈরি হবে এবং Pull Request খোলা যাবে।

## 17.4 Pull

```bash
git pull
```

সাধারণভাবে `git pull` = `git fetch` + merge/rebase (configuration অনুযায়ী)। Current branch-এর configured upstream থেকে Remote changes এনে Local-এ integrate করে।

Explicit:

```bash
git pull origin main
```

> Push-এর আগে team repository-তে latest changes pull করা conflict কমাতে সাহায্য করে। তবে uncommitted changes থাকলে আগে commit বা stash করুন।

## 17.5 Fetch বনাম Pull

| Command | কাজ |
|---|---|
| `git fetch` | Remote updates download করে; Working Directory বদলায় না |
| `git pull` | updates download করে এবং current branch-এ integrate করে |

---

# 18. Pull Request workflow

Pull Request বা PR হলো একটি branch-এর changes অন্য branch-এ merge করার formal proposal। এটি GitHub feature; raw Git command নয়।

## Typical workflow

1. `main` থেকে feature branch তৈরি।
2. Change, stage ও commit।
3. Feature branch Remote-এ push।
4. GitHub-এ **Compare & pull request** নির্বাচন।
5. Base branch ও compare branch যাচাই।
6. Meaningful title ও description লিখুন।
7. Reviewer assign করুন।
8. Reviewer files changed দেখবেন।
9. Reviewer approve, comment বা request changes করতে পারেন।
10. প্রয়োজনীয় update একই branch-এ push করলে PR স্বয়ংক্রিয়ভাবে update হয়।
11. Approval শেষে merge।
12. Feature branch প্রয়োজনে delete।

## Base এবং Compare

```text
base: main
compare: feature/fix-text
```

অর্থ: `feature/fix-text`-এর changes `main`-এ নিতে চাই।

## ভালো PR description

```markdown
## What changed
- Updated README introduction
- Added usage example

## Why
New users could not understand how to run the project.

## Testing
- Opened README preview
- Verified all links
```

---

# 19. Fork ও open-source contribution

Fork হলো অন্য account-এর repository-র server-side copy নিজের GitHub account-এ তৈরি করা। Original repository-তে write permission না থাকলে এটি খুব useful।

## Terminology

- **Upstream repository:** original repository
- **Forked repository:** আপনার account-এ তৈরি copy
- **Origin:** Local clone-এর Remote alias; সাধারণত আপনার fork
- **Pull Request:** fork-এর branch থেকে upstream repository-তে change প্রস্তাব

## Fork workflow

1. Original repository খুলুন।
2. **Fork** click করুন।
3. নিজের account-এ fork তৈরি করুন।
4. Fork clone করুন।
5. নতুন branch তৈরি করুন।
6. Change, commit ও push করুন।
7. Fork থেকে upstream-এ Pull Request খুলুন।
8. Maintainer review ও merge করবেন।

Recommended Local setup:

```bash
git clone git@github.com:your-username/project.git
cd project
git remote add upstream git@github.com:original-owner/project.git
git remote -v
```

Upstream sync:

```bash
git fetch upstream
git switch main
git merge upstream/main
git push origin main
```

> Transcript-এ fork-এর browser-based demonstration ছিল; এখানে practical Local workflow যোগ করা হয়েছে।  
> **এখানে transcript থেকে অনুমান করে ব্যাখ্যা করা হয়েছে।**

---

# 20. Clone

Existing Remote repository-এর complete working copy ও Git history Local-এ আনতে:

```bash
git clone <repository-url>
```

HTTPS:

```bash
git clone https://github.com/username/project.git
```

SSH:

```bash
git clone git@github.com:username/project.git
```

Custom folder name:

```bash
git clone https://github.com/username/project.git my-folder
```

Clone সাধারণত:

- নতুন project directory তৈরি করে;
- `.git` history download করে;
- `origin` Remote configure করে;
- default branch checkout করে।

Verify:

```bash
cd project
git remote -v
git status
```

---

# 21. HTTPS authentication

HTTPS Remote URL সহজ এবং firewall-friendly। Modern GitHub authentication-এ account password-এর বদলে browser authorization, Git Credential Manager বা Personal Access Token ব্যবহার করা হয়।

## Transcript-এর authentication options

- Sign in with browser
- Sign in with a code
- Personal Access Token (PAT)

## PAT-এর security rules

- Minimum required permissions দিন—**least privilege**।
- Expiration দিন।
- Token কখনো source code, screenshot বা public note-এ প্রকাশ করবেন না।
- Token leak হলে সঙ্গে সঙ্গে revoke করুন।
- `.env` বা credential file commit করবেন না।

> Transcript-এ “admin ছাড়া প্রায় সব permission” দেওয়ার ইঙ্গিত ছিল। বাস্তবে প্রয়োজনের অতিরিক্ত permission দেওয়া নিরাপদ নয়। শুধু কাজের জন্য দরকারি scope নির্বাচন করুন।

Remote URL HTTPS-এ বদলাতে:

```bash
git remote set-url origin https://github.com/username/project.git
```

---

# 22. SSH authentication

SSH-তে Local machine-এ private key থাকে এবং GitHub account-এ public key যোগ করা হয়। এতে password/PAT বারবার দিতে হয় না; passphrase থাকলে সেটি চাইতে পারে।

## 22.1 Key pair তৈরি

Transcript-এ RSA key দেখানো হয়েছে। Command-এর corrected form:

```bash
ssh-keygen -o -t rsa -C "you@example.com"
```

আরও common modern option:

```bash
ssh-keygen -t ed25519 -C "you@example.com"
```

> RSA command-এর transcript অংশ speech-to-text-এ বিকৃত ছিল।  
> **এখানে transcript থেকে অনুমান করে ব্যাখ্যা করা হয়েছে।**

### Options

- `-t`: key type
- `-C`: comment, সাধারণত email
- `-o`: modern private-key format (supported environments-এ)

Default path উদাহরণ:

```text
~/.ssh/id_ed25519
~/.ssh/id_ed25519.pub
```

অথবা RSA:

```text
~/.ssh/id_rsa
~/.ssh/id_rsa.pub
```

- `.pub` file: public key; GitHub-এ দেওয়া যায়
- extension ছাড়া file: private key; কখনো share করা যাবে না

## 22.2 Public key GitHub-এ যোগ করা

Public key দেখুন:

```bash
cat ~/.ssh/id_ed25519.pub
```

তারপর GitHub:

```text
Settings → SSH and GPG keys → New SSH key
```

একটি descriptive title দিন এবং public key paste করুন।

## 22.3 Connection test

```bash
ssh -T git@github.com
```

প্রথমবার host authenticity confirmation চাইতে পারে। Successful হলে GitHub authentication success message দেয়।

## 22.4 SSH clone ও push

```bash
git clone git@github.com:username/project.git
cd project
# change files
git add .
git commit -m "Add help documentation"
git push
```

## SSH security

- Private key কাউকে দেবেন না।
- Passphrase ব্যবহার করা ভালো।
- Shared computer-এ unprotected key ব্যবহার করবেন না।
- Compromised key GitHub থেকে remove করুন।

---

# 23. Multiple GitHub account management

Transcript-এ personal ও work account-এর জন্য আলাদা SSH key এবং Git config ব্যবহার দেখানো হয়েছে। এই ক্ষেত্রে সবচেয়ে পরিষ্কার পদ্ধতি হলো per-repository identity + `~/.ssh/config` host alias।

## 23.1 আলাদা key তৈরি

```bash
ssh-keygen -t ed25519 -C "personal@example.com" -f ~/.ssh/id_ed25519_personal
ssh-keygen -t ed25519 -C "work@example.com" -f ~/.ssh/id_ed25519_work
```

দুটি public key সংশ্লিষ্ট GitHub account-এ add করুন।

## 23.2 SSH config

`~/.ssh/config`:

```sshconfig
Host github-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_personal
    IdentitiesOnly yes

Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_work
    IdentitiesOnly yes
```

## 23.3 Clone using alias

Personal:

```bash
git clone git@github-personal:personal-user/project.git
```

Work:

```bash
git clone git@github-work:work-user/project.git
```

## 23.4 Per-repository commit identity

Personal repository:

```bash
git config user.name "Personal Name"
git config user.email "personal@example.com"
```

Work repository:

```bash
git config user.name "Work Name"
git config user.email "work@example.com"
```

Verify:

```bash
git config --local --list
git remote -v
```

## Transcript-এর `core.sshCommand` approach

একটি repository-তে নির্দিষ্ট key force করা যায়:

```bash
git config core.sshCommand "ssh -i ~/.ssh/id_ed25519_work -o IdentitiesOnly=yes"
```

এটি repository-local হলে useful। তবে বহু account/host-এর জন্য `~/.ssh/config` সাধারণত বেশি maintainable।

Permission error উদাহরণ:

```text
Permission to owner/repository.git denied to other-user.
```

এর অর্থ হতে পারে:

- ভুল GitHub account/key দিয়ে authenticate হয়েছে;
- account-এর repository write permission নেই;
- Remote URL ভুল account/host alias ব্যবহার করছে।

---

# 24. README best practices

Repository-তে source code থাকাই যথেষ্ট নয়; অন্য user যেন project বুঝতে ও চালাতে পারে, তাই ভালো `README.md` জরুরি।

Recommended sections:

````markdown
# Project Name

Short description.

## Features
- Feature 1
- Feature 2

## Tech Stack
- React
- Node.js

## Installation
```bash
npm install
```

## Run
```bash
npm run dev
```

## Environment Variables
Explain required variables without exposing secret values.

## Screenshots / Demo
Add links or images.

## Usage
Explain key workflows.

## Author
Name and profile link.

## License
License information.
````

Assignment submission-এর README-তে অন্তত রাখুন:

- assignment/project name;
- objective;
- live link, থাকলে;
- setup steps;
- used technologies;
- important features;
- known limitations;
- submission instructions অনুযায়ী প্রয়োজনীয় তথ্য।

---

# 25. Command cheat sheet

| Command | কাজ |
|---|---|
| `git --version` | installed Git version |
| `git config --list` | configuration list |
| `git init` | Local repository initialize |
| `git status` | Working Tree ও Staging Area status |
| `git add <file>` | নির্দিষ্ট change stage |
| `git add .` | current directory-এর changes stage |
| `git add -A` | repository-wide সব changes stage |
| `git commit -m "..."` | staged snapshot commit |
| `git log` | detailed commit history |
| `git log --oneline` | compact history |
| `git reflog` | local reference movement history |
| `git reset --hard <hash>` | branch/index/worktree target commit-এ reset |
| `git rm <file>` | file delete + deletion stage |
| `git rm --cached <file>` | tracking থেকে remove, local file রাখে |
| `git branch` | branch list |
| `git branch <name>` | branch create |
| `git switch <name>` | branch switch |
| `git switch -c <name>` | create + switch |
| `git branch -m <name>` | current branch rename |
| `git branch -d <name>` | safely branch delete |
| `git merge <branch>` | source branch current branch-এ merge |
| `git merge --abort` | ongoing conflicted merge বাতিল |
| `git stash` | unfinished change stash |
| `git stash list` | stash list |
| `git stash show -p` | stash diff |
| `git stash pop` | latest stash apply + remove |
| `git remote add origin <url>` | Remote connect |
| `git remote -v` | Remote URL verify |
| `git push -u origin main` | first push + upstream set |
| `git push` | commits Remote-এ পাঠায় |
| `git pull` | Remote changes fetch + integrate |
| `git fetch` | Remote updates download only |
| `git clone <url>` | Remote repository Local-এ copy |

---

# 26. Common mistakes ও safety warnings

## 26.1 `git add` মানেই commit নয়

`git add` শুধু Staging Area-তে নেয়। History তৈরি হয় `git commit` করলে।

## 26.2 Meaningless commit message

History পড়া ও debugging কঠিন হয়। Logical, descriptive message দিন।

## 26.3 এক commit-এ unrelated changes

Partial revert, review ও cherry-pick কঠিন হয়। Atomic commit করুন।

## 26.4 `git reset --hard` অসতর্কভাবে ব্যবহার

Uncommitted work হারাতে পারে। আগে `git status`, commit বা stash।

## 26.5 `git branch -D` ব্যবহার

Unmerged branch force-delete করে। Safe `-d` default রাখুন।

## 26.6 `.gitignore`-এ secret যোগ করলেই পুরোনো secret history থেকে যায় না

Already committed secret repository history-তে থাকতে পারে। শুধু untrack করাই যথেষ্ট নয়—credential rotate করতে হবে এবং প্রয়োজনে history clean করতে হবে।

## 26.7 Private SSH key share করা

শুধু `.pub` public key share/add করা যায়। Private key secret।

## 26.8 Wrong account দিয়ে push

`git remote -v`, Local identity ও SSH host alias verify করুন।

## 26.9 Pull না করে push

Remote-এ নতুন commits থাকলে push reject হতে পারে। Team workflow অনুযায়ী আগে fetch/pull এবং conflict resolve করুন।

## 26.10 Root directory ভুলে `git add .`

অপ্রয়োজনীয় files stage হতে পারে। সবসময়:

```bash
git status
```

দেখে commit করুন।

---

# 27. Interview revision

## Q1. Git ও GitHub-এর পার্থক্য কী?

Git হলো distributed version control system; GitHub হলো Git repository hosting ও collaboration platform।

## Q2. Working Directory, Staging Area ও Repository কী?

Working Directory-তে edit করা হয়; Staging Area-তে পরবর্তী commit-এর selected changes থাকে; Repository-তে committed history থাকে।

## Q3. `git add` কী করে?

Working Directory-এর নির্দিষ্ট change Staging Area-তে নেয়।

## Q4. `git commit` কী করে?

Staged changes-এর snapshot Local repository history-তে সংরক্ষণ করে।

## Q5. `git fetch` ও `git pull` পার্থক্য?

`fetch` Remote updates download করে কিন্তু current branch integrate করে না; `pull` download করে এবং integrate করে।

## Q6. Merge conflict কেন হয়?

দুই branch একই content region incompatibleভাবে পরিবর্তন করলে Git কোন change রাখবে তা নিজে নির্ধারণ করতে পারে না।

## Q7. `git reset` ও `git revert` পার্থক্য?

`reset` branch pointer/history অবস্থান বদলাতে পারে; `revert` পুরোনো commit undo করতে নতুন commit তৈরি করে। Shared history-তে revert বেশি নিরাপদ।

## Q8. `git stash pop` ও `git stash apply` পার্থক্য?

দুটিই stash apply করে; `pop` successful হলে stash remove করে, `apply` stash রেখে দেয়।

## Q9. Fork ও Clone পার্থক্য?

Fork GitHub server-এ নিজের account-এ repository copy; Clone repository Local machine-এ copy।

## Q10. Pull Request কী?

এক branch/fork-এর changes অন্য branch/repository-তে review ও merge করার proposal।

## Q11. `origin` কী?

Remote repository-এর conventional alias। এটি GitHub-এর বিশেষ keyword নয়; অন্য নামও দেওয়া যায়।

## Q12. HEAD কী?

বর্তমানে checked-out branch বা commit-এর reference।

## Q13. `.gitignore` কেন tracked file ignore করে না?

কারণ `.gitignore` মূলত untracked files-এর tracking শুরু হওয়া বন্ধ করে। Already indexed file আগে `git rm --cached` দিয়ে untrack করতে হয়।

## Q14. SSH public ও private key-এর ভূমিকা কী?

Private key Local-এ secret থাকে; public key GitHub-এ থাকে। Pair-এর cryptographic verification দিয়ে authentication হয়।

---

# 28. Practical assignments

## Assignment 1: Basic Local workflow

1. `git-practice` নামে folder তৈরি করুন।
2. `git init` করুন।
3. `README.md` তৈরি করে project description লিখুন।
4. `git status` দিয়ে untracked state দেখুন।
5. File stage ও commit করুন।
6. `git log --oneline` screenshot বা output সংরক্ষণ করুন।

Expected commands:

```bash
mkdir git-practice
cd git-practice
git init
touch README.md
git status
git add README.md
git commit -m "Add initial README"
git log --oneline
```

## Assignment 2: Atomic commits

1. `README.md`-তে installation section যোগ করুন।
2. `help.md` নামে নতুন file তৈরি করুন।
3. দুটি change দুইটি আলাদা commit-এ রাখুন।
4. History inspect করুন।

Goal: unrelated changes আলাদা commit করা।

## Assignment 3: Branch ও merge

1. `feature/add-usage` branch তৈরি করুন।
2. README-তে Usage section যোগ করুন।
3. Commit করুন।
4. `main`-এ switch করুন।
5. Feature branch merge করুন।
6. Safe delete করুন।

```bash
git switch -c feature/add-usage
# edit README.md
git add README.md
git commit -m "Add usage instructions"
git switch main
git merge feature/add-usage
git branch -d feature/add-usage
```

## Assignment 4: Merge conflict simulation

1. `main` থেকে `feature/text-a` তৈরি করুন এবং README-এর একই line পরিবর্তন করে commit করুন।
2. `main`-এ ফিরে `feature/text-b` তৈরি করুন; একই line অন্যভাবে পরিবর্তন করে commit করুন।
3. একটি branch-এ অন্যটি merge করুন।
4. Conflict marker পড়ুন এবং manually resolve করুন।
5. Resolution commit করুন।

Deliverable: conflict-এর কারণ ও resolution তিন থেকে পাঁচটি বাক্যে লিখুন।

## Assignment 5: Stash

1. একটি tracked file modify করুন কিন্তু commit করবেন না।
2. `git stash push -m "WIP practice"` চালান।
3. অন্য branch-এ switch করুন।
4. আগের branch-এ ফিরে `git stash pop` করুন।
5. Change commit করুন।

## Assignment 6: `.gitignore`

1. `node_modules/`, `.env` ও `*.log` ignore করুন।
2. Verify করুন `git status`-এ এগুলো আসছে না।
3. একটি already tracked `local-config.txt` তৈরি ও commit করুন।
4. পরে `git rm --cached local-config.txt` দিয়ে untrack করে `.gitignore`-এ যোগ করুন।

## Assignment 7: GitHub push/pull

1. GitHub-এ একটি repository তৈরি করুন।
2. Local repository-তে `origin` add করুন।
3. `main` push করুন।
4. GitHub web interface থেকে README-তে একটি ছোট edit commit করুন।
5. Local-এ `git pull` করুন এবং change verify করুন।

## Assignment 8: Pull Request

1. Local-এ feature branch তৈরি করুন।
2. Change commit ও Remote-এ push করুন।
3. GitHub-এ PR তৈরি করুন।
4. Meaningful title, description ও testing note দিন।
5. Review simulation শেষে merge করুন।
6. Local `main`-এ pull করুন।

## Assignment 9: Fork contribution

1. একটি practice repository fork করুন।
2. নিজের fork clone করুন।
3. `upstream` Remote add করুন।
4. নতুন branch-এ documentation improvement করুন।
5. Fork-এ push করে upstream repository-তে PR তৈরি করুন।

## Assignment 10: SSH ও multiple accounts

1. একটি SSH key pair তৈরি করুন।
2. Public key GitHub-এ add করুন।
3. `ssh -T git@github.com` test করুন।
4. SSH URL দিয়ে repository clone করুন।
5. Optional: personal/work account-এর জন্য আলাদা key ও `~/.ssh/config` alias তৈরি করুন।

---

# Final mental model

Git workflow মনে রাখার সবচেয়ে সহজ formula:

```text
Edit → Status → Add → Commit → Push
```

Team workflow:

```text
Pull/Fetch → Branch → Edit → Add → Commit → Push → Pull Request → Review → Merge
```

Recovery mindset:

```text
ভুল হলে panic নয়:
status → log/reflog → প্রয়োজন অনুযায়ী restore/revert/reset
```

সবচেয়ে গুরুত্বপূর্ণ অভ্যাস:

1. ঘন ঘন `git status` দেখুন।
2. ছোট, logical commit করুন।
3. Meaningful commit message লিখুন।
4. Feature branch-এ কাজ করুন।
5. Secret কখনো commit করবেন না।
6. Dangerous command-এর আগে status, backup, commit বা stash করুন।
7. ভালো README লিখুন।

---

## Transcript-based note

Transcript-এ প্রদর্শিত মূল বিষয়গুলো—Git installation, configuration, init, status, add, commit, log, reflog, reset, rm, branch, switch, merge, conflict resolution, stash, `.gitignore`, GitHub Remote, push, pull, Pull Request, fork, clone, HTTPS, SSH এবং multiple account handling—এই note-এ অন্তর্ভুক্ত করা হয়েছে। Speech-to-text-এ বিকৃত command ও filename (`README.md`, `git log --oneline`, `git stash show -p`, `git rm --cached`, `ssh-keygen` ইত্যাদি) practical ব্যবহারের উপযোগী সঠিক syntax-এ লেখা হয়েছে।
