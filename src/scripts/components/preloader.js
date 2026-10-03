module.exports = function () {
  const overlay = document.getElementById('js-preloader');
  const progress = document.getElementById('js-load-percent');
  if (!overlay) return;
  const images = Array.from(document.images);
  const originalOverflow = document.body.style.overflow;
  let loaded = 0;
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    clearTimeout(timeout);
    overlay.classList.add('done');
    document.body.style.overflow = originalOverflow;
  };
  const timeout = setTimeout(finish, 5000);
  document.body.style.overflow = 'hidden';
  const update = () => {
    loaded++;
    if (progress) progress.textContent = `${Math.round(loaded / images.length * 100)}%`;
    if (loaded === images.length) finish();
  };
  if (!images.length) finish();
  images.forEach(image => {
    if (image.complete) update();
    else {
      image.addEventListener('load', update, { once: true });
      image.addEventListener('error', update, { once: true });
    }
  });
};
