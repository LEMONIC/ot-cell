import { Model } from './Model.js';
import { View } from './View.js';
import { ActionGenerator } from './ActionGenerator.js';
import * as c from './Constant.js';

export class Controller {
    constructor() {
        this.model = new Model();
        this.view = new View();
        this.action = new ActionGenerator();
    }

    doAction(actionType, actionParam) {
    	switch(actionType) {
            case c.UPDATE_VALUE :
                this._updateValue(actionParam);
                break;

            case c.UPDATE_COLOR :
                this._updateColor(actionParam);
                break;
                
            case c.SHOW_MODEL_VALUE :
                this._showSingleCellModelValue(actionParam);
                break;

            case 999 :
                this._remoteUpdateColor(actionParam);
                break;

            default :
                break;
        }
    }
    
    _showSingleCellModelValue(cellOffset) {
        const singleCellmodelValue = this.model.getValue(cellOffset);
        this.view.renderSingleCellModelValue(singleCellmodelValue);
    }

    _updateValue(actionParam) {
        const viewData = this.model.setValue(actionParam);
        this.view.renderAll(viewData);
    }

    _updateColor(actionParam) {
        const viewData = this.model.setColor(actionParam);
        this.action.createAction(1, actionParam);
        this.view.renderAll(viewData);
    }

    _remoteUpdateColor(actionParam) {
        const viewData = this.model.setColor(actionParam);
        this.view.renderAll(viewData);
    }
}