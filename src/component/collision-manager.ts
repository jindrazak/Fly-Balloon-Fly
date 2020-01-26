import * as ECSA from '../../libs/pixi-component';
import {Container} from '../../libs/pixi-component';
import {Flags, Messages, Names} from '../constants';

/**
 * Simple collision manager
 */
export class CollisionManager extends ECSA.Component {
  private collidables = new Array<ECSA.GameObject>();
  private balloon: Container;

  /**
   * Checks horizontal intersection
   */
  private static testHorizIntersection(boundsA: PIXI.Rectangle, boundsB: PIXI.Rectangle): number {
    return Math.min(boundsA.right, boundsB.right) - Math.max(boundsA.left, boundsB.left);
  }

  /**
   * Checks vertical intersection
   */
  private static testVertIntersection(boundsA: PIXI.Rectangle, boundsB: PIXI.Rectangle): number {
    return Math.min(boundsA.bottom, boundsB.bottom) - Math.max(boundsA.top, boundsB.top);
  }

  onInit() {
    super.onInit();
    this.subscribe(ECSA.Messages.OBJECT_ADDED, ECSA.Messages.OBJECT_REMOVED, Messages.GAME_STARTED);
  }

  onMessage(msg: ECSA.Message) {
    if (msg.action === ECSA.Messages.OBJECT_ADDED || msg.action === ECSA.Messages.OBJECT_REMOVED) {
      this.collidables = this.scene.findObjectsByFlag(Flags.COLLIDABLE);
      this.balloon = this.scene.findObjectByName(Names.BALLOON);
    }
  }

  onUpdate(delta: number, absolute: number) {
    for (let collidable of this.collidables) {
      let boundsA = this.balloon.asSprite().getBounds();
      let boundsB = collidable.asSprite().getBounds();

      let intersectionX = CollisionManager.testHorizIntersection(boundsA, boundsB);
      let intersectionY = CollisionManager.testVertIntersection(boundsA, boundsB);

      if (intersectionX > 0 && intersectionY > 0) {
        if (collidable.name === Names.BIRD) {
          this.sendMessage(Messages.COLLISION_WITH_BIRD, collidable);
        } else if (collidable.name === Names.LIGHTNING) {
          this.sendMessage(Messages.COLLISION_WITH_LIGHTNING, collidable);
        } else if (collidable.name === Names.FUEL) {
          this.sendMessage(Messages.FUEL_TOPUP, collidable);
          collidable.resetFlag(Flags.COLLIDABLE);
          this.collidables.splice(this.collidables.indexOf(collidable), 1);
          collidable.remove();
        }
      }
    }
  }
}
