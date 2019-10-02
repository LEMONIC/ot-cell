import { ot } from './OTEngine.js';
import * as c from './Constant.js';

export class ActionGenerator {
    constructor() { }

    createAction(actionType, actionParam) {
        let action = {
            cmd : "",
            type : "",
            value : "",
            pos : []
        };

        switch(actionType) {
            case c.UPDATE_VALUE :
                if (actionParam[0].value === "") {
                    action.cmd = "delete";
                    action.value = "";
                } else {
                    action.cmd = "insert";
                    action.value = actionParam[0].value;
                }
                action.type = "cellData";
                break;

            case c.UPDATE_COLOR :
                action.cmd = "update";
                action.type = "bgColor";
                action.value = actionParam[0].color;
                break;
        }

        if (actionParam.length === 1) {
            action.pos.push(actionParam[0].row);
            action.pos.push(actionParam[0].col);
            action.pos.push(0);
            action.pos.push(0);
        } else {
            action.pos.push(actionParam[0].row);
            action.pos.push(actionParam[0].col);
            action.pos.push(actionParam[actionParam.length-1].row);
            action.pos.push(actionParam[actionParam.length-1].col);
        }
        ot.actionSender(action);
    }
}