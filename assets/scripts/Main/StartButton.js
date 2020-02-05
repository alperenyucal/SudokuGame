cc.Class({
  extends: cc.Component,


  start() {

    this.node.on(cc.Node.EventType.TOUCH_START, (e) => {

      /*let newSudoku = {
        finalized: [
          [1, 3, 2, 4],
          [4, 2, null, 3],
          [2, 4, 3, 1],
          [3, null, 4, 2]],
        box_sequence: [
          [0, 0, 1, 1],
          [0, 0, 1, 1],
          [2, 2, 3, 3],
          [2, 2, 3, 3]],
        sudoku: [
          [1, 3, 2, 4],
          [4, 2, 1, 3],
          [2, 4, 3, 1],
          [3, 1, 4, 2]],
      }

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
      scene.loadScene("SudokuGame");*/
    
      cc.loader.loadRes("data", function (err, jsonAsset) {
        let index = Math.floor(Math.random() * 40);

        let newSudoku = jsonAsset.json[index]
        let size = newSudoku.finalized.length;
        store.setState({
          currentSudoku: Object.assign(newSudoku, {
            initials: newSudoku.finalized.map(row => row.map(i => { if (i != null) return true })),
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
