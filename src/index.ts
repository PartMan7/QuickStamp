/**
 * Profiling helper
 */
export class Stamp {
  #startTime: Date | null = null;
  #endTime: Date | null = null;
  #events: [string, Date][] = [];

  constructor({ autostart = true } = {}) {
    if (autostart) this.#startTime = new Date();
  }

  start(): void {
    this.#startTime = new Date();
  }

  note(event: string): void {
    this.#events.push([event, new Date()]);
  }

  end(): void {
    this.#endTime = new Date();
  }

  profile(): void {
    console.log("Started at", this.#startTime);
    let lastEvent = this.#startTime?.getTime() ?? 0;
    this.#events.forEach(([event, time]) => {
      console.log(event, "at", time, "after", time.getTime() - lastEvent, "ms");
      lastEvent = time.getTime();
    });
    const after = this.#events.length
      ? ["after", (this.#endTime?.getTime() ?? 0) - lastEvent, "ms"]
      : [];
    console.log(
      "Ended at",
      this.#endTime,
      ...after,
      "with a total time of",
      (this.#endTime?.getTime() ?? 0) - (this.#startTime?.getTime() ?? 0),
      "ms",
    );
  }

  reset(): void {
    this.#startTime = null;
    this.#endTime = null;
    this.#events.length = 0;
  }
}

export const stamp = new Stamp({ autostart: false });
