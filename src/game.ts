import gameLoop from "./game/gameLoop";
import { ctx } from "./game/canvas";
import CanvasBoard, { SwapDirection } from "./game/CanvasBoard";
import mouse from "./game/mouse";

const board = new CanvasBoard({ rowCount: 12, colCount: 12 });
let mouseWasPressed = false;
let swapDirection = 'none' as SwapDirection;
gameLoop(ctx, (_loopCount) => {
  board.draw(ctx);
  const mouseIsPressed = mouse.pressed;
  if (mouseIsPressed) {
    mouseWasPressed = true;
    swapDirection = mouse.dragDirection;
  } else if (mouseWasPressed) {
    board.swapTile(mouse.pressedStartPos, swapDirection);
    mouseWasPressed = false;
    swapDirection = 'none';
  }
});
