import {ReCalEngine} from './../src/ReCalEngine.js';
import Consts from './../src/Constants.js';

function initCellData(viewData) {
    viewData = Array.from({length: Consts.MAX_ROW}, () =>
        Array.from({length: Consts.MAX_COL}, () => ({value: '', color: ''})));

    /**
     * [Data Table]
     * ╔═══╦═══╦═══╦═══╦═══╦═══╗
     * ║ @ ║ A ║ B ║ C ║ D ║ E ║
     * ╠═══╬═══╩═══╩═══╩═══╩═══╝
     * ║ 1 ║ 1 │ 2 │ 3 │ 4 │ 5 │
     * ╠═══╣───┼───┼───┼───┼───┤
     * ║ 2 ║-17│0.5│999│str│   │
     * ╚═══╝───┴───┴───┴───┴───┘
     */

    viewData[0][0].value = 1;
    viewData[0][1].value = 2;
    viewData[0][2].value = 3;
    viewData[0][3].value = 4;
    viewData[0][4].value = 5;

    viewData[1][0].value = -17;
    viewData[1][1].value = 0.5;
    viewData[1][2].value = 999;
    viewData[1][3].value = 'STRING';
    // viewData[1][4].value = isEmpty

    return viewData;
}

describe('SUM', function () {
    let r = new ReCalEngine();
    let viewData;

    beforeEach(function () {
        viewData = initCellData(viewData);
    });

    it('=SUM(A1:C2)', function () {
        viewData[10][1].value = '=SUM(A1:C2)';
        r.doReCal(viewData);
        expect(viewData[10][1].value).toBe(988.5);
    });

    it('=SUM(A1:B1), =SUM(C1:F1)', function () {
        viewData[0][5].value = '=SUM(A1:B1)';
        viewData[10][1].value = '=SUM(C1:F1)';
        r.doReCal(viewData);
        expect(viewData[10][1].value).toBe(15);
    });

    it('=SUM(A1:E2)', function () {
        viewData[10][1].value = '=SUM(A1:E2)';
        r.doReCal(viewData);
        expect(viewData[10][1].value).toEqual(NaN);
    });
});

describe('AVERAGE', function () {
    let r = new ReCalEngine();
    let viewData;

    beforeEach(function () {
        viewData = initCellData(viewData);
    });

    it('=AVERAGE(A1:C2)', function () {
        viewData[10][1].value = '=AVERAGE(A1:C2)';
        r.doReCal(viewData);
        expect(viewData[10][1].value).toBe(164.75);
    });

    it('=AVERAGE(C1:D2)', function () {
        viewData[10][1].value = '=AVERAGE(C1:D2)';
        r.doReCal(viewData);
        expect(viewData[10][1].value).toEqual(NaN);
    });

    it('=AVERAGE(E1:E2)', function () {
        viewData[10][1].value = '=AVERAGE(E1:E2)';
        r.doReCal(viewData);
        expect(viewData[10][1].value).toBe(5);
    });
});

describe('MAX', function () {
    let r = new ReCalEngine();
    let viewData;

    beforeEach(function () {
        viewData = initCellData(viewData);
    });

    it('=MAX(A1:C2)', function () {
        viewData[10][1].value = '=MAX(A1:C2)';
        r.doReCal(viewData);
        expect(viewData[10][1].value).toBe(999);
    });

    it('=MAX(C1:D2)', function () {
        viewData[10][1].value = '=MAX(C1:D2)';
        r.doReCal(viewData);
        expect(viewData[10][1].value).toEqual(NaN);
    });

    it('=MAX(E1:E2)', function () {
        viewData[10][1].value = '=MAX(E1:E2)';
        r.doReCal(viewData);
        expect(viewData[10][1].value).toBe(5);
    });
});

describe('MIN', function () {
    let r = new ReCalEngine();
    let viewData;

    beforeEach(function () {
        viewData = initCellData(viewData);
    });

    it('=MIN(A1:C2)', function () {
        viewData[10][1].value = '=MIN(A1:C2)';
        r.doReCal(viewData);
        expect(viewData[10][1].value).toBe(-17);
    });

    it('=MIN(C1:D2)', function () {
        viewData[10][1].value = '=MIN(C1:D2)';
        r.doReCal(viewData);
        expect(viewData[10][1].value).toEqual(NaN);
    });

    it('=MIN(E1:E2)', function () {
        viewData[10][1].value = '=MIN(E1:E2)';
        r.doReCal(viewData);
        expect(viewData[10][1].value).toBe(0);
    });
});

describe('Reference', function () {
    let r = new ReCalEngine();
    let viewData;

    beforeEach(function () {
        viewData = initCellData(viewData);
    });

    it('=A1', function () {
        viewData[10][1].value = '=A1';
        r.doReCal(viewData);
        expect(viewData[10][1].value).toBe(1);
    });

    it('=D2', function () {
        viewData[10][1].value = '=D2';
        r.doReCal(viewData);
        expect(viewData[10][1].value).toBe('STRING');
    });

    it('=E2', function () {
        viewData[10][1].value = '=E2';
        r.doReCal(viewData);
        expect(viewData[10][1].value).toBe('');
    });
});