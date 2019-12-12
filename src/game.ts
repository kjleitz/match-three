import gameLoop from "./game/gameLoop";
import { ctx } from "./game/canvas";
import CanvasBoard from "./game/CanvasBoard";

const scores = {} as Record<string, number>;
let moves = 10;

export interface DrawTextOptions {
  x: number;
  y: number;
  font?: string;
  color?: string;
  size?: number;
  units?: string;
  align?: CanvasTextAlign;
  baseline?: CanvasTextBaseline;
}
const drawText = (
  text: string,
  {
    x,
    y,
    font = 'Courier',
    color = 'black',
    size = 16,
    units = 'px',
    align = 'start',
    baseline = 'top',
  }: DrawTextOptions
): void => {
  ctx.fillStyle = color;
  ctx.font = `${size}${units} "${font}"`;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  ctx.fillText(text, x, y);
};

window.addEventListener('DOMContentLoaded', () => {
  const maxSize = Math.min(window.innerWidth, window.innerHeight, 500);
  const boardSize = 0.75 * maxSize;
  const boardOffset = (maxSize - boardSize) / 2;
  const boardBottom = maxSize - boardOffset;
  const boardTop = boardOffset;
  const boardLeft = boardOffset;
  const boardRight = maxSize - boardOffset;

  const board = new CanvasBoard({
    x: boardOffset,
    y: boardOffset,
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
    if (moves <= 0) {
      drawText('fin', {
        x: boardLeft + (boardSize / 2),
        y: boardTop + (boardSize / 2),
        size: 96,
        align: 'center',
        baseline: 'middle',
      });
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 1;
      ctx.strokeText('fin', boardLeft + (boardSize / 2), boardTop + (boardSize / 2));
    }

    drawText(`Moves left: ${moves}`, { x: size, y: boardBottom + 20 });

    Object.keys(scores).sort().forEach((tileType, index) => {
      const x = 20;
      const y = boardBottom + 20 + ((1 + index) * 30);
      const score = scores[tileType];
      ctx.fillStyle = tileType;
      ctx.fillRect(x, y, size, size);
      drawText(`${score > 20 ? 20 : score}/20`, { x: x + size + 10, y, size });
    });
  });

  (window as any).board = board;
});
