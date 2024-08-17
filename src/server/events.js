const EventType = Object.freeze({
    Search: 0,
    Trap: 1,
    Combat: 2,
    Loot: 3
})

class Event{
    constructor(title, description, type, actions, image, enemy=null) {
        this.title = title;
        this.description = description;
        this.type = type;
        this.actions = actions;
        if (type == EventType.Combat){
            this.enemy = enemy
        }
        this.image = image;
      }
}

class Action{
    constructor(title, loot, damage, damage_all){
        this.title = title;
        this.loot = loot;
        this.damage = damage;
        this.damage_all = damage_all;
    }
}

module.exports = {
    Event,
    Action,
    EventType,
    events: [
        new Event(
            'starting even',
            'event de start',
            EventType.Search,
            [new Action('ouvrir la porte'), new Action('partir')]
        ),
        new Event(
            'fighting event',
            'CA BAGARRE',
            EventType.Combat,
            [new Action('next')]
        ),
        new Event(
            'ending even',
            'event de fin',
            EventType.Search,
            [new Action('finish')]
        )
    ]
}