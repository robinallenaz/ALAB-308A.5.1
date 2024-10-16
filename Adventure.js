import Character from "./Character.js";

export default class Adventurer extends Character {
  static ROLES = ['Fighter', 'Healer', 'Wizard']

  constructor(name, role) {
    super(name);
    // Adventurers have specialized roles.
    if (Adventurer.ROLES.includes(role)) {
      this.role = role;
    } else {
      const randomNum = Math.floor(Math.random() * Adventurer.ROLES.length)
      this.role = Adventurer.ROLES[randomNum]
    }
      // Every adventurer starts with a bed and 50 gold coins.
    this.inventory.push('bedroll', '50 gold coins')
  }

  scout () {
    console.log(`${this.name} is scouting ahead...`);
    this.roll();
  }

  useHealthPotion() {
    if (this.inventory.includes('potion')) {
      if ((this.health + 25) > Character.MAX_HEALTH) {
        this.health = Character.MAX_HEALTH
      }else {
        this.health += 25
      }

      // remove the potion
      this.inventory.splice(this.inventory.indexOf('potion'), 1)
    }
  }

  duel(enemy) {
    let round = 1
    while (this.health > 50 && enemy.health > 50) {
      const thisRoll = this.roll()
      const enemyRoll = enemy.roll()
      if (thisRoll > enemyRoll) {
        enemy.health -= 1;
        console.log(`${this.name} struck!`)
      } else if (thisRoll < enemyRoll) {
        this.health -= 1
        console.log(`${enemy.name} struck!`)
      } else {
        console.log(`
          /////////ROUND ${round}///////////////
                        DRAW
          ///////////////////////////////////////
          `)
          round++
          continue
      }
      console.log(`
        /////////ROUND ${round}///////////////
        ${this.name}'s Health: ${this.health}
        ${enemy.name}'s Health: ${enemy.health}
        ///////////////////////////////////////
        `)
      round++
    }
    const winner = this.health > enemy.health ? this.name : enemy.name
    console.log(`${winner} WINS!!!`)
  }
}