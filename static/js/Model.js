import { ReCalEngine } from './ReCalEngine.js';
import * as c from './Constant.js';

export class Model {
    constructor() {
        this.cells = Array.from({ length: c.MAX_ROW + 1 }, () =>
            Array.from({ length: c.MAX_COL + 1 }, () => ({value:'', color:''})));
        
        this.reCal = new ReCalEngine();
    }
    
    getValue(cellOffset) {
    	return this.cells[cellOffset.row][cellOffset.col].value;
    }
    
    setValue(actionParam) {
    	for (let i = 0; i < actionParam.length; i++) {
    		this.cells[actionParam[i].row][actionParam[i].col].value = actionParam[i].value;
    	}
    	
    	let viewData = this.reCal.doReCal((this.getModel()));
    	return viewData;
    }

    setColor(actionParam) {
        for (let i = 0; i < actionParam.length; i++) {
            this.cells[actionParam[i].row][actionParam[i].col].color = actionParam[i].color;
        }

        let viewData = this.reCal.doReCal((this.getModel()));
        return viewData;
    }
    
    getModel() {
        return JSON.parse(JSON.stringify(this.cells));
    }
}