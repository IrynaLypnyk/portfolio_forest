const vertexSource = require('../shaders/water.vert');
const fragmentSource = require('../shaders/water.frag');

// Shader adapted from Lucas Bebber / Codrops; see THIRD_PARTY_NOTICES.md.
// The runtime uses native WebGL and has no animation-library dependencies.
function createWater(host) {
  const canvas = document.createElement('canvas');
  canvas.className = 'water-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, powerPreference: 'low-power' });
  if (!gl) return () => {};

  let disposed = false;
  let ready = false;
  let visible = true;
  let frame = 0;
  let lastTime = 0;
  let time = 0;
  let size;
  let resizeObserver;
  let intersectionObserver;
  const resources = [];
  const events = new AbortController();
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    events.abort();
    resizeObserver?.disconnect();
    intersectionObserver?.disconnect();
    resources.reverse().forEach(remove => remove());
    canvas.remove();
    host.classList.remove('water-background');
  }

  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    dispose(); // Keep the CSS image visible if the GPU context is lost.
  }, { signal: events.signal });

  function compile(type, source) {
    const shader = gl.createShader(type);
    resources.push(() => gl.deleteShader(shader));
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('Water shader compilation failed');
    return shader;
  }

  function loadImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('Water image could not load'));
      image.src = url;
    });
  }

  async function start() {
    const program = gl.createProgram();
    resources.push(() => gl.deleteProgram(program));
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Water shader linking failed');
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    resources.push(() => gl.deleteBuffer(buffer));
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const uniforms = Object.fromEntries(['time', 'mouse', 'dpi', 'resolution', 'uvScale', 'uvOffset', 'image', 'maps']
      .map(name => [name, gl.getUniformLocation(program, `u_${name}`)]));

    const images = await Promise.all([
      loadImage('assets/images/water.jpg'),
      loadImage('assets/images/water-maps.jpg'),
    ]);
    if (disposed) return;
    const textureLimit = Math.min(2048, gl.getParameter(gl.MAX_TEXTURE_SIZE));
    images.forEach((image, index) => {
      const texture = gl.createTexture();
      resources.push(() => gl.deleteTexture(texture));
      gl.activeTexture(gl.TEXTURE0 + index);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      const scale = Math.min(1, textureLimit / Math.max(image.width, image.height));
      const resized = document.createElement('canvas');
      resized.width = Math.round(image.width * scale);
      resized.height = Math.round(image.height * scale);
      resized.getContext('2d').drawImage(image, 0, 0, resized.width, resized.height);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, resized);
      gl.uniform1i(index === 0 ? uniforms.image : uniforms.maps, index);
    });

    if (gl.getError() !== gl.NO_ERROR) throw new Error('Water textures could not be uploaded');

    host.classList.add('water-background');
    host.prepend(canvas);
    const imageAspect = images[0].width / images[0].height;

    function resize() {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      const dpi = Math.min(window.devicePixelRatio || 1, 1.5);
      const key = `${width}:${height}:${dpi}`;
      if (key === size) return;
      size = key;
      canvas.width = Math.round(width * dpi);
      canvas.height = Math.round(height * dpi);
      gl.viewport(0, 0, canvas.width, canvas.height);
      const aspect = width / height;
      const scaleX = Math.min(1, aspect / imageAspect);
      const scaleY = Math.min(1, imageAspect / aspect);
      // Match the centred CSS background on the welcome page.
      const alignY = 0.5;
      gl.uniform2f(uniforms.uvScale, scaleX, scaleY);
      gl.uniform2f(uniforms.uvOffset, (1 - scaleX) * 0.5, (1 - scaleY) * alignY);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform1f(uniforms.dpi, dpi);
    }

    function render(now) {
      frame = 0;
      if (disposed || !visible || document.hidden) return;
      const delta = lastTime ? Math.min(now - lastTime, 50) : 0;
      lastTime = now;
      time += delta / (1000 / 60);
      const smoothing = 1 - Math.exp(-delta / 250);
      pointer.x += (pointer.targetX - pointer.x) * smoothing;
      pointer.y += (pointer.targetY - pointer.y) * smoothing;
      gl.uniform1f(uniforms.time, time);
      gl.uniform2f(uniforms.mouse, pointer.x, pointer.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      canvas.classList.add('is-ready');
      frame = requestAnimationFrame(render);
    }

    function syncAnimation() {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      if (ready && !disposed && visible && !document.hidden) frame = requestAnimationFrame(render);
    }

    resize();
    ready = true;
    resizeObserver = new ResizeObserver(() => { resize(); });
    resizeObserver.observe(host);
    intersectionObserver = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      syncAnimation();
    });
    intersectionObserver.observe(host);
    document.addEventListener('visibilitychange', syncAnimation, { signal: events.signal });
    window.addEventListener('resize', resize, { signal: events.signal });
    host.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse') return;
      const rect = host.getBoundingClientRect();
      pointer.targetX = 1 - 2 * (event.clientX - rect.left) / rect.width;
      pointer.targetY = 1 - 2 * (event.clientY - rect.top) / rect.height;
    }, { signal: events.signal, passive: true });
    host.addEventListener('pointerleave', () => {
      pointer.targetX = 0;
      pointer.targetY = 0;
    }, { signal: events.signal });
    syncAnimation();
  }

  start().catch(dispose);
  return dispose;
}

module.exports = function () {
  const host = document.querySelector('#welcome .welcome');
  if (!host) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let cleanup;
  const update = () => {
    cleanup?.();
    cleanup = motion.matches ? undefined : createWater(host);
  };
  motion.addEventListener('change', update);
  update();
};
