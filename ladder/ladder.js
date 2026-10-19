/* App Ladder · concept preview. Nothing here charges, sends, or saves to a server.
   Prices are TBD except Gold ($50). Blanks (____) are decisions for Michael. */
(function () {
  var GOLD = "../";
  var REVIEW = "https://g.page/r/CS74JMTm3xrWEAE/review";
  var SERVICES = "https://www.sheehanhomestead.com/services";
  var BOOK = "https://code4crittersoncallapps.github.io/critters-on-call/book/?product=";
  var PLAY = "https://code4crittersoncallapps.github.io/critters-play/";
  var SPEC = "https://github.com/Code4CrittersonCallApps/gold/blob/main/ladder/BOX-SPEC.md";

  var PACKAGE_NAMES = [
    { name: "The Whole Herd", why: "Plays off the farm's 'whole car' ticket: everything, the whole family, the whole herd.", pick: true },
    { name: "Red Barn Academy", why: "The red barn under the live oak is already the brand picture." },
    { name: "Live Oak Scholars", why: "Rooted, grows for years; quieter and more 'school' sounding." },
    { name: "Pasture Pass", why: "Short and member-card friendly; sits well beside Gold." },
    { name: "Critter Campus", why: "Fun for kids, ties straight to Critters on Call." }
  ];
  var BIG = PACKAGE_NAMES.filter(function (p) { return p.pick; })[0].name;
  /* Top personalized tier: working names from Michael */
  var TOP_NAMES = [
    { name: "Peace of Mind", why: "Michael's working name. Says what a parent buys: someone has the plan handled.", pick: true },
    { name: "Full Support", why: "Michael's alternate. Plain and clear about the hours and help included." }
  ];
  var TOP = TOP_NAMES[0].name;
  var SPIN = "https://code4crittersoncallapps.github.io/critters-on-call/giving-wheel/";
  var PLAY_TEST = "https://support.google.com/googleplay/android-developer/answer/14151465?hl=en";
  var GOOGLE_REVIEWS = "https://support.google.com/contributionpolicy/answer/7400114?hl=en";
  var BOOKBUSTER = "https://herijax.com/bookbuster-sale/";

  var state = { hubSkin: "hub", credit: "farm", plan: {}, helper: {} };
  var CH = '<svg class="door-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>';
  var EXT = '<svg class="door-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';

  function tile(o) {
    var ext = /^(https?:|mailto:|\.\.\/)/.test(o.href || "");
    var attrs = o.href ? ' href="' + o.href + '"' + (ext ? ' target="_blank" rel="noopener"' : "") : "";
    var tag = o.href ? "a" : "div";
    return "<" + tag + ' class="door' + (o.rung ? " rung" : "") + (o.soon ? " is-soon" : "") + '"' + attrs + ">" +
      (o.rung ? '<span class="rung-num">' + o.rung + "</span>" : "") +
      '<span class="door-emoji" aria-hidden="true">' + (o.emoji || "•") + "</span>" +
      '<span class="door-body">' +
      (o.tag ? '<span class="door-tag">' + o.tag + "</span>" : "") +
      '<span class="door-title">' + o.title + "</span>" +
      '<span class="door-desc">' + o.note + "</span>" +
      (o.chips ? '<span class="chips">' + o.chips + "</span>" : "") +
      "</span>" + (o.href ? (ext ? EXT : CH) : "") + "</" + tag + ">";
  }
  function chip(t, cls) { return '<span class="chip ' + (cls || "") + '">' + t + "</span>"; }
  function back(to, label) { return '<a class="back-up" href="#' + to + '">← ' + label + "</a>"; }
  function head(title, lede, b) { return '<div class="section-head">' + (b || "") + '<h1 class="page">' + title + '</h1><p class="lede-sm">' + lede + "</p></div>"; }
  function blank(t) { return '<span class="blank-line">' + (t || "____") + "</span>"; }
  function pay(tier, prices) {
    var p = state.plan[tier] || "upfront";
    var opts = [["upfront", "Upfront", prices.upfront], ["monthly", "Monthly", prices.monthly], ["quarterly", "Quarterly", prices.quarterly]];
    return '<div class="card"><div class="kick">How you pay</div><p>Pick a plan, like an app subscription.</p><div class="pay" data-pay="' + tier + '">' +
      opts.map(function (o) { return '<button type="button" data-plan="' + o[0] + '" class="' + (p === o[0] ? "is-on" : "") + '"><small>' + o[1] + "</small><b>" + o[2] + "</b></button>"; }).join("") +
      '</div><p class="note">' + (prices.note || "Prices TBD. Nothing is charged in this preview.") + "</p></div>";
  }

  var V = {};
  V.home = function () {
    function node(href, em, title, sub, cls) { return '<a class="fnode ' + (cls || "") + '" href="' + href + '"' + (/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : "") + '><span class="fem">' + em + '</span><span><b>' + title + "</b><small>" + sub + "</small></span></a>"; }
    var arrow = '<div class="farrow" aria-hidden="true">↓</div>';
    var map = '<div class="fmap" aria-label="Member map">' +
      '<div class="kick">The whole map</div>' +
      node(SPIN, "🎡", "Stead Spin", "Prospects spin. Gold is a prize.", "is-free") + arrow +
      node("#gold", "🎫", "Gold app", "$50 · games, lessons, perks, wheels", "is-gold") + arrow +
      node("#hub", "📚", "Enrichment", "Enrichment Plus · Homeschool Hub · Enrichment Hub", "is-hub") + arrow +
      node("#herd", "🐐", BIG, "Optional big family package", "is-herd") + arrow +
      node("#custom", "✨", TOP, "Personalized plan · full support", "is-top") +
      '<div class="fside-label">Side doors</div><div class="fside">' +
      node("#helper", "🧑‍🌾", "Helper", "Staff training") +
      node("#ambassador", "⭐", "Ambassador", "Better wheel") +
      node("#beta", "🧪", "Founding 20", "Beta testers") +
      node("#adult", "🎓", "Adult", "Coming soon") +
      "</div></div>";
    return head("One app. Every member.", "Same shell for everyone. Each step unlocks more. Tap any box.") + map +
      '<div class="kick" style="margin-top:0.6rem">The ladder</div>' +
      tile({ href: SPIN, emoji: "🎡", tag: "Free · prospects", title: "Stead Spin", note: "The free prize wheel. Anyone can spin, and Gold is one of the prizes.", chips: chip("Free") + chip("Can win Gold") }) +
      tile({ rung: 1, href: "#gold", emoji: "🎫", tag: "Gold · $50", title: "Gold", note: "Games, lessons, perks and two prize wheels. Live today.", chips: chip("3 games") + chip("Lessons") + chip("Perks") + chip("2 wheels") }) +
      tile({ rung: 2, href: "#hub", emoji: "📚", tag: "Enrichment · brand TBD", title: skinName(), note: "A STEM kit plus classes from real teachers, tutoring hours and a farm or mobile credit.", chips: chip("Everything in Gold", "also") + chip("STEM kit") + chip("Classes") + chip("Tutoring") }) +
      tile({ rung: 3, href: "#herd", emoji: "🐐", tag: "Big package", title: BIG, note: "The whole family plan: more tutoring, farm and mobile credits, family dashboard.", chips: chip("Everything in Enrichment", "also") + chip("More hours") + chip("Both credits") }) +
      tile({ rung: 4, href: "#custom", emoji: "✨", tag: "Top tier · working name", title: TOP, note: "Personalized software and a personal learning plan. More hours for more dollars.", chips: chip("Personal plan") + chip("Pick your hours") }) +
      '<div class="kick" style="margin-top:0.6rem">Side doors</div>' +
      tile({ href: "#helper", emoji: "🧑‍🌾", tag: "Staff & helpers", title: "Helper app", note: "A slightly better Gold for our helpers: paid training, a badge and a t-shirt.", chips: chip("Everything in Gold", "also") + chip("Paid training") + chip("Badge") }) +
      tile({ href: "#ambassador", emoji: "⭐", tag: "Five-Star level", title: "Ambassador", note: "A slightly better wheel for people who refer families to us." }) +
      tile({ href: "#beta", emoji: "🧪", tag: "Founding 20", title: "Founding 20 beta testers", note: "The first 20 families help build the app. They're also our Android test group." }) +
      tile({ href: "#adult", emoji: "🎓", tag: "Coming soon", title: "Adult classes", note: "SAT prep, business, coding, languages, writing and more." }) +
      '<div class="kick" style="margin-top:0.6rem">Planning</div>' +
      tile({ href: "#names", emoji: "🏷️", tag: "Decision", title: "Name the packages", note: "Five big-package names (" + BIG + " is the default) plus the top-tier working names." }) +
      tile({ href: "#box", emoji: "📦", tag: "Product concept", title: "The boxed kit", note: "A pretty shipped box and a Marketplace pickup version, both with app access inside." }) +
      '<p class="footer-tiny">Concept preview · not a working app · prices TBD except Gold $50</p>';
  };
  V.gold = function () {
    return head("Gold", "What every member gets. This rung is live now.", back("home", "Ladder")) +
      tile({ href: GOLD + "#games", emoji: "🎮", tag: "3 games + 1 coming", title: "Games", note: "Earn (Pyrenees Guard), calm down (Barncat Defender), focus (Evade Elon)." }) +
      tile({ href: GOLD + "#lessons", emoji: "📖", tag: "Learn", title: "Lessons", note: "How to hold animals safely, animal facts, Critter Match, Farm School." }) +
      tile({ href: GOLD + "#perks", emoji: "🎟️", tag: "What's included", title: "Perks", note: "Free $25 farm ticket, free $25 gift, about 40% off mobile visits." }) +
      tile({ href: GOLD + "#wheels", emoji: "🎡", tag: "1 spin each a month", title: "Two wheels", note: "Referral wheel and the Stead Spin gift wheel. Send a spin to a friend." }) +
      pay("gold", { upfront: "$50", monthly: "TBD", quarterly: "TBD", note: "Gold is $50 and the $50 goes toward a booking. Monthly and quarterly are placeholders." });
  };
  var HUB_SKINS = { hub: ["Homeschool Hub", "Framed for homeschool families who want a full plan."], plus: ["Enrichment Plus", "Framed for after-school and enrichment families."], ehub: ["Enrichment Hub", "A neutral name that works for both audiences."] };
  function skinName() { return HUB_SKINS[state.hubSkin][0]; }
  V.hub = function () {
    return head(skinName(), "A STEM kit in the mail (KiwiCo-style) plus our learning app. One product, three brand names to choose from.", back("home", "Ladder")) +
      '<div class="toggle toggle-3" data-toggle="skin">' + Object.keys(HUB_SKINS).map(function (k) { return '<button type="button" data-v="' + k + '" class="' + (state.hubSkin === k ? "is-on" : "") + '">' + HUB_SKINS[k][0] + "</button>"; }).join("") + "</div>" +
      '<p class="note">' + skinName() + ": " + HUB_SKINS[state.hubSkin][1] + " Brand choice is open.</p>" +
      tile({ href: "#box", emoji: "📦", tag: "Monthly kit", title: "The STEM kit", note: "A box with a lab, a syllabus mini-magazine and an app access card.", chips: chip("Lab") + chip("Syllabus") + chip("QR access") }) +
      tile({ href: "#hub-classes", emoji: "🧮", tag: "Preloaded", title: "Classes", note: "Math, English Language Arts and Science, plus Gold lessons.", chips: chip("Math") + chip("ELA") + chip("Science") + chip("Also in Gold", "also") }) +
      tile({ href: "#hub-teachers", emoji: "👩‍🏫", tag: "Real teachers", title: "Meet your teachers", note: "Taught by Ann-Marie's teacher friends. We help teachers teach." }) +
      tile({ emoji: "⏱️", tag: "Included", title: "Tutoring", note: "Includes " + blank() + " hours of tutoring per " + blank("term") + "." }) +
      tile({ href: "#hub-credit", emoji: "🚚", tag: "Included", title: "Programming credit", note: "A flat " + blank("$___") + " credit for farm or mobile programming." }) +
      tile({ soon: true, emoji: "🎓", tag: "Coming soon", title: "SAT prep & adult ed", note: "Taught by Michael. Coming later." }) +
      pay("hub", { upfront: "TBD", monthly: "TBD", quarterly: "TBD" });
  };
  var CLASSES = {
    math: { t: "Math", e: "🧮", units: ["Counting the herd (number sense)", "Feed math: measuring and fractions", "Egg-carton multiplication", "Graphing the weather"] },
    ela: { t: "English Language Arts", e: "✏️", units: ["Read-aloud: farm stories", "Write a field journal", "Animal 'how-to' writing", "Spelling with the barn crew"] },
    life: { t: "Life science & animals", e: "🐰", units: ["Animal needs: food, water, shelter", "Life cycles: chick to hen", "Habitats on the homestead", "How guardian dogs protect a flock"] },
    earth: { t: "Earth science", e: "🌎", units: ["Soil and compost", "Florida weather and storms", "Water on the farm", "Rocks under the pasture"] },
    physics: { t: "Physics labs", e: "🧲", units: ["Ramps and rolling (gravity)", "Mason-jar vacuum lab", "Simple machines on the farm", "Build-a-barn with blocks"] },
    chem: { t: "Chemistry & kitchen labs", e: "🧪", units: ["Kitchen pH with cabbage juice", "Eggs: float or sink", "Butter in a jar", "Baking soda volcano barn"] }
  };
  V["hub-classes"] = function () {
    return head("Classes", "Preloaded and ready. Tap a class to see its units.", back("hub", skinName())) +
      tile({ href: "#class-math", emoji: "🧮", tag: "Class", title: "Math", note: "Number sense, measuring and graphing with farm problems." }) +
      tile({ href: "#class-ela", emoji: "✏️", tag: "Class", title: "English Language Arts", note: "Reading, field journals and writing about animals." }) +
      tile({ href: "#hub-science", emoji: "🔬", tag: "Class · 4 areas", title: "Science", note: "Life science and animals, earth science, physics labs, chemistry and kitchen labs." }) +
      '<div class="kick" style="margin-top:0.5rem">Also in Gold</div>' +
      tile({ href: GOLD + "#hold", emoji: "🤲", tag: "Also in Gold", title: "How to hold animals safely", note: "Same lesson Gold members get.", chips: chip("Also in Gold", "also") }) +
      tile({ href: GOLD + "#facts", emoji: "📚", tag: "Also in Gold", title: "Animal facts", note: "25 true facts from our herd.", chips: chip("Also in Gold", "also") }) +
      tile({ href: PLAY + "farm-school/", emoji: "🏫", tag: "Also in Gold", title: "Farm School", note: "Five short lessons and a five-question check.", chips: chip("Also in Gold", "also") });
  };
  V["hub-science"] = function () {
    return head("Science", "Four areas. Hands-on labs a parent can run at home or at the farm.", back("hub-classes", "Classes")) +
      ["life", "earth", "physics", "chem"].map(function (k) { var c = CLASSES[k]; return tile({ href: "#class-" + k, emoji: c.e, tag: "Science", title: c.t, note: c.units.slice(0, 2).join(" · ") + "…" }); }).join("");
  };
  Object.keys(CLASSES).forEach(function (k) {
    V["class-" + k] = function () {
      var c = CLASSES[k];
      var up = (k === "math" || k === "ela") ? ["hub-classes", "Classes"] : ["hub-science", "Science"];
      return head(c.e + " " + c.t, "Sample units (concept). Teachers set the real syllabus.", back(up[0], up[1])) +
        c.units.map(function (u, i) { return '<div class="card"><div class="kick">Unit ' + (i + 1) + "</div><h3>" + u + "</h3><p>Video lesson · printable · " + (i % 2 ? "farm-visit tie-in" : "at-home lab") + "</p></div>"; }).join("") +
        '<p class="note">Taught by a teacher from <a href="#hub-teachers">Meet your teachers</a>.</p>';
    };
  });
  V["hub-teachers"] = function () {
    var t = [["👩‍🔬", "Ann-Marie", "Lead teacher · STEM on Call", "Builds the plan and picks the teachers."], ["👩‍🏫", "Teacher " + "____", "Math", "One of Ann-Marie's teacher friends (name TBD)."], ["👨‍🏫", "Teacher ____", "English Language Arts", "Name TBD."], ["👩‍🌾", "Teacher ____", "Science labs", "Name TBD."]];
    return head("Meet your teachers", "Real teachers from Ann-Marie's network. The business helps teachers earn by teaching what they love.", back("hub", skinName())) +
      t.map(function (x) { return '<div class="card teach"><span class="av">' + x[0] + '</span><span><div class="kick">' + x[2] + "</div><h3>" + x[1] + "</h3><p>" + x[3] + "</p></span></div>"; }).join("") +
      tile({ href: "mailto:sheehanhomestead@gmail.com?subject=Teach%20with%20Critters%20on%20Call", emoji: "✉️", tag: "For teachers", title: "Teach with us", note: "Opens an email draft. Nothing is sent automatically." });
  };
  V["hub-credit"] = function () {
    var farm = state.credit === "farm";
    return head("Programming credit", "Placeholder: pick how the flat credit is used.", back("hub", skinName())) +
      '<div class="toggle" data-toggle="credit"><button type="button" data-v="farm" class="' + (farm ? "is-on" : "") + '">Farm credit</button><button type="button" data-v="mobile" class="' + (!farm ? "is-on" : "") + '">Mobile credit</button></div>' +
      '<div class="card" style="margin-top:0.5rem"><div class="kick">' + (farm ? "Farm" : "Mobile") + " credit</div><h3>" + blank("$___") + " flat credit</h3><p>" +
      (farm ? "Use it on farm visits, homeschool classes or field trips at the homestead." : "Use it when we bring the animals to you: a backyard or co-op visit.") + "</p></div>" +
      tile({ href: farm ? BOOK + "homeschool-bundle" : BOOK + "mini-petting-zoo", emoji: farm ? "🏡" : "🚚", tag: "Book", title: farm ? "Book a farm class" : "Book a mobile visit", note: "Opens the booking form." });
  };
  V.herd = function () {
    return head(BIG, "The big package. Name is a placeholder; see the other options.", back("home", "Ladder")) +
      tile({ emoji: "📚", tag: "Included", title: "Everything in " + skinName(), note: "All classes, teachers and Gold perks.", chips: chip("Everything in Hub", "also") }) +
      tile({ emoji: "⏱️", tag: "More", title: "More tutoring", note: blank() + " hours of tutoring per " + blank("term") + "." }) +
      tile({ emoji: "🚚", tag: "More", title: "Farm and mobile credit", note: "Both credits, " + blank("$___") + " each." }) +
      tile({ emoji: "👨‍👩‍👧", tag: "Family", title: "Family dashboard", note: "Every kid's progress in one place." }) +
      tile({ href: "#names", emoji: "🏷️", tag: "Decision", title: "Rename this package", note: "See all five name options." }) +
      pay("herd", { upfront: "TBD", monthly: "TBD", quarterly: "TBD" });
  };
  V.custom = function () {
    var h = state.hours || 10;
    return head(TOP, "Working name (alt: Full Support). The top tier: personalized software built around one learner, with a STEM kit. More hours for more dollars.", back("home", "Ladder")) +
      '<div class="card"><div class="kick">Personal dashboard (preview)</div><h3>Ava · age 9</h3><p>This week: Life cycles lab · 2 tutoring sessions · Farm visit Sat</p><div class="progress"><i style="width:62%"></i></div><p class="note">Sample data only.</p></div>' +
      tile({ emoji: "🗺️", tag: "Plan", title: "Personal learning plan", note: "A teacher maps goals, classes and labs for this learner." }) +
      '<div class="card"><div class="kick">Pick your hours</div><h3><span id="hrs">' + h + "</span> tutoring hours</h3>" +
      '<input type="range" min="5" max="40" step="5" value="' + h + '" id="hours" style="width:100%" aria-label="Tutoring hours" />' +
      '<p>Price: <b>TBD</b> · scales with hours</p></div>' +
      tile({ href: "#beta", emoji: "🧪", tag: "Pilots", title: "Personalized-plan pilots", note: "First families trying the personal plan (Founding 20)." }) +
      pay("custom", { upfront: "TBD", monthly: "TBD", quarterly: "TBD" });
  };
  var MODULES = [
    ["animals", "Training on the animals", "Each animal: how to hold, lead, rest and read its mood."],
    ["safety", "FAQs & safety", "What guests ask, hand washing, gates, bites and first aid."],
    ["where", "Where to go", "The farm map, event check-in, parking and load-out."],
    ["etiquette", "Etiquette & responsibilities", "How we talk to guests, phones away, who does what."],
    ["compliance", "Compliance", "Contractor paperwork, policies and event rules."]
  ];
  V.helper = function () {
    var done = MODULES.filter(function (m) { return state.helper[m[0]]; }).length;
    var all = done === MODULES.length;
    return head("Helper app", "For our helpers and staff. Everything in Gold, plus paid training.", back("home", "Ladder")) +
      '<div class="card"><div class="kick">How helpers work</div><p>Helpers are 1099 independent contractors. You are paid for finishing training (amount ' + blank("$___") + '), and the t-shirt is a bonus for finishing.</p></div>' +
      '<div class="card"><div class="kick">Training · ' + done + " of " + MODULES.length + ' done</div><div class="progress"><i style="width:' + (done / MODULES.length * 100) + '%"></i></div>' +
      MODULES.map(function (m) { return '<label class="check"><input type="checkbox" data-mod="' + m[0] + '"' + (state.helper[m[0]] ? " checked" : "") + " /><span><b>" + m[1] + "</b><br><small style=\"color:var(--muted)\">" + m[2] + "</small></span></label>"; }).join("") +
      '<p class="note">Preview: tick boxes to see the badge unlock. Real modules would have a short quiz.</p></div>' +
      '<div class="badge-big' + (all ? " is-earned" : "") + '"><div class="em">🏅</div><div class="kick">' + (all ? "Badge earned" : "Finish all modules") + "</div><p class=\"note\">Certified Critters on Call Helper</p></div>" +
      '<div class="card"><div class="kick">Training bonus</div><h3>Claim your t-shirt</h3><p>Finish all training modules to claim your helper t-shirt. Your training pay is separate.</p>' +
      '<a class="btn btn-primary btn-block" href="sms:9142631311?&body=I%20finished%20Helper%20training%20-%20t-shirt%20size%3A%20" aria-disabled="' + (all ? "false" : "true") + '">' + (all ? "Claim my t-shirt" : "Locked until training is done") + "</a></div>" +
      '<div class="card"><div class="kick">Optional</div><h3>Leave us a review</h3><p>If you had a good experience, an honest Google review helps the farm. No reward for reviewing, and it has nothing to do with your t-shirt.</p>' +
      '<a class="btn btn-outline btn-block" href="' + REVIEW + '" target="_blank" rel="noopener">Write a review</a></div>' +
      tile({ href: "#grow", emoji: "🌱", tag: "Grow with us", title: "Grow with us", note: "Internships, volunteering and jobs that don't exist yet." }) +
      tile({ href: GOLD, emoji: "🎫", tag: "Also in Gold", title: "Your Gold app", note: "Games, lessons, perks and wheels." }) +
      pay("helper", { upfront: "Free", monthly: "—", quarterly: "—", note: "Concept: free for active helpers. Helpers are paid for training; they don't pay for the app." });
  };
  V.names = function () {
    return head("Name the packages", "Five options that fit the farm. Default in this preview: " + BIG + ".", back("home", "Ladder")) +
      PACKAGE_NAMES.map(function (p, i) { return '<div class="card"><div class="kick">' + (p.pick ? "Default pick" : "Option " + (i + 1)) + "</div><h3>" + p.name + "</h3><p>" + p.why + "</p></div>"; }).join("") +
      '<div class="kick" style="margin-top:0.6rem">Top personalized tier</div>' +
      TOP_NAMES.map(function (p) { return '<div class="card"><div class="kick">' + (p.pick ? "Working name" : "Alternate") + "</div><h3>" + p.name + "</h3><p>" + p.why + "</p></div>"; }).join("") +
      '<div class="kick" style="margin-top:0.6rem">Enrichment brand</div><div class="card"><p>Enrichment Plus · Homeschool Hub · Enrichment Hub. Same product; pick one name, or use two for two audiences.</p></div>' +
      '<p class="note">Avoid "Homeschool Scholar" as a name: the Oct 10 membership-ladder draft already uses it for a different tier.</p>';
  };
  V.box = function () {
    return head("The boxed kit", "A physical learning kit with app access inside. Concept only; nothing ordered.", back("home", "Ladder")) +
      '<div class="card"><div class="kick">What is inside</div><div class="chips">' + chip("🪪 QR access card") + chip("📰 Syllabus mini-magazine") + chip("🧪 Simple lab") + chip("👕 T-shirt or sticker") + "</div></div>" +
      '<div class="card"><div class="kick">Shipped box · eBay & cross-state</div><h3>The pretty box</h3><p>Printed mailer box · laminated QR / access-code card · syllabus mini-magazine · simple lab · merch slot (t-shirt or sticker).</p></div>' +
      '<div class="card"><div class="kick">Marketplace pickup</div><h3>The upcycled kit</h3><p>Stamped kraft box · mason-jar vacuum lab · thrifted building blocks · rubber stamps · same QR card and syllabus.</p></div>' +
      tile({ href: SPEC, emoji: "📄", tag: "Spec", title: "Box spec, sourcing & selling rules", note: "Box suppliers with prices, plus eBay and Marketplace notes." });
  };

  V.grow = function () {
    return head("Grow with us", "For people who want to do more than one event with us.", back("helper", "Helper app")) +
      tile({ emoji: "🎓", tag: "Students", title: "Internships", note: "Animal care, STEM teaching, events and marketing. Spots TBD." }) +
      tile({ emoji: "🤝", tag: "Community", title: "Volunteer", note: "Farm days, fairs and Violet ticket events." }) +
      tile({ emoji: "🚀", tag: "Future", title: "Jobs that don't exist yet", note: "We're growing. Tell us what you're great at and we'll build a role around it." }) +
      tile({ href: "mailto:sheehanhomestead@gmail.com?subject=Grow%20with%20Critters%20on%20Call", emoji: "✉️", tag: "Get in touch", title: "Tell us about you", note: "Opens an email draft. Nothing is sent automatically." });
  };
  V.ambassador = function () {
    return head("Ambassador", "The Five-Star level: a slightly better wheel for people who send families our way.", back("home", "Ladder")) +
      '<div class="card"><div class="kick">How you become one</div><p>Refer families, host a party, bring us to your school or church. ' + blank("___") + " referrals makes you an Ambassador.</p></div>" +
      '<div class="card"><div class="kick">Your better wheel</div><h3>Ambassador wheel</h3><p>' + blank("2") + " spins a month instead of 1, plus bigger slices (like a free party add-on or a Gold card to give away).</p></div>" +
      tile({ href: GOLD + "#wheels", emoji: "🎡", tag: "Today", title: "Gold wheels", note: "Your regular referral and gift wheels." }) +
      '<div class="card"><div class="kick">Review rule</div><p>This level is never earned by leaving a review, and never tied to a star rating. Google bans rewards for reviews. Anyone can leave an honest review, with no reward.</p><p><a href="' + GOOGLE_REVIEWS + '" target="_blank" rel="noopener">Google review policy →</a></p></div>' +
      '<p class="note">Naming note: "Five-Star" can sound like a 5-star review is required. Use it as a level name only, or call it Ambassador.</p>';
  };
  var PILOTS = ["Godson Daniel", "Emily & Jeremy's kids", "Paige Courtney's kid", "Nathan", "Amy & Bill's family"];
  V.beta = function () {
    return head("Founding 20", "Our first 20 beta-testing families. They shape the app, get early access and a Founding badge.", back("home", "Ladder")) +
      '<div class="card"><div class="kick">' + PILOTS.length + " of 20 seats penciled</div><div class=\"progress\"><i style=\"width:" + (PILOTS.length / 20 * 100) + '%"></i></div><p>Founding testers get early features, a say in what we build, and their name on the Founding wall.</p></div>' +
      '<div class="kick" style="margin-top:0.5rem">Personalized-plan pilots (placeholders)</div>' +
      PILOTS.map(function (n) { return '<div class="card teach"><span class="av">🧒</span><span><div class="kick">Pilot · ' + TOP + "</div><h3>" + n + "</h3><p>Plan: " + blank("TBD") + " · Start: " + blank("TBD") + "</p></span></div>"; }).join("") +
      '<div class="card"><div class="kick">Android testing pool</div><p>Google Play makes new personal developer accounts run a closed test with at least 12 testers, opted in for 14 days in a row, before the app can go to production. The Founding 20 cover that with room to spare.</p><p><a href="' + PLAY_TEST + '" target="_blank" rel="noopener">Google Play testing rules →</a></p></div>' +
      '<div class="card"><div class="kick">Where to find more testers</div><p>Jacksonville homeschool curriculum sale (HERI BookBuster). The 2026 sale was June 27, so plan for the 2027 one. It is a used-curriculum consignment sale, so ask HERI whether a kit table or flyer is allowed.</p><p><a href="' + BOOKBUSTER + '" target="_blank" rel="noopener">HERI BookBuster →</a></p></div>';
  };
  V.adult = function () {
    var t = [["📝", "SAT prep & adult ed", "Taught by Michael."], ["💼", "Business classes", "Start and run a small business."], ["💻", "Coding", "Beginner to first app."], ["🗣️", "Languages", "Conversation-first."], ["✍️", "Writing", "Clear writing for work and life."], ["🎤", "Comedy", "Researching."]];
    return head("Adult classes", "Coming soon. The same app, for grown-ups.", back("home", "Ladder")) +
      t.map(function (x) { return tile({ soon: true, emoji: x[0], tag: x[1] === "Comedy" ? "Researching" : "Coming soon", title: x[1], note: x[2] }); }).join("");
  };

  var SKIN = { home: "gold", gold: "gold", hub: null, herd: "herd", custom: "custom", helper: "helper", grow: "helper", names: "herd", box: "gold", ambassador: "gold", beta: "custom", adult: "herd" };
  var NAVP = { "hub-classes": "hub", "hub-science": "hub", "hub-teachers": "hub", "hub-credit": "hub", names: "home", box: "home", grow: "helper", ambassador: "home", beta: "home", adult: "home" };
  var lastRoute = null;
  function render() {
    var r = (location.hash || "#home").slice(1);
    if (!V[r]) r = "home";
    var parent = NAVP[r] || (r.indexOf("class-") === 0 ? "hub" : r);
    var skin = SKIN[r] || (parent === "hub" ? state.hubSkin : "gold");
    document.body.className = "skin-" + skin;
    document.getElementById("brand-title").textContent = parent === "hub" ? skinName() : (parent === "helper" ? "Critters on Call · Helper" : "Critters on Call");
    document.getElementById("view").innerHTML = V[r]();
    document.querySelectorAll(".nav-link").forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("data-go") === parent); });
    if (lastRoute !== r) window.scrollTo(0, 0);
    lastRoute = r;
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    var pg = b.parentElement;
    if (pg.dataset.pay) { state.plan[pg.dataset.pay] = b.dataset.plan; render(); }
    else if (pg.dataset.toggle === "skin") { state.hubSkin = b.dataset.v; render(); }
    else if (pg.dataset.toggle === "credit") { state.credit = b.dataset.v; render(); }
  });
  document.addEventListener("change", function (e) {
    if (e.target.dataset && e.target.dataset.mod) { state.helper[e.target.dataset.mod] = e.target.checked; render(); }
  });
  document.addEventListener("input", function (e) {
    if (e.target.id === "hours") { state.hours = +e.target.value; document.getElementById("hrs").textContent = e.target.value; }
  });
  window.addEventListener("hashchange", render);
  render();
})();
