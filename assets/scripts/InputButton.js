cc.Class({
    extends: cc.Component,

    start() {
        this.node.on(cc.Node.EventType.TOUCH_START, (e) => {
            let sc = cc.find("Canvas/Sudoku").getComponent("Sudoku");
            sc.inputMethod = sc.inputMethod == "ButtonFirst" ? "CellFirst" : "ButtonFirst";
        });
    }

});
