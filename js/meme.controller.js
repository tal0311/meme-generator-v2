var gCanvas
var gCtx
var gElVideo
var gUserStream

function initEditor() {
  const elBody = document.querySelector('body')
  elBody.classList.add('editor')
  gCanvas = document.querySelector('canvas')
  gCtx = gCanvas.getContext('2d')
  gElVideo = document.querySelector('video')
  renderCanvas()
}

async function renderCanvas(save = null, userMedia) {
  const meme = getMemeForDisplay()
  if (!meme.imgUrl) {
    renderDefaultMsg()
    return
  }
  const { imgUrl, lines, selectedLineIdx: lineIdx } = meme
  const img = new Image()
  img.src = imgUrl
  // for saving img without line focus
  await img.decode()
  const media = userMedia ? userMedia : img
  gCtx.drawImage(media, 0, 0, gCanvas.width, gCanvas.height)
  renderLines(lines)
  const color = save ? 'transparent' : 'black'
  renderFocusToLine(lines[lineIdx], color)

  // TODO: USER IMAGE
}

function onRemoveLine() {
  removeLine()
  renderCanvas(true)
}
function renderFocusToLine({ x, y, txt, align }, color) {
  const measures = getLineMeasures(txt)
  // setRectToTxt(x, y, fontAscent, fontDecent, width, color)
  setRectToTxt(x, y, align, measures, color)
}
function setRectToTxt(x, y, align, measures, color) {
  const { width, fontAscent, fontDecent } = measures
  const xAlign = setXAlignment(measures, align, x)
  gCtx.beginPath()
  gCtx.strokeStyle = color || 'transparent'
  gCtx.strokeRect(xAlign - 10, y - fontAscent / 2, width + 20, fontDecent)
  gCtx.closePath()
}

function setXAlignment(measures, align, x) {
  const { width, rightAlign } = measures
  alignOpts = {
    center: x - rightAlign,
    right: x - width,
    default: x,
  }
  return alignOpts[align] || alignOpts['default']
}
function getLineMeasures(txt) {
  const {
    actualBoundingBoxRight: rightAlign,
    fontBoundingBoxAscent: fontAscent,
    fontBoundingBoxDescent: fontDecent,
    width,
  } = gCtx.measureText(txt)

  return {
    rightAlign,
    fontAscent,
    fontDecent,
    width,
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
  renderCanvas()
}

function onUpdateLine(value, type) {
  // debugger
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
    console.dir((input.value = line[name] || '#fd6dc8'))
  })
}
function renderLines(lines) {
  lines.forEach((line) => {
    const { fillColor, x, y, size, txt, strokeColor, align, font } = line
    // console.log('lines:', txt)
    gCtx.beginPath()
    gCtx.textBaseline = 'top'
    gCtx.font = `bold ${size}px ${font}`
    gCtx.fillStyle = fillColor
    gCtx.strokeStyle = strokeColor
    gCtx.textAlign = align
    gCtx.lineWidth = 2
    gCtx.letterSpacing = '2px'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
    gCtx.closePath()
    renderInputValue(line)
  })
}

function renderDefaultMsg() {
  document.querySelector(
    '.meme-editor'
  ).innerHTML = `<h1 class="default-msg">Select Meme from gallery to edit</h1>`
}

async function onSave(elLink, type = 'save') {
  await renderCanvas(true)
  downloadCanvas(elLink, type, gCanvas)
  const route = type === 'save' ? 'saved' : 'gallery'
  navigateTo(route)
}

function onShare() {
  console.log('share')
  uploadImg(gCanvas)
}
async function onSnap() {
  const elDialog = document.querySelector('dialog')
  elDialog.show()
  getMediaDevices(gElVideo)
}

async function takePhoto() {
  console.log('take photo')
  const elDialog = document.querySelector('dialog')
  elDialog.close()
  gCtx.drawImage(gElVideo, 0, 0, gCanvas.width, gCanvas.height)
  // await renderCanvas(false, gElVideo)
  var dataUrl = gCanvas.toDataURL()
  setMeme(null, dataUrl)
  renderCanvas()
  gElVideo.srcObject = null
}
