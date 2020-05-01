cc.Class({
  extends: cc.Component,


  start() {

    this.node.on(cc.Node.EventType.TOUCH_START, (e) => {

      let sz = Math.floor(Math.random() * 5) + 5;
      let id = Math.floor(Math.random() * 20) + 1;


      cc.loader.loadRes("data/sudoku-" + sz + "-" + id, function (err, textAsset) {

        let newSudoku = JSON.parse(textAsset.text);
        let size = newSudoku.sudoku.length;

        state = {
          currentSudoku: Object.assign(newSudoku, {
            initials: newSudoku.sudoku.map(row => row.map(i => { if (i != null) return true })),
            notes: [...Array(size)].map(() => [...Array(size)].map(() => [...Array(size)].fill(null))),
          }),
          currentTime: {
            mins: 0,
            secs: 0
          },
          paused: true
        };

        scene.loadScene("SudokuGame");
      });
    });
  },


});
