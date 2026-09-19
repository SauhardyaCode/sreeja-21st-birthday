# 🎂 Sreeja's 21st Birthday Celebration Website ✨

A cute, interactive, static birthday celebration website crafted with love for **Sreeja (Shuju)** on her **21st Birthday** (20th September) by her cousin **Sauhardya**.

---

## 🌟 Interactive Features

- **⏳ Cute Asset Preloader Screen (Zero Loading Delays)**:
  - While all high-res photos, GIFs, and fonts load in the background, a cute preloader screen keeps her hooked:
    - Bouncing birthday cake with glowing animated sparkles (`🎂 ✨ 💖 🌟`).
    - Real-time pastel candy-stripe progress bar (`0%` to `100%`).
    - Rotating playful quotes (*"Baking Sreeja's 21st Birthday Cake... 🎂"*, *"Gathering 21 years of golden memories... 📸"*, *"Ironing Cousin Sauhardya's party suit... 👔"*, etc.).
  - The website **only reveals once all assets are 100% loaded**, ensuring instantaneous transitions without broken or popping images!
- **Page 1 (The Welcome & Animated Candle Blow)**:
  - Features `pic_start.jpg` in a cute Polaroid frame with tape and caption.
  - Cute `start.gif` mascot.
  - **Animated 21st Birthday Cake**:
    - Animated flickering candle flames (`cake_lit.gif`).
    - Tap anywhere on the cake to **actually blow out the candles**: wind whoosh sound effect, candle flames blowing out and extinguishing (`cake_blown.gif`), rising cartoon smoke puffs 💨, and a confetti cannon blast!
    - Tap again to playfully re-light the candles!
- **Page 2 (Memory Lane Carousel)**:
  - Responsive photo carousel featuring memories from 2023 to 2026.
  - Polaroid frame design with washi tape, soft shadows, and custom captions.
  - Interactive "Send Love ❤️" floating hearts effect.
  - Touch-swipe gestures for mobile and dot navigation.
- **Page 3 (Interactive Gift Selection & Instant Notification Dispatch)**:
  - Interactive menu where she can choose **any one gift** from:
    1. 💄 **Lipstick**
    2. 💅 **Nailpolish**
    3. 🥨 **Snacks**
    4. 🍫 **Chocolates**
    5. 🤗 **Jaadu Ki Jhappi**
    6. 🧇 **Waffle Party**
    7. 🥟 **Phuchka Party**
    8. 💋 **Kissy**
  - Confetti burst upon picking a gift!
  - Instant official **"Birthday Claim Voucher"** stamped with custom reaction commentary for each choice.
  - **Direct Notification Dispatch**:
    - ✈️ **Send to Sauhardya on Telegram**: 1-click opens Telegram with a pre-filled message (*"Hey Sauhardya! For my 21st Birthday, I officially claim: [Gift]! Coupon: BDAY21-SHUJU..."*).
    - 💬 **Send via WhatsApp**: 1-click share via WhatsApp.
    - 📋 **Copy Voucher Code**: Copies claim text to clipboard.
    - **Proceed Reminder Modal**: When clicking *"Read Your Special Letter ➔"*, if she hasn't dispatched it yet, a cute reminder pops up to notify Sauhardya right now so he can prepare it!
    - **Optional Silent Webhook**: Supports silent email dispatch via Formspree or Web3Forms.
- **Page 4 (The Golden Birthday Letter & Shayaris)**:
  - Beautiful parchment letter aesthetic.
  - 4 custom color-coded Shayari stanzas (brown, green, purple, teal) continuing the cherished *Treasure* tradition.
  - Heartfelt cousin message and sign-off.
- **Page 5 (Grand Finale & Playable Birthday Drums)**:
  - Features `pic_end.jpg` in a celebratory Polaroid frame.
  - Displays her **Officially Claimed Gift** lock-in badge!
  - Cute dancing celebration GIFs (`dance.gif`, `bye.gif`).
  - **🥁 Playable Birthday Drum Kit** (in place of simple confetti/hearts buttons):
    - 🥁 **Bass Drum / Kick**: Deep, punchy acoustic boom!
    - 💥 **Snare Drum**: Crisp, snappy crack with wire rattle!
    - 🪘 **Tom / Bongo**: Resonant melodic beats!
    - ✨ **Crash Cymbal**: Shimmering metallic crash with sparkle burst!
    - 🥁🔥 **"Play Birthday Drumroll & Crash!"**: Rapid energetic drumroll culminating in a loud crash & confetti cannon!
    - Floating musical notes (🎵 🎶 🥁 ✨) fly up with every hit!
  - Cheerful sign-off referencing Telegram, stories, and cake!
- **🎵 Auto-Looping Background Melody**:
  - Plays the gentle music-box birthday melody on loop right from the start.
  - Mute/play toggle button on the top navigation bar.

---

## 📲 How to Receive Her Gift Notification

Open **[`messages.js`](messages.js)**. Near the top you will find:

```javascript
notification: {
  // 1. Put your Telegram username (without @). Example: "Sauhardya"
  // When she clicks "Send on Telegram", it opens your chat directly with her claim!
  telegramUsername: "YOUR_TELEGRAM_HANDLE",

  // 2. Or your WhatsApp number (e.g. "919876543210")
  whatsappNumber: "",

  // 3. Optional: A Formspree / Web3Forms endpoint for silent email notification
  webhookUrl: ""
}
```

---

## 🚀 How to Run Locally

Simply double-click **`index.html`** in this folder to open it directly in Google Chrome, Edge, or Safari.

---

## 🌐 How to Deploy (Free & Instant)

### Option A: Netlify Drop (Fastest - 30 seconds!)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop this entire `pictures-birthday` folder into the upload box.
3. You will instantly get a live public URL (e.g. `https://happy-21st-sreeja.netlify.app`) to share with her on Telegram!

### Option B: GitHub Pages
1. Initialize git and push this folder to a GitHub repository:
   ```powershell
   git init
   git add .
   git commit -m "Happy 21st Birthday Sreeja!"
   git remote add origin https://github.com/YourUsername/sreeja-21st-birthday.git
   git branch -M main
   git push -u origin main
   ```
2. Go to repository **Settings ➔ Pages** ➔ select `main` branch ➔ **Save**.
