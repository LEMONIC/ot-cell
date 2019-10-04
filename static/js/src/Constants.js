const MAX_COL = 10,
    MAX_ROW = 25,

    UPDATE_VALUE = 0,
    UPDATE_COLOR = 1,
    SHOW_MODEL_VALUE = 2,
    UPDATE_VALUE_WITH_ACTION = 3,
    UPDATE_COLOR_WITH_ACTION = 4,

    ACTION_CMD_NO_OP = 'noop',
    ACTION_CMD_INSERT = 'insert',
    ACTION_CMD_DELETE = 'delete',
    ACTION_CMD_UPDATE = 'update',

    ACTION_TYPE_CELL_DATA = 'cellData',
    ACTION_TYPE_BG_COLOR = 'bgColor',

    FUNCTION_SUM = 'SUM',
    FUNCTION_AVERAGE = 'AVERAGE',
    FUNCTION_MIN = 'MIN',
    FUNCTION_MAX = 'MAX',
    NOT_FOUND_FUNCTION = '#NAME?',
    CALC_FAILED = 'NaN';

export default class Constants {
    static get MAX_COL() {
        return MAX_COL;
    }

    static get MAX_ROW() {
        return MAX_ROW;
    }

    static get UPDATE_VALUE() {
        return UPDATE_VALUE;
    }

    static get UPDATE_COLOR() {
        return UPDATE_COLOR;
    }

    static get SHOW_MODEL_VALUE() {
        return SHOW_MODEL_VALUE;
    }

    static get UPDATE_VALUE_WITH_ACTION() {
        return UPDATE_VALUE_WITH_ACTION;
    }

    static get UPDATE_COLOR_WITH_ACTION() {
        return UPDATE_COLOR_WITH_ACTION;
    }

    static get ACTION_CMD_NO_OP() {
        return ACTION_CMD_NO_OP;
    }

    static get ACTION_CMD_INSERT() {
        return ACTION_CMD_INSERT;
    }

    static get ACTION_CMD_DELETE() {
        return ACTION_CMD_DELETE;
    }

    static get ACTION_CMD_UPDATE() {
        return ACTION_CMD_UPDATE;
    }

    static get ACTION_TYPE_CELL_DATA() {
        return ACTION_TYPE_CELL_DATA;
    }

    static get ACTION_TYPE_BG_COLOR() {
        return ACTION_TYPE_BG_COLOR;
    }

    static get FUNCTION_SUM() {
        return FUNCTION_SUM;
    }

    static get FUNCTION_AVERAGE() {
        return FUNCTION_AVERAGE;
    }

    static get FUNCTION_MIN() {
        return FUNCTION_MIN;
    }

    static get FUNCTION_MAX() {
        return FUNCTION_MAX;
    }

    static get NOT_FOUND_FUNCTION() {
        return NOT_FOUND_FUNCTION;
    }

    static get CALC_FAILED() {
        return CALC_FAILED;
    }
}