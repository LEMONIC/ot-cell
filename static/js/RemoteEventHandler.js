let instance;
export class RemoteEventHandler {
    constructor(controller) {
        if (instance) return instance;
        this.controller = controller;
        instance = this;
    }

    _doAction(op) {
        this.controller.doAction(op[1].oi, op[0].oi, false);
    }
}