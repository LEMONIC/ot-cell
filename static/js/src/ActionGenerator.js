import {ot} from './OTEngine.js';
import Consts from './Constants.js';

export class ActionGenerator {
    constructor() {
    }

    createAction(actionType, actionParam) {
        let action = {
            cmd: '',
            type: '',
            value: '',
            pos: []
        };

        switch (actionType) {
            case Consts.UPDATE_VALUE_WITH_ACTION :
                if (actionParam[0].value === '') {
                    action.cmd = Consts.ACTION_CMD_DELETE;
                    action.value = '';
                } else {
                    action.cmd = Consts.ACTION_CMD_INSERT;
                    action.value = actionParam[0].value;
                }
                action.type = Consts.ACTION_TYPE_CELL_DATA;
                break;

            case Consts.UPDATE_COLOR_WITH_ACTION :
                action.cmd = Consts.ACTION_CMD_UPDATE;
                action.type = Consts.ACTION_TYPE_BG_COLOR;
                action.value = actionParam[0].color;
                break;
        }

        if (this._isSingleCell(actionParam.length)) {
            action.pos.push(actionParam[0].row);
            action.pos.push(actionParam[0].col);
            action.pos.push(0);
            action.pos.push(0);
        } else {
            action.pos.push(actionParam[0].row);
            action.pos.push(actionParam[0].col);
            action.pos.push(actionParam[actionParam.length - 1].row);
            action.pos.push(actionParam[actionParam.length - 1].col);
        }
        ot.actionSender(action);
    }

    _isSingleCell(cellRange) {
        return cellRange === 1;
    }
}