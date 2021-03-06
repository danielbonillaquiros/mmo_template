export default class GameMap {
  constructor(scene, key, tileSetName, bgLayerName, blockedLayerName) {
    this.scene = scene; // the scene this map belongs to
    this.key = key; // tiled JSON file key name
    this.tileSetName = tileSetName; // Tiled tileset image key name
    this.bgLayerName = bgLayerName; // the name of the layer created in Tiled for the map background
    // the name of the layer created in Tiled for the blocked areas
    this.blockedLayerName = blockedLayerName;
    this.createMap();
  }

  createMap() {
    // create tilemap
    this.tilemap = this.scene.make.tilemap({ key: this.key });

    // add tileset image to the map
    this.tiles = this.tilemap.addTilesetImage(this.tileSetName, this.tileSetName, 32, 32, 1, 2);

    // create background layer
    this.backgroundLayer = this.tilemap.createStaticLayer(this.bgLayerName, this.tiles, 0, 0);
    this.backgroundLayer.setScale(2, 2);

    // create blocked layer
    this.blockedLayer = this.tilemap.createStaticLayer(this.blockedLayerName, this.tiles, 0, 0);
    this.blockedLayer.setScale(2, 2);
    this.blockedLayer.setCollisionByExclusion([-1]);

    // update the world bounds
    this.scene.physics.world.bounds.width = this.tilemap.widthInPixels * 2;
    this.scene.physics.world.bounds.height = this.tilemap.heightInPixels * 2;

    // limit the camera to the size of our map
    this.scene.cameras.main.setBounds(
      0,
      0,
      this.tilemap.widthInPixels * 2,
      this.tilemap.heightInPixels * 2,
    );
  }
}
