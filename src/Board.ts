import Tile from "./Tile";
import { range, sample, rotate, rand } from "./concerns/utilities";
import { Need } from "./types/common";

export type TileGenerator<TileClass extends Tile> = (opts: Pick<TileClass, 'variant'>) => TileClass;

export interface MundaneTileDef<TileClass extends Tile> {
  generator: TileGenerator<TileClass>;
}

export interface SpecialTileDef<TileClass extends Tile> {
  generator: TileGenerator<TileClass>;
}

export type TileDef<TileClass extends Tile> = MundaneTileDef<TileClass> | SpecialTileDef<TileClass>;

export interface MundaneTileDefs<TileClass extends Tile> {
  [type: string]: MundaneTileDef<TileClass>;
}

export interface SpecialTileDefs<TileClass extends Tile> {
  [type: string]: MundaneTileDef<TileClass>;
}

export interface TileDefs<TileClass extends Tile> {
  [type: string]: TileDef<TileClass>;
}

export default class Board<TileClass extends Tile = Tile> {
  public rowCount = 9;
  public colCount = 9;
  public tileClass = Tile;
  public tileDefs: TileDefs<TileClass>;
  private _rows?: TileClass[][];

  constructor(opts: Need<Board<TileClass>, 'tileDefs'>) {
    Object.assign(this, opts);
    this.tileDefs = opts.tileDefs;
  }

  get rows(): TileClass[][] {
    this._rows = this._rows || this.newRows();
    return this._rows;
  }

  set rows(rows: TileClass[][]) {
    this._rows = rows;
  }

  get tiles(): TileClass[] {
    return this.rows.reduce((tiles, row) => [...tiles, ...row], []);
  }

  get tileTypes(): string[] {
    return Object.keys(this.tileDefs);
  }

  newMundaneTile(): TileClass {
    const tileType = sample(this.tileTypes);
    const tileDef = this.tileDefs[tileType];
    return tileDef.generator({ variant: 'mundane' });
  }

  newRows(): TileClass[][] {
    return range(this.rowCount, () => (range(this.colCount, () => this.newMundaneTile())));
  }

  shuffle(): void {
    const rowCount = this.rows.length;
    this.rows.forEach((row, rowIndex) => {
      const colCount = row.length;
      row.forEach((tile, colIndex) => {
        const newRowIndex = rand(rowCount);
        const newColIndex = rand(colCount);
        const existing = this.rows[newRowIndex][newColIndex];
        this.rows[newRowIndex][newColIndex] = tile;
        this.rows[rowIndex][colIndex] = existing;
      });
    });
  }
}
