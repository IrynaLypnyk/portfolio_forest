module.exports = function (pendingResources = []) {
  const overlay = document.getElementById('js-preloader');
  const progress = document.getElementById('js-load-percent');
  if (!overlay) return;
  const images = Array.from(document.images);
  // CSS backgrounds are not included in document.images. Use the active
  // computed styles so mobile pages only wait for their selected backgrounds.
  const backgrounds = new Set();
  document.querySelectorAll('body, body *').forEach(element => {
    const value = getComputedStyle(element).backgroundImage;
    for (const match of value.matchAll(/url\(["']?(.*?)["']?\)/g)) {
      backgrounds.add(match[1]);
    }
  });
  backgrounds.forEach(url => {
    const image = new Image();
    image.src = url;
    images.push(image);
  });
  const resources = images.map(image => new Promise(resolve => {
    if (image.complete) resolve();
    else {
      image.addEventListener('load', resolve, { once: true });
      image.addEventListener('error', resolve, { once: true });
    }
  })).concat(pendingResources);
  const originalOverflow = document.body.style.overflow;
  const started = performance.now();
  let loaded = 0;
  let finished = false;
  let revealTimer;
  const finish = () => {
    if (finished) return;
    finished = true;
    clearTimeout(timeout);
    clearTimeout(revealTimer);
    overlay.classList.add('done');
    document.body.style.overflow = originalOverflow;
  };
  const timeout = setTimeout(finish, 5000);
  document.body.style.overflow = 'hidden';
  if (progress) progress.textContent = '0%';
  // Let the wave animation remain visible even when resources are cached.
  const reveal = () => {
    if (finished) return;
    revealTimer = setTimeout(finish, Math.max(0, 600 - (performance.now() - started)));
  };
  const update = () => {
    if (finished) return;
    loaded++;
    if (progress) progress.textContent = `${Math.round(loaded / resources.length * 100)}%`;
    if (loaded === resources.length) reveal();
  };
  if (!resources.length) {
    if (progress) progress.textContent = '100%';
    reveal();
  }
  resources.forEach(resource => Promise.resolve(resource).then(update, update));
};
