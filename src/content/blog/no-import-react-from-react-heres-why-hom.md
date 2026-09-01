---
title: "No import React from 'react'. Here's Why!"
description: "Information Source: The React Docs  So I assume if you are reading this post then you are probably a..."
pubDate: 2022-03-29T05:44:50.000Z
author: "Atul Bhatt"
tags: ["react","javascript","babel","jsx"]
devtoUrl: "https://dev.to/atulbhattsystem32/no-import-react-from-react-heres-why-hom"
canonicalUrl: "https://klickspell.com/blog/no-import-react-from-react-heres-why-hom"
coverImage: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fiwv0fw9wci6ec62sraos.gif"
readingTime: "3 min read"
---

_Information Source: [The React Docs](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)_

So I assume if you are reading this post then **you are probably a react developer or an aspiring react developer**. Doesn't matter which one you're the above question is the one that you may encounter within yourself while working with react.

> Now, what triggered me to write this blog post is depicted in the screenshot below and further explained below the screenshot. Let's uncover this mystery together.


![VS Code Screenshot](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/i4g31j6obexcyff3d9xu.png)

So as you can see the one line without which the React didn't used to work is now treated as declared but not read or in other word used.
Yes folks, I'm talking about none other than `import React from "react";`

Perhaps something might have changed so what can be a possibility for that. **This new warning makes sense as of now because we were always importing `React` even if it was not required.**

_So as always let's divide our post into question with the first one being-_

### Why do we do `import React from "react";`?

> As I had already assumed that you're a react developer so I also assume that you know that React uses JSX. 

However, **the browser doesn't understands JSX** so it has to be converted in something that browser understand and that is JavaScript, and this **conversion of JSX into JS was possible because of compilers like `Babel`.**

As now we've crossed 2020 already and **React 17** is a thing which **didn't introduced any new features** but one thing. And that's the key to answer for our question. Can you guess what??

>_The support for a New Version Of JSX Transform.
I say it again.
The support for a New Version Of JSX Transform._

**Now we have two JSX transform - Old and New obviously.**

_So before when we were doing:_

```
import React from 'react';

function App() {
  return <h1>Hello World</h1>;
}
```

_The Old JSX transform used to do:_

```
import React from 'react';

function App() {
  return React.createElement('h1', null, 'Hello world');
}
```

Since, JSX was compiled into `React.createElement`, **it was necessary for the React to be available in the scope.**

> Finally, one question is now answered. 

## But we are actually left with the original question. What's changed in new JSX transform that made it 'okay' to not import React for the sake JSX transform.

> Now to import `React` so that it can be in the scope and just only because `React.createElement` can be called is not a perfect choice.

To solve this part and a few other [performance improvements and simplifications](https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md#motivation) (which we are not discussing here) React collaborated with the Babel to bring the new version of JSX transform into existence.

React made some changes in the React17 by **adding two new entry points to the React package** just to be **used only** by the **compilers like Babel**.

So now with the availability of these two new entry points that Babel uses to perform JSX transform which means **the need to do JSX transform via React.createElement is no longer required.**

And therefore folks, no need to do `import React from "react"` any longer if you are on React version greater than 16.

> **PS:** _If you're on older version of React such as React 16 or 15 or even 0 then there's a good news for you. React has released React 0.14.0, React 15.7.0, and React 0.14.10 for people who are still on the older major versions._

**So now all you need to use latest JSX transform is these latest version and a supported compiler like Babel.**

I hope you enjoyed reading this article and was able to calm your curious mind for some time. **Meanwhile you can checkout my other posts.**

_Happy transforming into a curious reader. 
Have a nice day folks._
