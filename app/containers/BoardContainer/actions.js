/*
 *
 * BoardContainer actions
 *
 */

import {
  UPDATE_BOARD,
  CHECK_IF_GAME_OVER
} from './constants'
export function updateBoard (game) {
  return {
    type: UPDATE_BOARD,
    game: game
  }
}

export function checkIfGameOver (game) {
  return {
    type: CHECK_IF_GAME_OVER,
    game: game
  }
}
