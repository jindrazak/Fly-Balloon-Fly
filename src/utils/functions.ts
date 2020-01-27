/**
 * Returns true if given time has already reached or exceeded certain period
 */
export const checkTime = (lastTime: number, time: number, frequency: number) => {
  return (time - lastTime) > 1000 / frequency;
};

export const randomNormalDistribution = () => {
  let u = 0, v = 0;
  while(u === 0) { u = Math.random(); } //Converting [0,1) to (0,1)
  while(v === 0) { v = Math.random(); }
  return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )  / 10.0 + 0.5;
};
