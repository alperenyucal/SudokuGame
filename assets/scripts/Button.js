cc.Class({
    extends: cc.Component,

    properties: {
        width: 50,
        number: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.node.width = this.node.height = this.width;
        let labelNode = this.node.getChildByName("Label")
        labelNode.color = cc.color(0, 0, 255, 255);

        labelNode.setPosition(this.width / 2, this.width / 2);

        let label = this.node.getChildByName("Label").getComponent(cc.Label);
        label.string = this.number != null ? this.number : "";

        this.node.on(cc.Node.EventType.TOUCH_START, (e) => {
            let sn = cc.find("Canvas/Sudoku");
            let sc = sn.getComponent("Sudoku");
            if (sc.inputMethod == "ButtonFirst") {
                let s = sc.selectedCell;
                sc.grid[s.row][s.column].setNumber(this.number);
                sn.emit("sudoku-changed");
            }
            else if (sc.inputMethod == "CellFirst") {
                sc.selectedButton = sc.selectedButton == this.number ? null : this.number;
            }
        });

    }
});
