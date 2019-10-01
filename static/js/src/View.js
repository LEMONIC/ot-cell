import * as c from './Constant.js';

export class View {
    constructor() {
    	this._initTableRender();
    	this._initColorPicker();
    	this._selectableTable();
    }
    
    _initTableRender() {
        this.table = document.querySelector('table');

        for (let i = 0; i <= c.MAX_ROW; i++) {
            let tr = this.table.insertRow();
            tr.id = "row" + i;

            for (let j = 0; j <= c.MAX_COL; j++) {
                let td = this.table.querySelectorAll('tr')[i].insertCell();
                td.id = String.fromCharCode('@'.charCodeAt(0) + j) + i;

                if (i == 0) {
                    td.appendChild(document.createTextNode(String.fromCharCode('@'.charCodeAt(0) + j)));
                } else if (j == 0) {
                    td.appendChild(document.createTextNode(i));
                }
            }
        }
    }
    
    _selectableTable() {
    	$('table').selectable({distance: 1});
    }
    
    _initColorPicker() {
    	$('select[name="colorpicker"]').simplecolorpicker();
    }
    
    renderAll(viewData) {
        for (let i = 1; i <= c.MAX_ROW; i++) {
            for (let j = 1; j <= c.MAX_COL; j++) {
        		this.table.rows[i].cells[j].innerText = viewData[i][j].value;
        		this.table.rows[i].cells[j].style.background = viewData[i][j].color;
            }
        }
	}
    
    renderSingleCellModelValue(modelValue) {
    	$('input').val(modelValue);
    	$('#fx').text(modelValue);

        $('[class*="range-"]').removeClass (function (index, className) {
            return (className.match (/(^|\s)range-\S+/g) || []).join(' ');
        });

        if (String(modelValue).charAt(0) === "=") {
            let str = modelValue.replace(/\s/gi, "").substring(1).toUpperCase();

            if (str.includes("(") && str.includes(")") && str.includes(":")) {
                const _a = str.substring(str.indexOf("(") + 1, str.indexOf(':'));
                const a = {
                    row: Number(_a.substring(1, _a.length)),
                    col: Number(_a.charAt(0).charCodeAt() - 64)
                };

                const _b = str.substring(str.indexOf(':') + 1, str.indexOf(")"));
                const b = {
                    row: Number(_b.substring(1, _b.length)),
                    col: Number(_b.charAt(0).charCodeAt() - 64)
                };

                for (let i = a.row; i <= b.row; i++) {
                    for (let j = a.col; j <= b.col; j++) {
                        if (i === a.row) {
                            this.table.rows[i].cells[j].classList.add("range-top");
                        }

                        if (i === b.row) {
                            this.table.rows[i].cells[j].classList.add("range-bottom");
                        }

                        if (j === a.col) {
                            this.table.rows[i].cells[j].classList.add("range-left");
                        }

                        if (j === b.col) {
                            this.table.rows[i].cells[j].classList.add("range-right");
                        }
                    }
                }
            } else {
                const row = str.substring(1, str.length);
                const col = str.charAt(0).charCodeAt()-64;

                this.table.rows[row].cells[col].classList.add("range-all");
            }
        }
    }
}