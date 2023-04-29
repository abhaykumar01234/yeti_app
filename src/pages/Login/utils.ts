export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const getAngle = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => {
  const angle = Math.atan2(y1 - y2, x1 - x2);
  return angle;
};

export const getPosition = (el: HTMLElement): { x: number; y: number } => {
  let xPos = 0;
  let yPos = 0;

  while (el) {
    if (el.tagName === "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      const xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      const yScroll = el.scrollTop || document.documentElement.scrollTop;

      xPos += el.offsetLeft - xScroll + el.clientLeft;
      yPos += el.offsetTop - yScroll + el.clientTop;
    } else {
      // for all other non-BODY elements
      xPos += el.offsetLeft - el.scrollLeft + el.clientLeft;
      yPos += el.offsetTop - el.scrollTop + el.clientTop;
    }

    el = el.offsetParent as HTMLElement;
  }
  //   console.log("xPos: " + xPos + ", yPos: " + yPos);
  return {
    x: xPos,
    y: yPos,
  };
};
