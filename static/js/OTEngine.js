import * as r from './RemoteEventHandler.js';

let $ops;
export class OTEngine {
    constructor() {
        this.init();
    }

    init() {
        sharejs.open("ot", "json", function (error, doc) {
            doc.on("change", function (op) {
                //if (op.length < 2) return;
                //new r.RemoteEventHandler()._doAction(op);
                //console.log(op);
            });
            if (doc.created) {
                doc.submitOp([{
                    p: [],
                    od: null,
                    oi: {
                        cellData: null,
                        ops:[]
                    }
                }]);
            }
            $ops = doc.at('ops');
        });
    }

    actionSender(action) {
        $ops.insert(0, action);
    }
}