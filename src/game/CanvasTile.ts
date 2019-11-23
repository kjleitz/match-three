import Tile from "../Tile";

export default class CanvasTile extends Tile {
  public width = 50;
  public height = 50;
  public color = 'transparent';
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
  }) {
    super({
      type: (opts.colorIsType && (opts.type || opts.color))
        || (opts.imgUrlIsType && (opts.type || opts.imgUrl))
        || opts.type
    });

    this.width = opts.width || this.width;
    this.height = opts.height || this.height;
    this.color = (opts.colorIsType && opts.type) || opts.color || this.color;
    this._imgUrl = (opts.imgUrlIsType && opts.type) || opts.imgUrl || this._imgUrl;
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
    ctx.fillStyle = this.color;
    if (this.image) {
      ctx.drawImage(this.image, x, y);
    } else {
      ctx.fillRect(x, y, this.width, this.height);
    }
  }
}
