//class character
export class Character {
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
    character.health -= 10;
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
  gainHealth(health) {
    this.health += health;
  }
  gainMana(mana) {
    this.mana += mana;
  }
  gainEnergie(energie) {
    this.energie += energie;
  }
  loseHealth(health) {
    this.health -= health;
  }
  loseMana(mana) {
    this.mana -= mana;
  }
  loseEnergie(energie) {
    this.energie -= energie;
  }

  //methods
  move($sens) {
    this.position += $sens;
  }
}