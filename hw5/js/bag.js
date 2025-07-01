// owen_plesko@student.uml.edu
import { TILE_ATTRIBUTES } from "./tile.js";

const Bag = { letters: [], i: 0 }

// fill bag with letters 
for (const [variant, { count }] of Object.entries(TILE_ATTRIBUTES)) {
  for (let i = 0; i < count; i++) {
    const id = Bag.letters.length
    Bag.letters.push({ id, variant })
  }
}

Bag.next = function() {
  const letter = Bag.letters[Bag.i]
  Bag.i++

  return letter
}

// shuffle letters order and reset index
// source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
Bag.shuffle = function() {
  const array = Bag.letters
  Bag.i = 0

  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

export default Bag
