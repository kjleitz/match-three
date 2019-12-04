import { range, filterMap, findMap } from "./concerns/utilities";

export type ShapeMap = boolean[][];

function rotate<T>(grid: T[][]): T[][] {
  const newGrid = [] as T[][];
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    const row = grid[rowIndex];
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const item = row[colIndex];
      newGrid[colIndex] = newGrid[colIndex] || [];
      newGrid[colIndex].unshift(item);
    }
  }
  return newGrid;
}

export default class Shape {
  public value: number;
  private _map!: ShapeMap;
  private _extend!: boolean;
  private _linear!: boolean;

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

  get extend(): boolean { return this._extend && this.linear }
  set extend(extend: boolean) { this._extend = extend }

  get map(): ShapeMap { return this._map }
  set map(map: ShapeMap) {
    delete this._linear;
    const rowLength = map.reduce((max, { length }) => (length > max ? length : max), 0);
    this._map = map.map((row) => range(rowLength, i => (row[i] || false)));
  }

  get linear(): boolean {
    if (typeof this._linear !== 'undefined') return this._linear;

    this._linear = (this.map.length === 1 && this.map[0].every(space => space))
      || this.map.every(row => (row.length === 1 && row[0]));

    return this._linear;
  }

  match<O extends Record<string, any>>(grid: O[][], field: keyof O, rotation = 0, shapeMap = this.map): { rotation: number; matched: O[] } {
    const matched = [] as O[];
    if (rotation > 3) return { rotation, matched };

    let matchValueSet = false;
    let matchValue: O[keyof O];

    const allMatched = shapeMap.every((matcherRow, rowIndex) => {
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

    return allMatched ? { rotation, matched } : this.match(grid, field, rotation + 1, rotate(shapeMap));
  }

  filter<O extends Record<string, any>>(grid: O[][], rotation = 0, shapeMap = this.map): { rotation: number; matched: O[] } {
    const matched = [] as O[];
    if (rotation > 3) return { rotation, matched };

    return {
      rotation,
      matched: shapeMap.reduce((memo, matcherRow, rowIndex) => {
        const gridRow = grid[rowIndex];
        // if (!gridRow.length) return memo;

        return {
          ...memo,
          ...matcherRow.reduce((memo2, mustMatch, colIndex) => {
            const tile = gridRow[colIndex];
            if (!tile) return memo2;

            return mustMatch ? [...memo2, tile] : memo2;
          }, [] as O[]),
        };
      }, [] as O[]),
    };
  }
}

export const defaultShapes = (): Shape[] => [
  Shape.fromLength(3, { value: 1 }),
  Shape.fromLength(4, { value: 2 }),
  Shape.fromLength(5, { value: 3 }),
  Shape.fromLength(6, { value: 4, orMore: true }),
  new Shape({
    value: 5,
    map: [
      [true, true, true],
      [true],
      [true],
    ],
  }),
  new Shape({
    value: 6,
    map: [
      [true, true, true],
      [false, true],
      [false, true],
    ],
  }),
  new Shape({
    value: 7,
    map: [
      [true, true],
      [true, true],
    ],
  }),
];
