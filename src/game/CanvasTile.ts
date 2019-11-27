import Tile from "../Tile";
import { CoordPosition } from "./CanvasBoard";

export default class CanvasTile extends Tile {
  public width = 50;
  public height = 50;
  public color = 'transparent';
  public selected = false;
  public targeted = false;
  public matchedAt = null as Date|null;
  public blank = false;
  public applySelectedStyle: (tile: CanvasTile, pos: CoordPosition) => void;
  public applyTargetedStyle: (tile: CanvasTile, pos: CoordPosition) => void;
  public applyMatchedStyle: (tile: CanvasTile, pos: CoordPosition) => void;
  private _imgUrl = '';
  private _image?: HTMLImageElement;

  constructor(opts: Partial<Tile> & {
    type: string;
    color?: string;
    imgUrl?: string;
    width?: number;
    height?: number;
    colorIsType?: boolean;
    imgUrlIsType?: boolean;
    blank?: boolean;
    applySelectedStyle?: CanvasTile['applySelectedStyle'];
    applyTargetedStyle?: CanvasTile['applyTargetedStyle'];
    applyMatchedStyle?: CanvasTile['applyMatchedStyle'];
  }) {
    super({
      type: (opts.colorIsType && (opts.type || opts.color))
        || (opts.imgUrlIsType && (opts.type || opts.imgUrl))
        || opts.type
    });

    this.width = opts.width || this.width;
    this.height = opts.height || this.height;
    this.color = (opts.colorIsType && opts.type) || opts.color || this.color;
    this.blank = opts.blank || this.blank;
    this._imgUrl = (opts.imgUrlIsType && opts.type) || opts.imgUrl || this._imgUrl;
    this.applySelectedStyle = opts.applySelectedStyle || (() => {});
    this.applyTargetedStyle = opts.applyTargetedStyle || (() => {});
    this.applyMatchedStyle = opts.applyMatchedStyle || (() => {});
  }

  get matched(): boolean {
    return !!this.matchedAt;
  }

  set matched(matched: boolean) {
    this.matchedAt = matched ? (this.matchedAt || new Date()) : null;
  }

  get imgUrl(): string {
    return this._imgUrl;
  }

  set imgUrl(imgUrl: string) {
    this._imgUrl = imgUrl;
    delete this._image;
  }

  get image(): null|HTMLImageElement {
    if (this._image) return this.image;
    if (!this.imgUrl) return null;

    const image = document.createElement('img');
    image.src = this.imgUrl;
    image.width = this.width;
    image.height = this.height;
    this._image = image;

    return this._image;
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    if (this.blank) return;

    ctx.fillStyle = this.color;
    if (this.image) {
      ctx.drawImage(this.image, x, y);
    } else {
      ctx.fillRect(x, y, this.width, this.height);
    }

    if (this.matched) {
      this.applyMatchedStyle(this, { x, y });
    } else if (this.selected) {
      this.applySelectedStyle(this, { x, y });
    } else if (this.targeted) {
      this.applyTargetedStyle(this, { x, y });
    }
  }
}
