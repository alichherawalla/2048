
import { fromJS } from 'immutable'
import boxReducer from '../reducer'

describe('boxReducer', () => {
  it('returns the initial state', () => {
    expect(boxReducer(undefined, {})).toEqual(fromJS({}))
  })
})
