import Consts from './Constants.js';

export class DOMEventHandler {
    constructor(controller) {
        this.controller = controller;
        this._bindDOMEvent();
    }

    _bindDOMEvent() {
        const that = this;
        document.querySelector('table').addEventListener('dblclick', function (e) {
            return that._showInputBox(e);
        });
        document.querySelector('table').addEventListener('mousedown', function (e) {
            return that._updateValue(e);
        });
        document.addEventListener('keyup', function (e) {
            return that._removeInputBox(e);
        });
        $('select[name="colorpicker"]').simplecolorpicker({}).on('change', function () {
            return that._updateColor();
        });
    }

    _showInputBox(event) {
        if (event.target.cellIndex === 0 || event.target.parentNode.rowIndex === 0) {
            return;
        }

        if (document.querySelector('input') != null) {
            return;
        }

        const input = document.body.appendChild(document.createElement('input')),
            tdRect = event.target.getBoundingClientRect();

        $('input').css({
            position: 'absolute',
            bottom: tdRect.bottom,
            height: tdRect.height,
            left: tdRect.left,
            right: tdRect.right,
            top: tdRect.top,
            width: tdRect.width,
            x: tdRect.x,
            y: tdRect.y
        });

        const cellData = {
            row: event.target.parentNode.rowIndex - 1,
            col: event.target.cellIndex - 1,
        };

        this.controller.doAction(Consts.SHOW_MODEL_VALUE, cellData);
        input.id = cellData.row + ',' + cellData.col;
        input.focus();
    }

    _updateValue(event) {
        if (event.target.cellIndex === 0 || event.target.parentNode.rowIndex === 0) {
            return;
        }

        if (this._isDoubleClickAgainOnInputbox(event.target.nodeName)) {
            return;
        }

        const input = document.querySelector('input');

        if (input !== null) {
            const actionParam = [],
                cellIndex = input.id.split(','),
                cellData = {
                    row: Number(cellIndex[0]),
                    col: Number(cellIndex[1]),
                    value: input.value
                };
            actionParam.push(cellData);

            this._doAction(Consts.UPDATE_VALUE_WITH_ACTION, actionParam);
            input.remove();
        }

        const cellData = {
            row: event.target.parentNode.rowIndex - 1,
            col: event.target.cellIndex - 1,
        };

        this.controller.doAction(Consts.SHOW_MODEL_VALUE, cellData);
        $('td').removeClass('ui-selected');
        event.target.classList.add('ui-selected');
    }

    _isDoubleClickAgainOnInputbox(nodeName) {
        return nodeName === 'INPUT';
    }

    _removeInputBox(event) {
        const input = document.querySelector('input');
        if (input === null) {
            if (event.key === 'Delete') {
                const actionParam = [],
                    selectedArr = $('td.ui-selected');
                let cellData = {};

                for (let i = 0; i < selectedArr.length; i++) {
                    cellData = {
                        row: selectedArr[i].parentNode.rowIndex - 1,
                        col: selectedArr[i].cellIndex - 1,
                        value: ''
                    };
                    actionParam.push(cellData);
                }
                this._doAction(Consts.UPDATE_VALUE_WITH_ACTION, actionParam);

                $('[class*="range-"]').removeClass(function (index, className) {
                    return (className.match(/(^|\s)range-\S+/g) || []).join(' ');
                });

                $('#fx').text('');
            }
        } else {
            if (event.key === 'Enter') {
                let actionParam = [],
                    cellIndex = input.id.split(','),
                    cellData = {
                        row: Number(cellIndex[0]),
                        col: Number(cellIndex[1]),
                        value: input.value
                    };
                actionParam.push(cellData);

                this._doAction(Consts.UPDATE_VALUE_WITH_ACTION, actionParam);
                this.controller.doAction(Consts.SHOW_MODEL_VALUE, cellData);
                input.remove();
            }
        }
    }

    _updateColor() {
        let color = $('select[name="colorpicker"]').val(),
            cellData = {};

        const actionParam = [],
            selectedArr = $('td.ui-selected');

        if (color === '#ffffff') {
            color = '';
        }

        for (let i = 0; i < selectedArr.length; i++) {
            cellData = {
                row: selectedArr[i].parentNode.rowIndex - 1,
                col: selectedArr[i].cellIndex - 1,
                color: color
            };
            actionParam.push(cellData);
        }
        this._doAction(Consts.UPDATE_COLOR_WITH_ACTION, actionParam);
    }

    _doAction(actionType, actionParam) {
        this.controller.doAction(actionType, actionParam);
    }
}