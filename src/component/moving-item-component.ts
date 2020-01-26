import * as ECSA from '../../libs/pixi-component';
import {Message} from '../../libs/pixi-component';
import {Messages} from '../constants';

export default class MovingItemComponent extends ECSA.Component {
  private horizontalSpeed:number;
  private verticalSpeed:number;
  private readonly perioda:number = 500;
  private verticalChangeIn:number;

  constructor(horizontalSpeed:number, verticalSpeed:number = 0) {
    super();
    this.verticalSpeed = -1 * verticalSpeed;
    this.horizontalSpeed = -1 * horizontalSpeed;
  }

  onInit() {
    this.subscribe(Messages.GAME_OVER);
  }

  onMessage(msg: Message) {
    if(msg.action === Messages.GAME_OVER) {
      this.horizontalSpeed = 0;
      this.verticalSpeed = 0;
    }
  }

  onUpdate(delta: number, absolute: number) {
    if(this.owner.position.x + this.owner.width < 0) {
      this.owner.asSprite().remove();
      return;
    }

    if(this.verticalChangeIn < 0) {
      this.verticalChangeIn = this.perioda;
      this.verticalSpeed *= -1;
    }

    this.verticalChangeIn -= delta;

    const deltaX = this.horizontalSpeed * delta/1000;
    const deltaY = this.verticalSpeed * delta/1000;

    const newX = this.owner.position.x + deltaX;
    const newY = this.owner.position.y + deltaY;

    this.owner.position.set(newX, newY);
  }
}
