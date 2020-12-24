export default class DialogWindow {
  constructor(scene, opts) {
    if (!opts) opts = {};
    const {
      x = 0,
      y = 0,
      debug = false,
    } = opts;

    this.scene = scene;
    this.x = x;
    this.y = y;
    this.debug = debug;

    this.borderThickness = 3;
    this.borderColor = 0x907748;
    this.borderAlpha = 0.3;
    this.windowAlpha = 0.4;
    this.textAlpha = 0.2;
    this.windowColor = 0x303030;
    this.windowWidth = 305;
    this.windowHeight = this.scene.scale.height;

    this.graphics = this.scene.add.graphics();
    this.graphics.setDepth(2);
    this.createWindow();
  }

  createWindow() {
    const windowDimensions = this.calculateWindowDimensions();
    this.createOuterWindow(windowDimensions);
    this.createInnerWindow(windowDimensions);
  }

  calculateWindowDimensions() {
    const x = this.x - this.windowWidth - 2 + this.scene.cameras.main.worldView.x;
    const y = this.y + 2 + this.scene.cameras.main.worldView.y;
    const rectWidth = this.windowWidth;
    const rectHeight = this.windowHeight - 5;
    return {
      x,
      y,
      rectWidth,
      rectHeight,
    };
  }

  createOuterWindow({
    x, y, rectWidth, rectHeight,
  }) {
    this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
    this.graphics.strokeRect(x, y, rectWidth, rectHeight);
  }

  createInnerWindow({
    x, y, rectWidth, rectHeight,
  }) {
    return {
      x, y, rectWidth, rectHeight,
    };
  }

  update() {
    // update the dialog window if the main world view has changed
    if (this.scene.cameras.main.worldView.x > 0 || this.scene.cameras.main.worldView.y > 0) {
      this.redrawWindow();
    }
  }

  redrawWindow() {
    this.graphics.clear();
    this.createWindow();
  }
}
