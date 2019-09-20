import { OTEngine } from './OTEngine.js';

export class ActionGenerator {
    constructor() {
        this.ot = new OTEngine();
    }

    createAction(actionType, actionParam) {
        this.ot.actionSender(actionType, actionParam);
    }
}