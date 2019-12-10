import gameLoop from "./game/gameLoop";
import { ctx } from "./game/canvas";
import CanvasBoard from "./game/CanvasBoard";

const scores = {} as Record<string, number>;
let moves = 10;

window.addEventListener('DOMContentLoaded', () => {
  const boardSize = Math.min(window.innerWidth, window.innerHeight, 500);

  const board = new CanvasBoard({
    width: boardSize,
    rowCount: 9,
    colCount: 9,
    onTileMatched: (tile) => {
      scores[tile.type] = scores[tile.type] || 0;
      scores[tile.type] += 1;
    },
  });

  board.onDragEnd((event) => {
    if (moves <= 0) return;

    board.swapTile(event.origin, event.destination);
    const shapes = board.matchShapes();
    if (shapes.length) {
      moves--;
    } else {
      board.swapTile(event.origin, event.destination);
    }
  });

  gameLoop(ctx, (_loopCount) => {
    board.draw(ctx);
    board.update();

    const size = 24;
    ctx.fillStyle = 'black';
    ctx.font = `${size}px Courier`;
    if (moves <= 0) {
      ctx.fillText('FIN', size, boardSize + 20);
    } else {
      ctx.fillText(`Moves left: ${moves}`, size, boardSize + 20);
    }

    Object.keys(scores).sort().forEach((tileType, index) => {
      const x = 20;
      const y = boardSize + 20 + ((1 + index) * 30);
      const score = scores[tileType];
      ctx.fillStyle = tileType;
      ctx.fillRect(x, y, size, size);
      ctx.fillStyle = 'black';
      ctx.font = `${size}px Courier`;
      ctx.fillText(`${score}/20`, x  + size + 10, y + (0.85 * size));
    });
  });

  (window as any).board = board;
});
