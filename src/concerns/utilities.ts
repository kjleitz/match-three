import { CoordPosition, Nullish, GridPosition } from "../types/common";

export function range<T>(min: number, ...maxAndOrMapper: []): number[];
export function range<T>(min: number, ...maxAndOrMapper: [number]): number[];
export function range<T>(min: number, ...maxAndOrMapper: [(n: number) => T]): T[];
export function range<T>(min: number, ...maxAndOrMapper: [number, (n: number) => T]): T[];
export function range<T>(min: number, ...maxAndOrMapper: []|[number|((n: number) => T)]|[number, (n: number) => T]): (number|T)[] {
  const max = typeof maxAndOrMapper[0] === 'number' ? maxAndOrMapper[0] : 0;
  const mapper = typeof maxAndOrMapper[0] === 'function' ? maxAndOrMapper[0] : maxAndOrMapper[1];
  const [realMin, realMax] = min < max ? [min, max] : [max, min];
  const diff = realMax - realMin;
  const list = Array(diff);
  for (let i = 0; i < diff; i++) list[i] = mapper ? mapper(i + realMin) : i + realMin;
  return list;
}

export const rand = (min: number, max = 0, int = false): number => {
  const [realMin, realMax] = min < max ? [min, max] : [max, min];
  const randomDiff = Math.random() * (realMax - realMin);
  return realMin + (int ? Math.floor(randomDiff) : randomDiff);
};

export const dampen = (num: number, by: number, center = 0): number => {
  // number is already at the center
  if (num === center) return center;

  // number is higher than the center; subtract and don't overshoot the center
  if (num > center) {
    const newNum = num - by;
    return newNum < center ? center : newNum;
  }

  // number is lower than the center; add and don't overshoot the center
  const newNum = num + by;
  return newNum > center ? center : newNum;
};

export const bound = (num: number, min: number, max: number): number => {
  const [realMin, realMax] = min < max ? [min, max] : [max, min];
  if (num < realMin) return realMin;
  if (num > realMax) return realMax;
  return num;
};

export const between = (num: number, min: number, max: number, inclusive = true): boolean => {
  const [realMin, realMax] = min < max ? [min, max] : [max, min];
  return inclusive ? (num >= realMin && num <= realMax) : (num > realMin && num < realMax);
};

export const difference = (n: number, m: number): number => Math.abs(n - m);

export const sample = <T extends any>(list: T[]): T => {
  return list[Math.floor(Math.random() * list.length)];
};

export const distanceBetween = (origin: CoordPosition, destination: CoordPosition): number => {
  const dx = destination.x - origin.x;
  const dy = destination.y - origin.y;
  return Math.sqrt((dx ** 2) + (dy ** 2));
};

export const rotatePoint = (coords: CoordPosition, around: CoordPosition, radians: number): CoordPosition => {
  const relative = { x: coords.x - around.x, y: coords.y - around.y };
  const cosine = Math.cos(radians);
  const sine = Math.sin(radians);
  const newX = (relative.x * cosine) - (relative.y * sine);
  const newY = (relative.x * sine) + (relative.y * cosine);
  return { x: newX + around.x, y: newY + around.y };
};

export function isNullish(value: any): value is Nullish {
  return typeof value === 'undefined' || Object.prototype.toString.call(value) === '[object Null]';
}

export const filterMap = <T, K>(list: T[], mapper: (item: T, index: number, original: T[]) => K|Nullish): K[] => {
  return list.reduce((memo, item, index, original) => {
    const result = mapper(item, index, original);
    return isNullish(result) ? memo : [...memo, result];
  }, [] as K[]);
};

export const findMap = <T, K>(list: T[], mapper: (item: T, index: number, original: T[]) => K|Nullish): K|undefined => {
  let result;
  list.find((item, index, original) => {
    result = mapper(item, index, original);
    return !isNullish(result);
  });
  return result;
};

export const uniq = <T extends any, P extends keyof T>(list: T[], mapper: P|Nullish|((item: T, index: number, original: T[]) => any), sorted = false): T[] => {
  const mapperFn = isNullish(mapper) || typeof mapper === 'function' ? mapper : (item: T) => item[mapper];

  if (sorted && !mapperFn) {
    let lastSeen: T;
    return list.reduce((memo, item, index) => {
      if (index !== 0 && item === lastSeen) return memo;
      lastSeen = item;
      return [...memo, item];
    }, [] as T[]);
  }

  const seen = new Set();
  return list.reduce((memo, item, index) => {
    const key = mapperFn ? mapperFn(item, index, list) : item;
    if (seen.has(key)) return memo;
    seen.add(key);
    return [...memo, item];
  }, [] as T[]);
};

export const rotate = <T>(grid: T[][], rotations = 1): T[][] => {
  const quadrants = rotations % 4;
  switch (quadrants < 0 ? 4 - quadrants : quadrants) {
    case 1: {
      return grid.reduce((memo, row, rowIndex) => {
        row.forEach((item, colIndex) => {
          const newRowIndex = colIndex;
          const newColIndex = grid.length - rowIndex - 1;
          memo[newRowIndex] = memo[newRowIndex] || [];
          memo[newRowIndex][newColIndex] = item;
        });
        return memo;
      }, [] as T[][]);
    }
    case 2: return [...grid].reverse().map(row => [...row].reverse());
    case 3: {
      return grid.reduce((memo, row, rowIndex) => {
        row.forEach((item, colIndex) => {
          const newRowIndex = row.length - colIndex - 1;
          const newColIndex = rowIndex;
          memo[newRowIndex] = memo[newRowIndex] || [];
          memo[newRowIndex][newColIndex] = item;
        });
        return memo;
      }, [] as T[][]);
    }
    default: return grid.map(row => [...row]);
  }
};

export const rotateGridPosition = ({ row, col }: GridPosition, rows: number, cols: number, rotations: number): GridPosition => {
  const quadrants = rotations % 4;
  switch (quadrants < 0 ? 4 - quadrants : quadrants) {
    case 1: return { row: col, col: rows - row - 1 };
    case 2: return { row: rows - row - 1, col: cols - col - 1 };
    case 3: return { row: cols - col - 1, col: row };
    default: return { row, col };
  }
};
