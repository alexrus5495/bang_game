export interface RuntimePromise {
  promise: Promise<boolean> | undefined;
  resolve: ((result: boolean) => void) | undefined;
}

export class Runtime {
  private promises: Record<string, RuntimePromise>;
  private timers: Record<string, number | undefined>;

  constructor() {
    this.promises = {};
    this.timers = {};
  }

  public setRuntimePromise(
    name: string,
    autoResolveTimer?: number,
    autoResolveValue: boolean = false,
  ) {
    this._cleanupRuntimePromise(name);

    this.promises[name].promise = new Promise<boolean>((resolve) => {
      this.promises[name].resolve = resolve;
    });

    if (autoResolveTimer) {
      this.cleanupRuntimeTimer(name);
      this.setRuntimeTimer(
        name,
        () => this.resolveRuntimePromise(name, autoResolveValue),
        autoResolveTimer,
      );
    }
  }

  public resolveRuntimePromise(name: string, result: boolean) {
    const promiseObj = this.promises[name];
    if (promiseObj?.resolve) {
      promiseObj.resolve(result);
      this._cleanupRuntimePromise(name);
    }
  }

  private _cleanupRuntimePromise(name: string) {
    this.promises[name] = {
      promise: undefined,
      resolve: undefined,
    };
  }

  public getRuntimePromise(name: string) {
    return this.promises[name].promise;
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
