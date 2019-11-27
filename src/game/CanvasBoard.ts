import Board from "../Board";
import CanvasTile from "./CanvasTile";
import { rand, range } from "../utilities";
import mouse, { Mouse } from "./mouse";
import Shape, { defaultShapes } from "../Shape";

export type SwapDirection = 'none'|'up'|'down'|'left'|'right';

export interface PresentCanvasTileInfo {
  row: number;
  col: number;
  tile: CanvasTile;
}

export interface BlankCanvasTileInfo {
  row: -1;
  col: -1;
  tile: null;
}

export type CanvasTileInfo = PresentCanvasTileInfo | BlankCanvasTileInfo;

export interface BoardDragEvent {
  x: number;
  y: number;
  distance: number;
  direction: SwapDirection;
  origin: PresentCanvasTileInfo;
  destination: PresentCanvasTileInfo;
  mouse: Mouse;
}

export type BoardDragEventCallback = (event: BoardDragEvent) => void;

export interface CoordPosition {
  x: number;
  y: number;
}

export interface GridPosition {
  row: number;
  col: number;
}

const blankCanvasTileInfo = (): BlankCanvasTileInfo => ({ row: -1, col: -1, tile: null });

const distanceBetween = (origin: CoordPosition, destination: CoordPosition): number => {
  const dx = destination.x - origin.x;
  const dy = destination.y - origin.y;
  return Math.sqrt((dx ** 2) + (dy ** 2));
};

export default class CanvasBoard extends Board<CanvasTile> {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public sensitivity: number;
  public dragStartCallbacks: BoardDragEventCallback[] = [];
  public dragEndCallbacks: BoardDragEventCallback[] = [];
  public dragCallbacks: BoardDragEventCallback[] = [];
  public shapes: Shape[];
  public applySelectedStyle: CanvasTile['applySelectedStyle'];
  public applyTargetedStyle: CanvasTile['applyTargetedStyle'];
  public applyMatchedStyle: CanvasTile['applyMatchedStyle'];
  public matchAnimationMs: number;
  private dragOrigin: CanvasTileInfo = blankCanvasTileInfo();
  private startedSettlingAt?: Date;
  private tileWidth: number;
  private tileHeight: number;

  constructor(opts: Partial<CanvasBoard>) {
    super({
      ...opts,
      tileTypes: opts.tileTypes || ['red', 'orange', 'yellow', 'green', 'blue'],
      tileGenerator() {
        return new CanvasTile({
          type: this.tileTypes[Math.floor(rand(0, this.tileTypes.length))],
          width: this.tileWidth,
          height: this.tileHeight,
          colorIsType: true,
          applySelectedStyle: this.applySelectedStyle,
          applyTargetedStyle: this.applyTargetedStyle,
          applyMatchedStyle: this.applyMatchedStyle,
        });
      },
    });

    this.x = opts.x || 0;
    this.y = opts.y || 0;
    this.width = opts.width || this.colCount * 50;
    this.height = opts.height || this.rowCount * 50;
    this.tileWidth = this.width / this.colCount;
    this.tileHeight = this.height / this.rowCount;
    this.sensitivity = opts.sensitivity || 25;
    this.shapes = opts.shapes || defaultShapes();
    this.applySelectedStyle = opts.applySelectedStyle || (() => {});
    this.applyTargetedStyle = opts.applyTargetedStyle || (() => {});
    this.applyMatchedStyle = opts.applyMatchedStyle || (() => {});
    this.matchAnimationMs = opts.matchAnimationMs || 250;

    mouse.onPress(this.runDragStartCallbacks.bind(this));
    mouse.onDepress(this.runDragEndCallbacks.bind(this));
    mouse.onMove(this.runDragCallbacks.bind(this));
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const settling = this.checkSettle();
    const msSinceSettle = this.startedSettlingAt ? new Date().getTime() - this.startedSettlingAt.getTime() : 0;
    const fallTimeMs = 100;
    const dy = (msSinceSettle / fallTimeMs) * this.tileHeight;
    const itsSwapTimeBruh = msSinceSettle > fallTimeMs;
    if (itsSwapTimeBruh) delete this.startedSettlingAt;

    const tilesToSwap = [] as [GridPosition, GridPosition][];
    this.rows.forEach((row, rowIndex) => {
      row.forEach((tile, tileIndex) => {
        const x = this.x + (tileIndex * tile.width);
        let y = this.y + (rowIndex * tile.height);
        if (settling && !tile.blank) {
          const position = { row: rowIndex, col: tileIndex };
          const below = this.adjacentTile(position, 'down');
          if (below.tile && below.tile.blank) {
            y += dy;
            if (itsSwapTimeBruh) tilesToSwap.push([position, below]);
          }
        }
        tile.draw(ctx, x, y);
      });
    });

    tilesToSwap.forEach(([origin, below]) => this.swapTile(origin, below));
  }

  update(): void {
    this.rows[0] = this.rows[0].map(tile => (tile.blank ? this.tileGenerator() : tile));
    const stillGonnaSettle = this.rows.slice(1).some((row) => row.some(tile => tile.blank));
    if (stillGonnaSettle) return;

    const matchedShapes = this.matchShapes();
    matchedShapes.forEach(({ shape, tiles }) => {
      tiles.forEach(tile => {
        tile.matched = true;
        setTimeout(() => {
          tile.blank = true;
        }, this.matchAnimationMs);
      });
    });
  }

  checkSettle(): boolean {
    const settling = this.tiles.some(tile => tile.blank);

    if (settling) {
      if (!this.startedSettlingAt) this.startedSettlingAt = new Date();
      return true;
    }

    delete this.startedSettlingAt;
    return false;
  }

  tileAt(pos: CoordPosition|GridPosition): CanvasTileInfo {
    if ('row' in pos) {
      const { row, col } = pos;
      const tile = this.rows[row][col];
      return tile ? { row, col, tile } : blankCanvasTileInfo();
    }

    const x = pos.x - this.x;
    const y = pos.y - this.y;
    if (x > this.width || y > this.height) return blankCanvasTileInfo();

    const fractionX = x / this.width;
    const fractionY = y / this.height;
    const row = Math.floor(fractionY * this.rowCount);
    const col = Math.floor(fractionX * this.colCount);
    const tile = this.rows[row][col];
    return { row, col, tile };
  }

  tileCenter(tileInfo: CanvasTileInfo): CoordPosition {
    const { row, col, tile } = tileInfo;
    if (!tile) return { x: -1, y: -1 };

    const x = this.x + (col * tile.height) + (tile.height / 2);
    const y = this.y + (row * tile.width) + (tile.width / 2);
    return { x, y };
  }

  swapTile(from: CoordPosition|GridPosition, to: SwapDirection|CoordPosition|GridPosition): void {
    if (typeof to === 'string') {
      this.swapTileInDirection(from, to);
    } else {
      this.swapTileWithTile(from, to);
    }
  }

  onDragStart(callback: (event: BoardDragEvent) => void): number {
    const index = this.dragStartCallbacks.length;
    this.dragStartCallbacks.push(callback);
    return index;
  }

  removeDragStartListener(id: number): void {
    delete this.dragStartCallbacks[id];
  }

  onDragEnd(callback: (event: BoardDragEvent) => void): number {
    const index = this.dragEndCallbacks.length;
    this.dragEndCallbacks.push(callback);
    return index;
  }

  removeDragEndListener(id: number): void {
    delete this.dragEndCallbacks[id];
  }

  onDrag(callback: (event: BoardDragEvent) => void): number {
    const index = this.dragCallbacks.length;
    this.dragCallbacks.push(callback);
    return index;
  }

  removeDragListener(id: number): void {
    delete this.dragCallbacks[id];
  }

  adjacentSpace(origin: CoordPosition|GridPosition, direction: SwapDirection): GridPosition {
    const { row, col } = 'row' in origin ? origin : this.tileAt(origin);
    switch (direction) {
      case 'up': return { row: row - 1, col };
      case 'down': return { row: row + 1, col };
      case 'left': return { row, col: col - 1 };
      case 'right': return { row, col: col + 1 };
      default: return { row, col };
    }
  }

  adjacentTile(origin: CanvasTileInfo|CoordPosition|GridPosition, direction: SwapDirection): CanvasTileInfo {
    const { row, col } = this.adjacentSpace(origin, direction);
    const tile = this.rows[row] && this.rows[row][col];
    return tile ? { row, col, tile } : blankCanvasTileInfo();
  }

  removeTile(tile: CanvasTile): void {
    tile.blank = true;
  }

  matchShapes(): { shape: Shape; tiles: CanvasTile[] }[] {
    return range(this.colCount).reduce((memo, colIndex) => {
      this.shapes.forEach((shape) => {
        this.rows.forEach((_row, rowIndex) => {
          const newGrid = this.rows.slice(rowIndex).map(row => row.slice(colIndex));
          const tiles = shape.match(newGrid, 'type');
          if (tiles.length) memo.push({ shape, tiles });
        });
      });
      return memo;
    }, [] as { shape: Shape; tiles: CanvasTile[] }[]);
  }

  private swapTileWithTile(from: CoordPosition|GridPosition, to: CoordPosition|GridPosition): void {
    const origin = this.tileAt(from);
    if (!origin.tile) return;

    const destination = this.tileAt(to);
    if (!destination.tile) return;

    this.rows[destination.row][destination.col] = origin.tile;
    this.rows[origin.row][origin.col] = destination.tile;
  }

  private swapTileInDirection(from: CoordPosition|GridPosition, direction: SwapDirection): void {
    const origin = this.tileAt(from);
    if (!origin.tile) return;

    const destination = this.adjacentTile(origin, direction);
    if (!destination.tile) return;

    this.rows[destination.row][destination.col] = origin.tile;
    this.rows[origin.row][origin.col] = destination.tile;
  }

  private clearExistingDragFlags(): void {
    this.tiles.forEach((tile) => {
      tile.selected = false;
      tile.targeted = false;
    });
  }

  private setDragStartFlags(tileInfo: PresentCanvasTileInfo): void {
    this.clearExistingDragFlags();
    tileInfo.tile.selected = true;
    tileInfo.tile.targeted = true;
  }

  private setDragEndFlags(): void {
    this.clearExistingDragFlags();
  }

  private setDragFlags(origin: PresentCanvasTileInfo, destination: PresentCanvasTileInfo): void {
    this.clearExistingDragFlags();
    origin.tile.selected = true;
    destination.tile.targeted = true;
  }

  private runDragStartCallbacks(mouse: Mouse): void {
    const { x, y } = mouse;
    const origin = this.tileAt({ x, y });
    if (!origin.tile) return;

    this.dragOrigin = origin;
    this.setDragStartFlags(this.dragOrigin);
    const distance = distanceBetween(mouse, this.tileCenter(origin));
    const direction = mouse.dragDirection;
    const destination = origin;

    this.dragStartCallbacks.forEach((callback) => {
      callback({ x, y, distance, direction, origin, destination, mouse });
    });
  }

  private runDragEndCallbacks(mouse: Mouse): void {
    const origin = this.dragOrigin;
    if (!origin.tile) return;

    const { x, y } = mouse;
    const distance = distanceBetween(mouse, this.tileCenter(origin));
    const moveTo = distance > this.sensitivity ? this.adjacentTile(origin, mouse.dragDirection) : origin;
    const destination = moveTo.tile ? moveTo : origin;
    const direction = mouse.dragDirection;
    this.setDragEndFlags();

    this.dragEndCallbacks.forEach((callback) => {
      callback({ x, y, distance, direction, origin, destination, mouse });
    });

    this.dragOrigin = blankCanvasTileInfo();
  }

  private runDragCallbacks(mouse: Mouse): void {
    const origin = this.dragOrigin;
    if (!origin.tile) return;

    const { x, y, pressed } = mouse;
    if (!pressed) return;

    const distance = distanceBetween(mouse, this.tileCenter(origin));
    const moveTo = distance > this.sensitivity ? this.adjacentTile(origin, mouse.dragDirection) : origin;
    const destination = moveTo.tile ? moveTo : origin;
    const direction = mouse.dragDirection;
    this.setDragFlags(origin, destination);

    this.dragCallbacks.forEach((callback) => {
      callback({ x, y, distance, direction, origin, destination, mouse });
    });
  }
}

(window as any).defaultShapes = defaultShapes;
