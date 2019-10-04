export default class Utils {
    static isFormula(val) {
        return String(val).charAt(0) === '=';
    }

    static isFunction(str) {
        return str.includes('(') && str.includes(')') && str.includes(':');
    }

    static getFormulaStringForReCal(str) {
        return str.replace(/\s/gi, '').substring(1).toUpperCase();
    }

    static getFunctionData(str) {
        let functionName = str.substring(0, str.indexOf('('));

        const startCellOffsetString = str.substring(str.indexOf('(') + 1, str.indexOf(':')),
            startCellOffset = this.getRowColOffset(startCellOffsetString),

            endCellOffsetString = str.substring(str.indexOf(':') + 1, str.indexOf(')')),
            endCellOffset = this.getRowColOffset(endCellOffsetString);

        return {
            functionName: functionName,
            startCell: startCellOffset,
            endCell: endCellOffset
        }
    }

    static getRowColOffset(cellInfo) {
        return {
            row: Number(cellInfo.substring(1, cellInfo.length)) - 1,
            col: this._alphabetToNumber(cellInfo.charAt(0)) - 1
        };
    }

    static _alphabetToNumber(alphabet) {
        return Number(alphabet.charCodeAt(0) - 64);
    }
}