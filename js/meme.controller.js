var gCanvas
var gCtx
var gElVideo

function initEditor() {
  gCanvas = document.querySelector('canvas')
  gCtx = gCanvas.getContext('2d')
  gElVideo = document.querySelector('video')
  renderCanvas()
}

function renderCanvas(userVideo = null) {
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

function onAddLine() {
  const { lines } = getMemeForDisplay()
  let x = gCanvas.width / 2
  let y = gCanvas.height - 50
  if (lines.length > 1) {
    const { height } = gCanvas
    y = getRandomInt(50, height - 50)
  }
  addLine(x, y)
  renderCanvas()
}

function onChangeLine() {
  changeLine()
  renderInputValue()
  // lineFocus()
}

function onUpdateLine(value, type) {
  updateLine(value, type)
  renderCanvas()
}

function renderInputValue() {
  const elEditorPanel = document.querySelector('.editor-panel')
  const elInputs = elEditorPanel.querySelectorAll('input')

  const { selectedLineIdx: idx, lines } = getMemeForDisplay()
  const line = lines[idx]
  elInputs.forEach((input) => {
    const { name } = input
    console.dir((input.value = line[name] || '#ffff'))
  })
}
function renderLines(lines) {
  lines.forEach((line) => {
    const { fillColor, x, y, size, txt, strokeColor, align, font } = line
    // console.log('lines:', txt)
    gCtx.font = `bold ${size}px ${font}`
    gCtx.fillStyle = fillColor
    gCtx.strokeStyle = strokeColor
    gCtx.textAlign = align
    gCtx.lineWidth = 2
    gCtx.letterSpacing = '2px'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
    renderInputValue(line)
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
