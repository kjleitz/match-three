import { range, rotate, findMap, rotateGridPosition } from "./concerns/utilities";
import { GridPosition } from "./types/common";

export type ShapeMap = boolean[][];

export default class Shape {
  public value: number;
  private _map!: ShapeMap;
  private _extend!: boolean;
  private _linear!: boolean;
  private _centerPosition?: GridPosition;

  constructor(opts: Partial<Shape> = {}) {
    this.value = opts.value || 1;
    this.extend = opts.extend || false;
    this.map = opts.map || [[]];
  }

  static fromLength(length: number, { value = 1, orMore }: { value?: number; orMore?: boolean } = {}): Shape {
    return new Shape({
      value,
      extend: !!orMore,
      map: [range(length, () => true)],
    });
  }

  static rotated(shape: Shape, rotations = 1): Shape {
    return new Shape({ ...shape, map: rotate(shape.map, rotations) });
  }

  get extend(): boolean { return this._extend && this.linear }
  set extend(extend: boolean) { this._extend = extend }

  get map(): ShapeMap { return this._map }
  set map(map: ShapeMap) {
    delete this._linear;
    const rowLength = map.reduce((max, { length }) => (length > max ? length : max), 0);
    this._map = map.map(row => range(rowLength, i => (row[i] || false)));
  }

  get linear(): boolean {
    if (typeof this._linear !== 'undefined') return this._linear;

    this._linear = (this.map.length === 1 && this.map[0].every(space => space))
      || this.map.every(row => (row.length === 1 && row[0]));

    return this._linear;
  }

  match<O>(grid: O[][], field: keyof O, rotation = 0): { rotation: number; matched: O[]; center: O|null } {
    const matched = [] as O[];
    if (rotation > 3) return { rotation, matched, center: null };

    let matchValueSet = false;
    let matchValue: O[keyof O];
    const rotatedMap = rotate(this.map, rotation);

    const allMatched = rotatedMap.every((matcherRow, rowIndex) => {
      const gridRow = grid[rowIndex];
      if (!gridRow) return false;

      return matcherRow.every((mustMatch, colIndex) => {
        if (!mustMatch) return true;

        const gridItem = gridRow[colIndex];
        if (!gridItem) return false;

        const gridValue = gridItem[field];
        if (!matchValueSet) {
          matchValue = gridValue;
          matchValueSet = true;
        }

        if (gridValue !== matchValue) return false;

        matched.push(gridItem);
        return true;
      });
    });

    if (allMatched) {
      const { row, col } = this.centerPosition(rotation);
      const center = grid[row][col];
      return { rotation, matched, center };
    }

    return this.match(grid, field, rotation + 1);
  }

  screen<O extends Record<string, any>>(grid: O[][], offset: GridPosition = { row: 0, col: 0 }): O[] {
    const offsetMapRows = offset.row < 0
      ? this.map.slice(-1 * offset.row)
      : [...range(offset.row, () => []), ...this.map];

    const offsetMap = offsetMapRows.map((row) => {
      return offset.col < 0
        ? row.slice(-1 * offset.col)
        : [...range(offset.col, () => false), ...row];
    });

    // debugger

    return offsetMap.reduce((allMatchedTiles, matcherRow, rowIndex) => {
      const gridRow = grid[rowIndex];

      return [
        ...allMatchedTiles,
        ...matcherRow.reduce((matchedRowTiles, mustMatch, colIndex) => {
          const tile = gridRow && gridRow[colIndex];
          return tile && mustMatch ? [...matchedRowTiles, tile] : matchedRowTiles;
        }, [] as O[]),
      ];
    }, [] as O[]);
  }

  get center(): { mustMatch: boolean } & GridPosition {
    const rowIndex = Math.floor(this.map.length / 2);
    const mapRow = this.map[rowIndex];
    const colIndex = Math.floor(mapRow.length / 2);
    const mustMatch = mapRow[colIndex];
    return { mustMatch, row: rowIndex, col: colIndex };
  }

  centerPosition(rotations = 0): GridPosition {
    if (typeof this._centerPosition === 'undefined') {
      const mustMatchCount = this.map.reduce((total, matcherRow) => {
        return total + matcherRow.reduce((sum, mustMatch) => (mustMatch ? sum + 1 : sum), 0);
      }, 0);

      const centerIndex = Math.floor(mustMatchCount / 2);

      let cursor = 0;
      this._centerPosition = findMap(this.map, (row, rowIndex) => {
        return findMap(row, (mustMatch, index) => {
          if (!mustMatch) return;
          if (cursor === centerIndex) return { row: rowIndex, col: index }; // eslint-disable-line consistent-return
          cursor += 1;
        });
      });
    }

    const rowCount = this.map.length;
    const colCount = this.map[0].length;
    return rotateGridPosition(this._centerPosition!, rowCount, colCount, rotations);
  }
}

export const defaultShapes = (): Shape[] => [
  Shape.fromLength(3, { value: 1 }),
  Shape.fromLength(4, { value: 2 }),
  new Shape({
    value: 3,
    map: [
      [true, true],
      [true, true],
    ],
  }),
  new Shape({
    value: 4,
    map: [
      [true, true, true],
      [true],
      [true],
    ],
  }),
  new Shape({
    value: 4,
    map: [
      [true, true, true],
      [false, true],
      [false, true],
    ],
  }),
  Shape.fromLength(5, { value: 5 }),
  Shape.fromLength(6, { value: 5, orMore: true }),
];
