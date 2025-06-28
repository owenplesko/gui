
const board = {
  squares: [
    ["TW", "NORMAL", "NORMAL", "DL", "NORMAL", "NORMAL", "NORMAL", "TW", "NORMAL", "NORMAL", "NORMAL", "DL", "NORMAL", "NORMAL", "TW"],
    ["NORMAL", "DW", "NORMAL", "NORMAL", "NORMAL", "TL", "NORMAL", "NORMAL", "NORMAL", "TL", "NORMAL", "NORMAL", "NORMAL", "DW", "NORMAL"],
    ["NORMAL", "NORMAL", "DW", "NORMAL", "NORMAL", "NORMAL", "DL", "NORMAL", "DL", "NORMAL", "NORMAL", "NORMAL", "DW", "NORMAL", "NORMAL"],
    ["DL", "NORMAL", "NORMAL", "DW", "NORMAL", "NORMAL", "NORMAL", "DL", "NORMAL", "NORMAL", "NORMAL", "DW", "NORMAL", "NORMAL", "DL"],
    ["NORMAL", "NORMAL", "NORMAL", "NORMAL", "DW", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "DW", "NORMAL", "NORMAL", "NORMAL", "NORMAL"],
    ["NORMAL", "TL", "NORMAL", "NORMAL", "NORMAL", "TL", "NORMAL", "NORMAL", "NORMAL", "TL", "NORMAL", "NORMAL", "NORMAL", "TL", "NORMAL"],
    ["NORMAL", "NORMAL", "DL", "NORMAL", "NORMAL", "NORMAL", "DL", "NORMAL", "DL", "NORMAL", "NORMAL", "NORMAL", "DL", "NORMAL", "NORMAL"],
    ["TW", "NORMAL", "NORMAL", "DL", "NORMAL", "NORMAL", "NORMAL", "CENTER", "NORMAL", "NORMAL", "NORMAL", "DL", "NORMAL", "NORMAL", "TW"],
    ["NORMAL", "NORMAL", "DL", "NORMAL", "NORMAL", "NORMAL", "DL", "NORMAL", "DL", "NORMAL", "NORMAL", "NORMAL", "DL", "NORMAL", "NORMAL"],
    ["NORMAL", "TL", "NORMAL", "NORMAL", "NORMAL", "TL", "NORMAL", "NORMAL", "NORMAL", "TL", "NORMAL", "NORMAL", "NORMAL", "TL", "NORMAL"],
    ["NORMAL", "NORMAL", "NORMAL", "NORMAL", "DW", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "NORMAL", "DW", "NORMAL", "NORMAL", "NORMAL", "NORMAL"],
    ["DL", "NORMAL", "NORMAL", "DW", "NORMAL", "NORMAL", "NORMAL", "DL", "NORMAL", "NORMAL", "NORMAL", "DW", "NORMAL", "NORMAL", "DL"],
    ["NORMAL", "NORMAL", "DW", "NORMAL", "NORMAL", "NORMAL", "DL", "NORMAL", "DL", "NORMAL", "NORMAL", "NORMAL", "DW", "NORMAL", "NORMAL"],
    ["NORMAL", "DW", "NORMAL", "NORMAL", "NORMAL", "TL", "NORMAL", "NORMAL", "NORMAL", "TL", "NORMAL", "NORMAL", "NORMAL", "DW", "NORMAL"],
    ["TW", "NORMAL", "NORMAL", "DL", "NORMAL", "NORMAL", "NORMAL", "TW", "NORMAL", "NORMAL", "NORMAL", "DL", "NORMAL", "NORMAL", "TW"],
  ]
};

board.render = function() {
  const $board = $('#board')

  $board.empty()

  for (const row of this.squares) {
    for (const variant of row) {
      const $square = newSquare(variant)
      $board.append($square)
    }
  }
}

const hand = { letters: ["A", "B", "C", "D", "E", "F", "G"] }

hand.render = function() {
  const $hand = $('#hand')

  $hand.empty()

  for (const letter of this.letters) {
    const $tile = newTile(letter)
    $hand.append($tile)
  }
}

const squareAttributes = {
  "NORMAL": {
    text: null,
    className: null
  },
  "DL": {
    text: "Double Letter Score",
    className: "double-letter"
  },
  "TL": {
    text: "Triple Letter Score",
    className: "triple-letter"
  },
  "DW": {
    text: "Double Word Score",
    className: "double-word"
  },
  "TW": {
    text: "Triple Word Score",
    className: "triple-word"
  },
  "CENTER": {
    text: "Center",
    className: "double-word"
  }
}

function newSquare(variant) {
  const { className, text } = squareAttributes[variant]

  const $square = $('<div>', { class: 'square noselect' })

  if (className) {
    $square.addClass(className)
  }

  if (text) {
    const $span = $('<span>').text(text)
    $square.append($span)
  }

  return $square
}

const tileAttributes = {
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

function newTile(letter) {
  const { points } = tileAttributes[letter]

  const $tile = $('<div>', { class: 'tile noselect' })

  const $letter = $('<span>', { class: 'letter' }).text(letter)
  $tile.append($letter)

  const $score = $('<span>', { class: 'points' }).text(points)
  $tile.append($score)

  return $tile
}

board.render()
hand.render()

