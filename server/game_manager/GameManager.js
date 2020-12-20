import PlayerModel from './PlayerModel';

export default class GameManager {
  constructor(io) {
    this.io = io;
    this.spawners = {};
    this.chests = {};
    this.monsters = {};
    this.players = {};

    this.playerLocations = [[50, 50], [100, 100]];
    this.chestLocations = {};
    this.monsterLocations = {};
  }

  setup() {
    this.parseMapData();
    this.setupEventListeners();
    this.setupSpawners();
  }

  parseMapData() {}

  setupEventListeners() {
    this.io.on('connection', (socket) => {
      // player disconnected
      socket.on('disconnect', () => {
        // delete user data from the server
        delete this.playerLocations[socket.id];

        // emit a message to all players to remove this player
        this.io.emit('disconnect', socket.id);
      });

      socket.on('newPlayer', () => {
        // create a new Player
        this.spawnPlayer(socket.id);

        // send the players object to the new player
        socket.emit('currentPlayers', this.players);

        // send the monsters object to the new player
        socket.emit('currentMonsters', this.monsters);

        // send the chests object to the new player
        socket.emit('currentChests', this.chests);

        // inform the other players of the new player that joined
        socket.broadcast.emit('spawnPlayer', this.players[socket.id]);
      });

      socket.on('playerMovement', (playerData) => {
        if (this.players[socket.id]) {
          this.players[socket.id].x = playerData.x;
          this.players[socket.id].y = playerData.y;
          this.players[socket.id].flipX = playerData.flipX;
          this.players[socket.id].playerAttacking = playerData.playerAttacking;
          this.players[socket.id].currentDirection = playerData.currentDirection;

          // emit a message to all players about the player that moved
          this.io.emit('playerMoved', this.players[socket.id]);
        }
      });

      // player connected to our game
      console.log('player connected to our game');
      console.log(socket.id);
    });
  }

  setupSpawners() {}

  spawnPlayer(playerId) {
    const player = new PlayerModel(playerId, this.playerLocations);
    this.players[playerId] = player;
  }
}
