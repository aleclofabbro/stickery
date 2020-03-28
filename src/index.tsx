import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import { useStickeryServices } from 'srv'
import { MainTpl } from 'ui/templates/Main'
import { useMainProps } from 'ui/templates/Main/useMainProps'
import './index.css'
// import { defineCustomElements } from '@ionic/pwa-elements/loader'
// import * as serviceWorker from './serviceWorker'

const Main: FC = () => {
  const srvcs = useStickeryServices()
  const mainTpl = useMainProps(srvcs)
  return <MainTpl {...mainTpl} />
}

ReactDOM.render(<Main />, document.getElementById('root'))

// defineCustomElements(window)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
//serviceWorker.register()
navigator.serviceWorker.register('sw.js')
