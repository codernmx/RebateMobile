import Vue from 'vue'
import Clipboard from 'clipboard'

function clipboardSuccess () {
  Vue.prototype.$message({
    message: '复制成功，请打开淘宝',
    type: 'success',
    center: true,
    duration: 1500
  })
}

function clipboardError () {
  Vue.prototype.$message({
    message: 'Copy failed',
    type: 'error'
  })
}

export default function handleClipboard (text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
