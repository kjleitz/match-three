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

export interface ShapeOptions {
  position: CoordPosition;
  size: number;
  fillStyle: string;
  strokeStyle?: string;
  scale?: number;
}

export const drawHeart = (ctx: CanvasRenderingContext2D, opts: ShapeOptions): void => {
  const { position, size, fillStyle, strokeStyle } = opts;
  const scale = opts.scale || 1;
  const { x, y } = position;

  const heartWidth = scale * size;
  const heartHeight = scale * (0.85 * size);
  const lobeRadius = heartWidth / 4;
  const leftX = x + ((size - heartWidth) / 2);
  const rightX = leftX + heartWidth;
  const topY = y + ((size - heartHeight) / 2);
  const bottomY = topY + heartHeight;
  const centerX = leftX + (2 * lobeRadius);
  const centerY = topY + lobeRadius;
  const leftLobeCenterX = leftX + lobeRadius;
  const rightLobeCenterX = centerX + lobeRadius;

  const heart = new Path2D();
  heart.arc(leftLobeCenterX, centerY, lobeRadius, Math.PI, 0);
  heart.arc(rightLobeCenterX, centerY, lobeRadius, Math.PI, 0);
  heart.bezierCurveTo(rightX, centerY + lobeRadius, centerX + lobeRadius, bottomY - lobeRadius, centerX, bottomY);
  heart.bezierCurveTo(centerX - lobeRadius, bottomY - lobeRadius, leftX, centerY + lobeRadius, leftX, centerY);
  heart.closePath();

  ctx.fillStyle = fillStyle;
  if (strokeStyle) {
    ctx.strokeStyle = strokeStyle;
  } else {
    const gradient = ctx.createRadialGradient(centerX, bottomY - (heartHeight / 2), 5, centerX, bottomY - (heartHeight / 2), heartHeight);
    gradient.addColorStop(0, fillStyle);
    gradient.addColorStop(1, 'white');
    ctx.strokeStyle = gradient;
  }
  ctx.lineWidth = 3;
  ctx.lineJoin = 'round';
  ctx.fill(heart);
  ctx.stroke(heart);
};

export const drawTriangle = (ctx: CanvasRenderingContext2D, opts: ShapeOptions): void => {
  const { position, size, fillStyle, strokeStyle } = opts;
  const scale = opts.scale || 1;
  const { x, y } = position;

  const triangleLeg = scale * size;
  const triangleHeight = Math.sqrt((triangleLeg ** 2) - ((0.5 * triangleLeg) ** 2));
  const leftX = x + ((size - triangleLeg) / 2);
  const rightX = leftX + triangleLeg;
  const topY = y + ((size - triangleHeight) / 2);
  const bottomY = topY + triangleHeight;
  const centerX = leftX + (triangleLeg / 2);
  const centerY = bottomY - ((triangleLeg / 2) * Math.tan(Math.PI / 6));

  const triangle = new Path2D();
  triangle.moveTo(centerX, topY);
  triangle.lineTo(rightX, bottomY);
  triangle.lineTo(leftX, bottomY);
  triangle.lineTo(centerX, topY);
  triangle.closePath();

  ctx.fillStyle = fillStyle;
  if (strokeStyle) {
    ctx.strokeStyle = strokeStyle;
  } else {
    const gradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, triangleHeight);
    gradient.addColorStop(0, fillStyle);
    gradient.addColorStop(1, 'white');
    ctx.strokeStyle = gradient;
  }
  ctx.lineWidth = 3;
  ctx.lineJoin = 'round';
  ctx.fill(triangle);
  ctx.stroke(triangle);
};

export const drawCircle = (ctx: CanvasRenderingContext2D, opts: ShapeOptions): void => {
  const { position, size, fillStyle, strokeStyle } = opts;
  const scale = opts.scale || 1;
  const { x, y } = position;

  const diameter = scale * size;
  const radius = diameter / 2;

  const leftX = x + ((size - diameter) / 2);
  const topY = y + ((size - diameter) / 2);
  const centerX = leftX + radius;
  const centerY = topY + radius;

  const circle = new Path2D();
  circle.arc(centerX, centerY, radius, 0, Math.PI);
  circle.arc(centerX, centerY, radius, Math.PI, 0);
  circle.closePath();

  ctx.fillStyle = fillStyle;
  if (strokeStyle) {
    ctx.strokeStyle = strokeStyle;
  } else {
    const gradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, diameter);
    gradient.addColorStop(0, fillStyle);
    gradient.addColorStop(1, 'white');
    ctx.strokeStyle = gradient;
  }
  ctx.lineWidth = 3;
  ctx.lineJoin = 'round';
  ctx.fill(circle);
  ctx.stroke(circle);
};

interface StarOptions extends ShapeOptions {
  obesity?: number;
}

export const drawStar = (ctx: CanvasRenderingContext2D, opts: StarOptions): void => {
  const { position, size, fillStyle, strokeStyle } = opts;
  const scale = opts.scale || 1;
  const obesity = opts.obesity || 2;
  const { x, y } = position;

  const wingspan = scale * size;
  const leftX = x + ((size - wingspan) / 2);
  const topY = y + ((size - wingspan) / 2);
  const center = { x: leftX + (wingspan / 2), y: topY + (wingspan / 2) };

  const angleToPoint = (2 * Math.PI) / 5;
  const head = { x: center.x, y: topY };
  const rightArm = rotatePoint(head, center, angleToPoint);
  const rightLeg = rotatePoint(head, center, 2 * angleToPoint);
  const leftLeg = rotatePoint(head, center, 3 * angleToPoint);
  const leftArm = rotatePoint(head, center, 4 * angleToPoint);
  const radius = center.x - leftX;
  const pentagonSide = 2 * (radius * Math.sin(angleToPoint / 2));
  const pentagonInteriorAngle = Math.PI - angleToPoint;
  const armToPentagonSideAngle = (Math.PI - pentagonInteriorAngle) / 2;
  const armLength = (pentagonSide / 2) / Math.cos(armToPentagonSideAngle);

  const rightShoulder = { x: (rightArm.x - armLength) + obesity, y: rightArm.y - obesity };
  const leftShoulder = { x: (leftArm.x + armLength) - obesity, y: leftArm.y - obesity };
  const rightArmpit = rotatePoint(rightShoulder, center, angleToPoint);
  const leftArmpit = rotatePoint(leftShoulder, center, -1 * angleToPoint);
  const crotch = rotatePoint(rightArmpit, center, angleToPoint);

  const star = new Path2D();
  star.moveTo(head.x, head.y);
  star.lineTo(rightShoulder.x, rightShoulder.y);
  star.lineTo(rightArm.x, rightArm.y);
  star.lineTo(rightArmpit.x, rightArmpit.y);
  star.lineTo(rightLeg.x, rightLeg.y);
  star.lineTo(crotch.x, crotch.y);
  star.lineTo(leftLeg.x, leftLeg.y);
  star.lineTo(leftArmpit.x, leftArmpit.y);
  star.lineTo(leftArm.x, leftArm.y);
  star.lineTo(leftShoulder.x, leftShoulder.y);
  star.lineTo(head.x, head.y);
  star.closePath();

  ctx.fillStyle = fillStyle;
  if (strokeStyle) {
    ctx.strokeStyle = strokeStyle;
  } else {
    const gradient = ctx.createRadialGradient(center.x, center.y, 5, center.x, center.y, wingspan);
    gradient.addColorStop(0, fillStyle);
    gradient.addColorStop(1, 'white');
    ctx.strokeStyle = gradient;
  }
  ctx.lineWidth = 3;
  ctx.lineJoin = 'round';
  ctx.fill(star);
  ctx.stroke(star);
};

export const drawSquare = (ctx: CanvasRenderingContext2D, opts: ShapeOptions): void => {
  const { position, size, fillStyle, strokeStyle } = opts;
  const scale = opts.scale || 1;
  const { x, y } = position;

  const squareSize = scale * size;
  const leftX = x + ((size - squareSize) / 2);
  const topY = y + ((size - squareSize) / 2);

  const square = new Path2D();
  square.rect(leftX, topY, squareSize, squareSize);

  ctx.fillStyle = fillStyle;
  if (strokeStyle) {
    ctx.strokeStyle = strokeStyle;
  } else {
    const gradient = ctx.createRadialGradient(leftX + squareSize / 2, topY + squareSize / 2, 5, leftX + squareSize / 2, topY + squareSize / 2, squareSize);
    gradient.addColorStop(0, fillStyle);
    gradient.addColorStop(1, 'white');
    ctx.strokeStyle = gradient;
  }
  ctx.lineWidth = 3;
  ctx.lineJoin = 'round';
  ctx.fill(square);
  ctx.stroke(square);
};
