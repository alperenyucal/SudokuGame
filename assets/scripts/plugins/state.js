let savedState = JSON.parse(cc.sys.localStorage.getItem("state"));

window.state = savedState || {
  currentSudoku: null,
  currentTime: null,
};

let saveLocal = () => {
  cc.sys.localStorage.setItem("state", JSON.stringify(this.state));
  setTimeout(saveLocal, 5000);
}

setTimeout(saveLocal, 5000);
