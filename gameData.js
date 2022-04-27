//player data
const player = {
  name: 'cherry',
  level: 0,
  hp: 10,
  atk: 5,
  def: 5,
  exp: 0
};

//monsters
const slime = {
  name: 'slime',
  hp: 2,
  atk: 3,
  exp: 5
}

const goblin = {
  name: 'goblin',
  hp: 15,
  atk: 11,
  exp: 10
}

const levelOne = {
  level: 1,
  expTarget: 5,
  statToBeIncrease: 5
};
const levelTwo = {
  level: 2,
  expTarget: 10,
  statToBeIncrease: 10
};
const levelThree = {
  level: 3,
  expTarget: 15,
  statToBeIncrease: 15
};

const levelUpPoints = [levelOne, levelTwo, levelThree];

// levels
const slimeGarden = {
  name: 'slimeGarden',
  monster: slime
}

const goblinCave = {
  name: 'goblinCave',
  monster: goblin
}

const levels = [slimeGarden, goblinCave];

exports.player = player;
exports.levels = levels;
exports.levelUpPoints = levelUpPoints;
