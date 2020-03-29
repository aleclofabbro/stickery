import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import { useCreateStickeryServices, ProvideStickeryServices } from 'srv'
import { MainTpl } from 'ui/templates/Main'
import './index.css'
import { ProvideMiddleware } from 'lib/Actions/provideDispatcher'
// import { defineCustomElements } from '@ionic/pwa-elements/loader'
// import * as serviceWorker from './serviceWorker'

const Main: FC = () => {
  const srvcs = useCreateStickeryServices()

  return (
    <ProvideMiddleware mw={srvcs.mw}>
      <ProvideStickeryServices srvcs={srvcs}>
        <MainTpl />
      </ProvideStickeryServices>
    </ProvideMiddleware>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'))

// defineCustomElements(window)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
//serviceWorker.register()
navigator.serviceWorker.register('sw.js')
