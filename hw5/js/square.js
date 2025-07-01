// owen_plesko@student.uml.edu
import Board from "./board.js"

export const SQUARE_ATTRIBUTES = {
  "NORMAL": {
    text: null,
    className: null
  },
  "DL": {
    text: "Double Letter Score",
    className: "double-letter",
    letterMult: 2
  },
  "TL": {
    text: "Triple Letter Score",
    className: "triple-letter",
    letterMult: 3
  },
  "DW": {
    text: "Double Word Score",
    className: "double-word",
    wordMult: 2
  },
  "TW": {
    text: "Triple Word Score",
    className: "triple-word",
    wordMult: 3
  },
  "CENTER": {
    text: "Center",
    className: "double-word"
  }
}

export function newSquare({ board, variant, row, col }) {
  const { className, text } = SQUARE_ATTRIBUTES[variant]

  const $square = $('<div>', { class: 'square' }).disableSelection()

  if (className) {
    $square.addClass(className)
  }

  if (text) {
    const $span = $('<span>').text(text)
    $square.append($span)
  }

  // apply jquery properties
  $square.droppable({
    hoverClass: 'draggable-hover',
    drop: function(_, { draggable: $tile }) {
      const { variant } = $tile.data()

      const ok = Board.validatePlacement({ row, col })
      if (!ok) return

      Board.placeTile({ variant, row, col })

      $tile.remove()
      board.renderTiles()
      board.updateScore()
    }
  })

  return $square
}
