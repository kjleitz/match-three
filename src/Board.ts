import Tile from "./Tile";
import { range, sample } from "./concerns/utilities";
import { Need } from "./types/common";


// export interface MundaneTileDef<TileClass extends Tile> {
//   special: false;
//   generator: () => TileClass;
// }

// export interface SpecialTileDef<TileClass extends Tile> {
//   special: true;
//   generator: () => TileClass;
// }

// export type TileDef<TileClass extends Tile> = MundaneTileDef<TileClass> | SpecialTileDef<TileClass>;

// export interface MundaneTileDefs<TileClass extends Tile> {
//   [type: string]: MundaneTileDef<TileClass>;
// }

// export interface SpecialTileDefs<TileClass extends Tile> {
//   [type: string]: MundaneTileDef<TileClass>;
// }

// export interface TileDefs<TileClass extends Tile> {
//   [type: string]: TileDef<TileClass>;
// }

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
  public rowCount = 10;
  public colCount = 10;
  // public tileTypes = ['a', 'b', 'c', 'd'];
  public tileClass = Tile;
  public tileDefs: TileDefs<TileClass>;
  private _rows!: TileClass[][];
  private _columns?: TileClass[][];

  constructor(opts: Need<Board<TileClass>, 'tileDefs'>) {
    Object.assign(this, opts);
    this.tileDefs = opts.tileDefs;
    // this.rows = this.newRows();
  }

  set rows(rows: TileClass[][]) {
    if (!rows.every(row => rows[0].length === row.length)) {
      throw new Error('Rows must all be the same length');
    }
    this._rows = rows;
    delete this._columns;
    this.rowCount = rows.length;
    this.colCount = rows[0].length;
  }

  get rows(): TileClass[][] {
    return this._rows;
  }

  set columns(columns: TileClass[][]) {
    if (!columns.every(column => columns[0].length === column.length)) {
      throw new Error('Columns must all be the same length');
    }

    this.rows = columns.reduce((rows, column) => {
      column.forEach((tile, index) => {
        rows[index] = [...(rows[index] || []), tile];
      });
      return rows;
    }, [] as TileClass[][]);
  }

  get columns(): TileClass[][] {
    if (this._columns) return this._columns;

    this._columns = this.rows.reduce((columns, row) => {
      row.forEach((tile, index) => {
        columns[index] = [...(columns[index] || []), tile];
      });
      return columns;
    }, [] as TileClass[][]);

    return this._columns;
  }

  get tiles(): TileClass[] {
    return this.rows.reduce((tiles, row) => [...tiles, ...row], []);
  }

  get tileTypes(): string[] {
    return Object.keys(this.tileDefs);
  }

  // get mundaneTileTypes(): string[] {
  //   return Object.keys(this.mundaneTileDefs);
  // }

  // get specialTileTypes(): string[] {
  //   return Object.keys(this.specialTileDefs);
  // }

  // get mundaneTileDefs(): MundaneTileDefs<TileClass> {
  //   return Object.keys(this.tileDefs).reduce((memo, key) => {
  //     const definition = this.tileDefs[key];
  //     return definition.special ? memo : ({ ...memo, [key]: definition } as MundaneTileDefs<TileClass>);
  //   }, {});
  // }

  // get specialTileDefs(): SpecialTileDefs<TileClass> {
  //   return Object.keys(this.tileDefs).reduce((memo, key) => {
  //     const definition = this.tileDefs[key];
  //     return definition.special ? ({ ...memo, [key]: definition } as SpecialTileDefs<TileClass>) : memo;
  //   }, {});
  // }

  // newMundaneTile(): TileClass {
  //   const { mundaneTileTypes, mundaneTileDefs } = this;
  //   const tileType = sample(mundaneTileTypes);
  //   const tileDef = mundaneTileDefs[tileType];
  //   return tileDef.generator();
  // }

  // newSpecialTile(): TileClass {
  //   const { specialTileTypes, specialTileDefs } = this;
  //   const tileType = sample(specialTileTypes);
  //   const tileDef = specialTileDefs[tileType];
  //   return tileDef.generator();
  // }

  newMundaneTile(): TileClass {
    const tileType = sample(this.tileTypes);
    const tileDef = this.tileDefs[tileType];
    return tileDef.generator({ variant: 'mundane' });
  }

  newRows(): TileClass[][] {
    return range(this.rowCount, () => (range(this.colCount, () => this.newMundaneTile())));
  }

  // private defaultNewTileOfType(type: string, variant?: string): TileClass {
  //   return new Tile({
  //     type,
  //     variant,
  //   });
  // }
}
