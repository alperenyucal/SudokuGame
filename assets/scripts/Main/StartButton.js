cc.Class({
  extends: cc.Component,


  start() {

    this.node.on(cc.Node.EventType.TOUCH_START, (e) => {

      cc.loader.loadRes("data", function (err, jsonAsset) {
        let index = Math.floor(Math.random() * 40);

        let newSudoku = jsonAsset.json[index]
        let size = newSudoku.finalized.length;
        store.setState({
          currentSudoku: Object.assign(newSudoku, {
            initials: newSudoku.finalized.map(row => row.map(i => i != null)),
            notes: [...Array(size)].map(() => [...Array(size)].map(() => [...Array(size)].fill(null))),
          }),
          currentTime: {
            mins: 0,
            secs: 0
          }
        });
        scene.loadScene("SudokuGame");
      });
    });
  },


});
