import * as ECSA from '../libs/pixi-component';
import {Assets, Sizes} from './constants';
import GameFactory from './game-factory';


class BalloonGame {
  engine: ECSA.GameLoop;

  constructor() {
    this.engine = new ECSA.GameLoop();
    let canvas = (document.getElementById('gameCanvas') as HTMLCanvasElement);
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    // init the game loop
    this.engine.init(canvas, Sizes.GAME_WIDTH, Sizes.GAME_HEIGHT, 1, // width, height, resolution
      {
        flagsSearchEnabled: true, // searching by flags feature
        statesSearchEnabled: false, // searching by states feature
        tagsSearchEnabled: true, // searching by tags feature
        namesSearchEnabled: true, // searching by names feature
        notifyAttributeChanges: false, // will send message if attributes change
        notifyStateChanges: false, // will send message if states change
        notifyFlagChanges: false, // will send message if flags change
        notifyTagChanges: false, // will send message if tags change
        debugEnabled: false, // debugging window
      }, true); // resize to screen

    this.engine.app.renderer.backgroundColor = 0x03cffc;

    this.engine.app.loader
      .reset()
      .add(Assets.BALLOON_BURNING, 'assets/balloon_burning.png')
      .add(Assets.BALLOON_IDLE, 'assets/balloon_idle.png')
      .add(Assets.BIRD, 'assets/bird.png')
      .add(Assets.CLOUD, 'assets/cloud.png')
      .add(Assets.LIGHTNING, 'assets/lightning.png')
      .add(Assets.HILLS, 'assets/hills.png')
      .add(Assets.HILLS2, 'assets/hills2.png')
      .add(Assets.FUEL, 'assets/fuel.png')
      .add(Assets.SND_FUEL_TOPUP, 'assets/snd_fuel_topup.wav')
      .add(Assets.SND_LIGHTNING, 'assets/snd_lightning.wav')
      .add(Assets.SND_GAME_OVER, 'assets/snd_game_over.wav')
      .add(Assets.SND_GAME_STARTED, 'assets/snd_game_started.wav')
      .add(Assets.SND_BIRD, 'assets/snd_bird.wav')
      .load(() => this.onAssetsLoaded());
  }

  onAssetsLoaded() {
    GameFactory.initializeGame(this.engine.scene);
  }
}

export default new BalloonGame();
