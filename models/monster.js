export default class Monster {
  constructor(name, health, xp, xpMax, energie) {
    this.name = name;
    this.health = health;
    this.xp = xp;
    this.xpMax = xpMax;
    this.energie = energie;
  }
  //getters
  getName() {
    return this.name;
  }
  getHealth() {
    return this.health;
  }
  getXp() {
    return this.xp;
  }
  getXpMax() {
    return this.xpMax;
  }
  getEnergie() {
    return this.energie;
  }
  //setters
  setName(name) {
    this.name = name;
  }
  setHealth(health) {
    this.health = health;
  }
  setXp(xp) {
    this.xp = xp;
  }
  setXpMax(xpMax) {
    this.xpMax = xpMax;
  }
  setEnergie(energie) {
    this.energie = energie;
  }
  //methods
  loseHealth(health) {
    this.health -= health;
  }

  attack(character) {
    // if energy >= 20
    if (this.energie >= 10) {
      character.loseHealth(10);
      this.energie -= 10;
      // xp + 10
      this.xp += 10;
      // if xp >= xpMax
      if (this.xp >= this.xpMax) {
        this.levelUp();
      }
    }
  }
  levelUp() {
    this.xpMax += 10;
    this.xp = 0;
  }
  gainXp(xp) {
    this.xp += xp;
    if (this.xp >= this.xpMax) {
      this.levelUp();
    }
  }


}