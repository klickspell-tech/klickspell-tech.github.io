---
title: "Hot Reload Fails, DOM adds an additional iframe"
description: "Hey React Developers🙋‍♂️, this your gateway to solving this problem if you're still facing this. I've..."
pubDate: 2022-04-28T16:41:47.000Z
author: "Atul Bhatt"
tags: ["react","help","discuss","webpack"]
devtoUrl: "https://dev.to/atulbhattsystem32/hot-reload-fails-dom-adds-an-additional-iframe-45e7"
canonicalUrl: "https://klickspell.com/blog/hot-reload-fails-dom-adds-an-additional-iframe-45e7"
coverImage: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Firvgyom38vvhgtupuexw.png"
readingTime: "2 min read"
---

Hey React Developers🙋‍♂️, this your gateway to solving this problem if you're still facing this. I've **tested** the solution in **multiple React projects on various different devices with variety of OS and browsers.** Why? Because everyone in my team was facing this issue but were not frustrated enough to solve it which I was.

I've gone through multiple github discussions and stackoverflow posts to finally reach this solution and then test it out.

Let's see the **symptoms** you're facing. Are they mentioned below:
 - Application becomes **non-interactive, iframe** is added to DOM.
 - Hot reload continues to work, but the page becomes unresponsive. **Can't click or do anything unless you do a manual refresh.**
 - process is not defined

```
Uncaught ReferenceError: process is not defined
at Object.4043 (<anonymous>:2:13168)
at r (<anonymous>:2:306599)
at Object.8048 (<anonymous>:2:9496)
at r (<anonymous>:2:306599)
at Object.8641 (<anonymous>:2:1379)
at r (<anonymous>:2:306599)
at <anonymous>:2:315627
at <anonymous>:2:324225
at <anonymous>:2:324229
at HTMLIFrameElement.e.onload (index.js:1)
```

You might have started facing this problem either after **updating your CRA or starting a new project using create-react-app** which lead to the probable lead cause of it to be **react-error-overlay.**
> You can check the **issue reported on github** [here](https://github.com/facebook/create-react-app/issues/11771)

### SOLUTION
`npm i -D react-error-overlay@6.0.9`

> If this doesn't helps, check [this](https://github.com/facebook/create-react-app/issues/11880#issuecomment-1005409614) out.

_If this solution solves your problem, do like this post or comment down so that others can also get the benefit by reaching to it as early as possible. Till then safe debugging👍_
