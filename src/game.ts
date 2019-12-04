import gameLoop from "./game/gameLoop";
import { ctx } from "./game/canvas";
import CanvasBoard from "./game/CanvasBoard";

window.addEventListener('DOMContentLoaded', () => {
  const board = new CanvasBoard({
    width: Math.min(window.innerWidth, window.innerHeight, 500),
    rowCount: 10,
    colCount: 10,
  });

  board.onDragEnd((event) => {
    board.swapTile(event.origin, event.destination);
    const shapes = board.matchShapes();
    if (!shapes.length) board.swapTile(event.origin, event.destination);
  });

  gameLoop(ctx, (_loopCount) => {
    board.draw(ctx);
    board.update();
  });

  (window as any).board = board;
});
