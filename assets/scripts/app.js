// Global Varia
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE =14;
const HEAL_VALUE = 20;
let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
adjustHealthBars(chosenMaxLife);
function endRound(){
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    if(currentPlayerHealth <= 0 && hasBonusLife){
        hasBonusLife =false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('You would be dead but the bonus life saved you')
    }
    if(currentMonsterHealth <= 0 && currentPlayerHealth > 0){
        alert('You Won')
    } else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0){
        alert('You lost hahahhahaha!');
    } else if(currentPlayerHealth <= 0 && currentMonsterHealth <=0){
        alert('You have a draw')
    }
}
function attackMonster(mode){
    let maxDamnage;
    if(mode === 'ATTACK'){
        maxDamnage = ATTACK_VALUE;
    } else if(mode === 'STRONG_ATTACK'){
        maxDamnage = STRONG_ATTACK_VALUE;
    }
    const damage = dealMonsterDamage(maxDamnage);
    currentMonsterHealth -= damage;
    endRound();
}
function attackHandler(){
    attackMonster('ATTACK');
}
function strongAttackHandler(){
    attackMonster('STRONG_ATTACK');
}
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
healBtn.addEventListener('click', healPlayerHandler)
attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler)