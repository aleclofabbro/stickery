import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './hoc/App'
import { GlobCtx } from './ctx/globs'
// import { defineCustomElements } from '@ionic/pwa-elements/loader'
// import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <GlobCtx>
    <App />
  </GlobCtx>,
  document.getElementById('root')
)

// defineCustomElements(window)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
//serviceWorker.register()
navigator.serviceWorker.register('sw.js')
