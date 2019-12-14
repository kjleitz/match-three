import gameLoop from "./game/gameLoop";
import { ctx } from "./game/canvas";
import CanvasBoard from "./game/CanvasBoard";
import { drawHeart, drawSquare, drawCircle, drawStar, drawTriangle } from "./concerns/drawing";

const scores = {} as Record<string, number>;
const MAX_MOVES = 10;
let movesLeft = MAX_MOVES;

export interface DrawTextOptions {
  x: number;
  y: number;
  font?: string;
  color?: string;
  size?: number;
  style?: ''|'bold'|'italic';
  units?: string;
  align?: CanvasTextAlign;
  baseline?: CanvasTextBaseline;
  strokeStyle?: string;
  lineWidth?: number;
}
const drawText = (
  text: string,
  {
    x,
    y,
    font = 'Courier',
    color = 'black',
    size = 16,
    style = '',
    units = 'px',
    align = 'start',
    baseline = 'top',
    strokeStyle = '',
    lineWidth = 1,
  }: DrawTextOptions
): void => {
  ctx.fillStyle = color;
  ctx.font = `${style} ${size}${units} "${font}"`.trim();
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.fillText(text, x, y);
  if (strokeStyle) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.strokeText(text, x, y);
  }
};

window.addEventListener('DOMContentLoaded', () => {
  const maxSize = Math.min(window.innerWidth, window.innerHeight, 500);
  const gutter = 100;
  const boardSize = maxSize - gutter;
  const boardTop = 10;
  const boardBottom = boardTop + boardSize;
  const boardLeft = gutter;

  const board = new CanvasBoard({
    x: boardLeft,
    y: boardTop,
    width: boardSize,
    rowCount: 9,
    colCount: 9,
    onTileMatched: (tile) => {
      scores[tile.type] = scores[tile.type] || 0;
      scores[tile.type] += 1;
    },
  });

  board.onDragEnd((event) => {
    if (movesLeft <= 0) return;

    board.swapTile(event.origin, event.destination);
    const shapes = board.matchShapes();
    if (shapes.length) {
      movesLeft--;
    } else {
      board.swapTile(event.origin, event.destination);
    }
  });

  const tileTypes = board.tileTypes.sort();

  gameLoop(ctx, (_loopCount) => {
    board.draw(ctx);
    board.update();

    const movesBoxLeft = 10;
    const movesBoxTop = boardTop + 10;
    const movesBoxSize = gutter - 20;
    const movesBoxCenter = {
      x: movesBoxLeft + (movesBoxSize / 2),
      y: movesBoxTop + (movesBoxSize / 2),
    };

    const movesBoxRed = ((MAX_MOVES - movesLeft) / MAX_MOVES) * 255;
    const movesBoxGreen = (movesLeft / MAX_MOVES) * 200;

    drawCircle(ctx, {
      position: { x: movesBoxLeft, y: movesBoxTop },
      size: movesBoxSize,
      fillStyle: `rgb(${movesBoxRed}, ${movesBoxGreen}, 0)`,
    });

    drawText((movesLeft < 0 ? 0 : movesLeft).toString(), {
      x: movesLeft > 9 ? movesBoxCenter.x - 1 : movesBoxCenter.x,
      y: movesBoxCenter.y + 2,
      font: 'Helvetica',
      style: 'bold',
      color: 'white',
      size: movesLeft > 9 ? 48 : 64,
      align: 'center',
      baseline: 'middle',
      strokeStyle: 'rgba(255, 255, 255, 0.5)',
      lineWidth: 6,
    });

    const scoresRowHeight = 20;
    const scoresBoxPadding = 5;
    const scoresBoxLeft = movesBoxLeft;
    const scoresBoxTop = movesBoxTop + movesBoxSize + 10;
    const scoresBoxWidth = movesBoxSize;
    const scoresBoxHeight = (2 * scoresBoxPadding) + (tileTypes.length * scoresRowHeight);

    ctx.strokeStyle = 'rgba(0, 0, 255, 0.1)';
    ctx.lineWidth = 3;
    ctx.strokeRect(scoresBoxLeft, scoresBoxTop, scoresBoxWidth, scoresBoxHeight);

    tileTypes.forEach((tileType, index) => {
      const score = scores[tileType] || 0;
      const shapeForColor = {
        red: 'heart',
        orange: 'star',
        purple: 'square',
        green: 'circle',
        blue: 'triangle',
      };

      const x = scoresBoxLeft + 10;
      const y = scoresBoxTop + scoresBoxPadding + (index * scoresRowHeight);
      const shapeOpts = {
        position: { x, y },
        size: scoresRowHeight,
        fillStyle: tileType,
        scale: 0.8,
      };
      switch (shapeForColor[tileType as keyof typeof shapeForColor]) {
        case 'heart': drawHeart(ctx, shapeOpts); break;
        case 'star': drawStar(ctx, { ...shapeOpts, obesity: 1 }); break;
        case 'square': drawSquare(ctx, { ...shapeOpts, scale: 0.8 }); break;
        case 'circle': drawCircle(ctx, { ...shapeOpts, scale: 0.8 }); break;
        case 'triangle': drawTriangle(ctx, shapeOpts); break;
        default: ctx.fillStyle = tileType; ctx.fillRect(x, y, scoresRowHeight, scoresRowHeight);
      }

      const scoreTextSize = 0.6 * scoresRowHeight;
      drawText(`${score > 9 ? '' : ' '}${score > 20 ? 20 : score}/20`, {
        x: x + scoresRowHeight + 5,
        y: y + ((scoresRowHeight - scoreTextSize) / 2) + 1,
        size: scoreTextSize,
        font: 'Courier',
        style: 'bold',
        color: score >= 20 ? '#090' : '#777',
      });
    });

    const drawBigText = (text: string): void => {
      drawText(text, {
        x: boardLeft + (boardSize / 2),
        y: boardTop + (boardSize / 2),
        size: 84,
        align: 'center',
        baseline: 'middle',
        style: 'bold',
        lineWidth: 18,
        strokeStyle: 'white',
      });
      drawText(text, {
        x: boardLeft + (boardSize / 2),
        y: boardTop + (boardSize / 2),
        size: 84,
        color: 'black',
        align: 'center',
        baseline: 'middle',
        style: 'bold',
      });
    };

    if (tileTypes.every(tileType => (scores[tileType] && scores[tileType] >= 20))) {
      drawBigText('you win!');
    } else if (movesLeft <= 0) {
      drawBigText('you lose!');
    }
  });
});
