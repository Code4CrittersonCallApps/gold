/* Gold Games config. Edit this list to swap games; the page renders it.
   Rules: 3 core games plus 1 swap-in slot. To fill the slot, give it an href and set status:"live".
   Moved out of Gold Games (still live in the free Critters Play hub):
     - Critter Match  -> Gold Lessons (matching lesson)
     - Ducks to Bed   -> free hub only: https://code4crittersoncallapps.github.io/critters-play/ducks-to-bed.html */
window.GOLD_PLAY = "https://code4crittersoncallapps.github.io/critters-play/";
window.GOLD_GAMES = [
  {
    id: "pyrenees",
    title: "Pyrenees Guard",
    problem: "Earn game",
    solves: "For the kid who wants to earn something",
    note: "Beat 400 in one run to unlock Stead Spin. Prizes are real and claimed at the farm.",
    href: "pyrenees-guard.html",
    thumb: "assets/sophie.png",
    tone: "earn",
    status: "live"
  },
  {
    id: "barn-cat",
    title: "Barncat Defender",
    problem: "Calm-down game",
    solves: "For the kid who needs to calm down",
    note: "Slow, easy and gentle, with soft music. No rush.",
    href: "barn-cat.html?calm=1",
    emoji: "🐈‍⬛",
    tone: "calm",
    status: "live"
  },
  {
    id: "evade-elon",
    title: "Evade Elon",
    problem: "Focus game",
    solves: "For the kid who needs to lock in and focus",
    note: "The hard one. Feed the crew and dodge Elon. Beat 600 to unlock Stead Spin.",
    href: "evade-elon.html",
    emoji: "🦆",
    tone: "focus",
    status: "live"
  },
  {
    id: "swap",
    title: "Coming soon",
    problem: "Swap-in slot",
    solves: "A new Gold game rotates in here",
    note: "Members get the next game first.",
    href: null,
    emoji: "✨",
    tone: "soon",
    status: "soon"
  }
];
