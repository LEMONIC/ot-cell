/*
export let $state;

sharejs.open("ot", "json", function(error, doc) {
    $state = doc;
    doc.on("change", function (op) {
        console.log(op)
    });
    doc.submitOp([{
        p : [],
        od : null,
        oi : {
            actionType : '',
            actionParam : null
        }
    }
    ]);
});

export function submitOp(actionType, actionParam) {
    $state.submitOp([{
        p:['actionParam'],
        oi:actionParam
    },{
        p:['actionType'],
        oi:actionType
    }]);
    console.log($state.snapshot.actionParam[0]);
}

export function remoteDoAction() {

}*/
