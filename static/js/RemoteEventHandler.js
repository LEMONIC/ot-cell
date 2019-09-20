let instance;
export class RemoteEventHandler {
    constructor(controller) {
        if (instance) return instance;
        this.controller = controller;
        instance = this;
    }

    _doAction(op) {
        this.controller.doAction(999, op[0].oi);
    }
}