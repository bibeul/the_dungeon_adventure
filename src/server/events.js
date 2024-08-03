const EventType = Object.freeze({
    Search: 0,
    Trap: 1,
    Combat: 2,
    Loot: 3
})

class Event{
    constructor(title, description, type, actions, image) {
        this.title = title;
        this.description = description;
        this.type = type;
        this.actions = actions;
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

module.exports = [
    new Event(
        'starting even',
        'event de start',
        EventType.Search,
        [new Action('ouvrir la porte'), new Action('partir')]
    ),
    new Event(
        'ending even',
        'event de fin',
        EventType.Search,
        [new Action('finish')]
    )
]