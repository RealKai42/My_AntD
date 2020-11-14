import React from 'react'
import Button, { ButtonSize, ButtonType } from './components/Button/button'
import Alert, { AlertType } from './components/Alert/alert'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button
          autoFocus
          className="custom"
          onClick={(e) => {
            e.preventDefault()
            alert('123')
          }}
        >
          Hello
        </Button>
        <Button disabled>Disabled Button</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          Large Primary
        </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
          Small Danger
        </Button>
        <Button
          btnType={ButtonType.Link}
          href="https://www.baidu.com"
          target="blank"
        >
          Baidu Link
        </Button>
        <Button btnType={ButtonType.Link} href="https://www.baidu.com" disabled>
          Disabled Link
        </Button>

        <Alert
          closable
          title="this is alert!"
          type={AlertType.primary}
          onClose={() => alert('1')}
        />

        <Alert
          closable
          description="this is a long description"
          onClose={function noRefCheck() {}}
          title="提示标题欧亲"
          type={AlertType.success}
        />
      </header>
    </div>
  )
}

export default App
