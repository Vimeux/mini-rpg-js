const logger = document.getElementById("logger");

function addLog(text){
  logger.scrollTop = logger.scrollHeight-13;
  logger.innerHTML += text + "&#13;&#10;";
}

export default function attackLogger(name, health, xp, energie ){
  addLog(`${name} attaque ! Il lui reste ${health} points de vie, ${xp} points d'expérience et ${energie} points d'énergie.`);
}