---
title: "Web Performance — Introduction"
description: "Web Performance — Introduction Web Performance — an attention Game When you hear the term Web Performance what’s the first thing that comes to your mind? Commen..."
pubDate: 2023-11-04T05:37:22.000Z
author: "Atul Bhatt"
tags: ["web","frontend","web-development","internet"]
mediumUrl: "https://atulbhatt98.medium.com/web-performance-introduction-8b014cc97988"
canonicalUrl: "https://klickspell.com/blog/web-performance-introduction"
coverImage: "https://cdn-images-1.medium.com/max/752/1*zdQE-Q8XCx_MvwdBiPX0Tw.png"
readingTime: "7 min read"
---

### Web Performance — Introduction

![](https://cdn-images-1.medium.com/max/752/1*zdQE-Q8XCx_MvwdBiPX0Tw.png)

### Web Performance — an attention Game

When you hear the term Web Performance what’s the first thing that comes to your mind? Comment down. Not as a developer but a user. Here’s what comes to my mind.

1.  _Fast web page loads._
2.  _Smooth Interactions_
3.  _A good UI_

But, out of these 3 let’s focus on “Fast web page loads”, as if a page fails at first then there’s a high chance the other two shows won’t get their tickets sold.

For a user to experience smooth interaction and the good UI, which means overall UI/UX he first needs to see the site in action, in short site should be loaded.

As a user I don’t like to wait for a site loading for even more than 5 seconds. I don’t care if my internet is slow or not, I want the site I’m visiting to open in an instant.

Now, you might have figured out why “Web Performance is an attention game.”

You need your website to perform better for one single reason, which can be further broken down into more sub reasons.

“To have visitors on your site and make them consume whatever you have for them in the store (your site/webpage).

### Web Performance — Need for Speed

Do you remember the formula for calculating speed?

Yeah, the same one,

> _speed = distance/time_

But when it comes to Internet, what is speed?

What’s the formula for it!

Because, to increase speed for travelling we have to somehow travel more distance in less time.

Let’s use a simple formula for Internet Speed to match the analogy above:

> _Internet speed = amount of data to fetch / time taken to fetch_

However, in our discussion above we discovered how it’s time that we need to control.

Which makes our formula in terms of time as:

> _Time taken to fetch = amount of data fetch / Internet speed_

With this we can come to a conclusion to control the perceived speed of Internet by 2 ways:

1.  _Increasing the internet speed_
2.  _Reducing the Amount of Data fetched_

However, as a developer we can only control one of these 2 factors.

There’s no magic trick to increase the internet speed of the user.

Now, we are left only with the 2nd option.

**_\- Reducing the Amount of Data fetched_**

Therefore, a lot of Web Performance revolved around the data to be fetched.

### Web Performance — Data Transfer

Whatever we do on the internet is more or a less is nothing but the interaction with data.

*   **_Web 1.0_** started with reading data, the only interaction user had was to read the content that’s already on the internet. It was more like an online Library.
*   But then the web evolved to **_Web 2.0_**, where the interaction with data was not just limited to reading but also creating it. Like this post I’m publishing.
*   And **_Web 3.0_** adds another layer to where we can own things on the internet.

However, with these evolutions of the web or internet I want to take your focus towards and important aspect of web that is transfer of data from one computer to another anywhere in the world, and not just our world but in space also. Whatever is the part of Internet.

As a developer, one of the critical things for us to control the speed of this data transfer is to reduce the amount of data but without any loss or at least perceivable loss of what a user wants.

Is there something about it that we can do as a web developer? OfCourse, we can.

For that we first need to understand how a webpage transfer happens.

### Web Performance — Transfer of a Webpage

Let’s do a little imagination.

Imagine. You’re sitting in your room with your laptop, and you open a browser, and it can be anyone except Internet Explorer.

Now, you type in your web browser URL — [www.google.com](http://www.google.com) and press enter.

What you think that pressing enter key might have done?

To be honest a lot of things which I also don’t know. But I’ll tell you a few of the things that I know, and they are very interesting.

> _We are still in the imagination process. So never stop imagining. Because everything in the end is the result of someone’s imagination._

Now, let’s say Web Page Transfer is a big event that we are going to perform.

This event has several small events. It’s an event you can’t do alone, you need a team for that.

Our team has following members:

*   You the user
*   Your laptop (with OS — windows for instance)
*   The Browser (anyone except Internet Explorer)
*   The ISP (Airtel, Jio, etc)
*   The server (from where we have to get the webpage)

Now, we know that it’s the transfer of webpage that needs to take place.

However, for that we need at least these 3 details:

*   What to transfer (which webpage? — Oh Google)
*   Whom to Transfer (The user/client)
*   Who will transfer (The server)

The answer to all these three questions is resolved when you press enter.

The pressing of the enter key or search button by you initiates a request (http/https — hypertext transfer protocol).

With this request goes answers to all the questions above and more

*   webpage \[Google\]
*   source/client IP address
*   server/destination IP address

Now, this all process gets broken down further into more steps before you see that webpage loaded in your browser.

![](https://cdn-images-1.medium.com/max/684/1*1VRxYujyMaVeTDHDYUb62g.png)

Time Taken for various steps to perform to fetch a webpage

As you can see in the screenshot. It takes time to do all the things like:

*   Starting a connection
*   Sending a request for resource
*   Waiting for server response
*   And then downloading the content in the response

Now, let’s breakdown what are all the resources, that are fetched?

Resources can be static files, that are of type text, or images.

Our web page which is a .html is a text file.

The response we get from server also tells the browser what kind of content it is (resource), so that it can decide what to do with it.

When the browser encounters a resource with content-type: HTML (which holds the information related to the structure of the webpage), browser tries to read it and render it.

While browser reads or parses the HTML file it also encounters references to other important thing required by the browsers such as:

*   Javascript files
*   CSS files
*   Image sources, etc

And then then the process of fetching these resources also takes place.

> _And every time a new resource is fetched, a time overhead for all steps adds up until all the resources required by that webpage is loaded._

Now, what we as a developer can do with all of this knowledge?

Now, we know that there is network calls every time we open a webpage. And there isn’t one but as many network calls as the number of resources required by the webpage.

_If you have come this far, I hope and believe you enjoyed this post and got to learn and understand something._

_In my next post, I’ll reveal more about what steps we as a developer can take to optimize the web application or site we are building, and hence improve the web performance._
