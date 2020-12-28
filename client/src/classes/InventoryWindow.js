import ModalWindow from './ModalWindow';

export default class InventoryWindow extends ModalWindow {
  constructor(scene, opts) {
    super(scene, opts);

    this.playerObject = {};
    this.mainPlayer = false;
    this.inventoryItems = {};
    this.graphics.setDepth(3);
    this.createWindow();
    this.hideWindow();
  }

  calculateWindowDimensions() {
    let x = this.x + (this.scene.scale.width / 4);
    let y = this.y + (this.scene.scale.height * 0.1);

    if (this.scene.scale.width < 750) {
      x = this.x + 40;
      y = this.y + 40;
    }

    const rectWidth = this.windowWidth;
    const rectHeight = this.windowHeight - 5;
    return {
      x,
      y,
      rectWidth,
      rectHeight,
    };
  }

  createInnerWindowRectangle({
    x, y, rectWidth, rectHeight,
  }) {
    if (this.rect) {
      this.rect.setPosition(x + 1, y + 1);
      this.rect.setDisplaySize(rectWidth - 1, rectHeight - 1);

      // update the position of our inventory container
      this.inventoryContainer.setPosition(x + 1, y + 1);
      this.inventoryContainer.setSize(rectWidth - 1, rectHeight - 1);

      // center the title text
      this.titleText.setPosition(this.inventoryContainer.width / 2, 20);
    } else {
      this.rect = this.scene.add.rectangle(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
      if (this.debug) this.rect.setFillStyle(0x6666ff);
      this.rect.setOrigin(0, 0);

      // create inventory container for positioning elements
      this.inventoryContainer = this.scene.add.container(x + 1, y + 1);
      this.inventoryContainer.setDepth(3);
      this.inventoryContainer.setAlpha(this.textAlpha);

      // create inventory title
      this.titleText = this.scene.add.text(this.inventoryContainer.width / 2, 20, 'Player Stats', { fontSize: '22px', fill: '#fff', align: 'center' });
      this.titleText.setOrigin(0.5);
      this.inventoryContainer.add(this.titleText);

      // create inventory stats
      this.createInventoryStats();

      // create inventory slots
      this.createInventorySlots();
    }
  }

  createInventoryStats() {

  }

  createInventorySlots() {

  }

  resize(gameSize) {
    if (gameSize.width < 750) {
      this.windowWidth = this.scene.scale.width - 80;
      this.windowHeight = this.scene.scale.height - 80;
    } else {
      this.windowWidth = this.scene.scale.width / 2;
      this.windowHeight = this.scene.scale.height * 0.8;
    }

    this.redrawWindow();
  }

  hideWindow() {
    this.rect.disableInteractive();
    this.graphics.setAlpha(0);
  }

  showWindow(playerObject, mainPlayer) {
    this.mainPlayer = mainPlayer;
    this.playerObject = playerObject;
    this.rect.setInteractive();
    this.graphics.setAlpha(1);
  }
}
