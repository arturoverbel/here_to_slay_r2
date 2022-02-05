const prompt = require('prompt')

const monsters = [
    { 
        id: 1,
        name: 'ugly',
        slay: { number: 8, way: '>' }
    },
    {   
        id: 2,
        name: 'tacky',
        slay: { number: 11, way: '>' }
    },
    {   
        id: 3,
        name: 'foul',
        slay: { number: 9, way: '>' }
    }
]

const players = [
    {name: 'r2', id: 1}, {name: 'kira', id: 2}
]

const party = {}

function monsterSlay(monster, roll) {
    return (monster.slay.way == '>' && roll >= monster.slay.number)
        || (monster.slay.way == '<' && roll <= monster.slay.number)
}

function playerIsWinner(player) {
    const totalMonster = (party.hasOwnProperty(player.id)) 
        ? party[player.id].monsters.length
        : 0

    return totalMonster >= 3
}

function showTurnPlayer(player, turn) {
    const totalMonster = (party.hasOwnProperty(player.id)) 
        ? party[player.id].monsters.length
        : 0

    console.log(`Pplayer ${player.name}
        ${totalMonster} monsters
        Your turn:
    `)
}

function showStats(turn) {
    for(const player of players) {
        console.log(`
        ------------------------------
        ${player.name}
        ${party[player.id].monsters.length} monsters
    `)
    }

}

async function run() {
    prompt.start()
    for(let ronda = 0; true; ronda++ ) {
        for(const turn in players) {
            console.log('NEW TURN +============')
            const player = players[turn]
            showTurnPlayer(player, turn)

            let {monster} = await prompt.get(['monster'])
            let {roll} = await prompt.get(['roll'])
            
            monster = parseInt(monster)
            roll = parseInt(roll)
        
            const monsterEntity = monsters.find(m => m.id == monster)

            if(monsterSlay(monsterEntity, roll)) {
                if( party.hasOwnProperty(player.id) ) {
                    party[player.id].monsters.push(monsterEntity)
                } else {
                    party[player.id] = {
                        monsters: [monsterEntity]
                    }
                }

                console.log('You got it!!')
            } else {
                console.log('You fail')
            }

            if(playerIsWinner(player)) break;

        }

        if(playerIsWinner(player)) break;
    }
    prompt.stop()

    showStats()
}

run()