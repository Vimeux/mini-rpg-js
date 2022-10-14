import { Character } from "./character.js";

export default class Wizard extends Character {
  constructor(name, health, mana, xp, xpMax, energie) {
    super(name, health, mana, xp, xpMax, energie);
  }

  attack(character) {
    // if energy >= 20
    if (this.energie >= 10) {
      character.health -= 10;
      this.energie -= 10;
      // xp + 10
      this.xp += 10;
      // if xp >= xpMax
      if (this.xp >= this.xpMax) {
        this.levelUp();
      }
    }
  }

  spell(character) {
    character.health -= 20;
    this.mana -= 20;
    // xp + 20
    this.xp += 20;
    // if xp >= xpMax
    if (this.xp >= this.xpMax) {
      this.levelUp();
    }
  }
}