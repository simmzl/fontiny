const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld('fontTiny', {
  upload: (path, name) => {
    ipcRenderer.invoke('font-tiny-upload', path, name)
  },
  compress: (args) => {
    ipcRenderer.invoke('font-tiny-compress', args)
  }
})

window.addEventListener('DOMContentLoaded', () => {
  initTopDrag();
});

function initTopDrag() {
  const topDiv = document.createElement('div');
  topDiv.style.position = 'fixed';
  topDiv.style.top = '0';
  topDiv.style.left = '0';
  topDiv.style.height = '40px';
  topDiv.style.width = '100%';
  topDiv.style.zIndex = '9999';
  topDiv.style.pointerEvents = 'none';
  topDiv.style['-webkit-user-select'] = 'none';
  topDiv.style['-webkit-app-region'] = 'drag';
  document.body.appendChild(topDiv);
}