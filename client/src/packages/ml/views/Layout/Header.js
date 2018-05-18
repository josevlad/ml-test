import React from "react"

import style from './style.module.scss'

const Header = ({ children }) => (
  <header className={style.Header}>
  {children}
  </header>
)

export default Header