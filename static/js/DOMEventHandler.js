import * as c from './Constant.js';

export class DOMEventHandler {
    constructor(controller) {
        this.controller = controller;
        this._bindDOMEvent();
    }

    _bindDOMEvent() {
    	const that = this;
    	document.querySelector('table').addEventListener('dblclick', function(e) { return that._showInputBox(e); });
        document.querySelector('table').addEventListener('mousedown', function(e) { return that._updateValue(e); });
        document.addEventListener('keyup', function(e) { return that._removeInputBox(e); });
        $('select[name="colorpicker"]').simplecolorpicker({}).on('change', function() { return that._updateColor(); });
    }

    _showInputBox(event) {
        if (event.target.cellIndex === 0 || event.target.parentNode.rowIndex === 0) {
            return;
        }

        if (document.querySelector('input') != null) {
            return;
        }

        const input = event.target.appendChild(document.createElement('input'));

        let cellData = {
            row: event.target.parentNode.rowIndex,
            col: event.target.cellIndex,
        };

        this.controller.doAction(c.SHOW_MODEL_VALUE, cellData);
        input.focus();

        event.target.firstChild.nodeValue = "";
    }

    _updateValue(event) {
        if (event.target.cellIndex === 0 || event.target.parentNode.rowIndex === 0) {
            return;
        }

        if (event.target.nodeName === 'INPUT') {
            return;
        }

        const input = document.querySelector('input');

        if (input != null) {
            let actionParam = [];
            let cellData = {
                row: input.parentNode.parentNode.rowIndex,
                col: input.parentNode.cellIndex,
                value: input.value
            };
            actionParam.push(cellData);

            this._doAction(c.UPDATE_VALUE, actionParam);
            input.remove();
        }

        let cellData = {
            row: event.target.parentNode.rowIndex,
            col: event.target.cellIndex,
        };

        this.controller.doAction(c.SHOW_MODEL_VALUE, cellData);
        $('td').removeClass('ui-selected');
        event.target.classList.add('ui-selected');
    }

    _removeInputBox(event) {
        const input = document.querySelector('input');
        if (input == null) {
            if (event.key === "Delete") {
                let actionParam = [];
                let selectedArr = $('td.ui-selected');

                for (let i = 0; i < selectedArr.length; i++) {
                    let cellData = {
                        row: selectedArr[i].parentNode.rowIndex,
                        col: selectedArr[i].cellIndex,
                        value: ''
                    };
                    actionParam.push(cellData);
                }
                this._doAction(c.UPDATE_VALUE, actionParam);

                $('[class*="range-"]').removeClass (function (index, className) {
                    return (className.match (/(^|\s)range-\S+/g) || []).join(' ');
                });

                $('#fx').text('');
            }
        } else {
            if (event.key === "Enter") {
                let actionParam = [];
                let cellData = {
                    row: input.parentNode.parentNode.rowIndex,
                    col: input.parentNode.cellIndex,
                    value: input.value
                };
                actionParam.push(cellData);

                this._doAction(c.UPDATE_VALUE, actionParam);
                this.controller.doAction(c.SHOW_MODEL_VALUE, cellData);
                input.remove();
            }
        }
    }

    _updateColor() {
            let color = $('select[name="colorpicker"]').val();
            if (color === "#ffffff") {
                color = '';
            }

            let actionParam = [];
            let selectedArr = $('td.ui-selected');

            for (let i = 0; i < selectedArr.length; i++) {
                let cellData = {
                    row: selectedArr[i].parentNode.rowIndex,
                    col: selectedArr[i].cellIndex,
                    color: color
                };
                actionParam.push(cellData);
            }
            this._doAction(c.UPDATE_COLOR, actionParam);
    }

    _doAction(actionType, actionParam) {
        this.controller.doAction(actionType, actionParam, true);
    }
}