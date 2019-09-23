import { ReCalEngine } from './../ReCalEngine.js';
import * as c from "./../Constant.js";

describe("called", function() {
    it("doReCal()", function() {
        let r = new ReCalEngine();

        let viewData = Array.from({ length: c.MAX_ROW + 1 }, () =>
            Array.from({ length: c.MAX_COL + 1 }, () => ({value:'', color:''})));

        viewData[9][9].value = "=SUM(A1:B2)";
        viewData[1][1].value = 1;
        viewData[1][2].value = 5;

        console.log(viewData[9][9]);
        console.log(r.doReCal(viewData)[9][9]);
        //expect(r.doReCal(viewData).toEqual("Hello world!");
    });
});