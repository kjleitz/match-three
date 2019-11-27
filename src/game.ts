import gameLoop from "./game/gameLoop";
import { ctx } from "./game/canvas";
import CanvasBoard, { CoordPosition } from "./game/CanvasBoard";
import CanvasTile from "./game/CanvasTile";

const MATCH_ANIMATION_MS = 250;

const applySelectedStyle = (tile: CanvasTile, { x, y }: CoordPosition): void => {
  const { width, height } = tile;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fillRect(x, y, width, height);
};

const applyTargetedStyle = (tile: CanvasTile, { x, y }: CoordPosition): void => {
  const { width, height } = tile;
  const millis = new Date().getTime();
  const pulseMs = 250;
  const minStroke = 2;
  const maxStroke = 5;
  const strokeWidth = minStroke + (Math.sin((millis / pulseMs) % Math.PI) * (maxStroke - minStroke));
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = tile.color;
  ctx.fillRect(x + strokeWidth, y + strokeWidth, width - (strokeWidth * 2), height - (strokeWidth * 2));
};

const applyMatchedStyle = (tile: CanvasTile, { x, y }: CoordPosition): void => {
  const { width, height, color } = tile;
  if (!tile.matchedAt) return;

  const msSinceMatch = new Date().getTime() - tile.matchedAt.getTime();
  const percentDone = msSinceMatch > MATCH_ANIMATION_MS ? 1 : msSinceMatch / MATCH_ANIMATION_MS;
  const horizontal = percentDone * (width / 2);
  const vertical = percentDone * (height / 2);
  ctx.fillStyle = '#FFF';
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = color;
  ctx.fillRect(x + horizontal, y + vertical, width - (horizontal * 2), height - (vertical * 2));
};

const board = new CanvasBoard({
  rowCount: 10,
  colCount: 10,
  matchAnimationMs: MATCH_ANIMATION_MS,
  applySelectedStyle,
  applyTargetedStyle,
  applyMatchedStyle,
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
