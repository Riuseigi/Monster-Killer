
/* A constant variable that is used to set the value of the attack, strong attack, monster attack and
heal. */
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE =14;
const HEAL_VALUE = 20;
const MODE_ATTACK = 'ATTACK'
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'


/* A constant variable that is used to set the value of the attack, strong attack, monster attack and
heal. */
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

let battleLog = [];
let lastLogEntry;
function getMaxLifeValues(){
    /* Asking the user to enter a value, and then it is converting that value to an integer. */
    const enteredValue = prompt('Maximum life for you and the monster.', '100')
    let parsedValue = parseInt(enteredValue);
/* Checking if the value entered by the user is a number or not, and if it is not a number,
  then it is throwing an error. */
    if (isNaN(parsedValue) || parsedValue<=0){
        throw{message: 'Invalid user input, not a number'}
    }
    return parsedValue;
    }



/* Trying to get the value of the chosenMaxLife variable, and if it is not able to get the value, then
it is setting the value of the chosenMaxLife variable to 100. */
let chosenMaxLife;
try {
    chosenMaxLife = getMaxLifeValues();
} catch (error) {
    console.log(error);
    chosenMaxLife = 100;
    alert("You entered something wrong, default value of 100 was used.")  // throw error;
} 


let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

/**
 * The function takes in 4 parameters, and then creates an object with those parameters, and then
 * pushes that object into the battleLog array.
 * @param ev - the event that happened
 * @param val - the damage value
 * @param monsterHealth - the monster's health after the attack
 * @param playerHealth - The player's health after the attack.
 */
function writeToLog(ev,val,monsterHealth, playerHealth){
    let logEntry ={
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
    };
/* Checking the value of the ev parameter, and then depending on the value of the ev parameter, it
   is setting the value of the logEntry variable. */
    switch (ev) {
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry ={
                event: ev,
                value: val,
                target: 'MONSTER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth,
            };
            break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry ={
                event: ev,
                value: val,
                target: 'PLAYER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth,
            };
            break;
        case LOG_EVENT_PLAYER_HEAL:
            logEntry ={
                event: ev,
                value: val,
                target: 'PLAYER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth,
            };
            break;
        case LOG_EVENT_GAME_OVER:
            logEntry ={
                event: ev,
                value: val,
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth,
            };
            break;
        default:
            logEntry = {};
    }
    // if(ev === LOG_EVENT_PLAYER_ATTACK){
    //     logEntry.target = 'MONSTER';
    // }else if(ev === LOG_EVENT_PLAYER_STRONG_ATTACK){
    //     logEntry ={
    //         event: ev,
    //         value: val,
    //         target: 'MONSTER',
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth,
    //     };
    // } else if(ev === LOG_EVENT_MONSTER_ATTACK){
    //     logEntry ={
    //         event: ev,
    //         value: val,
    //         target: 'PLAYER',
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth,
    //     };

    // } else if(ev === LOG_EVENT_PLAYER_HEAL){
    //     logEntry ={
    //         event: ev,
    //         value: val,
    //         target: 'PLAYER',
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth,
    //     };
    // } else if(ev === LOG_EVENT_GAME_OVER){
    //     logEntry ={
    //         event: ev,
    //         value: val,
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth,
    //     };
    // }
    battleLog.push(logEntry);
}
function reset(){
    let currentMonsterHealth = chosenMaxLife;
    let currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}
//show the event in alert message
function endRound(){
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(LOG_EVENT_MONSTER_ATTACK,
        playerDamage,
        currentMonsterHealth,
        currentPlayerHealth);
    //Bonus life feature
    if(currentPlayerHealth <= 0 && hasBonusLife){
        hasBonusLife =false;
        /* Removing the bonus life from the DOM. */
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('You would be dead but the bonus life saved you')
    }
    //event alerts
    if(currentMonsterHealth <= 0 && currentPlayerHealth > 0){
        alert('You Won')
        writeToLog(LOG_EVENT_GAME_OVER,
            'Player WON!!!!',
            currentMonsterHealth,
            currentPlayerHealth);
    } else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0){
        alert('You lost hahahhahaha!');
        writeToLog(LOG_EVENT_GAME_OVER,
            'Monster WON!!!!',
            currentMonsterHealth,
            currentPlayerHealth);
    } else if(currentPlayerHealth <= 0 && currentMonsterHealth <=0){
        alert('You have a draw')
        writeToLog(LOG_EVENT_GAME_OVER,
            'A DRAWWW',
            currentMonsterHealth,
            currentPlayerHealth);
    }
    if (currentMonsterHealth <= 0 || currentMonsterHealth<=0){
            reset();
        }
}
// gets the attack mode function
function attackMonster(mode){

    const maxDamnage = mode === MODE_ATTACK ? ATTACK_VALUE: STRONG_ATTACK_VALUE;
    const logEvent = mode === MODE_ATTACK? LOG_EVENT_PLAYER_ATTACK: LOG_EVENT_PLAYER_STRONG_ATTACK;
    // if(mode === MODE_ATTACK){
    //     maxDamnage = ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_ATTACK
    // } else if(mode === MODE_STRONG_ATTACK){
    //     maxDamnage = STRONG_ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    // }
    const damage = dealMonsterDamage(maxDamnage);
    currentMonsterHealth -= damage;
    writeToLog(logEvent,
        damage,
        currentMonsterHealth,
        currentPlayerHealth);

    endRound();
}
// attack button
function attackHandler(){
    attackMonster(MODE_ATTACK);
}
//Strong Attack button
function strongAttackHandler(){
    attackMonster(MODE_STRONG_ATTACK);
}
//heal the player function
function healPlayerHandler(){
    let healValue;
    if(currentPlayerHealth >= chosenMaxLife - HEAL_VALUE){
        alert("You can't to more than max initial health");
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(HEAL_VALUE);
    currentPlayerHealth += HEAL_VALUE;
    writeToLog(
		LOG_EVENT_PLAYER_HEAL,
		healValue,
		currentMonsterHealth,
		currentPlayerHealth
	);
	endRound();
}
function pirntLogHandler(){
    // For loop method
    // for(let  i = 0; i < 3;i++){
    //     console.log('--------------');
    // }
    // Do while loop method
    // let j = 0
    // outerWhile: do{ //  label  the loop
    //     console.log('outer',j);
    //     innerFor: for(let k = 0; k<5; k++){ // label the loop
    //         if(k === 3){
    //             //break outerWhile;  // call the labaled loop
    //             //continue outerWhile;
    //         }
    //         console.log('inner',k);
    //     }
    //     j++;
    //} while (j<3);
    //While loop Method
    // let j = 0
    // while(j<3){
    //     console.log(j);
    //     j++;
    // }
    // for(let i = 10; i>0;i--){
    //     console.log(i);
    // }
    // for (let i = 0; i <battleLog.length; i++){
    //     console.log(battleLog[i]);
    // }
    // console.log(battleLog);
    /* Looping through the battleLog array and printing out the last entry in the array. */
    let i = 0;
    for (const logEntry of battleLog){
        if(!lastLogEntry && lastLogEntry !==0    || lastLogEntry < i){
            console.log(`#${i}`)
            for(const key in logEntry){
            console.log(`${key} => ${logEntry[key]}`);
            }
            lastLogEntry = i;
            break;
        }
        i++
    }
}
// Event Listeners
healBtn.addEventListener('click', healPlayerHandler)
attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
logBtn.addEventListener('click',pirntLogHandler);