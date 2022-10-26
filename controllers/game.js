import Monster from "../models/monster.js";
import Wizard from "../models/wizard.js";
import attackLogger from "../utils/logger.js";
import logger from "../utils/logger.js";

const perso = new Wizard("Gandalf", 100, 100, 1, 100, 100);
const monster = new Monster("Smaug", 100, 1, 100, 100);

const spellButton = document.getElementById("spell1");
const attackButton = document.getElementById("spell2");
const nextButton = document.getElementById("next");

console.log(monster.getHealth());
console.log(monster.getHealth());


const win = (character, monster) => {
  console.log("win");
}

const attack = (character, monster) => {
  setTimeout(() => {
    character.attack(monster);
    if (character instanceof Wizard) {
      document.getElementById("character-energy").style.width = character.getEnergie() + "%";
      document.getElementById("monster-hp").style.width = monster.getHealth() + "%";

      perso.move(1);
      document.getElementById("character-bloc").style.right = perso.position + "rem";
      document.getElementById("character-bloc").classList.remove("wizardIdle");
      document.getElementById("character-bloc").classList.add("wizardRun");

      setTimeout(() => {
        document.getElementById("character-bloc").classList.remove("wizardRun");
        document.getElementById("character-bloc").classList.add("wizardIdle");
      }, 1000);

      // log attack points
      // console.log(character.name + " attaque " + monster.name + ", il lui reste " + character.getEnergie() + " points d'énergie");
      attackLogger(character.name, character.health, character.xp, character.energie)
    } else {
      document.getElementById("character-hp").style.width = character.getHealth() + "%";
      document.getElementById("monster-energy").style.width = monster.getEnergie() + "%";
      // log attack points
      console.log(character.getHealth());
      // console.log(character.name + " attaque " + monster.name + ", il lui reste " + monster.getEnergie() + " points d'énergie");
      attackLogger(character.name, character.health, character.xp, character.energie)
    }
  }, 100);
}

const spell = (character, monster) => {
  setTimeout(() => {
    character.spell(monster);
    document.getElementById("monster-hp").style.width = monster.getHealth() + "%";
    document.getElementById("character-mana").style.width = character.getMana() + "%";
    // log attack points
    console.log(character.name + " attaque " + monster.name + ", il lui reste " + character.getMana() + " points de mana");

    attackLogger(character.name, character.health, character.xp, character.energie)
  }, 100);
}

// player and monster attack turn by turn
const turn = async (character, monster) => {
  if (character instanceof Wizard) {
    // if player click on spell1 button, spell1 is casted
    // console.log("turn");
    return new Promise((resolve, reject) => {
      // listen click on spell1 button without event bubbling
      spellButton.addEventListener("click", (e) => {
        e.stopPropagation();
        spell(character, monster);
        // wait end of last action to check if win or not
        setTimeout(() => {
          if (monster.getHealth() <= 0) {
            alert("You win");
            resolve("win");
          }
        }, 1000);
        resolve();
      }, { once: true });
      // listen click on attack button without event bubbling
      attackButton.addEventListener("click", (e) => {
        e.stopPropagation();
        attack(character, monster);
        // wait end of last action to check if win or not
        setTimeout(() => {
          if (monster.getHealth() <= 0) {
            alert("You win");
            resolve("win");
          }
        }, 1000);
        resolve();
      }, { once: true });
      // listen click on next button without event bubbling
      nextButton.addEventListener("click", (e) => {
        e.stopPropagation();
        resolve();
      }, { once: true });
    }).then(() => {
      if (monster.getHealth() > 0) {
        // attack(monster, character);
        setTimeout(() => {
          // b++;
          // console.log("attack" + " b : " + b);
          attack(monster, character);
          // wait end of last action to check if win or not
          setTimeout(() => {
            if (character.getHealth() <= 0) {
              alert("Game Over");
              resolve("lose");
            }
          }, 1000);
        }, 1000);
      }
    });
  }
}


// game loop, wait end of turn to start a new one
const gameLoop = (character, monster) => {
  if (character.getHealth() > 0 && monster.getHealth() > 0) {
    // console.log("gameLoop");
    turn(character, monster).then(() => {
      // console.log("turn");
      gameLoop(character, monster);
    });
  } else {
    if (character.getHealth() <= 0) {
      console.log("Game Over");
    } else {
      console.log("You win");
    }
  }
}

gameLoop(perso, monster);