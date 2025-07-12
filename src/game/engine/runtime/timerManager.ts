export class TimerManager {
  timers: Record<string, number | undefined>;

  constructor() {
    this.timers = {};
  }

  public setRuntimeTimer(name: string, handler: () => void, timeout: number) {
    this.timers[name] = setTimeout(() => {
      handler();
      this.timers[name] = undefined;
    }, timeout);
  }

  public cleanupRuntimeTimer(name: string) {
    if (name in this.timers) {
      clearTimeout(this.timers[name]);
      this.timers[name] = undefined;
    }
  }
}
