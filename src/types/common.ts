export type Require<T extends Record<string, any>, P extends keyof T> = {
  [K in keyof Pick<T, P>]-?: T[K];
} & Pick<T, Exclude<keyof T, P>>;

export type Need<
  T extends Record<string, any>,
  P extends keyof T,
> = Require<Partial<T>, P>;

export interface CoordPosition {
  x: number;
  y: number;
}

export interface GridPosition {
  row: number;
  col: number;
}

export type Nullish = null|undefined;
