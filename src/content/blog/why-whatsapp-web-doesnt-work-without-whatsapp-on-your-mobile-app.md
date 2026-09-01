---
title: "Why WhatsApp web doesn’t work without WhatsApp on your mobile app?"
description: "On and off this question might have crossed your mind once in a while when you open WhatsApp on the web. Why do I need to open WhatsApp web on my phone for it t..."
pubDate: 2021-05-22T16:28:22.000Z
author: "Atul Bhatt"
tags: ["technology","developer","facebook","curiousity","whatsapp"]
mediumUrl: "https://atulbhatt98.medium.com/why-whatsapp-web-doesnt-work-without-whatsapp-on-your-mobile-app-bb307afb56be"
canonicalUrl: "https://klickspell.com/blog/why-whatsapp-web-doesnt-work-without-whatsapp-on-your-mobile-app"
coverImage: "https://cdn-images-1.medium.com/max/1000/0*JsNH2WuMk2SNXQyn.png"
readingTime: "4 min read"
---

![](https://cdn-images-1.medium.com/max/1000/0*JsNH2WuMk2SNXQyn.png)

On and off this question might have crossed your mind once in a while when you open WhatsApp on the web.

> **_Why do I need to open WhatsApp web on my phone for it to work on the web?_**

I know it was so easy for this❓ to slip away because you were about to reply to an important 💬 .

But worry not I am here with an answer to that which I realized while reading the privacy policy of Whatsapp.

![](https://cdn-images-1.medium.com/max/1024/1*7vRh9ZQ5gm1W_Mg64XN42A.png)

The privacy policy and its concern is a topic for another article first let’s talk about this mystery before you jump out of this article.

The image above has the updated privacy policy but the focus of our discussion lies in the section I’m quoting below.

> _We do not retain your messages in the ordinary course of providing our Services to you. Instead,_ _your messages are stored on your device and not typically stored on our servers. Once your messages are delivered, they are deleted from our servers._

So the above statement is quite self-explanatory to why WhatsApp needs your device to be connected to the internet🌐 and WhatsApp to be opened on it.

For those who want a little depth in the explanation, the steps below are waiting for them to be read📖 by you:

#### The journey of messages💬

1.  You send a 💬 to someone, it 1st goes to the Whatsapp server and then Whatsapp sends it to the receiver or the person you sent it to.
2.  Once the 💬 is received by the receiver, the 💬 you sent is deleted🗑️ from the WhatsApp server which was in encrypted form and can only be decrypted on the device of the receiver.

#### The hidden answer

1.  Now when you try to access your WhatsApp chats💬 on WhatsApp web there is nothing that WhatsApp can get from its server as it already had it 🗑️ from there.
2.  Now my take on how WhatsApp gets the 💬 on WhatsApp web is that it sends the recent chats to the WhatsApp server temporarily and stores them till the WhatsApp web session is on. Now, these chats are delivered from the WhatsApp server to the device in which the WhatsApp web is open.

#### A small experiment that throws some light🔦 on the above explanation.

> _I have a list of messages in a group chat._

![](https://cdn-images-1.medium.com/max/564/1*EERPiI9QLDhaA0TS2ckaDg.jpeg)

![](https://cdn-images-1.medium.com/max/641/1*bZPSkVCaB5FZnLog43ZASA.jpeg)

These are the messages which were on my device and when I opened WhatsApp web on the Edge Browser on my laptop I was able to see them there as well.

> _Now I deleted the message with the Amazon link from my device and then refreshed the Whatsapp Web page._

![](https://cdn-images-1.medium.com/max/560/1*NUvp2WNmBjNbNoSBfMPSYQ.jpeg)

![](https://cdn-images-1.medium.com/max/560/1*xtGL7uGUQokFMt2D9-Rhzw.jpeg)

![](https://cdn-images-1.medium.com/max/959/1*U6qj9DQwn8pl5RnGNAknrg.png)

**You might have noticed that the delete option was just** **delete for me.**

> _The screenshot below shows the reflection of our actions on WhatsApp web with the same message deleted._

### I hope you enjoyed🤗 reading this article as much as I enjoyed writing…..I mean typing. Please comment down any questions or your views on this article you have down in the comment section of the platform wherever you find the link to this article.

Before you leave here is something you can try. Whatsapp says in its privacy policy:

> **_If a message cannot be delivered immediately (for example, if the recipient is offline), we keep it in encrypted form on our servers for up to 30 days as we try to deliver it. If a message is still undelivered after 30 days, we delete it._**

Now you can try to send a message to someone who is not using WhatsApp and ask them to install it after 30 days of sending that message. What will happen?

Stay Curious🦝 .

_Originally published at_ [_https://dev.to_](https://dev.to/atulbhattsystem32/why-whatsapp-web-doesn-t-work-without-whatsapp-on-your-mobile-app-fh3) _on May 22, 2021._
