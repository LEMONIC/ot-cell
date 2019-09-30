import * as c from "./Constant.js";

let instance;
export class RemoteEventHandler {
    constructor(controller) {
        if (instance) return instance;
        this.controller = controller;
        instance = this;
    }

    opToAction(op) {
        console.log(op)
        let ops, actionType, actionParam, cellData, val;

        if (op[0].li !== undefined) {
            ops = op[0].li;
            actionType = c.UPDATE_VALUE;
            actionParam = [];
            cellData = {};
            val = "";

            if (ops.cmd !== "noop") {
                if (ops.type === "cellData") {
                    if (Array.isArray(ops.value) === true) {
                        for (let i = ops.pos[0]; i <= ops.pos[2]; i++) {
                            for (let j = ops.pos[1]; j <= ops.pos[3]; j++) {
                                for (let k = 0; k < ops.value.length; k++) {
                                    if (i === ops.value[k].row && j === ops.value[k].col) {
                                        val = ops.value[k].value;
                                        break;
                                    }
                                }
                                cellData = { row: i, col: j, value: val };
                                actionParam.push(cellData);
                                val = "";
                            }
                        }
                    } else {
                        if (ops.pos[3] === 0) {
                            cellData = { row: ops.pos[0], col: ops.pos[1], value: ops.value };
                            actionParam.push(cellData);
                        } else {
                            for (let i = ops.pos[0]; i <= ops.pos[2]; i++) {
                                for (let j = ops.pos[1]; j <= ops.pos[3]; j++) {
                                    cellData = { row: i, col: j, value: ops.value };
                                    actionParam.push(cellData);
                                }
                            }
                        }
                    }
                }

                else if (ops.type === "bgColor") {
                    actionType = c.UPDATE_COLOR;
                    if (Array.isArray(ops.value) === true) {
                        for (let i = ops.pos[0]; i <= ops.pos[2]; i++) {
                            for (let j = ops.pos[1]; j <= ops.pos[3]; j++) {
                                for (let k = 0; k < ops.value.length; k++) {
                                    if (i === ops.value[k].row && j === ops.value[k].col) {
                                        val = ops.value[k].value;
                                        break;
                                    }
                                }
                                cellData = { row: i, col: j, color: val };
                                actionParam.push(cellData);
                                val = "";
                            }
                        }
                    } else {
                        if (ops.pos[3] === 0) {
                            cellData = { row: ops.pos[0], col: ops.pos[1], color: ops.value };
                            actionParam.push(cellData);
                        } else {
                            for (let i = ops.pos[0]; i <= ops.pos[2]; i++) {
                                for (let j = ops.pos[1]; j <= ops.pos[3]; j++) {
                                    cellData = { row: i, col: j, value: ops.value };
                                    actionParam.push(cellData);
                                }
                            }
                        }
                    }
                }
                this.controller.doAction(actionType, actionParam, false);
            }
        }
    }
}