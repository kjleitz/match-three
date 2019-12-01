import Tile from "./Tile";
import { range } from "./utilities";

export default class Board<TileClass = Tile> {
  public rowCount = 10;
  public colCount = 10;
  public tileTypes = ['a', 'b', 'c', 'd'];
  public tileClass = Tile;
  public tileGenerator: () => TileClass;
  private _rows!: TileClass[][];
  private _columns?: TileClass[][];

  constructor(opts: { tileGenerator: () => TileClass } & Partial<Board>) {
    Object.assign(this, opts);
    this.tileGenerator = opts.tileGenerator;
    this.rows = this.newRows();
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

  newRows(): TileClass[][] {
    return range(this.rowCount, () => {
      return range(this.colCount, () => {
        return this.tileGenerator();
      });
    });
  }
}
