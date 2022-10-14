import Monster from "../models/monster.js";
import Wizard from "../models/wizard.js";
import attackLogger from "../utils/logger.js";
import logger from "../utils/logger.js"; 

const perso = new Wizard("Gandalf", 100, 10, 1, 100, 100);
const enemy = new Monster("Smaug", 100, 10, 1, 100, 100);

console.log(enemy.getHealth());
// perso.attack(enemy);
console.log(enemy.getHealth());

// function victory() {
//   if (enemy.getHealth() <= 0) {
//     alert("You win!");
//     //redirect to index.html
//     // window.location.href = "index.html";
//   }
// }

// function attack() {
//   // move #character-bloc to #monster-bloc
//   document.getElementById("character-bloc").style.left = "50%";
//   perso.attack(enemy);
//   console.log(enemy.getHealth());
//   document.getElementById("monster-hp").style.width = enemy.getHealth() + "%";
//   document.getElementById("character-energy").style.width =
//   perso.getEnergie() + "%";
//   // wait 1s
//   setTimeout(function () {
//     // move #character-bloc to #monster-bloc
//     document.getElementById("character-bloc").style.left = "0%";
//   }, 1000);
// }

// function spell() {
//   perso.spell(enemy);
//   console.log(enemy.getHealth());
//   document.getElementById("monster-hp").style.width = enemy.getHealth() + "%";
//   document.getElementById("character-mana").style.width = perso.getMana() + "%";
// }


// // attaque physique
// document.getElementById("spell2").addEventListener("click", () => {
//   attack();
//   // victory();
// });
// // document.getElementById("monster-hp").style.width = enemy.getHealth() + "%";

// //sort
// document.getElementById("spell1").addEventListener("click", () => {
//   spell();
//   // victory();
// });

async function attack(character, enemy) {
  character.attack(enemy);
  if (character instanceof Wizard) {
    document.getElementById("character-energy").style.width = character.getEnergie() + "%";
    document.getElementById("monster-hp").style.width = enemy.getHealth() + "%";
    // log attack points
    // console.log(character.name + " attaque " + enemy.name + " avec " + character.getEnergie() + " points d'énergie");
    attackLogger(character.name, character.health, character.xp, character.energie)

  } else {
    document.getElementById("character-hp").style.width = character.getHealth() + "%";
    document.getElementById("monster-energy").style.width = enemy.getEnergie() + "%";
    // log attack points
    // console.log(character.name + " attaque " + enemy.name + " avec " + enemy.getEnergie() + " points d'énergie");
    attackLogger(character.name, character.health, character.xp, character.energie)

  }
  // document.getElementById("monster-hp").style.width = enemy.getHealth() + "%";
  // document.getElementById("character-energy").style.width = character.getEnergie() + "%";
  // console.log(character.name + " attaque " + enemy.name);
}

async function spell(character, enemy) {
  character.spell(enemy);
  document.getElementById("monster-hp").style.width = enemy.getHealth() + "%";
  document.getElementById("character-mana").style.width = character.getMana() + "%";
  // log attack points
  // console.log(character.name + " attaque " + enemy.name + " avec " + character.getMana() + " points de mana");
  attackLogger(character.name, character.health, character.xp, character.energie)

}

while (perso.getHealth() > 0 && enemy.getHealth() > 0) {
  
  // wait the user to click on the attack button or the spell button
  await new Promise((resolve) => {
    if (document.getElementById("spell2").addEventListener("click", () => {
      attack(perso, enemy);
      resolve();
    }));
    if (document.getElementById("spell1").addEventListener("click", () => {
      spell(perso, enemy);
      resolve();
    }));
  });

  // wait 1s
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // enemy attack
  attack(enemy, perso);

  // wait 1s
  await new Promise((resolve) => setTimeout(resolve, 1000));

}