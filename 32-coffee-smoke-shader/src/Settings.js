class Settings {
    constructor() {
        this.smokeSpeed = 0.05;
        this.smokeColor = '#ffffff';
        this.smokeThreshold = 0.4;
        this.smokeWireframe = false;
        this.twistStrength = 10;
        this.twistFrequency = 0.2;
        this.twistSpeed = 0.005;

        this.leftEdge = {x: 0.0, y: 0.1};
        this.rightEdge = {x: 1.0, y: 0.9};
        this.topEdge = {x: 1.0, y: 0.9};
        this.bottomEdge = {x: 0.0, y: 0.1};
    }
}

const settings = new Settings();
export { settings as Settings };

