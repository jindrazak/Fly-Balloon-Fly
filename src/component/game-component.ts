import * as ECSA from '../../libs/pixi-component';
import {Message} from '../../libs/pixi-component';
import {Messages, Tags, Texts} from '../constants';
import GameFactory from '../game-factory';

export default class GameComponent extends ECSA.Component {

  private gameRunning: boolean;

  onInit() {
    this.subscribe(Messages.COLLISION_WITH_BIRD, Messages.COLLISION_WITH_LIGHTNING, Messages.OUT_OF_FUEL, Messages.COLLISION_WITH_GROUND);
    this.gameRunning = false;
  }

  onMessage(msg: Message) {
    if (msg.action !== Messages.COLLISION_WITH_BIRD &&
      msg.action !== Messages.COLLISION_WITH_LIGHTNING &&
      msg.action !== Messages.OUT_OF_FUEL &&
      msg.action !== Messages.COLLISION_WITH_GROUND) {
      return;
    }
    let gameOverMessage;
    if (msg.action === Messages.COLLISION_WITH_BIRD || msg.action === Messages.COLLISION_WITH_LIGHTNING || msg.action === Messages.COLLISION_WITH_GROUND) {
      gameOverMessage = Texts.GAME_OVER;
    } else if (msg.action === Messages.OUT_OF_FUEL) {
      gameOverMessage = Texts.OUT_OF_FUEL;
    }

    this.gameRunning = false;
    this.sendMessage(Messages.GAME_OVER);
    GameFactory.showRecap(this.scene, gameOverMessage);
  }

  onUpdate(delta: number, absolute: number) {
    const inputComponent = this.scene.stage.findComponentByName<ECSA.KeyInputComponent>(ECSA.KeyInputComponent.name);
    if (inputComponent.isKeyPressed(ECSA.Keys.KEY_ENTER) && !this.gameRunning) {
      this.startNewGame();
    }
  }

  private startNewGame() {
    this.gameRunning = true;
    const objectsToRemove = this.scene.findObjectsByTag(Tags.REMOVE_ON_GAME_START);
    objectsToRemove.forEach((object) => object.remove());
    GameFactory.buildNewLevel(this.scene);
    this.sendMessage(Messages.GAME_STARTED);
  }
}
