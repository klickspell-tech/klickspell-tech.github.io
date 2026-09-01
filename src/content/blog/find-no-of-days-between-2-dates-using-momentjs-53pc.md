---
title: "Find No of days between 2 dates using moment.js"
description: "Time and time again I'm reminded that you can't escape time and so are the problems related to date..."
pubDate: 2021-12-25T19:00:39.000Z
author: "Atul Bhatt"
tags: ["javascript","webdev","beginners","help"]
devtoUrl: "https://dev.to/atulbhattsystem32/find-no-of-days-between-2-dates-using-momentjs-53pc"
canonicalUrl: "https://klickspell.com/blog/find-no-of-days-between-2-dates-using-momentjs-53pc"
coverImage: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F22oalq12s2vsimw85qbi.png"
readingTime: "1 min read"
---

Time and time again I'm reminded that you can't escape time and so are the problems related to date and time. One such very common problem is to find the `difference between 2 dates.`

Let me give you a very simple example where we will try to `find the how many days old are you?`
So it feels like not a such big deal but think of writing the entire logic on your own when you know you can write but it will much less of a hassle to do it via library like `moment.`

I'm writing this as an article here because it took me time to find the way to do it using moment itself. I'm writing this article more for myself than for others. So consider this as a treat.

---
> **Here's the code:**

```
  let myDob = moment("19/12/1997", "DD/MM/YYYY");
  let today = moment();
  let myAge = today.diff(myDob, "years");
  let noOfDays = today.diff(myDob, "days");
```


> **Below is the embedded sandbox to demonstrate it:**

<iframe src="https://codesandbox.io/embed/79nux" style="width:100%; height:500px; border:0; border-radius: 6px; overflow:hidden; margin: 1.5rem 0;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>

> Check out the same in moment docs:
[moment](https://momentjs.com/docs/#/durations/subtract/)

 Thanks for your time reading this. I hope it helped you. Have a productive day :)

**PS:**_Moment is in maintenance mode._

You can read about the meaning of it in the article linked below.
[MOMENT.JS OFFICIALLY BECOMES A LEGACY PROJECT IN MAINTENANCE MODE](https://ilikekillnerds.com/2020/09/moment-js-officially-becomes-a-legacy-project-in-maintenance-mode/)
