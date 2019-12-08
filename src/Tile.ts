import { Need } from "./types/common";

const MUNDANE_VARIANT = 'mundane';

export default class Tile {
  public type: string;
  public value: number;
  public explode = false;
  public _variant!: string;

  constructor({ type, value, variant }: Need<Tile, 'type'>) {
    this.type = type;
    this.value = value || 1;
    this._variant = variant || MUNDANE_VARIANT;
  }

  set variant(variant: string) { this._variant = variant || MUNDANE_VARIANT }
  get variant(): string { return this._variant || MUNDANE_VARIANT }

  get isMundane(): boolean { return this.variant === MUNDANE_VARIANT }
}
