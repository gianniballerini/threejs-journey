class Settings {
    constructor() {
        this.count = 200000
        this.size = 0.005
        this.radius = 5
        this.branches = 3
        this.spin = 1
        this.randomness = 0.5
        this.randomnessPower = 3
        this.insideColor = '#ff6030'
        this.outsideColor = '#1b3984'
    }
}

const settings = new Settings();
export { settings as Settings }

