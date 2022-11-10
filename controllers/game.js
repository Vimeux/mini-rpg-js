import Monster from "../models/monster.js";
import Wizard from "../models/wizard.js";
import Knight from "../models/knight.js";
import attackLogger from "../utils/logger.js";

// if in localstorage, persoId is type1, create a new Wizard or a niew knight
const perso = localStorage.getItem("persoId") === "type1" ? new Wizard(localStorage.getItem("persoName"), 100, 100, 1, 100, 100) : new Knight(localStorage.getItem("persoName"), 100, 0, 1, 50, 100);
const cssClassIdle = localStorage.getItem("persoId") === "type1" ? "wizardIdle" : "knightIdle";
const cssClassRun = localStorage.getItem("persoId") === "type1" ? "wizardRun" : "knightRun";
document.getElementById("character-bloc").classList.replace("wizardIdle", cssClassIdle);
// if knight, render spell button unclickable
if (localStorage.getItem("persoId") === "type2") {
  document.getElementById("spell1").style.pointerEvents = "none";
  document.getElementById("spell1").style.opacity = "0.5";
}


// const perso = new Wizard("Gandalf", 100, 100, 1, 100, 100);
const monster = new Monster("Smaug", 100, 1, 100, 100);

const spellButton = document.getElementById("spell1");
const attackButton = document.getElementById("spell2");
const nextButton = document.getElementById("next");

const attack = (character, monster) => {
  setTimeout(() => {
    character.attack(monster);
    if (character instanceof Wizard || character instanceof Knight) {
      document.getElementById("character-energy").style.width = character.getEnergie() + "%";
      document.getElementById("monster-hp").style.width = monster.getHealth() + "%";

      perso.move(1);
      document.getElementById("character-bloc").style.right = perso.position + "rem";
      document.getElementById("character-bloc").classList.remove(cssClassIdle);
      document.getElementById("character-bloc").classList.add(cssClassRun);

      setTimeout(() => {
        document.getElementById("character-bloc").classList.remove(cssClassRun);
        document.getElementById("character-bloc").classList.add(cssClassIdle);
      }, 500);

      // log attack points
      // console.log(character.name + " attaque " + monster.name + ", il lui reste " + character.getEnergie() + " points d'énergie");
      attackLogger(character.name, character.health, character.xp, character.energie)
    } else {
      document.getElementById("monster-energy").style.width = character.getEnergie() + "%";
      document.getElementById("character-hp").style.width = monster.getHealth() + "%";
      // console.log(character.name + " attaque " + monster.name + ", il lui reste " + monster.getEnergie() + " points d'énergie");
      attackLogger(character.name, character.health, character.xp, character.energie)
    }
  }, 100);
}

const spell = (character, monster) => {
  setTimeout(() => {
    if (character instanceof Wizard) {
      character.spell(monster);
      console.log(character.name);
      document.getElementById("monster-hp").style.width = monster.getHealth() + "%";
      document.getElementById("character-mana").style.width = character.getMana() + "%";

      document.getElementById("character-bloc").style.right = perso.position + "rem";
      document.getElementById("character-bloc").classList.remove(cssClassIdle);
      document.getElementById("character-bloc").classList.add("wizardSpell");

      setTimeout(() => {
        document.getElementById("character-bloc").classList.remove("wizardSpell");
        document.getElementById("character-bloc").classList.add(cssClassIdle);
      }, 500);
      // log attack points

      attackLogger(character.name, character.health, character.xp, character.energie)
    }
  }, 100);
}

// player and monster attack turn by turn
const turn = async (character, monster) => {
  if (character instanceof Wizard || character instanceof Knight) {
    // if player click on spell1 button, spell1 is casted
    // console.log("turn");
    return new Promise((resolve, reject) => {
      // listen click on spell1 button without event bubbling
      spellButton.addEventListener("click", (e) => {
        e.stopPropagation();
        spell(character, monster);
        console.log("spell");
        // wait end of last action to check if win or not
        setTimeout(() => {
          if (monster.getHealth() <= 0) {
            alert("You win");
            window.location.href = "index.html";
            return
          }
        }, 100);
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
            window.location.href = "index.html";
            return
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
              window.location.href = "index.html";
              return
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
      window.location.href = "index.html";
    } else {
      console.log("You win");
      window.location.href = "index.html";
    }
  }
}

gameLoop(perso, monster);