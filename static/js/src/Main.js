import { DOMEventHandler } from './DOMEventHandler.js';
import { RemoteEventHandler } from './RemoteEventHandler.js';
import { Controller } from './Controller.js';

export class Main {
    constructor() {
        const controller = new Controller();
        new RemoteEventHandler(controller);
        new DOMEventHandler(controller);
    }
}