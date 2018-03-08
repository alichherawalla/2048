import { createSelector } from 'reselect'

/**
 * Direct selector to the box state domain
 */
const selectBoxDomain = (state) => state.get('box')

/**
 * Other specific selectors
 */

/**
 * Default selector used by Box
 */

const makeSelectBox = () => createSelector(
  selectBoxDomain,
  (substate) => substate.toJS()
)

export default makeSelectBox
export {
  selectBoxDomain
}
