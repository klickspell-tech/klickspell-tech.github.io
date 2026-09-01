---
title: "React JS Interview(Part-2)"
description: "So this is the second blog post where I'm sharing some more important questions that you may stumble..."
pubDate: 2021-12-23T10:45:32.000Z
author: "Atul Bhatt"
tags: ["javascript","react","interview","webdev"]
devtoUrl: "https://dev.to/atulbhattsystem32/react-js-interviewpart-2-41bm"
canonicalUrl: "https://klickspell.com/blog/react-js-interviewpart-2-41bm"
coverImage: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Ffmww7zspaf49cgkuaxu2.png"
readingTime: "2 min read"
---

So this is the `second blog post` where I'm sharing some more important questions that you may stumble upon while giving a `React JS or just a JS interview.` Even if you don't encounter any of these questions in your interview it will be good to check them out just for finding out how many of them you know well. Let's start.

- `What is a pure function?`
- `What is a HOC?`
- `Give some examples of HOC you have used.`
- `What is render props?`
- `Custom Hooks?`
- `Difference between Custom Hooks and Functions and Component?`
- `Explain the working of Virtual DOM in detail.`
- `What is reconciliation in react?`
- `What are controlled and Uncontrolled components?`
- `Which one is better-controlled or uncontrolled components?`
- `What is Memoization and how it can be achieved in React?`
- `Do you know what is a toolchain?`
- `What is code splitting in React and how we can achieve it?`
- `What is hoisting in JavaScript?`
- `What is the difference between Array.forEach() and Array.map()?`
- `Explain event loop?`
- `Name one JS engine.`
- `Is Javascript Object Oriented? If not then what type it is?`

> **Some JS snippets to try:**
```
Snippet1

let a = [1,2,3,4,5]
let b = a
b[3] = 10
let c = b
console.log(a,b,c)
//Output: ??
```

```
Snippet2


let obj1= {name:"atul", age:24, 
           hobbies:['reading books', 
           'writing blogs','exercising', 'poetry']}
let obj2 = obj1
delete obj2['hobbies']
console.log(obj1, obj2)
```

```
Snippet3


const aa  = 5
const bb = [12,23,543,56]
const cc = {name: "atul", age:24}
ac= 10 //What will happen? Is this Ok.
bb[3] = 9
bb[4] = 12
cc['Age'] = 'greater than 18'
```

```
Snippet4


let myself = {
  name: "atul",
  age: 24,
  hobbies: ["reading books", "writing blogs", "exercising", "poetry"],
  favourites: {
    movies: ["Iron Man", "End Game", "Spiderman"],
    Sports: ["Cricket", "Football", "Basketball", "Badminton"],
    song: ["Legends Never Die", "Chidiya: Vilen", "etc", "etc..."]
  }
};

let yourself = { ...myself };
yourself["hobbies"] = ["Guitar playing", "playing football", "Dancing"];

let newSelf = {
  ...myself
};
newSelf.favourites.movies = ["Star Wars", "Ice Age", "Batman", "Flash"];

console.log("myself:", myself);
console.log("yourself:", yourself);
console.log("newself", newSelf);
```

> **Here is link to all the questions asked above with implementation, so that you don't feel slacking off with what will happen in each case.**

<iframe src="https://replit.com/@AtulBhatt/JSInterview2?embed=true" width="100%" height="500px" style="border:0; border-radius:6px; margin: 1.5rem 0;"></iframe>

`I will be ending this article here for now. I'll continue it in the next part with more questions that will cover more in-depth questions. So see you around here next time.👋
Have an insightful day 😄.`
