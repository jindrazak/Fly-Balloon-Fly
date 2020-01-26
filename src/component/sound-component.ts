import * as ECSA from '../../libs/pixi-component';
import PIXISound from 'pixi-sound';
import {Assets, Messages} from '../constants';

export const soundComponent = () => new ECSA.GenericComponent('SoundComponent')
  .doOnMessage(Messages.FUEL_TOPUP, (cmp, msg) => PIXISound.play(Assets.SND_FUEL_TOPUP))
  .doOnMessage(Messages.LIGHTNING_SPAWNED, (cmp, msg) => PIXISound.play(Assets.SND_LIGHTNING))
  .doOnMessage(Messages.GAME_OVER, (cmp, msg) => PIXISound.play(Assets.SND_GAME_OVER))
  .doOnMessage(Messages.GAME_STARTED, (cmp, msg) => PIXISound.play(Assets.SND_GAME_STARTED))
  .doOnMessage(Messages.BIRD_SPAWNED, (cmp, msg) => PIXISound.play(Assets.SND_BIRD));

