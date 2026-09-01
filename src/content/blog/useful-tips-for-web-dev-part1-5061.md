---
title: "Useful Tips for Web Dev - Part1"
description: "A lot of time there are some problems which we face occasionally but the time when that occasion..."
pubDate: 2022-04-27T16:54:36.000Z
author: "Atul Bhatt"
tags: ["javascript","webdev","productivity","tooling"]
devtoUrl: "https://dev.to/atulbhattsystem32/useful-tips-for-web-dev-part1-5061"
canonicalUrl: "https://klickspell.com/blog/useful-tips-for-web-dev-part1-5061"
coverImage: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Ff9yf71imv8z8jnb1z4k2.png"
readingTime: "2 min read"
---

A lot of time there are some problems which we face occasionally but the time when that occasion become too often it becomes frustrating to keep searching those occasional problem here and there on stack overflow or documentation of the libraries. So I'm starting this series of Problems and Solutions to have my those problems all curated at one place. Let's see how it goes. Some of these problems took me to get through a lot of stack overflow answers to find the right one. I wish it saves someone's time.

###1. How to change port for NPM start? or Node JS change server port?
```
SET PORT=8080 && npm start //windows
export PORT=4000 && npm start //MAC
```
###2. How to find difference between 2 dates in days?
Let's say we have two dates, your date of birth and today's date and you want to **find the difference** between them in days. It's something I feel someone will someday **definitely need to use**. So [here's](https://dev.to/atulbhattsystem32/find-no-of-days-between-2-dates-using-momentjs-53pc) the way to do it.

###3. Some Quick Generic Web-Developer Friendly Shortcuts
 - **Clear Console logs** - _developer tools (ctrl+l)_
 - **Close Tabs** - _(ctrl+w)_
 - **Duplicate a Tab** - _(ctrl+shift+k)_
 - **Open recently closed tabs** - _(ctrl+shift+t)_
 - **Hard Reload** - _(ctrl+shift+r)_

###4. NVM- Node Version Manager ( Windows)
If you're a JS developer then you have had or will at later point in time face the **need to change the node version** installed in your system because the **project doesn't supports** the latest. Here NVM - Node Version Manager comes to your rescue.
> It allows you to have `multiple Node Versions` installed and toggle between them.
[NVM-windows](https://github.com/coreybutler/nvm-windows)

###5. Copy as CURL
When you're frontend developer you often need to **integrate APIs.** And a lot of time there might be **issues** which you would've have to **communicate** to the **backend developer** who will be needing things like the **payload and header** you sent with the api to** check** you passed everything correctly.
Instead, what you can do is **send the CURL url** to your backend developer which he can import in his **API test tool like POSTMAN** to check it.

_These are few for now and I'll keep coming with more soon. Till then fast solving😁._





