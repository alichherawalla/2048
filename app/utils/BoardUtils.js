export const NUMBER_OF_ROWS = 4
export const NUMBER_OF_COLUMNS = 4
export const left = 37
export const up = 38
export const right = 39
export const down = 40

export const validMoves = [up, left, down, right]
export function isGameOver (board) {
  for (let i = 0; i < NUMBER_OF_ROWS; i++) {
    for (let j = 0; j < NUMBER_OF_COLUMNS - 1; j++) {
      if (board[i][j] === board[i][j + 1] || board[j][i] === 0 || board[j + 1][i] === 0) {
        return board
      }
    }
  }
  for (let i = 0; i < NUMBER_OF_COLUMNS; i++) {
    for (let j = 0; j < NUMBER_OF_ROWS - 1; j++) {
      if (board[j][i] === board[j + 1][i] || board[j][i] === 0 || board[j + 1][i] === 0) {
        return board
      }
    }
  }
  return null
}

export function injectNewValueToBoard (board) {
  let indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  while (indexes.length > 0) {
    let index = Math.floor(Math.random() * 16)
    const row = parseInt(index / 4)
    const column = index % 4
    if (board[row][column] === 0) {
      if (Math.random() >= 0.5) {
        board[row][column] = 2
      } else {
        board[row][column] = 4
      }
      return board
    } else {
      indexes = indexes.filter((i) => i !== index)
    }
  }
  return null
}
