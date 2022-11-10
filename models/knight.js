import { Character } from "./character.js";

export default class Knight extends Character {
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
}