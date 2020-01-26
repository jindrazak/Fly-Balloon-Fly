import * as ECSA from '../libs/pixi-component';
import {
  Assets,
  GAME_TITLE,
  gameOverStyle,
  gameTitleStyle,
  gameUiStyle,
  LocalStorageKeys,
  Names,
  Sizes,
  smallStyle,
  Tags,
  Texts,
  Values
} from './constants';
import {BalloonController} from './component/balloon-controller';
import {BirdSpawner} from './component/spawner/bird-spawner';
import {CloudSpawner} from './component/spawner/cloud-spawner';
import {CollisionManager} from './component/collision-manager';
import {HillsRenderer} from './component/hills-renderer';
import FuelManager from './component/fuel-manager';
import {FuelSpawner} from './component/spawner/fuel-spawner';
import GameComponent from './component/game-component';
import ScoreManager from './component/score-manager';
import {soundComponent} from './component/sound-component';

export default class GameFactory {

  public static initializeGame(scene: ECSA.Scene) {
    scene.clearScene();
    scene.stage.addComponent(new ECSA.KeyInputComponent());
    scene.addGlobalComponent(soundComponent());
    scene.addGlobalComponent(new HillsRenderer(Assets.HILLS, Values.HILLS_SPEED));
    scene.addGlobalComponent(new HillsRenderer(Assets.HILLS2, Values.HILLS2_SPEED));
    scene.addGlobalComponent(new GameComponent());
    GameFactory.addGameTitle(scene);
    GameFactory.addMadeBy(scene);
    GameFactory.addEmail(scene);
    GameFactory.addPressEnterToStart(scene);
    GameFactory.addControls(scene);
  }

  public static buildNewLevel(scene: ECSA.Scene) {
    scene.addGlobalComponent(new BirdSpawner());
    scene.addGlobalComponent(new CloudSpawner());
    scene.addGlobalComponent(new CollisionManager());
    scene.addGlobalComponent(new FuelSpawner());
    GameFactory.addBalloon(scene);
    GameFactory.addFuelManager(scene);
    GameFactory.addScoreManager(scene);
  }

  public static showRecap(scene: ECSA.Scene, gameOverMessage: string) {
    GameFactory.addGameOverTitle(scene, gameOverMessage);
    GameFactory.addHighestScore(scene);
    GameFactory.addPressEnterToStart(scene);
    GameFactory.addCurrentScore(scene);
  }

  private static addFuelManager(scene: ECSA.Scene) {
    const builder = new ECSA.Builder(scene);

    builder
      .globalPos(19 * Sizes.GAME_WIDTH / 20, Sizes.GAME_HEIGHT / 20)
      .anchor(1, 0)
      .withComponent(new FuelManager())
      .withParent(scene.stage)
      .asText('fuelManager', '', gameUiStyle)
      .build();
  }

  private static addScoreManager(scene: ECSA.Scene) {
    const builder = new ECSA.Builder(scene);

    builder
      .globalPos(Sizes.GAME_WIDTH / 20, Sizes.GAME_HEIGHT / 20)
      .anchor(0, 0)
      .withComponent(new ScoreManager())
      .withParent(scene.stage)
      .asText('scoreManager', '', gameUiStyle)
      .build();
  }

  private static addBalloon(scene: ECSA.Scene) {
    const builder = new ECSA.Builder(scene);
    builder
      .globalPos(20, Sizes.GAME_HEIGHT / 3)
      .scale(5)
      .anchor(0, 0.5)
      .withComponent(new BalloonController())
      .withParent(scene.stage)
      .withTag(Tags.REMOVE_ON_GAME_START)
      .asSprite(PIXI.Texture.from(Assets.BALLOON_IDLE), Names.BALLOON)
      .build();
  }

  private static addGameOverTitle(scene: ECSA.Scene, text: string) {
    const builder = new ECSA.Builder(scene);
    builder
      .globalPos(Sizes.GAME_WIDTH / 2, 9 * Sizes.GAME_HEIGHT / 20)
      .anchor(0.5, 0.5)
      .asText('endgame', text, gameOverStyle)
      .withTag(Tags.REMOVE_ON_GAME_START)
      .withParent(scene.stage)
      .build();
  }

  private static addGameTitle(scene: ECSA.Scene) {
    const builder = new ECSA.Builder(scene);
    builder
      .globalPos(Sizes.GAME_WIDTH / 2, Sizes.GAME_HEIGHT / 4)
      .anchor(0.45, 0.5)
      .asText('gametitle', GAME_TITLE, gameTitleStyle)
      .withTag(Tags.REMOVE_ON_GAME_START)
      .withParent(scene.stage)
      .build();

  }

  private static addHighestScore(scene: ECSA.Scene) {
    const builder = new ECSA.Builder(scene);
    const highestScoreMessage = Texts.HIGHEST_SCORE + window.localStorage.getItem(LocalStorageKeys.HIGHEST_SCORE);
    builder
      .globalPos(Sizes.GAME_WIDTH / 2, 12 * Sizes.GAME_HEIGHT / 20)
      .anchor(0.5, 0.5)
      .asText('highestscore', highestScoreMessage, gameUiStyle)
      .withTag(Tags.REMOVE_ON_GAME_START)
      .withParent(scene.stage)
      .build();
  }

  private static addCurrentScore(scene: ECSA.Scene) {
    const builder = new ECSA.Builder(scene);
    const currentScoreMessage = Texts.SCORE + window.localStorage.getItem(LocalStorageKeys.CURRENT_SCORE);
    builder
      .globalPos(Sizes.GAME_WIDTH / 2, 11 * Sizes.GAME_HEIGHT / 20)
      .anchor(0.5, 0.5)
      .asText('highestscore', currentScoreMessage, gameUiStyle)
      .withTag(Tags.REMOVE_ON_GAME_START)
      .withParent(scene.stage)
      .build();
  }

  private static addPressEnterToStart(scene: ECSA.Scene) {
    const builder = new ECSA.Builder(scene);
    builder
      .globalPos(Sizes.GAME_WIDTH / 2, 13 * Sizes.GAME_HEIGHT / 20)
      .anchor(0.5, 0.5)
      .asText(null, Texts.PRESS_ENTER_TO_START, gameUiStyle)
      .withTag(Tags.REMOVE_ON_GAME_START)
      .withParent(scene.stage)
      .build();
  }

  private static addControls(scene: ECSA.Scene) {
    const builder = new ECSA.Builder(scene);
    builder
      .globalPos(Sizes.GAME_WIDTH / 2, 12 * Sizes.GAME_HEIGHT / 20)
      .anchor(0.5, 0.5)
      .asText(null, Texts.CONTROLS, smallStyle)
      .withTag(Tags.REMOVE_ON_GAME_START)
      .withParent(scene.stage)
      .build();
  }

  private static addMadeBy(scene: ECSA.Scene) {
    const builder = new ECSA.Builder(scene);
    builder
      .globalPos(Sizes.GAME_WIDTH / 20, 17 * Sizes.GAME_HEIGHT / 20)
      .anchor(0, 1)
      .asText(null, Texts.MADE_BY, smallStyle)
      .withTag(Tags.REMOVE_ON_GAME_START)
      .withParent(scene.stage)
      .build();
  }

  private static addEmail(scene: ECSA.Scene) {
    const builder = new ECSA.Builder(scene);
    builder
      .globalPos(19 * Sizes.GAME_WIDTH / 20, 17 * Sizes.GAME_HEIGHT / 20)
      .anchor(1, 1)
      .asText(null, Texts.EMAIL, smallStyle)
      .withTag(Tags.REMOVE_ON_GAME_START)
      .withParent(scene.stage)
      .build();
  }
}
