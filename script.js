// Game logic will be added here later.

const yangKun = {
    health: 100,
    attackPower: 5,
    gold: 0,
    experience: 0
};

let attackUpgradeCost = 10;
let attackPowerIncrease = 1;

function updateStatsDisplay() {
    document.getElementById('gold-stat').textContent = yangKun.gold;
    document.getElementById('experience-stat').textContent = yangKun.experience;
    document.getElementById('health-stat').textContent = yangKun.health;
    document.getElementById('attack-power-stat').textContent = yangKun.attackPower;

    const upgradeAttackBtn = document.getElementById('upgrade-attack-btn');
    upgradeAttackBtn.textContent = `Upgrade Attack (Cost: ${attackUpgradeCost} Gold)`;
    if (yangKun.gold >= attackUpgradeCost) {
        upgradeAttackBtn.disabled = false;
    } else {
        upgradeAttackBtn.disabled = true;
    }
}

// Initial display of stats
updateStatsDisplay();
// Update Lian Qinhe's bonus info on initial load
const lianQinheInfoEl = document.getElementById('lian-qinhe-bonus-info');
const lianQinheGoldBonusPercentage = 0.10; // Lian Qinhe is active by default
if (lianQinheInfoEl) {
    lianQinheInfoEl.textContent = `被动: 所有金币获取量 + ${lianQinheGoldBonusPercentage * 100}%`;
}


const goldPerInterval = 1;

function gameTick() {
    let goldThisTick = goldPerInterval;
    goldThisTick += Math.floor(goldPerInterval * lianQinheGoldBonusPercentage); // Apply bonus
    yangKun.gold += goldThisTick;
    updateStatsDisplay();
}

setInterval(gameTick, 2000); // Generate gold every 2 seconds

function upgradeAttack() {
    if (yangKun.gold >= attackUpgradeCost) {
        yangKun.gold -= attackUpgradeCost;
        yangKun.attackPower += attackPowerIncrease;
        attackUpgradeCost = Math.floor(attackUpgradeCost * 1.15);
        updateStatsDisplay(); // This will also update button text and disabled state
    } else {
        console.log("Not enough gold to upgrade attack.");
    }
}

const upgradeAttackBtn = document.getElementById('upgrade-attack-btn');
upgradeAttackBtn.addEventListener('click', upgradeAttack);
