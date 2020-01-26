import TextStyle = PIXI.TextStyle;

export const GAME_TITLE = 'Fly, \nballoon, \nfly!';

export enum Assets {
  SND_FUEL_TOPUP = 'snd_fuel_topup',
  SND_LIGHTNING = 'snd_lightning',
  SND_GAME_OVER = 'snd_game_over',
  SND_GAME_STARTED = 'snd_game_started',
  SND_BIRD = 'snd_bird',
  FUEL = 'fuel',
  BALLOON_BURNING = 'balloon_burning',
  BALLOON_IDLE = 'balloon_idle',
  BIRD = 'bird',
  CLOUD = 'cloud',
  LIGHTNING = 'lightning',
  HILLS = 'hills',
  HILLS2 = 'hills2',
}

export enum Names {
  FUEL = 'fuel',
  BALLOON = 'balloon',
  BIRD = 'bird',
  CLOUD = 'cloud',
  LIGHTNING = 'lightning',
}

export enum Texts {
  HIGHEST_SCORE = 'Highest score: ',
  SCORE = 'Score: ',
  FUEL = 'Fuel: ',
  GAME_OVER = 'Game over!',
  OUT_OF_FUEL = 'Out of fuel!',
  CONTROLS = 'Controls: arrow up',
  PRESS_ENTER_TO_START = 'Press ENTER to start',
  MADE_BY = 'Made by Jindra Zak',
  EMAIL = 'zakjidr@fit.cvut.cz',
}

export enum Sizes {
  GAME_WIDTH = 840,
  GAME_HEIGHT = 1280,
}

export enum Messages {
  COLLISION_WITH_GROUND = 'collision_with_ground',
  FUEL_TOPUP = 'fuel_topup',
  COLLISION_WITH_LIGHTNING = 'collision_with_lightning',
  COLLISION_WITH_BIRD = 'collision_with_bird',
  OUT_OF_FUEL = 'out_of_fuel',
  GAME_OVER = 'game_over',
  GAME_STARTED = 'game_started',
  BIRD_SPAWNED = 'bird_spawned',
  LIGHTNING_SPAWNED = 'lightning_spawned'
}

export enum LocalStorageKeys {
  HIGHEST_SCORE = 'highest_score',
  CURRENT_SCORE = 'current_score',
}

export enum Flags {
  COLLIDABLE = 1,
}

export enum Tags {
  REMOVE_ON_GAME_START = 'remove_on_game_start'
}

export enum Values {
  HILLS_SPEED = 50,
  HILLS2_SPEED = 100,
  BIRD_SPAWN_INTERVAL = 7000,
  FUEL_SPAWN_INTERVAL = 12000,
  CLOUD_SPAWN_INTERVAL = 7000,
  LIGHTNING_SPAWN_INTERVAL = 10000,
}

export const smallStyle = new TextStyle({
  fontFamily: 'Luckiest Guy',
  fontSize: 30,
  dropShadow: true,
  dropShadowColor: '#0',
  fill: [
    '#faef1f',
    '#fcc51d'
  ],
});

export const gameUiStyle = new TextStyle({
  fontFamily: 'Luckiest Guy',
  fontSize: 55,
  dropShadow: true,
  dropShadowColor: '#0',
  fill: [
    '#faef1f',
    '#fcc51d'
  ],
});

export const gameTitleStyle = new TextStyle({
  fontFamily: 'Luckiest Guy',
  fontSize: 150,
  dropShadow: true,
  dropShadowColor: '#0',
  fill: [
    '#faef1f',
    '#fcc51d'
  ],
});

export const gameOverStyle = new TextStyle({
  fontFamily: 'Luckiest Guy',
  fontSize: 100,
  dropShadow: true,
  dropShadowColor: '#0',
  fill: [
    '#faef1f',
    '#fcc51d'
  ],
});
