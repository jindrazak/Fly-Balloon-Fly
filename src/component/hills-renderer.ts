import * as ECSA from '../../libs/pixi-component';
import {Message} from '../../libs/pixi-component';
import {Assets, Messages, Sizes} from '../constants';

export class HillsRenderer extends ECSA.Component {
  spriteArray: Array<ECSA.Container> = [];

  private readonly defaultSpeed: number;
  private spriteName: string;
  private speed: number;

  constructor(spriteName: string, speed: number) {
    super();
    this.spriteName = spriteName;
    this.defaultSpeed = speed;
    this.speed = speed;
  }

  onInit() {
    const spriteWidth = PIXI.Texture.from(Assets.HILLS).width * 5;
    this.subscribe(Messages.GAME_OVER, Messages.GAME_STARTED);
    let x = 0;
    while (x < Sizes.GAME_WIDTH + spriteWidth) {
      this.spriteArray.push(this.buildNewSprite(x));
      x += spriteWidth;
    }
  }

  onMessage(msg: Message) {
    if (msg.action === Messages.GAME_OVER) {
      this.speed = 0;
    } else if (msg.action === Messages.GAME_STARTED) {
      this.speed = this.defaultSpeed;
    }
  }

  onUpdate(delta: number, absolute: number) {
    this.spriteArray.forEach((sprite) => {
      const deltaX = this.speed * delta / 1000;
      sprite.position.set(sprite.x - deltaX, sprite.y);
      if (sprite.position.x + sprite.width < 0) {
        const firstSprite = this.spriteArray.shift();
        const lastSprite = this.spriteArray[this.spriteArray.length - 1];
        //move first sprite behind the last sprite
        firstSprite.position.set(lastSprite.position.x + lastSprite.width, firstSprite.position.y);
        this.spriteArray.push(firstSprite);
      }
    });
  }

  private buildNewSprite(x:number):ECSA.Container {
    const builder = new ECSA.Builder(this.scene);

    return builder
      .globalPos(x, Sizes.GAME_HEIGHT)
      .scale(5)
      .anchor(0, 1)
      .asSprite(PIXI.Texture.from(this.spriteName))
      .withParent(this.scene.stage)
      .build();
  }
}
