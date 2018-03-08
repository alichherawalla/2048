/**
*
* App
*
* This component is the skeleton around the actual pages, and should only
* contain code that should be seen on all pages. (e.g. navigation bar)
*/

import React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import NotFoundPage from 'containers/NotFoundPage/Loadable'
import Board from 'containers/BoardContainer/Loadable'
import CenteredSection from './CenteredSection'

const AppWrapper = styled.div`
max-width: calc(600px);
width: 100vw;
margin: 0 auto;
display: flex;
min-height: 100%;
flex-direction: column;
padding: 10px
`

export default function App () {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate='2048 Game'
        defaultTitle='2048 Game'>
        <meta name='description' content='Play 2048 online' />
      </Helmet>
      <CenteredSection>
        <Switch>
          <Route exact path='/' component={Board} />
          <Route path='' component={NotFoundPage} />
        </Switch>
      </CenteredSection>
    </AppWrapper>
  )
}
