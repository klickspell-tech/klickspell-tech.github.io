---
title: "Web Performance — Network Calls"
description: "Web Performance — Network Calls In our previous article we discussed about why the web performance is important and factors that affect it. If you haven’t read ..."
pubDate: 2023-11-11T07:46:44.000Z
author: "Atul Bhatt"
tags: ["frontend","network","web","web-development","internet"]
mediumUrl: "https://atulbhatt98.medium.com/web-performance-network-calls-68d3b922d067"
canonicalUrl: "https://klickspell.com/blog/web-performance-network-calls"
coverImage: "https://cdn-images-1.medium.com/max/752/1*XygpcHEl2Kc57paJ26snWQ.png"
readingTime: "3 min read"
---

### Web Performance — Network Calls

![](https://cdn-images-1.medium.com/max/752/1*XygpcHEl2Kc57paJ26snWQ.png)

In our previous article we discussed about why the web performance is important and factors that affect it.

If you haven’t read it yet, you can read it [here.](https://medium.com/@atulbhatt98/web-performance-introduction-8b014cc97988)

If you’ve read the above article, then you know that there is a network call every time we open a webpage. And there isn’t one but as many network calls as the number of resources required by the webpage.

**Network calls** in simple terms is the communication of client with server. Client here refers to the one making the request for a resource.

Our webpages are stored on server from where it reaches to our client machine, that is — the browser.

Now, with the advent of modern web applications use of JavaScript on a web page has drastically increased. And for every small to big functionality there is a JS file.

One can be for calling an Api, other can be for some animation on the web page, and the list can keep on.

Now it’s not just JS, there are separate CSS files too. Some for styling a button, some for styling a navbar, and this list also goes on.

The simple fact here is that there are so many individual files that we need to get from the server for loading a single webpage, so that our webpage looks and feel flawless to interact with.

However, how these files are a problem? They are definitely important, and we can’t just get rid of them.

And you’re right here. But let’s refer to image from our previous post again. Each network call requires communication between the client and the server, which involves data transfer and processing time.

![](https://cdn-images-1.medium.com/max/684/1*1VRxYujyMaVeTDHDYUb62g.png)

A network request

Okay. now enough of the problems. Let’s take a turn to the solution.

### Solution but with a little caveat

One of the easiest solutions can be to put all the CSS and all JS in a single file. Don’t create separate JS files for animation or handling a button click. Create a single file and create all the functions inside it.

Of course, the size of the file will increase which eventually have to fetched as multiple separate files, but the number of calls will now decrease.

A single connection will give us all we need. Now, the overhead of those connection establishment time is reduced from many network calls to one.

Sounds good but something about it doesn’t feels right. Yeah, it’s the developer experience and much more.

1.  _It takes a toll on the readability and maintainability of the code. You have to scan through the entire file to find the right thing to work on._
2.  _There’s a high chance you might end up working with multiple people on the same project and working on same file, but different functionality can be a red flag when it comes to escaping away from the conflicts._

and there are issues related to reusability, performance, and dependency management. But the core idea is it’s not the best solution at least a solution that can scale well.

The tradeoff here can be some seconds of faster loads vs added hours of development process.

This solution to this tradeoff is what will take us to our next journey.

_So, stay tuned to this journey with me in our next voyage to the world of “Bundling”._

So don’t forget to follow me [Atul Bhatt](https://medium.com/u/bde6c3a0e47a), for more such informative content around web. Apart from #web I write about #freelancing, #javascript, and share some useful stuff I find on the internet.
