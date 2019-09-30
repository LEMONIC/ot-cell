import * as c from "./Constant.js";

let instance;
export class RemoteEventHandler {
    constructor(controller) {
        if (instance) return instance;
        this.controller = controller;
        instance = this;
    }

    opToAction(op) {
        let ops, actionType, actionParam, cellData;

        if (op[0].ld !== undefined) {
            ops = op[0].ld;
            actionType = c.UPDATE_COLOR;
            actionParam = [];
            cellData = {};
            
            if (ops.type === "cellData" && ops.cmd === "delete") {
                if (ops.pos[3] === 0) {
                    cellData = {
                        row: ops.pos[0],
                        col: ops.pos[1],
                        value: ops.value
                    };
                    actionParam.push(cellData);
                } else {
                    for (let i = ops.pos[0]; i <= ops.pos[2]; i++) {
                        for (let j = ops.pos[1]; j <= ops.pos[3]; j++) {
                            cellData = {
                                row: i,
                                col: j,
                                value: ops.value
                            };
                            actionParam.push(cellData);
                        }
                    }
                }
                actionType = c.UPDATE_VALUE;
            } else if (ops.type === "bgColor" && ops.cmd === "update") {
                if (ops.pos[3] === 0) {
                    cellData = {
                        row: ops.pos[0],
                        col: ops.pos[1],
                        color: ops.value
                    };
                    actionParam.push(cellData);
                } else {
                    for (let i = ops.pos[0]; i <= ops.pos[2]; i++) {
                        for (let j = ops.pos[1]; j <= ops.pos[3]; j++) {
                            cellData = {
                                row: i,
                                col: j,
                                color: ops.value
                            };
                            actionParam.push(cellData);
                        }
                    }
                }
            }
            this.controller.doAction(actionType, actionParam, false);
        }

        if (op[0].li !== undefined) {
            ops = op[0].li;
            actionType = c.UPDATE_COLOR;
            actionParam = [];
            cellData = {};

            if (ops.cmd === "noop") {

            } else {

                if (ops.type === "cellData") {
                    if (ops.pos[3] === 0) {
                        cellData = {
                            row: ops.pos[0],
                            col: ops.pos[1],
                            value: ops.value
                        };
                        actionParam.push(cellData);
                    } else {
                        for (let i = ops.pos[0]; i <= ops.pos[2]; i++) {
                            for (let j = ops.pos[1]; j <= ops.pos[3]; j++) {
                                cellData = {
                                    row: i,
                                    col: j,
                                    value: ops.value
                                };
                                actionParam.push(cellData);
                            }
                        }
                    }
                    actionType = c.UPDATE_VALUE;
                } else if (ops.type === "bgColor") {
                    if (ops.pos[3] === 0) {
                        cellData = {
                            row: ops.pos[0],
                            col: ops.pos[1],
                            color: ops.value
                        };
                        actionParam.push(cellData);
                    } else {
                        for (let i = ops.pos[0]; i <= ops.pos[2]; i++) {
                            for (let j = ops.pos[1]; j <= ops.pos[3]; j++) {
                                cellData = {
                                    row: i,
                                    col: j,
                                    color: ops.value
                                };
                                actionParam.push(cellData);
                            }
                        }
                    }
                }
                this.controller.doAction(actionType, actionParam, false);
            }
        }
    }
}