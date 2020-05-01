cc.Class({
  extends: cc.Component,

  properties: {
    notePrefab: {
      default: null,
      type: cc.Prefab
    },

  },

  onLoad() {
    let sc = cc.find("Canvas/Sudoku").getComponent("Sudoku");

    let margin = 5;

    this.size = sc.size;
    this.grid = [...Array(this.size)];

    let cellWidth = sc.node.width / sc.size;

    let sqrt = Math.round(Math.sqrt(this.size));
    let width = (cellWidth - (margin * 2)) / sqrt;
    let x = (width / 2) + margin;
    let y = cellWidth - (width / 2) - margin;

    for (let i = 0; i < this.size; i++) {

      let nd = cc.instantiate(this.notePrefab);
      nd.width = width;
      nd.height = width;

      let lb = nd.getComponent(cc.Label);

      lb.string = this.notes[i] || "";

      nd.color = cc.color(0, 0, 0);

      nd.setPosition(x, y);
      this.node.addChild(nd);
      this.grid[i] = lb;

      x += width;
      if ((i + 1) % sqrt == 0) {
        x = (width / 2) + margin;
        y -= width;
      }

    }

  },

});
