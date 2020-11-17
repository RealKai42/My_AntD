import React from 'react'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Transition from './components/Transition/transition'
import Button from './components/Button/button'

import Icon from './components/Icon/icon'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
library.add(fas)

const App: React.FC = () => {
  const [show, setShow] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <Menu
          defaultIndex={'0'}
          // mode={'vertical'}
          defaultOpenSubMenus={['2']}
          onSelect={(index) => {
            alert(index)
          }}
        >
          <MenuItem>cool link</MenuItem>
          <MenuItem disabled>cool link2</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
            <MenuItem>dropdown 3</MenuItem>
          </SubMenu>
          <MenuItem>cool link3</MenuItem>
        </Menu>
        <Button
          size="lg"
          onClick={() => {
            setShow(!show)
          }}
        >
          Toggle
        </Button>
        <Transition in={show} timeout={300} animation="zoom-in-left">
          <div>
            <p>test test test test test test test test test test test test </p>
            <p>test test test test test test test test test test test test </p>
            <p>test test test test test test test test test test test test </p>
          </div>
        </Transition>

        <Transition in={show} timeout={300} animation="zoom-in-left" wrapper>
          <Button btnType="primary" size="lg">
            A Large Button
          </Button>
        </Transition>
      </header>
    </div>
  )
}

export default App
