import React, { Component } from 'react'
// import { Home, About, Topics } from './views'
import { Route, Switch } from 'react-router-dom'

import { SearchPage } from './views/SearchPage'
import { DetailPage } from './views/DetailPage'

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={SearchPage} />
          <Route path="/items/:id" component={DetailPage} />
          <Route path="/items" component={SearchPage} />
        </Switch>
      </React.Fragment>
    )
  }
}

export default App
