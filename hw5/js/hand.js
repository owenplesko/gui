// owen_plesko@student.uml.edu
import Bag from "./bag.js"
import { newTile } from "./tile.js"

const Hand = {
  letters: [],
  handSize: 7
}

Hand.refill = function() {
  const refillCount = this.handSize - this.letters.length

  for (let i = 0; i < refillCount; i++) {
    this.letters.push(Bag.next())
  }
}

Hand.render = function() {
  const $hand = $('#hand')

  for (const { variant } of this.letters) {
    const $tile = newTile(variant)
    $hand.append($tile)
  }
}

export default Hand
