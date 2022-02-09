const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld('fontTiny', {
  upload: (path, name) => {
    ipcRenderer.invoke('font-tiny-upload', path, name)
  },
  compress: (args) => {
    ipcRenderer.invoke('font-tiny-compress', args)
  }
})