var gCanvas
var gCtx

function initEditor() {
  gCanvas = document.querySelector('canvas')
  gCtx = gCanvas.getContext('2d')
  renderEditor()
}

function renderEditor() {
  const meme = getMemeForDisplay()

  if (!meme.imgUrl) {
    renderDefaultMsg()
    return
  }

  const { imgUrl, lines } = meme
  const img = new Image()
  img.src = imgUrl
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    renderLines(lines)
  }
}

function renderLines(lines) {
  lines.forEach(({ fillColor, size, txt, strokeColor, align, font }) => {
    // console.log('lines:', txt)
    gCtx.font = `bold ${size}px ${font}`
    gCtx.fillStyle = fillColor
    gCtx.strokeStyle = strokeColor
    gCtx.textAlign = align
    gCtx.lineWidth = 2
    gCtx.letterSpacing = '2px'
    gCtx.fillText(txt, gCanvas.width / 2, 50)
    gCtx.strokeText(txt, gCanvas.width / 2, 50)
  })
}

function renderDefaultMsg() {
  document.querySelector(
    '.meme-editor'
  ).innerHTML = `<h1 class="default-msg">Select Meme from gallery to edit</h1>`
}

function onSave(elLink, type = 'save') {
  downloadCanvas(elLink, type, gCanvas)
}

function onShare() {
  console.log('share')
  uploadImg(gCanvas)
}
