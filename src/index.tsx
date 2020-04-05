import { MainCtrl } from 'ui/templates/Main/MainCtrl'
import { ProvideMiddleware } from 'lib/Actions/provideDispatcher'
import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import { ProvideStickeryServices, useCreateStickeryServices } from 'srv'
import './index.css'
// import { defineCustomElements } from '@ionic/pwa-elements/loader'
// import * as serviceWorker from './serviceWorker'

const Main: FC = () => {
  const srvcs = useCreateStickeryServices()

  return (
    <ProvideMiddleware mw={srvcs.mw}>
      <ProvideStickeryServices srvcs={srvcs}>
        <MainCtrl />
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
