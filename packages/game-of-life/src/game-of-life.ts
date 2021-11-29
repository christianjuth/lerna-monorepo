type EventListenerType = "onChange";
type EventListenerFn = () => any;

class GameOfLife {
  frame0: number[][];
  frame1: number[][];
  selectedFrame = 0;
  eventListeners: Record<EventListenerType, EventListenerFn[]> = {
    onChange: [],
  };

  constructor(height: number, width = height) {
    this.frame0 = Array(height)
      .fill(0)
      .map((row) =>
        Array(width)
          .fill(0)
          .map(() => (Math.random() <= 0.2 ? 1 : 0))
      );
    this.frame1 = Array(height)
      .fill(0)
      .map(() =>
        Array(width)
          .fill(0)
          .map(() => 0)
      );
  }

  countNeighbors(frame: number[][], x: number, y: number) {
    return [
      frame[y - 1]?.[x],
      frame[y - 1]?.[x + 1],
      frame[y]?.[x + 1],
      frame[y + 1]?.[x + 1],
      frame[y + 1]?.[x],
      frame[y + 1]?.[x - 1],
      frame[y]?.[x - 1],
      frame[y - 1]?.[x - 1],
    ].reduce((acc, num) => acc + (num === 1 ? 1 : 0), 0);
  }

  tick() {
    const frame = this.selectedFrame === 0 ? this.frame0 : this.frame1;
    const next = this.selectedFrame === 0 ? this.frame1 : this.frame0;

    for (let y = 0; y < frame.length; y++) {
      for (let x = 0; x < frame[y].length; x++) {
        const neighbors = this.countNeighbors(frame, x, y);
        if (frame[y][x] === 0 && neighbors === 3) {
          next[y][x] = 1;
        } else if (frame[y][x] === 1 && (neighbors < 2 || neighbors > 3)) {
          next[y][x] = 0;
        } else {
          next[y][x] = frame[y][x];
        }
      }
    }

    // swap frame
    this.selectedFrame = (this.selectedFrame + 1) % 2;
    this.notifyChange();
  }

  getFrame() {
    return this.selectedFrame === 0 ? this.frame0 : this.frame1;
  }

  toString() {
    const frame = this.selectedFrame === 0 ? this.frame0 : this.frame1;
    return frame.map((row) => row.join("")).join("\n");
  }

  print() {
    console.log(this.toString());
    console.log("\n");
  }

  notifyChange() {
    this.eventListeners.onChange.forEach((fn) => fn());
  }

  addEventListener(type: EventListenerType, fn: EventListenerFn) {
    this.eventListeners[type].push(fn);
  }

  removeEventListener(type: EventListenerType, fn: EventListenerFn) {
    this.eventListeners[type] = this.eventListeners[type].filter(
      (l) => l !== fn
    );
  }
}

export function gameOfLife(height: number, width = height) {
  return new GameOfLife(height, width);
}
