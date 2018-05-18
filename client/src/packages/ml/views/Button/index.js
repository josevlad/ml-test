import React from 'react'
import style from './style.module.scss'

// console.log(style.green)

const Button = ({ text, onClick }) => <button onClick={onClick} className={style.pink}>{text}</button>

export default Button



