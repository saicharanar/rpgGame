const lib = require('./gameData.js');
const player = lib.player;
const levels = lib.levels;
const levelUpPoints = lib.levelUpPoints;

const upgradeStats = function (player) {
  const levelPosition = levelUpPoints.find(function (level) {
    return level.expTarget <= player.exp;
  });

  const statToBeIncrease = levelPosition.statToBeIncrease;
  player.hp += statToBeIncrease;
  player.atk += statToBeIncrease;
  player.def += statToBeIncrease;

  return player;
};

const canPlayerLevelUp = function (player) {
  const nextLevel = player.level + 1;
  const nextLevelInfo = levelUpPoints.find(function (level) {
    return level.level === nextLevel;
  });

  return player.exp >= nextLevelInfo.expTarget;
};

const levelUp = function (player) {
  player.level++;
  player = upgradeStats(player);
  return player;
};

const accumulateExp = function (player, monster) {
  if (monster.hp <= 0) {
    player.exp += monster.exp;
  }

  if (canPlayerLevelUp(player)) {
    player = levelUp(player);
  }
  return player;
};

const getMonsterDamage = function (monster, player) {
  let monsterDamage = monster.atk - player.def;
  return Math.max(monsterDamage, 0);
};

const takeDamageOfMonster = function (monster, player) {
  const monsterDamage = getMonsterDamage(monster, player);
  player.hp -= monsterDamage;
  player.hp = Math.max(player.hp, 0);
  return player;
};

const takeDamageOfPlayer = function (player, monster) {
  monster.hp -= player.atk;
  monster.hp = Math.max(monster.hp, 0);

  return monster;
};

const attackMonster = function (player, monster) {
  const monsterDamage = getMonsterDamage(monster, player);
  monster = takeDamageOfPlayer(player, monster);
  player = takeDamageOfMonster(monster, player);

  return {
    player: player.name,
    monster: monster.name,
    damageDealt: player.atk,
    damageTaken: monsterDamage,
    playerLevel: player.level,
    playerRemainingHeath: player.hp,
    monsterRemainingHealth: monster.hp
  }
};

const attack = function (player, level) {
  const levelReport = ['Place : ' + level.name];

  while (player.hp > 0 && level.monster.hp > 0) {
    levelReport.push(attackMonster(player, level.monster));
    player = accumulateExp(player, level.monster);
  }

  return levelReport;
};

const startGame = function (player, levels) {
  const gameReport = [];
  levels.forEach(function (level) {
    gameReport.push(attack(player, level));
  })

  return gameReport;
};

console.log(startGame(player, levels));
