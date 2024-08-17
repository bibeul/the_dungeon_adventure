const characterDiceFace = {
    str: 0,
    dxt: 1,
    wsd: 2,
    db_wsd: 3,
    db_str: 4,
    db_dxt: 5,
}


const characters = {
    smith: {
        text: 'yes yes yes',
        dice: [characterDiceFace.str, characterDiceFace.str, characterDiceFace.db_str, characterDiceFace.wsd, characterDiceFace.db_wsd, characterDiceFace.dxt],
        stats: {
            str: 4,
            dxt: 1,
            wsd: 3
        }
    },
    priest: {
        text: 'yes yes yes',
        dice: [characterDiceFace.str, characterDiceFace.str, characterDiceFace.db_str, characterDiceFace.wsd, characterDiceFace.db_wsd, characterDiceFace.dxt],
        stats: {
            str: 4,
            dxt: 1,
            wsd: 3
        }
    },
    mailman: {
        text: 'yes yes yes',
        dice: [characterDiceFace.str, characterDiceFace.str, characterDiceFace.db_str, characterDiceFace.wsd, characterDiceFace.db_wsd, characterDiceFace.dxt],
        stats: {
            str: 4,
            dxt: 1,
            wsd: 3
        }
    },
    noble: {
        text: 'yes yes yes',
        dice: [characterDiceFace.str, characterDiceFace.str, characterDiceFace.db_str, characterDiceFace.wsd, characterDiceFace.db_wsd, characterDiceFace.dxt],
        stats: {
            str: 4,
            dxt: 1,
            wsd: 3
        }
    },
}

module.exports = {
    characters,
    characterDiceFace
}