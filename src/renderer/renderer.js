console.log("renderer")

console.log(window.soul)

const webview = document.getElementById('webview')

document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
  const isDarkMode = await window.darkMode.toggle()
  document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

document.getElementById('reset-to-system').addEventListener('click', async () => {
  await window.darkMode.system()
  document.getElementById('theme-source').innerHTML = 'System'
})

function handleKeyPress (event) {
  // You can put code here to handle the keypress.
  document.getElementById("last-keypress").innerText = event.key
  console.log(`You pressed ${event.key}`)
}

window.addEventListener('keyup', handleKeyPress, true)

document.getElementById('openDevtools').addEventListener('click', async () => {
  document.getElementById('webview').openDevTools()
})

document.getElementById('openDevtools').addEventListener('devtools-opened', async (e) => {
  console.warn(111, e)
})

document.getElementById('toggleWebviewMode').addEventListener('click', async (e) => {
  console.warn(toggleWebviewMode, e)
  webview.executeJavaScript(`
  var event = new CustomEvent("soul_web_appModeChange", {
    detail: "dark"
  });
  document.dispatchEvent(event);`)
})


