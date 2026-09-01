---
title: "Breaking down `npx create-react-app` from npm to npx🥷"
description: "Hello🙋‍♂️ to all the curious devs🤓. Today in this post I'm going to breakdown the things that npx..."
pubDate: 2022-02-20T15:05:50.000Z
author: "Atul Bhatt"
tags: ["npm","webdev","react","node"]
devtoUrl: "https://dev.to/atulbhattsystem32/breaking-down-npx-create-react-app-from-npm-to-npx-4ah9"
canonicalUrl: "https://klickspell.com/blog/breaking-down-npx-create-react-app-from-npm-to-npx-4ah9"
coverImage: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fqjsabp7bqoedi3077ipj.png"
readingTime: "4 min read"
---

Hello🙋‍♂️ to all the curious devs🤓. Today in this post I'm going to breakdown the things that _**npx create-react-app**_ does for us. I know there are many other articles for the same but as always I'm documenting👻 this firstly for me and if it proves to be useful for anyone out here reading this it would make me more than happy😸.

So let's start. I'll break this down in the form of questions, and below is the first.

##What exactly is npx?
So all those who don't know and just kept on running the command `npx create-react-app`, know that **npx** is a **node package runner**😎.

Oh! that was simple. **N**-node, **P**-package and **X**-???
Let the **X** here be from `executor`, kind of program executor in other words program runner. So here we have it _`node package runner`_.

We are going good😁 so far, now this article is not about npm but you might be thinking, and I mean might be thinking🤨 what is npm then?

> So, again the same way **npm** is 'Node Package Manager' - **N**-Node, **P**-Package, **M**-Manager.

Now let's break down what is the role of a package manager and a package runner.🤫

#Node Package Manager

> - **_npm_** is a `package manager` that helps💪 you in managing the `dependencies/packages` you as a developer want to have in your project. 
> - It also helps you in managing🤏 whether you want to install those packages globally (for all the projects) or locally (for the current project).
> - This all that we are talking about is a CLI (command line interface) that gets installed when you install Node JS in your system. 

> But **npm** is more than that.🕵🏼‍♂️
 

> So when you install a package on your system it's fetched from online, and in online that place is the **npm** repository.
> So **npm** is a `package manager` which is a `combination` of a `CLI and a Repository`.

_With now this sorted😼, it's time to hop back towards **npx**._

So it's obvious that you installed a package and you wanna do something with it. Maybe uninstall it which you can easily do with **npm** or use it by running it.

##There's a catch
How to run a package or in other words execute it. Can't we do with the help of **npm**? And boy we can do it.

So the answer to why we need **npx** in the very first place is just about to be revealed.🦹‍♂️

####How to run a package with the help of npm?
Now, for those who are thinking "I've run a package with npm before and aren't be always starting react server with the help of the command - `npm run start`"

Yes, so if we are able to do it why in the world **npx**🥴🥴???

**So the catch here is that** - _you can run `only those packages` using npm run those are `specified in your projects package.json`. And that simply means if you wanna run a npm package you gotta add that in your package.json._

![Package.json](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/i9l8mg3kozl6wkkrrxa5.png)

> You see all those `inside scripts`. That's the `key` to `npm run` for various packages. Like `format` is for the `prettier`.
> There are other `tedious way` to do so, such as specifying the local path:`_ npm run ./node_modules/.bin/your-package_`

###Now, there comes our hero🦸‍♂️ into the picture - NPX.

Let's explore what **npx** brings on the table🧙‍♂️ for us.

- npx easily runs Node.js based executable installed via npm.
- We can run a locally installed package easily, and that's what we are looking here for.
- There are other perks of npx but not in this article.

> Do you know you can start react server with **npx** also as: 
>`npx react-scripts start`


##It's time for CRA (create-react-app)👩🏻‍🎨
If you're a _**react-dev**_ like me. Then you might have used this command atleast once in your life - `npx create-react-app`

Now we know what **npx** is and from all our discussion it's also clear that create-react-app is an executable, so let's find out what it does for us.

####CRA is a toolchain. 
And now another term to breakdown🤦. What is a **toolchain**??

> - Don't worry💆 it's a simple term which holds its meaning in its name. It's a chain of tools or a `collection of distinct tools` that `helps` in achieving the `process of completing` the `software development` and sometimes `deployment` too.
> -  So `CRA (create-react-app)` is a `JavaScript toolchain` or a set of software tools which are `basically CLIs` to `help in creation of a react project`.

![CRA APP](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ywlsw5ijhjcbe1croiqf.png)
 
 
#####So instead of reinventing the wheel again, I would add few content from React Docs:

> **A JavaScript build toolchain typically consists of:**
> -  A `package manager`, such as `Yarn or npm`. It lets you take advantage of a vast ecosystem of third-party packages, and easily install or update them.
> -  A `bundler`, such as `webpack or Parcel`. It lets you write modular code and `bundle` it together `into small packages` to `optimize load time`.
> -  A `compiler` such as `Babel`. It lets you `write modern JavaScript` code that still `works in older browsers`.

**_So, in short a CRA offers all these functionalities. For more info on this you can refer to [react docs](https://reactjs.org/docs/create-a-new-react-app.html)._**

_Thank you folks for reading all through this article. I tried my best to breakdown the terms that would've otherwise made you feel like you are missing some context to this._

**Keep reading, keep learning, and never stop being curious. See you until next time.**✌️✌️✌️

