
import { fromJS } from 'immutable'
import boardContainerReducer from '../reducer'

describe('boardContainerReducer', () => {
  it('returns the initial state', () => {
    expect(boardContainerReducer(undefined, {})).toEqual(fromJS({}))
  })
})
