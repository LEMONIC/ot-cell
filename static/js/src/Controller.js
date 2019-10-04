import {Model} from './Model.js';
import {View} from './View.js';
import {ActionGenerator} from './ActionGenerator.js';
import Consts from './Constants.js';

export class Controller {
    constructor() {
        this.model = new Model();
        this.view = new View();
        this.action = new ActionGenerator();
    }

    doAction(actionType, actionParam) {
        switch (actionType) {
            case Consts.UPDATE_VALUE :
                this._updateValue(actionParam);
                break;

            case Consts.UPDATE_COLOR :
                this._updateColor(actionParam);
                break;

            case Consts.SHOW_MODEL_VALUE :
                this._showSingleCellModelValue(actionParam);
                break;

            case Consts.UPDATE_VALUE_WITH_ACTION :
                this._updateValueWithAction(actionType, actionParam);
                break;

            case Consts.UPDATE_COLOR_WITH_ACTION :
                this._updateColorWithAction(actionType, actionParam);
                break;
        }
    }

    _showSingleCellModelValue(cellOffset) {
        const singleCellModelValue = this.model.getValue(cellOffset);
        this.view.renderSingleCellModelValue(singleCellModelValue);
    }

    _updateValue(actionParam) {
        const viewData = this.model.updateValue(actionParam);
        this.view.renderAll(viewData);
    }

    _updateColor(actionParam) {
        const viewData = this.model.updateColor(actionParam);
        this.view.renderAll(viewData);
    }

    _updateValueWithAction(actionType, actionParam) {
        const viewData = this.model.updateValue(actionParam);
        this.action.createAction(actionType, actionParam);
        this.view.renderAll(viewData);
    }

    _updateColorWithAction(actionType, actionParam) {
        const viewData = this.model.updateColor(actionParam);
        this.action.createAction(actionType, actionParam);
        this.view.renderAll(viewData);
    }
}