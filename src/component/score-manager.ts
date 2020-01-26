import * as ECSA from '../../libs/pixi-component';
import {Message} from '../../libs/pixi-component';
import {LocalStorageKeys, Messages, Texts} from '../constants';

export default class ScoreManager extends ECSA.Component {

  private score: number;
  private lastScoreUpdate = 0;
  private running: boolean;
  private scorePeriod = 100;

  onInit() {
    this.running = true;
    this.score = 0;
    this.onScoreUpdate();
    this.subscribe(Messages.GAME_OVER);
  }

  onMessage(msg: Message) {
    if(msg.action === Messages.GAME_OVER) {
      this.running = false;
      //save highest score to local storage
      const highestScoreSoFar = window.localStorage.getItem(LocalStorageKeys.HIGHEST_SCORE);
      if (highestScoreSoFar == null || this.score > Number(highestScoreSoFar)) {
        window.localStorage.setItem(LocalStorageKeys.HIGHEST_SCORE, String(this.score));
        window.localStorage.setItem(LocalStorageKeys.CURRENT_SCORE, String(this.score));
      }
      window.localStorage.setItem(LocalStorageKeys.CURRENT_SCORE, String(this.score));
      this.owner.remove();
    }
  }

  onUpdate(delta: number, absolute: number) {
    if (!this.running) {
      return;
    }
    this.lastScoreUpdate += delta;
    if (this.lastScoreUpdate > this.scorePeriod) {
      this.lastScoreUpdate %= this.scorePeriod;
      this.onScoreUpdate();
    }
  }

  onScoreUpdate() {
    this.score++;
    this.owner.asText().text = Texts.SCORE + this.score;
  }
}
