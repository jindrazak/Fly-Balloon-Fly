import * as ECSA from '../../../libs/pixi-component';
import {Assets, Flags, Names, Sizes, Tags, Values} from '../../constants';
import {randomNormalDistribution} from '../../utils/functions';
import MovingItemComponent from '../moving-item-component';
import Spawner from './spawner';

export class FuelSpawner extends Spawner {

  targetSpawnInterval = Values.FUEL_SPAWN_INTERVAL;

  spawn() {
    const builder = new ECSA.Builder(this.scene);
    builder
      .globalPos(Sizes.GAME_WIDTH, (Math.random() * (Sizes.GAME_HEIGHT - 400)) + 200)
      .scale(5)
      .anchor(0, 0.5)
      .asSprite(PIXI.Texture.from(Assets.FUEL), Names.FUEL)
      .withParent(this.scene.stage)
      .withTag(Tags.REMOVE_ON_GAME_START)
      .withFlag(Flags.COLLIDABLE)
      .withComponent(new MovingItemComponent(randomNormalDistribution() * 300))
      .build();
  }
}
