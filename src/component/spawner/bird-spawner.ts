import * as ECSA from '../../../libs/pixi-component';
import {Assets, Flags, Messages, Names, Sizes, Tags, Values} from '../../constants';
import {randomNormalDistribution} from '../../utils/functions';
import MovingItemComponent from '../moving-item-component';
import Spawner from './spawner';

export class BirdSpawner extends Spawner {

  targetSpawnInterval = Values.BIRD_SPAWN_INTERVAL;

  spawn() {
    const builder = new ECSA.Builder(this.scene);
    builder
      .globalPos(Sizes.GAME_WIDTH, (Math.random() * (Sizes.GAME_HEIGHT - 400)) + 200)
      .scale(5)
      .anchor(0, 0.5)
      .asSprite(PIXI.Texture.from(Assets.BIRD), Names.BIRD)
      .withParent(this.scene.stage)
      .withTag(Tags.REMOVE_ON_GAME_START)
      .withFlag(Flags.COLLIDABLE)
      .withComponent(new MovingItemComponent(randomNormalDistribution() * 500, 30))
      .build();
    this.sendMessage(Messages.BIRD_SPAWNED);
  }
}
