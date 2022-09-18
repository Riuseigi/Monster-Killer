const attackValue = 10;
let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
adjustHealthBars(chosenMaxLife);
function attackHandler(){
    const damage = dealMonsterDamage(attackValue);
    currentMonsterHealth -= damage;
}

attackBtn.addEventListener('click',attackHandler);