import Consts from './Constants.js';
import Utils from "./Utils.js";

export class ReCalEngine {
    constructor() {
    }

    doReCal(viewData) {
        let recursionFlag = false,
            cellInfo;

        for (let i = 0; i < Consts.MAX_ROW; i++) {
            for (let j = 0; j < Consts.MAX_COL; j++) {
                if (Utils.isFormula(viewData[i][j].value)) {
                    recursionFlag = true;
                    let str = Utils.getFormulaStringForReCal(viewData[i][j].value);

                    if (Utils.isFunction(str)) {
                        cellInfo = Utils.getFunctionData(str);

                        let cells = [];
                        for (let i = cellInfo.startCell.row; i <= cellInfo.endCell.row; i++) {
                            for (let j = cellInfo.startCell.col; j <= cellInfo.endCell.col; j++) {
                                cells.push(Number(viewData[i][j].value));
                            }
                        }

                        if (cells.length > 0) {
                            switch (cellInfo.functionName) {
                                case Consts.FUNCTION_SUM :
                                    viewData[i][j].value = cells.reduce((accumulator, currentValue) => accumulator + currentValue);
                                    break;

                                case Consts.FUNCTION_AVERAGE :
                                    let sum = 0,
                                        count = 0;
                                    for (let k = 0; k < cells.length; k++) {
                                        if (cells[k] === 0) {
                                            continue;
                                        } else if (isNaN(cells[k])) {
                                            sum = Consts.CALC_FAILED;
                                            break;
                                        }
                                        sum += cells[k];
                                        count++;
                                    }
                                    viewData[i][j].value = sum / count;
                                    break;

                                case Consts.FUNCTION_MIN :
                                    viewData[i][j].value = Math.min(...cells);
                                    break;

                                case Consts.FUNCTION_MAX :
                                    viewData[i][j].value = Math.max(...cells);
                                    break;

                                default :
                                    viewData[i][j].value = Consts.NOT_FOUND_FUNCTION;
                                    break;
                            }
                        }
                    } else {
                        cellInfo = Utils.getRowColOffset(str);
                        viewData[i][j].value = viewData[cellInfo.row][cellInfo.col].value;
                    }
                }
            }
        }

        if (recursionFlag === true) {
            this.doReCal(viewData);
        }

        return viewData;
    }
}


