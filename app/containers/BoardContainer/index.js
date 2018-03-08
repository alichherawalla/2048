/**
*
* BoardContainer
*
*/

import React from 'react'
import Swipeable from 'react-swipeable'
import {
  connect
} from 'react-redux'
import {
  createStructuredSelector
} from 'reselect'
import {
  compose
} from 'redux'
import { fromJS } from 'immutable'
import styled from 'styled-components'
import injectReducer from 'utils/injectReducer'
import { updateBoard } from './actions'
import {
  makeSelectGame
} from './selectors'
import reducer from './reducer'
import BoardElement from '../BoardElement/Loadable'
import HorizontallyAlignedContainer from '../../components/HorizontallyAlignedContainer'
import Colors from '../../colors'
import { left, up, right, down, validMoves, NUMBER_OF_ROWS, NUMBER_OF_COLUMNS, injectNewValueToBoard, isGameOver } from '../../utils/BoardUtils'
const BoardContainerDiv = styled.div`
padding: 4px;
margin-top: 30px;
border: 4px solid ${Colors.BoardContainerBorderColor};
border-radius: 20px;
display: inline-block;
`
const TitleContainer = styled.div`
font-size: 3em;
color:${Colors.TextColor};
text-align: center;
`
const SubHeaderContainer = styled(HorizontallyAlignedContainer)`
text-align: left;
color: ${Colors.TextColor};
font-family: 'Roboto';
font-size: 1em;
padding-right: 8px;
padding: 10px;
`
const HeaderContainer = styled.div`
padding: 10px;
`
const CardContainer = styled.div`
border: 1px solid black;
border-radius: 5px;
background-color: ${Colors.TextColor};
text-align: center;
width: 100px;
display: block;
color: white;
padding: 5px;
font-size: 1.25em;
float: right;
margin-left: 10px;
margin-right: 10px;
`

const ClickableCardContainer = styled(CardContainer)`
cursor: pointer`

export class BoardContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  updateScore = (score, num1, num2) => {
    if (num1 === 0 || num2 === 0) {
      return score
    } else {
      return score + num1 + num2
    }
  }

  startNewGame = () => {
    let game = this.props.game
    game.board = null
    this.props.updateBoard(game)
  }
  printBoard = (board) => {
    let str = ''
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        str = str + board[i][j] + '\t'
      }
      str = str + '\n'
    }
    console.log(str)
  }
  updateBoard = (game, xAxis, row, column, begIndex, endIndex, iterator) => {
    let index = begIndex
    if (xAxis) {
      for (let i = 0; i < 3; i++) {
        begIndex = index
        while (begIndex !== endIndex) {
          if (game.board[row][begIndex] === 0) {
            game.board[row][begIndex] = game.board[row][begIndex + iterator]
            game.board[row][begIndex + iterator] = 0
            game.boardChanged = game.board[row][begIndex] !== 0 || game.boardChanged
          }
          begIndex = begIndex + iterator
        }
      }
      begIndex = index

      while (begIndex !== endIndex) {
        if (game.board[row][begIndex] === game.board[row][begIndex + iterator]) {
          let updatedValue = game.board[row][begIndex] + game.board[row][begIndex + iterator]
          game.score = this.updateScore(game.score, game.board[row][begIndex + iterator], game.board[row][begIndex])
          game.board[row][begIndex] = updatedValue
          game.board[row][begIndex + iterator] = 0
          game.boardChanged = true
        } else if (game.board[row][begIndex] === 0) {
          game.board[row][begIndex] = game.board[row][begIndex + iterator]
          game.board[row][begIndex + iterator] = 0
          game.boardChanged = game.board[row][begIndex] !== 0 || game.boardChanged
        }
        begIndex = begIndex + iterator
      }
    } else {
      for (let i = 0; i < 3; i++) {
        begIndex = index
        while (begIndex !== endIndex) {
          if (game.board[begIndex][column] === 0) {
            game.board[begIndex][column] = game.board[begIndex + iterator][column]
            game.board[begIndex + iterator][column] = 0
            game.boardChanged = game.board[begIndex][column] !== 0 || game.boardChanged
          }
          begIndex = begIndex + iterator
        }
      }
      begIndex = index
      while (begIndex !== endIndex) {
        if (game.board[begIndex][column] === game.board[begIndex + iterator][column]) {
          let updatedValue = game.board[begIndex][column] + game.board[begIndex + iterator][column]
          game.score = this.updateScore(game.score, game.board[begIndex + iterator][column], game.board[begIndex][column])
          game.board[begIndex][column] = updatedValue
          game.board[begIndex + iterator][column] = 0
          game.boardChanged = true
        } else if (game.board[begIndex][column] === 0) {
          game.board[begIndex][column] = game.board[begIndex + iterator][column]
          game.board[begIndex + iterator][column] = 0
          game.boardChanged = game.board[begIndex][column] !== 0 || game.boardChanged
        }
        begIndex = begIndex + iterator
      }
    }
    return game
  }

  addBoardElements = (game, xAxis, iterator, row, column, begIndex, endIndex) => {
    if (xAxis) {
      if (row < NUMBER_OF_ROWS) {
        game = this.updateBoard(game, xAxis, row, column, begIndex, endIndex, iterator)
        return this.addBoardElements(game, xAxis, iterator, row + 1, column, begIndex, endIndex)
      } else {
        return game
      }
    } else {
      if (column < NUMBER_OF_COLUMNS) {
        game = this.updateBoard(game, xAxis, row, column, begIndex, endIndex, iterator)
        return this.addBoardElements(game, xAxis, iterator, row, column + 1, begIndex, endIndex)
      } else {
        return game
      }
    }
  }

  onKeyDownEvent = (event) => {
    let game = Object.assign({}, this.props.game)
    game.boardChanged = false

    if (validMoves.includes(event.keyCode)) {
      switch (event.keyCode) {
        case left:
          game = this.addBoardElements(game, true, 1, 0, 0, 0, NUMBER_OF_COLUMNS - 1)
          break
        case right:
          game = this.addBoardElements(game, true, -1, 0, 3, NUMBER_OF_COLUMNS - 1, 0)
          break
        case up:
          game = this.addBoardElements(game, false, 1, 0, 0, 0, NUMBER_OF_ROWS - 1, 0)
          break
        case down:
          game = this.addBoardElements(game, false, -1, 3, 0, NUMBER_OF_ROWS - 1, 0)
          break
      }
      if (game.score >= this.props.game.best) {
        game.best = game.score
      }
      if (game.boardChanged) {
        game.board = injectNewValueToBoard(game.board)
        this.props.updateBoard(game)
      } else {
        game.board = isGameOver(game.board)
        if (game.board === null) {
          this.props.updateBoard(game)
          setTimeout(window.alert('Game over'), 500)
        }
      }
    }
  }

  componentWillMount = () => {
    document.onkeydown = this.onKeyDownEvent
  }

  render () {
    return (
      <Swipeable
        onSwipingLeft={() => this.onKeyDownEvent({keyCode: left})}
        onSwipingRight={() => this.onKeyDownEvent({keyCode: right})}
        onSwipedUp={() => this.onKeyDownEvent({keyCode: up})}
        onSwipedDown={() => this.onKeyDownEvent({keyCode: down})} >
        <HeaderContainer>
          <CardContainer>
            <b>Score</b><div>{this.props.game.score}</div>
          </CardContainer>
          <CardContainer>
            <b>Best</b><div>{this.props.game.best}</div>
          </CardContainer>
          <TitleContainer>
            2048
          </TitleContainer>
        </HeaderContainer>
        <SubHeaderContainer>
          <div style={{marginRight: '8px'}}>
            <b>Play 2048 Game Online</b>
            <div>Join the numbers and get to the 2048 tile!</div>
          </div>
          <ClickableCardContainer onClick={this.startNewGame}><b>New Game</b></ClickableCardContainer>
        </SubHeaderContainer>
        <BoardContainerDiv onkeydown={this.onKeyDownEvent}>
          {
            this.props.game.board.map((row, rowIndex) => {
              return <HorizontallyAlignedContainer key={rowIndex}>
                {
                  row.map((boardElement, columnIndex) => {
                    return <BoardElement key={columnIndex} value={this.props.game.board[rowIndex][columnIndex]} />
                  })
                }
              </HorizontallyAlignedContainer>
            })
          }
        </BoardContainerDiv>
      </Swipeable>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  game: makeSelectGame()
})

function mapDispatchToProps (dispatch) {
  return {
    updateBoard: game => {
      dispatch(updateBoard(fromJS(game)))
    }
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({
  key: 'boardContainer',
  reducer
})

export default compose(
  withReducer,
  withConnect
)(BoardContainer)
