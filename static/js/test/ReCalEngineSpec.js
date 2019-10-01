import { ReCalEngine } from './../ReCalEngine.js';
import * as c from "./../Constant.js";

describe("ReCalEngine", function() {
    let r = new ReCalEngine();
    let viewData;

    beforeEach(function() {
        viewData = Array.from({length: c.MAX_ROW + 1}, () =>
            Array.from({length: c.MAX_COL + 1}, () => ({value: '', color: ''})));

        viewData[10][1].value = "=SUM(A1:C2)";
        viewData[10][2].value = "=AVERAGE(A1:C2)";
        viewData[10][3].value = "=MIN(A1:C2)";
        viewData[10][4].value = "=MAX(A1:C2)";
        viewData[10][5].value = "=B2";

        viewData[1][1].value = 1;
        viewData[1][2].value = 2;
        viewData[1][3].value = 3;
        viewData[2][1].value = 4;
        viewData[2][2].value = 5;
        viewData[2][3].value = 6;

        r.doReCal(viewData);
    });

    it("sum", function() {
        expect(viewData[10][1]).toEqual({ value: 21, color: '' });
    });

    it("average", function() {
        expect(viewData[10][2]).toEqual({ value: 3.5, color: '' });
    });

    it("min", function() {
        expect(viewData[10][3]).toEqual({ value: 1, color: '' });
    });

    it("max", function() {
        expect(viewData[10][4]).toEqual({ value: 6, color: '' });
    });

    it("ref", function() {
        expect(viewData[10][5]).toEqual({ value: 5, color: '' });
    });
});