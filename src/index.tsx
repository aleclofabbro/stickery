import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import { defineCustomElements } from '@ionic/pwa-elements/loader'
import { MainTpl } from './ui/templates/Main'
// import * as serviceWorker from './serviceWorker'

const mainProps: MainTpl = {
  TopBar: <div>Top Bar</div>,
  Canvas: <canvas>canvas</canvas>
}

ReactDOM.render(<MainTpl {...mainProps}></MainTpl>, document.getElementById('root'))

// defineCustomElements(window)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
//serviceWorker.register()
navigator.serviceWorker.register('sw.js')
