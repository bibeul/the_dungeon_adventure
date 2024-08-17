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
        console.log({
            numberOfPlayer: Object.keys(this.players).length,
            currentEvent: this.currentEvent,
            players: Object.values(this.players),
          })
            return {
                numberOfPlayer: Object.keys(this.players).length,
                currentEvent: this.currentEvent,
                players: Object.values(this.players),
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
        if(this.currentEvent.type == EventType.Combat) this.isFight = true
    }
}

module.exports = GameManager