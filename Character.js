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
  1:16
  classes/Companion.js:
  import Character from "./Character.js"
  
  export default class Companion extends Character {
    constructor(name, type) {
      super(name)
      this.type = type
      this.inventory.push('potion', 'KitKat bar')
    }
  
    attach(adventurer) {
      adventurer.companion = this
    }
  
    // leo.lendAHand('potion', robin)
    lendAHand(item, character) {
      const foundItemIndex = this.inventory.indexOf(item)
      if (foundItemIndex >= 0) {
        character.inventory.push(item);
        this.inventory.splice(foundItemIndex, 1)
        console.log(`${this.name} lended ${character.name} a ${item}`)
      } else {
        console.log(`${this.name} does not have ${item} in their inventory`)
      }
    }
  
    async sayInspirationalQuote() {
      const response = await fetch('https://api.realinspire.tech/v1/quotes/random')
      const data = await response.json()
      console.log(`${this.name} says: ${data[0].content}`)
    }
  }
  
  
  
  
  
  
  