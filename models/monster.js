export default class Monster {
  constructor(name, health, mana, xp, xpMax, energie) {
    this.name = name;
    this.health = health;
    this.mana = mana;
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
  getMana() {
    return this.mana;
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
  setMana(mana) {
    this.mana = mana;
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
  attack(character) {
    if (this.energie >= 10) {
      character.health -= 10;
      this.energie -= 10;
      // xp + 10
      this.gainXp(10);
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