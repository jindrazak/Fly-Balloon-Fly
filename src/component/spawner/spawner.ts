import * as ECSA from '../../../libs/pixi-component';
import {Messages} from '../../constants';
import {Message} from '../../../libs/pixi-component';
import {randomNormalDistribution} from '../../utils/functions';

export default abstract class Spawner extends ECSA.Component {

  timeSinceLastSpawn = 0;
  spawnInterval: number;
  abstract targetSpawnInterval:number;

  onInit() {
    this.subscribe(Messages.GAME_OVER);
    this.generateRandomSpawnInterval();
  }

  onUpdate(delta: number, absolute: number) {
    this.timeSinceLastSpawn += delta;
    if(this.timeSinceLastSpawn > this.spawnInterval) {
      this.spawn();
      this.timeSinceLastSpawn %= this.spawnInterval;
      this.generateRandomSpawnInterval();
    }
  }

  onMessage(msg: Message) {
    if(msg.action === Messages.GAME_OVER) {
      this.owner.removeComponent(this);
    }
  }

  abstract spawn();

  protected generateRandomSpawnInterval() {
    this.spawnInterval = this.targetSpawnInterval * randomNormalDistribution();
  }
}
