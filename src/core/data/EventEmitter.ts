type Key = string | symbol;
type Listener = (...args: any[]) => void;
type Events = {
  [key: Key]: Listener[];
};

export class EventEmitter {
  events: Events = Object.create(null);

  on(type: Key, listener: Listener): this {
    const { events } = this;
    (events[type] || (events[type] = [])).push(listener);
    return this;
  }

  emit(type: Key, ...args: any[]): boolean {
    const listeners = this.events[type];
    if (!listeners) {
      return false;
    }
    const copy = [...listeners];
    for (let i = 0; i < copy.length; i++) {
      copy[i].apply(this, args);
    }
    return true;
  }

  off(type?: Key, listener?: Listener): this {
    if (!type) {
      this.events = Object.create(null);
      return this;
    }
    const listeners = this.events[type];
    if (!listeners) {
      return this;
    }
    if (!listener) {
      delete this.events[type];
      return this;
    }
    const i = listeners.indexOf(listener);
    if (i < 0) {
      return this;
    }
    if (i === 0) {
      listeners.shift();
    } else {
      listeners.splice(i, 1);
    }
    if (listeners.length < 1) {
      delete this.events[type];
    }
    return this;
  }

  once(type: Key, listener: Listener): this {
    const wrappedListener = (...args: any[]) => {
      listener.apply(this, args);
      this.off(type, wrappedListener);
    };
    this.on(type, wrappedListener);
    return this;
  }

  clear(): this {
    return this.off();
  }
}
