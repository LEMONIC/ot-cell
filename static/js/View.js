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
    }
}