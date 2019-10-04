import {ot} from './OTEngine.js';
import Consts from './Constants.js';


export class RemoteEventHandler {
    constructor(controller) {
        this.controller = controller;
        this.opToAction;
        ot.addOnChangeCallBack(this, this.opToAction);
    }

    opToAction(op) {
        if (op[0].li !== undefined) {
            let ops = op[0].li,
                actionType = '',
                actionParam = [],
                cellData = {},
                val = '',
                startRowIndex = ops.pos[0],
                startColIndex = ops.pos[1],
                endRowIndex = ops.pos[2],
                endColIndex = ops.pos[3];

            if (ops.cmd !== Consts.ACTION_CMD_NO_OP) {
                if (this._isMultiCell(ops.value)) {
                    for (let i = startRowIndex; i <= endRowIndex; i++) {
                        for (let j = startColIndex; j <= endColIndex; j++) {
                            for (let k = 0; k < ops.value.length; k++) {
                                if (i === ops.value[k].row && j === ops.value[k].col) {
                                    val = ops.value[k].value;
                                    break;
                                }
                            }
                            cellData = {row: i, col: j};
                            if (ops.type === Consts.ACTION_TYPE_CELL_DATA) {
                                cellData.value = val;
                            } else if (ops.type === Consts.ACTION_TYPE_BG_COLOR) {
                                cellData.color = val;
                            }
                            actionParam.push(cellData);
                            val = '';
                        }
                    }
                } else {
                    if (endColIndex === 0) {
                        cellData = {row: startRowIndex, col: startColIndex};
                        if (ops.type === Consts.ACTION_TYPE_CELL_DATA) {
                            cellData.value = ops.value;
                        } else if (ops.type === Consts.ACTION_TYPE_BG_COLOR) {
                            cellData.color = ops.value;
                        }
                        actionParam.push(cellData);
                    } else {
                        for (let i = startRowIndex; i <= endRowIndex; i++) {
                            for (let j = startColIndex; j <= endColIndex; j++) {
                                cellData = {row: i, col: j};
                                if (ops.type === Consts.ACTION_TYPE_CELL_DATA) {
                                    cellData.value = ops.value;
                                } else if (ops.type === Consts.ACTION_TYPE_BG_COLOR) {
                                    cellData.color = ops.value;
                                }
                                actionParam.push(cellData);
                            }
                        }
                    }
                }

                if (ops.type === Consts.ACTION_TYPE_CELL_DATA) {
                    actionType = Consts.UPDATE_VALUE;
                } else if (ops.type === Consts.ACTION_TYPE_BG_COLOR) {
                    actionType = Consts.UPDATE_COLOR;
                }
                this.controller.doAction(actionType, actionParam, false);
            }
        }
    }

    _isMultiCell(cell) {
        return Array.isArray(cell);
    }
}