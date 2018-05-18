import React from "react"

import style from './style.module.scss'

const Container = ({ children }) => (
  <div className={style.Container}>
  {children}
  </div>
)

export default Container