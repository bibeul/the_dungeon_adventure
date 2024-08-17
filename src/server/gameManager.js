const { blockDiceFace } = require('./character')
const { EventType } = require('./events')

class GameManager{
    constructor(event, events){
        console.log(EventType)
        this.players = {}
        this.currentEvent = event
        this.eventNumber = 0
        this.events = events
        this.isFight = false
    }

    addPlayer(id, player){
        this.players[id] = player
        console.log(`adding ${id}`);
        console.log(this.players)  
    }

    removePlayer(id){
        delete this.players[id]
        console.log(`removing ${id}`);
    }

    getCurrentGameStatus(){
            return {
                numberOfPlayer: Object.keys(this.players).length,
                currentEvent: this.currentEvent,
                players: Object.values(this.players),
            }
    }

    getAllPlayersData(){
        const players = []
        for(const id in this.players){
            players.push(this.players[id])
        }
        return players
    }

    setupFightingEvent(){
        this.isFight = true
        for(const playerId in this.players){
            this.players[playerId].played = false
        }
    }

    hasEveryonePlayed(){
        for(const playerId in this.players){
            if(!this.players[playerId].played){
                return false
            }
        }
        return true
    }

    enemyTurn(){
        const enemy = this.currentEvent.enemy

        for(const playerId in this.players){
            const currentPlayer = this.players[playerId]
            const foundDice = enemy.diceHp.indexOf(currentPlayer.dice)
            if(foundDice >= 0){
                enemy.diceHp.splice(foundDice, 1)
            }
        }
        console.log("ouiiiiiiiiiiiiiii")
        console.log(enemy.diceHp.length)
        if(enemy.diceHp.length <= 0){
            this.isFight = false
            return
        }

        for(const playerId in this.players){
            const currentPlayer = this.players[playerId]
            if(!blockDiceFace.includes(currentPlayer.dice)){
                currentPlayer.hp = currentPlayer.hp - enemy.damage
            }
            currentPlayer.played = false
        }
    }

    nextEvent(){
        if(this.isFight){
            console.log("Need to fight")
            return
        } 

        this.eventNumber++;
        if(this.eventNumber >= this.events.length) this.eventNumber = 0
        this.currentEvent = this.events[this.eventNumber]

        if(this.currentEvent.type == EventType.Combat) this.setupFightingEvent()     
    }
}

module.exports = GameManager