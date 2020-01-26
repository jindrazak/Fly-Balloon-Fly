import * as ECSA from '../../../libs/pixi-component';
import {Assets, Flags, Messages, Names, Tags, Values} from '../../constants';
import Spawner from './spawner';

export default class LightningSpawner extends Spawner {

  targetSpawnInterval = Values.LIGHTNING_SPAWN_INTERVAL;

  spawn() {
    const builder = new ECSA.Builder(this.scene);

    const lightning = builder
      .globalPos(1, 0)
      .anchor(0, 0)
      .asSprite(PIXI.Texture.from(Assets.LIGHTNING), Names.LIGHTNING)
      .withParent(this.owner)
      .withTag(Tags.REMOVE_ON_GAME_START)
      .withFlag(Flags.COLLIDABLE)
      .build();

    this.sendMessage(Messages.LIGHTNING_SPAWNED);
    this.scene.invokeWithDelay(500, () => {
      if (lightning.parent != null) {
        lightning.asSprite().remove();
      }
    });
  }
}
