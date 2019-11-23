const gameLoop = (c: CanvasRenderingContext2D, draw: (loopCount: number) => void, loopCount = 0): void => {
  requestAnimationFrame(() => gameLoop(c, draw, loopCount + 1));
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  draw(loopCount);
};

export default gameLoop;
