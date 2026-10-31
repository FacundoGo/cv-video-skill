// Usage (from the repo root):
//   node scripts/render.js [voice.mp3] [out.mp4]
// Renders template/index.html frame by frame at 30 fps, then muxes the voice with ffmpeg.
const path = require('path'), fs = require('fs'), { execFileSync } = require('child_process');
const tpl = path.join(__dirname, '..', 'template');
const { chromium } = require(path.join(tpl, 'node_modules', 'playwright'));
const voice = process.argv[2], out = process.argv[3] || 'cv-video.mp4';
const FPS = 30, frames = path.join(tpl, '.frames');
(async () => {
  fs.rmSync(frames, { recursive: true, force: true }); fs.mkdirSync(frames);
  const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  p.on('pageerror', e => console.log('page error:', e.message));
  await p.goto('file://' + path.join(tpl, 'index.html'));
  await p.waitForFunction('window.READY', null, { timeout: 30000 });
  const dur = await p.evaluate('DUR'), n = Math.round(dur * FPS);
  for (let i = 0; i < n; i++) {
    await p.evaluate(t => render(t), i / FPS);
    await p.screenshot({ path: path.join(frames, String(i).padStart(5, '0') + '.jpg'), type: 'jpeg', quality: 92 });
    if (i % 150 === 0) console.log(`frame ${i}/${n}`);
  }
  await b.close();
  const args = ['-y', '-framerate', String(FPS), '-i', path.join(frames, '%05d.jpg')];
  if (voice) args.push('-i', voice, '-filter_complex', `[1:a]aresample=44100,apad=whole_dur=${dur},loudnorm=I=-15:TP=-1.5[a]`, '-map', '0:v', '-map', '[a]', '-c:a', 'aac', '-b:a', '192k');
  args.push('-t', String(dur), '-c:v', 'libx264', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out);
  execFileSync('ffmpeg', args, { stdio: 'inherit' });
  console.log('done:', out);
})();
