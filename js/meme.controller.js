var gCanvas
var gCtx
var gElVideo

function initEditor() {
  gCanvas = document.querySelector('canvas')
  gCtx = gCanvas.getContext('2d')
  gElVideo = document.querySelector('video')
  renderEditor()
}

function renderEditor(userVideo = null) {
  const meme = getMemeForDisplay()

  if (!meme.imgUrl) {
    renderDefaultMsg()
    return
  }

  const { imgUrl, lines } = meme
  const img = new Image()
  img.src = imgUrl
  img.onload = () => {
    // TODO: USER IMAGE
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
function onSnap() {
  const elDialog = document.querySelector('dialog')
  elDialog.showModal()
  getMediaDevices(gElVideo)
}

function takePhoto() {
  console.log('take photo')
  // renderEditor(gElVideo)
}
