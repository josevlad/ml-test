import React from "react"
import MainMenu from "./MainMenu"
import {ThemeProvider} from 'styled-components'

import './Main.scss'


const theme = {
  
  flexboxgrid: {
    // Defaults
    gridSize: 12, // rem
    gutterWidth: 1, // rem
    outerMargin: 2, // rem
    mediaQuery: 'only screen',
    container: {
      sm: 46, // rem
      md: 61, // rem
      lg: 76  // rem
    },
    breakpoints: {
      xs: 0,  // em
      sm: 48, // em
      md: 64, // em
      lg: 75  // em
    }
  }
  
}


export default class Main extends React.Component {

  main_menu(){
    return this.props.showMenu ? (<MainMenu {...this.props} />) : null;
  }

  render() {
   return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
          {this.main_menu()}
          {this.props.children}
      </React.Fragment>
    </ThemeProvider>
    );

  }
}
