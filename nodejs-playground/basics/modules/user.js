import * as events from "node:events";

class User extends events.EventEmitter {
  constructor() {
    super();
  }
}

export { User };
