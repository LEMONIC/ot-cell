import { Model } from './Model.js';
import { View } from './View.js';
import * as c from './Constant.js';

export class Controller {
    constructor() {
        this.model = new Model();
        this.view = new View();
    }

    doAction(actionType, actionParam) {
        //console.log(actionType);
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
        this.view.renderAll(viewData);
    }
}