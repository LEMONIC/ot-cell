class OTEngine {
    constructor() {
        let that = this;
        sharejs.open('ot', 'json', function (error, doc) {
            doc.on('change', function (op) {
                return that._documentOnChange(op);
            });
            if (doc.created) {
                doc.submitOp([{p: [], oi: {ops: []}}]);
            }
            that.ops = doc.at('ops');
        });
    }

    actionSender(action) {
        this.ops.insert(0, action);
    }

    _documentOnChange(op) {
        if (this._onChangeCallBack) {
            this._onChangeCallBack(op);
        } else {
            console.error('onChangeCallBack function을 등록하세요.');
        }
    }

    addOnChangeCallBack(context, callBackFunction) {
        this._onChangeCallBack = function (op) {
            callBackFunction.call(context, op);
        }
    }
}

export const ot = new OTEngine();