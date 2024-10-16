import Adventurer from "./classes/Adventurer.js"
import Companion from "./classes/Companion.js"
import AdventurerFactory from "./classes/AdventurerFactory.js"


const robin = new Adventurer('Robin', 'Wizard')
robin.loot("sword", "potion", "potion", "artifact")
robin.health = 50
robin.useHealthPotion()
robin.useHealthPotion()

const leo = new Companion('Leo', 'Cat')
leo.attach(robin)
leo.lendAHand('KitKat bar', robin)
// leo.sayInspirationalQuote()

const frank = new Companion('Frank', 'Flea')
frank.attach(leo)
// frank.sayInspirationalQuote()
frank.lendAHand('potion', leo)

const healerFactory = new AdventurerFactory("Wizard")

const gandalf = healerFactory.generate('Gandalf')
const radagastTheBrown = healerFactory.generate('Radagast')


gandalf.duel(radagastTheBrown)
1:15
classes/Adventurer.js:
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
1:16
classes/AdventurerFactory.js:
import Adventurer from "./Adventurer.js";

export default class AdventurerFactory {  
  constructor (role) {
    this.role = role;
    this.adventurers = [];
  }
  generate (name) {
    const newAdventurer = new Adventurer(name, this.role);
    this.adventurers.push(newAdventurer);
    return newAdventurer
  }
  findByIndex (index) {
    return this.adventurers[index];
  }
  findByName (name) {
    return this.adventurers.find((a) => a.name === name);
  }
}
1:16
classes/Character.js:
export default class Character {
  static MAX_HEALTH = 100;

  constructor(name) {
    this.name = name;
    this.health = 100;
    this.inventory = [];
    this.companion = null;
  }


  roll (mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}.`)
    return result
  }

  loot(...items) {
    const roll = this.roll()
    if (roll > 5) {
      console.log(`${this.name} looting area for items...
        found ${items}`)
      
        this.inventory.push(...items)
    } else {
      console.log(`${this.name} was unlucky and found nothing :(`)
    }
  }
}