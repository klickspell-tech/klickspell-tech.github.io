---
title: "5 Things to do before making the build for Production. (React JS)"
description: "This article is not something you might not already know but maybe you might not have it all listed..."
pubDate: 2021-08-24T12:25:58.000Z
author: "Atul Bhatt"
tags: ["webdev","javascript","react","writing"]
devtoUrl: "https://dev.to/atulbhattsystem32/5-things-to-do-before-making-the-build-for-production-react-js-j8b"
canonicalUrl: "https://klickspell.com/blog/5-things-to-do-before-making-the-build-for-production-react-js-j8b"
coverImage: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fhznd34y40yala1uc8t43.png"
readingTime: "2 min read"
---

This article is not something you might not already know but maybe you might not have it all listed in a one place. There can be more things that I'll surely be missing in this article which I would like you to mention down in the comments so that I can compile another part to this article. And this is a beginner level post.

So let's start on listing the things that I feel one should do before pushing their production build. These are the things that I have used for the react project I have built but they are definitely the points which can surely be helpful in other projects.

**1.** Clearing all the `console.logs` that are absolutely not intended for the users. And it's rare that `console.logs` are there for users.

**2.** Remove all the `commented code` which doesn't serves any purpose or in the end is just misleading. Comments are meant for giving extra context to why something has been done not the other way around.


![Screenshot (309)](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7ttpxsa5z79q4077anq4.png)

>The above screenshot depicts how there is a `useless console log` which the developer might have used for the `testing purpose` which should be `removed` once everything is wrapped up in development and the project is ready for getting into production.

>Another thing worth keeping note is the commented code which serves no purpose in the end.


**3.** Removing all the `unused npm packages` and `libraries` that are installed.

**4.** Deleting all the `unused files` that are just clogging up.

> It might feel overwhelming to find all the unused packages and files manually but don't you worry.
As the diamond cuts the diamond, in the same way we will use another package to remove the dead files. 

You can follow the packages below:
[depcheck](https://www.npmjs.com/package/depcheck)
[unimported](https://www.npmjs.com/package/unimported)

![Screenshot (119)](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/935ega4ef8386v4uqz5k.png)

**5.** Check how the build works by `serving the build` in react. I know that I used to create a build and then push it to staging server to check how it will behave there because I wasn't aware of the fact that React offers this functionality. It's always good to check your build before pushing it to the server.

![Screenshot (310)](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pfijqotdyhfohsq6zfqk.png)

*So basically this is not about improving the code or optimizing it. These things go hand in hand when you are doing development.*

*The goal🎯 of this article is primarily on giving the finishing touch to your React Web App before making it live in the production.*

*I hope this article was helpful to you. I would be more than happy to receive your feedback on this article. Thanks for your precious time reading this. Stay tuned for more insightful reading by me.😊*
