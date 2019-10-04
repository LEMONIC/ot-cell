import Consts from './Constants.js';
import Utils from "./Utils.js";

export class View {
    constructor() {
        this._initTableRender();
        this._initColorPicker();
        this._initSelectable();
    }

    _initTableRender() {
        this.table = document.querySelector('table');

        for (let i = 0; i < Consts.MAX_ROW; i++) {
            let tr = this.table.insertRow();
            tr.id = 'row' + i;

            for (let j = 0; j < Consts.MAX_COL; j++) {
                let td = this.table.querySelectorAll('tr')[i].insertCell();
                td.id = String.fromCharCode('@'.charCodeAt(0) + j) + i;

                if (i === 0) {
                    td.appendChild(document.createTextNode(String.fromCharCode('@'.charCodeAt(0) + j)));
                } else if (j === 0) {
                    td.appendChild(document.createTextNode(String(i)));
                }
            }
        }
    }

    _initSelectable() {
        $('table').selectable({distance: 1});
    }

    _initColorPicker() {
        $('select[name="colorpicker"]').simplecolorpicker();
    }

    renderAll(viewData) {
        let fxText = '',
            domColIndex,
            domRowIndex;
        for (let i = 0; i < Consts.MAX_ROW - 1; i++) {
            domRowIndex = i + 1;
            for (let j = 0; j < Consts.MAX_COL - 1; j++) {
                domColIndex = j + 1;
                this.table.rows[domRowIndex].cells[domColIndex].innerText = viewData[i][j].value;
                this.table.rows[domRowIndex].cells[domColIndex].style.background = viewData[i][j].color;
                if (this.table.rows[domRowIndex].cells[domColIndex].classList.contains('ui-selected')) {
                    fxText = viewData[i][j].value;
                }
            }
        }
        $('#fx').text(fxText);
    }

    renderSingleCellModelValue(modelValue) {
        $('input').val(modelValue);
        $('#fx').text(modelValue);

        $('[class*="range-"]').removeClass(function (index, className) {
            return (className.match(/(^|\s)range-\S+/g) || []).join(' ');
        });

        if (Utils.isFormula(modelValue)) {
            let str = Utils.getFormulaStringForReCal(modelValue),
                cellInfo,
                domColIndex,
                domRowIndex;

            if (Utils.isFunction(str)) {
                cellInfo = Utils.getFunctionData(str);

                for (let i = cellInfo.startCell.row; i <= cellInfo.endCell.row; i++) {
                    domRowIndex = i + 1;
                    for (let j = cellInfo.startCell.col; j <= cellInfo.endCell.col; j++) {
                        domColIndex = j + 1;
                        if (i === cellInfo.startCell.row) {
                            this.table.rows[domRowIndex].cells[domColIndex].classList.add('range-top');
                        }

                        if (i === cellInfo.endCell.row) {
                            this.table.rows[domRowIndex].cells[domColIndex].classList.add('range-bottom');
                        }

                        if (j === cellInfo.startCell.col) {
                            this.table.rows[domRowIndex].cells[domColIndex].classList.add('range-left');
                        }

                        if (j === cellInfo.endCell.col) {
                            this.table.rows[domRowIndex].cells[domColIndex].classList.add('range-right');
                        }
                    }
                }
            } else {
                cellInfo = Utils.getRowColOffset(str);
                this.table.rows[cellInfo.row + 1].cells[cellInfo.col + 1].classList.add('range-all');
            }
        }
    }
}