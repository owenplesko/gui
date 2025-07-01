// owen_plesko@student.uml.edu
export const TILE_ATTRIBUTES = {
  A: { points: 1, count: 9 },
  B: { points: 3, count: 2 },
  C: { points: 3, count: 2 },
  D: { points: 2, count: 4 },
  E: { points: 1, count: 12 },
  F: { points: 4, count: 2 },
  G: { points: 2, count: 3 },
  H: { points: 4, count: 2 },
  I: { points: 1, count: 9 },
  J: { points: 8, count: 1 },
  K: { points: 5, count: 1 },
  L: { points: 1, count: 4 },
  M: { points: 3, count: 2 },
  N: { points: 1, count: 6 },
  O: { points: 1, count: 8 },
  P: { points: 3, count: 2 },
  Q: { points: 10, count: 1 },
  R: { points: 1, count: 6 },
  S: { points: 1, count: 4 },
  T: { points: 1, count: 6 },
  U: { points: 1, count: 4 },
  V: { points: 4, count: 2 },
  W: { points: 4, count: 2 },
  X: { points: 8, count: 1 },
  Y: { points: 4, count: 2 },
  Z: { points: 10, count: 1 },
};

export function newTile(letter) {
  const { points } = TILE_ATTRIBUTES[letter]

  const $tile = $('<div>', { class: 'tile' }).data({ variant: letter }).disableSelection().draggable({ revert: true })

  const $letter = $('<span>', { class: 'letter' }).text(letter)
  $tile.append($letter)

  const $score = $('<span>', { class: 'points' }).text(points)
  $tile.append($score)

  return $tile
}

