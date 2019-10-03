import Scene from "../lib/scene-loader";

cc.Class({
    extends: cc.Component,

    start() {
        window.scene = new Scene();
    }
});
