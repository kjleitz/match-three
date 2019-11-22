import Tile from "./Tile";
import { range, rand } from "./utilities";

export default class Board {
  public rowCount = 12;
  public colCount = 12;
  public tileTypes = ['red', 'green', 'blue', 'yellow'];
  private _rows!: Tile[][];
  private _columns?: Tile[][];

  constructor(opts: Partial<Board>) {
    Object.assign(this, opts);
    this.rows = this.newRows();
  }

  set rows(rows: Tile[][]) {
    if (!rows.every(row => rows[0].length === row.length)) {
      throw new Error('Rows must all be the same length');
    }
    this._rows = rows;
    delete this._columns;
    this.rowCount = rows.length;
    this.colCount = rows[0].length;
  }

  get rows(): Tile[][] {
    return this._rows;
  }

  set columns(columns: Tile[][]) {
    if (!columns.every(column => columns[0].length === column.length)) {
      throw new Error('Columns must all be the same length');
    }

    this.rows = columns.reduce((rows, column) => {
      column.forEach((tile, index) => {
        rows[index] = [...(rows[index] || []), tile];
      });
      return rows;
    }, [] as Tile[][]);
  }

  get columns(): Tile[][] {
    if (this._columns) return this._columns;

    this._columns = this.rows.reduce((columns, row) => {
      row.forEach((tile, index) => {
        columns[index] = [...(columns[index] || []), tile];
      });
      return columns;
    }, [] as Tile[][]);

    return this._columns;
  }

  private newRows(): Tile[][] {
    return range(this.rowCount, () => {
      return range(this.colCount, () => {
        return new Tile({
          type: this.tileTypes[Math.floor(rand(0, this.tileTypes.length))],
        });
      });
    });
  }
}
