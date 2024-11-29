let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterName = document.querySelector('#monsterName');
const monsterHealthText = document.querySelector('#monsterHealth');
const weapons = [
    {
        name : "stick",
        power : 5
    },
    {
        name : "dagger",
        power : 30
    },
    {
        name : "claw hammer",
        power : 50
    },
    {
        name : "sword",
        power : 100
    }
];
const monsters = [
    {
        name : "slime",
        level : 2,
        health : 15
    },
    {
        name : "fanged beast",
        level : 8,
        health : 60
    },
    {
        name : "dragon",
        level : 20,
        health : 300
    }
];
const locations = [
    {
        name : "town square",
        buttonText : ["Go to store","Go to cave","Fight dragon"],
        buttonFunctions : [goStore,goCave,fightDragon],
        textToWrite : "You are at the town square"
    },
    {
        name : "store",
        buttonText : ["Buy 10 health(10 gold)","Buy weapon (30 gold)","Go back to town square"],
        buttonFunctions : [buyHealth,buyWeapon,goTown],
        textToWrite : "You have entered the store"
    },
    {
        name : "cave",
        buttonText : ["Fight slime","Fight fanged beast","Go back to town square"],
        buttonFunctions : [fightSlime,fightBeast,goTown],
        textToWrite : "You have entered the cave. We can now fight the monsters"
    },
    {
        name : "fight",
        buttonText : ["Attack","Dodge","Run"],
        buttonFunctions : [attack,dodge,goTown],
        textToWrite : "You are fighting a monster"
    },
    {
        name : "kill monster",
        buttonText : ["Go back to town square!!","Go back to town square","Go back to town square"],
        buttonFunctions : [easterEgg,goTown,goTown],
        textToWrite : "The monster screams Arg! as it dies. You gain experience points and find gold"
    },
    {
        name : "lose",
        buttonText : ["REPLAY?","REPLAY?","REPLAY?"],
        buttonFunctions : [restart,restart,restart],
        textToWrite : "You die"
    },
    {
        name : "win",
        buttonText : ["REPLAY?","REPLAY?","REPLAY?"],
        buttonFunctions : [restart,restart,restart],
        textToWrite : "You defeat the dragon! YOU WON THE GAME!" 
    },
    {
        name : "easter egg",
        buttonText : ["2","8","Go back to town square"],
        buttonFunctions : [pickTwo,pickEight,goTown],
        textToWrite : "You found a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, You Win!!" 
    }
]

//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["buttonText"][0];
    button2.innerText = location["buttonText"][1];
    button3.innerText = location["buttonText"][2];
    text.innerText = location["textToWrite"]
    button1.onclick = location["buttonFunctions"][0];
    button2.onclick = location["buttonFunctions"][1];
    button3.onclick = location["buttonFunctions"][2];
}

function goStore() {
    console.log(locations[1]);
    update(locations[1]);
}

function goTown(){
    console.log(locations[0]);
    update(locations[0]);
}

function goCave() {
    console.log(locations[2])
    update(locations[2])
}

function buyHealth(){
    if (gold >= 10)
    {
        gold = gold-10;
        health = health + 10;
        console.log("health = "+health);
        console.log("gold = "+gold);
        console.log("Health successfully purchased");
        text.innerText = "Health successfully purchased!!"+"\n";
        goldText.innerText = gold;
        healthText.innerText = health;

    }
    else
    {
        console.log("No enough gold");
        text.innerText = "Oops!! No enough gold";
    }
}

function buyWeapon() {
    if (gold>=30 && currentWeapon<weapons.length-1)
    {
        gold=gold-30;
        currentWeapon = currentWeapon+1;
        text.innerText = "You have now baught the "+weapons[currentWeapon]["name"];
        goldText.innerText = gold;
        inventory.push(weapons[currentWeapon]["name"]);
        console.log(inventory);
        text.innerText = text.innerText + "\nYour inventory : "+inventory;
    }
    else if (currentWeapon==weapons.length-1)
    {
        text.innerText = "You already have the most powerful weapon";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
    else
    {
        text.innerText = "No enough gold to buy weapon";
    }
}

function sellWeapon() {
    if (currentWeapon>1)
    {
        gold = gold + 15;
        currentWeapon = currentWeapon - 1;
        goldText.innerText = gold;
        inventory.pop();
        console.log(inventory);
        text.innerText = "Your current weapon is "+inventory[currentWeapon];
    } 
    else
    {
        text.innerText = "Don't sell your only weapon";
    }
}

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightBeast() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsters[fighting].health;
}

function attack() {
    text.innerText = "The "+monsters[fighting].name+" attacks";
    text.innerText = text.innerText + "\nYou attack it with your "+weapons[currentWeapon].name+".";
    if (isMonsterHit())
    {
        health = health - getMonsterAttackValue(monsters[fighting].level);
    }
    else
    {
        text.innerText = text.innerText + "\nYOU MISS";
    }
    monsterHealth = monsterHealth-weapons[currentWeapon].power + Math.floor(Math.random()*xp)+1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0)
    {
        lose();
    }
    else if(monsterHealth <= 0)
    {
        if (fighting === 2)
        {
            winGame();
        }
        else 
        {
            defeatMonster();
        }
    }
    if (Math.random <= 0.1 && inventory.length !== 1)
    {
        text.innerText = text.innerText + "Your " + inventory.pop() + " broke.";
        currentWeapon = currentWeapon - 1;
    }
}

function getMonsterAttackValue(level) {
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    return hit;
}

function isMonsterHit() {
    return Math.random() > .2 || health < 20;
}

function dodge() {
    text.innerText = "You didge the attack from the "+monsters[fighting].name+".";
}

function lose() {
    update(locations[5]);
}

function winGame () {
    update(locations[6]);
}

function defeatMonster() {
    gold = gold + Math.floor((monsters[fighting].level)*6.7);
    xp = xp + monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}

function easterEgg() {
    update(locations[7]);
}

function pickEight() {
    pick(8);
}

function pickTwo() {
    pick(2);
}

function pick(guess) {
    let numbers = [];
    while (numbers.length < 10){
        numbers.push(Math.floor(Math.random()*11));
    }
    text.innerText = "You picked : "+ guess +"\nAnd the random numbers are "+numbers;
    if (numbers.indexOf(guess) !== -1){
        text.innerText = text.innerText + "\nRight! You win 20 gold";
        gold = gold + 20;
        goldText.innerText = gold;
    }
    else
    {
        text.innerText = text.innerText + "\nYour guess is wrong!!\n You losse 10 health";
        health = health -10;
        healthText.innerText = health; 
        if (health <= 0)
        {
            lose();
        }
    }
}