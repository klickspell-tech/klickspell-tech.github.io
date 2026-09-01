---
title: "How to change/delete/remove an existing remote URL in Git?"
description: "Welcome to my another blog on GitHub. I’m a fan of it and trying to dive deeper and deeper into it so as to get the best out of it. I try to simplify things as ..."
pubDate: 2021-03-21T16:49:43.000Z
author: "Atul Bhatt"
tags: ["developer","github","development","productivity","devops"]
mediumUrl: "https://atulbhatt98.medium.com/how-to-change-delete-remove-an-existing-remote-url-in-git-e26a88684e6f"
canonicalUrl: "https://klickspell.com/blog/how-to-changedeleteremove-an-existing-remote-url-in-git"
coverImage: "https://cdn-images-1.medium.com/max/1024/1*xwjS-NtYt9AOT-3xNTgRZA.png"
readingTime: "2 min read"
---

![](https://cdn-images-1.medium.com/max/1024/1*xwjS-NtYt9AOT-3xNTgRZA.png)

Welcome to my another blog on GitHub. I’m a fan of it and trying to dive deeper and deeper into it so as to get the best out of it. I try to simplify things as much as possible so bear with my posts if they sound boring.

So today I had a task to migrate my GitHub repo to Bitbucket so I made all the setup in the bucket and created a new repo there. However, now to continue with all the operations of GitHub and to make sure I do all the remote or server operations on Bitbucket instead of GitHub I had to set the remote URL of Bitbucket repo instead of GitHub in my local Git.

> Note: remote means **github.com** or any other sites like it where we can push our code online and alias mean a nickname for the URLs of the repository.

![](https://cdn-images-1.medium.com/max/1024/1*Z6upgHxSwkD5hpdUtA8-Mw.png)

### There are 3 ways to do it.

Actually there is really a one way that you’ll need but I’m trying to hand you over with other ways which may come handy at some later point of time.

#### 1\. Update or change the URL

This is a quite a straightforward way to do it. Just one command and you are done.

![](https://cdn-images-1.medium.com/max/1024/1*906cS9RShahSZQ_v8zawZQ.png)

> The command is: git remote set-url < alias-name> <url>

#### 2\. Delete the existing remote alias (origin) and create it again.

Step1: Deleting the remote alias.

![](https://cdn-images-1.medium.com/max/1024/1*Oruhl11aI5j8Qu91cnOXVA.png)

The command to remove or delete existing remote is pretty straightforward.

> git remote remove <alias-name>

Step2: Adding the remote URL(aka adding origin)

![](https://cdn-images-1.medium.com/max/1024/1*pmGcED8jGSa1FIGtcfPkLw.png)

> git remote add <alias-name> <remote-url>

#### 3\. Adding the remote URL with different alias name and use it.

This is also a simple step and can be useful if you are in a need to push your code to more than one remote. Maybe a need to push the code on both GitHub and Bitbucket. Who knows when this can come handy?

![](https://cdn-images-1.medium.com/max/1024/1*HXqoZ23FrqXOXVcv353EXA.png)

> git remote add <new-alias-name> <new-remote-url>

So that’s all we gotta do. Few simple git commands that can save you get your work done. I’ll be up with more content on GitHub, so stay tuned.
