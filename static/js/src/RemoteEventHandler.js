import { ot } from './OTEngine.js';
import * as c from "./Constant.js";


export class RemoteEventHandler {
    constructor(controller) {
        this.controller = controller;
        this.opToAction;
        ot.addOnChangeCallBack(this, this.opToAction);
    }

    opToAction(op) {
        let ops, actionType, actionParam, cellData, val;

        if (op[0].li !== undefined) {
            ops = op[0].li;
            actionType = "";
            actionParam = [];
            cellData = {};
            val = "";

            if (ops.cmd !== "noop") {
                if (Array.isArray(ops.value) === true) {
                    for (let i = ops.pos[0]; i <= ops.pos[2]; i++) {
                        for (let j = ops.pos[1]; j <= ops.pos[3]; j++) {
                            for (let k = 0; k < ops.value.length; k++) {
                                if (i === ops.value[k].row && j === ops.value[k].col) {
                                    val = ops.value[k].value;
                                    break;
                                }
                            }
                            cellData = { row: i, col: j };
                            if (ops.type === "cellData") {
                                cellData.value = val;
                            } else if (ops.type === "bgColor") {
                                cellData.color = val;
                            }
                            actionParam.push(cellData);
                            val = "";
                        }
                    }
                } else {
                    if (ops.pos[3] === 0) {
                        cellData = { row: ops.pos[0], col: ops.pos[1] };
                        if (ops.type === "cellData") {
                            cellData.value = ops.value;
                        } else if (ops.type === "bgColor") {
                            cellData.color = ops.value;
                        }
                        actionParam.push(cellData);
                    } else {
                        for (let i = ops.pos[0]; i <= ops.pos[2]; i++) {
                            for (let j = ops.pos[1]; j <= ops.pos[3]; j++) {
                                cellData = { row: i, col: j };
                                if (ops.type === "cellData") {
                                    cellData.value = ops.value;
                                } else if (ops.type === "bgColor") {
                                    cellData.color = ops.value;
                                }
                                actionParam.push(cellData);
                            }
                        }
                    }
                }

                if (ops.type === "cellData") {
                    actionType = c.UPDATE_VALUE;
                } else if (ops.type === "bgColor") {
                    actionType = c.UPDATE_COLOR;
                }
                this.controller.doAction(actionType, actionParam, false);
            }
        }
    }
}