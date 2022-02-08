const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld('fontTiny', {
  upload: (file) => {
    ipcRenderer.invoke('font-tiny-upload', file.path)
  },
  compress: (args) => {
    ipcRenderer.invoke('font-tiny', args)
  }
})