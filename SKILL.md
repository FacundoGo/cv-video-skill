---
name: cv-video
description: Use when someone wants an animated video CV (career story in about 45 seconds) with their own voiceover and word-synced captions, rendered from an HTML template with no video editor.
---

# CV Video

Turn a career into a 40-50 second animated video (1080x1350, 4:5, works on X and LinkedIn): a hook, three phases (Foundation, Building, Leading), an About screen and a call to action, with burned-in captions synced to the person's own voice.

## 1. Gather the story (ask, don't invent)
Ask for, or read from their CV:
- Name, current role and city, a smiling portrait photo, website, LinkedIn.
- Foundation: education and courses (degrees, bootcamps, certifications), with years.
- Building: things they built, not job titles. 3 rows, each with a concrete result.
- Leading: how their leadership grew (first hire, peak team size, budget), plus 3 numbers.
- About: cities lived in, side projects, hobbies, GitHub.
Rules: only use numbers the person gives you. Ask what they are not allowed to say about their current employer and leave it out. No arrows in on-screen text (write "from X to Y" or "3 days, down from 2 weeks").

## 2. Write the script (about 120 words, 45 s)
- Line 1, the hook: "Hiring a [role]? Here's [N] years in [N] seconds."
- One short paragraph per phase, starting with its name ("Foundation.", "Building.", "Leading.").
- One sentence for About, one for the call to action.
- Give it as plain text with commas and full stops for pauses, no timings. The person records it (e.g. ElevenLabs, speed ~1.0-1.1) and sends the mp3.

## 3. Fill the template
- Copy `template/` and edit `template/content.js`: text, rows, stats, chips, photo path.
- Run `python3 scripts/timing.py voice.mp3` to list speech segments, then set `timing.scenes` (start/end of each screen), `timing.lines` (one caption per sentence, with the index of the highlighted word) and the `cues`/`at` times for rows, chips and stats so each item appears when it is spoken.

## 4. Check, then render
- Open `template/index.html` with `?` in a browser and call `render(t)` for a few moments (one per screen), or screenshot them with Playwright. Fix overflows before the full render.
- Render: `cd template && npm install`, then from the repo root `node scripts/render.js voice.mp3 cv-video.mp4` (needs ffmpeg).
- Check the final file plays sound to the end.

## Design system (keep it consistent)
Off-white background with a faint dot grid, Geist and Geist Mono, near-black text, one highlighter accent (#D9F24E) only on the key phrase per screen. A progress bar fills through the three phases. Rows rise in as they are spoken, numbers count up, the highlighter wipes across key phrases, captions sit in a black box at the bottom with each word lighting up when spoken. The hook types a prompt ("Summarize X's career in 40 seconds") so the video reads as an answer.
