export default class Tile {
  public type = '';

  constructor(opts: Partial<Tile> = {}) {
    Object.assign(this, opts);
    if (!this.type) throw new Error('Tiles must have a type.');
  }
}
