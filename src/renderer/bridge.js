const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('AEJSBridge', {
  dispatch(options) {
  },
  addEventListener(params) {
  },
  removeEventListener(params) {
  },
  dispatchSync(options) {
  }
})

contextBridge.exposeInMainWorld('WebViewJavascriptBridge', {})
