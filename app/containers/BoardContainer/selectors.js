import { createSelector } from 'reselect'
/**
 * Direct selector to the boardContainer state domain
 */
const selectBoardContainerDomain = (state) => state.get('boardContainer').toJS()

/**
 * Other specific selectors
 */

/**
 * Default selector used by BoardContainer
 */

const makeSelectBoard = () => createSelector(
  selectBoardContainerDomain,
  (boardState) => boardState.board
)

const makeSelectScore = () => createSelector(
  selectBoardContainerDomain,
  (boardState) => boardState.score
)

const makeSelectGame = () => createSelector(
  selectBoardContainerDomain,
  (boardState) => boardState
)

export {
  makeSelectBoard,
  makeSelectScore,
  makeSelectGame
}
