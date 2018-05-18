import React from 'react'
import { store } from '../../../../store'
import { push } from 'react-router-redux'

export default class MainMenu extends React.Component {

  handleClick = (route, options) => {
    let opt = options || {}
    let str = Object.entries(opt).map(([key, val]) => `${key}=${val}`).join('&');
    store.dispatch(push(route+'?'+str))
  }

  render() {
    return (
      <div id="MainMenu">
        <div>
          <a onClick={() => this.handleClick("/")}>Search vacío</a>
          <br/>
          <a onClick={() => this.handleClick("/items", {search:'harry potter libro'})}>Search</a>
          <br/>
          <a onClick={() => this.handleClick("/items/99")}>Detail</a>
        </div>
      </div>
    );
  }
}
