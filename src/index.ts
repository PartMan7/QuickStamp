/**
 * Profiling helper
 */
export class Stamp {
  __startTime: Date | null = null;
  __endTime: Date | null = null;
  __events: [string, Date][] = [];

  constructor({ autostart = true } = {}) {
    if (autostart) this.__startTime = new Date();
  }

  start(): void {
    this.__startTime = new Date();
  }

  note(event: string): void {
    this.__events.push([event, new Date()]);
  }

  end(): void {
    this.__endTime = new Date();
  }

  profile(): void {
    console.log("Started at", this.__startTime);
    let lastEvent = this.__startTime?.getTime() ?? 0;
    this.__events.forEach(([event, time]) => {
      console.log(event, "at", time, "after", time.getTime() - lastEvent, "ms");
      lastEvent = time.getTime();
    });
    const after = this.__events.length
      ? ["after", (this.__endTime?.getTime() ?? 0) - lastEvent, "ms"]
      : [];
    console.log(
      "Ended at",
      this.__endTime,
      ...after,
      "with a total time of",
      (this.__endTime?.getTime() ?? 0) - (this.__startTime?.getTime() ?? 0),
      "ms",
    );
  }

  reset(): void {
    this.__startTime = null;
    this.__endTime = null;
    this.__events.length = 0;
  }
}

export const stamp = new Stamp({ autostart: false });

export type DONOTPUSH = 1;
