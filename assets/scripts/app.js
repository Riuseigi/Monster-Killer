
/* A constant variable that is used to set the value of the attack, strong attack, monster attack and
heal. */
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE =14;
const HEAL_VALUE = 20;
const MODE_ATTACK = 'ATTACK'
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'

const enteredValue = prompt('Maximum life for you and the monster.', '100')
let chosenMaxLife = parseInt(enteredValue);
if (isNaN(chosenMaxLife) || chosenMaxLife<=0){
    chosenMaxLife = 100;
}
currentMonsterHealth = chosenMaxLife;
currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife); 
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
    //Bonus life feature
    if(currentPlayerHealth <= 0 && hasBonusLife){
        hasBonusLife =false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('You would be dead but the bonus life saved you')
    }
    //event alerts
    if(currentMonsterHealth <= 0 && currentPlayerHealth > 0){
        alert('You Won')
    } else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0){
        alert('You lost hahahhahaha!');
    } else if(currentPlayerHealth <= 0 && currentMonsterHealth <=0){
        alert('You have a draw')
    }
    if (currentMonsterHealth <= 0 || currentMonsterHealth<=0){
            reset();
        }
}
// gets the attack mode function
function attackMonster(mode){
    let maxDamnage;
    if(mode === MODE_ATTACK){
        maxDamnage = ATTACK_VALUE;
    } else if(mode === MODE_STRONG_ATTACK){
        maxDamnage = STRONG_ATTACK_VALUE;
    }
    const damage = dealMonsterDamage(maxDamnage);
    currentMonsterHealth -= damage;
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
    endRound()
}

// Event Listeners
healBtn.addEventListener('click', healPlayerHandler)
attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler)