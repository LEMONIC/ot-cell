import * as c from './Constant.js';

export class ReCalEngine {
	constructor() {}
	
	doReCal(viewData) {
		let recursionFlag = false;
		for (let i = 1; i <= c.MAX_ROW; i++) {
			for (let j = 1; j <= c.MAX_COL; j++) {
				if (String(viewData[i][j].value).charAt(0) === "=") {
					recursionFlag = true;
					let str = viewData[i][j].value.replace(/\s/gi, "").substring(1).toUpperCase();
	
					if (str.includes("(") && str.includes(")") && str.includes(":")) {
						const funcName = str.substring(0, str.indexOf("("));
	
						const _a = str.substring(str.indexOf("(")+1, str.indexOf(':'));
						const a = {
								row : _a.substring(1, _a.length),
								col : _a.charAt(0).charCodeAt()-64
						};
	
						const _b = str.substring(str.indexOf(':')+1, str.indexOf(")"));
						const b = {
								row : _b.substring(1, _b.length),
								col : _b.charAt(0).charCodeAt()-64
						};
	
						let arr = [];
						for (let i = a.row; i <= b.row; i++) {
							for (let j = a.col; j <= b.col; j++) {
								arr.push(Number(viewData[i][j].value));
							}
						}
	
						if (arr.length > 0) {
							switch(funcName) {
								case "SUM" :
									viewData[i][j].value = arr.reduce((accumulator, currentValue) => accumulator + currentValue);
									break;
	
								case "AVERAGE" :
									// viewData[i][j].value = arr.reduce((accumulator, currentValue) => accumulator + currentValue) / arr.length;
									let _sum = 0;
									let _count = 0;
									for (let k = 0; k < arr.length; k++) {
										if (arr[k] === 0) {
											continue;
										} else if (isNaN(arr[k])) {
											_sum = "NaN";
											break;
										}
										_sum += arr[k];
										_count++;
									}
									viewData[i][j].value = _sum / _count;
									break;
	
								case "MIN" :
									viewData[i][j].value = Math.min(...arr);
									break;
	
								case "MAX" :
									viewData[i][j].value = Math.max(...arr);
									break;
	
								default :
									viewData[i][j].value = "#NAME?";
									break;
							}
						}
					} else {
						const row = str.substring(1, str.length);
						const col = str.charAt(0).charCodeAt()-64;
	
						viewData[i][j].value = viewData[row][col].value;
					}
				}
			}
		}
	
		if (recursionFlag === true) {
			this.doReCal(viewData);
		}
	
		return viewData;
	}
}
