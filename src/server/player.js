class Player{
    constructor(id, characters) {
      this.id = id;
      this.characters = characters;
      this.dice = 0;
      this.hp = 10;
      this.level = 1;
      this.played = false;
    }
    
    roll_dice(){
      this.dice = Math.floor(Math.random() * 100) + 1;
    }
  }

  module.exports = Player
  