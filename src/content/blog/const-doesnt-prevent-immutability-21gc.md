---
title: "Const doesn't prevent immutability"
description: "What is a variable?   In programming, a variable is a name given to a location in the..."
pubDate: 2023-06-13T15:03:59.000Z
author: "Atul Bhatt"
tags: ["javascript","webdev","programming","frontend"]
devtoUrl: "https://dev.to/atulbhattsystem32/const-doesnt-prevent-immutability-21gc"
canonicalUrl: "https://klickspell.com/blog/const-doesnt-prevent-immutability-21gc"
coverImage: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F6g5c3tsw40xzq6rv2zrc.png"
readingTime: "2 min read"
---

## What is a variable?

In programming, a variable is a name given to a location in the #memory of the computer.

Instead of treating the value of a variable as a number, string, etc. If we start looking at the **value of a variable** as an **address** to the **location in a memory**, then it will make it easy to understand the concept of **let** and **const** in JavaScript.


## A mental model for understanding

Consider **const** keyword as representation for **constant** word.

And **let** keyword as **temporary**.
for example, if you remember, solving equations in mathematics we often say.

> _let us assume value of x is 10._


Now, combining both knowledge: 
- value of variable is an address
- const is for constant
- let is for temporary

it will start making sense for the statement below:

> _const doesn't prevent immutability. It just prevents reassignment. _


## Examples
Now, when I do:

```
const a = 12
/* A memory address is assigned to a (ex: M121312)
Now the value of "a" internally is "M121312")
If I try to do again: */

a = 13 
/*A new memory space will be assigned to value 13 (ex: M121314) */

```

So, internally it seems like, we are trying to do reassign a value to a.

This might feel vague for now. But hold on.

Let's come to array.


```
const b = [1,23,45,56] 
/* b is assigned a memory address (M131314)
and when I do: */

b[2] = 24 
/* it works because the address of b is not changed. 
The value of b is still (M131314)
However, if I do:
*/
b = [1,24,45,56] 
/* it's a new value assignment, i.e., a new address (M131320) */
```


This is just a **mental model** to think about **const** and **let** that I came up with. I don't know if it's entirely correct or not.


Tell me in the comments if it makes sense!

As always thanks for reading. Stay curious!
