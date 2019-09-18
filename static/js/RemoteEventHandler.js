import * as c from './Constant.js';

let $state;

export class RemoteEventHandler {
    constructor(controller) {
        this.controller = controller;
        this.OTEngine();
    }

    OTEngine() {
        var that = this;
        sharejs.open("ot", "json", function(error, doc) {
            $state = doc;
            doc.on("change", function (op) {
                if (op.length < 2) return;
                that._doAction(op[1].oi, op[0].oi);
            });

            doc.submitOp([{
                p : [],
                od : null,
                oi : {
                    actionType : '',
                    actionParam : null
                }
            }
            ]);
        });
    }

    _doAction(actionType, actionParam) {
        //r.actionGenerator(actionType, actionParam);
        this.controller.doAction(actionType, actionParam);
    }
}

export function actionGenerator(actionType, actionParam) {
    $state.submitOp([{
        p:['actionParam'],
        oi:actionParam
    },{
        p:['actionType'],
        oi:actionType
    }]);
}