import * as ECSA from '../../../libs/pixi-component';
import {Assets, Names, Sizes, Tags, Values} from '../../constants';
import {randomNormalDistribution} from '../../utils/functions';
import MovingItemComponent from '../moving-item-component';
import LightningSpawner from './lightning-spawner';
import Spawner from './spawner';

export class CloudSpawner extends Spawner {

  targetSpawnInterval = Values.CLOUD_SPAWN_INTERVAL;

  spawn() {
    const builder = new ECSA.Builder(this.scene);
    builder
      .globalPos(Sizes.GAME_WIDTH, (Math.random() * (Sizes.GAME_HEIGHT - 700)) + 200)
      .scale(5)
      .anchor(0, 0.5)
      .asSprite(PIXI.Texture.from(Assets.CLOUD), Names.CLOUD)
      .withParent(this.scene.stage)
      .withTag(Tags.REMOVE_ON_GAME_START)
      .withComponent(new LightningSpawner())
      .withComponent(new MovingItemComponent(randomNormalDistribution() * 200))
      .build();
  }
}
