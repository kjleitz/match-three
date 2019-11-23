import Board from "../Board";
import CanvasTile from "./CanvasTile";
import { rand } from "../utilities";

export type SwapDirection = 'none'|'up'|'down'|'left'|'right';

export default class CanvasBoard extends Board<CanvasTile> {
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  constructor(opts: Partial<CanvasBoard>) {
    const { x, y, width, height, ...boardOpts } = opts;
    super({
      ...boardOpts,
      tileTypes: opts.tileTypes || ['red', 'green', 'blue', 'yellow'],
      tileGenerator() {
        return new CanvasTile({
          type: this.tileTypes[Math.floor(rand(0, this.tileTypes.length))],
          width: this.width / this.colCount,
          height: this.height / this.rowCount,
          colorIsType: true,
        });
      },
    });

    this.x = x || 0;
    this.y = y || 0;
    this.width = width || this.colCount * 50;
    this.height = height || this.rowCount * 50;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.rows.forEach((row, rowIndex) => {
      row.forEach((tile, tileIndex) => {
        const x = this.x + tileIndex * tile.width;
        const y = this.y + rowIndex * tile.height;
        tile.draw(ctx, x, y);
      });
    });
  }

  tileAt(pos: { x: number; y: number }): { row: number; col: number; tile: null|CanvasTile } {
    const x = pos.x - this.x;
    const y = pos.y - this.y;
    if (x > this.width || y > this.height) return { row: -1, col: -1, tile: null };

    const fractionX = x / this.width;
    const fractionY = y / this.height;
    const row = Math.floor(fractionY * this.rowCount);
    const col = Math.floor(fractionX * this.colCount);
    const tile = this.rows[row][col];
    return { row, col, tile };
  }

  swapTile(at: { x: number; y: number }, direction: SwapDirection): void {
    const original = this.tileAt(at);
    if (!original.tile) return;

    let { row, col } = original;
    switch (direction) {
      case 'up': row -= 1; break;
      case 'down': row += 1; break;
      case 'left': col -= 1; break;
      case 'right': col += 1; break;
    }

    const destinationTile = this.rows[row][col];
    if (!destinationTile) return;

    this.rows[row][col] = original.tile;
    this.rows[original.row][original.col] = destinationTile;
  }
}
