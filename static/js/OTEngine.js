import * as r from './RemoteEventHandler.js';

let $state;

export class OTEngine {
    constructor() {
        this.init();
    }

    init() {
        sharejs.open("ot", "json", function (error, doc) {
            $state = doc;
            doc.on("change", function (op) {
                if (op.length < 2) return;
                new r.RemoteEventHandler()._doAction(op);
            });

            doc.submitOp([{
                p: [],
                od: null,
                oi: {
                    actionType: '',
                    actionParam: null
                }
            }
            ]);
        });
    }

    actionSender(actionType, actionParam) {
        $state.submitOp([{
            p: ['actionParam'],
            oi: actionParam
        }, {
            p: ['actionType'],
            oi: actionType
        }]);
    }
}