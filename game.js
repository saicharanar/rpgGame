const lib = require('./gameData.js');
const player = lib.player;
const levels = lib.levels;
const levelUpPoints = lib.levelUpPoints;

const isPlayerReadyForLevelUp = function (player) {
  return levelUpPoints.some(function (level) {
    return level.targetPoints === player.exp;
  });
};

const levelUp = function (player) {
  player.level++;
  player = upgradeStats(player);
  return player;
};

const upgradeStats = function (player, monster) {
  player.hp += 5;
  player.atk += 5;
  player.def += 5;

  return player;
};

const accumulateExp = function (player, monster) {
  if (monster.hp <= 0) {
    player.exp += monster.exp;
  }
  if (isPlayerReadyForLevelUp(player)) {
    player = levelUp(player);
  }
  return player;
};

const getMonsterDamage = function (monster, player) {
  let monsterDamage = monster.atk - player.def;
  return monsterDamage > 0 ? monsterDamage : 0;
};

const takeDamageOfMonster = function (monster, player) {
  const monsterDamage = getMonsterDamage(monster, player);
  player.hp -= monsterDamage;
  player.hp = player.hp > 0 ? player.hp : 0;

  return player;
};

const takeDamageOfPlayer = function (player, monster) {
  monster.hp -= player.atk;
  monster.hp = monster.hp > 0 ? monster.hp : 0;

  return monster;
};

const attackPlace = function (player, level) {
  let monster = level.monster;
  const monsterDamage = getMonsterDamage(monster, player);

  monster = takeDamageOfPlayer(player, monster);
  player = takeDamageOfMonster(monster, player);

  return {
    player: player.name,
    monster: monster.name,
    place: level.name,
    damageDealt: player.atk,
    damageTaken: monsterDamage,
    playerLevel: player.level,
    playerRemainingHeath: player.hp,
    monsterRemainingHealth: monster.hp
  }
};

const attack = function (player, level) {
  const levelReport = [];
  while (player.hp > 0 && level.monster.hp > 0) {
    levelReport.push(attackPlace(player, level));
    player = accumulateExp(player, level.monster);
  }

  return levelReport;
};

const startGame = function (player, levels) {
  const levelsReport = [];
  levels.forEach(function (level) {
    levelsReport.push(attack(player, level));
  })

  return levelsReport;
};

console.log(startGame(player, levels));
