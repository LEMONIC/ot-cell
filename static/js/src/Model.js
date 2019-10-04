import {ReCalEngine} from './ReCalEngine.js';
import Consts from './Constants.js';

export class Model {
    constructor() {
        // {{color: '', value: ''}[MAX_ROW][MAX_COL]}
        this.cells = Array.from({length: Consts.MAX_ROW}, () =>
            Array.from({length: Consts.MAX_COL}, () => ({value: '', color: ''})));

        this.reCal = new ReCalEngine();
    }

    getValue(cellOffset) {
        return this.cells[cellOffset.row][cellOffset.col].value;
    }

    updateValue(actionParam) {
        for (let i = 0; i < actionParam.length; i++) {
            this.cells[actionParam[i].row][actionParam[i].col].value = actionParam[i].value;
        }

        return this.reCal.doReCal((this._getModel()));
    }

    updateColor(actionParam) {
        for (let i = 0; i < actionParam.length; i++) {
            this.cells[actionParam[i].row][actionParam[i].col].color = actionParam[i].color;
        }

        return this.reCal.doReCal((this._getModel()));
    }

    _getModel() {
        return JSON.parse(JSON.stringify(this.cells));
    }
}