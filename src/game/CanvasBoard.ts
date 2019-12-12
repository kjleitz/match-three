import Board from "../Board";
import CanvasTile from "./CanvasTile";
import { range, distanceBetween, findMap, sample, tuple, uniq } from "../concerns/utilities";
import mouse, { Mouse } from "./mouse";
import Shape, { defaultShapes } from "../Shape";
import { GridPosition, CoordPosition } from "../types/common";

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

const blankCanvasTileInfo = (): BlankCanvasTileInfo => ({ row: -1, col: -1, tile: null });

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
  public applyNormalStyle?: CanvasTile['applyNormalStyle'];
  public applySelectedStyle?: CanvasTile['applySelectedStyle'];
  public applyTargetedStyle?: CanvasTile['applyTargetedStyle'];
  public applyMatchedStyle?: CanvasTile['applyMatchedStyle'];
  public matchAnimationMs: number;
  private dragOrigin: CanvasTileInfo = blankCanvasTileInfo();
  private swapOrigin: CanvasTileInfo = blankCanvasTileInfo();
  private swapTarget: CanvasTileInfo = blankCanvasTileInfo();
  private startedSettlingAt?: Date;
  private needsShuffle = false;

  constructor(opts: Partial<CanvasBoard>) {
    super({
      ...opts,
      tileDefs: {
        red: { generator: ({ variant }) => this.defaultNewTileOfType('red', variant) },
        orange: { generator: ({ variant }) => this.defaultNewTileOfType('orange', variant) },
        purple: { generator: ({ variant }) => this.defaultNewTileOfType('purple', variant) },
        green: { generator: ({ variant }) => this.defaultNewTileOfType('green', variant) },
        blue: { generator: ({ variant }) => this.defaultNewTileOfType('blue', variant) },
      },
    });

    this.x = opts.x || 0;
    this.y = opts.y || 0;
    const rawWidth = opts.width || this.colCount * 50;
    this.width = rawWidth - (rawWidth % this.colCount);
    this.height = opts.height || this.width;
    this.sensitivity = opts.sensitivity || 25;
    this.shapes = opts.shapes || defaultShapes();
    this.applyNormalStyle = opts.applyNormalStyle;
    this.applySelectedStyle = opts.applySelectedStyle;
    this.applyTargetedStyle = opts.applyTargetedStyle;
    this.applyMatchedStyle = opts.applyMatchedStyle;
    this.matchAnimationMs = opts.matchAnimationMs || 250;

    mouse.onPress(this.runDragStartCallbacks.bind(this));
    mouse.onDepress(this.runDragEndCallbacks.bind(this));
    mouse.onMove(this.runDragCallbacks.bind(this));

    this.stabilizeInitialTiles();

    window.setInterval(() => this.checkShuffle(), 1000);
  }

  get tileWidth(): number {
    return this.width / this.colCount;
  }

  get tileHeight(): number {
    return this.height / this.rowCount;
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
    this.spawnNewTiles();
    if (this.tilesWillDrop()) return;

    if (this.needsShuffle) {
      // this.drawShuffle();
      this.shuffle();
    }

    const matchedShapes = this.matchShapes();
    if (!matchedShapes.length) return;

    const originTile = this.swapOrigin.tile;
    const targetTile = this.swapTarget.tile;

    const sortedMatchedShapes = [...matchedShapes].sort((a, b) => {
      if (a.shape.value > b.shape.value) return -1;
      if (b.shape.value > a.shape.value) return 1;
      if (a.tiles.some(tile => (tile === targetTile || tile === originTile))) return -1;
      if (b.tiles.some(tile => (tile === targetTile || tile === originTile))) return 1;
      return 0;
    });

    const transcendentTiles: Map<CanvasTile, string[]> = new Map();
    sortedMatchedShapes.forEach(({ tiles, shape, rotation, centerTile }) => {
      tiles.forEach(tile => this.explodeTile(tile));
      const variant = this.variantForShape(shape, rotation);
      if (variant) {
        const movedTile = tiles.find(tile => (tile === targetTile || tile === originTile));
        const transcendent = movedTile || centerTile;
        const existing = transcendentTiles.get(transcendent);
        transcendentTiles.set(transcendent, [...(existing || []), variant]);
      }
    });

    transcendentTiles.forEach((variants, tile) => {
      tile.variant = variants[0];
      tile.matched = false;
    });

    if (matchedShapes.length && this.onTileMatched) {
      new Set([
        ...Array.from(transcendentTiles.keys()),
        ...this.tiles.filter(({ matched }) => matched),
      ]).forEach(tile => this.onTileMatched!(tile));
    }
  }

  spawnNewTiles(): void {
    this.rows[0] = this.rows[0].map(tile => (tile.blank ? this.newMundaneTile() : tile));
  }

  tilesWillDrop(): boolean {
    return this.rows.slice(1).some(row => row.some(tile => (tile.matched || tile.blank)));
  }

  explodeTile(tile: CanvasTile): void {
    if (tile.isMundane) tile.matched = true;
    if (tile.matched) return;

    tile.matched = true;
    switch (tile.variant) {
      case 'horizontalClear': this.clearRow(this.findTile(tile)); break;
      case 'verticalClear': this.clearCol(this.findTile(tile)); break;
      case 'crossClear': this.clearCross(this.findTile(tile)); break;
      case 'typeClear': this.clearType(tile.type); break;
      case 'bombClear': this.clearBomb(this.findTile(tile)); break;
    }
  }

  clearRow({ row }: Pick<GridPosition, 'row'>): void {
    this.rows[row].forEach(tile => this.explodeTile(tile));
  }

  clearCol({ col }: Pick<GridPosition, 'col'>): void {
    this.rows.forEach(row => this.explodeTile(row[col]));
  }

  clearCross({ row, col }: GridPosition): void {
    this.clearRow({ row });
    this.clearCol({ col });
  }

  clearType(type: string): void {
    this.tiles.forEach(tile => { if (tile.type === type) this.explodeTile(tile); });
  }

  clearBomb({ row, col }: GridPosition): void {
    const bombShape = new Shape({
      map: [
        [false, false, true],
        [false, true, true, true],
        [true, true, true, true, true],
        [false, true, true, true],
        [false, false, true],
      ],
    });
    const { center } = bombShape;
    const bombTop = row - center.row;
    const bombLeft = col - center.col;
    const bombedTiles = bombShape.screen(this.rows, { row: bombTop, col: bombLeft });
    bombedTiles.forEach(tile => this.explodeTile(tile));
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

  findTile(target: CanvasTile): CanvasTileInfo {
    return findMap(this.rows, (rowTiles, row) => {
      return findMap(rowTiles, (tile, col) => { // eslint-disable-line consistent-return
        if (target === tile) return { row, col, tile };
      });
    }) || blankCanvasTileInfo();
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

  matchShapes(): { shape: Shape; rotation: number; tiles: CanvasTile[]; centerTile: CanvasTile }[] {
    return range(this.colCount).reduce((memo, colIndex) => {
      this.shapes.forEach((shape) => {
        this.rows.forEach((_row, rowIndex) => {
          const newGrid = this.rows.slice(rowIndex).map(row => row.slice(colIndex));
          const { rotation, matched, center } = shape.match(newGrid, 'type');
          if (matched.length > 0) memo.push({ shape, rotation, tiles: matched, centerTile: center! });
        });
      });
      return memo;
    }, [] as { shape: Shape; rotation: number; tiles: CanvasTile[]; centerTile: CanvasTile }[]);
  }

  private defaultNewTileOfType(type: string, variant?: string): CanvasTile {
    // future: change colors for "color" types here
    const typeProps = {
      red: { color: 'red', shape: 'heart' },
      orange: { color: 'orange', shape: 'star' },
      purple: { color: 'purple', shape: 'square' },
      green: { color: 'green', shape: 'circle' },
      blue: { color: 'blue', shape: 'triangle' },
    } as const;

    const typeProp = typeProps[type as keyof typeof typeProps];

    return new CanvasTile({
      type,
      variant,
      color: typeProp.color,
      shape: typeProp.shape,
      width: this.tileWidth,
      height: this.tileHeight,
      applyNormalStyle: this.applyNormalStyle,
      applySelectedStyle: this.applySelectedStyle,
      applyTargetedStyle: this.applyTargetedStyle,
      applyMatchedStyle: this.applyMatchedStyle,
    });
  }

  private variantForShape(shape: Shape, rotation: number): string {
    switch (shape.value) {
      case 2: return rotation % 2 === 0 ? 'verticalClear' : 'horizontalClear';
      case 3: return 'typeClear';
      case 4: return 'typeClear';
      case 5: return 'crossClear';
      case 6: return 'crossClear';
      case 7: return 'bombClear';
      default: return '';
    }
  }

  private swapTileWithTile(from: CoordPosition|GridPosition, to: CoordPosition|GridPosition): void {
    const origin = this.tileAt(from);
    if (!origin.tile) return;

    this.swapOrigin = origin;
    const destination = this.tileAt(to);
    if (!destination.tile) return;

    this.swapTarget = destination;
    this.rows[destination.row][destination.col] = origin.tile;
    this.rows[origin.row][origin.col] = destination.tile;
  }

  private swapTileInDirection(from: CoordPosition|GridPosition, direction: SwapDirection): void {
    const origin = this.tileAt(from);
    if (!origin.tile) return;

    this.swapOrigin = origin;
    const destination = this.adjacentTile(origin, direction);
    if (!destination.tile) return;

    this.swapTarget = destination;
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
    const settling = this.checkSettle();
    if (settling) return;

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
    const settling = this.checkSettle();
    if (settling) return;

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
    const settling = this.checkSettle();
    if (settling) return;

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

  private replaceTile(tile1: CanvasTile, tile2: CanvasTile): void {
    const { row, col } = this.findTile(tile1);
    this.rows[row][col] = tile2;
  }

  private stabilizeInitialTiles(tries = 20): void {
    if (tries <= 0) {
      this.rows = this.newRows();
      this.stabilizeInitialTiles();
      return;
    }

    const matchedShapes = this.matchShapes();
    if (!matchedShapes.length) return;

    matchedShapes[0].tiles.forEach(tile => this.replaceTile(tile, this.newMundaneTile()));

    this.stabilizeInitialTiles(tries - 1);
  }

  private possibleMatchesExist(): boolean {
    return !!findMap(this.rows, (row, rowIndex) => {
      return findMap(row, (_tile, colIndex) => {
        const position = { row: rowIndex, col: colIndex };
        return findMap(tuple('up', 'down', 'left', 'right'), (direction) => { // eslint-disable-line consistent-return
          this.swapTileInDirection(position, direction);
          if (this.matchShapes()) return true;
          this.swapTileInDirection(position, direction);
        });
      });
    });
  }

  private checkShuffle(): void {
    this.needsShuffle = !this.possibleMatchesExist();
  }
}

(window as any).defaultShapes = defaultShapes;
