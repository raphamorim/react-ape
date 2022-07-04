/**
 * Returns a relatively "guaranteed" unique id.
 * It's still not 100% guaranteed, that's why we added the "unsafe" prefix on
 * this function.
 */
export function unsafeCreateUniqueId(): string {
  return (Math.random() * 10e18 + Date.now()).toString(36);
}
type MouseEventType={|
   x:number,
   y:number
  |}
export function trackMousePosition(canvas, event):MouseEventType {
  return {
    x: event.clientX - canvas.offsetLeft,
    y: event.clientY - canvas.offsetTop,
  };
}
export const isMouseInside = (pos, rect):boolean => {
  return (
    pos.x > rect.x &&
    pos.x < rect.x + rect.width &&
    pos.y < rect.y + rect.height &&
    pos.y > rect.y
  );
};