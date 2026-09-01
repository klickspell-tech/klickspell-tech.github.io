---
title: "Web Performance — Bundling"
description: "Web Performance — Bundling After traveling the road of web performance and optimizing it, we finally reached or next stop — bundling. And if you’re thinking abo..."
pubDate: 2023-11-18T07:52:12.000Z
author: "Atul Bhatt"
tags: ["web-development","website","web","frontend","front-end-development"]
mediumUrl: "https://atulbhatt98.medium.com/web-performance-bundling-bfe874c21e9d"
canonicalUrl: "https://klickspell.com/blog/web-performance-bundling"
coverImage: "https://cdn-images-1.medium.com/max/752/1*-ThiTXp-GCNLBljcHfxfyA.png"
readingTime: "3 min read"
---

### Web Performance — Bundling

![](https://cdn-images-1.medium.com/max/752/1*-ThiTXp-GCNLBljcHfxfyA.png)

After traveling the road of web performance and optimizing it, we finally reached or next stop — bundling.

And if you’re thinking about how we reached here. Then checkout our previous stops: [Web Performance](https://medium.com/@atulbhatt98/web-performance-introduction-8b014cc97988) > [Network Calls and Why to Reduce them.](https://www.linkedin.com/pulse/network-calls-why-reduce-them-atul-bhatt/?lipi=urn%3Ali%3Apage%3Ad_flagship3_publishing_published%3BCfl5XE67QaiZx1rfCvY%2BVg%3D%3D)

### What is bundling?

As the literal meaning implies collecting multiple similar things into one.

But in the context of software development, which we are here to talk about, it’s a process of combining multiple files or resources into a single file or package.

### When to do it? 🤔

Bundling can be totally avoided by putting all our code in a single file from the very beginning. But keeping our code in a single file is not a good solution as it leads to bad developer experience.

In a typical web project, there are multiple JS files, CSS files and html files. Running them locally during development doesn’t need to be optimized. But once it is ready to be shipped on a production server it needs to be optimized.

So, the right time to perform bundling is when shipping an application from production rather than during development.

Or what else can be done is to have a separate copy of bundled code within the project folder from where it is served conditionally based on the environment or configurations.

And this process of creating a separate directory of optimized code via bundling is commonly known as “Creating a build”. Though a build process has other steps involved, but bundling is one of them.

### Bundlers

![](https://cdn-images-1.medium.com/max/1024/1*o0Fbx8uhNxvSur2VFyFuvg.png)

Source: Webpack

The process of bundling seems straightforward but doing it manually is definitely a hassle. But luckily, we have great tools to achieve the same and a lot more.

Comes to our rescue, the bundlers. 📦🚚

Bundlers are software tools that automate the process of bundling and packaging various files and resources into a single file or package.

They are commonly used in web development to optimize the delivery and performance of web applications.

Bundlers can handle different types of files, including JavaScript, CSS, images, fonts, and more. They analyze the dependencies between these files, resolve them, and create an optimized bundle that can be served to the client.

The most famous bundler these days is webpack. There are many other bundlers to choose from based on their pros and cons. Few of them are parcel, browserify, rollup.js, etc.

_Do you think this series should be bundled into a single long blog post, instead of small individual articles._

_Tell your views in the comments🗣️💡. And if you gained some knowledge reading this, don’t forget to share it with others. Knowledge do increases by sharing if not knowledge then network for sure._

_And they say —_ **_“your network is your net worth🌐💼”._**

> _And what is web if not network or networks._

_See you again with some more information on optimizing the web performance. Get ready to become familiar with terms like — minification, tree-shaking, code splitting, image optimization, cdn, and much more😍✨._

_So are you excited. Smash that 👏🏼 button to show your excitement. Till then Sayonara (goodbye)_
