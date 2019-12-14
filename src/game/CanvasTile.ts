import Tile from "../Tile";
import { Need, CoordPosition } from "../types/common";
import { drawDoubleArrow, drawCrossArrow, drawHeart, drawTriangle, drawCircle, drawStar, drawSquare } from "../concerns/drawing";

export default class CanvasTile extends Tile {
  public width = 50;
  public height = 50;
  public color = 'white';
  public shape = '' as ''|'heart'|'star'|'square'|'circle'|'triangle';
  public selected = false;
  public targeted = false;
  public matchedAt = null as Date|null;
  public blank = false;
  public matchAnimationMs = 250;
  public applyNormalStyle: (ctx: CanvasRenderingContext2D, tile: CanvasTile, pos: CoordPosition) => void;
  public applySelectedStyle: (ctx: CanvasRenderingContext2D, tile: CanvasTile, pos: CoordPosition) => void;
  public applyTargetedStyle: (ctx: CanvasRenderingContext2D, tile: CanvasTile, pos: CoordPosition) => void;
  public applyMatchedStyle: (ctx: CanvasRenderingContext2D, tile: CanvasTile, pos: CoordPosition) => void;
  private _imgUrl = '';
  private _image?: HTMLImageElement;
  private blankTimeout?: number;

  constructor(opts: Need<CanvasTile, 'type'>) {
    super(opts);

    this.width = opts.width || this.width;
    this.height = opts.height || this.height;
    this.color = opts.color || this.color;
    this.shape = opts.shape || this.shape;
    this.blank = opts.blank || this.blank;
    this.matchAnimationMs = opts.matchAnimationMs || this.matchAnimationMs;
    this._imgUrl = opts.imgUrl || this._imgUrl;
    this.applyNormalStyle = opts.applyNormalStyle || this.defaultApplyNormalStyle;
    this.applySelectedStyle = opts.applySelectedStyle || this.defaultApplySelectedStyle;
    this.applyTargetedStyle = opts.applyTargetedStyle || this.defaultApplyTargetedStyle;
    this.applyMatchedStyle = opts.applyMatchedStyle || this.defaultApplyMatchedStyle;
  }

  get matched(): boolean {
    return !!this.matchedAt;
  }

  set matched(matched: boolean) {
    if (matched && this.matchedAt) return;

    clearTimeout(this.blankTimeout);
    if (matched) {
      this.matchedAt = new Date();
      this.blankTimeout = window.setTimeout(() => this.blank = true, this.matchAnimationMs);
    } else {
      this.matchedAt = null;
    }
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

    this.applyNormalStyle(ctx, this, { x, y });
    if (this.matched) {
      this.applyMatchedStyle(ctx, this, { x, y });
    } else if (this.selected) {
      this.applySelectedStyle(ctx, this, { x, y });
    } else if (this.targeted) {
      this.applyTargetedStyle(ctx, this, { x, y });
    }
  }

  private defaultApplyNormalStyle(ctx: CanvasRenderingContext2D, tile: CanvasTile, { x, y }: CoordPosition): void {
    const { width, height, image, color, variant } = tile;

    const drawTileShape = (fillStyle: string, strokeStyle?: string): void => {
      const shapeOpts = {
        position: { x, y },
        size: Math.min(width, height),
        fillStyle,
        strokeStyle,
        scale: 0.9,
      };
      switch(this.shape) {
        case 'heart': drawHeart(ctx, shapeOpts); break;
        case 'star': drawStar(ctx, shapeOpts); break;
        case 'square': drawSquare(ctx, { ...shapeOpts, scale: 0.8 }); break;
        case 'circle': drawCircle(ctx, { ...shapeOpts, scale: 0.8 }); break;
        case 'triangle': drawTriangle(ctx, shapeOpts); break;
        default: ctx.fillStyle = color; ctx.fillRect(x, y, width, height);
      }
    };

    if (image) {
      ctx.drawImage(image, x, y);
    } else {
      drawTileShape(color);
    }

    const center = {
      x: x + (width / 2),
      y: {
        '': y + (height / 2),
        square: y + (height / 2),
        circle: y + (height / 2),
        heart: y + (height / 2),
        star: y + (height / 2.1),
        triangle: y + (height / 1.65),
      }[this.shape],
    };
    const arrowWidth = width / 12;
    const arrowLength = 0.4 * width;
    switch (variant) {
      case 'horizontalClear': drawDoubleArrow(ctx, 'horizontal', 'rgba(255,255,255,0.9)', '', center, arrowWidth, arrowLength); break;
      case 'verticalClear': drawDoubleArrow(ctx, 'vertical', 'rgba(255,255,255,0.9)', '', center, arrowWidth, arrowLength); break;
      case 'crossClear': drawCrossArrow(ctx, 'rgba(255,255,255,0.9)', '', center, arrowWidth, arrowLength); break;
      case 'bombClear': drawTileShape('rgba(0, 0, 0, 0.6)', color); break;
      case 'typeClear': {
        const seconds = new Date().getTime() / 500;
        const cycle = seconds % (2 * Math.PI);
        const redCycle = 1 - (0.8 * Math.abs(Math.sin(cycle)));
        const greenCycle = 1 - (0.8 * Math.abs(Math.sin(cycle + ((2 / 3) * Math.PI))));
        const blueCycle = 1 - (0.8 * Math.abs(Math.sin(cycle + ((4 / 3) * Math.PI))));
        const rainbow = `rgb(${redCycle * 255}, ${greenCycle * 255}, ${blueCycle * 255})`;
        drawTileShape(rainbow, color);
        break;
      }
    }
  }

  private defaultApplySelectedStyle(ctx: CanvasRenderingContext2D, tile: CanvasTile, { x, y }: CoordPosition): void {
    const { width, height } = tile;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillRect(x, y, width, height);
  }

  private defaultApplyTargetedStyle(ctx: CanvasRenderingContext2D, tile: CanvasTile, { x, y }: CoordPosition): void {
    const { width, height } = tile;
    const millis = new Date().getTime();
    const pulseMs = this.matchAnimationMs;
    const minStroke = 2;
    const maxStroke = 5;
    const strokeWidth = minStroke + (Math.sin((millis / pulseMs) % Math.PI) * (maxStroke - minStroke));
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = tile.color;
    ctx.fillRect(x + strokeWidth, y + strokeWidth, width - (strokeWidth * 2), height - (strokeWidth * 2));
  }

  private defaultApplyMatchedStyle(ctx: CanvasRenderingContext2D, tile: CanvasTile, { x, y }: CoordPosition): void {
    const { width, height, color, matchAnimationMs } = tile;
    if (!tile.matchedAt) return;

    const msSinceMatch = new Date().getTime() - tile.matchedAt.getTime();
    const percentDone = msSinceMatch > matchAnimationMs ? 1 : msSinceMatch / matchAnimationMs;
    const horizontal = percentDone * (width / 2);
    const vertical = percentDone * (height / 2);
    ctx.fillStyle = '#FFF';
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(x + horizontal, y + vertical, width - (horizontal * 2), height - (vertical * 2));
  }
}
