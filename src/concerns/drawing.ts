import { CoordPosition } from "../types/common";
import { rotatePoint } from "./utilities";

export const drawArrow = (
  ctx: CanvasRenderingContext2D,
  dir: 'up'|'down'|'left'|'right',
  fillStyle: string,
  strokeStyle: string,
  center: CoordPosition,
  width: number,
  length: number
): void => {
  const headWidth = width * 2;
  const headLength = 0.75 * headWidth;
  const tailWidth = width;
  const tailLength = length - headLength;
  // const tailBottom = center.y + (tailWidth / 2); // like affixing it with a nail so that it's centered semi-square with the end
  const tailBottom = center.y + (tailLength / 2) + (headLength / 2);
  const tailTop = tailBottom - tailLength;
  const tailLeft = center.x - (tailWidth / 2);
  const tailRight = center.x + (tailWidth / 2);
  const headBottom = tailTop;
  const headTop = headBottom - headLength;
  const headLeft = center.x - (headWidth / 2);
  const headRight = center.x + (headWidth / 2);

  const angle = {
    up: 0,
    right: 0.5 * Math.PI,
    down: Math.PI,
    left: 1.5 * Math.PI,
  }[dir];

  const points = [
    { x: tailLeft, y: tailTop },
    { x: tailLeft, y: tailBottom },
    { x: tailRight, y: tailBottom },
    { x: tailRight, y: tailTop },
    { x: headRight, y: headBottom },
    { x: center.x, y: headTop },
    { x: headLeft, y: headBottom },
  ];

  const rotatedPoints = angle ? points.map(pt => rotatePoint(pt, center, angle)) : points;

  ctx.fillStyle = fillStyle;
  ctx.strokeStyle = strokeStyle;
  ctx.beginPath();
  const startPoint = rotatedPoints[0];
  ctx.moveTo(startPoint.x, startPoint.y);
  rotatedPoints.forEach(({ x, y }) => ctx.lineTo(x, y));
  ctx.lineTo(startPoint.x, startPoint.y);
  ctx.closePath();
  ctx.fill();
  if (strokeStyle) ctx.stroke();
};

export const drawDoubleArrow = (
  ctx: CanvasRenderingContext2D,
  dir: 'horizontal'|'vertical',
  fillStyle: string,
  strokeStyle: string,
  center: CoordPosition,
  width: number,
  length: number
): void => {
  const headWidth = width * 2;
  const headLength = 0.75 * headWidth;
  const tailWidth = width;
  const tailLength = length - (headLength * 2);
  const tailBottom = center.y + (tailLength / 2);
  const tailTop = tailBottom - tailLength;
  const tailLeft = center.x - (tailWidth / 2);
  const tailRight = center.x + (tailWidth / 2);
  const headLeft = center.x - (headWidth / 2);
  const headRight = center.x + (headWidth / 2);
  const topHeadBase = tailTop;
  const topHeadTip = topHeadBase - headLength;
  const bottomHeadBase = tailBottom;
  const bottomHeadTip = bottomHeadBase + headLength;

  const angle = {
    vertical: 0,
    horizontal: 0.5 * Math.PI,
  }[dir];

  const points = [
    { x: tailLeft, y: tailTop },
    { x: tailLeft, y: tailBottom },
    { x: headLeft, y: bottomHeadBase },
    { x: center.x, y: bottomHeadTip },
    { x: headRight, y: bottomHeadBase },
    { x: tailRight, y: tailBottom },
    { x: tailRight, y: tailTop },
    { x: headRight, y: topHeadBase },
    { x: center.x, y: topHeadTip },
    { x: headLeft, y: topHeadBase },
  ];

  const rotatedPoints = angle ? points.map(pt => rotatePoint(pt, center, angle)) : points;

  ctx.fillStyle = fillStyle;
  ctx.strokeStyle = strokeStyle;
  ctx.beginPath();
  const startPoint = rotatedPoints[0];
  ctx.moveTo(startPoint.x, startPoint.y);
  rotatedPoints.forEach(({ x, y }) => ctx.lineTo(x, y));
  ctx.lineTo(startPoint.x, startPoint.y);
  ctx.closePath();
  ctx.fill();
  if (strokeStyle) ctx.stroke();
};

export const drawCrossArrow = (
  ctx: CanvasRenderingContext2D,
  fillStyle: string,
  strokeStyle: string,
  center: CoordPosition,
  width: number,
  length: number
): void => {
  const headWidth = width * 2;
  const headLength = 0.75 * headWidth;
  const tailWidth = width;
  const tailIntersectionWidth = tailWidth;
  const tailIntersectionHeight = tailIntersectionWidth;
  const tailLength = length - (headLength * 2) - tailIntersectionWidth;

  const northTailBase = center.y - (tailIntersectionHeight / 2);
  const northTailTip = northTailBase - tailLength;
  const southTailBase = center.y + (tailIntersectionHeight / 2);
  const southTailTip = southTailBase + tailLength;
  const westTailBase = center.x - (tailIntersectionWidth / 2);
  const westTailTip = westTailBase - tailLength;
  const eastTailBase = center.x + (tailIntersectionWidth / 2);
  const eastTailTip = eastTailBase + tailLength;

  const northHeadBase = northTailTip;
  const northHeadTip = northHeadBase - headLength;
  const southHeadBase = southTailTip;
  const southHeadTip = southHeadBase + headLength;
  const westHeadBase = westTailTip;
  const westHeadTip = westHeadBase - headLength;
  const eastHeadBase = eastTailTip;
  const eastHeadTip = eastHeadBase + headLength;

  const horizontalTailTop = northTailBase;
  const horizontalTailBottom = southTailBase;
  const verticalTailLeft = westTailBase;
  const verticalTailRight = eastTailBase;
  const horizontalHeadTop = center.y - (headWidth / 2);
  const horizontalHeadBottom = center.y + (headWidth / 2);
  const verticalHeadLeft = center.x - (headWidth / 2);
  const verticalHeadRight = center.x + (headWidth / 2);

  const points = [
    { x: verticalTailLeft, y: northTailTip },
    { x: verticalTailLeft, y: northTailBase },
    { x: westTailTip, y: horizontalTailTop },

    { x: westHeadBase, y: horizontalHeadTop },
    { x: westHeadTip, y: center.y },
    { x: westHeadBase, y: horizontalHeadBottom },

    { x: westTailTip, y: horizontalTailBottom },
    { x: westTailBase, y: horizontalTailBottom },
    { x: verticalTailLeft, y: southTailTip },

    { x: verticalHeadLeft, y: southHeadBase },
    { x: center.x, y: southHeadTip },
    { x: verticalHeadRight, y: southHeadBase },

    { x: verticalTailRight, y: southTailTip },
    { x: verticalTailRight, y: southTailBase },
    { x: eastTailTip, y: horizontalTailBottom },

    { x: eastHeadBase, y: horizontalHeadBottom },
    { x: eastHeadTip, y: center.y },
    { x: eastHeadBase, y: horizontalHeadTop },

    { x: eastTailTip, y: horizontalTailTop },
    { x: eastTailBase, y: horizontalTailTop },
    { x: verticalTailRight, y: northTailTip },

    { x: verticalHeadRight, y: northHeadBase },
    { x: center.x, y: northHeadTip },
    { x: verticalHeadLeft, y: northHeadBase },
  ];

  ctx.fillStyle = fillStyle;
  ctx.strokeStyle = strokeStyle;
  ctx.beginPath();
  const startPoint = points[0];
  ctx.moveTo(startPoint.x, startPoint.y);
  points.forEach(({ x, y }) => ctx.lineTo(x, y));
  ctx.lineTo(startPoint.x, startPoint.y);
  ctx.closePath();
  ctx.fill();
  if (strokeStyle) ctx.stroke();
};
