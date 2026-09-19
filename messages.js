/**
 * ==============================================================================
 * 🎂 SREEJA'S 21ST BIRTHDAY - CUSTOM MESSAGES & SHAYARIS CONFIGURATION
 * ==============================================================================
 * Hey Sauhardya! 👋
 * 
 * This file is where you can write and edit all your personalized messages,
 * wishes, shayaris, photo captions, and reactions for Sreeja (Shuju).
 * 
 * HOW TO EDIT:
 * 1. Simply edit the text between the quotation marks "..." or backticks `...`.
 * 2. Save this file (Ctrl + S).
 * 3. Refresh index.html in your browser - everything will automatically update!
 * ==============================================================================
 */

const birthdayMessages = {
  // Names & Titles
  recipient: {
    name: "Sreeja",
    nickname: "Shuju",
    age: 21,
    birthdayDate: "20th September"
  },
  
  sender: {
    name: "Sauhardya",
    title: "Your Luckiest Cousin & BFF"
  },

  // ============================================================================
  // NOTIFICATION SETTINGS: HOW YOU RECEIVE HER CHOSEN GIFT
  // ============================================================================
  notification: {
    // 1. Your Telegram Username (without @). Example: "Sauhardya"
    // When she selects a gift, this lets her 1-click send her choice directly into your chat!
    telegramUsername: "btriknyziole",

    // 2. Your WhatsApp Number with country code (e.g. "919876543210")
    whatsappNumber: "918710003187",

    // 3. Optional Webhook / Formspree / Web3Forms URL to get an automatic silent email
    // Example: "https://formspree.io/f/your_form_id" or Web3Forms URL
    webhookUrl: ""
  },

  // ============================================================================
  // PAGE 1: BIRTHDAY WELCOME & CAKE BLOW
  // ============================================================================
  page1: {
    badge: "✨ Special 21st Birthday Edition ✨",
    heading: "Happy 21st Birthday, Shuju! 🎂💖",
    
    // Welcome message shown on the first card
    welcomeText: [
      "To the most wonderful sister, best friend, and partner-in-crime...",
      "Welcome to your official 21st Birthday Wish! Today is all about celebrating YOU, your pyaari si smile, and all the precious moments we share."
    ],
    
    // Instructions for the interactive cake
    candlePrompt: "Tap the candles to blow them out & make a wish! 🕯️",
    candleBlownMessage: "🎉 Yay! Aapki saari ichchayein poori ho jayee.. choo! Now, let's unlock your birthday surprises...",
    
    buttonText: "Unwrap Your Birthday Surprises 🎁"
  },

  // ============================================================================
  // PAGE 2: MEMORY LANE (PHOTO CAROUSEL & CAPTIONS)
  // ============================================================================
  page2: {
    heading: "21 Years of Pure Sunshine 📸💕",
    subtitle: "A stroll down memory lane with your favorite cousin...",
    
    // Captions for the photos in the slideshow
    // You can write specific captions for each photo here!
    photos: [
      {
        src: "assets/optimized/photo_2023-12-05_13-28-46.jpg",
        caption: "Always bringing that bright radiant smile! ✨",
        date: "December 2023"
      },
      {
        src: "assets/optimized/photo_2024-02-20_22-47-28.jpg",
        caption: "Late night talks and endless laughter 🌙",
        date: "February 2024"
      },
      {
        src: "assets/optimized/photo_2024-02-20_22-48-36.jpg",
        caption: "Unfiltered, candid, and 100% pure Shuju vibes! 🌸",
        date: "February 2024"
      },
      {
        src: "assets/optimized/photo_2024-12-03_18-30-58.jpg",
        caption: "The golu molu naughty version of you 🪲",
        date: "Childhood Memories"
      },
      {
        src: "assets/optimized/photo_2025-01-25_13-26-54.jpg",
        caption: "Surrounded by plushies and my love 💫",
        date: "January 2025"
      },
      {
        src: "assets/optimized/photo_2025-02-27_22-36-09.jpg",
        caption: "That calm, beautiful aesthetic you pull off so effortlessly 🌿",
        date: "February 2025"
      },
      {
        src: "assets/optimized/IMG_20230408_173705.jpg",
        caption: "That sneaky fearless picture ☀️",
        date: "April 2023"
      },
      {
        src: "assets/optimized/IMG_20230410_081620.jpg",
        caption: "Snowflake Sreeja ❄️",
        date: "April 2023"
      },
      {
        src: "assets/optimized/IMG_20230410_103323.jpg",
        caption: "Unforgettable moments spent together! 💛",
        date: "April 2023"
      },
      {
        src: "assets/optimized/photo_2026-09-19_21-06-29.jpg",
        caption: "The Hollywood star of all time! 🎀",
        date: "August 2023"
      },
      {
        src: "assets/optimized/photo_2026-09-19_21-06-29 (2).jpg",
        caption: "Chunri k peeche kya hai? Tatti 😂",
        date: "August 2023"
      }
    ],

    buttonText: "Claim Your Birthday Gift 🎁 ➔"
  },

  // ============================================================================
  // PAGE 3: INTERACTIVE BIRTHDAY GIFT MENU
  // ============================================================================
  page3: {
    heading: "Pick Your 21st Birthday Gift! 🎁✨",
    subtitle: "Choose any one gift from the menu below. Cousin Sauhardya is legally & emotionally obligated to deliver it! 😉",
    
    // Custom reaction text for each of the 8 gifts
    giftReactions: {
      lipstick: {
        title: "💄 Shade Hunter Mode Activated!",
        message: "Oho! Lipstick it is! Get ready to test different shades of pink and nude until we find your absolute dream color. Sauhardya is on official duty!"
      },
      nailpolish: {
        title: "💅 Grow your nails!",
        message: "Nail polish selected! Prepare for glossy, sparkly nails fit for a 21-year-old queen. Color recommendations incoming!"
      },
      snacks: {
        title: "🥨 Unlimited Midnight Munchies!",
        message: "Snacks locked in! A giant basket of chips, choco, munchies and more is coming your way for your next binge session!"
      },
      chocolates: {
        title: "🍫 Sweetest Chocolates for Shuju!",
        message: "Chocolates claimed! Rich, silky, melt-in-mouth chocolates delivered straight to you. Zero calorie counting allowed on birthdays!"
      },
      "jaadu ki jhappi": {
        title: "🤗 The Ultimate Jaadu Ki Jhappi!",
        message: "The warmest, tightest bear hug reserved exclusively for my favorite cousin. No matter the distance, this hug is guaranteed forever!"
      },
      "waffle party": {
        title: "🧇 Crispy Waffle Extravaganza!",
        message: "Waffle party on! Crispy, warm waffles and a scoop of vanilla ice cream! You need to come with me to the waffle shop for this one!"
      },
      "phuchka party": {
        title: "🥟 Extreme Teekha Phuchka Challenge!",
        message: "Phuchka party unlocked! Crispy puris, spicy aloo, and khatta-meetha water. Cousin Sauhardya is sponsoring unlimited rounds!"
      },
      kissy: {
        title: "💋 Lots of Cousin Love & Kissies!",
        message: "A sweet kiss on the forehead with all the blessings, love, and protection in the world. Always got your back, Shuju!"
      }
    },

    buttonText: "Read Your Special Letter 💌 ➔"
  },

  // ============================================================================
  // PAGE 4: THE GOLDEN BIRTHDAY LETTER & SHAYARIS
  // ============================================================================
  page4: {
    heading: "A Special Letter for Your 21st 💌",
    subtitle: "From Your Luckiest Cousin...",
    
    // Salutation
    salutation: "Dear Sreeja,",

    // Opening letter paragraph
    openingParagraph: `I hope this letter finds you with a healthy, glowing, and smiling face! Today you step into 21 — an age of dreams, freedom, growth, and endless possibilities. You always appreciate the warmth of heartfelt words, and on this milestone birthday, I wanted to put together a little piece of my heart just for you.`,

    // Custom colored Shayari stanzas (Just like in Treasure!)
    // Feel free to replace these stanzas with your brand new 21st birthday poetry!
    shayaris: [
      {
        colorName: "brown",
        colorCode: "#8D4004",
        lines: [
          "Daasta shuru hui bachpan ke us anokhe andaaz se,",
          "Memories banti gayi pyaare logo k saath se..",
          "Waqt badla, mausam badle, par rishta raha first class,",
          "Aaj ikkisve janamdin par dua hai, har pal ho hamesha khaas!"
        ]
      },
      {
        colorName: "green",
        colorCode: "#1B7A2B",
        lines: [
          "Zindagi ki raahon mein jab aayi tum bankar roshni,",
          "Har mushkil lagne lagi aasan, har khushi bani dugni..",
          "BFF keh lo ya sabse pyaari cousin meri tum,",
          "Tumhari baato ke aage feeka parr jaaye har gham!"
        ]
      },
      {
        colorName: "purple",
        colorCode: "#701A75",
        lines: [
          "Bharosa kya hota hai, yeh maine tumse hai jaana,",
          "Bina bole har baat samajh lena, bas tumhi ko hai aana..",
          "Secrets hamare rahein hamesha safe aur sacred,",
          "Duniya chahe jo bhi kahe, the bond needs to be celebrated!"
        ]
      },
      {
        colorName: "teal",
        colorCode: "#0E7490",
        lines: [
          "Nobita ko Doraemon ki, Motu ko Patlu ki zaroorat jaise,",
          "Mujhe tumhari dosti aur saath ki aadat hai waise..",
          "21 saal ki ho gayi ho Shuju, par bachpana mat khona,",
          "Cousin tera hamesha saath hai, kabhi akela mat hona!",
          "(BF k payee bhule jais seta alada bepar 🤧)"
        ]
      }
    ],

    // Middle & Closing reflections
    bodyParagraphs: [
      `Watching you grow into this intelligent (thora sa), kind, beautiful and piyakkar young woman fills my heart with so much pride. As you turn 21 today on 20th September, I want you to remember that whatever life throws your way, you have an unwavering cheerleader in me.`,
      `Believe it or not, I am always there if you need someone to share your joys, sorrows, or even your random thoughts. Kokhono bhabbi na I am busy, I won't listen or anything.. mind it!`,
      `Keep that contagious laugh alive, chase all your wildest ambitions, and never forget that our bond is carved in gold. Here's to more deep conversations, more shared secrets, and a lifetime of being best friends.`,
      `And once again a very special thanks for being the best vault of all my secrets, the most understanding cousin, and the most loving friend. I am truly lucky to have you in my life.`,
      `Happy Birthday Sreeja! Love you to the moon and back! 💖`
    ],

    // Sign-off
    closing: "One of your biggest supporters,",
    signature: "Your Luckiest Cousin,\nSauhardya ❤️",

    buttonText: "One Final Surprise! 🥂 ➔"
  },

  // ============================================================================
  // PAGE 5: GRAND FINALE & SIGNING OFF
  // ============================================================================
  page5: {
    heading: "Happy 21st, Sreeja! Let's Celebrate! 🎉💃",
    subtitle: "Cheers to 21 years of magic, memories, and madness!",
    
    // Signing off message
    signingOffText: [
      "You have officially reached the end of this 21st birthday wish, and now you are legally allowed to marry anyone (maybe Sanu)!",
      "I hope this brought a huge smile to your face today. You deserve all the happiness, good health, and success this universe has to offer.",
      "Now close this tab, grab your birthday cake, and photo de story te status a post a! 🍰🛵💨"
    ],

    cheersNote: "Cheers to 21 Wonderful & Tearful Years!! 🥂✨",

    replayButtonText: "Watch It Again 🔄",
    confettiButtonText: "Shower Confetti! 🎊"
  }
};

// Make it available globally in browser
if (typeof window !== "undefined") {
  window.birthdayMessages = birthdayMessages;
}
