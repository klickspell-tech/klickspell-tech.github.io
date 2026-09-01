---
title: "Why WhatsApp web doesn't work without WhatsApp on your mobile app?"
description: "On and off this question might have crossed your mind once in a while when you open WhatsApp on the w..."
pubDate: 2021-05-22T16:28:22.000Z
author: "Atul Bhatt"
tags: ["webdev","whatsapp","curiosity","technolgies"]
devtoUrl: "https://dev.to/atulbhattsystem32/why-whatsapp-web-doesn-t-work-without-whatsapp-on-your-mobile-app-fh3"
canonicalUrl: "https://klickspell.com/blog/why-whatsapp-web-doesn-t-work-without-whatsapp-on-your-mobile-app-fh3"
coverImage: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fdx5xuz369h7xeijebh1c.png"
readingTime: "3 min read"
---

On and off this question might have crossed your mind once in a while when you open WhatsApp on the web.
> **Why do I need to open WhatsApp web on my phone for it to work on the web?**

I know it was so easy for this❓ to slip away because you were about to reply to an important 💬 . 

But worry not I am here with an answer to that which I realized while reading the `privacy policy of Whatsapp`. 

The privacy policy and its concern is a topic for another article first let's talk about this mystery before you jump out of this article.

![Screenshot_Privacy Policy and 8 more pages - Personal - Microsoft​ Edge Dev_1](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nhjoqeo4cpbbqdia5ndc.png)



The image above has the updated privacy policy but the focus of our discussion lies in the section I'm quoting below.

> We do not retain your messages in the ordinary course of providing our Services to you. Instead, `your messages are stored on your device and not typically stored on our servers. Once your messages are delivered, they are deleted from our servers.`

So the above statement is quite self-explanatory to why WhatsApp needs your device to be connected to the internet🌐  and WhatsApp to be opened on it. 

For those who want a little depth in the explanation, the steps below are waiting for them to be read📖 by you:


#### The journey of messages💬 
1. You send a 💬  to someone, it 1st goes to the Whatsapp server and then Whatsapp sends it to the receiver or the person you sent it to. 

2. Once the `💬  is received` by the receiver, the 💬  you sent is `deleted🗑️ from the WhatsApp server` which was in `encrypted form` and can only be decrypted on the device of the receiver.


#### The hidden answer

3. Now when you `try to access your WhatsApp chats💬 ` on WhatsApp web there is nothing that WhatsApp can get from its server as `it already had it 🗑️` from there.

4. Now my take on `how WhatsApp gets the 💬  on WhatsApp web` is that it `sends the recent chats to the WhatsApp server` temporarily and `stores them` till the WhatsApp web session is on. Now, these `chats are delivered from the WhatsApp server` to the device in which the WhatsApp web is open.

#### A small experiment that throws some light🔦 on the above explanation.

> I have a list of messages in a group chat.

![photo_2021-05-22_18-59-09](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mvxve174ybu3kjeva8qx.jpg)
 
![photo_2021-05-22_18-06-12](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9f0otncqb6sr45r4iki7.jpg)
 
These are the messages which were on my device and when I opened WhatsApp web on the Edge Browser on my laptop I was able to see them there as well.

> Now I deleted the message with the Amazon link from my device and then refreshed the Whatsapp Web page.

![photo_2021-05-22_18-59-09 (2)](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/chmtdq1a4lgn2c22c3d1.jpg)
![photo_2021-05-22_20-24-05](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xitxbsckk3x6qural0w0.jpg)

**You might have noticed that the delete option was just `delete for me`.**

>The screenshot below shows the reflection of our actions on WhatsApp web with the same message deleted.
 
![image_2021-05-22_18-07-20](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/96tnt6as0f68be6ct02b.png)
 

### I hope you enjoyed🤗 reading this article as much as I enjoyed writing.....I mean typing. `Please comment down any questions or your views on this article you have down in the comment section of the platform wherever you find the link to this article.`

Before you leave here is something you can try. Whatsapp says in its privacy policy:

>If a message cannot be delivered immediately (for example, if the recipient is offline), we keep it in encrypted form on our servers for up to 30 days as we try to deliver it. If a message is still undelivered after 30 days, we delete it.

Now you can try to send a message to someone who is not using WhatsApp and ask them to install it after 30 days of sending that message. What will happen?

Stay Curious🦝 .
