### RewardCardWallet

---

Mobile Android app that holds your reward card details so that you don't have to carry 10 different cards in your wallet.

---

## User Story

**Anne**
     - Anne is a mother of 2. She has to keep many items on her at all times, including toys, medicyne and sweets. She does not have room in her handbag to spare. <br>
     - Anne needs an app, that keeps her shopping reward cards on her phone, ready to scan in a moment. <br>
     - Anne does not have time to struggle with log in and navigating a website or big application, she just need her qr code ready to scan in a touch of a button. <br>
**Sarah**
     - Sarah is a freelance graphic designer who travels a lot for work. She is frequently in new cities for client meetings and events, and she accumulates a variety of loyalty and reward cards from different retailers and coffee shops. She can't keep track of all the           physical cards in her wallet and doesn't want to carry the extra bulk. <br>
     - Sarah needs a lightweight app to digitize all of her shopping loyalty cards. This app must be able to store a wide range of card types, from local cafes to large retail chains, so she can continue to earn rewards on the go. <br>
     - Sarah needs the app to be simple and fast, with the ability to scan a barcode or QR code instantly. When she's at the counter, she needs to pull up the correct card in a second, without having to navigate a complicated menu, ensuring a quick and smooth checkout             process. <br>

---

## Functional requirements

**Add new card**
  - add a custom name
  - add the barcode

**Display a list of the cards**
  - display in simple scrollable format
  - display the name and barcode
  - order cards based on preference

**Display scanable QR code**
  - display barcode at best possible quality
  - display numeric value incase scanning fails

## Non Functional requirements

**Performance**
  - App open in less than 2 seconds
  - Display barcode in less than 0.5 seconds

**Usability**
  - interface must be simple and require no training to use
  - must be operable with one hand
  - must be readable and large fonts

**Storage**
  - the app must not take more than 20 MB to install
  - consume minimal battery life

**Portablility**
  - must be useable without wifi after install

---

## Tech Stack

React Native
Expo Go
