// Edit this file with your own story. Everything on screen comes from here.
// Times are in seconds and should match your voiceover (see scripts/timing.py).
window.CV = {
  name: "Alex Rivera",
  role: "product lead · lisbon",
  photo: "photo.jpg",                 // square-ish portrait, smiling works best
  url: "alexrivera.dev",
  linkedin: "linkedin.com/in/alexrivera",

  hook: {
    prompt: "Summarize Alex's career in 40 seconds",
    line1: "Hiring a<br>product lead?",
    mark: "Here's 10 years",
    rest: "in 40 seconds."
  },

  phases: [
    {
      kicker: "// 01 · always learning", title: "Foundation", years: "2012 – today",
      rows: [
        { y: "2012–15", t: "University of Somewhere", s: "BSc Economics" },
        { y: "2015–17", t: "Consulting firm", s: "strategy and operations" },
        { y: "2018", t: "Business school", s: "MSc Innovation" },
        { y: "2021", t: "Coding bootcamp", s: "JavaScript, React, Node" },
        { y: "2024", t: "AI product course", s: "AI PM certification" }
      ],
      cues: [5.3, 6.9, 8.9, 10.6, 12.0]
    },
    {
      kicker: "// 02 · what I built", title: "Building", years: "2017 – today",
      rows: [
        { y: "health", t: "A remote patient monitoring app", s: "from prototype to 20 clinics" },
        { y: "ventures", t: "4 new products, zero to one", s: "fintech, travel, retail · one to 10,000 users" },
        { y: "growth", t: "An experimentation program", s: "30+ tests · +18% conversion" }
      ],
      cues: [16.6, 18.8, 23.1],
      chips: { label: "builds with", items: ["Claude", "ChatGPT", "Figma", "Vercel", "Supabase", "React"], at: 26.0 }
    },
    {
      kicker: "// 03 · leading people", title: "Leading", years: "2019 – today",
      rows: [
        { y: "2019–22", t: "From first hire to Head of Product", s: "designers, engineers, analysts" },
        { y: "2022–24", t: "Product Director", s: "three squads, one roadmap" },
        { y: "today", t: "Product Lead · team of 5", s: "strategy, process, AI prototypes" }
      ],
      cues: [29.6, 31.9, 35.1],
      stats: [
        { v: "12", label: "people led at peak", at: 31.3 },
        { v: "€2.1M", label: "budget owned", at: 33.2 },
        { v: "4 days", label: "idea to prototype", at: 37.0 }
      ]
    }
  ],

  about: {
    kicker: "// outside the job", a: "6 cities.", mark: "1 habit.",
    groups: [
      { label: "lived in", chips: ["Madrid", "London", "Toronto", "Berlin", "Lisbon"], now: true, at: 39.0 },
      { label: "side projects", projects: [{ t: "project-one.com", s: "live, 2k users" }, { t: "project-two", s: "AI tool" }, { t: "newsletter", s: "weekly" }], at: 40.7 },
      { label: "off the clock", chips: ["Running · 3 marathons", "Piano", "github.com/alexrivera"], at: 42.0 }
    ]
  },

  cta: { tagline: "Product leader<br>who still builds.", headline: "See everything at", button: "Visit alexrivera.dev" },

  timing: {
    // [start, end] of each screen
    scenes: { hook: [0, 4.2], p1: [4.2, 15.7], p2: [15.7, 28.7], p3: [28.7, 38.8], about: [38.8, 43.2], cta: [43.2, 47.2] },
    // captions: [start, end, text, index of the highlighted word or -1]
    lines: [
      [0, 1.2, "Hiring a product lead?", -1],
      [1.6, 3.8, "Here's ten years in forty seconds.", 1],
      [4.2, 4.9, "Foundation.", 0],
      [5.3, 10.2, "Economics, consulting, and an innovation master's.", 3],
      [10.6, 15.3, "Then I learned to code, and to build products with AI.", 11],
      [15.7, 22.8, "Building. Health tech, four new products, one to ten thousand users.", 0],
      [23.1, 28.3, "An experimentation program. I don't just spec products. I ship them.", 10],
      [28.7, 34.8, "Leading. From my first hire to Head of Product.", 0],
      [35.1, 38.4, "Today I'm Product Lead, still building with AI.", 7],
      [38.8, 42.8, "Six cities, one habit: practice, measure, get a bit better.", 3]
    ]
  }
};
