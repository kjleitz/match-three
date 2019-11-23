export class Mouse {
  public x = 0;
  public y = 0;
  public pressed = false;
  public pressedStartPos: { x: number; y: number };

  constructor() {
    this.pressedStartPos = { x: this.x, y: this.y };

    window.addEventListener('mousedown', (event) => {
      this.populateFromMouseEvent(event);
    });
    window.addEventListener('mousemove', (event) => {
      this.populateFromMouseEvent(event);
    });
    window.addEventListener('mouseup', (event) => {
      this.populateFromMouseEvent(event);
    });

    window.addEventListener('touchstart', (event) => {
      this.populateFromTouchEvent(event);
    });
    window.addEventListener('touchmove', (event) => {
      this.populateFromTouchEvent(event);
    });
    window.addEventListener('touchend', (event) => {
      this.populateFromTouchEvent(event);
    });
  }

  get dragVector(): { x: number; y: number } {
    const { x, y } = this.pressedStartPos;
    return this.pressed ? { x: this.x - x, y: this.y - y } : { x: 0, y: 0 };
  }

  get dragDirection(): 'none'|'up'|'down'|'left'|'right' {
    const { x, y } = this.dragVector;
    if (x === 0 && y === 0) return 'none';

    if (Math.abs(x) >= Math.abs(y)) {
      return x < 0 ? 'left' : 'right';
    } else {
      return y < 0 ? 'up' : 'down';
    }
  }

  populateFromMouseEvent(event: MouseEvent): void {
    this.x = event.x;
    this.y = event.y;
    const alreadyPressed = this.pressed;
    this.pressed = event.buttons === 1;
    if (this.pressed && !alreadyPressed) {
      this.pressedStartPos = { x: this.x, y: this.y };
    }
  }

  populateFromTouchEvent(event: TouchEvent): void {
    const { touches } = event;
    if (touches.length === 0) {
      this.pressed = false;
    } else {
      const touch = touches[0];
      this.x = touch.clientX;
      this.y = touch.clientY;
      this.pressed = true;
    }
  }
}

const mouse = new Mouse();

export default mouse;
