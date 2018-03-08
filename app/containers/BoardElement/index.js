/**
 *
 * Box
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import styled from 'styled-components'
import Colors from '../../colors'

const BoardElementDiv = styled.div`
margin: 2px;
background-color: ${Colors.BoardElementBackgroundColor};
height: 90px;
width: 90px;
color:white;
font-weight:bold;
font-size: 3em;
border-radius: 10px;
text-align: center;
padding-top: 10px;
`

export class Box extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render () {
    return (
      <BoardElementDiv>
        <center>{this.props.value === 0 ? '' : this.props.value}</center>
      </BoardElementDiv>
    )
  }
}

Box.propTypes = {
  dispatch: PropTypes.func.isRequired,
  value: PropTypes.number
}

const mapStateToProps = createStructuredSelector({
})

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect
)(Box)
