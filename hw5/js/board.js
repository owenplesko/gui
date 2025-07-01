// owen_plesko@student.uml.edu
import { newSquare, SQUARE_ATTRIBUTES } from "./square.js";
import { newTile, TILE_ATTRIBUTES } from "./tile.js";

const DEFAULT_LAYOUT = [
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

const Board = { layout: DEFAULT_LAYOUT, currentPlay: null }

// compute rows & cols
Board.rows = Board.layout.length;
Board.cols = Board.layout[0]?.length || 0

// init empty tiles matrix
Board.tiles = Array.from({ length: Board.rows }, () => Array(Board.cols).fill(null));

Board.validatePlacement = function({ row, col }) {
  // cannot play tiles on top of each other 
  if (this.tiles[row][col] !== null) {
    console.log("cannot overlap tiles")
    return false
  }

  // if there is a root: must match either row or col of root depending on axis 
  if (this.currentPlay !== null &&
    // if axis is null must match either row or col
    !(this.currentPlay.axis === null && (this.currentPlay.root.row === row || this.currentPlay.root.col === col)) &&
    // if axis is y must match row
    !(this.currentPlay.axis === 'x' && this.currentPlay.root.row === row) &&
    // if axis is x must match col
    !(this.currentPlay.axis === 'y' && this.currentPlay.root.col === col)) {
    console.log("must match axis")
    return false
  }

  // if there is a root: must have a path between root and placement 
  if (this.currentPlay?.root) {
    // line on y axis
    if (this.currentPlay.root.col === col) {
      const [start, end] = this.currentPlay.root.row < row ? [this.currentPlay.root.row, row] : [row, this.currentPlay.root.row]
      for (let row = start + 1; row < end; row++) {
        if (this.tiles[row][col] === null) {
          console.log("must have no gaps")
          return false
        }
      }
    }
    // line on x axis
    if (this.currentPlay.root.row === row) {
      const [start, end] = this.currentPlay.root.col < col ? [this.currentPlay.root.col, col] : [col, this.currentPlay.root.col]
      for (let col = start + 1; col < end; col++) {
        if (this.tiles[row][col] === null) {
          console.log("must have no gaps")
          return false
        }
      }
    }
  }

  return true
}

Board.placeTile = function({ variant, row, col }) {
  this.tiles[row][col] = variant

  // if currentPlay is non null and axis is null, set axis
  if (this.currentPlay !== null && this.currentPlay.axis === null) {
    if (this.currentPlay.root.row === row)
      this.currentPlay.axis = 'x'
    else
      this.currentPlay.axis = 'y'
  }

  // if currentPlay is null placed tile becomes root
  if (this.currentPlay === null)
    this.currentPlay = { root: { row, col }, axis: null }
}

Board.updateScore = function() {
  if (this.currentPlay.axis === null)
    return

  let wordMult = 1
  let score = 0

  let rowOffset = 0
  let colOffset = 0

  if (this.currentPlay.axis === 'y')
    rowOffset = 1

  if (this.currentPlay.axis === 'x')
    colOffset = 1

  // position at the start of word
  let col = this.currentPlay.root.col
  let row = this.currentPlay.root.row
  while (Board.tiles[row - rowOffset]?.[col - colOffset]) {
    row -= rowOffset
    col -= colOffset
  }

  // iterate over word
  while (Board.tiles[row]?.[col]) {
    const tile = Board.tiles[row][col]
    const square = Board.layout[row][col]

    const letterMult = SQUARE_ATTRIBUTES[square].letterMult ?? 1
    wordMult *= SQUARE_ATTRIBUTES[square].wordMult ?? 1

    const points = TILE_ATTRIBUTES[tile].points * letterMult
    score += points

    row += rowOffset
    col += colOffset
  }

  // get final score
  score *= wordMult

  // update score
  $('#score').text(`Score: ${score}`)
}

// renders square elements based on layout
Board.renderSquares = function() {
  const $board = $('#board')

  $('#board .square').remove()

  for (let row = 0; row < this.rows; row++) {
    for (let col = 0; col < this.cols; col++) {
      const variant = this.layout[row][col]
      const $square = newSquare({ board: this, variant, row, col })

      // apply row and grid class to place on board
      $square.css({
        gridRow: row + 1,
        gridColumn: col + 1
      })

      $board.append($square)
    }
  }
}

Board.renderTiles = function() {
  const $board = $('#board')

  $('#board .tile').remove()

  for (let row = 0; row < this.rows; row++) {
    for (let col = 0; col < this.cols; col++) {
      const variant = this.tiles[row][col]
      if (variant === null) continue

      const $tile = newTile(variant)

      // apply row and grid class to place on board
      $tile.css({
        gridRow: row + 1,
        gridColumn: col + 1
      })

      $board.append($tile)
    }
  }
}

export default Board
