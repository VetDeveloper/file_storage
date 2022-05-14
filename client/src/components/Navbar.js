import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

export const Navbar = () => {
  const history = useNavigate();
  const logout = useSelector( state => state.logout)

  const logoutHandler = event => {
    event.preventDefault()
    logout()
    history('/')
  }

  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
        <span className="brand-logo">File storage</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/create">Создать</NavLink></li>
          <li><NavLink to="/files">Ссылки</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
        </ul>
      </div>
    </nav>
  )
}