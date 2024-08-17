class Player{
    constructor(id, character) {
      this.id = id;
      this.character = character;
      this.dice = 0;
      this.hp = 10;
      this.level = 1;
      this.played = false;
      this.inventory = []
    }
    
    roll_dice(){
      if(this.played){
        console.log('already played')
        return
      }
      this.dice = this.character.dice[Math.floor(Math.random() * 6)];
      this.played = true
    }
  }

module.exports = Player 
  