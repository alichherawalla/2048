/*
 *
 * BoardContainer reducer
 *
 */

import { fromJS } from 'immutable'
import {
  UPDATE_BOARD
} from './constants'
import { injectNewValueToBoard } from '../../utils/BoardUtils'
const initialState = fromJS({
  board: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
  score: 0,
  best: 0
})

function injectToEmptyBoard (board) {
  board = injectNewValueToBoard(board)
  return injectNewValueToBoard(board)
}

function boardContainerReducer (state = initialState, action) {
  if (initialState === state) {
    state = state.set('board', injectToEmptyBoard(initialState.toJS().board))
  }
  switch (action.type) {
    case UPDATE_BOARD:
      if (action.game.get('board') === null) {
        action.game = action.game.set('board', injectToEmptyBoard(initialState.toJS().board))
        action.game = action.game.set('score', 0)
      }
      return action.game
    default:
      return state
  }
}

export default boardContainerReducer
