export default class Scene {
    constructor() {
        this.mainScene = cc.director.getScene().name;
        this.sceneStack = [this.mainScene];
    };

    loadScene(sceneName, callback) {
        cc.director.loadScene(sceneName, callback);
        this.sceneStack.push(sceneName);
    };

    goBack() {
        if (this.sceneStack.length > 1) {
            let sceneName = this.sceneStack[this.sceneStack.length - 2];
            this.sceneStack.pop();
            cc.director.loadScene(sceneName);
        }
    }

    goHome() {
        this.loadScene(this.mainScene);
        this.sceneStack.slice(0, 1);
    }

};