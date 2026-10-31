"""Print the speech segments of a voiceover so you can fill template/content.js timing.

Usage: python3 scripts/timing.py voice.mp3 [min_pause_seconds]
Each line is "start - end" of a stretch of speech. Match them to your script lines.
"""
import re, subprocess, sys

f = sys.argv[1]
d = sys.argv[2] if len(sys.argv) > 2 else "0.18"
dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f],
                           capture_output=True, text=True).stdout.strip())
log = subprocess.run(["ffmpeg", "-i", f, "-af", f"silencedetect=n=-38dB:d={d}", "-f", "null", "-"],
                     capture_output=True, text=True).stderr
starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", log)]
ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", log)]
t = 0.0
for s, e in zip(starts, ends):
    if s - t > 0.05:
        print(f"{t:6.2f} - {s:6.2f}")
    t = e
if dur - t > 0.05:
    print(f"{t:6.2f} - {dur:6.2f}")
print(f"total: {dur:.2f} s")
