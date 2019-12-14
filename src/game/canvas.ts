const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d')!;
if (!ctx) console.error("Canvas '2d' context is not supported.");

const sizeCanvas = (): void => {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width * devicePixelRatio;
  canvas.height = height * devicePixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.scale(devicePixelRatio, devicePixelRatio);
};

window.addEventListener('DOMContentLoaded', () => {
  sizeCanvas();
  window.addEventListener('resize', sizeCanvas);
  document.body.appendChild(canvas);
});

export { ctx };
export default canvas;
