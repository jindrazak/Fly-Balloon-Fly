import * as ECSA from '../../libs/pixi-component';
import {Message} from '../../libs/pixi-component';
import {Assets, Messages, Sizes} from '../constants';

/**
 * Controller for the cannon
 */
export class BalloonController extends ECSA.Component {
  private verticalSpeed = 0;
  private readonly GRAVITY = 0.1;
  private readonly UP_FORCE = 0.2;
  private readonly MAX_UP_SPEED = 3;
  private running: boolean;

  onInit() {
    this.running = true;
    this.subscribe(Messages.GAME_OVER);
  }

  onMessage(msg: Message) {
    if (msg.action === Messages.GAME_OVER) {
      this.running = false;
    }
  }

  onUpdate() {
    if (!this.running) {
      return;
    }
    const inputComponent = this.scene.stage.findComponentByName<ECSA.KeyInputComponent>(ECSA.KeyInputComponent.name);

    if (inputComponent.isKeyPressed(ECSA.Keys.KEY_UP)) {
      if (this.verticalSpeed < this.MAX_UP_SPEED) {
        this.verticalSpeed += this.UP_FORCE;
      }
      this.owner.asSprite().texture = PIXI.Texture.from(Assets.BALLOON_BURNING);
    } else {
      this.owner.asSprite().texture = PIXI.Texture.from(Assets.BALLOON_IDLE);
      this.verticalSpeed -= this.GRAVITY;
    }

    if (this.owner.position.y > Sizes.GAME_HEIGHT && this.verticalSpeed < 0) {
      this.sendMessage(Messages.COLLISION_WITH_GROUND);
    } else if (this.owner.position.y - 160 < 0 && this.verticalSpeed > 0) {
      this.verticalSpeed = 0;
    }
    this.owner.position.y -= this.verticalSpeed;
  }
}
