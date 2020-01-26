import * as ECSA from '../../libs/pixi-component';
import {Message, Text} from '../../libs/pixi-component';
import {Messages, Texts} from '../constants';

export default class FuelManager extends ECSA.Component {

  fuel: number;
  lastFuelUpdate = 0;
  fuelUpdatePeriod = 100;
  running: boolean;

  onInit() {
    this.running = true;
    this.fuel = 100;
    this.subscribe(Messages.FUEL_TOPUP, Messages.GAME_OVER);
    this.onFuelUpdate();
  }

  onMessage(msg: Message) {
    if(msg.action === Messages.FUEL_TOPUP) {
      this.fuel += 50;
      if(this.fuel > 100) { this.fuel = 100; }
    }

    if(msg.action === Messages.GAME_OVER) {
      this.running = false;
      this.owner.remove();
    }
  }

  onUpdate(delta: number, absolute: number) {
    if(!this.running) { return; }
    this.lastFuelUpdate += delta;
    if (this.lastFuelUpdate > this.fuelUpdatePeriod) {
      this.lastFuelUpdate = 0;
      this.onFuelUpdate();
    }
  }

  onFuelUpdate() {
    const inputComponent = this.scene.stage.findComponentByName<ECSA.KeyInputComponent>(ECSA.KeyInputComponent.name);
    if(inputComponent.isKeyPressed(ECSA.Keys.KEY_UP) && this.fuel > 0) {
      this.fuel --;
    }
    (this.owner as Text).text = Texts.FUEL + this.fuel + '/100';
    if(this.fuel === 0) {
      this.sendMessage(Messages.OUT_OF_FUEL);
    }
  }
}
