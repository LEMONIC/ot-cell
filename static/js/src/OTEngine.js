class OTEngine {
    constructor() {
        // this.onChangeCallBack = null;
        let that = this;
        sharejs.open("ot", "json", function (error, doc) {
            doc.on("change", function(op) { return that.documentOnChange(op); });
            if (doc.created) {
                doc.submitOp([{p: [], oi: {ops: []}}]);
            }
            that.ops = doc.at('ops');
        });
    }

    actionSender(action) {
        this.ops.insert(0, action);
    }

    documentOnChange(op) {
        if(this.onChangeCallBack) {
            this.onChangeCallBack(op);
        } else {
            console.error("onChangeCallBack function을 등록하세요.");
        }
    }

    addOnChangeCallBack(context, callBackFunction) {
        this.onChangeCallBack = function(op) {
            callBackFunction.call(context, op);
        }
    }
}
export default new OTEngine();